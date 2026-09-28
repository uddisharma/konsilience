import type { Metadata } from "next";
import { CardGrid, CtaBand, SectionHead } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import Awards from "@/components/sections/Awards";
import Clients from "@/components/sections/Clients";

export const metadata: Metadata = {
  title: "Awards & Recognition",
  description: "Industry awards and recognition earned by Konsilience.",
};

export default function AwardsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Awards" }]}
        eyebrow="Recognition"
        title={["Proven Expertise.", <span key="g" className="text-primary">Globally Accredited.</span>]}
        text="Independent recognition for our engineering excellence, growth and workplace culture."
        stats={[["20+", "Global awards"], ["4.9/5", "Review platforms"], ["Top 1%", "Development partners"], ["5", "Years running"]]}
      />
      <Awards />
      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Certifications"]} text="Standards we operate under." />
          <div className="mt-14">
            <CardGrid
              cols={4}
              items={[
                { icon: "shield", title: "ISO/IEC 27001", text: "Information security management." },
                { icon: "check", title: "ISO 9001", text: "Quality management systems." },
                { icon: "lock", title: "SOC 2 Type II", text: "Security, availability and confidentiality." },
                { icon: "heart", title: "HIPAA Ready", text: "Healthcare data protection practices." },
              ]}
            />
          </div>
        </div>
      </section>
      <Clients />
      <CtaBand title="Work with an award-winning team." />
    </>
  );
}
