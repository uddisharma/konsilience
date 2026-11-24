import "server-only";
import { categoryArt, type CardPost } from "@/components/page/BlogCard";
import { blogArticles, type ArticleSection } from "@/lib/blogArticles";
import { posts as staticPosts } from "@/lib/catalog";
import { emptyDesign, emptySeo, type Block, type PostRecord } from "@/lib/blog/schema";
import { siteConfigs } from "@/lib/blog/sites";
import { readingTime } from "@/lib/blog/utils";
import { publicPost, publicPosts } from "./posts";

/*
 * The Konsilience blog = posts from the admin (MongoDB) + the built-in posts in lib/catalog.ts.
 * An admin post with the same slug replaces the built-in one, so built-in posts can be migrated
 * by re-creating them in the admin.
 */

const fallbackSections = (topic: string): ArticleSection[] => [
  { id: "overview", h: "Strategic Overview", p: [`${topic} represents a crucial operational focus for digital engineering teams. Executing effectively requires combining strategic alignment with disciplined technical execution.`] },
  { id: "key-considerations", h: "Key Considerations", list: ["Establish clear, measurable business metrics before deployment.", "Implement security and compliance controls from the foundational architecture.", "Iterate in short feedback loops and measure impact continuously."] },
  { id: "next-steps", h: "Implementation Roadmap", p: ["Start with high-impact, low-risk proof-of-concept workflows before enterprise-wide rollout."] },
];

function sectionsToBlocks(sections: ArticleSection[]): Block[] {
  return sections.flatMap((s): Block[] => [
    { id: `${s.id}-h`, type: "heading", level: 2, text: s.h, anchor: s.id },
    ...(s.p ?? []).map((t, i): Block => ({ id: `${s.id}-p${i}`, type: "paragraph", text: t })),
    ...(s.list ? [{ id: `${s.id}-l`, type: "list" as const, style: "steps" as const, items: s.list }] : []),
  ]);
}

const LEGACY_SIDEBAR_LINKS = [
  { label: "Travel & Hospitality", href: "/industries/travel" },
  { label: "Bus Operator Platform", href: "/portfolio/bus-operator-platform" },
  { label: "Web & Booking Engines", href: "/services/web-development" },
  { label: "Conversational AI", href: "/ai-solutions/conversational-ai" },
];

function staticToRecord(p: (typeof staticPosts)[number]): PostRecord {
  const art = categoryArt[p.category] ?? categoryArt.AI;
  const cta = siteConfigs.konsilience.defaultCta;
  const date = `${p.date}T09:00:00+05:30`;
  return {
    id: `static:${p.slug}`,
    site: "konsilience",
    sites: ["konsilience"],
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    tags: p.tags ?? [],
    author: { name: p.author?.name ?? "Konsilience Team", role: p.author?.role ?? `${p.category} practice` },
    status: "published",
    publishedAt: date,
    readTime: p.read,
    blocks: sectionsToBlocks(blogArticles[p.slug] ?? fallbackSections(p.title)),
    design: { ...emptyDesign(), artHue: art.hue, artIcon: art.icon, sidebarLinks: LEGACY_SIDEBAR_LINKS, ctaBand: { enabled: true, ...cta } },
    seo: emptySeo(),
    createdAt: date,
    updatedAt: date,
  };
}

export function toCard(p: PostRecord): CardPost {
  return {
    slug: p.slug,
    title: p.title,
    category: p.category,
    date: (p.publishedAt ?? p.createdAt).slice(0, 10),
    read: p.readTime || p.computedReadTime || readingTime(p.blocks),
    excerpt: p.excerpt,
    coverImage: p.design.hero !== "art" ? p.design.coverImage : undefined,
    coverAlt: p.design.coverAlt,
    artHue: p.design.artHue,
    artIcon: p.design.artIcon,
  };
}

/** All published Konsilience posts, newest first (blocks are not loaded for admin posts). */
export async function konsiliencePosts(): Promise<PostRecord[]> {
  const db = await publicPosts("konsilience");
  const taken = new Set(db.map((p) => p.slug));
  const builtIn = staticPosts.filter((p) => !taken.has(p.slug)).map(staticToRecord);
  return [...db, ...builtIn].sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

export async function konsiliencePost(slug: string): Promise<PostRecord | null> {
  const db = await publicPost("konsilience", slug);
  if (db) return db;
  const s = staticPosts.find((p) => p.slug === slug);
  return s ? staticToRecord(s) : null;
}
