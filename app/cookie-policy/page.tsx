import type { Metadata } from "next";
import LegalPage from "@/components/page/LegalPage";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiePage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="September 1, 2026"
      sections={[
        { h: "What Are Cookies", p: ["Cookies are small text files stored on your device when you visit a website. They help the site work and provide information to its owners."] },
        { h: "Cookies We Use", p: ["Strictly necessary cookies that make the site work.", "Analytics cookies that help us understand how visitors use the site.", "Marketing cookies, only with your consent, to measure campaigns."] },
        { h: "Managing Cookies", p: ["You can control and delete cookies through your browser settings. Blocking some cookies may affect how the site works."] },
        { h: "Changes", p: ["We may update this Cookie Policy. Please check this page periodically."] },
      ]}
    />
  );
}
