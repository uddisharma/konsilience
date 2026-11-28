"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";

export type Solution = { slug: string; name: string; icon: string; short: string; useCases: string[] };

/** The AI solutions as a list on the left and the picked one in detail on the right. Opens on click. */
export function SolutionTabs({ items }: { items: Solution[] }) {
  const [on, setOn] = useState(0);
  const s = items[on];

  return (
    <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-10">
      <div role="tablist" aria-label="AI solutions" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
        {items.map((item, i) => (
          <button
            key={item.slug}
            type="button"
            role="tab"
            aria-selected={on === i}
            data-on={on === i || undefined}
            onClick={() => setOn(i)}
            className="ka-tab flex shrink-0 items-center gap-4 rounded-2xl px-5 py-4 text-left lg:gap-6 lg:px-7 lg:py-6"
          >
            <span className="ka-mono text-xs font-semibold opacity-60">{String(i + 1).padStart(2, "0")}</span>
            <span className="ka-display ka-h3 flex-1 whitespace-nowrap">{item.name}</span>
            <Icon name="arrow" className="ka-tab-arrow hidden size-5 text-[var(--ka-sky)] lg:block" strokeWidth={2} />
          </button>
        ))}
      </div>

      {/* keyed by slug so the panel animates in again on every change */}
      <div key={s.slug} role="tabpanel" className="ka-detail p-7 sm:p-10">
        <span className="ka-detail-glow" />
        <Icon name={s.icon} className="ka-detail-icon" strokeWidth={1} />
        <div className="relative">
          <span className="grid size-14 place-items-center rounded-2xl bg-[var(--ka-blue)] text-white">
            <Icon name={s.icon} className="size-6" />
          </span>
          <h3 className="ka-display ka-h2 mt-8 text-white">{s.name}</h3>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">{s.short}</p>

          <p className="ka-eyebrow mt-9 text-[var(--ka-sky)]">Where it gets used</p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {s.useCases.map((u, k) => (
              <li key={u} className="ka-use flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-medium text-white/90" style={{ animationDelay: `${120 + k * 70}ms` }}>
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-white text-[var(--ka-ink)]">
                  <Icon name="check" className="size-3" strokeWidth={3} />
                </span>
                {u}
              </li>
            ))}
          </ul>

          <Link href={`/ai/${s.slug}`} className="ka-btn ka-btn-blue mt-9">
            Explore {s.name}
            <span className="ka-btn-dot">
              <Icon name="upRight" className="size-4" strokeWidth={2} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
