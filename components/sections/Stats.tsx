import { stats } from "@/lib/content";
import { DashboardArt } from "../ui/Artwork";
import Counter from "../ui/Counter";
import Marquee from "../ui/Marquee";

export default function Stats() {
  return (
    <section className="bg-black pb-[clamp(56px,5.5vw,110px)]">
      <Marquee duration={55}>
        {stats.map((s) => (
          <div
            key={s.text}
            className="mr-3 flex h-[440px] w-[300px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-line bg-card transition-colors duration-300 hover:border-[#5e5e5c] hover:bg-[#232322] sm:w-[380px] lg:w-[29vw] lg:max-w-[460px]"
          >
            <div className="flex flex-col gap-3 p-7">
              <div className="flex items-center gap-6">
                <span className="font-condensed text-6xl leading-none font-medium text-white">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
                <p className="fs-base leading-tight font-semibold text-white uppercase">
                  {s.label[0]}
                  <br />
                  {s.label[1]}
                </p>
              </div>
              <p className="fs-base font-medium text-muted">{s.text}</p>
            </div>
            <DashboardArt hue={s.hue} className="h-[52%]" />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
