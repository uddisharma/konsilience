# Konsilience Website: End-to-End Fix Brief v2 (for Claude)

**How to use:** put this file and the two companion files in the root of the website repo:

- `konsilience_website_fix_brief_v2.md` (this file: what to do)
- `konsilience_links_reference.md` (every link and value that goes into the site, and where)
- `konsilience_blog_clusters.md` (blog topics and clusters for Konsilience and Trasys)

Then tell Claude: *"Read the three files. Execute the brief phase by phase. Stop at each checkpoint and show me the report before continuing."*

Site: https://www.konsilience.tech/
Goal: make the site trustworthy, original, fast and SEO-ready, and make it generate leads for our audit-led outbound strategy (free audit, book-a-call, chat). Business goal for the next 90 days: 3-5 paying clients.

---

## 0. Rules Claude must follow

1. **Never invent facts.** No made-up clients, metrics, testimonials, awards, certifications, team members, addresses or prices. If a fact or link is missing, use the exact placeholder name from `konsilience_links_reference.md` (for example `{{CALENDLY_INTRO_URL}}`) and add it to `OPEN_QUESTIONS.md`.
2. **Never hard-code links or contact details.** Put every value in one config file (`site.config.ts`, `.js` or `.json`, matching the stack). Components read from it, so the founders fill each value once.
3. **Never delete a page, section or claim without logging it** in `CHANGELOG.md` with the reason. For removed URLs, add a 301 redirect.
4. Work on a **new git branch** (`website-fix`). One commit per phase. Do not push to production.
5. All copy must be **original**: not copied from competitors, templates, directories or the products our projects resemble (see Phase 3).
6. Use plain, specific English. Sell outcomes, not technology lists. Avoid filler such as "in today's fast-paced digital landscape", "cutting-edge", "world-class", "seamless", "unlock", "leverage".
7. Legal, compliance and client-related statements need founder confirmation. Mark them `NEEDS_CONFIRMATION` and do not publish them as fact.
8. After each phase write the report listed in that phase and **stop for review**.

---

## 1. Known context (verify everything yourself)

- **Konsilience:** AI-first digital engineering and product studio with three offers: **IT Solutions** (custom software, MVPs, AI agents, dedicated developers), **Digital Marketing** (B2B SEO and related services, delivered with a specialist partner team), and **Trasys** (AI and LLM observability and cost tracking).
- **The 35 projects:** the founders confirm the team created all 35 projects. We may claim them as **"35 products and platforms designed and built by our team"**, using our own content for each (Phase 4). Do not call them client deliveries, and do not write "clients served", "trusted by" or "live in production" for any project unless the founders confirm that specific project is a client delivery or is live.
- **Real client or own-product proof we can name:** Thribute, a print-advertising design tool, Safarway, Trasys. Confirm each one's status (client delivery, own product) before naming it.
- **Trasys is free for everyone right now.** Show that clearly ("Free for everyone while we are in early access"). Do not show per-GB or any other pricing as current. Do not promise it stays free forever. Wording about future pricing needs founder confirmation.
- Findings from our earlier review to re-check:
  - The home page leads with IT and AI; Digital Marketing (our fastest cash vertical) is buried in a long services list.
  - "Since 2021" and "12 industries" need checking. The industry count must be derived from the real project list, not copied from the old text.
  - A compliance list including FedRAMP, SOX, ISO 27001, SOC 2 may be unsupported.
  - "Global hubs" pages (Dubai, UK, USA, Canada, Australia) with no office in those places.
  - No visible prices, no booking calendar, no team faces, no case studies with results.
- **Target buyers:** (a) founders and marketing heads of B2B companies (10-200 employees) for Digital Marketing; (b) funded or early startups needing an MVP or developers, and small service businesses (field service, property, transport) needing custom software, for IT Solutions; (c) developers and AI teams for Trasys.

---

## 2. Inputs

All links, IDs, contact details and assets are listed with their exact placeholder names, where to get each one and where it goes in `konsilience_links_reference.md`. Until a value is supplied, keep the placeholder, and at the end of each phase list the placeholders still open in `OPEN_QUESTIONS.md`.

---

## Phase 1: Discovery and full inventory

- [ ] Detect the stack (framework, CMS, hosting, build, deployment, analytics, forms) and write it down.
- [ ] Crawl every route and list all pages: URL, title, meta description, H1, word count, canonical, indexability, internal links in and out, status code.
- [ ] Find orphan pages, duplicate titles, descriptions and H1s, broken links, redirect chains, missing alt text, empty pages, placeholder text (lorem ipsum, "coming soon") and dead buttons.
- [ ] List every third-party script, font, embed and tracking pixel with its performance cost.
- [ ] Run Lighthouse (mobile) on home, a service page, an industry page, a location page, portfolio and contact. Save the scores as the baseline.
- [ ] Create the central config file (`site.config`) with every placeholder from `konsilience_links_reference.md`, and replace any hard-coded link, phone or email in the code with config values.

**Output:** `reports/01-inventory.csv`, `reports/01-discovery.md`. **Stop for review.**

---

## Phase 2: Claims register (truth check)

Extract **every factual claim** on the site: counts (projects, years, clients, industries, countries, team size, animated counters), certifications and compliance badges, awards, partnerships, client names and logos, testimonials, "global hubs", technology claims, SLA or uptime claims, and any pricing.

Write each in `reports/02-claims-register.md`:

| Claim | Page(s) | Evidence we can show | Status (`PROVABLE`, `NEEDS_CONFIRMATION`, `REMOVE`) | Proposed wording |

Rules:
- **Project count:** "35 projects" is `PROVABLE` once Phase 4 shows each project has evidence (demo, repo, screenshots or video). Use the wording from section 1.
- **Industries:** count the industries from the 35 project records and use only that number.
- **Years and "since 2021":** keep only if the founders confirm what it refers to (company, team experience, first project). Otherwise reword or remove.
- **Compliance:** do not claim FedRAMP, SOX, ISO 27001 or SOC 2 without a certificate. Wording like "built following GDPR and HIPAA-aligned practices" is allowed only if the practices are really followed, and then list them.
- **Third-party logos and trademarks:** do not use them without permission. Competitor and inspiration names may appear only in plain comparative text, never with logos or screenshots of their UI.
- **Testimonials and client names:** only with written permission. Otherwise anonymise ("a US field service company").
- **Global hubs:** claim only a presence we really have. Otherwise say "we serve clients in ...".
- **Trasys:** "free for everyone" is the current claim. No other price is shown as current.

**Stop for review** and wait for the founders' decisions before rewriting claims.

---

## Phase 3: Content quality, originality and plagiarism check

Do this for **every page, blog post, case study and project description**, and repeat for each new piece of content before publishing.

### 3.1 External plagiarism and copy check
- [ ] Extract the main text of each page.
- [ ] Take 5-8 distinctive sentences per page and run **exact-phrase web searches** (in quotes). Record every match on another site.
- [ ] If I give you Copyscape, Originality.ai, Quetext or Grammarly access, run the full pages through it. If not, say so and list "run through Copyscape or Quetext" as a manual step for me.
- [ ] Compare each service and industry page with the top 3 competitor pages for the same topic. Flag mirrored structure or wording.
- [ ] **Project copy:** for each of the 35 projects, check that the descriptions, feature lists and screenshots are our own and not copied from the marketing text or UI of the product it resembles. Flag any project whose copy or UI closely imitates a known product's text, logo, name or distinctive design, and recommend rewriting or restyling.
- [ ] Reverse-check images. Every image, icon, illustration and font needs a license or source in `reports/03-assets-licenses.csv`; replace anything without one. Check theme and template licenses.

### 3.2 Internal duplication
- [ ] Write a script that compares all pages using 5-word shingles and Jaccard or cosine similarity. Flag any pair above **40%**. Location, industry and project pages are the main risk. Rewrite with truly different content, or merge or remove them (with 301 redirects).

### 3.3 Generic or boilerplate text
- [ ] Flag stock phrases (list in `reports/03-banned-phrases.txt`), empty superlatives and sentences that say nothing specific.
- [ ] Do not rely on "AI detector" scores. They are unreliable. Judge by specificity, accuracy and originality.

### 3.4 Quality and accuracy
- [ ] Spelling, grammar, consistent names ("Konsilience", "Trasys"), consistent tone.
- [ ] Every statistic has a linked source or is removed.
- [ ] Every page answers: who is this for, what do we do for them, what result, what is the next step.

### 3.5 Rewrite standard
Keep the true meaning, use specific details from the real projects (timelines, steps, features, tech), and write in our own words. Do not paraphrase a competitor sentence by sentence.

**Output:** `reports/03-content-audit.csv`, `reports/03-plagiarism-report.md`, `reports/03-similarity.csv`, `reports/03-assets-licenses.csv`. **Stop for review.**

---

## Phase 4: Portfolio: claiming the 35 projects with our own content

Goal: turn the 35 projects into proof that sells, honestly.

### 4.1 Collect one record per project
For each project create `content/projects/<slug>.md` with this front matter (Claude fills what it can from repos, READMEs and the old site; the founders fill the rest):

```yaml
---
slug: ""
name: ""
type: ""            # client-delivery | own-product | demo-build   (founders confirm)
industry: ""
year: ""
one_line: ""        # what it does and for whom, in one sentence
problem: ""
what_we_built: ""   # features in plain language
tech_stack: []
status: ""          # live | demo | prototype
demo_url: ""        # {{PROJECT_<SLUG>_DEMO_URL}} if not yet known
video_url: ""
repo_url: ""        # only if public
screenshots: []     # real screenshots of our own build
result: ""          # only real, confirmed results; otherwise leave empty
---
```

Claude also produces `reports/04-projects-input-sheet.csv` (one row per project with the missing fields) so the founders can fill it quickly.

### 4.2 Evidence rule
Each project must have at least one of: working demo, public repo, screenshots of the running app, or a video. List projects with no evidence in `reports/04-missing-evidence.md`. Do not publish a project without evidence.

### 4.3 Portfolio pages
- [ ] `/projects` index with filters by industry and by type (badge: **Client delivery**, **Our own product**, **Demo build**), and the headline "35 products and platforms designed and built by our team" (number computed from the records).
- [ ] `/projects/<slug>` page per project: problem, what we built, features, tech, screenshots, demo or video link, and a CTA ("Need something like this? Book a 20-min call" using `{{CALENDLY_INTRO_URL}}`).
- [ ] Group projects by the two or three niches we target (field service, property, transport and travel, legal, clinics and salons, or whichever the records show) and link each group to its service page.
- [ ] For the 4-6 strongest projects (Thribute, Safarway, the print design tool, Trasys and others the founders pick) write a full case study. Use only confirmed facts.
- [ ] Add `SoftwareApplication` or `CreativeWork` structured data only for projects with a public URL.

**Output:** `reports/04-portfolio-plan.md`, the project pages. **Stop for review.**

---

## Phase 5: Positioning, information architecture and copy

### 5.1 Navigation
Services (IT Solutions, Digital Marketing, Trasys) | Projects | Packages | Blog | About | **Book a call** (button).

### 5.2 Pages to create or rework
- [ ] **Home:** hero for a specific buyer with one result, primary button "Book a 20-min call", secondary "Get a free audit"; the three offers; proof (the 35 projects headline and 3-4 featured projects, plus real named or anonymised results); process; FAQ; final CTA.
- [ ] **/digital-marketing (B2B SEO):** who it is for, what is included, 3 packages (Starter, Growth, Scale) with "from" prices once confirmed, sample audit, process, FAQ, free-audit form.
- [ ] **/free-seo-audit:** short form (name, work email, website URL, main goal), explains what they get and when, thank-you page with the Calendly audit embed.
- [ ] **/it-solutions:** MVP with a fixed timeline (keep "8-14 weeks" only if confirmed), dedicated developers, discovery sprint, "from" prices once confirmed, link to the matching projects.
- [ ] **/trasys:** hero "Free for everyone while we are in early access", what it does (LLM tracing, cost tracking), how to start (`{{TRASYS_SIGNUP_URL}}`), docs link, demo video, design-partner application form. No other pricing shown. Remove any per-GB wording.
- [ ] **/about:** founders and team with real photos, bios, LinkedIn links, how we work, location (Mohali), and what "AI-first" actually means in our process (what AI does, where humans stay accountable).
- [ ] **/industries:** keep only the niches that match real projects. Merge or remove the rest.
- [ ] **/blog:** index, post template with author, date, reading time, related posts, CTA. Outlines go in `content/drafts/` (see `konsilience_blog_clusters.md`).
- [ ] **/contact:** form, Calendly inline embed, phone, WhatsApp, email, address.
- [ ] **Legal:** privacy policy, terms, cookie policy. Mark as `NEEDS_CONFIRMATION` for CA or lawyer review.
- [ ] **Global hubs:** keep a page only if it has unique local content (rules, pricing, relevant examples). Otherwise merge into one "Where we work" page.

### 5.3 Copy rules
- Headline = result for a specific buyer, for example: "B2B SEO that brings qualified leads, starting with a free audit."
- Every section ends with a next step. No dead ends.
- Show price signals ("from") and timelines once confirmed.
- Explain "AI-first" concretely, not as a buzzword.

**Output:** `reports/05-ia-and-copy-plan.md`, then the pages. **Stop for review** before publishing copy.

---

## Phase 6: Conversion setup (Calendly, tawk.to, forms, contact)

### 6.1 Calendly
- [ ] Load the Calendly script and styles once (`https://assets.calendly.com/assets/external/widget.js` and `widget.css`).
- [ ] Header button and sticky mobile button **"Book a 20-min call"** open the popup with `{{CALENDLY_INTRO_URL}}`.
- [ ] Inline embeds: /contact (`{{CALENDLY_INTRO_URL}}`), the free-audit thank-you page (`{{CALENDLY_AUDIT_URL}}`), /trasys (`{{CALENDLY_TRASYS_URL}}`).
- [ ] Send a GA4 event when a booking is made, by listening for the `calendly.event_scheduled` message (event `generate_lead`, method `calendly`).

### 6.2 tawk.to chat
- [ ] Add the standard snippet using `{{TAWK_PROPERTY_ID}}` and `{{TAWK_WIDGET_ID}}`. If the site uses Next.js or React, use `next/script` with `strategy="lazyOnload"`; otherwise inject it after the load event. It must not hurt Core Web Vitals.
- [ ] Do not overlap the chat bubble with the sticky mobile CTA, the WhatsApp button or the cookie banner.
- [ ] Mention chat in the cookie and privacy policy, and respect consent rules for EU and UK visitors.
- [ ] Tell me (in `OPEN_QUESTIONS.md`) to set, in the tawk.to dashboard: business hours, a pre-chat form (name and email), a proactive message on services and pricing pages after 20-30 seconds, and a reply roster.

### 6.3 Forms
- [ ] Every form posts to `{{FORM_ENDPOINT}}` with source page, UTM parameters and form name.
- [ ] Spam protection (honeypot plus Cloudflare Turnstile, hCaptcha or reCAPTCHA), validation, clear errors, success state and a thank-you URL.
- [ ] Email notification to `{{SALES_EMAIL}}`.
- [ ] Trasys sign-up and design-partner forms send to the right place (`{{TRASYS_SIGNUP_URL}}` or `{{FORM_ENDPOINT}}`).

### 6.4 Contact methods
- [ ] `tel:` links for `{{US_PHONE}}` and `{{IN_PHONE}}`, WhatsApp link (`https://wa.me/{{WHATSAPP}}`), a visible email. Track clicks as GA4 events.

**Output:** `reports/06-conversion-checklist.md` with a test result per item. **Stop for review.**

---

## Phase 7: Technical SEO

- [ ] Unique `<title>` (about 50-60 characters) and meta description (about 150-160) per indexable page. One H1 per page. Logical H2/H3 order.
- [ ] Clean, lowercase, hyphenated URLs, a canonical on every page, 301 redirects for every removed or renamed URL, no redirect chains.
- [ ] `sitemap.xml` (indexable URLs only) and `robots.txt`. Staging and preview URLs `noindex`.
- [ ] Open Graph and Twitter card tags with a proper image per page.
- [ ] **Structured data (JSON-LD), only for true things:** Organization and WebSite (home, with `sameAs` from the social and directory links), Service, FAQPage (visible FAQs only), BlogPosting with author, BreadcrumbList, SoftwareApplication (Trasys), LocalBusiness or ProfessionalService for Mohali only with a real address and phone. Validate with Google's Rich Results Test.
- [ ] Internal links: service pages link to matching projects, case studies and blog posts, and back. Blog posts link to the service page and the audit page.
- [ ] Images: WebP or AVIF, correct sizes, `width` and `height`, lazy-load below the fold, descriptive alt text.
- [ ] Custom 404 page with useful links.
- [ ] Question-style H2s with a short direct answer underneath (helps Google and AI answer engines).
- [ ] Same name, description and contact details everywhere (site, schema, social, directories).

**Output:** `reports/07-seo-audit.md`. **Stop for review.**

---

## Phase 8: Performance, accessibility and security

**Performance (mobile):** LCP under 2.5 s, INP under 200 ms, CLS under 0.1, Lighthouse Performance 90+ where realistic.
- [ ] Limit font families and weights, use `font-display: swap`.
- [ ] Cut JavaScript bundle size; remove unused libraries and blocking animations.
- [ ] Load Calendly, tawk.to and analytics late or on interaction.
- [ ] Compression, caching headers, CDN if available.

**Accessibility (WCAG 2.2 AA basics):**
- [ ] Color contrast, visible focus, keyboard navigation, form labels, alt text, descriptive link text, heading order, `lang` attribute, reduced-motion support.

**Security and hygiene:**
- [ ] HTTPS and HSTS, security headers (CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
- [ ] No secrets or API keys in the repo or client bundle. Use environment variables (for example the CAPTCHA secret key stays server-side).
- [ ] Run the dependency audit (`npm audit` or equivalent) and fix high-severity issues.
- [ ] Remove test routes, production source maps and console logs.

**Output:** `reports/08-performance-a11y-security.md` with before and after scores. **Stop for review.**

---

## Phase 9: Analytics, tracking and privacy

- [ ] Install GA4 (`{{GA4_ID}}`) and verify Search Console (`{{GSC_VERIFICATION}}`). Remind me to submit the sitemap.
- [ ] Track: `generate_lead` (form submit, Calendly booking), `chat_started`, `click_to_call`, `whatsapp_click`, `audit_form_submit`, `trasys_signup`, `project_demo_click`. Mark the important ones as key events.
- [ ] Consistent UTM naming (`utm_source`, `utm_medium`, `utm_campaign`), captured in forms.
- [ ] Cookie consent banner with consent mode, linked to the privacy and cookie policies.
- [ ] Write `docs/tracking-plan.md` listing every event and where it fires.

**Output:** `reports/09-tracking-plan.md`. **Stop for review.**

---

## Phase 10: Blog and content system

- [ ] Blog at `/blog` on the same domain (not a subdomain). Template with author box, date, reading time, table of contents, related posts, CTA to audit or call.
- [ ] Trasys blog at `/blog` on the Trasys site, with a canonical link to the original if a post is cross-posted to dev.to or Hashnode.
- [ ] Create outlines (not final posts) in `content/drafts/` using the clusters in `konsilience_blog_clusters.md`. Final posts must pass Phase 3 before publishing.
- [ ] Every post: a direct answer in the first 100 words, original content (our own numbers, screenshots, tables), sources linked, internal links, one clear CTA.
- [ ] Each of the 35 projects can become a "How we built X" post. List the best 10 candidates in `reports/10-content-plan.md`.

**Output:** blog template, `reports/10-content-plan.md`.

---

## Phase 11: Final QA

- [ ] Link checker: no broken internal or external links.
- [ ] Test all forms, Calendly popup and inline, tawk.to, phone, WhatsApp and email links on desktop and mobile.
- [ ] Cross-browser: Chrome, Safari, Firefox, Edge; iOS Safari and Android Chrome.
- [ ] Validate HTML, structured data, sitemap and robots.
- [ ] Re-run Lighthouse on the Phase 1 pages and compare.
- [ ] Re-run the Phase 3 originality and similarity checks on all final copy, including the 35 project pages.
- [ ] Resolve or remove every `NEEDS_CONFIRMATION` item.
- [ ] Confirm no `{{PLACEHOLDER}}` remains in the built output. Run `grep -rn "{{" .` and list what is left.

**Output:** `reports/11-qa-report.md`, final `CHANGELOG.md` and `OPEN_QUESTIONS.md`.

---

## Deliverables summary

| File | Contents |
| --- | --- |
| `reports/01-inventory.csv`, `01-discovery.md` | Pages, issues, stack, Lighthouse baseline |
| `reports/02-claims-register.md` | Every claim with evidence and decision |
| `reports/03-*` | Content audit, plagiarism, similarity, asset licenses |
| `reports/04-*`, `content/projects/` | 35-project records, missing evidence, portfolio plan |
| `reports/05-ia-and-copy-plan.md` | New structure and copy plan |
| `reports/06-conversion-checklist.md` | Calendly, tawk.to, forms, contact tests |
| `reports/07-seo-audit.md` | Technical SEO fixes |
| `reports/08-performance-a11y-security.md` | Before and after scores |
| `reports/09-tracking-plan.md` | Analytics events and consent |
| `reports/10-content-plan.md`, `content/drafts/` | Blog system and outlines |
| `reports/11-qa-report.md` | Final QA |
| `CHANGELOG.md`, `OPEN_QUESTIONS.md` | What changed and what Claude still needs |

## Definition of done

Every claim is provable or removed; all 35 projects are shown with evidence and an honest type badge; no page is duplicated or copied; Trasys is shown as free for everyone; every page has one clear next step; Calendly, chat, forms and tracking work and are measured; Core Web Vitals pass on mobile; structured data validates; the sitemap is submitted; and no placeholder or open question remains.
