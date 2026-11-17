"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { closeCookieSettings, effectiveConsent, isBannerVisible, saveConsent, type ConsentChoice } from "@/lib/consent";
import { useConsent } from "@/lib/useConsent";

type Category = { key: keyof ConsentChoice; title: string; text: string };

const CATEGORIES: readonly Category[] = [
  {
    key: "analytics",
    title: "Analytics",
    text: "Google Analytics 4: pages visited, device type and approximate location, so we can see which pages help visitors.",
  },
  {
    key: "functional",
    title: "Chat, maps and calendars",
    text: "tawk.to live chat, Google Maps and Calendly calendars load automatically. When off, each loads only if you click it.",
  },
];

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }): ReactNode {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors ${checked ? "border-primary bg-primary" : "border-line bg-white/10"}`}
    >
      <span className={`inline-block size-5 rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

const btn = "flex-1 rounded-full px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

// Cookie banner and settings. Shown on first visit (after the region is known) and whenever the
// visitor opens "Cookie settings" in the footer. "Accept" and "Reject" carry equal weight.
export default function CookieBanner(): ReactNode {
  const s = useConsent();
  const visible = isBannerVisible(s);
  const [detail, setDetail] = useState(false);
  const [draft, setDraft] = useState<ConsentChoice | null>(null);

  if (!visible) return null;
  const showSettings = detail || s.settingsOpen;
  const current = draft ?? effectiveConsent(s);

  const finish = (choice: ConsentChoice): void => {
    saveConsent(choice);
    setDetail(false);
    setDraft(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      className="cookie-banner anim-fade-up fixed inset-x-0 bottom-0 z-[60] rounded-t-3xl border border-line bg-card p-5 shadow-[0_-10px_40px_rgba(0,0,0,.5)] sm:p-6 lg:bottom-6 lg:left-1/2 lg:w-[min(640px,calc(100vw-3rem))] lg:-translate-x-1/2 lg:rounded-3xl print:hidden"
    >
      <div className="flex items-start justify-between gap-4">
        <p id="cookie-banner-title" className="text-base font-semibold text-white">
          {showSettings ? "Cookie settings" : "Cookies on this site"}
        </p>
        {s.settingsOpen && s.stored && (
          <button type="button" onClick={closeCookieSettings} className="text-sm text-white/70 hover:text-white" aria-label="Close cookie settings">
            Close
          </button>
        )}
      </div>

      {showSettings ? (
        <ul className="mt-4 flex flex-col gap-4">
          <li className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">Essential</p>
              <p className="mt-1 text-xs leading-relaxed text-white/70">Remembers this choice and keeps forms safe from spam (Cloudflare Turnstile). Always on.</p>
            </div>
            <span className="shrink-0 text-xs font-semibold text-white/60">Always on</span>
          </li>
          {CATEGORIES.map((c) => (
            <li key={c.key} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">{c.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/70">{c.text}</p>
              </div>
              <Switch label={c.title} checked={current[c.key]} onChange={(v) => setDraft({ ...current, [c.key]: v })} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm leading-relaxed text-white/75">
          We use essential storage to run this site. With your OK we also use analytics, and load chat, maps and calendars
          from other providers. You can change this any time under &ldquo;Cookie settings&rdquo; in the footer.{" "}
          <Link href="/cookie-policy" className="text-white underline underline-offset-4">Cookie policy</Link>
        </p>
      )}

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        {showSettings ? (
          <>
            <button type="button" className={`${btn} bg-white/10 text-white hover:bg-white/20`} onClick={() => finish(current)}>
              Save choices
            </button>
            <button type="button" className={`${btn} bg-primary text-white hover:bg-primary-hover`} onClick={() => finish({ analytics: true, functional: true })}>
              Accept all
            </button>
          </>
        ) : (
          <>
            <button type="button" className={`${btn} bg-white/10 text-white hover:bg-white/20`} onClick={() => finish({ analytics: false, functional: false })}>
              Reject non-essential
            </button>
            <button type="button" className={`${btn} bg-primary text-white hover:bg-primary-hover`} onClick={() => finish({ analytics: true, functional: true })}>
              Accept all
            </button>
            <button type="button" className={`${btn} sm:flex-none text-white/80 underline underline-offset-4 hover:text-white`} onClick={() => setDetail(true)}>
              Choose
            </button>
          </>
        )}
      </div>
    </div>
  );
}
