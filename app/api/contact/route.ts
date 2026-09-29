import nodemailer from "nodemailer";

// Receives every website form (contact, job application, newsletter) and emails it to the sales inbox.
// SMTP settings come from environment variables; see .env.example.

type FormType = "contact" | "application" | "newsletter";

const MAX_CV_BYTES = 5 * 1024 * 1024;
const CV_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

// Best-effort in-memory rate limit: 5 submissions per IP per 10 minutes (per server instance).
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const bad = (error: string, status = 400) => Response.json({ ok: false, error }, { status });

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
  if (rateLimited(ip)) return bad("Too many submissions. Please try again in a few minutes.", 429);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return bad("Invalid form submission.");
  }

  const get = (k: string) => String(form.get(k) ?? "").trim().slice(0, 5000);

  // Honeypot: real users never fill this hidden field, bots usually do. Pretend success.
  if (get("website")) return Response.json({ ok: true });

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
    if (cv.size > MAX_CV_BYTES) return bad("CV must be 5 MB or smaller.");
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
  } else if (type === "newsletter") {
    subject = `Newsletter sign-up: ${email}`;
    rows = [
      ["Email", email],
      ["Page", source],
    ];
  } else {
    return bad("Unknown form type.");
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, MAIL_FROM, MAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[contact] SMTP is not configured: set SMTP_HOST, SMTP_USER and SMTP_PASS");
    return bad("Our form is temporarily unavailable. Please email sales@konsilience.tech.", 500);
  }

  const port = Number(SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE ? SMTP_SECURE === "true" : port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: MAIL_FROM || `Konsilience Website <${SMTP_USER}>`,
      to: MAIL_TO || "sales@konsilience.tech",
      replyTo: name ? `${name} <${email}>` : email,
      subject,
      text: rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: emailHtml(subject, rows),
      attachments,
    });
  } catch (err) {
    console.error("[contact] sendMail failed", err);
    return bad("We couldn't send your message right now. Please email sales@konsilience.tech.", 502);
  }

  return Response.json({ ok: true });
}
