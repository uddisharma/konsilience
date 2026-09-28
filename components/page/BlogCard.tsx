import Link from "next/link";
import type { posts } from "@/lib/catalog";
import { SceneArt } from "../ui/Artwork";

type Post = (typeof posts)[number];

export const categoryArt: Record<string, { hue: number; icon: string }> = {
  AI: { hue: 225, icon: "spark" },
  Engineering: { hue: 190, icon: "code" },
  Design: { hue: 290, icon: "eye" },
  Cloud: { hue: 205, icon: "cloud" },
  Business: { hue: 35, icon: "chart" },
};

export const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function BlogCard({ post, large = false }: { post: Post; large?: boolean }) {
  const art = categoryArt[post.category] ?? categoryArt.AI;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group grid h-full overflow-hidden rounded-3xl border border-line bg-card transition-colors hover:border-primary ${large ? "lg:grid-cols-[1.2fr_1fr]" : ""}`}
    >
      <div className="overflow-hidden">
        <SceneArt hue={art.hue} icon={art.icon} className={`${large ? "aspect-[16/10] lg:h-full" : "aspect-[16/10]"} transition-transform duration-700 group-hover:scale-105`} />
      </div>
      <div className={`flex flex-col gap-4 p-7 ${large ? "justify-center lg:p-12" : ""}`}>
        <div className="flex items-center gap-3 text-xs font-semibold text-muted">
          <span className="rounded-full bg-primary px-3 py-1 text-white">{post.category}</span>
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.read} min read</span>
        </div>
        <h3 className={`${large ? "h3" : "subtitle"} font-semibold transition-colors group-hover:text-primary`}>{post.title}</h3>
        <p className="fs-para font-medium text-muted">{post.excerpt}</p>
        <span className="u-link mt-auto w-fit pt-2 text-sm font-semibold">Read article →</span>
      </div>
    </Link>
  );
}
