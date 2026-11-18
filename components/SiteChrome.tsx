"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides the public site's header, footer and widgets inside the admin panel. */
export default function SiteChrome({ header, footer, children }: { header: ReactNode; footer: ReactNode; children: ReactNode }) {
  const admin = usePathname()?.startsWith("/admin");
  if (admin) return <>{children}</>;
  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
