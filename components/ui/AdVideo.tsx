"use client";

import { useEffect, useRef, useState } from "react";

// Muted, looping promo video. The file is only fetched once the player nears the viewport,
// and playback pauses whenever it scrolls out of view.
export default function AdVideo({ src, poster, label, className = "" }: { src: string; poster: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      width={1080}
      height={1350}
      className={`aspect-[4/5] h-auto w-full object-cover ${className}`}
    />
  );
}
