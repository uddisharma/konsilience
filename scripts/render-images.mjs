// Renders every image in lib/image-registry.ts from the dev-only /render-kit canvas.
//
//   1. npm run dev                                   (keep it running)
//   2. node scripts/capture-sources.mjs              (real screenshots the compositions use)
//   3. node scripts/render-images.mjs [id-filter]
//
// Output per entry, under public/images/<file>:
//   .webp (primary, q82) + .jpg fallback (opaque) or .png fallback (transparent card art)
//   and, for entries with `og`, public/images/og/<name>.jpg at 1200×630.
// Headless Chrome via puppeteer-core (uses the installed Chrome), screenshots at 2x, encoded with sharp.

import { existsSync, mkdirSync, statSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const BASE = process.env.RENDER_BASE ?? "http://localhost:3000";
const OUT = join(process.cwd(), "public", "images");
const filter = process.argv[2] ?? "";

const CHROME = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].find((p) => p && existsSync(p));
if (!CHROME) throw new Error("Chrome not found. Set CHROME_PATH.");

// CSS viewport (rendered at 2x) and final pixel size per registry size.
const SIZES = {
  hero: { w: 1200, h: 900, out: [1600, 1200] },
  wide: { w: 1200, h: 675, out: [1600, 900] },
  cover: { w: 1200, h: 750, out: [1200, 750] },
  case: { w: 1200, h: 750, out: [1600, 1000] },
  card: { w: 1200, h: 900, out: [1200, 900] },
};

const res = await fetch(`${BASE}/render-kit/manifest`);
if (!res.ok) throw new Error(`manifest: ${res.status}. Is \`npm run dev\` running?`);
const entries = (await res.json()).filter((e) => e.id.includes(filter));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars", "--force-color-profile=srgb"] });
const page = await browser.newPage();

async function shoot(url, w, h, transparent) {
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
  const r = await page.goto(url, { waitUntil: "networkidle0", timeout: 180_000 });
  if (!r?.ok()) throw new Error(`${url}: HTTP ${r?.status()}`);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((ok) => (i.onload = i.onerror = ok)))));
  });
  // Fail loudly if the brand fonts did not load: never ship a fallback font.
  const fonts = await page.evaluate(() => [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family).join("|"));
  if (!/Jakarta/i.test(fonts)) throw new Error(`${url}: Plus Jakarta Sans not loaded (${fonts})`);
  return page.screenshot({ type: "png", omitBackground: transparent });
}

const kb = (f) => `${(statSync(f).size / 1024).toFixed(0)} KB`;
for (const e of entries) {
  const s = SIZES[e.size];
  const png = await shoot(`${BASE}/render-kit/${e.id}`, s.w, s.h, e.transparent);
  const base = join(OUT, e.file);
  mkdirSync(dirname(base), { recursive: true });
  const img = () => sharp(png).resize(s.out[0], s.out[1], { fit: "fill" });
  await img().webp({ quality: 82, alphaQuality: 90, effort: 6 }).toFile(`${base}.webp`);
  const fallback = e.transparent ? `${base}.png` : `${base}.jpg`;
  if (e.transparent) await img().png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(fallback);
  else {
    // dense halftones compress poorly: step the quality down until the fallback is under 200 KB
    for (const q of [82, 76, 70, 64]) {
      await img().flatten({ background: e.bg }).jpeg({ quality: q, mozjpeg: true }).toFile(fallback);
      if (statSync(fallback).size < 200 * 1024) break;
    }
  }
  console.log(`✓ ${e.file}.webp ${kb(`${base}.webp`)} · ${basename(fallback)} ${kb(fallback)}`);

  if (e.og) {
    const ogPng = await shoot(`${BASE}/render-kit/${e.id}?og=1`, 1200, 630, false);
    const ogFile = join(OUT, "og", `${basename(e.file)}.jpg`);
    mkdirSync(dirname(ogFile), { recursive: true });
    await sharp(ogPng).resize(1200, 630, { fit: "fill" }).jpeg({ quality: 84, mozjpeg: true }).toFile(ogFile);
    console.log(`  og/${basename(e.file)}.jpg ${kb(ogFile)}`);
  }
}
await browser.close();
