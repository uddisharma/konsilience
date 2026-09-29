import Link from "next/link";
import { brand, facts, footer } from "@/lib/content";
import { Logo } from "./Header";
import { OfficeDetails, OfficeMap } from "./Office";
import Icon from "./ui/Icon";

const socials = [
  { label: "LinkedIn", short: "in" },
  { label: "X", short: "X" },
  { label: "Facebook", short: "f" },
  { label: "Instagram", short: "ig" },
  { label: "YouTube", short: "▶" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-black">
      <div className="wrap pt-20 pb-10">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-start">
          <div className="flex max-w-md flex-col gap-6">
            <Logo />
            <p className="fs-base font-medium text-white">{brand.tagline}</p>
            <div className="flex flex-wrap gap-3">
              {["AI-First Studio", "Startup Friendly", "NDA on Request"].map((b) => (
                <span key={b} className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs font-semibold">
                  <Icon name="spark" className="size-4 text-primary" /> {b}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="text-center">
              <p className="font-condensed text-4xl font-semibold">{facts.platforms}</p>
              <p className="mt-1 text-xs text-muted">Platforms built</p>
            </div>
            <span className="h-14 w-px bg-line" />
            <div className="text-center">
              <p className="font-condensed text-4xl font-semibold">{brand.teamSize}</p>
              <p className="mt-1 text-xs text-muted">Core team</p>
            </div>
            <span className="h-14 w-px bg-line" />
            <div className="text-center">
              <p className="font-condensed text-4xl font-semibold">24h</p>
              <p className="mt-1 text-xs text-muted">Response time</p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-3 lg:grid-cols-[1fr_2fr]">
          <OfficeDetails compact />
          <OfficeMap className="min-h-[260px]" />
        </div>

        <div className="mt-16 grid gap-10 border-t border-line pt-14 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_1.3fr]">
          {footer.columns.map((c) => (
            <div key={c.title}>
              <p className="mb-5 text-xs font-semibold tracking-[.2em] text-muted uppercase">{c.title}</p>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="u-link fs-para font-medium text-white/85 hover:text-white">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="mb-5 text-xs font-semibold tracking-[.2em] text-muted uppercase">Get in touch</p>
            <a href={`mailto:${brand.email}`} className="u-link block text-lg font-semibold">{brand.email}</a>
            <a href={`tel:${brand.phoneHref}`} className="u-link mt-2 block text-white/80">{brand.phone}</a>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="grid size-10 place-items-center rounded-full border border-line text-sm font-bold transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary">
                  {s.short}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-muted md:flex-row">
          <p>© {brand.founded}–{new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            {[["Privacy Policy", "/privacy-policy"], ["Terms & Conditions", "/terms"], ["Cookie Policy", "/cookie-policy"], ["Sitemap", "/sitemap"]].map(([l, h]) => (
              <Link key={h} href={h} className="hover:text-white">{l}</Link>
            ))}
          </div>
        </div>

        {/* Oversized faded wordmark */}
        <p aria-hidden className="mt-12 bg-gradient-to-b from-white/15 to-transparent bg-clip-text text-center text-[13.5vw] leading-[.85] font-extrabold tracking-tighter text-transparent select-none">
          {brand.name.toLowerCase()}
        </p>
      </div>
    </footer>
  );
}
