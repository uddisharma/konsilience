// All site copy lives here so the brand and content can be swapped in one place.
import type { StatVisualName } from "@/components/ui/StatVisual";

export const brand = {
  name: "Konsilience",
  // Our own product
  product: {
    name: "Trasys AI",
    url: "https://www.trasys.dev",
    short: "AI observability platform",
    tagline: "See every signal your AI stack produces: traces, token spend, loops and incidents in one place.",
  },
  tagline: "An AI-first product studio. A small senior team building SaaS platforms, apps and AI systems.",
  teamSize: 12, // core team headcount, used in stats and copy
  founded: 2021,
  founders: [
    { name: "Deepak Sharma", role: "Co-Founder" },
    { name: "Shagun Monga", role: "Co-Founder" },
    { name: "Hardik Upadhayay", role: "Co-Founder" },
  ],
  phone: "+91 70157 13717", // display format
  phoneHref: "+917015713717", // used in tel: links
  email: "sales@konsilience.tech",
};

import { aiSolutions, industryList, projects, serviceCategories, serviceList } from "./catalog";

// Facts derived from the portfolio so the numbers stay honest as projects are added.
export const facts = {
  platforms: projects.length,
  industries: new Set(projects.map((p) => p.industry)).size,
  technologies: new Set(projects.flatMap((p) => p.tech)).size,
};

export type NavLink = { label: string; href: string };
export type NavGroup = { title: string; links: NavLink[] };
export type NavItem = { label: string; href: string; groups: NavGroup[]; featured?: { title: string; text: string; href: string } };

export const nav: NavItem[] = [
  {
    label: brand.product.name,
    href: "/trasys-ai",
    groups: [
      {
        title: brand.product.name,
        links: [
          { label: "Product Overview", href: "/trasys-ai" },
          { label: "Features", href: "/trasys-ai#features" },
          { label: "Integrations", href: "/trasys-ai#integrations" },
          { label: `Try ${brand.product.name}`, href: brand.product.url },
        ],
      },
      {
        title: "AI Services",
        links: [{ label: "All AI Solutions", href: "/ai-solutions" }, ...aiSolutions.map((a) => ({ label: a.name, href: `/ai-solutions/${a.slug}` }))],
      },
    ],
    featured: { title: brand.product.name, text: "Our own AI observability platform: trace LLM calls, track token spend and catch incidents early.", href: "/trasys-ai" },
  },
  {
    label: "About",
    href: "/about",
    groups: [
      {
        title: "Company",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Our Team", href: "/about/team" },
          { label: "How We Work", href: "/how-we-work" },
          { label: "Careers", href: "/careers" },
        ],
      },
      {
        title: "Trust",
        links: [
          { label: "Portfolio", href: "/portfolio" },
          { label: "Compliance", href: "/compliance" },
          { label: "Security", href: "/security" },
          { label: "FAQ", href: "/faq" },
        ],
      },
    ],
    featured: { title: "Meet Konsilience", text: "A young, AI-first studio: the story, people and principles behind our work.", href: "/about" },
  },
  {
    label: "Services",
    href: "/services",
    groups: serviceCategories.map((c) => ({
      title: c.name,
      links: serviceList.filter((s) => s.category === c.name).map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
    })),
    featured: { title: "All Services", text: "End-to-end capabilities from strategy to scale.", href: "/services" },
  },
  {
    label: "Industries",
    href: "/industries",
    groups: [0, 1, 2].map((g) => ({
      title: ["Core", "Emerging", "Services"][g],
      links: industryList.slice(g * 6, g * 6 + 6).map((i) => ({ label: i.name, href: `/industries/${i.slug}` })),
    })),
    featured: { title: `${facts.industries} industries and counting`, text: "Platforms built for support, legal, HR, real estate, healthcare, construction and more.", href: "/industries" },
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    groups: [
      { title: "Support & Business Ops", industries: ["Customer Support", "Legal", "HR & Workforce", "Inventory & Operations"] },
      { title: "Field Service & Property", industries: ["Field Services", "Construction", "Real Estate"] },
      { title: "Health, Commerce & AI", industries: ["Healthcare", "Beauty & Wellness", "Retail & Ecommerce", "Travel", "Developer Tools"] },
    ].map((g) => ({
      title: g.title,
      links: projects.filter((p) => g.industries.includes(p.industry)).map((p) => ({ label: p.client, href: `/portfolio/${p.slug}` })),
    })),
    featured: { title: `${facts.platforms} platforms shipped`, text: "SaaS products, apps and AI tools our team has designed and engineered.", href: "/portfolio" },
  },
  {
    label: "Resources",
    href: "/blog",
    groups: [
      {
        title: "Learn",
        links: [
          { label: "Blog", href: "/blog" },
          { label: "Guides", href: "/resources/guides" },
          { label: "Whitepapers", href: "/resources/whitepapers" },
          { label: "Press Releases", href: "/resources/press-releases" },
          { label: "Webinars", href: "/resources/webinars" },
        ],
      },
    ],
    featured: { title: "Insights", text: "Ideas and playbooks from our engineers, designers and AI team.", href: "/blog" },
  },
];

// Capability chips in the hero marquee.
export const heroTags = [
  ["AI AGENTS", "RAG · Copilots · Automation"],
  ["SAAS", "Multi-tenant platforms"],
  ["MOBILE", "iOS · Android · Flutter"],
  ["WEB", "Next.js · React · Node"],
  ["CLOUD", "AWS · Azure · GCP"],
  ["MVP", "Idea to launch in weeks"],
  ["DESIGN", "UX · UI · Prototypes"],
];

export const services = [
  { icon: "compass", title: ["Strategic Technology", "Consulting"], text: "Define the right technology strategy to solve complex business challenges.", links: [["IT Consulting", "/services/it-consulting"], ["Software Consulting", "/services/software-consulting"], ["Mobile App Consulting", "/services/mobile-app-consulting"], ["FinTech Consulting", "/services/fintech-consulting"]] },
  { icon: "layers", title: ["Digital Product Development", "& Engineering"], text: "Design, build and scale digital products engineered for performance.", links: [["Mobile App Development", "/services/mobile-app-development"], ["Web Development", "/services/web-development"], ["Custom Software", "/services/custom-software-development"], ["UI/UX Design", "/services/ui-ux-design"]] },
  { icon: "spark", title: ["AI, Data &", "Analytics"], text: "Turn data into intelligent systems that drive real business decisions.", links: [["Generative AI", "/ai-solutions/generative-ai"], ["Agentic AI", "/ai-solutions/agentic-ai"], ["Big Data", "/services/big-data"], ["Business Intelligence", "/services/business-intelligence"]] },
  { icon: "shield", title: ["Cloud Operations", "& Cybersecurity"], text: "Run resilient, secure cloud infrastructure that scales with your growth.", links: [["Cloud Services", "/services/cloud-services"], ["DevOps", "/services/devops"], ["Managed IT", "/services/managed-it-services"], ["Cybersecurity", "/services/cybersecurity"]] },
];

// Portfolio cards on the home page come from the project catalog.
export const caseStudies = projects;

export const stats: { value: number; suffix: string; label: string[]; text: string; visual: StatVisualName }[] = [
  { value: facts.platforms, suffix: "", label: ["Platforms", "Built"], text: "SaaS products across support, legal, HR, real estate, healthcare and more", visual: "devices" },
  { value: brand.teamSize, suffix: "", label: ["Core Team", "Members"], text: "engineers, designers and AI specialists with no layers and no handoffs", visual: "people" },
  { value: facts.industries, suffix: "", label: ["Industries", "Served"], text: "from customer support and legal to construction, travel and beauty", visual: "industries" },
  { value: facts.technologies, suffix: "+", label: ["Technologies", "In Production"], text: "modern web, mobile, cloud and AI tools used across our builds", visual: "network" },
  { value: new Date().getFullYear() - brand.founded, suffix: "+", label: ["Years", "Building"], text: `shipping products since ${brand.founded}, from first MVP to multi-tenant SaaS`, visual: "timeline" },
];

// Trasys AI feature pillars shown on the home page.
export const aiPillars = [
  { icon: "eye", title: "LLM Observability", items: ["LLM call tracing", "Token cost tracking", "Runaway loop detection"] },
  { icon: "chart", title: "Ops Intelligence", items: ["Distributed tracing", "Log pattern clustering", "Slack alerts & on-call routing"] },
];

// Real client quotes only. The testimonial sections stay hidden while this list is empty.
export const testimonials: { quote: string; name: string; role: string }[] = [];

export const compliance = [
  { title: "Data Privacy & Protection", items: ["GDPR", "CCPA", "HIPAA"] },
  { title: "Security & Risk Management", items: ["ISO/IEC 27001", "PCI DSS", "NIST", "FedRAMP"] },
  { title: "AI & Technology-Specific Regulations", items: ["EU AI Act", "AI Ethics Frameworks", "ISO/IEC 42001", "Blockchain Compliance", "IoT Security"] },
  { title: "Industry-Specific Standards", items: ["SOX", "FTC Safeguards Rule", "ISO 9001", "ISO 22301"] },
  { title: "Global & Regulatory Frameworks", items: ["ISO 22301", "ISO 27001", "GDPR", "ISO 14001"] },
  { title: "Compliance for Cloud & SaaS", items: ["CSA Cloud Controls Matrix", "SOC 2", "FedRAMP for Cloud"] },
];

export const industries = industryList;

export const faqs = [
  { q: "What types of digital product engineering services do you offer?", a: "We cover the full lifecycle: strategy and discovery, UX/UI design, mobile and web engineering, AI/ML, cloud, QA and long-term product support." },
  { q: "How do you modernize legacy systems through AI-led engineering?", a: "We audit the current architecture, define a phased migration path and use AI-assisted code analysis to refactor safely while the business keeps running." },
  { q: "How can existing digital products be scaled effectively?", a: "By profiling bottlenecks, moving to cloud-native architecture, adding observability and introducing automated testing and CI/CD." },
  { q: "Who are your technology partners?", a: "We build on leading cloud, data and AI platforms, including AWS, Google Cloud, Azure, Databricks and Snowflake." },
  { q: "How are security, quality and compliance ensured during development?", a: "Secure SDLC, threat modelling, automated testing, code reviews and compliance mapping (GDPR, HIPAA, SOC 2 and more) from day one." },
  { q: "How long does an MVP take?", a: "Most MVPs launch in 8 to 14 weeks depending on scope. We share a detailed, fixed estimate after a free discovery call." },
  { q: "Why work with a small team?", a: "You work directly with the senior engineers and designers who build your product. No account managers, no handoffs, faster decisions." },
  { q: "Can we hire dedicated developers or augment our team?", a: "Yes. We offer dedicated teams and staff augmentation with flexible engagement models." },
  { q: "Are SLAs and 24/7 post-launch support available?", a: "Yes. We offer tiered SLAs with round-the-clock monitoring, incident response and continuous improvement." },
];

export const footer = {
  columns: [
    { title: "Services", links: [{ label: "Mobile App Development", href: "/services/mobile-app-development" }, { label: "Web Development", href: "/services/web-development" }, { label: "Trasys AI", href: "/trasys-ai" }, { label: "Cloud Services", href: "/services/cloud-services" }, { label: "UI/UX Design", href: "/services/ui-ux-design" }, { label: "QA & Testing", href: "/services/qa-and-testing" }] },
    { title: "Industries", links: [{ label: "Healthcare", href: "/industries/healthcare" }, { label: "Finance", href: "/industries/finance" }, { label: "Retail & Ecommerce", href: "/industries/retail-and-ecommerce" }, { label: "Logistics", href: "/industries/logistics" }, { label: "Education", href: "/industries/education" }, { label: "Real Estate", href: "/industries/real-estate" }] },
    { title: "Company", links: [{ label: "About Us", href: "/about" }, { label: "Careers", href: "/careers" }, { label: "Portfolio", href: "/portfolio" }, { label: "Our Team", href: "/about/team" }, { label: "How We Work", href: "/how-we-work" }, { label: "Contact", href: "/contact" }] },
    { title: "Resources", links: [{ label: "Blog", href: "/blog" }, { label: "Guides", href: "/resources/guides" }, { label: "Whitepapers", href: "/resources/whitepapers" }, { label: "Press Releases", href: "/resources/press-releases" }, { label: "FAQ", href: "/faq" }] },
  ],
};

// Single office. PLACEHOLDER street address: fill in the exact address and phone.
export const office = {
  label: "Headquarters",
  city: "Chandigarh",
  country: "India",
  code: "IN",
  address: "Chandigarh, India",
  hours: "Mon – Fri, 9:30 AM – 6:30 PM IST",
  mapQuery: "Chandigarh, India",
};
