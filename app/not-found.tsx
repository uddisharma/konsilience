import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-black pt-32 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,rgba(26,105,253,.35),transparent_65%)]" />
      <div className="wrap relative text-center">
        <p className="anim-hero font-condensed text-[34vw] leading-[.8] font-semibold text-white/10 sm:text-[22vw]">404</p>
        <h1 className="anim-hero h2 -mt-[8vw]" style={{ animationDelay: "120ms" }}>This page drifted off course.</h1>
        <p className="anim-hero fs-base mx-auto mt-5 max-w-lg font-medium text-muted" style={{ animationDelay: "240ms" }}>
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="anim-hero mt-10 flex flex-wrap justify-center gap-4" style={{ animationDelay: "360ms" }}>
          <Button href="/">Back to Home</Button>
          <Button variant="outline" href="/contact">Contact Us</Button>
        </div>
        <div className="anim-hero mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted" style={{ animationDelay: "480ms" }}>
          {[["Services", "/services"], ["Portfolio", "/portfolio"], ["Blog", "/blog"], ["Careers", "/careers"]].map(([l, h]) => (
            <Link key={h} href={h} className="u-link hover:text-white">{l}</Link>
          ))}
        </div>
      </div>
    </section>
  );
}
