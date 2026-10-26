# Google Search Console Re-Indexing Guide & URL Priority List

This document lists all the pages that have received new or updated **Schema.org Structured Data** (JSON-LD) and should be submitted for re-indexing in **Google Search Console (GSC)** to claim rich snippets, FAQ accordions, breadcrumbs, and Google Jobs indexing.

---

## ⚡ Fastest Way to Re-Index Everything

Instead of manually inspecting 70+ URLs one-by-one:

1. **Submit or Ping Your XML Sitemap in GSC**:
   - Go to [Google Search Console](https://search.google.com/search-console).
   - In the left sidebar, click **Sitemaps**.
   - Enter your sitemap URL: `https://www.konsilience.tech/sitemap.xml`.
   - Click **Submit**. Google will crawl the entire URL tree and update its cached schemas across all pages within 24–72 hours.
2. **For High-Priority Pages (Services, Careers, High-Traffic Articles)**:
   - Use the **URL Inspection Tool** (top search bar in GSC).
   - Paste the URL and hit Enter.
   - Click **"Test Live URL"** to verify that Google detects the new schema (e.g., `Service`, `FAQPage`, `BreadcrumbList`, `JobPosting`).
   - Click **"Request Indexing"** to bump it to the front of Google's crawl queue.

---

## 🎯 High-Priority URLs to Request Indexing Manually

These pages offer the highest immediate SERP uplift (rich snippets, FAQ dropdowns in Google, and Google Jobs cards):

---

### 🚀 Immediate Action: Re-Rank Queue (Travel & Mobility Interlink Cluster)

Following the internal linking architecture overhaul, submit the following URLs via the **GSC URL Inspection Tool** first to trigger rapid recalculation of internal PageRank, fresh BreadcrumbList hierarchies, and semantic anchor associations:

| Priority | Page Title & URL | Updates Deployed | Target Queries to Re-Rank |
| :--- | :--- | :--- | :--- |
| **P0** | **Travel Software Hub**<br>`https://www.konsilience.tech/industries/travel` | • Tailored service grid (Web, Mobile, Cloud, IoT, Custom, DevOps)<br>• Direct bidirectional link to SafarWay case study<br>• New AI Capabilities section (Conversational & Agentic AI)<br>• Connected Sectors navigation (Aviation, Logistics)<br>• Promoted to global footer | *"travel software development"*, *"booking engine engineering"*, *"GDS integration amadeus sabre"*, *"travel tech solutions"* |
| **P0** | **Bus Operator Platform (SafarWay)**<br>`https://www.konsilience.tech/portfolio/bus-operator-platform` | • Added clickable `Industry: Travel` breadcrumb & metadata link<br>• Bottom exploration link to Travel Industry Hub<br>• Domain-specific CTA (`Talk to a Travel Expert`) | *"bus fleet management software"*, *"bus ticketing saas"*, *"QR bus ticketing app"*, *"fleet tracking system"* |
| **P0** | **Aviation Solutions**<br>`https://www.konsilience.tech/industries/aviation` | • Cross-linked directly to Travel and Logistics verticals<br>• Curated aviation engineering services and AI copilots<br>• Promoted to global footer | *"aviation software development"*, *"airline mobile app development"*, *"crew management software"*, *"MRO software"* |
| **P0** | **Logistics Solutions**<br>`https://www.konsilience.tech/industries/logistics` | • Reciprocal cross-links to Travel and Aviation<br>• VRP routing and IoT telematics service links | *"logistics platform engineering"*, *"fleet telematics software"*, *"route optimization development"* |
| **P1** | **Modernize Legacy Without Downtime**<br>`https://www.konsilience.tech/blog/modernize-legacy-without-downtime` | • New in-content contextual anchors to Bus Operator Platform and Travel solutions<br>• Relevant Verticals sidebar links to Travel & Booking engines | *"legacy system modernization"*, *"strangler fig pattern enterprise"*, *"modernize reservation system"* |
| **P1** | **Cloud Cost Optimization Guide**<br>`https://www.konsilience.tech/blog/cloud-cost-optimization-guide` | • New contextual link to Travel & Hospitality high-volume caching<br>• Cloud Services interlink and vertical sidebar | *"cloud cost optimization guide"*, *"finops engineering"*, *"high volume booking cloud autoscaling"* |
| **P1** | **Web Development Services**<br>`https://www.konsilience.tech/services/web-development` | • Reciprocal links from Travel Hub and Bus Operator Platform | *"custom web application development"*, *"booking portal engineering"*, *"high concurrency web platforms"* |
| **P1** | **Mobile App Development**<br>`https://www.konsilience.tech/services/mobile-app-development` | • Inbound links from Travel FAQs (offline itineraries) and SafarWay | *"enterprise mobile app development"*, *"passenger app development"*, *"offline itinerary app"* |
| **P1** | **Cloud Services**<br>`https://www.konsilience.tech/services/cloud-services` | • Inbound links from Travel caching FAQs and Cloud Cost blog | *"cloud architecture consulting"*, *"multi cloud engineering"*, *"zero latency travel search caching"* |
| **P1** | **Conversational AI Solutions**<br>`https://www.konsilience.tech/ai-solutions/conversational-ai` | • Clickable Travel & Hospitality chip link<br>• Linked from Travel AI capabilities grid and blog sidebar | *"enterprise conversational ai"*, *"ai travel booking assistant"*, *"voice bot customer support"* |

---

### 1. Core Pages (LocalBusiness, Organization & FAQ)
| Priority | Page Title | Canonical URL | Schema Implemented |
| :--- | :--- | :--- | :--- |
| **P0** | **FAQ Page** | `https://www.konsilience.tech/faq` | `FAQPage` (all 11 global FAQs), `BreadcrumbList` |
| **P0** | **Contact Us** | `https://www.konsilience.tech/contact` | `ContactPage`, `LocalBusiness` (Mohali address, tel, hours), `BreadcrumbList` |
| **P0** | **Homepage** | `https://www.konsilience.tech/` | `Organization`, `WebSite`, `ProfessionalService` |
| **P1** | **All Services** | `https://www.konsilience.tech/services` | `CollectionPage`, `Service` list, `BreadcrumbList` |

---

### 2. Service Pages (Service + BreadcrumbList + FAQPage)
*Each of these now has a full `Service` definition with an `OfferCatalog` and rich `FAQPage` schema:*

1. `https://www.konsilience.tech/services/custom-software-development`
2. `https://www.konsilience.tech/services/web-development`
3. `https://www.konsilience.tech/services/mobile-app-development`
4. `https://www.konsilience.tech/services/ui-ux-design`
5. `https://www.konsilience.tech/services/qa-and-testing`
6. `https://www.konsilience.tech/services/devops`
7. `https://www.konsilience.tech/services/cloud-services`
8. `https://www.konsilience.tech/services/product-management`
9. `https://www.konsilience.tech/services/legacy-modernization`
10. `https://www.konsilience.tech/services/cybersecurity`
11. `https://www.konsilience.tech/services/blockchain-development`
12. `https://www.konsilience.tech/services/iot-development`
13. `https://www.konsilience.tech/services/ar-vr-development`
14. `https://www.konsilience.tech/services/it-consulting`
15. `https://www.konsilience.tech/services/software-consulting`
16. `https://www.konsilience.tech/services/fintech-consulting`
17. `https://www.konsilience.tech/services/mobile-app-consulting`
18. `https://www.konsilience.tech/services/big-data`
19. `https://www.konsilience.tech/services/data-analytics`
20. `https://www.konsilience.tech/services/business-intelligence`
21. `https://www.konsilience.tech/services/managed-it-services`
22. `https://www.konsilience.tech/services/dedicated-teams`

---

### 3. AI Solutions (Service + BreadcrumbList + FAQPage)
*Includes architecture FAQs regarding token limits, latency, RAG safety, and guardrails:*

1. `https://www.konsilience.tech/ai-solutions/agentic-ai`
2. `https://www.konsilience.tech/ai-solutions/generative-ai`
3. `https://www.konsilience.tech/ai-solutions/ai-copilots`
4. `https://www.konsilience.tech/ai-solutions/computer-vision`
5. `https://www.konsilience.tech/ai-solutions/conversational-ai`

---

### 4. Careers / Open Roles (JobPosting for Google Jobs Widget)
*Directly eligible for the interactive **Google for Jobs** board:*

1. `https://www.konsilience.tech/careers/backend-engineer-golang`
2. `https://www.konsilience.tech/careers/motion-graphics-designer`

---

### 5. Blog Insights (BlogPosting / Article Schema)
*Essential for Google Discover feed and article timestamps:*

1. `https://www.konsilience.tech/blog/agentic-ai-enterprise-playbook`
2. `https://www.konsilience.tech/blog/modernize-legacy-without-downtime`
3. `https://www.konsilience.tech/blog/design-systems-that-scale`
4. `https://www.konsilience.tech/blog/cloud-cost-optimization-guide`
5. `https://www.konsilience.tech/blog/app-development-cost-2026`
6. `https://www.konsilience.tech/blog/rag-architecture-patterns`

---

### 6. Case Studies / Portfolio (CreativeWork + Breadcrumbs)
1. `https://www.konsilience.tech/portfolio/omnichannel-helpdesk`
2. `https://www.konsilience.tech/portfolio/legal-practice-suite`
3. `https://www.konsilience.tech/portfolio/enterprise-hrms`
4. `https://www.konsilience.tech/portfolio/field-service-platform`
5. `https://www.konsilience.tech/portfolio/property-management-cloud`
6. `https://www.konsilience.tech/portfolio/shared-inbox-help-desk`
7. `https://www.konsilience.tech/portfolio/browser-telehealth`
8. `https://www.konsilience.tech/portfolio/trade-job-manager`
9. `https://www.konsilience.tech/portfolio/landlord-management-app`
10. `https://www.konsilience.tech/portfolio/visual-inventory-tracker`
11. `https://www.konsilience.tech/portfolio/construction-field-reporting`
12. `https://www.konsilience.tech/portfolio/salon-and-spa-booking`
13. `https://www.konsilience.tech/portfolio/ai-hair-intelligence-platform`
14. `https://www.konsilience.tech/portfolio/trasys-ai`
15. `https://www.konsilience.tech/portfolio/zero-commission-storefronts`
16. `https://www.konsilience.tech/portfolio/bus-operator-platform`

---

### 7. Industry Pages (Industry Solutions + BreadcrumbList + FAQPage)
1. `https://www.konsilience.tech/industries/healthcare`
2. `https://www.konsilience.tech/industries/finance`
3. `https://www.konsilience.tech/industries/retail-and-ecommerce`
4. `https://www.konsilience.tech/industries/logistics`
5. `https://www.konsilience.tech/industries/education`
6. `https://www.konsilience.tech/industries/real-estate`
7. `https://www.konsilience.tech/industries/emobility`
8. `https://www.konsilience.tech/industries/wearables`
9. `https://www.konsilience.tech/industries/energy`
10. `https://www.konsilience.tech/industries/agriculture`
11. `https://www.konsilience.tech/industries/gaming`
12. `https://www.konsilience.tech/industries/ott-and-media`
13. `https://www.konsilience.tech/industries/on-demand`
14. `https://www.konsilience.tech/industries/food-delivery`
15. `https://www.konsilience.tech/industries/travel`
16. `https://www.konsilience.tech/industries/aviation`
17. `https://www.konsilience.tech/industries/telecom`
18. `https://www.konsilience.tech/industries/startups`

---

## 🛠️ Validation Testing Tools

Before requesting indexing, you can test live URLs with Google's official validators:

1. **Google Rich Results Test**:  
   [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)  
   *Use this to preview FAQ dropdowns, Breadcrumbs, and Job postings.*

2. **Schema.org Validator**:  
   [https://validator.schema.org](https://validator.schema.org)  
   *Use this to verify syntactical graph connections between Organization and Services.*

---

## 🤖 LLM & AI Crawler Validation (Technical Checklist)

In addition to Google Search Console, the site is now configured to pass LLM ingestion validation:

1. **`robots.txt` Permissions**:
   - `ChatGPT-User` → `Allow: /`
   - `PerplexityBot` → `Allow: /`
   - `ClaudeBot` & `anthropic-ai` → `Allow: /`
   - `Google-Extended` (Gemini) → `Allow: /`
   - `GPTBot`, `Applebot-Extended`, `cohere-ai` → `Allow: /`
   - Disallowed on private routes: `/thank-you`, `/api/*`, `/_next/*`
   - Validated at: `https://www.konsilience.tech/robots.txt`

2. **`llms.txt` Standard & `llm.txt`**:
   - Concise, Markdown-formatted machine-readable context file with all services, AI architectures, flagship products, case studies, and compliance mappings.
   - Available at both:
     - `https://www.konsilience.tech/llms.txt` (Official standard)
     - `https://www.konsilience.tech/llm.txt` (Validation fallback)

