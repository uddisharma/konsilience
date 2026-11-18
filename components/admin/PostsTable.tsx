"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { PostRecord } from "@/lib/blog/schema";
import { postUrl, siteConfigs } from "@/lib/blog/sites";
import { api, fmtDate } from "./api";
import { Input, Notice, Select } from "./fields";

export default function PostsTable() {
  const [site, setSite] = useState("");
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [data, setData] = useState<{ posts: PostRecord[]; total: number } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const ctl = new AbortController();
    const t = setTimeout(() => {
      const sp = new URLSearchParams({ ...(site && { site }), ...(status && { status }), ...(q && { q }) });
      api<{ posts: PostRecord[]; total: number }>(`/api/admin/posts?${sp}`, { signal: ctl.signal })
        .then((d) => {
          setData(d);
          setError("");
        })
        .catch((e) => e.name !== "AbortError" && setError(e.message));
    }, 200);
    return () => {
      clearTimeout(t);
      ctl.abort();
    };
  }, [site, status, q]);

  const badge = (p: PostRecord) => {
    const later = p.status === "published" && p.publishedAt && new Date(p.publishedAt) > new Date();
    const [text, cls] = later
      ? ["Scheduled", "bg-amber-500/20 text-amber-300"]
      : p.status === "published"
        ? ["Published", "bg-green-500/20 text-green-300"]
        : p.status === "archived"
          ? ["Archived", "bg-white/10 text-muted"]
          : ["Draft", "bg-primary/20 text-primary"];
    return <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${cls}`}>{text}</span>;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 md:flex-row">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title, slug, tags…" className="md:max-w-xs" />
        <Select value={site} onChange={setSite} options={[["", "All sites"], ["konsilience", "Konsilience"], ["trasys", "Trasys"]]} className="md:w-44" />
        <Select value={status} onChange={setStatus} options={[["", "Any status"], ["draft", "Drafts"], ["published", "Published"], ["archived", "Archived"]]} className="md:w-44" />
        {data && <span className="self-center text-xs text-muted md:ml-auto">{data.total} posts</span>}
      </div>
      {error && <Notice tone="error">{error}</Notice>}
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-card text-xs text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold">Site</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Updated</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {!data ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted">Loading…</td>
              </tr>
            ) : data.posts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-14 text-center text-muted">
                  No posts yet. <Link href="/admin/posts/new" className="text-primary underline">Write the first one</Link>.
                </td>
              </tr>
            ) : (
              data.posts.map((p) => (
                <tr key={p.id} className="border-t border-line/60 hover:bg-white/[.03]">
                  <td className="px-4 py-3">
                    <Link href={`/admin/posts/${p.id}`} className="font-semibold hover:text-primary">{p.title || "Untitled"}</Link>
                    <span className="block text-xs text-muted">/{p.slug}{p.source === "mcp" ? " · via MCP" : ""}</span>
                  </td>
                  <td className="px-4 py-3 text-white/80">{siteConfigs[p.site].name}</td>
                  <td className="px-4 py-3">{badge(p)}</td>
                  <td className="px-4 py-3 text-white/70">{p.category}</td>
                  <td className="px-4 py-3 text-xs text-muted">
                    {fmtDate(p.updatedAt)}
                    {p.updatedBy && <span className="block">{p.updatedBy}</span>}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Link href={`/admin/preview/${p.id}`} target="_blank" className="mr-3 text-xs text-muted hover:text-white">Preview</Link>
                    {p.status === "published" && (
                      <a href={p.site === "konsilience" ? `/blog/${p.slug}` : postUrl(p.site, p.slug)} target="_blank" rel="noreferrer" className="text-xs text-muted hover:text-white">Live ↗</a>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
