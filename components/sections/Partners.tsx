import {
  siAnthropic,
  siAtlassian,
  siCloudflare,
  siCloudinary,
  siDatabricks,
  siDocker,
  siFigma,
  siGithub,
  siGooglecloud,
  siGooglegemini,
  siHubspot,
  siKubernetes,
  siMongodb,
  siNvidia,
  siPostgresql,
  siRedhat,
  siShopify,
  siSnowflake,
  siStripe,
  siTerraform,
  siVercel,
  type SimpleIcon,
} from "simple-icons";
import Marquee from "../ui/Marquee";
import { LineReveal } from "../ui/Reveal";

// Monochrome brand marks (simple-icons, CC0). Brands not in the set fall back to a text wordmark.
type Partner = { name: string; icon?: SimpleIcon; wordmark?: string };

const rowA: Partner[] = [
  { name: "Amazon Web Services", wordmark: "aws" },
  { name: "Google Cloud", icon: siGooglecloud },
  { name: "Microsoft Azure", wordmark: "Azure" },
  { name: "Claude", icon: siAnthropic },
  { name: "Gemini", icon: siGooglegemini },
  { name: "Databricks", icon: siDatabricks },
  { name: "Snowflake", icon: siSnowflake },
  { name: "Docker", icon: siDocker },
  { name: "Kubernetes", icon: siKubernetes },
  { name: "HubSpot", icon: siHubspot },
  { name: "NVIDIA", icon: siNvidia },
];

const rowB: Partner[] = [
  { name: "Salesforce", wordmark: "salesforce" },
  { name: "Oracle", wordmark: "ORACLE" },
  { name: "Red Hat", icon: siRedhat },
  { name: "Stripe", icon: siStripe },
  { name: "MongoDB", icon: siMongodb },
  { name: "Shopify", icon: siShopify },
  { name: "Cloudflare", icon: siCloudflare },
  { name: "Cloudinary", icon: siCloudinary },
  { name: "Vercel", icon: siVercel },
  { name: "GitHub", icon: siGithub },
  { name: "Atlassian", icon: siAtlassian },
  { name: "Terraform", icon: siTerraform },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "Figma", icon: siFigma },
];

function Card({ p }: { p: Partner }) {
  return (
    <div className="group mr-4 flex h-[150px] w-[150px] shrink-0 flex-col items-center justify-between rounded-[18px] border border-line bg-card px-4 pt-8 pb-5 transition-colors duration-300 hover:border-[#5e5e5c] sm:h-[166px] sm:w-[164px]">
      <figure className="flex h-12 items-center justify-center text-white opacity-90 transition-opacity duration-300 group-hover:opacity-100">
        {p.icon ? (
          <svg role="img" aria-label={p.name} viewBox="0 0 24 24" className="size-10 fill-current">
            <path d={p.icon.path} />
          </svg>
        ) : (
          <span aria-label={p.name} className="text-[1.4rem] leading-none font-bold tracking-tight">
            {p.wordmark}
          </span>
        )}
      </figure>
      <span className="text-center text-xs leading-tight font-semibold text-white sm:text-[13px]">{p.name}</span>
    </div>
  );
}

export default function Partners() {
  return (
    <section className="sec bg-black">
      <LineReveal className="h2 wrap-sm text-center" lines={["Technologies We", "Build With"]} />
      <div className="mt-14 flex flex-col gap-4">
        <Marquee duration={55} fadeEdges>
          {rowA.map((p) => <Card key={p.name} p={p} />)}
        </Marquee>
        <Marquee duration={55} fadeEdges reverse>
          {rowB.map((p) => <Card key={p.name} p={p} />)}
        </Marquee>
      </div>
    </section>
  );
}
