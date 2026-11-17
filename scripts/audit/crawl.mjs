// Site crawler for the website audit (Phase 1, re-run in Phase 11).
// Usage: node scripts/audit/crawl.mjs <baseUrl> <outPrefix> [--external]
//   e.g. node scripts/audit/crawl.mjs http://localhost:3100 docs/reports/01 --external
// Seeds from /sitemap.xml plus every internal link found, follows nothing off-site.
// Writes <outPrefix>-inventory.csv and <outPrefix>-crawl.json. No dependencies.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const [base, outPrefix = "docs/reports/01", ...flags] = process.argv.slice(2);
if (!base) throw new Error("usage: crawl.mjs <baseUrl> <outPrefix> [--external]");
const checkExternal = flags.includes("--external");
const origin = new URL(base).origin;
const PROD = "https://www.konsilience.tech";
const CONCURRENCY = 6;

const decode = (s) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d));
const strip = (s) => decode(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const attrs = (tag) => {
  const o = {};
  for (const m of tag.matchAll(/([a-zA-Z_:][\w:.-]*)\s*=\s*("([^"]*)"|'([^']*)')/g)) o[m[1].toLowerCase()] = decode(m[3] ?? m[4] ?? "");
  return o;
};
const textOf = (html) =>
  strip(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
      .replace(/<template[\s\S]*?<\/template>/gi, " "),
  );

// Normalise any href to a path on our site, or null if external / non-http.
function toPath(href, from) {
  if (!href || /^(mailto:|tel:|javascript:|data:|#)/i.test(href)) return null;
  let u;
  try {
    u = new URL(href, from);
  } catch {
    return null;
  }
  if (u.origin !== origin && u.origin !== PROD && u.origin !== PROD.replace("www.", "")) return null;
  if (u.pathname.startsWith("/_next/") || /\.(png|jpe?g|webp|avif|svg|ico|mp4|pdf|txt|xml|webmanifest|css|js)$/i.test(u.pathname)) return null;
  return u.pathname.replace(/\/$/, "") || "/";
}

const pages = new Map(); // path -> record
const queue = [];
const seen = new Set();
const externalLinks = new Map(); // url -> Set(fromPath)
const thirdParty = new Map(); // src -> Set(path)

function enqueue(path) {
  if (seen.has(path)) return;
  seen.add(path);
  queue.push(path);
}

async function fetchManual(url) {
  // Follow redirects by hand so chains are visible.
  const chain = [];
  let cur = url;
  for (let i = 0; i < 10; i++) {
    const res = await fetch(cur, { redirect: "manual", headers: { "user-agent": "KonsilienceAuditBot/1.0" } });
    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      chain.push(`${res.status} ${cur}`);
      cur = new URL(res.headers.get("location"), cur).href;
      continue;
    }
    return { res, chain, finalUrl: cur };
  }
  throw new Error("redirect loop");
}

async function crawl(path) {
  const url = origin + path;
  const rec = { path, status: 0, redirects: [], finalUrl: url };
  pages.set(path, rec);
  let res;
  try {
    ({ res, chain: rec.redirects, finalUrl: rec.finalUrl } = await fetchManual(url));
  } catch (e) {
    rec.status = "ERR " + e.message;
    return;
  }
  rec.status = res.status;
  rec.headers = Object.fromEntries([...res.headers].filter(([k]) => /cache-control|content-encoding|x-robots-tag|content-security|strict-transport|x-frame|referrer-policy|permissions-policy/.test(k)));
  if (!(res.headers.get("content-type") || "").includes("text/html")) return;
  const html = await res.text();
  rec.bytes = html.length;

  rec.title = strip((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ""])[1]);
  const metas = [...html.matchAll(/<meta\s[^>]*>/gi)].map((m) => attrs(m[0]));
  const meta = (k) => metas.find((m) => (m.name || m.property || "").toLowerCase() === k)?.content ?? "";
  rec.description = meta("description");
  rec.robots = meta("robots");
  rec.ogTitle = meta("og:title");
  rec.ogImage = meta("og:image");
  rec.twitterCard = meta("twitter:card");
  const links = [...html.matchAll(/<link\s[^>]*>/gi)].map((m) => attrs(m[0]));
  rec.canonical = links.find((l) => l.rel === "canonical")?.href ?? "";
  rec.lang = (html.match(/<html[^>]*\slang="([^"]*)"/i) || [, ""])[1];

  rec.h1s = [...html.matchAll(/<h1[\s>][\s\S]*?<\/h1>/gi)].map((m) => strip(m[0]));
  rec.headings = [...html.matchAll(/<h([1-6])[\s>]/gi)].map((m) => +m[1]);
  const mainHtml = (html.match(/<main[\s>][\s\S]*<\/main>/i) || [html])[0];
  const mainText = textOf(mainHtml);
  rec.wordCount = mainText ? mainText.split(/\s+/).length : 0;
  rec.mainText = mainText;

  // Links
  const anchors = [...html.matchAll(/<a\s[^>]*>/gi)].map((m) => attrs(m[0]));
  const mainAnchors = new Set([...mainHtml.matchAll(/<a\s[^>]*>/gi)].map((m) => attrs(m[0]).href));
  rec.outInternal = new Set();
  rec.outInternalBody = new Set();
  rec.outExternal = new Set();
  rec.deadAnchors = 0;
  for (const a of anchors) {
    const href = a.href;
    if (href === undefined || href === "" || href === "#") {
      rec.deadAnchors++;
      continue;
    }
    const p = toPath(href, url);
    if (p) {
      rec.outInternal.add(p);
      if (mainAnchors.has(href)) rec.outInternalBody.add(p);
      enqueue(p);
    } else if (/^https?:/i.test(href)) {
      rec.outExternal.add(href);
      if (!externalLinks.has(href)) externalLinks.set(href, new Set());
      externalLinks.get(href).add(path);
    }
  }
  rec.contactLinks = anchors.map((a) => a.href || "").filter((h) => /^(mailto:|tel:|https:\/\/wa\.me)/.test(h));

  // Images
  const imgs = [...html.matchAll(/<img\s[^>]*>/gi)].map((m) => attrs(m[0]));
  rec.images = imgs.length;
  rec.imgsMissingAlt = imgs.filter((i) => !("alt" in i)).length;
  rec.imgsEmptyAlt = imgs.filter((i) => i.alt === "").length;
  rec.imgsNoDims = imgs.filter((i) => !i.width || !i.height).length;

  // JSON-LD types
  rec.jsonld = [];
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const walk = (n) => {
        if (Array.isArray(n)) return n.forEach(walk);
        if (n && typeof n === "object") {
          if (n["@type"]) rec.jsonld.push(...[].concat(n["@type"]));
          Object.values(n).forEach(walk);
        }
      };
      walk(JSON.parse(m[1]));
    } catch {
      rec.jsonld.push("INVALID_JSON");
    }
  }
  rec.jsonld = [...new Set(rec.jsonld)];

  // Third-party scripts, iframes, stylesheets, fonts
  for (const m of html.matchAll(/<(script|iframe|link|img|video|source)\s[^>]*>/gi)) {
    const a = attrs(m[0]);
    const src = a.src || (m[1].toLowerCase() === "link" && /stylesheet|preload|preconnect|dns-prefetch/.test(a.rel || "") ? a.href : "");
    if (src && /^https?:\/\//i.test(src) && !src.startsWith(origin) && !src.startsWith(PROD)) {
      const key = `${m[1].toLowerCase()} ${src.split("?")[0]}`;
      if (!thirdParty.has(key)) thirdParty.set(key, new Set());
      thirdParty.get(key).add(path);
    }
  }

  // Placeholder / filler text
  const lower = mainText.toLowerCase();
  // ("insert" and "your company" were dropped: they matched mock-UI labels and normal copy.)
  rec.placeholders = ["lorem ipsum", "coming soon", "placeholder", "todo", "tbd", "example.com", "{{", "xxx", "[insert", "acme"]
    .filter((p) => (["todo", "tbd", "acme"].includes(p) ? new RegExp(`\\b${p}\\b`).test(lower) : lower.includes(p)));
  rec.forms = (html.match(/<form[\s>]/gi) || []).length;
  rec.buttonsNoType = [...html.matchAll(/<button\s[^>]*>/gi)].filter((m) => !/type=/.test(m[0])).length;
}

async function run() {
  // Seed from the sitemap so unlinked pages are found too.
  const sm = await fetch(origin + "/sitemap.xml").then((r) => (r.ok ? r.text() : "")).catch(() => "");
  const sitemapPaths = new Set(
    [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
      const u = new URL(m[1].trim());
      return u.pathname.replace(/\/$/, "") || "/";
    }),
  );
  enqueue("/");
  sitemapPaths.forEach(enqueue);
  // Known non-sitemap routes worth checking
  ["/thank-you", "/sitemap", "/does-not-exist-404-check"].forEach(enqueue);

  while (queue.length) {
    const batch = queue.splice(0, CONCURRENCY);
    await Promise.all(batch.map(crawl));
    process.stdout.write(`\rcrawled ${pages.size} / queued ${queue.length}   `);
  }
  console.log();

  // Inlinks
  const inlinks = new Map();
  const bodyInlinks = new Map();
  for (const r of pages.values()) {
    for (const p of r.outInternal ?? []) if (p !== r.path) inlinks.set(p, (inlinks.get(p) ?? 0) + 1);
    for (const p of r.outInternalBody ?? []) if (p !== r.path) bodyInlinks.set(p, (bodyInlinks.get(p) ?? 0) + 1);
  }

  // External link check
  const extStatus = {};
  if (checkExternal) {
    const urls = [...externalLinks.keys()].filter((u) => !/sharing\/share-offsite|intent\/tweet|sharer\.php/.test(u));
    for (let i = 0; i < urls.length; i += 4) {
      await Promise.all(
        urls.slice(i, i + 4).map(async (u) => {
          try {
            const ctl = AbortSignal.timeout(15000);
            const r = await fetch(u, { redirect: "follow", signal: ctl, headers: { "user-agent": "Mozilla/5.0 (compatible; KonsilienceAuditBot/1.0)" } });
            extStatus[u] = r.status;
          } catch (e) {
            extStatus[u] = "ERR " + (e.name || e.message);
          }
        }),
      );
    }
  }

  // Duplicates
  const dupes = (key) => {
    const m = new Map();
    for (const r of pages.values()) {
      const v = (Array.isArray(r[key]) ? r[key][0] : r[key]) || "";
      if (!v || r.status !== 200) continue;
      m.set(v, [...(m.get(v) ?? []), r.path]);
    }
    return [...m].filter(([, ps]) => ps.length > 1);
  };

  const rows = [];
  const csvCell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const header = [
    "url", "status", "redirect_chain", "title", "title_len", "meta_description", "desc_len", "h1_count", "h1",
    "word_count", "canonical", "canonical_ok", "robots", "indexable", "in_sitemap", "inlinks_all", "inlinks_body",
    "outlinks_internal", "outlinks_external", "images", "imgs_missing_alt", "imgs_no_dims", "jsonld_types",
    "og_image", "placeholder_hits", "issues",
  ];
  rows.push(header.join(","));
  const sorted = [...pages.values()].sort((a, b) => a.path.localeCompare(b.path));
  for (const r of sorted) {
    const expectedCanon = PROD + (r.path === "/" ? "" : r.path);
    const canonOk = !r.canonical ? "missing" : r.canonical.replace(/\/$/, "") === expectedCanon.replace(/\/$/, "") ? "yes" : "no";
    const noindex = /noindex/i.test(r.robots || "") || /noindex/i.test(r.headers?.["x-robots-tag"] || "");
    const indexable = r.status === 200 && !noindex && canonOk !== "no";
    const issues = [];
    if (r.status !== 200) issues.push(`status ${r.status}`);
    if (r.redirects?.length > 1) issues.push("redirect chain");
    if (r.status === 200 && r.title !== undefined) {
      if (!r.title) issues.push("no title");
      else if (r.title.length > 60) issues.push("title > 60");
      else if (r.title.length < 30) issues.push("title < 30");
      if (!r.description) issues.push("no meta description");
      else if (r.description.length > 160) issues.push("desc > 160");
      else if (r.description.length < 120) issues.push("desc < 120");
      if (r.h1s.length !== 1) issues.push(`${r.h1s.length} H1s`);
      if (canonOk === "missing") issues.push("no canonical");
      if (canonOk === "no") issues.push("canonical points elsewhere");
      if (r.wordCount < 250) issues.push("thin (<250 words)");
      if (r.imgsMissingAlt) issues.push("img missing alt");
      if (r.placeholders.length) issues.push("placeholder text");
      if (r.deadAnchors) issues.push(`${r.deadAnchors} dead anchors`);
      if (sitemapPaths.has(r.path) && !(inlinks.get(r.path) > 0)) issues.push("orphan");
      if (sitemapPaths.has(r.path) && noindex) issues.push("noindex but in sitemap");
      if (!sitemapPaths.has(r.path) && indexable && r.path !== "/does-not-exist-404-check") issues.push("indexable but not in sitemap");
      // heading order jumps (e.g. h2 -> h4)
      for (let i = 1; i < r.headings.length; i++) if (r.headings[i] - r.headings[i - 1] > 1) { issues.push("heading level skip"); break; }
    }
    rows.push(
      [
        PROD + (r.path === "/" ? "/" : r.path), r.status, (r.redirects || []).join(" -> "), r.title, r.title?.length ?? "",
        r.description, r.description?.length ?? "", r.h1s?.length ?? "", r.h1s?.join(" | "), r.wordCount ?? "",
        r.canonical, canonOk, r.robots, indexable ? "yes" : "no", sitemapPaths.has(r.path) ? "yes" : "no",
        inlinks.get(r.path) ?? 0, bodyInlinks.get(r.path) ?? 0, r.outInternal?.size ?? "", r.outExternal?.size ?? "",
        r.images ?? "", r.imgsMissingAlt ?? "", r.imgsNoDims ?? "", (r.jsonld || []).join(" "), r.ogImage ? "yes" : "no",
        (r.placeholders || []).join(" "), issues.join("; "),
      ].map(csvCell).join(","),
    );
  }

  mkdirSync(dirname(outPrefix + "-x"), { recursive: true });
  writeFileSync(`${outPrefix}-inventory.csv`, rows.join("\n") + "\n");
  writeFileSync(
    `${outPrefix}-crawl.json`,
    JSON.stringify(
      {
        base,
        crawledAt: new Date().toISOString(),
        pageCount: pages.size,
        sitemapCount: sitemapPaths.size,
        duplicates: { title: dupes("title"), description: dupes("description"), h1: dupes("h1s") },
        external: Object.fromEntries([...externalLinks].map(([u, s]) => [u, { status: extStatus[u] ?? "not checked", from: [...s] }])),
        thirdParty: Object.fromEntries([...thirdParty].map(([k, s]) => [k, [...s].length])),
        // Page text is written to `texts` below, and Sets do not serialise, so both are dropped here.
        pages: sorted.map((p) => {
          const r = {
            ...p,
            outInternal: [...(p.outInternal ?? [])],
            outExternal: [...(p.outExternal ?? [])],
            inlinks: inlinks.get(p.path) ?? 0,
            bodyInlinks: bodyInlinks.get(p.path) ?? 0,
          };
          delete r.mainText;
          delete r.outInternalBody;
          return r;
        }),
        texts: Object.fromEntries(sorted.filter((r) => r.mainText).map((r) => [r.path, r.mainText])),
      },
      null,
      1,
    ),
  );
  console.log(`wrote ${outPrefix}-inventory.csv (${pages.size} rows) and ${outPrefix}-crawl.json`);
}

run();
