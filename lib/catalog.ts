// Structured data that drives the template pages (/services/[slug], /industries/[slug], ...).
// PLACEHOLDER COPY: replace with Konsilience's real offerings, projects and people.

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* ---------------- Services ---------------- */

export type Service = {
  slug: string;
  name: string;
  category: string;
  icon: string;
  short: string;
  offerings: string[];
  tech: string[];
};

const svc = (name: string, category: string, icon: string, short: string, offerings: string[], tech: string[]): Service => ({
  slug: slugify(name),
  name,
  category,
  icon,
  short,
  offerings,
  tech,
});

export const serviceCategories = [
  { name: "Product Engineering", icon: "layers", text: "Design, build and scale digital products engineered for performance." },
  { name: "Digital Transformation", icon: "rocket", text: "Modernize legacy estates and adopt the technologies that move the needle." },
  { name: "Consulting", icon: "compass", text: "Define the right technology strategy to solve complex business challenges." },
  { name: "Data & Managed IT", icon: "db", text: "Turn data into decisions and keep critical systems running around the clock." },
];

export const serviceList: Service[] = [
  svc("UI/UX Design", "Product Engineering", "eye", "Research-led product design that users love and businesses measure.", ["User Research", "Wireframing & Prototyping", "Design Systems", "Usability Testing", "Interaction Design", "Accessibility Audits"], ["Figma", "Framer", "Maze", "Lottie", "Storybook", "Principle"]),
  svc("Mobile App Development", "Product Engineering", "phone", "Native and cross-platform apps built for scale, speed and store success.", ["iOS App Development", "Android App Development", "Flutter Apps", "React Native Apps", "Wearable Apps", "App Modernization"], ["Swift", "Kotlin", "Flutter", "React Native", "Firebase", "GraphQL"]),
  svc("Web Development", "Product Engineering", "grid", "High-performance web platforms, portals and progressive web apps.", ["Web Applications", "Enterprise Portals", "Progressive Web Apps", "Headless Commerce", "CMS Development", "API Development"], ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL", "Vercel"]),
  svc("Custom Software Development", "Product Engineering", "layers", "Bespoke software engineered around your workflows, not the other way round.", ["Enterprise Software", "SaaS Products", "ERP & CRM", "Workflow Automation", "System Integration", "MVP Development"], ["Java", ".NET", "Python", "Go", "Kubernetes", "Kafka"]),
  svc("QA & Testing", "Product Engineering", "check", "Automated and manual testing that ships quality at release velocity.", ["Test Automation", "Performance Testing", "Security Testing", "Mobile Testing", "API Testing", "QA Consulting"], ["Playwright", "Cypress", "Appium", "JMeter", "k6", "Selenium"]),
  svc("DevOps", "Product Engineering", "cloud", "CI/CD, infrastructure as code and observability for confident releases.", ["CI/CD Pipelines", "Infrastructure as Code", "Containerization", "Observability", "Release Management", "SRE"], ["GitHub Actions", "Terraform", "Docker", "Kubernetes", "Datadog", "ArgoCD"]),
  svc("Product Management", "Product Engineering", "compass", "Product strategy, roadmaps and discovery that de-risk what you build.", ["Product Discovery", "Roadmapping", "MVP Scoping", "Product Analytics", "Go-to-Market", "Growth Experiments"], ["Jira", "Productboard", "Amplitude", "Mixpanel", "Notion", "Miro"]),
  svc("Legacy Modernization", "Digital Transformation", "rocket", "Re-platform and refactor legacy systems without stopping the business.", ["Application Re-engineering", "Cloud Re-platforming", "Monolith to Microservices", "Database Migration", "UI Modernization", "Mainframe Offloading"], ["AWS", "Azure", "Kubernetes", "Java", ".NET", "PostgreSQL"]),
  svc("Cloud Services", "Digital Transformation", "cloud", "Cloud strategy, migration and management across AWS, Azure and GCP.", ["Cloud Strategy", "Cloud Migration", "Cloud-Native Development", "Serverless", "Cost Optimization", "Multi-Cloud"], ["AWS", "Azure", "Google Cloud", "Terraform", "Lambda", "Cloudflare"]),
  svc("Blockchain Development", "Digital Transformation", "lock", "Secure distributed ledgers, smart contracts and tokenization platforms.", ["Smart Contracts", "DeFi Platforms", "NFT Marketplaces", "Tokenization", "Private Blockchains", "Wallet Development"], ["Solidity", "Ethereum", "Hyperledger", "Polygon", "Rust", "Web3.js"]),
  svc("Cybersecurity", "Digital Transformation", "shield", "Security engineering, audits and managed defence for modern enterprises.", ["Security Audits", "Penetration Testing", "DevSecOps", "Identity & Access", "Cloud Security", "Compliance Readiness"], ["OWASP", "Snyk", "Okta", "CrowdStrike", "Vault", "Wiz"]),
  svc("IoT Development", "Digital Transformation", "bolt", "Connected devices, edge computing and real-time IoT platforms.", ["IoT Platforms", "Firmware Development", "Edge Computing", "Device Management", "Industrial IoT", "IoT Analytics"], ["MQTT", "AWS IoT", "Azure IoT", "C/C++", "Zephyr", "InfluxDB"]),
  svc("AR/VR Development", "Digital Transformation", "eye", "Immersive experiences for training, retail, real estate and more.", ["AR Apps", "VR Experiences", "Virtual Showrooms", "3D Configurators", "Mixed Reality", "Metaverse Spaces"], ["Unity", "Unreal", "ARKit", "ARCore", "WebXR", "Blender"]),
  svc("IT Consulting", "Consulting", "compass", "Technology strategy and architecture advice from senior practitioners.", ["IT Strategy", "Architecture Review", "Technology Due Diligence", "Digital Roadmaps", "Vendor Selection", "CTO as a Service"], ["TOGAF", "C4 Model", "AWS Well-Architected", "Azure CAF", "Miro", "Lucid"]),
  svc("Software Consulting", "Consulting", "layers", "Pragmatic guidance to build, buy or fix the software that runs your business.", ["Software Audits", "Build vs Buy", "Code Quality Review", "Process Improvement", "Team Scaling", "Delivery Rescue"], ["SonarQube", "GitHub", "Jira", "Linear", "Datadog", "Sentry"]),
  svc("FinTech Consulting", "Consulting", "chart", "Regulation-aware strategy for payments, lending, banking and wealth.", ["Digital Banking Strategy", "Payments Architecture", "Regulatory Compliance", "Open Banking", "Fraud & Risk", "Core Modernization"], ["Stripe", "Plaid", "Mambu", "Temenos", "PCI DSS", "ISO 20022"]),
  svc("Mobile App Consulting", "Consulting", "phone", "Validate, plan and scale your mobile product with a clear strategy.", ["App Strategy", "Platform Selection", "Monetization", "App Store Optimization", "Performance Audit", "Scaling Plan"], ["App Store Connect", "Google Play", "Firebase", "RevenueCat", "Branch", "Amplitude"]),
  svc("Big Data", "Data & Managed IT", "db", "Data lakes, pipelines and platforms that handle scale gracefully.", ["Data Lakes", "Data Pipelines", "Stream Processing", "Data Warehousing", "Data Governance", "Data Migration"], ["Databricks", "Snowflake", "Spark", "Kafka", "Airflow", "dbt"]),
  svc("Data Analytics", "Data & Managed IT", "chart", "From raw data to insights your teams can act on every day.", ["Descriptive Analytics", "Predictive Analytics", "Customer Analytics", "Self-Service Analytics", "Data Visualization", "Analytics Consulting"], ["Python", "R", "Looker", "Tableau", "BigQuery", "dbt"]),
  svc("Business Intelligence", "Data & Managed IT", "grid", "Dashboards and reporting that give leadership a single source of truth.", ["BI Strategy", "Dashboard Development", "KPI Frameworks", "Embedded Analytics", "Report Automation", "BI Migration"], ["Power BI", "Tableau", "Looker", "Metabase", "Snowflake", "SQL Server"]),
  svc("Managed IT Services", "Data & Managed IT", "shield", "24/7 monitoring, support and operations for business-critical systems.", ["24/7 Monitoring", "Application Support", "Infrastructure Management", "Incident Response", "Patch Management", "SLA Reporting"], ["PagerDuty", "Datadog", "ServiceNow", "Grafana", "Ansible", "Jira SM"]),
  svc("Dedicated Teams", "Data & Managed IT", "users", "Vetted engineers, designers and PMs who work as an extension of your team.", ["Dedicated Developers", "Team Augmentation", "Offshore Development Center", "Build-Operate-Transfer", "Agile Pods", "Technical Leadership"], ["Slack", "Jira", "GitHub", "Figma", "Notion", "Zoom"]),
];

/* ---------------- AI solutions ---------------- */

export const aiSolutions = [
  { slug: "agentic-ai", name: "Agentic AI", icon: "agent", short: "Autonomous agents that plan, use tools and complete multi-step business workflows.", useCases: ["Customer support agents", "Sales research agents", "Back-office automation", "IT operations agents"] },
  { slug: "generative-ai", name: "Generative AI", icon: "spark", short: "LLM-powered content, search and knowledge experiences grounded in your data.", useCases: ["Enterprise search (RAG)", "Content generation", "Document summarization", "Code assistants"] },
  { slug: "ai-copilots", name: "AI Copilots", icon: "users", short: "In-product assistants that help your users and employees get more done.", useCases: ["Sales copilots", "Analyst copilots", "Developer copilots", "Support copilots"] },
  { slug: "computer-vision", name: "Computer Vision", icon: "eye", short: "Image and video intelligence for inspection, safety, retail and healthcare.", useCases: ["Quality inspection", "Object detection", "Medical imaging", "Shelf analytics"] },
  { slug: "conversational-ai", name: "Conversational AI", icon: "mail", short: "Voice and chat assistants that resolve requests across every channel.", useCases: ["Voice bots", "WhatsApp assistants", "Multilingual chat", "Call-center automation"] },
];

/* ---------------- Industries ---------------- */

export type Industry = { slug: string; name: string; icon: string; hue: number; short: string; solutions: string[] };

const ind = (name: string, icon: string, hue: number, short: string, solutions: string[]): Industry => ({ slug: slugify(name), name, icon, hue, short, solutions });

export const industryList: Industry[] = [
  ind("Healthcare", "heart", 190, "HIPAA-ready telehealth, EHR integrations and patient engagement platforms.", ["Telemedicine Platforms", "EHR / EMR Integration", "Remote Patient Monitoring", "Healthcare Analytics", "Pharmacy Apps", "Medical Imaging AI"]),
  ind("Finance", "chart", 220, "Secure, compliant platforms for banking, lending, payments and wealth.", ["Digital Banking", "Lending Platforms", "Payment Gateways", "WealthTech", "InsurTech", "Fraud Detection"]),
  ind("Retail & Ecommerce", "cart", 280, "Unified commerce, personalization and supply-chain visibility.", ["Headless Commerce", "Marketplace Platforms", "Loyalty Apps", "Inventory Systems", "Personalization Engines", "Omnichannel POS"]),
  ind("Logistics", "truck", 45, "Real-time tracking, dispatch automation and fleet intelligence.", ["Fleet Management", "Dispatch Automation", "Warehouse Management", "Route Optimization", "Last-Mile Delivery", "Freight Marketplaces"]),
  ind("Education", "book", 170, "Learning platforms that engage students and scale for institutions.", ["LMS Platforms", "Virtual Classrooms", "Assessment Tools", "Tutoring Marketplaces", "Student Information Systems", "Adaptive Learning AI"]),
  ind("Real Estate", "home", 25, "PropTech for listings, property management and virtual tours.", ["Listing Portals", "Property Management", "Virtual Tours", "CRM for Brokers", "Rental Platforms", "Smart Buildings"]),
  ind("eMobility", "bolt", 140, "EV charging, fleet electrification and micromobility platforms.", ["EV Charging Apps", "Charge Point Management", "Fleet Electrification", "Scooter Sharing", "Battery Analytics", "Energy Billing"]),
  ind("Wearables", "heart", 330, "Companion apps and data platforms for connected devices.", ["Fitness Trackers", "Smartwatch Apps", "Health Data Platforms", "BLE Integrations", "Firmware OTA", "Wearable Analytics"]),
  ind("Energy", "bolt", 50, "Grid analytics, renewables monitoring and utility customer portals.", ["Smart Grid Analytics", "Renewables Monitoring", "Utility Portals", "Energy Trading", "Asset Management", "Demand Forecasting"]),
  ind("Agriculture", "leaf", 100, "Precision farming, supply-chain traceability and agri marketplaces.", ["Precision Farming", "Crop Monitoring", "Farm Management", "Agri Marketplaces", "Traceability", "Weather Intelligence"]),
  ind("Gaming", "play", 300, "Multiplayer games, backends and live-ops tooling at scale.", ["Mobile Games", "Multiplayer Backends", "Live-Ops Tooling", "In-Game Economies", "Esports Platforms", "Game Analytics"]),
  ind("OTT & Media", "play", 350, "Streaming platforms and media workflows for every screen.", ["Video Streaming Apps", "Content Management", "DRM & Security", "Recommendation Engines", "Ad Insertion", "Smart TV Apps"]),
  ind("On-Demand", "rocket", 260, "Marketplace apps connecting customers with services in real time.", ["Service Marketplaces", "Booking Engines", "Provider Apps", "Real-Time Tracking", "Payments & Payouts", "Rating Systems"]),
  ind("Food Delivery", "food", 10, "Ordering, delivery and restaurant platforms built for peak hours.", ["Ordering Apps", "Restaurant Dashboards", "Delivery Partner Apps", "Kitchen Display", "Loyalty Programs", "Demand Forecasting"]),
  ind("Travel", "plane", 30, "Booking engines, itinerary apps and travel experience platforms.", ["Booking Engines", "Itinerary Apps", "Hotel Management", "Travel Marketplaces", "Loyalty Platforms", "Dynamic Pricing"]),
  ind("Aviation", "plane", 210, "Passenger experience, crew and operations software for airlines.", ["Airline Apps", "Crew Management", "MRO Software", "Airport Operations", "Revenue Management", "Passenger AI"]),
  ind("Telecom", "phone", 240, "OSS/BSS modernization, self-care apps and network analytics.", ["Self-Care Apps", "OSS / BSS", "Network Analytics", "Billing Systems", "eSIM Platforms", "5G Solutions"]),
  ind("Startups", "rocket", 200, "From idea to MVP to Series B, a product team that scales with you.", ["MVP Development", "Product Discovery", "Fundraising Demos", "Scale-Up Engineering", "Fractional CTO", "Growth Analytics"]),
];

/* ---------------- Case studies ---------------- */

export type Project = {
  slug: string;
  client: string;
  industry: string;
  service: string;
  year: string;
  text: string;
  metrics: [string, string][];
  bg: string;
  dark: boolean;
  accent: string;
  challenge: string;
  solution: string[];
  tech: string[];
};

const proj = (p: Omit<Project, "slug">): Project => ({ slug: slugify(p.client), ...p });

export const projects: Project[] = [
  proj({ client: "Freshly Market", industry: "Retail & Ecommerce", service: "Custom Software Development", year: "2025", text: "Engineered a predictive logistics core for a 400-store grocery chain.", metrics: [["100%", "increase in dispatch automation"], ["4X", "improvement in ops standards"]], bg: "#fefbdc", dark: false, accent: "#f59e0b", challenge: "Manual dispatching and siloed store data caused late deliveries and stock-outs across 400 stores.", solution: ["Unified order and inventory data into a real-time platform", "Built an ML model to predict demand per store", "Automated dispatch with route optimization", "Launched a driver app with live tracking"], tech: ["Next.js", "Node.js", "Python", "Kafka", "AWS", "Flutter"] }),
  proj({ client: "Voyagr Air", industry: "Aviation", service: "Mobile App Development", year: "2025", text: "Re-engineered the digital passenger journey with an AI-native mobile ecosystem.", metrics: [["31%", "higher booking conversion"], ["4.8★", "app store rating"]], bg: "#cbfffd", dark: false, accent: "#0891b2", challenge: "A dated booking flow and fragmented apps were losing customers to OTAs.", solution: ["Redesigned booking in 3 steps", "Added an AI itinerary assistant", "Unified check-in, boarding and loyalty", "Rolled out in 6 languages"], tech: ["Swift", "Kotlin", "GraphQL", "OpenAI", "Azure", "Figma"] }),
  proj({ client: "Shiftly", industry: "Logistics", service: "Data Analytics", year: "2024", text: "Modernized legacy data infrastructure to drive real-time analytics.", metrics: [["90%", "faster report load time"], ["1,000+", "locations with unified data"]], bg: "#191918", dark: true, accent: "#1a69fd", challenge: "Reports took minutes to load and data from 1,000+ sites never matched.", solution: ["Migrated to a lakehouse architecture", "Built governed data models with dbt", "Delivered self-service BI dashboards", "Introduced data quality monitoring"], tech: ["Databricks", "dbt", "Power BI", "Airflow", "Azure", "Python"] }),
  proj({ client: "Brewline", industry: "Food Delivery", service: "Mobile App Development", year: "2024", text: "Built a unified commerce ecosystem across 7 markets to reclaim direct orders.", metrics: [["50%", "of orders through the native app"], ["22%", "increase in conversion"]], bg: "#f40027", dark: true, accent: "#ffd372", challenge: "Aggregators took most orders and margins across 900 outlets.", solution: ["Launched native ordering apps", "Built a loyalty and offers engine", "Integrated 900 POS systems", "Added kitchen display and delivery tracking"], tech: ["React Native", "Node.js", "PostgreSQL", "Redis", "AWS", "Stripe"] }),
  proj({ client: "Orbitly", industry: "Startups", service: "Agentic AI", year: "2025", text: "Architected a multi-agent GenAI system that works as an autonomous consultant.", metrics: [["70%", "tickets resolved by agents"], ["3X", "faster research cycles"]], bg: "#ffffff", dark: false, accent: "#7c3aed", challenge: "Analysts spent days on research that customers needed in minutes.", solution: ["Designed a planner-executor agent architecture", "Grounded agents in company data via RAG", "Added human-in-the-loop review", "Built evaluation and monitoring"], tech: ["Python", "LangGraph", "Claude", "pgvector", "FastAPI", "GCP"] }),
  proj({ client: "Kinetik", industry: "Wearables", service: "Mobile App Development", year: "2023", text: "Connected workouts across wearables for a global sportswear brand.", metrics: [["2M+", "downloads"], ["500K", "new users acquired"]], bg: "#e9ff9b", dark: false, accent: "#16a34a", challenge: "Workout data was scattered across devices and apps, hurting retention.", solution: ["Built BLE integrations for 12 devices", "Created social challenges and streaks", "Personalized training plans with ML", "Launched on iOS, Android and watchOS"], tech: ["Swift", "Kotlin", "Flutter", "Firebase", "BigQuery", "TensorFlow"] }),
  proj({ client: "Medora Health", industry: "Healthcare", service: "Web Development", year: "2024", text: "HIPAA-ready telehealth platform serving patients across 12 states.", metrics: [["500K", "consultations"], ["30%", "lower infra cost"]], bg: "#341ad4", dark: true, accent: "#cbfffd", challenge: "A legacy portal couldn't scale or meet HIPAA audit requirements.", solution: ["Built a secure video consultation platform", "Integrated with 3 EHR systems", "Added e-prescriptions and payments", "Moved to cost-optimized cloud"], tech: ["Next.js", "WebRTC", "Node.js", "AWS", "HL7 FHIR", "Terraform"] }),
  proj({ client: "Urbanest", industry: "Real Estate", service: "IoT Development", year: "2023", text: "Real-time inventory visibility across flagship home-furnishing stores.", metrics: [["7+", "stores enabled"], ["3X", "faster stock checks"]], bg: "#fff09b", dark: false, accent: "#1a69fd", challenge: "Staff couldn't see accurate stock, leading to lost sales.", solution: ["Deployed RFID and IoT sensors", "Built a real-time inventory service", "Created a staff mobile app", "Connected to e-commerce for click-and-collect"], tech: ["AWS IoT", "Go", "React Native", "DynamoDB", "Kafka", "Grafana"] }),
  proj({ client: "LedgerLine", industry: "Finance", service: "FinTech Consulting", year: "2024", text: "Digital-first banking with instant onboarding for SMEs.", metrics: [["90%", "faster onboarding"], ["$2B", "processed yearly"]], bg: "#f0e7ff", dark: false, accent: "#7c3aed", challenge: "Paper-heavy onboarding took two weeks and lost applicants.", solution: ["Designed digital KYC/KYB flows", "Integrated open-banking data", "Built a modular core-banking layer", "Achieved PCI DSS compliance"], tech: ["Java", "Kotlin", "Plaid", "Kubernetes", "PostgreSQL", "Okta"] }),
  proj({ client: "Harbor Hotels", industry: "Travel", service: "Blockchain Development", year: "2023", text: "Blockchain-secured reservation management for a luxury hotel group.", metrics: [["40%", "fewer booking disputes"], ["24/7", "automated check-in"]], bg: "#ffd372", dark: false, accent: "#b45309", challenge: "Overbooking and disputes between channels damaged guest trust.", solution: ["Built a permissioned ledger for reservations", "Smart contracts for deposits and refunds", "Mobile keys and self check-in", "Channel-manager integrations"], tech: ["Hyperledger", "Solidity", "Node.js", "React", "Azure", "Twilio"] }),
];

/* ---------------- Blog ---------------- */

export const blogCategories = ["AI", "Engineering", "Design", "Cloud", "Business"];

export const posts = [
  { slug: "agentic-ai-enterprise-playbook", title: "The Enterprise Playbook for Agentic AI in 2026", category: "AI", date: "2026-09-12", read: 9, excerpt: "How to move from chatbot pilots to agents that complete real work, safely and measurably." },
  { slug: "modernize-legacy-without-downtime", title: "How to Modernize a Legacy System Without Downtime", category: "Engineering", date: "2026-08-28", read: 7, excerpt: "A phased strangler-fig approach that keeps the business running while you rebuild." },
  { slug: "design-systems-that-scale", title: "Design Systems That Actually Scale Across Teams", category: "Design", date: "2026-08-10", read: 6, excerpt: "Tokens, governance and the rituals that keep 20 squads shipping consistent UI." },
  { slug: "cloud-cost-optimization-guide", title: "Cloud Cost Optimization: Cut 30% Without Cutting Corners", category: "Cloud", date: "2026-07-22", read: 8, excerpt: "Rightsizing, commitments and architecture changes that pay for themselves." },
  { slug: "app-development-cost-2026", title: "How Much Does It Cost to Build an App in 2026?", category: "Business", date: "2026-07-05", read: 10, excerpt: "A transparent breakdown by complexity, platform, team model and region." },
  { slug: "rag-architecture-patterns", title: "7 RAG Architecture Patterns for Production", category: "AI", date: "2026-06-18", read: 11, excerpt: "From naive retrieval to agentic RAG: what works, what breaks and how to evaluate." },
];

/* ---------------- Careers ---------------- */

export const jobs = [
  { slug: "senior-react-developer", title: "Senior React / Next.js Developer", team: "Engineering", location: "Remote / Hybrid", type: "Full-time", exp: "5+ years" },
  { slug: "ai-ml-engineer", title: "AI / ML Engineer", team: "KonAI", location: "Hybrid", type: "Full-time", exp: "3+ years" },
  { slug: "flutter-developer", title: "Flutter Developer", team: "Mobile", location: "Remote", type: "Full-time", exp: "3+ years" },
  { slug: "product-designer", title: "Senior Product Designer", team: "Design", location: "Hybrid", type: "Full-time", exp: "4+ years" },
  { slug: "devops-engineer", title: "DevOps Engineer", team: "Cloud", location: "Remote", type: "Full-time", exp: "4+ years" },
  { slug: "business-analyst", title: "Business Analyst", team: "Delivery", location: "On-site", type: "Full-time", exp: "2+ years" },
];

/* ---------------- Team ---------------- */

export const leaders = [
  { name: "Aarav Mehta", role: "Founder & CEO" },
  { name: "Sara Kapoor", role: "Chief Technology Officer" },
  { name: "Daniel Brooks", role: "Chief Operating Officer" },
  { name: "Meera Iyer", role: "VP, KonAI" },
  { name: "Lucas Romero", role: "VP, Engineering" },
  { name: "Hana Sato", role: "Head of Design" },
  { name: "Omar Haddad", role: "Head of Sales, MEA" },
  { name: "Emily Clarke", role: "Head of People" },
];

/* ---------------- Shared delivery content ---------------- */

export const deliveryProcess = [
  { title: "Discover", text: "Workshops to align on goals, users, constraints and success metrics." },
  { title: "Design", text: "UX flows, prototypes and architecture validated with real users." },
  { title: "Build", text: "Agile sprints with weekly demos, CI/CD and automated testing." },
  { title: "Launch", text: "Hardened release, monitoring, store submission and go-live support." },
  { title: "Scale", text: "Continuous improvement, analytics and SLA-backed support." },
];

export const engagementModels = [
  { icon: "target", title: "Fixed Scope", text: "Defined scope, timeline and price. Ideal for MVPs and well-specified projects.", list: ["Clear milestones", "Predictable budget", "Outcome-based delivery"] },
  { icon: "users", title: "Dedicated Team", text: "A cross-functional squad that works as an extension of your company.", list: ["Full-time specialists", "Scale up or down monthly", "You set priorities"] },
  { icon: "clock", title: "Time & Materials", text: "Flexible engagement for evolving products and ongoing roadmaps.", list: ["Pay for actual effort", "Change scope anytime", "Transparent reporting"] },
];

export const whyUs = [
  { icon: "users", title: "Senior-led teams", text: "Every engagement is led by architects and product leads with 10+ years of experience." },
  { icon: "spark", title: "AI-first delivery", text: "AI-assisted engineering and QA shorten timelines without cutting corners." },
  { icon: "shield", title: "Secure by design", text: "ISO 27001-aligned processes, NDAs and compliance mapping from day one." },
  { icon: "clock", title: "Weekly demos", text: "Working software every sprint, so you see progress, not status reports." },
];

export const techStack = ["React", "Next.js", "Node.js", "Python", "Flutter", "Swift", "Kotlin", "Java", ".NET", "Go", "AWS", "Azure", "Google Cloud", "Kubernetes", "Terraform", "PostgreSQL", "MongoDB", "Databricks", "Snowflake", "OpenAI", "Claude", "LangGraph"];

/* ---------------- AI delivery ---------------- */

export const aiProcess = [
  { title: "Assess", text: "Identify high-ROI use cases and check data and AI readiness." },
  { title: "Prepare data", text: "Clean, connect and govern the data your models depend on." },
  { title: "Prototype", text: "Working proof-of-concept in weeks, evaluated against real metrics." },
  { title: "Productionize", text: "Secure, observable, scalable deployment integrated with your systems." },
  { title: "Govern & improve", text: "Monitoring, evals, guardrails and continuous fine-tuning." },
];

export const aiStack = ["OpenAI", "Claude", "Gemini", "Llama", "Mistral", "LangGraph", "LlamaIndex", "Hugging Face", "PyTorch", "TensorFlow", "pgvector", "Pinecone", "Weaviate", "Databricks", "Vertex AI", "Azure OpenAI", "AWS Bedrock", "MLflow"];

export const responsibleAi = [
  { icon: "shield", title: "Guardrails", text: "Input/output filtering, PII redaction and policy enforcement on every call." },
  { icon: "eye", title: "Explainability", text: "Traceable reasoning, citations and audit logs for every AI decision." },
  { icon: "users", title: "Human in the loop", text: "Review and approval steps where the stakes are high." },
  { icon: "target", title: "Continuous evals", text: "Automated quality, bias and regression testing before and after release." },
];

/* ---------------- Resources ---------------- */

export const resourceTypes = [
  {
    slug: "guides",
    name: "Guides",
    icon: "book",
    intro: "Step-by-step playbooks for planning, building and scaling digital products.",
    cta: "Read Guide",
    items: [
      { title: "The AI Readiness Guide", text: "Assess your data, teams and processes before your first AI project.", meta: "24 pages" },
      { title: "MVP Development Guide", text: "Scope, build and launch an MVP in 12 weeks without wasting budget.", meta: "18 pages" },
      { title: "Cloud Migration Checklist", text: "A phase-by-phase checklist for low-risk cloud migrations.", meta: "12 pages" },
      { title: "Design System Starter Kit", text: "Tokens, components and governance for multi-team products.", meta: "30 pages" },
    ],
  },
  {
    slug: "whitepapers",
    name: "Whitepapers",
    icon: "doc",
    intro: "In-depth research on the technologies reshaping industries.",
    cta: "Download PDF",
    items: [
      { title: "Agentic AI in the Enterprise 2026", text: "Adoption patterns, architectures and ROI benchmarks from 50 deployments.", meta: "PDF · 3.2 MB" },
      { title: "The State of Legacy Modernization", text: "Why modernization programmes fail, and how the successful ones differ.", meta: "PDF · 2.1 MB" },
      { title: "Responsible AI Governance Framework", text: "Policies, controls and tooling for trustworthy AI at scale.", meta: "PDF · 1.8 MB" },
    ],
  },
  {
    slug: "press-releases",
    name: "Press Releases",
    icon: "globe",
    intro: "Company news, partnerships and announcements.",
    cta: "Read More",
    items: [
      { title: "Konsilience launches KonAI center of excellence", text: "New practice focused on agentic and generative AI for enterprises.", meta: "Sep 2026" },
      { title: "Konsilience opens new delivery center in London", text: "Expanding support for clients across the UK and Europe.", meta: "Jun 2026" },
      { title: "Konsilience named a fastest-growing tech company", text: "Recognised for growth and engineering excellence.", meta: "Mar 2026" },
    ],
  },
  {
    slug: "webinars",
    name: "Webinars",
    icon: "play",
    intro: "Live and on-demand sessions with our engineers and AI specialists.",
    cta: "Watch Now",
    items: [
      { title: "Building Production RAG Systems", text: "Architecture, evaluation and cost control for retrieval-augmented generation.", meta: "On-demand · 45 min" },
      { title: "From Monolith to Microservices", text: "A real-world migration story, warts and all.", meta: "On-demand · 50 min" },
      { title: "AI Copilots for Sales Teams", text: "Live demo and Q&A with our KonAI team.", meta: "Upcoming · Oct 2026" },
    ],
  },
];
