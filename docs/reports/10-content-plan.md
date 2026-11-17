# Phase 10: Blog and content plan

Date: 2026-11-17 · Branch: `website-fix` · Source: `docs/brief/konsilience_blog_clusters.md`

**Status:** the blog template is ready and 16 outlines are written. **Nothing new is published.** Every outline must pass the Phase 3 checks and get founder sign-off before it becomes a post.

## 1. What is ready

| Item | Where | Notes |
| --- | --- | --- |
| Blog template | `app/blog/[slug]/page.tsx` | Already has: "On this page" table of contents, author box, date, reading time, share links, three related posts, closing CTA. The closing CTA now reads "Book a 15-min call" and links to `/contact#book`. |
| Outlines, Konsilience (8) | `content/drafts/konsilience/` | The brief's "suggested first 8" posts, in order. Each has a direct-answer placeholder, H2 outline, the material we need, and the Phase 3 checklist. |
| Outlines, Trasys (8) | `content/drafts/trasys/` | The brief's "suggested first 8" Trasys posts. Each ends with "Start free" to `https://www.trasys.dev/sign-up`. |

Each outline has front matter: `status: outline`, `cluster`, `order`, `intent`, `cta`, `cta_link`, `target_page`, `blocked_by`.

## 2. Publishing order

**Konsilience** (one post per week, per the brief):

| Week | Outline | Blocked by |
| --- | --- | --- |
| 1 | `b2b-seo-audit-checklist-20-checks` | Nothing. Needs our audit template and an example result. |
| 2 | `b2b-website-not-ranking-7-reasons` | Nothing. Needs real before/after examples. |
| 3 | `build-vs-buy-software-small-service-businesses` | Nothing. |
| 4 | `custom-software-cost-2026` (pillar) | **Our price ranges**, dated, from our own quotes. |
| 5 | `security-checklist-ai-generated-apps` | Free-app-review CTA decision. |
| 6 | `ai-built-app-breaks-with-real-users` (pillar) | Free-app-review CTA decision; anonymised rescue examples. |
| 7 | `field-service-software-cost-2026` | **Project list** (deferred): needs a real field service build of ours. |
| 8 | `how-we-built-a-flagship-project` | **Project list** (deferred): needs the confirmed strongest project. |

**Trasys** (one post every two weeks):

| Fortnight | Outline | Blocked by |
| --- | --- | --- |
| 1 | `how-to-track-llm-cost-per-user-feature` | Code examples tested against current SDKs. |
| 2 | `why-llm-apps-need-observability` | Nothing. Needs one real trace screenshot with personal data removed. |
| 3 | `why-llm-bill-higher-than-expected` | Real or clearly labelled examples. |
| 4 | `opentelemetry-llm-apps-getting-started` | Which OpenTelemetry GenAI conventions and version Trasys supports. |
| 5 | `agent-loop-burns-budget` | Label the example as illustrative. |
| 6 | `self-hosted-vs-saas-llm-observability` | **Confirm self-hosting is supported.** |
| 7 | `why-we-built-trasys-free-for-now` | **Founders' words**, and approved wording for "free while in early access". |
| 8 | `llm-observability-tools-compared` | Source every vendor claim; date the post. |

## 3. Existing blog posts that need Phase 3 review before more are added

The site already has six posts. Each needs a Phase 3 check, and some need changes now:

| Post | Problem |
| --- | --- |
| `cloud-cost-optimization-guide` | Title says "Cut 30%". This figure is unsourced. Remove it or source it. The same claim appears in `public/llms.txt`. |
| `app-development-cost-2026` | A "transparent breakdown" of costs. Must come from our own quotes, dated, or be removed. |
| `agentic-ai-enterprise-playbook` | The header bar promises "Get your free copy". No copy exists on the site. Either make the PDF or change the bar to link to the article. |
| `modernize-legacy-without-downtime`, `design-systems-that-scale`, `rag-architecture-patterns` | Generic. Need our own examples or a clear "how we approach it" section. |

## 4. Proof posts from the projects (blocked)

The brief asks for the best 10 "How we built X" posts. This needs the real project list, which is deferred. Until then there are no candidates. When the list arrives, rank each project on:

1. Our team built it, and we may show it (permission confirmed).
2. Evidence exists: a demo, screenshots of the running app, or a video.
3. There is a real result, or we can describe the build without one.
4. It fits a niche we sell (field service, property, transport and travel, legal, clinics and salons).

Label each post with its type: client delivery, own product or demo build.

## 5. Decisions needed from the founders

1. **Where the Trasys blog lives.** The brief says `/blog` on the Trasys site. That is `trasys.dev`, a separate site not in this repository. Either we publish the Trasys outlines there, or add a `/trasys-blog` section here and cross-post to dev.to or Hashnode with a canonical link.
2. **"Free app review" CTA.** Three outlines use it, but it is not an offer on the site. Confirm we offer it, or use "Book a 15-min call" everywhere.
3. **Pricing content.** Two cost posts need our real price ranges, dated. Without them the posts stay as outlines.
4. **Self-hosting.** Is it supported? One Trasys post depends on it.
5. **Cadence.** Starting week 1 requires founder time to write or review one post a week. The outlines are written so that most of the work is filling in our own facts.

## 6. Rules before any post goes live

- Run the Phase 3 checks on the final text (exact-phrase search, similarity against the other posts, banned-phrase list, linked sources for every statistic).
- Direct answer in the first 100 words. One clear CTA. Internal link to the matching service page.
- No claim about cost, time or results unless it is ours and dated.
- Founder sign-off.
