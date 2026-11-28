import "server-only";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { blocksToMarkdown, MARKDOWN_GUIDE, markdownToBlocks } from "@/lib/blog/markdown";
import { blockSchema, POST_STATUSES, SITES, type PostRecord, type Site } from "@/lib/blog/schema";
import { postUrl, siteConfigs } from "@/lib/blog/sites";
import { wordCount } from "@/lib/blog/utils";
import { routeGroups } from "@/lib/routes";
import { createPost, deletePost, findPostBySlug, getPost, listPosts, publicPosts, updatePost, type Actor } from "./posts";
import { revalidatePosts } from "./revalidate";

/*
 * The blog MCP server: lets Claude (or any MCP client) research the house style, draft posts in
 * Markdown, and save, publish, edit or delete them. Every write goes through the same validation
 * as the admin panel. New posts are drafts unless "publish" is set.
 */

const site = z.enum(SITES).describe('Which blog: "konsilience" (konsilience.tech/blog) or "trasys" (trasys.dev/resources/blog)');

const contentFields = {
  title: z.string().min(1).max(300).describe("Post title (H1). Specific, ideally under 65 characters."),
  slug: z.string().max(160).optional().describe("URL slug, lowercase-with-hyphens. Generated from the title if omitted."),
  excerpt: z.string().max(600).optional().describe("1-2 sentence summary shown on cards and as the default meta description (aim for 140-160 characters)."),
  category: z.string().max(80).optional().describe("One category; see get_blog_guidelines for each site's list."),
  tags: z.array(z.string().max(60)).max(30).optional(),
  content_markdown: z.string().max(400000).optional().describe("The body as Markdown (see get_blog_guidelines for the supported extensions). Do not repeat the title."),
  blocks: z.array(blockSchema).max(1000).optional().describe("Alternative to content_markdown: the body as structured blocks."),
  // Loose objects on purpose: zod partials would fill defaults for keys the caller left out and
  // overwrite saved values. The full schema validates them in createPost / updatePost.
  author: z.record(z.string(), z.unknown()).optional().describe("name, role, avatar (image URL)."),
  seo: z.record(z.string(), z.unknown()).optional().describe("metaTitle (<=60 chars), metaDescription (<=160 chars), keywords, ogTitle, ogDescription, ogImage, canonicalUrl, noindex, schemaType."),
  design: z.record(z.string(), z.unknown()).optional().describe("hero (art|image|split|minimal), coverImage, coverAlt, artHue (0-360), accentColor (#rrggbb), layout (sidebar|centered), showToc, showShare, showRelated, showNewsletter, sidebarLinks, ctaBand {enabled,title,text,label,href}."),
};

const text = (data: unknown) => ({ content: [{ type: "text" as const, text: typeof data === "string" ? data : JSON.stringify(data, null, 2) }] });
const fail = (err: unknown) => ({ ...text(`Error: ${err instanceof Error ? err.message : String(err)}`), isError: true });

function bodyFrom(args: { content_markdown?: string; blocks?: unknown[] }) {
  if (args.blocks?.length) return args.blocks;
  if (args.content_markdown !== undefined) return markdownToBlocks(args.content_markdown);
  return undefined;
}

function describe(p: PostRecord, adminBase: string) {
  const dueLater = p.status === "published" && p.publishedAt && new Date(p.publishedAt) > new Date();
  return {
    id: p.id,
    site: p.site,
    liveOn: p.sites,
    title: p.title,
    slug: p.slug,
    status: dueLater ? "scheduled" : p.status,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
    category: p.category,
    url: postUrl(p.site, p.slug),
    editInAdmin: `${adminBase}/admin/posts/${p.id}`,
    previewInAdmin: `${adminBase}/admin/preview/${p.id}`,
    words: p.blocks.length ? wordCount(p.blocks) : undefined,
    blocks: p.blocks.length || undefined,
  };
}

async function guidelines(s: Site) {
  const cfg = siteConfigs[s];
  const existing = await (async () => {
    if (s === "konsilience") {
      const { konsiliencePosts } = await import("./blogSource");
      return konsiliencePosts();
    }
    return publicPosts(s);
  })();
  const internalPages =
    s === "konsilience"
      ? routeGroups
          .filter((g) => ["Services", "AI", "Industries", "Company"].includes(g.title))
          .flatMap((g) => g.links.map((l) => `- ${l.label}: ${l.href}`))
          .join("\n")
      : "- Sign up: https://www.trasys.dev/sign-up\n- Product page on konsilience.tech: https://www.konsilience.tech/trasys";
  return `# ${cfg.name} blog guidelines

Published at: ${cfg.baseUrl}${cfg.blogPath}/<slug>
Categories: ${cfg.categories.join(", ")}
Default author: ${cfg.defaultAuthor.name} (${cfg.defaultAuthor.role})
Default closing CTA: "${cfg.defaultCta.label}" -> ${cfg.defaultCta.href}

## Voice and rules
${cfg.guidelines}

## ${MARKDOWN_GUIDE}

## SEO checklist
- seo.metaTitle <= 60 characters with the main keyword near the start; seo.metaDescription 140-160 characters.
- excerpt: 1-2 sentences, plain text.
- 3-8 seo.keywords. Slug: short, keyword-led, no stop words or dates unless the post is dated.
- Link to 2-4 related internal pages and existing posts (below) where it genuinely helps.

## Pages you can link to
${internalPages}

## Existing posts (avoid duplicating; link where relevant)
${existing.map((p) => `- ${p.title} -> ${s === "konsilience" ? `/blog/${p.slug}` : postUrl(s, p.slug)}`).join("\n") || "- none yet"}

## Workflow
1. Draft the post and save it with create_post (it stays a draft).
2. Tell the user the preview link so they can review it in the admin.
3. Publish only when the user asks: set_post_status with status "published".`;
}

export function buildMcpServer({ actor, adminBase }: { actor: Actor; adminBase: string }) {
  const server = new McpServer(
    { name: "konsilience-blog", version: "1.0.0" },
    {
      instructions:
        "Blog CMS for konsilience.tech and trasys.dev. Always call get_blog_guidelines for the target site before writing. Save new posts as drafts and publish only when the user explicitly asks.",
    },
  );

  server.registerTool(
    "get_blog_guidelines",
    {
      title: "Get blog guidelines",
      description: "House style, audience, CTA rules, supported Markdown, SEO checklist, linkable pages and existing posts for one site. Call this before writing a post.",
      inputSchema: { site },
      annotations: { readOnlyHint: true },
    },
    async ({ site: s }) => {
      try {
        return text(await guidelines(s));
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "list_posts",
    {
      title: "List posts",
      description: "Lists posts (drafts, published and archived) newest-edited first.",
      inputSchema: {
        site: site.optional(),
        status: z.enum(POST_STATUSES).optional(),
        query: z.string().max(100).optional().describe("Search in title, slug, excerpt and tags"),
        limit: z.number().int().min(1).max(100).optional(),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ site: s, status, query, limit }) => {
      try {
        const { posts, total } = await listPosts({ site: s, status, q: query, limit: limit ?? 30 });
        return text({ total, posts: posts.map((p) => describe(p, adminBase)) });
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "get_post",
    {
      title: "Get post",
      description: "Gets one post by id, or by site + slug, including its body as Markdown (default) or blocks.",
      inputSchema: {
        id: z.string().optional(),
        site: site.optional(),
        slug: z.string().optional(),
        format: z.enum(["markdown", "blocks"]).optional(),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ id, site: s, slug, format }) => {
      try {
        const p = id ? await getPost(id) : s && slug ? await findPostBySlug(s, slug) : null;
        if (!p) return fail("Post not found (pass an id, or site and slug)");
        const { blocks, ...rest } = p;
        return text({ ...describe(p, adminBase), ...rest, ...(format === "blocks" ? { blocks } : { content_markdown: blocksToMarkdown(blocks) }) });
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "create_post",
    {
      title: "Create post",
      description: "Creates a post. It is saved as a draft unless publish is true. Returns the id, public URL and admin preview link.",
      inputSchema: {
        site,
        ...contentFields,
        publish: z.boolean().optional().describe("Publish immediately. Only when the user explicitly asked."),
        sites: z.array(z.enum(SITES)).optional().describe('With publish: the websites to publish on. Default: just "site". Use ["konsilience","trasys"] for both.'),
        publishedAt: z.string().optional().describe("ISO date-time. With publish=true and a future date, the post goes live then."),
      },
    },
    async (args) => {
      try {
        const cfg = siteConfigs[args.site];
        const post = await createPost(
          {
            site: args.site,
            title: args.title,
            slug: args.slug,
            excerpt: args.excerpt ?? "",
            category: args.category ?? "",
            tags: args.tags ?? [],
            author: { name: "", ...args.author },
            blocks: bodyFrom(args) ?? [],
            seo: args.seo ?? {},
            design: { ctaBand: { enabled: true, ...cfg.defaultCta }, ...args.design },
            status: args.publish ? "published" : "draft",
            sites: args.publish ? (args.sites?.length ? args.sites : [args.site]) : [],
            publishedAt: args.publishedAt ?? null,
          },
          actor,
        );
        revalidatePosts(post);
        return text({ created: describe(post, adminBase) });
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "update_post",
    {
      title: "Update post",
      description: "Updates fields of an existing post. Only the fields you pass change. Passing content_markdown or blocks replaces the whole body.",
      inputSchema: {
        id: z.string(),
        site: site.optional().describe("Move the post to the other site"),
        ...contentFields,
        title: contentFields.title.optional(),
      },
    },
    async (args) => {
      try {
        const a: Record<string, unknown> & { id: string } = args;
        const patch: Record<string, unknown> = {};
        for (const k of ["site", "title", "slug", "excerpt", "category", "tags", "author", "seo", "design"]) if (a[k] !== undefined) patch[k] = a[k];
        const body = bodyFrom(a as { content_markdown?: string; blocks?: unknown[] });
        if (body) patch.blocks = body;
        const { before, after } = await updatePost(a.id, patch, actor);
        revalidatePosts(before, after);
        return text({ updated: describe(after, adminBase) });
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "set_post_status",
    {
      title: "Publish, unpublish or archive",
      description:
        'Changes where a post is live. "published" makes it live on the given sites (default: the sites it is already on, or its home site), or scheduled with a future publishedAt; "draft" takes it off every site; "archived" hides it and keeps it.',
      inputSchema: {
        id: z.string(),
        status: z.enum(POST_STATUSES),
        sites: z.array(z.enum(SITES)).optional().describe('With "published": exactly the websites to be live on, e.g. ["konsilience","trasys"].'),
        publishedAt: z.string().optional().describe("ISO date-time for scheduling"),
      },
    },
    async ({ id, status, sites, publishedAt }) => {
      try {
        const { before, after } = await updatePost(id, { status, ...(sites?.length ? { sites } : {}), ...(publishedAt ? { publishedAt } : {}) }, actor);
        revalidatePosts(before, after);
        return text({ updated: describe(after, adminBase) });
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerTool(
    "delete_post",
    {
      title: "Delete post",
      description: "Permanently deletes a post. Cannot be undone. Only when the user explicitly asks; prefer archiving.",
      inputSchema: { id: z.string(), confirm: z.literal(true).describe("Must be true") },
      annotations: { destructiveHint: true },
    },
    async ({ id }) => {
      try {
        const p = await deletePost(id);
        revalidatePosts(p);
        return text({ deleted: { id: p.id, title: p.title, site: p.site } });
      } catch (e) {
        return fail(e);
      }
    },
  );

  server.registerPrompt(
    "write_blog_post",
    {
      title: "Write a blog post",
      description: "Research the house style, write a post on a topic and save it as a draft.",
      argsSchema: { site: z.string().describe("konsilience or trasys"), topic: z.string().describe("What the post is about") },
    },
    ({ site: s, topic }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Write a blog post for the ${s} blog about: ${topic}

1. Call get_blog_guidelines with site "${s}" and follow it exactly.
2. Check list_posts so you do not duplicate an existing post.
3. Write the full post in Markdown: direct answer first, H2 sections, internal links, an FAQ block if useful, and the site's CTA.
4. Fill excerpt, category, tags, seo.metaTitle, seo.metaDescription and seo.keywords.
5. Save it with create_post as a draft, then give me the preview link and a short summary. Do not publish until I say so.`,
          },
        },
      ],
    }),
  );

  return server;
}
