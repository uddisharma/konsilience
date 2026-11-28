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
  { id: "ai-overview", file: "ai-solutions/ai-solutions-overview", page: "/services/[ai-automation]", section: "Hero", purpose: "AI & Automation category, and the /ai share image",
    technique: "fragment", layout: "edge", palette: ["#191918", "#F8F7F4", "#5E96FE"], size: "hero", og: "/ai",
    alt: "Close-up of TypeScript code defining an AI agent with its tools, spend limit and human approval step" },
  { id: "ai-production-stack", file: "ai-solutions/production-ai-stack", page: "/ai", section: "Hero", purpose: "The layers of a production AI system",
    technique: "isometric", layout: "split", palette: ["#020615", "#FFFFFF", "#1A69FD"], size: "hero",
    alt: "Isometric stack of the five layers of a production AI system: data and retrieval, models, agents and tools, guardrails, evals and monitoring" },
  { id: "trasys-llm-trace", file: "trasys/llm-call-tracing", page: "/trasys", section: "Features", purpose: "LLM call tracing feature card",
    technique: "fragment", layout: "split", palette: ["#020615", "#CECECE", "#5E96FE"], size: "wide",
    alt: "Trace of one AI agent request as a waterfall of six spans, with the planning LLM call opened to show its input, output, tokens and latency" },
  { id: "trasys-token-cost", file: "trasys/token-cost-tracking", page: "/trasys", section: "Features", purpose: "Token cost tracking feature card",
    technique: "geometric", layout: "right", palette: ["#020615", "#CECECE", "#1A69FD"], size: "wide",
    alt: "Seven days of token spend as bars against a budget line, with the last day over budget and an alert sent, beside spend split by feature" },
  { id: "ai-agentic", file: "ai-solutions/agentic-ai-development", page: "/ai/agentic-ai", section: "Hero", purpose: "Agentic AI",
    technique: "mono", layout: "right", palette: ["#020615", "#888886", "#1A69FD"], size: "hero", og: "/ai/agentic-ai",
    alt: "Terminal log of an AI agent planning a refund, calling the order, policy and payment tools, then replying to the customer" },
  { id: "ai-generative", file: "ai-solutions/generative-ai-development", page: "/ai/generative-ai", section: "Hero", purpose: "Generative AI",
    technique: "poster", layout: "split", palette: ["#5E96FE", "#020615", "#FFFFFF"], size: "hero", og: "/ai/generative-ai",
    alt: "A question about refund policy answered by generative AI, with each claim linked to the source document it came from" },
  { id: "ai-copilots", file: "ai-solutions/ai-copilot-development", page: "/ai/ai-copilots", section: "Hero", purpose: "AI Copilots",
    technique: "blueprint", layout: "asymmetric", palette: ["#FFFFFF", "#000000", "#1A69FD"], size: "hero", og: "/ai/ai-copilots",
    alt: "Line drawing of an email reply draft with an AI copilot suggesting a clearer next step in the margin" },
  { id: "ai-vision", file: "ai-solutions/computer-vision-development", page: "/ai/computer-vision", section: "Hero", purpose: "Computer Vision",
    technique: "halftone", layout: "edge", palette: ["#F8F7F4", "#0C4FCB", "#020615"], size: "hero", og: "/ai/computer-vision",
    alt: "Halftone bottles on a production line with computer vision boxes marking a missing cap and a crooked label" },
  { id: "ai-conversational", file: "ai-solutions/conversational-ai-development", page: "/ai/conversational-ai", section: "Hero", purpose: "Conversational AI",
    technique: "papercut", layout: "right", palette: ["#0B2F86", "#F8F7F4", "#5E96FE"], size: "hero", og: "/ai/conversational-ai",
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

  /* ---------- Industries (one hero per industry; the /industries grid shows them all, so neighbours in its 3-column grid never share a technique) ---------- */
  { id: "industries-overview", file: "industries/industries-we-serve", page: "/industries", section: "Hero", purpose: "Every industry at a glance",
    technique: "poster", layout: "type", palette: ["#000000", "#F8F7F4", "#1A69FD"], size: "hero", og: "/industries",
    alt: "Typographic index of the eighteen industries Konsilience builds software for, from healthcare and finance to telecom and startups" },
  { id: "ind-healthcare", file: "industries/healthcare-software-development", page: "/industries/[healthcare]", section: "Hero", purpose: "Healthcare",
    technique: "geometric", layout: "asymmetric", palette: ["#FFFFFF", "#031432", "#1A69FD"], size: "hero", og: "/industries/healthcare",
    alt: "Flat geometric medical cross and circle beside three healthcare builds: telemedicine, EHR and EMR integration, and remote patient monitoring" },
  { id: "ind-finance", file: "industries/finance-software-development", page: "/industries/[finance]", section: "Hero", purpose: "Finance",
    technique: "blueprint", layout: "grid", palette: ["#020615", "#FFFFFF", "#5E96FE"], size: "hero", og: "/industries/finance",
    alt: "Blueprint grid of six finance platforms, with a fraud detection cell holding a flagged card payment for review" },
  { id: "ind-retail", file: "industries/retail-and-ecommerce-software-development", page: "/industries/[retail-and-ecommerce]", section: "Hero", purpose: "Retail & Ecommerce",
    technique: "duotone", layout: "split", palette: ["#1A69FD", "#F8F7F4", "#031432"], size: "hero", og: "/industries/retail-and-ecommerce",
    alt: "Split image: the line Every channel, one cart beside a duotone storefront showing four recommended products" },
  { id: "ind-logistics", file: "industries/logistics-software-development", page: "/industries/[logistics]", section: "Hero", purpose: "Logistics",
    technique: "halftone", layout: "diagonal", palette: ["#F8F7F4", "#191918", "#1A69FD"], size: "hero", og: "/industries/logistics",
    alt: "Halftone delivery route running on a diagonal from warehouse to sort hub, out for delivery and delivered" },
  { id: "ind-education", file: "industries/education-software-development", page: "/industries/[education]", section: "Hero", purpose: "Education",
    technique: "poster", layout: "edge", palette: ["#031432", "#FFFFFF", "#5E96FE"], size: "hero", og: "/industries/education",
    alt: "Editorial poster with the word Learn cropped by the edge and the six education platforms Konsilience builds, from LMS to adaptive learning AI" },
  { id: "ind-real-estate", file: "industries/real-estate-software-development", page: "/industries/[real-estate]", section: "Hero", purpose: "Real Estate",
    technique: "isometric", layout: "left", palette: ["#F8F7F4", "#031432", "#0C4FCB"], size: "hero", og: "/industries/real-estate",
    alt: "Isometric apartment building next to a property management list of units, leases, viewings and maintenance" },
  { id: "ind-emobility", file: "industries/emobility-software-development", page: "/industries/[emobility]", section: "Hero", purpose: "eMobility",
    technique: "fragment", layout: "right", palette: ["#000000", "#5E96FE", "#FFFFFF"], size: "hero", og: "/industries/emobility",
    alt: "Close-up of an EV charging app session: charge level, connector, energy delivered and price per kWh" },
  { id: "ind-wearables", file: "industries/wearables-app-development", page: "/industries/[wearables]", section: "Hero", purpose: "Wearables",
    technique: "papercut", layout: "type", palette: ["#0B2F86", "#5E96FE", "#FFFFFF"], size: "hero", og: "/industries/wearables",
    alt: "Paper-cut strips spelling the data a wearable companion app tracks: steps, sleep and heart rate" },
  { id: "ind-energy", file: "industries/energy-software-development", page: "/industries/[energy]", section: "Hero", purpose: "Energy",
    technique: "mono", layout: "asymmetric", palette: ["#FFFFFF", "#191918", "#0C4FCB"], size: "hero", og: "/industries/energy",
    alt: "Line chart of one day of electricity demand against solar generation, with the generation curve as the only accent" },
  { id: "ind-agriculture", file: "industries/agriculture-software-development", page: "/industries/[agriculture]", section: "Hero", purpose: "Agriculture",
    technique: "geometric", layout: "grid", palette: ["#CECECE", "#020615", "#1A69FD"], size: "hero", og: "/industries/agriculture",
    alt: "Grid of striped field plots from above, with one plot flagged for irrigation by a farm management app" },
  { id: "ind-gaming", file: "industries/gaming-software-development", page: "/industries/[gaming]", section: "Hero", purpose: "Gaming",
    technique: "blueprint", layout: "split", palette: ["#020615", "#5E96FE", "#F8F7F4"], size: "hero", og: "/industries/gaming",
    alt: "Blueprint of a multiplayer backend: players, matchmaker, regional game servers, leaderboards and in-game economy" },
  { id: "ind-ott-media", file: "industries/ott-and-media-software-development", page: "/industries/[ott-and-media]", section: "Hero", purpose: "OTT & Media",
    technique: "duotone", layout: "diagonal", palette: ["#191918", "#FFFFFF", "#1A69FD"], size: "hero", og: "/industries/ott-and-media",
    alt: "Duotone Continue watching rail of streaming tiles with progress bars, set on a diagonal" },
  { id: "ind-on-demand", file: "industries/on-demand-app-development", page: "/industries/[on-demand]", section: "Hero", purpose: "On-Demand",
    technique: "halftone", layout: "edge", palette: ["#5E96FE", "#031432", "#FFFFFF"], size: "hero", og: "/industries/on-demand",
    alt: "Halftone city map with a live route from a service provider to a customer and the booking card showing their arrival" },
  { id: "ind-food-delivery", file: "industries/food-delivery-app-development", page: "/industries/[food-delivery]", section: "Hero", purpose: "Food Delivery",
    technique: "poster", layout: "left", palette: ["#F8F7F4", "#1A69FD", "#020615"], size: "hero", og: "/industries/food-delivery",
    alt: "Typographic poster, Hot food. On time., above an order timeline from placed to delivered" },
  { id: "ind-travel", file: "industries/travel-software-development", page: "/industries/[travel]", section: "Hero", purpose: "Travel",
    technique: "isometric", layout: "right", palette: ["#0C4FCB", "#FFFFFF", "#031432"], size: "hero", og: "/industries/travel",
    alt: "Isometric itinerary of three days and cities joined by a dotted route" },
  { id: "ind-aviation", file: "industries/aviation-software-development", page: "/industries/[aviation]", section: "Hero", purpose: "Aviation",
    technique: "fragment", layout: "type", palette: ["#FFFFFF", "#0C4FCB", "#020615"], size: "hero", og: "/industries/aviation",
    alt: "Close-up of an airport departures board with flights, gates, times and boarding status" },
  { id: "ind-telecom", file: "industries/telecom-software-development", page: "/industries/[telecom]", section: "Hero", purpose: "Telecom",
    technique: "papercut", layout: "asymmetric", palette: ["#031432", "#CECECE", "#1A69FD"], size: "hero", og: "/industries/telecom",
    alt: "Paper-cut coverage rings labelled with telecom builds: 5G solutions, eSIM platforms, self-care apps and billing" },
  { id: "ind-startups", file: "industries/startup-product-development", page: "/industries/[startups]", section: "Hero", purpose: "Startups",
    technique: "mono", layout: "grid", palette: ["#3E3E3D", "#FFFFFF", "#5E96FE"], size: "hero", og: "/industries/startups",
    alt: "Grid of the six ways Konsilience works with startups, from product discovery and MVP development to growth analytics" },

  /* ---------- Blog covers (one per post, by slug; posts with an uploaded cover keep their own) ---------- */
  { id: "blog-agentic-ai-enterprise-playbook", file: "blog/agentic-ai-enterprise-playbook", page: "/blog", section: "Card", purpose: "The Enterprise Playbook for Agentic AI in 2026",
    technique: "mono", layout: "right", palette: ["#020615", "#F8F7F4", "#1A69FD"], size: "cover", og: "/blog/agentic-ai-enterprise-playbook",
    alt: "Cover for The Enterprise Playbook for Agentic AI: a five-step checklist from picking a workflow to measuring results" },
  { id: "blog-modernize-legacy-without-downtime", file: "blog/modernize-legacy-without-downtime", page: "/blog", section: "Card", purpose: "How to Modernize a Legacy System Without Downtime",
    technique: "blueprint", layout: "split", palette: ["#FFFFFF", "#191918", "#1A69FD"], size: "cover", og: "/blog/modernize-legacy-without-downtime",
    alt: "Cover for How to Modernize a Legacy System Without Downtime: a proxy routing modules from the legacy system to new services" },
  { id: "blog-design-systems-that-scale", file: "blog/design-systems-that-scale", page: "/blog", section: "Card", purpose: "Design Systems That Actually Scale Across Teams",
    technique: "geometric", layout: "grid", palette: ["#CECECE", "#0B2F86", "#1A69FD"], size: "cover", og: "/blog/design-systems-that-scale",
    alt: "Cover for Design Systems That Actually Scale: a grid of colour tokens, type scale and components" },
  { id: "blog-cloud-cost-optimization-guide", file: "blog/cloud-cost-optimization-guide", page: "/blog", section: "Card", purpose: "Cloud Cost Optimization",
    technique: "halftone", layout: "diagonal", palette: ["#1A69FD", "#FFFFFF", "#0B2F86"], size: "cover", og: "/blog/cloud-cost-optimization-guide",
    alt: "Cover for Cloud Cost Optimization: halftone monthly bills stepping down through rightsizing, commitments and re-architecture" },
  { id: "blog-app-development-cost-2026", file: "blog/app-development-cost-2026", page: "/blog", section: "Card", purpose: "How Much Does It Cost to Build an App in 2026?",
    technique: "poster", layout: "left", palette: ["#F8F7F4", "#020615", "#0C4FCB"], size: "cover", og: "/blog/app-development-cost-2026",
    alt: "Cover for How Much Does It Cost to Build an App in 2026: the four cost drivers, complexity, platforms, team model and region" },
  { id: "blog-rag-architecture-patterns", file: "blog/rag-architecture-patterns", page: "/blog", section: "Card", purpose: "7 RAG Architecture Patterns for Production",
    technique: "isometric", layout: "asymmetric", palette: ["#191918", "#CECECE", "#5E96FE"], size: "cover", og: "/blog/rag-architecture-patterns",
    alt: "Cover for 7 RAG Architecture Patterns: isometric layers from documents and embeddings to retriever and LLM" },
  { id: "blog-devops-observability-consulting", file: "blog/devops-observability-consulting", page: "/blog", section: "Card", purpose: "DevOps & Observability Consulting",
    technique: "fragment", layout: "edge", palette: ["#000000", "#CECECE", "#5E96FE"], size: "cover", og: "/blog/devops-observability-consulting",
    alt: "Cover for DevOps and Observability Consulting: a distributed trace waterfall with one slow database span highlighted" },

  /* ---------- Portfolio: share image only. On the page, Trasys AI uses the same code-drawn phone art as every other project. ---------- */
  { id: "case-trasys-ai", file: "portfolio/trasys-ai-observability-platform", page: "/portfolio/trasys-ai", section: "Share image", purpose: "Trasys AI case-study share image",
    technique: "fragment", layout: "right", palette: ["#191918", "#F8F7F4", "#1A69FD"], size: "case", og: "/portfolio/trasys-ai",
    alt: "The Trasys AI website, \"Monitor every AI request. Understand every trace.\", in a browser window" },
];

// Pages whose images sit next to each other (so they must not share technique or layout).
export const groups = (e: Entry) => e.page;
