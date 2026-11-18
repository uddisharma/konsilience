import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/auth";
import { route } from "@/lib/server/http";
import { revokeToken } from "@/lib/server/tokens";

export const DELETE = route(async (req: Request, ctx: RouteContext<"/api/admin/tokens/[id]">) => {
  await requireAdmin(req);
  await revokeToken((await ctx.params).id);
  return NextResponse.json({ ok: true });
});
