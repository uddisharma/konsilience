# Changelog: website-fix

Every page, section, claim or URL that is removed or changed is logged here with the reason. Removed URLs get a 301 in `next.config.ts`.

## Phase 1: Discovery and inventory (2026-11-17)

### Added
- `site.config.ts`: single source for every link, ID and contact detail. Placeholders (`{{NAME}}`) are hidden on the site until filled.
- `app/llms.txt/route.ts`: `/llms.txt` is now generated, so its contact lines come from the config. Output is byte-identical to the old static file.
- `scripts/audit/crawl.mjs`: site crawler used for the inventory, and again in Phase 11.
- `reports/01-discovery.md`, `reports/01-inventory.csv`, `reports/01-lighthouse-baseline.csv`.

### Changed
- Contact details, site URL, office address, social links, form endpoint and Trasys URL are now read from `site.config.ts` instead of being hard-coded in `lib/content.ts`, `lib/routes.ts`, `lib/schema.ts`, `components/Footer.tsx`, `app/layout.tsx`, `lib/submitForm.ts` and `app/api/contact/route.ts`. No visible change.
- Small refactors the repo's TypeScript lint hook required while these files were edited: named constants for the claimed project count (`CLAIMED_PROJECT_COUNT`, still 35), the industry mega-menu columns and the OG image size. No visible change.

### Removed
| What | Where | Reason |
| --- | --- | --- |
| X, Facebook, Instagram and YouTube icons | Footer, every page | All four linked to the LinkedIn page, so they were misleading. They reappear automatically once real profile URLs are set in `site.config.ts` (`social.*`). |
| `https://twitter.com/konsilience` in Organization `sameAs` | JSON-LD, every page | Account not verified. It returns when `social.x` is set. |
| `twitter:creator = @konsilience` | `<head>`, every page | Same reason. It returns when `social.xHandle` is set. |
| `public/llms.txt` (static file) | n/a | Replaced by the generated route at the same URL. |
| `public/llm.txt` | `/llm.txt` | Duplicate of `/llms.txt` under a non-standard name. **301 → `/llms.txt`**. |
