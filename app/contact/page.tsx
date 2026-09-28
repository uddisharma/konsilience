import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import FaqList from "@/components/FaqList";
import { Office } from "@/components/Footer";
import { CardGrid, ProcessSteps, SectionHead } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import Clients from "@/components/sections/Clients";
import { SceneArt } from "@/components/ui/Artwork";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { brand, faqs, footer } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Talk to ${brand.name}. Share your idea and a solution architect will respond within one business day.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        eyebrow="Let's talk"
        title={["Let's Build", "Something", <span key="r" className="text-primary">Remarkable</span>]}
        text="Tell us about your product, platform or AI idea. We'll set up a free consultation with a senior solution architect, under NDA if you need it."
        actions={
          <div className="flex flex-col gap-4">
            {[
              ["mail", brand.email, `mailto:${brand.email}`],
              ["phone", brand.phone, `tel:${brand.phone}`],
            ].map(([icon, label, href]) => (
              <a key={label} href={href} className="group flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full border border-line transition-colors group-hover:border-primary group-hover:bg-primary">
                  <Icon name={icon} className="size-5" />
                </span>
                <span className="u-link subtitle">{label}</span>
              </a>
            ))}
          </div>
        }
        aside={<ContactForm title="Tell Us About Your Project" text="Fill in the form and we'll get back to you within 24 hours." />}
      />

      <section className="sec bg-black">
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
              { icon: "briefcase", title: "Sales & Projects", text: `sales@${brand.email.split("@")[1]}` },
              { icon: "users", title: "Careers", text: `careers@${brand.email.split("@")[1]}`, href: "/careers" },
              { icon: "globe", title: "Partnerships", text: `partners@${brand.email.split("@")[1]}` },
              { icon: "shield", title: "Support", text: `support@${brand.email.split("@")[1]}` },
            ]}
          />
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["Our Global Offices"]} text="Delivery centers and client offices across five countries." />
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {footer.offices.map((o, i) => (
              <Reveal key={o.country} delay={i * 80}>
                <Office o={o} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-3">
            <SceneArt hue={215} icon="globe" label="Map placeholder: embed Google Maps here" className="aspect-[21/9] rounded-3xl" />
          </Reveal>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap-sm">
          <SectionHead center title={["Common Questions"]} />
          <FaqList items={faqs.slice(0, 6)} className="mt-12" />
        </div>
      </section>

      <Clients />
    </>
  );
}
