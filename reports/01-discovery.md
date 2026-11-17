# Phase 1: Discovery and Inventory

Date: 2026-11-17 · Branch: `website-fix` · Crawled: local production build (`next build && next start`) and the live site https://www.konsilience.tech/

**Headline:** The live site exactly matches this repo: 147 URLs with identical status codes, titles and word counts. Every fix on this branch will therefore show up one-for-one after deploy. Technical SEO basics are already in good shape (one H1 per page, canonicals, no broken internal links, no redirect chains, no missing alt text). The big problems are **content and trust**, not plumbing:

1. **The portfolio describes other companies' products.** `lib/catalog.ts` states each project is "modelled on a well-known product", and lists features, tech stacks and integrations "researched from public sources". 13 of the 16 project pages link out to that real product (Freshdesk, Clio, Darwinbox, Jobber, AppFolio, Help Scout, Doxy.me, ServiceM8, Innago, Sortly, Raken, Vagaro, MYAVANA). This is the highest-risk item on the site (Phases 2-4).
2. **The code holds 16 projects, not 35.** "35+ projects done" is hard-coded in the home stats, footer, nav and press releases, but only 16 project records exist. The other 19 must come from the founders (Phase 4).
3. **No conversion or measurement tooling.** No analytics, no Search Console tag, no Calendly, no chat, no cookie banner. Forms work through `/api/contact` (SMTP email) only.
4. **Unsupported trust signals are spread across the site:** compliance lists (FedRAMP, SOX, SOC 2, ISO 27001…), a "Partners" logo wall (AWS, Google Cloud, Claude, NVIDIA, Stripe…), "Global Delivery Hubs" in 7 countries, "24h response time", "10+ years" leads, fake-looking whitepaper files ("PDF · 2.1 MB"), and press releases. All of these go into the Phase 2 claims register.
5. **Mobile performance on the home page is weak** (Lighthouse 63, TBT 1.7 s, 5,845 DOM nodes).

---

## 1. Stack

| Area | Finding |
| --- | --- |
| Framework | Next.js **16.3.6**, App Router, Turbopack build, React 19.2.8, TypeScript 5 |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`), one CSS bundle of 99 KB |
| Content / CMS | **No CMS.** All copy lives in TypeScript files: `lib/content.ts`, `lib/catalog.ts` (services, industries, projects, posts, jobs, resources), `lib/serviceData.ts`, `lib/industryData.ts`, `lib/locationData.ts`, `lib/regionalServiceData.ts` (3,106 lines), `lib/blogArticles.ts` |
| Rendering | 156 routes, nearly all statically prerendered (SSG); `/api/contact` and `/og` are dynamic |
| Hosting | **Vercel** (`Server: Vercel` header, `.vercel` in `.gitignore`). HSTS preload, X-Frame-Options, Referrer-Policy and X-Content-Type-Options already set in `next.config.ts`. **No CSP, no Permissions-Policy.** |
| Package manager | bun 1.3.12 (`bun.lock`) |
| Forms | `components/ContactForm.tsx`, `ContactModal.tsx`, `page/ApplyForm.tsx`, `page/Newsletter.tsx` → `lib/submitForm.ts` → `app/api/contact/route.ts` (nodemailer SMTP, honeypot field, in-memory rate limit of 5 per IP per 10 min). No CAPTCHA, no UTM capture. |
| Analytics | **None.** No GA4, GTM, Search Console verification, Clarity or pixels. |
| Booking / chat | **None.** No Calendly, no tawk.to, no WhatsApp link. |
| Fonts | `next/font/google` (self-hosted): Plus Jakarta Sans (variable, all weights) and Barlow Condensed 500/600. 9 woff2 files, about 156 KB in total. |
| JS libraries | `lenis` (smooth scroll, loaded on every page), `simple-icons` (brand logos in the Partners section), `nodemailer` (server only). The largest client chunks are 229 KB, 166 KB and 113 KB (uncompressed). |
| SEO plumbing | `app/sitemap.ts` (generated from `lib/routes.ts`), `app/robots.ts` (allows AI crawlers), JSON-LD on every page (`lib/schema.ts`), dynamic OG image route `/og`, `llms.txt` |

## 2. Page inventory

Full list: [`01-inventory.csv`](01-inventory.csv). Columns: URL, status, redirect chain, title and length, meta description and length, H1 count and text, word count, canonical, robots, indexable, in sitemap, inlinks, outlinks, images, JSON-LD types, placeholder hits, issues.

**147 URLs crawled:** 146 return 200, plus 1 deliberate 404 probe. 144 are in `sitemap.xml`.

| Section | Pages | Median words | Note |
| --- | ---: | ---: | --- |
| Regional service pages `/ae/…`, `/us/…`, etc. | 30 | 711 | 7 countries × 4-5 services. Main duplication risk (Phase 3.2). No OG image. |
| Services `/services/*` | 29 | 1,037 | 28 services, including 6 marketing services. Generated from one template. |
| Industries `/industries/*` | 19 | 1,140 | 18 industries. Most have no matching project (Gaming, Telecom, Aviation, Agriculture, Energy, OTT…). |
| Portfolio `/portfolio/*` | 17 | 735 | 16 projects (see headline 1 and 2) |
| Locations `/locations/*` | 9 | 1,543 | Dubai, UAE, Canada, USA, UK, Australia, Germany, Saudi Arabia. No office in any of them. |
| Country hubs `/ae`, `/us`, … | 7 | 367 | Overlap with `/locations/*`. No OG image. |
| Blog `/blog/*` | 7 | 873 | 6 posts, no named author |
| AI solutions | 6 | 600 | |
| Resources | 4 | 126 | `noindex`, but still listed in the sitemap |
| Careers | 3 | 232 | 2 roles, JobPosting schema valid through 2027 |
| Other | 16 | | home, about, team, how-we-work, compliance, security, faq, contact, digital-marketing, trasys-ai, legal ×3, sitemap, thank-you |

## 3. Issues found

| Issue | Count | Pages / detail |
| --- | ---: | --- |
| Broken internal links | **0** | |
| Redirect chains | **0** | |
| Duplicate titles / H1s | **0** / **0** | |
| Duplicate meta description | 1 | `/thank-you` reuses the home description (it is `noindex`, so low impact) |
| Pages without exactly one H1 | **0** | |
| Missing canonical | **0** | `/thank-you` canonical points to the home page (fine, since it is `noindex`) |
| Images missing alt | **0** of 438 | All have `width`/`height` |
| Title longer than 60 characters | **107** | Median 73. The `"%s \| Konsilience"` template adds 14 characters to already-long titles. |
| Title shorter than 30 characters | 6 | /about, /about/team, /careers, /portfolio, /sitemap, /thank-you |
| Meta description > 160 / < 120 characters | 55 / 26 | |
| Heading level skips (e.g. H2 → H4) | 35 pages | Also flagged by Lighthouse (`heading-order`) |
| Thin pages (< 250 words) | 12 | /about/team, /blog index, both job pages, cookie-policy, terms, security, 4 resources pages, thank-you |
| `noindex` page listed in sitemap | 4 | `/resources/guides`, `/whitepapers`, `/press-releases`, `/webinars` |
| Indexable page missing from sitemap | 1 | `/sitemap` (HTML sitemap) |
| Missing Open Graph image | 37 | All 7 country hubs and 30 regional service pages |
| Orphan pages | 0 | Every page has inlinks, though `/sitemap` is linked only from the footer |
| Placeholder text | 2 | "PDF · Coming soon" (`/resources/whitepapers`); "Acme" as a dummy brand in a mock dashboard (`/services`) |
| External links | 18 checked | All 200 except `clio.com` (403, which blocks bots). 13 point to the products our projects resemble. |
| Social icons | 5 icons, 1 real URL | **Fixed in this phase:** X, Facebook, Instagram and YouTube icons all linked to LinkedIn |

### Dead or misleading buttons (found by reading the code; the crawler can't see these)

- **Resources pages:** every "Download" / "Register" / "Watch" button falls through to `/contact` (the `Button` default `href`). The whitepaper, guide and webinar files they promise don't exist.
- **Header announcement bar** says "The Enterprise AI Playbook 2026 is live. Get your free copy", but it links to a normal blog post; there is no copy to get.
- **`ThemePicker`** (brand-colour tester, commented "remove once the brand colour is final") is visible on every production page.
- **Header "Contact Us"** goes to `/contact`, not a booking flow. No "Book a call" anywhere.

## 4. Third-party scripts, embeds and assets

| Item | Where | Cost |
| --- | --- | --- |
| Google Maps iframe | Footer of **every page**, and `/contact` | `loading="lazy"`, so it costs nothing until scrolled into view, then a heavy third-party load. `/contact` weighs 832 KiB, the most of any page tested. Better as a static map image plus a "Get directions" link. |
| `konsilience-studio-ad-4x5-v1.mp4` | Home (GrowthCta) | **9.2 MB**, `preload="none"` + autoplay once in view |
| `trasys-observability-ad-4x5-v1.mp4` | Home (AiSection) | **5.8 MB**, same |
| `og-image.png` | Social cards | 545 KB (could be about 100 KB) |
| `HeroCanvas` | Home hero | Canvas animation; contributes to the 1.7 s TBT |
| `lenis` | Every page | Smooth scroll JS on the main thread |
| `simple-icons` | Partners section | Brand logos (trademark issue, Phase 2) |
| Analytics, chat, booking, pixels | none | n/a |

Unused files in `public/`: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` (create-next-app leftovers).

## 5. Lighthouse baseline (mobile, live site)

Lighthouse 12.6.1, default mobile emulation (Moto G Power, slow 4G), headless Edge. One run per page, so scores vary by about ±5 between runs. Data: [`01-lighthouse-baseline.csv`](01-lighthouse-baseline.csv).

| Page | Perf | A11y | Best pr. | SEO | LCP | TBT | CLS | Weight |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home `/` | **63** | 98 | 100 | 100 | **3.5 s** | **1,694 ms** | 0 | 573 KiB |
| Service `/services/custom-software-development` | 79 | 99 | 100 | 100 | 2.6 s | 721 ms | 0 | 426 KiB |
| Industry `/industries/real-estate` | 84 | 99 | 100 | 100 | 2.4 s | 543 ms | 0 | 407 KiB |
| Location `/locations/usa` | 94 | 99 | 100 | 100 | 2.3 s | 217 ms | 0 | 418 KiB |
| Portfolio `/portfolio` | 79 | 95 | 100 | 100 | 2.7 s | 619 ms | 0 | 406 KiB |
| Contact `/contact` | 88 | 99 | 100 | 100 | 2.4 s | 397 ms | 0 | 832 KiB |
| Digital marketing `/digital-marketing` | 90 | 95 | 100 | 100 | 2.4 s | 352 ms | 0 | 359 KiB |
| Trasys `/trasys-ai` | 95 | 98 | 100 | 100 | 2.7 s | 126 ms | 0 | 413 KiB |

**What drives the home score:** 5,845 DOM elements (the page holds about 3,100 words plus mock dashboards), 12.4 s of main-thread work, 3.8 s of JS boot-up, and the hero canvas. The LCP element on mobile is the **announcement bar link**, not the hero. Accessibility misses: `heading-order`, `image-redundant-alt`, `label-content-name-mismatch`. These are Phase 8 items.

## 6. Central config (`site.config.ts`)

Created at the repo root. It holds every value named in the brief. Values still written as `{{NAME}}` are hidden by `isSet()`, so the site never shows a raw placeholder.

| Value | Status |
| --- | --- |
| `SALES_EMAIL` | `sales@konsilience.tech` (live, needs confirmation) |
| `IN_PHONE` | `+91 82838 81336` (live, needs confirmation) |
| Office address, hours | live values, needs confirmation |
| LinkedIn | `linkedin.com/company/konsilience` (live, returns 200) |
| `FORM_ENDPOINT` | `/api/contact` (live; works when SMTP env vars are set) |
| Trasys site | `https://www.trasys.dev` (live) |
| `CALENDLY_INTRO_URL`, `CALENDLY_AUDIT_URL`, `CALENDLY_TRASYS_URL`, `TAWK_PROPERTY_ID`, `TAWK_WIDGET_ID` | filled from `links.md` (all three Calendly links return 200). Not yet shown on the site; that happens in Phase 6. |
| `US_PHONE`, `WHATSAPP`, `GA4_ID`, `GSC_VERIFICATION`, `TRASYS_SIGNUP_URL` | placeholder |
| `TRASYS_DOCS_URL`, `TRASYS_DEMO_VIDEO_URL`, `CAPTCHA_SITE_KEY`, `X_URL`, `X_HANDLE`, `FACEBOOK_URL`, `INSTAGRAM_URL`, `YOUTUBE_URL`, `CLUTCH_URL`, `GOODFIRMS_URL` | placeholder, **provisional name**: not in the brief; will be renamed to match `konsilience_links_reference.md` once it arrives |

**Hard-coded values replaced with config reads:** `lib/content.ts` (brand phone/email/Trasys URL, office), `lib/routes.ts` (site URL), `lib/schema.ts` (four copies of the postal address and `sameAs`), `components/Footer.tsx` (social links), `app/layout.tsx` (`twitter:creator`), `lib/submitForm.ts` (form endpoint), `app/api/contact/route.ts` (three copies of the sales email), and `public/llms.txt` + `public/llm.txt` (now generated by `app/llms.txt/route.ts`).

**Intentionally left in place:**
- Blog share-intent URLs (LinkedIn, X, Facebook): standard share endpoints, not our accounts.
- Project URLs in `lib/catalog.ts`: these are content claims, handled in Phases 2-4. Each project gets `{{PROJECT_<SLUG>_DEMO_URL}}` in Phase 4.

**Verification:** `tsc` and `eslint` pass. The production build passes (156 routes). A re-crawl after the changes shows **zero differences** in status, title, description, canonical, word count or robots on all 147 URLs. `/llms.txt` is byte-identical to the old static file, `/llm.txt` returns a 301 to `/llms.txt`, and no `{{` appears in the rendered HTML.

## 7. What Phase 1 did not cover

- **Companion files missing:** `konsilience_links_reference.md` and `konsilience_blog_clusters.md` are not in the repo. Config placeholder names come from the brief itself; provisional names are listed above.
- **Form delivery not tested end-to-end:** no SMTP credentials locally. The form posts correctly but can't send (Phase 6 test).
- **Lighthouse ran once per page,** so treat single-digit differences as noise. Phase 8/11 will use 3-run medians.

## 8. Audit tooling added

- `scripts/audit/crawl.mjs`: dependency-free crawler. `node scripts/audit/crawl.mjs <baseUrl> <outPrefix> [--external]`. Re-run in Phase 11. It also saves page text for the Phase 3 similarity check.
- Raw crawl JSON and Lighthouse JSON are written to `reports/raw/` (git-ignored, regenerable).
