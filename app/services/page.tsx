import type { Metadata } from "next";
import { CardGrid, Chips, CtaBand, ProcessSteps, SectionHead, Split } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import Testimonials from "@/components/sections/Testimonials";
import { DashboardArt } from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";
import { deliveryProcess, engagementModels, serviceCategories, serviceList, techStack } from "@/lib/catalog";
import { brand, facts } from "@/lib/content";

import { siteUrl } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Digital Engineering & Technology Services",
  description: "Product engineering, cloud architecture, custom SaaS development, AI integration, and consulting services from Konsilience.",
  keywords: ["Software Engineering Services", "SaaS Development", "AI Integration", "Cloud Architecture", "CTO Consulting"],
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    title: "Technology & Software Engineering Services | Konsilience",
    description: "End-to-end capabilities from strategy and UI/UX design to full-stack engineering, AI, and cloud operations.",
    url: `${siteUrl}/services`,
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "Technology & Software Engineering Services | Konsilience" }],
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services" }]}
        eyebrow="What we do"
        title={["Technology Services", "Built Around Your", <span key="g" className="text-primary">Business Goals</span>]}
        text="From strategy and design to engineering, data and 24/7 operations: every capability you need to launch, modernize and scale."
        actions={
          <>
            <Button>Get a Free Consultation</Button>
            <Button variant="outline" href="/portfolio">See Our Work</Button>
          </>
        }
        aside={<DashboardArt hue={220} className="hidden aspect-[4/3] rounded-3xl border border-line lg:block" />}
        stats={[[`${serviceList.length}`, "Specialized services"], ["70+", "Projects done"], [String(facts.industries), "Industries served"], ["24h", "Response time"]]}
      />

      {serviceCategories.map((c, i) => (
        <section key={c.name} className={`sec bg-black ${i ? "pt-0" : ""}`}>
          <Split title={[c.name]} text={c.text}>
            <CardGrid
              cols={2}
              items={serviceList
                .filter((s) => s.category === c.name)
                .map((s) => ({ icon: s.icon, title: s.name, text: s.short, href: `/services/${s.slug}` }))}
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
