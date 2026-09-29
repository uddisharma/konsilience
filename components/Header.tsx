"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand, nav } from "@/lib/content";
import Button from "./ui/Button";
import Icon from "./ui/Icon";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center ${className}`} aria-label={brand.name}>
      <Image
        src="/logo-white.png"
        alt={brand.name}
        width={40}
        height={40}
        className="h-10 w-auto object-contain"
        priority
      />
      <span className="text-[1.35rem] font-bold tracking-tight text-white">{brand.name.toLowerCase()}</span>
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [strip, setStrip] = useState(true);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const pathname = usePathname();

  // Close menus whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  // Solid after the first scroll; slides away on scroll down, returns on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > 400 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const active = nav.find((n) => n.label === open);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${hidden && !open ? "-translate-y-full" : ""}`}
      onMouseLeave={() => setOpen(null)}
    >
      {strip && (
        <div className="relative flex h-10 items-center justify-center gap-3 bg-primary px-10 text-center text-xs font-medium text-white sm:text-sm">
          <span className="hidden rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase sm:inline">New</span>
          <Link href="/blog/agentic-ai-enterprise-playbook" className="truncate hover:underline">The Enterprise AI Playbook 2026 is live. Get your free copy</Link>
          <Icon name="arrow" className="hidden size-4 sm:block" />
          <button onClick={() => setStrip(false)} aria-label="Dismiss" className="absolute right-3 opacity-80 hover:opacity-100">
            <Icon name="close" className="size-4" />
          </button>
        </div>
      )}

      <div className={`border-b transition-colors duration-300 ${scrolled || open ? "border-line bg-black/85 backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
        <div className="wrap flex h-[72px] items-center justify-between">
          <Logo />

          <nav className="hidden h-full items-center lg:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={() => setOpen(item.label)}
                onFocus={() => setOpen(item.label)}
                className={`relative flex h-full items-center gap-1.5 px-4 text-[15px] font-medium transition-colors ${open === item.label ? "text-white" : "text-white/80 hover:text-white"}`}
              >
                {item.label}
                <Icon name="chevron" className={`size-3.5 transition-transform duration-300 ${open === item.label ? "rotate-180" : ""}`} />
                <span className={`absolute inset-x-4 bottom-0 h-0.5 origin-left bg-primary transition-transform duration-300 ${open === item.label ? "scale-x-100" : "scale-x-0"}`} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={`tel:${brand.phoneHref}`} aria-label="Call us" className="hidden size-11 place-items-center rounded-full border border-line text-white transition-colors hover:border-white sm:grid">
              <Icon name="phone" className="size-4" />
            </a>
            <Button className="!hidden !px-6 !py-3 sm:!inline-flex">Contact Us</Button>
            <button onClick={() => setMobile(true)} aria-label="Open menu" className="text-white lg:hidden">
              <Icon name="menu" className="size-7" />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        {active && (
          <div key={active.label} className="anim-fade-up absolute inset-x-0 top-full hidden border-t border-line bg-black lg:block">
            <div className="wrap flex gap-12 py-12">
              <div className={`grid flex-1 gap-10 ${active.groups.length > 3 ? "grid-cols-4" : "grid-cols-3"}`}>
                {active.groups.map((g, gi) => (
                  <div key={g.title} className="anim-fade-up" style={{ animationDelay: `${gi * 60}ms` }}>
                    <p className="mb-5 border-b border-line pb-3 text-xs font-semibold tracking-[.2em] text-muted uppercase">{g.title}</p>
                    <ul className="space-y-3.5">
                      {g.links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="group flex items-center justify-between text-[15px] text-white/85 transition-colors hover:text-white">
                            <span className="u-link">{l.label}</span>
                            <Icon name="upRight" className="size-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="relative w-80 shrink-0 overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-[rgb(var(--brand-deep-rgb))] to-primary-2 p-8">
                <p className="text-xs font-semibold tracking-[.2em] text-white/70 uppercase">Featured</p>
                <p className="mt-4 text-2xl font-semibold">{active.featured?.title ?? `Explore ${active.label}`}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  {active.featured?.text ?? "Talk to our experts and find the right path for your business."}
                </p>
                <Button variant="white" href={active.featured?.href ?? active.href} className="mt-8 !px-6 !py-3">Learn More</Button>
              </div>
            </div>
            <div className="border-t border-line bg-card">
              <div className="wrap flex items-center justify-between gap-6 py-5">
                <span className="text-sm text-white/75">Didn&apos;t find what you&apos;re looking for? Tell us your needs and we&apos;ll tailor a solution for you.</span>
                <Link href="/contact" className="shrink-0 text-sm font-semibold text-white underline-offset-4 hover:underline">Schedule Free Consultation →</Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden ${mobile ? "" : "pointer-events-none"}`}>
        <div className={`absolute inset-0 flex flex-col bg-black transition-all duration-500 ${mobile ? "opacity-100" : "translate-y-4 opacity-0"}`}>
          <div className="wrap flex h-[72px] shrink-0 items-center justify-between border-b border-line">
            <Logo />
            <button onClick={() => setMobile(false)} aria-label="Close menu" className="text-white">
              <Icon name="close" className="size-7" />
            </button>
          </div>
          <div className="wrap flex-1 overflow-y-auto py-4" data-lenis-prevent>
            {nav.map((item) => (
              <div key={item.label} className="border-b border-line">
                <button onClick={() => setMobileGroup(mobileGroup === item.label ? null : item.label)} className="flex w-full items-center justify-between py-5 text-left text-lg font-semibold">
                  {item.label}
                  <Icon name={mobileGroup === item.label ? "minus" : "plus"} className="size-5" />
                </button>
                <div className={`grid transition-all duration-500 ${mobileGroup === item.label ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    {item.groups.map((g) => (
                      <div key={g.title} className="mb-4">
                        <p className="mb-2 text-xs font-semibold tracking-[.2em] text-muted uppercase">{g.title}</p>
                        {g.links.map((l) => (
                          <Link key={l.href} href={l.href} className="block py-1.5 text-white/80">
                            {l.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="wrap py-5">
            <Button className="w-full justify-center" href="/contact">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
