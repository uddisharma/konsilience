import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/server/auth";
import { readJson, route } from "@/lib/server/http";
import { createToken, listTokens } from "@/lib/server/tokens";

export const GET = route(async (req: Request) => {
  await requireAdmin(req);
  return NextResponse.json({ tokens: await listTokens() });
});

/** Creates an MCP token. The response is the only time the full token is shown. */
export const POST = route(async (req: Request) => {
  const admin = await requireAdmin(req);
  const { name } = z.object({ name: z.string() }).parse(await readJson(req));
  return NextResponse.json(await createToken(name, admin.name), { status: 201 });
});
