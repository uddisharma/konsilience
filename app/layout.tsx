import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import SmoothScroll from "@/components/SmoothScroll";
import ThemePicker from "@/components/ThemePicker";
import { brand } from "@/lib/content";
import { siteUrl } from "@/lib/routes";
import { themeBootScript } from "@/lib/theme";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.name} | AI-First Digital Engineering & Product Studio`,
    template: `%s | ${brand.name}`,
  },
  description:
    "Konsilience brings strategy, human-centered design, software engineering, and AI together to build secure, scalable digital systems, SaaS platforms, and autonomous AI agents for startups and enterprises.",
  keywords: [
    "AI Digital Engineering",
    "AI Product Studio",
    "SaaS Platform Development",
    "Custom AI Agent Development",
    "LLM Integration & Fine-Tuning",
    "Full Stack Software Development Studio",
    "Mobile App Engineering",
    "AI Observability Platform",
    "Trasys AI",
    "CTO as a Service",
    "Digital Transformation Agency",
    "Mohali Software Studio",
    "Konsilience Tech",
  ],
  authors: [{ name: "Konsilience", url: siteUrl }],
  creator: brand.name,
  publisher: brand.name,
  category: "Technology & Software Engineering",
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: brand.name,
    title: `${brand.name} | AI-First Digital Engineering & Product Studio`,
    description:
      "Build secure, scalable SaaS platforms, mobile apps, and custom agentic AI systems with senior engineers at Konsilience.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${brand.name} - AI-First Digital Engineering & Product Studio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} | AI-First Digital Engineering Studio`,
    description:
      "Senior software and AI engineering studio building SaaS platforms, custom AI agents, and mobile applications.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@konsilience",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo-white.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${barlow.variable}`} suppressHydrationWarning>
      <body>
        <JsonLd />
        {/* Re-applies a saved brand colour before first paint */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        {/* Colour tester: remove once the brand colour is final */}
        <ThemePicker />
      </body>
    </html>
  );
}
