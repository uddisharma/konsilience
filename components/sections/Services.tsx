"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/content";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import { LineReveal } from "../ui/Reveal";
import { useScrollProgress } from "../ui/useScrollProgress";

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

function Card({ s }: { s: (typeof services)[number] }) {
  return (
    <div className="group flex h-full flex-col justify-between gap-8 border-y border-black/10 bg-cream p-8 text-[#111] transition-colors duration-500 hover:bg-white lg:border-y-0 lg:border-x lg:p-9 xl:px-11">
      <span className="grid size-16 place-items-center rounded-2xl bg-white text-primary shadow-[0_8px_24px_-12px_rgba(0,0,0,.25)] transition-all duration-500 group-hover:bg-primary group-hover:text-white">
        <Icon name={s.icon} className="size-8" strokeWidth={1.4} />
      </span>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="subtitle">
            {s.title[0]}
            <br />
            {s.title[1]}
          </h3>
          <p className="fs-base font-medium text-black/65">{s.text}</p>
        </div>
        <nav className="flex flex-col">
          {s.links.map(([l, href]) => (
            <Link key={href} href={href} className="group/l flex items-center justify-between border-t border-black/10 py-3 text-[15px] font-medium transition-colors hover:text-primary">
              {l}
              <span className="grid size-7 place-items-center rounded-full border border-black/15 transition-all duration-300 group-hover/l:rotate-45 group-hover/l:border-primary group-hover/l:bg-primary group-hover/l:text-white">
                <Icon name="upRight" className="size-3.5" strokeWidth={2} />
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default function Services() {
  const [ref, p] = useScrollProgress<HTMLDivElement>();
  const pinned = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ h: 0, top: 0 });

  // Size the pinned block to its content. If it is taller than the screen, stick it
  // bottom-aligned (negative top) so the cards and button stay fully visible while pinned.
  useEffect(() => {
    const el = pinned.current;
    if (!el) return;
    const measure = () => setBox({ h: el.offsetHeight, top: Math.min(0, window.innerHeight - el.offsetHeight) });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section id="services" className="bg-cream text-[#111]">
      {/* Desktop: pinned section; cards rise into place one after another as you scroll */}
      <div ref={ref} className="relative hidden lg:block" style={{ height: box.h ? `calc(${box.h}px + 160vh)` : "260vh" }}>
        <div ref={pinned} className="sticky flex min-h-screen flex-col pt-24 pb-16" style={{ top: box.top }}>
          <LineReveal className="h2 wrap-sm text-center" lines={["Technology Services Built", "Around Your Business Goals"]} />
          <div className="wrap mt-10 grid flex-1 grid-cols-4 overflow-hidden [&>div+div>div]:border-l-0">
            {services.map((s, i) => {
              const t = ease(clamp((p - i * 0.14) / 0.42));
              return (
                <div key={s.title[0]} style={{ transform: `translateY(${(1 - t) * 75}vh)`, opacity: 0.4 + t * 0.6 }} className="will-change-transform">
                  <Card s={s} />
                </div>
              );
            })}
          </div>
          <div className="mt-12 text-center" style={{ opacity: clamp((p - 0.55) / 0.2) }}>
            <Button href="/services">View All Services</Button>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: simple stack */}
      <div className="sec lg:hidden">
        <LineReveal className="h2 wrap-sm text-center" lines={["Technology Services Built", "Around Your Business Goals"]} />
        <div className="wrap mt-10 grid gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <Card key={s.title[0]} s={s} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/services">View All Services</Button>
        </div>
      </div>
    </section>
  );
}
