"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import type { Draft } from "@/lib/blog/draft";
import { SITES, type PostRecord, type Site } from "@/lib/blog/schema";
import { postUrl, siteConfigs } from "@/lib/blog/sites";
import type { Platform } from "@/lib/server/syndication/platforms";
import { api } from "./api";
import { useConfirm } from "./Confirm";
import { Button } from "./fields";

/*
 * The Publish button. Opens a panel: "Publish to all" on top, then one row per destination: the two
 * websites (Konsilience, Trasys) and the cross-posting platforms. Each destination is independent:
 * cross-posting never publishes the post on a website.
 */

type PlatformStatus = { id: Platform; label: string; configured: boolean; missing: string[] };
type SavedRecord = { platform: Platform; status: "posted" | "failed"; url?: string; error?: string };
type Result = { platform: Platform; label: string; status: "posted" | "failed" | "skipped"; url?: string; error?: string };
type Msg = { tone: "error" | "success"; text: string };

type Props = {
  post: Draft;
  dirty: boolean;
  busy: boolean;
  /** Saves the post with these changes. Resolves to the saved post, or null on error (already reported). */
  save: (override?: Partial<Draft>) => Promise<PostRecord | null>;
  setMsg: (m: Msg) => void;
};

const ROW = "flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-2";
const SMALL = "shrink-0 !px-3 !py-1.5";

function summarize(results: Result[], siteNote: string): Msg {
  const posted = results.filter((r) => r.status === "posted").map((r) => r.label);
  const failed = results.filter((r) => r.status === "failed").map((r) => `${r.label} (${r.error ?? "error"})`);
  const parts = [siteNote, posted.length ? `Posted to ${posted.join(", ")}.` : "", failed.length ? `Failed: ${failed.join("; ")}.` : ""].filter(Boolean);
  return { tone: failed.length ? "error" : "success", text: parts.join(" ") || "Nothing new to publish." };
}

const liveLink = (site: Site, slug: string) => (site === "konsilience" ? `/blog/${slug}` : postUrl(site, slug));

export default function PublishMenu({ post, dirty, busy, save, setMsg }: Props): ReactNode {
  const [open, setOpen] = useState(false);
  const [working, setWorking] = useState(false);
  const [platforms, setPlatforms] = useState<PlatformStatus[]>([]);
  const [records, setRecords] = useState<SavedRecord[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [confirm, confirmDialog] = useConfirm();

  const live = post.status === "published" ? post.sites : [];
  const scheduled = live.length > 0 && !!post.publishedAt && new Date(post.publishedAt) > new Date();
  const postedOn = (p: Platform) => records.find((r) => r.platform === p && r.status === "posted");

  const loadRecords = async (id: string | undefined) => {
    if (!id) return;
    const info = await api<{ records: SavedRecord[] }>(`/api/admin/posts/${id}/syndicate`);
    setRecords(info.records);
  };

  // Loads the platform setup and, for a saved post, where it has been cross-posted.
  useEffect(() => {
    if (!open) return;
    (async () => {
      try {
        const sys = await api<{ platforms: PlatformStatus[] }>("/api/admin/syndication");
        setPlatforms(sys.platforms);
        await loadRecords(post.id);
      } catch (e) {
        setMsg({ tone: "error", text: (e as Error).message });
      }
    })();
  }, [open, post.id, setMsg]);

  // Closes the panel on Escape or a click outside it.
  useEffect(() => {
    if (!open) return;
    // Clicks and keys inside a confirmation modal (rendered elsewhere in the page) keep the panel open.
    const inModal = (t: EventTarget | null) => t instanceof Element && !!t.closest("[data-admin-modal]");
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node) && !inModal(e.target)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !inModal(e.target) && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const busyRun = async (fn: () => Promise<void>) => {
    setWorking(true);
    try {
      await fn();
    } catch (e) {
      setMsg({ tone: "error", text: (e as Error).message });
    } finally {
      setWorking(false);
    }
  };

  /** Puts the post live on exactly these websites (none = back to draft). */
  const setSites = (sites: Site[]) =>
    save({ sites: SITES.filter((s) => sites.includes(s)), status: sites.length ? "published" : "draft" });

  /** Cross-posts to platforms. Saves unsaved edits first, without changing where the post is live. */
  const crossPost = async (targets: Platform[]): Promise<Result[]> => {
    let id = post.id;
    if (dirty || !id) {
      const saved = await save();
      if (!saved) return [];
      id = saved.id;
    }
    if (targets.length === 0) return [];
    const { results } = await api<{ results: Result[] }>(`/api/admin/posts/${id}/syndicate`, { method: "POST", json: { platforms: targets } });
    await loadRecords(id);
    return results;
  };

  const publishSite = (site: Site) =>
    busyRun(async () => {
      const saved = await setSites([...live, site]);
      if (saved) setMsg({ tone: "success", text: `Live on ${siteConfigs[site].name}.` });
    });

  // Each unpublish asks in a modal first, and only then shows the busy state.
  const unpublishSite = async (site: Site) => {
    const name = siteConfigs[site].name;
    const ok = await confirm({
      title: `Unpublish from ${name}?`,
      body: `The post comes off the ${name} blog. It stays saved here, and you can publish it again any time.${live.length === 1 ? " It is not on any other website, so it goes back to being a draft." : ""}`,
      action: "Unpublish",
      danger: true,
    });
    if (!ok) return;
    await busyRun(async () => {
      const saved = await setSites(live.filter((s) => s !== site));
      if (saved) setMsg({ tone: "success", text: `Removed from ${name}.` });
    });
  };

  const publishPlatform = (p: Platform) => busyRun(async () => setMsg(summarize(await crossPost([p]), "")));

  // dev.to's API cannot delete, so there the post is unpublished (moved back to drafts) instead.
  const unpublishPlatform = async (p: PlatformStatus) => {
    const id = post.id;
    if (!id) return;
    const ok = await confirm(
        p.id === "devto"
          ? {
              title: "Unpublish from dev.to?",
              body: "dev.to does not allow deleting through its API, so the article is unpublished: it moves back to your dev.to drafts. You can delete it there.",
              action: "Unpublish",
              danger: true,
            }
          : {
              title: `Delete from ${p.label}?`,
              body: `The post is deleted from ${p.label}, including its likes and comments there. This cannot be undone, but you can post it again later.`,
              action: "Delete",
              danger: true,
            },
      );
    if (!ok) return;
    await busyRun(async () => {
      const { records: next } = await api<{ records: SavedRecord[] }>(`/api/admin/posts/${id}/syndicate?platform=${p.id}`, { method: "DELETE" });
      setRecords(next);
      setMsg({ tone: "success", text: p.id === "devto" ? "Unpublished on dev.to." : `Removed from ${p.label}.` });
    });
  };

  // Websites first, so every cross-post can link back to the live post.
  const publishAll = () =>
    busyRun(async () => {
      setOpen(false);
      const missingSites = SITES.filter((s) => !live.includes(s));
      if (missingSites.length || dirty || !post.id) {
        const saved = await setSites([...SITES]);
        if (!saved) return;
      }
      const targets = platforms.filter((p) => p.configured && !postedOn(p.id)).map((p) => p.id);
      setMsg(summarize(await crossPost(targets), "Live on Konsilience and Trasys."));
    });

  const configuredCount = platforms.filter((p) => p.configured).length;

  return (
    <div ref={wrapRef} className="relative">
      {confirmDialog}
      <Button variant={live.length ? "outline" : "primary"} onClick={() => setOpen((o) => !o)} disabled={busy || working || !post.title} aria-haspopup="dialog" aria-expanded={open}>
        {working ? "Publishing…" : "Publish"} <span aria-hidden="true">▾</span>
      </Button>

      {open && (
        <div role="dialog" aria-label="Publish options" className="absolute right-0 top-full z-50 mt-2 w-[360px] max-w-[calc(100vw-2rem)] rounded-xl border border-line bg-card p-4 shadow-[0_20px_60px_rgba(0,0,0,.6)]">
          <p className="text-sm font-semibold text-white">Publish this post</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Each destination is separate. Cross-posting does not put the post on a website.
            {scheduled && " It is scheduled: it goes live on the websites at the publish date."}
          </p>
          <Button variant="primary" className="mt-3 w-full" onClick={publishAll} disabled={working || !post.title}>
            Publish to all
          </Button>
          <p className="mt-1.5 text-center text-[11px] text-muted">Konsilience, Trasys{configuredCount ? ` and ${configuredCount} platform${configuredCount > 1 ? "s" : ""}` : ""}</p>

          <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-muted">Websites</p>
          <ul className="mt-2 flex flex-col gap-2">
            {SITES.map((s) => {
              const on = live.includes(s);
              return (
                <li key={s} className={ROW}>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">{siteConfigs[s].name}</p>
                    <p className="truncate text-[11px] text-muted">{siteConfigs[s].baseUrl.replace("https://www.", "")}{siteConfigs[s].blogPath}</p>
                  </div>
                  {on ? (
                    <div className="flex shrink-0 items-center gap-2">
                      {!dirty && post.slug && (
                        <a href={liveLink(s, post.slug)} target="_blank" rel="noreferrer" className="text-xs font-semibold text-green-300 hover:underline">
                          {scheduled ? "Scheduled" : "Live ↗"}
                        </a>
                      )}
                      <Button variant="danger" className={SMALL} onClick={() => unpublishSite(s)} disabled={working}>
                        Unpublish
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" className={SMALL} onClick={() => publishSite(s)} disabled={working || !post.title}>
                      Publish
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-muted">Cross-post</p>
          <ul className="mt-2 flex flex-col gap-2">
            {platforms.map((p) => {
              const posted = postedOn(p.id);
              const failed = records.find((r) => r.platform === p.id && r.status === "failed");
              return (
                <li key={p.id} className={ROW}>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">{p.label}</p>
                    {!p.configured && <p className="truncate text-[11px] text-muted" title={p.missing.join(", ")}>Not set up</p>}
                    {failed && !posted && <p className="truncate text-[11px] text-red-300" title={failed.error}>Last attempt failed</p>}
                  </div>
                  {posted ? (
                    <div className="flex shrink-0 items-center gap-2">
                      <a href={posted.url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-green-300 hover:underline">
                        Posted ↗
                      </a>
                      <Button variant="danger" className={SMALL} onClick={() => unpublishPlatform(p)} disabled={!p.configured || working}>
                        Unpublish
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" className={SMALL} onClick={() => publishPlatform(p.id)} disabled={!p.configured || working || !post.title}>
                      Publish
                    </Button>
                  )}
                </li>
              );
            })}
            {platforms.length === 0 && <li className="text-xs text-muted">Loading…</li>}
          </ul>
          {live.length === 0 && (
            <p className="mt-3 text-[11px] leading-relaxed text-muted">Not on a website yet, so cross-posts will not link back to it.</p>
          )}
        </div>
      )}
    </div>
  );
}
