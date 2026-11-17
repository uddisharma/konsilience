"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { submitForm } from "@/lib/submitForm";
import { Field } from "./ContactForm";
import FormGuard from "./FormGuard";

// Trasys AI early-access / design-partner application. Sent to the sales inbox as type "design_partner".
export default function DesignPartnerForm(): ReactNode {
  // React ids look like ":r1:"; strip the colons so they are safe inside element ids.
  const uid = useId().replaceAll(":", "");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const f = (name: string): string => `${uid}-${name}`;

  const submit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSending(true);
    setError("");
    const res = await submitForm(e.currentTarget, "design_partner");
    if (res.ok) setDone(true);
    else setError(res.error);
    setSending(false);
  };

  if (done) {
    return (
      <div role="status" className="rounded-3xl border border-line bg-card p-8 text-center">
        <p className="subtitle">Thanks, we have your application.</p>
        {/* NEEDS_CONFIRMATION: "one business day" is a reply-time promise (docs/OPEN_QUESTIONS.md). */}
        <p className="fs-para mt-3 font-medium text-white/75">We reply within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative flex flex-col gap-8 rounded-3xl border border-line bg-card p-7 sm:p-9">
      <FormGuard action="design_partner" />
      <div className="grid gap-7 sm:grid-cols-2">
        <Field id={f("name")} label="Name" />
        <Field id={f("email")} label="Work email" type="email" />
        <Field id={f("company")} label="Company" />
        <Field id={f("role")} label="Your role" required={false} />
      </div>
      <div className="relative">
        <textarea
          id={f("use_case")}
          name="use_case"
          rows={3}
          required
          placeholder=" "
          className="peer w-full resize-none border-b border-white/40 bg-transparent pt-6 pb-2 text-white outline-none focus:border-white"
        />
        <label
          htmlFor={f("use_case")}
          className="pointer-events-none absolute top-1 left-0 text-xs text-white/70 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-[15px] peer-focus:top-1 peer-focus:text-xs"
        >
          Which AI or LLM apps do you run, and what would you monitor? *
        </label>
      </div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xs font-medium text-white/80">Free while we are in early access.</span>
        <button type="submit" disabled={sending} className="swap-btn white justify-center disabled:opacity-60">
          <span className="swap-txt">
            <span>{sending ? "Sending..." : "Apply"}</span>
            <span aria-hidden>{sending ? "Sending..." : "Apply"}</span>
          </span>
        </button>
      </div>
      {error && (
        <p role="alert" className="anim-fade-up rounded-xl border border-[#ff4246]/40 bg-[#ff4246]/15 px-4 py-3 text-sm text-white">
          {error}
        </p>
      )}
    </form>
  );
}
