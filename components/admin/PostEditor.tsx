"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { blocksToMarkdown, markdownToBlocks } from "@/lib/blog/markdown";
import type { Draft } from "@/lib/blog/draft";
import { SITES, type Design, type PostRecord, type Seo, type Site } from "@/lib/blog/schema";
import { postUrl, siteConfigs } from "@/lib/blog/sites";
import { autoExcerpt, readingTime, slugify, wordCount } from "@/lib/blog/utils";
import { api, fmtDate } from "./api";
import BlockEditor from "./BlockEditor";
import PublishMenu from "./PublishMenu";
import { AutoTextarea, Button, Card, Field, Input, Notice, Select, Toggle } from "./fields";
import { ImageField } from "./Media";


const MS_PER_MINUTE = 60000;
// The length of "YYYY-MM-DDTHH:mm", the value a datetime-local input takes.
const DATETIME_LOCAL_LENGTH = 16;

const toLocal = (iso?: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * MS_PER_MINUTE).toISOString().slice(0, DATETIME_LOCAL_LENGTH);
};

const TABS = ["Publish", "Design", "SEO", "Markdown"] as const;
const ICONS = ["spark", "code", "eye", "cloud", "chart", "search", "rocket", "shield", "agent", "db", "layers", "bolt", "target", "globe", "users", "doc"];

// Fields the server sets itself; they are not sent back on save.
const SERVER_MANAGED: readonly string[] = ["updatedAt", "updatedBy", "createdAt", "createdBy", "source", "computedReadTime"];
const STATUS_STYLE: Record<string, string> = {
  published: "bg-green-500/20 text-green-300",
  archived: "bg-white/10 text-muted",
  draft: "bg-primary/20 text-primary",
};
const SCHEDULED_STYLE = "bg-amber-500/20 text-amber-300";
const DEFAULT_HUE = 225;
const ARTWORK_BAR_HEIGHT = 6;
const ARTWORK_BAR_RADIUS = 4;

function saveNote(dirty: boolean, updatedAt?: string): string {
  if (dirty) return "Unsaved changes";
  if (updatedAt) return `Saved ${fmtDate(updatedAt)}`;
  return "";
}

export default function PostEditor({ initial }: { initial: PostRecord | Draft }) {
  const router = useRouter();
  const [post, setPost] = useState<Draft>(initial);
  const [saved, setSaved] = useState(JSON.stringify(initial));
  const [tab, setTab] = useState<(typeof TABS)[number]>("Publish");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: "error" | "success"; text: string } | null>(null);
  const [slugTouched, setSlugTouched] = useState(!!initial.slug);
  const [md, setMd] = useState("");

  const dirty = JSON.stringify(post) !== saved;
  const cfg = siteConfigs[post.site];
  const set = (patch: Partial<Draft>) => setPost((p) => ({ ...p, ...patch }));
  const setDesign = (patch: Partial<Design>) => setPost((p) => ({ ...p, design: { ...p.design, ...patch } }));
  const setSeo = (patch: Partial<Seo>) => setPost((p) => ({ ...p, seo: { ...p.seo, ...patch } }));

  const save = useCallback(
    async (override?: Partial<Draft>) => {
      const body = { ...post, ...override };
      setBusy(true);
      setMsg(null);
      try {
        const { id, ...rest } = body as Draft & Partial<PostRecord>;
        // Server-managed fields are dropped; the API would ignore them anyway.
        const payload = Object.fromEntries(Object.entries(rest).filter(([k]) => !SERVER_MANAGED.includes(k)));
        const { post: res } = id
          ? await api<{ post: PostRecord }>(`/api/admin/posts/${id}`, { method: "PATCH", json: payload })
          : await api<{ post: PostRecord }>("/api/admin/posts", { method: "POST", json: payload });
        setPost(res);
        setSaved(JSON.stringify(res));
        setMsg({ tone: "success", text: res.status === "published" ? "Saved and live." : "Saved." });
        if (!id) router.replace(`/admin/posts/${res.id}`);
        return res;
      } catch (e) {
        setMsg({ tone: "error", text: (e as Error).message });
        return null;
      } finally {
        setBusy(false);
      }
    },
    [post, router],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (!busy) save();
      }
    };
    const onLeave = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("beforeunload", onLeave);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("beforeunload", onLeave);
    };
  }, [save, dirty, busy]);

  const remove = async () => {
    if (!post.id || !confirm(`Delete “${post.title || "Untitled"}” permanently?`)) return;
    try {
      await api(`/api/admin/posts/${post.id}`, { method: "DELETE" });
      setSaved(JSON.stringify(post));
      router.push("/admin");
    } catch (e) {
      setMsg({ tone: "error", text: (e as Error).message });
    }
  };

  const preview = async () => {
    const res = dirty || !post.id ? await save() : post;
    if (res?.id) window.open(`/admin/preview/${res.id}`, "_blank");
  };

  const stats = useMemo(() => ({ words: wordCount(post.blocks), read: readingTime(post.blocks) }), [post.blocks]);
  const scheduled = post.status === "published" && post.publishedAt && new Date(post.publishedAt) > new Date();
  const liveUrl = post.slug ? postUrl(post.site, post.slug) : "";
  const metaTitle = post.seo.metaTitle || `${post.title} | ${cfg.name} Insights`;
  const metaDesc = post.seo.metaDescription || post.excerpt || autoExcerpt(post.blocks);
  const ogImage = post.seo.ogImage || post.design.coverImage || (post.title ? `/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.excerpt)}` : "");

  return (
    <div className="flex flex-col gap-5">
      {/* Top bar */}
      <div className="sticky top-0 z-40 -mx-4 flex flex-wrap items-center gap-2 border-b border-line bg-black/90 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
        <Link href="/admin" className="text-sm text-muted hover:text-white">← Posts</Link>
        <span className={`ml-2 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase ${scheduled ? SCHEDULED_STYLE : STATUS_STYLE[post.status]}`}>
          {scheduled ? "Scheduled" : post.status}
        </span>
        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white/70">{cfg.name}</span>
        <span className="text-xs text-muted">{saveNote(dirty, post.updatedAt)}</span>
        <div className="ml-auto flex flex-wrap gap-2">
          {post.id && <Button variant="danger" onClick={remove}>Delete</Button>}
          <Button variant="outline" onClick={preview} disabled={busy || !post.title}>Preview</Button>
          {post.status === "published" && liveUrl && !dirty && (
            <a href={post.site === "konsilience" ? `/blog/${post.slug}` : liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-lg border border-line px-3.5 py-2 text-sm font-semibold text-white/85 hover:border-white/40">
              View live ↗
            </a>
          )}
          <Button variant="outline" onClick={() => save()} disabled={busy || !post.title}>{busy ? "Saving…" : "Save"}</Button>
          {post.status === "published" && (
            <Button variant="outline" onClick={() => save({ status: "draft" })} disabled={busy}>Unpublish</Button>
          )}
          <PublishMenu post={post} dirty={dirty} busy={busy} publishSite={() => save({ status: "published" })} setMsg={setMsg} />
        </div>
      </div>
      {msg && <Notice tone={msg.tone}>{msg.text}</Notice>}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        {/* Main column */}
        <div className="flex min-w-0 flex-col gap-4">
          <AutoTextarea
            value={post.title}
            onChange={(e) => {
              // Matches a line break ("a\nb"); rejects "a b". Tester: https://regex101.com/?regex=%5Cn&flags=g
              const title = e.target.value.replace(/\n/g, " ");
              set({ title, ...(!slugTouched && !post.id ? { slug: slugify(title) } : {}) });
            }}
            placeholder="Post title"
            className="!border-0 !bg-transparent !px-0 text-3xl font-semibold"
          />
          <AutoTextarea value={post.excerpt} onChange={(e) => set({ excerpt: e.target.value })} placeholder="Excerpt: one or two sentences shown on cards and under the title." className="text-base text-white/80" />
          <div className="flex items-center gap-4 text-xs text-muted">
            <span>{stats.words} words</span>
            <span>~{stats.read} min read</span>
            <span>{post.blocks.length} blocks</span>
          </div>
          <BlockEditor blocks={post.blocks} onChange={(blocks) => set({ blocks })} />
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-4 xl:sticky xl:top-20 xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto">
          <div className="flex gap-1 rounded-xl border border-line bg-card p-1">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTab(t);
                  if (t === "Markdown") setMd(blocksToMarkdown(post.blocks));
                }}
                className={`flex-1 rounded-lg py-1.5 text-xs font-semibold ${tab === t ? "bg-white text-black" : "text-white/70 hover:text-white"}`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "Publish" && (
            <Card>
              <div className="flex flex-col gap-4">
                <Field label="Publish to" hint={`Live URL: ${liveUrl || "—"}`}>
                  <Select
                    value={post.site}
                    onChange={(v) => {
                      const s = v as Site;
                      const next = siteConfigs[s];
                      set({ site: s, category: next.categories.includes(post.category) ? post.category : next.categories[0] });
                    }}
                    options={SITES.map((s) => [s, `${siteConfigs[s].name} · ${siteConfigs[s].baseUrl.replace("https://", "")}${siteConfigs[s].blogPath}`])}
                  />
                </Field>
                <Field label="Status">
                  <Select value={post.status} onChange={(v) => set({ status: v as Draft["status"] })} options={[["draft", "Draft"], ["published", "Published"], ["archived", "Archived"]]} />
                </Field>
                <Field label="Publish date" hint="A future date schedules the post. Empty = now, when published.">
                  <Input type="datetime-local" value={toLocal(post.publishedAt)} onChange={(e) => set({ publishedAt: e.target.value ? new Date(e.target.value).toISOString() : null })} />
                </Field>
                <Field label="Slug" hint="Lowercase letters, numbers and hyphens.">
                  <div className="flex gap-2">
                    <Input
                      value={post.slug}
                      onChange={(e) => {
                        setSlugTouched(true);
                        // Matches characters a slug cannot have ("Ä", "_", " "); rejects "a-1". Tester: https://regex101.com/?regex=%5B%5Ea-z0-9-%5D&flags=g
                        set({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") });
                      }}
                    />
                    <Button variant="outline" onClick={() => set({ slug: slugify(post.title) })} title="Regenerate from title">↻</Button>
                  </div>
                </Field>
                <Field label="Category">
                  <Input list="categories" value={post.category} onChange={(e) => set({ category: e.target.value })} />
                  <datalist id="categories">
                    {cfg.categories.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </Field>
                <Field label="Tags" hint="Comma separated.">
                  <Input value={post.tags.join(", ")} onChange={(e) => set({ tags: e.target.value.split(",").map((t) => t.trimStart()).filter((t, i, a) => t || i === a.length - 1) })} onBlur={() => set({ tags: post.tags.map((t) => t.trim()).filter(Boolean) })} />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Author">
                    <Input value={post.author.name} onChange={(e) => set({ author: { ...post.author, name: e.target.value } })} />
                  </Field>
                  <Field label="Author role">
                    <Input value={post.author.role ?? ""} onChange={(e) => set({ author: { ...post.author, role: e.target.value } })} />
                  </Field>
                </div>
                <Field label="Author photo">
                  <ImageField value={post.author.avatar} onChange={(avatar) => set({ author: { ...post.author, avatar: avatar || undefined } })} />
                </Field>
                <Field label="Reading time (minutes)" hint={`0 = automatic (currently ${stats.read}).`}>
                  <Input type="number" min={0} max={240} value={post.readTime} onChange={(e) => set({ readTime: Number(e.target.value) || 0 })} />
                </Field>
              </div>
            </Card>
          )}

          {tab === "Design" && (
            <Card>
              <div className="flex flex-col gap-4">
                <Field label="Hero style">
                  <Select value={post.design.hero} onChange={(v) => setDesign({ hero: v as Design["hero"] })} options={[["art", "Generated artwork"], ["image", "Cover image (wide)"], ["split", "Split: text + image"], ["minimal", "Text only"]]} />
                </Field>
                {(post.design.hero === "image" || post.design.hero === "split") && (
                  <>
                    <Field label="Cover image" hint="Also used for cards and social sharing, unless an OG image is set. 1600×900 or larger.">
                      <ImageField value={post.design.coverImage} onChange={(coverImage) => setDesign({ coverImage: coverImage || undefined })} onAlt={(coverAlt) => setDesign({ coverAlt })} />
                    </Field>
                    <Field label="Cover alt text">
                      <Input value={post.design.coverAlt ?? ""} onChange={(e) => setDesign({ coverAlt: e.target.value })} />
                    </Field>
                  </>
                )}
                {post.design.hero === "art" && (
                  <>
                    <Field label={`Artwork colour (hue ${post.design.artHue ?? "auto"})`}>
                      <input type="range" min={0} max={360} value={post.design.artHue ?? DEFAULT_HUE} onChange={(e) => setDesign({ artHue: Number(e.target.value) })} className="w-full accent-[rgb(var(--brand-rgb))]" style={{ background: "linear-gradient(90deg,hsl(0 80% 50%),hsl(60 80% 50%),hsl(120 80% 50%),hsl(180 80% 50%),hsl(240 80% 50%),hsl(300 80% 50%),hsl(360 80% 50%))", height: ARTWORK_BAR_HEIGHT, borderRadius: ARTWORK_BAR_RADIUS }} />
                    </Field>
                    <Field label="Artwork icon">
                      <Select value={post.design.artIcon ?? ""} onChange={(v) => setDesign({ artIcon: v || undefined })} options={[["", "From category"], ...ICONS.map((i): [string, string] => [i, i])]} />
                    </Field>
                  </>
                )}
                <Field label="Accent colour" hint="Overrides the brand colour for links, buttons and highlights in this post.">
                  <div className="flex gap-2">
                    <input type="color" value={post.design.accentColor || "#2563eb"} onChange={(e) => setDesign({ accentColor: e.target.value })} className="h-9 w-12 cursor-pointer rounded border border-line bg-transparent" />
                    <Input value={post.design.accentColor ?? ""} onChange={(e) => setDesign({ accentColor: e.target.value })} placeholder="#rrggbb (empty = brand)" />
                    {post.design.accentColor && <Button onClick={() => setDesign({ accentColor: "" })}>Reset</Button>}
                  </div>
                </Field>
                <Field label="Layout">
                  <Select value={post.design.layout} onChange={(v) => setDesign({ layout: v as Design["layout"] })} options={[["sidebar", "Sidebars (contents + share)"], ["centered", "Centred reading column"]]} />
                </Field>
                <div className="flex flex-col divide-y divide-line/60 rounded-lg border border-line px-3">
                  <Toggle label="Table of contents" checked={post.design.showToc} onChange={(showToc) => setDesign({ showToc })} />
                  <Toggle label="Share buttons" checked={post.design.showShare} onChange={(showShare) => setDesign({ showShare })} />
                  <Toggle label="Author" checked={post.design.showAuthor} onChange={(showAuthor) => setDesign({ showAuthor })} />
                  <Toggle label="Related articles" checked={post.design.showRelated} onChange={(showRelated) => setDesign({ showRelated })} />
                  <Toggle label="Newsletter" checked={post.design.showNewsletter} onChange={(showNewsletter) => setDesign({ showNewsletter })} />
                  <Toggle label="Closing CTA band" checked={post.design.ctaBand.enabled} onChange={(enabled) => setDesign({ ctaBand: { ...post.design.ctaBand, enabled } })} />
                </div>
                {post.design.ctaBand.enabled && (
                  <div className="flex flex-col gap-2 rounded-lg border border-line p-3">
                    <span className="text-xs font-semibold text-white/70">Closing CTA (empty fields use the site default)</span>
                    {(["title", "text", "label", "href"] as const).map((k) => (
                      <Input key={k} value={post.design.ctaBand[k]} placeholder={`${k}: ${cfg.defaultCta[k]}`} onChange={(e) => setDesign({ ctaBand: { ...post.design.ctaBand, [k]: e.target.value } })} />
                    ))}
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-white/70">Sidebar “Related reading” links</span>
                  {post.design.sidebarLinks.map((l, i) => (
                    <div key={i} className="flex gap-2">
                      <Input value={l.label} placeholder="Label" onChange={(e) => setDesign({ sidebarLinks: post.design.sidebarLinks.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)) })} />
                      <Input value={l.href} placeholder="/services/…" onChange={(e) => setDesign({ sidebarLinks: post.design.sidebarLinks.map((x, j) => (j === i ? { ...x, href: e.target.value } : x)) })} />
                      <button type="button" className="px-1 text-muted hover:text-red-400" onClick={() => setDesign({ sidebarLinks: post.design.sidebarLinks.filter((_, j) => j !== i) })}>✕</button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-fit !py-1 text-xs" onClick={() => setDesign({ sidebarLinks: [...post.design.sidebarLinks, { label: "", href: "" }] })}>+ Link</Button>
                </div>
              </div>
            </Card>
          )}

          {tab === "SEO" && (
            <>
              <Card title="Google preview">
                <div className="rounded-lg bg-white p-4 font-[arial,sans-serif]">
                  <p className="truncate text-xs text-[#202124]">{liveUrl.replace("https://", "") || cfg.baseUrl}</p>
                  <p className="mt-1 line-clamp-1 text-lg text-[#1a0dab]">{metaTitle}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-[#4d5156]">{metaDesc || "Add a meta description."}</p>
                </div>
              </Card>
              <Card title="Search">
                <div className="flex flex-col gap-4">
                  <Field label="Meta title" count={metaTitle.length} max={60} hint="Empty = “Title | Site Insights”.">
                    <Input value={post.seo.metaTitle ?? ""} onChange={(e) => setSeo({ metaTitle: e.target.value || undefined })} placeholder={metaTitle} />
                  </Field>
                  <Field label="Meta description" count={metaDesc.length} max={160} hint="Empty = the excerpt.">
                    <AutoTextarea value={post.seo.metaDescription ?? ""} onChange={(e) => setSeo({ metaDescription: e.target.value || undefined })} placeholder={metaDesc} />
                  </Field>
                  <Field label="Keywords" hint="Comma separated. Empty = category + tags.">
                    <Input value={post.seo.keywords.join(", ")} onChange={(e) => setSeo({ keywords: e.target.value.split(",").map((k) => k.trim()).filter(Boolean) })} />
                  </Field>
                  <Field label="Canonical URL" hint="Only when this post first appeared elsewhere.">
                    <Input value={post.seo.canonicalUrl ?? ""} onChange={(e) => setSeo({ canonicalUrl: e.target.value || undefined })} placeholder={liveUrl} />
                  </Field>
                  <Field label="Schema type">
                    <Select value={post.seo.schemaType} onChange={(v) => setSeo({ schemaType: v as Seo["schemaType"] })} options={["BlogPosting", "Article", "TechArticle", "NewsArticle"]} />
                  </Field>
                  <Toggle label="Hide from search engines (noindex)" checked={post.seo.noindex} onChange={(noindex) => setSeo({ noindex })} />
                </div>
              </Card>
              <Card title="Social (Open Graph / X)">
                <div className="flex flex-col gap-4">
                  {ogImage && (
                    <div className="overflow-hidden rounded-lg border border-line">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={ogImage} alt="" className="aspect-[1200/630] w-full bg-black object-cover" />
                      <div className="bg-[#1c1c1c] p-3">
                        <p className="text-[11px] uppercase text-muted">{cfg.baseUrl.replace("https://www.", "")}</p>
                        <p className="line-clamp-1 text-sm font-semibold">{post.seo.ogTitle || post.title}</p>
                        <p className="line-clamp-2 text-xs text-muted">{post.seo.ogDescription || metaDesc}</p>
                      </div>
                    </div>
                  )}
                  <Field label="OG title">
                    <Input value={post.seo.ogTitle ?? ""} onChange={(e) => setSeo({ ogTitle: e.target.value || undefined })} placeholder={post.title} />
                  </Field>
                  <Field label="OG description">
                    <AutoTextarea value={post.seo.ogDescription ?? ""} onChange={(e) => setSeo({ ogDescription: e.target.value || undefined })} placeholder={metaDesc} />
                  </Field>
                  <Field label="OG image" hint="1200×630. Empty = cover image, or a generated title card.">
                    <ImageField value={post.seo.ogImage} onChange={(ogImage) => setSeo({ ogImage: ogImage || undefined })} />
                  </Field>
                  <Field label="X card">
                    <Select value={post.seo.twitterCard} onChange={(v) => setSeo({ twitterCard: v as Seo["twitterCard"] })} options={[["summary_large_image", "Large image"], ["summary", "Small"]]} />
                  </Field>
                </div>
              </Card>
            </>
          )}

          {tab === "Markdown" && (
            <Card title="Markdown">
              <div className="flex flex-col gap-3">
                <p className="text-xs text-muted">The body as Markdown. Edit or paste here (e.g. a draft from Claude), then apply. Supports :::faq, :::cta, :::steps, :::stats, &gt; [!TIP] callouts and @[title](video-url).</p>
                <AutoTextarea value={md} onChange={(e) => setMd(e.target.value)} className="min-h-80 font-mono text-xs" spellCheck={false} />
                <div className="flex gap-2">
                  <Button variant="primary" onClick={() => confirm("Replace the whole body with this Markdown?") && set({ blocks: markdownToBlocks(md) })}>Replace body</Button>
                  <Button variant="outline" onClick={() => set({ blocks: [...post.blocks, ...markdownToBlocks(md)] })}>Append</Button>
                  <Button onClick={() => navigator.clipboard.writeText(md)}>Copy</Button>
                </div>
              </div>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
