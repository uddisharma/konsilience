import "server-only";
import { blocksToMarkdown } from "@/lib/blog/markdown";
import type { PostRecord } from "@/lib/blog/schema";
import { postUrl, siteConfigs } from "@/lib/blog/sites";
import { autoExcerpt } from "@/lib/blog/utils";

/*
 * One post, rendered once for every platform: title, excerpt, portable Markdown, plain paragraphs
 * (for platforms without Markdown) and the canonical link back to the post on the site.
 */

export type Payload = {
  title: string;
  excerpt: string;
  /** Markdown with absolute links and none of the site's custom ":::" blocks. */
  markdown: string;
  /** The same text as plain paragraphs. Headings start with "## ". */
  paragraphs: string[];
  canonicalUrl: string;
  tags: string[];
};

const ELLIPSIS = "…";

// Matches ":::cta" blocks (the whole block); rejects ":::faq" blocks.
// Tester: https://regex101.com/?regex=%5E:::cta%5Cn[%5Cs%5CS]*%3F%5E:::%24&flags=gm
const CTA_BLOCK = /^:::cta\n[\s\S]*?^:::$/gm;
// Matches the opening ":::faq Title" and closing ":::" lines; rejects "::: not a fence".
// Tester: https://regex101.com/?regex=%5E:::(%3F%3A%5Ba-z%5D%2B.*)%3F%24%5Cn%3F&flags=gm
const FENCE_LINE = /^:::(?:[a-z]+.*)?$\n?/gm;
// Matches "@[Video](https://y.tv/x)"; rejects "[Video](https://y.tv/x)".
// Tester: https://regex101.com/?regex=@%5C%5B(%5B%5E%5C%5D%5D*)%5C%5D%5C((%5B%5E)%5Cs%5D%2B)%5C)&flags=g
const EMBED = /@\[([^\]]*)\]\(([^)\s]+)\)/g;
// Matches "](/blog/x)" and "](/x \"caption\")"; rejects "](https://x.com)".
// Tester: https://regex101.com/?regex=%5C%5D%5C((%5C%2F%5B%5E)%5Cs%5D*)((%3F%3A%5Cs%2B%22%5B%5E%22%5D*%22)%3F)%5C)&flags=g
const ROOT_LINK = /\]\((\/[^)\s]*)((?:\s+"[^"]*")?)\)/g;

// Matches "![alt](a.png)"; rejects "[alt](a.png)".
// Tester: https://regex101.com/?regex=!%5C%5B%5B%5E%5C%5D%5D*%5C%5D%5C(%5B%5E)%5D*%5C)&flags=g
const IMAGE = /!\[[^\]]*\]\([^)]*\)/g;
// Matches "[text](url)"; rejects "text (url)".
// Tester: https://regex101.com/?regex=%5C%5B(%5B%5E%5C%5D%5D*)%5C%5D%5C(%5B%5E)%5D*%5C)&flags=g
const LINK = /\[([^\]]*)\]\([^)]*\)/g;
// Matches "- item" and "1. item"; rejects "item - x".
// Tester: https://regex101.com/?regex=%5E%5Cs*(%3F%3A%5B-*%5D%7C%5Cd%2B%5C.)%5Cs%2B&flags=gm
const LIST_MARKER = /^\s*(?:[-*]|\d+\.)\s+/gm;
// Matches "**bold**" and "*it*"; rejects "a_b".
// Tester: https://regex101.com/?regex=%5C*%5C*%7C~~%7C%60%7C%5C*&flags=g
const EMPHASIS = /\*\*|~~|`|\*/g;
// Matches "## Title"; rejects "#hashtag".
// Tester: https://regex101.com/?regex=%5E%23%7B1%2C6%7D%5Cs%2B&flags=
const HEADING = /^#{1,6}\s+/;
// Matches "a\n\nb"; rejects "a\nb".
// Tester: https://regex101.com/?regex=%5Cn%7B2%2C%7D&flags=
const BLANK_LINES = /\n{2,}/;
// Matches "```ts" and a closing "```"; rejects "``".
// Tester: https://regex101.com/?regex=%5E%60%7B3%7D%5B%5E%5Cn%5D*%5Cn%3F%7C%5Cn%3F%60%7B3%7D%24&flags=gm
const CODE_FENCE = /^`{3}[^\n]*\n?|\n?`{3}$/gm;

/** Turns the site's Markdown into Markdown that dev.to and Hashnode understand. */
export function toPortableMarkdown(md: string, siteBase: string): string {
  return md
    .replace(CTA_BLOCK, "")
    .replace(FENCE_LINE, "")
    .replace(EMBED, "[$1]($2)")
    .replace(ROOT_LINK, `](${siteBase}$1$2)`);
}

/** Plain paragraphs from Markdown: headings keep a "## " prefix, links keep their text. */
export function markdownParagraphs(md: string): string[] {
  return md
    .split(BLANK_LINES)
    .map((block) => plainBlock(block.trim()))
    .filter((block) => block.length > 0);
}

function plainBlock(block: string): string {
  if (HEADING.test(block)) return `## ${block.replace(HEADING, "")}`;
  return block
    .replace(CODE_FENCE, "")
    .replace(IMAGE, "")
    .replace(LINK, "$1")
    .replace(LIST_MARKER, "")
    .replace(EMPHASIS, "")
    .trim();
}

export function buildPayload(post: PostRecord): Payload {
  const cfg = siteConfigs[post.site];
  const canonicalUrl = postUrl(post.site, post.slug);
  const body = toPortableMarkdown(blocksToMarkdown(post.blocks), cfg.baseUrl).trim();
  const markdown = `${body}\n\nOriginally published on ${cfg.name}: ${canonicalUrl}\n`;
  return {
    title: post.title,
    excerpt: post.excerpt.trim() || autoExcerpt(post.blocks),
    markdown,
    paragraphs: markdownParagraphs(markdown),
    canonicalUrl,
    tags: post.tags,
  };
}

/** Cuts text to `max` characters (counted by code point), adding an ellipsis when it is shortened. */
export function truncate(text: string, max: number): string {
  const chars = Array.from(text);
  if (chars.length <= max) return text;
  return `${chars.slice(0, max - ELLIPSIS.length).join("").trimEnd()}${ELLIPSIS}`;
}

// Matches "C#" and "-"; rejects "c3".
// Tester: https://regex101.com/?regex=%5B%5Ea-z0-9%5D&flags=g
const NOT_LOWER_ALNUM = /[^a-z0-9]/g;
// Matches "a  b" (two spaces); rejects "ab".
// Tester: https://regex101.com/?regex=%5Cs%2B&flags=g
const WHITESPACE = /\s+/g;

/** dev.to tags: lowercase letters and numbers only, at most `max`, no repeats. */
export function devtoTags(tags: string[], max: number): string[] {
  const clean = tags.map((t) => t.toLowerCase().replace(NOT_LOWER_ALNUM, "")).filter((t) => t.length > 0);
  return [...new Set(clean)].slice(0, max);
}

/** Hashnode tag slug: lowercase, spaces become hyphens. */
export const hashnodeSlug = (tag: string): string => tag.trim().toLowerCase().replace(WHITESPACE, "-");
