import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "../ui/Icon";

export type Crumb = { label: string; href?: string };

// Shared hero for every inner page: breadcrumb, masked title lines, intro, CTAs, optional visual and stat row.
export default function PageHero({
  crumbs,
  eyebrow,
  title,
  text,
  actions,
  aside,
  stats,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode[];
  text?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  stats?: [string, string][];
}) {
  return (
    <section className="relative overflow-hidden bg-black pt-40 lg:pt-48">
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_0%,rgb(var(--brand-rgb)/.32),transparent_60%),radial-gradient(40%_40%_at_0%_20%,rgb(var(--brand-light-rgb)/.14),transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 70% 60% at 70% 20%, #000 10%, transparent 70%)",
        }}
      />

      <div className={`wrap relative grid items-end gap-14 pb-16 lg:pb-24 ${aside ? "lg:grid-cols-[1.15fr_1fr]" : ""}`}>
        <div className="max-w-4xl">
          <nav aria-label="Breadcrumb" className="anim-hero mb-8 flex flex-wrap items-center gap-2 text-sm text-muted">
            <Link href="/" className="hover:text-white">Home</Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-2">
                <Icon name="chevron" className="size-3.5 -rotate-90" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-white">{c.label}</Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
          {eyebrow && (
            <span className="anim-hero mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-xs font-semibold tracking-[.2em] uppercase" style={{ animationDelay: "80ms" }}>
              <span className="size-1.5 rounded-full bg-primary" />
              {eyebrow}
            </span>
          )}
          <h1 className="h1">
            {title.map((l, i) => (
              <span key={i} className="lr-line">
                <span className="anim-line inline-block" style={{ animationDelay: `${150 + i * 130}ms` }}>
                  {l}
                </span>
              </span>
            ))}
          </h1>
          {text && (
            <p className="anim-hero fs-base mt-6 max-w-2xl leading-relaxed font-medium text-white/80" style={{ animationDelay: "450ms" }}>
              {text}
            </p>
          )}
          {actions && (
            <div className="anim-hero mt-10 flex flex-wrap gap-4" style={{ animationDelay: "600ms" }}>
              {actions}
            </div>
          )}
        </div>
        {aside && (
          <div className="anim-hero" style={{ animationDelay: "500ms" }}>
            {aside}
          </div>
        )}
      </div>

      {stats && (
        <div className="relative border-t border-line">
          <div className="wrap grid grid-cols-2 md:grid-cols-4">
            {stats.map(([v, l], i) => (
              <div key={l} className={`anim-hero py-8 ${i % 2 ? "pl-6 md:pl-8" : ""} ${i > 0 ? "md:border-l md:border-line md:pl-8" : ""}`} style={{ animationDelay: `${700 + i * 80}ms` }}>
                <p className="font-condensed text-5xl leading-none font-medium">{v}</p>
                <p className="mt-2 text-sm font-medium text-muted">{l}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
