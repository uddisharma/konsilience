import type { Metadata } from "next";
import { CardGrid, CtaBand, SectionHead } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import { LeaderCard } from "@/components/page/People";
import Button from "@/components/ui/Button";
import { leaders } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Leadership Team",
  description: "Meet the leaders behind Konsilience.",
};

const practices = [
  { icon: "code", title: "Engineering", text: "900+ engineers across web, mobile, cloud and platform." },
  { icon: "eye", title: "Design", text: "120+ product designers, researchers and UX writers." },
  { icon: "spark", title: "KonAI", text: "60+ ML engineers, data scientists and AI architects." },
  { icon: "db", title: "Data", text: "150+ data engineers and analytics specialists." },
  { icon: "target", title: "Delivery", text: "Product managers, BAs and delivery leads for every squad." },
  { icon: "shield", title: "QA & Security", text: "Automation, performance and security testing specialists." },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Leadership Team" }]}
        eyebrow="Our people"
        title={["The People Behind", <span key="k" className="text-primary">Konsilience</span>]}
        text="Operators, engineers and designers who have built and scaled products for startups and global enterprises."
        actions={<Button href="/careers">Join the Team</Button>}
      />
      <section className="sec bg-black pt-0">
        <div className="wrap grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {leaders.map((l, i) => (
            <LeaderCard key={l.name} {...l} i={i} />
          ))}
        </div>
      </section>
      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Our Practices"]} text="1,500+ specialists organised into focused, cross-functional practices." />
          <div className="mt-14">
            <CardGrid items={practices} />
          </div>
        </div>
      </section>
      <CtaBand title="Want to work with the best?" text="We're always looking for curious, talented people." label="See Open Roles" href="/careers" />
    </>
  );
}
