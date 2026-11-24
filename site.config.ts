export type Placeholder = `{{${string}}}`;

const PLACEHOLDER_RE = /^\{\{[A-Z0-9_]+\}\}$/;

export function isSet(value: string | undefined | null): value is string {
  return !!value && !PLACEHOLDER_RE.test(value.trim());
}

const NON_DIAL_CHARS_RE = /[^\d+]/g;

export const telHref = (display: string): string => `tel:${display.replace(NON_DIAL_CHARS_RE, "")}`;

const TEAM_SINCE_YEAR = 2021;

export const siteConfig = {
  siteUrl: "https://www.konsilience.tech",

  company: {
    name: "Konsilience",
    legalName: "Konsilience Private Limited", // supplied 2026-11-17
    // Team formed and first project shipped. Use as "our team since 2021", never "founded 2021".
    teamSince: TEAM_SINCE_YEAR,
    // Year Konsilience Private Limited was incorporated. Enables schema foundingDate when set.
    incorporatedYear: "2026",
  },

  contact: {
    salesEmail: "sales@konsilience.tech", // {{SALES_EMAIL}} (live)
    supportEmail: "sales@konsilience.tech",
    inPhone: "+91 82838 81336", // {{IN_PHONE}} (live)
    usPhone: "+91 82838 81336", // E.164, e.g. +1XXXXXXXXXX
    whatsapp: "918283881336", // {{WHATSAPP}} digits only, no "+", for https://wa.me/<number> (same as IN_PHONE)
    mapEmbedUrl: "https://maps.app.goo.gl/Q32z4k1Q3Q4Q3Q4Q7?g_st=ic", // optional: Google Maps "Embed a map" link for /contact
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
    calendlyFounderUrl: "https://calendly.com/konsilience/founder-deepak-sharma-30-mints", // optional: /about "Talk to a founder"
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
    gscVerification: "", // not needed: Search Console domain property (sc-domain:konsilience.tech) verifies by DNS
    gtmId: "{{GTM_ID}}", // optional
    clarityId: "{{CLARITY_ID}}", // optional
  },

  trasys: {
    name: "Trasys AI", // live
    siteUrl: "https://www.trasys.dev", // {{TRASYS_SITE_URL}} (live)
    signupUrl: "https://www.trasys.dev/sign-up", // {{TRASYS_SIGNUP_URL}} (verified 200, 2026-11-17)
    docsUrl: "https://docs.trasys.dev",
    githubUrl: "http://gitlab.com/trasys",
    npmUrl: "https://www.npmjs.com/package/@trasys/sdk",
    demoVideoUrl: "https://www.trasys.dev/trasys-dark-30s.mp4",
    discordUrl: "{{TRASYS_DISCORD_URL}}", // optional
  },

  social: {
    // Only filled values are shown in the footer and used in schema `sameAs`.
    linkedin: "https://www.linkedin.com/company/konsilience", // {{LINKEDIN_URL}} (live)
    instagram: "https://www.instagram.com/konsilience",
    youtube: "https://www.youtube.com/@konsilience",
    x: "{{X_URL}}", // the @handle for twitter:creator is taken from this URL
    github: "http://github.com/trasys",
  },

  directories: {
    clutch: "{{CLUTCH_URL}}",
    goodfirms: "https://www.goodfirms.co/company/konsilience-private-limited",
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
    ["LinkedIn", "linkedin", siteConfig.social.linkedin],
    ["X", "x", siteConfig.social.x],
    ["Instagram", "instagram", siteConfig.social.instagram],
    ["YouTube", "youtube", siteConfig.social.youtube],
    ["GitHub", "github", siteConfig.social.github],
  ] as const
)
  .filter(([, , url]) => isSet(url))
  .map(([label, icon, url]) => ({ label, icon, url: url as string }));

/** Review and business directory profiles shown as icons in the footer (only filled ones). */
export const directoryProfiles = (
  [
    ["GoodFirms", "goodfirms", siteConfig.directories.goodfirms],
    ["Clutch", "clutch", siteConfig.directories.clutch],
    ["Google Business", "google", siteConfig.directories.googleBusiness],
    ["Crunchbase", "crunchbase", siteConfig.directories.crunchbase],
  ] as const
)
  .filter(([, , url]) => isSet(url))
  .map(([label, icon, url]) => ({ label, icon, url: url as string }));

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

// Opening line pre-filled in WhatsApp; the visitor can edit it before sending.
const WHATSAPP_GREETING = "Hi Konsilience, I'd like to talk about a project.";
/** https://wa.me link with a pre-filled greeting, or null when no WhatsApp number is set. */
export const whatsappUrl: string | null = isSet(siteConfig.contact.whatsapp)
  ? `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(WHATSAPP_GREETING)}`
  : null;

// Date of the last content change to the site (YYYY-MM-DD). The sitemap uses it as the
// <lastmod> for pages without their own date. Bump it when you change page content.
export const CONTENT_UPDATED = "2026-11-17";
