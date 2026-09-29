import type { MetadataRoute } from "next";
import { brand } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${brand.name} | AI-First Digital Engineering`,
    short_name: brand.name,
    description: brand.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/logo-white.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
