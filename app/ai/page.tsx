import type { Metadata } from "next";
import Link from "next/link";
import BookCallButton from "@/components/BookCallButton";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import ProjectCard from "@/components/page/ProjectCard";
import Icon from "@/components/ui/Icon";
import Reveal, { LineReveal } from "@/components/ui/Reveal";
import { aiProcess, aiSolutions, aiStack, projects, responsibleAi } from "@/lib/catalog";
import { brand } from "@/lib/content";
import SiteImg from "@/components/ui/SiteImg";
import { image, ogImage } from "@/lib/images";
import { siteUrl } from "@/lib/routes";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema";
import { SolutionTabs } from "./Interactive";
import "./ai.css";

export const metadata: Metadata = {
  title: "Enterprise AI & Agentic Solutions",
  description: "Agentic AI systems, custom LLM fine-tuning, RAG architecture, and production copilots built by Konsilience.",
  keywords: ["Agentic AI", "Enterprise AI Solutions", "Custom LLM Development", "RAG Systems", "AI Copilots", "AI Observability"],
  alternates: { canonical: `${siteUrl}/ai` },
  openGraph: {
    title: "Enterprise AI & Agentic Solutions | Konsilience",
    description: "Agentic, generative and multimodal AI solutions engineered for production by Konsilience.",
    url: `${siteUrl}/ai`,
    images: [ogImage("/ai")!],
  },
  twitter: { card: "summary_large_image", images: [ogImage("/ai")!.url] },
};

// Facts shown in the strip under the hero: [value, label].
const heroFacts: [string, string][] = [
  ["AI-first", "Every project"],
  ["4–6 wks", "Typical proof of concept"],
  ["Model-agnostic", "OpenAI · Claude · Gemini"],
  ["Evals", "Before every launch"],
];

const faqs = [
  { q: "Where should we start with AI?", a: "With a use-case assessment. We rank opportunities by value, feasibility and data readiness, then prototype the best one in weeks." },
  { q: "Is our data safe with LLMs?", a: "Yes. We use enterprise endpoints with zero data retention, private deployments where needed, and PII redaction." },
  { q: "Which models do you use?", a: "We are model-agnostic: OpenAI, Claude, Gemini and open-source models, chosen per use case on quality, cost and latency." },
  { q: "How do you measure AI quality?", a: "With automated evaluation suites, human review and production monitoring tied to business KPIs." },
];

// Trace waterfall in the observability band: [span name, start %, width %]. Decorative.
const TRACE_SPANS: [string, number, number][] = [
  ["agent.run", 0, 100],
  ["llm.plan", 0, 27],
  ["tool.orders", 29, 14],
  ["guard.policy", 45, 7],
  ["tool.refund", 54, 22],
  ["llm.reply", 78, 22],
];
const SPAN_STAGGER_MS = 110;

// Case studies shown under "AI in action".
const AI_SERVICES = ["Agentic AI", "Data Analytics"];
const MAX_CASE_STUDIES = 3;

const Arrow = () => (
  <span className="ka-btn-dot">
    <Icon name="upRight" className="size-4" strokeWidth={2} />
  </span>
);

export default function AiPage() {
  const aiWork = projects.filter((p) => AI_SERVICES.includes(p.service) || p.text.includes("AI")).slice(0, MAX_CASE_STUDIES);
  const faqSchema = buildFaqSchema(faqs);
  const schema: Record<string, unknown>[] = [
    buildBreadcrumbSchema([
      { name: "Home", item: siteUrl },
      { name: `${brand.name} AI`, item: `${siteUrl}/ai` },
    ]),
  ];
  if (faqSchema) schema.push(faqSchema);

  return (
    <div className="ka">
      <JsonLd data={schema} />

      {/* ---------- Hero: headline and the rendered stack image ---------- */}
      <section className="relative overflow-hidden pt-36 sm:pt-40 lg:pt-44">
        <div className="ka-dots pointer-events-none absolute inset-0" />
        <div className="ka-aurora pointer-events-none -top-40 right-[-8%] size-[620px] bg-primary/35" />
        <div className="ka-aurora pointer-events-none bottom-[-30%] left-[-14%] size-[520px] bg-primary/15" style={{ animationDelay: "-5s" }} />

        <div className="wrap relative z-10">
          <nav aria-label="Breadcrumb" className="anim-hero mb-8 flex items-center gap-2 text-xs text-white/50 sm:text-sm">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <Icon name="chevron" className="size-3 -rotate-90 text-white/30" />
            <span className="font-medium text-white">{brand.name} AI</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10 xl:gap-14">
            <div>
              <p className="ka-eyebrow anim-hero text-[var(--ka-sky)]">{brand.name} AI</p>
              <LineReveal
                as="h1"
                className="ka-display ka-hero-title mt-6 text-white"
                lines={[
                  "AI that does",
                  <span key="l2" className="ka-grad">the work,</span>,
                  "not the demo",
                ]}
              />
              <p className="anim-hero mt-8 max-w-xl text-base leading-relaxed font-medium text-white/70 sm:text-lg" style={{ animationDelay: "250ms" }}>
                We design, build and ship agents, copilots and multimodal features that hold up with real users and real data. Every system goes live with guardrails, evals and monitoring from our own {brand.product.name}.
              </p>
              <div className="anim-hero mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "380ms" }}>
                <BookCallButton placement="ai_hero">Book an AI advisory session</BookCallButton>
                <Link href="#solutions" className="ka-btn ka-btn-ghost">
                  Explore solutions <Arrow />
                </Link>
              </div>
            </div>

            {/* desktop only, like the other page heroes: the labels are too small to read on a phone */}
            <div className="anim-hero hidden lg:block" style={{ animationDelay: "300ms" }}>
              <SiteImg img={image("ai-production-stack")} priority sizes="(min-width: 1024px) 48vw, 100vw" className="ka-shot w-full" />
            </div>
          </div>

          <dl className="mt-16 grid grid-cols-2 overflow-hidden rounded-[24px] border border-[var(--ka-line)] bg-white/[.03] sm:mt-20 lg:grid-cols-4">
            {heroFacts.map(([value, label], i) => (
              <Reveal key={label} delay={i * 80} variant="fade" className={`border-[var(--ka-line)] p-6 sm:p-8 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""} ${i ? "lg:border-l" : ""}`}>
                <dt className="ka-display text-3xl text-white xl:text-4xl">{value}</dt>
                <dd className="mt-3 text-sm font-medium text-white/55">{label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* Models and tools we build with */}
        <div className="relative z-10 mt-14 border-y border-[var(--ka-line)] py-5 sm:mt-16">
          <div className="ka-marquee">
            {[false, true].map((copy) => (
              <div key={String(copy)} aria-hidden={copy || undefined}>
                {aiStack.map((tool) => (
                  <span key={tool} className="ka-mono mr-3 flex items-center gap-2.5 rounded-full border border-white/12 px-5 py-2 text-sm whitespace-nowrap text-white/70">
                    <span className="size-1.5 rounded-full bg-[var(--ka-sky)]" />
                    {tool}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Solutions: pick one on the left, read it on the right ---------- */}
      <section id="solutions" className="sec scroll-mt-24">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="ka-eyebrow text-[var(--ka-sky)]">What we build</p>
              <LineReveal className="ka-display ka-h2 mt-4 text-white" lines={["Five ways", <span key="l2">to put <span className="ka-grad">AI to work</span></span>]} />
            </div>
            <Reveal variant="fade" className="max-w-md">
              <p className="text-base leading-relaxed text-white/65">Patterns we have taken from prototype to production. Pick one to see where it gets used.</p>
            </Reveal>
          </div>
          <Reveal className="mt-12 sm:mt-16">
            <SolutionTabs items={aiSolutions} />
          </Reveal>
        </div>
      </section>

      {/* ---------- Process: five nodes on one line ---------- */}
      <section className="sec border-t border-[var(--ka-line)]">
        <div className="wrap">
          <div className="mx-auto max-w-3xl text-center">
            <p className="ka-eyebrow text-[var(--ka-sky)]">How it ships</p>
            <LineReveal className="ka-display ka-h2 mt-4 text-white" lines={["From idea", "to production AI"]} />
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65">A working proof of concept in weeks, then the engineering that makes it safe to rely on: every layer of the stack, built and owned by one team.</p>
          </div>
          <Reveal as="ol" variant="fade" className="relative mt-16 grid gap-10 sm:mt-20 lg:grid-cols-5 lg:gap-6">
            <span aria-hidden className="absolute top-7 right-[10%] left-[10%] hidden h-px bg-white/12 lg:block" />
            <span aria-hidden className="ka-flow-line absolute top-7 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-[var(--ka-blue)] to-[var(--ka-sky)] lg:block" />
            {aiProcess.map((step, i) => (
              <li key={step.title} className="ka-flow-step relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                <span className="ka-flow-node ka-mono grid size-14 shrink-0 place-items-center rounded-full border border-white/20 bg-[var(--ka-bg)] text-sm font-bold text-white" style={{ transitionDelay: `${300 + i * 260}ms` }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="lg:mt-8">
                  <h3 className="ka-display ka-h3 text-white">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/60 lg:mx-auto lg:max-w-[15rem]">{step.text}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- Responsible AI: the one light sheet ---------- */}
      <section className="px-[clamp(8px,1.6vw,24px)]">
        <div className="ka-sheet sec">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <p className="ka-eyebrow text-[var(--ka-blue)]">Trust and safety</p>
                <LineReveal className="ka-display ka-h2 mt-4" lines={["Responsible AI,", "by design"]} />
              </div>
              <p className="max-w-md text-base leading-relaxed font-medium text-black/65">Guardrails, review steps and testing are part of the build, not something added after the first incident.</p>
            </div>
            <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
              {responsibleAi.map((item, i) => (
                <Reveal key={item.title} delay={i * 90} variant="zoom">
                  <article className="ka-card flex h-full flex-col gap-10 p-7">
                    <div className="flex items-start justify-between">
                      <span className="ka-card-icon grid size-14 place-items-center rounded-2xl bg-[var(--ka-blue)] text-white">
                        <Icon name={item.icon} className="size-6" />
                      </span>
                      <span className="ka-mono text-xs font-semibold text-black/35">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div>
                      <h3 className="ka-display ka-h3">{item.title}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-black/65">{item.text}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Observability: our own product ---------- */}
      <section className="sec">
        <div className="wrap">
          <div className="grid items-center gap-10 overflow-hidden rounded-[32px] border border-[var(--ka-line)] bg-[var(--ka-panel)] p-7 sm:p-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="ka-eyebrow text-[var(--ka-sky)]">Built in-house</p>
              <LineReveal className="ka-display ka-h2 mt-4 text-white" lines={["We watch", "what we ship"]} />
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/65">
                {brand.product.name} is our own {brand.product.short}. {brand.product.tagline}
              </p>
              <Link href="/trasys" className="ka-btn ka-btn-ghost mt-9">
                See {brand.product.name} <Arrow />
              </Link>
            </div>
            <Reveal variant="fade" className="ka-mono rounded-2xl border border-white/10 bg-[var(--ka-bg)] p-5 text-xs sm:p-6">
              <div className="mb-5 flex items-center justify-between text-white/50">
                <span>trace / support-refund</span>
                <span className="rounded-full border border-white/15 px-3 py-1 font-sans text-[11px] font-medium">Illustration</span>
              </div>
              <ul className="flex flex-col gap-3">
                {TRACE_SPANS.map(([name, start, width], i) => (
                  <li key={name} className="grid grid-cols-[92px_1fr] items-center gap-3 sm:grid-cols-[110px_1fr]">
                    <span className={i ? "text-white/55" : "text-white"}>{name}</span>
                    <span className="relative block h-5 rounded bg-white/[.04]">
                      <span
                        className={`ka-span absolute inset-y-0 rounded ${i ? "bg-[var(--ka-blue)]" : "bg-white/25"}`}
                        style={{ left: `${start}%`, width: `${width}%`, transitionDelay: `${200 + i * SPAN_STAGGER_MS}ms` }}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Case studies ---------- */}
      {aiWork.length > 0 && (
        <section className="sec border-t border-[var(--ka-line)]">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <p className="ka-eyebrow text-[var(--ka-sky)]">Case studies</p>
                <LineReveal className="ka-display ka-h2 mt-4 text-white" lines={["AI in action"]} />
              </div>
              <Link href="/portfolio" className="ka-btn ka-btn-ghost">
                All case studies <Arrow />
              </Link>
            </div>
            <div className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
              {aiWork.map((p, i) => (
                <Reveal key={p.slug} delay={i * 100}>
                  <ProjectCard p={p} />
                </Reveal>
              ))}
              {/* closing tile, so a short list still fills the row */}
              {aiWork.length < MAX_CASE_STUDIES && (
                <Reveal delay={aiWork.length * 100} className="md:col-span-2 lg:col-span-1">
                  <Link href="/contact" className="group flex h-full min-h-72 flex-col justify-between rounded-3xl border border-dashed border-white/20 p-7 transition-colors hover:border-[var(--ka-sky)]">
                    <span className="grid size-12 place-items-center rounded-full bg-[var(--ka-blue)] text-white transition-transform duration-500 group-hover:rotate-90">
                      <Icon name="plus" className="size-5" strokeWidth={2} />
                    </span>
                    <span>
                      <span className="ka-display ka-h3 block text-white">Yours could be next</span>
                      <span className="mt-3 block text-[15px] leading-relaxed text-white/60">Tell us what you want AI to take off your team&apos;s plate.</span>
                    </span>
                  </Link>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ---------- FAQ ---------- */}
      <section className="sec border-t border-[var(--ka-line)]">
        <div className="wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="ka-eyebrow text-[var(--ka-sky)]">FAQ</p>
            <LineReveal className="ka-display ka-h2 mt-4 text-white" lines={["Questions,", "answered"]} />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-white/65">What teams ask before they start an AI project with us.</p>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>

      {/* ---------- Closing call to action: brand blue ---------- */}
      <section className="px-[clamp(16px,3.4vw,48px)] pb-[clamp(56px,5.5vw,110px)]">
        <Reveal variant="zoom">
          <div className="ka-cta px-7 py-14 text-white sm:px-14 sm:py-20 lg:px-20">
            <div className="ka-cta-dots pointer-events-none absolute inset-0" />
            <div aria-hidden className="pointer-events-none absolute top-1/2 right-[14%] hidden size-0 lg:block">
              {[0, 1, 2].map((k) => (
                <span key={k} className="ka-ring -top-40 -left-40 size-80" style={{ animationDelay: `${k * 1.66}s` }} />
              ))}
              <span className="absolute -top-10 -left-10 grid size-20 place-items-center rounded-full bg-white text-[var(--ka-blue)]">
                <Icon name="spark" className="size-8" />
              </span>
            </div>
            <div className="relative max-w-3xl">
              <LineReveal className="ka-display ka-h2" lines={["Find your", "highest-ROI use case"]} />
              <p className="mt-6 max-w-xl text-base leading-relaxed font-medium text-white/80 sm:text-lg">
                A free 45-minute advisory session with our solution architects. You leave with a ranked list of AI opportunities and a plan for the first one.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <BookCallButton placement="ai_cta" variant="white">Book your session</BookCallButton>
                <Link href="/contact" className="text-sm font-bold text-white underline decoration-2 underline-offset-4">
                  Or send us a message
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
