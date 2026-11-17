// Lead-source capture. On the first page of a visit we note the UTM tags, the landing page and the
// referrer, so every form and booking made later in the same visit carries them.
// Stored in sessionStorage only (gone when the tab closes); nothing is shared with third parties
// except the UTM tags passed to Calendly with a booking the visitor makes.

const KEY = "kn_attribution";
export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type Attribution = Readonly<Partial<Record<(typeof UTM_KEYS)[number] | "gclid" | "landing_page" | "referrer", string>>>;

/** Record attribution for this visit. Only the first page of the visit is recorded. */
export function captureAttribution(): void {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const tags = [...UTM_KEYS, "gclid"].filter((k) => params.get(k)).map((k) => [k, params.get(k) ?? ""]);
    const external = document.referrer && new URL(document.referrer).host !== window.location.host;
    const record: Record<string, string> = {
      ...Object.fromEntries(tags),
      landing_page: window.location.pathname,
      ...(external ? { referrer: document.referrer } : {}),
    };
    sessionStorage.setItem(KEY, JSON.stringify(record));
  } catch {
    // Storage blocked: forms still work, just without attribution.
  }
}

/** Attribution recorded for this visit, or an empty object. */
export function getAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}
