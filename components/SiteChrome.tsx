"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides the public site's header, footer and widgets inside the admin panel and the render canvas. */
export default function SiteChrome({ header, footer, children }: { header: ReactNode; footer: ReactNode; children: ReactNode }) {
  const path = usePathname() ?? "";
  // Admin panel and the dev-only image render canvas (/render-kit) get no site chrome.
  if (path.startsWith("/admin") || path.startsWith("/render-kit")) return <>{children}</>;
  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
