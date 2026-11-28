import { serviceCategories, serviceList } from "@/lib/catalog";
import { isSet, registeredOfficeLine, siteConfig as c } from "@/site.config";

// /llms.txt: plain-text site summary for AI crawlers and answer engines.
// Contact details come from site.config.ts. Claims in this text are reviewed in Phase 2.
export const dynamic = "force-static";

const o = c.office;
const u = c.siteUrl;
const phones = [c.contact.inPhone, c.contact.usPhone]
  .filter(isSet)
  .map((p) => `- Phone: ${p}`)
  .join("\n");

const services = serviceCategories
  .map((cat) => `### ${cat.name}\n${serviceList.filter((x) => x.category === cat.name).map((x) => `- [${x.name}](${u}/services/${x.slug}): ${x.short}`).join("\n")}`)
  .join("\n\n");

const body = `# Konsilience

> Konsilience is an AI-first digital engineering and product studio. We combine business strategy, human-centered UI/UX design, cloud architecture, and autonomous AI systems to build scalable software platforms, enterprise SaaS, mobile apps, and LLM observability solutions.

## Organization & Contact
- Website: ${c.siteUrl}
- Email: ${c.contact.salesEmail}
${phones}
- Team office: ${o.street}, ${o.city}, ${o.region} ${o.postalCode}, ${o.country}
- Registered office: ${registeredOfficeLine}
- Flagship Observability Product: ${c.trasys.name} (${c.trasys.siteUrl})

---

## Flagship Products
- [Trasys AI](${u}/trasys): Full-stack LLM observability, distributed tracing, token spend tracking, loop detection, and incident routing for production AI applications.

---

## Services
${services}

---

## AI & Autonomous Agent Solutions
- [Agentic AI Systems](${u}/ai/agentic-ai): Autonomous multi-agent workflows, tool-use execution, self-healing tasks, and human-in-the-loop validation frameworks.
- [Generative AI & RAG](${u}/ai/generative-ai): Enterprise search, retrieval-augmented generation (RAG) over proprietary knowledge bases, vector indexing, and embeddings.
- [AI Copilots](${u}/ai/ai-copilots): Embedded in-product intelligent assistants tailored to user workflows with real-time UI synchronization.
- [Computer Vision](${u}/ai/computer-vision): Image and video intelligence, quality inspection, OCR, and multimodal diagnostics.
- [Conversational AI](${u}/ai/conversational-ai): Sub-500ms voice bots, omnichannel WhatsApp and CRM chat assistants with warm human handoff.

---

## Industries Served
- [Healthcare](${u}/industries/healthcare): HIPAA-compliant telemedicine, EHR/EMR integrations, patient portals, and clinical imaging AI.
- [Finance & FinTech](${u}/industries/finance): PCI-DSS compliant core banking, lending software, payment gateways, and automated fraud detection.
- [Retail & Ecommerce](${u}/industries/retail-and-ecommerce): Headless commerce, omnichannel marketplaces, personalized recommendation engines, and inventory automation.
- [Logistics & Fleet](${u}/industries/logistics): Real-time telematics, route optimization algorithms, fleet tracking, and warehouse dispatch software.
- [Real Estate & PropTech](${u}/industries/real-estate): Property management SaaS, virtual tours, listing portals, and tenant screening systems.
- [Education & EdTech](${u}/industries/education): Scalable learning management systems (LMS), interactive virtual classrooms, and adaptive testing.
- [Field Services](${u}/industries/on-demand): Dispatching platforms, field crew mobile applications, job invoicing, and automated customer notifications.
- [Travel & Aviation](${u}/industries/travel): High-throughput booking engines, dynamic fare calculation, QR-code boarding systems, and itinerary management.

---

## Technical Insights & Research
- [The Enterprise Playbook for Agentic AI in 2026](${u}/blog/agentic-ai-enterprise-playbook): Best practices for moving from simple chat pilots to resilient autonomous agents.
- [Modernizing Legacy Systems Without Downtime](${u}/blog/modernize-legacy-without-downtime): Applying the strangler-fig pattern to replace legacy backends incrementally.
- [7 RAG Architecture Patterns for Production](${u}/blog/rag-architecture-patterns): In-depth comparison of hybrid retrieval, chunking strategies, and hallucination guardrails.
- [Design Systems That Scale](${u}/blog/design-systems-that-scale): Token architecture, accessibility standards, and governance for distributed engineering teams.
- [Cloud Cost Optimization Guide](${u}/blog/cloud-cost-optimization-guide): Proven techniques to reduce cloud and AI inference bills by 30% without sacrificing performance.

---

## Compliance & Governance
- Security Standards: ISO/IEC 27001, SOC 2 Type II, NIST, PCI DSS.
- Privacy Frameworks: GDPR, CCPA, HIPAA.
- AI Regulations: EU AI Act, ISO/IEC 42001 (Artificial Intelligence Management System).
- IP Ownership: 100% intellectual property, designs, and code repositories are transferred directly to the client.

---

## Key Site Endpoints
- Homepage: ${u}
- All Services: ${u}/services
- AI Solutions: ${u}/ai
- Portfolio & Case Studies: ${u}/portfolio
- Careers: ${u}/careers
- Frequently Asked Questions: ${u}/faq
- Contact & Free Quote: ${u}/contact
- XML Sitemap: ${u}/sitemap.xml
- Robots Policy: ${u}/robots.txt
`;

export function GET(): Response {
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
