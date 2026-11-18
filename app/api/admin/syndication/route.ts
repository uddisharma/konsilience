import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/auth";
import { route } from "@/lib/server/http";
import { platformStatus } from "@/lib/server/syndication";

/** Which cross-posting platforms are configured (names of missing settings only, never values). */
export const GET = route(async (req: Request) => {
  await requireAdmin(req);
  return NextResponse.json({ platforms: platformStatus() });
});
