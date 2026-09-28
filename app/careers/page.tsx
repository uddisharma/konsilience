import type { Metadata } from "next";
import Link from "next/link";
import { CardGrid, CtaBand, NumberedRows, SectionHead, Split } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import { SceneArt } from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { jobs } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Konsilience and build products that matter with people who care about craft.",
};

const benefits = [
  { icon: "heart", title: "Health & wellbeing", text: "Comprehensive health cover for you and your family, plus wellness allowances." },
  { icon: "book", title: "Learning budget", text: "Annual budget for courses, certifications and conferences." },
  { icon: "home", title: "Flexible work", text: "Remote, hybrid or in-office: choose what works for you." },
  { icon: "rocket", title: "Career growth", text: "Clear career paths, mentorship and internal mobility across practices." },
  { icon: "spark", title: "AI-first tooling", text: "The latest AI tools and hardware to do your best work." },
  { icon: "users", title: "Great people", text: "Hack days, offsites and a culture that celebrates craft." },
];

const hiring = [
  { title: "Apply", text: "Send your CV and a short note. We read every application." },
  { title: "Intro call", text: "A 30-minute chat with our talent team about you and the role." },
  { title: "Skills round", text: "A practical, respectful exercise that reflects real work." },
  { title: "Team interview", text: "Meet the people you'll work with every day." },
  { title: "Offer", text: "Decision within a week, with transparent compensation." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Careers" }]}
        eyebrow="We're hiring"
        title={["Build What's Next", <span key="w" className="text-primary">With Us</span>]}
        text="Join 1,500+ engineers, designers and AI specialists building products used by millions."
        actions={<Button href="#openings">View Open Roles</Button>}
        aside={<SceneArt hue={250} icon="users" label="Life at Konsilience" className="hidden aspect-[4/3] rounded-3xl lg:block" />}
        stats={[["1,500+", "Team members"], ["30+", "Nationalities"], ["4.6/5", "Employee rating"], ["5", "Global offices"]]}
      />

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Why Konsilience"]} text="Benefits designed around how you actually live and work." />
          <div className="mt-14">
            <CardGrid items={benefits} />
          </div>
        </div>
      </section>

      <section id="openings" className="sec scroll-mt-24 bg-black">
        <div className="wrap">
          <SectionHead title={["Open Positions"]} text={`${jobs.length} roles open right now.`} />
          <div className="mt-12 border-t border-line">
            {jobs.map((j, i) => (
              <Reveal key={j.slug} delay={i * 60} variant="fade">
                <Link href={`/careers/${j.slug}`} className="group grid items-center gap-4 border-b border-line py-7 md:grid-cols-[1.4fr_1fr_1fr_auto]">
                  <div>
                    <h3 className="subtitle transition-colors group-hover:text-primary">{j.title}</h3>
                    <p className="text-sm text-muted">{j.team}</p>
                  </div>
                  <span className="flex items-center gap-2 text-sm text-white/80"><Icon name="pin" className="size-4" /> {j.location}</span>
                  <span className="flex items-center gap-2 text-sm text-white/80"><Icon name="briefcase" className="size-4" /> {j.type} · {j.exp}</span>
                  <span className="grid size-11 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary">
                    <Icon name="upRight" className="size-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <Split title={["Our Hiring", "Process"]} text="Fast, fair and transparent. Most processes finish within two weeks.">
          <NumberedRows items={hiring} />
        </Split>
      </section>

      <CtaBand title="Don't see the right role?" text="Send us your CV anyway. We're always meeting great people." label="Send Your CV" href={`mailto:careers@konsilience.com`} />
    </>
  );
}
