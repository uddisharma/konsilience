import type { Metadata } from "next";
import Link from "next/link";
import { CardGrid, Chips, CtaBand, ProcessSteps, SectionHead, Split } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import ProjectCard from "@/components/page/ProjectCard";
import Compliance from "@/components/sections/Compliance";
import Testimonials from "@/components/sections/Testimonials";
import { SceneArt } from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { deliveryProcess, engagementModels, projects, whyUs } from "@/lib/catalog";
import { locationsList } from "@/lib/locationData";
import { siteUrl } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Global Software & Mobile App Development Hub | Offshore Locations",
  description: "Explore Konsilience's global technology delivery hubs across Dubai, UAE, Canada, USA, UK, Australia, and Germany. Senior engineering pods from India with local compliance.",
  keywords: [
    "Outsource software development to India",
    "Offshore app development company",
    "App development Dubai",
    "Software outsourcing Canada",
    "Offshore engineering USA",
    "UK software development partner",
    "Konsilience Global Hubs",
  ],
  alternates: { canonical: `${siteUrl}/locations` },
  openGraph: {
    title: "Global Delivery Hubs & Offshore Engineering | Konsilience",
    description: "Senior-led software engineering and mobile app development for international enterprises and startups.",
    url: `${siteUrl}/locations`,
    images: [{ url: `${siteUrl}/og?title=Global+Delivery+Hubs&subtitle=Offshore+Engineering+Studio`, width: 1200, height: 630, alt: "Global Delivery Hubs" }],
  },
};

export default function LocationsIndexPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Locations" }]}
        eyebrow="Global Technology Delivery"
        title={["Software & App", <span key="l" className="text-primary">Development Hubs</span>]}
        text="Partner with senior Indian engineering squads delivering silicon-grade mobile apps, SaaS platforms, and AI architectures across Dubai, North America, Europe, and the Asia-Pacific."
        actions={
          <>
            <Button href="/contact">Book an Offshore Strategy Call</Button>
            <Button variant="outline" href="/portfolio">Explore Client Work</Button>
          </>
        }
        aside={
          <SceneArt
            hue={210}
            icon="compass"
            label="Global Delivery"
            className="hidden aspect-[4/3] rounded-3xl lg:block"
          />
        }
        stats={[
          ["8+", "Global Target Regions"],
          ["60%+", "Average Cost Advantage"],
          ["100%", "Source Code & IP Ownership"],
          ["24/7", "Continuous Delivery Cycles"],
        ]}
      />

      {/* Global Locations Grid */}
      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead
            title={["International Delivery Hubs", "& Regional Focus"]}
            text="Explore region-specific compliance frameworks, local payment integrations, and dedicated engineering pods."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locationsList.map((loc, i) => (
              <Reveal key={loc.slug} delay={i * 80}>
                <Link
                  href={`/locations/${loc.slug}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary"
                >
                  <div className="absolute -top-24 -right-24 size-48 rounded-full bg-primary/0 blur-3xl transition-colors duration-700 group-hover:bg-primary/30" />
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <span className="rounded-full border border-line bg-black px-3.5 py-1 text-xs font-semibold text-primary">
                        {loc.region}
                      </span>
                      <span className="grid size-10 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black">
                        <Icon name="upRight" className="size-4" strokeWidth={2} />
                      </span>
                    </div>

                    <h2 className="subtitle mt-6 text-xl">{loc.name}</h2>
                    <p className="fs-para mt-2 font-medium text-muted">{loc.tagline}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      <span className="rounded-md border border-line bg-black/40 px-2.5 py-1 text-xs font-semibold text-white/80">
                        🛡️ {loc.complianceBadge}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-line pt-5 text-sm font-semibold text-primary transition-colors group-hover:text-white">
                    Explore {loc.name} Services & Case Studies →
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Global Offshore Advantage */}
      <section className="sec bg-black">
        <Split
          title={["Why Outsource to", "Konsilience India?"]}
          text="A modern, senior-led product engineering studio bridging international product vision with Indian software scalability."
        >
          <div className="flex flex-col gap-6">
            {[
              {
                title: "Overnight Development Cycles (24-Hour Velocity)",
                text: "For North American and European clients, the timezone offset unlocks non-stop progress. Features specified during your workday are engineered, tested, and staged overnight in India.",
              },
              {
                title: "50%–65% Engineering Cost Advantage",
                text: "Avoid astronomical domestic agency rates in London, New York, Toronto, or Dubai. Redirect your technology budget into building more features and deeper test automation.",
              },
              {
                title: "Rigorous Code Quality & Automated QA",
                text: "We reject typical offshore maintenance shortcuts. Every commit undergoes automated linting, unit testing, integration tests via Playwright, and containerized CI/CD builds.",
              },
              {
                title: "Full Intellectual Property Transfer & Ironclad NDAs",
                text: "We operate under enforceable international contracts and bilateral NDAs. All source code, design systems, and patentable logic belong 100% to your company from commit one.",
              },
            ].map((item, idx) => (
              <Reveal key={item.title} delay={idx * 80}>
                <div className="rounded-3xl border border-line bg-card p-6">
                  <span className="font-condensed text-2xl font-bold text-primary">[ 0{idx + 1} ]</span>
                  <h3 className="subtitle mt-3">{item.title}</h3>
                  <p className="fs-para mt-2 text-muted">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Split>
      </section>

      {/* Featured Global Case Studies */}
      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead
            title={["Production Platforms", "Engineered for Global Clients"]}
            text="High-concurrency systems, mobile apps, and SaaS products delivered with senior engineering precision."
            action={<Button variant="ghost" href="/portfolio">All Case Studies</Button>}
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Process */}
      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead
            title={["How We Collaborate Globally"]}
            text="A proven agile framework providing complete visibility inside your Slack, Jira, and GitHub."
          />
          <div className="mt-14">
            <ProcessSteps steps={deliveryProcess} />
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead
            title={["Flexible Global Engagement Models"]}
            text="Choose between Dedicated Pods, Fixed-Scope Milestones, or Staff Augmentation."
          />
          <div className="mt-14">
            <CardGrid items={engagementModels} />
          </div>
        </div>
      </section>

      <Compliance />
      <Testimonials />

      <CtaBand
        title="Ready to discuss your cross-border software project?"
        text="Book a 30-minute discovery consultation with our senior architects. We provide a full roadmap and fixed estimate within 48 hours."
        label="Book Discovery Call"
        href="/contact"
      />
    </>
  );
}
