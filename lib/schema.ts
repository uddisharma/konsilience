import { brand, office } from "@/lib/content";
import { siteUrl } from "@/lib/routes";
import type { Industry, Job, Post, Project, Service } from "@/lib/catalog";

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Helper to build a standard Schema.org BreadcrumbList
 */
export function buildBreadcrumbSchema(crumbs: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.item,
    })),
  };
}

/**
 * Helper to build a Schema.org FAQPage block
 */
export function buildFaqSchema(faqs: FaqItem[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a,
      },
    })),
  };
}

/**
 * Global Schema: Organization, WebSite, and core ProfessionalService
 */
export function getGlobalSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": brand.name,
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logo-white.png`,
          "width": "200",
          "height": "200",
        },
        "description": brand.tagline,
        "email": brand.email,
        "telephone": brand.phone,
        "foundingDate": String(brand.founded),
        "sameAs": [
          "https://www.linkedin.com/company/konsilience",
          "https://twitter.com/konsilience",
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Industrial Area, Sector 75, Sahibzada Ajit Singh Nagar",
          "addressLocality": office.city,
          "addressRegion": "Punjab",
          "postalCode": "160071",
          "addressCountry": office.code,
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": brand.phone,
            "contactType": "sales",
            "email": brand.email,
            "availableLanguage": ["English", "Hindi", "Punjabi"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": brand.name,
        "description": "AI-First Digital Engineering & Product Studio",
        "publisher": {
          "@id": `${siteUrl}/#organization`,
        },
        "inLanguage": "en-US",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        "name": `${brand.name} Digital Engineering & AI Studio`,
        "url": siteUrl,
        "priceRange": "$$$$",
        "telephone": brand.phone,
        "email": brand.email,
        "image": `${siteUrl}/logo-white.png`,
        "areaServed": "Global",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Industrial Area, Sector 75, Sahibzada Ajit Singh Nagar",
          "addressLocality": office.city,
          "addressRegion": "Punjab",
          "postalCode": "160071",
          "addressCountry": office.code,
        },
      },
    ],
  };
}

/**
 * Service Page Schema: Service entity + Breadcrumbs + FAQs
 */
export function buildServicePageSchema(
  service: Service,
  faqs?: FaqItem[],
  customOfferingsDescriptions?: Record<string, string>
) {
  const pageUrl = `${siteUrl}/services/${service.slug}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      "name": `${service.name} Services`,
      "serviceType": service.name,
      "description": service.short,
      "provider": { "@id": `${siteUrl}/#organization` },
      "category": service.category,
      "areaServed": "Global",
      "url": pageUrl,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${service.name} Capabilities`,
        "itemListElement": service.offerings.map((o) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": o,
            "description":
              customOfferingsDescriptions?.[o] ??
              `Enterprise ${o.toLowerCase()} delivery by ${brand.name} senior engineering teams.`,
          },
        })),
      },
    },
    buildBreadcrumbSchema([
      { name: "Home", item: siteUrl },
      { name: "Services", item: `${siteUrl}/services` },
      { name: service.name, item: pageUrl },
    ]),
  ];

  if (faqs && faqs.length > 0) {
    const faqBlock = buildFaqSchema(faqs);
    if (faqBlock) graph.push(faqBlock);
  }

  return graph;
}

/**
 * Services Index Schema
 */
export function buildServicesIndexSchema(services: Service[]) {
  const pageUrl = `${siteUrl}/services`;
  return [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      "url": pageUrl,
      "name": "Software & AI Engineering Services",
      "description":
        "Full-cycle product engineering, cloud modernization, custom SaaS, and agentic AI systems.",
      "provider": { "@id": `${siteUrl}/#organization` },
      "hasPart": services.map((s) => ({
        "@type": "Service",
        "name": s.name,
        "url": `${siteUrl}/services/${s.slug}`,
        "description": s.short,
      })),
    },
    buildBreadcrumbSchema([
      { name: "Home", item: siteUrl },
      { name: "Services", item: pageUrl },
    ]),
  ];
}

/**
 * AI Solutions Schema
 */
export function buildAiSolutionPageSchema(
  ai: { slug: string; name: string; short: string; useCases: string[] },
  faqs?: FaqItem[]
) {
  const pageUrl = `${siteUrl}/ai-solutions/${ai.slug}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      "name": `${ai.name} Solutions & Engineering`,
      "serviceType": ai.name,
      "description": ai.short,
      "provider": { "@id": `${siteUrl}/#organization` },
      "areaServed": "Global",
      "url": pageUrl,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${ai.name} Use Cases`,
        "itemListElement": ai.useCases.map((uc) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": uc,
          },
        })),
      },
    },
    buildBreadcrumbSchema([
      { name: "Home", item: siteUrl },
      { name: "AI Solutions", item: `${siteUrl}/ai-solutions` },
      { name: ai.name, item: pageUrl },
    ]),
  ];

  if (faqs && faqs.length > 0) {
    const faqBlock = buildFaqSchema(faqs);
    if (faqBlock) graph.push(faqBlock);
  }

  return graph;
}

/**
 * Industry Page Schema
 */
export function buildIndustryPageSchema(
  industry: Industry,
  faqs?: FaqItem[],
  customSolutionsDescriptions?: Record<string, string>
) {
  const pageUrl = `${siteUrl}/industries/${industry.slug}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      "name": `${industry.name} Software & AI Engineering`,
      "serviceType": `${industry.name} Technology Solutions`,
      "description": industry.short,
      "provider": { "@id": `${siteUrl}/#organization` },
      "areaServed": "Global",
      "url": pageUrl,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${industry.name} Industry Solutions`,
        "itemListElement": industry.solutions.map((s) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": s,
            "description":
              customSolutionsDescriptions?.[s] ??
              `Tailored ${s.toLowerCase()} engineered for ${industry.name} workflows.`,
          },
        })),
      },
    },
    buildBreadcrumbSchema([
      { name: "Home", item: siteUrl },
      { name: "Industries", item: `${siteUrl}/industries` },
      { name: industry.name, item: pageUrl },
    ]),
  ];

  if (faqs && faqs.length > 0) {
    const faqBlock = buildFaqSchema(faqs);
    if (faqBlock) graph.push(faqBlock);
  }

  return graph;
}

/**
 * Blog Posting Schema
 */
export function buildBlogArticleSchema(post: Post) {
  const pageUrl = `${siteUrl}/blog/${post.slug}`;
  const authorName = post.author?.name ?? `${brand.name} Engineering Team`;
  const imageUrl = `${siteUrl}/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.excerpt)}`;

  return [
    {
      "@type": "BlogPosting",
      "@id": `${pageUrl}#article`,
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": `${post.date}T09:00:00+05:30`,
      "dateModified": `${post.date}T09:00:00+05:30`,
      "inLanguage": "en-US",
      "url": pageUrl,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": pageUrl,
      },
      "author": {
        "@type": "Person",
        "name": authorName,
      },
      "publisher": {
        "@id": `${siteUrl}/#organization`,
      },
      "image": {
        "@type": "ImageObject",
        "url": imageUrl,
        "width": "1200",
        "height": "630",
      },
      "articleSection": post.category,
      "keywords": post.tags ? post.tags.join(", ") : post.category,
    },
    buildBreadcrumbSchema([
      { name: "Home", item: siteUrl },
      { name: "Blog", item: `${siteUrl}/blog` },
      { name: post.title, item: pageUrl },
    ]),
  ];
}

/**
 * Job Posting Schema (Google for Jobs)
 */
export function buildJobPostingSchema(job: Job) {
  const pageUrl = `${siteUrl}/careers/${job.slug}`;

  return [
    {
      "@type": "JobPosting",
      "@id": `${pageUrl}#job`,
      "title": job.title,
      "description": `${job.summary}

Responsibilities:
${job.responsibilities.map((r) => `• ${r}`).join("\n")}

Requirements:
${job.requirements.map((r) => `• ${r}`).join("\n")}

Nice to have:
${job.niceToHave.map((n) => `• ${n}`).join("\n")}`,
      "datePosted": "2026-01-01T00:00:00+05:30",
      "validThrough": "2027-12-31T23:59:59+05:30",
      "employmentType": job.type.toLowerCase().includes("full") ? "FULL_TIME" : "CONTRACTOR",
      "hiringOrganization": {
        "@type": "Organization",
        "name": brand.name,
        "sameAs": siteUrl,
        "logo": `${siteUrl}/logo-white.png`,
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Industrial Area, Sector 75, Sahibzada Ajit Singh Nagar",
          "addressLocality": "Mohali",
          "addressRegion": "Punjab",
          "postalCode": "160071",
          "addressCountry": "IN",
        },
      },
      "occupationalCategory": job.team,
      "experienceRequirements": job.exp,
      "skills": job.skills.join(", "),
      "directApply": true,
      "url": pageUrl,
    },
    buildBreadcrumbSchema([
      { name: "Home", item: siteUrl },
      { name: "Careers", item: `${siteUrl}/careers` },
      { name: job.title, item: pageUrl },
    ]),
  ];
}

/**
 * Portfolio / Case Study Schema
 */
export function buildCaseStudySchema(project: Project) {
  const pageUrl = `${siteUrl}/portfolio/${project.slug}`;

  return [
    {
      "@type": "CreativeWork",
      "@id": `${pageUrl}#casestudy`,
      "name": `${project.client} Case Study`,
      "headline": `${project.client} | ${project.category}`,
      "description": project.text,
      "abstract": project.about,
      "author": { "@id": `${siteUrl}/#organization` },
      "creator": { "@id": `${siteUrl}/#organization` },
      "publisher": { "@id": `${siteUrl}/#organization` },
      "inLanguage": "en-US",
      "url": pageUrl,
      "keywords": [...project.platforms, ...project.tech, project.industry].join(", "),
    },
    buildBreadcrumbSchema([
      { name: "Home", item: siteUrl },
      { name: "Portfolio", item: `${siteUrl}/portfolio` },
      { name: project.client, item: pageUrl },
    ]),
  ];
}

/**
 * FAQ Page Schema
 */
export function buildFaqPageSchema(groups: { title: string; items: FaqItem[] }[]) {
  const pageUrl = `${siteUrl}/faq`;
  const allFaqs = groups.flatMap((g) => g.items);
  const faqBlock = buildFaqSchema(allFaqs);
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", item: siteUrl },
    { name: "FAQ", item: pageUrl },
  ]);

  const graph: Record<string, unknown>[] = [breadcrumb];
  if (faqBlock) graph.unshift(faqBlock);
  return graph;
}

/**
 * Contact Page Schema
 */
export function buildContactPageSchema() {
  const pageUrl = `${siteUrl}/contact`;

  return [
    {
      "@type": "ContactPage",
      "@id": `${pageUrl}#contactpage`,
      "url": pageUrl,
      "name": `Contact ${brand.name}`,
      "description": `Get in touch with ${brand.name} to discuss digital engineering, custom AI, or SaaS projects.`,
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": brand.name,
        "url": siteUrl,
        "email": brand.email,
        "telephone": brand.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Industrial Area, Sector 75, Sahibzada Ajit Singh Nagar",
          "addressLocality": office.city,
          "addressRegion": "Punjab",
          "postalCode": "160071",
          "addressCountry": office.code,
        },
        "openingHours": "Mo-Fr 09:30-18:30",
      },
    },
    buildBreadcrumbSchema([
      { name: "Home", item: siteUrl },
      { name: "Contact", item: pageUrl },
    ]),
  ];
}

/**
 * Location Page Schema
 */
export function buildLocationPageSchema(
  loc: { name: string; slug: string; country: string; h1: string; metaDescription: string },
  faqs: FaqItem[]
) {
  const pageUrl = `${siteUrl}/locations/${loc.slug}`;

  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", item: siteUrl },
    { name: "Locations", item: `${siteUrl}/locations` },
    { name: loc.name, item: pageUrl },
  ]);

  const serviceSchema = {
    "@type": "ProfessionalService",
    "@id": `${pageUrl}#service`,
    "name": `${loc.h1} | ${brand.name}`,
    "url": pageUrl,
    "description": loc.metaDescription,
    "provider": {
      "@type": "Organization",
      "name": brand.name,
      "url": siteUrl,
      "logo": `${siteUrl}/logo-white.png`,
    },
    "areaServed": {
      "@type": "Country",
      "name": loc.country,
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Digital Engineering & Software Services in ${loc.name}`,
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile App Development (iOS & Android)" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Software Development" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Enterprise Web & SaaS Engineering" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Solutions & Copilots" } },
      ],
    },
  };

  const faqBlock = buildFaqSchema(faqs);
  const graph: Record<string, unknown>[] = [serviceSchema, breadcrumb];
  if (faqBlock) graph.push(faqBlock);
  return graph;
}
