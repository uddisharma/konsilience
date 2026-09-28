import { partners } from "@/lib/content";
import Marquee from "../ui/Marquee";
import { LineReveal } from "../ui/Reveal";

const hues = [30, 210, 200, 10, 195, 150, 0, 20, 205, 220, 200, 250, 130, 350, 90, 280];

function Card({ name, i }: { name: string; i: number }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 3);
  return (
    <div className="group mr-6 flex h-[220px] w-[200px] shrink-0 flex-col items-center justify-between rounded-3xl border border-line bg-card p-7 transition-colors duration-300 hover:border-[#5e5e5c] sm:h-[250px] sm:w-[246px] sm:p-8">
      <figure className="grid flex-1 place-items-center">
        <span
          className="grid size-20 place-items-center rounded-2xl text-2xl font-extrabold text-white transition-transform duration-500 group-hover:scale-110"
          style={{ background: `linear-gradient(135deg, hsl(${hues[i % hues.length]} 85% 55%), hsl(${hues[i % hues.length]} 85% 35%))` }}
        >
          {initials}
        </span>
      </figure>
      <span className="fs-para block text-center font-semibold text-white">{name}</span>
    </div>
  );
}

export default function Partners() {
  const half = Math.ceil(partners.length / 2);
  return (
    <section className="sec bg-black">
      <LineReveal className="h2 wrap-sm text-center" lines={["Strategic Alliances that", "Power Innovation"]} />
      <div className="mt-14 flex flex-col gap-6">
        <Marquee duration={50} fadeEdges>
          {partners.slice(0, half).map((p, i) => <Card key={p} name={p} i={i} />)}
        </Marquee>
        <Marquee duration={50} fadeEdges reverse>
          {partners.slice(half).map((p, i) => <Card key={p} name={p} i={i + half} />)}
        </Marquee>
      </div>
    </section>
  );
}
