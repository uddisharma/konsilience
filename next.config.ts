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
