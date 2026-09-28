import type { Metadata } from "next";
import { CtaBand } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import PortfolioGrid from "@/components/page/PortfolioGrid";
import Clients from "@/components/sections/Clients";
import Testimonials from "@/components/sections/Testimonials";
import Button from "@/components/ui/Button";
import { projects } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Case studies of digital products, platforms and AI systems built by Konsilience.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Portfolio" }]}
        eyebrow="Our work"
        title={["Innovation,", <span key="e" className="text-primary">Engineered</span>]}
        text="Products, platforms and AI systems we've shipped for ambitious brands, and the numbers that followed."
        actions={<Button>Start Your Project</Button>}
        stats={[["3,000+", "Products shipped"], ["500M+", "End users reached"], ["35+", "Industries"], ["4.9/5", "Average client rating"]]}
      />
      <section className="sec bg-black">
        <div className="wrap">
          <PortfolioGrid items={projects} />
        </div>
      </section>
      <Clients />
      <Testimonials />
      <CtaBand title="Your success story could be next." text="Let's talk about what you want to build." />
    </>
  );
}
