import type { Metadata } from "next";
import { CardGrid, Chips, CtaBand, NumberedRows, SectionHead, Split } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import { SceneArt } from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Security",
  description: "Security practices that protect client data, code and infrastructure at Konsilience.",
};

export default function SecurityPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Security" }]}
        eyebrow="Trust & security"
        title={["Your Data,", <span key="p" className="text-primary">Protected</span>]}
        text="Security is part of how we work every day: people, processes and technology."
        actions={<Button>Request Our Security Pack</Button>}
        aside={<SceneArt hue={220} icon="shield" label="Security first" className="hidden aspect-[4/3] rounded-3xl lg:block" />}
      />
      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Security Pillars"]} />
          <div className="mt-14">
            <CardGrid
              cols={4}
              items={[
                { icon: "lock", title: "Data protection", text: "Encryption in transit and at rest, strict data segregation per client." },
                { icon: "users", title: "Access control", text: "SSO, MFA, least-privilege access and quarterly access reviews." },
                { icon: "code", title: "Secure SDLC", text: "Threat modelling, SAST/DAST, dependency scanning and code review." },
                { icon: "eye", title: "Monitoring", text: "24/7 logging, alerting and incident response playbooks." },
              ]}
            />
          </div>
        </div>
      </section>
      <section className="sec bg-black">
        <Split title={["Our Commitments"]}>
          <NumberedRows
            items={[
              { title: "NDAs before discussion", text: "Every engagement starts with a signed NDA and IP assignment." },
              { title: "Background-checked staff", text: "All team members are vetted and trained annually on security." },
              { title: "Secure facilities", text: "Access-controlled offices with clean-desk and device policies." },
              { title: "Incident transparency", text: "Clear notification timelines and post-incident reports." },
            ]}
          />
        </Split>
      </section>
      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Standards & Frameworks"]} />
          <div className="mt-12">
            <Chips items={["ISO/IEC 27001", "SOC 2", "OWASP Top 10", "NIST CSF", "CIS Benchmarks", "GDPR", "HIPAA", "PCI DSS"]} />
          </div>
        </div>
      </section>
      <CtaBand title="Have a security questionnaire?" text="Our security team will complete it for you." label="Contact Security Team" />
    </>
  );
}
