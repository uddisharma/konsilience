import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { parseInline, safeHref, type InlineToken } from "@/lib/blog/inline";

const LINK = "text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white";

function render(tokens: InlineToken[], key = ""): ReactNode[] {
  return tokens.map((t, i) => {
    const k = `${key}${i}`;
    switch (t.t) {
      case "text":
        return <Fragment key={k}>{t.v}</Fragment>;
      case "br":
        return <br key={k} />;
      case "code":
        return (
          <code key={k} className="rounded-md border border-line bg-white/5 px-1.5 py-0.5 font-mono text-[0.9em] text-white">
            {t.v}
          </code>
        );
      case "strong":
        return <strong key={k} className="font-semibold text-white">{render(t.c, `${k}-`)}</strong>;
      case "em":
        return <em key={k}>{render(t.c, `${k}-`)}</em>;
      case "del":
        return <del key={k}>{render(t.c, `${k}-`)}</del>;
      case "link": {
        const href = safeHref(t.href);
        if (!href) return <Fragment key={k}>{render(t.c, `${k}-`)}</Fragment>;
        if (/^https?:\/\//i.test(href))
          return (
            <a key={k} href={href} target="_blank" rel="noopener noreferrer" className={LINK}>
              {render(t.c, `${k}-`)}
            </a>
          );
        return (
          <Link key={k} href={href} className={LINK}>
            {render(t.c, `${k}-`)}
          </Link>
        );
      }
    }
  });
}

/** Renders inline Markdown (bold, italic, code, links) as React elements. */
export default function Inline({ text }: { text: string | undefined }) {
  return <>{text ? render(parseInline(text)) : null}</>;
}
