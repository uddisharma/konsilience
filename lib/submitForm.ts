// Client helper: posts a <form> to /api/contact, which emails it to the sales inbox.
export async function submitForm(form: HTMLFormElement, type: "contact" | "application" | "newsletter", extra: Record<string, string> = {}) {
  const data = new FormData(form);
  data.set("type", type);
  data.set("source", window.location.pathname);
  for (const [k, v] of Object.entries(extra)) data.set(k, v);
  try {
    const res = await fetch("/api/contact", { method: "POST", body: data });
    const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (!res.ok || !json.ok) return { ok: false, error: json.error || "Something went wrong. Please try again." };
    return { ok: true, error: "" };
  } catch {
    return { ok: false, error: "Network error. Please check your connection and try again." };
  }
}

// Hidden spam trap. Real visitors never see or fill it.
export const honeypotProps = {
  name: "website",
  tabIndex: -1,
  autoComplete: "off",
  "aria-hidden": true,
  className: "absolute left-[-9999px] h-0 w-0 opacity-0",
} as const;
