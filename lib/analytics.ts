// GA4 with Google Consent Mode v2 (basic mode: gtag.js is only loaded once analytics is allowed,
// see lib/consent.ts). track() is safe to call at any time: events are dropped while GA4 is off.

import { loadScript } from "./idle";

export type TrackParams = Readonly<Record<string, string | number | boolean>>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Send a GA4 event, for example track("generate_lead", { method: "calendly" }). */
export function track(eventName: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", eventName, params);
}

let gaStarted = false;

/** Load GA4. Call only when analytics consent is effective. */
export async function startGa4(measurementId: string): Promise<void> {
  if (gaStarted) {
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    return;
  }
  gaStarted = true;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(): void {
    // gtag.js requires the original `arguments` object, not an array copy.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  // No ads on this site: advertising signals stay denied for everyone.
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
  try {
    await loadScript("ga4", `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`);
  } catch {
    // Blocked by an ad blocker or offline: events stay queued in dataLayer and are discarded.
  }
}

/** Visitor withdrew analytics consent: stop measurement and remove GA cookies. */
export function stopGa4(): void {
  if (!gaStarted) return;
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  const host = window.location.hostname;
  // GA sets cookies on the registrable domain (".konsilience.tech"): drop a leading "www."
  // from "www.konsilience.tech"; "konsilience.tech" and "localhost" are left unchanged.
  const apex = host.startsWith("www.") ? host.slice("www.".length) : host;
  const domains = ["", host, `.${apex}`];
  document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_"))
    .forEach((name) =>
      domains.forEach((d) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ""}`;
      }),
    );
}
