// Cloudflare Turnstile (spam check on forms). The widget is "interaction-only": invisible unless
// Cloudflare needs the visitor to tick a box. It adds a hidden "cf-turnstile-response" field to the
// form, which /api/contact verifies with TURNSTILE_SECRET_KEY.

import { loadScript } from "./idle";
import { isSet, siteConfig } from "@/site.config";

const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
export const TURNSTILE_FIELD = "cf-turnstile-response";

// Cloudflare's documented test site key ("always passes", invisible). The real key only works on
// konsilience.tech, so local builds use this; pair it with the test secret
// 1x0000000000000000000000000000000AA in .env.local.
const LOCAL_TEST_SITE_KEY = "1x00000000000000000000BB";
const LOCAL_HOSTS: ReadonlySet<string> = new Set(["localhost", "127.0.0.1", "[::1]"]);

type TurnstileOptions = {
  sitekey: string;
  appearance: "always" | "execute" | "interaction-only";
  theme: "auto" | "light" | "dark";
  action?: string;
};
declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: TurnstileOptions) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId?: string) => string | undefined;
    };
  }
}

/** Site key for this host, or null when Turnstile is not configured. */
export function turnstileSiteKey(): string | null {
  if (typeof window !== "undefined" && LOCAL_HOSTS.has(window.location.hostname)) return LOCAL_TEST_SITE_KEY;
  return isSet(siteConfig.forms.turnstileSiteKey) ? siteConfig.forms.turnstileSiteKey : null;
}

export const loadTurnstile = (): Promise<void> => loadScript("cf-turnstile", TURNSTILE_SRC);

/** Render the widget into `el`; returns its id. */
export async function renderTurnstile(el: HTMLElement, action: string): Promise<string | null> {
  const sitekey = turnstileSiteKey();
  if (!sitekey) return null;
  await loadTurnstile();
  if (!window.turnstile) return null;
  return window.turnstile.render(el, { sitekey, appearance: "interaction-only", theme: "dark", action });
}
