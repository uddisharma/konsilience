"use client";

import { useState } from "react";
import { awards } from "@/lib/content";
import Icon, { Laurel } from "../ui/Icon";
import Reveal, { LineReveal } from "../ui/Reveal";

function Badge({ color, title }: { color: string; title: string }) {
  const dark = color === "#3c3c3c";
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1 text-center" style={{ color: dark ? "#fff" : "#111" }}>
      <Icon name="trophy" className="size-7" strokeWidth={1.4} />
      <span className="line-clamp-2 text-[10px] leading-tight font-bold uppercase">{title}</span>
    </div>
  );
}

export default function Awards() {
  const [hover, setHover] = useState(0);
  const [all, setAll] = useState(false);
  const list = all ? awards : awards.slice(0, 5);

  return (
    <section className="sec bg-black">
      <div className="wrap-sm flex items-center justify-center gap-6 sm:gap-12">
        <Laurel className="hidden h-24 text-white/80 sm:block" />
        <LineReveal className="h2 text-center" lines={["Proven Expertise.", "Globally Accredited."]} />
        <Laurel flip className="hidden h-24 text-white/80 sm:block" />
      </div>

      <div className="wrap mt-14 border-t border-line">
        {list.map((a, i) => {
          const on = hover === i;
          return (
            <Reveal key={a.title} delay={i < 5 ? i * 80 : 0} variant="fade">
              <a
                href="#"
                onMouseEnter={() => setHover(i)}
                className="relative flex flex-col gap-2 border-b border-line py-6 transition-all duration-300 md:flex-row md:items-center md:justify-between md:py-8"
              >
                <div className="relative flex items-center md:w-[40%]">
                  <span
                    className="absolute left-0 grid size-8 place-items-center rounded-full bg-primary transition-all duration-300"
                    style={{ opacity: on ? 1 : 0, transform: `scale(${on ? 1 : 0.4})` }}
                  >
                    <Icon name="star" className="size-4 fill-white text-white" />
                  </span>
                  <span className="subtitle transition-[padding] duration-300" style={{ paddingLeft: on ? 48 : 0 }}>
                    {a.source}
                  </span>
                </div>
                <div className={`fs-base font-medium transition-colors duration-300 md:w-[45%] md:pr-52 ${on ? "text-white" : "text-muted"}`}>{a.title}</div>
                <div
                  className="absolute top-1/2 right-0 hidden h-[110px] w-[146px] rounded-md p-4 transition-all duration-500 md:block xl:right-11"
                  style={{
                    backgroundColor: a.color,
                    opacity: on ? 1 : 0,
                    transform: `translateY(-50%) rotate(${on ? -4 : 6}deg) scale(${on ? 1 : 0.85})`,
                  }}
                >
                  <Badge color={a.color} title={a.title} />
                </div>
              </a>
            </Reveal>
          );
        })}
        <div className="mt-10 text-center">
          <button
            onClick={() => setAll(!all)}
            className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold transition-colors hover:border-white"
          >
            {all ? "Show Less" : "Show More"}
            <Icon name="chevron" className={`size-4 transition-transform ${all ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </section>
  );
}
