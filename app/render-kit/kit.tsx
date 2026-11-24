import type { CSSProperties, ReactNode } from "react";
import type { Entry } from "@/lib/image-registry";

// Shared primitives for the image compositions. Sizes use --u: 1% of the design width, so one
// composition renders at its own aspect and (re-flowed) at 1200×630 for share images.

export const u = (n: number) => `calc(var(--u) * ${n})`;
export const JAKARTA = "var(--font-jakarta), sans-serif";
export const BARLOW = "var(--font-barlow), sans-serif";
export const MONO = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"; // the site's font-mono stack

export const isDark = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 140;
};

// A hex colour with alpha, e.g. tint("#0B2F86", .15)
export const tint = (hex: string, a: number) => `${hex}${Math.round(a * 255).toString(16).padStart(2, "0")}`;

const BASE_ASPECT: Record<Entry["size"], number> = { hero: 4 / 3, wide: 16 / 9, cover: 16 / 10, case: 16 / 10, card: 4 / 3 };

/** Fine film grain, 3–6 % strength. */
export function Grain({ amount = 0.05, dark }: { amount?: number; dark: boolean }) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 ${dark ? 1 : 0} 0 0 0 0 ${dark ? 1 : 0} 0 0 0 0 ${dark ? 1 : 0} 0 0 0 1.4 -.35'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`;
  return <div aria-hidden className="pointer-events-none absolute inset-0 z-50" style={{ backgroundImage: `url("data:image/svg+xml;utf8,${svg}")`, opacity: amount }} />;
}

/** The real logo file, never redrawn. Clear space: inset ≥ its own height; min width 96px. */
export function Logo({ bg, corner, width = 13 }: { bg: string; corner: "tl" | "tr" | "bl" | "br"; width?: number }) {
  const dark = isDark(bg);
  const [src, ratio] = dark ? ["/images/konsilience-white.png", 815 / 192] : ["/images/konsilience-black.png", 500 / 103];
  const w = `max(96px, ${u(width)})`;
  const inset = `max(${u(width / ratio + 1.5)}, 40px)`;
  const pos: CSSProperties = {
    ...(corner[0] === "t" ? { top: inset } : { bottom: inset }),
    ...(corner[1] === "l" ? { left: inset } : { right: inset }),
  };
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" className="absolute z-40" style={{ ...pos, width: w, height: "auto" }} />;
}

/** Canvas: brand background, ink colour, grain and (for share images) the logo. */
export function Frame({ e, og, logo, children, grain = 0.045, style }: { e: Entry; og: boolean; logo: "tl" | "tr" | "bl" | "br"; children: ReactNode; grain?: number; style?: CSSProperties }) {
  const [bg, ink] = e.palette;
  const aspect = BASE_ASPECT[e.size];
  return (
    <div
      className="relative size-full overflow-hidden"
      style={{ background: bg, color: ink, fontFamily: JAKARTA, ["--u" as string]: `min(1vw, ${(aspect * 1).toFixed(4)}vh)`, ...style }}
    >
      {children}
      {og && <Logo bg={bg} corner={logo} />}
      <Grain dark={isDark(bg)} amount={grain} />
    </div>
  );
}

/** Small uppercase label used across compositions. */
export function Label({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <span style={{ fontSize: u(1.25), fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", ...style }}>{children}</span>;
}

/** Halftone field: dot radius 0–1 from f(x, y) over a cols×rows grid (x, y normalised 0–1). */
export function Halftone({ cols, rows, f, color, className = "", style, angle = 0 }: { cols: number; rows: number; f: (x: number, y: number) => number; color: string; className?: string; style?: CSSProperties; angle?: number }) {
  const dots: ReactNode[] = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = (i + (j % 2 ? 0.5 : 0)) / cols;
      const y = j / rows;
      const r = Math.max(0, Math.min(1, f(x, y)));
      if (r > 0.04) dots.push(<circle key={`${i}-${j}`} cx={(x + 0.5 / cols) * cols} cy={(y + 0.5 / rows) * rows} r={r * 0.55} />);
    }
  }
  return (
    <svg viewBox={`0 0 ${cols} ${rows}`} preserveAspectRatio="xMidYMid slice" className={className} style={{ ...style, transform: angle ? `rotate(${angle}deg)` : undefined }} fill={color} aria-hidden>
      {dots}
    </svg>
  );
}

/** Isometric projection helper: returns an SVG points string for a box face. */
export const iso = (x: number, y: number, z: number) => [(x - y) * 0.866, (x + y) * 0.5 - z] as const;
export const pts = (...p: (readonly [number, number])[]) => p.map(([a, b]) => `${a.toFixed(2)},${b.toFixed(2)}`).join(" ");

/** Iso slab with top, left and right faces. */
export function Slab({ x, y, z, w, d, h, top, left, right, stroke, sw = 0.25 }: { x: number; y: number; z: number; w: number; d: number; h: number; top: string; left: string; right: string; stroke?: string; sw?: number }) {
  const P = (a: number, b: number, c: number) => iso(x + a, y + b, z + c);
  return (
    <g stroke={stroke} strokeWidth={sw} strokeLinejoin="round">
      <polygon points={pts(P(0, d, 0), P(w, d, 0), P(w, d, h), P(0, d, h))} fill={left} />
      <polygon points={pts(P(w, 0, 0), P(w, d, 0), P(w, d, h), P(w, 0, h))} fill={right} />
      <polygon points={pts(P(0, 0, h), P(w, 0, h), P(w, d, h), P(0, d, h))} fill={top} />
    </g>
  );
}
