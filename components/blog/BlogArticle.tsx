import Link from "next/link";
import type { CSSProperties } from "react";
import BlogCard, { formatDate, type CardPost } from "@/components/page/BlogCard";
import { CtaBand, SectionHead } from "@/components/page/Blocks";
import Newsletter from "@/components/page/Newsletter";
import Icon from "@/components/ui/Icon";
import BrandIcon from "@/components/ui/BrandIcon";
import Reveal from "@/components/ui/Reveal";
import type { PostRecord } from "@/lib/blog/schema";
import { postUrl, siteConfigs } from "@/lib/blog/sites";
import { hexToRgbTriplet, readingTime, tableOfContents, withAnchors } from "@/lib/blog/utils";
import BlockRenderer from "./BlockRenderer";

/* The full article page. Used by /blog/[slug] and by the admin preview. */

function Cover({ url, alt, className }: { url: string; alt?: string; className: string }) {
  // eslint-disable-next-line @next/next/no-img-element -- cover images can come from any host
  return <img src={url} alt={alt ?? ""} className={`w-full object-cover ${className}`} />;
}

export default function BlogArticle({ post, related = [] }: { post: PostRecord; related?: CardPost[] }) {
  const d = post.design;
  const cfg = siteConfigs[post.site];
  const blocks = withAnchors(post.blocks);
  const toc = d.showToc ? tableOfContents(blocks) : [];
  const date = post.publishedAt ?? post.updatedAt;
  const read = post.readTime || readingTime(post.blocks);
  const share = encodeURIComponent(postUrl(post.site, post.slug));
  const accent = hexToRgbTriplet(d.accentColor);
  const style = accent ? ({ "--brand-rgb": accent } as CSSProperties) : undefined;
  const centered = d.layout === "centered";
  // The hero shows the cover image only when there is one; without it, just the title. ("art", the old
  // default, means "show the cover image" now. The generated artwork stays on blog cards only.)
  const hero = !d.coverImage ? "minimal" : d.hero === "split" ? "split" : d.hero === "minimal" ? "minimal" : "image";
  const band = d.ctaBand;
  const cta = band.enabled
    ? { title: band.title || cfg.defaultCta.title, text: band.text || cfg.defaultCta.text, label: band.label || cfg.defaultCta.label, href: band.href || cfg.defaultCta.href }
    : null;
  const initials = post.author.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2);

  const meta = (
    <div className="anim-hero mt-8 flex flex-wrap items-center gap-6 text-sm text-muted" style={{ animationDelay: "250ms" }}>
      {d.showAuthor && (
        <span className="flex items-center gap-3">
          {post.author.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element -- author photos can come from any host
            <img src={post.author.avatar} alt="" className="size-11 rounded-full object-cover" />
          ) : (
            <span className="grid size-11 place-items-center rounded-full bg-primary font-bold text-white">{initials}</span>
          )}
          <span>
            <span className="block font-semibold text-white">{post.author.name}</span>
            {post.author.role}
          </span>
        </span>
      )}
      <span className="flex items-center gap-2">
        <Icon name="calendar" className="size-4" /> {formatDate(date)}
      </span>
      <span className="flex items-center gap-2">
        <Icon name="clock" className="size-4" /> {read} min read
      </span>
    </div>
  );

  const crumbs = (
    <nav className="anim-hero flex flex-wrap items-center gap-2 text-sm text-muted">
      <Link href="/" className="hover:text-white">Home</Link>
      <Icon name="chevron" className="size-3.5 -rotate-90" />
      <Link href="/blog" className="hover:text-white">Blog</Link>
      {post.category && (
        <>
          <Icon name="chevron" className="size-3.5 -rotate-90" />
          <span className="text-white">{post.category}</span>
        </>
      )}
    </nav>
  );

  const shareLinks = d.showShare && (
    <div>
      <p className="mb-3 text-xs font-semibold tracking-[.2em] text-muted uppercase">Share</p>
      <div className="flex gap-2">
        {([
          ["linkedin", "LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${share}`],
          ["x", "X", `https://twitter.com/intent/tweet?url=${share}`],
          ["facebook", "Facebook", `https://www.facebook.com/sharer/sharer.php?u=${share}`],
        ] as const).map(([icon, label, href]) => (
          <a key={icon} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`} className="grid size-10 place-items-center rounded-full border border-line text-white/85 transition-colors hover:border-primary hover:bg-primary hover:text-white">
            <BrandIcon name={icon} className="size-4" />
          </a>
        ))}
      </div>
    </div>
  );

  const sidebarLinks = d.sidebarLinks.length > 0 && (
    <div className="flex flex-col gap-3 border-t border-line pt-6">
      <p className="text-xs font-semibold tracking-[.2em] text-muted uppercase">Related reading</p>
      {d.sidebarLinks.map((l) => (
        <Link key={l.href + l.label} href={l.href} className="u-link w-fit text-xs font-semibold text-white/80 hover:text-primary">
          {l.label} →
        </Link>
      ))}
    </div>
  );

  return (
    <div style={style}>
      <section className="relative overflow-hidden bg-black pt-40 lg:pt-48">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_0%,rgb(var(--brand-rgb)/.28),transparent_60%)]" />
        {hero === "split" ? (
          <div className="wrap relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              {crumbs}
              <h1 className="anim-hero h2 mt-8" style={{ animationDelay: "120ms" }}>{post.title}</h1>
              {post.excerpt && <p className="subtitle mt-6 !font-normal text-white/80">{post.excerpt}</p>}
              {meta}
            </div>
            <Reveal variant="zoom">
              <Cover url={d.coverImage!} alt={d.coverAlt} className="aspect-[4/3] rounded-3xl border border-line" />
            </Reveal>
          </div>
        ) : (
          <>
            <div className="wrap-sm relative">
              {crumbs}
              <h1 className="anim-hero h2 mt-8" style={{ animationDelay: "120ms" }}>{post.title}</h1>
              {meta}
            </div>
            {hero === "image" && (
              <Reveal variant="zoom" className="wrap mt-14">
                <Cover url={d.coverImage!} alt={d.coverAlt} className="aspect-[21/9] rounded-3xl" />
              </Reveal>
            )}
          </>
        )}
      </section>

      <section className="sec bg-black">
        {centered ? (
          <div className="mx-auto flex w-[min(100%-2rem,760px)] flex-col gap-8">
            {hero !== "split" && post.excerpt && <p className="subtitle !font-normal text-white/90">{post.excerpt}</p>}
            <BlockRenderer blocks={blocks} wideMedia />
            {(shareLinks || sidebarLinks) && (
              <div className="mt-8 flex flex-col gap-8 border-t border-line pt-8">
                {shareLinks}
                {sidebarLinks}
              </div>
            )}
          </div>
        ) : (
          <div className={`wrap grid gap-14 ${toc.length ? "lg:grid-cols-[240px_1fr_220px]" : "lg:grid-cols-[1fr_220px]"}`}>
            {toc.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-32">
                  <p className="mb-4 text-xs font-semibold tracking-[.2em] text-muted uppercase">On this page</p>
                  <ul className="flex flex-col gap-3 border-l border-line">
                    {toc.map((s) => (
                      <li key={s.id}>
                        <a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-white/70 hover:border-primary hover:text-white">
                          {s.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            )}
            <article className="flex max-w-3xl min-w-0 flex-col gap-7">
              {hero !== "split" && post.excerpt && <p className="subtitle !font-normal text-white/90">{post.excerpt}</p>}
              <BlockRenderer blocks={blocks} />
            </article>
            <aside>
              <div className="flex flex-col gap-8 lg:sticky lg:top-32">
                {shareLinks}
                {sidebarLinks}
              </div>
            </aside>
          </div>
        )}
      </section>

      {d.showRelated && related.length > 0 && (
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
      )}

      {d.showNewsletter && <Newsletter />}
      {cta && <CtaBand title={cta.title} text={cta.text} label={cta.label} href={cta.href} />}
    </div>
  );
}
