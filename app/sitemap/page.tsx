import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page/PageHero";
import Reveal from "@/components/ui/Reveal";
import { routeGroups } from "@/lib/routes";

export const metadata: Metadata = { title: "Sitemap" };

export default function SitemapPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Sitemap" }]} title={["Sitemap"]} text="Every page on our site, in one place." />
      <section className="sec bg-black pt-0">
        <div className="wrap columns-1 gap-10 sm:columns-2 lg:columns-4">
          {routeGroups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 4) * 80} className="mb-12 break-inside-avoid">
              <p className="mb-5 border-b border-line pb-3 text-xs font-semibold tracking-[.2em] text-muted uppercase">{g.title}</p>
              <ul className="space-y-3">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="u-link fs-para font-medium text-white/85 hover:text-white">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
