// Structured data that drives the template pages (/services/[slug], /industries/[slug], ...).
// PLACEHOLDER COPY: replace with Konsilience's real offerings, projects and people.

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* ---------------- Services ---------------- */

export type Service = {
  slug: string;
  name: string;
  note?: string; // shown after the name in menus and lists, e.g. the standards a service covers
  category: string;
  icon: string;
  short: string;
  offerings: string[];
  offeringText: Record<string, string>; // one line per offering, shown on the service page
  tech: string[];
};

// offerings: [title, one-line description]. `slug` and `note` only where the name alone would not do.
const svc = (name: string, category: string, icon: string, short: string, offerings: [string, string][], tech: string[], extra: { slug?: string; note?: string } = {}): Service => ({
  slug: extra.slug ?? slugify(name),
  name,
  note: extra.note,
  category,
  icon,
  short,
  offerings: offerings.map(([title]) => title),
  offeringText: Object.fromEntries(offerings),
  tech,
});

// The five main services. Each groups the services below it in the header menu and on /services.
export const serviceCategories = [
  { name: "AI & Automation", icon: "agent", text: "Agents, assistants and guardrails that put AI to work in your business, reliably." },
  { name: "Cloud & DevOps", icon: "cloud", text: "Move to the cloud, ship faster and keep both the bill and the uptime under control." },
  { name: "Security", icon: "shield", text: "Find the weaknesses, fix them and stay ready for audits." },
  { name: "Product Engineering", icon: "layers", text: "Design, build and modernize the software your business runs on." },
  { name: "Digital Marketing", icon: "chart", text: "Get found, earn the click and turn visitors into customers." },
];

export const serviceList: Service[] = [
  /* AI & Automation */
  svc("AI Agents & Workflow Automation", "AI & Automation", "agent", "AI agents that take over multi-step work across your tools, with a human in the loop where it matters.", [
    ["Workflow Discovery", "Map the manual steps in a process and pick the ones an agent can take over safely."],
    ["Custom AI Agents", "Agents that plan, call your tools and APIs, and finish multi-step tasks end to end."],
    ["Tool & System Integration", "Connect agents to your CRM, helpdesk, ERP and internal APIs with scoped permissions."],
    ["Human-in-the-Loop Controls", "Approval steps, spend limits and audit trails so people stay in charge of the decisions that matter."],
  ], ["OpenAI", "Claude", "LangGraph", "n8n", "Python", "PostgreSQL"]),
  svc("RAG & Knowledge Assistants", "AI & Automation", "book", "Assistants that answer from your own documents and data, with sources cited.", [
    ["Knowledge Base Ingestion", "Pipelines that clean, chunk and index your documents, tickets and wikis."],
    ["Retrieval Pipeline Design", "Hybrid search, re-ranking and access rules tuned to return the right passage."],
    ["Internal & Customer Assistants", "Chat and search assistants for staff or customers, embedded in the tools they already use."],
    ["Answer Quality Evaluation", "Test sets and scoring that measure accuracy and catch regressions before release."],
  ], ["LlamaIndex", "pgvector", "Pinecone", "OpenAI", "Claude", "Elasticsearch"]),
  svc("AI Reliability & Observability", "AI & Automation", "eye", "Tracing, evaluation and cost control for AI features that are already in production.", [
    ["LLM Tracing", "See every model call, tool call and retrieval step for a request in one trace."],
    ["Evaluation Pipelines", "Automated checks that score outputs on every change to prompts, models or data."],
    ["Cost & Token Monitoring", "Track spend per user, feature and model, with alerts before budgets are exceeded."],
    ["Loop & Incident Alerts", "Detect runaway agents, failures and latency spikes, and route them to the right person."],
  ], ["Trasys AI", "OpenTelemetry", "Grafana", "Python", "TypeScript", "PostgreSQL"]),
  svc("AI Compliance Engineering", "AI & Automation", "check", "Engineering controls that keep AI features inside your legal, privacy and policy limits.", [
    ["AI Risk Assessment", "Review each AI use case for data, privacy and regulatory risk before it is built."],
    ["Data Privacy & PII Controls", "Redaction, data residency and retention rules applied before data reaches a model."],
    ["Guardrails & Policy Enforcement", "Input and output filters that block unsafe, off-policy or out-of-scope responses."],
    ["Audit Trails & Documentation", "Logged decisions and model documentation ready for auditors and customers."],
  ], ["Guardrails", "Presidio", "OpenTelemetry", "Python", "AWS Bedrock", "Azure OpenAI"]),

  /* Cloud & DevOps */
  svc("Cloud Migration", "Cloud & DevOps", "cloud", "Move applications and data to AWS, Azure or Google Cloud with a planned, low-risk cutover.", [
    ["Migration Assessment", "Inventory workloads, dependencies and costs, and choose the right approach for each."],
    ["Landing Zone Setup", "Accounts, networking, identity and guardrails in place before anything moves."],
    ["Application & Data Migration", "Move services and databases in stages, with rollback plans at every step."],
    ["Cutover & Validation", "Rehearsed cutovers, performance checks and a clean decommission of the old estate."],
  ], ["AWS", "Azure", "Google Cloud", "Terraform", "Kubernetes", "PostgreSQL"]),
  svc("CI/CD & Infrastructure as Code", "Cloud & DevOps", "code", "Automated pipelines and versioned infrastructure, so every release is repeatable.", [
    ["Pipeline Design", "Build, test and deploy pipelines that take a commit to production without manual steps."],
    ["Infrastructure as Code", "Environments defined in Terraform and reviewed like any other code change."],
    ["Containerization", "Docker images and Kubernetes or serverless runtimes sized for your workloads."],
    ["Release Strategies", "Blue-green, canary and feature-flag releases that make rollbacks routine."],
  ], ["GitHub Actions", "GitLab CI", "Terraform", "Docker", "Kubernetes", "ArgoCD"]),
  svc("Cloud Cost Optimization", "Cloud & DevOps", "chart", "Find and remove cloud waste, then keep spend visible to the teams that create it.", [
    ["Cost Audit", "A line-by-line review of your bill to find idle, oversized and forgotten resources."],
    ["Rightsizing & Autoscaling", "Match compute, storage and databases to real usage, and scale with demand."],
    ["Commitment Planning", "Savings plans and reserved capacity sized to your steady baseline."],
    ["Cost Dashboards & Alerts", "Spend broken down by team, service and environment, with budget alerts."],
  ], ["AWS Cost Explorer", "Azure Cost Management", "Kubecost", "Terraform", "Grafana", "Datadog"]),
  svc("Observability & SRE", "Cloud & DevOps", "target", "Monitoring, alerting and reliability practices that catch problems before your customers do.", [
    ["Metrics, Logs & Traces", "One place to see how every service behaves and where a request slows down."],
    ["SLOs & Error Budgets", "Reliability targets agreed with the business and tracked on every release."],
    ["Alerting & On-Call", "Alerts that point to a cause, routed to the right person with a runbook attached."],
    ["Incident Response", "Clear roles during an incident and blameless reviews that prevent a repeat."],
  ], ["Prometheus", "Grafana", "OpenTelemetry", "Datadog", "PagerDuty", "Sentry"]),
  svc("Managed DevOps", "Cloud & DevOps", "users", "A DevOps team on retainer that runs your pipelines, infrastructure and releases.", [
    ["Pipeline & Release Management", "We own the build and deploy pipeline and keep releases moving."],
    ["Infrastructure Operations", "Patching, upgrades, backups and capacity handled on a schedule."],
    ["Monitoring & Incident Support", "Alert handling and incident support with agreed response times."],
    ["Monthly Reporting", "Uptime, deployment frequency, incidents and cost in one report."],
  ], ["AWS", "Kubernetes", "Terraform", "GitHub Actions", "Grafana", "PagerDuty"]),

  /* Security */
  svc("Application Security Audit", "Security", "search", "A full review of your application's code, configuration and architecture for security weaknesses.", [
    ["Secure Code Review", "Manual and automated review of your code for injection, auth and data-handling flaws."],
    ["Dependency & Secrets Scan", "Find vulnerable packages, leaked keys and unsafe defaults across your repositories."],
    ["Architecture & Threat Modeling", "Walk through how the system could be attacked and where the controls are thin."],
    ["Prioritized Fix Plan", "Findings ranked by risk, with clear steps to fix each one and a retest."],
  ], ["OWASP ASVS", "Semgrep", "Snyk", "Burp Suite", "Trivy", "GitHub Advanced Security"]),
  svc("Penetration Testing", "Security", "lock", "Authorized attack simulation against your web apps, APIs, mobile apps and cloud.", [
    ["Web & API Testing", "Manual testing of authentication, access control, business logic and input handling."],
    ["Mobile App Testing", "Testing of iOS and Android apps, their storage and the APIs behind them."],
    ["Cloud & Network Testing", "Testing of exposed services, cloud misconfigurations and internal network paths."],
    ["Report & Retest", "Reproducible findings with severity ratings, and a retest once fixes are in."],
  ], ["Burp Suite", "OWASP ZAP", "Nmap", "Metasploit", "Kali Linux", "MobSF"]),
  svc("Compliance Readiness", "Security", "award", "Get ready for SOC 2, ISO 27001 and GDPR with the controls, policies and evidence auditors ask for.", [
    ["Gap Assessment", "Compare your current controls with the standard and list exactly what is missing."],
    ["Policies & Procedures", "Write the security policies your team will actually follow, mapped to each requirement."],
    ["Control Implementation", "Put the technical controls in place: access, logging, encryption, backups and vendor checks."],
    ["Audit Preparation", "Collect evidence continuously and prepare your team for the auditor's questions."],
  ], ["SOC 2", "ISO 27001", "GDPR", "Vanta", "Drata", "AWS Security Hub"], { note: "SOC 2 / ISO 27001 / GDPR" }),
  svc("Managed Security Monitoring", "Security", "shield", "Continuous monitoring of your cloud and applications, with alerts triaged by security engineers.", [
    ["Log Collection & SIEM", "Bring cloud, application and identity logs into one place and keep them searchable."],
    ["Threat Detection", "Detection rules tuned to your environment, so real threats stand out from noise."],
    ["Alert Triage & Response", "Engineers investigate alerts and guide or carry out the response."],
    ["Monthly Security Reports", "What was detected, what was done and what to fix next."],
  ], ["Wazuh", "AWS GuardDuty", "Microsoft Sentinel", "CrowdStrike", "Elastic Security", "Cloudflare"]),

  /* Product Engineering */
  svc("SaaS & MVP Development", "Product Engineering", "rocket", "Take a product from idea to a launched MVP, then grow it into a multi-tenant SaaS.", [
    ["Product Discovery & Scoping", "Agree the smallest product that proves the idea, and what it will cost to build."],
    ["MVP Build", "Design and engineering of the first release, with a working demo every week."],
    ["Multi-Tenant Architecture", "Tenant isolation, roles and data models that hold up as customers grow."],
    ["Billing & Subscriptions", "Plans, trials, invoices and payments built on proven providers."],
  ], ["Next.js", "Node.js", "Python", "PostgreSQL", "Stripe", "AWS"]),
  svc("Backend & API Development", "Product Engineering", "db", "Reliable backends, APIs and integrations that keep up as usage grows.", [
    ["API Design & Development", "REST and GraphQL APIs with clear contracts, versioning and documentation."],
    ["Database Design", "Schemas, indexes and queries designed for your real read and write patterns."],
    ["Third-Party Integrations", "Payments, CRMs, ERPs and partner APIs connected with retries and monitoring."],
    ["Performance & Scaling", "Caching, queues and load testing to remove bottlenecks before they hurt users."],
  ], ["Node.js", "Python", "Go", "PostgreSQL", "Redis", "Kafka"]),
  svc("Legacy Modernization", "Product Engineering", "bolt", "Re-platform and refactor legacy systems without stopping the business.", [
    ["Application Re-engineering", "Rewrite or refactor ageing code in stages, keeping the system live throughout."],
    ["Cloud Re-platforming", "Move on-premise applications to managed cloud services with minimal change."],
    ["Monolith to Microservices", "Split a monolith along clear boundaries, one service at a time."],
    ["Database Migration", "Move data to a modern database with verified, zero-loss cutovers."],
  ], ["AWS", "Azure", "Kubernetes", "Java", ".NET", "PostgreSQL"]),
  svc("Web & Mobile Apps", "Product Engineering", "mobile", "Web platforms and iOS and Android apps designed and built by one team.", [
    ["Web Applications", "Fast, accessible web apps and portals built with Next.js and React."],
    ["iOS & Android Apps", "Native and cross-platform apps built with Swift, Kotlin, Flutter or React Native."],
    ["UI/UX Design", "Research, wireframes, prototypes and a design system your engineers build from."],
    ["QA & Release", "Automated and manual testing, store submission and release management."],
  ], ["Next.js", "React", "Flutter", "React Native", "Swift", "Kotlin"]),

  /* Digital Marketing */
  svc("Website & SEO Audit", "Digital Marketing", "search", "A clear report on what is holding your website back in search, speed and conversions.", [
    ["Technical SEO Audit", "Crawling, indexing, site structure and schema checked page by page."],
    ["Speed & Core Web Vitals", "Find what slows your pages down and how to fix it."],
    ["Content & Keyword Gaps", "The searches your customers make that your site does not yet answer."],
    ["Prioritized Action Plan", "Every finding ranked by impact and effort, ready to hand to a developer."],
  ], ["Google Search Console", "Screaming Frog", "Ahrefs", "Semrush", "PageSpeed Insights", "GA4"]),
  svc("SEO & Local SEO", "Digital Marketing", "pin", "Rank for the searches that bring customers, nationally and in the places you serve.", [
    ["Technical & On-Page SEO", "Fix the foundations and optimize the pages that matter most."],
    ["Local SEO & Google Business Profile", "Show up in the map pack and local results for your service areas."],
    ["AI Search Optimization", "Structure content so AI assistants and answer engines can find and cite it."],
    ["Link & Authority Building", "Earn relevant links and mentions that raise your site's authority."],
  ], ["Google Search Console", "Google Business Profile", "Ahrefs", "Semrush", "Schema.org", "GA4"]),
  svc("Performance Marketing", "Digital Marketing", "target", "Paid campaigns on search and social, managed against cost per lead and return on ad spend.", [
    ["Google Search & Performance Max", "Campaigns built around buyer intent, with tight keyword and budget control."],
    ["Meta & LinkedIn Ads", "Audience targeting and creative testing on the platforms your buyers use."],
    ["Retargeting Funnels", "Bring back visitors who did not convert the first time."],
    ["Tracking & Attribution", "Conversion tracking you can trust, so budget goes to what works."],
  ], ["Google Ads", "Meta Ads Manager", "LinkedIn Ads", "GA4", "Google Tag Manager", "Looker Studio"]),
  svc("Content & Social Media", "Digital Marketing", "share", "Articles, case studies and social posts that build trust and bring in leads.", [
    ["Content Strategy", "Topics chosen from what your buyers search for and ask about."],
    ["Blogs & Case Studies", "Well-researched articles and customer stories written for readers first."],
    ["Social Media Management", "A steady calendar of posts on the channels your audience follows."],
    ["Founder & Brand Voice", "Thought-leadership posts that sound like the people behind the company."],
  ], ["LinkedIn", "Instagram", "YouTube", "Notion", "Canva", "Buffer"]),
  svc("AI Marketing Automation", "Digital Marketing", "spark", "Use AI and automation to capture, qualify and follow up with leads around the clock.", [
    ["Lead Capture & Qualification", "Chat and forms that qualify leads and book meetings automatically."],
    ["Email & WhatsApp Journeys", "Automated follow-ups triggered by what each lead does."],
    ["CRM Automation", "Leads routed, scored and updated in your CRM without manual entry."],
    ["AI Content Workflows", "Drafting and repurposing workflows that keep a human editor in control."],
  ], ["HubSpot", "Zoho CRM", "n8n", "Zapier", "OpenAI", "WhatsApp Business API"]),
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
// Platforms Konsilience has built, each modelled on a well-known product in its category.
// `style` names the reference product for comparison only; we do not claim to have built that brand.
// Features, typical stacks and integrations are researched from public sources (Sep 2026).
// Results are qualitative on purpose: add your real project numbers to `metrics` when available.

export type Project = {
  slug: string;
  client: string; // display name of the platform
  style: string; // reference product, e.g. "Freshdesk"
  url: string; // website link shown on the case study
  live?: boolean; // true = `url` is the platform WE built and run (button says "Visit Live Platform"); default = reference product
  category: string;
  industry: string;
  service: string; // must match a serviceList name to cross-link
  text: string; // one-line summary
  about: string;
  challenge: string;
  solution: string[];
  metrics: [string, string][]; // qualitative outcomes: [short value, label]
  platforms: string[];
  tech: string[];
  tools: string[];
  bg: string;
  dark: boolean;
  accent: string;
};

const proj = (p: Omit<Project, "slug">): Project => ({ slug: slugify(p.client), ...p });

export const projects: Project[] = [
  proj({
    client: "Omnichannel Helpdesk",
    style: "Freshdesk",
    url: "https://www.freshworks.com/freshdesk/",
    live: true,
    category: "Helpdesk & ticketing SaaS",
    industry: "Customer Support",
    service: "SaaS & MVP Development",
    text: "An AI-assisted helpdesk that turns email, chat, phone and social messages into one trackable ticket queue.",
    about: "A multi-tenant customer service platform where support teams manage every conversation from one workspace, backed by automation, SLAs, a self-service portal and AI copilots for agents.",
    challenge: "Support requests were landing in scattered inboxes, chat tools and phone lines. Tickets got lost or duplicated, agents lacked customer context from CRM and order systems, and repetitive questions consumed headcount.",
    solution: ["Unified omnichannel ticketing across email, chat, voice, SMS and social", "AI copilot for reply suggestions, summaries and real-time translation", "Automation rules, SLA policies and skill-based routing", "Self-service knowledge base and customer portal", "Marketplace-style integrations that pull CRM and order context into tickets", "Sharded multi-tenant architecture built for very high request volumes"],
    metrics: [["1 inbox", "for every support channel"], ["AI", "copilot and auto-triage for agents"]],
    platforms: ["Web", "iOS", "Android"],
    tech: ["Ruby on Rails", "Node.js", "MySQL", "Redis", "Sidekiq", "Elasticsearch", "AWS", "Nginx"],
    tools: ["Salesforce", "Shopify", "Slack", "Stripe", "Microsoft Teams"],
    bg: "#fefbdc", dark: false, accent: "#f59e0b",
  }),
  proj({
    client: "Legal Practice Suite",
    style: "Clio",
    url: "https://www.clio.com",
    live: true,
    category: "Legal practice management SaaS",
    industry: "Legal",
    service: "SaaS & MVP Development",
    text: "Cloud practice management for law firms: matters, time, billing, trust accounting and client intake in one place.",
    about: "A cloud platform that replaces on-premise legal software and spreadsheets, giving firms a single system for matters, billable time, trust accounting, payments and client communication.",
    challenge: "Firms ran on legacy desktop tools, spreadsheets and paper, which made it hard to track matters, capture every billable hour, stay compliant with trust accounting rules and get paid on time.",
    solution: ["Matter, contact, document and calendar management", "Time tracking, legal billing and trust accounting", "Built-in card and eCheck payments", "Client intake CRM and secure client portal", "AI assistance for drafting and summarising legal work", "Accounting and Microsoft 365 integrations"],
    metrics: [["Cloud", "replaces on-premise practice software"], ["1 system", "for matters, time and billing"]],
    platforms: ["Web", "iOS", "Android"],
    tech: ["Ruby on Rails", "Hotwire", "Tailwind CSS", "MySQL", "AWS", "Kubernetes"],
    tools: ["QuickBooks Online", "Xero", "LawPay", "Microsoft 365"],
    bg: "#f0e7ff", dark: false, accent: "#7c3aed",
  }),
  proj({
    client: "Enterprise HRMS",
    style: "Darwinbox",
    url: "https://darwinbox.com",
    live: true,
    category: "HCM / HRMS platform",
    industry: "HR & Workforce",
    service: "SaaS & MVP Development",
    text: "A cloud HCM suite covering the full employee lifecycle, from hiring and onboarding to payroll and performance.",
    about: "A single, mobile-first HR platform for large and distributed workforces, replacing disconnected systems for recruitment, attendance, payroll, performance and engagement.",
    challenge: "HR ran on separate legacy systems for hiring, attendance, payroll and reviews. Employee data was duplicated, processes were manual and the employee experience on mobile was poor.",
    solution: ["Recruitment, onboarding and core HR records", "Leave, attendance and shift management", "Payroll, travel and expense workflows", "Performance reviews, goals and recognition", "Employee helpdesk with chatbot support and a lightweight mobile app", "People analytics dashboards with AI-driven insights"],
    metrics: [["Hire to retire", "one platform for the employee lifecycle"], ["Mobile-first", "self-service for every employee"]],
    platforms: ["Web", "iOS", "Android"],
    tech: ["Node.js", "Python", "PHP", "Angular", "React", "MongoDB", "AWS", "Terraform"],
    tools: ["Microsoft Entra ID", "Slack", "Microsoft Teams"],
    bg: "#191918", dark: true, accent: "#1a69fd",
  }),
  proj({
    client: "Field Service Platform",
    style: "Jobber",
    url: "https://getjobber.com",
    live: true,
    category: "Field service management SaaS",
    industry: "Field Services",
    service: "Web & Mobile Apps",
    text: "An all-in-one app for home service businesses to quote, schedule, dispatch, invoice and get paid.",
    about: "A web and mobile platform for landscaping, cleaning, plumbing and contracting businesses that covers the full job workflow from request to payment.",
    challenge: "Small service businesses juggled paper quotes, whiteboard schedules and separate invoicing tools. Jobs were double-booked, crews lacked job details in the field and owners waited weeks to get paid.",
    solution: ["Online requests, quotes and a client hub", "Drag-and-drop scheduling, dispatch and route planning", "Crew mobile app with job details, photos and time tracking", "Invoicing with integrated online payments", "Automated client reminders and follow-ups", "Accounting sync and an app marketplace"],
    metrics: [["Quote to paid", "the whole job flow in one app"], ["Real-time", "dispatch to crews in the field"]],
    platforms: ["Web", "iOS", "Android"],
    tech: ["Ruby on Rails", "React", "React Native", "TypeScript", "GraphQL", "Kafka", "AWS"],
    tools: ["QuickBooks Online", "Xero", "Stripe", "Mailchimp", "Zapier", "Google Calendar"],
    bg: "#e9ff9b", dark: false, accent: "#16a34a",
  }),
  proj({
    client: "Property Management Cloud",
    style: "AppFolio",
    url: "https://www.appfolio.com",
    live: true,
    category: "Property management SaaS",
    industry: "Real Estate",
    service: "Web & Mobile Apps",
    text: "A cloud platform for property managers covering accounting, leasing, maintenance, payments and resident communication.",
    about: "An end-to-end property management system for residential and commercial portfolios, with a resident portal and AI assistants for leasing and maintenance.",
    challenge: "Property managers ran rent collection, accounting, leasing and maintenance across spreadsheets and disconnected tools, creating manual work, slow responses and little visibility into portfolio performance.",
    solution: ["Property accounting and portfolio reporting", "Resident portal for rent payments and maintenance requests", "Maintenance workflows with vendor dispatch and instant payouts", "Leasing automation for lead follow-up and tour scheduling", "AI assistant for messages and everyday tasks", "Flexible rent payment options"],
    metrics: [["End-to-end", "accounting, leasing and maintenance"], ["24/7", "resident self-service portal"]],
    platforms: ["Web", "iOS", "Android"],
    tech: ["Ruby on Rails", "React", "Redux", "GraphQL", "React Native", "MySQL", "RabbitMQ", "AWS"],
    tools: ["Twilio", "SendGrid", "Datadog"],
    bg: "#cbfffd", dark: false, accent: "#0891b2",
  }),
  proj({
    client: "Shared Inbox Help Desk",
    style: "Help Scout",
    url: "https://www.helpscout.com",
    live: true,
    category: "Help desk & shared inbox",
    industry: "Customer Support",
    service: "Web & Mobile Apps",
    text: "A help desk built around a shared inbox, knowledge base and embeddable chat widget that still feels like personal email.",
    about: "A collaborative support tool for growing teams: shared inboxes with clear ownership, a self-service docs site and a website widget for help content and live chat.",
    challenge: "As the company grew, support email piled up in personal and shared accounts. Nobody knew who owned which conversation, replies were duplicated or missed, and customers could not help themselves.",
    solution: ["Shared inbox with assignment, notes and collision detection", "Self-service knowledge base", "Embeddable website widget for help articles and chat", "Native iOS and Android apps for on-the-go replies", "AI drafts and conversation summaries", "Public API and integrations"],
    metrics: [["Clear", "ownership of every conversation"], ["Self-serve", "docs and in-app help widget"]],
    platforms: ["Web", "iOS", "Android"],
    tech: ["Java", "Kotlin", "Spring Boot", "JavaScript", "PHP"],
    tools: ["Slack", "HubSpot", "Shopify", "Salesforce"],
    bg: "#ffffff", dark: false, accent: "#1a69fd",
  }),
  proj({
    client: "Browser Telehealth",
    style: "Doxy.me",
    url: "https://doxy.me",
    live: true,
    category: "Telehealth platform",
    industry: "Healthcare",
    service: "Web & Mobile Apps",
    text: "A HIPAA-compliant telemedicine platform where patients join video visits from a browser, with no download.",
    about: "A simple, secure virtual care platform for clinicians of every size: branded virtual waiting rooms, browser-based video and add-ons for consent, payments and file sharing.",
    challenge: "Telemedicine tools were expensive, complicated and hard for patients to join, while consumer video apps did not meet HIPAA and GDPR requirements, which kept smaller practices from offering remote care.",
    solution: ["WebRTC video visits with no patient download", "Virtual waiting room with check-in and queue management", "Custom clinic branding and provider-to-provider transfer", "Add-ons for teleconsent, screen share, file transfer and payments", "HIPAA, GDPR and HITECH compliance built in", "Data-lean design that avoids storing patient health information"],
    metrics: [["No app", "patients join from any browser"], ["HIPAA", "compliant by design"]],
    platforms: ["Web"],
    tech: ["WebRTC", "TypeScript", "Node.js", "NestJS", "React", "Next.js", "PostgreSQL", "AWS", "Kubernetes", "Terraform"],
    tools: ["Vonage", "Twilio", "Stripe", "Segment", "Datadog"],
    bg: "#341ad4", dark: true, accent: "#cbfffd",
  }),
  proj({
    client: "Trade Job Manager",
    style: "ServiceM8",
    url: "https://www.servicem8.com",
    live: true,
    category: "Job management for trades",
    industry: "Field Services",
    service: "Web & Mobile Apps",
    text: "A job management app for tradespeople: job cards, scheduling, staff tracking, quotes, invoices and payments.",
    about: "An iPhone-first platform for electricians, plumbers and other trades that digitises every job and syncs automatically with the accounting software.",
    challenge: "Trade businesses ran on paper job cards, phone calls and spreadsheets, causing scheduling mix-ups, lost notes, late invoices and double entry into accounting software.",
    solution: ["Digital job cards with notes, photos and forms", "Scheduling, dispatch and live staff tracking", "Client CRM with automated SMS and email", "Online bookings, quotes, invoices and card payments", "Two-way sync with Xero, QuickBooks and MYOB", "Add-on store and public developer API"],
    metrics: [["Paperless", "job cards from quote to invoice"], ["Auto-sync", "with accounting software"]],
    platforms: ["iOS", "Android", "Web", "Apple Watch"],
    tech: ["Swift", "Objective-C", "PHP", "Node.js", "JavaScript"],
    tools: ["Xero", "QuickBooks Online", "MYOB", "Stripe", "Mailchimp", "Zapier"],
    bg: "#fff09b", dark: false, accent: "#65a30d",
  }),
  proj({
    client: "Landlord Management App",
    style: "Innago",
    url: "https://innago.com",
    live: true,
    category: "Property management for landlords",
    industry: "Real Estate",
    service: "Web & Mobile Apps",
    text: "Free-to-landlord software to collect rent online, sign leases, screen tenants and track maintenance.",
    about: "A cloud platform for independent landlords with small to mid-size portfolios, monetised through optional tenant-side services instead of monthly fees.",
    challenge: "Independent landlords managed rent, leases and maintenance with checks, paper and spreadsheets, because professional software and management companies were too expensive for small portfolios.",
    solution: ["Online rent collection with bank-account connections", "Digital lease creation and e-signatures", "Tenant screening with credit, criminal and eviction checks", "Maintenance request tracking and tenant messaging", "Landlord dashboard with automated reminders", "QuickBooks Online sync"],
    metrics: [["$0", "monthly fee for landlords"], ["Online", "rent, leases and screening"]],
    platforms: ["Web", "iOS", "Android"],
    tech: ["React", "Angular", "Node.js", "Express", "PostgreSQL", "MongoDB"],
    tools: ["Plaid", "QuickBooks Online", "TransUnion", "Experian"],
    bg: "#ffd372", dark: false, accent: "#b45309",
  }),
  proj({
    client: "Visual Inventory Tracker",
    style: "Sortly",
    url: "https://www.sortly.com",
    live: true,
    category: "Inventory & asset management",
    industry: "Inventory & Operations",
    service: "Web & Mobile Apps",
    text: "A mobile-first inventory app to track supplies, tools and equipment with photos, barcodes and QR codes.",
    about: "Simple, visual inventory management for small and mid-size businesses, working offline in the field and syncing across teams and locations.",
    challenge: "Teams tracked inventory and equipment in spreadsheets or on paper, which meant lost tools, stock-outs, slow physical counts and no real-time view across locations.",
    solution: ["Mobile app with offline mode and automatic cloud sync", "Barcode and QR scanning with label generation", "Photo-based items with custom fields and location folders", "Low-stock alerts and reorder notifications", "PDF and CSV reports for audits", "Integrations and a public API"],
    metrics: [["Offline", "scanning with auto-sync"], ["QR", "labels for every item"]],
    platforms: ["Web", "iOS", "Android"],
    tech: ["Ruby on Rails", "Kotlin", "React", "Redux", "Elasticsearch"],
    tools: ["QuickBooks Online", "Amazon Business", "Slack", "Microsoft Teams"],
    bg: "#e8f0ff", dark: false, accent: "#1a69fd",
  }),
  proj({
    client: "Construction Field Reporting",
    style: "Raken",
    url: "https://www.rakenapp.com",
    live: true,
    category: "Construction field management",
    industry: "Construction",
    service: "Web & Mobile Apps",
    text: "A field-first construction app for daily reports, time cards, production tracking and jobsite safety.",
    about: "A mobile and web platform used by superintendents and foremen to capture what happens on site every day, from photos and weather to crew hours and safety talks.",
    challenge: "Contractors documented field work on paper or in scattered tools, leaving reports late or incomplete and causing disputes, inaccurate payroll and job costing, and poor visibility into progress and safety.",
    solution: ["Daily reports with timestamped photos, video and automatic weather", "Time cards, crew clock-in and kiosk mode with break compliance", "Production, material and equipment tracking", "Toolbox talks, safety checklists and incident reporting", "Documents, RFIs and submittals", "Resource scheduling and certification tracking"],
    metrics: [["Daily", "reports straight from the jobsite"], ["Real-time", "crew hours and job costing"]],
    platforms: ["Web", "iOS", "Android"],
    tech: ["Java", "Spring", "React", "TypeScript", "SQL", "AWS"],
    tools: ["Procore", "Payroll & accounting integrations", "Cloud storage"],
    bg: "#f40027", dark: true, accent: "#ffd372",
  }),
  proj({
    client: "Salon & Spa Booking",
    style: "Vagaro",
    url: "https://www.vagaro.com",
    live: true,
    category: "Beauty & wellness business software",
    industry: "Beauty & Wellness",
    service: "Web & Mobile Apps",
    text: "Booking, payments and business software for salons, spas and fitness studios, with a consumer marketplace.",
    about: "An all-in-one platform for beauty, wellness and fitness businesses plus a marketplace app where consumers discover and book services.",
    challenge: "Independent salons and studios juggled separate tools for appointments, payments, client records and marketing, adding admin work, causing missed bookings and making it hard to reach new clients online.",
    solution: ["Online booking and calendar for appointments and classes", "Integrated payments and POS hardware", "Consumer marketplace and branded business apps", "Website builder, client forms and marketing tools", "Reporting on sales, rebooking and staff performance", "Pay-later options and HIPAA/PCI-compliant operations"],
    metrics: [["24/7", "online booking for clients"], ["All-in-one", "booking, POS and marketing"]],
    platforms: ["Web", "iOS", "Android"],
    tech: [".NET Core", "C#", "React", "Azure", "Cosmos DB", "SQL Server", "Redis", "Docker"],
    tools: ["Yelp booking", "Payment terminals", "Email & SMS marketing"],
    bg: "#ffe4ef", dark: false, accent: "#db2777",
  }),
  proj({
    client: "AI Hair Intelligence Platform",
    style: "MYAVANA",
    url: "https://www.myavana.com",
    live: true,
    category: "AI hair care & strand analysis platform",
    industry: "Beauty & Wellness",
    service: "AI Agents & Workflow Automation",
    text: "An AI-driven hair care platform delivering HairAI™ strand diagnostics, digital HairID™ profiles and salon CRM.",
    about: "A pioneering beauty tech ecosystem combining HairAI™ computer vision strand diagnostics, microscopic laboratory testing (HairSI™) and personalized hair health scoring for consumers, salons and enterprise cosmetic brands.",
    challenge: "Consumers suffer from trial-and-error product choices due to generic hair typing, while stylists and hair care brands lack data-driven diagnostics to prescribe precise hair health regimens.",
    solution: [
      "HairAI™ computer vision engine analyzing hair texture, curl pattern, density and strand health from photos",
      "Personalized HairID™ digital profiles providing customized ingredient, product and care recommendations",
      "Scientific lab integration (HairSI™) for microscopic porosity, elasticity and structural hair analysis",
      "C.A.R.E. OS framework (Consult, Analyze, Recommend, Educate) guiding user hair care journeys",
      "MYAVANA Pro+ app with digital HairScope hardware integration and salon CRM for professional stylists",
      "Enterprise Hair Intelligence API suite for retail partners, beauty brands and R&D teams"
    ],
    metrics: [["HairAI™", "computer vision strand diagnostics"], ["HairID™", "personalized digital hair blueprint"]],
    platforms: ["Web", "iOS", "Android"],
    tech: ["PyTorch", "OpenCV", "Python", "Next.js", "React Native", "PostgreSQL", "AWS Bedrock", "Docker"],
    tools: ["Shopify Plus", "Klaviyo", "Stripe", "Salesforce", "Segment"],
    bg: "#fff1f2", dark: false, accent: "#e11d48",
  }),
  proj({
    client: "Trasys AI",
    style: "Trasys AI",
    url: "https://www.trasys.dev",
    live: true, // our own product
    category: "AI / LLM observability",
    industry: "Developer Tools",
    service: "AI Reliability & Observability",
    text: "One place to trace LLM calls, track token spend, catch runaway agents and route incidents.",
    about: "An observability platform for teams running AI in production, combining distributed tracing, cost monitoring, log clustering and alerting across services and model providers.",
    challenge: "We built Trasys AI because teams shipping AI features, including our own, could not see token costs, agent loops, latency regressions or noisy logs across services and model providers, so incidents and overspend went unnoticed.",
    solution: ["LLM call tracing and token cost tracking", "Loop detection and spend safety limits", "Distributed tracing across services, databases and models", "Natural-language anomaly search and a query language", "Log pattern clustering to reduce alert noise", "Slack alerting and on-call escalation"],
    metrics: [["Real-time", "token cost visibility"], ["1 view", "traces, logs and incidents"]],
    platforms: ["Web"],
    tech: ["TypeScript", "Python", "Go", "PostgreSQL", "Redis", "Kubernetes", "Docker"], // ASSUMED: no public stack found
    tools: ["Slack", "AWS", "GCP", "Azure", "OpenAI", "Anthropic"],
    bg: "#191918", dark: true, accent: "#22d3ee",
  }),
  proj({
    client: "Zero-Commission Storefronts",
    style: "Thribute Stores",
    url: "https://thribute.com",
    live: true,
    category: "D2C storefront builder",
    industry: "Retail & Ecommerce",
    service: "Web & Mobile Apps",
    text: "An online store builder for independent labels and boutiques to sell direct, with payments and shipping built in.",
    about: "A D2C commerce platform that lets small brands launch a customisable storefront quickly and keep their margins, with Indian payment methods and courier partners integrated.",
    challenge: "Independent fashion labels and boutiques were losing margin to marketplace commissions, while setting up their own store, payments, GST compliance and delivery was complex and expensive.",
    solution: ["Customisable storefront templates", "0% commission selling with UPI, cards and cash on delivery", "Connected courier partners or bring-your-own delivery", "AI-generated product descriptions and SEO", "Inventory sync, discount codes, customer chat and analytics", "Fast, scheduled payouts to sellers"],
    metrics: [["0%", "commission for sellers"], ["Built-in", "payments and courier shipping"]],
    platforms: ["Web"],
    tech: ["Next.js", "React", "Node.js", "PostgreSQL"], // Next.js observed; rest ASSUMED
    tools: ["UPI payments", "Courier partner APIs", "AI copywriting"],
    bg: "#fefbdc", dark: false, accent: "#0f172a",
  }),
  proj({
    client: "Bus Operator Platform",
    style: "SafarWay",
    url: "https://safarway.in",
    live: true,
    category: "Bus fleet & ticketing SaaS",
    industry: "Travel",
    service: "Web & Mobile Apps",
    text: "A complete bus operator system: live fleet tracking, trip scheduling, QR ticketing and passenger apps under the operator's own brand.",
    about: "A platform that helps Indian bus operators go digital and compete with large booking aggregators, with separate admin, driver and passenger experiences.",
    challenge: "Independent bus operators relied on walk-in counters, phone bookings and aggregators that charged commissions and owned the customer relationship, with little visibility into where buses and drivers were.",
    solution: ["Fleet management with live bus tracking on maps", "Driver app for assignments and trip tasks", "Flexible trip scheduling: daily, fixed-date and recurring", "App and walk-in ticketing with online, cash or hybrid payments", "QR-code tickets by email with scan-to-board validation", "Passenger live tracking and branded operator domains"],
    metrics: [["QR", "tickets with scan-to-board validation"], ["Live", "bus tracking for operators and passengers"]],
    platforms: ["Web", "Driver app", "Passenger app"],
    tech: ["Next.js", "React", "Node.js", "Vercel", "Maps & GPS APIs"], // Next.js + Vercel observed on the site; rest ASSUMED
    tools: ["WhatsApp", "Payment gateway", "Email delivery"],
    bg: "#cbfffd", dark: false, accent: "#0d9488",
  }),
];

/* ---------------- Blog ---------------- */

export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  read: number;
  excerpt: string;
  tags?: string[];
  author?: { name: string; role?: string };
};

export const blogCategories = ["AI", "Engineering", "Design", "Cloud", "Business"];

export const posts: Post[] = [
  { slug: "agentic-ai-enterprise-playbook", title: "The Enterprise Playbook for Agentic AI in 2026", category: "AI", date: "2026-09-12", read: 9, excerpt: "How to move from chatbot pilots to agents that complete real work, safely and measurably.", tags: ["Agentic AI", "Enterprise", "LLM"] },
  { slug: "modernize-legacy-without-downtime", title: "How to Modernize a Legacy System Without Downtime", category: "Engineering", date: "2026-08-28", read: 7, excerpt: "A phased strangler-fig approach that keeps the business running while you rebuild.", tags: ["Legacy", "Architecture", "Refactoring"] },
  { slug: "design-systems-that-scale", title: "Design Systems That Actually Scale Across Teams", category: "Design", date: "2026-08-10", read: 6, excerpt: "Tokens, governance and the rituals that keep 20 squads shipping consistent UI.", tags: ["Design Systems", "UI/UX", "Governance"] },
  { slug: "cloud-cost-optimization-guide", title: "Cloud Cost Optimization: Cut 30% Without Cutting Corners", category: "Cloud", date: "2026-07-22", read: 8, excerpt: "Rightsizing, commitments and architecture changes that pay for themselves.", tags: ["Cloud", "AWS", "Cost Optimization"] },
  { slug: "app-development-cost-2026", title: "How Much Does It Cost to Build an App in 2026?", category: "Business", date: "2026-07-05", read: 10, excerpt: "A transparent breakdown by complexity, platform, team model and region.", tags: ["App Development", "Pricing", "Strategy"] },
  { slug: "rag-architecture-patterns", title: "7 RAG Architecture Patterns for Production", category: "AI", date: "2026-06-18", read: 11, excerpt: "From naive retrieval to agentic RAG: what works, what breaks and how to evaluate.", tags: ["RAG", "AI", "Vector DB"] },
];

/* ---------------- Careers ---------------- */

export type Job = {
  slug: string;
  title: string;
  team: string;
  location: string;
  type: string;
  exp: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  skills: string[];
};

export const jobs: Job[] = [
  {
    slug: "backend-engineer-golang",
    title: "Backend Engineer (Golang)",
    team: "Engineering",
    location: "Mohali, Punjab",
    type: "Full-time",
    exp: "3+ years",
    summary:
      "Design and build the high-performance services behind our SaaS platforms and Trasys AI, from APIs and data pipelines to real-time tracing and alerting at scale.",
    responsibilities: [
      "Design, build and own backend services and APIs in Go",
      "Model data and write efficient queries for PostgreSQL, Redis and other stores",
      "Build event-driven and concurrent systems (queues, workers, streaming)",
      "Instrument services with logging, metrics and tracing, and keep them fast and reliable",
      "Write tests, review code and help shape our backend architecture",
      "Work closely with frontend, mobile and AI engineers to ship features end to end",
    ],
    requirements: [
      "3+ years of professional backend development, with strong hands-on Go experience",
      "Solid understanding of REST/gRPC API design, concurrency and goroutines",
      "Experience with SQL databases (PostgreSQL or MySQL) and caching (Redis)",
      "Comfortable with Docker, CI/CD and deploying to a cloud provider (AWS, GCP or Azure)",
      "Good grasp of testing, debugging and performance profiling",
      "Clear communication in English and ownership of your work",
    ],
    niceToHave: [
      "Kubernetes and infrastructure-as-code (Terraform)",
      "Experience with observability tools (OpenTelemetry, Prometheus, Grafana)",
      "Message brokers such as Kafka, NATS or RabbitMQ",
      "Experience integrating LLM APIs or building AI-backed features",
    ],
    skills: ["Go", "PostgreSQL", "Redis", "gRPC", "REST", "Docker", "Kubernetes", "AWS"],
  },
  {
    slug: "motion-graphics-designer",
    title: "Motion Graphics Designer",
    team: "Design",
    location: "Mohali, Punjab",
    type: "Full-time",
    exp: "2+ years",
    summary:
      "Bring our products and brand to life with motion: product demos, UI animations, social content and launch videos for Konsilience, Trasys AI and our clients.",
    responsibilities: [
      "Create motion graphics for product demos, explainers, social media and ads",
      "Animate UI flows and micro-interactions for web and mobile products",
      "Produce launch and marketing videos, from storyboard to final export",
      "Build reusable motion templates and keep them on-brand",
      "Hand off Lottie / web-ready animations to engineers",
      "Collaborate with product designers, engineers and the founders on campaigns",
    ],
    requirements: [
      "2+ years of professional motion design experience",
      "Strong skills in Adobe After Effects and Premiere Pro",
      "Solid sense of timing, typography, composition and colour",
      "Experience with Figma and animating UI designs",
      "A portfolio or showreel of motion work",
      "Ability to take feedback and deliver to deadlines",
    ],
    niceToHave: [
      "Lottie / Bodymovin exports for web and apps",
      "3D tools such as Blender or Cinema 4D",
      "Rive or other interactive animation tools",
      "Experience with SaaS or tech product marketing",
    ],
    skills: ["After Effects", "Premiere Pro", "Figma", "Lottie", "Illustrator", "Blender"],
  },
];

/* ---------------- Team ---------------- */

// Core team by role. Add names and photos when you want to show individuals.
export const team = [
  { role: "Product Strategy & Architecture", count: 3, icon: "target", text: "Strategy, architecture and delivery ownership on every project." },
  { role: "AI / ML Engineers", count: 2, icon: "spark", text: "LLM apps, agents, RAG pipelines and model evaluation." },
  { role: "Full-Stack Engineers", count: 3, icon: "code", text: "Next.js, Node, Rails and cloud-native backends." },
  { role: "Mobile Engineers", count: 2, icon: "phone", text: "iOS, Android and Flutter apps from MVP to scale." },
  { role: "Product Designer", count: 1, icon: "eye", text: "Research, UX flows, UI design and design systems." },
  { role: "QA & DevOps Engineer", count: 1, icon: "shield", text: "Test automation, CI/CD, monitoring and releases." },
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
      { title: "Agentic AI for Growing Businesses", text: "Adoption patterns, architectures and a practical ROI framework for your first agent.", meta: "PDF · Coming soon" },
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
      { title: "Konsilience launches Trasys AI", text: "Our AI observability platform for teams running LLMs and agents in production.", meta: "Sep 2026" },
      { title: "Konsilience moves into its new Mohali office", text: "A bigger home for our growing engineering, design and AI teams.", meta: "Jun 2026" },
      { title: "35+ projects done and counting", text: "A look back at the SaaS products, mobile apps and AI systems our team has shipped so far.", meta: "Mar 2026" },
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
      { title: "AI Copilots for Sales Teams", text: "Live demo and Q&A with our AI team.", meta: "Upcoming · Oct 2026" },
    ],
  },
];
