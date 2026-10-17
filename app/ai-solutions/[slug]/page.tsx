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

const aiFaqs: Record<string, { q: string; a: string }[]> = {
  "agentic-ai": [
    {
      q: "How do you prevent agentic loops from running away or burning excessive tokens?",
      a: "We implement hard iteration bounds, dynamic budget quotas, deterministic transition rules, and real-time loop anomaly detection using our Trasys AI telemetry platform.",
    },
    {
      q: "Can autonomous agents write directly to production databases or payment gateways?",
      a: "No. All agent tool calls pass through schema validation proxies and human-in-the-loop (HITL) authorization gateways for any write or high-risk state modification.",
    },
    {
      q: "What frameworks do you use to build multi-agent systems?",
      a: "We architect multi-agent systems using LangGraph, AutoGen, and custom state machines paired with sandboxed execution runtimes (Firecracker microVMs).",
    },
    {
      q: "How are agent trajectories evaluated before production deployment?",
      a: "We run regression test suites across historical workflow traces, evaluating goal completion rates, tool argument accuracy, and step efficiency.",
    },
  ],
  "generative-ai": [
    {
      q: "How do you eliminate hallucinations in enterprise RAG systems?",
      a: "We implement hybrid search (dense vectors + BM25), contextual parent-chunk retrieval, cross-encoder reranking (Cohere/BGE), and self-reflective hallucination guardrails.",
    },
    {
      q: "Will our proprietary company data be used to train public foundation models?",
      a: "Never. We deploy private tenant endpoints on AWS Bedrock, Azure OpenAI, or self-hosted open models (Llama 3/Mistral) with zero-retention data policies.",
    },
    {
      q: "How do you handle unstructured data ingestion (PDFs, presentations, scans)?",
      a: "We use multimodal layout parsers to preserve table structures, headings hierarchy, and embedded figures in vector embeddings.",
    },
    {
      q: "What evaluation benchmarks measure retrieval accuracy?",
      a: "We automate continuous Ragas and TruLens evaluations measuring Faithfulness, Answer Relevance, Context Precision, and Context Recall.",
    },
  ],
  "ai-copilots": [
    {
      q: "How does an in-product copilot differ from a generic chat widget?",
      a: "A copilot is deeply integrated into your software UI: it inspects the user's active screen context, prefills forms, highlights anomalies, and executes in-app actions on command.",
    },
    {
      q: "How do you keep copilot response latency low (<500ms)?",
      a: "We stream responses via WebSockets, pre-fetch user contextual embeddings in the background, and route simpler queries to smaller quantized models.",
    },
    {
      q: "Can users review and undo copilot actions?",
      a: "Yes. All copilot mutations are executed as staged, reversible actions with clear preview diffs and instant undo capabilities.",
    },
    {
      q: "How do you measure copilot adoption and business ROI?",
      a: "We track copilot interaction frequency, task completion acceleration, suggestion acceptance rates, and reduction in human support inquiries.",
    },
  ],
  "computer-vision": [
    {
      q: "Which computer vision architectures and models do you deploy?",
      a: "We deploy YOLOv10/v11, Segment Anything (SAM 2), ResNet, and multimodal vision-language models (CLIP, GPT-4o Vision) tailored for high-speed detection and segmentation.",
    },
    {
      q: "Can computer vision models run locally on edge devices without cloud connectivity?",
      a: "Yes. We quantize and optimize models using TensorRT, ONNX Runtime, and OpenVINO for real-time inference on NVIDIA Jetson, Raspberry Pi, and mobile devices.",
    },
    {
      q: "What frame rate and inference speed can we expect for real-time video inspection?",
      a: "On edge GPU hardware, our optimized pipelines achieve 30 to 60+ FPS real-time object detection and anomaly classification.",
    },
    {
      q: "How do you handle poor lighting, camera vibrations, and lens distortion?",
      a: "We apply automated preprocessing filters, lens distortion calibrations, and synthetic data augmentation during model training to maintain high accuracy under harsh operating conditions.",
    },
  ],
  "conversational-ai": [
    {
      q: "What is the end-to-end voice latency for conversational voice bots?",
      a: "Our optimized voice pipelines achieve sub-500ms voice-to-voice turn latency using low-latency WebSockets, fast Speech-to-Text (Deepgram), streaming LLMs, and natural Text-to-Speech.",
    },
    {
      q: "Can conversational bots handle natural voice interruptions (barge-in)?",
      a: "Yes. We implement real-time voice activity detection (VAD) that immediately mutes model audio output and listens as soon as the user speaks.",
    },
    {
      q: "Which messaging channels can your assistants integrate with?",
      a: "We integrate across WhatsApp Business, SMS, web chat, Zendesk, Salesforce Service Cloud, and telephony SIP/PSTN trunking.",
    },
    {
      q: "How does the assistant escalate complex conversations to human agents?",
      a: "When sentiment analysis detects frustration or intent falls outside defined guardrails, the bot performs a warm transfer to human staff, summarizing conversation context in the agent's CRM.",
    },
  ],
};

export default async function AiSolutionPage({ params }: PageProps<"/ai-solutions/[slug]">) {
  const a = find((await params).slug);
  if (!a) notFound();
  const n = a.name;
  const faqs = aiFaqs[a.slug] ?? [
    { q: `How long does a ${n} project take?`, a: "A proof of concept typically takes 4–6 weeks; a production rollout 3–6 months depending on integrations." },
    { q: "Do we need proprietary training data?", a: "Not always. Many solutions work with your existing documents and systems through retrieval, without training a model from scratch." },
    { q: "Can it run on our own cloud infrastructure?", a: "Yes. We deploy on AWS, Azure, GCP or on-premise, with private model endpoints when required." },
    { q: "How do you govern and control inference costs?", a: "Model routing, caching, prompt optimization and usage monitoring keep inference costs predictable." },
  ];

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
        <Split title={["Use Cases"]} text={`Where ${n} creates measurable operational ROI today.`}>
          <NumberedRows items={a.useCases.map((u) => ({ title: u, text: `Production-ready ${u.toLowerCase()} engineered with strict latency, safety, and evaluation benchmarks.` }))} />
        </Split>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["What We Deliver"]} />
          <div className="mt-14">
            <CardGrid
              items={[
                { icon: "compass", title: "Strategy & roadmap", text: `Use-case discovery, ROI modelling and a phased ${n.toLowerCase()} delivery roadmap.` },
                { icon: "db", title: "Data foundation", text: "Secure ingestion pipelines, vector indices and metadata governance so models get clean context." },
                { icon: "code", title: "Build & integrate", text: "Production model orchestration, custom agents and REST/gRPC APIs integrated with your core workflows." },
                { icon: "target", title: "Evaluation & safety", text: "Comprehensive safety guardrails, hallucination testing and performance latency benchmarks." },
                { icon: "cloud", title: "MLOps / LLMOps", text: "Automated deployment, token spend monitoring with Trasys AI, and continuous regression suites." },
                { icon: "users", title: "Enablement", text: "Technical documentation, architecture blueprints and team training so your squad owns the system." },
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
        items={faqs}
      />
    </>
  );
}
