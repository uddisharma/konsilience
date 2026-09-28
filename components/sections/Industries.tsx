"use client";

import { useState } from "react";
import Link from "next/link";
import { industries } from "@/lib/content";
import { SceneArt } from "../ui/Artwork";
import Button from "../ui/Button";
import Reveal, { LineReveal } from "../ui/Reveal";

export default function Industries() {
  const [active, setActive] = useState(0);

  return (
    <section className="sec bg-black">
      <div className="wrap flex flex-col gap-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <LineReveal className="h2" lines={["Solving Complex Challenges", "Across Every Major Sector"]} />
          <Button variant="ghost" href="/industries">Check All Industries</Button>
        </div>

        {/* Desktop: image swaps as you hover the list */}
        <div className="hidden justify-between gap-12 lg:flex">
          <Reveal variant="left" className="w-[55%]">
            <div className="sticky top-28 aspect-[4/3] overflow-hidden rounded-3xl">
              {industries.map((ind, i) => (
                <div
                  key={ind.name}
                  className="absolute inset-0 transition-all duration-700 ease-out"
                  style={{ opacity: i === active ? 1 : 0, transform: `scale(${i === active ? 1 : 1.08})` }}
                >
                  <SceneArt hue={ind.hue} icon={ind.icon} label={`${ind.name} Solutions`} className="size-full" />
                </div>
              ))}
            </div>
          </Reveal>
          <div className="no-scrollbar flex max-h-[min(75vh,640px)] w-[40%] flex-col overflow-y-auto" data-lenis-prevent>
            {industries.map((ind, i) => (
              <Link
                key={ind.name}
                href={`/industries/${ind.slug}`}
                onMouseEnter={() => setActive(i)}
                className={`h3 border-b border-line py-3 font-semibold transition-all duration-300 ${i === active ? "pl-4 text-white" : "text-white/30 hover:text-white/60"}`}
              >
                {ind.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile: horizontal cards */}
        <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 lg:hidden">
          {industries.map((ind) => (
            <Link key={ind.name} href={`/industries/${ind.slug}`} className="w-[75vw] shrink-0 snap-start sm:w-[45vw]">
              <SceneArt hue={ind.hue} icon={ind.icon} className="aspect-[4/3] rounded-2xl" />
              <p className="subtitle mt-3">{ind.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
