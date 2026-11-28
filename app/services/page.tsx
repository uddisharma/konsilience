import type { Metadata } from "next";
import { CardGrid, Chips, CtaBand, ProcessSteps, SectionHead, Split } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import Testimonials from "@/components/sections/Testimonials";
import SiteImg from "@/components/ui/SiteImg";
import { image, ogImage } from "@/lib/images";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/JsonLd";
import { deliveryProcess, engagementModels, serviceCategories, serviceList, slugify, techStack } from "@/lib/catalog";
import { brand, facts } from "@/lib/content";
import { siteUrl } from "@/lib/routes";
import { buildServicesIndexSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Digital Engineering & Technology Services",
  description: "AI and automation, cloud and DevOps, security, product engineering and digital marketing services from Konsilience.",
  keywords: ["AI Automation Services", "Cloud and DevOps Services", "Security Services", "Product Engineering", "Digital Marketing Services"],
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    title: "Technology & Software Engineering Services | Konsilience",
    description: "Five practices under one roof: AI and automation, cloud and DevOps, security, product engineering and digital marketing.",
    url: `${siteUrl}/services`,
    images: [ogImage("/services")!],
  },
  twitter: { card: "summary_large_image", images: [ogImage("/services")!.url] },
};

export default function ServicesPage() {
  const schema = buildServicesIndexSchema(serviceList);

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        crumbs={[{ label: "Services" }]}
        eyebrow="What we do"
        title={["Technology Services", "Built Around Your", <span key="g" className="text-primary">Business Goals</span>]}
        text="AI and automation, cloud and DevOps, security, product engineering and digital marketing: the capabilities you need to launch, run and grow."
        actions={
          <>
            <Button>Get a Free Consultation</Button>
            <Button variant="outline" href="/portfolio">See Our Work</Button>
          </>
        }
        aside={<SiteImg img={image("services-overview")} priority className="hidden aspect-[4/3] w-full rounded-3xl border border-line object-cover lg:block" />}
        stats={[[`${serviceList.length}`, "Specialized services"], ["35+", "Projects done"], [String(facts.industries), "Industries served"], ["24h", "Response time"]]}
      />

      {serviceCategories.map((c, i) => (
        <section key={c.name} id={slugify(c.name)} className={`sec scroll-mt-28 bg-black ${i ? "pt-0" : ""}`}>
          <Split title={[c.name]} text={c.text}>
            <CardGrid
              cols={2}
              items={serviceList
                .filter((s) => s.category === c.name)
                .map((s) => ({ icon: s.icon, title: s.note ? `${s.name} (${s.note})` : s.name, text: s.short, href: `/services/${s.slug}` }))}
            />
          </Split>
        </section>
      ))}

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["How We Deliver"]} text="A proven five-phase process that keeps projects predictable." />
          <div className="mt-14">
            <ProcessSteps steps={deliveryProcess} />
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Engagement Models"]} text="Choose the way of working that fits your stage, budget and team." />
          <div className="mt-14">
            <CardGrid items={engagementModels} />
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Our Technology Stack"]} text="Modern, proven tools we use to build and run your products." />
          <div className="mt-12">
            <Chips items={techStack} />
          </div>
        </div>
      </section>

      <Testimonials />
      <CtaBand title="Not sure which service you need?" text="Book a free 30-minute call and we'll help you map the right approach." />
    </>
  );
}
