import type { Metadata } from "next";
import { CardGrid, CtaBand, NumberedRows, SectionHead, Split } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import { FounderCard, RoleCard } from "@/components/page/People";
import Clients from "@/components/sections/Clients";
import Stats from "@/components/sections/Stats";
import { SceneArt } from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { team } from "@/lib/catalog";
import { brand, facts } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description: `${brand.name} is an AI-first product studio from Mohali: a small senior team building SaaS platforms, apps and AI systems.`,
};

const values = [
  { title: "Many disciplines, one outcome", text: "Consilience means knowledge converging. Strategy, design, engineering and AI work as one team on one goal." },
  { title: "Engineering over theatre", text: "We ship working software early and often. Demos over decks, measurable results over promises." },
  { title: "Radical transparency", text: "Open roadmaps, honest estimates and weekly demos. You always know where your product stands." },
  { title: "Security by default", text: "Privacy, compliance and security are designed in from day one, not bolted on before launch." },
  { title: "Small team, senior talent", text: "You work directly with the people who build your product. No layers, no handoffs, no juniors learning on your budget." },
];

// Journey. Only the founding year is confirmed; the middle steps are ordered, not dated.
const timeline = [
  { year: String(brand.founded), title: `${brand.name} founded`, text: `Started by ${brand.founders.map((f) => f.name.split(" ")[0]).join(", ").replace(/, ([^,]*)$/, " and $1")} with one goal: build products the right way.` },
  { year: "Step 2", title: "First platform shipped", text: "Delivered our first SaaS build end to end, from discovery to launch." },
  { year: "Step 3", title: `${brand.product.name} launched`, text: "Our own AI observability platform for teams running LLMs in production." },
  { year: String(new Date().getFullYear()), title: `${facts.platforms} platforms built`, text: `Support, legal, HR, real estate, healthcare and more, across ${facts.industries} industries.` },
  { year: "Next", title: "What's next", text: "Growing the team carefully and partnering with ambitious founders." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About Us" }]}
        eyebrow="About Konsilience"
        title={["A Young Studio", "With a Proven", <span key="p" className="text-primary">Portfolio</span>]}
        text={`${brand.name} is an AI-first product studio in Mohali, Punjab. Our ${brand.teamSize}-person team brings strategy, design, engineering and AI together to build products that last.`}
        actions={
          <>
            <Button>Work With Us</Button>
            <Button variant="outline" href="/careers">Join Our Team</Button>
          </>
        }
        stats={[[String(brand.founded), "Founded"], [String(facts.platforms), "Platforms built"], [String(brand.teamSize), "Core team members"], [String(facts.industries), "Industries served"]]}
      />

      <section className="sec bg-black">
        <Split title={["Our Story"]} text="Why we started, and the idea behind our name.">
          <div className="flex flex-col gap-8">
            <Reveal>
              <p className="subtitle !font-normal text-white/85">
                <b className="font-bold text-white">Consilience</b> is the principle that knowledge from different fields converges to explain
                the world better. We built {brand.name} around that idea: the best digital products happen when business strategy, human-centred
                design, rigorous engineering and applied AI stop working in silos.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <p className="fs-base font-medium text-muted">
                Founded in {brand.founded} by {brand.founders.map((f) => f.name).join(", ").replace(/, ([^,]*)$/, " and $1")}, we have grown into a
                {" "}{brand.teamSize}-person team of engineers, designers and AI specialists that has shipped {facts.platforms} platforms across{" "}
                {facts.industries} industries. We work with startups and growing businesses that want senior talent, AI-first delivery and
                direct access to the people building their product.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <SceneArt hue={220} icon="users" label="One team, every discipline" className="aspect-[16/9] rounded-3xl" />
            </Reveal>
          </div>
        </Split>
      </section>

      <section className="sec bg-black pt-0">
        <div className="wrap">
          <CardGrid
            cols={2}
            items={[
              { icon: "target", title: "Our Mission", text: "To help founders and growing teams turn ideas into secure, intelligent, scalable products, combining every discipline it takes to get there." },
              { icon: "globe", title: "Our Vision", text: "To become the go-to AI-first product partner for ambitious companies, known for quality, speed and honesty." },
            ]}
          />
        </div>
      </section>

      <section className="sec bg-black">
        <Split title={["What We", "Stand For"]} text="The principles that guide how we hire, build and partner.">
          <NumberedRows items={values} />
        </Split>
      </section>

      <section className="sec overflow-hidden bg-black">
        <div className="wrap">
          <SectionHead title={["Our Journey"]} text="Early days, and we're just getting started." />
        </div>
        <div className="wrap mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 90}>
              <div className="group relative h-full rounded-3xl border border-line bg-card p-6 transition-colors hover:border-primary">
                <p className="font-condensed text-5xl font-medium text-primary">{t.year}</p>
                <p className="subtitle mt-6">{t.title}</p>
                <p className="fs-para mt-2 font-medium text-muted">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Stats />

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead
            title={["Meet the Founders"]}
            text={`Leading a ${brand.teamSize}-person team with every discipline you need to ship.`}
            action={<Button variant="ghost" href="/about/team">View Full Team</Button>}
          />
          <div className="mt-14 grid gap-3 md:grid-cols-3">
            {brand.founders.map((f, i) => (
              <FounderCard key={f.name} {...f} i={i} />
            ))}
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {team.slice(1, 4).map((t, i) => (
              <RoleCard key={t.role} {...t} i={i} />
            ))}
          </div>
        </div>
      </section>

      <Clients />
      <CtaBand title="Let's build something that lasts." text="Tell us about your idea. A senior engineer will get back to you within one business day." />
    </>
  );
}
