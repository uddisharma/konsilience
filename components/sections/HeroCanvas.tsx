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
    const draw = (t: number) => {
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
          ctx.fillStyle = `rgba(${60 + glow * 60},${120 + glow * 70},255,${Math.min(1, depth * glow * 1.6)})`;
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
