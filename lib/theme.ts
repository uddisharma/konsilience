// Brand colour theming. Every accent on the site reads CSS variables (--brand-rgb and friends,
// defined in app/globals.css); this module derives all the shades from one base colour.

export const BRAND_KEY = "brand-color";

export const presets = [
  { name: "Electric Blue", hex: "#1a69fd" }, // default
  { name: "Violet", hex: "#7c3aed" },
  { name: "Indigo", hex: "#4f46e5" },
  { name: "Cyan", hex: "#06b6d4" },
  { name: "Teal", hex: "#14b8a6" },
  { name: "Emerald", hex: "#10b981" },
  { name: "Lime", hex: "#84cc16" },
  { name: "Amber", hex: "#f59e0b" },
  { name: "Orange", hex: "#f97316" },
  { name: "Coral", hex: "#f43f5e" },
  { name: "Magenta", hex: "#d946ef" },
];

export const DEFAULT_BRAND = presets[0].hex;

// Self-contained so it can also run as an inline <script> before first paint.
export function applyBrand(hex: string) {
  const root = document.documentElement;
  const vars = ["--brand-rgb", "--brand-strong-rgb", "--brand-light-rgb", "--brand-dark-rgb", "--brand-mid-rgb", "--brand-deep-rgb", "--brand-ink-rgb"];
  if (!hex || hex.toLowerCase() === "#1a69fd") {
    vars.forEach((v) => root.style.removeProperty(v)); // fall back to the hand-tuned defaults in globals.css
    return;
  }
  const n = parseInt(hex.replace("#", ""), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const mix = (to: number, t: number) => c.map((x) => Math.round(x + (to - x) * t)).join(" ");
  root.style.setProperty("--brand-rgb", c.join(" "));
  root.style.setProperty("--brand-strong-rgb", mix(0, 0.05));
  root.style.setProperty("--brand-light-rgb", mix(255, 0.32));
  root.style.setProperty("--brand-dark-rgb", mix(0, 0.22));
  root.style.setProperty("--brand-mid-rgb", mix(0, 0.55));
  root.style.setProperty("--brand-deep-rgb", mix(0, 0.85));
  root.style.setProperty("--brand-ink-rgb", mix(0, 0.93));
}

// Inline script for <body>: re-applies the saved colour before the page paints (no flash).
export const themeBootScript = `try{var h=localStorage.getItem(${JSON.stringify(BRAND_KEY)});if(h)(${applyBrand.toString()})(h)}catch(e){}`;
