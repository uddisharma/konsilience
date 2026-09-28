"use client";

import type { ElementType, ReactNode } from "react";
import { useInView } from "./useInView";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "right" | "zoom" | "fade";
};

// Fades/slides its children in the first time they scroll into view.
export default function Reveal({ children, as: Tag = "div", className = "", delay = 0, variant = "up" }: Props) {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  return (
    <Tag
      ref={ref}
      data-variant={variant}
      data-shown={inView || undefined}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

// Heading whose lines slide up from behind a mask, one after another.
export function LineReveal({
  lines,
  as: Tag = "h2",
  className = "",
  lineClassName = "",
  delay = 0,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const [ref, inView] = useInView<HTMLElement>(0.3);
  return (
    <Tag ref={ref} data-shown={inView || undefined} className={className}>
      {lines.map((l, i) => (
        <span key={i} className={`lr-line ${lineClassName}`}>
          <span className="lr-inner" style={{ transitionDelay: `${delay + i * 110}ms` }}>
            {l}
          </span>
        </span>
      ))}
    </Tag>
  );
}
