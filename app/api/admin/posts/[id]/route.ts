import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/auth";
import { readJson, route } from "@/lib/server/http";
import { deletePost, getPost, updatePost } from "@/lib/server/posts";
import { revalidatePosts } from "@/lib/server/revalidate";

type Ctx = RouteContext<"/api/admin/posts/[id]">;

export const GET = route(async (req: Request, ctx: Ctx) => {
  await requireAdmin(req);
  return NextResponse.json({ post: await getPost((await ctx.params).id) });
});

export const PATCH = route(async (req: Request, ctx: Ctx) => {
  const admin = await requireAdmin(req);
  const { before, after } = await updatePost((await ctx.params).id, await readJson(req), { id: admin.id, name: admin.name, source: "admin" });
  revalidatePosts(before, after);
  return NextResponse.json({ post: after });
});

export const DELETE = route(async (req: Request, ctx: Ctx) => {
  await requireAdmin(req);
  const post = await deletePost((await ctx.params).id);
  revalidatePosts(post);
  return NextResponse.json({ ok: true });
});
