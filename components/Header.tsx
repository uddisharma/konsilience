"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { projects } from "@/lib/catalog";
import { brand, nav, navDivisions, navProduct, type NavItem } from "@/lib/content";
import BookCallButton, { BOOK_CALL_LABEL } from "./BookCallButton";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import ProjectLogo from "./ui/ProjectLogo";

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

// Header becomes solid after this much scroll, and hides on scroll-down past HIDE_AFTER_PX.
const SOLID_AFTER_PX = 30;
const HIDE_AFTER_PX = 400;
// Mega menus with more groups than this switch from 3 to 4 columns.
const MAX_THREE_COLUMN_GROUPS = 3;
// Delay between mega-menu columns as they fade in.
const MENU_STAGGER_MS = 60;
// One gap for every item in the header's right-hand group (links, buttons, menu toggle).
const NAV_GAP = "gap-4 lg:gap-7";
// Links flagged wideOnly appear only past 14-inch laptop widths (those top out near 1536px).
const WIDE_ONLY = "hidden min-[1600px]:flex";

/** Right-hand card in a mega menu: the item's featured link, or a "view all" for Portfolio. */
function FeaturedCard({ item, cta = "Learn More", children }: { item: NavItem; cta?: string; children?: ReactNode }) {
  return (
    <div className="relative flex w-80 shrink-0 flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-[rgb(var(--brand-deep-rgb))] to-primary-2 p-8 text-white">
      <p className="text-xs font-semibold tracking-[.2em] text-white/70 uppercase">Featured</p>
      <p className="mt-4 text-2xl font-semibold">{item.featured?.title ?? `Explore ${item.label}`}</p>
      <p className="mt-3 text-sm leading-relaxed text-white/75">{item.featured?.text ?? "Talk to our experts and find the right path for your business."}</p>
      {children}
      <Button variant="white" href={item.featured?.href ?? item.href} className="mt-8 w-fit !px-6 !py-3">{cta}</Button>
    </div>
  );
}

/** Portfolio: six case studies with their logo tiles, then a "view all" card. */
function PortfolioMenu({ item }: { item: NavItem }) {
  const cases = item.cases ?? [];
  const more = projects.filter((p) => !cases.includes(p)).slice(0, 5);
  return (
    <>
      <div className="grid flex-1 grid-cols-2 content-start gap-x-8 gap-y-4">
        {cases.map((p, i) => (
          <Link
            key={p.slug}
            href={`/portfolio/${p.slug}`}
            className="anim-fade-up group flex items-center gap-5 rounded-2xl p-3 transition-colors hover:bg-black/[.04]"
            style={{ animationDelay: `${(i % 2) * MENU_STAGGER_MS + Math.floor(i / 2) * MENU_STAGGER_MS}ms` }}
          >
            <ProjectLogo p={p} className="size-20 shrink-0 transition-transform duration-300 group-hover:scale-105" />
            <span className="min-w-0">
              <span className="block text-[17px] font-semibold text-[#111] transition-colors group-hover:text-primary">{p.client}</span>
              <span className="mt-1.5 line-clamp-2 block text-sm leading-relaxed text-black/60">{p.text}</span>
            </span>
          </Link>
        ))}
      </div>
      <FeaturedCard item={item} cta="View All Case Studies">
        <div className="mt-6 flex -space-x-3">
          {more.map((p) => (
            <ProjectLogo key={p.slug} p={p} className="size-12 ring-2 ring-[rgb(var(--brand-deep-rgb))]" />
          ))}
          <span className="grid size-12 place-items-center rounded-xl bg-white text-xs font-bold text-black ring-2 ring-[rgb(var(--brand-deep-rgb))]">+{projects.length - cases.length - more.length}</span>
        </div>
      </FeaturedCard>
    </>
  );
}

/** Services: the five main services on the left; clicking one shows its services on the right. */
function ServicesMenu({ item }: { item: NavItem }) {
  const [tab, setTab] = useState(item.groups[0].title);
  const group = item.groups.find((g) => g.title === tab) ?? item.groups[0];
  return (
    <>
      <div role="tablist" aria-orientation="vertical" className="flex w-80 shrink-0 flex-col gap-1.5">
        {item.groups.map((g) => {
          const on = g.title === group.title;
          return (
            <button
              key={g.title}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setTab(g.title)}
              className={`flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-left transition-colors ${on ? "bg-primary/[.08] text-primary" : "text-[#111] hover:bg-black/[.04]"}`}
            >
              {g.icon && (
                <span className={`grid size-10 shrink-0 place-items-center rounded-xl transition-colors ${on ? "bg-primary text-white" : "bg-black/[.05] text-black/60"}`}>
                  <Icon name={g.icon} className="size-5" />
                </span>
              )}
              <span className="flex-1 text-base font-semibold">{g.title}</span>
              <Icon name="arrow" className={`size-4 transition-all duration-300 ${on ? "opacity-100" : "-translate-x-1 opacity-0"}`} />
            </button>
          );
        })}
      </div>

      <div key={group.title} role="tabpanel" className="anim-fade-up flex-1 border-l border-black/10 pl-12">
        <div className="flex items-start justify-between gap-8">
          <div>
            <p className="text-xl font-semibold">{group.title}</p>
            {group.text && <p className="mt-1.5 text-sm text-black/60">{group.text}</p>}
          </div>
          <Link href={group.href ?? item.href} className="shrink-0 text-sm font-semibold whitespace-nowrap text-primary underline-offset-4 hover:underline">
            View all →
          </Link>
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-1">
          {group.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="group block rounded-xl px-4 py-3 transition-colors hover:bg-black/[.04]">
                <span className="flex items-center gap-2 text-[15px] font-semibold text-[#111] transition-colors group-hover:text-primary">
                  {l.label}
                  <Icon name="upRight" className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
                {l.note && <span className="mt-0.5 block text-xs font-medium text-black/45">{l.note}</span>}
                {l.text && <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-black/60">{l.text}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
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
      setScrolled(y > SOLID_AFTER_PX);
      setHidden(y > HIDE_AFTER_PX && y > last);
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

          {/* Everything but the logo sits on the right, evenly spaced. */}
          <div className={`flex h-full items-center ${NAV_GAP}`}>
            <nav className={`hidden h-full items-center lg:flex ${NAV_GAP}`}>
              {nav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setOpen(item.label)}
                  onFocus={() => setOpen(item.label)}
                  className={`relative h-full items-center gap-1.5 text-[15px] font-medium transition-colors ${item.wideOnly ? WIDE_ONLY : "flex"} ${open === item.label ? "text-white" : "text-white/80 hover:text-white"}`}
                >
                  {item.label}
                  <Icon name="chevron" className={`size-3.5 transition-transform duration-300 ${open === item.label ? "rotate-180" : ""}`} />
                  <span className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary transition-transform duration-300 ${open === item.label ? "scale-x-100" : "scale-x-0"}`} />
                </Link>
              ))}
            </nav>
            <Link
              href={navProduct.href}
              onMouseEnter={() => setOpen(null)}
              className={`group relative hidden h-full items-center text-[15px] font-medium whitespace-nowrap transition-colors lg:flex ${pathname.startsWith(navProduct.href) ? "text-white" : "text-white/80 hover:text-white"}`}
            >
              {navProduct.label}
              <span className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary transition-transform duration-300 group-hover:scale-x-100 ${pathname.startsWith(navProduct.href) ? "scale-x-100" : "scale-x-0"}`} />
            </Link>
            {navDivisions.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                aria-label={`${brand.name} ${d.name}`}
                className="group relative hidden py-2 text-[15px] font-semibold whitespace-nowrap transition-transform duration-300 hover:-translate-y-0.5 lg:inline-flex"
              >
                <span className={d.shine ? `shine-text ${pathname.startsWith(d.href) ? "on" : ""}` : pathname.startsWith(d.href) ? "text-primary" : "text-white"}>
                  {/* Brand prefix only where the desktop nav has room (xl and up). */}
                  <span className="hidden xl:inline">{brand.name}&nbsp;</span>
                  {d.name}
                </span>
                <span className={`absolute inset-x-0 bottom-0 h-0.5 origin-left rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100 ${pathname.startsWith(d.href) ? "scale-x-100" : "scale-x-0"}`} />
              </Link>
            ))}
            <BookCallButton placement="header" className="!hidden !px-6 !py-3 sm:!inline-flex">
              {/* Short label where the desktop nav leaves little room (lg to xl). */}
              <span className="hidden lg:inline xl:hidden">Book a call</span>
              <span className="lg:hidden xl:inline">{BOOK_CALL_LABEL}</span>
            </BookCallButton>
            <button onClick={() => setMobile(true)} aria-label="Open menu" className="text-white lg:hidden">
              <Icon name="menu" className="size-7" />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        {active && (
          // Floating card: pt-3 (not margin) keeps the pointer inside the header while it crosses the gap.
          <div key={active.label} className="absolute inset-x-0 top-full hidden pt-3 lg:block">
           <div className="wrap anim-fade-up rounded-3xl bg-white text-[#111] shadow-[0_30px_70px_-20px_rgba(0,0,0,.55)]">
            <div className="relative z-10 flex gap-12 p-10">
              {active.cases ? (
                <PortfolioMenu item={active} />
              ) : active.tabs ? (
                <ServicesMenu item={active} />
              ) : (
                <>
                  <div className={`grid flex-1 gap-10 ${active.groups.length > MAX_THREE_COLUMN_GROUPS ? "grid-cols-4" : "grid-cols-3"}`}>
                    {active.groups.map((g, gi) => (
                      <div key={g.title} className="anim-fade-up" style={{ animationDelay: `${gi * MENU_STAGGER_MS}ms` }}>
                        <p className="mb-5 border-b border-black/10 pb-3 text-xs font-semibold tracking-[.2em] text-black/50 uppercase">{g.title}</p>
                        <ul className="space-y-3.5">
                          {g.links.map((l) => (
                            <li key={l.href}>
                              <Link href={l.href} className="group flex items-center justify-between text-[15px] text-black/80 transition-colors hover:text-primary">
                                <span className="u-link">{l.label}</span>
                                <Icon name="upRight" className="size-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <FeaturedCard item={active} />
                </>
              )}
            </div>
            <div className="rounded-b-3xl border-t border-black/10 bg-[rgb(var(--brand-rgb)/.06)]">
              <div className="flex items-center justify-between gap-6 px-10 py-5">
                <span className="text-sm text-black/65">Didn&apos;t find what you&apos;re looking for? Tell us your needs and we&apos;ll tailor a solution for you.</span>
                <Link href="/contact" className="shrink-0 text-sm font-semibold text-primary underline-offset-4 hover:underline">Schedule Free Consultation →</Link>
              </div>
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
            {nav.filter((item) => !item.wideOnly).map((item) => (
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
            <Link href={navProduct.href} className="flex items-center justify-between border-b border-line py-5 text-lg font-semibold">
              {navProduct.label}
              <Icon name="upRight" className="size-5" />
            </Link>
          </div>
          <div className="wrap flex flex-col items-center gap-3 py-5">
            <div className="grid w-full grid-cols-2 gap-3">
              {navDivisions.map((d) => (
                <Link key={d.href} href={d.href} className="flex h-12 items-center justify-center rounded-full border border-line text-sm font-semibold text-white transition-colors hover:border-primary hover:text-primary">
                  {brand.name} {d.name}
                </Link>
              ))}
            </div>
            <BookCallButton placement="mobile_menu" className="w-full justify-center" onOpen={() => setMobile(false)} />
            <Link href="/contact" className="text-sm font-medium text-white/75 underline-offset-4 hover:text-white hover:underline">
              Or send us a message
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
