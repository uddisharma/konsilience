/*
 * Inline Markdown: **bold**, *italic* / _italic_, `code`, ~~strike~~, [label](href) and line breaks.
 * Parsed into tokens (never into raw HTML), so the React and HTML renderers both escape safely.
 */

export type InlineToken =
  | { t: "text"; v: string }
  | { t: "br" }
  | { t: "code"; v: string }
  | { t: "strong" | "em" | "del"; c: InlineToken[] }
  | { t: "link"; href: string; c: InlineToken[] };

const SAFE_HREF = /^(https?:\/\/|mailto:|tel:|\/|#)/i;

/** Returns the href if it is safe to put in a link, otherwise null. */
export function safeHref(href: string | undefined | null): string | null {
  const h = (href ?? "").trim();
  if (!h || !SAFE_HREF.test(h) || h.startsWith("//")) return null;
  return h;
}

const isWordChar = (c: string | undefined) => !!c && /[\p{L}\p{N}]/u.test(c);

function findClosingBracket(s: string, from: number): number {
  let depth = 0;
  for (let i = from; i < s.length; i++) {
    if (s[i] === "\\") i++;
    else if (s[i] === "[") depth++;
    else if (s[i] === "]" && --depth === 0) return i;
  }
  return -1;
}

export function parseInline(s: string): InlineToken[] {
  const out: InlineToken[] = [];
  let buf = "";
  const flush = () => {
    if (buf) out.push({ t: "text", v: buf });
    buf = "";
  };

  let i = 0;
  while (i < s.length) {
    const ch = s[i];

    if (ch === "\\" && i + 1 < s.length && /[\\`*_~[\]()#>!|-]/.test(s[i + 1])) {
      buf += s[i + 1];
      i += 2;
      continue;
    }
    if (ch === "\n") {
      flush();
      out.push({ t: "br" });
      i++;
      continue;
    }
    if (ch === "`") {
      const end = s.indexOf("`", i + 1);
      if (end > i + 1) {
        flush();
        out.push({ t: "code", v: s.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }
    if (s.startsWith("**", i) || s.startsWith("__", i)) {
      const mark = s.slice(i, i + 2);
      const end = s.indexOf(mark, i + 2);
      if (end > i + 2) {
        flush();
        out.push({ t: "strong", c: parseInline(s.slice(i + 2, end)) });
        i = end + 2;
        continue;
      }
    }
    if (s.startsWith("~~", i)) {
      const end = s.indexOf("~~", i + 2);
      if (end > i + 2) {
        flush();
        out.push({ t: "del", c: parseInline(s.slice(i + 2, end)) });
        i = end + 2;
        continue;
      }
    }
    if ((ch === "*" || ch === "_") && s[i + 1] !== " " && !(ch === "_" && isWordChar(s[i - 1]))) {
      let end = s.indexOf(ch, i + 1);
      while (end > -1 && ch === "_" && isWordChar(s[end + 1])) end = s.indexOf(ch, end + 1);
      if (end > i + 1 && s[end - 1] !== " ") {
        flush();
        out.push({ t: "em", c: parseInline(s.slice(i + 1, end)) });
        i = end + 1;
        continue;
      }
    }
    if (ch === "[") {
      const close = findClosingBracket(s, i);
      if (close > -1 && s[close + 1] === "(") {
        const end = s.indexOf(")", close + 2);
        if (end > -1) {
          const href = s.slice(close + 2, end).trim().split(/\s+/)[0];
          flush();
          out.push({ t: "link", href, c: parseInline(s.slice(i + 1, close)) });
          i = end + 1;
          continue;
        }
      }
    }
    buf += ch;
    i++;
  }
  flush();
  return out;
}

export function tokensToText(tokens: InlineToken[]): string {
  return tokens
    .map((t) => (t.t === "text" || t.t === "code" ? t.v : t.t === "br" ? " " : tokensToText(t.c)))
    .join("");
}

/** Inline Markdown to plain text (for meta tags, reading time, schema). */
export const plain = (s: string | undefined) => (s ? tokensToText(parseInline(s)) : "");

export const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export function tokensToHtml(tokens: InlineToken[]): string {
  return tokens
    .map((t) => {
      switch (t.t) {
        case "text":
          return escapeHtml(t.v);
        case "br":
          return "<br>";
        case "code":
          return `<code>${escapeHtml(t.v)}</code>`;
        case "strong":
          return `<strong>${tokensToHtml(t.c)}</strong>`;
        case "em":
          return `<em>${tokensToHtml(t.c)}</em>`;
        case "del":
          return `<del>${tokensToHtml(t.c)}</del>`;
        case "link": {
          const href = safeHref(t.href);
          if (!href) return tokensToHtml(t.c);
          const ext = /^https?:\/\//i.test(href);
          return `<a href="${escapeHtml(href)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ""}>${tokensToHtml(t.c)}</a>`;
        }
      }
    })
    .join("");
}

export const inlineHtml = (s: string | undefined) => (s ? tokensToHtml(parseInline(s)) : "");
