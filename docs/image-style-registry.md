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
| 7 | `ai-solutions/ai-solutions-overview.webp` | /services/[ai-automation] | Hero | UI-fragment close-up | Edge-cropped | #191918 / #F8F7F4 / #5E96FE | hero + share |
| 8 | `ai-solutions/production-ai-stack.webp` | /ai | Hero | Isometric diagram | Split | #020615 / #FFFFFF / #1A69FD | hero |
| 9 | `ai-solutions/agentic-ai-development.webp` | /ai/agentic-ai | Hero | Mono-colour with one accent | Right-weighted | #020615 / #888886 / #1A69FD | hero + share |
| 10 | `ai-solutions/generative-ai-development.webp` | /ai/generative-ai | Hero | Editorial typographic poster | Split | #5E96FE / #020615 / #FFFFFF | hero + share |
| 11 | `ai-solutions/ai-copilot-development.webp` | /ai/ai-copilots | Hero | Line-art / blueprint | Asymmetric | #FFFFFF / #000000 / #1A69FD | hero + share |
| 12 | `ai-solutions/computer-vision-development.webp` | /ai/computer-vision | Hero | Halftone / grain texture | Edge-cropped | #F8F7F4 / #0C4FCB / #020615 | hero + share |
| 13 | `ai-solutions/conversational-ai-development.webp` | /ai/conversational-ai | Hero | Paper-cut layers | Right-weighted | #0B2F86 / #F8F7F4 / #5E96FE | hero + share |
| 14 | `about/konsilience-team-disciplines.webp` | /about | Our story | Duotone | Edge-cropped | #020615 / #F8F7F4 / #5E96FE | wide + share |
| 15 | `careers/life-at-konsilience.webp` | /careers | Hero | Editorial typographic poster | Grid | #F8F7F4 / #000000 / #0C4FCB | hero + share |
| 16 | `security/secure-software-delivery.webp` | /security | Hero | Mono-colour with one accent | Grid | #FFFFFF / #020615 / #0C4FCB | hero + share |
| 17 | `resources/guides/ai-readiness-guide-cover.webp` | /resources/guides | Card | Editorial typographic poster | Left-weighted | #000000 / #F8F7F4 / #5E96FE | cover + share |
| 18 | `resources/guides/mvp-development-guide-cover.webp` | /resources/guides | Card | Paper-cut layers | Diagonal | #F8F7F4 / #0B2F86 / #1A69FD | cover |
| 19 | `resources/guides/cloud-migration-checklist-cover.webp` | /resources/guides | Card | Line-art / blueprint | Right-weighted | #0B2F86 / #FFFFFF / #5E96FE | cover |
| 20 | `resources/guides/design-system-starter-kit-cover.webp` | /resources/guides | Card | Flat geometric shapes | Grid | #5E96FE / #FFFFFF / #020615 | cover |
| 21 | `resources/whitepapers/agentic-ai-for-growing-businesses-cover.webp` | /resources/whitepapers | Card | Mono-colour with one accent | Typographic | #191918 / #888886 / #1A69FD | cover + share |
| 22 | `resources/whitepapers/state-of-legacy-modernization-cover.webp` | /resources/whitepapers | Card | Halftone / grain texture | Split | #FFFFFF / #3E3E3D / #1A69FD | cover |
| 23 | `resources/whitepapers/responsible-ai-governance-framework-cover.webp` | /resources/whitepapers | Card | Isometric diagram | Asymmetric | #031432 / #F8F7F4 / #1A69FD | cover |
| 24 | `resources/press-releases/konsilience-launches-trasys-ai.webp` | /resources/press-releases | Card | UI-fragment close-up | Edge-cropped | #000000 / #CECECE / #1A69FD | cover + share |
| 25 | `resources/press-releases/konsilience-new-mohali-office.webp` | /resources/press-releases | Card | Editorial typographic poster | Right-weighted | #0C4FCB / #F8F7F4 / #020615 | cover |
| 26 | `resources/press-releases/35-projects-done.webp` | /resources/press-releases | Card | Mono-colour with one accent | Diagonal | #FFFFFF / #000000 / #5E96FE | cover |
| 27 | `resources/webinars/building-production-rag-systems.webp` | /resources/webinars | Card | UI-fragment close-up | Split | #191918 / #FFFFFF / #5E96FE | cover + share |
| 28 | `resources/webinars/from-monolith-to-microservices.webp` | /resources/webinars | Card | Halftone / grain texture | Left-weighted | #1A69FD / #020615 / #F8F7F4 | cover |
| 29 | `resources/webinars/ai-copilots-for-sales-teams.webp` | /resources/webinars | Card | Duotone | Right-weighted | #0B2F86 / #FFFFFF / #000000 | cover |
| 30 | `industries/industries-we-serve.webp` | /industries | Hero | Editorial typographic poster | Typographic | #000000 / #F8F7F4 / #1A69FD | hero + share |
| 31 | `industries/healthcare-software-development.webp` | /industries/[healthcare] | Hero | Flat geometric shapes | Asymmetric | #FFFFFF / #031432 / #1A69FD | hero + share |
| 32 | `industries/finance-software-development.webp` | /industries/[finance] | Hero | Line-art / blueprint | Grid | #020615 / #FFFFFF / #5E96FE | hero + share |
| 33 | `industries/retail-and-ecommerce-software-development.webp` | /industries/[retail-and-ecommerce] | Hero | Duotone | Split | #1A69FD / #F8F7F4 / #031432 | hero + share |
| 34 | `industries/logistics-software-development.webp` | /industries/[logistics] | Hero | Halftone / grain texture | Diagonal | #F8F7F4 / #191918 / #1A69FD | hero + share |
| 35 | `industries/education-software-development.webp` | /industries/[education] | Hero | Editorial typographic poster | Edge-cropped | #031432 / #FFFFFF / #5E96FE | hero + share |
| 36 | `industries/real-estate-software-development.webp` | /industries/[real-estate] | Hero | Isometric diagram | Left-weighted | #F8F7F4 / #031432 / #0C4FCB | hero + share |
| 37 | `industries/emobility-software-development.webp` | /industries/[emobility] | Hero | UI-fragment close-up | Right-weighted | #000000 / #5E96FE / #FFFFFF | hero + share |
| 38 | `industries/wearables-app-development.webp` | /industries/[wearables] | Hero | Paper-cut layers | Typographic | #0B2F86 / #5E96FE / #FFFFFF | hero + share |
| 39 | `industries/energy-software-development.webp` | /industries/[energy] | Hero | Mono-colour with one accent | Asymmetric | #FFFFFF / #191918 / #0C4FCB | hero + share |
| 40 | `industries/agriculture-software-development.webp` | /industries/[agriculture] | Hero | Flat geometric shapes | Grid | #CECECE / #020615 / #1A69FD | hero + share |
| 41 | `industries/gaming-software-development.webp` | /industries/[gaming] | Hero | Line-art / blueprint | Split | #020615 / #5E96FE / #F8F7F4 | hero + share |
| 42 | `industries/ott-and-media-software-development.webp` | /industries/[ott-and-media] | Hero | Duotone | Diagonal | #191918 / #FFFFFF / #1A69FD | hero + share |
| 43 | `industries/on-demand-app-development.webp` | /industries/[on-demand] | Hero | Halftone / grain texture | Edge-cropped | #5E96FE / #031432 / #FFFFFF | hero + share |
| 44 | `industries/food-delivery-app-development.webp` | /industries/[food-delivery] | Hero | Editorial typographic poster | Left-weighted | #F8F7F4 / #1A69FD / #020615 | hero + share |
| 45 | `industries/travel-software-development.webp` | /industries/[travel] | Hero | Isometric diagram | Right-weighted | #0C4FCB / #FFFFFF / #031432 | hero + share |
| 46 | `industries/aviation-software-development.webp` | /industries/[aviation] | Hero | UI-fragment close-up | Typographic | #FFFFFF / #0C4FCB / #020615 | hero + share |
| 47 | `industries/telecom-software-development.webp` | /industries/[telecom] | Hero | Paper-cut layers | Asymmetric | #031432 / #CECECE / #1A69FD | hero + share |
| 48 | `industries/startup-product-development.webp` | /industries/[startups] | Hero | Mono-colour with one accent | Grid | #3E3E3D / #FFFFFF / #5E96FE | hero + share |
| 49 | `blog/agentic-ai-enterprise-playbook.webp` | /blog | Card | Mono-colour with one accent | Right-weighted | #020615 / #F8F7F4 / #1A69FD | cover + share |
| 50 | `blog/modernize-legacy-without-downtime.webp` | /blog | Card | Line-art / blueprint | Split | #FFFFFF / #191918 / #1A69FD | cover + share |
| 51 | `blog/design-systems-that-scale.webp` | /blog | Card | Flat geometric shapes | Grid | #CECECE / #0B2F86 / #1A69FD | cover + share |
| 52 | `blog/cloud-cost-optimization-guide.webp` | /blog | Card | Halftone / grain texture | Diagonal | #1A69FD / #FFFFFF / #0B2F86 | cover + share |
| 53 | `blog/app-development-cost-2026.webp` | /blog | Card | Editorial typographic poster | Left-weighted | #F8F7F4 / #020615 / #0C4FCB | cover + share |
| 54 | `blog/rag-architecture-patterns.webp` | /blog | Card | Isometric diagram | Asymmetric | #191918 / #CECECE / #5E96FE | cover + share |
| 55 | `blog/devops-observability-consulting.webp` | /blog | Card | UI-fragment close-up | Edge-cropped | #000000 / #CECECE / #5E96FE | cover + share |
| 56 | `portfolio/trasys-ai-observability-platform.webp` | /portfolio/trasys-ai | Share image | UI-fragment close-up | Right-weighted | #191918 / #F8F7F4 / #1A69FD | case + share |
