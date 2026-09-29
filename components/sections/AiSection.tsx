import { aiPillars, brand } from "@/lib/content";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Reveal, { LineReveal } from "../ui/Reveal";

// Animated preview of the Trasys AI dashboard: KPIs, trace waterfall, log patterns and live alerts.
const kpis = [
  { label: "Requests", value: "128.4K", delta: "+12%", pts: [8, 12, 10, 15, 13, 18, 16, 22, 20, 26] },
  { label: "p95 latency", value: "1.84s", delta: "-8%", pts: [20, 18, 22, 17, 19, 15, 16, 13, 14, 12] },
  { label: "Token spend", value: "$38.70", delta: "+4%", pts: [6, 9, 8, 11, 10, 13, 12, 14, 15, 16], accent: true },
  { label: "Error rate", value: "0.12%", delta: "-31%", pts: [14, 16, 12, 13, 9, 10, 7, 8, 6, 5] },
];

const spans = [
  { name: "POST /chat", start: 0, width: 100, ms: "1,840ms", tone: "bg-white/25" },
  { name: "retrieve.context", start: 3, width: 20, ms: "362ms", tone: "bg-white/45" },
  { name: "llm.completion", start: 25, width: 44, ms: "812ms", tone: "bg-primary", tokens: "2,960 tok" },
  { name: "tool.search", start: 71, width: 12, ms: "221ms", tone: "bg-white/45" },
  { name: "llm.completion", start: 84, width: 15, ms: "284ms", tone: "bg-primary", tokens: "452 tok" },
];

const models = [
  { name: "gpt-4o", cost: "$21.40", pct: 55 },
  { name: "claude-sonnet", cost: "$12.10", pct: 31 },
  { name: "gemini-flash", cost: "$5.20", pct: 14 },
];

const logs = [
  { pattern: "Timeout calling vector store <*>", count: "8.2K", level: "bg-[#ffb020]" },
  { pattern: "Rate limit 429 from provider <*>", count: "3.1K", level: "bg-[#ff4246]" },
  { pattern: "Cache hit for prompt <*>", count: "1.1K", level: "bg-white/40" },
];

function Sparkline({ pts, accent }: { pts: number[]; accent?: boolean }) {
  const max = Math.max(...pts);
  const d = pts.map((v, i) => `${(i / (pts.length - 1)) * 100},${30 - (v / max) * 26}`).join(" ");
  return (
    <svg viewBox="0 0 100 32" preserveAspectRatio="none" className="mt-2 h-7 w-full" aria-hidden>
      <polyline points={`0,32 ${d} 100,32`} style={{ fill: accent ? "rgb(var(--brand-rgb) / .18)" : "rgba(255,255,255,.06)" }} stroke="none" />
      <polyline
        points={d}
        pathLength={1}
        fill="none"
        style={{ stroke: accent ? "rgb(var(--brand-rgb))" : "rgba(255,255,255,.7)" }}
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
        className="tv-line"
      />
    </svg>
  );
}

function TrasysVisual() {
  return (
    <div className="relative h-full min-h-[640px] overflow-hidden bg-[rgb(var(--brand-ink-rgb))] sm:min-h-[720px]">
      <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_45%_55%,rgb(var(--brand-rgb)/.42),transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.14) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
      />

      {/* product label */}
      {/* <div className="absolute top-8 left-6 flex items-center gap-3 sm:left-8 lg:top-10 lg:left-10">
        <span className="text-3xl font-extrabold tracking-tight">
          {brand.product.name.replace(/ ?AI$/, "")} <span className="text-primary">AI</span>
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold tracking-widest text-emerald-300 uppercase">
          <span className="tv-live size-1.5 rounded-full bg-emerald-400" /> Live
        </span>
      </div> */}

      {/* dashboard window, vertically centred; the alert card hangs off its bottom edge */}
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-8 lg:inset-x-10">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/70 shadow-[0_30px_80px_-20px_rgb(var(--brand-rgb)/.45)] backdrop-blur-xl">
        {/* title bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-[11px] text-white/60">
          <div className="flex items-center gap-3">
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
            </span>
            <span className="font-mono">prod · chat-agent</span>
          </div>
          <span className="rounded-md border border-white/10 px-2 py-0.5">Last 24h</span>
        </div>

        <div className="flex flex-col gap-4 p-4">
          {/* KPIs */}
          <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
            {kpis.map((k) => (
              <div key={k.label} className={`rounded-xl border p-3 ${k.accent ? "border-primary/40 bg-primary/10" : "border-white/10 bg-white/[.03]"}`}>
                <p className="text-[10px] font-semibold tracking-wider text-white/50 uppercase">{k.label}</p>
                <div className="mt-1 flex items-baseline justify-between gap-2">
                  <span className="font-condensed text-2xl leading-none font-semibold text-white">{k.value}</span>
                  <span className={`text-[10px] font-semibold ${k.delta.startsWith("-") ? "text-emerald-300" : "text-white/60"}`}>{k.delta}</span>
                </div>
                <Sparkline pts={k.pts} accent={k.accent} />
              </div>
            ))}
          </div>

          {/* trace waterfall */}
          <div className="relative rounded-xl border border-white/10 bg-white/[.02] p-4">
            <div className="mb-3 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-white">Trace · 8f3a…c21</span>
              <span className="text-white/50">1.84s · 3,412 tokens · $0.021</span>
            </div>
            <div className="relative grid grid-cols-[110px_1fr] gap-x-2 gap-y-2 text-[10.5px] text-white/70 sm:grid-cols-[120px_1fr]">
              {spans.map((s, i) => (
                <div key={i} className="contents">
                  <span className="truncate font-mono" style={{ paddingLeft: i ? 10 : 0 }}>{s.name}</span>
                  <div className="relative h-4 overflow-hidden rounded bg-white/[.04]">
                    <span
                      className={`tv-bar absolute inset-y-0.5 rounded ${s.tone}`}
                      style={{ left: `${s.start}%`, width: `${s.width}%`, animationDelay: `${300 + i * 150}ms` }}
                    />
                    <span className="absolute inset-y-0 right-1 flex items-center gap-2 font-mono text-[9.5px] text-white/60">
                      {s.tokens && <span className="hidden text-primary sm:inline">{s.tokens}</span>}
                      {s.ms}
                    </span>
                    {/* scan line sweeping across the timeline */}
                    <span className="tv-scan pointer-events-none absolute inset-y-0 w-px bg-primary/80" style={{ animationDelay: `${i * 40}ms` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden gap-3 sm:grid sm:grid-cols-[1.4fr_1fr]">
            {/* log patterns */}
            <div className="rounded-xl border border-white/10 bg-white/[.02] p-4">
              <div className="mb-3 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-white">Log patterns</span>
                <span className="text-white/50">12.4K lines → 3 clusters</span>
              </div>
              <ul className="space-y-2">
                {logs.map((l) => (
                  <li key={l.pattern} className="flex items-center justify-between gap-3 text-[10.5px]">
                    <span className="flex min-w-0 items-center gap-2">
                      <span className={`size-1.5 shrink-0 rounded-full ${l.level}`} />
                      <span className="truncate font-mono text-white/70">{l.pattern}</span>
                    </span>
                    <span className="font-mono text-white/50">{l.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* cost by model */}
            <div className="rounded-xl border border-white/10 bg-white/[.02] p-4">
              <div className="mb-3 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-white">Cost by model</span>
                <span className="text-white/50">24h</span>
              </div>
              <ul className="space-y-3">
                {models.map((m, i) => (
                  <li key={m.name} className="text-[10.5px]">
                    <div className="flex justify-between font-mono text-white/70">
                      <span>{m.name}</span>
                      <span>{m.cost}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[.06]">
                      <span
                        className={`tv-bar block h-full rounded-full ${i === 0 ? "bg-primary" : "bg-white/45"}`}
                        style={{ width: `${m.pct}%`, animationDelay: `${900 + i * 150}ms` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* floating alert, anchored to the window's bottom-right corner */}
      <div className="float-b absolute right-2 -bottom-12 z-10 flex items-center gap-3 rounded-2xl border border-[#ff4246]/30 bg-black/85 px-4 py-3 shadow-2xl backdrop-blur-xl sm:-right-3 sm:-bottom-9">
        <span className="relative grid size-9 place-items-center rounded-full bg-[#ff4246]/20 text-[#ff8a8c]">
          <span className="absolute inset-0 rounded-full bg-[#ff4246]/30" style={{ animation: "ping-soft 2s ease-out infinite" }} />
          <Icon name="bolt" className="relative size-4" />
        </span>
        <div className="text-xs">
          <p className="font-semibold text-white">Agent loop detected</p>
          <p className="text-white/60">Spend capped at $4.20 · #oncall alerted</p>
        </div>
      </div>
      </div>

      {/* floating budget */}
      <div className="float-a absolute top-8 right-4 z-10 hidden items-center gap-3 rounded-2xl border border-white/10 bg-black/80 px-4 py-2.5 backdrop-blur-xl sm:flex lg:top-10 lg:right-8">
        <svg viewBox="0 0 36 36" className="size-9 -rotate-90" aria-hidden>
          <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="4" />
          <circle cx="18" cy="18" r="15" fill="none" style={{ stroke: "rgb(var(--brand-rgb))" }} strokeWidth="4" strokeLinecap="round" pathLength={100} strokeDasharray="72 100" />
        </svg>
        <div className="text-xs">
          <p className="font-semibold text-white">Monthly budget</p>
          <p className="text-white/60">72% used · on track</p>
        </div>
      </div>
    </div>
  );
}

export default function AiSection() {
  return (
    <section id="ai" className="bg-black">
      <div className="flex flex-col border-y border-line lg:flex-row">
        <Reveal variant="fade" className="lg:w-1/2">
          <TrasysVisual />
        </Reveal>
        <div className="flex flex-col justify-between gap-10 px-5 py-14 sm:px-10 lg:w-1/2 lg:py-20 lg:pr-12 lg:pl-20">
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-full border border-line bg-card px-4 py-1.5 text-xs font-semibold tracking-[.2em] uppercase">Our product</span>
            <LineReveal className="h2 !font-normal" lines={["See Every Signal", <>Your <b className="font-extrabold">AI Stack</b> Produces</>]} />
            <Reveal delay={200}>
              <p className="subtitle !font-normal text-white/85">
                <strong className="font-bold text-white">{brand.product.name}</strong> is our {brand.product.short}. Trace every LLM call, track
                token spend, catch runaway agents and route incidents to the right person before your users notice.
              </p>
            </Reveal>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {aiPillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 120}>
                <div className="flex h-full flex-col gap-8 rounded-3xl border border-line p-6 transition-colors duration-300 hover:border-primary hover:bg-primary/10">
                  <div className="flex flex-col gap-8">
                    <span className="grid size-12 place-items-center rounded-xl bg-card text-primary">
                      <Icon name={p.icon} className="size-6" />
                    </span>
                    <h4 className="fs-base font-semibold">{p.title}</h4>
                  </div>
                  <ul className="flex flex-col gap-4">
                    {p.items.map((it) => (
                      <li key={it} className="fs-para flex items-start gap-3 font-medium text-white/85">
                        <span className="check-dot mt-0.5">
                          <Icon name="check" className="size-3 text-white" strokeWidth={3} />
                        </span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button variant="white" href={brand.product.url}>Try {brand.product.name} Free</Button>
            <Button variant="outline" href="/trasys-ai">Explore {brand.product.name}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
