import { notFound } from "next/navigation";
import { registry } from "@/lib/image-registry";
import { sectionCompositions } from "../compositions-a";
import { otherCompositions } from "../compositions-b";
import { industryCompositions } from "../compositions-c";
import { blogCompositions } from "../compositions-d";
import { LOGOS, LogoArt } from "../logos";
import { projects } from "@/lib/catalog";

// DEV-ONLY canvas for the static images in /public/images (see scripts/render-images.mjs).
// /render-kit/<id> renders one registry entry full-viewport; ?og=1 renders its 1200×630 share version.
// /render-kit/logos/<project slug> renders a case-study logo (see scripts/render-logos.mjs).

export const metadata = { robots: { index: false, follow: false } };

const CSS = `
  html, body { background: transparent !important; margin: 0; overflow: hidden; }
  nextjs-portal, [data-nextjs-toast] { display: none !important; }
  * { animation: none !important; transition: none !important; }
`;

const compositions = { ...sectionCompositions, ...otherCompositions, ...industryCompositions, ...blogCompositions };

export default async function RenderKit({ params, searchParams }: { params: Promise<{ key: string[] }>; searchParams: Promise<{ og?: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const key = (await params).key;
  if (key[0] === "logos") {
    const p = projects.find((x) => x.slug === key[1]);
    if (!p || !LOGOS[p.slug]) notFound();
    return (
      <div className="fixed inset-0 z-[9999]">
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <LogoArt p={p} />
      </div>
    );
  }
  const id = key.join("/");
  const og = (await searchParams).og === "1";
  const e = registry.find((x) => x.id === id);
  const C = compositions[id];
  if (!e || !C) notFound();
  return (
    <div className="fixed inset-0 z-[9999]">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <C e={e} og={og} />
    </div>
  );
}
