"use client";

import { useState, type FormEvent } from "react";
import { faqs } from "@/lib/content";
import Icon from "../ui/Icon";
import Reveal, { LineReveal } from "../ui/Reveal";

const budgets = ["Still Evaluating", "Less than $50K", "$50K - $100K", "$100K - $250K", "More than $250K"];

function Field({ id, label, type = "text", required = true }: { id: string; label: string; type?: string; required?: boolean }) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder=" "
        className="peer w-full border-b border-white/40 bg-transparent pt-6 pb-2 text-white outline-none transition-colors focus:border-white"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1 left-0 text-xs text-white/70 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-[15px] peer-focus:top-1 peer-focus:text-xs peer-focus:text-white"
      >
        {label}
        {required && " *"}
      </label>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);
  const [sent, setSent] = useState(false);

  // No backend yet: connect this to an API route or form service.
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="sec bg-black">
      <LineReveal className="h2 wrap-sm text-center !font-extrabold" lines={["Frequently Asked Questions"]} />
      <div className="wrap mt-14 flex flex-col justify-between gap-12 lg:flex-row">
        {/* Accordion */}
        <div className="order-1 lg:w-[52%]">
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <Reveal key={f.q} delay={i * 60} variant="fade">
                <div className="border-b border-line">
                  <button onClick={() => setOpen(on ? -1 : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                    <h3 className="subtitle !text-lg">{f.q}</h3>
                    <span className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${on ? "rotate-180 border-primary bg-primary" : "border-line"}`}>
                      <Icon name={on ? "minus" : "plus"} className="size-4" />
                    </span>
                  </button>
                  <div className={`grid transition-all duration-500 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="fs-base pr-14 pb-6 font-medium text-muted">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Form card */}
        <Reveal variant="right" className="order-2 lg:w-[42%]">
          <div className="rounded-3xl border border-line bg-[linear-gradient(180deg,#031432_0%,#1163fb_100%)] p-7 sm:p-9 lg:sticky lg:top-28">
            {sent ? (
              <div className="anim-fade-up flex min-h-[520px] flex-col items-center justify-center text-center">
                <span className="grid size-20 place-items-center rounded-full bg-white text-primary">
                  <Icon name="check" className="size-10" strokeWidth={2.5} />
                </span>
                <p className="subtitle mt-6 !text-2xl">Thank you!</p>
                <p className="mt-2 text-white/80">A solution architect will reach out within 24 hours.</p>
                <button onClick={() => setSent(false)} className="mt-8 text-sm font-semibold underline underline-offset-4">Send another message</button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-9">
                <div className="flex flex-col gap-3">
                  <p className="subtitle !font-extrabold">Didn&apos;t Find What You Were Looking For?</p>
                  <p className="fs-para font-medium text-white/85">
                    We&apos;ve got more answers waiting for you. If your question didn&apos;t make the list, reach out.
                  </p>
                </div>
                <div className="grid gap-7 sm:grid-cols-2">
                  <Field id="name" label="Name" />
                  <Field id="designation" label="Designation" required={false} />
                  <Field id="phone" label="Contact Number" type="tel" />
                  <Field id="email" label="Work Email" type="email" />
                  <div className="relative sm:col-span-2">
                    <label htmlFor="budget" className="text-xs text-white/70">Budget Range</label>
                    <select id="budget" name="budget" defaultValue="" className="w-full appearance-none border-b border-white/40 bg-transparent pt-1 pb-2 text-white outline-none focus:border-white">
                      <option value="" disabled className="text-black">Select a Budget Range</option>
                      {budgets.map((b) => (
                        <option key={b} className="text-black">{b}</option>
                      ))}
                    </select>
                    <Icon name="chevron" className="pointer-events-none absolute right-0 bottom-3 size-4" />
                  </div>
                  <div className="relative sm:col-span-2">
                    <textarea
                      id="project"
                      name="project"
                      rows={2}
                      required
                      placeholder=" "
                      className="peer w-full resize-none border-b border-white/40 bg-transparent pt-6 pb-2 text-white outline-none focus:border-white"
                    />
                    <label htmlFor="project" className="pointer-events-none absolute top-1 left-0 text-xs text-white/70 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-[15px] peer-focus:top-1 peer-focus:text-xs">
                      Describe Your Project *
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex items-center gap-2 text-xs font-medium text-white/80">
                    <Icon name="lock" className="size-4" /> Fast response · NDA on request
                  </span>
                  <button type="submit" className="swap-btn white justify-center">
                    <span className="swap-txt"><span>Submit</span><span aria-hidden>Submit</span></span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
