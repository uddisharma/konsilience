"use client";

import { useEffect, useRef } from "react";

// Animated 3D wave-mesh of glowing points; stands in for the reference site's hero video.
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);

    const COLS = 96, ROWS = 42;
    // Brand colour from the --brand-rgb CSS variable, re-read so the colour picker updates it live.
    let brand = [26, 105, 253];
    let frame = 0;
    const readBrand = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--brand-rgb").trim().split(/s+/).map(Number);
      if (v.length === 3 && v.every((n) => !Number.isNaN(n))) brand = v;
    };
    readBrand();
    const draw = (t: number) => {
      if (++frame % 30 === 0) readBrand();
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      ctx.clearRect(0, 0, w, h);

      const horizon = h * 0.3;
      const fov = h * 0.9;
      for (let r = 0; r < ROWS; r++) {
        const z = 1 + r * 0.22; // depth
        for (let c = 0; c < COLS; c++) {
          const x = (c / (COLS - 1) - 0.5) * 9 + (mouse.x - 0.5) * 0.8;
          const wave =
            Math.sin(c * 0.22 + t * 0.0009) * 0.35 +
            Math.cos(r * 0.3 + t * 0.0007) * 0.3 +
            Math.sin((c + r) * 0.12 + t * 0.0012) * 0.25;
          const y = 1.1 + wave - (mouse.y - 0.5) * 0.4;
          const sx = w / 2 + (x * fov) / z;
          const sy = horizon + (y * fov) / z / 2.2;
          if (sx < -10 || sx > w + 10) continue;
          const depth = 1 - r / ROWS;
          const size = Math.max(0.9, 3.4 / z);
          const glow = 0.25 + (wave + 0.9) * 0.45;
          // tint toward white as the wave peaks
          const k = 0.15 + glow * 0.3;
          ctx.fillStyle = `rgba(${brand[0] + (255 - brand[0]) * k},${brand[1] + (255 - brand[1]) * k},${brand[2] + (255 - brand[2]) * k},${Math.min(1, depth * glow * 1.6)})`;
          ctx.fillRect(sx, sy, size, size);
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 size-full" aria-hidden />;
}
