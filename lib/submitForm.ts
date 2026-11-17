import { track } from "./analytics";
import { TURNSTILE_FIELD, turnstileSiteKey } from "./turnstile";
import { getAttribution } from "./utm";
import { siteConfig } from "@/site.config";

export type FormType = "contact" | "application" | "newsletter" | "audit" | "design_partner";
export type SubmitResult = { readonly ok: boolean; readonly error: string };

// How long to wait for the Turnstile token if the visitor submits very quickly.
const TOKEN_WAIT_MS = 4000;
const TOKEN_POLL_MS = 200;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

/** Wait (up to TOKEN_WAIT_MS) for Turnstile to put its token in the form. */
async function waitForToken(form: HTMLFormElement, deadline: number = Date.now() + TOKEN_WAIT_MS): Promise<void> {
  if (!turnstileSiteKey()) return;
  const token = form.querySelector<HTMLInputElement>(`input[name="${TURNSTILE_FIELD}"]`)?.value ?? "";
  if (token || Date.now() >= deadline) return;
  await sleep(TOKEN_POLL_MS);
  return waitForToken(form, deadline);
}

function resetTurnstile(form: HTMLFormElement): void {
  form.querySelectorAll<HTMLElement>(".cf-turnstile-holder[data-widget-id]").forEach((el) => {
    window.turnstile?.reset(el.dataset.widgetId);
  });
}

// Client helper: posts a <form> to the configured form endpoint (default /api/contact, which emails
// the sales inbox) with the form name, page, and the visit's UTM tags / landing page / referrer.
export async function submitForm(form: HTMLFormElement, type: FormType, extra: Record<string, string> = {}): Promise<SubmitResult> {
  await waitForToken(form);
  const data = new FormData(form);
  data.set("type", type);
  data.set("source", window.location.pathname);
  Object.entries(getAttribution()).forEach(([k, v]) => v && data.set(k, v));
  Object.entries(extra).forEach(([k, v]) => data.set(k, v));
  try {
    const res = await fetch(siteConfig.forms.endpoint, { method: "POST", body: data });
    const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (!res.ok || !json.ok) return { ok: false, error: json.error || "Something went wrong. Please try again." };
    if (type === "contact" || type === "audit" || type === "design_partner") track("generate_lead", { method: "form", form_name: type });
    if (type === "audit") track("audit_form_submit");
    if (type === "newsletter") track("sign_up", { method: "newsletter" });
    return { ok: true, error: "" };
  } catch {
    return { ok: false, error: "Network error. Please check your connection and try again." };
  } finally {
    resetTurnstile(form); // tokens are single-use
  }
}

// Hidden spam trap. Real visitors never see or fill it. (So no real form field may be named "website".)
export const honeypotProps = {
  name: "website",
  tabIndex: -1,
  autoComplete: "off",
  "aria-hidden": true,
  className: "absolute left-[-9999px] h-0 w-0 opacity-0",
} as const;
