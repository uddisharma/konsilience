import type { MetadataRoute } from "next";
import { routeGroups, siteUrl } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  return routeGroups.flatMap((g) =>
    g.links.map((l) => {
      const isHome = l.href === "/";
      const isMainCategory = !isHome && l.href.split("/").filter(Boolean).length === 1;

      let priority = 0.7;
      let changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" = "monthly";

      if (isHome) {
        priority = 1.0;
        changeFrequency = "weekly";
      } else if (isMainCategory) {
        priority = 0.9;
        changeFrequency = "weekly";
      } else if (l.href.startsWith("/services") || l.href.startsWith("/ai-solutions")) {
        priority = 0.85;
        changeFrequency = "weekly";
      } else if (l.href.startsWith("/blog") || l.href.startsWith("/resources")) {
        priority = 0.8;
        changeFrequency = "weekly";
      }

      return {
        url: `${siteUrl}${l.href === "/" ? "" : l.href}`,
        lastModified: currentDate,
        changeFrequency,
        priority,
      };
    })
  );
}
