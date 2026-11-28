import type { Metadata } from "next";
import { CardGrid, Chips, CtaBand, NumberedRows, ProcessSteps, SectionHead, Split } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import AiSection from "@/components/sections/AiSection";
import Faq from "@/components/sections/Faq";
import Button from "@/components/ui/Button";
import BookCallButton from "@/components/BookCallButton";
import CalendlyInline from "@/components/CalendlyInline";
import DesignPartnerForm from "@/components/DesignPartnerForm";
import { siteConfig } from "@/site.config";
import { brand } from "@/lib/content";

import { siteUrl } from "@/lib/routes";
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "@/lib/og";

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

const problems = [
  { title: "Invisible token spend", text: "Costs spread across models, features and environments, and nobody sees the bill until month end." },
  { title: "Runaway agents", text: "Agent loops and retries silently burn budget and degrade user experience." },
  { title: "Latency regressions", text: "A slower model, prompt or retrieval step quietly ruins response times." },
  { title: "Noisy, scattered logs", text: "Signals are split across tools, so incidents take hours to diagnose." },
];

export default function TrasysAiPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: p.name }]}
        eyebrow={`Our product · ${p.short}`}
        title={[p.name, <span key="o" className="text-primary">Observability for AI</span>]}
        text={p.tagline}
        actions={
          <>
            <Button href={siteConfig.trasys.signupUrl}>Try {p.name} Free</Button>
            <BookCallButton variant="outline" placement="trasys_hero" url={siteConfig.booking.calendlyTrasysUrl}>
              Book a 30-min demo
            </BookCallButton>
          </>
        }
        stats={[["1 view", "Traces, logs & incidents"], ["Real-time", "Token cost visibility"], ["SDKs", "JS/TS · Python · Go · Node"], ["Free", "Tier to get started"]]}
      />

      <AiSection />

      <section className="sec bg-black">
        <Split title={["Why We Built It"]} text="Running AI in production creates problems traditional monitoring was never designed for.">
          <NumberedRows items={problems} />
        </Split>
      </section>

      <section id="features" className="sec scroll-mt-24 bg-black">
        <div className="wrap">
          <SectionHead title={["Everything You Need", "to Run AI in Production"]} />
          <div className="mt-14">
            <CardGrid items={features} />
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["How It Works"]} />
          <div className="mt-14">
            <ProcessSteps
              steps={[
                { title: "Install the SDK", text: "Add a few lines for JavaScript, TypeScript, Python, Go or Node." },
                { title: "Trace everything", text: "LLM calls, tools, services and databases stream in automatically." },
                { title: "Detect issues", text: "Costs, loops, latency and anomalies are flagged in real time." },
                { title: "Alert & resolve", text: "Slack alerts and on-call escalation route incidents to the right person." },
              ]}
            />
          </div>
        </div>
      </section>

      <section id="integrations" className="sec scroll-mt-24 bg-black">
        <div className="wrap">
          <SectionHead title={["Works With Your Stack"]} text="SDKs, databases, clouds and alerting tools supported out of the box." />
          <div className="mt-12">
            <Chips items={["JavaScript", "TypeScript", "Python", "Go", "Node.js", "PostgreSQL", "MongoDB", "Redis", "Prisma", "AWS", "Google Cloud", "Azure", "Kubernetes", "Docker", "Slack", "REST API"]} />
          </div>
        </div>
      </section>

      <section id="demo" className="sec scroll-mt-24 bg-black">
        <div className="wrap-sm">
          <SectionHead center title={["See It on Your Stack"]} text={`Book a 30-minute ${p.name} demo with the team that builds it.`} />
          <div className="mt-12">
            <CalendlyInline url={siteConfig.booking.calendlyTrasysUrl} />
          </div>
        </div>
      </section>

      {/* NEEDS_CONFIRMATION (docs/OPEN_QUESTIONS.md): early-access wording and the reply-time promise. */}
      <section id="design-partners" className="sec scroll-mt-24 bg-black">
        <div className="wrap-sm">
          <SectionHead
            center
            title={["Early-Access Design Partners"]}
            text={`${p.name} is free for everyone while we are in early access. Tell us how you run AI and we will get back to you within one business day.`}
          />
          <div className="mt-12">
            <DesignPartnerForm />
          </div>
        </div>
      </section>

      <CtaBand title={`Start monitoring your AI with ${p.name}.`} text="Free tier available. Set up in minutes." label={`Try ${p.name} Free`} href={siteConfig.trasys.signupUrl} />
      <Faq
        title={`${p.name} FAQs`}
        items={[
          { q: `What is ${p.name}?`, a: `${p.name} is an observability platform for AI applications, built by ${brand.name}. It traces LLM calls, tracks token spend, detects loops and routes incidents.` },
          { q: "Which languages and stacks are supported?", a: "SDKs for JavaScript, TypeScript, Python, Go and Node.js, with support for common databases, clouds and Kubernetes." },
          { q: "Is there a free plan?", a: `Yes. You can start on the free tier at ${siteConfig.trasys.signupUrl.replace("https://", "")}.` },
          { q: "Can Konsilience help us instrument our AI app?", a: "Yes. Our team can set up tracing, dashboards and alerting as part of an AI engagement." },
        ]}
      />
    </>
  );
}
