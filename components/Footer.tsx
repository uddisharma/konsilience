"use client";

import { useState } from "react";
import { brand, footer } from "@/lib/content";
import { Logo } from "./Header";
import Icon from "./ui/Icon";

const socials = [
  { label: "LinkedIn", short: "in" },
  { label: "X", short: "X" },
  { label: "Facebook", short: "f" },
  { label: "Instagram", short: "ig" },
  { label: "YouTube", short: "▶" },
];

function Office({ o }: { o: (typeof footer.offices)[number] }) {
  const [i, setI] = useState(0);
  const n = o.addresses.length;
  return (
    <div className="flex min-h-[220px] flex-col justify-between gap-6 rounded-3xl border border-line bg-card p-6 transition-colors hover:border-[#5e5e5c]">
      <div className="flex flex-col gap-5">
        <span className="flex w-fit items-center gap-2 rounded-full border border-line bg-black px-3 py-1.5 text-xs font-bold tracking-widest"><Icon name="pin" className="size-3.5 text-primary" strokeWidth={2} />{o.flag}</span>
        <h3 className="fs-base font-semibold">{o.country}</h3>
        <p key={i} className="fs-para anim-fade-up font-medium whitespace-pre-line text-white/75">{o.addresses[i]}</p>
      </div>
      {n > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button onClick={() => setI((i - 1 + n) % n)} aria-label="Previous address" className="grid size-8 place-items-center rounded-full border border-line hover:border-white">
              <Icon name="arrowLeft" className="size-3.5" />
            </button>
            <button onClick={() => setI((i + 1) % n)} aria-label="Next address" className="grid size-8 place-items-center rounded-full border border-line hover:border-white">
              <Icon name="arrow" className="size-3.5" />
            </button>
          </div>
          <span className="fs-para font-medium text-muted">{i + 1}/{n}</span>
        </div>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-line bg-black">
      <div className="wrap pt-20 pb-10">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-start">
          <div className="flex max-w-md flex-col gap-6">
            <Logo />
            <p className="fs-base font-medium text-white">{brand.tagline}</p>
            <div className="flex flex-wrap gap-3">
              {["AI Platform Partner", "Cloud Partner"].map((b) => (
                <span key={b} className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs font-semibold">
                  <Icon name="spark" className="size-4 text-primary" /> {b}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="text-center">
              <p className="font-condensed text-4xl font-semibold">4.9</p>
              <div className="flex gap-0.5 text-[#ff4246]">
                {[0, 1, 2, 3, 4].map((k) => (
                  <Icon key={k} name="star" className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-1 text-xs text-muted">300+ verified reviews</p>
            </div>
            <span className="h-14 w-px bg-line" />
            <div className="flex items-center gap-3">
              <Icon name="trophy" className="size-9 text-white/80" strokeWidth={1.3} />
              <p className="text-sm leading-tight font-semibold">
                Tech Fast 50
                <br />
                <span className="text-muted">Winner 2024</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {footer.offices.map((o) => (
            <Office key={o.country} o={o} />
          ))}
        </div>

        <div className="mt-16 grid gap-10 border-t border-line pt-14 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_1.3fr]">
          {footer.columns.map((c) => (
            <div key={c.title}>
              <p className="mb-5 text-xs font-semibold tracking-[.2em] text-muted uppercase">{c.title}</p>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="u-link fs-para font-medium text-white/85 hover:text-white">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="mb-5 text-xs font-semibold tracking-[.2em] text-muted uppercase">Get in touch</p>
            <a href={`mailto:${brand.email}`} className="u-link block text-lg font-semibold">{brand.email}</a>
            <a href={`tel:${brand.phone}`} className="u-link mt-2 block text-white/80">{brand.phone}</a>
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
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            {["Privacy Policy", "Terms & Conditions", "Cookie Policy", "Sitemap"].map((l) => (
              <a key={l} href="#" className="hover:text-white">{l}</a>
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
