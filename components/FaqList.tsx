"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";

function renderFaqText(text: string) {
  const parts: (string | React.ReactNode)[] = [];
  const regex = /\[(.*?)\]\((.*?)\)/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const [, label, href] = match;
    parts.push(
      <Link key={match.index} href={href} className="text-primary underline decoration-primary/40 underline-offset-4 hover:text-white transition-colors">
        {label}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

// Accordion of question/answer pairs; one item open at a time.
export default function FaqList({ items, className = "" }: { items: { q: string; a: string }[]; className?: string }) {
  const [open, setOpen] = useState(0);
  return (
    <div className={className}>
      {items.map((f, i) => {
        const on = open === i;
        return (
          <Reveal key={f.q} delay={Math.min(i, 8) * 60} variant="fade">
            <div className="border-b border-line">
              <button onClick={() => setOpen(on ? -1 : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                <h3 className="subtitle !text-lg">{f.q}</h3>
                <span className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${on ? "rotate-180 border-primary bg-primary" : "border-line"}`}>
                  <Icon name={on ? "minus" : "plus"} className="size-4" />
                </span>
              </button>
              <div className={`grid transition-all duration-500 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="fs-base pr-14 pb-6 font-medium text-muted">{renderFaqText(f.a)}</p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
