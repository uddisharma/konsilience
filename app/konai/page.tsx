import type { Metadata } from "next";
import { CardGrid, Chips, CtaBand, ProcessSteps, SectionHead } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import ProjectCard from "@/components/page/ProjectCard";
import AiSection from "@/components/sections/AiSection";
import Faq from "@/components/sections/Faq";
import { SceneArt } from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { aiProcess, aiSolutions, aiStack, projects, responsibleAi } from "@/lib/catalog";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: `${brand.ai}: Enterprise AI`,
  description: `${brand.ai} is the ${brand.name} AI practice for agentic, generative and multimodal AI.`,
};

export default function KonAiPage() {
  const aiWork = projects.filter((p) => ["Agentic AI", "Data Analytics"].includes(p.service) || p.text.includes("AI"));

  return (
    <>
      <PageHero
        crumbs={[{ label: brand.ai }]}
        eyebrow="Our AI practice"
        title={["Enterprise AI,", "Engineered for", <span key="p" className="text-primary">Production</span>]}
        text={`${brand.ai} designs, builds and operates agentic systems, copilots and multimodal models that deliver measurable ROI, safely.`}
        actions={
          <>
            <Button>Book an AI Advisory Session</Button>
            <Button variant="outline" href="#solutions">Explore Solutions</Button>
          </>
        }
        aside={<SceneArt hue={225} icon="spark" label={brand.ai} className="hidden aspect-[4/3] rounded-3xl lg:block" />}
        stats={[["AI-first", "Every project"], ["Model-agnostic", "OpenAI · Claude · Gemini"], ["4–6 wks", "Typical POC"], ["Evals", "Before launch"]]}
      />

      <AiSection />

      <section id="solutions" className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["AI Solutions"]} text="Proven patterns we take from prototype to production." />
          <div className="mt-14">
            <CardGrid items={aiSolutions.map((a) => ({ icon: a.icon, title: a.name, text: a.short, href: `/konai/${a.slug}` }))} />
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["From Idea to", "Production AI"]} />
          <div className="mt-14">
            <ProcessSteps steps={aiProcess} />
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Responsible AI", "by Design"]} text="Trust, safety and governance built into every system we ship." />
          <div className="mt-14">
            <CardGrid cols={4} items={responsibleAi} />
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Our AI Stack"]} />
          <div className="mt-12">
            <Chips items={aiStack} />
          </div>
        </div>
      </section>

      {aiWork.length > 0 && (
        <section className="sec bg-black">
          <div className="wrap">
            <SectionHead title={["AI in Action"]} action={<Button variant="ghost" href="/portfolio">All Case Studies</Button>} />
            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {aiWork.slice(0, 3).map((p, i) => (
                <Reveal key={p.slug} delay={i * 100}>
                  <ProjectCard p={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand title="Find your highest-ROI AI use case." text="A free 45-minute AI advisory session with our solution architects." label="Book Your Session" />
      <Faq
        title="AI FAQs"
        items={[
          { q: "Where should we start with AI?", a: "With a use-case assessment. We rank opportunities by value, feasibility and data readiness, then prototype the best one in weeks." },
          { q: "Is our data safe with LLMs?", a: "Yes. We use enterprise endpoints with zero data retention, private deployments where needed, and PII redaction." },
          { q: "Which models do you use?", a: "We are model-agnostic: OpenAI, Claude, Gemini and open-source models, chosen per use case on quality, cost and latency." },
          { q: "How do you measure AI quality?", a: "With automated evaluation suites, human review and production monitoring tied to business KPIs." },
        ]}
      />
    </>
  );
}
