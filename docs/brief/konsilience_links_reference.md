# Konsilience: Links and Values Reference

**What this is:** every link, ID, contact detail and file the website needs, with the exact placeholder name, where to get it, and where it goes on the site. Fill the **Value** column (or the config block at the bottom), then give the file to Claude, or paste values into `site.config`.

**Fast check after filling:** run `grep -rn "{{" .` in the repo. Anything printed is still missing.

Tick the box when a value is added.

---

## 1. Booking (Calendly)

| Done | Placeholder | What it is | Where to get it | Where it goes on the site | Value |
| --- | --- | --- | --- | --- | --- |
| [ ] | `{{CALENDLY_INTRO_URL}}` | 20-min Intro Call link (IT Solutions) | Calendly, Event types, open the event, **Copy link** | Header and sticky mobile "Book a 20-min call" popup; home hero button; /it-solutions CTA; /contact inline embed; footer CTA; IT blog post CTAs | |
| [ ] | `{{CALENDLY_AUDIT_URL}}` | Free SEO Audit Review (15 min) link | Same, for the audit event | /free-seo-audit thank-you page (inline embed); /digital-marketing CTA; SEO blog post CTAs; audit email auto-reply | |
| [ ] | `{{CALENDLY_TRASYS_URL}}` | Trasys Demo (30 min) link | Same, for the demo event | /trasys "Book a demo" button; design-partner thank-you page; Trasys blog CTAs | |
| [ ] | `{{CALENDLY_FOUNDER_URL}}` (optional) | Founder call link | Same | /about page, "Talk to a founder" button | |

---

## 2. Chat (tawk.to)

| Done | Placeholder | What it is | Where to get it | Where it goes | Value |
| --- | --- | --- | --- | --- | --- |
| [ ] | `{{TAWK_PROPERTY_ID}}` | Your tawk.to property ID | tawk.to dashboard, Administration, Channels, Chat Widget, **Widget Code**. The code contains `embed.tawk.to/PROPERTY_ID/WIDGET_ID` | Global layout, loaded lazily on every page | |
| [ ] | `{{TAWK_WIDGET_ID}}` | Your tawk.to widget ID | Same URL, the second part | Same | |
| [ ] | `{{TAWK_TRASYS_PROPERTY_ID}}` and `{{TAWK_TRASYS_WIDGET_ID}}` (optional) | Separate chat for the Trasys site | A second tawk.to property | Trasys site layout | |

Set in the tawk.to dashboard (not in code): business hours, pre-chat form with name and email, proactive message on services and pricing pages after 20-30 seconds, reply roster.

---

## 3. Analytics and search

| Done | Placeholder | What it is | Where to get it | Where it goes | Value |
| --- | --- | --- | --- | --- | --- |
| [ ] | `{{GA4_ID}}` | GA4 Measurement ID (looks like `G-XXXXXXXXXX`) | Google Analytics, Admin, Data streams, your web stream | Global layout (analytics script, loaded after consent) | |
| [ ] | `{{GTM_ID}}` (optional) | Google Tag Manager container (`GTM-XXXXXXX`) | Tag Manager, container ID | Global layout, only if you use GTM | |
| [ ] | `{{GSC_VERIFICATION}}` | Search Console verification value | Search Console, Add property, HTML tag. Copy only the `content="..."` value | `<head>` meta tag on the home page | |
| [ ] | `{{CLARITY_ID}}` (optional) | Microsoft Clarity project ID (free heatmaps and recordings) | clarity.microsoft.com, project settings | Global layout, after consent | |

After deployment, submit `https://www.konsilience.tech/sitemap.xml` in Search Console (manual step).

---

## 4. Contact details

| Done | Placeholder | What it is | Format | Where it goes | Value |
| --- | --- | --- | --- | --- | --- |
| [ ] | `{{US_PHONE}}` | US virtual number | E.164, for example `+1XXXXXXXXXX` | Header top bar, /contact, footer, `tel:` link, schema `telephone` | |
| [ ] | `{{IN_PHONE}}` | India number | E.164, `+91XXXXXXXXXX` | /contact, footer, schema | |
| [ ] | `{{WHATSAPP}}` | WhatsApp business number | Digits only, no plus (for `wa.me`) | Floating WhatsApp button, /contact | |
| [ ] | `{{SALES_EMAIL}}` | Sales email | `name@domain` | /contact, footer, form notifications, schema `email` | |
| [ ] | `{{SUPPORT_EMAIL}}` | Support email | Same | Footer, Trasys support page | |
| [ ] | `{{ADDRESS}}` | Real registered or office address (Mohali) | Street, city, state, postal code, country | Footer, /contact, LocalBusiness schema. Never add an address we do not have | |
| [ ] | `{{MAP_EMBED_URL}}` (optional) | Google Maps embed link | Google Maps, Share, Embed a map | /contact page | |

---

## 5. Social and team profiles

| Done | Placeholder | What it is | Where it goes | Value |
| --- | --- | --- | --- | --- |
| [ ] | `{{LINKEDIN_URL}}` | Konsilience LinkedIn company page | Footer icons, /about, Organization schema `sameAs` | |
| [ ] | `{{INSTAGRAM_URL}}` | Instagram account | Footer, /about, schema `sameAs` | |
| [ ] | `{{YOUTUBE_URL}}` | YouTube channel | Footer, /about, blog and project video sections, schema `sameAs` | |
| [ ] | `{{X_URL}}` | X (Twitter) account | Footer, Trasys pages, schema `sameAs` | |
| [ ] | `{{GITHUB_URL}}` | GitHub organization | Footer, /trasys, project pages with public repos | |
| [ ] | `{{LINKEDIN_SAGUN_URL}}`, `{{LINKEDIN_DEEPAK_URL}}`, `{{LINKEDIN_HARDIK_URL}}`, `{{LINKEDIN_GURSIDAK_URL}}`, `{{LINKEDIN_NEHARIKA_URL}}`, `{{LINKEDIN_CHHAYA_URL}}`, `{{LINKEDIN_TANISH_URL}}`, `{{LINKEDIN_AKILESH_URL}}` | Personal LinkedIn of each person shown on the site | /about team cards, blog author boxes. Only for people who agree to be shown | |

---

## 6. Directories and reviews

| Done | Placeholder | What it is | Where it goes | Value |
| --- | --- | --- | --- | --- |
| [ ] | `{{CLUTCH_URL}}` | Clutch profile | Footer, home "proof" strip, /about, schema `sameAs` | |
| [ ] | `{{GOODFIRMS_URL}}` | GoodFirms profile | Same | |
| [ ] | `{{TECHBEHEMOTHS_URL}}` (optional) | TechBehemoths profile | Same | |
| [ ] | `{{GOOGLE_BUSINESS_URL}}` | Google Business Profile (Maps share link) | Footer, /contact, schema `sameAs` | |
| [ ] | `{{GOOGLE_REVIEW_URL}}` | Link that opens the "write a review" box | Email signature, post-project email, thank-you page | |
| [ ] | `{{CRUNCHBASE_URL}}` (optional) | Crunchbase profile | /about, schema `sameAs` | |
| [ ] | `{{UPWORK_URL}}` (optional) | Upwork agency profile | /about | |

---

## 7. Forms and CRM

| Done | Placeholder | What it is | Where to get it | Where it goes | Value |
| --- | --- | --- | --- | --- | --- |
| [ ] | `{{FORM_ENDPOINT}}` | URL that receives every form submission | Zoho CRM web form or webhook, or a Zapier or Make webhook URL | Contact form, free-audit form, Trasys design-partner form | |
| [ ] | `{{NOTIFY_EMAIL}}` | Who gets the notification email for new leads | Usually the same as `{{SALES_EMAIL}}` | Form handler | |
| [ ] | `{{TURNSTILE_SITE_KEY}}` or `{{HCAPTCHA_SITE_KEY}}` or `{{RECAPTCHA_SITE_KEY}}` | Public CAPTCHA key (choose one provider) | Cloudflare Turnstile, hCaptcha or Google reCAPTCHA dashboard | All forms. The **secret key** goes only in server environment variables, never in front-end code | |

---

## 8. Trasys

Trasys is currently **free for everyone**. Show that on every Trasys call-to-action.

| Done | Placeholder | What it is | Where it goes | Value |
| --- | --- | --- | --- | --- |
| [ ] | `{{TRASYS_SITE_URL}}` | Main Trasys site URL | Header "Trasys" link, footer, blog cross-links, SoftwareApplication schema `url` | |
| [ ] | `{{TRASYS_SIGNUP_URL}}` | Sign-up or "Start free" link | /trasys hero button, header, all Trasys blog CTAs | |
| [ ] | `{{TRASYS_DOCS_URL}}` | Documentation | /trasys, blog posts, footer | |
| [ ] | `{{TRASYS_GITHUB_URL}}` | GitHub repo or organization | /trasys, footer | |
| [ ] | `{{TRASYS_NPM_URL}}` | SDK package page (if published) | /trasys install section | |
| [ ] | `{{TRASYS_DEMO_VIDEO_URL}}` | Demo video (YouTube) | /trasys hero or demo section | |
| [ ] | `{{TRASYS_DISCORD_URL}}` (optional) | Community link | /trasys footer | |

---

## 9. The 35 projects

One set per project. Use the project's slug (for example `field-service-crm` becomes `FIELD_SERVICE_CRM`).

| Done | Placeholder pattern | What it is | Where it goes |
| --- | --- | --- | --- |
| [ ] | `{{PROJECT_<SLUG>_DEMO_URL}}` | Live demo or deployed app | "View demo" button on the project page |
| [ ] | `{{PROJECT_<SLUG>_VIDEO_URL}}` (optional) | Walkthrough video | Project page video section |
| [ ] | `{{PROJECT_<SLUG>_REPO_URL}}` (optional) | Public repo (only if public) | Project page, "Code" link |

Claude will generate `reports/04-projects-input-sheet.csv` with one row per project. Fill it once instead of editing 35 files.

---

## 10. Files to provide (not links)

| Done | File | Requirement | Where it goes |
| --- | --- | --- | --- |
| [ ] | Logo | SVG plus a PNG with transparent background | Header, footer, schema `logo` |
| [ ] | Favicon | 512x512 PNG | Browser tab, app icons |
| [ ] | Social share image | 1200x630 PNG per key page (home, Trasys, DM) | Open Graph and Twitter cards |
| [ ] | Team photos | Square, at least 800px, real people | /about, blog author boxes |
| [ ] | Project screenshots | Real screenshots of our builds, 1600px wide | Project pages |
| [ ] | Client logos | Only with written permission | Home proof strip |

---

## 11. Config block (fill once)

Paste your values here, or have Claude generate `site.config` and fill it from the tables above.

```json
{
  "booking": {
    "introUrl": "",
    "auditUrl": "",
    "trasysUrl": "",
    "founderUrl": ""
  },
  "chat": {
    "tawkPropertyId": "",
    "tawkWidgetId": ""
  },
  "analytics": {
    "ga4Id": "",
    "gtmId": "",
    "gscVerification": "",
    "clarityId": ""
  },
  "contact": {
    "usPhone": "",
    "inPhone": "",
    "whatsapp": "",
    "salesEmail": "",
    "supportEmail": "",
    "address": "",
    "mapEmbedUrl": ""
  },
  "social": {
    "linkedin": "",
    "instagram": "",
    "youtube": "",
    "x": "",
    "github": ""
  },
  "directories": {
    "clutch": "",
    "goodfirms": "",
    "techbehemoths": "",
    "googleBusiness": "",
    "googleReview": "",
    "crunchbase": ""
  },
  "forms": {
    "endpoint": "",
    "notifyEmail": "",
    "captchaSiteKey": ""
  },
  "trasys": {
    "siteUrl": "",
    "signupUrl": "",
    "docsUrl": "",
    "githubUrl": "",
    "npmUrl": "",
    "demoVideoUrl": ""
  }
}
```

## 12. Final checks after filling

- [ ] `grep -rn "{{" .` prints nothing.
- [ ] Every Calendly button opens the right event, on desktop and mobile.
- [ ] A test chat appears in the tawk.to dashboard.
- [ ] A test form submission reaches the CRM and the notification email.
- [ ] GA4 Realtime shows a visit, a form submit and a Calendly booking.
- [ ] Every social and directory link opens the correct profile.
- [ ] `tel:` and WhatsApp links work on a phone.
