// Verifies the art-direction rules in lib/image-registry.ts:
//  1. every image has a unique technique + layout + palette combination, and its own palette;
//  2. images on the same page never share a technique, a layout or a palette.
// Run: node scripts/check-image-registry.mjs   (exits 1 on any violation)

import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../lib/image-registry.ts", import.meta.url), "utf8");
const entries = [...src.matchAll(/\{ id: "([^"]+)", file: "[^"]+", page: "([^"]+)"[\s\S]*?technique: "(\w+)", layout: "(\w+)", palette: (\[[^\]]+\])/g)].map(
  ([, id, page, technique, layout, palette]) => ({ id, page, technique, layout, palette }),
);

const errors = [];
const combos = new Map();
for (const e of entries) {
  const k = `${e.technique}/${e.layout}/${e.palette}`;
  if (combos.has(k)) errors.push(`Same combination ${k}: ${combos.get(k)} and ${e.id}`);
  combos.set(k, e.id);
}
const palettes = new Map();
for (const e of entries) {
  if (palettes.has(e.palette)) errors.push(`Palette ${e.palette} reused by ${palettes.get(e.palette)} and ${e.id}`);
  palettes.set(e.palette, e.id);
}
const byPage = Object.groupBy(entries, (e) => e.page);
for (const [page, list] of Object.entries(byPage)) {
  for (const field of ["technique", "layout", "palette"]) {
    const seen = new Map();
    for (const e of list) {
      if (seen.has(e[field])) errors.push(`${page}: ${seen.get(e[field])} and ${e.id} share ${field} "${e[field]}"`);
      seen.set(e[field], e.id);
    }
  }
}

console.log(`${entries.length} images, ${combos.size} unique combinations, ${Object.keys(byPage).length} pages`);
if (errors.length) {
  console.error(errors.map((e) => "✗ " + e).join("\n"));
  process.exit(1);
}
console.log("✓ all art-direction rules pass");
