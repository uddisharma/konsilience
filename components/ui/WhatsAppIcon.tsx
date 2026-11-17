import type { ReactNode } from "react";
import { siWhatsapp } from "simple-icons";

/** WhatsApp's logo (from simple-icons), filled with the current text colour. */
export default function WhatsAppIcon({ className = "size-5" }: { readonly className?: string }): ReactNode {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d={siWhatsapp.path} />
    </svg>
  );
}
