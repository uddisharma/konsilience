// Submits every URL in the live sitemap to IndexNow. IndexNow reaches Bing, Yandex and other
// engines. Google does not use it, so Google still relies on the sitemap and Search Console.
//
// Usage:
//   node scripts/indexnow.mjs             submit all sitemap URLs (run after each deploy)
//   node scripts/indexnow.mjs --dry-run   print the URLs without submitting
//   INDEXNOW_SITE=http://localhost:3100 node scripts/indexnow.mjs --dry-run   test another host
//
// The key is the file named <32 hex characters>.txt in public/. It is public by design, so it is
// not a secret. The file must be live on the site before IndexNow accepts the submission.
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = process.env.INDEXNOW_SITE ?? "https://www.konsilience.tech";
const ENDPOINT = "https://api.indexnow.org/indexnow";
// Matches "07fac34dfe38e2da4d5d8f682e1aa368.txt"; rejects "robots.txt" and "key.txt".
const KEY_FILE_RE = /^[a-f0-9]{32}\.txt$/;
const MAX_URLS_PER_REQUEST = 10000; // IndexNow's documented limit
const KEY_CHECK_INTERVAL_MS = 30000;
const KEY_CHECK_ATTEMPTS = 20;
const DRY_RUN = process.argv.includes("--dry-run");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function keyIsLive(keyLocation, key) {
  try {
    const res = await fetch(keyLocation);
    return res.ok && (await res.text()).trim() === key;
  } catch {
    return false;
  }
}

async function main() {
  const keyFile = readdirSync(join(ROOT, "public")).find((f) => KEY_FILE_RE.test(f));
  if (!keyFile) throw new Error("No IndexNow key file (32 hex characters + .txt) found in public/");
  const key = keyFile.replace(/\.txt$/, "");
  const keyLocation = `${SITE}/${keyFile}`;
  const host = new URL(SITE).host;

  const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  console.log(`${urls.length} URLs in ${SITE}/sitemap.xml`);

  if (DRY_RUN) {
    console.log(urls.join("\n"));
    return;
  }

  // Right after a deploy the old key file may still be served. Wait until the new one is live.
  for (let attempt = 1; !(await keyIsLive(keyLocation, key)); attempt++) {
    if (attempt >= KEY_CHECK_ATTEMPTS) throw new Error(`Key file not live at ${keyLocation}`);
    console.log(`key file not live yet (attempt ${attempt}), waiting`);
    await sleep(KEY_CHECK_INTERVAL_MS);
  }

  let failed = false;
  for (let start = 0; start < urls.length; start += MAX_URLS_PER_REQUEST) {
    const urlList = urls.slice(start, start + MAX_URLS_PER_REQUEST);
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key, keyLocation, urlList }),
    });
    console.log(`IndexNow: ${urlList.length} URLs submitted, HTTP ${res.status}`);
    if (!res.ok) failed = true;
  }
  if (failed) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
