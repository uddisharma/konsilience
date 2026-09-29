import { aiSolutions, industryList, jobs, posts, projects, resourceTypes, serviceList } from "./catalog";
import { brand } from "./content";

export const siteUrl = "https://konsilience.tech";

type Route = { label: string; href: string };

// Every public page, grouped. Feeds both /sitemap (HTML) and /sitemap.xml.
export const routeGroups: { title: string; links: Route[] }[] = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/about/team" },
      { label: "How We Work", href: "/how-we-work" },
      { label: "Careers", href: "/careers" },
      { label: "Compliance", href: "/compliance" },
      { label: "Security", href: "/security" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  { title: "Services", links: [{ label: "All Services", href: "/services" }, ...serviceList.map((s) => ({ label: s.name, href: `/services/${s.slug}` }))] },
  { title: "AI", links: [{ label: brand.product.name, href: "/trasys-ai" }, { label: "AI Solutions", href: "/ai-solutions" }, ...aiSolutions.map((a) => ({ label: a.name, href: `/ai-solutions/${a.slug}` }))] },
  { title: "Industries", links: [{ label: "All Industries", href: "/industries" }, ...industryList.map((i) => ({ label: i.name, href: `/industries/${i.slug}` }))] },
  { title: "Portfolio", links: [{ label: "All Case Studies", href: "/portfolio" }, ...projects.map((p) => ({ label: p.client, href: `/portfolio/${p.slug}` }))] },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      ...posts.map((p) => ({ label: p.title, href: `/blog/${p.slug}` })),
      ...resourceTypes.map((r) => ({ label: r.name, href: `/resources/${r.slug}` })),
    ],
  },
  { title: "Open Roles", links: jobs.map((j) => ({ label: j.title, href: `/careers/${j.slug}` })) },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];
