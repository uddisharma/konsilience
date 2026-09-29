import { heroTags } from "@/lib/content";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Marquee from "../ui/Marquee";
import HeroCanvas from "./HeroCanvas";

const lines = ["Engineering the Next", "Generation of Digital", "Systems with AI"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="relative flex min-h-[min(100svh,820px)] flex-col justify-center pt-36 lg:pt-40">
        {/* animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_20%,rgb(var(--brand-rgb)/.35),transparent_60%),radial-gradient(50%_40%_at_10%_10%,rgb(var(--brand-light-rgb)/.18),transparent_70%)]" />
          <HeroCanvas />
          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,.25)_20%,rgba(0,0,0,.65)_45%,rgba(0,0,0,.92)_70%,#000_85%)]" />
        </div>

        <div className="wrap relative z-10 flex flex-col gap-12 pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-5xl">
            <h1 className="h1">
              {lines.map((l, i) => (
                <span key={l} className="lr-line">
                  <span className="inline-block anim-line" style={{ animationDelay: `${200 + i * 140}ms` }}>
                    {l}
                  </span>
                </span>
              ))}
            </h1>
            <p className="anim-hero fs-base mt-6 max-w-2xl leading-relaxed font-medium text-white/85" style={{ animationDelay: "550ms" }}>
              Konsilience is an AI-first product studio. Our senior team of engineers, designers and AI specialists builds
              SaaS platforms, mobile apps and AI systems for startups and growing businesses, fast and without the agency overhead.
            </p>
            <div className="anim-hero mt-10" style={{ animationDelay: "700ms" }}>
              <Button>Book a Free Consultation</Button>
            </div>
          </div>

          <div className="anim-hero flex flex-col gap-3" style={{ animationDelay: "850ms" }}>
            <span className="text-xs font-semibold tracking-[3px] text-white uppercase sm:text-sm">Built on Leading AI Platforms</span>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-x-6">
              {["OpenAI", "Anthropic", "Gemini"].map((p, i) => (
                <div key={p} className="flex items-center gap-4 sm:gap-6">
                  {i > 0 && <span className="hidden h-8 w-px bg-white/25 sm:block" />}
                  <span className="flex items-center gap-2 text-lg font-semibold text-white">
                    <Icon name="spark" className="size-5 text-primary" />
                    {p}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 pb-10">
        <Marquee duration={40} pauseOnHover={false}>
          {heroTags.map(([big, small]) => (
            <div
              key={big}
              className="mr-3 flex h-[88px] w-[220px] shrink-0 items-center justify-center gap-3 border border-white/15 bg-black/20 px-4 backdrop-blur-2xl"
            >
              <Icon name="spark" className="size-6 shrink-0 text-primary" strokeWidth={1.5} />
              <div className="leading-tight">
                <p className="text-sm font-bold tracking-wide text-white">{big}</p>
                <p className="text-xs text-white/60">{small}</p>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
