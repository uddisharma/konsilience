// ─────────────────────────────────────────────────────────────────────────────
// site.config.ts: the ONE place for every link, ID and contact detail.
//
// Founders: fill each value once here. Components read from this file only.
//
// Rules
// • A value written as "{{NAME}}" is a placeholder that has not been supplied yet.
//   Anything still a placeholder is hidden or disabled on the site (see isSet()),
//   so the site never shows "{{...}}" to a visitor. Open items are tracked in
//   OPEN_QUESTIONS.md.
// • Placeholder names follow konsilience_website_fix_brief_v2.md. Names marked
//   (provisional) were not in the brief and will be renamed to match
//   konsilience_links_reference.md once that file is added to the repo.
// • Values marked "live" are what www.konsilience.tech shows today. They stay in
//   use but still need founder confirmation (see OPEN_QUESTIONS.md).
// ─────────────────────────────────────────────────────────────────────────────

export type Placeholder = `{{${string}}}`;

// Matches a whole-value placeholder: "{{US_PHONE}}" matches; "+1 555 0100" and "{{lower}}" do not.
// Tester: https://regex101.com/?regex=%5E%5C%7B%5C%7B%5BA-Z0-9_%5D%2B%5C%7D%5C%7D%24&testString=%7B%7BUS_PHONE%7D%7D
const PLACEHOLDER_RE = /^\{\{[A-Z0-9_]+\}\}$/;

/** True when a config value has been filled in (not empty, not a {{PLACEHOLDER}}). */
export function isSet(value: string | undefined | null): value is string {
  return !!value && !PLACEHOLDER_RE.test(value.trim());
}

// Matches every character that is not a digit or "+": in "+91 82838-81336" it removes " " and "-",
// keeping "+918283881336"; digits and "+" are never matched.
// Tester: https://regex101.com/?regex=%5B%5E%5Cd%2B%5D&testString=%2B91%2082838-81336
const NON_DIAL_CHARS_RE = /[^\d+]/g;

/** Strip spaces, brackets and dashes so a display number can go in a tel: link. */
export const telHref = (display: string): string => `tel:${display.replace(NON_DIAL_CHARS_RE, "")}`;

// NEEDS_CONFIRMATION: does 2021 refer to the company, the team or the first project? (Phase 2)
const FOUNDED_YEAR = 2021;

export const siteConfig = {
  siteUrl: "https://www.konsilience.tech", // live

  company: {
    name: "Konsilience", // live
    // Year the company started. Shown as "since 2021" / years counter today.
    founded: FOUNDED_YEAR, // live
  },

  contact: {
    salesEmail: "sales@konsilience.tech", // {{SALES_EMAIL}} (live)
    inPhone: "+91 82838 81336", // {{IN_PHONE}} (live)
    usPhone: "{{US_PHONE}}",
    whatsapp: "{{WHATSAPP}}", // digits only, international format, for https://wa.me/<number>
  },

  office: {
    label: "Headquarters", // live
    city: "Mohali", // live
    region: "Punjab", // live
    country: "India", // live
    countryCode: "IN", // live
    street: "Industrial Area, Sector 75, Sahibzada Ajit Singh Nagar", // live
    postalCode: "160071", // live
    hours: "Mon – Fri, 9:30 AM – 6:30 PM IST", // live
  },

  booking: {
    // Calendly event links (Phase 6)
    calendlyIntroUrl: "https://calendly.com/konsilience/intro-call", // {{CALENDLY_INTRO_URL}} (from links.md) // header + sticky "Book a 20-min call", /contact inline
    calendlyAuditUrl: "https://calendly.com/konsilience/free-seo-audit-review", // {{CALENDLY_AUDIT_URL}} (from links.md) // free-audit thank-you page
    calendlyTrasysUrl: "https://calendly.com/konsilience/trasys-demo", // {{CALENDLY_TRASYS_URL}} (from links.md; 30-min demo) // /trasys
  },

  chat: {
    // tawk.to (Phase 6)
    tawkPropertyId: "6afbf0ccd391ea3cc3c8a899", // {{TAWK_PROPERTY_ID}} (from links.md)
    tawkWidgetId: "1k7k297u3", // {{TAWK_WIDGET_ID}} (from links.md)
  },

  forms: {
    // Every website form posts here. "/api/contact" is the live endpoint today
    // (emails via SMTP, settings in .env). Replace with {{FORM_ENDPOINT}} if the
    // founders choose a different form backend (Phase 6).
    endpoint: "/api/contact", // {{FORM_ENDPOINT}} (live)
    captchaSiteKey: "{{CAPTCHA_SITE_KEY}}", // (provisional) public key only; the secret stays in .env
  },

  analytics: {
    ga4Id: "{{GA4_ID}}",
    gscVerification: "{{GSC_VERIFICATION}}",
  },

  trasys: {
    name: "Trasys AI", // live
    siteUrl: "https://www.trasys.dev", // live
    signupUrl: "{{TRASYS_SIGNUP_URL}}",
    docsUrl: "{{TRASYS_DOCS_URL}}", // (provisional)
    demoVideoUrl: "{{TRASYS_DEMO_VIDEO_URL}}", // (provisional)
  },

  social: {
    // Only filled values are shown in the footer and used in schema `sameAs`.
    linkedin: "https://www.linkedin.com/company/konsilience", // live
    x: "{{X_URL}}", // (provisional)
    xHandle: "{{X_HANDLE}}", // (provisional) e.g. "@konsilience", used for twitter:creator
    facebook: "{{FACEBOOK_URL}}", // (provisional)
    instagram: "{{INSTAGRAM_URL}}", // (provisional)
    youtube: "{{YOUTUBE_URL}}", // (provisional)
    clutch: "{{CLUTCH_URL}}", // (provisional) directory profile for sameAs
    goodfirms: "{{GOODFIRMS_URL}}", // (provisional) directory profile for sameAs
  },
} as const;

/** Profile URLs that are actually filled in, for footer icons and schema sameAs. */
export const socialProfiles = (
  [
    ["LinkedIn", "in", siteConfig.social.linkedin],
    ["X", "X", siteConfig.social.x],
    ["Facebook", "f", siteConfig.social.facebook],
    ["Instagram", "ig", siteConfig.social.instagram],
    ["YouTube", "▶", siteConfig.social.youtube],
  ] as const
)
  .filter(([, , url]) => isSet(url))
  .map(([label, short, url]) => ({ label, short, url: url as string }));

export const sameAs = [
  ...socialProfiles.map((s) => s.url),
  siteConfig.social.clutch,
  siteConfig.social.goodfirms,
].filter(isSet);

export const officeAddressLines = [
  `${siteConfig.office.street},`,
  `${siteConfig.office.city}, ${siteConfig.office.region} ${siteConfig.office.postalCode}`,
];
