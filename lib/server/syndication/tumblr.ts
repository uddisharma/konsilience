import "server-only";
import { createHmac, randomBytes } from "node:crypto";
import type { Payload } from "./content";
import { env, parseBody, requestSignal } from "./shared";

/*
 * Tumblr (NPF posts API). Posts the article as text blocks, tagged, and published. Requests are signed
 * with OAuth 1.0a using the app's consumer key/secret and the blog owner's token/token secret, created
 * once at https://www.tumblr.com/oauth/apps (or the API console).
 */

const ENDPOINT = "https://api.tumblr.com/v2/blog";
const MAX_TAGS = 30;
const NONCE_BYTES = 16;
const MS_PER_SECOND = 1000;
const HEADING_PREFIX = "## ";

// OAuth 1.0a escapes everything except letters, digits and - . _ ~ (RFC 3986).
// Matches "!" and "'" (and "*", "(", ")"); rejects "a" and "-".
// Tester: https://regex101.com/?regex=%5B!'()*%5D&flags=g
const RFC3986_EXTRA = /[!'()*]/g;

const HEX_RADIX = 16;
const encodeRfc3986 = (s: string): string =>
  encodeURIComponent(s).replace(RFC3986_EXTRA, (c) => `%${c.charCodeAt(0).toString(HEX_RADIX).toUpperCase()}`);

type Creds = { consumerKey: string; consumerSecret: string; token: string; tokenSecret: string };

/** `formParams`: fields of a form-encoded body. OAuth 1.0a signs them too (a JSON body is not signed). */
function oauthHeader(method: string, url: string, c: Creds, formParams: Record<string, string> = {}): string {
  const params: Record<string, string> = {
    oauth_consumer_key: c.consumerKey,
    oauth_nonce: randomBytes(NONCE_BYTES).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: String(Math.floor(Date.now() / MS_PER_SECOND)),
    oauth_token: c.token,
    oauth_version: "1.0",
  };
  const toSign: Record<string, string> = { ...formParams, ...params };
  const paramString = Object.keys(toSign)
    .sort()
    .map((k) => `${encodeRfc3986(k)}=${encodeRfc3986(toSign[k])}`)
    .join("&");
  // The body is JSON, so it is not part of the signature base string.
  const base = [method.toUpperCase(), encodeRfc3986(url), encodeRfc3986(paramString)].join("&");
  const key = `${encodeRfc3986(c.consumerSecret)}&${encodeRfc3986(c.tokenSecret)}`;
  const signed: Record<string, string> = { ...params, oauth_signature: createHmac("sha1", key).update(base).digest("base64") };
  return `OAuth ${Object.keys(signed)
    .sort()
    .map((k) => `${encodeRfc3986(k)}="${encodeRfc3986(signed[k])}"`)
    .join(", ")}`;
}

/** The article as NPF text blocks: title, excerpt, then each paragraph ("## " lines become headings). */
function npfContent(p: Payload) {
  const title = { type: "text", subtype: "heading1", text: p.title };
  const excerpt = p.excerpt ? [{ type: "text", text: p.excerpt }] : [];
  const body = p.paragraphs.map((text) =>
    text.startsWith(HEADING_PREFIX)
      ? { type: "text", subtype: "heading2", text: text.slice(HEADING_PREFIX.length) }
      : { type: "text", text },
  );
  return [title, ...excerpt, ...body];
}

const credentials = (): Creds => ({
  consumerKey: env("TUMBLR_CONSUMER_KEY"),
  consumerSecret: env("TUMBLR_CONSUMER_SECRET"),
  token: env("TUMBLR_OAUTH_TOKEN"),
  tokenSecret: env("TUMBLR_OAUTH_TOKEN_SECRET"),
});

const HTTP_NOT_FOUND = 404;

/** Deletes the post from the blog (POST /post/delete with the post id). A post already gone counts as removed. */
export async function unpublishFromTumblr(remoteId: string): Promise<void> {
  const url = `${ENDPOINT}/${env("TUMBLR_BLOG")}/post/delete`;
  const form = { id: remoteId };
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: oauthHeader("POST", url, credentials(), form), "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(form).toString(),
    signal: requestSignal(),
  });
  if (res.ok || res.status === HTTP_NOT_FOUND) return;
  const data = await parseBody(res);
  throw new Error(`Tumblr: ${(data.meta as { msg?: string } | undefined)?.msg ?? `HTTP ${res.status}`}`);
}

export async function publishToTumblr(p: Payload): Promise<{ url: string; remoteId: string }> {
  const blog = env("TUMBLR_BLOG");
  const creds = credentials();
  const url = `${ENDPOINT}/${blog}/posts`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: oauthHeader("POST", url, creds), "Content-Type": "application/json" },
    body: JSON.stringify({ content: npfContent(p), state: "published", tags: p.tags.slice(0, MAX_TAGS).join(",") }),
    signal: requestSignal(),
  });
  const data = await parseBody(res);
  const meta = data.meta as { msg?: string } | undefined;
  const created = data.response as { id?: number; id_string?: string } | undefined;
  const id = created?.id_string ?? (created?.id !== undefined ? String(created.id) : undefined);
  if (!res.ok || !id) throw new Error(`Tumblr: ${meta?.msg ?? `HTTP ${res.status}`}`);
  return { url: `https://${blog}/post/${id}`, remoteId: id };
}
