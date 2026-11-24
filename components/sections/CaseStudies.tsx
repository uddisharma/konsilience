"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { caseStudies } from "@/lib/content";
import { PhoneArt } from "../ui/Artwork";
import Icon from "../ui/Icon";
import { LineReveal } from "../ui/Reveal";

export default function CaseStudies() {
  const track = useRef<HTMLDivElement>(null);
  const nav = useRef<HTMLDivElement>(null);
  const area = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0, on: false, down: false });
  const drag = useRef({ active: false, x: 0, left: 0, moved: false });

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const idx = (i + caseStudies.length) % caseStudies.length;
    const cards = el.children as HTMLCollectionOf<HTMLElement>;
    el.scrollTo({ left: cards[idx].offsetLeft - cards[0].offsetLeft, behavior: "smooth" });
  };

  // Track which card is closest to the left edge.
  const onScroll = () => {
    const el = track.current!;
    const cards = Array.from(el.children) as HTMLElement[];
    const dist = (c: HTMLElement) => Math.abs(c.offsetLeft - cards[0].offsetLeft - el.scrollLeft);
    let best = 0;
    cards.forEach((c, i) => {
      if (dist(c) < dist(cards[best])) best = i;
    });
    setActive(best);
  };

  // Keep the active client pill visible.
  useEffect(() => {
    const bar = nav.current;
    const pill = bar?.children[active] as HTMLElement | undefined;
    if (bar && pill) bar.scrollTo({ left: pill.offsetLeft - bar.offsetLeft - bar.clientWidth / 2 + pill.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    drag.current = { active: true, x: e.clientX, left: track.current!.scrollLeft, moved: false };
    setCursor((c) => ({ ...c, down: true }));
  };
  const onMove = (e: React.PointerEvent) => {
    const r = area.current!.getBoundingClientRect();
    setCursor((c) => ({ ...c, x: e.clientX - r.left, y: e.clientY - r.top, on: true }));
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    track.current!.scrollLeft = drag.current.left - dx;
  };
  const onUp = () => {
    drag.current.active = false;
    setCursor((c) => ({ ...c, down: false }));
  };

  return (
    <section id="work" className="sec overflow-hidden bg-black pb-0">
      <LineReveal className="h2 wrap-sm text-center" lines={["Innovation, Engineered by Us"]} />

      {/* client pills */}
      <div className="wrap mt-12 flex items-center gap-3">
        <button onClick={() => goTo(active - 1)} aria-label="Previous" className="grid size-11 shrink-0 place-items-center bg-card text-white transition-colors hover:bg-primary">
          <Icon name="arrowLeft" className="size-4" />
        </button>
        <div ref={nav} className="no-scrollbar flex flex-1 gap-3 overflow-x-auto">
          {caseStudies.map((c, i) => (
            <button
              key={c.client}
              onClick={() => goTo(i)}
              className={`shrink-0 px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors duration-300 ${i === active ? "bg-white text-black" : "bg-card text-white hover:bg-[#262625]"}`}
            >
              {c.client}
            </button>
          ))}
        </div>
        <button onClick={() => goTo(active + 1)} aria-label="Next" className="grid size-11 shrink-0 place-items-center bg-card text-white transition-colors hover:bg-primary">
          <Icon name="arrow" className="size-4" />
        </button>
      </div>

      {/* draggable track */}
      <div
        ref={area}
        className="relative mt-10 lg:cursor-none"
        onPointerMove={onMove}
        onPointerLeave={() => { onUp(); setCursor((c) => ({ ...c, on: false })); }}
        onPointerDown={onDown}
        onPointerUp={onUp}
      >
        <div
          className="pointer-events-none absolute z-20 hidden size-24 place-items-center rounded-full bg-primary text-xs font-semibold tracking-widest text-white transition-[transform,opacity] duration-200 lg:grid"
          style={{
            left: cursor.x - 48,
            top: cursor.y - 48,
            opacity: cursor.on ? 1 : 0,
            transform: `scale(${cursor.on ? (cursor.down ? 0.8 : 1) : 0.3})`,
          }}
        >
          ← DRAG →
        </div>

        <div
          ref={track}
          onScroll={onScroll}
          onClickCapture={(e) => drag.current.moved && e.preventDefault()}
          className="no-scrollbar flex gap-4 overflow-x-auto pb-24 select-none [padding-inline:max(16px,calc((100vw-min(100vw-96px,1600px))/2))]"
          data-lenis-prevent-horizontal
        >
          {caseStudies.map((c, i) => {
            const txt = c.dark ? "text-white" : "text-[#111]";
            return (
              <Link
                key={c.client}
                href={`/portfolio/${c.slug}`}
                draggable={false}
                className={`group relative flex h-[560px] w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl p-7 sm:w-[400px] xl:h-[600px] ${txt} ${i % 2 ? "lg:mt-16" : ""}`}
                style={{ backgroundColor: c.bg }}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <span className="grid size-14 place-items-center rounded-full text-xl font-extrabold text-white" style={{ backgroundColor: c.accent }}>
                      {c.client[0]}
                    </span>
                    <span>
                      <span className="subtitle block leading-tight">{c.client}</span>
                      <span className={`text-xs font-semibold ${c.dark ? "text-white/70" : "text-black/55"}`}>{c.live ? "Our product" : `${c.style}-style`} · {c.industry}</span>
                    </span>
                  </div>
                  <p className={`fs-para font-medium ${c.dark ? "text-white/80" : "text-black/70"}`}>{c.text}</p>
                  <div className="grid grid-cols-2 gap-6">
                    {c.metrics.map(([v, l]) => (
                      <div key={l} className="flex flex-col gap-2">
                        <span className="subtitle !text-2xl !font-bold">{v}</span>
                        <span className={`fs-para font-medium ${c.dark ? "text-white/70" : "text-black/60"}`}>{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative -mx-7 -mb-7 flex h-[46%] items-start justify-center overflow-hidden pt-5">
                  <div className="absolute inset-x-6 bottom-0 h-3/4 rounded-t-[2rem]" style={{ background: c.dark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)" }} />
                  <PhoneArt slug={c.slug} accent={c.accent} dark={c.dark} className="relative w-[78%]" />
                </div>
                <span className={`absolute top-7 right-7 grid size-10 place-items-center rounded-full transition-all duration-500 group-hover:rotate-45 ${c.dark ? "bg-white text-black" : "bg-black text-white"}`}>
                  <Icon name="upRight" className="size-4" strokeWidth={2} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
