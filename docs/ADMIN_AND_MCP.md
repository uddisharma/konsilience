# Blog admin (/admin) and MCP server

One CMS for both blogs. Posts are stored in MongoDB.

| Site | Where posts appear | How |
| --- | --- | --- |
| Konsilience | `https://www.konsilience.tech/blog/<slug>` | Rendered by this site. The built-in posts in `lib/catalog.ts` still show; an admin post with the same slug replaces one. |
| Trasys | `https://www.trasys.dev/resources/blog/<slug>` | trasys.dev reads them from the public API below. Canonical URLs point at trasys.dev. |

## Setup

1. Create a MongoDB database (MongoDB Atlas free tier works). Allow access from Vercel (Network Access → `0.0.0.0/0`, or Vercel's IPs).
2. Set these in `.env.local` and in Vercel → Settings → Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://USER:PASS@cluster.mongodb.net
   MONGODB_DB=konsilience
   ADMIN_JWT_SECRET=<48 random bytes>   # node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
   ```
3. Create the first admin (it becomes the owner):
   ```
   bun run admin:create you@konsilience.tech "a-long-password" "Your Name"
   ```
   Running it again for the same email resets the password.
4. Sign in at `/admin/login`. Add other admins under **Admins**.

## Writing a post

- **Posts → New Konsilience post / New Trasys post.** The "Publish to" dropdown moves a post between sites.
- Body: blocks (paragraph, heading, list / steps / checklist, image, gallery, quote, callout, code, table, stats, FAQ, CTA, video embed, divider). Text fields take inline Markdown: `**bold**`, `*italic*`, `` `code` ``, `[link](/path)`; use the toolbar or Ctrl+B / Ctrl+I / Ctrl+K.
- **Markdown tab:** paste a full draft in Markdown and "Replace body". See the supported extensions in `lib/blog/markdown.ts`.
- **Design tab:** hero (artwork, cover image, split, text only), artwork colour and icon, per-post accent colour, layout (sidebars or centred column), table of contents / share / author / related / newsletter toggles, closing CTA, sidebar links.
- **SEO tab:** meta title and description with a Google preview, keywords, canonical, noindex, schema type, Open Graph title / description / image with a social card preview, X card type. FAQ blocks add FAQPage schema automatically.
- **Publish:** Draft → Publish. A future publish date schedules the post. Ctrl+S saves. **Preview** shows drafts exactly as they will look.
- **Media:** uploads (PNG, JPEG, WebP, GIF, AVIF, 4 MB max) are stored in MongoDB GridFS and served from `/api/media/<id>`.

Published Konsilience posts appear immediately (pages are revalidated on save) and are added to `/sitemap.xml`.

## Connecting Claude (MCP)

Open **Admin → MCP / Claude**, create a token (shown once), and copy the snippet for your client:

- **Claude Code:** `claude mcp add --transport http konsilience-blog https://www.konsilience.tech/api/mcp --header "Authorization: Bearer ksk_..."`
- **Claude Desktop:** uses `mcp-remote` with the same header (snippet on the page).
- **claude.ai custom connector:** URL `https://www.konsilience.tech/api/mcp`, then **Connect**. A sign-in page opens on the admin site: sign in, and click **Allow**. No key is needed. The connector's access token appears in the MCP page list (created by the admin who approved it) and can be revoked there.
- **Fallback:** the URL `https://www.konsilience.tech/api/mcp?key=ksk_...` also works (the URL contains the token; treat it as a password).

Sign-in for connectors is OAuth 2.1 with dynamic client registration and PKCE: `/.well-known/oauth-protected-resource`, `/.well-known/oauth-authorization-server`, `/api/mcp/oauth/{register,token,approve}`, and the consent page `/admin/authorize-mcp`.

Then ask, for example: *"Write a Konsilience post about how much an MVP costs in 2026. Save it as a draft and send me the preview link."*

Tools: `get_blog_guidelines` (voice, rules, Markdown format, linkable pages, existing posts), `list_posts`, `get_post`, `create_post`, `update_post`, `set_post_status`, `delete_post`. Prompt: `write_blog_post`. Claude saves drafts; a post goes live only when someone publishes it (in the admin, or by asking Claude). Posts written over MCP are marked "via MCP" in the posts list. Revoke a token on the same page.

The writing rules Claude receives live in `lib/blog/sites.ts`. Edit them there.

## Public API (for trasys.dev)

Read-only, CORS open, cached 60 s at the edge.

- `GET /api/public/posts?site=trasys&limit=20&page=1&category=...` → `{ total, posts: [{ slug, url, title, excerpt, category, tags, author, publishedAt, updatedAt, readTime, coverImage }] }`
- `GET /api/public/posts/<slug>?site=trasys` → `{ post: { ...summary, blocks, html, toc, design, seo: { title, description, canonical, ogImage, ... }, jsonLd } }`

`html` is ready-to-insert semantic HTML; every element has a `kb-` class (`kb-p`, `kb-heading`, `kb-callout-tip`, `kb-faq`, ...) for styling. Put `seo` into the page's `<head>` and `jsonLd` into a `<script type="application/ld+json">`.

## Security notes

- Passwords are bcrypt-hashed. Sessions are signed, http-only cookies (7 days). Changing a password signs out every session; deleting an admin locks them out at once.
- Admin API mutations require same-origin requests. Login attempts are rate-limited per server instance.
- MCP tokens are stored as SHA-256 hashes.
- `/admin` is `noindex` and disallowed in robots.txt.
