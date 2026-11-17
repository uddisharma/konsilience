import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import FaqList from "@/components/FaqList";
import { OfficeDetails, OfficeMap } from "@/components/Office";
import { CardGrid, ProcessSteps, SectionHead } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import Clients from "@/components/sections/Clients";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/JsonLd";
import { brand, faqs, office } from "@/lib/content";
import CalendlyInline from "@/components/CalendlyInline";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { siteConfig, whatsappUrl } from "@/site.config";
import { siteUrl } from "@/lib/routes";
import { buildContactPageSchema } from "@/lib/schema";
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "@/lib/og";

// How many of the shared FAQs the contact page shows.
const CONTACT_FAQ_COUNT = 6;

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Project Estimate & Consultation",
  description: `Contact ${brand.name} to discuss your SaaS, mobile app, or AI project. Speak directly with senior architects and get a detailed response within 24 hours.`,
  keywords: ["Contact Konsilience", "Software Consultation", "AI Project Estimate", "CTO Advisory", "Mohali Tech Studio"],
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: "Contact Konsilience | Digital Engineering & AI Studio",
    description: "Get a free 24-hour consultation and estimate for your software engineering or custom AI project.",
    url: `${siteUrl}/contact`,
    images: [{ url: `${siteUrl}/og-image.png`, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, alt: "Contact Konsilience | Digital Engineering & AI Studio" }],
  },
};

export default function ContactPage() {
  const schema = buildContactPageSchema();

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        crumbs={[{ label: "Contact" }]}
        eyebrow="Let's talk"
        title={["Let's Build", "Something", <span key="r" className="text-primary">Remarkable</span>]}
        text="Tell us about your product, platform or AI idea. We'll set up a free consultation with a senior solution architect, under NDA if you need it."
        actions={
          <div data-placement="contact_hero" className="flex flex-col gap-4">
            {[
              ["mail", brand.email, `mailto:${brand.email}`],
              ["phone", brand.phone, `tel:${brand.phoneHref}`],
            ].map(([icon, label, href]) => (
              <a key={label} href={href} className="group flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full border border-line transition-colors group-hover:border-primary group-hover:bg-primary">
                  <Icon name={icon} className="size-5" />
                </span>
                <span className="u-link subtitle">{label}</span>
              </a>
            ))}
            {whatsappUrl && (
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full border border-line transition-colors group-hover:border-[#25D366] group-hover:bg-[#25D366]">
                  <WhatsAppIcon className="size-5" />
                </span>
                <span className="u-link subtitle">WhatsApp us</span>
              </a>
            )}
          </div>
        }
        aside={<ContactForm title="Tell Us About Your Project" text="Fill in the form and we'll get back to you within 24 hours." />}
      />

      <section id="book" className="sec scroll-mt-24 bg-black">
        <div className="wrap">
          <SectionHead title={["Prefer to Talk? Pick a Time"]} text={`Book a ${siteConfig.booking.introCallMinutes}-minute intro call straight into our calendar.`} />
          <div className="mt-12">
            <CalendlyInline url={siteConfig.booking.calendlyIntroUrl} />
          </div>
        </div>
      </section>

      <section className="sec bg-black pt-0">
        <div className="wrap">
          <SectionHead title={["What Happens Next?"]} text="A simple, transparent path from first message to kickoff." />
          <div className="mt-14">
            <ProcessSteps
              steps={[
                { title: "We reply within 24h", text: "A solution architect reviews your message and schedules a call." },
                { title: "Discovery call", text: "We dig into goals, users, constraints and success metrics." },
                { title: "Proposal & estimate", text: "You get scope, timeline, team and a transparent cost breakdown." },
                { title: "Kickoff", text: "Your dedicated team starts, with weekly demos from week one." },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="sec bg-black pt-0">
        <div className="wrap">
          <CardGrid
            cols={4}
            items={[
              { icon: "mail", title: "Email Us", text: brand.email, href: `mailto:${brand.email}` },
              { icon: "phone", title: "Call Us", text: brand.phone, href: `tel:${brand.phoneHref}` },
              ...(whatsappUrl ? [{ icon: "chat", title: "WhatsApp", text: "Message us on WhatsApp", href: whatsappUrl }] : []),
              { icon: "pin", title: "Visit Us", text: "Sector 75, Mohali, Punjab", href: "#office" },
            ]}
          />
        </div>
      </section>

      <section id="office" className="sec scroll-mt-24 bg-black">
        <div className="wrap">
          <SectionHead title={["Visit Our Office"]} text={`Our team works out of our ${office.city} headquarters.`} />
          <div className="mt-14 grid gap-3 lg:grid-cols-[1fr_1.6fr]">
            <Reveal variant="left">
              <OfficeDetails />
            </Reveal>
            <Reveal variant="right">
              <OfficeMap className="h-full min-h-[380px]" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap-sm">
          <SectionHead center title={["Common Questions"]} />
          <FaqList items={faqs.slice(0, CONTACT_FAQ_COUNT)} className="mt-12" />
        </div>
      </section>

      <Clients />
    </>
  );
}
