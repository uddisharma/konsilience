// Captures the real screenshots the image compositions use, into .render-cache/ (git-ignored).
// Run with `npm run dev` running: node scripts/capture-sources.mjs
//   trasys-hero-3   https://www.trasys.dev hero (our own product), after its typing animation
//   home-hero       our home page hero, below the header (no logo in frame)
//   copilots-hero   our /ai/ai-copilots hero, below the header

import { mkdirSync, writeFileSync } from "node:fs";
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const BASE = process.env.RENDER_BASE ?? "http://localhost:3000";
mkdirSync(".render-cache", { recursive: true });
const b = await puppeteer.launch({ executablePath: process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--hide-scrollbars"], protocolTimeout: 180_000 });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
const c = await p.createCDPSession();

async function grab(name, url, { wait = 4000, clip, settle } = {}) {
  await p.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 }).catch((e) => console.log("goto:", e.message));
  await new Promise((r) => setTimeout(r, wait));
  if (settle) await p.evaluate(settle);
  await new Promise((r) => setTimeout(r, 800));
  const r = await c.send("Page.captureScreenshot", { format: "png", fromSurface: true });
  const buf = Buffer.from(r.data, "base64");
  // crop afterwards (CSS px × 2 for the 2x device scale); clipping inside Chrome is unreliable here
  if (clip) {
    const { width, height } = await sharp(buf).metadata();
    const k = width / 1440; // actual device scale of the capture
    const top = Math.round(clip.y * k);
    const w = Math.min(Math.round((clip.width ?? 1440) * k), width);
    await sharp(buf).extract({ left: 0, top, width: w, height: Math.min(Math.round(clip.height * k), height - top) }).toFile(`.render-cache/${name}.png`);
  }
  else writeFileSync(`.render-cache/${name}.png`, buf);
  console.log("✓", name);
}

// Hide the header (no logo in frame), decorative canvas animation and floating widgets: only page content is captured.
const tidy = () => {
  for (const s of ["header", "canvas", "nextjs-portal", "[data-placement]", "iframe", "#cookie-banner", "[role=dialog]"]) document.querySelectorAll(s).forEach((n) => (n.style.visibility = "hidden"));
};

if (!process.argv.includes("--local")) await grab("trasys-hero-3", "https://www.trasys.dev", { wait: 9000 });
await grab("home-hero", `${BASE}/`, { wait: 3500, settle: tidy, clip: { x: 0, y: 150, width: 1440, height: 680 } });
await grab("copilots-hero", `${BASE}/ai/ai-copilots`, { wait: 3500, settle: tidy, clip: { x: 0, y: 150, width: 760, height: 620 } }); // text column only
await b.close().catch(() => {});
process.exit(0);
