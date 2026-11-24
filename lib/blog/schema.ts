import { z } from "zod";

/*
 * The blog content model. Shared by the admin editor (client), the admin API, the public API
 * and the MCP server, so every writer is validated by the same rules.
 *
 * A post body is an ordered list of blocks. Text fields inside blocks accept inline Markdown:
 * **bold**, *italic*, `code`, ~~strike~~ and [links](/path).
 */

export const SITES = ["konsilience", "trasys"] as const;
export type Site = (typeof SITES)[number];

export const POST_STATUSES = ["draft", "published", "archived"] as const;
export type PostStatus = (typeof POST_STATUSES)[number];

const text = (max = 20000) => z.string().max(max);
const url = z.string().trim().max(2048);
const id = z.string().max(64).optional();

export const headingBlock = z.object({
  id,
  type: z.literal("heading"),
  level: z.union([z.literal(2), z.literal(3), z.literal(4)]).default(2),
  text: text(300),
  anchor: z.string().max(120).optional(),
});
export const paragraphBlock = z.object({ id, type: z.literal("paragraph"), text: text() });
export const listBlock = z.object({
  id,
  type: z.literal("list"),
  style: z.enum(["bullet", "numbered", "steps", "check"]).default("bullet"),
  items: z.array(text(4000)).max(100),
});
export const imageBlock = z.object({
  id,
  type: z.literal("image"),
  url,
  alt: text(300).default(""),
  caption: text(500).optional(),
  size: z.enum(["content", "wide", "full"]).default("content"),
  link: url.optional(),
});
export const galleryBlock = z.object({
  id,
  type: z.literal("gallery"),
  columns: z.union([z.literal(2), z.literal(3)]).default(2),
  images: z.array(z.object({ url, alt: text(300).default(""), caption: text(500).optional() })).max(24),
});
export const quoteBlock = z.object({ id, type: z.literal("quote"), text: text(4000), cite: text(200).optional() });
export const calloutBlock = z.object({
  id,
  type: z.literal("callout"),
  tone: z.enum(["info", "tip", "warning", "success"]).default("info"),
  title: text(200).optional(),
  text: text(4000),
});
export const codeBlock = z.object({
  id,
  type: z.literal("code"),
  language: z.string().max(40).optional(),
  filename: z.string().max(200).optional(),
  code: text(50000),
});
export const tableBlock = z.object({
  id,
  type: z.literal("table"),
  headers: z.array(text(300)).max(12),
  rows: z.array(z.array(text(1000)).max(12)).max(200),
  caption: text(300).optional(),
});
export const faqBlock = z.object({
  id,
  type: z.literal("faq"),
  title: text(200).optional(),
  items: z.array(z.object({ q: text(500), a: text(4000) })).max(40),
});
export const ctaBlock = z.object({
  id,
  type: z.literal("cta"),
  title: text(200),
  text: text(1000).optional(),
  label: text(80),
  href: url,
  style: z.enum(["card", "banner"]).default("card"),
});
export const embedBlock = z.object({
  id,
  type: z.literal("embed"),
  url,
  title: text(200).optional(),
  aspect: z.enum(["16/9", "4/3", "1/1"]).default("16/9"),
});
export const statsBlock = z.object({
  id,
  type: z.literal("stats"),
  items: z.array(z.object({ value: text(40), label: text(200) })).max(8),
});
export const dividerBlock = z.object({ id, type: z.literal("divider") });

export const blockSchema = z.discriminatedUnion("type", [
  headingBlock,
  paragraphBlock,
  listBlock,
  imageBlock,
  galleryBlock,
  quoteBlock,
  calloutBlock,
  codeBlock,
  tableBlock,
  faqBlock,
  ctaBlock,
  embedBlock,
  statsBlock,
  dividerBlock,
]);
export type Block = z.infer<typeof blockSchema>;
export type BlockType = Block["type"];

export const authorSchema = z.object({
  name: text(120).default(""),
  role: text(120).optional(),
  avatar: url.optional(),
});

export const designSchema = z.object({
  /** Hero layout: generated artwork, a cover photo, a split photo/text hero, or text only. */
  hero: z.enum(["art", "image", "split", "minimal"]).default("art"),
  coverImage: url.optional(),
  coverAlt: text(300).optional(),
  /** Colour of the generated artwork (0-360). */
  artHue: z.number().min(0).max(360).optional(),
  artIcon: z.string().max(40).optional(),
  /** Overrides the brand accent for this article only, as #rrggbb. */
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional().or(z.literal("")),
  layout: z.enum(["sidebar", "centered"]).default("sidebar"),
  showToc: z.boolean().default(true),
  showShare: z.boolean().default(true),
  showAuthor: z.boolean().default(true),
  showRelated: z.boolean().default(true),
  showNewsletter: z.boolean().default(true),
  sidebarLinks: z.array(z.object({ label: text(120), href: url })).max(12).default([]),
  ctaBand: z
    .object({
      enabled: z.boolean().default(true),
      title: text(200).default(""),
      text: text(500).default(""),
      label: text(80).default(""),
      href: url.default(""),
    })
    .default({ enabled: true, title: "", text: "", label: "", href: "" }),
});
export type Design = z.infer<typeof designSchema>;

export const seoSchema = z.object({
  metaTitle: text(200).optional(),
  metaDescription: text(400).optional(),
  canonicalUrl: url.optional(),
  keywords: z.array(text(80)).max(30).default([]),
  noindex: z.boolean().default(false),
  ogTitle: text(200).optional(),
  ogDescription: text(400).optional(),
  ogImage: url.optional(),
  twitterCard: z.enum(["summary_large_image", "summary"]).default("summary_large_image"),
  schemaType: z.enum(["BlogPosting", "Article", "TechArticle", "NewsArticle"]).default("BlogPosting"),
});
export type Seo = z.infer<typeof seoSchema>;

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Everything a writer can set on a post. */
export const postInputSchema = z.object({
  /** The post's home site: its canonical URL, default author and CTA. Derived from `sites` when it is live. */
  site: z.enum(SITES),
  /** The websites the post is published on. Empty while it is a draft. */
  sites: z.array(z.enum(SITES)).max(SITES.length).default([]),
  title: text(300).min(1),
  slug: z.string().max(160).regex(SLUG_RE, "Use lowercase letters, numbers and hyphens"),
  excerpt: text(600).default(""),
  category: text(80).default(""),
  tags: z.array(text(60)).max(30).default([]),
  author: authorSchema.default({ name: "" }),
  status: z.enum(POST_STATUSES).default("draft"),
  /** ISO date-time. A published post with a future date stays hidden until then. */
  publishedAt: z.string().max(40).optional().nullable(),
  /** Minutes. 0 means "work it out from the text". */
  readTime: z.number().int().min(0).max(240).default(0),
  blocks: z.array(blockSchema).max(1000).default([]),
  design: designSchema.default(designSchema.parse({})),
  seo: seoSchema.default(seoSchema.parse({})),
});
export type PostInput = z.infer<typeof postInputSchema>;

export const postPatchSchema = postInputSchema.partial();
export type PostPatch = z.infer<typeof postPatchSchema>;

/** A post as stored and returned by the API. */
export type PostRecord = PostInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  source?: "admin" | "mcp";
  /** Reading time worked out from the text when the post was saved. */
  computedReadTime?: number;
};

export const emptyDesign = (): Design => designSchema.parse({});
export const emptySeo = (): Seo => seoSchema.parse({});
