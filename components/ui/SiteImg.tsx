import Image from "next/image";
import type { CSSProperties } from "react";
import type { SiteImage } from "@/lib/images";

// Generated WebP from /public/images, served as-is (already sized and compressed) so the
// src stays a crawlable /images/... URL rather than /_next/image.
export default function SiteImg({ img, className = "", priority = false, sizes, style }: { img: SiteImage; className?: string; priority?: boolean; sizes?: string; style?: CSSProperties }) {
  return <Image src={img.src} alt={img.alt} width={img.width} height={img.height} className={className} priority={priority} sizes={sizes} style={style} unoptimized />;
}
