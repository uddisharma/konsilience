"use client";

import { useState, type FormEvent } from "react";
import Icon from "../ui/Icon";

const input = "w-full rounded-xl border border-white/25 bg-white/5 px-4 py-3.5 text-white outline-none transition-colors placeholder:text-white/50 focus:border-white";

// Job application form. No backend yet: send to your ATS or an API route.
export default function ApplyForm({ role }: { role: string }) {
  const [file, setFile] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  if (done)
    return (
      <div className="anim-fade-up flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-line bg-[linear-gradient(180deg,#031432_0%,#1163fb_100%)] p-9 text-center">
        <span className="grid size-20 place-items-center rounded-full bg-white text-primary">
          <Icon name="check" className="size-10" strokeWidth={2.5} />
        </span>
        <p className="subtitle mt-6 !text-2xl">Application received!</p>
        <p className="mt-2 text-white/80">Our talent team will review it and get back to you within 5 working days.</p>
      </div>
    );

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 rounded-3xl border border-line bg-[linear-gradient(180deg,#031432_0%,#1163fb_100%)] p-7 sm:p-9">
      <p className="subtitle !font-extrabold">Apply for {role}</p>
      <input required name="name" placeholder="Full name *" className={input} />
      <input required name="email" type="email" placeholder="Email *" className={input} />
      <input name="phone" type="tel" placeholder="Phone" className={input} />
      <input name="linkedin" type="url" placeholder="LinkedIn / Portfolio URL" className={input} />
      <label className={`${input} flex cursor-pointer items-center gap-3 border-dashed`}>
        <Icon name="download" className="size-5 rotate-180" />
        <span className="truncate text-white/70">{file || "Upload CV (PDF, max 5 MB) *"}</span>
        <input required type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(e) => setFile(e.target.files?.[0]?.name ?? "")} />
      </label>
      <textarea name="note" rows={3} placeholder="Why do you want to join us?" className={`${input} resize-none`} />
      <button type="submit" className="swap-btn white mt-2 justify-center">
        <span className="swap-txt"><span>Submit Application</span><span aria-hidden>Submit Application</span></span>
      </button>
    </form>
  );
}
