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

function unauthorized(message: string) {
  return Response.json(
    { jsonrpc: "2.0", error: { code: -32001, message }, id: null },
    { status: 401, headers: { "WWW-Authenticate": 'Bearer realm="konsilience-blog"' } },
  );
}

async function handle(req: Request) {
  const url = new URL(req.url);
  const header = req.headers.get("authorization");
  const token = header?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim() ?? url.searchParams.get("key");

  let record;
  try {
    record = await verifyToken(token);
  } catch (err) {
    console.error("[mcp] token check failed", err);
    return Response.json({ jsonrpc: "2.0", error: { code: -32603, message: "Database unavailable" }, id: null }, { status: 503 });
  }
  if (!record) return unauthorized("Missing or invalid API token. Create one in the admin panel under MCP.");

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
  return Response.json({ jsonrpc: "2.0", error: { code: -32000, message: "Method not allowed. Use POST." }, id: null }, { status: 405, headers: { Allow: "POST" } });
}

export const DELETE = GET;
