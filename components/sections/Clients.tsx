import Link from "next/link";
import { projects } from "@/lib/catalog";
import Marquee from "../ui/Marquee";
import Reveal, { LineReveal } from "../ui/Reveal";

// Wall of platforms the team has built (from the portfolio), shown as wordmarks.
const styles = ["font-extrabold tracking-tight", "font-serif italic font-bold", "font-black tracking-[.12em] uppercase", "font-semibold", "font-condensed text-[1.6rem] font-semibold uppercase"];

function Wordmark({ name, i }: { name: string; i: number }) {
  return (
    <span className={`text-center text-xl leading-tight text-white/55 transition-colors duration-300 group-hover:text-white ${styles[i % styles.length]}`}>
      {name}
    </span>
  );
}

export default function Clients() {
  const half = Math.ceil(projects.length / 2);
  return (
    <section className="sec bg-black">
      <div className="bg-[radial-gradient(50%_60%_at_50%_0%,rgba(26,105,253,.18),transparent_70%)]">
        <LineReveal className="h2 wrap-sm text-center" lines={["Platforms We've", "Engineered"]} />
        <ul className="wrap mt-14 hidden grid-cols-5 gap-x-10 gap-y-2 md:grid">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 5) * 70 + Math.floor(i / 5) * 90} variant="fade">
              <Link href={`/portfolio/${p.slug}`} className="group flex min-h-[100px] items-center justify-center">
                <Wordmark name={p.client} i={i} />
              </Link>
            </Reveal>
          ))}
        </ul>
        <div className="mt-10 space-y-2 md:hidden">
          {[projects.slice(0, half), projects.slice(half)].map((row, r) => (
            <Marquee key={r} duration={30} reverse={r === 1}>
              {row.map((p, i) => (
                <Link key={p.slug} href={`/portfolio/${p.slug}`} className="group flex h-20 w-48 shrink-0 items-center justify-center px-3">
                  <Wordmark name={p.client} i={i + r * 3} />
                </Link>
              ))}
            </Marquee>
          ))}
        </div>
      </div>
    </section>
  );
}
