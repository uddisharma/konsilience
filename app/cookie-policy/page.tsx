import type { Metadata } from "next";
import LegalPage from "@/components/page/LegalPage";
import { siteUrl } from "@/lib/routes";

// NEEDS_CONFIRMATION: legal wording to be reviewed by a lawyer or CA (docs/OPEN_QUESTIONS.md).
// Keep this list in sync with lib/consent.ts, lib/utm.ts, lib/popups.ts and the third-party loaders.
export const metadata: Metadata = {
  title: "Cookie Policy | Konsilience",
  description: "The cookies and similar storage used on konsilience.tech, what each is for, and how to change your choices at any time.",
  alternates: { canonical: `${siteUrl}/cookie-policy` },
};

export default function CookiePage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="November 17, 2026"
      sections={[
        { h: "What This Covers", p: ["Cookies are small files a website stores in your browser. This policy also covers similar storage (local and session storage) and the third-party services this site loads."] },
        {
          h: "Your Choices",
          p: [
            "On your first visit a banner lets you accept or reject non-essential cookies, or choose by category. You can change your choice at any time with the “Cookie settings” link in the footer of every page.",
            "If you are in the EU/EEA, the UK or Switzerland, nothing non-essential loads until you accept it. Elsewhere, analytics and the chat, map and calendar widgets are on by default and you can switch them off.",
            "Whatever you choose, if you click to open the chat, book a call or show the map, that service loads because you asked for it.",
          ],
        },
        {
          h: "Essential (Always On)",
          p: [
            "kn_consent (local storage): remembers your cookie choice until you change it or clear your browser.",
            "kn_region (session storage): whether opt-in rules apply to you. Your country is looked up from your connection by our host and only the result is kept. Cleared when you close the tab.",
            "kn_attribution (session storage): the page you arrived on, the referring site and any campaign tags (UTM), attached to forms you send so we know how you found us. Cleared when you close the tab.",
            "contact_modal_dismissed (session storage): stops the “Have a project in mind?” prompt from showing again. Cleared when you close the tab.",
            "Cloudflare Turnstile checks form submissions for spam. In our tests it set no cookies.",
          ],
        },
        {
          h: "Analytics (Your Choice)",
          p: ["Google Analytics 4 sets the cookies _ga and _ga_<ID> (up to 2 years) to count visits and see which pages, campaigns and buttons lead to enquiries. We do not use advertising features. If you switch analytics off, these cookies are deleted."],
        },
        {
          h: "Chat, Maps and Calendars (Your Choice)",
          p: [
            "tawk.to live chat sets twk_idm_key and TawkConnectionTime (both cleared when you close your browser) and twk_uuid_<ID> (about six months), so it can recognise you between pages and visits.",
            "Calendly shows our booking calendar and pop-up. Calendly sets cookies such as __cf_bm and _cfuvid (Cloudflare bot protection) and OptanonConsent (its own record of your consent).",
            "The booking calendar and our office map can also set Google cookies such as _GRECAPTCHA when they load.",
          ],
        },
        { h: "Managing Cookies in Your Browser", p: ["You can also block or delete cookies in your browser settings. Blocking essential storage may stop parts of the site, such as forms, from working."] },
        { h: "Changes", p: ["We update this policy when the cookies or services on the site change. The date above shows the latest version."] },
      ]}
    />
  );
}
