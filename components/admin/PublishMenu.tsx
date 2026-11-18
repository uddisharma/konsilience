"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import type { Draft } from "@/lib/blog/draft";
import type { PostRecord } from "@/lib/blog/schema";
import type { Platform } from "@/lib/server/syndication/platforms";
import { api } from "./api";
import { Button } from "./fields";

/*
 * The Publish button. Opens a small menu: "Publish to all" by default, then one button per platform.
 * Publishing the website comes first when needed; cross-posting then runs on the server.
 */

type PlatformStatus = { id: Platform; label: string; configured: boolean; missing: string[] };
type SavedRecord = { platform: Platform; status: "posted" | "failed"; url?: string; error?: string };
type Result = { platform: Platform; label: string; status: "posted" | "failed" | "skipped"; url?: string; error?: string };
type Msg = { tone: "error" | "success"; text: string };
type Eligibility = { ok: boolean; reason?: string };

type Props = {
  post: Draft;
  dirty: boolean;
  busy: boolean;
  /** Saves the post as published (the same as the editor's Publish). Resolves to the saved post, or null on error. */
  publishSite: () => Promise<PostRecord | null>;
  setMsg: (m: Msg) => void;
};

function summarize(results: Result[]): Msg {
  const posted = results.filter((r) => r.status === "posted").map((r) => r.label);
  const failed = results.filter((r) => r.status === "failed").map((r) => `${r.label} (${r.error ?? "error"})`);
  const skipped = results.filter((r) => r.status === "skipped").map((r) => `${r.label}: ${r.error ?? "skipped"}`);
  const parts = [
    posted.length ? `Posted to ${posted.join(", ")}.` : "",
    failed.length ? `Failed: ${failed.join("; ")}.` : "",
    skipped.length ? `Skipped: ${skipped.join("; ")}.` : "",
  ].filter((p) => p.length > 0);
  return { tone: failed.length ? "error" : "success", text: parts.join(" ") || "Nothing to post." };
}

function hintFor(s: { konsilience: boolean; blockedReason?: string; live: boolean; configuredLabels: string[] }): string {
  if (!s.konsilience) return "Cross-posting is set up for Konsilience posts only.";
  if (s.blockedReason) return s.blockedReason;
  if (s.live) return `Posts to ${s.configuredLabels.length ? s.configuredLabels.join(", ") : "no platforms yet"}.`;
  return `Publishes ${["Website", ...s.configuredLabels].join(", ")}.`;
}

export default function PublishMenu({ post, dirty, busy, publishSite, setMsg }: Props): ReactNode {
  const [open, setOpen] = useState(false);
  const [working, setWorking] = useState(false);
  const [platforms, setPlatforms] = useState<PlatformStatus[]>([]);
  const [records, setRecords] = useState<SavedRecord[]>([]);
  const [eligibility, setEligibility] = useState<Eligibility | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const konsilience = post.site === "konsilience";
  const live = post.status === "published";
  // A scheduled post, or a post that cannot be cross-posted, is reported by the server.
  const blockedReason = live && eligibility && !eligibility.ok ? eligibility.reason : undefined;
  const crossPostAllowed = konsilience && !blockedReason;
  const configured = platforms.filter((p) => p.configured);

  // Loads the platform setup and, for a saved post, where it already is.
  useEffect(() => {
    if (!open) return;
    const load = async (): Promise<void> => {
      try {
        const sys = await api<{ platforms: PlatformStatus[] }>("/api/admin/syndication");
        setPlatforms(sys.platforms);
        if (post.id) {
          const info = await api<{ records: SavedRecord[]; eligibility: Eligibility }>(`/api/admin/posts/${post.id}/syndicate`);
          setRecords(info.records);
          setEligibility(info.eligibility);
        }
      } catch (e) {
        setMsg({ tone: "error", text: (e as Error).message });
      }
    };
    void load();
  }, [open, post.id, setMsg]);

  // Closes the menu on Escape or a click outside it.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const run = async (choice: Platform | "all"): Promise<void> => {
    setOpen(false);
    setWorking(true);
    try {
      // Publish the website first if the post is not live yet, or has unsaved edits.
      let id = post.id;
      if (!live || dirty || !post.id) {
        const saved = await publishSite();
        if (!saved) return;
        id = saved.id;
      }
      if (!id) return;
      if (!konsilience) {
        setMsg({ tone: "success", text: "Published on the site. Cross-posting is set up for Konsilience posts only." });
        return;
      }
      const targets = choice === "all" ? configured.map((p) => p.id) : [choice];
      if (targets.length === 0) {
        setMsg({ tone: "success", text: "Published on the site. No cross-posting platforms are configured yet." });
        return;
      }
      const { results } = await api<{ results: Result[] }>(`/api/admin/posts/${id}/syndicate`, {
        method: "POST",
        json: { platforms: targets },
      });
      setMsg(summarize(results));
    } catch (e) {
      setMsg({ tone: "error", text: (e as Error).message });
    } finally {
      setWorking(false);
    }
  };

  const allHint = hintFor({ konsilience, blockedReason, live, configuredLabels: configured.map((p) => p.label) });

  return (
    <div ref={wrapRef} className="relative">
      <Button
        variant={live ? "outline" : "primary"}
        onClick={() => setOpen((o) => !o)}
        disabled={busy || working || !post.title}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {working ? "Publishing…" : "Publish"} <span aria-hidden="true">▾</span>
      </Button>

      {open && (
        <div
          role="dialog"
          aria-label="Publish options"
          className="absolute right-0 top-full z-50 mt-2 w-[340px] max-w-[calc(100vw-2rem)] rounded-xl border border-line bg-card p-4 shadow-[0_20px_60px_rgba(0,0,0,.6)]"
        >
          <p className="text-sm font-semibold text-white">{live ? "Share this post" : "Publish this post"}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">{allHint}</p>
          <Button variant="primary" className="mt-3 w-full" onClick={() => run("all")} disabled={!post.title || (live && !crossPostAllowed && konsilience)}>
            {live ? "Publish to all platforms" : "Publish to all"}
          </Button>

          <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-muted">Or one platform</p>
          <ul className="mt-2 flex flex-col gap-2">
            {platforms.map((p) => {
              const posted = records.find((r) => r.platform === p.id && r.status === "posted");
              const failed = records.find((r) => r.platform === p.id && r.status === "failed");
              return (
                <li key={p.id} className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">{p.label}</p>
                    {!p.configured && <p className="truncate text-[11px] text-muted" title={p.missing.join(", ")}>Not set up</p>}
                    {failed && !posted && <p className="truncate text-[11px] text-red-300" title={failed.error}>Last attempt failed</p>}
                  </div>
                  {posted ? (
                    <a href={posted.url} target="_blank" rel="noreferrer" className="shrink-0 text-xs font-semibold text-green-300 hover:underline">
                      Posted ↗
                    </a>
                  ) : (
                    <Button variant="outline" className="shrink-0 !px-3 !py-1.5" onClick={() => run(p.id)} disabled={!p.configured || !crossPostAllowed || !post.title}>
                      Publish
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
