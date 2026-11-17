# Website-fix documentation

Everything for the Konsilience website fix lives in this folder. Code stays at the repo root.

| Path | What it is |
| --- | --- |
| [`brief/konsilience_website_fix_brief_v2.md`](brief/konsilience_website_fix_brief_v2.md) | The brief: what to do, phase by phase |
| [`brief/konsilience_links_reference.md`](brief/konsilience_links_reference.md) | Every link, ID and contact value, with its placeholder name. Values go into `/site.config.ts`. |
| [`brief/konsilience_blog_clusters.md`](brief/konsilience_blog_clusters.md) | Blog clusters for Konsilience and Trasys (Phase 10) |
| [`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) | What we still need from the founders |
| [`CHANGELOG.md`](CHANGELOG.md) | Every removed or changed page, section, claim and URL, with the reason |
| [`reports/`](reports/) | One set of reports per phase (`01-*`, `02-*`, …) |
| `reports/raw/` | Crawl and Lighthouse JSON. Git-ignored; regenerate with `node scripts/audit/crawl.mjs`. |
| [`archive/`](archive/) | Older docs kept for reference, not part of the current plan |

The brief mentions `reports/…`, `CHANGELOG.md` and `OPEN_QUESTIONS.md` at the repo root. They live here instead.
