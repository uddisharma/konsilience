import { faqs } from "@/lib/content";
import ContactForm from "../ContactForm";
import FaqList from "../FaqList";
import Reveal, { LineReveal } from "../ui/Reveal";

export default function Faq({ items = faqs, title = "Frequently Asked Questions" }: { items?: { q: string; a: string }[]; title?: string }) {
  return (
    <section id="contact" className="sec bg-black">
      <LineReveal className="h2 wrap-sm text-center !font-extrabold" lines={[title]} />
      <div className="wrap mt-14 flex flex-col justify-between gap-12 lg:flex-row">
        <FaqList items={items} className="lg:w-[52%]" />
        <Reveal variant="right" className="lg:w-[42%]">
          <ContactForm className="lg:sticky lg:top-28" />
        </Reveal>
      </div>
    </section>
  );
}
