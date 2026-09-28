import type { Metadata } from "next";
import { CardGrid, CtaBand, NumberedRows, SectionHead, Split } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import { LeaderCard } from "@/components/page/People";
import Awards from "@/components/sections/Awards";
import Clients from "@/components/sections/Clients";
import Stats from "@/components/sections/Stats";
import { SceneArt } from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { leaders } from "@/lib/catalog";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description: `${brand.name} is a digital engineering company where strategy, design, engineering and AI come together.`,
};

const values = [
  { title: "Many disciplines, one outcome", text: "Consilience means knowledge converging. Strategists, designers, engineers and data scientists work as one team on one goal." },
  { title: "Engineering over theatre", text: "We ship working software early and often. Demos over decks, measurable results over promises." },
  { title: "Radical transparency", text: "Open roadmaps, honest estimates and weekly reporting. You always know where your product stands." },
  { title: "Security by default", text: "Privacy, compliance and security are designed in from day one, not bolted on before launch." },
  { title: "Long-term partnership", text: "Most of our clients stay with us for years. We measure success by the value we keep creating." },
];

const timeline = [
  { year: "2014", title: "Founded", text: "Started as a five-person product studio building mobile apps for startups." },
  { year: "2017", title: "Enterprise practice", text: "Launched enterprise engineering and delivered our first Fortune 500 platform." },
  { year: "2019", title: "Going global", text: "Opened offices in the US and UAE to serve clients across three continents." },
  { year: "2021", title: "Data & Cloud", text: "Built dedicated data engineering and cloud practices with 200+ specialists." },
  { year: "2023", title: `${brand.ai} launched`, text: "Our AI center of excellence for agentic and generative AI systems." },
  { year: "2026", title: "1,500+ experts", text: "Serving clients in 35+ industries from 5 global delivery centers." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About Us" }]}
        eyebrow="About Konsilience"
        title={["Where Knowledge", "Converges Into", <span key="p" className="text-primary">Great Products</span>]}
        text={`${brand.name} brings strategy, design, engineering and AI together under one roof, so ambitious companies can build digital systems that last.`}
        actions={
          <>
            <Button>Work With Us</Button>
            <Button variant="outline" href="/careers">Join Our Team</Button>
          </>
        }
        stats={[["12+", "Years of experience"], ["1,500+", "Technology specialists"], ["3,000+", "Solutions delivered"], ["35+", "Industries served"]]}
      />

      <section className="sec bg-black">
        <Split
          title={["Our Story"]}
          text="From a small product studio to a global engineering partner, one idea has stayed the same."
        >
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
                Today our cross-functional teams help startups find product-market fit and help enterprises modernize the platforms their
                business runs on. Every engagement is led by senior practitioners and measured by outcomes, not hours.
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
              { icon: "target", title: "Our Mission", text: "To help organisations turn ideas into secure, intelligent, scalable digital systems by combining every discipline it takes to get there." },
              { icon: "globe", title: "Our Vision", text: "To be the most trusted partner for companies building the next decade of digital products, where AI and human expertise work as one." },
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
          <SectionHead title={["Our Journey"]} text="Milestones that shaped who we are today." />
        </div>
        <div className="wrap mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
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
          <SectionHead title={["Meet Our Leadership"]} text="Experienced operators and engineers who stay close to the work." action={<Button variant="ghost" href="/about/team">View Full Team</Button>} />
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.slice(0, 4).map((l, i) => (
              <LeaderCard key={l.name} {...l} i={i} />
            ))}
          </div>
        </div>
      </section>

      <Clients />
      <Awards />
      <CtaBand title="Let's build something that lasts." text="Tell us about your goals. A solution architect will get back to you within one business day." />
    </>
  );
}
