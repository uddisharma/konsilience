import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { buildMcpServer } from "@/lib/server/mcp";
import { verifyToken } from "@/lib/server/tokens";

/*
 * MCP endpoint (Streamable HTTP, stateless, JSON responses).
 * Auth: an API token from /admin/mcp, sent as "Authorization: Bearer ksk_..." or, for clients
 * that can only take a URL (claude.ai custom connectors), as ?key=ksk_...
 */

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const HTTP_UNAUTHORIZED = 401;
const HTTP_METHOD_NOT_ALLOWED = 405;
const HTTP_SERVICE_UNAVAILABLE = 503;
const JSONRPC_UNAUTHORIZED = -32001;
const JSONRPC_INTERNAL_ERROR = -32603;
const JSONRPC_METHOD_NOT_ALLOWED = -32000;

// The resource_metadata pointer lets OAuth clients (claude.ai connectors) find the sign-in flow in /api/mcp/oauth.
function unauthorized(message: string, origin: string) {
  const challenge = `Bearer realm="konsilience-blog", resource_metadata="${origin}/.well-known/oauth-protected-resource/api/mcp"`;
  return Response.json(
    { jsonrpc: "2.0", error: { code: JSONRPC_UNAUTHORIZED, message }, id: null },
    { status: HTTP_UNAUTHORIZED, headers: { "WWW-Authenticate": challenge } },
  );
}

async function handle(req: Request) {
  const url = new URL(req.url);
  const header = req.headers.get("authorization");
  // Matches "Bearer ksk_abc" (captures "ksk_abc"); rejects "Basic abc" and a bare "Bearer".
  // Tester: https://regex101.com/?regex=%5EBearer%5Cs%2B(.%2B)%24&flags=i&testString=Bearer%20ksk_abc%0ABasic%20abc%0ABearer
  const token = header?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim() ?? url.searchParams.get("key");

  let record;
  try {
    record = await verifyToken(token);
  } catch (err) {
    console.error("[mcp] token check failed", err);
    return Response.json(
      { jsonrpc: "2.0", error: { code: JSONRPC_INTERNAL_ERROR, message: "Database unavailable" }, id: null },
      { status: HTTP_SERVICE_UNAVAILABLE },
    );
  }
  if (!record) return unauthorized("Missing or invalid API token. Create one in the admin panel under MCP.", url.origin);

  const server = buildMcpServer({
    actor: { id: record.id, name: `MCP: ${record.name}`, source: "mcp" },
    adminBase: url.origin,
  });
  const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
  // Stateless: a fresh server per request, so no session state is shared between calls.
  await server.connect(transport);
  return transport.handleRequest(req);
}

export const POST = handle;

export function GET() {
  return Response.json(
    { jsonrpc: "2.0", error: { code: JSONRPC_METHOD_NOT_ALLOWED, message: "Method not allowed. Use POST." }, id: null },
    { status: HTTP_METHOD_NOT_ALLOWED, headers: { Allow: "POST" } },
  );
}

export const DELETE = GET;
