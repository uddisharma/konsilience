import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardGrid, Chips, CtaBand, NumberedRows, SectionHead, Split } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import ProjectCard from "@/components/page/ProjectCard";
import Compliance from "@/components/sections/Compliance";
import Faq from "@/components/sections/Faq";
import Testimonials from "@/components/sections/Testimonials";
import { SceneArt } from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { industryList, projects, serviceList, techStack, whyUs } from "@/lib/catalog";
import { siteUrl } from "@/lib/routes";

const find = (slug: string) => industryList.find((i) => i.slug === slug);

export function generateStaticParams() {
  return industryList.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const ind = find((await params).slug);
  if (!ind) return {};
  const url = `${siteUrl}/industries/${ind.slug}`;
  return {
    title: `${ind.name} Software & AI Engineering`,
    description: `${ind.short} Custom software, SaaS platforms & AI solutions engineered for ${ind.name.toLowerCase()} companies.`,
    keywords: [ind.name, `${ind.name} Software`, `${ind.name} AI`, "Industry Solutions", "Konsilience"],
    alternates: { canonical: url },
    openGraph: {
      title: `${ind.name} Engineering & AI | Konsilience`,
      description: ind.short,
      url,
      images: [
        {
          url: `${siteUrl}/og?title=${encodeURIComponent(ind.name + " Engineering")}&subtitle=${encodeURIComponent(ind.short)}`,
          width: 1200,
          height: 630,
          alt: `${ind.name} Software Development`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${ind.name} Engineering | Konsilience`,
      description: ind.short,
      images: [`${siteUrl}/og?title=${encodeURIComponent(ind.name + " Engineering")}`],
    },
  };
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const ind = find((await params).slug);
  if (!ind) notFound();
  const n = ind.name;

  const work = [...projects.filter((p) => p.industry === ind.name), ...projects.filter((p) => p.industry !== ind.name)].slice(0, 3);
  const challenges = [
    { title: "Legacy systems", text: `Ageing ${n} platforms that are expensive to run and slow to change.` },
    { title: "Regulation & security", text: "Strict compliance, privacy and audit requirements across every workflow." },
    { title: "Rising expectations", text: "Users expect consumer-grade digital experiences on every device." },
    { title: "Siloed data", text: "Disconnected systems that make real-time decisions impossible." },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Industries", href: "/industries" }, { label: ind.name }]}
        eyebrow={`${ind.name} solutions`}
        title={[`${ind.name} Software`, <span key="d" className="text-primary">Development</span>]}
        text={`${ind.short} We help ${n} leaders modernize operations, delight customers and put AI to work.`}
        actions={
          <>
            <Button>Talk to a {ind.name} Expert</Button>
            <Button variant="outline" href="/portfolio">View Work</Button>
          </>
        }
        aside={<SceneArt hue={ind.hue} icon={ind.icon} label={ind.name} className="hidden aspect-[4/3] rounded-3xl lg:block" />}
      />

      <section className="sec bg-black">
        <Split title={["Challenges We Solve"]} text={`What ${n} organisations tell us is holding them back.`}>
          <NumberedRows items={challenges} />
        </Split>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={[`${ind.name} Solutions`, "We Build"]} />
          <div className="mt-14">
            <CardGrid
              items={ind.solutions.map((s) => ({
                title: s,
                text: `Secure, scalable ${s} designed around ${n} workflows and compliance needs.`,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Services for", ind.name]} />
          <div className="mt-14">
            <CardGrid
              cols={4}
              items={serviceList.slice(1, 9).map((s) => ({ icon: s.icon, title: s.name, href: `/services/${s.slug}` }))}
            />
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Success Stories"]} action={<Button variant="ghost" href="/portfolio">All Case Studies</Button>} />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {work.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Compliance />

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Why Konsilience"]} />
          <div className="mt-14">
            <CardGrid cols={4} items={whyUs} />
          </div>
          <div className="mt-14">
            <Chips items={techStack.slice(0, 14)} />
          </div>
        </div>
      </section>

      <Testimonials />
      <CtaBand title={`Transform your ${n} business.`} text="Book a free consultation with our domain experts." />
      <Faq
        title={`${ind.name} FAQs`}
        items={[
          { q: `Do you have experience in ${n}?`, a: work.some((p) => p.industry === ind.name) ? `Yes. We have built ${n} platforms before; see the case studies above.` : `We have shipped platforms across many industries and learn new domains fast, starting every project with a discovery phase.` },
          { q: "How do you handle compliance?", a: "We map regulatory requirements during discovery and build controls, audit trails and documentation into the product." },
          { q: "Can you integrate with our existing systems?", a: "Yes. We integrate with ERPs, CRMs, payment providers, industry platforms and custom APIs." },
          { q: "How quickly can you start?", a: "A dedicated team can usually start within 1–2 weeks of signing." },
        ]}
      />
    </>
  );
}
