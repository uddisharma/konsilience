import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/routes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thank-you", "/admin", "/api/*", "/_next/*"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/thank-you", "/admin", "/api/*"],
      },
      // LLM Crawlers & AI Search Agents
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/thank-you", "/admin", "/api/*"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/thank-you", "/admin", "/api/*"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/thank-you", "/admin", "/api/*"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/thank-you", "/admin", "/api/*"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/thank-you", "/admin", "/api/*"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/thank-you", "/admin", "/api/*"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: ["/thank-you", "/admin", "/api/*"],
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: ["/thank-you", "/admin", "/api/*"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
