import type { Metadata } from "next";
import CalendlyInline from "@/components/CalendlyInline";
import Icon from "@/components/ui/Icon";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = { title: "Audit request received", robots: { index: false, follow: false } };

export default function FreeSeoAuditThankYouPage() {
  return (
    <section className="relative overflow-hidden bg-black pt-40 pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_10%,rgb(var(--brand-rgb)/.3),transparent_65%)]" />
      <div className="wrap-sm relative">
        <div className="text-center">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-primary">
            <Icon name="check" className="size-10 text-white" strokeWidth={2.5} />
          </span>
          <h1 className="h2 mt-8">Thanks, we have your request</h1>
          <p className="fs-base mx-auto mt-5 max-w-xl font-medium text-white/80">
            Next step: pick a time for your 15-minute audit review call below.
          </p>
        </div>
        <div className="mt-12">
          <CalendlyInline url={siteConfig.booking.calendlyAuditUrl} />
        </div>
      </div>
    </section>
  );
}
