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

## Phase 1 follow-up: docs folder, links reference, registered office (2026-11-17)

### Changed
- All website-fix documents moved to `docs/`: brief and companion files → `docs/brief/`, reports → `docs/reports/`, `CHANGELOG.md` and `OPEN_QUESTIONS.md` → `docs/`. Index in `docs/README.md`.
- `GOOGLE_SEARCH_CONSOLE_REINDEXING.md` → `docs/archive/`. Its URL list is out of date once pages are merged or removed in later phases.
- `README.md`: create-next-app boilerplate replaced with a short project README.
- `site.config.ts`: placeholder names now match `konsilience_links_reference.md`. Added the support email, map embed, founder Calendly, GTM, Clarity, Turnstile, notify email, Trasys GitHub/npm/Discord, GitHub, directory profiles and team LinkedIn placeholders. Dropped the Facebook and X-handle fields (not in the reference; the X handle is now derived from `{{X_URL}}`).
- Organization schema `address` now uses the **registered office (Jind)**. ProfessionalService, LocalBusiness and JobPosting keep the Mohali team office.
- Footer bottom line and legal pages now show "Registered office: …".
- `/llms.txt`: "Headquarters" line split into "Team office" (Mohali) and "Registered office" (Jind).

### Removed
| What | Reason |
| --- | --- |
| `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` | create-next-app leftovers, referenced nowhere |
| `links.md` (untracked) | Every value in it (tawk.to IDs, three Calendly links) is now in `site.config.ts` |

## Founder inputs (2026-11-17)

- `site.config.ts`: GA4 ID, WhatsApp number, Turnstile site key and legal name "Konsilience Private Limited" added. Registered-office spelling confirmed.
- Turnstile **secret** stored only in git-ignored `.env.local`; `TURNSTILE_SECRET_KEY=` added to `.env.example`.
- Footer and legal pages now read "Konsilience Private Limited · Registered office: …". Organization schema gains `legalName`.
- GA4, WhatsApp and Turnstile are stored but **not yet active on the site**: they ship with Phase 6 (forms, WhatsApp) and Phase 9 (GA4 behind cookie consent).
- Portfolio and project work deferred by the founders.

## "Since 2021" clarified (2026-11-17)

Founders confirmed 2021 is when the **team formed and shipped its first project**, not when the company was incorporated.

| Where | Before | After |
| --- | --- | --- |
| Organization schema | `foundingDate: "2021"` | Removed. Returns when `{{INCORPORATION_YEAR}}` is set. |
| Footer | © 2021–2026 Konsilience | © 2026 Konsilience (the legal-name line follows) |
| /about timeline | "2021 · Konsilience founded" | "2021 · Team formed, first project shipped" |
| /about intro | "Founded in 2021, we have grown into…" | "We started in 2021 and have grown into…" |
| /about and /about/team stats | "2021 · Founded" | "2021 · Team since" |
| Home stats card | "shipping products since 2021" | "our team has shipped products since 2021" |
| `site.config.ts` | `company.founded` | `company.teamSince` plus `company.incorporatedYear` (placeholder) |

The "35+ projects" wording on these pages is unchanged; it is handled with the portfolio (deferred).

## Booking and chat live on the branch (Phase 6, partial) (2026-11-17)

### Added
- **"Book a 15-min call"** opens the Calendly intro-call popup from the header (replaces "Contact Us"), the mobile menu, and a new sticky button on mobile (bottom-left). Calendly's script loads only on first hover or click, so it adds nothing to page load. If it can't load, the booking page opens in a new tab. Visitor UTM tags are passed to Calendly.
- **tawk.to chat** on every page (bottom-right). It loads at the first idle moment, at most 5 s after the page becomes interactive, or on the first scroll, tap or key press. (`next/script` `lazyOnload` was tried first: on desktop the animated home hero keeps the browser busy, so the chat never loaded.)
- GA4-ready events: `booking_click` (with placement), `generate_lead` (Calendly booking made), `chat_started`. They are recorded once GA4 is installed (Phase 9).
- `site.config.ts` → `booking.introCallMinutes` (15, matching the Calendly event).

### Changed
| What | Why |
| --- | --- |
| Header "Contact Us" button → "Book a 15-min call" (shorter "Book a call" between 1024 and 1280 px) | The brief's main CTA. /contact stays in menus, and the mobile menu has an "Or send us a message" link. |
| Back-to-top button moved up (`bottom-24`) | It sat where the chat bubble now is |
| Colour tester (ThemePicker) hidden below 1024 px | It sat where the sticky booking button now is. The whole tester is still due for removal (Phase 8). |
| Home-page contact pop-up no longer opens after the visitor clicked to book or started a chat | It was opening on top of the Calendly popup |
| `ContactModal` apostrophe escaped | Pre-existing lint error |
| Header and modal timing numbers named as constants | Required by the repo's TypeScript lint hook. No visible change. |

### Not yet done (rest of Phase 6)
Inline Calendly embeds on /contact, /trasys-ai and the free-audit thank-you page; WhatsApp button; Turnstile on forms; UTM capture in forms; cookie consent for chat (Phase 9).

## Phase 6 complete: booking, chat, forms, cookie consent (2026-11-17)

### Added
- **Cookie consent** (`components/consent/CookieBanner.tsx`, `lib/consent.ts`): accept, reject, or choose per category. EU/EEA, UK and Switzerland visitors opt in; everyone else has analytics and chat on until they reject. Region comes from Vercel's country header via `/api/geo`, with a time-zone fallback. "Cookie settings" link in the footer.
- **GA4 with Consent Mode v2** (`lib/analytics.ts`): `gtag.js` loads only when analytics is allowed, after the page is idle. Advertising signals stay denied. Withdrawing consent stops measurement and deletes `_ga*` cookies. Measurement ID `G-0FV9HNCG9Q`.
- **Free SEO audit**: `/free-seo-audit` form (name, work email, website, main goal) and `/free-seo-audit/thank-you` with the audit-review calendar. Both are `noindex` until the copy is confirmed.
- **Trasys design-partner form** at `/trasys-ai#design-partners`: "free for everyone while we are in early access". Submissions go to the sales inbox as `design_partner`.
- **Inline Calendly calendars** on /contact, /trasys-ai, /thank-you and the audit thank-you page. Each loads when scrolled near and after consent, or when the visitor clicks "Show the booking calendar".
- **WhatsApp** (+91 82838 81336, pre-filled greeting): header, mobile bottom bar, /contact, footer.
- **Spam protection** on every form: honeypot plus Cloudflare Turnstile (`components/FormGuard.tsx`). `/api/contact` verifies the token server-side with `TURNSTILE_SECRET_KEY`.
- **Lead-source capture** (`lib/utm.ts`): UTM tags, gclid, landing page and referrer are kept for the visit (sessionStorage). They are sent with every form and booking, and listed in the lead email.
- **Click events** for `click_to_call`, `whatsapp_click`, `email_click`, plus `booking_click`, `generate_lead` (form or Calendly booking), `chat_started`, `audit_form_submit`, `sign_up` (newsletter).
- `docs/reports/06-conversion-checklist.md`: test result per Phase 6 item.

### Changed
- **tawk.to chat**: on desktop it loads after consent, once the banner is closed. On mobile it does not load until the visitor taps our chat button, so the "Hi! How can we help?" pop-up no longer covers the page. Taps open the chat straight away. If tawk.to is blocked, the button opens tawk's hosted chat page.
- **Home "Have a project in mind?" pop-up**: desktop only, on exit intent (pointer leaves through the top), after 15 s, at most once per session. Never after a booking, a chat, or while the cookie banner is open. It no longer opens on a 10-second timer on phones.
- **Privacy and cookie policies** rewritten to list the actual services, cookies (names confirmed in a browser test) and choices. Dated 17 Nov 2026. **Needs lawyer or CA review** (see OPEN_QUESTIONS).
- **Digital Marketing** CTAs point to `/free-seo-audit`. "Schedule Growth Call" opens the booking popup. The closing band no longer says "30-minute".
- **Forms**: contact, application and newsletter now use FormGuard. Newsletter keeps its layout; the spam check sits below the pill.
- **Contact page**: the "Careers" card in the four-card row is replaced by a WhatsApp card. Careers is still in the header menu and footer, and `/careers` still works.
- **Header and mobile menu**: "Contact Us" becomes "Book a 15-min call" (opens the Calendly popup). The mobile menu has an "Or send us a message" link to /contact.
- **Footer**: WhatsApp link, "Cookie settings" link.
- **Thank-you page**: the calendar is shown straight after a form submission.
- **Office map**: loads only after consent or when the visitor clicks "Show the map". Otherwise a placeholder with a directions link.

### Removed
| What | Reason |
| --- | --- |
| Timed 10-second home contact pop-up | Intrusive on mobile (Google's intrusive-interstitial guidance). Replaced by desktop exit intent. |
| `<Script lazyOnload>` for tawk.to | Never ran on desktop: the animated hero kept the browser busy. Replaced by the idle-or-interaction loader in `lib/idle.ts`. |
| Header "Contact Us" button | Replaced by the booking button (brief: primary CTA is "Book a 15-min call"). |
| "Careers" card on /contact | Replaced by WhatsApp to make a direct contact route available. `/careers` is still linked elsewhere. |
| "30-minute" in the Digital Marketing closing band | The booking is not defined as 30 minutes. |

## Calendly popup: no scrollbar, page locked, banner hidden (2026-11-17)

- The scrollbar on the right of the booking popup is hidden. Calendly's iframe is cross-origin, so it is widened by 20 px and its frame clips the overflow. Scrolling still works. Verified in headless Edge: popup and page scrollbar widths are 0.
- While the popup is open the page behind it does not scroll (`html.calendly-open`). Removed when the popup closes.
- The cookie banner is hidden while the booking popup is open, so it never covers the calendar. It returns when the popup closes, if the visitor has not chosen yet.
