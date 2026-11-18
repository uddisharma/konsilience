import { escapeHtml as e, inlineHtml as md, safeHref } from "./inline";
import type { Block } from "./schema";
import { embedSrc, withAnchors } from "./utils";

/*
 * Blocks -> semantic HTML, for sites that do not run this codebase (trasys.dev).
 * Every element carries a "kb-" class so the consuming site can style it.
 */

const attr = (href: string | null) => (href ? e(href) : "#");

function block(b: Block): string {
  switch (b.type) {
    case "heading":
      return `<h${b.level} id="${e(b.anchor ?? "")}" class="kb-heading">${md(b.text)}</h${b.level}>`;
    case "paragraph":
      return `<p class="kb-p">${md(b.text)}</p>`;
    case "list": {
      const tag = b.style === "numbered" || b.style === "steps" ? "ol" : "ul";
      return `<${tag} class="kb-list kb-list-${b.style}">${b.items.map((i) => `<li>${md(i)}</li>`).join("")}</${tag}>`;
    }
    case "image": {
      const img = `<img src="${attr(safeHref(b.url))}" alt="${e(b.alt)}" loading="lazy">`;
      const link = safeHref(b.link);
      return `<figure class="kb-image kb-image-${b.size}">${link ? `<a href="${e(link)}">${img}</a>` : img}${b.caption ? `<figcaption>${md(b.caption)}</figcaption>` : ""}</figure>`;
    }
    case "gallery":
      return `<div class="kb-gallery kb-cols-${b.columns}">${b.images
        .map((m) => `<figure><img src="${attr(safeHref(m.url))}" alt="${e(m.alt)}" loading="lazy">${m.caption ? `<figcaption>${md(m.caption)}</figcaption>` : ""}</figure>`)
        .join("")}</div>`;
    case "quote":
      return `<blockquote class="kb-quote"><p>${md(b.text)}</p>${b.cite ? `<cite>${e(b.cite)}</cite>` : ""}</blockquote>`;
    case "callout":
      return `<aside class="kb-callout kb-callout-${b.tone}">${b.title ? `<strong>${e(b.title)}</strong>` : ""}<p>${md(b.text)}</p></aside>`;
    case "code":
      return `<figure class="kb-code">${b.filename ? `<figcaption>${e(b.filename)}</figcaption>` : ""}<pre><code${b.language ? ` class="language-${e(b.language)}"` : ""}>${e(b.code)}</code></pre></figure>`;
    case "table":
      return `<div class="kb-table"><table>${b.caption ? `<caption>${e(b.caption)}</caption>` : ""}<thead><tr>${b.headers.map((h) => `<th>${md(h)}</th>`).join("")}</tr></thead><tbody>${b.rows
        .map((r) => `<tr>${r.map((c) => `<td>${md(c)}</td>`).join("")}</tr>`)
        .join("")}</tbody></table></div>`;
    case "faq":
      return `<section class="kb-faq">${b.title ? `<h2>${e(b.title)}</h2>` : ""}${b.items
        .map((i) => `<details><summary>${e(i.q)}</summary><p>${md(i.a)}</p></details>`)
        .join("")}</section>`;
    case "cta":
      return `<aside class="kb-cta kb-cta-${b.style}"><strong>${e(b.title)}</strong>${b.text ? `<p>${md(b.text)}</p>` : ""}<a href="${attr(safeHref(b.href))}">${e(b.label)}</a></aside>`;
    case "embed": {
      const src = embedSrc(b.url);
      return src
        ? `<div class="kb-embed" style="aspect-ratio:${b.aspect}"><iframe src="${e(src)}" title="${e(b.title ?? "Embedded media")}" loading="lazy" allowfullscreen></iframe></div>`
        : "";
    }
    case "stats":
      return `<div class="kb-stats">${b.items.map((i) => `<div><strong>${e(i.value)}</strong><span>${e(i.label)}</span></div>`).join("")}</div>`;
    case "divider":
      return `<hr class="kb-divider">`;
  }
}

export function blocksToHtml(blocks: Block[]): string {
  return withAnchors(blocks).map(block).join("\n");
}
