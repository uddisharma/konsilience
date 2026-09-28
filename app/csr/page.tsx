import type { Metadata } from "next";
import { CardGrid, CtaBand, SectionHead } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import { SceneArt } from "@/components/ui/Artwork";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Corporate Social Responsibility",
  description: "How Konsilience gives back through education, sustainability and community programs.",
};

// PLACEHOLDER: replace with Konsilience's real CSR initiatives and figures.
export default function CsrPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "CSR" }]}
        eyebrow="Giving back"
        title={["Technology for", <span key="g" className="text-primary">Good</span>]}
        text="We use our skills, time and resources to create opportunity and protect the planet."
        stats={[["10K+", "Students trained"], ["25K", "Volunteer hours"], ["40%", "Renewable energy"], ["30+", "NGO partners"]]}
      />
      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Our Initiatives"]} />
          <div className="mt-14">
            <CardGrid
              items={[
                { icon: "book", title: "Code for Tomorrow", text: "Free coding bootcamps for students from under-served communities.", list: ["Weekend bootcamps", "Mentorship", "Job placement support"] },
                { icon: "leaf", title: "Green Engineering", text: "Reducing the carbon footprint of our offices and the software we build.", list: ["Energy-efficient cloud", "Carbon-aware design", "Paperless offices"] },
                { icon: "heart", title: "Tech for NGOs", text: "Pro-bono digital products for non-profits and social enterprises.", list: ["Pro-bono projects", "Volunteer days", "Donation matching"] },
              ]}
            />
          </div>
        </div>
      </section>
      <section className="sec bg-black pt-0">
        <div className="wrap grid gap-3 md:grid-cols-3">
          {[[140, "leaf", "Tree plantation drives"], [200, "book", "Classroom sessions"], [330, "heart", "Community health camps"]].map(([h, icon, label], i) => (
            <Reveal key={label as string} delay={i * 100}>
              <SceneArt hue={h as number} icon={icon as string} label={label as string} className="aspect-[4/3] rounded-3xl" />
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand title="Partner with us for impact." text="Are you an NGO or social enterprise? Let's talk." label="Get in Touch" />
    </>
  );
}
