import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, SectionHead } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import ProjectCard from "@/components/page/ProjectCard";
import Compliance from "@/components/sections/Compliance";
import { SceneArt } from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { industryList, projects } from "@/lib/catalog";
import { facts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
  description: "Domain-specific digital solutions for healthcare, finance, retail, logistics, education and 13 more industries.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Industries" }]}
        eyebrow="Industries we serve"
        title={["Solving Complex", "Challenges Across", <span key="s" className="text-primary">Every Major Sector</span>]}
        text="We've built platforms for support, legal, HR, real estate, healthcare, construction and more, and we bring those lessons to every new domain."
        actions={<Button>Discuss Your Industry</Button>}
        stats={[[String(facts.industries), "Industries served"], [String(facts.platforms), "Platforms built"], [String(facts.technologies) + "+", "Technologies"], ["AI-first", "Delivery"]]}
      />

      <section className="sec bg-black">
        <div className="wrap grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industryList.map((ind, i) => (
            <Reveal key={ind.slug} delay={(i % 3) * 90}>
              <Link href={`/industries/${ind.slug}`} className="group block overflow-hidden rounded-3xl border border-line bg-card transition-colors hover:border-primary">
                <div className="overflow-hidden">
                  <SceneArt hue={ind.hue} icon={ind.icon} className="aspect-[16/10] transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-start justify-between gap-6 p-7">
                  <div>
                    <h2 className="subtitle">{ind.name}</h2>
                    <p className="fs-para mt-2 font-medium text-muted">{ind.short}</p>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black">
                    <Icon name="upRight" className="size-4" strokeWidth={2} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Industry Success Stories"]} action={<Button variant="ghost" href="/portfolio">All Case Studies</Button>} />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Compliance />
      <CtaBand title="Don't see your industry?" text="We learn domains fast. Tell us about yours." />
    </>
  );
}
