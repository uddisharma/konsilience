import { publicPosts } from "@/lib/server/posts";
import { CORS, jsonPublic, parseSite, summary } from "@/lib/server/publicApi";

/*
 * GET /api/public/posts?site=trasys[&category=...][&limit=20][&page=1]
 * Published posts for a site, newest first. Read-only and open to any origin (it is public content).
 */
export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  const site = parseSite(sp.get("site"));
  if (!site) return jsonPublic({ error: "Pass ?site=konsilience or ?site=trasys" }, 400);
  const limit = Math.min(Math.max(Number(sp.get("limit")) || 20, 1), 100);
  const page = Math.max(Number(sp.get("page")) || 1, 1);
  const all = (await publicPosts(site, { category: sp.get("category") || undefined })).filter((p) => !p.seo.noindex);
  return jsonPublic({
    site,
    page,
    limit,
    total: all.length,
    posts: all.slice((page - 1) * limit, page * limit).map(summary),
  });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
