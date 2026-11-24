import { siAnthropic, siCrunchbase, siFacebook, siGithub, siGoogle, siGooglegemini, siInstagram, siX, siYoutube } from "simple-icons";

// Monochrome brand marks. simple-icons (CC0) dropped LinkedIn and OpenAI, so those paths are inlined.
const paths: Record<string, string> = {
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.94 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  openai:
    "M22.282 9.821a5.985 5.985 0 0 0-.516-4.911 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.182a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .511 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.041l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.169a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.677l5.815 3.354-2.02 1.169a.076.076 0 0 1-.071 0l-4.83-2.787A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z",
  anthropic: siAnthropic.path,
  gemini: siGooglegemini.path,
  x: siX.path,
  instagram: siInstagram.path,
  youtube: siYoutube.path,
  github: siGithub.path,
  facebook: siFacebook.path,
  google: siGoogle.path,
  crunchbase: siCrunchbase.path,
  // Not in simple-icons: simple monogram badges (rounded square with a letter cut out).
  goodfirms:
    "M4 0h16a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4Zm8.2 5.5c-3.7 0-6.5 2.8-6.5 6.5s2.8 6.5 6.4 6.5c2.1 0 3.9-.8 5.1-2.2v-5h-5.4v2.5h2.6v1.5a3.8 3.8 0 0 1-2.3.7c-2.1 0-3.6-1.7-3.6-4s1.5-4 3.7-4c1.2 0 2.2.5 2.9 1.3l2-1.8a6.6 6.6 0 0 0-4.9-2Z",
  clutch:
    "M4 0h16a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4Zm8.3 5.5C8.6 5.5 6 8.3 6 12s2.6 6.5 6.3 6.5c2 0 3.6-.8 4.7-2l-1.9-1.9c-.7.7-1.6 1.2-2.8 1.2-2 0-3.5-1.6-3.5-3.8s1.5-3.8 3.5-3.8c1.1 0 2 .4 2.7 1.1L17 7.4a6.3 6.3 0 0 0-4.7-1.9Zm.1 4.9a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z",
};

export type BrandName = keyof typeof paths;

export default function BrandIcon({ name, className = "size-4", title }: { name: BrandName; className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 24 24" fillRule={name === "goodfirms" || name === "clutch" ? "evenodd" : undefined} className={`fill-current ${className}`} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <path d={paths[name]} />
    </svg>
  );
}
