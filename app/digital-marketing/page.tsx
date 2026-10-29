import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, ProcessSteps, SectionHead, Split } from "@/components/page/Blocks";
import FaqList from "@/components/FaqList";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal, { LineReveal } from "@/components/ui/Reveal";
import JsonLd from "@/components/JsonLd";
import { siteUrl } from "@/lib/routes";
import { buildDigitalMarketingSchema } from "@/lib/schema";

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
  alternates: { canonical: `${siteUrl}/digital-marketing` },
  openGraph: {
    title: "Digital Marketing & Performance Growth Agency | Konsilience",
    description: "Scale customer acquisition with engineering-grade digital marketing, technical SEO, and conversion rate optimization.",
    url: `${siteUrl}/digital-marketing`,
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "Digital Marketing & Performance Growth Agency | Konsilience" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing & Performance Growth Agency | Konsilience",
    description: "Scale customer acquisition with engineering-grade digital marketing, technical SEO, and conversion rate optimization.",
  },
};

const marketingServices = [
  {
    icon: "search",
    title: "Search Engine Optimization (SEO)",
    tag: "Organic Search Authority",
    text: "Technical crawl audits, programmatic page engines, and generative engine optimization (GEO) to dominate Google and AI search answers like ChatGPT and Perplexity.",
    href: "/services/search-engine-optimization",
    deliverables: ["Core Web Vitals & Next.js SSR", "Programmatic Long-Tail SEO", "Generative Engine Optimization (GEO)", "Authority Digital PR & Backlinks"],
  },
  {
    icon: "target",
    title: "Performance Marketing & PPC",
    tag: "High-ROAS Paid Media",
    text: "Multi-channel paid search and social campaigns across Google Ads, Meta, and LinkedIn engineered for maximum ROAS, lower CPA, and closed-loop revenue.",
    href: "/services/performance-marketing-and-ppc",
    deliverables: ["Google Search & Performance Max", "Meta Ads High-Velocity Testing", "LinkedIn B2B ABM Funnels", "Server CAPI & Enhanced Conversions"],
  },
  {
    icon: "chart",
    title: "Conversion Rate Optimization (CRO)",
    tag: "Funnel Engineering",
    text: "Heuristic UX audits, continuous A/B code testing, and checkout friction reduction that converts your existing traffic into qualified revenue.",
    href: "/services/conversion-rate-optimization",
    deliverables: ["Hypothesis-Driven A/B Split Tests", "Session Recording & Friction Audits", "Checkout & Lead Flow Streamlining", "Dynamic Intent Personalization"],
  },
  {
    icon: "share",
    title: "Social Media & Brand Growth",
    tag: "Brand Authority",
    text: "Executive LinkedIn thought leadership, short-form video production, and viral community management that builds lasting brand equity and inbound deal flow.",
    href: "/services/social-media-marketing",
    deliverables: ["Founder & Executive Personal Branding", "Vertical Short-Form Video Assets", "Organic B2B Community Building", "Narrative & Creative Direction"],
  },
  {
    icon: "doc",
    title: "Content Marketing & Copywriting",
    tag: "Thought Leadership",
    text: "Subject-matter expert whitepapers, conversion landing page copy, and SEO topic clusters that educate and convert technical and enterprise buyers.",
    href: "/services/content-marketing-and-copywriting",
    deliverables: ["Architectural Technical Whitepapers", "High-Converting Page Copy", "Topical Authority Content Hubs", "Sales Enablement Case Studies"],
  },
  {
    icon: "mail",
    title: "Email Marketing & Automation",
    tag: "Lifecycle Retention",
    text: "Automated onboarding, cart recovery, and lifecycle nurture journeys built in Klaviyo and HubSpot to maximize customer lifetime value (LTV).",
    href: "/services/email-marketing-and-automation",
    deliverables: ["Behavioral Trigger Automation", "Abandoned Cart & Funnel Recovery", "Predictive Churn Prevention Flows", "SPF, DKIM, DMARC Deliverability"],
  },
];

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
    flag: "🇦🇪",
    service: "Digital Marketing & Bilingual Arabic/EN SEO",
    href: "/ae/digital-marketing-agency-dubai",
    savings: "60% Cost Advantage",
    highlight: "UAE PDPL & GCC Ad Fluency",
  },
  {
    city: "United States",
    flag: "🇺🇸",
    service: "B2B SaaS Demand Gen & Enterprise PPC",
    href: "/us/digital-marketing-agency-usa",
    savings: "65% Cost Advantage",
    highlight: "Silicon Valley Growth Velocity",
  },
  {
    city: "London & UK",
    flag: "🇬🇧",
    service: "UK GDPR-Compliant PPC & Growth Engineering",
    href: "/uk/digital-marketing-agency-london",
    savings: "60% Cost Advantage",
    highlight: "4.5h Overlapping London Sync",
  },
  {
    city: "Canada (Toronto)",
    flag: "🇨🇦",
    service: "Bilingual English/French Digital Marketing",
    href: "/ca/digital-marketing-agency-canada",
    savings: "60% Cost Advantage",
    highlight: "PIPEDA & CASL Compliant",
  },
  {
    city: "Australia (Sydney)",
    flag: "🇦🇺",
    service: "Google.com.au SEO & Performance Ads",
    href: "/au/digital-marketing-agency-australia",
    savings: "60% Cost Advantage",
    highlight: "Morning Timezone Alignment",
  },
  {
    city: "Saudi Arabia (Riyadh)",
    flag: "🇸🇦",
    service: "Arabic-First Performance & Snapchat Marketing",
    href: "/sa/digital-marketing-agency-saudi-arabia",
    savings: "55% Cost Advantage",
    highlight: "Vision 2030 Directives",
  },
  {
    city: "Germany & DACH",
    flag: "🇩🇪",
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

export default function DigitalMarketingPage() {
  const schema = buildDigitalMarketingSchema(faqs);

  return (
    <>
      <JsonLd data={schema} />

      {/* =========================================================================
          HERO SECTION (Center-Aligned, Cinematic Ambient Glow, Open Editorial Layout)
         ========================================================================= */}
      <section className="relative overflow-hidden bg-black pt-36 pb-20 sm:pt-44 sm:pb-28 lg:pt-48 lg:pb-32 border-b border-line/60">
        {/* Ambient Gradient Glows */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="size-[640px] rounded-full bg-primary/20 blur-[140px] opacity-80 animate-pulse" />
          <div className="absolute top-1/4 -right-24 size-[440px] rounded-full bg-indigo-600/15 blur-[130px]" />
          <div className="absolute top-1/3 -left-24 size-[440px] rounded-full bg-blue-500/15 blur-[130px]" />
        </div>

        {/* Delicate Tech Dot Texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.22) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, #000 20%, transparent 80%)",
          }}
        />

        <div className="wrap relative z-10 flex flex-col items-center text-center">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs sm:text-sm text-muted">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Icon name="chevron" className="size-3 -rotate-90 text-white/40" />
            <span className="text-white font-medium">Digital Marketing & Growth</span>
          </nav>

          {/* Eyebrow Pill */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary shadow-sm shadow-primary/20 backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span>AI-Driven Performance & Growth Engineering</span>
          </div>

          {/* Hero Headline */}
          <h1 className="h1 max-w-5xl mx-auto leading-[1.06] tracking-tight">
            High-Performance Marketing, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-primary to-indigo-300 bg-clip-text text-transparent">
              Engineered for Pure ROI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-white/75 max-w-3xl mx-auto leading-relaxed font-medium">
            We merge software engineering, first-party server attribution, and high-velocity conversion testing.
            Acquire high-intent customers, dominate organic and AI search, and compound enterprise revenue.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact">Claim Free Marketing Audit</Button>
            <Button variant="outline" href="#capabilities">Explore Capabilities</Button>
          </div>

          {/* Mastered Channels Strip */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs font-mono uppercase tracking-wider text-muted max-w-4xl">
            <span className="text-white/40">Platforms Mastered:</span>
            {platforms.map((p, idx) => (
              <span key={p} className="inline-flex items-center gap-2 text-white/80">
                {idx > 0 && <span className="text-white/20">•</span>}
                <span>{p}</span>
              </span>
            ))}
          </div>

          {/* Open Typographic Metrics Bar (Zero Boxes, Pure Line Dividers) */}
          <div className="mt-20 w-full border-t border-line/60 pt-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-line/40">
              <div className="flex flex-col items-center text-center px-4">
                <span className="font-condensed text-5xl sm:text-6xl font-bold text-white tracking-tight">4.8x</span>
                <span className="mt-2 text-xs sm:text-sm text-muted font-medium uppercase tracking-wider">Average Client ROAS</span>
              </div>
              <div className="flex flex-col items-center text-center px-4 pt-6 lg:pt-0">
                <span className="font-condensed text-5xl sm:text-6xl font-bold text-white tracking-tight">$25M+</span>
                <span className="mt-2 text-xs sm:text-sm text-muted font-medium uppercase tracking-wider">Ad Spend Managed</span>
              </div>
              <div className="flex flex-col items-center text-center px-4 pt-6 lg:pt-0">
                <span className="font-condensed text-5xl sm:text-6xl font-bold text-white tracking-tight">240%+</span>
                <span className="mt-2 text-xs sm:text-sm text-muted font-medium uppercase tracking-wider">Organic Search Lift</span>
              </div>
              <div className="flex flex-col items-center text-center px-4 pt-6 lg:pt-0">
                <span className="font-condensed text-5xl sm:text-6xl font-bold text-primary tracking-tight">60%</span>
                <span className="mt-2 text-xs sm:text-sm text-muted font-medium uppercase tracking-wider">Cost Advantage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CORE CAPABILITIES (Split Layout with Editorial Rows - Zero Card Boxes)
         ========================================================================= */}
      <section id="capabilities" className="sec bg-black">
        <Split
          title={["Full-Funnel Capabilities,", "Built for Revenue"]}
          text="We eliminate the disconnect between marketing strategy and technical execution. Every campaign is supported by software engineers, first-party data pipelines, and continuous code-level split testing."
        >
          <div className="flex flex-col border-t border-line/60">
            {marketingServices.map((service, index) => (
              <div
                key={service.title}
                className="group relative border-b border-line/60 py-8 transition-colors duration-300 hover:border-primary/50"
              >
                {/* Header: Serial Number + Tag + Arrow */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-primary">[ {String(index + 1).padStart(2, "0")} ]</span>
                    <span className="text-xs font-medium uppercase tracking-wider text-muted">{service.tag}</span>
                  </div>
                  <Link
                    href={service.href}
                    className="flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors group-hover:text-white"
                  >
                    <span>View Service</span>
                    <Icon name="upRight" className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>

                {/* Service Title */}
                <h3 className="mt-3 text-xl sm:text-2xl font-bold text-white transition-colors duration-300 group-hover:text-primary">
                  <Link href={service.href}>{service.title}</Link>
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-muted leading-relaxed max-w-2xl">
                  {service.text}
                </p>

                {/* Deliverable Tags */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {service.deliverables.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 text-xs text-white/75 bg-white/[0.04] px-3 py-1 rounded-full border border-white/10"
                    >
                      <span className="size-1 rounded-full bg-primary" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between pt-4">
            <span className="text-xs text-muted font-medium">Need a custom multi-channel strategy?</span>
            <Button variant="outline" href="/contact">Schedule Growth Call</Button>
          </div>
        </Split>
      </section>

      {/* =========================================================================
          5-PHASE GROWTH ENGINE (Continuous ProcessSteps Line Grid - Zero Boxes)
         ========================================================================= */}
      <section className="sec bg-black border-t border-line/60">
        <div className="wrap">
          <SectionHead
            title={["The Scientific Growth Engine"]}
            text="A proven, 5-phase execution model that eliminates wasted ad spend and scales what converts."
          />
          <div className="mt-14">
            <ProcessSteps steps={growthSteps} />
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE KONSILIENCE DIFFERENCE (Numbered Editorial Rows - Zero Spreadsheets)
         ========================================================================= */}
      <section className="sec bg-black border-t border-line/60">
        <Split
          title={["Why High-Growth Brands", "Partner With Konsilience"]}
          text="Traditional agencies are media buyers who can't touch your codebase. In-house teams are often bottlenecked by developer backlogs. Konsilience delivers dedicated, full-stack growth pods."
        >
          <div className="border-t border-line">
            {differentiators.map((diff, i) => (
              <Reveal key={diff.title} delay={i * 70} variant="fade">
                <div className="group grid gap-3 border-b border-line py-8 transition-colors md:grid-cols-[70px_1fr_1.4fr] md:gap-8">
                  <span className="fs-base font-mono font-medium text-muted transition-colors group-hover:text-primary">
                    [ 0{i + 1} ]
                  </span>
                  <h3 className="subtitle text-white group-hover:text-primary transition-colors">
                    {diff.title}
                  </h3>
                  <p className="fs-para font-medium text-muted leading-relaxed">
                    {diff.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Split>
      </section>

      {/* =========================================================================
          GLOBAL REGIONAL GROWTH HUBS (International Directory Table - Zero Boxes)
         ========================================================================= */}
      <section className="sec bg-black border-t border-line/60">
        <div className="wrap">
          <SectionHead
            title={["Local Market Fluency,", "Global Scale"]}
            text="Dedicated localized growth pods engineered for high-intent queries and compliance in key international markets."
          />

          <div className="mt-12 border-t border-line/60 divide-y divide-line/40">
            {regionalHubs.map((hub) => (
              <Link
                key={hub.city}
                href={hub.href}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 transition-colors duration-300 hover:bg-white/[0.02] px-2 -mx-2 rounded-xl"
              >
                <div className="flex items-center gap-4 md:w-1/4">
                  <span className="text-2xl">{hub.flag}</span>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">
                      {hub.city}
                    </h3>
                    <span className="text-xs font-mono text-muted">{hub.highlight}</span>
                  </div>
                </div>

                <div className="md:w-1/2">
                  <p className="text-sm text-white/70 font-medium">
                    {hub.service}
                  </p>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 md:w-1/4">
                  <span className="text-xs font-mono font-semibold text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    {hub.savings}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-white/80 group-hover:text-primary transition-colors">
                    <span>View Strategy</span>
                    <Icon name="upRight" className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FAQS (Clean Native FaqList - Zero Card Boxes)
         ========================================================================= */}
      <section className="sec bg-black border-t border-line/60">
        <div className="wrap max-w-4xl mx-auto">
          <SectionHead
            title={["Frequently Asked Questions"]}
            text="Everything you need to know about partnering with our digital marketing and growth squads."
            center
          />
          <div className="mt-12">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      {/* =========================================================================
          CLOSING CTA BAND
         ========================================================================= */}
      <CtaBand
        title="Ready to Scale Your Customer Acquisition?"
        text="Book a complimentary 30-minute growth audit with our senior marketing architects. We'll pinpoint your biggest conversion leaks, audit your Core Web Vitals, and outline a high-converting roadmap."
        label="Claim Free Marketing Audit"
        href="/contact"
      />
    </>
  );
}
