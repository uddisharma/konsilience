import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CardGrid, Chips, CtaBand, NumberedRows, ProcessSteps, SectionHead, Split } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import ProjectCard from "@/components/page/ProjectCard";
import Compliance from "@/components/sections/Compliance";
import Faq from "@/components/sections/Faq";
import Testimonials from "@/components/sections/Testimonials";
import { SceneArt } from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/JsonLd";
import { deliveryProcess, engagementModels, industryList, projects, serviceList, whyUs } from "@/lib/catalog";
import { locationsList } from "@/lib/locationData";
import { siteUrl } from "@/lib/routes";
import { buildLocationPageSchema } from "@/lib/schema";

const findLocation = (slug: string) => locationsList.find((l) => l.slug === slug);

export function generateStaticParams() {
  return locationsList.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/locations/[slug]">): Promise<Metadata> {
  const loc = findLocation((await params).slug);
  if (!loc) return {};
  const url = `${siteUrl}/locations/${loc.slug}`;

  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    keywords: [
      `Mobile app development ${loc.name}`,
      `Software development company ${loc.name}`,
      `App developers ${loc.name}`,
      `Outsource software to India from ${loc.name}`,
      `Custom software ${loc.country}`,
      `Offshore developers ${loc.name}`,
      "Konsilience",
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${loc.h1} | Konsilience`,
      description: loc.metaDescription,
      url,
      images: [
        {
          url: `${siteUrl}/og?title=${encodeURIComponent(loc.h1)}&subtitle=${encodeURIComponent(loc.tagline)}`,
          width: 1200,
          height: 630,
          alt: loc.h1,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${loc.h1} | Konsilience`,
      description: loc.metaDescription,
      images: [`${siteUrl}/og?title=${encodeURIComponent(loc.h1)}`],
    },
  };
}

export default async function LocationPage({ params }: PageProps<"/locations/[slug]">) {
  const loc = findLocation((await params).slug);
  if (!loc) notFound();

  const services = loc.featuredServices
    .map((slug) => serviceList.find((s) => s.slug === slug))
    .filter((s): s is (typeof serviceList)[0] => !!s);

  const industries = loc.featuredIndustries
    .map((slug) => industryList.find((i) => i.slug === slug))
    .filter((i): i is (typeof industryList)[0] => !!i);

  const work = loc.featuredCaseStudies
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is (typeof projects)[0] => !!p);

  const otherLocations = locationsList.filter((l) => l.slug !== loc.slug);

  const schema = buildLocationPageSchema(loc, loc.faqs);

  return (
    <>
      <JsonLd data={schema} />

      <PageHero
        crumbs={[{ label: "Locations", href: "/locations" }, { label: loc.name }]}
        eyebrow={loc.eyebrow}
        title={[loc.h1]}
        text={loc.tagline}
        actions={
          <>
            <Button href="/contact">Book Free Strategy Call</Button>
            <Button variant="outline" href="/portfolio">Explore Case Studies</Button>
            <span className="flex items-center gap-2 self-center rounded-full border border-line bg-card px-4 py-2.5 text-sm font-medium text-white/85">
              <Icon name="shield" className="size-4 text-primary" /> {loc.complianceBadge}
            </span>
          </>
        }
        aside={
          <SceneArt
            hue={210}
            icon="compass"
            label={`${loc.name} Studio`}
            className="hidden aspect-[4/3] rounded-3xl lg:block"
          />
        }
        stats={loc.heroStats}
      />

      {/* The India Offshore Engineering Advantage */}
      <section className="sec bg-black">
        <Split title={["The Offshore", "Advantage"]} text={loc.whyOutsourceText}>
          <NumberedRows items={loc.outsourcingPoints} />
        </Split>
      </section>

      {/* Core Platform Services */}
      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead
            title={["Core Platform Services", `for ${loc.name}`]}
            text={`High-velocity mobile, web, and custom AI systems engineered to match ${loc.name} market standards.`}
            action={<Button variant="ghost" href="/services">All Services</Button>}
          />
          <div className="mt-14">
            <CardGrid
              cols={3}
              items={services.map((s) => ({
                icon: s.icon,
                title: s.name,
                text: s.short,
                href: `/services/${s.slug}`,
              }))}
            />
          </div>
        </div>
      </section>

      {/* Local Regulatory Compliance & Integrations */}
      <section className="sec bg-black">
        <div className="wrap grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHead
              title={["Local Compliance &", "Security Standards"]}
              text={`Architected for ${loc.country} data residency, statutory frameworks, and privacy laws.`}
            />
            <div className="mt-10 flex flex-col gap-4">
              {loc.localCompliance.map((c, i) => (
                <Reveal key={c.title} delay={i * 80}>
                  <div className="rounded-3xl border border-line bg-card p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid size-8 place-items-center rounded-full bg-primary/20 text-primary">
                        <Icon name="check" className="size-4" strokeWidth={2.5} />
                      </span>
                      <h3 className="subtitle !text-base">{c.title}</h3>
                    </div>
                    <p className="fs-para mt-3 text-muted">{c.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <SectionHead
              title={["Regional Payment &", "Ecosystem Integrations"]}
              text={`Pre-built connectivity with leading payment rails, government identity APIs, and cloud regions in ${loc.name}.`}
            />
            <div className="mt-10 flex flex-col gap-4">
              {loc.localIntegrations.map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                  <div className="rounded-3xl border border-line bg-card p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid size-8 place-items-center rounded-full bg-primary/20 text-primary">
                        <Icon name="layers" className="size-4" strokeWidth={2} />
                      </span>
                      <h3 className="subtitle !text-base">{item.title}</h3>
                    </div>
                    <p className="fs-para mt-3 text-muted">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proven Case Studies */}
      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead
            title={["Featured Production", "Platforms Delivered"]}
            text="Explore digital platforms we have engineered from concept to high-volume production scale."
            action={<Button variant="ghost" href="/portfolio">All Case Studies</Button>}
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {work.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve in this Region */}
      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead
            title={[`Key Industries`, `Served in ${loc.name}`]}
            text={`Specialized digital solutions engineered for ${loc.name}'s leading economic sectors.`}
            action={<Button variant="ghost" href="/industries">All Industries</Button>}
          />
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.slug} delay={i * 80}>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group block overflow-hidden rounded-3xl border border-line bg-card p-7 transition-all duration-300 hover:border-primary"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-2xl bg-black text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon name={ind.icon} className="size-6" strokeWidth={1.5} />
                    </span>
                    <span className="grid size-9 place-items-center rounded-full border border-line transition-all group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black">
                      <Icon name="upRight" className="size-3.5" strokeWidth={2} />
                    </span>
                  </div>
                  <h3 className="subtitle mt-5">{ind.name}</h3>
                  <p className="fs-para mt-2 font-medium text-muted">{ind.short}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Process */}
      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead
            title={["How We Deliver Across Borders"]}
            text="A proven agile delivery framework built for distributed teams, clear milestones, and complete transparency."
          />
          <div className="mt-14">
            <ProcessSteps steps={deliveryProcess} />
          </div>
        </div>
      </section>

      {/* Flexible Engagement Models */}
      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead
            title={["Engagement Models", `for ${loc.name} Clients`]}
            text="Choose the engagement model that fits your product stage, budget, and delivery velocity."
          />
          <div className="mt-14">
            <CardGrid items={engagementModels} />
          </div>
        </div>
      </section>

      {/* Switch Location / Global Delivery Network */}
      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead
            title={["Global Delivery Hubs"]}
            text="Explore how Konsilience partners with startups and enterprises across major international tech centers."
            action={<Button variant="ghost" href="/locations">All Locations</Button>}
          />
          <div className="mt-12">
            <Chips
              items={otherLocations.map((l) => ({
                label: `${l.name} (${l.country})`,
                href: `/locations/${l.slug}`,
              }))}
            />
          </div>
        </div>
      </section>

      <Compliance />
      <Testimonials />

      <CtaBand
        title={`Ready to build your next platform for ${loc.name}?`}
        text="Book a 30-minute discovery call with our senior architects. Get a detailed architectural roadmap and cost estimate within 48 hours."
        label="Schedule Discovery Call"
        href="/contact"
      />

      <Faq
        title={`${loc.name} Software & App Development FAQs`}
        items={loc.faqs}
      />
    </>
  );
}
