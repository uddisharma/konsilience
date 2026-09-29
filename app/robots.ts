import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/routes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thank-you", "/api/*", "/_next/*"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/thank-you", "/api/*"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
