# Open questions and missing inputs

Updated at the end of every phase. Tick items off as they are answered.

## Blocking for later phases

- [ ] **Companion files missing.** Please add `konsilience_links_reference.md` and `konsilience_blog_clusters.md` to the repo root. Until then, config placeholder names follow the brief, and 10 names are provisional (marked in `site.config.ts`).
- [ ] **Only 16 of the 35 projects are in the code** (`lib/catalog.ts`). Please share the full list of 35: name, repo or demo link, screenshots or video, and type (client delivery / own product / demo build). Needed for Phases 2 and 4.
- [ ] **Project copy describes third-party products.** 13 projects are documented as "modelled on" Freshdesk, Clio, Darwinbox, Jobber, AppFolio, Help Scout, Doxy.me, ServiceM8, Innago, Sortly, Raken, Vagaro and MYAVANA, with their features and tech stacks taken from public sources, and the pages link to those companies. Who has the real build details (actual stack, features, screenshots) for each one? (Phases 2-4.)

## Values to supply (`site.config.ts`)

| Placeholder | What it is | Status |
| --- | --- | --- |
| `{{CALENDLY_INTRO_URL}}` | Intro call event | ✅ `calendly.com/konsilience/intro-call` (from `links.md`, returns 200). **Is the event 20 minutes?** The brief's button says "Book a 20-min call". |
| `{{CALENDLY_AUDIT_URL}}` | Free-audit call event | ✅ `calendly.com/konsilience/free-seo-audit-review` (from `links.md`, returns 200) |
| `{{CALENDLY_TRASYS_URL}}` | Trasys demo call | ✅ `calendly.com/konsilience/trasys-demo`, 30 min (from `links.md`, returns 200) |
| `{{TAWK_PROPERTY_ID}}`, `{{TAWK_WIDGET_ID}}` | tawk.to chat | ✅ `6afbf0ccd391ea3cc3c8a899` / `1k7k297u3` (from `links.md`). Wired up in Phase 6. |
| `{{GA4_ID}}` | GA4 measurement ID (G-XXXXXXX) | missing |
| `{{GSC_VERIFICATION}}` | Search Console HTML-tag token | missing |
| `{{US_PHONE}}` | US number, if there is one | missing |
| `{{WHATSAPP}}` | WhatsApp number, digits only | missing |
| `{{TRASYS_SIGNUP_URL}}` | Trasys sign-up page | missing |
| `{{TRASYS_DOCS_URL}}` *(provisional)* | Trasys docs | missing |
| `{{TRASYS_DEMO_VIDEO_URL}}` *(provisional)* | Trasys demo video | missing |
| `{{CAPTCHA_SITE_KEY}}` *(provisional)* | Turnstile/hCaptcha/reCAPTCHA public key (secret goes in `.env`) | missing |
| `{{X_URL}}`, `{{X_HANDLE}}`, `{{FACEBOOK_URL}}`, `{{INSTAGRAM_URL}}`, `{{YOUTUBE_URL}}` *(provisional)* | Social profiles. Leave empty if an account doesn't exist. | missing |
| `{{CLUTCH_URL}}`, `{{GOODFIRMS_URL}}` *(provisional)* | Directory profiles for schema `sameAs` | missing |

## Live values to confirm (currently in use)

- [ ] Sales email `sales@konsilience.tech`: correct inbox for all leads?
- [ ] Phone `+91 82838 81336`: correct, and OK to show on every page?
- [ ] Office address "Industrial Area, Sector 75, Sahibzada Ajit Singh Nagar, Mohali, Punjab 160071" and hours "Mon – Fri, 9:30 AM – 6:30 PM IST": correct? Is it a real office we can name in LocalBusiness schema?
- [ ] LinkedIn `linkedin.com/company/konsilience`: is this our company page?
- [ ] Forms post to `/api/contact` and are emailed by SMTP (`.env`). Are SMTP credentials set on Vercel production? Keep this, or switch to another form backend (`{{FORM_ENDPOINT}}`)?
- [ ] "Founded 2021": the company, the team, or the first project? (Phase 2)
