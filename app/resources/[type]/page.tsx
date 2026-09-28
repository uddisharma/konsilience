import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/page/Blocks";
import Newsletter from "@/components/page/Newsletter";
import PageHero from "@/components/page/PageHero";
import { SceneArt } from "@/components/ui/Artwork";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { resourceTypes } from "@/lib/catalog";

const find = (slug: string) => resourceTypes.find((r) => r.slug === slug);

export function generateStaticParams() {
  return resourceTypes.map((r) => ({ type: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[type]">): Promise<Metadata> {
  const r = find((await params).type);
  return r ? { title: r.name, description: r.intro } : {};
}

export default async function ResourcePage({ params }: PageProps<"/resources/[type]">) {
  const r = find((await params).type);
  if (!r) notFound();

  return (
    <>
      <PageHero
        crumbs={[{ label: "Resources", href: "/blog" }, { label: r.name }]}
        eyebrow="Resources"
        title={[r.name]}
        text={r.intro}
      />

      <section className="bg-black">
        <div className="wrap flex gap-3 overflow-x-auto border-b border-line pb-6 no-scrollbar">
          {resourceTypes.map((t) => (
            <Link
              key={t.slug}
              href={`/resources/${t.slug}`}
              className={`shrink-0 px-5 py-3 text-sm font-semibold transition-colors ${t.slug === r.slug ? "bg-white text-black" : "bg-card hover:bg-[#262625]"}`}
            >
              {t.name}
            </Link>
          ))}
          <Link href="/blog" className="shrink-0 bg-card px-5 py-3 text-sm font-semibold hover:bg-[#262625]">Blog</Link>
        </div>
      </section>

      <section className="sec bg-black">
        <div className="wrap grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {r.items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 90}>
              <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card transition-colors hover:border-primary">
                <div className="overflow-hidden">
                  <SceneArt hue={200 + i * 25} icon={r.icon} className="aspect-[16/10] transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-7">
                  <span className="text-xs font-semibold tracking-wider text-muted uppercase">{it.meta}</span>
                  <h2 className="subtitle">{it.title}</h2>
                  <p className="fs-para font-medium text-muted">{it.text}</p>
                  <div className="mt-auto pt-4">
                    <Button variant="ghost" className="!px-5 !py-3">{r.cta}</Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Newsletter />
      <CtaBand title="Need expert guidance?" text="Talk to the people who wrote these resources." />
    </>
  );
}
