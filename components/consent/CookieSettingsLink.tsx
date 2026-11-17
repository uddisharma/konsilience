"use client";

import type { ReactNode } from "react";
import { openCookieSettings } from "@/lib/consent";

/** Footer link that reopens the cookie banner in settings mode. */
export default function CookieSettingsLink({ className = "" }: { readonly className?: string }): ReactNode {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Cookie settings
    </button>
  );
}
