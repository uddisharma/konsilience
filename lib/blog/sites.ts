import type { Site } from "./schema";

/*
 * Where each site's blog lives and how its posts are written.
 * Konsilience posts render on this site at /blog. Trasys posts are served to trasys.dev through
 * the public API (/api/public/posts?site=trasys); their canonical URL points at trasys.dev.
 */

export type SiteConfig = {
  key: Site;
  name: string;
  baseUrl: string;
  blogPath: string;
  categories: string[];
  defaultAuthor: { name: string; role: string };
  defaultCta: { title: string; text: string; label: string; href: string };
  guidelines: string;
};

export const siteConfigs: Record<Site, SiteConfig> = {
  konsilience: {
    key: "konsilience",
    name: "Konsilience",
    baseUrl: "https://www.konsilience.tech",
    blogPath: "/blog",
    categories: ["AI", "Engineering", "Design", "Cloud", "Business", "SEO", "Growth"],
    defaultAuthor: { name: "Konsilience Team", role: "Engineering & AI practice" },
    defaultCta: {
      title: "Want to put these ideas to work?",
      text: "Book a 15-minute call and we will talk through your project.",
      label: "Book a 15-min call",
      href: "/contact#book",
    },
    guidelines: `Konsilience is a software, AI and growth studio (Mohali, India; clients worldwide).
Audience: founders, CTOs and marketing heads at small and mid-size businesses.
Goal: Google and AI-search traffic that turns into audit requests and discovery calls.

Writing rules:
- Give the direct answer in the first 100 words. No warm-up paragraph.
- Plain, specific English. Short sentences. No hype, no empty superlatives, no stock phrases
  ("in today's fast-paced world", "unlock", "leverage", "game-changer", "delve", "seamless").
- No claim about cost, time or results unless it is ours and dated. Mark anything you are not
  sure of with [VERIFY] so the team can check it before publishing.
- Every statistic needs a linked source, or leave it out.
- One clear CTA. Default: "Book a 15-min call" -> /contact#book. SEO posts: "Free SEO audit" -> /free-seo-audit.
- Link to the matching service page at least once (internal links: /services/..., /ai/...,
  /digital, /free-seo-audit, /portfolio, /contact#book).
- Use H2 headings for the main sections (they build the "On this page" menu), H3 for sub-points.
- Add an FAQ block at the end when the topic has common questions (it becomes FAQ rich results).`,
  },
  trasys: {
    key: "trasys",
    name: "Trasys",
    baseUrl: "https://www.trasys.dev",
    blogPath: "/resources/blog",
    categories: ["LLM Cost", "Observability", "OpenTelemetry", "Agents", "Engineering", "Product"],
    defaultAuthor: { name: "Trasys Team", role: "LLM observability" },
    defaultCta: {
      title: "See every LLM call, token and dollar",
      text: "Trasys is free for everyone while we are in early access.",
      label: "Start free",
      href: "https://www.trasys.dev/sign-up",
    },
    guidelines: `Trasys is an LLM observability platform (traces, cost per user/feature, agent and tool-call tracing,
OpenTelemetry-based). It is free for everyone while in early access; never promise it stays free.
Audience: developers, platform engineers and AI teams building LLM apps.
Goal: sign-ups, GitHub stars, design partners and backlinks.

Writing rules:
- Direct answer in the first 100 words. Developer-to-developer tone: precise, no marketing fluff.
- Include working code examples where useful (code blocks with a language). Say which SDK
  version they were written against and mark untested code with [VERIFY].
- Examples that are not real customer cases must be labelled as illustrative.
- Comparisons must be fair and factual: only verified facts, date the post, link sources.
- Every post ends with "Start free" -> https://www.trasys.dev/sign-up.
- Use H2 headings for main sections, H3 for sub-points. Add an FAQ block when it helps.`,
  },
};

export const siteList = Object.values(siteConfigs);

export function postUrl(site: Site, slug: string) {
  const c = siteConfigs[site];
  return `${c.baseUrl}${c.blogPath}/${slug}`;
}
