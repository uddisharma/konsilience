import { jwtVerify, SignJWT } from "jose";

/* Session token helpers. No database or Node-only imports, so proxy.ts can use them too. */

export const SESSION_COOKIE = "ks_admin";
export const SESSION_DAYS = 7;

export type SessionClaims = { sub: string; tv: number };

function secret() {
  const s = process.env.ADMIN_JWT_SECRET;
  if (!s || s.length < 32) throw new Error("ADMIN_JWT_SECRET must be set to a random string of at least 32 characters");
  return new TextEncoder().encode(s);
}

export async function signSession(claims: SessionClaims) {
  return new SignJWT({ tv: claims.tv })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(claims.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secret());
}

export async function verifySession(token: string | undefined): Promise<SessionClaims | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"] });
    if (!payload.sub) return null;
    return { sub: payload.sub, tv: Number(payload.tv ?? 0) };
  } catch {
    return null;
  }
}
