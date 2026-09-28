import type { Metadata } from "next";
import { CtaBand } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import Clients from "@/components/sections/Clients";
import Testimonials from "@/components/sections/Testimonials";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Client Testimonials",
  description: "What CTOs, founders and product leaders say about working with Konsilience.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Testimonials" }]}
        eyebrow="Client stories"
        title={["Words From Our", <span key="c" className="text-primary">C-Suite Partners</span>]}
        text="Don't take our word for it. Here's what the leaders we work with say."
        stats={[["4.9/5", "Average rating"], ["300+", "Verified reviews"], ["98%", "Client retention"], ["70%", "Repeat business"]]}
      />
      <Testimonials />
      <section className="sec bg-black">
        <div className="wrap columns-1 gap-4 md:columns-2 lg:columns-3">
          {[...testimonials, ...testimonials].map((t, i) => (
            <Reveal key={i} delay={(i % 3) * 90} className="mb-4 break-inside-avoid">
              <figure className={`rounded-3xl p-8 ${i % 4 === 1 ? "bg-white text-[#111]" : "border border-line bg-card"}`}>
                <div className="flex gap-1 text-[#ff4246]">
                  {[0, 1, 2, 3, 4].map((k) => (
                    <Icon key={k} name="star" className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="subtitle mt-5 !font-medium">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-full bg-primary text-sm font-bold text-white">
                    {t.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <span>
                    <span className="block font-bold">{t.name}</span>
                    <span className={`text-sm ${i % 4 === 1 ? "text-black/55" : "text-muted"}`}>{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
      <Clients />
      <CtaBand title="Become our next success story." />
    </>
  );
}
