import type { MetadataRoute } from "next";
import { routeGroups, siteUrl } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return routeGroups.flatMap((g) =>
    g.links.map((l) => ({
      url: `${siteUrl}${l.href === "/" ? "" : l.href}`,
      changeFrequency: g.title === "Resources" ? "weekly" : "monthly",
      priority: l.href === "/" ? 1 : l.href.split("/").length > 2 ? 0.6 : 0.8,
    })),
  );
}
