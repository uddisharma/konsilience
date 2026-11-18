import "server-only";
import type { PostRecord } from "@/lib/blog/schema";
import { buildPayload, type Payload } from "./content";
import { publishToBluesky } from "./bluesky";
import { publishToDevto } from "./devto";
import { publishToHashnode } from "./hashnode";
import { PLATFORM_ENV, PLATFORM_LABELS, PLATFORMS, type Platform } from "./platforms";
import { publishToTumblr } from "./tumblr";
import { saveSyndication, type SyndicationRecord } from "./store";

export { PLATFORM_LABELS, PLATFORMS, type Platform } from "./platforms";

/*
 * Cross-posting: one post goes to several platforms, each with a canonical link back to the site.
 * Platforms run in parallel and independently: one failing does not stop the others. Each result is
 * stored, so a platform that already has the post is skipped unless the caller forces a repost.
 */

export type PlatformResult = {
  platform: Platform;
  label: string;
  status: "posted" | "failed" | "skipped";
  url?: string;
  error?: string;
};

type Publisher = (p: Payload) => Promise<{ url: string; remoteId: string }>;

const PUBLISHERS: Record<Platform, Publisher> = {
  devto: publishToDevto,
  hashnode: publishToHashnode,
  bluesky: publishToBluesky,
  tumblr: publishToTumblr,
};

/** Names of the environment variables a platform is still missing. Empty when it is configured. */
export function missingEnv(platform: Platform): string[] {
  return PLATFORM_ENV[platform].filter((name) => !process.env[name]?.trim());
}

export function platformStatus() {
  return PLATFORMS.map((id) => ({
    id,
    label: PLATFORM_LABELS[id],
    configured: missingEnv(id).length === 0,
    missing: missingEnv(id),
  }));
}

/** Whether a post may be cross-posted now. The canonical link must work, so the post has to be live. */
export function eligibility(post: PostRecord): { ok: boolean; reason?: string } {
  if (post.site !== "konsilience") return { ok: false, reason: "Cross-posting is set up for Konsilience posts only." };
  if (post.status !== "published") return { ok: false, reason: "Publish the post on the site first." };
  if (post.publishedAt && new Date(post.publishedAt) > new Date()) {
    return { ok: false, reason: "This post is scheduled. Cross-post it once it is live." };
  }
  return { ok: true };
}

export async function syndicatePost(
  post: PostRecord,
  platforms: Platform[],
  actor: string,
  force: boolean,
  existing: SyndicationRecord[],
): Promise<PlatformResult[]> {
  const payload = buildPayload(post);
  return Promise.all(
    platforms.map(async (platform): Promise<PlatformResult> => {
      const label = PLATFORM_LABELS[platform];
      const missing = missingEnv(platform);
      if (missing.length) return { platform, label, status: "skipped", error: `Not configured: ${missing.join(", ")}` };

      const prior = existing.find((r) => r.platform === platform && r.status === "posted");
      if (prior && !force) return { platform, label, status: "skipped", url: prior.url, error: "Already posted" };

      try {
        const out = await PUBLISHERS[platform](payload);
        await saveSyndication({ postId: post.id, platform, status: "posted", url: out.url, remoteId: out.remoteId, at: new Date(), by: actor });
        return { platform, label, status: "posted", url: out.url };
      } catch (err) {
        const error = err instanceof Error ? err.message : String(err);
        console.error(`[syndication] ${platform} failed`, err);
        // A failed repost never replaces a post that is already live.
        if (!prior) await saveSyndication({ postId: post.id, platform, status: "failed", error, at: new Date(), by: actor });
        return { platform, label, status: "failed", error };
      }
    }),
  );
}
