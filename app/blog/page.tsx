import type { Metadata } from "next";
import BlogCard from "@/components/page/BlogCard";
import BlogGrid from "@/components/page/BlogGrid";
import Newsletter from "@/components/page/Newsletter";
import PageHero from "@/components/page/PageHero";
import Reveal from "@/components/ui/Reveal";
import { blogCategories, posts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description: "Engineering, AI, design and business insights from the Konsilience team.",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;
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
          <Reveal>
            <BlogCard post={featured} large />
          </Reveal>
          <BlogGrid items={rest} categories={blogCategories} />
        </div>
      </section>
      <Newsletter />
    </>
  );
}
