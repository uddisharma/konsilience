import { NextResponse } from "next/server";
import { deleteAdmin, getAdmin } from "@/lib/server/admins";
import { requireAdmin } from "@/lib/server/auth";
import { HttpError, route } from "@/lib/server/http";

export const DELETE = route(async (req: Request, ctx: RouteContext<"/api/admin/admins/[id]">) => {
  const me = await requireAdmin(req);
  const { id } = await ctx.params;
  const target = await getAdmin(id);
  if (!target) throw new HttpError(404, "Admin not found");
  if (target.role === "owner" && me.role !== "owner") throw new HttpError(403, "Only an owner can remove an owner");
  await deleteAdmin(id, me.id);
  return NextResponse.json({ ok: true });
});
