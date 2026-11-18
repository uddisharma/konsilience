import "server-only";

/*
 * Sends website leads to HubSpot CRM through a Private App token (HUBSPOT_ACCESS_TOKEN). Each lead
 * creates the contact, or updates it if the email already exists, then adds a note on the contact
 * with everything the visitor submitted plus the UTM and referrer details.
 *
 * Errors are logged and never thrown, so a HubSpot problem can't break a form submission. The
 * notification email is still sent either way.
 *
 * Private App scopes needed: crm.objects.contacts.read, crm.objects.contacts.write
 */

const API = "https://api.hubapi.com";
const TIMEOUT_MS = 10_000;
const HTTP_CONFLICT = 409;
// HubSpot's built-in association type for note -> contact.
const NOTE_TO_CONTACT = 202;
// A 409 on create says "Contact already exists. Existing ID: 12345".
const EXISTING_ID_RE = /Existing ID:\s*(\d+)/;

const HTML_SPECIAL_RE = /[&<>"']/g;
const HTML_ENTITIES: Readonly<Record<string, string>> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escape = (s: string): string => s.replace(HTML_SPECIAL_RE, (c) => HTML_ENTITIES[c] ?? c);

export type HubSpotLead = {
  /** Used as the note title, e.g. "Contact form" or "Free SEO audit". */
  readonly formLabel: string;
  readonly email: string;
  readonly name?: string;
  readonly phone?: string;
  readonly company?: string;
  readonly jobTitle?: string;
  readonly website?: string;
  /** Newsletter sign-ups become subscribers, all other forms become leads. */
  readonly stage: "lead" | "subscriber";
  /** Every submitted field as [label, value] pairs, for the note. Empty values are skipped. */
  readonly details: readonly (readonly [string, string])[];
};

export const isHubSpotConfigured = (): boolean => !!process.env.HUBSPOT_ACCESS_TOKEN;

async function hubspot(path: string, method: "POST" | "PATCH", body: unknown): Promise<Response> {
  return fetch(`${API}${path}`, {
    method,
    headers: { Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

async function fail(step: string, res: Response): Promise<never> {
  throw new Error(`${step} failed (${res.status}): ${await res.text().catch(() => "")}`);
}

/** Creates the contact, or updates it when the email already exists. Returns the contact ID. */
async function upsertContact(lead: HubSpotLead): Promise<string> {
  const [firstname, ...rest] = (lead.name ?? "").split(/\s+/).filter(Boolean);
  const fields: Record<string, string | undefined> = {
    email: lead.email,
    firstname,
    lastname: rest.join(" ") || undefined,
    phone: lead.phone,
    company: lead.company,
    jobtitle: lead.jobTitle,
    website: lead.website,
  };
  const properties = Object.fromEntries(Object.entries(fields).filter(([, v]) => v));

  // Lifecycle stage and lead status are only set on new contacts. Setting them on an existing
  // contact could move a customer back to "lead", which HubSpot rejects.
  const created = await hubspot("/crm/v3/objects/contacts", "POST", {
    properties: { ...properties, lifecyclestage: lead.stage, ...(lead.stage === "lead" ? { hs_lead_status: "NEW" } : {}) },
  });
  if (created.ok) return ((await created.json()) as { id: string }).id;
  if (created.status !== HTTP_CONFLICT) return fail("Create contact", created);

  const existingId = EXISTING_ID_RE.exec(await created.text())?.[1];
  if (!existingId) throw new Error("Contact exists but HubSpot did not return its ID");
  const updated = await hubspot(`/crm/v3/objects/contacts/${existingId}`, "PATCH", { properties });
  if (!updated.ok) return fail("Update contact", updated);
  return existingId;
}

async function addNote(contactId: string, lead: HubSpotLead): Promise<void> {
  const lines = lead.details.filter(([, v]) => v).map(([k, v]) => `<strong>${escape(k)}:</strong> ${escape(v).replace(/\n/g, "<br>")}`);
  const res = await hubspot("/crm/v3/objects/notes", "POST", {
    properties: {
      hs_timestamp: new Date().toISOString(),
      hs_note_body: `<p><strong>Website: ${escape(lead.formLabel)}</strong></p><p>${lines.join("<br>")}</p>`,
    },
    associations: [{ to: { id: contactId }, types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: NOTE_TO_CONTACT }] }],
  });
  if (!res.ok) await fail("Create note", res);
}

/** Sends one lead to HubSpot. Never throws. Does nothing if HUBSPOT_ACCESS_TOKEN is not set. */
export async function sendLeadToHubSpot(lead: HubSpotLead): Promise<void> {
  if (!isHubSpotConfigured()) return;
  try {
    const contactId = await upsertContact(lead);
    await addNote(contactId, lead);
  } catch (err) {
    console.error(`[hubspot] could not sync lead (${lead.formLabel})`, err);
  }
}
