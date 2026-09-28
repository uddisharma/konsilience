import Button from "../ui/Button";
import { PhoneArt } from "../ui/Artwork";
import Reveal from "../ui/Reveal";

export default function GrowthCta() {
  return (
    <section className="sec bg-black">
      <Reveal variant="zoom" className="wrap">
        <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(110deg,#031432_0%,#0b2f86_45%,#1163fb_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_50%,rgba(94,150,254,.45),transparent_70%)]" />
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
                  You&apos;ve seen how we helped
                  <br />
                  <b className="font-extrabold">Freshly, Shiftly</b>, and <b className="font-extrabold">Kinetik</b>
                  <br />
                  reclaim their market edge.
                </p>
                <p className="fs-base max-w-xl font-medium text-white/85">
                  From 90% faster reporting to <b className="font-extrabold text-white">4x operational improvements</b>, our engineering goes
                  beyond code to deliver measurable ROI.
                </p>
              </div>
              <div>
                <Button variant="white">Consult our Experts for Growth Roadmap</Button>
              </div>
            </div>
            <div className="relative hidden h-full min-h-[420px] lg:block">
              <PhoneArt accent="#5e96fe" dark className="float-a absolute right-12 bottom-0 w-[70%] translate-y-16" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
