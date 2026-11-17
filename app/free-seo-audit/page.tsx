import type { Metadata } from "next";
import AuditForm from "@/components/AuditForm";
import { ProcessSteps, SectionHead } from "@/components/page/Blocks";
import PageHero from "@/components/page/PageHero";
import Icon from "@/components/ui/Icon";
import { siteUrl } from "@/lib/routes";

// NEEDS_CONFIRMATION (docs/OPEN_QUESTIONS.md): what the audit covers. Kept out of search results
// (noindex, not in the sitemap) until the founders confirm this copy.
export const metadata: Metadata = {
  title: "Free B2B SEO Audit",
  description: "Send us your website and your main goal. We review it and take you through what we find, and what to fix first, on a short call.",
  alternates: { canonical: `${siteUrl}/free-seo-audit` },
  robots: { index: false, follow: true },
};

const CHECKS = [
  { icon: "search", title: "Can Google find your pages?", text: "Whether your key pages are crawled and indexed, plus speed and mobile issues that hold them back." },
  { icon: "doc", title: "Do your pages say the right things?", text: "Titles, descriptions, headings and internal links on the pages that matter for your goal." },
  { icon: "target", title: "Where do you show up today?", text: "The searches you already appear for, and the gaps between them and the buyers you want." },
] as const;

export default function FreeSeoAuditPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Digital Marketing", href: "/digital-marketing" }, { label: "Free SEO audit" }]}
        eyebrow="Free SEO audit"
        title={["Find out what is", "holding your site", <span key="b" className="text-primary">back in Google</span>]}
        text="Send us your website and your main goal. We review the site and take you through what we found, and what we would fix first, on a 15-minute call. No cost and no obligation."
        aside={<AuditForm />}
      />

      <section className="sec bg-black">
        <div className="wrap">
          <SectionHead title={["What we look at"]} />
          <ul className="mt-12 grid gap-3 md:grid-cols-3">
            {CHECKS.map((c) => (
              <li key={c.title} className="rounded-3xl border border-line bg-card p-8">
                <Icon name={c.icon} className="size-7 text-primary" />
                <h2 className="subtitle mt-6">{c.title}</h2>
                <p className="fs-para mt-3 font-medium text-white/75">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec bg-black pt-0">
        <div className="wrap">
          <SectionHead title={["How it works"]} />
          <div className="mt-12">
            <ProcessSteps
              steps={[
                { title: "Send the form", text: "Your name, work email, website and main goal." },
                { title: "Pick a time", text: "Book your review call on the next page." },
                { title: "Review call", text: "We take you through the findings and answer your questions." },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
