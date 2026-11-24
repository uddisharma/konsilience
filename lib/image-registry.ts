// Single source of truth for every generated marketing image.
// Drives: rendering (app/render-kit + scripts/render-images.mjs), alt text and wiring (lib/images.ts),
// the uniqueness check (scripts/check-image-registry.mjs) and docs/image-style-registry.md.

export const TECHNIQUES = {
  geometric: "Flat geometric shapes",
  blueprint: "Line-art / blueprint",
  duotone: "Duotone",
  halftone: "Halftone / grain texture",
  poster: "Editorial typographic poster",
  isometric: "Isometric diagram",
  fragment: "UI-fragment close-up",
  papercut: "Paper-cut layers",
  mono: "Mono-colour with one accent",
} as const;

export const LAYOUTS = {
  asymmetric: "Asymmetric",
  grid: "Grid",
  split: "Split",
  diagonal: "Diagonal",
  edge: "Edge-cropped",
  left: "Left-weighted",
  right: "Right-weighted",
  type: "Typographic",
} as const;

// Brand palette (app/globals.css) plus neutrals. Each image has its own [background, ink, accent] triple.
export const BRAND = ["#1A69FD", "#5E96FE", "#0C4FCB", "#0B2F86", "#031432", "#020615", "#000000", "#191918", "#3E3E3D", "#888886", "#CECECE", "#F8F7F4", "#FFFFFF"] as const;
type Hex = (typeof BRAND)[number];
export type Palette = readonly [bg: Hex, ink: Hex, accent: Hex];

export type Technique = keyof typeof TECHNIQUES;
export type Layout = keyof typeof LAYOUTS;
export type Size = "hero" | "wide" | "cover" | "case" | "card";

export type Entry = {
  id: string; // composition key in app/render-kit/compositions.tsx
  file: string; // output path under /public/images, no extension
  page: string; // route the image is shown on ("/services/[category]" style for templates)
  section: string;
  purpose: string;
  technique: Technique;
  layout: Layout;
  palette: Palette;
  size: Size; // hero 1600×1200 · wide 1600×900 · cover 1200×750 · case 1600×1000 · card 1200×900 (transparent)
  alt: string;
  og?: string; // page group this image also serves as the 1200×630 share image for
};

export const registry: Entry[] = [
  /* ---------- Services ---------- */
  { id: "services-overview", file: "services/technology-services-overview", page: "/services", section: "Hero", purpose: "Range of practices at a glance",
    technique: "poster", layout: "left", palette: ["#F8F7F4", "#020615", "#1A69FD"], size: "hero", og: "/services",
    alt: "The five Konsilience practices and how many services each one covers, 28 services in total" },
  { id: "svc-product-engineering", file: "services/product-engineering-services", page: "/services/[product-engineering]", section: "Hero", purpose: "Product Engineering category",
    technique: "isometric", layout: "right", palette: ["#000000", "#FFFFFF", "#1A69FD"], size: "hero", og: "services:Product Engineering",
    alt: "Isometric stack of the product engineering layers: UI/UX design, web and mobile apps, custom software, QA and DevOps" },
  { id: "svc-digital-marketing", file: "services/digital-marketing-and-growth-services", page: "/services/[digital-marketing]", section: "Hero", purpose: "Digital Marketing & Growth category",
    technique: "halftone", layout: "diagonal", palette: ["#1A69FD", "#FFFFFF", "#020615"], size: "hero", og: "services:Digital Marketing & Growth",
    alt: "Halftone band listing the growth channels Konsilience runs: SEO, paid search, social, content, email and conversion optimisation" },
  { id: "svc-digital-transformation", file: "services/digital-transformation-services", page: "/services/[digital-transformation]", section: "Hero", purpose: "Digital Transformation category",
    technique: "blueprint", layout: "split", palette: ["#031432", "#5E96FE", "#F8F7F4"], size: "hero", og: "services:Digital Transformation",
    alt: "Blueprint diagram of a legacy monolith being replaced step by step by cloud services behind an API gateway" },
  { id: "svc-consulting", file: "services/technology-consulting-services", page: "/services/[consulting]", section: "Hero", purpose: "Consulting category",
    technique: "papercut", layout: "asymmetric", palette: ["#FFFFFF", "#0B2F86", "#1A69FD"], size: "hero", og: "services:Consulting",
    alt: "Layered paper shapes naming the four consulting services: IT, software, mobile app and FinTech consulting" },
  { id: "svc-data-managed-it", file: "services/data-and-managed-it-services", page: "/services/[data-managed-it]", section: "Hero", purpose: "Data & Managed IT category",
    technique: "geometric", layout: "grid", palette: ["#0C4FCB", "#FFFFFF", "#000000"], size: "hero", og: "services:Data & Managed IT",
    alt: "Grid of geometric tiles for big data, data analytics, business intelligence, managed IT services and dedicated teams" },

  /* ---------- AI solutions ---------- */
  { id: "ai-overview", file: "ai-solutions/ai-solutions-overview", page: "/ai-solutions", section: "Hero", purpose: "AI practice overview",
    technique: "fragment", layout: "edge", palette: ["#191918", "#F8F7F4", "#5E96FE"], size: "hero", og: "/ai-solutions",
    alt: "Close-up of TypeScript code defining an AI agent with its tools, spend limit and human approval step" },
  { id: "ai-agentic", file: "ai-solutions/agentic-ai-development", page: "/ai-solutions/agentic-ai", section: "Hero", purpose: "Agentic AI",
    technique: "mono", layout: "right", palette: ["#020615", "#888886", "#1A69FD"], size: "hero", og: "/ai-solutions/agentic-ai",
    alt: "Terminal log of an AI agent planning a refund, calling the order, policy and payment tools, then replying to the customer" },
  { id: "ai-generative", file: "ai-solutions/generative-ai-development", page: "/ai-solutions/generative-ai", section: "Hero", purpose: "Generative AI",
    technique: "poster", layout: "split", palette: ["#5E96FE", "#020615", "#FFFFFF"], size: "hero", og: "/ai-solutions/generative-ai",
    alt: "A question about refund policy answered by generative AI, with each claim linked to the source document it came from" },
  { id: "ai-copilots", file: "ai-solutions/ai-copilot-development", page: "/ai-solutions/ai-copilots", section: "Hero", purpose: "AI Copilots",
    technique: "blueprint", layout: "asymmetric", palette: ["#FFFFFF", "#000000", "#1A69FD"], size: "hero", og: "/ai-solutions/ai-copilots",
    alt: "Line drawing of an email reply draft with an AI copilot suggesting a clearer next step in the margin" },
  { id: "ai-vision", file: "ai-solutions/computer-vision-development", page: "/ai-solutions/computer-vision", section: "Hero", purpose: "Computer Vision",
    technique: "halftone", layout: "edge", palette: ["#F8F7F4", "#0C4FCB", "#020615"], size: "hero", og: "/ai-solutions/computer-vision",
    alt: "Halftone bottles on a production line with computer vision boxes marking a missing cap and a crooked label" },
  { id: "ai-conversational", file: "ai-solutions/conversational-ai-development", page: "/ai-solutions/conversational-ai", section: "Hero", purpose: "Conversational AI",
    technique: "papercut", layout: "right", palette: ["#0B2F86", "#F8F7F4", "#5E96FE"], size: "hero", og: "/ai-solutions/conversational-ai",
    alt: "Paper-cut chat bubbles showing a customer rescheduling a delivery with a conversational AI assistant" },

  /* ---------- Company ---------- */
  { id: "about", file: "about/konsilience-team-disciplines", page: "/about", section: "Our story", purpose: "One team, four disciplines",
    technique: "duotone", layout: "edge", palette: ["#020615", "#F8F7F4", "#5E96FE"], size: "wide", og: "/about",
    alt: "Duotone crop of the Konsilience home page with the four disciplines the team brings together: strategy, design, engineering and AI" },
  { id: "careers", file: "careers/life-at-konsilience", page: "/careers", section: "Hero", purpose: "Benefits of working here",
    technique: "poster", layout: "grid", palette: ["#F8F7F4", "#000000", "#0C4FCB"], size: "hero", og: "/careers",
    alt: "Typographic grid of the six Konsilience benefits, from health cover and a learning budget to flexible work" },
  { id: "security", file: "security/secure-software-delivery", page: "/security", section: "Hero", purpose: "Security controls",
    technique: "mono", layout: "grid", palette: ["#FFFFFF", "#020615", "#0C4FCB"], size: "hero", og: "/security",
    alt: "Checklist of the four security controls Konsilience applies: data protection, access control, secure SDLC and monitoring" },

  /* ---------- Resources: guides ---------- */
  { id: "res-ai-readiness", file: "resources/guides/ai-readiness-guide-cover", page: "/resources/guides", section: "Card", purpose: "The AI Readiness Guide",
    technique: "poster", layout: "left", palette: ["#000000", "#F8F7F4", "#5E96FE"], size: "cover", og: "/resources/guides",
    alt: "Cover of The AI Readiness Guide, a 24-page guide by Konsilience" },
  { id: "res-mvp", file: "resources/guides/mvp-development-guide-cover", page: "/resources/guides", section: "Card", purpose: "MVP Development Guide",
    technique: "papercut", layout: "diagonal", palette: ["#F8F7F4", "#0B2F86", "#1A69FD"], size: "cover",
    alt: "Cover of the MVP Development Guide, an 18-page guide to launching an MVP in 12 weeks" },
  { id: "res-cloud-checklist", file: "resources/guides/cloud-migration-checklist-cover", page: "/resources/guides", section: "Card", purpose: "Cloud Migration Checklist",
    technique: "blueprint", layout: "right", palette: ["#0B2F86", "#FFFFFF", "#5E96FE"], size: "cover",
    alt: "Cover of the Cloud Migration Checklist, a 12-page phase-by-phase checklist" },
  { id: "res-design-system", file: "resources/guides/design-system-starter-kit-cover", page: "/resources/guides", section: "Card", purpose: "Design System Starter Kit",
    technique: "geometric", layout: "grid", palette: ["#5E96FE", "#FFFFFF", "#020615"], size: "cover",
    alt: "Cover of the Design System Starter Kit, a 30-page guide to tokens, components and governance" },

  /* ---------- Resources: whitepapers ---------- */
  { id: "res-agentic-whitepaper", file: "resources/whitepapers/agentic-ai-for-growing-businesses-cover", page: "/resources/whitepapers", section: "Card", purpose: "Agentic AI whitepaper",
    technique: "mono", layout: "type", palette: ["#191918", "#888886", "#1A69FD"], size: "cover", og: "/resources/whitepapers",
    alt: "Cover of the whitepaper Agentic AI for Growing Businesses" },
  { id: "res-legacy-whitepaper", file: "resources/whitepapers/state-of-legacy-modernization-cover", page: "/resources/whitepapers", section: "Card", purpose: "Legacy modernization whitepaper",
    technique: "halftone", layout: "split", palette: ["#FFFFFF", "#3E3E3D", "#1A69FD"], size: "cover",
    alt: "Cover of the whitepaper The State of Legacy Modernization" },
  { id: "res-governance-whitepaper", file: "resources/whitepapers/responsible-ai-governance-framework-cover", page: "/resources/whitepapers", section: "Card", purpose: "AI governance whitepaper",
    technique: "isometric", layout: "asymmetric", palette: ["#031432", "#F8F7F4", "#1A69FD"], size: "cover",
    alt: "Cover of the whitepaper Responsible AI Governance Framework" },

  /* ---------- Resources: press releases ---------- */
  { id: "res-press-trasys", file: "resources/press-releases/konsilience-launches-trasys-ai", page: "/resources/press-releases", section: "Card", purpose: "Trasys AI launch",
    technique: "fragment", layout: "edge", palette: ["#000000", "#CECECE", "#1A69FD"], size: "cover", og: "/resources/press-releases",
    alt: "Konsilience launches Trasys AI, shown with a crop of the Trasys AI website" },
  { id: "res-press-office", file: "resources/press-releases/konsilience-new-mohali-office", page: "/resources/press-releases", section: "Card", purpose: "New Mohali office",
    technique: "poster", layout: "right", palette: ["#0C4FCB", "#F8F7F4", "#020615"], size: "cover",
    alt: "The new Konsilience office address in Sector 75, Mohali, Punjab, set as an editorial announcement" },
  { id: "res-press-35", file: "resources/press-releases/35-projects-done", page: "/resources/press-releases", section: "Card", purpose: "35+ projects milestone",
    technique: "mono", layout: "diagonal", palette: ["#FFFFFF", "#000000", "#5E96FE"], size: "cover",
    alt: "Thirty-five marks on a diagonal for the 35+ projects the Konsilience team has shipped" },

  /* ---------- Resources: webinars ---------- */
  { id: "res-webinar-rag", file: "resources/webinars/building-production-rag-systems", page: "/resources/webinars", section: "Card", purpose: "RAG webinar",
    technique: "fragment", layout: "split", palette: ["#191918", "#FFFFFF", "#5E96FE"], size: "cover", og: "/resources/webinars",
    alt: "Webinar title card for Building Production RAG Systems with a retrieval code snippet" },
  { id: "res-webinar-monolith", file: "resources/webinars/from-monolith-to-microservices", page: "/resources/webinars", section: "Card", purpose: "Microservices webinar",
    technique: "halftone", layout: "left", palette: ["#1A69FD", "#020615", "#F8F7F4"], size: "cover",
    alt: "Webinar title card for From Monolith to Microservices, a halftone block splitting into services" },
  { id: "res-webinar-copilots", file: "resources/webinars/ai-copilots-for-sales-teams", page: "/resources/webinars", section: "Card", purpose: "Sales copilots webinar",
    technique: "duotone", layout: "right", palette: ["#0B2F86", "#FFFFFF", "#000000"], size: "cover",
    alt: "Webinar title card for AI Copilots for Sales Teams over a duotone crop of the Konsilience AI copilots page" },

  /* ---------- Portfolio (real screenshots only: projects without one keep their code-drawn art) ---------- */
  { id: "case-trasys-ai", file: "portfolio/trasys-ai-observability-platform", page: "/portfolio/trasys-ai", section: "Showcase banner", purpose: "Trasys AI case-study cover",
    technique: "fragment", layout: "right", palette: ["#191918", "#F8F7F4", "#1A69FD"], size: "case", og: "/portfolio/trasys-ai",
    alt: "The Trasys AI website, \"Monitor every AI request. Understand every trace.\", in a browser window" },
  { id: "card-trasys-ai", file: "portfolio/trasys-ai-card", page: "portfolio cards", section: "Card", purpose: "Trasys AI card on home and /portfolio",
    technique: "fragment", layout: "edge", palette: ["#000000", "#FFFFFF", "#5E96FE"], size: "card",
    alt: "Trasys AI website hero in a browser window" },
];

// Pages whose images sit next to each other (so they must not share technique or layout).
export const groups = (e: Entry) => e.page;
