"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { loadCalendly, withUtm } from "@/lib/calendly";
import { isSet } from "@/site.config";
import ConsentEmbed from "./consent/ConsentEmbed";

// Start loading Calendly a little before the calendar scrolls into view.
const PRELOAD_MARGIN = "300px";
const DEFAULT_HEIGHT_PX = 700;
// Calendly's inline widget needs at least this width to lay out.
const CALENDLY_MIN_WIDTH_PX = 320;

function InlineFrame({ url, height }: { readonly url: string; readonly height: number }): ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const mount = async (): Promise<void> => {
      try {
        await loadCalendly();
        if (cancelled || !window.Calendly || el.childElementCount > 0) return;
        window.Calendly.initInlineWidget({ url: withUtm(url), parentElement: el });
      } catch {
        if (!cancelled) setFailed(true);
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        void mount();
      },
      { rootMargin: PRELOAD_MARGIN },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [url]);

  if (failed) {
    return (
      <p className="rounded-3xl border border-line bg-card p-8 text-center text-sm text-white/75">
        The calendar could not load.{" "}
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4">Open it in a new tab</a>.
      </p>
    );
  }
  return <div ref={ref} className="overflow-hidden rounded-3xl bg-white" style={{ minWidth: CALENDLY_MIN_WIDTH_PX, height }} />;
}

/** Calendly calendar embedded in the page, loaded when scrolled near and when consent allows. */
export default function CalendlyInline({
  url,
  height = DEFAULT_HEIGHT_PX,
}: {
  readonly url: string;
  readonly height?: number;
}): ReactNode {
  // Bookings made here are tracked by the global Calendly listener in ConversionWidgets.
  if (!isSet(url)) return null;
  return (
    <ConsentEmbed
      label="booking calendar"
      provider="Calendly"
      className="min-h-[320px]"
      fallback={{ href: url, label: "Open in a new tab" }}
    >
      <InlineFrame url={url} height={height} />
    </ConsentEmbed>
  );
}
