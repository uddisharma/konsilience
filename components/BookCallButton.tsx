"use client";

import type { ReactNode } from "react";
import { track } from "@/lib/analytics";
import { loadCalendly, openCalendly } from "@/lib/calendly";
import { suppressContactModal } from "@/lib/popups";
import { isSet, siteConfig } from "@/site.config";
import Button from "./ui/Button";

type Props = {
  readonly children?: ReactNode;
  /** Calendly event URL. Defaults to the intro call. */
  readonly url?: string;
  readonly variant?: "primary" | "white" | "outline" | "ghost" | "blue-outline";
  readonly className?: string;
  /** Where the button sits, sent with the click event (e.g. "header", "sticky_mobile"). */
  readonly placement: string;
  /** Called after the popup is requested, e.g. to close the mobile menu. */
  readonly onOpen?: () => void;
};

// Opens the Calendly popup. Calendly's script is fetched on first hover or focus, so the
// popup opens instantly on click without slowing the initial page load.
/** "Book a 15-min call", with the length taken from site.config.ts. */
export const BOOK_CALL_LABEL = `Book a ${siteConfig.booking.introCallMinutes}-min call`;

export default function BookCallButton({
  children = BOOK_CALL_LABEL,
  url = siteConfig.booking.calendlyIntroUrl,
  variant = "primary",
  className = "",
  placement,
  onOpen,
}: Props): ReactNode {
  if (!isSet(url)) return null;

  const prefetch = async (): Promise<void> => {
    try {
      await loadCalendly();
    } catch {
      // Ignored: openCalendly() retries and falls back to a new tab on click.
    }
  };
  const open = (): void => {
    track("booking_click", { placement });
    suppressContactModal(); // the timed home-page modal must not pop up over the booking
    void openCalendly(url);
    onOpen?.();
  };

  return (
    <span onPointerEnter={prefetch} onFocusCapture={prefetch} className="contents">
      <Button variant={variant} className={className} onClick={open}>
        {children}
      </Button>
    </span>
  );
}
