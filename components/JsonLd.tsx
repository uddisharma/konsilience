import { brand } from "@/lib/content";
import { siteUrl } from "@/lib/routes";

export default function JsonLd() {
  const jsonLdData = {
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
          "height": "200"
        },
        "description": brand.tagline,
        "email": brand.email,
        "telephone": brand.phone,
        "foundingDate": String(brand.founded),
        "founders": brand.founders.map((f) => ({
          "@type": "Person",
          "name": f.name,
          "jobTitle": f.role
        })),
        "sameAs": [
          "https://www.linkedin.com/company/konsilience",
          "https://twitter.com/konsilience"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": brand.phone,
            "contactType": "sales",
            "email": brand.email,
            "availableLanguage": ["English"]
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": brand.name,
        "description": "AI-First Digital Engineering & Product Studio",
        "publisher": {
          "@id": `${siteUrl}/#organization`
        },
        "inLanguage": "en-US"
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
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Software Engineering & AI Development Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Custom SaaS Development",
                "description": "End-to-end full stack SaaS platform architecture and engineering."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Agentic AI & LLM Systems",
                "description": "Autonomous AI agent development, fine-tuning, RAG, and AI observability."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "CTO as a Service & Product Strategy",
                "description": "Senior technology roadmap planning, architecture audits, and CTO advisory."
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
