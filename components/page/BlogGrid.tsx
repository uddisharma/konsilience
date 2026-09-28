"use client";

import { useState } from "react";
import type { posts } from "@/lib/catalog";
import BlogCard from "./BlogCard";

// Category filter + search over the blog list.
export default function BlogGrid({ items, categories }: { items: typeof posts; categories: string[] }) {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const shown = items.filter(
    (p) => (cat === "All" || p.category === cat) && (p.title + p.excerpt).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="no-scrollbar flex gap-3 overflow-x-auto">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 px-5 py-3 text-sm font-semibold transition-colors ${c === cat ? "bg-white text-black" : "bg-card hover:bg-[#262625]"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search articles..."
          className="w-full rounded-full border border-line bg-card px-5 py-3 text-sm outline-none focus:border-primary md:w-72"
        />
      </div>
      {shown.length ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <div key={`${cat}-${p.slug}`} className="anim-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <BlogCard post={p} />
            </div>
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-muted">No articles match your search.</p>
      )}
    </div>
  );
}
