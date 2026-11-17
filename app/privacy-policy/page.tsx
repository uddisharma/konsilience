import type { Metadata } from "next";
import LegalPage from "@/components/page/LegalPage";
import { brand } from "@/lib/content";
import { siteUrl } from "@/lib/routes";
import { registeredOfficeLine, siteConfig } from "@/site.config";

// NEEDS_CONFIRMATION: legal wording to be reviewed by a lawyer or CA (docs/OPEN_QUESTIONS.md).
export const metadata: Metadata = {
  title: "Privacy Policy | Konsilience",
  description: "How Konsilience collects, uses and protects personal information on this website, including forms, chat, bookings and analytics.",
  alternates: { canonical: `${siteUrl}/privacy-policy` },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="November 17, 2026"
      sections={[
        { h: "Introduction", p: [`This Privacy Policy explains how ${siteConfig.company.legalName} ("${brand.name}", "we", "us") collects, uses and protects personal information when you visit our website or use our services.`, `Registered office: ${registeredOfficeLine}. Contact: ${brand.email}.`] },
        { h: "Information We Collect", p: ["Information you give us: your name, email, phone number, company, website and project details when you fill in a form, book a call or chat with us.", "Information collected automatically: IP address, browser and device type, pages visited, and the campaign tags or referring site that brought you here. See our Cookie Policy for the cookies and similar storage involved."] },
        { h: "How We Use Information", p: ["To respond to enquiries, run audits and calls you request, prepare proposals and deliver services.", "To understand which pages and campaigns bring enquiries (only with analytics consent where the law requires it), to keep forms free of spam, and to meet legal obligations."] },
        {
          h: "Service Providers We Use",
          p: [
            "Vercel hosts this website and processes technical request data, such as IP addresses, to serve pages.",
            "Form submissions are sent to our sales inbox by email through our email provider.",
            "Cloudflare Turnstile checks form submissions for spam. Cloudflare processes technical data, such as IP address and browser signals, to tell people from bots.",
            "tawk.to provides live chat. Messages you send in the chat, and the details you enter, are stored by tawk.to so we can reply.",
            "Calendly provides call booking. The details you enter when booking are stored by Calendly and shared with us.",
            "Google Analytics 4 measures website use, only with your consent where the law requires it. Google Maps shows our office map when you choose to load it, or by default where consent is not required.",
          ],
        },
        { h: "Sharing of Information", p: ["We do not sell personal information. We share it only with the service providers above, under their terms, or where required by law."] },
        { h: "Data Retention", p: ["We keep personal information only as long as necessary for the purposes described, or as required by law."] },
        { h: "Your Rights and Choices", p: ["Depending on where you live (for example under the GDPR, UK GDPR, India's DPDP Act or US state laws), you may have rights to access, correct, delete or restrict the use of your data. Email us to exercise them.", "You can change your cookie choices at any time with the “Cookie settings” link in the footer of every page."] },
        { h: "Security", p: ["We use technical and organisational measures, including encryption in transit and access controls, to protect personal information."] },
        { h: "Changes to This Policy", p: ["We may update this policy from time to time. The latest version will always be available on this page."] },
      ]}
    />
  );
}
