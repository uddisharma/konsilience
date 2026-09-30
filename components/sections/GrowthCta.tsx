import { facts } from "@/lib/content";
import Button from "../ui/Button";
import AdVideo from "../ui/AdVideo";
import Reveal from "../ui/Reveal";

export default function GrowthCta() {
  return (
    <section className="sec bg-black">
      <Reveal variant="zoom" className="wrap">
        <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(110deg,rgb(var(--brand-deep-rgb))_0%,rgb(var(--brand-mid-rgb))_45%,rgb(var(--brand-strong-rgb))_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_50%,rgb(var(--brand-light-rgb)/.45),transparent_70%)]" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="relative grid items-center lg:grid-cols-[1.25fr_1fr]">
            <div className="flex flex-col gap-12 p-8 sm:p-12 lg:p-16">
              <div className="flex flex-col gap-6">
                <p className="h3 font-normal">
                  From <b className="font-extrabold">helpdesks</b> and <b className="font-extrabold">legal suites</b>
                  <br />
                  to <b className="font-extrabold">field-service</b> and <b className="font-extrabold">telehealth</b> apps,
                  <br />
                  we&apos;ve built it before.
                </p>
                <p className="fs-base max-w-xl font-medium text-white/85">
                  <b className="font-extrabold text-white">{facts.platforms} SaaS platforms</b> across support, legal, HR, real estate, healthcare and construction, engineered to
                  scale from day one.
                </p>
              </div>
              <div>
                <Button variant="white">Plan Your Product With Us</Button>
              </div>
            </div>
            <div className="relative flex justify-center px-8 pb-8 sm:px-12 sm:pb-12 lg:p-12 lg:pl-0">
              <AdVideo
                src="/konsilience-studio-ad-4x5-v1.mp4"
                poster="/konsilience-studio-ad-poster.jpg"
                label={`${facts.platforms} platforms engineered by Konsilience across web, mobile and AI`}
                className="max-w-[420px] rounded-2xl border border-white/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)]"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
