// Renders every case-study logo from the dev-only /render-kit/logos/<slug> canvas (app/render-kit/logos.tsx)
// to public/images/logos/<slug>.png, 480×480. Needs `npm run dev` running:
//   node scripts/render-logos.mjs [slug-filter]

import { existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const BASE = process.env.RENDER_BASE ?? "http://localhost:3000";
const OUT = join(process.cwd(), "public", "images", "logos");
const filter = process.argv[2] ?? "";
const CHROME = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome"].find((p) => p && existsSync(p));
if (!CHROME) throw new Error("Chrome not found. Set CHROME_PATH.");

const slugify = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const src = readFileSync(new URL("../lib/catalog.ts", import.meta.url), "utf8");
const slugs = [...src.matchAll(/^\s+client: "([^"]+)",$/gm)].map(([, c]) => slugify(c)).filter((s) => s.includes(filter));

mkdirSync(OUT, { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars", "--force-color-profile=srgb"] });
const page = await browser.newPage();
await page.setViewport({ width: 240, height: 240, deviceScaleFactor: 2 });
for (const slug of slugs) {
  const r = await page.goto(`${BASE}/render-kit/logos/${slug}`, { waitUntil: "networkidle0", timeout: 180_000 });
  if (!r?.ok()) throw new Error(`${slug}: HTTP ${r?.status()} (add it to LOGOS in app/render-kit/logos.tsx)`);
  const file = join(OUT, `${slug}.png`);
  await sharp(await page.screenshot({ type: "png" })).png({ compressionLevel: 9, palette: true, quality: 95 }).toFile(file);
  console.log(`✓ logos/${slug}.png ${(statSync(file).size / 1024).toFixed(0)} KB`);
}
await browser.close();
