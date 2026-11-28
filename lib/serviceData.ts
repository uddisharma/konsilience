export type ServiceFaq = { q: string; a: string };

export type ServiceDetailData = {
  heroStats: [string, string][];
  offeringsDescriptions?: Record<string, string>;
  faqs: ServiceFaq[];
  deliverables?: { title: string; text: string }[];
};

export const serviceData: Record<string, ServiceDetailData> = {
  "saas-and-mvp-development": {
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
  "cloud-migration": {
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
  "seo-and-local-seo": {
    heroStats: [
      ["Top 3", "Target Keyword SERPs"],
      ["240%+", "Avg Organic Traffic Lift"],
      ["100%", "White-Hat Schema Architecture"],
      ["GEO Ready", "AI & Perplexity Ingestion"],
    ],
    deliverables: [
      { title: "Technical & Core Web Vitals Audits", text: "Deep crawl diagnosis covering indexation, crawl budget, JS hydration, and speed metrics." },
      { title: "Programmatic SEO Architecture", text: "Database-driven landing pages capturing thousands of long-tail high-intent queries." },
      { title: "Generative Engine Optimization (GEO)", text: "Optimizing content hierarchy and citations for ChatGPT, Perplexity, and Google AI Overviews." },
      { title: "Editorial Backlink Building", text: "Authoritative, white-hat digital PR and high-domain citation acquisition." },
    ],
    faqs: [
      {
        q: "How soon can we expect organic search ranking improvements?",
        a: "Technical fixes and on-page optimizations typically show indexation and crawl uplifts in 4 to 8 weeks. Competitive keyword movements and substantial organic revenue growth compound predictably between months 3 and 6.",
      },
      {
        q: "How do you optimize websites for AI search engines like ChatGPT and Perplexity?",
        a: "We implement Generative Engine Optimization (GEO): structuring content with direct factual answer syntax, JSON-LD knowledge graphs, entity relationships, and authoritative citations that LLMs ingest reliably.",
      },
      {
        q: "Do you specialize in programmatic SEO for SaaS and marketplaces?",
        a: "Yes. We engineer dynamic page generation engines that produce thousands of indexed, fast-loading, unique comparison and localized landing pages without duplicate content penalties.",
      },
      {
        q: "What is your approach to backlink acquisition?",
        a: "We strictly adhere to white-hat editorial outreach, digital PR, proprietary research asset publication, and industry contributor placements. We never engage in PBNs or link farms.",
      },
    ],
  },
  "performance-marketing": {
    heroStats: [
      ["4.8x", "Average Client ROAS"],
      ["$25M+", "Ad Spend Engineered"],
      ["-38%", "CPA Reduction"],
      ["Omnichannel", "Google, Meta & LinkedIn"],
    ],
    deliverables: [
      { title: "Cross-Platform Campaign Architecture", text: "Segmented funnels across Google Search, Performance Max, YouTube, Meta, and LinkedIn." },
      { title: "High-Converting Creative Sprints", text: "Ad copy, motion graphics, and video variations continuously tested against benchmarks." },
      { title: "Server-Side Conversion Tracking", text: "First-party CAPI and server-side GA4 pipelines that bypass cookie loss and ad blockers." },
      { title: "Bid Automation & Budget Allocation", text: "Algorithmic bidding rules tuned for customer acquisition cost (CAC) and customer lifetime value (LTV)." },
    ],
    faqs: [
      {
        q: "Which ad networks do you specialize in managing?",
        a: "We manage Google Ads (Search, Performance Max, Display, YouTube), Meta Ads (Facebook & Instagram), LinkedIn B2B ABM campaigns, and specialized networks like TikTok and Reddit Ads.",
      },
      {
        q: "How do you solve conversion tracking degradation caused by iOS privacy updates?",
        a: "We implement server-side conversion tracking using Meta Conversions API (CAPI), Google Enhanced Conversions, and first-party data pipelines to ensure 98%+ attribution accuracy.",
      },
      {
        q: "What is your methodology for testing new creative assets?",
        a: "We deploy weekly creative sprints testing hook variations, visual styles, and copy angles using rapid multivariate cohorts to eliminate ad fatigue.",
      },
      {
        q: "Do we maintain direct ownership of our ad accounts and billing?",
        a: "Yes. You maintain 100% administrative ownership of all ad platforms, billing accounts, pixels, and historic conversion data at all times.",
      },
    ],
  },
};

