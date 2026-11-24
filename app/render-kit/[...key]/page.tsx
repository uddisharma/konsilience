import { notFound } from "next/navigation";
import { registry } from "@/lib/image-registry";
import { sectionCompositions } from "../compositions-a";
import { otherCompositions } from "../compositions-b";

// DEV-ONLY canvas for the static images in /public/images (see scripts/render-images.mjs).
// /render-kit/<id> renders one registry entry full-viewport; ?og=1 renders its 1200×630 share version.

export const metadata = { robots: { index: false, follow: false } };

const CSS = `
  html, body { background: transparent !important; margin: 0; overflow: hidden; }
  nextjs-portal, [data-nextjs-toast] { display: none !important; }
  * { animation: none !important; transition: none !important; }
`;

const compositions = { ...sectionCompositions, ...otherCompositions };

export default async function RenderKit({ params, searchParams }: { params: Promise<{ key: string[] }>; searchParams: Promise<{ og?: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const id = (await params).key.join("/");
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
