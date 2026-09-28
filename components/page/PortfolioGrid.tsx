"use client";

import { useState } from "react";
import type { Project } from "@/lib/catalog";
import ProjectCard from "./ProjectCard";

// Case-study grid with industry filter pills.
export default function PortfolioGrid({ items }: { items: Project[] }) {
  const filters = ["All", ...Array.from(new Set(items.map((p) => p.industry)))];
  const [active, setActive] = useState("All");
  const shown = active === "All" ? items : items.filter((p) => p.industry === active);

  return (
    <div className="flex flex-col gap-10">
      <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`shrink-0 px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors duration-300 ${f === active ? "bg-white text-black" : "bg-card text-white hover:bg-[#262625]"}`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <div key={`${active}-${p.slug}`} className={`anim-fade-up ${i % 3 === 1 ? "lg:mt-16" : ""}`} style={{ animationDelay: `${(i % 6) * 70}ms` }}>
            <ProjectCard p={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
