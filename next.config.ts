import type { NextConfig } from "next";

// HTTP 301: the brief asks for 301s (permanent: true would send 308).
const MOVED_PERMANENTLY = 301;

const nextConfig: NextConfig = {
  experimental: {
    // Cap build workers (default is one per CPU core). 11 parallel workers exhausted memory on a
    // 16 GB Windows machine during page generation ("Fatal process out of memory").
    cpus: 4,
  },

  // Every removed or renamed URL gets a 301 here (logged in docs/CHANGELOG.md).
  async redirects() {
    return [
      // Duplicate of /llms.txt under a non-standard name.
      { source: "/llm.txt", destination: "/llms.txt", statusCode: MOVED_PERMANENTLY },
      // Shorter slugs (2026-11-28): /trasys-ai → /trasys, /ai-solutions → /ai, /digital-marketing → /digital.
      { source: "/trasys-ai", destination: "/trasys", statusCode: MOVED_PERMANENTLY },
      { source: "/ai-solutions/:path*", destination: "/ai/:path*", statusCode: MOVED_PERMANENTLY },
      { source: "/digital-marketing", destination: "/digital", statusCode: MOVED_PERMANENTLY },
      // Service list reduced to 22 services under 5 main services (2026-11-28): each removed page goes to its
      // closest replacement, or to /services when there is none.
      { source: "/services/ui-ux-design", destination: "/services/web-and-mobile-apps", statusCode: MOVED_PERMANENTLY },
      { source: "/services/mobile-app-development", destination: "/services/web-and-mobile-apps", statusCode: MOVED_PERMANENTLY },
      { source: "/services/web-development", destination: "/services/web-and-mobile-apps", statusCode: MOVED_PERMANENTLY },
      { source: "/services/custom-software-development", destination: "/services/saas-and-mvp-development", statusCode: MOVED_PERMANENTLY },
      { source: "/services/qa-and-testing", destination: "/services/web-and-mobile-apps", statusCode: MOVED_PERMANENTLY },
      { source: "/services/devops", destination: "/services/managed-devops", statusCode: MOVED_PERMANENTLY },
      { source: "/services/product-management", destination: "/services/saas-and-mvp-development", statusCode: MOVED_PERMANENTLY },
      { source: "/services/search-engine-optimization", destination: "/services/seo-and-local-seo", statusCode: MOVED_PERMANENTLY },
      { source: "/services/performance-marketing-and-ppc", destination: "/services/performance-marketing", statusCode: MOVED_PERMANENTLY },
      { source: "/services/social-media-marketing", destination: "/services/content-and-social-media", statusCode: MOVED_PERMANENTLY },
      { source: "/services/content-marketing-and-copywriting", destination: "/services/content-and-social-media", statusCode: MOVED_PERMANENTLY },
      { source: "/services/conversion-rate-optimization", destination: "/services/website-and-seo-audit", statusCode: MOVED_PERMANENTLY },
      { source: "/services/email-marketing-and-automation", destination: "/services/ai-marketing-automation", statusCode: MOVED_PERMANENTLY },
      { source: "/services/cloud-services", destination: "/services/cloud-migration", statusCode: MOVED_PERMANENTLY },
      { source: "/services/blockchain-development", destination: "/services", statusCode: MOVED_PERMANENTLY },
      { source: "/services/cybersecurity", destination: "/services/application-security-audit", statusCode: MOVED_PERMANENTLY },
      { source: "/services/iot-development", destination: "/services", statusCode: MOVED_PERMANENTLY },
      { source: "/services/ar-vr-development", destination: "/services", statusCode: MOVED_PERMANENTLY },
      { source: "/services/it-consulting", destination: "/services", statusCode: MOVED_PERMANENTLY },
      { source: "/services/software-consulting", destination: "/services", statusCode: MOVED_PERMANENTLY },
      { source: "/services/fintech-consulting", destination: "/services", statusCode: MOVED_PERMANENTLY },
      { source: "/services/mobile-app-consulting", destination: "/services/web-and-mobile-apps", statusCode: MOVED_PERMANENTLY },
      { source: "/services/big-data", destination: "/services/backend-and-api-development", statusCode: MOVED_PERMANENTLY },
      { source: "/services/data-analytics", destination: "/services/backend-and-api-development", statusCode: MOVED_PERMANENTLY },
      { source: "/services/business-intelligence", destination: "/services/backend-and-api-development", statusCode: MOVED_PERMANENTLY },
      { source: "/services/managed-it-services", destination: "/services/managed-devops", statusCode: MOVED_PERMANENTLY },
      { source: "/services/dedicated-teams", destination: "/services", statusCode: MOVED_PERMANENTLY },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
