import type { Metadata } from "next";
import BlogCard from "@/components/page/BlogCard";
import BlogGrid from "@/components/page/BlogGrid";
import Newsletter from "@/components/page/Newsletter";
import PageHero from "@/components/page/PageHero";
import Reveal from "@/components/ui/Reveal";
import { blogCategories } from "@/lib/catalog";
import { siteUrl } from "@/lib/routes";
import { konsiliencePosts, toCard } from "@/lib/server/blogSource";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog & Insights | Konsilience Engineering & AI",
  description: "Engineering, AI, design and business insights from the Konsilience team.",
  alternates: { canonical: `${siteUrl}/blog` },
};

export default async function BlogPage() {
  const cards = (await konsiliencePosts()).filter((p) => !p.seo.noindex).map(toCard);
  const [featured, ...rest] = cards;
  const categories = [...new Set([...blogCategories, ...cards.map((c) => c.category)])].filter((c) => cards.some((p) => p.category === c));
  return (
    <>
      <PageHero
        crumbs={[{ label: "Blog" }]}
        eyebrow="Insights"
        title={["Ideas That", <span key="b" className="text-primary">Build Products</span>]}
        text="Playbooks, deep dives and lessons learned from our engineers, designers and AI specialists."
      />
      <section className="sec bg-black pt-0">
        <div className="wrap flex flex-col gap-16">
          {featured && (
            <Reveal>
              <BlogCard post={featured} large />
            </Reveal>
          )}
          <BlogGrid items={rest} categories={categories} />
        </div>
      </section>
      <Newsletter />
    </>
  );
}
