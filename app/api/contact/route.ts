import nodemailer from "nodemailer";
import { siteConfig } from "@/site.config";

const SALES_EMAIL = siteConfig.contact.salesEmail;

// Receives every website form (contact, free SEO audit, job application, newsletter) and emails it to
// the sales inbox. SMTP settings and TURNSTILE_SECRET_KEY come from environment variables; see .env.example.

type FormType = "contact" | "audit" | "design_partner" | "application" | "newsletter";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Cloudflare Turnstile check. Fails open (allows) when the secret is not configured or Cloudflare
 * cannot be reached, so a missing env var or an outage never blocks real leads; the honeypot and
 * rate limit still apply in that case.
 */
async function passesTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("[contact] TURNSTILE_SECRET_KEY is not set: spam check skipped");
    return true;
  }
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token, ...(ip === "unknown" ? {} : { remoteip: ip }) });
  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body });
    const result = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!result.success) console.warn("[contact] Turnstile rejected a submission", result["error-codes"]);
    return result.success === true;
  } catch (err) {
    console.error("[contact] Turnstile verification unavailable, allowing submission", err);
    return true;
  }
}

// Lead-source fields sent by lib/submitForm.ts, shown at the end of every notification email.
const ATTRIBUTION_ROWS: readonly [string, string][] = [
  ["UTM source", "utm_source"],
  ["UTM medium", "utm_medium"],
  ["UTM campaign", "utm_campaign"],
  ["UTM term", "utm_term"],
  ["UTM content", "utm_content"],
  ["Google Ads click ID", "gclid"],
  ["Landing page", "landing_page"],
  ["Referrer", "referrer"],
];

const HTTP_BAD_REQUEST = 400;
const HTTP_FORBIDDEN = 403;
const HTTP_TOO_MANY_REQUESTS = 429;
const HTTP_SERVER_ERROR = 500;
const HTTP_BAD_GATEWAY = 502;
const HTTP = { badRequest: HTTP_BAD_REQUEST, forbidden: HTTP_FORBIDDEN, tooMany: HTTP_TOO_MANY_REQUESTS, serverError: HTTP_SERVER_ERROR, badGateway: HTTP_BAD_GATEWAY } as const;
const SMTP_DEFAULT_PORT = 587; // STARTTLS
const SMTP_IMPLICIT_TLS_PORT = 465;

const BYTES_PER_KB = 1024;
const BYTES_PER_MB = BYTES_PER_KB * BYTES_PER_KB;
const MAX_CV_MB = 5;
const MAX_CV_BYTES = MAX_CV_MB * BYTES_PER_MB;
const CV_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
// Longest value kept from any single form field.
const MAX_FIELD_CHARS = 5000;

// Best-effort in-memory rate limit: RATE_LIMIT_MAX submissions per IP per window (per server instance).
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MINUTES = 10;
const MS_PER_MINUTE = 60_000;
const WINDOW_MS = RATE_LIMIT_WINDOW_MINUTES * MS_PER_MINUTE;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

// Matches each HTML-special character: in `a<b & "c"` it matches "<", "&" and the two quotes;
// letters, digits and spaces are never matched.
// Tester: https://regex101.com/?regex=%5B%26%3C%3E%22%27%5D&testString=a%3Cb%20%26%20%22c%22
const HTML_SPECIAL_RE = /[&<>"']/g;
const HTML_ENTITIES: Readonly<Record<string, string>> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escape = (s: string): string => s.replace(HTML_SPECIAL_RE, (c) => HTML_ENTITIES[c] ?? c);

// Basic email shape check: "ana@acme.co" matches; "ana@acme", "ana acme@x.io" and "@x.io" do not.
// Tester: https://regex101.com/?regex=%5E%5B%5E%5Cs%40%5D%2B%40%5B%5E%5Cs%40%5D%2B%5C.%5B%5E%5Cs%40%5D%2B%24&testString=ana%40acme.co
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isEmail = (s: string): boolean => EMAIL_RE.test(s);
const bad = (error: string, status: number = HTTP.badRequest): Response => Response.json({ ok: false, error }, { status });

function emailHtml(title: string, rows: [string, string][]) {
  const body = rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 14px;background:#f5f6f8;font-weight:600;width:170px;vertical-align:top">${escape(k)}</td>` +
        `<td style="padding:10px 14px;white-space:pre-wrap">${escape(v)}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
    <h2 style="margin:0 0 16px">${escape(title)}</h2>
    <table style="border-collapse:collapse;width:100%;max-width:640px;border:1px solid #e5e7eb">${body}</table>
    <p style="color:#888;font-size:12px;margin-top:16px">Sent from the konsilience.tech website.</p>
  </div>`;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return bad("Too many submissions. Please try again in a few minutes.", HTTP.tooMany);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return bad("Invalid form submission.");
  }

  const get = (k: string) => String(form.get(k) ?? "").trim().slice(0, MAX_FIELD_CHARS);

  // Honeypot: real users never fill this hidden field, bots usually do. Pretend success.
  if (get("website")) return Response.json({ ok: true });

  if (!(await passesTurnstile(get("cf-turnstile-response"), ip))) {
    return bad("We couldn't verify you're not a bot. Please wait a moment and submit again.", HTTP.forbidden);
  }

  const type = (get("type") || "contact") as FormType;
  const name = get("name");
  const email = get("email");
  const source = get("source");

  if (!isEmail(email)) return bad("Please enter a valid email address.");

  let subject: string;
  let rows: [string, string][];
  const attachments: { filename: string; content: Buffer; contentType: string }[] = [];

  if (type === "contact") {
    if (!name || !get("project")) return bad("Please fill in your name and project details.");
    subject = `New enquiry: ${name}${get("budget") ? ` (${get("budget")})` : ""}`;
    rows = [
      ["Name", name],
      ["Email", email],
      ["Phone", get("phone")],
      ["Designation", get("designation")],
      ["Company", get("company")],
      ["Budget", get("budget")],
      ["Project", get("project")],
      ["Page", source],
    ];
  } else if (type === "application") {
    const role = get("role");
    if (!name || !role) return bad("Please fill in your name.");
    const cv = form.get("cv");
    if (!(cv instanceof File) || cv.size === 0) return bad("Please attach your CV.");
    if (cv.size > MAX_CV_BYTES) return bad(`CV must be ${MAX_CV_MB} MB or smaller.`);
    if (!CV_TYPES.includes(cv.type)) return bad("CV must be a PDF or Word document.");
    attachments.push({ filename: cv.name, content: Buffer.from(await cv.arrayBuffer()), contentType: cv.type });
    subject = `Job application: ${role} (${name})`;
    rows = [
      ["Role", role],
      ["Name", name],
      ["Email", email],
      ["Phone", get("phone")],
      ["LinkedIn / Portfolio", get("linkedin")],
      ["Why us", get("note")],
      ["CV", cv.name],
      ["Page", source],
    ];
  } else if (type === "audit") {
    // The URL field is "site_url": "website" is the honeypot.
    const site = get("site_url");
    if (!name || !site) return bad("Please fill in your name and website.");
    subject = `Free SEO audit request: ${site} (${name})`;
    rows = [
      ["Name", name],
      ["Work email", email],
      ["Website", site],
      ["Main goal", get("goal")],
      ["Page", source],
    ];
  } else if (type === "design_partner") {
    const company = get("company");
    const useCase = get("use_case");
    if (!name || !company || !useCase) return bad("Please fill in your name, company and how you use AI.");
    subject = `Trasys design partner application: ${company} (${name})`;
    rows = [
      ["Name", name],
      ["Work email", email],
      ["Company", company],
      ["Role", get("role")],
      ["AI use case", useCase],
      ["Page", source],
    ];
  } else if (type === "newsletter") {
    subject = `Newsletter sign-up: ${email}`;
    rows = [
      ["Email", email],
      ["Page", source],
    ];
  } else {
    return bad("Unknown form type.");
  }
  rows.push(...ATTRIBUTION_ROWS.map(([label, key]): [string, string] => [label, get(key)]));

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, MAIL_FROM, MAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[contact] SMTP is not configured: set SMTP_HOST, SMTP_USER and SMTP_PASS");
    return bad(`Our form is temporarily unavailable. Please email ${SALES_EMAIL}.`, HTTP.serverError);
  }

  const port = Number(SMTP_PORT || SMTP_DEFAULT_PORT);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE ? SMTP_SECURE === "true" : port === SMTP_IMPLICIT_TLS_PORT,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: MAIL_FROM || `Konsilience Website <${SMTP_USER}>`,
      to: MAIL_TO || SALES_EMAIL,
      replyTo: name ? `${name} <${email}>` : email,
      subject,
      text: rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: emailHtml(subject, rows),
      attachments,
    });
  } catch (err) {
    console.error("[contact] sendMail failed", err);
    return bad(`We couldn't send your message right now. Please email ${SALES_EMAIL}.`, HTTP.badGateway);
  }

  return Response.json({ ok: true });
}
