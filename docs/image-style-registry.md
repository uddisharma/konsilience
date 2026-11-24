# Image style registry

Generated from `lib/image-registry.ts` by `node scripts/write-style-registry.mjs`. Every image has its own
technique + layout + palette; images on the same page never share a technique, layout or palette
(enforced by `node scripts/check-image-registry.mjs`).

- Fonts: Plus Jakarta Sans 500/600 and Barlow Condensed 600 (the site's own `next/font` files, loaded by the dev server). Code uses the site's `font-mono` stack.
- Texture: grain 3–6 %, crisp 1px rules. No gradients, glows, bokeh, blur shadows, 3D blobs or icon clichés.
- Logo: `konsilience-white.png` on dark, `konsilience-black.png` on light; only on share images and the case-study cover.
- Real content only: service names, offerings, page copy, sensible code. No invented metrics.

| # | File | Page | Section | Technique | Layout | Palette (bg / ink / accent) | Size |
|---|---|---|---|---|---|---|---|
| 1 | `services/technology-services-overview.webp` | /services | Hero | Editorial typographic poster | Left-weighted | #F8F7F4 / #020615 / #1A69FD | hero + share |
| 2 | `services/product-engineering-services.webp` | /services/[product-engineering] | Hero | Isometric diagram | Right-weighted | #000000 / #FFFFFF / #1A69FD | hero + share |
| 3 | `services/digital-marketing-and-growth-services.webp` | /services/[digital-marketing] | Hero | Halftone / grain texture | Diagonal | #1A69FD / #FFFFFF / #020615 | hero + share |
| 4 | `services/digital-transformation-services.webp` | /services/[digital-transformation] | Hero | Line-art / blueprint | Split | #031432 / #5E96FE / #F8F7F4 | hero + share |
| 5 | `services/technology-consulting-services.webp` | /services/[consulting] | Hero | Paper-cut layers | Asymmetric | #FFFFFF / #0B2F86 / #1A69FD | hero + share |
| 6 | `services/data-and-managed-it-services.webp` | /services/[data-managed-it] | Hero | Flat geometric shapes | Grid | #0C4FCB / #FFFFFF / #000000 | hero + share |
| 7 | `ai-solutions/ai-solutions-overview.webp` | /ai-solutions | Hero | UI-fragment close-up | Edge-cropped | #191918 / #F8F7F4 / #5E96FE | hero + share |
| 8 | `ai-solutions/agentic-ai-development.webp` | /ai-solutions/agentic-ai | Hero | Mono-colour with one accent | Right-weighted | #020615 / #888886 / #1A69FD | hero + share |
| 9 | `ai-solutions/generative-ai-development.webp` | /ai-solutions/generative-ai | Hero | Editorial typographic poster | Split | #5E96FE / #020615 / #FFFFFF | hero + share |
| 10 | `ai-solutions/ai-copilot-development.webp` | /ai-solutions/ai-copilots | Hero | Line-art / blueprint | Asymmetric | #FFFFFF / #000000 / #1A69FD | hero + share |
| 11 | `ai-solutions/computer-vision-development.webp` | /ai-solutions/computer-vision | Hero | Halftone / grain texture | Edge-cropped | #F8F7F4 / #0C4FCB / #020615 | hero + share |
| 12 | `ai-solutions/conversational-ai-development.webp` | /ai-solutions/conversational-ai | Hero | Paper-cut layers | Right-weighted | #0B2F86 / #F8F7F4 / #5E96FE | hero + share |
| 13 | `about/konsilience-team-disciplines.webp` | /about | Our story | Duotone | Edge-cropped | #020615 / #F8F7F4 / #5E96FE | wide + share |
| 14 | `careers/life-at-konsilience.webp` | /careers | Hero | Editorial typographic poster | Grid | #F8F7F4 / #000000 / #0C4FCB | hero + share |
| 15 | `security/secure-software-delivery.webp` | /security | Hero | Mono-colour with one accent | Grid | #FFFFFF / #020615 / #0C4FCB | hero + share |
| 16 | `resources/guides/ai-readiness-guide-cover.webp` | /resources/guides | Card | Editorial typographic poster | Left-weighted | #000000 / #F8F7F4 / #5E96FE | cover + share |
| 17 | `resources/guides/mvp-development-guide-cover.webp` | /resources/guides | Card | Paper-cut layers | Diagonal | #F8F7F4 / #0B2F86 / #1A69FD | cover |
| 18 | `resources/guides/cloud-migration-checklist-cover.webp` | /resources/guides | Card | Line-art / blueprint | Right-weighted | #0B2F86 / #FFFFFF / #5E96FE | cover |
| 19 | `resources/guides/design-system-starter-kit-cover.webp` | /resources/guides | Card | Flat geometric shapes | Grid | #5E96FE / #FFFFFF / #020615 | cover |
| 20 | `resources/whitepapers/agentic-ai-for-growing-businesses-cover.webp` | /resources/whitepapers | Card | Mono-colour with one accent | Typographic | #191918 / #888886 / #1A69FD | cover + share |
| 21 | `resources/whitepapers/state-of-legacy-modernization-cover.webp` | /resources/whitepapers | Card | Halftone / grain texture | Split | #FFFFFF / #3E3E3D / #1A69FD | cover |
| 22 | `resources/whitepapers/responsible-ai-governance-framework-cover.webp` | /resources/whitepapers | Card | Isometric diagram | Asymmetric | #031432 / #F8F7F4 / #1A69FD | cover |
| 23 | `resources/press-releases/konsilience-launches-trasys-ai.webp` | /resources/press-releases | Card | UI-fragment close-up | Edge-cropped | #000000 / #CECECE / #1A69FD | cover + share |
| 24 | `resources/press-releases/konsilience-new-mohali-office.webp` | /resources/press-releases | Card | Editorial typographic poster | Right-weighted | #0C4FCB / #F8F7F4 / #020615 | cover |
| 25 | `resources/press-releases/35-projects-done.webp` | /resources/press-releases | Card | Mono-colour with one accent | Diagonal | #FFFFFF / #000000 / #5E96FE | cover |
| 26 | `resources/webinars/building-production-rag-systems.webp` | /resources/webinars | Card | UI-fragment close-up | Split | #191918 / #FFFFFF / #5E96FE | cover + share |
| 27 | `resources/webinars/from-monolith-to-microservices.webp` | /resources/webinars | Card | Halftone / grain texture | Left-weighted | #1A69FD / #020615 / #F8F7F4 | cover |
| 28 | `resources/webinars/ai-copilots-for-sales-teams.webp` | /resources/webinars | Card | Duotone | Right-weighted | #0B2F86 / #FFFFFF / #000000 | cover |
| 29 | `portfolio/trasys-ai-observability-platform.webp` | /portfolio/trasys-ai | Showcase banner | UI-fragment close-up | Right-weighted | #191918 / #F8F7F4 / #1A69FD | case + share |
| 30 | `portfolio/trasys-ai-card.webp` | portfolio cards | Card | UI-fragment close-up | Edge-cropped | #000000 / #FFFFFF / #5E96FE | card |
