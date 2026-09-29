"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Icon from "./ui/Icon";

const budgets = ["Still Evaluating", "Less than $50K", "$50K - $100K", "$100K - $250K", "More than $250K"];

function Field({ id, label, type = "text", required = true }: { id: string; label: string; type?: string; required?: boolean }) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id.split("-").pop()}
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

// Blue-gradient lead form card. No backend yet: connect `submit` to an API route or form service.
export default function ContactForm({
  title = "Didn't Find What You Were Looking For?",
  text = "We've got more answers waiting for you. If your question didn't make the list, reach out.",
  className = "",
}: {
  title?: string;
  text?: string;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const f = (name: string) => `${uid}-${name}`;

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    router.push("/thank-you");
  };

  return (
    <div className={`rounded-3xl border border-line bg-[linear-gradient(180deg,rgb(var(--brand-deep-rgb))_0%,rgb(var(--brand-strong-rgb))_100%)] p-7 sm:p-9 ${className}`}>
      <form onSubmit={submit} className="flex flex-col gap-9">
        <div className="flex flex-col gap-3">
          <p className="subtitle !font-extrabold">{title}</p>
          <p className="fs-para font-medium text-white/85">{text}</p>
        </div>
        <div className="grid gap-7 sm:grid-cols-2">
          <Field id={f("name")} label="Name" />
          <Field id={f("designation")} label="Designation" required={false} />
          <Field id={f("phone")} label="Contact Number" type="tel" />
          <Field id={f("email")} label="Work Email" type="email" />
          <div className="relative sm:col-span-2">
            <label htmlFor={f("budget")} className="text-xs text-white/70">Budget Range</label>
            <select id={f("budget")} name="budget" defaultValue="" className="w-full appearance-none border-b border-white/40 bg-transparent pt-1 pb-2 text-white outline-none focus:border-white">
              <option value="" disabled className="text-black">Select a Budget Range</option>
              {budgets.map((b) => (
                <option key={b} className="text-black">{b}</option>
              ))}
            </select>
            <Icon name="chevron" className="pointer-events-none absolute right-0 bottom-3 size-4" />
          </div>
          <div className="relative sm:col-span-2">
            <textarea
              id={f("project")}
              name="project"
              rows={2}
              required
              placeholder=" "
              className="peer w-full resize-none border-b border-white/40 bg-transparent pt-6 pb-2 text-white outline-none focus:border-white"
            />
            <label htmlFor={f("project")} className="pointer-events-none absolute top-1 left-0 text-xs text-white/70 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-[15px] peer-focus:top-1 peer-focus:text-xs">
              Describe Your Project *
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2 text-xs font-medium text-white/80">
            <Icon name="lock" className="size-4" /> Fast response · NDA on request
          </span>
          <button type="submit" disabled={sending} className="swap-btn white justify-center disabled:opacity-60">
            <span className="swap-txt">
              <span>{sending ? "Sending..." : "Submit"}</span>
              <span aria-hidden>{sending ? "Sending..." : "Submit"}</span>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
