"use client";

import type { ReactNode } from "react";
import { track } from "@/lib/analytics";
import { openCalendly, warmCalendly } from "@/lib/calendly";
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

// Opens the Calendly popup. Calendly is warmed up on hover, touch or focus (and in the background
// by ConversionWidgets when consent allows), so the popup opens fast without slowing page load.
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

  const open = (): void => {
    track("booking_click", { placement });
    suppressContactModal(); // the timed home-page modal must not pop up over the booking
    void openCalendly(url);
    onOpen?.();
  };

  return (
    <span onPointerEnter={warmCalendly} onTouchStart={warmCalendly} onFocusCapture={warmCalendly} className="contents">
      <Button variant={variant} className={className} onClick={open}>
        {children}
      </Button>
    </span>
  );
}
