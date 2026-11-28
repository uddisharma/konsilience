import { industryList, posts, resourceTypes, serviceList } from "./catalog";
import { registry, type Entry } from "./image-registry";
import { siteUrl } from "./routes";

// Static marketing images in /public/images, rendered by scripts/render-images.mjs from lib/image-registry.ts.
// Served from their direct URLs (no /_next/image) so every search engine can crawl and index them.

export type SiteImage = { src: string; alt: string; width: number; height: number };

const PX: Record<Entry["size"], [number, number]> = { hero: [1600, 1200], wide: [1600, 900], cover: [1200, 750], case: [1600, 1000], card: [1200, 900] };

const byId = (id: string) => {
  const e = registry.find((x) => x.id === id);
  if (!e) throw new Error(`Unknown image: ${id}`);
  return e;
};

const toImage = (e: Entry): SiteImage => ({ src: `/images/${e.file}.webp`, alt: e.alt, width: PX[e.size][0], height: PX[e.size][1] });

/** Image by registry id, e.g. "services-overview". */
export const image = (id: string) => toImage(byId(id));

// Main service → hero and share image. The artwork predates the current service list, so three of
// the five borrow the closest existing illustration until new ones are rendered.
const CATEGORY_IMAGE: Record<string, string> = {
  "AI & Automation": "ai-overview",
  "Cloud & DevOps": "svc-digital-transformation",
  Security: "security",
  "Product Engineering": "svc-product-engineering",
  "Digital Marketing": "svc-digital-marketing",
};
const AI_IMAGE: Record<string, string> = {
  "agentic-ai": "ai-agentic",
  "generative-ai": "ai-generative",
  "ai-copilots": "ai-copilots",
  "computer-vision": "ai-vision",
  "conversational-ai": "ai-conversational",
};

/** Hero image for a service page, by its category. */
export const serviceCategoryImage = (category: string) => image(CATEGORY_IMAGE[category]);
/** Hero image for an AI solution page. */
export const aiSolutionImage = (slug: string) => image(AI_IMAGE[slug]);

const RESOURCE_IMAGE: Record<string, string> = {
  "The AI Readiness Guide": "res-ai-readiness",
  "MVP Development Guide": "res-mvp",
  "Cloud Migration Checklist": "res-cloud-checklist",
  "Design System Starter Kit": "res-design-system",
  "Agentic AI for Growing Businesses": "res-agentic-whitepaper",
  "The State of Legacy Modernization": "res-legacy-whitepaper",
  "Responsible AI Governance Framework": "res-governance-whitepaper",
  "Konsilience launches Trasys AI": "res-press-trasys",
  "Konsilience moves into its new Mohali office": "res-press-office",
  "35+ projects done and counting": "res-press-35",
  "Building Production RAG Systems": "res-webinar-rag",
  "From Monolith to Microservices": "res-webinar-monolith",
  "AI Copilots for Sales Teams": "res-webinar-copilots",
};
/** Cover for one resource item (/resources/[type]), by its title in lib/catalog.ts. */
export const resourceCover = (title: string) => image(RESOURCE_IMAGE[title]);

const INDUSTRY_IMAGE: Record<string, string> = {
  healthcare: "ind-healthcare",
  finance: "ind-finance",
  "retail-and-ecommerce": "ind-retail",
  logistics: "ind-logistics",
  education: "ind-education",
  "real-estate": "ind-real-estate",
  emobility: "ind-emobility",
  wearables: "ind-wearables",
  energy: "ind-energy",
  agriculture: "ind-agriculture",
  gaming: "ind-gaming",
  "ott-and-media": "ind-ott-media",
  "on-demand": "ind-on-demand",
  "food-delivery": "ind-food-delivery",
  travel: "ind-travel",
  aviation: "ind-aviation",
  telecom: "ind-telecom",
  startups: "ind-startups",
};
/** Hero image for an industry page (also its card on /industries). */
export const industryImage = (slug: string) => image(INDUSTRY_IMAGE[slug]);

/** Generated cover for a blog post, by slug (null for posts without one: they keep an uploaded cover or the code-drawn art). */
export function blogCover(slug: string): SiteImage | null {
  const e = registry.find((x) => x.id === `blog-${slug}`);
  return e ? toImage(e) : null;
}

/* ---------- Share images (og:image / twitter:image), 1200×630 JPEG ---------- */

export type OgImage = { url: string; width: number; height: number; alt: string };
const og = (e: Entry): OgImage => ({ url: `${siteUrl}/images/og/${e.file.split("/").pop()}.jpg`, width: 1200, height: 630, alt: e.alt });

/** Share image for a page key: "/services", "/ai/agentic-ai", "/resources/guides", "/portfolio/trasys-ai"… */
export function ogImage(page: string): OgImage | null {
  const e = registry.find((x) => x.og === page);
  return e ? og(e) : null;
}
/** Share image for a service page, by its category. */
export const serviceOgImage = (category: string) => og(byId(CATEGORY_IMAGE[category]));

/* ---------- Image sitemap ---------- */

/** Every generated image with the page it appears on, for <image:image> sitemap entries. */
export function imagesByPage(): Record<string, SiteImage[]> {
  const pages: Record<string, SiteImage[]> = {
    "/services": [image("services-overview")],
    "/ai": [image("ai-production-stack")],
    "/trasys": [image("trasys-llm-trace"), image("trasys-token-cost")],
    "/about": [image("about")],
    "/careers": [image("careers")],
    "/security": [image("security")],
  };
  for (const s of serviceList) pages[`/services/${s.slug}`] = [serviceCategoryImage(s.category)];
  for (const slug of Object.keys(AI_IMAGE)) pages[`/ai/${slug}`] = [aiSolutionImage(slug)];
  for (const t of resourceTypes) pages[`/resources/${t.slug}`] = t.items.map((it) => resourceCover(it.title));
  pages["/industries"] = [image("industries-overview"), ...industryList.map((i) => industryImage(i.slug))];
  for (const i of industryList) pages[`/industries/${i.slug}`] = [industryImage(i.slug)];
  pages["/"] = industryList.map((i) => industryImage(i.slug)); // home Industries section
  // built-in posts; admin posts get theirs in app/sitemap.ts
  pages["/blog"] = posts.map((p) => blogCover(p.slug)).filter((x): x is SiteImage => Boolean(x));
  return pages;
}
