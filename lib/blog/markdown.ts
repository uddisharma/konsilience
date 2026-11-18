import type { Block } from "./schema";
import { newBlockId } from "./utils";

/*
 * Markdown <-> blocks.
 *
 * Standard Markdown: ## headings, paragraphs, - / 1. / - [ ] lists, > quotes, ``` code fences,
 * | tables |, --- dividers, ![alt](url "caption") images on their own line.
 *
 * Extensions (one per line or as ::: containers):
 *   > [!TIP] Optional title          callout (NOTE / INFO / TIP / WARNING / CAUTION / SUCCESS)
 *   @[Video title](https://youtu.be/...)   embed
 *   ## Heading {#custom-anchor}      heading anchor
 *   :::steps  (a list)  :::          numbered step cards
 *   :::faq Title  ### Question / answer ...  :::
 *   :::cta  title: / text: / label: / href: / style: banner  :::
 *   :::stats  42% | Label  :::
 *   :::gallery  ![alt](url "caption") ...  :::
 */

type NoId<T> = T extends unknown ? Omit<T, "id"> : never;
const mk = (b: NoId<Block>): Block => ({ id: newBlockId(), ...b }) as Block;

const FENCE = /^(```|~~~)\s*([\w+-]*)\s*(.*)$/;
const HEADING = /^(#{1,6})\s+(.*?)\s*(?:\{#([\w-]+)\})?\s*#*\s*$/;
const DIVIDER = /^(-{3,}|\*{3,}|_{3,})\s*$/;
const IMAGE = /^!\[([^\]]*)\]\(\s*(\S+?)(?:\s+"([^"]*)")?\s*\)$/;
const EMBED = /^@\[([^\]]*)\]\(\s*(\S+?)\s*\)$/;
const CONTAINER = /^:::\s*([\w-]+)\s*(.*)$/;
const LIST_ITEM = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;
const TABLE_SEP = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;

const CALLOUT_TONES: Record<string, "info" | "tip" | "warning" | "success"> = {
  NOTE: "info",
  INFO: "info",
  IMPORTANT: "info",
  TIP: "tip",
  WARNING: "warning",
  CAUTION: "warning",
  DANGER: "warning",
  SUCCESS: "success",
  CHECK: "success",
};

function isBlockStart(line: string, next?: string) {
  return (
    FENCE.test(line) ||
    HEADING.test(line) ||
    DIVIDER.test(line) ||
    IMAGE.test(line.trim()) ||
    EMBED.test(line.trim()) ||
    CONTAINER.test(line) ||
    LIST_ITEM.test(line) ||
    line.startsWith(">") ||
    (line.trim().startsWith("|") && !!next && TABLE_SEP.test(next))
  );
}

const splitRow = (line: string) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split(/(?<!\\)\|/)
    .map((c) => c.trim().replace(/\\\|/g, "|"));

function parseList(lines: string[]): Block {
  const items: string[] = [];
  let numbered = false;
  let check = false;
  for (const line of lines) {
    const m = line.match(LIST_ITEM);
    if (m && m[1].length < 2) {
      if (/\d/.test(m[2])) numbered = true;
      let t = m[3];
      const c = t.match(/^\[( |x|X)\]\s+(.*)$/);
      if (c) {
        check = true;
        t = c[2];
      }
      items.push(t);
    } else if (items.length) {
      const sub = line.match(LIST_ITEM);
      items[items.length - 1] += sub ? `\n• ${sub[3]}` : ` ${line.trim()}`;
    }
  }
  return mk({ type: "list", style: check ? "check" : numbered ? "numbered" : "bullet", items });
}

function parseKeyValues(lines: string[]) {
  const out: Record<string, string> = {};
  for (const l of lines) {
    const m = l.match(/^\s*([\w-]+)\s*:\s*(.*)$/);
    if (m) out[m[1].toLowerCase()] = m[2].trim();
  }
  return out;
}

function parseContainer(kind: string, arg: string, body: string[]): Block[] {
  const k = kind.toLowerCase();
  if (k === "steps") {
    const inner = markdownToBlocks(body.join("\n"));
    return inner.map((b) => (b.type === "list" ? { ...b, style: "steps" as const } : b));
  }
  if (k === "faq") {
    const items: { q: string; a: string }[] = [];
    for (const line of body) {
      const h = line.match(/^#{1,6}\s+(.*)$/) ?? line.match(/^\*\*Q:?\*\*:?\s*(.*)$/) ?? line.match(/^Q:\s*(.*)$/);
      if (h) items.push({ q: h[1].trim(), a: "" });
      else if (items.length) {
        const a = line.replace(/^\*\*A:?\*\*:?\s*/, "").replace(/^A:\s*/, "");
        const cur = items[items.length - 1];
        cur.a = cur.a ? (a.trim() ? `${cur.a}${line.trim() ? " " : ""}${a.trim()}` : `${cur.a}\n`) : a.trim();
      }
    }
    return [mk({ type: "faq", title: arg || undefined, items: items.map((i) => ({ q: i.q, a: i.a.trim() })) })];
  }
  if (k === "cta") {
    const kv = parseKeyValues(body);
    return [
      mk({
        type: "cta",
        title: kv.title ?? arg ?? "",
        text: kv.text,
        label: kv.label ?? "Learn more",
        href: kv.href ?? kv.link ?? "/contact#book",
        style: kv.style === "banner" ? "banner" : "card",
      }),
    ];
  }
  if (k === "stats") {
    const items = body
      .filter((l) => l.includes("|"))
      .map((l) => {
        const [value, ...rest] = splitRow(l);
        return { value, label: rest.join(" ") };
      });
    return [mk({ type: "stats", items })];
  }
  if (k === "gallery") {
    const images = body
      .map((l) => l.trim().match(IMAGE))
      .filter((m): m is RegExpMatchArray => !!m)
      .map((m) => ({ alt: m[1], url: m[2], caption: m[3] }));
    return [mk({ type: "gallery", columns: images.length % 3 === 0 ? 3 : 2, images })];
  }
  const tone = CALLOUT_TONES[k.toUpperCase()] ?? (k === "callout" ? "info" : null);
  if (tone || k === "callout") {
    let title = arg;
    let t = tone ?? "info";
    if (k === "callout") {
      const [first, ...rest] = arg.split(/\s+/);
      if (first && CALLOUT_TONES[first.toUpperCase()]) {
        t = CALLOUT_TONES[first.toUpperCase()];
        title = rest.join(" ");
      }
    }
    return [mk({ type: "callout", tone: t, title: title || undefined, text: body.join("\n").trim() })];
  }
  return markdownToBlocks(body.join("\n"));
}

export function markdownToBlocks(md: string): Block[] {
  const lines = md.replace(/\r\n?/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) {
      i++;
      continue;
    }

    const fence = line.match(FENCE);
    if (fence) {
      const close = fence[1];
      const body: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(close)) body.push(lines[i++]);
      i++;
      blocks.push(mk({ type: "code", language: fence[2] || undefined, filename: fence[3] || undefined, code: body.join("\n") }));
      continue;
    }

    const container = line.match(CONTAINER);
    if (container) {
      const body: string[] = [];
      let depth = 1;
      i++;
      while (i < lines.length) {
        if (CONTAINER.test(lines[i])) depth++;
        else if (lines[i].trim() === ":::" && --depth === 0) break;
        body.push(lines[i++]);
      }
      i++;
      blocks.push(...parseContainer(container[1], container[2].trim(), body));
      continue;
    }

    const heading = line.match(HEADING);
    if (heading) {
      const level = Math.min(4, Math.max(2, heading[1].length)) as 2 | 3 | 4;
      blocks.push(mk({ type: "heading", level, text: heading[2], anchor: heading[3] }));
      i++;
      continue;
    }

    if (DIVIDER.test(line)) {
      blocks.push(mk({ type: "divider" }));
      i++;
      continue;
    }

    const image = trimmed.match(IMAGE);
    if (image) {
      blocks.push(mk({ type: "image", alt: image[1], url: image[2], caption: image[3], size: "content" }));
      i++;
      continue;
    }

    const embed = trimmed.match(EMBED);
    if (embed) {
      blocks.push(mk({ type: "embed", title: embed[1] || undefined, url: embed[2], aspect: "16/9" }));
      i++;
      continue;
    }

    if (line.startsWith(">")) {
      const body: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) body.push(lines[i++].replace(/^>\s?/, ""));
      const callout = body[0]?.match(/^\[!(\w+)\]\s*(.*)$/);
      if (callout) {
        blocks.push(
          mk({
            type: "callout",
            tone: CALLOUT_TONES[callout[1].toUpperCase()] ?? "info",
            title: callout[2] || undefined,
            text: body.slice(1).join("\n").trim(),
          }),
        );
      } else {
        let cite: string | undefined;
        const last = body[body.length - 1]?.match(/^(?:—|--|-)\s+(.*)$/);
        if (last && body.length > 1) {
          cite = last[1];
          body.pop();
        }
        blocks.push(mk({ type: "quote", text: body.join("\n").trim(), cite }));
      }
      continue;
    }

    if (trimmed.startsWith("|") && lines[i + 1] && TABLE_SEP.test(lines[i + 1])) {
      const headers = splitRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) rows.push(splitRow(lines[i++]));
      blocks.push(mk({ type: "table", headers, rows }));
      continue;
    }

    if (LIST_ITEM.test(line)) {
      const body: string[] = [];
      while (i < lines.length && lines[i].trim() && (LIST_ITEM.test(lines[i]) || /^\s+\S/.test(lines[i]))) body.push(lines[i++]);
      blocks.push(parseList(body));
      continue;
    }

    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !(para.length && isBlockStart(lines[i], lines[i + 1]))) {
      para.push(lines[i].trim());
      i++;
    }
    // Two trailing spaces in Markdown mean a hard line break; otherwise lines join with a space.
    blocks.push(mk({ type: "paragraph", text: para.join(" ") }));
  }

  return blocks;
}

const esc = (s: string) => s.replace(/\|/g, "\\|");

export function blocksToMarkdown(blocks: Block[]): string {
  const out: string[] = [];
  for (const b of blocks) {
    switch (b.type) {
      case "heading":
        out.push(`${"#".repeat(b.level)} ${b.text}${b.anchor ? ` {#${b.anchor}}` : ""}`);
        break;
      case "paragraph":
        out.push(b.text);
        break;
      case "list": {
        const lines = b.items.map((t, n) =>
          b.style === "numbered" || b.style === "steps" ? `${n + 1}. ${t}` : b.style === "check" ? `- [x] ${t}` : `- ${t}`,
        );
        out.push(b.style === "steps" ? `:::steps\n${lines.join("\n")}\n:::` : lines.join("\n"));
        break;
      }
      case "image":
        out.push(`![${b.alt}](${b.url}${b.caption ? ` "${b.caption.replace(/"/g, "'")}"` : ""})`);
        break;
      case "gallery":
        out.push(`:::gallery\n${b.images.map((m) => `![${m.alt}](${m.url}${m.caption ? ` "${m.caption}"` : ""})`).join("\n")}\n:::`);
        break;
      case "quote":
        out.push(`${b.text.split("\n").map((l) => `> ${l}`).join("\n")}${b.cite ? `\n> — ${b.cite}` : ""}`);
        break;
      case "callout":
        out.push(`> [!${b.tone.toUpperCase()}]${b.title ? ` ${b.title}` : ""}\n${b.text.split("\n").map((l) => `> ${l}`).join("\n")}`);
        break;
      case "code":
        out.push(`\`\`\`${b.language ?? ""}${b.filename ? ` ${b.filename}` : ""}\n${b.code}\n\`\`\``);
        break;
      case "table":
        out.push(
          [
            `| ${b.headers.map(esc).join(" | ")} |`,
            `| ${b.headers.map(() => "---").join(" | ")} |`,
            ...b.rows.map((r) => `| ${r.map(esc).join(" | ")} |`),
          ].join("\n"),
        );
        break;
      case "faq":
        out.push(`:::faq${b.title ? ` ${b.title}` : ""}\n${b.items.map((i) => `### ${i.q}\n${i.a}`).join("\n\n")}\n:::`);
        break;
      case "cta":
        out.push(
          `:::cta\ntitle: ${b.title}\n${b.text ? `text: ${b.text}\n` : ""}label: ${b.label}\nhref: ${b.href}\n${b.style === "banner" ? "style: banner\n" : ""}:::`,
        );
        break;
      case "embed":
        out.push(`@[${b.title ?? ""}](${b.url})`);
        break;
      case "stats":
        out.push(`:::stats\n${b.items.map((i) => `${esc(i.value)} | ${esc(i.label)}`).join("\n")}\n:::`);
        break;
      case "divider":
        out.push("---");
        break;
    }
  }
  return out.join("\n\n") + "\n";
}

export const MARKDOWN_GUIDE = `Body format: Markdown with these extensions.
- "## Heading" for main sections (they build the table of contents), "### Sub-heading" for sub-points. Do not use "#" (the title is separate).
- Inline: **bold**, *italic*, \`code\`, [link text](/internal-path or https://...).
- Lists: "- item", "1. item", "- [x] checklist item". Wrap a numbered list in ":::steps" ... ":::" for step cards.
- "> quote" with optional last line "> — Name, Role".
- Callouts: "> [!TIP] Optional title" then "> text" lines. Tones: NOTE, TIP, WARNING, SUCCESS.
- Code: \`\`\`ts optional-filename.ts ... \`\`\`.
- Tables: GitHub pipe tables.
- Image on its own line: ![alt text](https://url "optional caption").
- Video: @[Video title](https://www.youtube.com/watch?v=...).
- "---" divider.
- FAQ (also adds FAQ rich-result schema):
  :::faq Frequently asked questions
  ### Question one?
  Answer one.
  :::
- Call to action box:
  :::cta
  title: Want help with this?
  text: One line of supporting text.
  label: Book a 15-min call
  href: /contact#book
  :::
- Key numbers: ":::stats" then lines "42% | What the number means" then ":::".`;
