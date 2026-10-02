import type { Metadata } from "next";
import { CtaBand, NumberedRows, SectionHead, Split } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import { RoleCard } from "@/components/page/People";
import Button from "@/components/ui/Button";
import { team } from "@/lib/catalog";
import { brand, facts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Team",
  description: `Meet the team behind ${brand.name}.`,
};

const why = [
  { title: "You talk to the builders", text: "No account managers in the middle. The engineers and designers on your project join your calls." },
  { title: "Senior by default", text: "A small team means everyone is hands-on and experienced. There are no juniors learning on your budget." },
  { title: "AI in every workflow", text: "We use AI coding, testing and research tools daily, so a lean team ships like a bigger one." },
  { title: "One team, every discipline", text: "Strategy, design, engineering, AI and QA sit together, so nothing gets lost in handoffs." },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Our Team" }]}
        eyebrow="Our people"
        title={["Small Team.", <span key="b" className="text-primary">Big Output.</span>]}
        text={`${brand.name} is an AI-first team of engineers, designers and product people based in Mohali, Punjab.`}
        actions={<Button href="/careers">Join the Team</Button>}
        stats={[[String(brand.founded), "Founded"], ["70+", "Projects done"], [String(facts.industries), "Industries served"], [String(team.length), "Disciplines"]]}
      />
      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Who Builds", "Your Product"]} text="Every project gets a dedicated squad drawn from these roles." />
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((t, i) => (
              <RoleCard key={t.role} {...t} i={i} />
            ))}
          </div>
        </div>
      </section>
      <section className="sec bg-black">
        <Split title={["Why a Small", "Team Works"]}>
          <NumberedRows items={why} />
        </Split>
      </section>
      <CtaBand title="Want to build with us?" text="We're growing carefully and always happy to meet talented people." label="See Open Roles" href="/careers" />
    </>
  );
}
