# konsilience.tech

Website for Konsilience. Next.js 16 (App Router), Tailwind CSS v4, deployed on Vercel.

## Run it

```bash
bun install
bun dev          # http://localhost:3000
bun run build    # production build
```

Copy `.env.example` to `.env.local` and fill the SMTP settings so the contact form can send email.

## Where things live

| Path | What it holds |
| --- | --- |
| `site.config.ts` | **Every link, ID and contact detail.** Change values here only. Unfilled `{{PLACEHOLDER}}` values stay hidden on the site. |
| `lib/content.ts`, `lib/catalog.ts`, `lib/*Data.ts` | Page copy and structured content (services, industries, projects, posts) |
| `app/` | Routes. `app/api/contact` receives every form. |
| `components/` | UI |
| `scripts/audit/` | Audit tooling (site crawler) |
| `docs/` | Website-fix brief, reports, changelog and open questions. See [docs/README.md](docs/README.md). |
