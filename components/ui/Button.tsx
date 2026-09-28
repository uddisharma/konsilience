import type { ReactNode } from "react";
import Link from "next/link";

const Arrow = () => (
  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4.5 13.5 13.5 4.5M6 4.5h7.5V12" />
  </svg>
);

// Pill button whose label rolls up and whose arrow flies out on hover.
export default function Button({
  children,
  href = "/contact",
  variant = "primary",
  icon = true,
  className = "",
  onClick,
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "white" | "outline" | "ghost" | "blue-outline";
  icon?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const inner = (
    <>
      <span className="swap-txt">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
      {icon && (
        <span className="swap-ico">
          <Arrow />
          <Arrow />
        </span>
      )}
    </>
  );
  if (onClick)
    return (
      <button type="button" onClick={onClick} className={`swap-btn ${variant} ${className}`}>
        {inner}
      </button>
    );
  if (href.startsWith("/"))
    return (
      <Link href={href} className={`swap-btn ${variant} ${className}`}>
        {inner}
      </Link>
    );
  const external = href.startsWith("http");
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={`swap-btn ${variant} ${className}`}>
      {inner}
    </a>
  );
}
