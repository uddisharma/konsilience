import { emptyDesign, emptySeo, type PostInput, type Site } from "./schema";
import { siteConfigs } from "./sites";

/** A post being edited in the admin; `id` is set once it has been saved. */
export type Draft = PostInput & { id?: string; updatedAt?: string; updatedBy?: string };

/** An empty post for a site, with that site's default author, category and closing CTA. */
export function newDraft(site: Site): Draft {
  const cfg = siteConfigs[site];
  return {
    site,
    title: "",
    slug: "",
    excerpt: "",
    category: cfg.categories[0],
    tags: [],
    author: { ...cfg.defaultAuthor },
    status: "draft",
    publishedAt: null,
    readTime: 0,
    blocks: [],
    design: { ...emptyDesign(), ctaBand: { enabled: true, ...cfg.defaultCta } },
    seo: emptySeo(),
  };
}
