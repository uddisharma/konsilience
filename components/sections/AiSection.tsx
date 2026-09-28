import { aiPillars, brand } from "@/lib/content";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Reveal, { LineReveal } from "../ui/Reveal";

function AiVisual() {
  return (
    <div className="relative h-full min-h-[420px] overflow-hidden bg-[#020615]">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_55%,rgba(26,105,253,.55),transparent_70%)]" />
      {/* concentric orbits */}
      {[90, 70, 50, 30].map((s, i) => (
        <div
          key={s}
          className="absolute top-1/2 left-1/2 rounded-full border border-dashed border-white/15"
          style={{ width: `${s}%`, aspectRatio: "1", translate: "-50% -50%", animation: `spin-slow ${30 + i * 10}s linear infinite ${i % 2 ? "reverse" : ""}` }}
        >
          <span className="absolute -top-1.5 left-1/2 size-3 rounded-full bg-primary shadow-[0_0_20px_4px_rgba(26,105,253,.8)]" />
        </div>
      ))}
      <div className="absolute top-1/2 left-1/2 grid size-32 -translate-1/2 place-items-center rounded-full bg-primary shadow-[0_0_80px_20px_rgba(26,105,253,.6)]">
        <Icon name="spark" className="size-14 text-white" strokeWidth={1.3} />
      </div>
      <div className="absolute top-10 left-8 flex items-center gap-2 text-3xl font-extrabold tracking-tight lg:top-12 lg:left-10">
        {brand.ai.replace(/AI$/, "")}<span className="text-primary">AI</span>
      </div>
    </div>
  );
}

export default function AiSection() {
  return (
    <section id="ai" className="bg-black">
      <div className="flex flex-col border-y border-line lg:flex-row">
        <Reveal variant="fade" className="lg:w-1/2">
          <AiVisual />
        </Reveal>
        <div className="flex flex-col justify-between gap-10 px-5 py-14 sm:px-10 lg:w-1/2 lg:py-20 lg:pr-12 lg:pl-20">
          <div className="flex flex-col gap-4">
            <LineReveal className="h2 !font-normal" lines={["Enterprise AI Engineered", <>Around <b className="font-extrabold">Agentic Systems</b></>]} />
            <Reveal delay={200}>
              <p className="subtitle !font-normal text-white/85">
                <strong className="font-bold text-white">{brand.ai}</strong> is our center of excellence for enterprise AI. We design, build
                and operate agentic systems, multimodal models and the data foundations that make them reliable in production.
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
            <Button variant="white">Book Your AI Advisory Session</Button>
            <Button variant="outline">Discover {brand.ai}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
