// Cookie consent: one small store shared by the banner, analytics, chat, embeds and the map.
//
// Policy (see docs/CHANGELOG.md and /cookie-policy):
// • EU/EEA, UK and Switzerland ("strict" regions): opt-in. Nothing non-essential loads until the
//   visitor accepts that category.
// • Everywhere else ("standard"): analytics and functional widgets run unless the visitor rejects them.
// • Things a visitor explicitly asks for (clicking "Chat", "Book a call", "Show map") load anyway:
//   that is the visitor requesting the service, which needs no separate consent.
//
// Region comes from Vercel's x-vercel-ip-country header via /api/geo, with a time-zone fallback
// (local dev, or if the request fails). Until it is known we behave as "strict".

export type ConsentChoice = { readonly analytics: boolean; readonly functional: boolean };
export type Region = "strict" | "standard" | "unknown";
type StoredConsent = ConsentChoice & { readonly version: number; readonly decidedAt: string };

export type ConsentState = {
  readonly hydrated: boolean;
  readonly region: Region;
  readonly stored: StoredConsent | null;
  readonly settingsOpen: boolean;
};

const STORAGE_KEY = "kn_consent";
const REGION_KEY = "kn_region";
// Bump to ask everyone again (e.g. after adding a new kind of cookie).
const CONSENT_VERSION = 1;

// EU 27 + EEA (IS, LI, NO) + UK and Crown dependencies (GB, GG, JE, IM) + Switzerland.
const STRICT_COUNTRIES: ReadonlySet<string> = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT",
  "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO", "GB", "GG", "JE", "IM", "CH",
]);
// Time zones treated as strict when the country is unknown. Over-inclusive on purpose (e.g. Europe/Istanbul).
const STRICT_TIME_ZONE_PREFIXES = ["Europe/", "Atlantic/Reykjavik", "Atlantic/Canary", "Atlantic/Madeira", "Atlantic/Azores", "Atlantic/Faroe"];

const INITIAL: ConsentState = { hydrated: false, region: "unknown", stored: null, settingsOpen: false };
let state: ConsentState = INITIAL;
const listeners = new Set<() => void>();

function update(patch: Partial<ConsentState>): void {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
export const getConsentState = (): ConsentState => state;
export const getServerConsentState = (): ConsentState => INITIAL;

function readStored(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as StoredConsent) : null;
    return parsed?.version === CONSENT_VERSION ? parsed : null;
  } catch {
    return null;
  }
}

function regionFromTimeZone(): Region {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  return STRICT_TIME_ZONE_PREFIXES.some((p) => tz.startsWith(p)) ? "strict" : "standard";
}

const regionFromCountry = (country: string): Region =>
  STRICT_COUNTRIES.has(country.toUpperCase()) ? "strict" : "standard";

async function detectRegion(): Promise<Region> {
  try {
    const cached = sessionStorage.getItem(REGION_KEY);
    if (cached === "strict" || cached === "standard") return cached;
  } catch {
    // ignore
  }
  let region: Region;
  try {
    const res = await fetch("/api/geo", { cache: "no-store" });
    const { country } = (await res.json()) as { country?: string };
    region = country ? regionFromCountry(country) : regionFromTimeZone();
  } catch {
    region = regionFromTimeZone();
  }
  try {
    sessionStorage.setItem(REGION_KEY, region);
  } catch {
    // ignore
  }
  return region;
}

let initStarted = false;
/** Load the saved choice and detect the region. Safe to call more than once. */
export async function initConsent(): Promise<void> {
  if (initStarted) return;
  initStarted = true;
  update({ hydrated: true, stored: readStored() });
  update({ region: await detectRegion() });
}

/** What may load right now, given the saved choice (if any) and the region. */
export function effectiveConsent(s: ConsentState): ConsentChoice {
  if (s.stored) return { analytics: s.stored.analytics, functional: s.stored.functional };
  const allowByDefault = s.region === "standard";
  return { analytics: allowByDefault, functional: allowByDefault };
}

/** True when the banner should be on screen. */
export const isBannerVisible = (s: ConsentState): boolean =>
  s.settingsOpen || (s.hydrated && s.region !== "unknown" && s.stored === null);

export function saveConsent(choice: ConsentChoice): void {
  const stored: StoredConsent = { ...choice, version: CONSENT_VERSION, decidedAt: new Date().toISOString() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Storage blocked: the choice holds for this page view only.
  }
  update({ stored, settingsOpen: false });
}

export const openCookieSettings = (): void => update({ settingsOpen: true });
export const closeCookieSettings = (): void => update({ settingsOpen: false });
