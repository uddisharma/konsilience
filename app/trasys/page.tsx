import type { Metadata } from "next";
import Link from "next/link";
import BookCallButton from "@/components/BookCallButton";
import CalendlyInline from "@/components/CalendlyInline";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import AdVideo from "@/components/ui/AdVideo";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal, { LineReveal } from "@/components/ui/Reveal";
import SiteImg from "@/components/ui/SiteImg";
import { brand } from "@/lib/content";
import { image } from "@/lib/images";
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "@/lib/og";
import { siteUrl } from "@/lib/routes";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema";
import { siteConfig } from "@/site.config";
import "./trasys.css";

const p = brand.product;

export const metadata: Metadata = {
  title: `${p.name} | AI Observability & LLM Tracing Platform`,
  description: `${p.tagline} Monitor LLM token spend, trace agent loops, and catch incidents in real time with ${p.name}.`,
  keywords: ["Trasys AI", "AI Observability", "LLM Tracing", "Token Spend Analytics", "Agent Loop Detection", "Prompt Engineering"],
  alternates: { canonical: `${siteUrl}/trasys` },
  openGraph: {
    title: `${p.name} | AI Observability & LLM Tracing Platform`,
    description: p.tagline,
    url: `${siteUrl}/trasys`,
    images: [{ url: `${siteUrl}/og-image.png`, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, alt: `${p.name} | AI Observability & LLM Tracing Platform` }],
  },
};

// Product copy based on the public Trasys AI site. Keep in sync with trasys.dev.
const features = [
  { icon: "eye", title: "LLM call tracing", text: "Every prompt, completion, tool call and retrieval step captured with inputs, outputs and latency." },
  { icon: "chart", title: "Token cost tracking", text: "Spend per model, feature, customer and environment, with budgets and alerts before bills surprise you." },
  { icon: "bolt", title: "Loop detection & spend limits", text: "Catch runaway agents and recursive calls automatically and cap spend before it snowballs." },
  { icon: "layers", title: "Distributed tracing", text: "Waterfalls across services, databases and model providers, so you see exactly where time goes." },
  { icon: "search", title: "Natural-language search", text: "Ask questions about anomalies in plain English, or go deep with the TQL query language." },
  { icon: "grid", title: "Log pattern clustering", text: "Millions of log lines grouped into a handful of patterns, cutting alert noise dramatically." },
];
// The first FEATURED_COUNT features get a wide card with an image.
const FEATURED_COUNT = 2;

// What goes wrong without observability: [short tag, status colour, title, text].
const problems: { tag: string; tone: "err" | "warn"; title: string; text: string }[] = [
  { tag: "cost", tone: "err", title: "Invisible token spend", text: "Costs spread across models, features and environments, and nobody sees the bill until month end." },
  { tag: "loops", tone: "err", title: "Runaway agents", text: "Agent loops and retries silently burn budget and degrade user experience." },
  { tag: "latency", tone: "warn", title: "Latency regressions", text: "A slower model, prompt or retrieval step quietly ruins response times." },
  { tag: "noise", tone: "warn", title: "Noisy, scattered logs", text: "Signals are split across tools, so incidents take hours to diagnose." },
];

const steps = [
  { title: "Install the SDK", text: "Add a few lines for JavaScript, TypeScript, Python, Go or Node." },
  { title: "Trace everything", text: "LLM calls, tools, services and databases stream in automatically." },
  { title: "Detect issues", text: "Costs, loops, latency and anomalies are flagged in real time." },
  { title: "Alert & resolve", text: "Slack alerts and on-call escalation route incidents to the right person." },
];

// Two marquee rows: what you instrument, then where it runs and alerts.
const integrations = [
  ["JavaScript", "TypeScript", "Python", "Go", "Node.js", "PostgreSQL", "MongoDB", "Redis", "Prisma"],
  ["AWS", "Google Cloud", "Azure", "Kubernetes", "Docker", "Slack", "REST API"],
];

// Facts shown in the strip under the hero: [value, label].
const heroFacts: [string, string][] = [
  ["1 view", "Traces, logs & incidents"],
  ["Real-time", "Token cost visibility"],
  ["SDKs", "JS/TS · Python · Go · Node"],
  ["Free", "Tier to get started"],
];

const faqs = [
  { q: `What is ${p.name}?`, a: `${p.name} is an observability platform for AI applications, built by ${brand.name}. It traces LLM calls, tracks token spend, detects loops and routes incidents.` },
  { q: "Which languages and stacks are supported?", a: "SDKs for JavaScript, TypeScript, Python, Go and Node.js, with support for common databases, clouds and Kubernetes." },
  { q: "Is there a free plan?", a: `Yes. You can start on the free tier at ${siteConfig.trasys.signupUrl.replace("https://", "")}.` },
  { q: "Can Konsilience help us instrument our AI app?", a: "Yes. Our team can set up tracing, dashboards and alerting as part of an AI engagement." },
];

// Rendered images (lib/image-registry.ts) shown in the wide feature cards, in feature order.
const FEATURE_IMAGES = ["trasys-llm-trace", "trasys-token-cost"];

export default function TrasysAiPage() {
  const faqSchema = buildFaqSchema(faqs);
  const schema: Record<string, unknown>[] = [
    buildBreadcrumbSchema([
      { name: "Home", item: siteUrl },
      { name: p.name, item: `${siteUrl}/trasys` },
    ]),
  ];
  if (faqSchema) schema.push(faqSchema);

  return (
    <div className="kt">
      <JsonLd data={schema} />

      {/* ---------- Hero: headline and the product video ---------- */}
      <section className="relative overflow-hidden pt-36 sm:pt-40 lg:pt-44">
        <div className="kt-grid pointer-events-none absolute inset-0" />
        <div className="kt-glow pointer-events-none -top-40 right-[2%] size-[600px] bg-primary/40" />
        <div className="kt-glow pointer-events-none bottom-[-25%] left-[-12%] size-[480px] bg-primary/15" style={{ animationDelay: "-5s" }} />

        <div className="wrap relative z-10">
          <nav aria-label="Breadcrumb" className="anim-hero mb-8 flex items-center gap-2 text-xs text-white/50 sm:text-sm">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <Icon name="chevron" className="size-3 -rotate-90 text-white/30" />
            <span className="font-medium text-white">{p.name}</span>
          </nav>

          <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_.8fr] lg:gap-10 xl:gap-20">
            <div>
              <p className="kt-eyebrow anim-hero">Our product · {p.short}</p>
              <LineReveal
                as="h1"
                className="kt-title kt-hero-title mt-6 text-white"
                lines={["See every signal", "your AI stack", <span key="l3" className="kt-grad">produces</span>]}
              />
              <p className="anim-hero mt-7 max-w-xl text-base leading-relaxed font-medium text-white/70 sm:text-lg" style={{ animationDelay: "250ms" }}>
                {p.name} traces every LLM call, tracks token spend, catches runaway agents and routes incidents to the right person before your users notice.
              </p>
              <div className="anim-hero mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: "380ms" }}>
                <Button href={siteConfig.trasys.signupUrl}>Try {p.name} free</Button>
                <BookCallButton variant="outline" placement="trasys_hero" url={siteConfig.booking.calendlyTrasysUrl}>
                  Book a 30-min demo
                </BookCallButton>
              </div>
              <p className="kt-mono anim-hero mt-8 text-xs text-white/45" style={{ animationDelay: "480ms" }}>
                SDKs for JavaScript · TypeScript · Python · Go · Node.js
              </p>
            </div>

            <div className="anim-hero relative mx-auto w-full max-w-[420px]" style={{ animationDelay: "300ms" }}>
              <div className="kt-player">
                <AdVideo
                  src="/trasys-observability-ad-4x5-v1.mp4"
                  poster="/trasys-observability-ad-poster.jpg"
                  label={`${p.name}: trace LLM calls, track token spend and catch runaway agents`}
                />
              </div>
              <span aria-hidden className="kt-pin kt-mono -left-6 top-10 hidden text-white/85 sm:flex lg:-left-16">
                <span className="kt-dot bg-[var(--kt-ok)]" /> LLM call traced
              </span>
              <span aria-hidden className="kt-pin kt-mono -right-4 bottom-14 hidden text-white/85 sm:flex lg:-right-10" style={{ animationDelay: "-4s" }}>
                <span className="kt-dot bg-[var(--kt-err)]" /> Loop caught · agent paused
              </span>
            </div>
          </div>

          <dl className="mt-16 grid grid-cols-2 overflow-hidden rounded-[24px] border border-[var(--kt-line)] bg-white/[.03] sm:mt-20 lg:grid-cols-4">
            {heroFacts.map(([value, label], i) => (
              <Reveal key={label} delay={i * 80} variant="fade" className={`border-[var(--kt-line)] p-6 sm:p-8 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""} ${i ? "lg:border-l" : ""}`}>
                <dt className="kt-title text-2xl text-white sm:text-3xl">{value}</dt>
                <dd className="mt-2 text-sm font-medium text-white/55">{label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
        <div className="h-[clamp(56px,5.5vw,110px)]" />
      </section>

      {/* ---------- Why we built it: the four problems ---------- */}
      <section className="sec border-t border-[var(--kt-line)]">
        <div className="wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="kt-eyebrow">Why we built it</p>
            <LineReveal className="kt-title kt-h2 mt-5 text-white" lines={["AI breaks in ways", "old monitoring", "never saw coming"]} />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-white/65">Running AI in production creates problems traditional monitoring was never designed for.</p>
          </div>
          <ol className="border-t border-[var(--kt-line)]">
            {problems.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 80} variant="fade" className="kt-problem flex gap-5 border-b border-[var(--kt-line)] py-7 sm:gap-8">
                <span className="kt-mono pt-1.5 text-xs font-semibold text-white/35">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="kt-h3 text-white">{item.title}</h3>
                    <span className="kt-mono flex items-center gap-2 rounded-full border border-white/12 px-3 py-1 text-[11px] text-white/60">
                      <span className="kt-dot" style={{ background: `var(--kt-${item.tone})` }} />
                      {item.tag}
                    </span>
                  </div>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/60">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Features: two wide cards with images, four compact ones ---------- */}
      <section id="features" className="sec scroll-mt-24 border-t border-[var(--kt-line)]">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="kt-eyebrow">What you get</p>
              <LineReveal className="kt-title kt-h2 mt-5 text-white" lines={["Everything you need", <span key="l2">to run AI <span className="kt-grad">in production</span></span>]} />
            </div>
            <p className="max-w-sm text-base leading-relaxed text-white/65">Tracing, cost, loops and logs in one place, so an incident is one search instead of five tools.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-12">
            {features.map((f, i) => {
              const wide = i < FEATURED_COUNT;
              return (
                <Reveal key={f.title} delay={(i % 4) * 80} variant="zoom" className={wide ? "lg:col-span-6" : "lg:col-span-3"}>
                  <article className="kt-card flex h-full flex-col gap-8 p-7">
                    <div className="flex items-start justify-between">
                      <span className="kt-card-icon grid size-12 place-items-center rounded-xl bg-white/[.07] text-[var(--kt-sky)]">
                        <Icon name={f.icon} className="size-5" />
                      </span>
                      <span className="kt-mono text-xs font-semibold text-white/30">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    {wide && <SiteImg img={image(FEATURE_IMAGES[i])} sizes="(min-width: 1024px) 45vw, 100vw" className="h-auto w-full rounded-2xl border border-white/10" />}
                    <div className="mt-auto">
                      <h3 className="kt-h3 text-white">{f.title}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-white/60">{f.text}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="sec border-t border-[var(--kt-line)]">
        <div className="wrap">
          <div className="mx-auto max-w-2xl text-center">
            <p className="kt-eyebrow">How it works</p>
            <LineReveal className="kt-title kt-h2 mt-5 text-white" lines={["From install", "to first alert"]} />
          </div>
          <ol className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 90}>
                <div className="kt-step flex h-full flex-col gap-10 p-7">
                  <div className="flex items-start justify-between">
                    <span className="kt-step-num">{i + 1}</span>
                    {i < steps.length - 1 && <Icon name="arrow" className="mt-2 hidden size-5 text-white/30 lg:block" strokeWidth={2} />}
                  </div>
                  <div>
                    <h3 className="kt-h3 text-white">{step.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/60">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Integrations ---------- */}
      <section id="integrations" className="sec scroll-mt-24 border-t border-[var(--kt-line)]">
        <div className="wrap">
          <div className="mx-auto max-w-2xl text-center">
            <p className="kt-eyebrow">Integrations</p>
            <LineReveal className="kt-title kt-h2 mt-5 text-white" lines={["Works with your stack"]} />
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/65">SDKs, databases, clouds and alerting tools supported out of the box.</p>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4">
          {integrations.map((row, r) => (
            <div key={r} className="kt-marquee" data-reverse={r % 2 ? true : undefined} style={{ ["--kt-speed" as string]: r % 2 ? "38s" : "46s" }}>
              {[false, true].map((copy) => (
                <div key={String(copy)} aria-hidden={copy || undefined}>
                  {/* each row is repeated so short lists still fill wide screens */}
                  {[...row, ...row].map((name, k) => (
                    <span key={k} className="kt-mono mr-3 flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[.03] px-5 py-2.5 text-sm whitespace-nowrap text-white/75">
                      <span className="kt-dot bg-[var(--kt-ok)]" />
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Demo booking ---------- */}
      <section id="demo" className="sec scroll-mt-24 border-t border-[var(--kt-line)]">
        <div className="wrap">
          <div className="kt-panel grid gap-10 p-6 sm:p-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-14 lg:p-14">
            <div>
              <p className="kt-eyebrow">Live demo</p>
              <LineReveal className="kt-title kt-h2 mt-5 text-white" lines={["See it on", "your stack"]} />
              <p className="mt-6 max-w-sm text-base leading-relaxed text-white/65">Book a 30-minute {p.name} demo with the team that builds it.</p>
              <ul className="mt-8 flex flex-col gap-3.5 text-[15px] font-medium text-white/80">
                {["A walkthrough on a real trace", "Your questions, answered by engineers", "Help getting the SDK into your app"].map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[var(--kt-blue)] text-white">
                      <Icon name="check" className="size-3" strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <CalendlyInline url={siteConfig.booking.calendlyTrasysUrl} />
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="sec border-t border-[var(--kt-line)]">
        <div className="wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="kt-eyebrow">FAQ</p>
            <LineReveal className="kt-title kt-h2 mt-5 text-white" lines={[`${p.name},`, "explained"]} />
          </div>
          <FaqList items={faqs} />
        </div>
      </section>

      {/* ---------- Closing call to action: brand blue ---------- */}
      <section className="px-[clamp(16px,3.4vw,48px)] pb-[clamp(56px,5.5vw,110px)]">
        <Reveal variant="zoom">
          <div className="kt-cta px-7 py-14 text-white sm:px-14 sm:py-20 lg:px-20">
            <div className="kt-cta-grid pointer-events-none absolute inset-0" />
            <div className="relative max-w-3xl">
              <LineReveal className="kt-title kt-h2" lines={["Start monitoring your AI", `with ${p.name}`]} />
              <p className="mt-6 max-w-xl text-base leading-relaxed font-medium text-white/80 sm:text-lg">Free tier available. Set up in minutes.</p>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Button variant="white" href={siteConfig.trasys.signupUrl}>Try {p.name} free</Button>
                <Link href={siteConfig.trasys.docsUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white underline decoration-2 underline-offset-4">
                  Read the docs
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
