import { aiPillars, brand } from "@/lib/content";
import AdVideo from "../ui/AdVideo";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Reveal, { LineReveal } from "../ui/Reveal";

// Trasys AI promo video over the section's glow backdrop.
function TrasysVisual() {
  return (
    <div className="relative flex h-full min-h-[560px] items-center justify-center overflow-hidden bg-[rgb(var(--brand-ink-rgb))] px-5 py-12 sm:min-h-[720px] sm:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_45%_55%,rgb(var(--brand-rgb)/.42),transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.14) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
      />
      <AdVideo
        src="/trasys-observability-ad-4x5-v1.mp4"
        poster="/trasys-observability-ad-poster.jpg"
        label={`${brand.product.name}: trace LLM calls, track token spend and catch runaway agents`}
        className="relative max-w-[480px] rounded-2xl border border-white/10 shadow-[0_30px_80px_-20px_rgb(var(--brand-rgb)/.45)]"
      />
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
