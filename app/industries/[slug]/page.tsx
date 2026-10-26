import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CardGrid, Chips, CtaBand, NumberedRows, SectionHead, Split } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import ProjectCard from "@/components/page/ProjectCard";
import Compliance from "@/components/sections/Compliance";
import Faq from "@/components/sections/Faq";
import Testimonials from "@/components/sections/Testimonials";
import { SceneArt } from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/JsonLd";
import { aiSolutions, industryList, projects, serviceList, techStack, whyUs } from "@/lib/catalog";
import { siteUrl } from "@/lib/routes";
import { buildIndustryPageSchema } from "@/lib/schema";
import { industryData } from "@/lib/industryData";

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
  const data = industryData[ind.slug];

  const work = [...projects.filter((p) => p.industry === ind.name), ...projects.filter((p) => p.industry !== ind.name)].slice(0, 3);
  const challenges = data?.challenges ?? [
    { title: "Legacy systems", text: `Ageing ${n} platforms that are expensive to run and slow to change.` },
    { title: "Regulation & security", text: `Strict ${n} compliance, privacy, and audit requirements across core workflows.` },
    { title: "Consumer expectations", text: `Rising demand for real-time mobile self-service and modern digital experiences in ${n}.` },
    { title: "Siloed data", text: `Disconnected databases and legacy APIs that impede real-time business intelligence.` },
  ];

  const servicesToShow = data?.featuredServices
    ? data.featuredServices.map((slug) => serviceList.find((s) => s.slug === slug)).filter((s): s is (typeof serviceList)[0] => !!s)
    : serviceList.slice(1, 9);

  const aiToShow = (data?.featuredAiSolutions
    ? data.featuredAiSolutions.map((slug) => aiSolutions.find((a) => a.slug === slug)).filter((a): a is (typeof aiSolutions)[0] => !!a)
    : aiSolutions.slice(0, 3));

  const relatedIndustries = (data?.relatedIndustries
    ? data.relatedIndustries.map((slug) => industryList.find((i) => i.slug === slug)).filter((i): i is (typeof industryList)[0] => !!i)
    : industryList.filter((i) => i.slug !== ind.slug).slice(0, 3));

  const faqs = data?.faqs ?? [
    { q: `Do you have hands-on engineering experience in ${n}?`, a: work.some((p) => p.industry === ind.name) ? `Yes. We have built production ${n} platforms before; see our case studies above.` : `We have delivered complex digital platforms across multiple regulated industries and conduct deep discovery on every engagement.` },
    { q: `How do you address regulatory compliance for ${n}?`, a: "We map statutory and data residency requirements during discovery, building automated encryption and audit trails into the architecture." },
    { q: "Can your systems integrate with our current tech stack?", a: "Yes. We integrate with existing ERPs, legacy databases, payment gateways, and custom proprietary APIs." },
    { q: "What is your onboarding timeline?", a: "A dedicated agile engineering pod can typically initiate discovery and development within 1 to 2 weeks of agreement." },
  ];

  const schema = buildIndustryPageSchema(ind, faqs, data?.solutionsDescription);

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        crumbs={[{ label: "Industries", href: "/industries" }, { label: ind.name }]}
        eyebrow={`${ind.name} solutions`}
        title={[`${ind.name} Software`, <span key="d" className="text-primary">Development</span>]}
        text={`${ind.short} We help ${n} leaders modernize operations, delight customers and put AI to work.`}
        actions={
          <>
            <Button href="/contact">Talk to a {ind.name} Expert</Button>
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
                text: data?.solutionsDescription?.[s] ?? `Production-grade ${s.toLowerCase()} engineered specifically for ${n} operational workflows and compliance standards.`,
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
              items={servicesToShow.map((s) => ({ icon: s.icon, title: s.name, href: `/services/${s.slug}` }))}
            />
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead
            title={["AI Capabilities for", ind.name]}
            text={`Production-ready artificial intelligence to automate ${ind.name.toLowerCase()} workflows, personalize customer interactions, and optimize costs.`}
            action={<Button variant="ghost" href="/ai-solutions">All AI Solutions</Button>}
          />
          <div className="mt-14">
            <CardGrid
              cols={3}
              items={aiToShow.map((a) => ({
                icon: a.icon,
                title: a.name,
                text: a.short,
                href: `/ai-solutions/${a.slug}`,
              }))}
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

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead
            title={["Connected Sectors &", "Adjacent Industries"]}
            text="Explore cross-domain software architectures and operational engineering."
            action={<Button variant="ghost" href="/industries">All Industries</Button>}
          />
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedIndustries.map((r, i) => (
              <Reveal key={r.slug} delay={i * 90}>
                <Link href={`/industries/${r.slug}`} className="group block overflow-hidden rounded-3xl border border-line bg-card p-7 transition-all duration-300 hover:border-primary">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-2xl bg-black text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon name={r.icon} className="size-6" strokeWidth={1.5} />
                    </span>
                    <span className="grid size-9 place-items-center rounded-full border border-line transition-all group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black">
                      <Icon name="upRight" className="size-3.5" strokeWidth={2} />
                    </span>
                  </div>
                  <h3 className="subtitle mt-5">{r.name}</h3>
                  <p className="fs-para mt-2 font-medium text-muted">{r.short}</p>
                </Link>
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
        items={faqs}
      />
    </>
  );
}
