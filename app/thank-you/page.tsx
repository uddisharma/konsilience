import type { Metadata } from "next";
import BlogCard from "@/components/page/BlogCard";
import { ProcessSteps } from "@/components/page/Blocks";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { posts } from "@/lib/catalog";

export const metadata: Metadata = { title: "Thank You", robots: { index: false } };

export default function ThankYouPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-black pt-44 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_20%,rgba(26,105,253,.35),transparent_65%)]" />
        <div className="wrap-sm relative text-center">
          <span className="anim-hero mx-auto grid size-24 place-items-center rounded-full bg-primary shadow-[0_0_80px_10px_rgba(26,105,253,.5)]">
            <Icon name="check" className="size-12 text-white" strokeWidth={2.5} />
          </span>
          <h1 className="anim-hero h1 mt-10" style={{ animationDelay: "120ms" }}>Thank You!</h1>
          <p className="anim-hero fs-base mx-auto mt-5 max-w-xl font-medium text-white/80" style={{ animationDelay: "240ms" }}>
            Your message is with our team. A solution architect will reach out within one business day.
          </p>
          <div className="anim-hero mt-10 flex flex-wrap justify-center gap-4" style={{ animationDelay: "360ms" }}>
            <Button href="/">Back to Home</Button>
            <Button variant="outline" href="/portfolio">Explore Our Work</Button>
          </div>
        </div>
      </section>
      <section className="sec bg-black">
        <div className="wrap">
          <ProcessSteps
            steps={[
              { title: "Review", text: "We review your requirements within hours." },
              { title: "Call", text: "A 30-minute discovery call with an architect." },
              { title: "Proposal", text: "Scope, timeline and estimate within 48 hours." },
            ]}
          />
        </div>
      </section>
      <section className="sec bg-black pt-0">
        <div className="wrap">
          <p className="subtitle mb-8">While you wait, some reading:</p>
          <div className="grid gap-4 md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <BlogCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
