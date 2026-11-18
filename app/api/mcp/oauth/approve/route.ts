import { requireAdmin } from "@/lib/server/auth";
import { AUTHORIZE_PARAMS, issueCode, OAuthError, validateAuthRequest } from "@/lib/server/oauth";

// Form POST from /admin/authorize-mcp. Only a signed-in admin can approve (requireAdmin also checks
// the Origin header, which blocks cross-site form posts).
export const dynamic = "force-dynamic";

const HTTP_SEE_OTHER = 303;
const HTTP_UNAUTHORIZED = 401;

const plain = (message: string, status: number) =>
  new Response(message, { status, headers: { "Content-Type": "text/plain; charset=utf-8" } });

export async function POST(req: Request) {
  let admin;
  try {
    admin = await requireAdmin(req);
  } catch {
    return plain("Sign in to the admin panel first, then approve the connector again.", HTTP_UNAUTHORIZED);
  }

  const form = await req.formData();
  const params = new URLSearchParams(
    AUTHORIZE_PARAMS.flatMap((key): [string, string][] => {
      const value = form.get(key);
      return typeof value === "string" && value ? [[key, value]] : [];
    }),
  );

  let authReq;
  try {
    authReq = await validateAuthRequest(params);
  } catch (err) {
    if (err instanceof OAuthError) return plain(err.message, err.status);
    throw err;
  }

  const target = new URL(authReq.redirectUri);
  if (form.get("decision") !== "approve") {
    target.searchParams.set("error", "access_denied");
  } else {
    target.searchParams.set("code", await issueCode(authReq, admin.name));
  }
  if (authReq.state) target.searchParams.set("state", authReq.state);
  return new Response(null, { status: HTTP_SEE_OTHER, headers: { Location: target.toString() } });
}
