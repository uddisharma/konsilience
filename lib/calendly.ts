// Calendly popup, loaded on demand. Nothing is downloaded until a visitor hovers or clicks a
// booking button, so Calendly costs nothing on page load. If the widget fails to load, the
// booking page opens in a new tab instead.

import { getAttribution, UTM_KEYS } from "./utm";

const CALENDLY_JS = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_CSS = "https://assets.calendly.com/assets/external/widget.css";
const CALENDLY_ORIGIN = "https://calendly.com";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { readonly url: string }) => void;
      initInlineWidget: (options: { readonly url: string; readonly parentElement: HTMLElement }) => void;
    };
  }
}

let loading: Promise<void> | null = null;

/** Inject Calendly's script and stylesheet once. Repeated calls share one promise. */
export function loadCalendly(): Promise<void> {
  if (loading) return loading;
  loading = new Promise<void>((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = CALENDLY_CSS;
    document.head.appendChild(css);

    const js = document.createElement("script");
    js.src = CALENDLY_JS;
    js.async = true;
    js.onload = () => resolve();
    js.onerror = () => {
      loading = null; // allow a retry on the next click
      reject(new Error("Calendly widget failed to load"));
    };
    document.head.appendChild(js);
  });
  return loading;
}

/** Carry the visit's UTM tags (from its first page) into the booking so Calendly records the lead source. */
export function withUtm(url: string): string {
  const visit = getAttribution();
  const target = new URL(url);
  UTM_KEYS.filter((k) => visit[k]).forEach((k) => target.searchParams.set(k, visit[k] ?? ""));
  return target.toString();
}

/** Open the Calendly popup for an event URL; fall back to a new tab if the widget cannot load. */
export async function openCalendly(url: string): Promise<void> {
  const bookingUrl = withUtm(url);
  try {
    await loadCalendly();
    if (!window.Calendly) throw new Error("Calendly global missing");
    window.Calendly.initPopupWidget({ url: bookingUrl });
  } catch {
    window.open(bookingUrl, "_blank", "noopener,noreferrer");
  }
}

/** True for the postMessage Calendly sends when a meeting is booked. */
export function isCalendlyBooking(e: MessageEvent): boolean {
  const data = e.data as { event?: unknown } | null;
  return e.origin === CALENDLY_ORIGIN && data?.event === "calendly.event_scheduled";
}
