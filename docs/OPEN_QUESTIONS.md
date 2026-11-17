# Open questions and missing inputs

Updated at the end of every phase. Placeholder names match [`brief/konsilience_links_reference.md`](brief/konsilience_links_reference.md); values go into `/site.config.ts`.

## Portfolio (Phases 2-4): **deferred by the founders on 2026-11-17**

The portfolio and project work will be done later, including the real project list, case studies and the local project folders. Until then, project pages stay as they are. Phase 2 still lists the portfolio claims, marked "deferred". Phase 4 (portfolio) waits for these four items.

- [ ] **Real project list.** The site claims 35 projects, but only 16 records exist, and 13 of those describe well-known third-party products (Freshdesk, Clio, Jobber, AppFolio…) rather than our builds. We will show only projects the team actually built and has the right to show, and the headline number will equal that count. For each candidate project, please confirm:
  1. Our team built it (who, roughly when).
  2. We are allowed to show it: our own product, client gave permission, or anonymised ("a UK property manager") if under NDA. Work done for a previous employer or its clients needs that company's permission.
  3. Evidence: live URL, demo, screenshots of the running app, or a video.
  4. Type: client delivery / own product / demo build.
- [ ] **Local project folders.** The parent folder holds about 45 project folders (Crane Works, Home Services, Padel Booking, BNPL, Geebly, Ginaex, Dazzling, AI Microservice, and many backends under `Projects/`). Which of these are Konsilience work we may show? Several under `Open Soure Tools/` are clones of other people's public repos and cannot be claimed.
- [ ] **The 13 "modelled on" projects:** were these real builds? If yes, who has the actual stack, features and screenshots, so we can rewrite them in our own words and drop the links to the reference product? If no, they come off the site (with 301s).
- [ ] **Demo builds (optional).** To fill gaps honestly, the team can build 3-5 small working demos in the target niches (field service, property, transport). They are labelled "Demo build" on the site. Decide whether to do this and which niches.

## Values to supply

| Placeholder | What it is | Status |
| --- | --- | --- |
| `{{CALENDLY_INTRO_URL}}` | 20-min intro call | ✅ `calendly.com/konsilience/intro-call` |
| `{{CALENDLY_AUDIT_URL}}` | 15-min free SEO audit review | ✅ `calendly.com/konsilience/free-seo-audit-review` |
| `{{CALENDLY_TRASYS_URL}}` | 30-min Trasys demo | ✅ `calendly.com/konsilience/trasys-demo` |
| `{{CALENDLY_FOUNDER_URL}}` | Founder call (optional) | missing |
| `{{TAWK_PROPERTY_ID}}`, `{{TAWK_WIDGET_ID}}` | tawk.to chat | ✅ `6afbf0ccd391ea3cc3c8a899` / `1k7k297u3` |
| `{{GA4_ID}}` | GA4 measurement ID | ✅ `G-0FV9HNCG9Q` (installed with consent in Phase 9) |
| `{{GSC_VERIFICATION}}` | Search Console HTML-tag value | **missing** |
| `{{GTM_ID}}`, `{{CLARITY_ID}}` | Tag Manager / Clarity (optional) | missing |
| `{{US_PHONE}}` | US virtual number, E.164 | missing |
| `{{WHATSAPP}}` | WhatsApp number, digits only | ✅ `918283881336` (same number as `{{IN_PHONE}}`) |
| `{{SUPPORT_EMAIL}}` | Support email | missing |
| `{{MAP_EMBED_URL}}` | Google Maps embed (optional) | missing |
| `{{FORM_ENDPOINT}}` | Form receiver | `/api/contact` (live, SMTP email). Keep, or switch to a Zoho/Zapier/Make URL? |
| `{{NOTIFY_EMAIL}}` | Who gets lead notifications | set to `sales@konsilience.tech`; confirm |
| `{{TURNSTILE_SITE_KEY}}` | Cloudflare Turnstile public key | ✅ `0x4AAAAAAGEum3df7IP5pE2F`. Secret saved in local `.env.local` (git-ignored). **Also add `TURNSTILE_SECRET_KEY` in Vercel Production env** before Phase 6 ships. |
| `{{TRASYS_SIGNUP_URL}}`, `{{TRASYS_DOCS_URL}}`, `{{TRASYS_GITHUB_URL}}`, `{{TRASYS_NPM_URL}}`, `{{TRASYS_DEMO_VIDEO_URL}}`, `{{TRASYS_DISCORD_URL}}` | Trasys links | missing (`{{TRASYS_SITE_URL}}` = `trasys.dev`, live) |
| `{{INSTAGRAM_URL}}`, `{{YOUTUBE_URL}}`, `{{X_URL}}`, `{{GITHUB_URL}}` | Social profiles. Leave empty if an account doesn't exist. | missing (`{{LINKEDIN_URL}}` live) |
| `{{CLUTCH_URL}}`, `{{GOODFIRMS_URL}}`, `{{TECHBEHEMOTHS_URL}}`, `{{GOOGLE_BUSINESS_URL}}`, `{{GOOGLE_REVIEW_URL}}`, `{{CRUNCHBASE_URL}}`, `{{UPWORK_URL}}` | Directory and review profiles | missing |
| `{{LINKEDIN_SAGUN_URL}}` … `{{LINKEDIN_AKILESH_URL}}` (8 people) | Personal LinkedIn, for people who agree to be shown | missing |

## Measurement setup (founder actions, about 30 minutes)

- [x] **GA4:** analytics.google.com → Admin → Create property "Konsilience" → Web data stream for `https://www.konsilience.tech` → copy the Measurement ID (`G-…`).
- [ ] **Search Console:** search.google.com/search-console → Add property → URL prefix `https://www.konsilience.tech` → "HTML tag" → copy only the `content="…"` value. (Or a Domain property via a DNS TXT record at your domain registrar.) Link it to GA4 afterwards.
- [x] **WhatsApp:** +91 82838 81336.
- [x] **Cloudflare Turnstile** (free CAPTCHA): dash.cloudflare.com → Turnstile → Add site `konsilience.tech` → send the site key; put the secret key in Vercel env as `TURNSTILE_SECRET_KEY`.
- [x] **SMTP on Vercel:** confirmed set in production (2026-11-17). Was: confirm `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO` are set in Vercel → Project → Settings → Environment Variables (Production). Without them every form fails.
- [ ] **tawk.to dashboard:** business hours, pre-chat form (name and email), proactive message on services and pricing pages after 20-30 seconds, reply roster.

## Live values to confirm

- [ ] Sales email `sales@konsilience.tech` and phone `+91 82838 81336`: correct, and OK to show on every page?
- [x] Team office: Industrial Area, Sector 75, Sahibzada Ajit Singh Nagar, Mohali, Punjab 160071 (confirmed 2026-11-17).
- [x] Registered office: 1034/25, Ground Floor, Bhatnagar Colony, Jind, Haryana 126102 (confirmed 2026-11-17).
- [x] Legal name: Konsilience Private Limited (footer, legal pages, Organization schema).
- [ ] Office hours "Mon – Fri, 9:30 AM – 6:30 PM IST": correct? Can visitors come to the Mohali office? (That decides whether LocalBusiness schema is appropriate.)
- [ ] LinkedIn `linkedin.com/company/konsilience`: is this our company page?
- [ ] "Founded 2021": the company, the team, or the first project?
