import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteUrl } from "@/lib/routes";
import { brand } from "@/lib/content";
import {
  getRegionalService,
  getAllRegionalServiceParams,
  getCountryHub,
  getServicesForCountry,
} from "@/lib/regionalServiceData";
import { buildRegionalServiceSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Icon from "@/components/ui/Icon";
import FaqList from "@/components/FaqList";
import Reveal from "@/components/ui/Reveal";

type PageProps = {
  params: Promise<{ country: string; service: string }>;
};

export async function generateStaticParams() {
  return getAllRegionalServiceParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country, service } = await params;
  const data = getRegionalService(country, service);
  if (!data) return {};

  const url = `${siteUrl}/${data.countryCode}/${data.serviceSlug}`;

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: [
      data.h1,
      `${data.serviceType === "mobile-app" ? "Mobile app development" : "Software development"} ${data.countryName}`,
      `App developers ${data.cityName || data.countryName}`,
      `Outsource software development to India from ${data.countryName}`,
      `Hire dedicated developers ${data.cityName || data.countryName}`,
      "Konsilience",
    ],
    alternates: { canonical: url },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url,
      type: "website",
      siteName: brand.name,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
    },
  };
}

export default async function RegionalServicePage({ params }: PageProps) {
  const { country, service } = await params;
  const data = getRegionalService(country, service);
  if (!data) notFound();

  const countryHub = getCountryHub(country);
  const otherServices = getServicesForCountry(country).filter(
    (s) => s.serviceSlug !== data.serviceSlug
  );
  const schemas = buildRegionalServiceSchema(data);

  return (
    <>
      <JsonLd data={schemas} />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28 border-b border-line bg-gradient-to-b from-primary/5 via-black to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(17,99,251,0.15),rgba(255,255,255,0))]" />

        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Country Flag & Eyebrow Badge */}
            <Reveal variant="fade">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs md:text-sm font-medium tracking-wide mb-8">
                <span className="text-base">{countryHub?.flag || "🌐"}</span>
                <span>{data.eyebrow}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-white/60 font-mono">{data.complianceBadge}</span>
              </div>
            </Reveal>

            {/* Main Page H1 */}
            <Reveal delay={60}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
                {data.h1}
              </h1>
            </Reveal>

            {/* Tagline / Subhead */}
            <Reveal delay={120}>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                {data.tagline}
              </p>
            </Reveal>

            {/* CTA Buttons */}
            <Reveal delay={180}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-primary text-white font-semibold text-base shadow-lg shadow-primary/25 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Book a Regional Discovery Call</span>
                  <Icon name="arrow-right" className="w-4 h-4" />
                </Link>
                <Link
                  href={`/${data.countryCode}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/15 bg-white/5 text-white/80 font-medium text-base hover:bg-white/10 hover:text-white transition-all"
                >
                  <span>Explore {data.countryName} Hub</span>
                  <Icon name="external-link" className="w-4 h-4 text-white/40" />
                </Link>
              </div>
            </Reveal>

            {/* Hero Key Stats */}
            <Reveal delay={240}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl border border-line bg-surface/50 backdrop-blur-md">
                {data.heroStats.map(([stat, label]) => (
                  <div key={label} className="text-center p-3">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                      {stat}
                    </div>
                    <div className="text-xs sm:text-sm text-white/60 font-medium">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Cost & Delivery Comparison vs Local Agencies */}
      <Section className="border-b border-line bg-black">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">
                Transparent Economics
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
                Offshore Advantage vs Local {data.cityName || data.countryName} Agencies
              </h2>
              <p className="text-sm md:text-base text-white/60 mt-3 max-w-xl mx-auto">
                Direct access to top 3% senior engineers without boutique agency markups or local recruitment overhead.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {/* Local Agency Card */}
              <div className="p-8 rounded-2xl border border-line bg-surface/30 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2">
                    Boutique Local Agency
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4">
                    {data.cityName || data.countryName} Local Studio
                  </h3>
                  <div className="text-3xl font-extrabold text-white/80 mb-2">
                    {data.rateComparison.localAgencyRate}
                  </div>
                  <p className="text-xs text-white/50 mb-6">
                    High physical office overhead, account manager layers, and frequent junior subcontracting.
                  </p>
                </div>
                <ul className="space-y-3 text-xs text-white/60 pt-4 border-t border-line">
                  <li className="flex items-center gap-2">
                    <Icon name="x" className="w-4 h-4 text-red-400" />
                    <span>$120K+ minimum project commitments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="x" className="w-4 h-4 text-red-400" />
                    <span>Subcontracted offshore execution</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="x" className="w-4 h-4 text-red-400" />
                    <span>Slow 3-6 month delivery cycles</span>
                  </li>
                </ul>
              </div>

              {/* Konsilience Offshore Card (Highlighted) */}
              <div className="p-8 rounded-2xl border-2 border-primary bg-primary/10 relative flex flex-col justify-between shadow-2xl shadow-primary/20 scale-[1.02]">
                <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider shadow">
                  Save {data.rateComparison.savingsPct}
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-2">
                    Konsilience Offshore Model
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4">
                    Dedicated Senior Engineers
                  </h3>
                  <div className="text-3xl font-extrabold text-white mb-2">
                    {data.rateComparison.konsilienceRate}
                  </div>
                  <p className="text-xs text-white/70 mb-6">
                    Senior full-stack architects (8+ yrs exp) working on your timezone with zero middleman markup.
                  </p>
                </div>
                <ul className="space-y-3 text-xs text-white/80 pt-4 border-t border-primary/30">
                  <li className="flex items-center gap-2">
                    <Icon name="check" className="w-4 h-4 text-primary" />
                    <span>{data.rateComparison.turnaround}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="check" className="w-4 h-4 text-primary" />
                    <span>Direct Slack sync & daily standups</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="check" className="w-4 h-4 text-primary" />
                    <span>100% full IP & source code ownership</span>
                  </li>
                </ul>
              </div>

              {/* Timezone & Delivery Card */}
              <div className="p-8 rounded-2xl border border-line bg-surface/30 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2">
                    Timezone & Collaboration
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4">
                    Frictionless Sync
                  </h3>
                  <div className="text-3xl font-extrabold text-white/80 mb-2">
                    {countryHub?.timezoneNote.split("•")[0] || "Live Sync"}
                  </div>
                  <p className="text-xs text-white/50 mb-6">
                    {countryHub?.timezoneNote || "Guaranteed daily overlapping working hours with your core product team."}
                  </p>
                </div>
                <ul className="space-y-3 text-xs text-white/60 pt-4 border-t border-line">
                  <li className="flex items-center gap-2">
                    <Icon name="check" className="w-4 h-4 text-primary" />
                    <span>Daily video standups & sprint reviews</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="check" className="w-4 h-4 text-primary" />
                    <span>Direct Jira & GitHub pull requests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="check" className="w-4 h-4 text-primary" />
                    <span>English-fluent senior tech leads</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Why Choose Us */}
      <Section className="border-b border-line bg-surface/20">
        <Container>
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">
              Strategic Advantages
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
              {data.whyChooseUsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.whyChooseUsPoints.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 60}>
                <div className="p-8 rounded-2xl border border-line bg-surface/40 hover:border-primary/40 transition-colors h-full">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm mb-5">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Core Deliverables */}
      <Section className="border-b border-line bg-black">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">
              Scope of Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
              {data.deliverablesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.deliverables.map((d, idx) => (
              <Reveal key={d.title} delay={idx * 50}>
                <div className="p-8 rounded-2xl border border-line bg-surface/30 hover:border-white/20 transition-all group h-full">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-6">
                    <Icon name={d.icon || "code"} className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {d.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Local Integrations & Compliance */}
      <Section className="border-b border-line bg-surface/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Local Integrations */}
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">
                Regional Ecosystem
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-6">
                Native {data.cityName || data.countryName} Tech & Payment Integrations
              </h2>
              <div className="space-y-4">
                {data.localIntegrations.map((integ) => (
                  <div
                    key={integ.title}
                    className="p-5 rounded-xl border border-line bg-surface/40 flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <Icon name="check" className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">
                        {integ.title}
                      </h4>
                      <p className="text-xs text-white/60 leading-relaxed">
                        {integ.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance & Standards */}
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">
                Regulatory Rigor
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-6">
                Security & Data Privacy Standards
              </h2>
              <div className="space-y-4">
                {data.complianceList.map((comp) => (
                  <div
                    key={comp.title}
                    className="p-5 rounded-xl border border-line bg-surface/40 flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shrink-0 mt-0.5">
                      <Icon name="shield-check" className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">
                        {comp.title}
                      </h4>
                      <p className="text-xs text-white/60 leading-relaxed">
                        {comp.desc || comp.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="mt-8 pt-8 border-t border-line">
                <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3">
                  Core Technologies Deployed
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg border border-line bg-surface/50 text-white/70 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Case Studies / Track Record */}
      {data.caseStudies.length > 0 && (
        <Section className="border-b border-line bg-black">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">
                  Proven Execution
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
                  Featured Case Studies
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="mt-4 md:mt-0 text-sm text-primary hover:text-white transition-colors inline-flex items-center gap-1.5 font-medium"
              >
                <span>View Full Enterprise Portfolio</span>
                <Icon name="arrow-right" className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.caseStudies.map((cs) => (
                <div
                  key={cs.slug}
                  className="p-8 rounded-2xl border border-line bg-surface/30 hover:border-primary/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs text-primary font-mono uppercase tracking-wider mb-2">
                      {cs.client}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {cs.title}
                    </h3>
                    <p className="text-sm text-white/65 leading-relaxed mb-6">
                      {cs.outcome}
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {cs.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-line text-[11px] text-white/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/portfolio/${cs.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-white transition-colors"
                    >
                      <span>Read Case Study</span>
                      <Icon name="arrow-right" className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Other Services in This Country */}
      {otherServices.length > 0 && (
        <Section className="border-b border-line bg-surface/20">
          <Container>
            <div className="max-w-2xl mb-10">
              <span className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">
                More in {data.countryName}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                Explore Additional Digital Services for {data.countryName}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {otherServices.map((svc) => (
                <Link
                  key={svc.serviceSlug}
                  href={`/${svc.countryCode}/${svc.serviceSlug}`}
                  className="p-6 rounded-2xl border border-line bg-surface/40 hover:border-primary/50 hover:bg-surface/80 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-mono text-primary uppercase tracking-wider mb-2">
                      {svc.serviceType}
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors mb-2">
                      {svc.h1}
                    </h3>
                    <p className="text-xs text-white/50 line-clamp-3">
                      {svc.tagline}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-xs font-medium text-white/60 group-hover:text-white">
                    <span>Learn More</span>
                    <Icon name="arrow-right" className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Localized FAQ Section */}
      <Section className="border-b border-line bg-black">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
                Frequently Asked Questions ({data.cityName || data.countryName})
              </h2>
            </div>

            <FaqList items={data.faqs} />
          </div>
        </Container>
      </Section>

      {/* Bottom Conversion CTA */}
      <Section className="relative overflow-hidden bg-gradient-to-t from-primary/15 via-surface/40 to-black py-20 md:py-28 text-center">
        <Container className="relative">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-semibold tracking-wide mb-6">
              Ready to Accelerate Your Roadmap?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Let&apos;s Build Your Next Digital Platform for {data.cityName || data.countryName}
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
              Schedule a confidential technical discovery call with our senior engineering architects. Receive an accurate scope estimate within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-primary text-white font-semibold text-base shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all"
              >
                <span>Schedule Discovery Call</span>
                <Icon name="arrow-right" className="w-4 h-4" />
              </Link>
              <Link
                href={`/${data.countryCode}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/20 bg-white/5 text-white/80 font-medium text-base hover:bg-white/10 transition-all"
              >
                <span>Back to {data.countryName} Overview</span>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
