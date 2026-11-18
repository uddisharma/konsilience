import type { Metadata } from "next";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema";
import { plain } from "./inline";
import type { Block, PostRecord } from "./schema";
import { postUrl, siteConfigs } from "./sites";
import { autoExcerpt } from "./utils";

/* SEO: <head> metadata and JSON-LD for a post, from its SEO settings with sensible fallbacks. */

const abs = (url: string, base: string) => (url.startsWith("/") ? `${base}${url}` : url);

export function resolveSeo(p: PostRecord) {
  const cfg = siteConfigs[p.site];
  const description = p.seo.metaDescription || p.excerpt || autoExcerpt(p.blocks);
  const canonical = p.seo.canonicalUrl || postUrl(p.site, p.slug);
  const ogImage = abs(
    p.seo.ogImage ||
      p.design.coverImage ||
      `/og?title=${encodeURIComponent(p.title)}&subtitle=${encodeURIComponent(p.excerpt || description)}`,
    // Images in the media library are served by this site, whichever site the post is for.
    siteConfigs.konsilience.baseUrl,
  );
  return {
    title: p.seo.metaTitle || `${p.title} | ${cfg.name} Insights`,
    description,
    canonical,
    keywords: p.seo.keywords.length ? p.seo.keywords : [p.category, ...p.tags].filter(Boolean),
    ogTitle: p.seo.ogTitle || p.title,
    ogDescription: p.seo.ogDescription || description,
    ogImage,
    twitterCard: p.seo.twitterCard,
    noindex: p.seo.noindex,
  };
}

export function postMetadata(p: PostRecord): Metadata {
  const s = resolveSeo(p);
  return {
    title: { absolute: s.title },
    description: s.description,
    keywords: s.keywords,
    authors: [{ name: p.author.name }],
    alternates: { canonical: s.canonical },
    robots: s.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      title: s.ogTitle,
      description: s.ogDescription,
      url: s.canonical,
      publishedTime: p.publishedAt ?? undefined,
      modifiedTime: p.updatedAt,
      authors: [p.author.name],
      section: p.category || undefined,
      tags: p.tags,
      images: [{ url: s.ogImage, width: 1200, height: 630, alt: p.title }],
    },
    twitter: { card: s.twitterCard, title: s.ogTitle, description: s.ogDescription, images: [s.ogImage] },
  };
}

export function postSchema(p: PostRecord) {
  const s = resolveSeo(p);
  const cfg = siteConfigs[p.site];
  const faqs = p.blocks
    .filter((b): b is Extract<Block, { type: "faq" }> => b.type === "faq")
    .flatMap((b) => b.items.map((i) => ({ q: i.q, a: plain(i.a) })));
  const graph: Record<string, unknown>[] = [
    {
      "@type": p.seo.schemaType,
      "@id": `${s.canonical}#article`,
      headline: p.title,
      description: s.description,
      datePublished: p.publishedAt ?? p.createdAt,
      dateModified: p.updatedAt,
      inLanguage: "en-US",
      url: s.canonical,
      mainEntityOfPage: { "@type": "WebPage", "@id": s.canonical },
      author: { "@type": "Person", name: p.author.name, ...(p.author.role ? { jobTitle: p.author.role } : {}) },
      publisher: { "@id": `${cfg.baseUrl}/#organization` },
      image: { "@type": "ImageObject", url: s.ogImage, width: "1200", height: "630" },
      articleSection: p.category || undefined,
      keywords: s.keywords.join(", "),
    },
    buildBreadcrumbSchema([
      { name: "Home", item: cfg.baseUrl },
      { name: "Blog", item: `${cfg.baseUrl}${cfg.blogPath}` },
      { name: p.title, item: s.canonical },
    ]),
  ];
  const faq = buildFaqSchema(faqs);
  if (faq) graph.push(faq);
  return graph;
}
