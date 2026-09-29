import { aiPillars, brand } from "@/lib/content";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Reveal, { LineReveal } from "../ui/Reveal";

// Stylised trace-waterfall preview of the Trasys AI dashboard.
const spans = [
  { name: "POST /chat", start: 0, width: 100, tone: "bg-white/25" },
  { name: "retrieve.context", start: 4, width: 22, tone: "bg-white/40" },
  { name: "llm.completion", start: 28, width: 46, tone: "bg-primary" },
  { name: "tool.search", start: 76, width: 12, tone: "bg-white/40" },
  { name: "llm.completion", start: 84, width: 14, tone: "bg-primary" },
];

function TrasysVisual() {
  return (
    <div className="relative h-full min-h-[460px] overflow-hidden bg-[#020615]">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_60%,rgba(26,105,253,.45),transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.14) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
      />

      <div className="absolute top-10 left-8 flex items-center gap-2 text-3xl font-extrabold tracking-tight lg:top-12 lg:left-10">
        {brand.product.name.replace(/ ?AI$/, "")} <span className="text-primary">AI</span>
      </div>

      {/* trace waterfall */}
      <div className="float-a absolute inset-x-8 top-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-xl lg:inset-x-12">
        <div className="mb-4 flex items-center justify-between text-xs text-white/60">
          <span className="font-semibold text-white">Trace · chat-agent</span>
          <span>1.84s · 3,412 tokens</span>
        </div>
        <div className="space-y-2.5">
          {spans.map((s, i) => (
            <div key={i} className="grid grid-cols-[110px_1fr] items-center gap-3 text-[11px] text-white/70">
              <span className="truncate font-mono">{s.name}</span>
              <div className="relative h-2.5 rounded-full bg-white/5">
                <span className={`absolute inset-y-0 rounded-full ${s.tone}`} style={{ left: `${s.start}%`, width: `${s.width}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* floating signals */}
      <div className="float-b absolute right-6 bottom-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-xl lg:right-10">
        <span className="relative grid size-8 place-items-center rounded-full bg-[#ff4246]/20 text-[#ff8a8c]">
          <span className="absolute inset-0 rounded-full bg-[#ff4246]/30" style={{ animation: "ping-soft 2s ease-out infinite" }} />
          <Icon name="bolt" className="relative size-4" />
        </span>
        <div className="text-xs">
          <p className="font-semibold text-white">Agent loop detected</p>
          <p className="text-white/60">Spend capped at $4.20 · Slack alerted</p>
        </div>
      </div>
      <div className="float-a absolute top-28 right-6 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs font-medium text-white backdrop-blur-xl lg:right-10">
        Token spend today <b className="ml-1 text-primary">$38.70</b>
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
