import { OAuthError, oauthError, oauthJson, oauthPreflight, registerClient } from "@/lib/server/oauth";

// RFC 7591 dynamic client registration, called by MCP clients (claude.ai) before the admin approves.
export const dynamic = "force-dynamic";

const HTTP_CREATED = 201;

export async function POST(req: Request) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      throw new OAuthError("invalid_client_metadata", "Body must be JSON");
    }
    return oauthJson(await registerClient(body), HTTP_CREATED);
  } catch (err) {
    return oauthError(err);
  }
}

export function OPTIONS() {
  return oauthPreflight();
}
