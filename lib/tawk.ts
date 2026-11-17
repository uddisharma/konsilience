// tawk.to live chat. Loaded either automatically (desktop, when chat consent applies) or when the
// visitor taps our chat button, in which case the chat window opens straight away.

import { track } from "./analytics";
import { loadScript } from "./idle";
import { suppressContactModal } from "./popups";
import { siteConfig } from "@/site.config";

const { tawkPropertyId, tawkWidgetId } = siteConfig.chat;

/** tawk.to's hosted chat page: fallback when the widget is blocked (e.g. by an ad blocker). */
export const TAWK_DIRECT_CHAT_URL = `https://tawk.to/chat/${tawkPropertyId}/${tawkWidgetId}`;

// Bubble offsets from the bottom-right corner, in px. They match Tailwind's 6 (24px) on desktop
// and 4 (16px) on mobile, so the bubble lines up with our own buttons.
const DESKTOP_EDGE_PX = 24;
const MOBILE_EDGE_PX = 16;

type TawkApi = {
  customStyle?: unknown;
  onLoad?: () => void;
  onChatStarted?: () => void;
  maximize?: () => void;
  hideWidget?: () => void;
  showWidget?: () => void;
};
declare global {
  interface Window {
    Tawk_API?: TawkApi;
    Tawk_LoadStart?: Date;
  }
}

let ready: Promise<void> | null = null;

/** Load tawk.to once. Resolves when the widget is ready; `open` maximises the chat window. */
export function loadTawk({ open = false }: { readonly open?: boolean } = {}): Promise<void> {
  if (ready) {
    if (open) window.Tawk_API?.maximize?.();
    return ready;
  }
  ready = new Promise<void>((resolve, reject) => {
    const api: TawkApi = window.Tawk_API ?? {};
    window.Tawk_API = api;
    window.Tawk_LoadStart = new Date();
    api.customStyle = {
      visibility: {
        desktop: { position: "br", xOffset: DESKTOP_EDGE_PX, yOffset: DESKTOP_EDGE_PX },
        mobile: { position: "br", xOffset: MOBILE_EDGE_PX, yOffset: MOBILE_EDGE_PX },
      },
    };
    api.onLoad = () => {
      if (open) api.maximize?.();
      resolve();
    };
    api.onChatStarted = () => {
      suppressContactModal();
      track("chat_started", { method: "tawk" });
    };
    const inject = async (): Promise<void> => {
      try {
        await loadScript("tawk-to-embed", `https://embed.tawk.to/${tawkPropertyId}/${tawkWidgetId}`, { crossorigin: "*" });
      } catch (err) {
        ready = null; // allow a retry
        reject(err instanceof Error ? err : new Error("tawk.to failed to load"));
      }
    };
    void inject();
  });
  return ready;
}

/** Hide the chat bubble (used when the visitor withdraws consent after chat has loaded). */
export function hideTawk(): void {
  window.Tawk_API?.hideWidget?.();
}
