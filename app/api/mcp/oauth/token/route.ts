import { exchangeCode, oauthError, oauthJson, oauthPreflight } from "@/lib/server/oauth";

// OAuth token endpoint: trades a one-time code and PKCE verifier for an access token.
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const params = new URLSearchParams(await req.text());
    return oauthJson(await exchangeCode(params));
  } catch (err) {
    return oauthError(err);
  }
}

export function OPTIONS() {
  return oauthPreflight();
}
