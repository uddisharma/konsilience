import type { CSSProperties, ReactNode } from "react";
import Icon from "./Icon";

// Industry-specific app screens for the portfolio phone mockups.
// Everything is sized in `em` off a container-relative base font, so a mockup scales cleanly
// from a small card to the full-width case-study banner.

export type Theme = { a: string; on: string; soft: string; dark: boolean; bg: string; card: string; line: string; tx: string; mu: string };

const hex = (h: string) => {
  const n = parseInt(h.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const lum = (h: string) => {
  const [r, g, b] = hex(h).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const alpha = (h: string, a: number) => `${h}${Math.round(a * 255).toString(16).padStart(2, "0")}`;

export function makeTheme(accent: string, dark: boolean): Theme {
  return {
    a: accent,
    on: lum(accent) > 0.45 ? "#0b0b0c" : "#ffffff",
    soft: alpha(accent, dark ? 0.18 : 0.12),
    dark,
    bg: dark ? "#0d0d0f" : "#ffffff",
    card: dark ? "#1a1a1d" : "#f4f4f6",
    line: dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.07)",
    tx: dark ? "#f5f5f7" : "#0f0f12",
    mu: dark ? "rgba(245,245,247,.55)" : "rgba(15,15,18,.5)",
  };
}

const RED = "#ef4444";
const GREEN = "#16a34a";
const AMBER = "#f59e0b";
const PALETTE = ["#f59e0b", "#7c3aed", "#1a69fd", "#16a34a", "#db2777", "#0891b2", "#ea580c"];

/* ---------- primitives ---------- */

function Txt({ s = 0.78, w = 500, c, className = "", children, style }: { s?: number; w?: number; c?: string; className?: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <span className={`block leading-[1.25] ${className}`} style={{ fontSize: `${s}em`, fontWeight: w, color: c, ...style }}>
      {children}
    </span>
  );
}

function Pill({ bg, fg, children }: { bg: string; fg: string; children: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-[.3em] rounded-full px-[.6em] py-[.2em] text-[.58em] leading-none font-bold whitespace-nowrap" style={{ background: bg, color: fg }}>
      {children}
    </span>
  );
}

function Ico({ name, size = 1, c, sw = 2 }: { name: string; size?: number; c?: string; sw?: number }) {
  return (
    <span className="inline-grid shrink-0 place-items-center" style={{ fontSize: `${size}em`, color: c }}>
      <Icon name={name} className="size-[1em]" strokeWidth={sw} />
    </span>
  );
}

function Avatar({ i, label, size = 2 }: { i: number; label: string; size?: number }) {
  const c = PALETTE[i % PALETTE.length];
  return (
    <span className="grid shrink-0 place-items-center rounded-full" style={{ width: `${size}em`, height: `${size}em`, background: `linear-gradient(135deg, ${c}, ${alpha(c, 0.7)})` }}>
      <span className="font-bold text-white" style={{ fontSize: `${size * 0.36}em` }}>
        {label}
      </span>
    </span>
  );
}

function Card({ t, children, className = "", style }: { t: Theme; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`rounded-[1em] p-[.8em] ${className}`} style={{ background: t.card, ...style }}>
      {children}
    </div>
  );
}

function Btn({ t, children, ghost = false }: { t: Theme; children: ReactNode; ghost?: boolean }) {
  return (
    <div
      className="flex h-[2.6em] items-center justify-center gap-[.4em] rounded-[.9em]"
      style={ghost ? { background: t.card, color: t.tx } : { background: t.a, color: t.on, boxShadow: `0 .5em 1.2em -.4em ${alpha(t.a, 0.6)}` }}
    >
      <Txt s={0.74} w={700}>{children}</Txt>
    </div>
  );
}

function Header({ t, title, sub, right, back }: { t: Theme; title: string; sub?: string; right?: ReactNode; back?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-[.6em] pb-[.8em]">
      <div className="flex min-w-0 items-center gap-[.5em]">
        {back && (
          <span className="grid size-[1.9em] place-items-center rounded-full" style={{ background: t.card }}>
            <Ico name="arrowLeft" size={0.8} c={t.tx} />
          </span>
        )}
        <div className="min-w-0">
          {sub && <Txt s={0.62} w={600} c={t.mu}>{sub}</Txt>}
          <Txt s={1.25} w={800} c={t.tx} className="truncate tracking-[-.02em]">{title}</Txt>
        </div>
      </div>
      {right}
    </div>
  );
}

function Row({ t, lead, title, sub, right, last = false }: { t: Theme; lead?: ReactNode; title: ReactNode; sub?: ReactNode; right?: ReactNode; last?: boolean }) {
  return (
    <div className="flex items-center gap-[.6em] py-[.55em]" style={{ borderBottom: last ? undefined : `1px solid ${t.line}` }}>
      {lead}
      <div className="min-w-0 flex-1">
        <Txt s={0.72} w={650} c={t.tx} className="truncate">{title}</Txt>
        {sub && <Txt s={0.6} c={t.mu} className="mt-[.15em] truncate">{sub}</Txt>}
      </div>
      {right}
    </div>
  );
}

function IconTile({ name, c, size = 2 }: { name: string; c: string; size?: number }) {
  return (
    <span className="grid shrink-0 place-items-center rounded-[.6em]" style={{ width: `${size}em`, height: `${size}em`, background: alpha(c, 0.15), color: c }}>
      <Ico name={name} size={size * 0.45} />
    </span>
  );
}

function Bars({ vals, t, hi = -1, h = 3.2 }: { vals: number[]; t: Theme; hi?: number; h?: number }) {
  const max = Math.max(...vals);
  return (
    <div className="flex items-end gap-[.3em]" style={{ height: `${h}em` }}>
      {vals.map((v, i) => (
        <span key={i} className="flex-1 rounded-[.25em]" style={{ height: `${(v / max) * 100}%`, background: i === hi || hi === -1 ? t.a : alpha(t.a, 0.28) }} />
      ))}
    </div>
  );
}

function Spark({ pts, c, h = 2.6, fill = true, id }: { pts: number[]; c: string; h?: number; fill?: boolean; id: string }) {
  const max = Math.max(...pts);
  const min = Math.min(...pts);
  const d = pts.map((v, i) => `${(i / (pts.length - 1)) * 100},${28 - ((v - min) / (max - min || 1)) * 24}`).join(" L");
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="block w-full" style={{ height: `${h}em` }} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c} stopOpacity=".35" />
          <stop offset="1" stopColor={c} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={`M0,30 L${d} L100,30 Z`} fill={`url(#${id})`} />}
      <path d={`M${d}`} fill="none" stroke={c} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Ring({ pct, t, size = 4.2, label }: { pct: number; t: Theme; size?: number; label: string }) {
  return (
    <span className="relative grid shrink-0 place-items-center" style={{ width: `${size}em`, height: `${size}em` }}>
      <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx="18" cy="18" r="15" fill="none" stroke={t.line} strokeWidth="4" />
        <circle cx="18" cy="18" r="15" fill="none" stroke={t.a} strokeWidth="4" strokeLinecap="round" pathLength={100} strokeDasharray={`${pct} 100`} />
      </svg>
      <Txt s={0.8} w={800} c={t.tx}>{label}</Txt>
    </span>
  );
}

function Progress({ pct, t, c }: { pct: number; t: Theme; c?: string }) {
  return (
    <div className="h-[.45em] overflow-hidden rounded-full" style={{ background: t.line }}>
      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: c ?? t.a }} />
    </div>
  );
}

function Check({ on, t }: { on: boolean; t: Theme }) {
  return (
    <span className="grid size-[1.5em] shrink-0 place-items-center rounded-full" style={on ? { background: t.a, color: t.on } : { border: `1.5px solid ${t.line}` }}>
      {on && <Ico name="check" size={0.8} sw={3.2} />}
    </span>
  );
}

// Deterministic QR-style code (decorative, no randomness so SSR and client match).
function QR({ fg, size = 7 }: { fg: string; size?: number }) {
  const n = 21;
  const finder = (x: number, y: number) => {
    for (const [fx, fy] of [[0, 0], [14, 0], [0, 14]]) {
      const dx = x - fx;
      const dy = y - fy;
      if (dx >= 0 && dx < 7 && dy >= 0 && dy < 7) return 1 + Number(dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx > 1 && dx < 5 && dy > 1 && dy < 5));
    }
    return 0;
  };
  const cells: ReactNode[] = [];
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const f = finder(x, y);
      const on = f ? f === 2 : ((x * 7 + y * 13 + x * y * 3) % 5 < 2) !== ((x + y) % 3 === 0);
      if (on) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" rx={f ? 0 : 0.2} />);
    }
  return (
    <svg viewBox={`0 0 ${n} ${n}`} style={{ width: `${size}em`, height: `${size}em` }} fill={fg} aria-hidden>
      {cells}
    </svg>
  );
}

function MapArt({ t, h = 14, children }: { t: Theme; h?: number; children?: ReactNode }) {
  const land = t.dark ? "#16181d" : "#eef1ec";
  const road = t.dark ? "#262a31" : "#ffffff";
  const park = t.dark ? "#152219" : "#d9ecd5";
  const water = t.dark ? "#10202c" : "#cfe6f5";
  return (
    <div className="relative overflow-hidden rounded-[1em]" style={{ height: `${h}em`, background: land }}>
      <svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
        <rect x="120" y="-10" width="100" height="60" rx="18" fill={water} />
        <rect x="-10" y="90" width="70" height="60" rx="14" fill={park} />
        <g stroke={road} strokeLinecap="round" fill="none">
          <path d="M-10 40 L210 70" strokeWidth="9" />
          <path d="M70 -10 L90 150" strokeWidth="8" />
          <path d="M150 -10 L130 150" strokeWidth="6" />
          <path d="M-10 110 L210 120" strokeWidth="6" />
          <path d="M20 -10 L40 150" strokeWidth="4" />
        </g>
        <path d="M30 118 C 60 112, 70 80, 82 64 S 125 60, 140 30" fill="none" stroke={t.a} strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="30" cy="118" r="5" fill="#fff" stroke={t.a} strokeWidth="3" />
      </svg>
      <span className="absolute grid size-[2.2em] -translate-x-1/2 -translate-y-full place-items-center rounded-full rounded-br-none rotate-45" style={{ left: "70%", top: "24%", background: t.a }}>
        <span className="size-[.7em] rounded-full -rotate-45" style={{ background: t.on }} />
      </span>
      {children}
    </div>
  );
}

function Photo({ c, h = 4, icon, className = "" }: { c: string; h?: number; icon?: string; className?: string }) {
  return (
    <div
      className={`relative grid place-items-center overflow-hidden rounded-[.8em] ${className}`}
      style={{ height: `${h}em`, background: `radial-gradient(120% 90% at 20% 10%, ${alpha(c, 0.55)}, transparent 60%), linear-gradient(145deg, ${c}, ${alpha(c, 0.55)})` }}
    >
      <span className="absolute -right-[1em] -bottom-[1em] size-[4em] rounded-full bg-white/20" />
      {icon && <Ico name={icon} size={h * 0.32} c="rgba(255,255,255,.9)" sw={1.6} />}
    </div>
  );
}

function Seg({ t, items, active = 0 }: { t: Theme; items: string[]; active?: number }) {
  return (
    <div className="mb-[.7em] flex gap-[.25em] rounded-[.8em] p-[.25em]" style={{ background: t.card }}>
      {items.map((s, i) => (
        <span key={s} className="flex-1 rounded-[.6em] py-[.45em] text-center" style={i === active ? { background: t.bg, boxShadow: "0 .15em .5em rgba(0,0,0,.12)" } : undefined}>
          <Txt s={0.6} w={700} c={i === active ? t.tx : t.mu}>{s}</Txt>
        </span>
      ))}
    </div>
  );
}

function Bubble({ t, me = false, children }: { t: Theme; me?: boolean; children: ReactNode }) {
  return (
    <div className={`max-w-[82%] rounded-[1em] px-[.8em] py-[.55em] ${me ? "self-end rounded-br-[.3em]" : "self-start rounded-bl-[.3em]"}`} style={me ? { background: t.a, color: t.on } : { background: t.card, color: t.tx }}>
      <Txt s={0.66}>{children}</Txt>
    </div>
  );
}

function TabBar({ t, icons, active = 0 }: { t: Theme; icons: string[]; active?: number }) {
  return (
    <div className="mt-auto flex items-center justify-around px-[1em] pt-[.7em] pb-[1.8em]" style={{ borderTop: `1px solid ${t.line}`, background: t.bg }}>
      {icons.map((n, i) => (
        <span key={n} className="grid place-items-center gap-[.2em]">
          <Ico name={n} size={1.05} c={i === active ? t.a : t.mu} />
          <span className="size-[.3em] rounded-full" style={{ background: i === active ? t.a : "transparent" }} />
        </span>
      ))}
    </div>
  );
}

/* ---------- phone shell ---------- */

function StatusBar({ t, light }: { t: Theme; light?: boolean }) {
  const c = light ? "#fff" : t.tx;
  return (
    <div className="relative z-20 flex items-center justify-between px-[1.5em] pt-[.95em] pb-[.5em]" style={{ color: c }}>
      <Txt s={0.7} w={700}>9:41</Txt>
      <span className="flex items-center gap-[.3em]">
        <svg viewBox="0 0 18 12" className="h-[.62em]" fill="currentColor" aria-hidden>
          <rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg viewBox="0 0 16 12" className="h-[.62em]" fill="currentColor" aria-hidden>
          <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .4 10.4 10.4 0 0 0 .8 3.3L2 4.6a8.6 8.6 0 0 1 6-2.4Zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.3-1.3A6.6 6.6 0 0 0 8 4a6.6 6.6 0 0 0-4.7 1.8l1.3 1.3C5.5 6.3 6.7 5.8 8 5.8Zm0 3.6c.5 0 .9.2 1.2.5L8 11.2 6.8 9.9c.3-.3.7-.5 1.2-.5Z" />
        </svg>
        <svg viewBox="0 0 26 12" className="h-[.62em]" aria-hidden>
          <rect x=".5" y=".5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity=".45" />
          <rect x="2" y="2" width="17" height="8" rx="1.8" fill="currentColor" />
          <rect x="23.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity=".45" />
        </svg>
      </span>
    </div>
  );
}

export function Phone({ t, children, flush = false, lightStatus = false, className = "", style }: { t: Theme; children: ReactNode; flush?: boolean; lightStatus?: boolean; className?: string; style?: CSSProperties }) {
  return (
    <div className={`@container ${className}`} style={style}>
      <div
        className="relative rounded-[15cqw] p-[2.6cqw]"
        style={{
          background: "linear-gradient(145deg,#3a3a3e,#111113 45%,#2a2a2d)",
          boxShadow: "0 0 0 .4cqw #4a4a4f inset, 0 3cqw 8cqw -2cqw rgba(0,0,0,.45), 0 10cqw 20cqw -8cqw rgba(0,0,0,.5)",
        }}
      >
        {/* side buttons */}
        <span className="absolute top-[22%] -left-[.9cqw] h-[7%] w-[1.2cqw] rounded-l-full bg-[#2a2a2d]" />
        <span className="absolute top-[31%] -left-[.9cqw] h-[11%] w-[1.2cqw] rounded-l-full bg-[#2a2a2d]" />
        <span className="absolute top-[27%] -right-[.9cqw] h-[14%] w-[1.2cqw] rounded-r-full bg-[#2a2a2d]" />
        <div className="relative flex aspect-[9/19.5] flex-col overflow-hidden rounded-[12.5cqw] text-[4.3cqw]" style={{ background: t.bg, color: t.tx }}>
          {/* dynamic island */}
          <span className="absolute top-[.7em] left-1/2 z-30 h-[1.75em] w-[6.2em] -translate-x-1/2 rounded-full bg-black" />
          {flush ? (
            children
          ) : (
            <>
              <StatusBar t={t} light={lightStatus} />
              {children}
            </>
          )}
          {/* home indicator + glass sheen */}
          <span className="absolute bottom-[.6em] left-1/2 z-30 h-[.3em] w-[7em] -translate-x-1/2 rounded-full" style={{ background: t.dark || lightStatus ? "rgba(255,255,255,.55)" : "rgba(0,0,0,.35)" }} />
          <span className="pointer-events-none absolute inset-0 z-40 bg-[linear-gradient(115deg,rgba(255,255,255,.14)_0%,transparent_28%,transparent_70%,rgba(255,255,255,.05)_100%)]" />
        </div>
      </div>
    </div>
  );
}

const Body = ({ children, className = "" }: { children: ReactNode; className?: string }) => <div className={`flex flex-1 flex-col px-[1.1em] pt-[.4em] ${className}`}>{children}</div>;

/* ---------- screens ---------- */

type Pair = { front: (t: Theme) => ReactNode; back: (t: Theme) => ReactNode; toast: { icon: string; title: string; sub: string } };

const helpdesk: Pair = {
  front: (t) => (
    <>
      <Body>
        <Header t={t} title="Inbox" sub="128 open · 6 near SLA" right={<Avatar i={2} label="JD" size={2.1} />} />
        <Seg t={t} items={["All 128", "Mine 12", "SLA 6"]} />
        <Row t={t} lead={<IconTile name="mail" c={AMBER} />} title="Order #4821 hasn't arrived" sub="Email · Maya Chen" right={<Pill bg={alpha(RED, 0.14)} fg={RED}>High</Pill>} />
        <Row t={t} lead={<IconTile name="spark" c={t.a} />} title="Can I change my plan?" sub="Chat · Leo Park · 5m" right={<Pill bg={t.soft} fg={t.a}>AI draft</Pill>} />
        <Row t={t} lead={<IconTile name="phone" c={GREEN} />} title="Refund for double charge" sub="Voice · Aisha Khan · 12m" />
        <Row t={t} lead={<IconTile name="share" c="#7c3aed" />} title="Loving the new update" sub="Social · @danrivera · 18m" />
        <Row t={t} lead={<IconTile name="mail" c="#0891b2" />} title="Invoice copy for September" sub="Email · Northwind · 26m" last />
      </Body>
      <TabBar t={t} icons={["mail", "users", "chart", "menu"]} />
    </>
  ),
  back: (t) => (
    <>
      <Body>
        <Header t={t} title="#4821" sub="Maya Chen · Shopify" back right={<Pill bg={alpha(RED, 0.14)} fg={RED}>SLA 42m</Pill>} />
        <div className="flex flex-col gap-[.45em]">
          <Bubble t={t}>Hi, my order #4821 still hasn&apos;t arrived. It&apos;s been 6 days.</Bubble>
          <Bubble t={t} me>Checking with the courier now.</Bubble>
        </div>
        <Card t={t} className="mt-[.7em]" style={{ background: t.soft, border: `1px solid ${alpha(t.a, 0.35)}` }}>
          <div className="flex items-center gap-[.35em]">
            <Ico name="spark" size={0.75} c={t.a} />
            <Txt s={0.6} w={800} c={t.a}>COPILOT SUGGESTION</Txt>
          </div>
          <Txt s={0.64} c={t.tx} className="mt-[.35em]">Sorry for the wait, Maya. Your parcel is out for delivery today and should arrive by 6 PM.</Txt>
          <div className="mt-[.55em] flex gap-[.35em]">
            <Pill bg={t.a} fg={t.on}>Insert</Pill>
            <Pill bg={t.bg} fg={t.tx}>Rephrase</Pill>
          </div>
        </Card>
      </Body>
      <div className="mx-[1.1em] mt-auto mb-[2em] flex h-[2.4em] items-center justify-between rounded-full px-[.9em]" style={{ background: t.card }}>
        <Txt s={0.62} c={t.mu}>Reply to Maya…</Txt>
        <span className="grid size-[1.7em] place-items-center rounded-full" style={{ background: t.a, color: t.on }}>
          <Ico name="arrow" size={0.7} />
        </span>
      </div>
    </>
  ),
  toast: { icon: "bolt", title: "Auto-triaged", sub: "Routed to Billing · 0.4s" },
};

const legal: Pair = {
  front: (t) => (
    <>
      <Body>
        <Header t={t} title="Today" sub="Good morning, Ana" right={<Avatar i={1} label="AR" size={2.1} />} />
        <div className="rounded-[1.1em] p-[.9em]" style={{ background: `linear-gradient(140deg, ${t.a}, ${alpha(t.a, 0.75)})`, color: t.on }}>
          <div className="flex items-center justify-between">
            <Txt s={0.62} w={700} style={{ opacity: 0.8 }}>Harper v. Lane · Drafting</Txt>
            <span className="size-[.55em] animate-pulse rounded-full bg-white" />
          </div>
          <Txt s={1.9} w={800} className="mt-[.2em] tracking-[-.02em] tabular-nums">02:14:36</Txt>
          <div className="mt-[.5em] flex gap-[.35em]">
            <Pill bg="rgba(255,255,255,.22)" fg={t.on}>Pause</Pill>
            <Pill bg="rgba(255,255,255,.95)" fg="#111">Log time</Pill>
          </div>
        </div>
        <div className="mt-[.6em] grid grid-cols-2 gap-[.5em]">
          <Card t={t}><Txt s={0.58} c={t.mu}>Billable today</Txt><Txt s={1.05} w={800} c={t.tx}>6.4h</Txt></Card>
          <Card t={t}><Txt s={0.58} c={t.mu}>Unbilled</Txt><Txt s={1.05} w={800} c={t.tx}>$3,920</Txt></Card>
        </div>
        <Txt s={0.66} w={750} c={t.tx} className="mt-[.8em]">Matters</Txt>
        <Row t={t} lead={<IconTile name="briefcase" c={t.a} />} title="Harper v. Lane" sub="Litigation · Hearing 14 Oct" right={<Txt s={0.62} w={700} c={t.tx}>$12.4k</Txt>} />
        <Row t={t} lead={<IconTile name="doc" c={AMBER} />} title="Estate of R. Cole" sub="Probate · 3 tasks" right={<Txt s={0.62} w={700} c={t.tx}>$4.1k</Txt>} last />
      </Body>
      <TabBar t={t} icons={["home", "briefcase", "clock", "doc"]} />
    </>
  ),
  back: (t) => (
    <Body>
      <Header t={t} title="INV-2041" sub="Harper v. Lane" back />
      <Txt s={0.6} c={t.mu}>Amount due</Txt>
      <Txt s={1.8} w={800} c={t.tx} className="tracking-[-.02em]">$4,860.00</Txt>
      <Pill bg={alpha(AMBER, 0.16)} fg="#b45309">Due in 7 days</Pill>
      <div className="mt-[.6em]">
        <Row t={t} title="Legal research" sub="3.2h × $350" right={<Txt s={0.62} w={700} c={t.tx}>$1,120</Txt>} />
        <Row t={t} title="Drafting motion" sub="4.5h × $350" right={<Txt s={0.62} w={700} c={t.tx}>$1,575</Txt>} />
        <Row t={t} title="Court filing fee" sub="Expense" right={<Txt s={0.62} w={700} c={t.tx}>$165</Txt>} last />
      </div>
      <Card t={t} className="mt-[.5em] flex items-center justify-between">
        <div><Txt s={0.58} c={t.mu}>Trust balance</Txt><Txt s={0.9} w={800} c={t.tx}>$12,400</Txt></div>
        <Ico name="lock" size={1.1} c={t.a} />
      </Card>
      <div className="mt-[.7em]"><Btn t={t}>Pay from trust</Btn></div>
    </Body>
  ),
  toast: { icon: "check", title: "Invoice paid", sub: "$4,860 · via eCheck" },
};

const hrms: Pair = {
  front: (t) => (
    <>
      <Body>
        <Header t={t} title="Hi, Priya" sub="Product Design · Bengaluru" right={<Avatar i={4} label="PS" size={2.1} />} />
        <div className="relative overflow-hidden rounded-[1.1em] p-[.9em]" style={{ background: `linear-gradient(140deg, ${t.a}, ${alpha(t.a, 0.6)})`, color: t.on }}>
          <span className="absolute -top-[2em] -right-[2em] size-[6em] rounded-full bg-white/15" />
          <Txt s={0.6} w={700} style={{ opacity: 0.85 }}>Checked in · 09:02 AM</Txt>
          <Txt s={1.7} w={800} className="mt-[.15em] tracking-[-.02em] tabular-nums">06h 12m</Txt>
          <div className="mt-[.5em]"><Pill bg="rgba(255,255,255,.95)" fg="#111">Check out</Pill></div>
        </div>
        <div className="mt-[.6em] grid grid-cols-3 gap-[.4em]">
          {[["12", "Leave days"], ["3", "WFH left"], ["1", "Review due"]].map(([v, l]) => (
            <Card t={t} key={l} className="!p-[.6em]"><Txt s={1} w={800} c={t.tx}>{v}</Txt><Txt s={0.54} c={t.mu}>{l}</Txt></Card>
          ))}
        </div>
        <Txt s={0.66} w={750} c={t.tx} className="mt-[.8em]">Requests</Txt>
        <Row t={t} lead={<IconTile name="calendar" c={GREEN} />} title="Leave · Oct 14–16" sub="Approved by Rahul" right={<Pill bg={alpha(GREEN, 0.18)} fg="#4ade80">Approved</Pill>} />
        <Row t={t} lead={<IconTile name="plane" c={AMBER} />} title="Travel claim · ₹8,240" sub="Client visit, Pune" right={<Pill bg={alpha(AMBER, 0.18)} fg={AMBER}>Pending</Pill>} last />
      </Body>
      <TabBar t={t} icons={["home", "calendar", "users", "menu"]} />
    </>
  ),
  back: (t) => (
    <Body>
      <Header t={t} title="Payslip" sub="September 2026" back right={<Ico name="download" size={1} c={t.a} />} />
      <Card t={t}>
        <Txt s={0.6} c={t.mu}>Net pay</Txt>
        <Txt s={1.6} w={800} c={t.tx} className="tracking-[-.02em]">₹1,42,500</Txt>
        <div className="mt-[.6em] flex h-[.6em] overflow-hidden rounded-full">
          <span className="w-[48%]" style={{ background: t.a }} />
          <span className="w-[22%]" style={{ background: alpha(t.a, 0.6) }} />
          <span className="w-[18%]" style={{ background: alpha(t.a, 0.35) }} />
          <span className="w-[12%]" style={{ background: RED }} />
        </div>
      </Card>
      <div className="mt-[.4em]">
        {[["Basic", "₹82,000", 1], ["HRA", "₹36,000", 0.6], ["Allowances", "₹31,200", 0.35], ["Deductions", "−₹6,700", 0]].map(([l, v, o]) => (
          <Row key={l as string} t={t} lead={<span className="size-[.7em] rounded-full" style={{ background: o ? alpha(t.a, o as number) : RED }} />} title={l} right={<Txt s={0.64} w={700} c={t.tx}>{v}</Txt>} />
        ))}
      </div>
      <div className="mt-[.8em]"><Btn t={t}>Download PDF</Btn></div>
    </Body>
  ),
  toast: { icon: "users", title: "Leave approved", sub: "Oct 14–16 · by Rahul" },
};

const fieldService: Pair = {
  front: (t) => (
    <>
      <Body>
        <Header t={t} title="6 jobs today" sub="Thursday, Oct 2" right={<span className="grid size-[2.1em] place-items-center rounded-full" style={{ background: t.a, color: t.on }}><Ico name="plus" size={0.9} /></span>} />
        <div className="mb-[.7em] flex justify-between">
          {["M", "T", "W", "T", "F", "S"].map((d, i) => (
            <span key={i} className="grid w-[2.4em] place-items-center gap-[.1em] rounded-[.7em] py-[.4em]" style={i === 3 ? { background: t.a, color: t.on } : { color: t.mu }}>
              <Txt s={0.54} w={700}>{d}</Txt>
              <Txt s={0.8} w={800}>{29 + i > 30 ? i - 1 : 29 + i}</Txt>
            </span>
          ))}
        </div>
        {[
          ["08:30", "Lawn care", "42 Elm St · Crew A", "Done", GREEN],
          ["10:15", "Gutter cleaning", "9 Oak Ave · Crew B", "En route", t.a],
          ["13:00", "Quote visit", "118 Pine Rd · You", "", ""],
          ["15:30", "Hedge trimming", "7 Birch Ln · Crew A", "", ""],
        ].map(([time, job, where, st, c], i) => (
          <div key={i} className="flex gap-[.6em] pb-[.5em]">
            <Txt s={0.58} w={700} c={t.mu} className="w-[2.6em] pt-[.4em] tabular-nums">{time}</Txt>
            <div className="flex-1 rounded-[.8em] p-[.55em] pl-[.7em]" style={{ background: t.card, borderLeft: `.25em solid ${c || alpha(t.a, 0.3)}` }}>
              <div className="flex items-center justify-between gap-[.3em]">
                <Txt s={0.68} w={700} c={t.tx}>{job}</Txt>
                {st && <Pill bg={alpha(c, 0.15)} fg={c}>{st}</Pill>}
              </div>
              <Txt s={0.56} c={t.mu}>{where}</Txt>
            </div>
          </div>
        ))}
      </Body>
      <TabBar t={t} icons={["calendar", "pin", "doc", "users"]} />
    </>
  ),
  back: (t) => (
    <div className="relative flex flex-1 flex-col">
      <MapArt t={t} h={30} />
      <div className="absolute inset-x-0 bottom-0 rounded-t-[1.4em] px-[1.1em] pt-[.5em] pb-[2.2em]" style={{ background: t.bg, boxShadow: "0 -.5em 2em rgba(0,0,0,.15)" }}>
        <span className="mx-auto mb-[.6em] block h-[.3em] w-[2.6em] rounded-full" style={{ background: t.line }} />
        <Txt s={0.58} w={700} c={t.a}>NEXT JOB</Txt>
        <Txt s={1} w={800} c={t.tx}>9 Oak Ave</Txt>
        <Txt s={0.6} c={t.mu}>Gutter cleaning · Crew B</Txt>
        <div className="my-[.6em] flex gap-[.4em]">
          <Pill bg={t.soft} fg={t.a}>12 min</Pill>
          <Pill bg={t.card} fg={t.tx}>4.2 km</Pill>
        </div>
        <Btn t={t}>Start route</Btn>
      </div>
    </div>
  ),
  toast: { icon: "truck", title: "Crew B on the way", sub: "ETA 12 min · client notified" },
};

const property: Pair = {
  front: (t) => (
    <>
      <Body>
        <Header t={t} title="Portfolio" sub="Sunset Apartments · 48 units" right={<Avatar i={5} label="MK" size={2.1} />} />
        <Card t={t} className="flex items-center gap-[.8em]">
          <Ring pct={96} t={t} label="96%" />
          <div className="flex-1">
            <Txt s={0.58} c={t.mu}>Rent collected · Oct</Txt>
            <Txt s={1.15} w={800} c={t.tx}>$184.2k</Txt>
            <Txt s={0.56} c={t.mu} className="mb-[.3em]">of $192.0k expected</Txt>
            <Progress pct={96} t={t} />
          </div>
        </Card>
        <Card t={t} className="mt-[.5em]">
          <div className="mb-[.5em] flex justify-between"><Txt s={0.62} w={700} c={t.tx}>Net income</Txt><Txt s={0.58} w={700} c={GREEN}>+8.4%</Txt></div>
          <Bars vals={[52, 60, 58, 66, 70, 64, 78, 84]} t={t} hi={7} h={3} />
        </Card>
        <Row t={t} lead={<IconTile name="home" c={t.a} />} title="Unit 4B · lease renewal" sub="Expires in 30 days" right={<Pill bg={t.soft} fg={t.a}>Renew</Pill>} />
        <Row t={t} lead={<IconTile name="doc" c={AMBER} />} title="3 applications" sub="Screening in progress" last />
      </Body>
      <TabBar t={t} icons={["home", "users", "bolt", "chart"]} />
    </>
  ),
  back: (t) => (
    <Body>
      <Header t={t} title="Maintenance" sub="5 open requests" back />
      <Seg t={t} items={["Open", "Scheduled", "Done"]} />
      {[
        ["Leaking kitchen faucet", "Unit 12A · Plumbing", "Urgent", RED],
        ["AC not cooling", "Unit 7C · HVAC · Fri 10am", "Scheduled", t.a],
        ["Front door lock", "Unit 2B · Locksmith", "Assigned", AMBER],
        ["Hallway light out", "Block B · Electrical", "Done", GREEN],
      ].map(([a, b, s, c], i, arr) => (
        <Row key={a} t={t} lead={<Photo c={c} h={2.2} icon="bolt" className="w-[2.2em]" />} title={a} sub={b} right={<Pill bg={alpha(c, 0.14)} fg={c}>{s}</Pill>} last={i === arr.length - 1} />
      ))}
      <div className="mt-[.8em]"><Btn t={t}>+ New request</Btn></div>
    </Body>
  ),
  toast: { icon: "home", title: "Rent received", sub: "Unit 4B · $2,150" },
};

const sharedInbox: Pair = {
  front: (t) => (
    <>
      <Body>
        <Header t={t} title="Support" sub="Shared inbox · 4 agents" right={<div className="flex -space-x-[.5em]">{[0, 3, 4].map((i) => <span key={i} className="rounded-full ring-2" style={{ ["--tw-ring-color" as string]: t.bg }}><Avatar i={i} label={["SK", "JL", "AM"][i % 3]} size={1.7} /></span>)}</div>} />
        <Seg t={t} items={["Unassigned 8", "Mine 3", "Closed"]} />
        {[
          ["Export to CSV is failing", "Ravi · 3m", "Bug", RED, 0],
          ["Upgrade to annual plan?", "Hannah · 9m", "Billing", t.a, 3],
          ["SSO setup with Okta", "Tom · 21m", "Setup", "#7c3aed", 4],
          ["Thanks, that fixed it!", "Grace · 1h", "Resolved", GREEN, 1],
        ].map(([s, who, tag, c, i], k, arr) => (
          <Row key={s as string} t={t} lead={<Avatar i={i as number} label={(who as string).slice(0, 1)} />} title={s} sub={who} right={<Pill bg={alpha(c as string, 0.12)} fg={c as string}>{tag}</Pill>} last={k === arr.length - 1} />
        ))}
        <div className="mt-[.5em] flex items-center gap-[.4em] rounded-[.8em] px-[.7em] py-[.5em]" style={{ background: alpha(AMBER, 0.12) }}>
          <Ico name="eye" size={0.8} c="#b45309" />
          <Txt s={0.58} w={650} c="#b45309">Sam is replying to Hannah</Txt>
        </div>
      </Body>
      <TabBar t={t} icons={["mail", "book", "chart", "menu"]} />
    </>
  ),
  back: (t) => (
    <div className="flex flex-1 flex-col">
      <div className="pb-[2.4em]" style={{ background: `linear-gradient(160deg, ${t.a}, ${alpha(t.a, 0.75)})`, color: t.on }}>
        <StatusBar t={t} light />
        <div className="px-[1.1em] pt-[.8em]">
        <div className="flex -space-x-[.5em]">{[1, 3, 4].map((i) => <Avatar key={i} i={i} label={["M", "J", "S"][i % 3]} size={1.9} />)}</div>
        <Txt s={1.25} w={800} className="mt-[.5em] tracking-[-.02em]">Hi there! How can we help?</Txt>
        <Txt s={0.6} className="mt-[.2em] opacity-85">We usually reply in 5 minutes</Txt>
        </div>
      </div>
      <div className="-mt-[1.6em] px-[1.1em]">
        <div className="rounded-[1em] p-[.8em]" style={{ background: t.bg, boxShadow: "0 .6em 1.6em -.4em rgba(0,0,0,.18)" }}>
          <div className="flex items-center gap-[.4em] rounded-[.7em] px-[.6em] py-[.5em]" style={{ background: t.card }}>
            <Ico name="search" size={0.75} c={t.mu} />
            <Txt s={0.6} c={t.mu}>Search articles</Txt>
          </div>
          {["Resetting your password", "Exporting your data", "Inviting teammates"].map((a, i) => (
            <Row key={a} t={t} title={a} right={<Ico name="chevron" size={0.7} c={t.mu} />} last={i === 2} />
          ))}
        </div>
        <div className="mt-[.7em]"><Btn t={t}>Chat with us</Btn></div>
      </div>
    </div>
  ),
  toast: { icon: "users", title: "Sam is viewing", sub: "Collision detection on" },
};

const telehealth: Pair = {
  front: (t) => (
    <div className="relative flex flex-1 flex-col" style={{ background: "radial-gradient(90% 60% at 50% 35%, #3b3fae, #12123a 70%)" }}>
      <div className="absolute inset-x-0 top-0 z-10">
        <StatusBar t={t} light />
      </div>
      {/* doctor silhouette */}
      <div className="absolute inset-x-0 top-[22%] flex flex-col items-center">
        <span className="size-[6.5em] rounded-full" style={{ background: "linear-gradient(160deg,#f1c7a8,#c98f6e)" }} />
        <span className="-mt-[.6em] h-[9em] w-[15em] rounded-t-[7em]" style={{ background: "linear-gradient(180deg,#f5f7ff,#c9d0f2)" }} />
      </div>
      <div className="relative z-10 mx-[1em] mt-[3.2em] flex items-start justify-between">
        <div className="rounded-[.8em] bg-black/35 px-[.7em] py-[.45em] backdrop-blur">
          <Txt s={0.68} w={750} c="#fff">Dr. Meera Rao</Txt>
          <Txt s={0.56} c="rgba(255,255,255,.75)">Cardiology · 12:48</Txt>
        </div>
        <div className="h-[6em] w-[4.4em] overflow-hidden rounded-[.9em] border-2 border-white/60" style={{ background: "linear-gradient(160deg,#2a2d5e,#16173a)" }}>
          <span className="mx-auto mt-[1.2em] block size-[1.9em] rounded-full" style={{ background: "linear-gradient(160deg,#8d5a3b,#5e3a24)" }} />
          <span className="mx-auto -mt-[.2em] block h-[2.4em] w-[3.4em] rounded-t-[2em]" style={{ background: t.a }} />
        </div>
      </div>
      <div className="relative z-10 mx-auto mt-[.6em] flex items-center gap-[.4em] rounded-full bg-black/35 px-[.7em] py-[.3em] backdrop-blur">
        <Ico name="lock" size={0.62} c={t.a} />
        <Txt s={0.54} w={700} c="#fff">Encrypted</Txt>
      </div>
      <div className="relative z-10 mt-auto mb-[2.4em] flex justify-center gap-[.7em]">
        {[["phone", RED], ["users", "rgba(255,255,255,.2)"], ["eye", "rgba(255,255,255,.2)"], ["mail", "rgba(255,255,255,.2)"]].map(([n, bg]) => (
          <span key={n} className="grid size-[2.6em] place-items-center rounded-full backdrop-blur" style={{ background: bg }}>
            <Ico name={n} size={0.95} c="#fff" />
          </span>
        ))}
      </div>
    </div>
  ),
  back: (t) => (
    <Body>
      <Header t={t} title="Your visit" sub="Harbor Heart Clinic" />
      <div className="rounded-[1.1em] p-[.9em]" style={{ background: `linear-gradient(140deg, ${alpha(t.a, 0.28)}, ${alpha(t.a, 0.08)})`, border: `1px solid ${alpha(t.a, 0.3)}` }}>
        <div className="flex items-center gap-[.6em]">
          <Avatar i={4} label="MR" size={2.4} />
          <div><Txt s={0.72} w={750} c={t.tx}>Dr. Meera Rao</Txt><Txt s={0.58} c={t.mu}>Follow-up consultation</Txt></div>
        </div>
        <div className="mt-[.7em] flex gap-[.4em]">
          <Pill bg={t.a} fg={t.on}>Today</Pill>
          <Pill bg={t.card} fg={t.tx}>10:30 AM</Pill>
          <Pill bg={t.card} fg={t.tx}>20 min</Pill>
        </div>
      </div>
      <Txt s={0.66} w={750} c={t.tx} className="mt-[.9em] mb-[.2em]">Device check</Txt>
      {[["Camera", "FaceTime HD"], ["Microphone", "Built-in"], ["Connection", "Excellent · 48 Mbps"]].map(([a, b], i) => (
        <Row key={a} t={t} lead={<Check on t={t} />} title={a} sub={b} last={i === 2} />
      ))}
      <div className="mt-[.8em]"><Btn t={t}>Join from browser</Btn></div>
      <Txt s={0.56} c={t.mu} className="mt-[.5em] text-center">No app or download needed</Txt>
    </Body>
  ),
  toast: { icon: "lock", title: "Secure session", sub: "HIPAA-compliant video" },
};

const tradeJob: Pair = {
  front: (t) => (
    <>
      <Body>
        <Header t={t} title="Bathroom refit" sub="Job #1042 · Hughes family" back right={<Pill bg={t.soft} fg={t.a}>In progress</Pill>} />
        <div className="flex gap-[.4em]">
          <Photo c="#0891b2" h={4.2} icon="home" className="flex-1" />
          <Photo c="#a16207" h={4.2} icon="grid" className="flex-1" />
          <Photo c={t.a} h={4.2} icon="plus" className="w-[3em]" />
        </div>
        <div className="mt-[.9em] flex flex-col">
          {[["Quote sent", "Sep 24 · $2,340", 1], ["Quote approved", "Signed online", 1], ["Scheduled", "Thu 09:00 · Crew of 2", 1], ["Work in progress", "Day 2 of 3", 0], ["Invoice & payment", "Auto-sent on completion", -1]].map(([a, b, s], i, arr) => (
            <div key={a as string} className="flex gap-[.6em]">
              <div className="flex flex-col items-center">
                <span className="grid size-[1.5em] place-items-center rounded-full" style={s === 1 ? { background: t.a, color: t.on } : s === 0 ? { border: `.2em solid ${t.a}`, background: t.bg } : { border: `1.5px solid ${t.line}` }}>
                  {s === 1 && <Ico name="check" size={0.75} sw={3.2} />}
                </span>
                {i < arr.length - 1 && <span className="w-[.15em] flex-1" style={{ background: s === 1 ? t.a : t.line, minHeight: "1.2em" }} />}
              </div>
              <div className="pb-[.55em]">
                <Txt s={0.68} w={700} c={s === -1 ? t.mu : t.tx}>{a}</Txt>
                <Txt s={0.56} c={t.mu}>{b}</Txt>
              </div>
            </div>
          ))}
        </div>
      </Body>
      <TabBar t={t} icons={["briefcase", "calendar", "doc", "users"]} />
    </>
  ),
  back: (t) => (
    <Body>
      <Header t={t} title="Invoice #1042" sub="Hughes family" back />
      <Card t={t} className="relative overflow-hidden">
        <Txt s={0.58} c={t.mu}>Total</Txt>
        <Txt s={1.6} w={800} c={t.tx} className="tracking-[-.02em]">$2,340.00</Txt>
        <span className="absolute top-[.8em] right-[.8em] rotate-[-8deg] rounded-[.4em] border-2 px-[.5em] py-[.1em]" style={{ borderColor: GREEN, color: GREEN }}>
          <Txt s={0.7} w={900}>PAID</Txt>
        </span>
      </Card>
      <div className="mt-[.4em]">
        <Row t={t} title="Labour" sub="2 × 16h" right={<Txt s={0.62} w={700} c={t.tx}>$1,440</Txt>} />
        <Row t={t} title="Tiles & fixtures" sub="Materials" right={<Txt s={0.62} w={700} c={t.tx}>$760</Txt>} />
        <Row t={t} title="Waste disposal" sub="Skip hire" right={<Txt s={0.62} w={700} c={t.tx}>$140</Txt>} last />
      </div>
      <div className="mt-[.5em] flex items-center gap-[.5em] rounded-[.8em] px-[.7em] py-[.55em]" style={{ background: t.soft }}>
        <Ico name="check" size={0.8} c={t.a} sw={3} />
        <Txt s={0.6} w={650} c={t.tx}>Synced to Xero · 2 min ago</Txt>
      </div>
    </Body>
  ),
  toast: { icon: "check", title: "Quote approved", sub: "$2,340 · signed online" },
};

const landlord: Pair = {
  front: (t) => (
    <>
      <Body>
        <Header t={t} title="October rent" sub="3 properties · 6 units" right={<Avatar i={6} label="DL" size={2.1} />} />
        <div className="rounded-[1.1em] p-[.9em]" style={{ background: `linear-gradient(140deg, ${t.a}, ${alpha(t.a, 0.7)})`, color: t.on }}>
          <Txt s={0.6} w={700} style={{ opacity: 0.85 }}>Collected</Txt>
          <div className="flex items-baseline gap-[.3em]">
            <Txt s={1.8} w={800} className="tracking-[-.02em]">$8,450</Txt>
            <Txt s={0.62} style={{ opacity: 0.8 }}>of $9,200</Txt>
          </div>
          <div className="mt-[.5em] h-[.45em] overflow-hidden rounded-full bg-white/25"><div className="h-full w-[92%] rounded-full bg-white" /></div>
        </div>
        <Txt s={0.66} w={750} c={t.tx} className="mt-[.8em]">Tenants</Txt>
        {[["Jordan Lee", "Unit 1 · $1,600", "Paid", GREEN, 2], ["Priya Nair", "Unit 2 · $1,450", "Paid", GREEN, 4], ["Sam Ortiz", "Unit 3 · $750", "Due in 2d", AMBER, 3], ["Chloe Martin", "Unit 4 · $1,700", "Paid", GREEN, 1]].map(([n, u, s, c, i], k, arr) => (
          <Row key={n as string} t={t} lead={<Avatar i={i as number} label={(n as string).split(" ").map((w) => w[0]).join("")} />} title={n} sub={u} right={<Pill bg={alpha(c as string, 0.14)} fg={c as string}>{s}</Pill>} last={k === arr.length - 1} />
        ))}
      </Body>
      <TabBar t={t} icons={["home", "users", "doc", "menu"]} />
    </>
  ),
  back: (t) => (
    <Body>
      <Header t={t} title="Lease agreement" sub="Unit 3 · 12 months" back />
      <Card t={t} className="flex flex-col gap-[.4em]" style={{ background: t.bg, border: `1px solid ${t.line}` }}>
        {[100, 92, 96, 70, 100, 88, 60].map((w, i) => (
          <span key={i} className="h-[.4em] rounded-full" style={{ width: `${w}%`, background: t.line }} />
        ))}
        <div className="mt-[.4em] flex justify-between"><Txt s={0.56} c={t.mu}>Monthly rent</Txt><Txt s={0.6} w={750} c={t.tx}>$750.00</Txt></div>
        <div className="flex justify-between"><Txt s={0.56} c={t.mu}>Deposit</Txt><Txt s={0.6} w={750} c={t.tx}>$1,500.00</Txt></div>
      </Card>
      <Txt s={0.6} w={700} c={t.mu} className="mt-[.8em] mb-[.3em]">Tenant signature</Txt>
      <div className="grid h-[4.4em] place-items-center rounded-[.9em]" style={{ background: t.card, border: `1.5px dashed ${alpha(t.a, 0.6)}` }}>
        <svg viewBox="0 0 120 40" className="h-[2.6em]" fill="none" stroke={t.tx} strokeWidth="2.2" strokeLinecap="round" aria-hidden>
          <path d="M8 28c6-14 12-20 15-14s-6 16 0 12 9-18 14-16 0 14 5 12 7-9 11-7 2 9 7 6 8-10 14-8 4 7 9 5 10-6 22-4" />
        </svg>
      </div>
      <div className="mt-[.8em]"><Btn t={t}>Sign lease</Btn></div>
    </Body>
  ),
  toast: { icon: "check", title: "Rent paid online", sub: "Unit 2 · $1,450" },
};

const inventory: Pair = {
  front: (t) => (
    <>
      <Body>
        <Header t={t} title="Inventory" sub="Van 2 · 214 items" right={<span className="grid size-[2.1em] place-items-center rounded-full" style={{ background: t.a, color: t.on }}><Ico name="grid" size={0.85} /></span>} />
        <div className="mb-[.7em] flex items-center gap-[.4em] rounded-[.8em] px-[.7em] py-[.55em]" style={{ background: t.card }}>
          <Ico name="search" size={0.75} c={t.mu} />
          <Txt s={0.6} c={t.mu}>Search tools, parts, tags</Txt>
        </div>
        <div className="grid grid-cols-2 gap-[.5em]">
          {[["Cordless drill", "Qty 4", "#1a69fd", "bolt", ""], ["Safety gloves", "Qty 3", RED, "shield", "Low"], ["Ladder 8ft", "Qty 2", "#16a34a", "up", ""], ["Laser level", "Qty 1", "#7c3aed", "target", ""]].map(([n, q, c, ic, low]) => (
            <div key={n} className="rounded-[.9em] p-[.4em]" style={{ background: t.card }}>
              <div className="relative">
                <Photo c={c} h={4} icon={ic} />
                {low && <span className="absolute top-[.35em] right-[.35em]"><Pill bg="#fff" fg={RED}>{low}</Pill></span>}
              </div>
              <Txt s={0.62} w={700} c={t.tx} className="mt-[.35em] truncate px-[.2em]">{n}</Txt>
              <Txt s={0.54} c={t.mu} className="px-[.2em] pb-[.2em]">{q}</Txt>
            </div>
          ))}
        </div>
      </Body>
      <TabBar t={t} icons={["grid", "search", "chart", "users"]} />
    </>
  ),
  back: (t) => (
    <div className="relative flex flex-1 flex-col" style={{ background: "linear-gradient(180deg,#2b2f36,#15171b)" }}>
      <div className="absolute inset-x-0 top-0 z-10"><StatusBar t={t} light /></div>
      <div className="relative mx-auto mt-[5em] grid size-[12em] place-items-center">
        {["top-0 left-0 border-t-[.3em] border-l-[.3em] rounded-tl-[1em]", "top-0 right-0 border-t-[.3em] border-r-[.3em] rounded-tr-[1em]", "bottom-0 left-0 border-b-[.3em] border-l-[.3em] rounded-bl-[1em]", "bottom-0 right-0 border-r-[.3em] border-b-[.3em] rounded-br-[1em]"].map((c) => (
          <span key={c} className={`absolute size-[2.4em] ${c}`} style={{ borderColor: t.a }} />
        ))}
        <div className="rounded-[.6em] bg-white p-[.6em]"><QR fg="#111" size={7} /></div>
        <span className="absolute inset-x-[.6em] top-[55%] h-[.2em] rounded-full" style={{ background: t.a, boxShadow: `0 0 1.2em .3em ${alpha(t.a, 0.7)}` }} />
      </div>
      <Txt s={0.62} w={600} c="rgba(255,255,255,.7)" className="mt-[1em] text-center">Point at a barcode or QR label</Txt>
      <div className="mx-[1em] mt-auto mb-[2.2em] rounded-[1.1em] bg-white p-[.8em]">
        <div className="flex items-center gap-[.6em]">
          <Photo c="#16a34a" h={2.6} icon="up" className="w-[2.6em]" />
          <div className="flex-1"><Txt s={0.7} w={750} c="#111">Ladder 8ft</Txt><Txt s={0.56} c="rgba(0,0,0,.5)">Warehouse A · Shelf 3</Txt></div>
          <Pill bg={alpha(GREEN, 0.14)} fg={GREEN}>Found</Pill>
        </div>
      </div>
    </div>
  ),
  toast: { icon: "bolt", title: "Low stock", sub: "Safety gloves · 3 left" },
};

const construction: Pair = {
  front: (t) => (
    <>
      <Body>
        <Header t={t} title="Daily report" sub="Riverside Tower · Level 12" right={<Pill bg={t.soft} fg={t.a}>Oct 2</Pill>} />
        <Card t={t} className="flex items-center justify-between">
          <div className="flex items-center gap-[.5em]"><Ico name="cloud" size={1.4} c={t.a} /><div><Txt s={0.9} w={800} c={t.tx}>18°C</Txt><Txt s={0.56} c={t.mu}>Partly cloudy · wind 12 km/h</Txt></div></div>
          <Pill bg={alpha(GREEN, 0.18)} fg="#4ade80">Workable</Pill>
        </Card>
        <Txt s={0.66} w={750} c={t.tx} className="mt-[.8em]">Crew hours</Txt>
        {[["Framing", "6 workers", "48h", 80], ["Electrical", "3 workers", "24h", 45], ["Concrete", "4 workers", "30h", 60]].map(([a, b, h, p]) => (
          <div key={a as string} className="py-[.45em]">
            <div className="mb-[.3em] flex justify-between"><Txt s={0.66} w={700} c={t.tx}>{a} <span style={{ color: t.mu, fontWeight: 500 }}>· {b}</span></Txt><Txt s={0.62} w={750} c={t.tx}>{h}</Txt></div>
            <Progress pct={p as number} t={t} />
          </div>
        ))}
        <Txt s={0.66} w={750} c={t.tx} className="mt-[.6em] mb-[.4em]">Site photos · 14</Txt>
        <div className="grid grid-cols-3 gap-[.35em]">
          <Photo c="#78716c" h={3.4} icon="grid" />
          <Photo c="#b45309" h={3.4} icon="layers" />
          <Photo c="#475569" h={3.4} icon="plus" />
        </div>
      </Body>
      <TabBar t={t} icons={["doc", "calendar", "users", "shield"]} />
    </>
  ),
  back: (t) => (
    <Body>
      <Header t={t} title="Safety check" sub="Before shift · 7:00 AM" back />
      <Card t={t} className="mb-[.5em] flex items-center justify-between">
        <Txt s={0.66} w={700} c={t.tx}>5 of 6 complete</Txt>
        <Ring pct={83} t={t} size={2.6} label="" />
      </Card>
      {[["PPE worn by all crew", 1], ["Scaffold inspected", 1], ["Fall protection in place", 1], ["Tools tagged & tested", 1], ["First-aid kit stocked", 1], ["Toolbox talk signed", 0]].map(([a, on], i, arr) => (
        <Row key={a as string} t={t} lead={<Check on={!!on} t={t} />} title={a} last={i === arr.length - 1} />
      ))}
      <div className="mt-[.8em]"><Btn t={t}>Submit report</Btn></div>
    </Body>
  ),
  toast: { icon: "check", title: "Report sent", sub: "4 stakeholders · 6:02 PM" },
};

const salon: Pair = {
  front: (t) => (
    <>
      <Body>
        <Header t={t} title="Book a visit" sub="Lumière Salon & Spa" right={<Avatar i={4} label="LS" size={2.1} />} />
        <div className="mb-[.8em] flex justify-between">
          {[["Wed", 1], ["Thu", 2], ["Fri", 3], ["Sat", 4], ["Sun", 5]].map(([d, n], i) => (
            <span key={d} className="grid w-[3em] place-items-center rounded-[.9em] py-[.5em]" style={i === 3 ? { background: t.a, color: t.on, boxShadow: `0 .4em 1em -.3em ${alpha(t.a, 0.7)}` } : { background: t.card, color: t.tx }}>
              <Txt s={0.54} w={600} style={{ opacity: 0.75 }}>{d}</Txt>
              <Txt s={0.95} w={800}>{n}</Txt>
            </span>
          ))}
        </div>
        <Txt s={0.66} w={750} c={t.tx} className="mb-[.4em]">Stylist</Txt>
        <div className="mb-[.8em] flex gap-[.6em]">
          {[["Lena", 4], ["Maya", 1], ["Ivy", 5], ["Zoe", 2]].map(([n, i], k) => (
            <span key={n} className="grid place-items-center gap-[.2em]">
              <span className="rounded-full p-[.15em]" style={{ border: `.15em solid ${k === 0 ? t.a : "transparent"}` }}><Avatar i={i as number} label={(n as string)[0]} size={2.4} /></span>
              <Txt s={0.56} w={k === 0 ? 750 : 500} c={k === 0 ? t.tx : t.mu}>{n}</Txt>
            </span>
          ))}
        </div>
        <Txt s={0.66} w={750} c={t.tx} className="mb-[.4em]">Available times</Txt>
        <div className="grid grid-cols-3 gap-[.4em]">
          {["09:30", "10:30", "11:00", "13:15", "14:00", "16:30"].map((s, i) => (
            <span key={s} className="rounded-[.7em] py-[.5em] text-center" style={i === 1 ? { background: t.a, color: t.on } : { border: `1px solid ${t.line}`, color: i === 2 ? t.mu : t.tx, textDecoration: i === 2 ? "line-through" : undefined }}>
              <Txt s={0.64} w={700}>{s}</Txt>
            </span>
          ))}
        </div>
      </Body>
      <TabBar t={t} icons={["home", "calendar", "heart", "users"]} />
    </>
  ),
  back: (t) => (
    <Body>
      <Header t={t} title="Summary" sub="Sat 4 Oct · 10:30" back />
      <Photo c={t.a} h={6} icon="heart" />
      <Card t={t} className="mt-[.6em]">
        <Txt s={0.8} w={800} c={t.tx}>Balayage + blow-dry</Txt>
        <Txt s={0.58} c={t.mu}>with Lena · 2h 15m</Txt>
      </Card>
      <div className="mt-[.3em]">
        <Row t={t} title="Balayage" right={<Txt s={0.62} w={700} c={t.tx}>$120</Txt>} />
        <Row t={t} title="Deep-conditioning add-on" right={<Txt s={0.62} w={700} c={t.tx}>$25</Txt>} />
        <Row t={t} title={<b>Total</b>} right={<Txt s={0.72} w={800} c={t.tx}>$145</Txt>} last />
      </div>
      <div className="mt-[.7em]"><Btn t={t}>Confirm booking</Btn></div>
    </Body>
  ),
  toast: { icon: "calendar", title: "Booked for Sat", sub: "Reminder 24h before" },
};

const trasys: Pair = {
  front: (t) => (
    <>
      <Body>
        <Header t={t} title="Traces" sub="prod · chat-agent" right={<Pill bg={alpha(GREEN, 0.18)} fg="#4ade80">● Live</Pill>} />
        <div className="grid grid-cols-3 gap-[.4em]">
          {[["p95", "1.84s"], ["Tokens", "3.4k"], ["Cost", "$0.021"]].map(([l, v], i) => (
            <Card t={t} key={l} className="!p-[.55em]" style={i === 2 ? { background: t.soft, border: `1px solid ${alpha(t.a, 0.35)}` } : undefined}>
              <Txt s={0.52} w={700} c={t.mu} className="uppercase tracking-wider">{l}</Txt>
              <Txt s={0.85} w={800} c={t.tx}>{v}</Txt>
            </Card>
          ))}
        </div>
        <Card t={t} className="mt-[.5em]">
          <div className="flex justify-between"><Txt s={0.6} w={700} c={t.tx}>Token spend · 24h</Txt><Txt s={0.56} c={t.mu}>$38.70</Txt></div>
          <Spark id="ts-spend" pts={[6, 9, 8, 11, 10, 13, 12, 14, 15, 13, 17, 16]} c={t.a} />
        </Card>
        <div className="mt-[.6em] flex flex-col gap-[.35em]">
          {[["POST /chat", 0, 100, "1.84s"], ["retrieve.context", 3, 20, "362ms"], ["llm.completion", 25, 44, "812ms"], ["tool.search", 71, 12, "221ms"], ["llm.completion", 84, 15, "284ms"]].map(([n, s, w, ms], i) => (
            <div key={i} className="grid grid-cols-[5.4em_1fr] items-center gap-[.4em]">
              <Txt s={0.54} c={t.mu} className="truncate font-mono" style={{ paddingLeft: i ? ".6em" : 0 }}>{n}</Txt>
              <div className="relative h-[.9em] rounded-[.25em]" style={{ background: t.line }}>
                <span className="absolute inset-y-[.12em] rounded-[.2em]" style={{ left: `${s}%`, width: `${w}%`, background: (n as string).startsWith("llm") ? t.a : "rgba(255,255,255,.35)" }} />
                <span className="absolute inset-y-0 right-[.3em] flex items-center"><Txt s={0.46} c={t.mu} className="font-mono">{ms}</Txt></span>
              </div>
            </div>
          ))}
        </div>
      </Body>
      <TabBar t={t} icons={["eye", "chart", "bolt", "menu"]} />
    </>
  ),
  back: (t) => (
    <Body>
      <Header t={t} title="Incident" sub="Just now · chat-agent" back right={<Pill bg={alpha(RED, 0.2)} fg="#ff8a8c">SEV-2</Pill>} />
      <div className="rounded-[1.1em] p-[.9em]" style={{ background: alpha(RED, 0.12), border: `1px solid ${alpha(RED, 0.35)}` }}>
        <div className="flex items-center gap-[.5em]">
          <span className="grid size-[2.2em] place-items-center rounded-full" style={{ background: alpha(RED, 0.25), color: "#ff8a8c" }}><Ico name="bolt" size={0.95} /></span>
          <div><Txt s={0.78} w={800} c={t.tx}>Agent loop detected</Txt><Txt s={0.56} c={t.mu}>tool.search called 41× in 90s</Txt></div>
        </div>
        <Spark id="ts-loop" pts={[3, 3, 4, 3, 4, 5, 9, 16, 24, 30, 31, 31]} c="#ff6b6e" h={3.2} />
      </div>
      {[["Spend capped", "$4.20 limit reached", "lock"], ["On-call paged", "#oncall · Priya", "users"], ["Trace captured", "8f3a…c21 · 41 spans", "eye"]].map(([a, b, ic], i) => (
        <Row key={a} t={t} lead={<IconTile name={ic} c={t.a} />} title={a} sub={b} last={i === 2} />
      ))}
      <div className="mt-[.8em]"><Btn t={t}>Open trace</Btn></div>
    </Body>
  ),
  toast: { icon: "bolt", title: "Loop detected", sub: "Spend capped at $4.20" },
};

const storefront: Pair = {
  front: (t) => (
    <>
      <Body>
        <div className="flex items-center justify-between pb-[.7em]">
          <Txt s={1.1} w={900} c={t.tx} className="tracking-[.04em]">ASTER&amp;CO</Txt>
          <span className="relative"><Ico name="cart" size={1.1} c={t.tx} /><span className="absolute -top-[.3em] -right-[.4em] grid size-[1.1em] place-items-center rounded-full text-[.55em] font-bold" style={{ background: t.a, color: t.on }}>2</span></span>
        </div>
        <div className="relative overflow-hidden rounded-[1.1em] p-[.9em]" style={{ background: "linear-gradient(135deg,#e7d7c1,#c9ab86)" }}>
          <span className="absolute -right-[1.5em] -bottom-[2em] size-[7em] rounded-full bg-white/30" />
          <Txt s={0.56} w={800} c="#5b4630" className="tracking-widest">NEW SEASON</Txt>
          <Txt s={1.2} w={800} c="#2b2118" className="mt-[.15em] leading-tight">Autumn<br />Linen Edit</Txt>
          <div className="mt-[.5em]"><Pill bg="#2b2118" fg="#fff">Shop now</Pill></div>
        </div>
        <div className="mt-[.7em] grid grid-cols-2 gap-[.5em]">
          {[["Linen shirt", "$68", "#9ca3af"], ["Wool scarf", "$42", "#b45309"], ["Canvas tote", "$36", "#65a30d"], ["Knit beanie", "$28", "#7c3aed"]].map(([n, p, c]) => (
            <div key={n}>
              <Photo c={c} h={4.6} icon="heart" />
              <div className="mt-[.3em] flex justify-between px-[.1em]"><Txt s={0.6} w={650} c={t.tx}>{n}</Txt><Txt s={0.6} w={800} c={t.tx}>{p}</Txt></div>
            </div>
          ))}
        </div>
      </Body>
      <TabBar t={t} icons={["home", "search", "heart", "cart"]} />
    </>
  ),
  back: (t) => (
    <Body>
      <Header t={t} title="Checkout" sub="2 items" back />
      {[["Linen shirt", "Sand · M", "$68", "#9ca3af"], ["Wool scarf", "Rust", "$42", "#b45309"]].map(([n, v, p, c], i) => (
        <Row key={n} t={t} lead={<Photo c={c} h={2.8} className="w-[2.8em]" />} title={n} sub={v} right={<Txt s={0.66} w={750} c={t.tx}>{p}</Txt>} last={i === 1} />
      ))}
      <Card t={t} className="mt-[.5em] flex flex-col gap-[.35em]">
        <div className="flex justify-between"><Txt s={0.6} c={t.mu}>Subtotal</Txt><Txt s={0.62} w={700} c={t.tx}>$110.00</Txt></div>
        <div className="flex justify-between"><Txt s={0.6} c={t.mu}>Shipping</Txt><Txt s={0.62} w={700} c={t.tx}>$18.00</Txt></div>
        <div className="flex justify-between"><Txt s={0.6} c={GREEN} w={650}>Platform commission</Txt><Txt s={0.62} w={800} c={GREEN}>$0.00</Txt></div>
      </Card>
      <div className="mt-[.5em] flex gap-[.4em]">
        {["Card", "UPI", "COD"].map((m, i) => (
          <span key={m} className="flex-1 rounded-[.7em] py-[.5em] text-center" style={{ border: `1.5px solid ${i === 0 ? t.a : t.line}` }}><Txt s={0.6} w={700} c={t.tx}>{m}</Txt></span>
        ))}
      </div>
      <div className="mt-[.7em]"><Btn t={t}>Pay $128.00</Btn></div>
    </Body>
  ),
  toast: { icon: "cart", title: "New order", sub: "$128 · 0% commission" },
};

const bus: Pair = {
  front: (t) => (
    <>
      <Body>
        <Header t={t} title="Your ticket" sub="Booking #SW-88142" right={<Ico name="share" size={1} c={t.tx} />} />
        <div className="overflow-hidden rounded-[1.2em]" style={{ background: `linear-gradient(150deg, ${t.a}, ${alpha(t.a, 0.8)})`, color: t.on }}>
          <div className="p-[.9em]">
            <div className="flex items-center justify-between">
              <div><Txt s={1.3} w={800}>DEL</Txt><Txt s={0.56} style={{ opacity: 0.8 }}>06:30 · Kashmere Gate</Txt></div>
              <Ico name="truck" size={1.2} />
              <div className="text-right"><Txt s={1.3} w={800}>JAI</Txt><Txt s={0.56} style={{ opacity: 0.8 }}>11:45 · Sindhi Camp</Txt></div>
            </div>
            <div className="mt-[.6em] grid grid-cols-3 gap-[.4em]">
              {[["Seat", "14B"], ["Bus", "Volvo AC"], ["Date", "Oct 4"]].map(([l, v]) => (
                <div key={l}><Txt s={0.5} style={{ opacity: 0.75 }}>{l}</Txt><Txt s={0.7} w={800}>{v}</Txt></div>
              ))}
            </div>
          </div>
          <div className="relative border-t-2 border-dashed border-white/40 bg-white p-[.8em]">
            <span className="absolute -top-[.7em] -left-[.7em] size-[1.4em] rounded-full" style={{ background: t.bg }} />
            <span className="absolute -top-[.7em] -right-[.7em] size-[1.4em] rounded-full" style={{ background: t.bg }} />
            <div className="flex items-center gap-[.8em]">
              <QR fg="#111" size={6} />
              <div><Txt s={0.72} w={800} c="#111">Scan to board</Txt><Txt s={0.56} c="rgba(0,0,0,.55)">Show this code to the conductor</Txt></div>
            </div>
          </div>
        </div>
      </Body>
      <TabBar t={t} icons={["home", "doc", "pin", "users"]} />
    </>
  ),
  back: (t) => (
    <div className="relative flex flex-1 flex-col">
      <MapArt t={t} h={30}>
        <span className="absolute grid size-[2.2em] place-items-center rounded-full border-[.2em] border-white shadow-lg" style={{ left: "38%", top: "48%", background: t.a, color: t.on }}>
          <Ico name="truck" size={0.9} />
        </span>
      </MapArt>
      <div className="absolute inset-x-0 bottom-0 rounded-t-[1.4em] px-[1.1em] pt-[.5em] pb-[2.2em]" style={{ background: t.bg, boxShadow: "0 -.5em 2em rgba(0,0,0,.15)" }}>
        <span className="mx-auto mb-[.6em] block h-[.3em] w-[2.6em] rounded-full" style={{ background: t.line }} />
        <div className="flex items-center justify-between">
          <div><Txt s={0.58} w={700} c={t.a}>NEXT STOP</Txt><Txt s={1} w={800} c={t.tx}>Gurugram</Txt></div>
          <Pill bg={t.soft} fg={t.a}>8 min</Pill>
        </div>
        <div className="mt-[.6em]">
          {[["Kashmere Gate", "06:30", 1], ["Dhaula Kuan", "07:05", 1], ["Gurugram", "07:40", 0]].map(([s, tm, done], i) => (
            <Row key={s as string} t={t} lead={<span className="size-[.8em] rounded-full" style={{ background: done ? t.a : t.bg, border: `.18em solid ${t.a}` }} />} title={s} right={<Txt s={0.6} w={700} c={t.mu}>{tm}</Txt>} last={i === 2} />
          ))}
        </div>
      </div>
    </div>
  ),
  toast: { icon: "pin", title: "Bus is 8 min away", sub: "Live GPS tracking" },
};

export const phoneScreens: Record<string, Pair> = {
  "omnichannel-helpdesk": helpdesk,
  "legal-practice-suite": legal,
  "enterprise-hrms": hrms,
  "field-service-platform": fieldService,
  "property-management-cloud": property,
  "shared-inbox-help-desk": sharedInbox,
  "browser-telehealth": telehealth,
  "trade-job-manager": tradeJob,
  "landlord-management-app": landlord,
  "visual-inventory-tracker": inventory,
  "construction-field-reporting": construction,
  "salon-and-spa-booking": salon,
  "trasys-ai": trasys,
  "zero-commission-storefronts": storefront,
  "bus-operator-platform": bus,
};

// Screens that draw their own full-bleed top area (camera, video) manage their status bar.
export const flushScreens = new Set(["browser-telehealth:front", "visual-inventory-tracker:back", "shared-inbox-help-desk:back"]);
