import { clients } from "@/lib/content";
import Marquee from "../ui/Marquee";
import Reveal, { LineReveal } from "../ui/Reveal";

const styles = ["font-extrabold tracking-tight", "font-serif italic font-bold", "font-black tracking-[.2em]", "font-semibold lowercase", "font-condensed text-3xl font-semibold uppercase"];

function Wordmark({ name, i }: { name: string; i: number }) {
  return (
    <figure className="flex min-h-[100px] items-center justify-center text-2xl text-white/55 transition-colors duration-300 hover:text-white">
      <span className={styles[i % styles.length]}>{name}</span>
    </figure>
  );
}

export default function Clients() {
  return (
    <section className="sec bg-black">
      <div className="bg-[radial-gradient(50%_60%_at_50%_0%,rgba(26,105,253,.18),transparent_70%)]">
        <LineReveal className="h2 wrap-sm text-center" lines={["Trusted by the Disruptors", "and Fortune 500s"]} />
        <ul className="wrap mt-14 hidden grid-cols-5 gap-x-16 gap-y-6 md:grid">
          {clients.map((c, i) => (
            <Reveal as="li" key={c} delay={(i % 5) * 70 + Math.floor(i / 5) * 90} variant="fade">
              <Wordmark name={c} i={i} />
            </Reveal>
          ))}
        </ul>
        <div className="mt-10 space-y-2 md:hidden">
          <Marquee duration={30}>
            {clients.slice(0, 10).map((c, i) => (
              <div key={c} className="w-40 shrink-0"><Wordmark name={c} i={i} /></div>
            ))}
          </Marquee>
          <Marquee duration={30} reverse>
            {clients.slice(10).map((c, i) => (
              <div key={c} className="w-40 shrink-0"><Wordmark name={c} i={i + 3} /></div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
