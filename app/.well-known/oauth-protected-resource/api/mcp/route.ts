import { oauthPreflight, protectedResourceMetadata, oauthJson } from "@/lib/server/oauth";

// RFC 9728 metadata for the MCP endpoint itself (the WWW-Authenticate header on /api/mcp points here).
export const dynamic = "force-dynamic";

export function GET(req: Request) {
  return oauthJson(protectedResourceMetadata(new URL(req.url).origin));
}

export function OPTIONS() {
  return oauthPreflight();
}
