import { slugify } from "@/lib/catalog";
import { brand } from "@/lib/content";
import Icon from "../ui/Icon";
import PageHero from "./PageHero";

// Long-form legal layout with sticky table of contents.
// PLACEHOLDER TEXT: have your legal counsel supply the final wording.
export default function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { h: string; p: string[] }[] }) {
  return (
    <>
      <PageHero crumbs={[{ label: title }]} title={[title]} text={`Last updated: ${updated}`} />
      <section className="sec bg-black pt-0">
        <div className="wrap grid gap-14 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <ul className="sticky top-32 flex flex-col gap-3 border-l border-line">
              {sections.map((s) => (
                <li key={s.h}>
                  <a href={`#${slugify(s.h)}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-white/70 hover:border-primary hover:text-white">
                    {s.h}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
          <article className="flex max-w-3xl flex-col gap-12">
            <p className="flex items-start gap-3 rounded-2xl border border-line bg-card p-5 text-sm text-white/80">
              <Icon name="doc" className="mt-0.5 size-5 shrink-0 text-primary" />
              This page is a template. Replace it with text reviewed by {brand.name}&apos;s legal counsel before publishing.
            </p>
            {sections.map((s, i) => (
              <section key={s.h} id={slugify(s.h)} className="scroll-mt-32">
                <h2 className="h3 font-semibold">
                  <span className="mr-3 text-muted">{i + 1}.</span>
                  {s.h}
                </h2>
                {s.p.map((t) => (
                  <p key={t} className="fs-base mt-4 leading-relaxed font-medium text-white/75">{t}</p>
                ))}
              </section>
            ))}
            <p className="fs-base font-medium text-white/75">
              Questions? Contact us at <a href={`mailto:${brand.email}`} className="text-primary underline underline-offset-4">{brand.email}</a>.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
