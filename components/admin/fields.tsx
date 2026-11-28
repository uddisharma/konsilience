"use client";

import { useLayoutEffect, useRef, type ReactNode, type TextareaHTMLAttributes } from "react";

export const inputCls =
  "w-full rounded-lg border border-line bg-black/60 px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-primary";

export function Field({ label, hint, count, max, children }: { label: string; hint?: ReactNode; count?: number; max?: number; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center justify-between text-xs font-semibold text-white/70">
        {label}
        {count !== undefined && max !== undefined && <span className={count > max ? "text-amber-400" : "text-muted"}>{count}/{max}</span>}
      </span>
      {children}
      {hint && <span className="text-[11px] leading-snug text-muted">{hint}</span>}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputCls} ${props.className ?? ""}`} />;
}

export function Select({ value, onChange, options, className = "" }: { value: string; onChange: (v: string) => void; options: (string | [string, string])[]; className?: string }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={`${inputCls} ${className}`}>
      {options.map((o) => {
        const [v, l] = Array.isArray(o) ? o : [o, o];
        return (
          <option key={v} value={v} className="bg-[#111]">
            {l}
          </option>
        );
      })}
    </select>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="flex items-center justify-between gap-3 py-1 text-left text-sm text-white/80">
      {label}
      <span className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${checked ? "bg-primary" : "bg-white/15"}`}>
        <span className={`absolute top-0.5 size-4 rounded-full bg-white transition-all ${checked ? "left-[18px]" : "left-0.5"}`} />
      </span>
    </button>
  );
}

/** Textarea that grows with its content. */
export function AutoTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement> & { textareaRef?: React.RefObject<HTMLTextAreaElement | null> }) {
  const { textareaRef, className, ...rest } = props;
  const local = useRef<HTMLTextAreaElement>(null);
  const ref = textareaRef ?? local;
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight + 2}px`;
  }, [props.value, ref]);
  return <textarea ref={ref} rows={1} {...rest} className={`${inputCls} resize-none overflow-hidden leading-relaxed ${className ?? ""}`} />;
}

/**
 * Textarea with a small toolbar for inline Markdown (bold, italic, code, link).
 * The stored value stays plain Markdown, which the renderer turns into rich text.
 */
export function RichText({ value, onChange, placeholder, className = "" }: { value: string; onChange: (v: string) => void; placeholder?: string; className?: string }) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const wrap = (before: string, after = before, fallback = "text") => {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e } = el;
    const sel = value.slice(s, e) || fallback;
    const next = value.slice(0, s) + before + sel + after + value.slice(e);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + before.length, s + before.length + sel.length);
    });
  };

  const link = () => {
    const href = window.prompt("Link URL (e.g. /services/web-and-mobile-apps or https://...)");
    if (href) wrap("[", `](${href})`, "link text");
  };

  const btn = "grid h-7 min-w-7 place-items-center rounded px-1.5 text-xs text-white/60 hover:bg-white/10 hover:text-white";
  return (
    <div className={`group/rt rounded-lg border border-line bg-black/60 focus-within:border-primary ${className}`}>
      <div className="flex gap-0.5 border-b border-line/60 px-1.5 py-1 opacity-60 transition-opacity group-focus-within/rt:opacity-100">
        <button type="button" className={`${btn} font-bold`} onClick={() => wrap("**")} title="Bold">B</button>
        <button type="button" className={`${btn} italic`} onClick={() => wrap("*")} title="Italic">I</button>
        <button type="button" className={`${btn} line-through`} onClick={() => wrap("~~")} title="Strikethrough">S</button>
        <button type="button" className={`${btn} font-mono`} onClick={() => wrap("`")} title="Inline code">{"</>"}</button>
        <button type="button" className={btn} onClick={link} title="Link">Link</button>
      </div>
      <AutoTextarea
        textareaRef={ref}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="!border-0 !bg-transparent"
        onKeyDown={(e) => {
          if (!(e.metaKey || e.ctrlKey)) return;
          const action = { b: () => wrap("**"), i: () => wrap("*"), k: link }[e.key];
          if (action) {
            e.preventDefault();
            action();
          }
        }}
      />
    </div>
  );
}

export function Button({
  children,
  variant = "ghost",
  className = "",
  ...props
}: React.ComponentProps<"button"> & { variant?: "primary" | "ghost" | "danger" | "outline" }) {
  const v = {
    primary: "bg-primary text-white hover:bg-primary-hover",
    ghost: "text-white/70 hover:bg-white/10 hover:text-white",
    outline: "border border-line text-white/85 hover:border-white/40 hover:text-white",
    danger: "text-red-400 hover:bg-red-500/10",
  }[variant];
  return (
    <button type="button" {...props} className={`inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${v} ${className}`}>
      {children}
    </button>
  );
}

export function Card({ title, children, actions }: { title?: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-card p-5">
      {(title || actions) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="text-sm font-semibold tracking-wide text-white">{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function Notice({ tone = "info", children }: { tone?: "info" | "error" | "success"; children: ReactNode }) {
  const c = { info: "border-primary/40 bg-primary/10", error: "border-red-500/40 bg-red-500/10 text-red-200", success: "border-green-500/40 bg-green-500/10 text-green-200" }[tone];
  return <div className={`rounded-lg border px-3.5 py-2.5 text-sm ${c}`}>{children}</div>;
}
