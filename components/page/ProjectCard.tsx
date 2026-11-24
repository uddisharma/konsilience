import Link from "next/link";
import type { Project } from "@/lib/catalog";
import { PhoneArt } from "../ui/Artwork";
import Icon from "../ui/Icon";

// Brand-coloured case-study card (grid version of the home portfolio slider card).
export default function ProjectCard({ p }: { p: Project }) {
  const muted = p.dark ? "text-white/75" : "text-black/60";
  return (
    <Link
      href={`/portfolio/${p.slug}`}
      className={`group relative flex h-[540px] flex-col justify-between overflow-hidden rounded-3xl p-7 ${p.dark ? "text-white" : "text-[#111]"}`}
      style={{ backgroundColor: p.bg }}
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <span className="grid size-12 place-items-center rounded-full text-lg font-extrabold text-white" style={{ backgroundColor: p.accent }}>
            {p.client[0]}
          </span>
          <div>
            <p className="subtitle leading-tight">{p.client}</p>
            <p className={`text-xs font-semibold ${muted}`}>{p.live ? "Our product" : `${p.style}-style`} · {p.industry}</p>
          </div>
        </div>
        <p className={`fs-para font-medium ${muted}`}>{p.text}</p>
        <div className="grid grid-cols-2 gap-6">
          {p.metrics.map(([v, l]) => (
            <div key={l} className="flex flex-col gap-1">
              <span className="text-2xl font-bold">{v}</span>
              <span className={`text-sm font-medium ${muted}`}>{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative -mx-7 -mb-7 flex h-[42%] items-start justify-center overflow-hidden pt-5">
        <div className="absolute inset-x-6 bottom-0 h-3/4 rounded-t-[2rem]" style={{ background: p.dark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)" }} />
        <PhoneArt slug={p.slug} accent={p.accent} dark={p.dark} className="relative w-[74%]" />
      </div>
      <span className={`absolute top-7 right-7 grid size-10 place-items-center rounded-full transition-all duration-500 group-hover:rotate-45 ${p.dark ? "bg-white text-black" : "bg-black text-white"}`}>
        <Icon name="upRight" className="size-4" strokeWidth={2} />
      </span>
    </Link>
  );
}
