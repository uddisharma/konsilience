"use client";

import { useState, type FormEvent } from "react";
import { honeypotProps, submitForm } from "@/lib/submitForm";
import Icon from "../ui/Icon";

const input = "w-full rounded-xl border border-white/25 bg-white/5 px-4 py-3.5 text-white outline-none transition-colors placeholder:text-white/50 focus:border-white";
const MAX_CV_MB = 5;

// Job application form. Emailed (with the CV attached) to the sales inbox via /api/contact.
export default function ApplyForm({ role }: { role: string }) {
  const [file, setFile] = useState("");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cv = (e.currentTarget.elements.namedItem("cv") as HTMLInputElement).files?.[0];
    if (cv && cv.size > MAX_CV_MB * 1024 * 1024) return setError(`CV must be ${MAX_CV_MB} MB or smaller.`);
    setSending(true);
    setError("");
    const res = await submitForm(e.currentTarget, "application", { role });
    setSending(false);
    if (res.ok) setDone(true);
    else setError(res.error);
  };

  if (done)
    return (
      <div className="anim-fade-up flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-line bg-[linear-gradient(180deg,rgb(var(--brand-deep-rgb))_0%,rgb(var(--brand-strong-rgb))_100%)] p-9 text-center">
        <span className="grid size-20 place-items-center rounded-full bg-white text-primary">
          <Icon name="check" className="size-10" strokeWidth={2.5} />
        </span>
        <p className="subtitle mt-6 !text-2xl">Application received!</p>
        <p className="mt-2 text-white/80">Our team will review it and get back to you within 5 working days.</p>
      </div>
    );

  return (
    <form onSubmit={submit} className="relative flex flex-col gap-4 rounded-3xl border border-line bg-[linear-gradient(180deg,rgb(var(--brand-deep-rgb))_0%,rgb(var(--brand-strong-rgb))_100%)] p-7 sm:p-9">
      <input {...honeypotProps} />
      <p className="subtitle !font-extrabold">Apply for {role}</p>
      <input required name="name" placeholder="Full name *" className={input} />
      <input required name="email" type="email" placeholder="Email *" className={input} />
      <input name="phone" type="tel" placeholder="Phone" className={input} />
      <input name="linkedin" type="url" placeholder="LinkedIn / Portfolio / Showreel URL" className={input} />
      <label className={`${input} flex cursor-pointer items-center gap-3 border-dashed`}>
        <Icon name="download" className="size-5 rotate-180" />
        <span className="truncate text-white/70">{file || `Upload CV (PDF or Word, max ${MAX_CV_MB} MB) *`}</span>
        <input required name="cv" type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(e) => setFile(e.target.files?.[0]?.name ?? "")} />
      </label>
      <textarea name="note" rows={3} placeholder="Why do you want to join us?" className={`${input} resize-none`} />
      {error && (
        <p role="alert" className="anim-fade-up rounded-xl border border-[#ff4246]/40 bg-[#ff4246]/15 px-4 py-3 text-sm text-white">
          {error}
        </p>
      )}
      <button type="submit" disabled={sending} className="swap-btn white mt-2 justify-center disabled:opacity-60">
        <span className="swap-txt">
          <span>{sending ? "Sending..." : "Submit Application"}</span>
          <span aria-hidden>{sending ? "Sending..." : "Submit Application"}</span>
        </span>
      </button>
    </form>
  );
}
