import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import FaqList from "@/components/FaqList";
import PageHero from "@/components/page/PageHero";
import Reveal, { LineReveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about working with Konsilience.",
};

const groups = [
  { title: "General", items: faqs.slice(0, 4) },
  { title: "Process & Pricing", items: faqs.slice(4) },
  {
    title: "Contracts & IP",
    items: [
      { q: "Do you sign NDAs?", a: "Yes, before any detailed discussion. We can use your template or ours." },
      { q: "Who owns the code?", a: "You do. All IP, source code and designs are assigned to you on payment." },
      { q: "What payment terms do you offer?", a: "Milestone-based for fixed-scope projects, monthly for dedicated teams and T&M." },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "FAQ" }]}
        eyebrow="Help center"
        title={["Frequently Asked", <span key="q" className="text-primary">Questions</span>]}
        text="Everything you need to know about working with us. Can't find an answer? Ask us directly."
      />
      <section className="sec bg-black pt-0">
        <div className="wrap flex flex-col justify-between gap-12 lg:flex-row">
          <div className="flex flex-col gap-16 lg:w-[55%]">
            {groups.map((g) => (
              <div key={g.title}>
                <LineReveal as="h2" className="h3 font-semibold" lines={[g.title]} />
                <FaqList items={g.items} className="mt-4" />
              </div>
            ))}
          </div>
          <Reveal variant="right" className="lg:w-[40%]">
            <ContactForm className="lg:sticky lg:top-28" title="Still have questions?" text="Send us a message and we'll reply within 24 hours." />
          </Reveal>
        </div>
      </section>
    </>
  );
}
