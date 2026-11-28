"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { startGa4, stopGa4, track } from "@/lib/analytics";
import { isCalendlyBooking, warmCalendly } from "@/lib/calendly";
import { effectiveConsent, initConsent, isBannerVisible } from "@/lib/consent";
import { runOnFirstInteraction, runWhenIdle } from "@/lib/idle";
import { suppressContactModal } from "@/lib/popups";
import { loadTawk, TAWK_DIRECT_CHAT_URL, warmTawk } from "@/lib/tawk";
import { useConsent } from "@/lib/useConsent";
import { captureAttribution } from "@/lib/utm";
import { isSet, siteConfig, whatsappUrl } from "@/site.config";
import BookCallButton from "./BookCallButton";
import CookieBanner from "./consent/CookieBanner";
import Icon from "./ui/Icon";
import WhatsAppIcon from "./ui/WhatsAppIcon";

// Mounted once in the root layout. Owns everything that sits on top of the page:
// • cookie banner, plus GA4 started or stopped to match consent
// • tawk.to chat: never shown on its own. Our lightweight chat button loads tawk.to on click and
//   opens it directly, so visitors never get tawk's greeting pop-up over the page.
//   When consent allows, tawk.to is preloaded hidden on the first scroll/tap so our button
//   opens it instantly.
// • Calendly warmed up on the first scroll/tap when consent allows, so the booking popup opens fast
// • sticky "Book a call" + WhatsApp bar on mobile
// • GA4 events: Calendly bookings, and clicks on phone / WhatsApp / email links

const DESKTOP_QUERY = "(min-width: 1024px)";
// If the chat widget has not appeared by then (blocked, slow network), offer tawk's hosted chat page.
const CHAT_LOAD_TIMEOUT_MS = 10_000;

const { ga4Id } = siteConfig.analytics;
const chatConfigured = isSet(siteConfig.chat.tawkPropertyId) && isSet(siteConfig.chat.tawkWidgetId);

function subscribeDesktop(cb: () => void): () => void {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const isDesktopNow = (): boolean => window.matchMedia(DESKTOP_QUERY).matches;
const isDesktopOnServer = (): boolean => false;

type ChatState = "idle" | "loading" | "ready" | "failed";

/** GA4 event name for a clicked contact link, or null for other links. */
function contactEvent(href: string): string | null {
  if (href.startsWith("tel:")) return "click_to_call";
  if (href.startsWith("https://wa.me/")) return "whatsapp_click";
  if (href.startsWith("mailto:")) return "email_click";
  return null;
}

export default function ConversionWidgets(): ReactNode {
  const consent = useConsent();
  const allowed = effectiveConsent(consent);
  const bannerOpen = isBannerVisible(consent);
  const regionKnown = consent.region !== "unknown";
  const desktop = useSyncExternalStore(subscribeDesktop, isDesktopNow, isDesktopOnServer);
  const [chat, setChat] = useState<ChatState>("idle");
  const [chatRequested, setChatRequested] = useState(false); // visitor clicked our chat button
  // Mobile booking and WhatsApp bar: hidden while reading, shown once the footer is in view.
  const [atFooter, setAtFooter] = useState(false);
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(([entry]) => setAtFooter(entry?.isIntersecting ?? false));
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  // One-time setup: consent + attribution, Calendly booking events, contact-link click events.
  useEffect(() => {
    void initConsent();
    captureAttribution();
    const onMessage = (e: MessageEvent): void => {
      if (!isCalendlyBooking(e)) return;
      suppressContactModal();
      track("generate_lead", { method: "calendly" });
    };
    const onClick = (e: MouseEvent): void => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      const event = link ? contactEvent(link.getAttribute("href") ?? "") : null;
      if (!link || !event) return;
      const placement = link.closest("[data-placement]")?.getAttribute("data-placement") ?? window.location.pathname;
      track(event, { placement });
    };
    window.addEventListener("message", onMessage);
    document.addEventListener("click", onClick, { capture: true });
    return () => {
      window.removeEventListener("message", onMessage);
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, []);

  // GA4 follows analytics consent.
  useEffect(() => {
    if (!regionKnown || !isSet(ga4Id)) return;
    if (!allowed.analytics) {
      stopGa4();
      return;
    }
    return runWhenIdle(() => void startGa4(ga4Id));
  }, [regionKnown, allowed.analytics]);

  // Chat + Calendly: once consent allows, warm up on the visitor's first interaction (never on a
  // timer, so page-load metrics are untouched). tawk.to stays hidden until our button is clicked.
  useEffect(() => {
    if (!regionKnown || bannerOpen || !allowed.functional) return;
    return runOnFirstInteraction(() => {
      if (isSet(siteConfig.booking.calendlyIntroUrl)) warmCalendly();
      if (chatConfigured) loadTawk({ hidden: true }).catch(() => undefined);
    });
  }, [regionKnown, bannerOpen, allowed.functional]);

  const openChat = async (): Promise<void> => {
    setChatRequested(true);
    setChat("loading");
    const timer = window.setTimeout(() => setChat((c) => (c === "loading" ? "failed" : c)), CHAT_LOAD_TIMEOUT_MS);
    try {
      await loadTawk({ open: true });
      setChat("ready");
    } catch {
      setChat("failed");
    } finally {
      window.clearTimeout(timer);
    }
  };

  // Spinner only when the visitor clicked; a background auto-load keeps the plain icon.
  const opening = chat === "loading" && chatRequested;
  const chatButtonClass =
    "fixed right-4 bottom-4 z-40 grid size-[60px] place-items-center rounded-full bg-primary text-white shadow-2xl transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:right-6 lg:bottom-6 print:hidden";

  return (
    <>
      <CookieBanner />

      {!bannerOpen && (
        <div
          data-placement="sticky_mobile"
          inert={!atFooter}
          aria-hidden={!atFooter}
          className={`fixed bottom-4 left-4 z-40 flex items-center gap-2 transition-all duration-300 lg:hidden print:hidden ${atFooter ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
        >
          <BookCallButton placement="sticky_mobile" className="!px-5 !py-3 text-sm shadow-2xl" />
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message us on WhatsApp"
              className="grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl"
            >
              <WhatsAppIcon className="size-6" />
            </a>
          )}
        </div>
      )}

      {chatConfigured && !(bannerOpen && !desktop) && chat !== "ready" &&
        (chat === "failed" ? (
          <a href={TAWK_DIRECT_CHAT_URL} target="_blank" rel="noopener noreferrer" aria-label="Open live chat in a new tab" className={chatButtonClass}>
            <Icon name="chat" className="size-7" strokeWidth={2} />
          </a>
        ) : (
          <button
            type="button"
            onClick={() => void openChat()}
            onPointerEnter={warmTawk}
            onTouchStart={warmTawk}
            onFocus={warmTawk}
            aria-label={opening ? "Opening chat" : "Chat with us"}
            aria-busy={opening}
            className={chatButtonClass}
          >
            {opening ? (
              <span className="size-6 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            ) : (
              <Icon name="chat" className="size-7" strokeWidth={2} />
            )}
          </button>
        ))}
    </>
  );
}
