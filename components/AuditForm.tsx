"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { submitForm } from "@/lib/submitForm";
import { Field } from "./ContactForm";
import FormGuard from "./FormGuard";

const GOALS = ["More qualified leads", "More organic traffic", "Rank for specific searches", "Recover from a traffic drop", "Not sure yet"] as const;

// Free SEO audit request: name, work email, website, main goal. On success the visitor goes to the
// thank-you page, which embeds the audit-review calendar.
export default function AuditForm(): ReactNode {
  // React ids look like ":r1:"; strip the colons so they are safe inside element ids ("r1").
  const uid = useId().replaceAll(":", "");
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const f = (name: string): string => `${uid}-${name}`;

  const submit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSending(true);
    setError("");
    const res = await submitForm(e.currentTarget, "audit");
    if (res.ok) {
      router.push("/free-seo-audit/thank-you");
      return;
    }
    setError(res.error);
    setSending(false);
  };

  return (
    <div className="rounded-3xl border border-line bg-[linear-gradient(180deg,rgb(var(--brand-deep-rgb))_0%,rgb(var(--brand-strong-rgb))_100%)] p-7 sm:p-9">
      <form onSubmit={submit} className="relative flex flex-col gap-8">
        <FormGuard action="audit" />
        <div className="flex flex-col gap-2">
          <p className="subtitle !font-extrabold">Request your free audit</p>
          <p className="fs-para font-medium text-white/85">Takes about a minute. Next, you pick a time for the review call.</p>
        </div>
        <div className="grid gap-7">
          <Field id={f("name")} label="Name" />
          <Field id={f("email")} label="Work email" type="email" />
          {/* "site_url", not "website": "website" is the hidden spam trap. */}
          <Field id={f("site_url")} label="Website address" type="url" />
          <div className="relative">
            <label htmlFor={f("goal")} className="text-xs text-white/70">Main goal</label>
            <select
              id={f("goal")}
              name="goal"
              defaultValue=""
              className="mt-1 w-full border-b border-white/40 bg-transparent pb-2 text-[15px] text-white outline-none focus:border-white"
            >
              <option value="" disabled className="bg-[#171717]">Choose one</option>
              {GOALS.map((g) => (
                <option key={g} value={g} className="bg-[#171717]">{g}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" disabled={sending} className="swap-btn white justify-center disabled:opacity-60">
          <span className="swap-txt">
            <span>{sending ? "Sending..." : "Get my free audit"}</span>
            <span aria-hidden>{sending ? "Sending..." : "Get my free audit"}</span>
          </span>
        </button>
        {error && (
          <p role="alert" className="anim-fade-up rounded-xl border border-[#ff4246]/40 bg-[#ff4246]/15 px-4 py-3 text-sm text-white">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
