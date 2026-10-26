import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteUrl } from "@/lib/routes";
import { brand } from "@/lib/content";
import {
  getCountryHub,
  getAllCountryCodes,
  getServicesForCountry,
} from "@/lib/regionalServiceData";
import { buildCountryHubSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";

type PageProps = {
  params: Promise<{ country: string }>;
};

export async function generateStaticParams() {
  return getAllCountryCodes().map((code) => ({ country: code }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  const hub = getCountryHub(country);
  if (!hub) return {};

  const url = `${siteUrl}/${hub.code}`;

  return {
    title: hub.metaTitle,
    description: hub.metaDescription,
    keywords: [
      `Software development company ${hub.name}`,
      `Mobile app development ${hub.primaryCity}`,
      `Outsource software development to India from ${hub.name}`,
      `Hire software developers ${hub.name}`,
      "Konsilience",
    ],
    alternates: { canonical: url },
    openGraph: {
      title: hub.metaTitle,
      description: hub.metaDescription,
      url,
      type: "website",
      siteName: brand.name,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: hub.metaTitle,
      description: hub.metaDescription,
    },
  };
}

export default async function CountryHubPage({ params }: PageProps) {
  const { country } = await params;
  const hub = getCountryHub(country);
  if (!hub) notFound();

  const services = getServicesForCountry(hub.code);
  const schemas = buildCountryHubSchema(hub);

  return (
    <>
      <JsonLd data={schemas} />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28 border-b border-line bg-gradient-to-b from-primary/5 via-black to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(17,99,251,0.15),rgba(255,255,255,0))]" />

        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Country Flag & Eyebrow */}
            <Reveal variant="fade">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs md:text-sm font-medium tracking-wide mb-8">
                <span className="text-xl">{hub.flag}</span>
                <span>{hub.name} Regional Technology Hub</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-white/60 font-mono">{hub.primaryCity}</span>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal delay={60}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
                {hub.heroHeadline}
              </h1>
            </Reveal>

            {/* Subhead */}
            <Reveal delay={120}>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                {hub.heroSubheadline}
              </p>
            </Reveal>

            {/* CTA */}
            <Reveal delay={180}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-primary text-white font-semibold text-base shadow-lg shadow-primary/25 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Book a Consultation for {hub.name}</span>
                  <Icon name="arrow-right" className="w-4 h-4" />
                </Link>
                <Link
                  href="/locations"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/15 bg-white/5 text-white/80 font-medium text-base hover:bg-white/10 hover:text-white transition-all"
                >
                  <span>View All Global Locations</span>
                </Link>
              </div>
            </Reveal>

            {/* Hub Highlights Bar */}
            <Reveal delay={240}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-2xl border border-line bg-surface/50 backdrop-blur-md text-left">
                <div className="p-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-primary mb-1">
                    Timezone Alignment
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {hub.timezoneNote}
                  </div>
                </div>
                <div className="p-3 border-t md:border-t-0 md:border-l border-line">
                  <div className="text-xs font-mono uppercase tracking-wider text-primary mb-1">
                    Offshore Economics
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {hub.costAdvantage}
                  </div>
                </div>
                <div className="p-3 border-t md:border-t-0 md:border-l border-line">
                  <div className="text-xs font-mono uppercase tracking-wider text-primary mb-1">
                    Regulatory Rigor
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {hub.complianceNote}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Available Services in this Country */}
      <Section className="border-b border-line bg-black">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">
              Tailored Regional Offerings
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
              Engineering Services Available in {hub.name}
            </h2>
            <p className="text-sm md:text-base text-white/60 mt-3">
              Select a specialized engineering capability to view dedicated rates, local compliance standards, and deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => (
              <Reveal key={svc.serviceSlug} delay={idx * 60}>
                <Link
                  href={`/${svc.countryCode}/${svc.serviceSlug}`}
                  className="p-8 rounded-2xl border border-line bg-surface/30 hover:border-primary/50 hover:bg-surface/70 transition-all group flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-line text-xs font-mono text-primary mb-5">
                      <span>{svc.serviceType.toUpperCase()}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-3">
                      {svc.h1}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed mb-6">
                      {svc.tagline}
                    </p>
                  </div>

                  <div>
                    <div className="p-4 rounded-xl bg-black/40 border border-line mb-6 flex items-center justify-between text-xs">
                      <span className="text-white/50">Offshore Rate:</span>
                      <span className="text-white font-bold font-mono">
                        {svc.rateComparison.konsilienceRate}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-line text-sm font-semibold text-primary group-hover:text-white transition-colors">
                      <span>View Full Service Details</span>
                      <Icon name="arrow-right" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Regional Ecosystem & Integration Highlights */}
      <Section className="border-b border-line bg-surface/10">
        <Container>
          <div className="max-w-3xl mx-auto mb-14 text-center">
            <span className="text-xs uppercase tracking-widest text-primary font-mono font-semibold">
              Deep Regional Fluency
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
              Why Global Enterprises Choose Konsilience for {hub.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {hub.regionalHighlights.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 60}>
                <div className="p-8 rounded-2xl border border-line bg-surface/40 hover:border-primary/40 transition-colors h-full">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm mb-5">
                    <Icon name="check" className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Bottom Conversion CTA */}
      <Section className="relative overflow-hidden bg-gradient-to-t from-primary/15 via-surface/40 to-black py-20 md:py-28 text-center">
        <Container className="relative">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-semibold tracking-wide mb-6">
              Accelerate Delivery
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Ready to Build for {hub.name}?
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
              Schedule a confidential discovery session with our senior solutions team. Get a detailed architectural roadmap within 48 hours.
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
                href="/locations"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/20 bg-white/5 text-white/80 font-medium text-base hover:bg-white/10 transition-all"
              >
                <span>Browse All Locations</span>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
