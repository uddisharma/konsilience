"use client";

import { useState, type FormEvent } from "react";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";

// Newsletter signup banner. No backend yet: wire `submit` to your email provider.
export default function Newsletter() {
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };
  return (
    <section className="sec bg-black">
      <Reveal variant="zoom" className="wrap">
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-line bg-card p-8 sm:p-12 lg:flex-row lg:items-center">
          <div>
            <p className="h3 font-semibold">Insights, delivered monthly.</p>
            <p className="fs-base mt-2 font-medium text-muted">Engineering, AI and product playbooks from our team. No spam.</p>
          </div>
          {done ? (
            <p className="anim-fade-up flex items-center gap-3 font-semibold text-primary">
              <Icon name="check" className="size-5" strokeWidth={2.5} /> You&apos;re subscribed!
            </p>
          ) : (
            <form onSubmit={submit} className="flex w-full max-w-md overflow-hidden rounded-full border border-line bg-black focus-within:border-primary">
              <input type="email" required placeholder="Your work email" className="min-w-0 flex-1 bg-transparent px-5 py-4 text-sm outline-none" />
              <button type="submit" className="m-1.5 rounded-full bg-primary px-6 text-sm font-semibold transition-colors hover:bg-primary-hover">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
