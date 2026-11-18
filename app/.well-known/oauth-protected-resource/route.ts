import { oauthPreflight, protectedResourceMetadata, oauthJson } from "@/lib/server/oauth";

// RFC 9728: tells MCP clients which authorization server to use for this origin.
export const dynamic = "force-dynamic";

export function GET(req: Request) {
  return oauthJson(protectedResourceMetadata(new URL(req.url).origin));
}

export function OPTIONS() {
  return oauthPreflight();
}
