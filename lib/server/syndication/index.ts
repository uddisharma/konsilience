import "server-only";
import type { PostRecord } from "@/lib/blog/schema";
import { buildPayload, type Payload } from "./content";
import { publishToBluesky, unpublishFromBluesky } from "./bluesky";
import { publishToDevto, unpublishFromDevto } from "./devto";
import { publishToHashnode, unpublishFromHashnode } from "./hashnode";
import { PLATFORM_ENV, PLATFORM_LABELS, PLATFORMS, type Platform } from "./platforms";
import { publishToTumblr, unpublishFromTumblr } from "./tumblr";
import { removeSyndication, saveSyndication, type SyndicationRecord } from "./store";

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

const UNPUBLISHERS: Record<Platform, (remoteId: string) => Promise<void>> = {
  devto: unpublishFromDevto,
  hashnode: unpublishFromHashnode,
  bluesky: unpublishFromBluesky,
  tumblr: unpublishFromTumblr,
};

/**
 * Takes a cross-post down (dev.to: unpublished, since its API cannot delete; the others: deleted), then
 * forgets it so the post can be cross-posted again.
 */
export async function unsyndicatePost(postId: string, platform: Platform, existing: SyndicationRecord[]): Promise<void> {
  const record = existing.find((r) => r.platform === platform);
  if (!record) return;
  if (record.status === "posted") {
    const missing = missingEnv(platform);
    if (missing.length) throw new Error(`${PLATFORM_LABELS[platform]} is not configured: ${missing.join(", ")}`);
    if (!record.remoteId) throw new Error(`No ${PLATFORM_LABELS[platform]} post id was saved. Remove it on ${PLATFORM_LABELS[platform]} by hand.`);
    await UNPUBLISHERS[platform](record.remoteId);
  }
  await removeSyndication(postId, platform);
}

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

/**
 * Whether a post may be cross-posted now. It does not have to be on the website: a post that is not
 * live there is cross-posted without the "originally published" link and canonical URL.
 */
export function eligibility(post: PostRecord): { ok: boolean; reason?: string } {
  if (!post.title.trim()) return { ok: false, reason: "Give the post a title first." };
  if (post.blocks.length === 0) return { ok: false, reason: "Write the post before sharing it." };
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
