"use client";

import { useEffect, useRef, useState } from "react";

// 0 when the element's top hits the viewport top, 1 when its bottom hits the viewport bottom.
// Used for pinned (sticky) scroll-driven sections.
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const range = r.height - window.innerHeight;
      setP(range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return [ref, p] as const;
}
