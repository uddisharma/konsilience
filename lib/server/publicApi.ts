import "server-only";
import { NextResponse } from "next/server";
import { blocksToHtml } from "@/lib/blog/html";
import { resolveSeo, postSchema } from "@/lib/blog/meta";
import { SITES, type Block, type PostRecord, type Site } from "@/lib/blog/schema";
import { postUrl } from "@/lib/blog/sites";
import { readingTime, tableOfContents } from "@/lib/blog/utils";

/* Shapes and headers for the read-only public posts API (used by trasys.dev). */

export const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const CACHE = { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600" };

export function parseSite(v: string | null): Site | null {
  return SITES.includes(v as Site) ? (v as Site) : null;
}

export const jsonPublic = (data: unknown, status = 200) => NextResponse.json(data, { status, headers: { ...CORS, ...(status === 200 ? CACHE : {}) } });

export function summary(p: PostRecord) {
  return {
    id: p.id,
    site: p.site,
    slug: p.slug,
    url: postUrl(p.site, p.slug),
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    tags: p.tags,
    author: p.author,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
    readTime: p.readTime || p.computedReadTime || 1,
    coverImage: p.design.coverImage ? absolute(p.design.coverImage) : null,
    coverAlt: p.design.coverAlt ?? "",
  };
}

const absolute = (u: string) => (u.startsWith("/") ? `https://www.konsilience.tech${u}` : u);

// Media-library images are stored as "/api/media/<id>"; other sites need the full URL.
const absoluteBlocks = (blocks: Block[]): Block[] =>
  blocks.map((b) =>
    b.type === "image" ? { ...b, url: absolute(b.url) } : b.type === "gallery" ? { ...b, images: b.images.map((m) => ({ ...m, url: absolute(m.url) })) } : b,
  );

export function full(p: PostRecord) {
  const seo = resolveSeo(p);
  const blocks = absoluteBlocks(p.blocks);
  return {
    ...summary(p),
    readTime: p.readTime || readingTime(p.blocks),
    blocks,
    html: blocksToHtml(blocks),
    toc: tableOfContents(p.blocks),
    design: p.design,
    seo,
    jsonLd: { "@context": "https://schema.org", "@graph": postSchema(p) },
  };
}
