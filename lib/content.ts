// All site copy lives here so the brand and content can be swapped in one place.

export const brand = {
  name: "Konsilience",
  ai: "KonAI", // name of the AI practice
  tagline: "Where strategy, design, engineering and AI come together.",
  phone: "+1 (555) 014-2290",
  email: "hello@konsilience.com",
};

export type NavGroup = { title: string; links: string[] };
export type NavItem = { label: string; groups: NavGroup[]; featured?: { title: string; text: string } };

export const nav: NavItem[] = [
  {
    label: "KonAI",
    groups: [
      { title: "AI Solutions", links: ["Agentic AI", "Generative AI", "AI Copilots", "Computer Vision", "Conversational AI"] },
      { title: "AI Knowledge Hub", links: ["AI Readiness Guide", "LLM Evaluation Playbook", "RAG Architecture Patterns", "AI Governance Checklist"] },
    ],
    featured: { title: "Explore KonAI", text: "Production-grade AI systems built around your data and workflows." },
  },
  {
    label: "About",
    groups: [
      { title: "Company", links: ["About Us", "Core Team", "How We Work", "Careers", "CSR"] },
      { title: "Trust", links: ["Client Portfolio", "Testimonials", "Awards", "Compliances", "Security", "FAQ"] },
    ],
  },
  {
    label: "Services",
    groups: [
      { title: "Product Engineering", links: ["UI/UX Design", "Mobile App Development", "Software Development", "QA & Testing", "DevOps", "Product Management"] },
      { title: "Digital Transformation", links: ["Legacy Modernization", "Cloud Services", "Blockchain", "Cybersecurity", "IoT", "AR / VR"] },
      { title: "Consulting", links: ["IT Consulting", "Software Consulting", "FinTech Consulting", "Mobile Consulting"] },
      { title: "Data & Managed IT", links: ["Big Data", "Data Analytics", "Business Intelligence", "Managed IT", "Dedicated Teams"] },
    ],
  },
  {
    label: "Industries",
    groups: [
      { title: "Core", links: ["Healthcare", "Finance", "Retail & Ecommerce", "Logistics", "Education", "Real Estate"] },
      { title: "Emerging", links: ["eMobility", "Wearables", "Energy", "Agriculture", "Gaming", "OTT & Media"] },
      { title: "Services", links: ["On-Demand", "Food Delivery", "Travel", "Aviation", "Telecom", "Startups"] },
    ],
  },
  {
    label: "Portfolio",
    groups: [{ title: "Featured Work", links: ["Freshly Market", "Voyagr Air", "Kinetik", "LedgerLine", "Medora Health", "Urbanest"] }],
    featured: { title: "3000+ products shipped", text: "See how we help brands launch, scale and modernize." },
  },
  {
    label: "Resources",
    groups: [{ title: "Learn", links: ["Blog", "Guides", "Whitepapers", "Press Releases", "Webinars"] }],
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
  { icon: "compass", title: ["Strategic Technology", "Consulting"], text: "Define the right technology strategy to solve complex business challenges.", links: ["IT Consulting", "Software Consulting", "Mobile App Consulting", "AI Consulting"] },
  { icon: "layers", title: ["Digital Product Development", "& Engineering"], text: "Design, build and scale digital products engineered for performance.", links: ["Mobile App Development", "Web Development", "Custom Software", "UI/UX Design"] },
  { icon: "spark", title: ["AI, Data &", "Analytics"], text: "Turn data into intelligent systems that drive real business decisions.", links: ["Generative AI", "Machine Learning", "Data Engineering", "Business Intelligence"] },
  { icon: "shield", title: ["Cloud Operations", "& Cybersecurity"], text: "Run resilient, secure cloud infrastructure that scales with your growth.", links: ["Cloud Migration", "DevSecOps", "Managed Cloud", "Cybersecurity"] },
];

export type CaseStudy = {
  client: string;
  text: string;
  metrics: [string, string][];
  bg: string;
  dark: boolean; // true = light text on dark card
  accent: string;
};

export const caseStudies: CaseStudy[] = [
  { client: "Freshly Market", text: "Engineered a predictive logistics core for a 400-store grocery chain.", metrics: [["100%", "increase in dispatch automation"], ["4X", "improvement in ops standards"]], bg: "#fefbdc", dark: false, accent: "#f59e0b" },
  { client: "Voyagr Air", text: "Re-engineered the digital passenger journey with an AI-native mobile ecosystem.", metrics: [["31%", "higher booking conversion"], ["4.8★", "app store rating"]], bg: "#cbfffd", dark: false, accent: "#0891b2" },
  { client: "Shiftly", text: "Modernized legacy data infrastructure to drive real-time analytics.", metrics: [["90%", "faster report load time"], ["1,000+", "locations with unified data"]], bg: "#191918", dark: true, accent: "#1a69fd" },
  { client: "Brewline", text: "Built a unified commerce ecosystem across 7 markets to reclaim direct orders.", metrics: [["50%", "of orders through the native app"], ["22%", "increase in conversion"]], bg: "#f40027", dark: true, accent: "#ffd372" },
  { client: "Orbitly", text: "Architected a multi-agent GenAI system that works as an autonomous consultant.", metrics: [["70%", "tickets resolved by agents"], ["3X", "faster research cycles"]], bg: "#ffffff", dark: false, accent: "#7c3aed" },
  { client: "Kinetik", text: "Connected workouts across wearables for a global sportswear brand.", metrics: [["2M+", "downloads"], ["500K", "new users acquired"]], bg: "#e9ff9b", dark: false, accent: "#16a34a" },
  { client: "Medora Health", text: "HIPAA-ready telehealth platform serving patients across 12 states.", metrics: [["500K", "consultations"], ["30%", "lower infra cost"]], bg: "#341ad4", dark: true, accent: "#cbfffd" },
  { client: "Urbanest", text: "Real-time inventory visibility across flagship home-furnishing stores.", metrics: [["7+", "stores enabled"], ["3X", "faster stock checks"]], bg: "#fff09b", dark: false, accent: "#1a69fd" },
  { client: "LedgerLine", text: "Digital-first banking with instant onboarding for SMEs.", metrics: [["90%", "faster onboarding"], ["$2B", "processed yearly"]], bg: "#f0e7ff", dark: false, accent: "#7c3aed" },
  { client: "Harbor Hotels", text: "Blockchain-secured reservation management for a luxury hotel group.", metrics: [["40%", "fewer booking disputes"], ["24/7", "automated check-in"]], bg: "#ffd372", dark: false, accent: "#b45309" },
];

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

export const industries = [
  { name: "Healthcare", icon: "heart", hue: 190 },
  { name: "Finance", icon: "chart", hue: 220 },
  { name: "Banking", icon: "bank", hue: 240 },
  { name: "Restaurant", icon: "food", hue: 10 },
  { name: "eCommerce", icon: "cart", hue: 280 },
  { name: "EV", icon: "bolt", hue: 140 },
  { name: "SaaS", icon: "cloud", hue: 200 },
  { name: "Travel", icon: "plane", hue: 30 },
  { name: "Entertainment", icon: "play", hue: 320 },
  { name: "On-Demand", icon: "rocket", hue: 260 },
  { name: "Logistics", icon: "truck", hue: 45 },
  { name: "Education", icon: "book", hue: 170 },
  { name: "Real Estate", icon: "home", hue: 25 },
  { name: "Aviation", icon: "plane", hue: 210 },
  { name: "Agriculture", icon: "leaf", hue: 100 },
  { name: "Insurance", icon: "shield", hue: 230 },
  { name: "Manufacturing", icon: "grid", hue: 0 },
];

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
    { title: "Services", links: ["Mobile App Development", "Web Development", "AI Development", "Cloud Services", "UI/UX Design", "QA & Testing"] },
    { title: "Industries", links: ["Healthcare", "FinTech", "Retail", "Logistics", "Education", "Real Estate"] },
    { title: "Company", links: ["About Us", "Careers", "Portfolio", "Testimonials", "Awards", "Contact"] },
    { title: "Resources", links: ["Blog", "Guides", "Whitepapers", "Press Releases", "FAQ"] },
  ],
  offices: [
    { country: "United States", flag: "US", addresses: ["120 Hudson St,\nManhattan,\nNY 10013, USA", "1900 Market St, Suite 600,\nSan Francisco,\nCA 94103"] },
    { country: "UAE", flag: "AE", addresses: ["Business Bay,\nTower B, 6th floor,\nDubai"] },
    { country: "Australia", flag: "AU", addresses: ["96 Harbour Street,\nSydney,\nNSW 2000"] },
    { country: "India", flag: "IN", addresses: ["Outer Ring Road,\nBengaluru,\nKA 560103", "Sector 62,\nNoida,\nUP 201309"] },
    { country: "United Kingdom", flag: "GB", addresses: ["22 Bishopsgate,\nLondon,\nEC2N 4BQ"] },
  ],
};
