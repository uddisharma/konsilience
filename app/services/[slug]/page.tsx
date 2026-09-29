import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardGrid, Chips, CtaBand, ProcessSteps, SectionHead } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import ProjectCard from "@/components/page/ProjectCard";
import Faq from "@/components/sections/Faq";
import Testimonials from "@/components/sections/Testimonials";
import { SceneArt } from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { deliveryProcess, engagementModels, projects, serviceList, whyUs } from "@/lib/catalog";

const find = (slug: string) => serviceList.find((s) => s.slug === slug);

export function generateStaticParams() {
  return serviceList.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const s = find((await params).slug);
  return s ? { title: `${s.name} Services`, description: s.short } : {};
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const s = find((await params).slug);
  if (!s) notFound();

  const related = serviceList.filter((x) => x.category === s.category && x.slug !== s.slug).slice(0, 3);
  const work = [...projects.filter((p) => p.service === s.name), ...projects.filter((p) => p.service !== s.name)].slice(0, 3);
  const faqs = [
    { q: `How much does ${s.name} cost?`, a: "Cost depends on scope, complexity and team model. After a free discovery call we share a detailed, transparent estimate with milestones." },
    { q: `How long does a typical ${s.name} project take?`, a: "Most engagements deliver a first release in 8–16 weeks, followed by iterative improvements. We agree a timeline during discovery." },
    { q: "Will we own the source code and IP?", a: "Yes. All code, designs and intellectual property are transferred to you. We sign NDAs before any detailed discussion." },
    { q: "Can you work with our in-house team?", a: "Absolutely. We regularly embed alongside internal teams, follow your processes and tools, and hand over knowledge continuously." },
    { q: "Do you provide support after launch?", a: "Yes. We offer SLA-backed support, monitoring and continuous improvement plans tailored to your needs." },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }, { label: s.name }]}
        eyebrow={s.category}
        title={[s.name, <span key="s" className="text-primary">Services</span>]}
        text={`${s.short} Our senior-led teams combine strategy, design and engineering to deliver measurable results, fast.`}
        actions={
          <>
            <Button>Get a Free Quote</Button>
            <Button variant="outline" href="/portfolio">View Case Studies</Button>
          </>
        }
        aside={<SceneArt hue={220} icon={s.icon} label={s.category} className="hidden aspect-[4/3] rounded-3xl lg:block" />}
        stats={[["AI-first", "Delivery"], ["Senior", "Hands-on team"], ["8–16 wks", "Typical first release"], ["100%", "IP ownership"]]}
      />

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={[`Our ${s.name}`, "Capabilities"]} text={`End-to-end ${s.name} services tailored to your goals.`} />
          <div className="mt-14">
            <CardGrid
              items={s.offerings.map((o) => ({
                title: o,
                text: `Plan, build and scale ${o} with a team that has done it many times before, with quality, security and speed built in.`,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Why Choose Konsilience"]} text="What makes our teams different." />
          <div className="mt-14">
            <CardGrid cols={4} items={whyUs} />
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Our Process"]} />
          <div className="mt-14">
            <ProcessSteps steps={deliveryProcess} />
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Tools & Technologies"]} />
          <div className="mt-12">
            <Chips items={s.tech} />
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Related Work"]} action={<Button variant="ghost" href="/portfolio">All Case Studies</Button>} />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {work.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Engagement Models"]} />
          <div className="mt-14">
            <CardGrid items={engagementModels} />
          </div>
        </div>
      </section>

      <Testimonials />

      {related.length > 0 && (
        <section className="sec bg-black">
          <div className="wrap">
            <SectionHead title={["Related Services"]} />
            <div className="mt-14">
              <CardGrid items={related.map((r) => ({ icon: r.icon, title: r.name, text: r.short, href: `/services/${r.slug}` }))} />
            </div>
          </div>
        </section>
      )}

      <CtaBand title={`Ready to start your ${s.name} project?`} text="Share your idea and get a detailed estimate within 48 hours." label="Get a Free Quote" />
      <Faq items={faqs} title={`${s.name} FAQs`} />
    </>
  );
}
