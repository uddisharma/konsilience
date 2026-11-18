import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { safeHref } from "@/lib/blog/inline";
import type { Block } from "@/lib/blog/schema";
import { embedSrc } from "@/lib/blog/utils";
import Inline from "./Inline";

/* Renders post blocks in the site's design. Headings must already carry anchors (see withAnchors). */

const P = "fs-base leading-relaxed font-medium text-white/75";

const TONES = {
  info: { box: "border-primary/40 bg-primary/10", icon: "doc", color: "text-primary" },
  tip: { box: "border-emerald-500/40 bg-emerald-500/10", icon: "spark", color: "text-emerald-400" },
  warning: { box: "border-amber-500/40 bg-amber-500/10", icon: "shield", color: "text-amber-400" },
  success: { box: "border-green-500/40 bg-green-500/10", icon: "check", color: "text-green-400" },
} as const;

function Img({ url, alt, className = "" }: { url: string; alt: string; className?: string }) {
  const src = safeHref(url);
  if (!src) return null;
  // eslint-disable-next-line @next/next/no-img-element -- images come from the media library or any host
  return <img src={src} alt={alt} loading="lazy" className={`w-full rounded-2xl border border-line object-cover ${className}`} />;
}

function CtaButton({ href, label }: { href: string; label: string }) {
  const h = safeHref(href) ?? "#";
  const cls = "inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover";
  return /^https?:\/\//.test(h) ? (
    <a href={h} target="_blank" rel="noopener noreferrer" className={cls}>
      {label} <Icon name="arrow" className="size-4" />
    </a>
  ) : (
    <Link href={h} className={cls}>
      {label} <Icon name="arrow" className="size-4" />
    </Link>
  );
}

export function BlockView({ block: b, wideMedia }: { block: Block; wideMedia: boolean }) {
  const breakout = (size: "content" | "wide" | "full") => (!wideMedia || size === "content" ? "" : size === "wide" ? "lg:-mx-16" : "lg:-mx-32 xl:-mx-48");

  switch (b.type) {
    case "heading": {
      const cls = b.level === 2 ? "h3 font-semibold mt-6" : b.level === 3 ? "subtitle mt-4" : "fs-base font-semibold mt-2 text-white/90";
      const Tag = `h${b.level}` as "h2" | "h3" | "h4";
      return (
        <Tag id={b.anchor} className={`scroll-mt-32 ${cls}`}>
          <Inline text={b.text} />
        </Tag>
      );
    }
    case "paragraph":
      return (
        <p className={P}>
          <Inline text={b.text} />
        </p>
      );
    case "list":
      if (b.style === "steps")
        return (
          <ol className="flex flex-col gap-4">
            {b.items.map((t, i) => (
              <li key={i} className="fs-base flex gap-4 rounded-2xl border border-line bg-card p-5 font-medium text-white/85">
                <span className="font-condensed text-2xl text-primary">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1">
                  <Inline text={t} />
                </span>
              </li>
            ))}
          </ol>
        );
      if (b.style === "check")
        return (
          <ul className="flex flex-col gap-3">
            {b.items.map((t, i) => (
              <li key={i} className={`${P} flex gap-3`}>
                <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-primary/20 text-primary">
                  <Icon name="check" className="size-3" />
                </span>
                <span className="flex-1">
                  <Inline text={t} />
                </span>
              </li>
            ))}
          </ul>
        );
      {
        const Tag = b.style === "numbered" ? "ol" : "ul";
        return (
          <Tag className={`${P} flex flex-col gap-2 pl-6 ${b.style === "numbered" ? "list-decimal" : "list-disc"} marker:text-primary`}>
            {b.items.map((t, i) => (
              <li key={i} className="pl-1">
                <Inline text={t} />
              </li>
            ))}
          </Tag>
        );
      }
    case "image": {
      const img = <Img url={b.url} alt={b.alt} />;
      const link = safeHref(b.link);
      return (
        <figure className={breakout(b.size)}>
          {link ? <a href={link}>{img}</a> : img}
          {b.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted">
              <Inline text={b.caption} />
            </figcaption>
          )}
        </figure>
      );
    }
    case "gallery":
      return (
        <div className={`grid gap-4 ${b.columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          {b.images.map((m, i) => (
            <figure key={i}>
              <Img url={m.url} alt={m.alt} className="aspect-[4/3]" />
              {m.caption && <figcaption className="mt-2 text-sm text-muted">{m.caption}</figcaption>}
            </figure>
          ))}
        </div>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-primary py-2 pl-6">
          <p className="subtitle !font-medium italic text-white/90">
            <Inline text={b.text} />
          </p>
          {b.cite && <cite className="mt-3 block text-sm not-italic text-muted">— {b.cite}</cite>}
        </blockquote>
      );
    case "callout": {
      const t = TONES[b.tone];
      return (
        <aside className={`flex gap-4 rounded-2xl border p-5 ${t.box}`}>
          <Icon name={t.icon} className={`mt-0.5 size-5 shrink-0 ${t.color}`} />
          <div className="flex flex-col gap-1.5">
            {b.title && <p className="font-semibold text-white">{b.title}</p>}
            <p className="fs-para leading-relaxed font-medium text-white/80">
              <Inline text={b.text} />
            </p>
          </div>
        </aside>
      );
    }
    case "code":
      return (
        <figure className="overflow-hidden rounded-2xl border border-line bg-[#0c0c0c]">
          {(b.filename || b.language) && (
            <figcaption className="flex justify-between border-b border-line px-5 py-2.5 font-mono text-xs text-muted">
              <span>{b.filename}</span>
              <span className="uppercase">{b.language}</span>
            </figcaption>
          )}
          <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-white/85">
            <code>{b.code}</code>
          </pre>
        </figure>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            {b.caption && <caption className="caption-bottom p-3 text-sm text-muted">{b.caption}</caption>}
            <thead className="bg-card">
              <tr>
                {b.headers.map((h, i) => (
                  <th key={i} className="border-b border-line px-4 py-3 font-semibold text-white">
                    <Inline text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i} className="border-b border-line/60 last:border-0">
                  {r.map((c, j) => (
                    <td key={j} className="px-4 py-3 align-top font-medium text-white/75">
                      <Inline text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "faq":
      return (
        <section className="flex flex-col gap-3">
          {b.title && <h2 className="h3 mb-2 font-semibold">{b.title}</h2>}
          {b.items.map((i, n) => (
            <details key={n} className="group rounded-2xl border border-line bg-card p-5 open:border-primary/60">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {i.q}
                <Icon name="plus" className="size-4 shrink-0 transition-transform group-open:rotate-45" />
              </summary>
              <p className={`${P} mt-3`}>
                <Inline text={i.a} />
              </p>
            </details>
          ))}
        </section>
      );
    case "cta":
      return b.style === "banner" ? (
        <aside className="flex flex-col gap-5 rounded-3xl bg-primary/90 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="subtitle text-white">{b.title}</p>
            {b.text && <p className="mt-1 text-white/85">{b.text}</p>}
          </div>
          <Link href={safeHref(b.href) ?? "#"} className="w-fit shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">
            {b.label}
          </Link>
        </aside>
      ) : (
        <aside className="flex flex-col gap-4 rounded-3xl border border-line bg-[radial-gradient(80%_120%_at_100%_0%,rgb(var(--brand-rgb)/.22),transparent_60%)] bg-card p-8">
          <p className="subtitle">{b.title}</p>
          {b.text && (
            <p className="fs-para font-medium text-muted">
              <Inline text={b.text} />
            </p>
          )}
          <CtaButton href={b.href} label={b.label} />
        </aside>
      );
    case "embed": {
      const src = embedSrc(b.url);
      if (!src) return null;
      return (
        <div className="overflow-hidden rounded-2xl border border-line bg-card" style={{ aspectRatio: b.aspect }}>
          <iframe src={src} title={b.title ?? "Embedded media"} loading="lazy" allowFullScreen className="size-full" referrerPolicy="strict-origin-when-cross-origin" />
        </div>
      );
    }
    case "stats":
      return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {b.items.map((s, i) => (
            <div key={i} className="rounded-2xl border border-line bg-card p-5">
              <p className="font-condensed text-4xl text-primary">{s.value}</p>
              <p className="mt-1 text-sm font-medium text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      );
    case "divider":
      return <hr className="border-line" />;
  }
}

export default function BlockRenderer({ blocks, wideMedia = false }: { blocks: Block[]; wideMedia?: boolean }) {
  return (
    <>
      {blocks.map((b, i) => (
        <BlockView key={b.id ?? i} block={b} wideMedia={wideMedia} />
      ))}
    </>
  );
}
