import { NextResponse } from "next/server";
import { z } from "zod";
import { changePassword } from "@/lib/server/admins";
import { endSession, requireAdmin } from "@/lib/server/auth";
import { readJson, route } from "@/lib/server/http";

export const GET = route(async (req: Request) => {
  const admin = await requireAdmin(req);
  return NextResponse.json({ admin });
});

/** Change your own password. Signs out every session, including this one. */
export const PATCH = route(async (req: Request) => {
  const admin = await requireAdmin(req);
  const { currentPassword, newPassword } = z.object({ currentPassword: z.string(), newPassword: z.string() }).parse(await readJson(req));
  await changePassword(admin.id, currentPassword, newPassword);
  await endSession();
  return NextResponse.json({ ok: true });
});
