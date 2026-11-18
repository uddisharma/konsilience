import { NextResponse } from "next/server";
import { createAdmin, listAdmins } from "@/lib/server/admins";
import { requireAdmin } from "@/lib/server/auth";
import { HttpError, readJson, route } from "@/lib/server/http";

export const GET = route(async (req: Request) => {
  await requireAdmin(req);
  return NextResponse.json({ admins: await listAdmins() });
});

export const POST = route(async (req: Request) => {
  const me = await requireAdmin(req);
  const body = (await readJson(req)) as Record<string, unknown>;
  if (body.role === "owner" && me.role !== "owner") throw new HttpError(403, "Only an owner can add another owner");
  return NextResponse.json({ admin: await createAdmin(body) }, { status: 201 });
});
