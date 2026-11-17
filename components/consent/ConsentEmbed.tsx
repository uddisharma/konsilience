"use client";

import { useState, type ReactNode } from "react";
import { effectiveConsent } from "@/lib/consent";
import { useConsent } from "@/lib/useConsent";

type Props = {
  /** What the embed is, e.g. "booking calendar" or "map". */
  readonly label: string;
  /** Who provides it, e.g. "Calendly" or "Google Maps". */
  readonly provider: string;
  readonly children: ReactNode;
  readonly className?: string;
  /** Link that works without loading the embed (e.g. open the calendar in a new tab). */
  readonly fallback?: { readonly href: string; readonly label: string };
};

// Renders a third-party embed only when "Chat, maps and calendars" consent applies, or when the
// visitor clicks "Show …" (asking for it themselves). Otherwise a placeholder of the same size.
export default function ConsentEmbed({ label, provider, children, className = "", fallback }: Props): ReactNode {
  const s = useConsent();
  const [requested, setRequested] = useState(false);
  if (requested || effectiveConsent(s).functional) return children;

  return (
    <div className={`flex flex-col items-center justify-center gap-4 rounded-3xl border border-line bg-card p-8 text-center ${className}`}>
      <p className="max-w-sm text-sm leading-relaxed text-white/75">
        The {label} is provided by {provider}, which may set its own cookies.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => setRequested(true)}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          Show the {label}
        </button>
        {fallback && (
          <a href={fallback.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-white/85 transition-colors hover:border-white hover:text-white">
            {fallback.label}
          </a>
        )}
      </div>
    </div>
  );
}
