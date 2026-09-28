import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogCard, { categoryArt, formatDate } from "@/components/page/BlogCard";
import { CtaBand, SectionHead } from "@/components/page/Blocks";
import Newsletter from "@/components/page/Newsletter";
import { SceneArt } from "@/components/ui/Artwork";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { leaders, posts } from "@/lib/catalog";

const find = (slug: string) => posts.find((p) => p.slug === slug);

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const p = find((await params).slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

// PLACEHOLDER BODY: replace with real article content (e.g. MDX or a headless CMS).
type Sec = { id: string; h: string; p?: string[]; list?: string[] };
const sections = (topic: string): Sec[] => [
  { id: "introduction", h: "Introduction", p: [`${topic} has moved from a nice-to-have to a board-level priority. Yet most teams still struggle to turn good intentions into shipped, measurable results.`, "In this article we share the approach our teams use with clients, what we've learned from dozens of engagements, and a practical checklist you can apply this quarter."] },
  { id: "why-it-matters", h: "Why it matters now", p: ["Expectations from users, regulators and investors have risen sharply. The organisations pulling ahead are the ones that treat this as an engineering discipline, not a one-off project.", "Done well, it reduces cost, accelerates delivery and opens entirely new revenue streams."] },
  { id: "framework", h: "A practical framework", list: ["Start with a measurable business outcome, not a technology.", "Map the current state honestly: systems, data, skills and constraints.", "Prototype the riskiest assumption first, in weeks rather than months.", "Build in security, compliance and observability from day one.", "Ship iteratively and measure against the outcome you defined."] },
  { id: "pitfalls", h: "Common pitfalls to avoid", p: ["The most common failure mode is starting too big. The second is treating launch as the finish line. Budget for iteration, and assign clear ownership for the system after go-live.", "Finally, don't underestimate change management: the best system fails if people don't adopt it."] },
  { id: "conclusion", h: "Conclusion", p: [`${topic} is a journey, not a switch. With a clear outcome, a small first step and a disciplined feedback loop, any team can make real progress in a single quarter.`] },
];

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = find((await params).slug);
  if (!post) notFound();

  const idx = posts.indexOf(post);
  const author = leaders[idx % leaders.length];
  const art = categoryArt[post.category];
  const body = sections(post.title.replace(/^(How to|The|\d+)\s/i, ""));
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const url = encodeURIComponent(`https://konsilience.com/blog/${post.slug}`);

  return (
    <>
      <section className="relative overflow-hidden bg-black pt-40 lg:pt-48">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_0%,rgba(26,105,253,.28),transparent_60%)]" />
        <div className="wrap-sm relative">
          <nav className="anim-hero flex flex-wrap items-center gap-2 text-sm text-muted">
            <Link href="/" className="hover:text-white">Home</Link>
            <Icon name="chevron" className="size-3.5 -rotate-90" />
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <Icon name="chevron" className="size-3.5 -rotate-90" />
            <span className="text-white">{post.category}</span>
          </nav>
          <h1 className="anim-hero h2 mt-8" style={{ animationDelay: "120ms" }}>{post.title}</h1>
          <div className="anim-hero mt-8 flex flex-wrap items-center gap-6 text-sm text-muted" style={{ animationDelay: "250ms" }}>
            <span className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-primary font-bold text-white">
                {author.name.split(" ").map((w) => w[0]).join("")}
              </span>
              <span>
                <span className="block font-semibold text-white">{author.name}</span>
                {author.role}
              </span>
            </span>
            <span className="flex items-center gap-2"><Icon name="calendar" className="size-4" /> {formatDate(post.date)}</span>
            <span className="flex items-center gap-2"><Icon name="clock" className="size-4" /> {post.read} min read</span>
          </div>
        </div>
        <Reveal variant="zoom" className="wrap mt-14">
          <SceneArt hue={art.hue} icon={art.icon} label={post.category} className="aspect-[21/9] rounded-3xl" />
        </Reveal>
      </section>

      <section className="sec bg-black">
        <div className="wrap grid gap-14 lg:grid-cols-[240px_1fr_200px]">
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <p className="mb-4 text-xs font-semibold tracking-[.2em] text-muted uppercase">On this page</p>
              <ul className="flex flex-col gap-3 border-l border-line">
                {body.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-white/70 hover:border-primary hover:text-white">
                      {s.h}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <article className="flex max-w-3xl flex-col gap-12">
            <p className="subtitle !font-normal text-white/90">{post.excerpt}</p>
            {body.map((s) => (
              <Reveal key={s.id} variant="fade">
                <section id={s.id} className="scroll-mt-32">
                  <h2 className="h3 font-semibold">{s.h}</h2>
                  {s.p?.map((t) => (
                    <p key={t} className="fs-base mt-5 leading-relaxed font-medium text-white/75">{t}</p>
                  ))}
                  {s.list && (
                    <ol className="mt-6 flex flex-col gap-4">
                      {s.list.map((t, i) => (
                        <li key={t} className="fs-base flex gap-4 rounded-2xl border border-line bg-card p-5 font-medium text-white/85">
                          <span className="font-condensed text-2xl text-primary">{String(i + 1).padStart(2, "0")}</span>
                          {t}
                        </li>
                      ))}
                    </ol>
                  )}
                </section>
              </Reveal>
            ))}
          </article>

          <aside>
            <div className="flex gap-3 lg:sticky lg:top-32 lg:flex-col">
              <p className="text-xs font-semibold tracking-[.2em] text-muted uppercase lg:mb-1">Share</p>
              {[
                ["in", `https://www.linkedin.com/sharing/share-offsite/?url=${url}`],
                ["X", `https://twitter.com/intent/tweet?url=${url}`],
                ["f", `https://www.facebook.com/sharer/sharer.php?u=${url}`],
              ].map(([l, href]) => (
                <a key={l} href={href} target="_blank" rel="noopener noreferrer" className="grid size-11 place-items-center rounded-full border border-line text-sm font-bold transition-colors hover:border-primary hover:bg-primary">
                  {l}
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Related Articles"]} />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <BlogCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <CtaBand title="Want to put these ideas to work?" text="Our team can help you plan and build it." />
    </>
  );
}
