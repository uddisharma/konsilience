import type { Metadata } from "next";
import { CardGrid, Chips, CtaBand, NumberedRows, ProcessSteps, SectionHead, Split } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import Compliance from "@/components/sections/Compliance";
import Button from "@/components/ui/Button";
import { deliveryProcess, engagementModels, whyUs } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "How We Work",
  description: "Our delivery process, engagement models, communication and quality standards.",
};

const rituals = [
  { title: "Weekly demos", text: "See working software every week and steer priorities in real time." },
  { title: "Shared dashboards", text: "Live access to backlog, burn-up charts, test coverage and release status." },
  { title: "Dedicated product lead", text: "One accountable point of contact who knows your business and your roadmap." },
  { title: "Quarterly business reviews", text: "Step back to review outcomes, risks and the next quarter's plan with leadership." },
];

const quality = ["Code reviews on every PR", "80%+ automated test coverage", "CI/CD on every commit", "Security scanning (SAST/DAST)", "Performance budgets", "Accessibility checks (WCAG 2.2)", "Architecture decision records", "Post-release monitoring"];

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "How We Work" }]}
        eyebrow="Our process"
        title={["Predictable Delivery,", <span key="e" className="text-primary">Every Sprint</span>]}
        text="A transparent, outcome-driven way of working, refined over 3,000+ projects."
        actions={<Button>Start a Project</Button>}
        stats={[["2 wks", "Sprint length"], ["1 wk", "To kickoff"], ["98%", "On-time milestones"], ["24/7", "Post-launch support"]]}
      />
      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Our Delivery Process"]} />
          <div className="mt-14">
            <ProcessSteps steps={deliveryProcess} />
          </div>
        </div>
      </section>
      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Engagement Models"]} text="Pick the model that fits your stage and switch as you grow." />
          <div className="mt-14">
            <CardGrid items={engagementModels} />
          </div>
        </div>
      </section>
      <section className="sec bg-black">
        <Split title={["Communication", "& Transparency"]} text="You always know what's happening and why.">
          <NumberedRows items={rituals} />
        </Split>
      </section>
      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Quality Standards"]} text="Non-negotiables on every project." />
          <div className="mt-12">
            <Chips items={quality} />
          </div>
          <div className="mt-14">
            <CardGrid cols={4} items={whyUs} />
          </div>
        </div>
      </section>
      <Compliance />
      <CtaBand title="See our process in action." text="Book a call and we'll walk you through a real project plan." />
    </>
  );
}
