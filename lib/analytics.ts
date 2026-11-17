// Thin wrapper around GA4's gtag(). Safe to call before GA4 is installed (Phase 9):
// events are simply dropped until window.gtag exists.

export type TrackParams = Readonly<Record<string, string | number | boolean>>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: TrackParams) => void;
  }
}

/** Send a GA4 event, for example track("generate_lead", { method: "calendly" }). */
export function track(eventName: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", eventName, params);
}
