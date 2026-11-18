import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyLogin } from "@/lib/server/admins";
import { startSession } from "@/lib/server/auth";
import { HttpError, readJson, route } from "@/lib/server/http";

const body = z.object({ email: z.string().max(200), password: z.string().max(200) });

// Slows down password guessing. Per server instance, so it is a speed bump, not a lock.
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 15 * 60 * 1000;
const attempts = new Map<string, { n: number; until: number }>();

export const POST = route(async (req: Request) => {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const a = attempts.get(ip);
  if (a && a.until > Date.now() && a.n >= MAX_ATTEMPTS) throw new HttpError(429, "Too many attempts. Try again in 15 minutes.");

  const { email, password } = body.parse(await readJson(req));
  const admin = await verifyLogin(email, password);
  if (!admin) {
    const cur = a && a.until > Date.now() ? a : { n: 0, until: Date.now() + WINDOW_MS };
    attempts.set(ip, { ...cur, n: cur.n + 1 });
    throw new HttpError(401, "Wrong email or password");
  }
  attempts.delete(ip);
  await startSession(admin);
  return NextResponse.json({ admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } });
});
