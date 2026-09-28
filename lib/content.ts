// All site copy lives here so the brand and content can be swapped in one place.

export const brand = {
  name: "Konsilience",
  ai: "KonAI", // name of the AI practice
  tagline: "Where strategy, design, engineering and AI come together.",
  phone: "+1 (555) 014-2290",
  email: "hello@konsilience.com",
};

import { aiSolutions, industryList, projects, serviceCategories, serviceList } from "./catalog";

export type NavLink = { label: string; href: string };
export type NavGroup = { title: string; links: NavLink[] };
export type NavItem = { label: string; href: string; groups: NavGroup[]; featured?: { title: string; text: string; href: string } };

export const nav: NavItem[] = [
  {
    label: brand.ai,
    href: "/konai",
    groups: [
      { title: "AI Solutions", links: aiSolutions.map((a) => ({ label: a.name, href: `/konai/${a.slug}` })) },
      {
        title: "AI Knowledge Hub",
        links: [
          { label: "RAG Architecture Patterns", href: "/blog/rag-architecture-patterns" },
          { label: "Agentic AI Playbook", href: "/blog/agentic-ai-enterprise-playbook" },
          { label: "AI Guides", href: "/resources/guides" },
          { label: "AI Webinars", href: "/resources/webinars" },
        ],
      },
    ],
    featured: { title: `Explore ${brand.ai}`, text: "Production-grade AI systems built around your data and workflows.", href: "/konai" },
  },
  {
    label: "About",
    href: "/about",
    groups: [
      {
        title: "Company",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Leadership Team", href: "/about/team" },
          { label: "How We Work", href: "/how-we-work" },
          { label: "Careers", href: "/careers" },
          { label: "CSR", href: "/csr" },
        ],
      },
      {
        title: "Trust",
        links: [
          { label: "Client Portfolio", href: "/portfolio" },
          { label: "Testimonials", href: "/testimonials" },
          { label: "Awards", href: "/awards" },
          { label: "Compliance", href: "/compliance" },
          { label: "Security", href: "/security" },
          { label: "FAQ", href: "/faq" },
        ],
      },
    ],
    featured: { title: "Meet Konsilience", text: "The story, people and principles behind our work.", href: "/about" },
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
    featured: { title: "35+ industries", text: "Deep domain expertise in regulated, data-intensive sectors.", href: "/industries" },
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    groups: [{ title: "Featured Work", links: projects.slice(0, 6).map((p) => ({ label: p.client, href: `/portfolio/${p.slug}` })) }],
    featured: { title: "3000+ products shipped", text: "See how we help brands launch, scale and modernize.", href: "/portfolio" },
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

export const heroAwards = [
  ["TOP AI", "Engineering Firm 2026"],
  ["TECH FAST 50", "Fastest Growing"],
  ["GROWTH", "Champions 2025"],
  ["FOUNDERS", "Awards 2024"],
  ["LEADERSHIP", "Excellence 2023"],
  ["BUSINESS", "Awards 2023"],
  ["GLOBAL 100", "Developers"],
];

export const services = [
  { icon: "compass", title: ["Strategic Technology", "Consulting"], text: "Define the right technology strategy to solve complex business challenges.", links: [["IT Consulting", "/services/it-consulting"], ["Software Consulting", "/services/software-consulting"], ["Mobile App Consulting", "/services/mobile-app-consulting"], ["FinTech Consulting", "/services/fintech-consulting"]] },
  { icon: "layers", title: ["Digital Product Development", "& Engineering"], text: "Design, build and scale digital products engineered for performance.", links: [["Mobile App Development", "/services/mobile-app-development"], ["Web Development", "/services/web-development"], ["Custom Software", "/services/custom-software-development"], ["UI/UX Design", "/services/ui-ux-design"]] },
  { icon: "spark", title: ["AI, Data &", "Analytics"], text: "Turn data into intelligent systems that drive real business decisions.", links: [["Generative AI", "/konai/generative-ai"], ["Agentic AI", "/konai/agentic-ai"], ["Big Data", "/services/big-data"], ["Business Intelligence", "/services/business-intelligence"]] },
  { icon: "shield", title: ["Cloud Operations", "& Cybersecurity"], text: "Run resilient, secure cloud infrastructure that scales with your growth.", links: [["Cloud Services", "/services/cloud-services"], ["DevOps", "/services/devops"], ["Managed IT", "/services/managed-it-services"], ["Cybersecurity", "/services/cybersecurity"]] },
];

// Portfolio cards on the home page come from the project catalog.
export const caseStudies = projects;

export const stats = [
  { value: 12, suffix: "+", label: ["Years of", "Experience"], text: "as an enterprise technology consulting and digital engineering services firm", hue: 220 },
  { value: 1500, suffix: "+", label: ["Technology", "Specialists"], text: "designing and building AI-led, cloud-native systems at enterprise scale", hue: 260 },
  { value: 3000, suffix: "+", label: ["Solutions", "Delivered"], text: "across consulting, engineering and large-scale digital transformation", hue: 190 },
  { value: 180, suffix: "+", label: ["AI Models", "Deployed"], text: "operationalized across production systems, workflows and decision platforms", hue: 280 },
  { value: 35, suffix: "+", label: ["Industries", "Mastered"], text: "with deep exposure to compliance-heavy, regulated, data-intensive sectors", hue: 160 },
  { value: 20, suffix: "+", label: ["Global Recognitions", "& Awards"], text: "acknowledging our engineering excellence, growth and delivery capability", hue: 40 },
];

export const aiPillars = [
  { icon: "agent", title: "Agentic AI", items: ["Autonomous Workflows", "Multi-Agent Systems", "Enterprise Copilots"] },
  { icon: "eye", title: "Multimodal AI", items: ["Vision & Voice Models", "Document Intelligence", "Cross-Modal Search"] },
  // { icon: "db", title: "Data-to-AI Platforms", items: ["Data Pipelines & Integration", "Feature Engineering", "Model-Ready Infrastructure"] },
];

export const testimonials = [
  { quote: "We approached them with a clear vision to build a future-ready platform. They rebuilt our ordering stack in record time and digital revenue doubled within two quarters.", name: "Priya Raman", role: "Director - Digital Engineering, Freshly Market" },
  { quote: "They have constantly exceeded my expectations in every aspect of our partnership. Deep technical expertise, honest communication and they never missed a deadline.", name: "Marcus Lee", role: "CTO, LedgerLine" },
  { quote: "Versatile, professional and genuinely invested in our outcome. From discovery to launch the process was structured and transparent.", name: "Elena Ortiz", role: "COO, Medora Health" },
  { quote: "Their AI team shipped an agent that now handles 70% of our support tickets. The ROI was visible in the very first month.", name: "Tom Becker", role: "VP Operations, Shiftly" },
];

export const clients = [
  "Freshly", "Voyagr", "Kinetik", "LEDGERLINE", "medora", "Urbanest", "Brewline", "shiftly", "ORBITLY", "Northwind",
  "lumen", "SOLARA", "Peakway", "Quantis", "harbor", "Vireo", "MOSAIC", "Atlasco", "Crestline", "nimbus",
];

export const awards = [
  { source: "Tech Leaders Forum - 2026", title: "Leader in AI-First Product Engineering", color: "#3c3c3c" },
  { source: "Growth 500 - 2025 & 2026", title: "Fastest-Growing Company", color: "#cbfffb" },
  { source: "Business Review - 2025", title: "Leader in AI Product Engineering & Digital Transformation", color: "#fefbdc" },
  { source: "Dev Rankings - 2025", title: "Top Android & Chatbot Development Company", color: "#cdffed" },
  { source: "Tech Fast 50 - 2023-2024", title: "Fastest Growing Technology Company", color: "#f2ffc1" },
  { source: "AppWatch - 2024", title: "Fastest Growing AI Development Company", color: "#e8e0ff" },
  { source: "CIO Council - 2024", title: "Preferred Technology Partner", color: "#ffe4d6" },
  { source: "Business Awards - 2023", title: "Tech Company of the Year", color: "#fefbdc" },
  { source: "Workplace Index - 2022", title: "Best Place to Work", color: "#cbfffb" },
  { source: "Founders Weekly - 2020", title: "App Development Company of the Year", color: "#cdffed" },
];

export const compliance = [
  { title: "Data Privacy & Protection", items: ["GDPR", "CCPA", "HIPAA"] },
  { title: "Security & Risk Management", items: ["ISO/IEC 27001", "PCI DSS", "NIST", "FedRAMP"] },
  { title: "AI & Technology-Specific Regulations", items: ["EU AI Act", "AI Ethics Frameworks", "ISO/IEC 42001", "Blockchain Compliance", "IoT Security"] },
  { title: "Industry-Specific Standards", items: ["SOX", "FTC Safeguards Rule", "ISO 9001", "ISO 22301"] },
  { title: "Global & Regulatory Frameworks", items: ["ISO 22301", "ISO 27001", "GDPR", "ISO 14001"] },
  { title: "Compliance for Cloud & SaaS", items: ["CSA Cloud Controls Matrix", "SOC 2", "FedRAMP for Cloud"] },
];

export const partners = [
  "Amazon Web Services", "Google Cloud", "Microsoft Azure", "Databricks", "Snowflake", "ServiceNow", "Adobe",
  "HubSpot", "Docker", "Kubernetes", "Salesforce", "Stripe", "MongoDB", "Twilio", "Shopify", "Figma",
];

export const industries = industryList;

export const faqs = [
  { q: "What types of digital product engineering services do you offer?", a: "We cover the full lifecycle: strategy and discovery, UX/UI design, mobile and web engineering, AI/ML, cloud, QA and long-term product support." },
  { q: "How do you modernize legacy systems through AI-led engineering?", a: "We audit the current architecture, define a phased migration path and use AI-assisted code analysis to refactor safely while the business keeps running." },
  { q: "How can existing digital products be scaled effectively?", a: "By profiling bottlenecks, moving to cloud-native architecture, adding observability and introducing automated testing and CI/CD." },
  { q: "Who are your technology partners?", a: "We build on leading cloud, data and AI platforms, including AWS, Google Cloud, Azure, Databricks and Snowflake." },
  { q: "How are security, quality and compliance ensured during development?", a: "Secure SDLC, threat modelling, automated testing, code reviews and compliance mapping (GDPR, HIPAA, SOC 2 and more) from day one." },
  { q: "What is the average cost and timeline for an enterprise product?", a: "Most enterprise builds range from 4 to 9 months depending on scope. We share a detailed estimate after a free discovery call." },
  { q: "Can we hire dedicated developers or augment our team?", a: "Yes. We offer dedicated teams and staff augmentation with flexible engagement models." },
  { q: "Are SLAs and 24/7 post-launch support available?", a: "Yes. We offer tiered SLAs with round-the-clock monitoring, incident response and continuous improvement." },
];

export const footer = {
  columns: [
    { title: "Services", links: [{ label: "Mobile App Development", href: "/services/mobile-app-development" }, { label: "Web Development", href: "/services/web-development" }, { label: "Generative AI", href: "/konai/generative-ai" }, { label: "Cloud Services", href: "/services/cloud-services" }, { label: "UI/UX Design", href: "/services/ui-ux-design" }, { label: "QA & Testing", href: "/services/qa-and-testing" }] },
    { title: "Industries", links: [{ label: "Healthcare", href: "/industries/healthcare" }, { label: "Finance", href: "/industries/finance" }, { label: "Retail & Ecommerce", href: "/industries/retail-and-ecommerce" }, { label: "Logistics", href: "/industries/logistics" }, { label: "Education", href: "/industries/education" }, { label: "Real Estate", href: "/industries/real-estate" }] },
    { title: "Company", links: [{ label: "About Us", href: "/about" }, { label: "Careers", href: "/careers" }, { label: "Portfolio", href: "/portfolio" }, { label: "Testimonials", href: "/testimonials" }, { label: "Awards", href: "/awards" }, { label: "Contact", href: "/contact" }] },
    { title: "Resources", links: [{ label: "Blog", href: "/blog" }, { label: "Guides", href: "/resources/guides" }, { label: "Whitepapers", href: "/resources/whitepapers" }, { label: "Press Releases", href: "/resources/press-releases" }, { label: "FAQ", href: "/faq" }] },
  ],
  offices: [
    { country: "United States", flag: "US", addresses: ["120 Hudson St,\nManhattan,\nNY 10013, USA", "1900 Market St, Suite 600,\nSan Francisco,\nCA 94103"] },
    { country: "UAE", flag: "AE", addresses: ["Business Bay,\nTower B, 6th floor,\nDubai"] },
    { country: "Australia", flag: "AU", addresses: ["96 Harbour Street,\nSydney,\nNSW 2000"] },
    { country: "India", flag: "IN", addresses: ["Outer Ring Road,\nBengaluru,\nKA 560103", "Sector 62,\nNoida,\nUP 201309"] },
    { country: "United Kingdom", flag: "GB", addresses: ["22 Bishopsgate,\nLondon,\nEC2N 4BQ"] },
  ],
};
