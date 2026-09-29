import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardGrid, Chips, CtaBand, NumberedRows, ProcessSteps, SectionHead, Split } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import Faq from "@/components/sections/Faq";
import { SceneArt } from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";
import { aiProcess, aiSolutions, aiStack, industryList, responsibleAi } from "@/lib/catalog";
import { siteUrl } from "@/lib/routes";

const find = (slug: string) => aiSolutions.find((a) => a.slug === slug);

export function generateStaticParams() {
  return aiSolutions.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/ai-solutions/[slug]">): Promise<Metadata> {
  const a = find((await params).slug);
  if (!a) return {};
  const url = `${siteUrl}/ai-solutions/${a.slug}`;
  return {
    title: `${a.name} Solutions & Development | Agentic AI`,
    description: `${a.short} Build custom, production-grade ${a.name.toLowerCase()} with senior AI engineers at Konsilience.`,
    keywords: [a.name, `${a.name} Development`, "AI Solutions", "Agentic AI", "LLM Integration", "Konsilience"],
    alternates: { canonical: url },
    openGraph: {
      title: `${a.name} Solutions | Konsilience AI Studio`,
      description: a.short,
      url,
      images: [
        {
          url: `${siteUrl}/og?title=${encodeURIComponent(a.name + " Solutions")}&subtitle=${encodeURIComponent(a.short)}`,
          width: 1200,
          height: 630,
          alt: `${a.name} Solutions`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${a.name} Solutions | Konsilience`,
      description: a.short,
      images: [`${siteUrl}/og?title=${encodeURIComponent(a.name + " Solutions")}`],
    },
  };
}

export default async function AiSolutionPage({ params }: PageProps<"/ai-solutions/[slug]">) {
  const a = find((await params).slug);
  if (!a) notFound();
  const n = a.name;

  return (
    <>
      <PageHero
        crumbs={[{ label: "AI Solutions", href: "/ai-solutions" }, { label: a.name }]}
        eyebrow="AI Solutions"
        title={[a.name, <span key="d" className="text-primary">Development</span>]}
        text={`${a.short} Built on your data, integrated with your systems and governed for enterprise use.`}
        actions={
          <>
            <Button>Book an AI Advisory Session</Button>
            <Button variant="outline" href="/ai-solutions">All AI Solutions</Button>
          </>
        }
        aside={<SceneArt hue={230} icon={a.icon} label={a.name} className="hidden aspect-[4/3] rounded-3xl lg:block" />}
      />

      <section className="sec bg-black">
        <Split title={["Use Cases"]} text={`Where ${n} creates value today.`}>
          <NumberedRows items={a.useCases.map((u) => ({ title: u, text: `Production-ready ${u} with measurable impact on cost, speed or revenue.` }))} />
        </Split>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["What We Deliver"]} />
          <div className="mt-14">
            <CardGrid
              items={[
                { icon: "compass", title: "Strategy & roadmap", text: `Use-case discovery, ROI modelling and a phased ${n} roadmap.` },
                { icon: "db", title: "Data foundation", text: "Pipelines, vector stores and governance so models get the right context." },
                { icon: "code", title: "Build & integrate", text: "Custom models, agents and APIs integrated with your apps and workflows." },
                { icon: "target", title: "Evaluation", text: "Quality, safety and cost benchmarks before anything reaches users." },
                { icon: "cloud", title: "MLOps / LLMOps", text: "Deployment, monitoring, versioning and continuous improvement." },
                { icon: "users", title: "Enablement", text: "Training and playbooks so your teams can own and extend the system." },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Industries We Serve"]} />
          <div className="mt-12">
            <Chips items={industryList.slice(0, 12).map((i) => i.name)} />
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Our Approach"]} />
          <div className="mt-14">
            <ProcessSteps steps={aiProcess} />
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Built Responsibly"]} />
          <div className="mt-14">
            <CardGrid cols={4} items={responsibleAi} />
          </div>
          <div className="mt-14">
            <Chips items={aiStack} />
          </div>
        </div>
      </section>

      <CtaBand title={`Start your ${n} journey.`} text="Get a working prototype in as little as 6 weeks." label="Talk to an AI Expert" />
      <Faq
        title={`${a.name} FAQs`}
        items={[
          { q: `How long does a ${n} project take?`, a: "A proof of concept typically takes 4–6 weeks; a production rollout 3–6 months depending on integrations." },
          { q: "Do we need a lot of data?", a: "Not always. Many solutions work with your existing documents and systems through retrieval, without training a model from scratch." },
          { q: "Can it run on our own cloud?", a: "Yes. We deploy on AWS, Azure, GCP or on-premise, with private model endpoints when required." },
          { q: "How do you control costs?", a: "Model routing, caching, prompt optimization and usage monitoring keep inference costs predictable." },
        ]}
      />
    </>
  );
}
