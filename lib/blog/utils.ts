import { plain } from "./inline";
import type { Block } from "./schema";

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120)
    .replace(/-+$/g, "");
}

export function newBlockId() {
  return Math.random().toString(36).slice(2, 10);
}

/** All readable text in a block, as plain text. */
export function blockText(b: Block): string {
  switch (b.type) {
    case "heading":
    case "paragraph":
      return plain(b.text);
    case "list":
      return b.items.map(plain).join(" ");
    case "quote":
      return `${plain(b.text)} ${b.cite ?? ""}`;
    case "callout":
      return `${b.title ?? ""} ${plain(b.text)}`;
    case "code":
      return b.code;
    case "table":
      return [...b.headers, ...b.rows.flat()].map(plain).join(" ");
    case "faq":
      return b.items.map((i) => `${i.q} ${plain(i.a)}`).join(" ");
    case "cta":
      return `${b.title} ${b.text ?? ""}`;
    case "stats":
      return b.items.map((i) => `${i.value} ${i.label}`).join(" ");
    case "image":
      return b.caption ?? "";
    case "gallery":
      return b.images.map((i) => i.caption ?? "").join(" ");
    default:
      return "";
  }
}

const WORDS_PER_MINUTE = 220;

export function wordCount(blocks: Block[]) {
  return blocks.map(blockText).join(" ").split(/\s+/).filter(Boolean).length;
}

export function readingTime(blocks: Block[]) {
  return Math.max(1, Math.round(wordCount(blocks) / WORDS_PER_MINUTE));
}

export type TocItem = { id: string; text: string; level: number };

/** Gives every heading a unique anchor (its own, or one made from its text). */
export function withAnchors(blocks: Block[]): Block[] {
  const used = new Set<string>();
  return blocks.map((b) => {
    if (b.type !== "heading") return b;
    const base = slugify(b.anchor || plain(b.text)) || "section";
    let anchor = base;
    for (let n = 2; used.has(anchor); n++) anchor = `${base}-${n}`;
    used.add(anchor);
    return { ...b, anchor };
  });
}

export function tableOfContents(blocks: Block[], maxLevel = 2): TocItem[] {
  return withAnchors(blocks)
    .filter((b): b is Extract<Block, { type: "heading" }> => b.type === "heading" && b.level <= maxLevel)
    .map((b) => ({ id: b.anchor!, text: plain(b.text), level: b.level }));
}

/** Converts a YouTube, Vimeo or Loom page URL into its embeddable player URL. */
export function embedSrc(raw: string): string | null {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return null;
  }
  if (u.protocol !== "https:") return null;
  const host = u.hostname.replace(/^www\./, "");
  if (host === "youtube.com" || host === "m.youtube.com") {
    const v = u.searchParams.get("v") ?? (u.pathname.startsWith("/shorts/") ? u.pathname.split("/")[2] : null);
    if (v) return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(v)}`;
    if (u.pathname.startsWith("/embed/")) return `https://www.youtube-nocookie.com${u.pathname}`;
  }
  if (host === "youtu.be") return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(u.pathname.slice(1))}`;
  if (host === "vimeo.com" && /^\/\d+/.test(u.pathname)) return `https://player.vimeo.com/video${u.pathname}`;
  if (host === "loom.com" && u.pathname.startsWith("/share/")) return `https://www.loom.com/embed/${u.pathname.split("/")[2]}`;
  return u.toString();
}

/** First paragraph as plain text, used when a post has no excerpt. */
export function autoExcerpt(blocks: Block[], max = 180) {
  const p = blocks.find((b) => b.type === "paragraph");
  const t = p ? blockText(p) : "";
  return t.length > max ? `${t.slice(0, max - 1).replace(/\s+\S*$/, "")}…` : t;
}

/** "#2563eb" -> "37 99 235" (the format of the --brand-rgb CSS variable). */
export function hexToRgbTriplet(hex: string | undefined): string | null {
  if (!hex || !/^#[0-9a-f]{6}$/i.test(hex)) return null;
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}
