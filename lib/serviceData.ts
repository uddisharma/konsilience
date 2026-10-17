export type ServiceFaq = { q: string; a: string };

export type ServiceDetailData = {
  heroStats: [string, string][];
  offeringsDescriptions?: Record<string, string>;
  faqs: ServiceFaq[];
  deliverables?: { title: string; text: string }[];
};

export const serviceData: Record<string, ServiceDetailData> = {
  "ui-ux-design": {
    heroStats: [
      ["Design System", "Token Architecture"],
      ["WCAG 2.2", "Accessibility Target"],
      ["2–4 wks", "Interactive Prototype"],
      ["100%", "Figma-to-Code Sync"],
    ],
    faqs: [
      {
        q: "What deliverables do we receive at the end of the design phase?",
        a: "You receive an interactive Figma prototype, a production-ready design token library (JSON/CSS), component documentation, and accessibility compliance audit sheets.",
      },
      {
        q: "How do your designers collaborate with our engineering team?",
        a: "We work directly with engineers through shared design tokens, Storybook component reviews, and Figma Dev Mode annotations to eliminate handoff friction.",
      },
      {
        q: "Do you conduct user research and usability testing?",
        a: "Yes. We run moderated user testing sessions, synthesize quantitative feedback via heatmaps, and test wireframes before high-fidelity visual design begins.",
      },
      {
        q: "How do you ensure accessibility for enterprise applications?",
        a: "We design against WCAG 2.2 AA standards, ensuring appropriate contrast ratios, keyboard navigation paths, screen reader labels, and touch targets.",
      },
    ],
  },
  "mobile-app-development": {
    heroStats: [
      ["Cross-Platform", "Flutter & React Native"],
      ["60 FPS", "Native Fluidity"],
      ["Offline-First", "Local Sync Engines"],
      ["App Store", "Guaranteed Approval"],
    ],
    faqs: [
      {
        q: "Should we build cross-platform or native apps for iOS and Android?",
        a: "For 90% of SaaS, commerce, and field operations platforms, Flutter or React Native delivers 60 FPS native performance while saving 40% on engineering budget. We recommend native Swift/Kotlin only for heavy 3D rendering or specialized Bluetooth peripheral hardware.",
      },
      {
        q: "How do you handle offline functionality in field conditions?",
        a: "We architect offline-first data persistence using SQLite or WatermelonDB with optimistic UI updates and background synchronization queues when connectivity resumes.",
      },
      {
        q: "Will you assist with Apple App Store and Google Play compliance?",
        a: "Yes. We manage certificates, provisioning profiles, privacy nutrition disclosures, review guidelines, and in-app purchase compliance through release approval.",
      },
      {
        q: "How do you automate mobile testing across multiple devices?",
        a: "We run automated Maestro and Appium test suites against device farms in our CI/CD pipelines to catch layout and OS version regressions automatically.",
      },
    ],
  },
  "web-development": {
    heroStats: [
      ["Next.js / SSR", "Sub-second TTFB"],
      ["100 Core Web", "Vitals Optimization"],
      ["Edge Caching", "Global Latency <50ms"],
      ["Enterprise", "TypeScript Rigour"],
    ],
    faqs: [
      {
        q: "Which web architecture do you recommend for SaaS platforms?",
        a: "We build modern enterprise platforms using Next.js, TypeScript, and server components paired with Edge caching. This delivers instant page transitions, search engine discoverability, and high operational security.",
      },
      {
        q: "How do you guarantee top Core Web Vitals scores?",
        a: "We enforce image optimization, automated font subsetting, code splitting, edge-side rendering, and performance budgets in CI/CD to maintain 95+ Lighthouse scores.",
      },
      {
        q: "Can you build high-throughput enterprise portals with complex permissions?",
        a: "Yes. We implement granular Role-Based Access Control (RBAC), multi-tenant data isolation, single sign-on (SAML/Okta), and comprehensive audit logging.",
      },
      {
        q: "How do you test and secure modern web applications?",
        a: "We combine Playwright end-to-end testing, automated unit tests, OWASP vulnerability scanning, and strict Content Security Policies (CSP).",
      },
    ],
  },
  "custom-software-development": {
    heroStats: [
      ["Bespoke Code", "Clean Architecture"],
      ["Zero Tech Debt", "Strict CI/CD Gates"],
      ["8–14 wks", "MVP Production Launch"],
      ["100%", "Complete IP Ownership"],
    ],
    faqs: [
      {
        q: "How do you structure bespoke software development projects?",
        a: "We work in agile two-week sprints with weekly working demos. We start with a technical discovery phase to define data models, API contracts, and non-functional requirements.",
      },
      {
        q: "Who owns the intellectual property and source code?",
        a: "You retain 100% ownership of all source code, architecture documentation, database schemas, and intellectual property upon delivery.",
      },
      {
        q: "How do you guarantee architectural scalability?",
        a: "We apply domain-driven design (DDD), asynchronous messaging with Kafka/RabbitMQ, and stateless container architectures capable of scaling horizontally.",
      },
      {
        q: "Can you work alongside our existing in-house developers?",
        a: "Yes. Our senior engineers frequently embed within client squads, pairing on complex features, establishing coding standards, and transferring domain knowledge.",
      },
    ],
  },
  devops: {
    heroStats: [
      ["99.99%", "Uptime SLA Target"],
      ["<15 min", "Zero-Downtime Deploys"],
      ["IaC", "Terraform & OpenTofu"],
      ["FinOps", "Automated Cost Controls"],
    ],
    faqs: [
      {
        q: "Which cloud providers and infrastructure tools do you specialize in?",
        a: "We manage infrastructure across AWS, GCP, and Azure using Terraform, Kubernetes (EKS/GKE), Docker, GitHub Actions, and ArgoCD for GitOps workflows.",
      },
      {
        q: "How do you achieve zero-downtime deployments?",
        a: "We implement blue/green and canary deployment patterns with automated health checks and instant rollback triggers if error rates spike.",
      },
      {
        q: "How do you set up production observability?",
        a: "We instrument distributed tracing, structured logging, and metric alerts using Datadog, Prometheus, Grafana, and OpenTelemetry to catch incidents before users notice.",
      },
      {
        q: "Can you help optimize our monthly cloud infrastructure bills?",
        a: "Yes. Through compute rightsizing, spot orchestration (Karpenter), ARM/Graviton migration, and storage lifecycle tiering, we consistently reduce cloud bills by 30% or more.",
      },
    ],
  },
  "qa-and-testing": {
    heroStats: [
      ["85%+", "Automated Test Coverage"],
      ["Playwright", "End-to-End Rigour"],
      ["Load Testing", "Up to 50k Concurrency"],
      ["Shift-Left", "CI/CD Quality Gates"],
    ],
    faqs: [
      {
        q: "What testing methodologies do you incorporate into delivery?",
        a: "We employ a shift-left testing strategy combining unit tests, contract testing for APIs, cross-browser Playwright automation, and automated security vulnerability checks in CI/CD.",
      },
      {
        q: "How do you conduct performance and load testing?",
        a: "We simulate realistic traffic spikes using k6 and JMeter, identifying database connection bottlenecks, memory leaks, and latency thresholds under sustained load.",
      },
      {
        q: "Do you perform manual exploratory testing?",
        a: "Yes. While routine regressions are automated, our senior QA specialists perform exploratory edge-case testing and user journey verifications before release cutoffs.",
      },
      {
        q: "Can you build test automation frameworks for our existing software?",
        a: "Yes. We design and hand over maintainable, modular test suites that your in-house engineering team can easily run and expand.",
      },
    ],
  },
  "product-management": {
    heroStats: [
      ["Data-Driven", "Product Roadmaps"],
      ["2-Week", "Discovery Sprints"],
      ["MoSCoW", "Backlog Prioritization"],
      ["KPI-Aligned", "Outcome Metrics"],
    ],
    faqs: [
      {
        q: "What role does an embedded product manager play on our project?",
        a: "Our PM leads user research, translates business objectives into clear user stories and acceptance criteria, prioritizes engineering backlogs, and ensures teams ship high-value features.",
      },
      {
        q: "How do you validate feature ideas before committing engineering budget?",
        a: "We run structured discovery sprints, create clickable prototypes, analyze competitor benchmarks, and interview target users to validate demand before writing production code.",
      },
      {
        q: "How do you measure product success after release?",
        a: "We instrument funnel analytics and cohort tracking using Amplitude or Mixpanel, tracking activation, retention, churn, and feature adoption against defined OKRs.",
      },
      {
        q: "Can you help founders prioritize an MVP scope?",
        a: "Yes. We help strip away non-essential features, focusing on the core problem that early adopters are willing to pay for, cutting time-to-market by half.",
      },
    ],
  },
  "legacy-modernization": {
    heroStats: [
      ["Zero Downtime", "Strangler Fig Pattern"],
      ["CDC", "Change Data Capture Sync"],
      ["Microservices", "Domain-Driven Design"],
      ["Cloud Native", "Elastic Auto-Scaling"],
    ],
    faqs: [
      {
        q: "How do you modernize legacy systems without risking business downtime?",
        a: "We employ the Strangler Fig pattern: deploying an API gateway in front of the monolith and carving out microservices incrementally while the legacy application remains fully operational.",
      },
      {
        q: "How do you prevent data corruption during the migration phase?",
        a: "We use Change Data Capture (CDC) via Kafka or AWS Kinesis to stream database changes asynchronously between old and new stores with sub-second synchronization.",
      },
      {
        q: "What if our legacy codebase has minimal documentation and no tests?",
        a: "We reverse-engineer business logic through traffic shadowing, log analysis, and automated contract testing before refactoring code paths.",
      },
      {
        q: "How long does a legacy modernization engagement typically take?",
        a: "Initial domain extraction typically ships within 8 to 12 weeks, followed by phased iterative migrations over 6 to 18 months depending on estate complexity.",
      },
    ],
  },
  "cloud-services": {
    heroStats: [
      ["Multi-Cloud", "AWS, GCP & Azure"],
      ["Well-Architected", "Framework Audits"],
      ["Zero Trust", "Identity Architecture"],
      ["30%+ Cost", "Reduction Guarantee"],
    ],
    faqs: [
      {
        q: "Which cloud provider is best suited for our application?",
        a: "We evaluate your workloads against cloud pricing, regional latency, compliance needs, and managed service ecosystems (AWS for depth, GCP for AI/data, Azure for enterprise Microsoft integration).",
      },
      {
        q: "How do you execute cloud migration without data loss?",
        a: "We use staged cutovers with continuous database replication, rehearsed dress rehearsals, and DNS cutovers with immediate fallback capabilities.",
      },
      {
        q: "What is your approach to serverless architectures?",
        a: "We leverage event-driven serverless architectures (AWS Lambda, Cloudflare Workers) for asynchronous processing, webhooks, and bursty workloads to reduce idle compute costs.",
      },
      {
        q: "Do you provide 24/7 cloud infrastructure management?",
        a: "Yes. We offer continuous monitoring, automated security vulnerability patching, backup verifications, and incident response SLAs.",
      },
    ],
  },
  cybersecurity: {
    heroStats: [
      ["SOC 2 & ISO", "Compliance Readiness"],
      ["OWASP Top 10", "Mitigation by Default"],
      ["Pen Testing", "Grey-Box & White-Box"],
      ["Zero-Trust", "Least Privilege IAM"],
    ],
    faqs: [
      {
        q: "What security testing services do you provide?",
        a: "We conduct web application and API penetration testing, cloud configuration reviews, threat modeling, dependency vulnerability analysis, and code security audits.",
      },
      {
        q: "How do you embed security into CI/CD pipelines (DevSecOps)?",
        a: "We integrate Static Application Security Testing (SAST), Dynamic Testing (DAST), container image scanning (Trivy), and secret leakage detection directly into automated build steps.",
      },
      {
        q: "Can you help our company prepare for SOC 2 Type II or ISO 27001 certification?",
        a: "Yes. We map technical controls, automate evidence collection, enforce encryption standards, and configure audit logging to streamline auditor approvals.",
      },
      {
        q: "How do you protect data at rest and in transit?",
        a: "All data in transit is encrypted using TLS 1.3 with strict cipher suites; data at rest uses AES-256 with KMS key rotation and role-based decryption policies.",
      },
    ],
  },
  "blockchain-development": {
    heroStats: [
      ["Smart Contracts", "Formal Verification"],
      ["EVM & Rust", "Ethereum & Polygon"],
      ["Gas Optimized", "Low-Fee Execution"],
      ["Audited", "Security Standards"],
    ],
    faqs: [
      {
        q: "Which blockchain networks do you build on?",
        a: "We develop smart contracts and decentralized protocols for Ethereum, Polygon, Arbitrum, Solana, and private enterprise networks like Hyperledger Besu.",
      },
      {
        q: "How do you prevent smart contract vulnerabilities?",
        a: "We write smart contracts using battle-tested OpenZeppelin libraries, execute fuzz testing with Foundry, and run static analysis with Slither and Mythril before third-party audits.",
      },
      {
        q: "Can you build custodial and non-custodial wallet integrations?",
        a: "Yes. We integrate Web3 wallets (MetaMask, WalletConnect) and implement social login via account abstraction (ERC-4337) to eliminate seed phrase friction for non-technical users.",
      },
      {
        q: "How do you handle off-chain data and indexing?",
        a: "We index blockchain transactions using custom subgraphs (The Graph) and ingest event streams into PostgreSQL for fast query performance in web interfaces.",
      },
    ],
  },
  "iot-development": {
    heroStats: [
      ["MQTT & CoAP", "Low-Power Protocols"],
      ["OTA Updates", "Secure Device Firmware"],
      ["Edge AI", "On-Device Inference"],
      ["Millions", "Concurrent Telemetry"],
    ],
    faqs: [
      {
        q: "Which hardware and IoT protocols do you support?",
        a: "We develop embedded firmware (C/C++, Zephyr RTOS) and cloud ingestion engines using MQTT, CoAP, BLE, LoRaWAN, AWS IoT Core, and Azure IoT Hub.",
      },
      {
        q: "How do you secure IoT devices against physical and network tampering?",
        a: "We enforce secure boot, hardware root-of-trust (TPM/secure elements), mutual TLS (mTLS) for all device-to-cloud communications, and cryptographic firmware signing.",
      },
      {
        q: "Can you handle high-frequency telemetry data at scale?",
        a: "Yes. We design ingestion pipelines using Apache Kafka and time-series databases (InfluxDB, TimescaleDB) capable of processing millions of sensor messages per second.",
      },
      {
        q: "How do Over-the-Air (OTA) firmware updates work?",
        a: "We build resilient dual-partition (A/B) OTA pipelines that automatically roll back to previous stable firmware if a new release fails health checks.",
      },
    ],
  },
  "ar-vr-development": {
    heroStats: [
      ["Unity & Unreal", "Real-Time 3D Engines"],
      ["WebXR", "Browser Immersive 3D"],
      ["Spatial Audio", "Haptic Integration"],
      ["Cross-Platform", "Meta Quest & VisionOS"],
    ],
    faqs: [
      {
        q: "Which headsets and platforms do you build AR/VR experiences for?",
        a: "We develop for Apple Vision Pro (visionOS), Meta Quest 3, mobile AR (ARKit, ARCore), and browser-based WebXR for zero-install 3D customer product configurators.",
      },
      {
        q: "What use cases are delivering the highest enterprise ROI today?",
        a: "Industrial virtual training simulations, medical visualization, interactive real estate walkthroughs, and e-commerce 3D product configurators with live AR placement.",
      },
      {
        q: "How do you maintain 90+ FPS performance in VR?",
        a: "We optimize 3D polygon counts, bake lighting where possible, utilize occlusion culling, and optimize shaders specifically for mobile chipsets to prevent motion sickness.",
      },
      {
        q: "Can 3D and AR experiences integrate with our existing backend inventory?",
        a: "Yes. We connect WebXR and 3D configurators to enterprise ERP, PIM, and Shopify APIs for dynamic pricing, real-time stock checks, and direct checkout.",
      },
    ],
  },
  "big-data": {
    heroStats: [
      ["Petabyte Scale", "Data Lakehouse"],
      ["Sub-Second", "Streaming Analytics"],
      ["dbt & Spark", "Reliable Data Pipelines"],
      ["Governance", "Automated Data Lineage"],
    ],
    faqs: [
      {
        q: "What modern data stack tools do you work with?",
        a: "We build and manage data architectures on Databricks, Snowflake, Apache Spark, Kafka, dbt, Apache Airflow, and BigQuery.",
      },
      {
        q: "What is the difference between a Data Lake and a Data Lakehouse?",
        a: "A Data Lakehouse combines the cost efficiency and scale of object storage (S3) with the ACID transactions, schema enforcement, and SQL querying capabilities of traditional data warehouses.",
      },
      {
        q: "How do you ensure data quality across complex ETL pipelines?",
        a: "We implement automated testing with dbt tests and Great Expectations, validating schema drift, null values, and distribution anomalies before data reaches dashboards.",
      },
      {
        q: "Can you help migrate our legacy data warehouse to Snowflake or Databricks?",
        a: "Yes. We convert legacy SQL stored procedures, map data types, automate historical backfills, and run dual-pipeline reconciliations to ensure 100% data parity.",
      },
    ],
  },
  "data-analytics": {
    heroStats: [
      ["Self-Service", "Semantic Layer Access"],
      ["Predictive AI", "Customer Churn Models"],
      ["Looker & Tableau", "Custom Visualizations"],
      ["Single Source", "Enterprise Truth"],
    ],
    faqs: [
      {
        q: "How do you help companies transition from reactive to predictive analytics?",
        a: "We unify fragmented transactional data into clean customer 360 models, then train machine learning models for churn prediction, lifetime value forecasting, and demand planning.",
      },
      {
        q: "What BI and dashboard tools do you build with?",
        a: "We design performant dashboards in Looker, Tableau, Metabase, and Power BI, or build bespoke embedded analytics dashboards directly inside your SaaS platform.",
      },
      {
        q: "How do you make analytics accessible to non-technical business users?",
        a: "We build unified semantic layers (using dbt Semantic Layer or Cube.js) so business users can query predefined metrics without writing raw SQL.",
      },
      {
        q: "How do you handle analytics compliance under GDPR and CCPA?",
        a: "We implement column-level masking, automated data pseudonymization, and retention policies to ensure sensitive customer PII is never exposed in analytics views.",
      },
    ],
  },
  "business-intelligence": {
    heroStats: [
      ["Real-Time", "Executive Dashboards"],
      ["100%", "Automated KPI Reporting"],
      ["Role-Based", "Granular Security"],
      ["Embedded BI", "White-Label Portals"],
    ],
    faqs: [
      {
        q: "How do you design effective executive dashboards?",
        a: "We follow the 5-second rule: an executive should understand top-level health (revenue, margins, active users, pipeline) in five seconds, with intuitive drill-downs for operational root cause analysis.",
      },
      {
        q: "Can we embed dashboards inside our customer-facing SaaS product?",
        a: "Yes. We engineer secure multi-tenant embedded analytics with row-level security so each client can only view their own organization's metrics.",
      },
      {
        q: "How do you automate manual spreadsheet reporting across departments?",
        a: "We build automated data pipelines that ingest numbers directly from your CRM, ERP, and payment processors, eliminating error-prone manual spreadsheets.",
      },
      {
        q: "What is your approach to dashboard performance optimization?",
        a: "We implement pre-aggregated summary tables, intelligent caching layers, and optimized indexing so complex multi-year queries load in under 2 seconds.",
      },
    ],
  },
  "managed-it-services": {
    heroStats: [
      ["24/7/365", "Monitoring & Response"],
      ["<15 min", "Critical Incident SLA"],
      ["Automated", "Patching & Backups"],
      ["Disaster", "Recovery Verification"],
    ],
    faqs: [
      {
        q: "What does your 24/7 Managed IT service include?",
        a: "We provide round-the-clock infrastructure monitoring, incident response, vulnerability patching, backup verifications, database maintenance, and security alert triage.",
      },
      {
        q: "What are your incident response SLAs?",
        a: "For Severity 1 (system down) incidents, our response time SLA is under 15 minutes with continuous status updates until resolution.",
      },
      {
        q: "How do you handle software patches and maintenance windows?",
        a: "Patches are thoroughly tested in staging environments first, then applied during scheduled low-traffic maintenance windows with rollback plans ready.",
      },
      {
        q: "Do you provide monthly reporting on system health and incidents?",
        a: "Yes. You receive a monthly operational report detailing uptime, SLA adherence, incident post-mortems, capacity forecasting, and security audit logs.",
      },
    ],
  },
  "dedicated-teams": {
    heroStats: [
      ["Top 3%", "Vetted Senior Engineers"],
      ["1–2 wks", "Rapid Team Onboarding"],
      ["Timezone", "Aligned Collaboration"],
      ["100%", "Dedicated Capacity"],
    ],
    faqs: [
      {
        q: "How does a dedicated engineering team differ from staff augmentation?",
        a: "A dedicated team functions as an autonomous agile unit—complete with technical leadership, QA, and product delivery practices—taking full ownership of engineering outcomes rather than just filling individual seats.",
      },
      {
        q: "How quickly can a dedicated team start on our codebase?",
        a: "A vetted, multidisciplinary pod can typically onboard, set up local environments, and begin completing sprint tasks within 1 to 2 weeks of signing.",
      },
      {
        q: "Can we interview and approve individual team members?",
        a: "Yes. You review senior candidate profiles and conduct technical interviews to ensure both technical excellence and cultural alignment.",
      },
      {
        q: "How do you handle team scaling if our needs change?",
        a: "We offer flexible scaling terms with 30-day notice periods, allowing you to ramp up specialists (e.g. adding a security engineer or mobile developer) as priorities shift.",
      },
    ],
  },
  "it-consulting": {
    heroStats: [
      ["Senior CTO", "Architecture Advisory"],
      ["Well-Architected", "Maturity Reviews"],
      ["Build vs Buy", "Objective Analysis"],
      ["Zero Vendor", "Lock-in Roadmaps"],
    ],
    faqs: [
      {
        q: "What does an IT strategy engagement look like?",
        a: "We conduct an architecture audit, interview key stakeholders, evaluate legacy bottlenecks, and deliver an actionable 12-month technology roadmap with prioritized investment milestones.",
      },
      {
        q: "Can you provide CTO-as-a-Service for growing companies?",
        a: "Yes. Our senior architects step in as fractional CTOs to guide hiring decisions, vendor evaluations, cloud architectures, and investor technical due diligence.",
      },
      {
        q: "How do you evaluate 'build vs buy' decisions?",
        a: "We model 3-year total cost of ownership (TCO), maintenance overhead, core competitive differentiation, and integration complexity to provide unbiased recommendations.",
      },
      {
        q: "Do you help with vendor and software procurement?",
        a: "Yes. We draft technical RFPs, benchmark vendor capabilities against enterprise security criteria, and negotiate service contracts.",
      },
    ],
  },
  "software-consulting": {
    heroStats: [
      ["Codebase Audit", "Static & Dynamic Analysis"],
      ["Architecture", "Refactoring Blueprints"],
      ["Velocity", "Bottleneck Diagnosis"],
      ["Delivery Rescue", "Turnaround Playbooks"],
    ],
    faqs: [
      {
        q: "What happens during a software architecture audit?",
        a: "We inspect your repository code quality, automated test coverage, database indexing, API design, security vulnerabilities, and deployment pipeline reliability, delivering a comprehensive remediation report.",
      },
      {
        q: "Can you assist with delivery rescue on struggling projects?",
        a: "Yes. We identify team blockers, refactor architectural debt, simplify over-engineered microservices, and restore dependable weekly shipping rhythms.",
      },
      {
        q: "How do you help engineering teams improve release velocity?",
        a: "We optimize CI/CD pipelines, eliminate manual testing bottlenecks with automated regression suites, and transition from long-lived feature branches to trunk-based development.",
      },
      {
        q: "Do you provide code reviews and engineering mentorship?",
        a: "Yes. Our senior engineers conduct thorough pull request reviews, pair program on complex algorithms, and establish internal engineering rubrics.",
      },
    ],
  },
  "fintech-consulting": {
    heroStats: [
      ["PCI-DSS Level 1", "Compliance Ready"],
      ["Stripe & Plaid", "Architecture Specialists"],
      ["ISO 20022", "Financial Messaging"],
      ["Sub-Second", "Fraud Scoring Engines"],
    ],
    faqs: [
      {
        q: "How do you navigate financial regulations and PCI-DSS compliance?",
        a: "We design tokenized payment architectures that keep raw credit card and banking credentials out of your application servers, dramatically reducing your PCI compliance scope.",
      },
      {
        q: "Which core banking and payment platforms do you integrate with?",
        a: "We integrate with Stripe, Adyen, Plaid, Mambu, Temenos, and open banking APIs across North America, Europe, and Asia.",
      },
      {
        q: "How do you architect real-time fraud detection systems?",
        a: "We combine rule-based decision trees with low-latency machine learning scoring pipelines that inspect device fingerprints, geolocation anomalies, and velocity limits in under 100 milliseconds.",
      },
      {
        q: "Can you help build multi-currency ledger and settlement engines?",
        a: "Yes. We implement double-entry immutable accounting ledgers with idempotency keys to ensure transaction integrity and automated reconciliation.",
      },
    ],
  },
  "mobile-app-consulting": {
    heroStats: [
      ["App Store", "ASO & Funnel Optimization"],
      ["Retention", "Cohort Analysis"],
      ["Monetization", "IAP & Subscription Strategy"],
      ["Cross-Platform", "Feasibility Studies"],
    ],
    faqs: [
      {
        q: "How do you evaluate whether an app concept is commercially viable?",
        a: "We conduct competitive market benchmarking, calculate estimated customer acquisition costs (CAC) vs lifetime value (LTV), and test prototype screens with target users before writing code.",
      },
      {
        q: "Which in-app subscription and monetization tools do you recommend?",
        a: "We specialize in RevenueCat and native StoreKit/Google Play Billing integrations, implementing paywalls, price A/B testing, and churn prevention campaigns.",
      },
      {
        q: "How do you diagnose and fix poor mobile app store ratings?",
        a: "We analyze crash reports (Crashlytics/Sentry), audit memory leaks, resolve sluggish launch times, and implement in-app review prompts triggered at high-delight moments.",
      },
      {
        q: "Can you help plan an App Store Optimization (ASO) strategy?",
        a: "Yes. We optimize title keywords, subtitle phrasing, visual screenshot storytelling, and localization to maximize organic store conversions.",
      },
    ],
  },
};
