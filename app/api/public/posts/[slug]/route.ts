import { publicPost } from "@/lib/server/posts";
import { CORS, full, jsonPublic, parseSite } from "@/lib/server/publicApi";

/*
 * GET /api/public/posts/<slug>?site=trasys
 * One published post: blocks (structured), html (ready to drop in), toc, design, resolved SEO
 * (title, description, canonical, og image) and JSON-LD.
 */
export async function GET(req: Request, ctx: RouteContext<"/api/public/posts/[slug]">) {
  const site = parseSite(new URL(req.url).searchParams.get("site"));
  if (!site) return jsonPublic({ error: "Pass ?site=konsilience or ?site=trasys" }, 400);
  const post = await publicPost(site, (await ctx.params).slug);
  if (!post) return jsonPublic({ error: "Not found" }, 404);
  return jsonPublic({ post: full(post) });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
