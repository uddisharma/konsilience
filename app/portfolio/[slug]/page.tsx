import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CardGrid, Chips, CtaBand, SectionHead, Split } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import ProjectCard from "@/components/page/ProjectCard";
import { PhoneArt } from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { projects, serviceList } from "@/lib/catalog";

const find = (slug: string) => projects.find((p) => p.slug === slug);

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const p = find((await params).slug);
  return p ? { title: `${p.client} | Case Study`, description: p.text } : {};
}

export default async function CaseStudyPage({ params }: PageProps<"/portfolio/[slug]">) {
  const p = find((await params).slug);
  if (!p) notFound();

  const idx = projects.indexOf(p);
  const next = projects[(idx + 1) % projects.length];
  const more = [...projects.filter((x) => x.slug !== p.slug && x.industry === p.industry), ...projects.filter((x) => x.slug !== p.slug && x.industry !== p.industry)].slice(0, 3);
  const service = serviceList.find((s) => s.name === p.service);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Portfolio", href: "/portfolio" }, { label: p.client }]}
        eyebrow={p.category}
        title={[p.client]}
        text={p.text}
        actions={
          <>
            <Button>Build a Platform Like This</Button>
            <span className="flex items-center gap-2 self-center rounded-full border border-line bg-card px-4 py-2.5 text-sm text-white/80">
              <Icon name="layers" className="size-4 text-primary" /> {p.style}-style platform
            </span>
          </>
        }
        stats={[...p.metrics, [String(p.platforms.length), "Platforms"], [String(p.tech.length), "Core technologies"]]}
      />

      {/* Showcase banner */}
      <section className="bg-black">
        <Reveal variant="zoom" className="wrap">
          <div className="relative flex h-[420px] items-end justify-center overflow-hidden rounded-3xl sm:h-[560px]" style={{ backgroundColor: p.bg }}>
            <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_100%,rgba(255,255,255,.35),transparent_70%)]" />
            <PhoneArt accent={p.accent} dark={p.dark} className="float-a relative w-[70%] max-w-md translate-y-16" />
          </div>
        </Reveal>
      </section>

      <section className="sec bg-black">
        <Split title={["About the", "Platform"]}>
          <div className="flex flex-col gap-8">
            <Reveal>
              <p className="subtitle !font-normal text-white/85">{p.about}</p>
            </Reveal>
            <Reveal delay={100}>
              <dl className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
                {[
                  ["Industry", p.industry],
                  ["Category", p.category],
                  ["Comparable to", p.style],
                ].map(([k, v]) => (
                  <div key={k} className="bg-card p-6">
                    <dt className="text-xs font-semibold tracking-[.2em] text-muted uppercase">{k}</dt>
                    <dd className="subtitle mt-2">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Split>
      </section>

      <section className="sec bg-black pt-0">
        <Split title={["The Challenge"]}>
          <Reveal>
            <p className="subtitle !font-normal text-white/85">{p.challenge}</p>
          </Reveal>
        </Split>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["What We Built"]} text="The core capabilities we designed, engineered and shipped." />
          <div className="mt-14">
            <CardGrid items={p.solution.map((s) => ({ title: s }))} />
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["The Outcome"]} />
          <div className="mt-14 grid gap-3 md:grid-cols-2">
            {p.metrics.map(([v, l], i) => (
              <Reveal key={l} delay={i * 120}>
                <div className="rounded-3xl border border-line bg-card p-10">
                  <p className="font-condensed text-6xl font-medium text-primary sm:text-7xl">{v}</p>
                  <p className="subtitle mt-4">{l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap grid gap-14 lg:grid-cols-3">
          {[
            ["Tech Stack", p.tech],
            ["Integrations & Tools", p.tools],
            ["Platforms", p.platforms],
          ].map(([title, items]) => (
            <div key={title as string}>
              <Reveal>
                <h2 className="h3 mb-8 font-semibold">{title as string}</h2>
              </Reveal>
              <Chips items={items as string[]} />
            </div>
          ))}
        </div>
        {service && (
          <div className="wrap mt-12">
            <Link href={`/services/${service.slug}`} className="u-link inline-flex items-center gap-2 font-semibold text-primary">
              Explore our {service.name} services <Icon name="arrow" className="size-4" />
            </Link>
          </div>
        )}
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

      <CtaBand title={`Planning a product like ${p.client}?`} text="We've built this before. Let's talk about yours." />
    </>
  );
}
