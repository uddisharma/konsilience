"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { honeypotProps, submitForm } from "@/lib/submitForm";
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

function BudgetSelect({
  id,
  budgets,
  value,
  onChange,
}: {
  id: string;
  budgets: string[];
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative sm:col-span-2">
      <input type="hidden" id={id} name="budget" value={value} />
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between border-b border-white/40 bg-transparent pt-6 pb-2 text-left text-white outline-none transition-colors focus:border-white"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className={value ? "text-white text-[15px]" : "text-white/60 text-[15px]"}>
          {value || "Select a Budget Range"}
        </span>
        <Icon
          name="chevron"
          className={`size-4 text-white/70 transition-transform duration-200 ${open ? "rotate-180 text-white" : ""}`}
        />
      </button>
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 text-xs text-white/70 transition-all ${value || open ? "top-1 text-xs text-white" : "top-5 text-[15px] text-white/70 opacity-0"
          }`}
      >
        Budget Range
      </label>

      {open && (
        <div
          role="listbox"
          className="anim-fade-up absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-y-auto no-scrollbar rounded-2xl border border-white/20 bg-[#171717] p-2 shadow-2xl backdrop-blur-xl"
        >
          {budgets.map((b) => (
            <button
              key={b}
              type="button"
              role="option"
              aria-selected={value === b}
              onClick={() => {
                onChange(b);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${value === b ? "bg-primary text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
            >
              <span>{b}</span>
              {value === b && <Icon name="check" className="size-4 text-white" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Brand-gradient lead form card. Submissions are emailed to the sales inbox via /api/contact.
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
  const [error, setError] = useState("");
  const [budget, setBudget] = useState("");
  const f = (name: string) => `${uid}-${name}`;

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");
    const res = await submitForm(e.currentTarget, "contact");
    if (res.ok) router.push("/thank-you");
    else {
      setError(res.error);
      setSending(false);
    }
  };

  return (
    <div className={`rounded-3xl border border-line bg-[linear-gradient(180deg,rgb(var(--brand-deep-rgb))_0%,rgb(var(--brand-strong-rgb))_100%)] p-7 sm:p-9 ${className}`}>
      <form onSubmit={submit} className="relative flex flex-col gap-9">
        <input {...honeypotProps} />
        <div className="flex flex-col gap-3">
          <p className="subtitle !font-extrabold">{title}</p>
          <p className="fs-para font-medium text-white/85">{text}</p>
        </div>
        <div className="grid gap-7 sm:grid-cols-2">
          <Field id={f("name")} label="Name" />
          <Field id={f("designation")} label="Designation" required={false} />
          <Field id={f("phone")} label="Contact Number" type="tel" />
          <Field id={f("email")} label="Work Email" type="email" />
          <BudgetSelect id={f("budget")} budgets={budgets} value={budget} onChange={setBudget} />
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
        {error && (
          <p role="alert" className="anim-fade-up rounded-xl border border-[#ff4246]/40 bg-[#ff4246]/15 px-4 py-3 text-sm text-white">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
