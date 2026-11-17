// ─────────────────────────────────────────────────────────────────────────────
// site.config.ts: the ONE place for every link, ID and contact detail.
//
// Founders: fill each value once here. Components read from this file only.
//
// Rules
// • A value written as "{{NAME}}" is a placeholder that has not been supplied yet.
//   Anything still a placeholder is hidden or disabled on the site (see isSet()),
//   so the site never shows "{{...}}" to a visitor. Open items are tracked in
//   docs/OPEN_QUESTIONS.md.
// • Placeholder names match docs/brief/konsilience_links_reference.md, which also
//   says where to get each value and where it appears on the site.
// • Values marked "live" are what www.konsilience.tech shows today. They stay in
//   use but still need founder confirmation (see docs/OPEN_QUESTIONS.md).
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

// Year the team formed and shipped its first project (confirmed 2026-11-17).
// It is NOT the company incorporation year: never present it as "founded".
const TEAM_SINCE_YEAR = 2021;

export const siteConfig = {
  siteUrl: "https://www.konsilience.tech", // live

  company: {
    name: "Konsilience", // live
    legalName: "Konsilience Private Limited", // supplied 2026-11-17
    // Team formed and first project shipped. Use as "our team since 2021", never "founded 2021".
    teamSince: TEAM_SINCE_YEAR,
    // Year Konsilience Private Limited was incorporated. Enables schema foundingDate when set.
    incorporatedYear: "{{INCORPORATION_YEAR}}",
  },

  contact: {
    salesEmail: "sales@konsilience.tech", // {{SALES_EMAIL}} (live)
    supportEmail: "{{SUPPORT_EMAIL}}",
    inPhone: "+91 82838 81336", // {{IN_PHONE}} (live)
    usPhone: "{{US_PHONE}}", // E.164, e.g. +1XXXXXXXXXX
    whatsapp: "918283881336", // {{WHATSAPP}} digits only, no "+", for https://wa.me/<number> (same as IN_PHONE)
    mapEmbedUrl: "{{MAP_EMBED_URL}}", // optional: Google Maps "Embed a map" link for /contact
  },

  // {{ADDRESS}}: where the team works. Footer, /contact, ProfessionalService/LocalBusiness schema.
  office: {
    label: "Headquarters", // live
    city: "Mohali", // live
    region: "Punjab", // live
    country: "India", // live
    countryCode: "IN", // live
    street: "Industrial Area, Sector 75, Sahibzada Ajit Singh Nagar", // live, confirmed 2026-11-17
    postalCode: "160071", // live, confirmed 2026-11-17
    hours: "Mon – Fri, 9:30 AM – 6:30 PM IST", // live
  },

  // Registered (legal) office of Konsilience Private Limited, confirmed 2026-11-17. Organization schema, footer small print.
  registeredOffice: {
    street: "1034/25, Ground Floor, Bhatnagar Colony",
    city: "Jind",
    region: "Haryana",
    postalCode: "126102",
    country: "India",
    countryCode: "IN",
  },

  booking: {
    // Calendly event links (Phase 6)
    calendlyIntroUrl: "https://calendly.com/konsilience/intro-call", // {{CALENDLY_INTRO_URL}}
    // Length shown on every "Book a N-min call" button. Must match the Calendly event:
    // it is 15 min on Calendly today (the brief planned 20). Change both together.
    introCallMinutes: 15,
    calendlyAuditUrl: "https://calendly.com/konsilience/free-seo-audit-review", // {{CALENDLY_AUDIT_URL}} 15-min audit review
    calendlyTrasysUrl: "https://calendly.com/konsilience/trasys-demo", // {{CALENDLY_TRASYS_URL}} 30-min Trasys demo
    calendlyFounderUrl: "{{CALENDLY_FOUNDER_URL}}", // optional: /about "Talk to a founder"
  },

  chat: {
    // tawk.to (Phase 6)
    tawkPropertyId: "6afbf0ccd391ea3cc3c8a899", // {{TAWK_PROPERTY_ID}}
    tawkWidgetId: "1k7k297u3", // {{TAWK_WIDGET_ID}}
  },

  forms: {
    // Every website form posts here. "/api/contact" is the live endpoint today
    // (emails via SMTP, settings in .env). Replace with a Zoho/Zapier/Make URL
    // if the founders choose a CRM endpoint (Phase 6).
    endpoint: "/api/contact", // {{FORM_ENDPOINT}} (live)
    notifyEmail: "sales@konsilience.tech", // {{NOTIFY_EMAIL}}, same as SALES_EMAIL unless told otherwise
    turnstileSiteKey: "0x4AAAAAAGEum3df7IP5pE2F", // {{TURNSTILE_SITE_KEY}} public key only; secret is TURNSTILE_SECRET_KEY in .env / Vercel
  },

  analytics: {
    ga4Id: "G-0FV9HNCG9Q", // {{GA4_ID}}
    gscVerification: "{{GSC_VERIFICATION}}", // only the content="..." value
    gtmId: "{{GTM_ID}}", // optional
    clarityId: "{{CLARITY_ID}}", // optional
  },

  trasys: {
    name: "Trasys AI", // live
    siteUrl: "https://www.trasys.dev", // {{TRASYS_SITE_URL}} (live)
    signupUrl: "{{TRASYS_SIGNUP_URL}}",
    docsUrl: "{{TRASYS_DOCS_URL}}",
    githubUrl: "{{TRASYS_GITHUB_URL}}",
    npmUrl: "{{TRASYS_NPM_URL}}",
    demoVideoUrl: "{{TRASYS_DEMO_VIDEO_URL}}",
    discordUrl: "{{TRASYS_DISCORD_URL}}", // optional
  },

  social: {
    // Only filled values are shown in the footer and used in schema `sameAs`.
    linkedin: "https://www.linkedin.com/company/konsilience", // {{LINKEDIN_URL}} (live)
    instagram: "{{INSTAGRAM_URL}}",
    youtube: "{{YOUTUBE_URL}}",
    x: "{{X_URL}}", // the @handle for twitter:creator is taken from this URL
    github: "{{GITHUB_URL}}",
  },

  directories: {
    clutch: "{{CLUTCH_URL}}",
    goodfirms: "{{GOODFIRMS_URL}}",
    techbehemoths: "{{TECHBEHEMOTHS_URL}}", // optional
    googleBusiness: "{{GOOGLE_BUSINESS_URL}}",
    googleReview: "{{GOOGLE_REVIEW_URL}}", // not shown on the site; for emails and thank-you page
    crunchbase: "{{CRUNCHBASE_URL}}", // optional
    upwork: "{{UPWORK_URL}}", // optional
  },

  // Personal LinkedIn for people shown on /about and as blog authors (only those who agree).
  teamLinkedin: {
    sagun: "{{LINKEDIN_SAGUN_URL}}",
    deepak: "{{LINKEDIN_DEEPAK_URL}}",
    hardik: "{{LINKEDIN_HARDIK_URL}}",
    gursidak: "{{LINKEDIN_GURSIDAK_URL}}",
    neharika: "{{LINKEDIN_NEHARIKA_URL}}",
    chhaya: "{{LINKEDIN_CHHAYA_URL}}",
    tanish: "{{LINKEDIN_TANISH_URL}}",
    akilesh: "{{LINKEDIN_AKILESH_URL}}",
  },
} as const;

/** Profile URLs that are actually filled in, for footer icons. */
export const socialProfiles = (
  [
    ["LinkedIn", "in", siteConfig.social.linkedin],
    ["X", "X", siteConfig.social.x],
    ["Instagram", "ig", siteConfig.social.instagram],
    ["YouTube", "▶", siteConfig.social.youtube],
    ["GitHub", "gh", siteConfig.social.github],
  ] as const
)
  .filter(([, , url]) => isSet(url))
  .map(([label, short, url]) => ({ label, short, url: url as string }));

/** Organization schema `sameAs`: every filled social and directory profile. */
export const sameAs = [
  ...socialProfiles.map((s) => s.url),
  siteConfig.directories.clutch,
  siteConfig.directories.goodfirms,
  siteConfig.directories.techbehemoths,
  siteConfig.directories.googleBusiness,
  siteConfig.directories.crunchbase,
].filter(isSet);

/** "@handle" from the X profile URL (https://x.com/konsilience → "@konsilience"), or null when unset. */
export const xHandle: string | null = isSet(siteConfig.social.x)
  ? `@${new URL(siteConfig.social.x).pathname.split("/").filter(Boolean)[0]}`
  : null;

export const officeAddressLines = [
  `${siteConfig.office.street},`,
  `${siteConfig.office.city}, ${siteConfig.office.region} ${siteConfig.office.postalCode}`,
];

const r = siteConfig.registeredOffice;
export const registeredOfficeLine = `${r.street}, ${r.city}, ${r.region} ${r.postalCode}, ${r.country}`;
