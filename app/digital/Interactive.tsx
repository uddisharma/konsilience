"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { useInView } from "@/components/ui/useInView";

// How long a stat takes to count up, and how often a paused service list moves to the next row.
const COUNT_MS = 1600;
const ROTATE_MS = 4200;

/** Counts from 0 to `value` the first time it scrolls into view. `value` keeps its own prefix and suffix, e.g. "$25M+". */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.4);
  const match = /^([^\d]*)([\d.]+)(.*)$/.exec(value);
  const target = match ? Number(match[2]) : 0;
  const decimals = match?.[2].split(".")[1]?.length ?? 0;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || !match) return;
    // reduced motion: jump straight to the final value on the first frame
    const ms = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : COUNT_MS;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = ms ? Math.min(1, (now - start) / ms) : 1;
      setN(target * (1 - Math.pow(1 - t, 4)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `match` is derived from `value`
  }, [inView, target]);

  if (!match) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>
        {match[1]}
        {n.toFixed(decimals)}
        {match[3]}
      </span>
    </span>
  );
}

export type ServiceRow = { title: string; tag: string; text: string; href: string; icon: string; deliverables: string[] };

/** The services as large rows: the active row opens to show what is included. Rows rotate on their own (paused while the pointer is over the list) until the visitor clicks one. */
export function ServiceRows({ items }: { items: ServiceRow[] }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  const [on, setOn] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hovered, setHovered] = useState(false);
  const rotating = auto && inView && !hovered;

  useEffect(() => {
    if (!rotating) return;
    const id = setInterval(() => setOn((i) => (i + 1) % items.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [rotating, items.length]);

  const pick = (i: number) => {
    setAuto(false);
    setOn(i);
  };

  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="border-t border-[var(--kd-line)]">
      {items.map((s, i) => {
        const active = on === i;
        return (
          <div key={s.href} data-on={active || undefined} className="kd-row border-b border-[var(--kd-line)] px-4 sm:px-8">
            <button type="button" aria-expanded={active} onClick={() => pick(i)} className="flex w-full cursor-pointer items-center gap-5 py-6 text-left sm:gap-8 sm:py-8">
              <span className={`w-9 shrink-0 font-mono text-sm font-semibold ${active ? "text-white/60" : "text-black/40"}`}>{String(i + 1).padStart(2, "0")}</span>
              <span className="kd-display kd-h3 flex-1">{s.title}</span>
              <span className={`hidden text-xs font-bold tracking-[.18em] uppercase md:block ${active ? "text-white/60" : "text-black/45"}`}>{s.tag}</span>
              <span className={`kd-row-arrow grid size-11 shrink-0 place-items-center rounded-full border ${active ? "" : "border-black/20"}`}>
                <Icon name="upRight" className="size-4" strokeWidth={2} />
              </span>
            </button>
            <Icon name={s.icon} className="kd-row-icon hidden md:block" strokeWidth={1} />
            {active && rotating && (
              <span aria-hidden className="kd-row-timer" style={{ "--kd-rotate": `${ROTATE_MS}ms` } as CSSProperties}>
                <span />
              </span>
            )}
            <div className="kd-row-body">
              <div className="overflow-hidden">
                <div className="grid gap-6 pb-9 sm:pl-[68px] lg:grid-cols-[1.1fr_1fr] lg:gap-12">
                  <div>
                    <p className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">{s.text}</p>
                    <Link href={s.href} className="kd-btn kd-btn-accent mt-7">
                      Explore {s.title}
                      <span className="kd-btn-dot">
                        <Icon name="upRight" className="size-4" strokeWidth={2} />
                      </span>
                    </Link>
                  </div>
                  <ul className="flex flex-wrap content-start gap-2.5">
                    {s.deliverables.map((d, k) => (
                      <li key={d} className="kd-tag rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/90" style={{ transitionDelay: active ? `${180 + k * 70}ms` : "0ms" }}>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Vertical timeline whose line fills, and whose steps light up, as the visitor scrolls through it. */
export function Timeline({ steps }: { steps: { title: string; text: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // 0 when the list's top reaches 70% down the screen, 1 when its bottom does
      const line = window.innerHeight * 0.7;
      setP(Math.min(1, Math.max(0, (line - r.top) / r.height)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute top-0 bottom-0 left-[11px] w-px bg-white/15 md:left-1/2" />
      <span aria-hidden className="absolute top-0 left-[11px] w-px origin-top bg-gradient-to-b from-white to-[var(--kd-glow)] md:left-1/2" style={{ height: "100%", transform: `scaleY(${p})` }} />
      {steps.map((s, i) => {
        const done = p > (i + 0.35) / steps.length;
        const right = i % 2 === 1;
        return (
          <li key={s.title} data-done={done || undefined} className="kd-step relative grid gap-4 pb-14 pl-12 last:pb-0 md:grid-cols-2 md:gap-0 md:pl-0">
            <span aria-hidden className="kd-step-node absolute top-3 left-[5px] size-[13px] rounded-full bg-white/25 md:left-1/2 md:-ml-[6px]" />
            <div className={`${right ? "md:order-2 md:pl-16" : "md:pr-16 md:text-right"}`}>
              <span className="kd-display kd-step-num kd-outline block text-[5.5rem] leading-[.8] text-white/35 sm:text-[7.5rem]">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className={`kd-step-body ${right ? "md:order-1 md:pr-16 md:text-right" : "md:pl-16"}`}>
              <p className="kd-eyebrow mb-3 text-[var(--kd-glow)]">
                Phase {i + 1} of {steps.length}
              </p>
              <h3 className="kd-display kd-h3 text-white">{s.title}</h3>
              <p className={`mt-4 max-w-md text-base leading-relaxed text-white/65 ${right ? "md:ml-auto" : ""}`}>{s.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
