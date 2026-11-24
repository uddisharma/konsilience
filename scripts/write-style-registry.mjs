// Writes docs/image-style-registry.md from lib/image-registry.ts (run after editing the registry).
import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync(new URL("../lib/image-registry.ts", import.meta.url), "utf8");
const entryRe = /\{ id: "([^"]+)", file: "([^"]+)", page: "([^"]+)", section: "([^"]+)", purpose: "([^"]+)",\s*technique: "(\w+)", layout: "(\w+)", palette: \[([^\]]+)\], size: "(\w+)"(?:, og: "([^"]+)")?,\s*alt: "((?:[^"\\]|\\.)*)" \}/g;
const rows = [...src.matchAll(entryRe)];
const names = Object.fromEntries([...src.matchAll(/^\s+(\w+): "([^"]+)",$/gm)].map(([, k, v]) => [k, v]));

const lines = [
  "# Image style registry",
  "",
  "Generated from `lib/image-registry.ts` by `node scripts/write-style-registry.mjs`. Every image has its own",
  "technique + layout + palette; images on the same page never share a technique, layout or palette",
  "(enforced by `node scripts/check-image-registry.mjs`).",
  "",
  "- Fonts: Plus Jakarta Sans 500/600 and Barlow Condensed 600 (the site's own `next/font` files, loaded by the dev server). Code uses the site's `font-mono` stack.",
  "- Texture: grain 3–6 %, crisp 1px rules. No gradients, glows, bokeh, blur shadows, 3D blobs or icon clichés.",
  "- Logo: `konsilience-white.png` on dark, `konsilience-black.png` on light; only on share images and the case-study cover.",
  "- Real content only: service names, offerings, page copy, sensible code. No invented metrics.",
  "",
  "| # | File | Page | Section | Technique | Layout | Palette (bg / ink / accent) | Size |",
  "|---|---|---|---|---|---|---|---|",
  ...rows.map(([, , file, page, section, , t, l, pal, size, og], i) =>
    `| ${i + 1} | \`${file}.webp\` | ${page} | ${section} | ${names[t] ?? t} | ${names[l] ?? l} | ${pal.replaceAll('"', "").replaceAll(", ", " / ")} | ${size}${og ? " + share" : ""} |`,
  ),
  "",
];
writeFileSync(new URL("../docs/image-style-registry.md", import.meta.url), lines.join("\n"));
console.log(`docs/image-style-registry.md: ${rows.length} rows`);
