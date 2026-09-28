import type { Metadata } from "next";
import { CardGrid, CtaBand, NumberedRows, SectionHead, Split } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import Compliance from "@/components/sections/Compliance";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Compliance",
  description: "How Konsilience builds compliance into every layer of engineering.",
};

export default function CompliancePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Compliance" }]}
        eyebrow="Compliance"
        title={["Building With", "Compliance and", <span key="r" className="text-primary">Risk in Mind</span>]}
        text="Regulatory requirements are engineered into the architecture from day one, not bolted on before launch."
        actions={<Button>Talk to a Compliance Expert</Button>}
      />
      <Compliance />
      <section className="sec bg-black">
        <Split title={["Compliance", "by Design"]} text="How we embed compliance into delivery.">
          <NumberedRows
            items={[
              { title: "Requirements mapping", text: "Regulations are translated into user stories, controls and acceptance criteria during discovery." },
              { title: "Privacy by design", text: "Data minimisation, consent management, encryption and retention policies built in." },
              { title: "Audit-ready evidence", text: "Automated logging, access reviews and documentation generated as part of CI/CD." },
              { title: "Continuous monitoring", text: "Ongoing scanning, alerting and periodic reviews after go-live." },
            ]}
          />
        </Split>
      </section>
      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Industries We Support"]} />
          <div className="mt-14">
            <CardGrid
              cols={4}
              items={[
                { icon: "heart", title: "Healthcare", text: "HIPAA, HITECH, HL7 FHIR", href: "/industries/healthcare" },
                { icon: "chart", title: "Finance", text: "PCI DSS, SOX, PSD2", href: "/industries/finance" },
                { icon: "cart", title: "Retail", text: "GDPR, CCPA, PCI DSS", href: "/industries/retail-and-ecommerce" },
                { icon: "book", title: "Education", text: "FERPA, COPPA, GDPR", href: "/industries/education" },
              ]}
            />
          </div>
        </div>
      </section>
      <CtaBand title="Need a compliance-ready product?" text="Get a free readiness review for your platform." />
    </>
  );
}
