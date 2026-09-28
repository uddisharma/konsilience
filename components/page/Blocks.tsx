import Link from "next/link";
import type { ReactNode } from "react";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Reveal, { LineReveal } from "../ui/Reveal";

/* Reusable inner-page sections, styled to match the home page. */

export function SectionHead({
  title,
  text,
  center = false,
  action,
  className = "",
}: {
  title: ReactNode[];
  text?: ReactNode;
  center?: boolean;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-6 ${center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"} ${className}`}>
      <div className={`flex max-w-3xl flex-col gap-4 ${center ? "items-center" : ""}`}>
        <LineReveal className="h2" lines={title} />
        {text && (
          <Reveal delay={150}>
            <p className="fs-base font-medium text-muted">{text}</p>
          </Reveal>
        )}
      </div>
      {action && <Reveal delay={200} className="shrink-0">{action}</Reveal>}
    </div>
  );
}

export type CardItem = { icon?: string; title: string; text?: string; href?: string; list?: string[]; tag?: string };

export function CardGrid({ items, cols = 3 }: { items: CardItem[]; cols?: 2 | 3 | 4 }) {
  const grid = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <div className={`grid gap-3 ${grid}`}>
      {items.map((it, i) => {
        const body = (
          <div className="group relative flex h-full flex-col gap-8 overflow-hidden rounded-3xl border border-line bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary sm:p-8">
            <div className="absolute -top-24 -right-24 size-48 rounded-full bg-primary/0 blur-3xl transition-colors duration-700 group-hover:bg-primary/40" />
            <div className="relative flex items-start justify-between gap-4">
              {it.icon ? (
                <span className="grid size-14 place-items-center rounded-2xl bg-black text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-white">
                  <Icon name={it.icon} className="size-7" strokeWidth={1.5} />
                </span>
              ) : (
                <span className="fs-base font-medium text-muted">[ {String(i + 1).padStart(2, "0")} ]</span>
              )}
              {it.tag && <span className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-muted">{it.tag}</span>}
              {it.href && !it.tag && (
                <span className="grid size-10 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black">
                  <Icon name="upRight" className="size-4" strokeWidth={2} />
                </span>
              )}
            </div>
            <div className="relative flex flex-1 flex-col gap-3">
              <h3 className="subtitle">{it.title}</h3>
              {it.text && <p className="fs-para font-medium text-muted">{it.text}</p>}
              {it.list && (
                <ul className="mt-3 flex flex-col gap-3">
                  {it.list.map((l) => (
                    <li key={l} className="fs-para flex items-start gap-3 font-medium text-white/85">
                      <span className="check-dot mt-0.5">
                        <Icon name="check" className="size-3 text-white" strokeWidth={3} />
                      </span>
                      {l}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
        return (
          <Reveal key={it.title} delay={(i % 4) * 90}>
            {it.href ? <Link href={it.href} className="block h-full">{body}</Link> : body}
          </Reveal>
        );
      })}
    </div>
  );
}

export function ProcessSteps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <div
      className="grid border-t border-line md:grid-cols-2 lg:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]"
      style={{ "--n": steps.length } as React.CSSProperties}
    >
      {steps.map((s, i) => (
        <Reveal key={s.title} delay={i * 110} className="group relative border-b border-line py-8 lg:border-r lg:border-b-0 lg:px-7 lg:first:pl-0 lg:last:border-r-0">
          <span className="absolute top-0 left-0 h-0.5 w-0 bg-primary transition-all duration-700 group-hover:w-full" />
          <span className="fs-base font-medium text-muted">[ {String(i + 1).padStart(2, "0")} ]</span>
          <h3 className="subtitle mt-8">{s.title}</h3>
          <p className="fs-para mt-3 font-medium text-muted">{s.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((t, i) => (
        <Reveal key={t} delay={i * 40} variant="zoom">
          <span className="flex items-center gap-2.5 rounded-full border border-line bg-card px-5 py-3 text-sm font-semibold transition-colors hover:border-primary">
            <span className="size-2 rounded-full bg-primary" />
            {t}
          </span>
        </Reveal>
      ))}
    </div>
  );
}

export function CtaBand({
  title,
  text,
  label = "Talk to Our Experts",
  href = "/contact",
}: {
  title: ReactNode;
  text?: ReactNode;
  label?: string;
  href?: string;
}) {
  return (
    <section className="sec bg-black">
      <Reveal variant="zoom" className="wrap">
        <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(110deg,#031432_0%,#0b2f86_45%,#1163fb_100%)] p-8 sm:p-12 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_50%,rgba(94,150,254,.45),transparent_70%)]" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="flex max-w-3xl flex-col gap-5">
              <h2 className="h3 font-semibold">{title}</h2>
              {text && <p className="fs-base font-medium text-white/85">{text}</p>}
            </div>
            <div className="shrink-0">
              <Button variant="white" href={href}>{label}</Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// Two-column block: sticky heading on the left, content on the right (like the compliance section).
export function Split({ title, text, children }: { title: ReactNode[]; text?: ReactNode; children: ReactNode }) {
  return (
    <div className="wrap flex flex-col justify-between gap-12 lg:flex-row">
      <div className="lg:w-[38%]">
        <div className="flex flex-col gap-4 lg:sticky lg:top-32">
          <LineReveal className="h2" lines={title} />
          {text && (
            <Reveal delay={150}>
              <p className="fs-base font-medium text-muted">{text}</p>
            </Reveal>
          )}
        </div>
      </div>
      <div className="lg:w-[56%]">{children}</div>
    </div>
  );
}

// Numbered text rows, used for long-form lists (values, benefits, principles).
export function NumberedRows({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className="border-t border-line">
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 70} variant="fade">
          <div className="group grid gap-3 border-b border-line py-7 transition-colors md:grid-cols-[80px_1fr_1.3fr] md:gap-8">
            <span className="fs-base font-medium text-muted transition-colors group-hover:text-primary">[ {i + 1} ]</span>
            <h3 className="subtitle">{it.title}</h3>
            <p className="fs-para font-medium text-muted">{it.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
