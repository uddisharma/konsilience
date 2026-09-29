"use client";

import { useEffect, useState } from "react";
import Icon from "./ui/Icon";

// Floating button with a ring showing page scroll progress.
export default function BackToTop() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const c = 2 * Math.PI * 22;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed right-6 bottom-6 z-40 grid size-14 place-items-center rounded-full border border-line bg-card text-white shadow-2xl transition-all duration-300 hover:bg-primary ${p > 0.05 ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="3" />
        <circle cx="28" cy="28" r="22" fill="none" style={{ stroke: "rgb(var(--brand-rgb))" }} strokeWidth="3" strokeDasharray={c} strokeDashoffset={c * (1 - p)} strokeLinecap="round" />
      </svg>
      <Icon name="up" className="size-5" />
    </button>
  );
}
