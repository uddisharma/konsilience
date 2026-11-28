import type { Project } from "@/lib/catalog";

// Mark for a case study: /public/images/logos/<slug>.png, rendered by scripts/render-logos.mjs
// (app/render-kit/logos.tsx) as one ink on a pale tile, at 480×480 so it stays sharp up to 240px.

export default function ProjectLogo({ p, className = "" }: { p: Project; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- pre-sized static PNG, served as-is
    <img src={`/images/logos/${p.slug}.png`} alt={`${p.client} logo`} width={200} height={200} loading="lazy" className={`rounded-xl object-cover ${className}`} />
  );
}
