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
    category: "Helpdesk & ticketing SaaS",
    industry: "Customer Support",
    service: "Custom Software Development",
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
    category: "Legal practice management SaaS",
    industry: "Legal",
    service: "Custom Software Development",
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
    category: "HCM / HRMS platform",
    industry: "HR & Workforce",
    service: "Custom Software Development",
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
    category: "Field service management SaaS",
    industry: "Field Services",
    service: "Mobile App Development",
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
    category: "Property management SaaS",
    industry: "Real Estate",
    service: "Web Development",
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
    category: "Help desk & shared inbox",
    industry: "Customer Support",
    service: "Web Development",
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
    category: "Telehealth platform",
    industry: "Healthcare",
    service: "Web Development",
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
    category: "Job management for trades",
    industry: "Field Services",
    service: "Mobile App Development",
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
    category: "Property management for landlords",
    industry: "Real Estate",
    service: "Web Development",
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
    category: "Inventory & asset management",
    industry: "Inventory & Operations",
    service: "Mobile App Development",
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
    category: "Construction field management",
    industry: "Construction",
    service: "Mobile App Development",
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
    category: "Beauty & wellness business software",
    industry: "Beauty & Wellness",
    service: "Mobile App Development",
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
    client: "Trasys AI",
    style: "Trasys AI",
    url: "https://www.trasys.dev",
    live: true, // our own product
    category: "AI / LLM observability",
    industry: "Developer Tools",
    service: "DevOps",
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
    category: "D2C storefront builder",
    industry: "Retail & Ecommerce",
    service: "Web Development",
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
    category: "Bus fleet & ticketing SaaS",
    industry: "Travel",
    service: "Web Development",
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

// Core team by role (12 people). Add names and photos when you want to show individuals.
export const team = [
  { role: "Co-Founders", count: 3, icon: "target", text: "Strategy, architecture and delivery ownership on every project." },
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
      { title: "15 platforms and counting", text: "A look back at the SaaS products our team has shipped so far.", meta: "Mar 2026" },
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
