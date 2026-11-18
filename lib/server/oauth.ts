import "server-only";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { getDb } from "./db";
import { createToken } from "./tokens";

/*
 * OAuth 2.1 for the MCP endpoint, so claude.ai custom connectors can connect with "Connect" instead of
 * a pasted key. Flow:
 *   1. The client registers itself (RFC 7591) and gets a client_id. No secret: PKCE protects the code.
 *   2. The user is sent to /admin/authorize-mcp. It is signed-in admins only: they approve or deny.
 *   3. On approval a one-time code (5 minutes) goes back to the client's redirect_uri.
 *   4. The client exchanges the code and its PKCE verifier at /api/mcp/oauth/token for an access token.
 * The access token is an ordinary API token (ksk_...), so /admin/mcp lists it and can revoke it.
 */

const CLIENTS = "oauth_clients";
const CODES = "oauth_codes";

/** The authorization-request parameters the consent page carries through its form. */
export const AUTHORIZE_PARAMS = ["client_id", "redirect_uri", "response_type", "state", "code_challenge", "code_challenge_method"] as const;

const MS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const CODE_TTL_MINUTES = 5;
const CODE_TTL_MS = CODE_TTL_MINUTES * SECONDS_PER_MINUTE * MS_PER_SECOND;
const CODE_BYTES = 32;
const CLIENT_ID_BYTES = 24;
const MAX_CLIENT_NAME = 120;
const MAX_REDIRECT_URI_LENGTH = 500;
const MAX_REDIRECT_URIS = 10;
const MIN_PKCE_CHALLENGE_LENGTH = 43;
const MAX_TOKEN_NAME_LENGTH = 80;
const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400;
const HTTP_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;

type ClientDoc = { clientId: string; clientName: string; redirectUris: string[]; createdAt: Date };
type CodeDoc = {
  codeHash: string;
  clientId: string;
  clientName: string;
  redirectUri: string;
  codeChallenge: string;
  adminName: string;
  expiresAt: Date;
};

/** An OAuth error, returned as { error, error_description } in the shape RFC 6749 expects. */
export class OAuthError extends Error {
  constructor(
    public code: string,
    message: string,
    public status = HTTP_BAD_REQUEST,
  ) {
    super(message);
  }
}

const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");
const randomId = (bytes: number) => randomBytes(bytes).toString("base64url");
const col = async <T extends object>(name: string) => (await getDb()).collection<T>(name);

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function oauthJson(data: unknown, status = HTTP_OK): Response {
  return Response.json(data, { status, headers: { ...CORS, "Cache-Control": "no-store" } });
}

export function oauthPreflight(): Response {
  return new Response(null, { status: HTTP_NO_CONTENT, headers: CORS });
}

export function oauthError(err: unknown): Response {
  if (err instanceof OAuthError) return oauthJson({ error: err.code, error_description: err.message }, err.status);
  console.error("[oauth]", err);
  return oauthJson({ error: "server_error", error_description: "Something went wrong" }, HTTP_SERVER_ERROR);
}

/** RFC 9728 protected-resource metadata for the MCP endpoint at this origin. */
export function protectedResourceMetadata(origin: string) {
  return {
    resource: `${origin}/api/mcp`,
    authorization_servers: [origin],
    bearer_methods_supported: ["header"],
    resource_name: "Konsilience blog (MCP)",
  };
}

/** RFC 8414 authorization-server metadata for this origin. */
export function authorizationServerMetadata(origin: string) {
  return {
    issuer: origin,
    authorization_endpoint: `${origin}/admin/authorize-mcp`,
    token_endpoint: `${origin}/api/mcp/oauth/token`,
    registration_endpoint: `${origin}/api/mcp/oauth/register`,
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code"],
    code_challenge_methods_supported: ["S256"],
    token_endpoint_auth_methods_supported: ["none"],
  };
}

const registerSchema = z.object({
  client_name: z.string().trim().max(MAX_CLIENT_NAME).optional(),
  redirect_uris: z.array(z.string().max(MAX_REDIRECT_URI_LENGTH)).min(1).max(MAX_REDIRECT_URIS),
});

/** https, or plain http on localhost (desktop tools such as Claude Code or MCP Inspector). No fragments. */
function isAllowedRedirectUri(raw: string): boolean {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return false;
  }
  if (u.hash) return false;
  if (u.protocol === "https:") return true;
  return u.protocol === "http:" && (u.hostname === "localhost" || u.hostname === "127.0.0.1");
}

/** RFC 7591 dynamic client registration. Anyone may register; the admin still has to approve each use. */
export async function registerClient(raw: unknown) {
  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) throw new OAuthError("invalid_client_metadata", `redirect_uris must list 1 to ${MAX_REDIRECT_URIS} addresses`);
  const { client_name, redirect_uris } = parsed.data;
  const bad = redirect_uris.find((u) => !isAllowedRedirectUri(u));
  if (bad) throw new OAuthError("invalid_redirect_uri", `Redirect address not allowed: ${bad}`);

  const clientId = randomId(CLIENT_ID_BYTES);
  const clientName = client_name || "MCP client";
  const doc: ClientDoc = { clientId, clientName, redirectUris: redirect_uris, createdAt: new Date() };
  await (await col<ClientDoc>(CLIENTS)).insertOne(doc);
  return {
    client_id: clientId,
    client_id_issued_at: Math.floor(doc.createdAt.getTime() / MS_PER_SECOND),
    client_name: clientName,
    redirect_uris,
    grant_types: ["authorization_code"],
    response_types: ["code"],
    token_endpoint_auth_method: "none",
  };
}

export type AuthRequest = {
  clientId: string;
  clientName: string;
  redirectUri: string;
  state?: string;
  codeChallenge: string;
};

/**
 * Checks an authorization request. Problems with the client or redirect address are shown to the
 * admin as an error page (never redirected), because redirecting to an unverified address is unsafe.
 */
export async function validateAuthRequest(params: URLSearchParams): Promise<AuthRequest> {
  const clientId = params.get("client_id") ?? "";
  const redirectUri = params.get("redirect_uri") ?? "";
  const client = clientId ? await (await col<ClientDoc>(CLIENTS)).findOne({ clientId }) : null;
  if (!client) throw new OAuthError("invalid_client", "This connector is not registered. Remove it in Claude and add it again.");
  if (!client.redirectUris.includes(redirectUri)) {
    throw new OAuthError("invalid_request", "The redirect address does not match the one this connector registered.");
  }
  if (params.get("response_type") !== "code") throw new OAuthError("unsupported_response_type", "Only response_type=code is supported.");
  const codeChallenge = params.get("code_challenge") ?? "";
  if (params.get("code_challenge_method") !== "S256" || codeChallenge.length < MIN_PKCE_CHALLENGE_LENGTH) {
    throw new OAuthError("invalid_request", "PKCE is required: code_challenge with code_challenge_method=S256.");
  }
  return {
    clientId,
    clientName: client.clientName,
    redirectUri,
    state: params.get("state") ?? undefined,
    codeChallenge,
  };
}

/** Creates a one-time code for an approved request. Only its hash is stored. */
export async function issueCode(req: AuthRequest, adminName: string): Promise<string> {
  const code = randomId(CODE_BYTES);
  const doc: CodeDoc = {
    codeHash: sha256(code),
    clientId: req.clientId,
    clientName: req.clientName,
    redirectUri: req.redirectUri,
    codeChallenge: req.codeChallenge,
    adminName,
    expiresAt: new Date(Date.now() + CODE_TTL_MS),
  };
  await (await col<CodeDoc>(CODES)).insertOne(doc);
  return code;
}

const sameText = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

/** Exchanges a one-time code and PKCE verifier for an access token (a ksk_ API token). */
export async function exchangeCode(params: URLSearchParams): Promise<{ access_token: string; token_type: "Bearer" }> {
  if (params.get("grant_type") !== "authorization_code") throw new OAuthError("unsupported_grant_type", "Use grant_type=authorization_code.");
  const code = params.get("code") ?? "";
  const clientId = params.get("client_id") ?? "";
  const redirectUri = params.get("redirect_uri") ?? "";
  const verifier = params.get("code_verifier") ?? "";
  if (!code || !clientId || !redirectUri || !verifier) throw new OAuthError("invalid_request", "code, client_id, redirect_uri and code_verifier are required.");

  // Delete first, so a code can be used once even if two requests race.
  const doc = await (await col<CodeDoc>(CODES)).findOneAndDelete({ codeHash: sha256(code) });
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  if (!doc || doc.expiresAt < new Date() || doc.clientId !== clientId || doc.redirectUri !== redirectUri || !sameText(challenge, doc.codeChallenge)) {
    throw new OAuthError("invalid_grant", "The code is invalid, expired or already used. Connect again.");
  }

  const { token } = await createToken(`Connector: ${doc.clientName}`.slice(0, MAX_TOKEN_NAME_LENGTH), doc.adminName);
  return { access_token: token, token_type: "Bearer" };
}
