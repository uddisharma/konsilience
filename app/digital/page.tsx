import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import FaqList from "@/components/FaqList";
import BookCallButton from "@/components/BookCallButton";
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "@/lib/og";
import Icon from "@/components/ui/Icon";
import Reveal, { LineReveal } from "@/components/ui/Reveal";
import JsonLd from "@/components/JsonLd";
import { serviceList } from "@/lib/catalog";
import { siteUrl } from "@/lib/routes";
import { buildDigitalMarketingSchema } from "@/lib/schema";
import { CountUp, ServiceRows, Timeline } from "./Interactive";
import "./digital.css";

export const metadata: Metadata = {
  title: "Digital Marketing & Performance Growth Agency | Konsilience",
  description: "AI-driven digital marketing, technical SEO, multi-channel PPC, conversion rate optimization, and growth engineering delivering 4.8x average ROAS.",
  keywords: [
    "Digital Marketing Agency",
    "Performance Marketing Agency",
    "Enterprise SEO Company",
    "PPC Agency Google Meta",
    "Conversion Rate Optimization Agency",
    "B2B SaaS Growth Marketing",
    "Full-Funnel Demand Generation",
    "AI Search Optimization GEO",
    "Konsilience",
  ],
  alternates: { canonical: `${siteUrl}/digital` },
  openGraph: {
    title: "Digital Marketing & Performance Growth Agency | Konsilience",
    description: "Scale customer acquisition with engineering-grade digital marketing, technical SEO, and conversion rate optimization.",
    url: `${siteUrl}/digital`,
    images: [{ url: `${siteUrl}/og-image.png`, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, alt: "Digital Marketing & Performance Growth Agency | Konsilience" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing & Performance Growth Agency | Konsilience",
    description: "Scale customer acquisition with engineering-grade digital marketing, technical SEO, and conversion rate optimization.",
  },
};

// Short label shown beside each service title.
const SERVICE_TAGS: Record<string, string> = {
  "website-and-seo-audit": "Site Health Check",
  "seo-and-local-seo": "Organic Search",
  "performance-marketing": "Paid Media",
  "content-and-social-media": "Brand & Content",
  "ai-marketing-automation": "Lead Automation",
};
const marketingServices = serviceList
  .filter((x) => x.category === "Digital Marketing")
  .map((x) => ({ icon: x.icon, title: x.name, tag: SERVICE_TAGS[x.slug], text: x.short, href: `/services/${x.slug}`, deliverables: x.offerings }));

const growthSteps = [
  {
    title: "Full-Funnel Audit & Intelligence",
    text: "We audit tracking pixels, Core Web Vitals, organic search gaps, and competitor advertising hooks to uncover your highest-ROI growth opportunities.",
  },
  {
    title: "Attribution & Server-Side CAPI",
    text: "We deploy server-side tracking pipelines (Meta CAPI, Google Enhanced Conversions) that bypass ad blockers and restore 98%+ attribution accuracy.",
  },
  {
    title: "Creative Sprints & Multi-Channel Launch",
    text: "Our design and copy squads launch high-converting ad variations, tailored landing pages, and search keyword matrices in structured sprint cycles.",
  },
  {
    title: "CRO & Algorithmic Bid Optimization",
    text: "We implement weekly split testing, form friction reduction, and algorithmic Smart Bidding rules tuned strictly for revenue, not vanity clicks.",
  },
  {
    title: "Retention Loops & Compounding Scale",
    text: "Automated lifecycle email flows and programmatic content expansion turn one-off customers into repeat brand advocates with compounding LTV.",
  },
];

const differentiators = [
  {
    title: "Full-Stack Technical SEO & Site Speed",
    text: "Traditional agencies only tweak meta tags. Our full-stack Next.js and React engineers directly optimize Core Web Vitals, crawl budgets, and server-rendered schemas to win the top ranking spots.",
  },
  {
    title: "First-Party Attribution & Server-Side CAPI",
    text: "Client-side pixels lose over 30% of conversion data to iOS privacy and ad blockers. We build server-side CAPI pipelines (Google Enhanced Conversions, Meta CAPI) ensuring 98%+ tracking accuracy.",
  },
  {
    title: "Hypothesis-Driven CRO & Code-Level Split Testing",
    text: "Instead of unscientific visual guesses, we conduct continuous multivariate split tests, streamlined multi-step forms, and automated personalization that systematically lifts conversion rates.",
  },
  {
    title: "100% Client-Owned Ad Accounts & Zero Hostage Data",
    text: "You retain full administrative ownership of every Google Ads, Meta, LinkedIn, and GA4 property from day one. Zero hidden markups, zero proprietary locks, and complete financial transparency.",
  },
  {
    title: "60% Cost Advantage via Dedicated Growth Pods",
    text: "Access senior digital strategists, full-stack developers, copywriters, and performance media buyers at 55%–65% lower rates than boutique London, New York, or Dubai agencies.",
  },
];

const regionalHubs = [
  {
    city: "Dubai & UAE",
    service: "Digital Marketing & Bilingual Arabic/EN SEO",
    href: "/ae/digital-marketing-agency-dubai",
    savings: "60% Cost Advantage",
    highlight: "UAE PDPL & GCC Ad Fluency",
  },
  {
    city: "United States",
    service: "B2B SaaS Demand Gen & Enterprise PPC",
    href: "/us/digital-marketing-agency-usa",
    savings: "65% Cost Advantage",
    highlight: "Silicon Valley Growth Velocity",
  },
  {
    city: "London & UK",
    service: "UK GDPR-Compliant PPC & Growth Engineering",
    href: "/uk/digital-marketing-agency-london",
    savings: "60% Cost Advantage",
    highlight: "4.5h Overlapping London Sync",
  },
  {
    city: "Canada (Toronto)",
    service: "Bilingual English/French Digital Marketing",
    href: "/ca/digital-marketing-agency-canada",
    savings: "60% Cost Advantage",
    highlight: "PIPEDA & CASL Compliant",
  },
  {
    city: "Australia (Sydney)",
    service: "Google.com.au SEO & Performance Ads",
    href: "/au/digital-marketing-agency-australia",
    savings: "60% Cost Advantage",
    highlight: "Morning Timezone Alignment",
  },
  {
    city: "Saudi Arabia (Riyadh)",
    service: "Arabic-First Performance & Snapchat Marketing",
    href: "/sa/digital-marketing-agency-saudi-arabia",
    savings: "55% Cost Advantage",
    highlight: "Vision 2030 Directives",
  },
  {
    city: "Germany & DACH",
    service: "GDPR/TTDSG B2B Lead Gen & Technical SEO",
    href: "/de/digital-marketing-agency-germany",
    savings: "55% Cost Advantage",
    highlight: "Mittelstand B2B Focus",
  },
];

const faqs = [
  {
    q: "How does Konsilience differ from conventional marketing agencies?",
    a: "Most agencies are purely creative or media-buying shops with no engineering capability. Konsilience combines data science, full-stack developers, and conversion copywriters: we fix Core Web Vitals, build programmatic landing page engines, configure server-side CAPI tracking, and optimize conversion funnels at the code level.",
  },
  {
    q: "What return on ad spend (ROAS) can we expect?",
    a: "While outcomes depend on industry margins and product-market fit, our cross-client average blended ROAS is 4.8x on paid acquisition, paired with a 35%–45% reduction in customer acquisition cost (CAC) within the first 90 days of engagement.",
  },
  {
    q: "Do we retain full ownership of our ad accounts and conversion pixels?",
    a: "Yes. 100%. You maintain direct administrative ownership of all Google Ads, Meta Business Manager, LinkedIn Campaign Manager, and GA4 accounts. We never hold your ad accounts or data hostage.",
  },
  {
    q: "How do you handle privacy regulations like GDPR, CCPA, and UAE PDPL?",
    a: "We architect marketing analytics with privacy by design: implementing Google Consent Mode v2, server-side data anonymization, and opt-out workflows that comply strictly with EU GDPR, UK DPA, California CCPA, and UAE PDPL mandates.",
  },
  {
    q: "What is included in your Free Digital Marketing & SEO Audit?",
    a: "Our senior strategists analyze your website speed (Core Web Vitals), keyword gap opportunities, server-side tracking health, paid media structure, and conversion leaks, presenting you with an actionable, prioritized roadmap.",
  },
];

const platforms = [
  "Google Search & PMax",
  "Meta Ads (FB & IG)",
  "LinkedIn B2B ABM",
  "TikTok Ads",
  "GA4 & Server CAPI",
  "Klaviyo & HubSpot",
  "Ahrefs & Semrush",
  "VWO & Split Testing",
];

// Headline numbers shown in the cream band under the hero.
const stats: [string, string][] = [
  ["4.8x", "Average client ROAS"],
  ["$25M+", "Ad spend managed"],
  ["240%+", "Organic search lift"],
  ["60%", "Cost advantage"],
];

// Short reassurances under the hero buttons; each is explained further down the page.
const HERO_POINTS = ["You own every ad account", "Server-side tracking", "No lock-in"];

// What the free audit looks at, shown as chips in the closing call to action.
const AUDIT_COVERS = ["Site speed", "Search gaps", "Tracking", "Paid accounts"];

// One icon per differentiator, in order.
const DIFFERENTIATOR_ICONS = ["code", "target", "chart", "lock", "users"];

// Growth board (hero illustration): bar heights in % and the three channel meters. Decorative, not client data.
const BOARD_BARS = [34, 46, 41, 58, 66, 61, 78, 92];
const BOARD_CHANNELS: [string, number][] = [["Organic search", 0.82], ["Paid media", 0.64], ["Content & social", 0.48]];
const BAR_STAGGER_MS = 90;

const Arrow = () => (
  <span className="kd-btn-dot">
    <Icon name="upRight" className="size-4" strokeWidth={2} />
  </span>
);

/** Circular "Konsilience Digital" stamp that spins slowly. */
function Stamp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <defs>
        <path id="kd-stamp-ring" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
      </defs>
      <g className="kd-stamp" style={{ transformOrigin: "60px 60px" }}>
        <text fill="currentColor">
          {/* textLength = the ring's circumference (2π × 46), so the words close the circle exactly */}
          <textPath href="#kd-stamp-ring" textLength={289} lengthAdjust="spacingAndGlyphs">
            Konsilience Digital • SEO • Ads • Content •
          </textPath>
        </text>
      </g>
      <path d="M48 72 72 48M54 48h18v18" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Hero illustration: a chart that draws itself, bars that rise and channel meters that fill. */
function GrowthBoard() {
  return (
    <div className="kd-board relative p-5 sm:p-7">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-semibold tracking-[.16em] text-white/70 uppercase">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--kd-glow)] opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-[var(--kd-glow)]" />
          </span>
          Growth board
        </span>
        <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium text-white/55">Illustration</span>
      </div>

      <div className="relative mt-5">
        <svg viewBox="0 0 400 190" className="w-full" aria-hidden>
          <defs>
            <linearGradient id="kd-area-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity=".38" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[40, 90, 140].map((y) => (
            <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgba(255,255,255,.09)" strokeDasharray="3 6" />
          ))}
          <path className="kd-area" d="M0 160C40 150 60 128 100 124S160 140 200 104s60-16 100-48 60-34 100-44V190H0z" fill="url(#kd-area-fill)" />
          <path className="kd-line-path" pathLength={1} d="M0 160C40 150 60 128 100 124S160 140 200 104s60-16 100-48 60-34 100-44" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
          <circle className="kd-dot" cx="396" cy="13" r="6" fill="#ffffff" />
        </svg>
        <div className="kd-chip absolute top-1 left-2 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-[var(--kd-ink)] shadow-xl">
          <Icon name="search" className="size-3.5" strokeWidth={2.2} /> Organic
          <Icon name="up" className="size-3.5 text-primary" strokeWidth={2.6} />
        </div>
        <div className="kd-chip absolute top-[46%] right-[18%] flex items-center gap-2 rounded-full bg-[var(--kd-accent)] px-3.5 py-2 text-xs font-bold text-white shadow-xl">
          <Icon name="target" className="size-3.5" strokeWidth={2.2} /> Paid ROAS
          <Icon name="up" className="size-3.5" strokeWidth={2.6} />
        </div>
        <div className="kd-chip absolute bottom-3 left-[22%] hidden items-center gap-2 rounded-full border border-white/15 bg-[var(--kd-ink-2)] px-3.5 py-2 text-xs font-bold text-white shadow-xl sm:flex">
          <Icon name="users" className="size-3.5" strokeWidth={2.2} /> Qualified leads
          <Icon name="up" className="size-3.5" strokeWidth={2.6} />
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-[1fr_1.15fr]">
        <div className="flex h-28 items-end gap-2 rounded-2xl bg-white/[.05] p-4">
          {BOARD_BARS.map((h, i) => (
            <span key={i} className="kd-bar flex-1 rounded-t-md" style={{ height: `${h}%`, animationDelay: `${900 + i * BAR_STAGGER_MS}ms`, background: i === BOARD_BARS.length - 1 ? "var(--kd-glow)" : "rgba(255,255,255,.28)" }} />
          ))}
        </div>
        <ul className="flex flex-col justify-center gap-3.5 rounded-2xl bg-white/[.05] p-4">
          {BOARD_CHANNELS.map(([label, share], i) => (
            <li key={label}>
              <span className="text-xs font-medium text-white/70">{label}</span>
              <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-white/10">
                <span className="kd-meter block h-full rounded-full bg-[var(--kd-glow)]" style={{ width: `${share * 100}%`, animationDelay: `${1400 + i * 200}ms` }} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** One endlessly scrolling row; the content is repeated so the loop has no gap. */
function Marquee({ children, reverse, speed }: { children: ReactNode; reverse?: boolean; speed?: string }) {
  return (
    <div className="kd-marquee" data-reverse={reverse || undefined} style={speed ? ({ "--kd-speed": speed } as CSSProperties) : undefined}>
      <div>{children}</div>
      <div aria-hidden>{children}</div>
    </div>
  );
}

export default function DigitalMarketingPage() {
  const schema = buildDigitalMarketingSchema(faqs);

  return (
    <div className="kd">
      <JsonLd data={schema} />

      {/* ---------- Hero: ink, with the growth board ---------- */}
      <section className="relative overflow-hidden pt-36 sm:pt-40 lg:pt-44">
        <div className="kd-grid-bg pointer-events-none absolute inset-0" />
        <div className="kd-glow pointer-events-none -top-32 right-[-10%] size-[560px] bg-white/[.07]" />
        <div className="kd-glow pointer-events-none bottom-[-20%] left-[-12%] size-[520px] bg-primary/15" style={{ animationDelay: "-4s" }} />

        <div className="wrap relative z-10">
          <nav aria-label="Breadcrumb" className="anim-hero mb-8 flex items-center gap-2 text-xs text-white/50 sm:text-sm">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <Icon name="chevron" className="size-3 -rotate-90 text-white/30" />
            <span className="font-medium text-white">Konsilience Digital</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-10 xl:gap-16">
            <div>
              <p className="kd-eyebrow anim-hero flex items-center gap-3 text-[var(--kd-glow)]">
                <span className="h-px w-10 bg-[var(--kd-glow)]" />
                Konsilience Digital
              </p>
              <LineReveal
                as="h1"
                className="kd-display kd-hero-title mt-6 text-white"
                lines={[
                  "Marketing",
                  "that shows up",
                  <span key="l3">
                    in <span className="kd-mark">revenue</span>
                  </span>,
                ]}
              />
              <p className="anim-hero mt-8 max-w-xl text-base leading-relaxed font-medium text-white/70 sm:text-lg" style={{ animationDelay: "250ms" }}>
                SEO, paid media, content and marketing automation, run by marketers who sit next to engineers. We fix what holds your site back, track what actually converts and scale the channels that pay.
              </p>
              <div className="anim-hero mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "380ms" }}>
                <Link href="/free-seo-audit" className="kd-btn kd-btn-accent">
                  Claim free marketing audit <Arrow />
                </Link>
                <Link href="#capabilities" className="kd-btn kd-btn-ghost">
                  See what we run <Arrow />
                </Link>
              </div>
              <ul className="anim-hero mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-white/65" style={{ animationDelay: "500ms" }}>
                {HERO_POINTS.map((point) => (
                  <li key={point} className="flex items-center gap-2.5">
                    <span className="grid size-5 place-items-center rounded-full bg-white text-[var(--kd-ink)]">
                      <Icon name="check" className="size-3" strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="anim-hero relative" style={{ animationDelay: "300ms" }}>
              <GrowthBoard />
              <span className="kd-sticker absolute -bottom-12 -left-12 hidden size-28 lg:grid">
                <Stamp className="size-[104px]" />
              </span>
            </div>
          </div>
        </div>

        {/* Two marquee rows: services in display type, then the platforms we work in */}
        <div className="relative z-10 mt-20 border-y border-white/10 py-5 sm:mt-24">
          <Marquee speed="46s">
            {marketingServices.map((s, i) => (
              <span key={s.href} className={`kd-display flex items-center gap-8 pr-8 text-5xl sm:text-7xl ${i % 2 ? "kd-outline text-white/60" : "text-white"}`}>
                {s.title}
                <span className="size-3 rounded-full bg-[var(--kd-glow)] sm:size-4" />
              </span>
            ))}
          </Marquee>
        </div>
        <div className="relative z-10 py-5">
          <Marquee reverse speed="34s">
            {platforms.map((p) => (
              <span key={p} className="mr-3 rounded-full border border-white/15 px-5 py-2 text-sm font-medium whitespace-nowrap text-white/70">
                {p}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ---------- Numbers: cream band ---------- */}
      <section className="kd-sheet-top border-b border-[var(--kd-line)] bg-[var(--kd-paper)] text-[var(--kd-ink)]">
        <div className="wrap grid grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label], i) => (
            <Reveal key={label} delay={i * 90} className={`border-[var(--kd-line)] px-2 py-10 sm:px-8 sm:py-14 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""} ${i ? "lg:border-l" : ""}`}>
              <span className="block font-mono text-xs font-semibold text-black/40">
                {String(i + 1).padStart(2, "0")} / {String(stats.length).padStart(2, "0")}
              </span>
              <CountUp value={value} className="kd-display mt-5 block text-6xl sm:text-7xl xl:text-8xl" />
              <span className="kd-stat-rule mt-5" />
              <span className="mt-4 block text-sm font-semibold tracking-wide text-black/60 uppercase">{label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Services: paper, rows that open ---------- */}
      <section id="capabilities" className="kd-on-paper kd-sheet-bottom sec scroll-mt-24 bg-[var(--kd-paper)] text-[var(--kd-ink)]">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="kd-eyebrow text-black/50">What we run</p>
              <LineReveal className="kd-display kd-h2 mt-4" lines={["Five services.", <span key="l2">One <span className="kd-mark">growth team</span>.</span>]} />
            </div>
            <Reveal variant="fade" className="max-w-md">
              <p className="text-base leading-relaxed font-medium text-black/65">
                Strategy and execution in the same room. Every campaign is backed by engineers who can change your site, your tracking and your funnel, not only your ads.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 sm:mt-16">
            <ServiceRows items={marketingServices} />
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-5">
            <span className="text-sm font-medium text-black/60">Need a plan across several channels?</span>
            <BookCallButton placement="digital_marketing">Schedule a growth call</BookCallButton>
          </div>
        </div>
      </section>

      {/* ---------- Process: ink, timeline that fills on scroll ---------- */}
      <section className="sec relative overflow-hidden">
        <div className="wrap">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kd-eyebrow text-[var(--kd-glow)]">How it works</p>
            <LineReveal className="kd-display kd-h2 mt-4 text-white" lines={["From audit", "to compounding growth"]} />
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65">Five phases that cut wasted spend first, then scale what converts.</p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
            <Timeline steps={growthSteps} />
          </div>
        </div>
      </section>

      {/* ---------- Why us: paper, bento grid ---------- */}
      <section className="kd-on-paper kd-sheet-top kd-sheet-bottom sec bg-[var(--kd-paper)] text-[var(--kd-ink)]">
        <div className="wrap">
          <p className="kd-eyebrow text-black/50">Why Konsilience Digital</p>
          <LineReveal className="kd-display kd-h2 mt-4 max-w-5xl" lines={["Marketers who can", <span key="l2">touch the <span className="kd-mark">code</span></span>]} />
          <div className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-6">
            {differentiators.map((d, i) => {
              // first two cards are wide, the last three share a row; the first is ink and the fourth a darker cream
              const tone = i === 0 ? "kd-card-ink bg-[var(--kd-ink)] text-white" : i === 3 ? "bg-[var(--kd-paper-2)]" : "bg-white";
              const muted = i === 0 ? "text-white/65" : "text-black/65";
              return (
                <Reveal key={d.title} delay={(i % 3) * 90} variant="zoom" className={i < 2 ? "md:col-span-3" : "md:col-span-2"}>
                  <article className={`kd-card flex h-full flex-col justify-between gap-10 rounded-[28px] p-7 sm:p-9 ${tone}`}>
                    <span aria-hidden className="kd-display kd-card-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`kd-card-icon grid size-14 place-items-center rounded-2xl ${i === 0 ? "bg-white text-[var(--kd-ink)]" : "bg-[var(--kd-ink)] text-white"}`}>
                      <Icon name={DIFFERENTIATOR_ICONS[i]} className="size-6" />
                    </span>
                    <div>
                      <h3 className="kd-display kd-h3">{d.title}</h3>
                      <p className={`mt-4 text-[15px] leading-relaxed ${muted}`}>{d.text}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Markets: ink, tiles that fill with cream ---------- */}
      <section className="sec">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="kd-eyebrow text-[var(--kd-glow)]">Where we work</p>
              <LineReveal className="kd-display kd-h2 mt-4 text-white" lines={["Local fluency,", "global reach"]} />
            </div>
            <p className="max-w-md text-base leading-relaxed text-white/65">Growth pods that know the search habits, ad platforms and privacy rules of each market.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {regionalHubs.map((hub, i) => (
              <Reveal key={hub.city} delay={(i % 4) * 70} variant="fade">
                <Link href={hub.href} className="kd-tile flex h-full min-h-56 flex-col justify-between gap-8 bg-[var(--kd-ink)] p-7 text-white">
                  <div className="flex items-start justify-between gap-4">
                    {/* country code from the page URL: flag emoji do not render on Windows */}
                    <span className="kd-tile-muted rounded-full border border-current px-3 py-1 font-mono text-xs font-bold tracking-[.18em] text-[var(--kd-glow)] uppercase">{hub.href.split("/")[1]}</span>
                    <span className="kd-tile-arrow grid size-10 place-items-center rounded-full border border-white/25">
                      <Icon name="upRight" className="size-4" strokeWidth={2} />
                    </span>
                  </div>
                  <div>
                    <h3 className="kd-display kd-h3">{hub.city}</h3>
                    <p className="kd-tile-muted mt-3 text-sm leading-relaxed text-white/60">{hub.service}</p>
                    <p className="kd-tile-muted mt-3 text-xs font-bold tracking-[.14em] text-[var(--kd-glow)] uppercase">{hub.highlight}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
            {/* closing tile fills the eighth cell of the grid */}
            <div className="flex min-h-56 flex-col justify-between gap-8 bg-[var(--kd-ink-2)] p-7">
              <Stamp className="size-20 text-white/80" />
              <p className="text-sm leading-relaxed text-white/60">
                Somewhere else? <Link href="/contact" className="font-semibold text-white underline decoration-[var(--kd-glow)] underline-offset-4">Tell us your market</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="sec border-t border-white/10">
        <div className="wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="kd-eyebrow text-[var(--kd-glow)]">FAQ</p>
            <LineReveal className="kd-display kd-h2 mt-4 text-white" lines={["Questions,", "answered"]} />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-white/65">What to expect when you work with our digital marketing team.</p>
            <Reveal variant="fade" className="mt-10 max-w-sm">
              <div className="rounded-[28px] border border-white/10 bg-[var(--kd-ink-2)] p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-white text-[var(--kd-ink)]">
                  <Icon name="chat" className="size-5" />
                </span>
                <h3 className="kd-display mt-6 text-3xl text-white">Something else?</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">Ask the team directly. You get a straight answer from someone who runs campaigns.</p>
                <Link href="/contact" className="kd-btn kd-btn-ghost mt-6">
                  Talk to the team <Arrow />
                </Link>
              </div>
            </Reveal>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>

      {/* ---------- Closing call to action: cream ---------- */}
      <section className="px-[clamp(16px,3.4vw,48px)] pb-[clamp(56px,5.5vw,110px)]">
        <Reveal variant="zoom">
          <div className="relative overflow-hidden kd-on-paper rounded-[36px] bg-[var(--kd-paper)] px-7 py-14 text-[var(--kd-ink)] sm:px-14 sm:py-20 lg:px-20">
            <div className="kd-cta-grid pointer-events-none absolute inset-0" />
            <Stamp className="absolute -top-8 -right-8 size-40 opacity-90 sm:size-56 lg:top-1/2 lg:right-16 lg:size-64 lg:-translate-y-1/2" />
            <div className="relative max-w-4xl">
              <LineReveal className="kd-display kd-h2" lines={["Ready to grow", "what converts?"]} />
              <p className="mt-6 max-w-xl text-base leading-relaxed font-medium text-black/65 sm:text-lg">
                Start with a free audit. We look at your site speed, search gaps, tracking and paid accounts, then show you where the leaks are and what to fix first.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {AUDIT_COVERS.map((item) => (
                  <li key={item} className="flex items-center gap-2 rounded-full border border-[var(--kd-line)] bg-white px-4 py-2 text-sm font-semibold">
                    <Icon name="check" className="size-3.5" strokeWidth={3} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="/free-seo-audit" className="kd-btn kd-btn-accent">
                  Claim free marketing audit <Arrow />
                </Link>
                <Link href="/contact" className="text-sm font-bold underline decoration-2 underline-offset-4">
                  Or talk to the team
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
