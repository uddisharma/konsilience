import { authorizationServerMetadata, oauthJson, oauthPreflight } from "@/lib/server/oauth";

// RFC 8414: where MCP clients register, send the admin to approve, and exchange codes for tokens.
export const dynamic = "force-dynamic";

export function GET(req: Request) {
  return oauthJson(authorizationServerMetadata(new URL(req.url).origin));
}

export function OPTIONS() {
  return oauthPreflight();
}
