import type { ReactNode } from "react";
import type { Project } from "@/lib/catalog";

// Case-study marks (rendered to /public/images/logos/<slug>.png by scripts/render-logos.mjs).
// These platforms have no client brand marks, so each gets one flat symbol built from circles, bars
// and arcs on a 48-unit grid: a single deep ink on a pale tile of the same hue. No wordmark (the
// project name always sits beside the tile), no gradients, no dark tiles.
// `c` = ink, `b` = tile colour (for cut-outs).

type Mark = (c: string, b: string) => ReactNode;

export const LOGOS: Record<string, { tile: string; ink: string; mark: Mark }> = {
  // Trasys keeps its T-and-spans shape.
  "trasys-ai": {
    tile: "#DDF3F1",
    ink: "#0E5A61",
    mark: (c) => (
      <>
        <rect x="7" y="8" width="30" height="8" rx="4" fill={c} />
        <rect x="18" y="8" width="8" height="33" rx="4" fill={c} />
        <rect x="30" y="21" width="12" height="7" rx="3.5" fill={c} />
        <rect x="30" y="33" width="7" height="7" rx="3.5" fill={c} />
      </>
    ),
  },
  // Two channels folding into one.
  "omnichannel-helpdesk": {
    tile: "#FDF0CC",
    ink: "#8A5A00",
    mark: (c, b) => (
      <>
        <rect x="5" y="5" width="27" height="27" rx="9" fill={c} />
        <rect x="16" y="16" width="27" height="27" rx="9" fill={c} stroke={b} strokeWidth="3.5" />
      </>
    ),
  },
  // Balance: beam, two pans, stem.
  "legal-practice-suite": {
    tile: "#EAE3FB",
    ink: "#4A2A9E",
    mark: (c) => (
      <>
        <rect x="5" y="9" width="38" height="6" rx="3" fill={c} />
        <path d="M5 19h14a7 7 0 0 1-14 0zM29 19h14a7 7 0 0 1-14 0z" fill={c} />
        <rect x="21" y="12" width="6" height="26" fill={c} />
        <rect x="13" y="37" width="22" height="6" rx="3" fill={c} />
      </>
    ),
  },
  // Org chart: one node over two.
  "enterprise-hrms": {
    tile: "#DCE7FF",
    ink: "#143C9A",
    mark: (c) => (
      <>
        <path d="M24 14v10M11 33v-9h26v9" fill="none" stroke={c} strokeWidth="4.5" strokeLinejoin="round" />
        <circle cx="24" cy="11" r="7" fill={c} />
        <circle cx="11" cy="36" r="7" fill={c} />
        <circle cx="37" cy="36" r="7" fill={c} />
      </>
    ),
  },
  // Map pin.
  "field-service-platform": {
    tile: "#E2F2C4",
    ink: "#35560F",
    mark: (c, b) => (
      <>
        <path d="M24 4a14 14 0 0 1 14 14c0 10-14 26-14 26S10 28 10 18A14 14 0 0 1 24 4z" fill={c} />
        <circle cx="24" cy="18" r="5.5" fill={b} />
      </>
    ),
  },
  // Skyline.
  "property-management-cloud": {
    tile: "#D5F1F4",
    ink: "#0B5568",
    mark: (c) => (
      <>
        <rect x="5" y="23" width="11" height="20" rx="2.5" fill={c} />
        <rect x="18.5" y="6" width="11" height="37" rx="2.5" fill={c} />
        <rect x="32" y="15" width="11" height="28" rx="2.5" fill={c} />
      </>
    ),
  },
  // Inbox tray.
  "shared-inbox-help-desk": {
    tile: "#E6E4F8",
    ink: "#2F2A85",
    mark: (c, b) => (
      <>
        <rect x="5" y="7" width="38" height="34" rx="9" fill={c} />
        <path d="M5 25h11a8 8 0 0 0 16 0h11" fill="none" stroke={b} strokeWidth="4" />
      </>
    ),
  },
  // Medical cross with a lens.
  "browser-telehealth": {
    tile: "#DEDBFB",
    ink: "#2A16B0",
    mark: (c, b) => (
      <>
        <rect x="17" y="5" width="14" height="38" rx="4.5" fill={c} />
        <rect x="5" y="17" width="38" height="14" rx="4.5" fill={c} />
        <circle cx="24" cy="24" r="4.5" fill={b} />
      </>
    ),
  },
  // Job done.
  "trade-job-manager": {
    tile: "#F2EDB6",
    ink: "#5F5A00",
    mark: (c) => <path d="M7 26l11 11L41 12" fill="none" stroke={c} strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />,
  },
  // Key.
  "landlord-management-app": {
    tile: "#F3E6D3",
    ink: "#6E4212",
    mark: (c) => (
      <>
        <circle cx="14" cy="24" r="8" fill="none" stroke={c} strokeWidth="6.5" />
        <rect x="22" y="20.75" width="22" height="6.5" rx="2" fill={c} />
        <rect x="31" y="26" width="5.5" height="8" rx="1.5" fill={c} />
        <rect x="38.5" y="26" width="5.5" height="6" rx="1.5" fill={c} />
      </>
    ),
  },
  // Shelf grid with one tagged item.
  "visual-inventory-tracker": {
    tile: "#E4E8EE",
    ink: "#253247",
    mark: (c) => (
      <>
        <rect x="5" y="5" width="17" height="17" rx="4.5" fill={c} />
        <rect x="26" y="5" width="17" height="17" rx="4.5" fill={c} />
        <rect x="5" y="26" width="17" height="17" rx="4.5" fill={c} />
        <circle cx="34.5" cy="34.5" r="8.5" fill={c} />
      </>
    ),
  },
  // Storeys going up.
  "construction-field-reporting": {
    tile: "#FBDCCB",
    ink: "#A53A0C",
    mark: (c) => <path d="M5 43V31h12.5V18.5H30V6h13v37z" fill={c} stroke={c} strokeWidth="3" strokeLinejoin="round" />,
  },
  // Leaf.
  "salon-and-spa-booking": {
    tile: "#FBE1EC",
    ink: "#9B1B55",
    mark: (c, b) => (
      <>
        <path d="M24 4c15 11 15 29 0 40C9 33 9 15 24 4z" fill={c} />
        <path d="M24 19v25" fill="none" stroke={b} strokeWidth="3.5" strokeLinecap="round" />
      </>
    ),
  },
  // Three strands.
  "ai-hair-intelligence-platform": {
    tile: "#FDE4E8",
    ink: "#B4163C",
    mark: (c) => (
      <>
        {[12, 24, 36].map((x) => (
          <path key={x} d={`M${x} 6c-7 6-7 12 0 18s7 12 0 18`} fill="none" stroke={c} strokeWidth="6" strokeLinecap="round" />
        ))}
      </>
    ),
  },
  // Shop front with awning.
  "zero-commission-storefronts": {
    tile: "#EDEBE3",
    ink: "#1B2233",
    mark: (c, b) => (
      <>
        <rect x="5" y="6" width="38" height="10" rx="3" fill={c} />
        <path d="M5 15h12.67a6.33 6.33 0 0 1-12.67 0zM17.67 15h12.66a6.33 6.33 0 0 1-12.66 0zM30.33 15H43a6.33 6.33 0 0 1-12.67 0z" fill={c} />
        <rect x="8" y="26" width="32" height="17" rx="3" fill={c} />
        <rect x="19" y="31" width="10" height="12" fill={b} />
      </>
    ),
  },
  // Route between two stops.
  "bus-operator-platform": {
    tile: "#CFF1E7",
    ink: "#0C5B46",
    mark: (c) => (
      <>
        <path d="M11 12v6c0 16 26-4 26 12v6" fill="none" stroke={c} strokeWidth="5" strokeLinecap="round" />
        <circle cx="11" cy="11" r="7" fill={c} />
        <circle cx="37" cy="37" r="7" fill={c} />
      </>
    ),
  },
};

export function LogoArt({ p }: { p: Project }) {
  const { tile, ink, mark } = LOGOS[p.slug];
  return (
    <div className="flex size-full items-center justify-center" style={{ background: tile }}>
      <svg viewBox="0 0 48 48" style={{ width: "54vw", height: "54vw" }} aria-hidden>
        {mark(ink, tile)}
      </svg>
    </div>
  );
}
