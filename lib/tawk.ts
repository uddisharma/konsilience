// tawk.to live chat. Preloaded hidden (when chat consent applies), and shown only when the
// visitor clicks our chat button, in which case the chat window opens straight away.

import { track } from "./analytics";
import { loadScript, preconnect } from "./idle";
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

/** Connect to tawk.to's servers ahead of loading (on hover/touch of our chat button). */
export function warmTawk(): void {
  preconnect(["https://embed.tawk.to"], { anonymous: true });
  preconnect(["https://va.tawk.to"]);
}

// tawk.to flashes the tab title ("(1) New message") while a message is unread, e.g. an automated
// greeting. Watch the <title> and put the page's own title back whenever tawk swaps it.
const TAWK_TITLE = /new messages?|^\(\d+\)/i;
let titleGuardInstalled = false;

function installTitleGuard(): void {
  if (titleGuardInstalled) return;
  titleGuardInstalled = true;
  let pageTitle = TAWK_TITLE.test(document.title) ? "" : document.title;
  const sync = (): void => {
    if (!TAWK_TITLE.test(document.title)) {
      pageTitle = document.title; // a real change, e.g. client-side navigation
    } else if (pageTitle) {
      document.title = pageTitle;
    }
  };
  new MutationObserver(sync).observe(document.head, { subtree: true, childList: true, characterData: true });
}

function reveal(): void {
  window.Tawk_API?.showWidget?.();
  window.Tawk_API?.maximize?.();
}

/**
 * Load tawk.to once. Resolves when the widget is ready.
 * `open` shows and maximises the chat window; `hidden` preloads it with the bubble hidden,
 * so a later `open` is instant.
 */
export function loadTawk({ open = false, hidden = false }: { readonly open?: boolean; readonly hidden?: boolean } = {}): Promise<void> {
  if (ready) {
    // Still loading: reveal once ready. Already loaded: reveal now.
    return open ? ready.then(reveal) : ready;
  }
  installTitleGuard();
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
      if (open) reveal();
      else if (hidden) api.hideWidget?.();
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
