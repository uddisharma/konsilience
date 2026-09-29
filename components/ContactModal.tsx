"use client";

import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import Icon from "./ui/Icon";
import { brand } from "@/lib/content";

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the modal was already dismissed in this browser session
    const dismissed = sessionStorage.getItem("contact_modal_dismissed");
    if (dismissed) return;

    // Show modal automatically after 10 seconds (10,000 ms) on home page
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    sessionStorage.setItem("contact_modal_dismissed", "true");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4 sm:p-6 backdrop-blur-md anim-fade-up overflow-y-auto no-scrollbar"
      onClick={closeModal}
      data-lenis-prevent
    >
      <div
        className="relative my-auto w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-3xl border border-line bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          aria-label="Close project modal"
          className="absolute top-5 right-5 z-30 grid size-10 place-items-center rounded-full border border-white/20 bg-black/60 text-white/80 transition-colors hover:bg-white hover:text-black"
        >
          <Icon name="close" className="size-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Side: Content & Value Props */}
          <div className="lg:col-span-5 flex flex-col justify-between border-b border-line lg:border-b-0 lg:border-r border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0.5)_100%)] p-7 sm:p-10">
            <div className="flex flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="size-2 rounded-full bg-primary animate-pulse" />
                Let's Build Together
              </span>

              <h2 className="h2 font-condensed text-3xl sm:text-4xl font-semibold uppercase tracking-tight text-white leading-tight">
                Have a Project in Mind?
              </h2>

              <p className="text-sm text-white/80 leading-relaxed">
                Partner with an AI-first digital engineering studio. We turn complex ideas into high-performing SaaS platforms, web applications, and autonomous AI systems.
              </p>

              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-start gap-3.5">
                  <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary border border-primary/20">
                    <Icon name="check" className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">24-Hour SLA Response</h4>
                    <p className="text-xs text-white/60">Fast initial review and technical scoping from senior engineers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary border border-primary/20">
                    <Icon name="lock" className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">NDA & IP Protection</h4>
                    <p className="text-xs text-white/60">Mutual non-disclosure agreements upfront to safeguard your ideas.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary border border-primary/20">
                    <Icon name="spark" className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Senior Product Team</h4>
                    <p className="text-xs text-white/60">Direct collaboration with experienced software and AI architects.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-2 text-xs text-white/70">
              <p className="font-mono text-white/50 uppercase tracking-wider text-[11px]">Get in Touch</p>
              <div className="flex items-center gap-2">
                <Icon name="mail" className="size-4 text-primary" />
                <a href={`mailto:${brand.email}`} className="hover:text-white transition-colors">{brand.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="phone" className="size-4 text-primary" />
                <a href={`tel:${brand.phoneHref}`} className="hover:text-white transition-colors">{brand.phone}</a>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-7 bg-[linear-gradient(180deg,rgb(var(--brand-deep-rgb))_0%,rgb(var(--brand-strong-rgb))_100%)]">
            <ContactForm
              title="Send Project Details"
              text="Fill in your project details below to receive a custom roadmap and estimate."
              className="border-none shadow-none rounded-none p-7 sm:p-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
