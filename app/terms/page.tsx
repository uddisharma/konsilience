import type { Metadata } from "next";
import LegalPage from "@/components/page/LegalPage";
import { brand } from "@/lib/content";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="September 1, 2026"
      sections={[
        { h: "Acceptance of Terms", p: [`By accessing or using the ${brand.name} website, you agree to these Terms & Conditions. If you do not agree, please do not use the site.`] },
        { h: "Use of the Website", p: ["You may use this website for lawful purposes only. You must not attempt to disrupt, damage or gain unauthorised access to it."] },
        { h: "Intellectual Property", p: [`All content on this site, including text, graphics, logos and code, is owned by or licensed to ${brand.name} and protected by intellectual property laws.`] },
        { h: "Services", p: ["Any services we provide are governed by a separate written agreement, which prevails over these terms in case of conflict."] },
        { h: "Third-Party Links", p: ["Our website may link to third-party sites. We are not responsible for their content or practices."] },
        { h: "Limitation of Liability", p: ["To the maximum extent permitted by law, we are not liable for indirect or consequential losses arising from the use of this website."] },
        { h: "Governing Law", p: ["These terms are governed by the laws of the jurisdiction in which Konsilience is registered, unless otherwise agreed in writing."] },
      ]}
    />
  );
}
