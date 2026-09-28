import type { Metadata } from "next";
import LegalPage from "@/components/page/LegalPage";
import { brand } from "@/lib/content";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="September 1, 2026"
      sections={[
        { h: "Introduction", p: [`This Privacy Policy explains how ${brand.name} ("we", "us") collects, uses and protects personal information when you visit our website or use our services.`] },
        { h: "Information We Collect", p: ["Information you provide, such as your name, email, phone number, company and project details submitted through our forms.", "Information collected automatically, such as IP address, browser type, pages visited and cookies."] },
        { h: "How We Use Information", p: ["To respond to enquiries, provide proposals and deliver services.", "To improve our website, send updates you have opted into, and meet legal obligations."] },
        { h: "Sharing of Information", p: ["We do not sell personal information. We share it only with service providers who help us operate, under confidentiality obligations, or where required by law."] },
        { h: "Data Retention", p: ["We keep personal information only as long as necessary for the purposes described, or as required by law."] },
        { h: "Your Rights", p: ["Depending on your location (e.g. GDPR, CCPA), you may have rights to access, correct, delete or restrict the use of your data. Contact us to exercise them."] },
        { h: "Security", p: ["We use technical and organisational measures, including encryption and access controls, to protect personal information."] },
        { h: "Changes to This Policy", p: ["We may update this policy from time to time. The latest version will always be available on this page."] },
      ]}
    />
  );
}
