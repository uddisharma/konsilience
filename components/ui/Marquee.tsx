import type { ReactNode } from "react";

// Infinite horizontal scroller. Content is rendered twice so the -50% loop is seamless.
export default function Marquee({
  children,
  duration = 40,
  reverse = false,
  fadeEdges = false,
  pauseOnHover = true,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  fadeEdges?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`marquee ${fadeEdges ? "fade-edges" : ""} ${className}`}
      data-reverse={reverse || undefined}
      data-pause={pauseOnHover || undefined}
      style={{ "--duration": `${duration}s` } as React.CSSProperties}
    >
      <div className="marquee-track">
        <div className="flex shrink-0 items-stretch">{children}</div>
        <div className="flex shrink-0 items-stretch" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
