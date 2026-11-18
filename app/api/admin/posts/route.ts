import { NextResponse } from "next/server";
import { POST_STATUSES, SITES, type PostStatus, type Site } from "@/lib/blog/schema";
import { requireAdmin } from "@/lib/server/auth";
import { readJson, route } from "@/lib/server/http";
import { createPost, listPosts } from "@/lib/server/posts";
import { revalidatePosts } from "@/lib/server/revalidate";

export const GET = route(async (req: Request) => {
  await requireAdmin(req);
  const sp = new URL(req.url).searchParams;
  const site = sp.get("site");
  const status = sp.get("status");
  const result = await listPosts({
    site: SITES.includes(site as Site) ? (site as Site) : undefined,
    status: POST_STATUSES.includes(status as PostStatus) ? (status as PostStatus) : undefined,
    q: sp.get("q")?.slice(0, 100) || undefined,
    limit: Number(sp.get("limit")) || 100,
    skip: Number(sp.get("skip")) || 0,
  });
  return NextResponse.json(result);
});

export const POST = route(async (req: Request) => {
  const admin = await requireAdmin(req);
  const post = await createPost(await readJson(req), { id: admin.id, name: admin.name, source: "admin" });
  revalidatePosts(post);
  return NextResponse.json({ post }, { status: 201 });
});
