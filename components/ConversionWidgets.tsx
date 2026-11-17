"use client";

import { useEffect, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import { isCalendlyBooking } from "@/lib/calendly";
import { suppressContactModal } from "@/lib/popups";
import { isSet, siteConfig } from "@/site.config";
import BookCallButton from "./BookCallButton";

// Mounted once in the root layout:
// • sticky "Book a call" button on mobile (bottom-left; the chat bubble owns bottom-right)
// • tawk.to chat, loaded after the page is interactive so it does not affect page speed
// • GA4 events for Calendly bookings and chats (recorded once GA4 is installed in Phase 9)
//
// TODO(Phase 9): gate tawk.to behind cookie consent for EU/UK visitors.

const { tawkPropertyId, tawkWidgetId } = siteConfig.chat;

// Bubble offsets from the bottom-right corner, in px. They match Tailwind's 6 (24px) on desktop
// and 4 (16px) on mobile, so the bubble lines up with the sticky booking button and back-to-top.
const DESKTOP_EDGE_PX = 24;
const MOBILE_EDGE_PX = 16;

// Load chat at the first idle moment, but never later than this after hydration. Without the cap,
// the animated home hero keeps desktop browsers busy and the chat never loads.
const TAWK_MAX_WAIT_MS = 5000;
// Any of these from the visitor loads chat straight away.
const FIRST_INTERACTION_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;

type TawkApi = {
  customStyle?: unknown;
  onChatStarted?: () => void;
};
declare global {
  interface Window {
    Tawk_API?: TawkApi;
    Tawk_LoadStart?: Date;
  }
}

function injectTawk(): void {
  if (document.getElementById("tawk-to-embed")) return;
  window.Tawk_API = window.Tawk_API ?? {};
  window.Tawk_LoadStart = new Date();
  window.Tawk_API.customStyle = {
    visibility: {
      desktop: { position: "br", xOffset: DESKTOP_EDGE_PX, yOffset: DESKTOP_EDGE_PX },
      mobile: { position: "br", xOffset: MOBILE_EDGE_PX, yOffset: MOBILE_EDGE_PX },
    },
  };
  window.Tawk_API.onChatStarted = () => {
    suppressContactModal();
    track("chat_started", { method: "tawk" });
  };
  const s = document.createElement("script");
  s.id = "tawk-to-embed";
  s.async = true;
  s.src = `https://embed.tawk.to/${tawkPropertyId}/${tawkWidgetId}`;
  s.setAttribute("crossorigin", "*"); // as in tawk.to's official snippet
  document.head.appendChild(s);
}

/** Run `start` once: at the first idle moment (capped at TAWK_MAX_WAIT_MS) or first interaction. */
function scheduleOnce(start: () => void): () => void {
  let done = false;
  const run = (): void => {
    if (done) return;
    done = true;
    cleanup();
    start();
  };
  FIRST_INTERACTION_EVENTS.forEach((e) => window.addEventListener(e, run, { once: true, passive: true }));
  const idleId = window.requestIdleCallback?.(run, { timeout: TAWK_MAX_WAIT_MS });
  const timerId = idleId === undefined ? window.setTimeout(run, TAWK_MAX_WAIT_MS) : undefined;
  function cleanup(): void {
    FIRST_INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, run));
    if (idleId !== undefined) window.cancelIdleCallback(idleId);
    if (timerId !== undefined) window.clearTimeout(timerId);
  }
  return cleanup;
}

export default function ConversionWidgets(): ReactNode {
  // A booking made in the Calendly popup is our main lead event.
  useEffect(() => {
    const onMessage = (e: MessageEvent): void => {
      if (isCalendlyBooking(e)) track("generate_lead", { method: "calendly" });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    if (!isSet(tawkPropertyId) || !isSet(tawkWidgetId)) return;
    return scheduleOnce(injectTawk);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-40 lg:hidden print:hidden">
      <BookCallButton placement="sticky_mobile" className="!px-5 !py-3 text-sm shadow-2xl" />
    </div>
  );
}
