"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/content";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Reveal, { LineReveal } from "../ui/Reveal";

const DURATION = 6000;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reel, setReel] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, on: false });
  const deck = useRef<HTMLDivElement>(null);
  const count = testimonials.length;

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % count), DURATION);
    return () => clearTimeout(id);
  }, [active, paused, count]);

  return (
    <section className="sec bg-black">
      <div className="wrap flex flex-col gap-12">
        <div className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
          <LineReveal className="h2" lines={["Words From Our C-Suite Partners"]} />
          <Button variant="ghost" href="/testimonials" className="hidden lg:inline-flex">View All Client Testimonials</Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.35fr]">
          {/* Video reel poster */}
          <Reveal variant="left">
            <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-[linear-gradient(160deg,#0b2f86,#020615_70%)] lg:aspect-auto lg:h-full lg:min-h-[560px]">
              <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_40%,rgba(94,150,254,.5),transparent_70%)] transition-transform duration-[1.5s] group-hover:scale-110" />
              {/* speaker portrait for the active testimonial */}
              {testimonials.map((t, i) => (
                <div
                  key={t.name}
                  className="absolute inset-0 grid place-items-center transition-all duration-700"
                  style={{ opacity: i === active ? 1 : 0, transform: `scale(${i === active ? 1 : 1.1})` }}
                >
                  <div className="text-center">
                    <span className="mx-auto grid size-40 place-items-center rounded-full border border-white/20 bg-white/10 text-5xl font-bold backdrop-blur-xl sm:size-48">
                      {t.name.split(" ").map((p) => p[0]).join("")}
                    </span>
                    <p className="subtitle mt-6">{t.name}</p>
                    <p className="text-sm text-white/60">{t.role}</p>
                  </div>
                </div>
              ))}
              <span className="absolute top-6 left-6 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[11px] font-semibold tracking-widest uppercase backdrop-blur">
                Client Stories
              </span>
              <button
                onClick={() => setReel(true)}
                className="absolute bottom-6 left-6 flex items-center gap-3 rounded-full bg-white py-2 pr-6 pl-2 text-xs font-bold tracking-wider text-black transition-transform hover:scale-105"
              >
                <span className="relative grid size-11 place-items-center rounded-full bg-primary text-white">
                  <span className="absolute inset-0 rounded-full bg-primary" style={{ animation: "ping-soft 1.8s ease-out infinite" }} />
                  <Icon name="play" className="relative size-4 fill-current" />
                </span>
                WATCH REEL
              </button>
            </div>
          </Reveal>

          {/* Stacked card deck */}
          <Reveal variant="right">
            <div
              ref={deck}
              className="relative h-[520px] overflow-hidden rounded-3xl bg-[linear-gradient(180deg,#191918,#0c0c0c)] lg:h-full lg:min-h-[560px] lg:cursor-none"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => { setPaused(false); setCursor((c) => ({ ...c, on: false })); }}
              onMouseMove={(e) => {
                const r = deck.current!.getBoundingClientRect();
                setCursor({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
              }}
              onClick={() => setActive((a) => (a + 1) % count)}
            >
              <div
                className="pointer-events-none absolute z-30 hidden size-20 place-items-center rounded-full bg-primary text-[11px] font-bold tracking-widest text-white transition-[opacity,scale] duration-200 lg:grid"
                style={{ left: cursor.x - 40, top: cursor.y - 40, opacity: cursor.on ? 1 : 0, scale: cursor.on ? "1" : ".3" }}
              >
                NEXT
              </div>
              {testimonials.map((t, i) => {
                const pos = (i - active + count) % count; // 0 = front
                return (
                  <div
                    key={t.name}
                    className="absolute inset-x-[6%] top-[8%] bottom-[12%] flex flex-col justify-between rounded-[20px] bg-white p-7 text-[#111] shadow-2xl transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)] sm:p-12"
                    style={{
                      zIndex: count - pos,
                      transform: pos === count - 1 ? "translateY(-120%) rotate(-4deg)" : `translateY(${pos * 22}px) scale(${1 - pos * 0.05})`,
                      opacity: pos > 2 ? 0 : 1 - pos * 0.25,
                    }}
                  >
                    <svg viewBox="0 0 48 36" className="h-9 w-12 text-primary" fill="currentColor" aria-hidden>
                      <path d="M0 36V20C0 8.4 6 1.7 18 0l2 5.4C13.5 7 10.4 10.6 10 16h9v20H0Zm28 0V20C28 8.4 34 1.7 46 0l2 5.4C41.5 7 38.4 10.6 38 16h9v20H28Z" />
                    </svg>
                    <p className="subtitle mt-6 flex-1 !font-semibold">{t.quote}</p>
                    <div className="mt-8 flex items-center gap-4">
                      <span className="grid size-13 place-items-center rounded-full bg-primary text-sm font-bold text-white">
                        {t.name.split(" ").map((p) => p[0]).join("")}
                      </span>
                      <div>
                        <p className="fs-para font-extrabold">{t.name}</p>
                        <p className="text-sm font-semibold text-black/50">{t.role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="absolute inset-x-[6%] bottom-5 z-20 flex gap-2">
                {testimonials.map((t, i) => (
                  <span key={t.name} className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
                    <span
                      key={`${active}-${paused}`}
                      className="block h-full origin-left bg-white"
                      style={{
                        transform: i < active ? "scaleX(1)" : "scaleX(0)",
                        animation: i === active && !paused ? `grow ${DURATION}ms linear forwards` : undefined,
                      }}
                    />
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="text-center lg:hidden">
          <Button variant="ghost" href="/testimonials">View All Client Testimonials</Button>
        </div>
      </div>

      {/* Reel modal */}
      {reel && (
        <div className="anim-fade-up fixed inset-0 z-[60] grid place-items-center bg-black/90 p-5 backdrop-blur" onClick={() => setReel(false)} data-lenis-prevent>
          <div className="relative grid aspect-video w-full max-w-4xl place-items-center rounded-3xl border border-line bg-card" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setReel(false)} aria-label="Close" className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white text-black">
              <Icon name="close" className="size-5" />
            </button>
            <div className="text-center">
              <Icon name="play" className="mx-auto size-12 text-primary" />
              <p className="mt-4 text-muted">Drop your testimonial reel video here (e.g. a &lt;video&gt; or YouTube embed).</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
