"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { honeypotProps } from "@/lib/submitForm";
import { renderTurnstile } from "@/lib/turnstile";

// Start the spam check a little before the form scrolls into view, so the token is ready on submit.
const PRELOAD_MARGIN = "300px";

/**
 * Spam protection for a form: a hidden honeypot field plus a Cloudflare Turnstile widget.
 * Place it inside the <form>. Turnstile is invisible unless Cloudflare asks for a click.
 */
export default function FormGuard({ action, className = "" }: { readonly action: string; readonly className?: string }): ReactNode {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let widgetId: string | null = null;
    const start = async (): Promise<void> => {
      try {
        widgetId = await renderTurnstile(el, action);
        if (cancelled && widgetId) window.turnstile?.remove(widgetId);
        else if (widgetId) el.dataset.widgetId = widgetId;
      } catch {
        // Turnstile blocked or offline: the server decides (honeypot and rate limit still apply).
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        void start();
      },
      { rootMargin: PRELOAD_MARGIN },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      if (widgetId) window.turnstile?.remove(widgetId);
    };
  }, [action]);

  return (
    <>
      <input {...honeypotProps} />
      {/* Not display:none, or the IntersectionObserver would never fire. Empty, it takes no space. */}
      <div ref={ref} className={`cf-turnstile-holder ${className}`} />
    </>
  );
}
