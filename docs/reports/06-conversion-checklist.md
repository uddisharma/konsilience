# Phase 6: Conversion checklist (test results)

Date: 2026-11-17 · Branch: `website-fix` · Build: production (`next build && next start`) on localhost:3100.

**How it was tested:** headless Edge driven over the DevTools protocol, desktop (1366×860) and phone (390×844, touch and mobile user agent), with the visitor timezone set to Asia/Kolkata (standard region) or Europe/Berlin (opt-in region). Server checks used `curl` against `/api/contact`.

**Not testable here (no production access):** real emails to the sales inbox, a real Calendly booking, Turnstile on the production domain, UTM tags in a live lead, and tracking events in the GA4 real-time view. Each is listed as **Needs production check**.

| # | Item | Result | Evidence |
| --- | --- | --- | --- |
| 6.1a | Calendly script and CSS load once | PASS | Loads on first hover or click, not on page load. Repeated calls share one promise (`lib/calendly.ts`). |
| 6.1b | Header and sticky mobile "Book a 15-min call" open the popup | PASS | Popup iframe `calendly.com/konsilience/intro-call`, desktop and mobile. |
| 6.1c | Inline calendar on /contact | PASS | Opt-in region: placeholder, then calendar after "Show the booking calendar". Standard region: calendar shown. |
| 6.1d | Inline calendar on the audit thank-you page | PASS | `calendlyInline: true` on `/free-seo-audit/thank-you`. |
| 6.1e | Inline calendar on /trasys-ai (demo) and /thank-you | PASS (code path) | Same component as 6.1c. Visually checked on /contact only. |
| 6.1f | `generate_lead` on Calendly booking | Needs production check | Listener for `calendly.event_scheduled` from calendly.com is in place. No real booking made. |
| 6.2a | tawk.to snippet with property and widget IDs | PASS | Loads `embed.tawk.to/6afbf0ccd391ea3cc3c8a899/1k7k297u3`. |
| 6.2b | Chat does not hurt Core Web Vitals | PASS (code) | Loads at first idle (max 5 s) or first interaction, never during the hero animation. Not measured with Lighthouse: Phase 8. |
| 6.2c | Chat bubble does not cover sticky CTA or WhatsApp | PASS | Mobile screenshot: chat bottom-right, booking and WhatsApp bottom-left, no overlap. |
| 6.2d | Mobile: no tawk.to greeting pop-up on the page | PASS | Mobile: tawk.to not loaded until the visitor taps "Chat with us". |
| 6.2e | Desktop: chat appears automatically after consent | PASS | Desktop standard: bubble 64×60 after Accept all. Desktop greeting bubble still shows (tawk dashboard setting). |
| 6.2f | Chat mentioned in cookie and privacy policies | PASS | Both policies name tawk.to and its cookies (`twk_idm_key`, `TawkConnectionTime`, `twk_uuid_*`). |
| 6.2g | Consent respected for EU/UK chat | PASS | Opt-in region: no tawk.to script until Accept, or until the visitor taps the chat button. |
| 6.3a | Forms post to `/api/contact` with source page, UTM, form name | PASS (fields), Needs production check (lead email) | Client sends `source`, `type`, UTM/gclid/landing/referrer; server adds them to the email. Email arrival not tested. |
| 6.3b | Honeypot | PASS | Filled honeypot returns `{ok:true}` without sending (curl). |
| 6.3c | Turnstile | PASS (test keys); Needs production check (real keys) | No token → 403. Test secret: token accepted, request reaches the email step. Real secret: forged token rejected by Cloudflare's siteverify (`invalid-input-response`). |
| 6.3d | Validation, clear errors, success state, thank-you URL | PASS | Missing fields → 400 with message. Audit: success goes to `/free-seo-audit/thank-you`; contact goes to `/thank-you`. Email failure shows the friendly error (browser run). |
| 6.3e | Email notification to sales | Needs production check | SMTP is set in Vercel Production per the founders. Locally the server logs `SMTP is not configured`, as designed. |
| 6.3f | Trasys design-partner form sends to the right place | PASS (API path) | Validation returns 400 when company or use case is missing. Full request reaches the email step. |
| 6.4a | `tel:` links | PASS (code) | Header, footer, contact cards and office details use `tel:+918283881336`. |
| 6.4b | WhatsApp link | PASS (DOM) | `https://wa.me/918283881336?text=…` in header, footer, mobile bar and /contact (5 links on /contact). |
| 6.4c | Visible email | PASS | `sales@konsilience.tech` in footer, contact page, office block. |
| 6.4d | Click events (`click_to_call`, `whatsapp_click`, `email_click`) | Needs production check | Dispatched in code. In tests, GA collection requests were blocked on purpose, so the events could not be confirmed. |
| 7 | Cookie consent: reject → no GA, no chat, no map or calendar until clicked | PASS | Opt-in region: after "Reject non-essential", no gtag, no tawk.to, map and calendar placeholders. |
| 8 | Cookie consent: accept → GA and chat | PASS | Standard region: `_ga` and `_ga_0FV9HNCG9Q` set; tawk.to loads. |
| 9 | Withdrawing analytics consent removes GA cookies | PASS | After "Save choices" with analytics off, `_ga*` cookies gone. |
| 10 | Exit-intent pop-up | PASS | Desktop: opens on exit through the top after 15 s, once per session. Mobile: never. Not shown while the banner is open or after a booking or chat. |
| 11 | Region detection | PARTIAL | Timezone fallback tested (Europe/Berlin → opt-in, Asia/Kolkata → standard). Vercel's `x-vercel-ip-country` header only exists in production. |
| 12 | Lead-source (UTM) capture into the sales email | Needs production check | Stored per visit and sent with forms; the server accepts and includes UTM fields (curl). |

## Blocking before launch

1. **Set `TURNSTILE_SECRET_KEY` in Vercel Production** (the production secret, not the test one). Until then the server skips the spam check and logs a warning. The site still works, but spam protection is off.
2. Confirm the Turnstile widget's allowed hostnames include `konsilience.tech` and `www.konsilience.tech`.
3. Submit one test each through the contact, audit, design-partner and application forms on production. Check the sales inbox for the email and the attribution rows.
4. Book one test Calendly event on production and confirm `generate_lead` appears in GA4 real-time.
5. Check GA4 real-time for `click_to_call` and `whatsapp_click` after one click on each.
