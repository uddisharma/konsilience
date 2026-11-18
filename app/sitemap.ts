import type { MetadataRoute } from "next";
import { routeGroups, siteUrl } from "@/lib/routes";
import { CONTENT_UPDATED } from "@/site.config";
import { publicPosts } from "@/lib/server/posts";

// Priority hints for crawlers. Google largely ignores them, but they document intent.
const PRIORITY_HOME = 1.0;
const PRIORITY_CATEGORY = 0.9;
const PRIORITY_SERVICE = 0.85;
const PRIORITY_CONTENT = 0.8;
const PRIORITY_DEFAULT = 0.7;

// Country hub paths start with one of these codes, for example "/uk" or "/uk/seo-agency".
const COUNTRY_CODES: readonly string[] = ["ae", "ca", "us", "uk", "au", "sa", "de"];

type Rank = { readonly priority: number; readonly changeFrequency: "weekly" | "monthly" };

function rank(href: string): Rank {
  const segments = href.split("/").filter(Boolean);
  if (href === "/") return { priority: PRIORITY_HOME, changeFrequency: "weekly" };
  const isCategory = segments.length === 1 || href.startsWith("/locations") || COUNTRY_CODES.includes(segments[0] ?? "");
  if (isCategory) return { priority: PRIORITY_CATEGORY, changeFrequency: "weekly" };
  if (href.startsWith("/services") || href.startsWith("/ai-solutions")) return { priority: PRIORITY_SERVICE, changeFrequency: "weekly" };
  if (href.startsWith("/blog") || href.startsWith("/resources")) return { priority: PRIORITY_CONTENT, changeFrequency: "weekly" };
  return { priority: PRIORITY_DEFAULT, changeFrequency: "monthly" };
}

// <lastmod> is the real change date, never "now": a date that changes on every build tells Google
// nothing, so it stops trusting the field. Blog posts use their publish date; other pages use
// CONTENT_UPDATED (site.config.ts). Pages marked noindex are not listed here at all.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const contentDate = new Date(CONTENT_UPDATED);
  const pages = routeGroups.flatMap((g) =>
    g.links.map((l) => ({
      url: `${siteUrl}${l.href === "/" ? "" : l.href}`,
      lastModified: l.updated ? new Date(l.updated) : contentDate,
      ...rank(l.href),
    })),
  );
  // Posts published from the admin (built-in posts are already in routeGroups).
  const known = new Set(pages.map((p) => p.url));
  const adminPosts = (await publicPosts("konsilience"))
    .filter((p) => !p.seo.noindex && !p.seo.canonicalUrl)
    .map((p) => ({ url: `${siteUrl}/blog/${p.slug}`, lastModified: new Date(p.updatedAt), ...rank("/blog/x") }))
    .filter((p) => !known.has(p.url));
  return [...pages, ...adminPosts];
}
