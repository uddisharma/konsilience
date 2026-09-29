import type { Metadata } from "next";
import { Barlow_Condensed, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import ThemePicker from "@/components/ThemePicker";
import { brand } from "@/lib/content";
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

export const metadata: Metadata = {
  title: {
    default: `${brand.name} | AI-First Digital Engineering Company`,
    template: `%s | ${brand.name}`,
  },
  description:
    "Konsilience brings strategy, design, engineering and AI together to build secure, scalable digital systems for startups and enterprises.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${barlow.variable}`} suppressHydrationWarning>
      <body>
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
