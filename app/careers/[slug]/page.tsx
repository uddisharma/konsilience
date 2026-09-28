import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ApplyForm from "@/components/page/ApplyForm";
import PageHero from "@/components/page/PageHero";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { jobs } from "@/lib/catalog";

const find = (slug: string) => jobs.find((j) => j.slug === slug);

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const j = find((await params).slug);
  return j ? { title: `${j.title} | Careers`, description: `Join Konsilience as a ${j.title}.` } : {};
}

// PLACEHOLDER JOB DESCRIPTION: replace with the real role details from your ATS.
const blocks = (title: string, exp: string) => [
  { h: "What you'll do", items: [`Own features end to end as a ${title}, from design to production.`, "Collaborate with designers, PMs and engineers in a cross-functional squad.", "Write clean, tested, well-documented work and review your peers'.", "Help shape our practices, tooling and engineering culture."] },
  { h: "What you bring", items: [`${exp} of relevant professional experience.`, "Strong fundamentals and a track record of shipping.", "Clear written and spoken English communication.", "Curiosity, ownership and a bias for action."] },
  { h: "Nice to have", items: ["Experience with AI-assisted development tools.", "Client-facing or consulting experience.", "Open-source contributions or a public portfolio."] },
];

export default async function JobPage({ params }: PageProps<"/careers/[slug]">) {
  const j = find((await params).slug);
  if (!j) notFound();

  return (
    <>
      <PageHero
        crumbs={[{ label: "Careers", href: "/careers" }, { label: j.title }]}
        eyebrow={j.team}
        title={[j.title]}
        actions={
          <div className="flex flex-wrap gap-3 text-sm">
            {[["pin", j.location], ["briefcase", j.type], ["clock", j.exp]].map(([icon, label]) => (
              <span key={label} className="flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2.5">
                <Icon name={icon} className="size-4 text-primary" /> {label}
              </span>
            ))}
          </div>
        }
      />
      <section className="sec bg-black pt-0">
        <div className="wrap flex flex-col justify-between gap-12 lg:flex-row">
          <div className="flex flex-col gap-12 lg:w-[55%]">
            <Reveal>
              <p className="subtitle !font-normal text-white/85">
                We&apos;re looking for a {j.title} to join our {j.team} team and help build products for some of the world&apos;s most ambitious
                companies.
              </p>
            </Reveal>
            {blocks(j.title, j.exp).map((b) => (
              <Reveal key={b.h}>
                <h2 className="h3 font-semibold">{b.h}</h2>
                <ul className="mt-6 flex flex-col gap-4">
                  {b.items.map((it) => (
                    <li key={it} className="fs-base flex items-start gap-3 font-medium text-white/80">
                      <span className="check-dot mt-1">
                        <Icon name="check" className="size-3 text-white" strokeWidth={3} />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <Reveal variant="right" className="lg:w-[40%]">
            <div className="lg:sticky lg:top-28">
              <ApplyForm role={j.title} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
