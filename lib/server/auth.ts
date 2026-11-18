import "server-only";
import { cookies } from "next/headers";
import { getAdmin, type AdminPublic } from "./admins";
import { HttpError } from "./http";
import { SESSION_COOKIE, SESSION_DAYS, signSession, verifySession } from "./session";

/** The signed-in admin, or null. Checks the database, so deleted admins and old passwords are locked out. */
export async function getSessionAdmin(): Promise<AdminPublic | null> {
  const claims = await verifySession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!claims) return null;
  const admin = await getAdmin(claims.sub);
  if (!admin || admin.tokenVersion !== claims.tv) return null;
  return admin;
}

/**
 * Guards admin API routes. Mutations must also come from this site (Origin check), which together
 * with the SameSite=Lax cookie blocks cross-site request forgery.
 */
export async function requireAdmin(req: Request): Promise<AdminPublic> {
  if (req.method !== "GET" && req.method !== "HEAD") {
    const origin = req.headers.get("origin");
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    if (origin && host && new URL(origin).host !== host) throw new HttpError(403, "Cross-site request blocked");
  }
  const admin = await getSessionAdmin();
  if (!admin) throw new HttpError(401, "Not signed in");
  return admin;
}

export async function startSession(admin: AdminPublic) {
  const token = await signSession({ sub: admin.id, tv: admin.tokenVersion });
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
}
