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
import { siteUrl } from "@/lib/routes";
import { serviceData } from "@/lib/serviceData";

const find = (slug: string) => serviceList.find((s) => s.slug === slug);

export function generateStaticParams() {
  return serviceList.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const s = find((await params).slug);
  if (!s) return {};
  const url = `${siteUrl}/services/${s.slug}`;
  return {
    title: `${s.name} Services | Custom Software & AI Engineering`,
    description: `${s.short} Partner with senior Konsilience engineers for scalable, enterprise-grade ${s.name.toLowerCase()} services.`,
    keywords: [s.name, `${s.name} Services`, `${s.name} Development`, "Digital Engineering", ...s.tech],
    alternates: { canonical: url },
    openGraph: {
      title: `${s.name} Services | Konsilience`,
      description: s.short,
      url,
      images: [
        {
          url: `${siteUrl}/og?title=${encodeURIComponent(s.name + " Services")}&subtitle=${encodeURIComponent(s.short)}`,
          width: 1200,
          height: 630,
          alt: `${s.name} Services`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${s.name} Services | Konsilience`,
      description: s.short,
      images: [`${siteUrl}/og?title=${encodeURIComponent(s.name + " Services")}`],
    },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const s = find((await params).slug);
  if (!s) notFound();

  const details = serviceData[s.slug];
  const related = serviceList.filter((x) => x.category === s.category && x.slug !== s.slug).slice(0, 3);
  const work = [...projects.filter((p) => p.service === s.name), ...projects.filter((p) => p.service !== s.name)].slice(0, 3);
  const faqs = details?.faqs ?? [
    { q: `What is included in your ${s.name} engagement?`, a: `Our senior team provides architecture, design, end-to-end implementation and SLA-backed support for ${s.name.toLowerCase()}.` },
    { q: `How long does a typical ${s.name} initiative take?`, a: "Most teams deliver a working milestone in 6–12 weeks with continuous integration and weekly demos." },
    { q: "Will we own the intellectual property and code?", a: "Yes. All source code, design systems, infrastructure blueprints, and IP belong entirely to you." },
    { q: "Can you embed with our existing engineers?", a: "Yes. We work inside your Slack, Jira, and GitHub, following your engineering practices and mentoring your team." },
  ];

  const heroStats = details?.heroStats ?? [
    ["Senior", "Engineers Only"],
    ["100%", "IP Ownership"],
    ["8–14 wks", "MVP Production"],
    ["Enterprise", "Security SLA"],
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }, { label: s.name }]}
        eyebrow={s.category}
        title={[s.name, <span key="s" className="text-primary">Services</span>]}
        text={`${s.short} Our senior-led engineering teams combine domain strategy, human-centered UX and modern cloud architecture to deliver measurable outcomes.`}
        actions={
          <>
            <Button>Get a Free Quote</Button>
            <Button variant="outline" href="/portfolio">View Case Studies</Button>
          </>
        }
        aside={<SceneArt hue={220} icon={s.icon} label={s.category} className="hidden aspect-[4/3] rounded-3xl lg:block" />}
        stats={heroStats}
      />

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={[`Our ${s.name}`, "Capabilities"]} text={`Comprehensive ${s.name.toLowerCase()} capabilities tailored to your organizational scale.`} />
          <div className="mt-14">
            <CardGrid
              items={s.offerings.map((o) => ({
                title: o,
                text: details?.offeringsDescriptions?.[o] ?? `Architect, build and optimize ${o.toLowerCase()} with senior Konsilience specialists, with automated CI/CD and observability built in.`,
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
