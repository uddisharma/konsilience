"use client";

import { useEffect, useState } from "react";
import { compliance } from "@/lib/content";
import Icon from "../ui/Icon";
import Reveal, { LineReveal } from "../ui/Reveal";
import { useInView } from "../ui/useInView";

const DURATION = 5000;

export default function Compliance() {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView<HTMLDivElement>(0.3);

  // Auto-advance while visible; the white bar on the open item fills over DURATION.
  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % compliance.length), DURATION);
    return () => clearTimeout(id);
  }, [active, inView]);

  return (
    <section className="sec relative bg-black">
      <div className="wrap flex flex-col justify-between gap-14 lg:flex-row">
        <div className="lg:w-[40%]">
          <div className="flex flex-col gap-16 lg:sticky lg:top-32">
            <Reveal variant="zoom">
              <div className="relative grid size-24 place-items-center rounded-3xl border border-line bg-card">
                <Icon name="shield" className="size-11 text-primary" strokeWidth={1.4} />
                <span className="absolute -top-2 -right-2 grid size-8 place-items-center rounded-full bg-primary">
                  <Icon name="lock" className="size-4 text-white" strokeWidth={2} />
                </span>
              </div>
            </Reveal>
            <div className="flex flex-col gap-4">
              <LineReveal className="h2" lines={["Building With", "Compliance and", "Risk in Mind"]} />
              <Reveal delay={250}>
                <p className="fs-base max-w-md font-medium text-white/85">
                  We integrate <a href="#" className="underline underline-offset-4">compliance</a> into every layer of our engineering process,
                  so your enterprise can navigate complex regulations while moving fast.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        <div ref={ref} className="flex flex-col lg:w-[52%]">
          {compliance.map((c, i) => {
            const open = i === active;
            return (
              <div key={c.title} className="relative border-b border-line">
                <span className="absolute inset-x-0 top-0 h-px bg-line">
                  <span
                    key={`${active}-${inView}`}
                    className="block h-full origin-left bg-white"
                    style={{ transform: "scaleX(0)", animation: open && inView ? `grow ${DURATION}ms linear forwards` : undefined }}
                  />
                </span>
                <button onClick={() => setActive(i)} className="flex w-full items-center justify-between gap-6 py-7 text-left">
                  <span className="flex items-center gap-6">
                    <span className={`fs-base min-w-fit font-medium transition-colors ${open ? "text-white" : "text-muted"}`}>[ {i + 1} ]</span>
                    <h3 className={`subtitle transition-colors ${open ? "text-white" : "text-white/70"}`}>{c.title}</h3>
                  </span>
                  <Icon name="chevron" className={`size-5 shrink-0 transition-transform duration-500 ${open ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="grid gap-3 pb-8 sm:grid-cols-2">
                      {c.items.map((it, k) => (
                        <div
                          key={it}
                          className={`fs-para flex items-center gap-4 rounded-xl border border-line bg-card px-5 py-4 font-medium ${open ? "anim-fade-up" : ""}`}
                          style={{ animationDelay: `${150 + k * 70}ms` }}
                        >
                          <span className="check-dot">
                            <Icon name="check" className="size-3 text-white" strokeWidth={3} />
                          </span>
                          {it}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
