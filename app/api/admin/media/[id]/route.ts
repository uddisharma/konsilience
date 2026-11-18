import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/auth";
import { route } from "@/lib/server/http";
import { deleteImage } from "@/lib/server/media";

export const DELETE = route(async (req: Request, ctx: RouteContext<"/api/admin/media/[id]">) => {
  await requireAdmin(req);
  await deleteImage((await ctx.params).id);
  return NextResponse.json({ ok: true });
});
