import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Chips, CtaBand, NumberedRows, SectionHead, Split } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import ProjectCard from "@/components/page/ProjectCard";
import { PhoneArt } from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { projects, serviceList } from "@/lib/catalog";
import { testimonials } from "@/lib/content";

const find = (slug: string) => projects.find((p) => p.slug === slug);

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const p = find((await params).slug);
  return p ? { title: `${p.client} Case Study`, description: p.text } : {};
}

export default async function CaseStudyPage({ params }: PageProps<"/portfolio/[slug]">) {
  const p = find((await params).slug);
  if (!p) notFound();

  const idx = projects.indexOf(p);
  const next = projects[(idx + 1) % projects.length];
  const more = projects.filter((x) => x.slug !== p.slug).slice(0, 3);
  const quote = testimonials.find((t) => t.role.includes(p.client)) ?? testimonials[idx % testimonials.length];
  const service = serviceList.find((s) => s.name === p.service);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Portfolio", href: "/portfolio" }, { label: p.client }]}
        eyebrow={`${p.industry} · ${p.year}`}
        title={[p.client]}
        text={p.text}
        actions={<Button>Build Something Similar</Button>}
        stats={[...p.metrics, [p.year, "Year delivered"], [String(p.tech.length), "Core technologies"]]}
      />

      {/* Showcase banner in the client's brand colour */}
      <section className="bg-black">
        <Reveal variant="zoom" className="wrap">
          <div className="relative flex h-[420px] items-end justify-center overflow-hidden rounded-3xl sm:h-[560px]" style={{ backgroundColor: p.bg }}>
            <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_100%,rgba(255,255,255,.35),transparent_70%)]" />
            <PhoneArt accent={p.accent} dark={p.dark} className="float-a relative w-[70%] max-w-md translate-y-16" />
          </div>
        </Reveal>
      </section>

      <section className="sec bg-black">
        <Split title={["The Challenge"]}>
          <Reveal>
            <p className="subtitle !font-normal text-white/85">{p.challenge}</p>
          </Reveal>
        </Split>
      </section>

      <section className="sec bg-black pt-0">
        <Split title={["Our Solution"]} text="What we designed, built and shipped.">
          <NumberedRows items={p.solution.map((s) => ({ title: s, text: "Delivered in agile sprints with weekly demos, automated testing and continuous deployment." }))} />
        </Split>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["The Results"]} />
          <div className="mt-14 grid gap-3 md:grid-cols-2">
            {p.metrics.map(([v, l], i) => (
              <Reveal key={l} delay={i * 120}>
                <div className="rounded-3xl border border-line bg-card p-10">
                  <p className="font-condensed text-7xl font-medium text-primary sm:text-8xl">{v}</p>
                  <p className="subtitle mt-4">{l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Tech Stack"]} />
          <div className="mt-12">
            <Chips items={p.tech} />
          </div>
          {service && (
            <Link href={`/services/${service.slug}`} className="u-link mt-10 inline-flex items-center gap-2 font-semibold text-primary">
              Explore our {service.name} services <Icon name="arrow" className="size-4" />
            </Link>
          )}
        </div>
      </section>

      <section className="sec bg-black">
        <Reveal className="wrap-sm">
          <figure className="rounded-3xl bg-white p-8 text-[#111] sm:p-14">
            <svg viewBox="0 0 48 36" className="h-9 w-12 text-primary" fill="currentColor" aria-hidden>
              <path d="M0 36V20C0 8.4 6 1.7 18 0l2 5.4C13.5 7 10.4 10.6 10 16h9v20H0Zm28 0V20C28 8.4 34 1.7 46 0l2 5.4C41.5 7 38.4 10.6 38 16h9v20H28Z" />
            </svg>
            <blockquote className="h3 mt-6 font-semibold">{quote.quote}</blockquote>
            <figcaption className="mt-8">
              <p className="font-extrabold">{quote.name}</p>
              <p className="text-sm font-semibold text-black/50">{quote.role}</p>
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* Next project */}
      <section className="bg-black">
        <Link href={`/portfolio/${next.slug}`} className="group wrap flex items-center justify-between gap-8 border-y border-line py-12">
          <div>
            <p className="text-sm font-semibold tracking-[.2em] text-muted uppercase">Next Project</p>
            <p className="h2 mt-3 transition-colors group-hover:text-primary">{next.client}</p>
          </div>
          <span className="grid size-16 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary">
            <Icon name="upRight" className="size-6" />
          </span>
        </Link>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["More Case Studies"]} />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {more.map((m, i) => (
              <Reveal key={m.slug} delay={i * 100}>
                <ProjectCard p={m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Want results like these?" text={`Let's discuss how we can do the same for your ${p.industry.toLowerCase()} business.`} />
    </>
  );
}
