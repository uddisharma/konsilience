import "server-only";
import { truncate, type Payload } from "./content";
import { env, parseBody, requestSignal } from "./shared";

/*
 * Bluesky (AT Protocol). Logs in with an app password, then writes one app.bsky.feed.post: a teaser,
 * a link facet and a link card pointing at the post on the site. Bluesky posts are short, so the
 * full article is not copied here.
 */

const ENDPOINT = "https://bsky.social/xrpc";
const MAX_TEXT = 300;
const MAX_CARD_TITLE = 300;
const MAX_CARD_DESCRIPTION = 300;
const PARAGRAPH_BREAK = "\n\n";

async function xrpc(nsid: string, token: string | undefined, body: unknown): Promise<Record<string, unknown>> {
  const res = await fetch(`${ENDPOINT}/${nsid}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(body),
    signal: requestSignal(),
  });
  const data = await parseBody(res);
  if (!res.ok) throw new Error(`Bluesky: ${String(data.message ?? data.error ?? `HTTP ${res.status}`)}`);
  return data;
}

export async function publishToBluesky(p: Payload): Promise<{ url: string; remoteId: string }> {
  const session = await xrpc("com.atproto.server.createSession", undefined, {
    identifier: env("BLUESKY_IDENTIFIER"),
    password: env("BLUESKY_APP_PASSWORD"),
  });
  const { accessJwt, did } = session as { accessJwt: string; did: string };

  // The link goes last and is never cut; the title and excerpt fill the rest of the 300 characters.
  const headline = p.excerpt ? `${p.title}${PARAGRAPH_BREAK}${p.excerpt}` : p.title;
  const tail = `${PARAGRAPH_BREAK}${p.canonicalUrl}`;
  const head = truncate(headline, MAX_TEXT - Array.from(tail).length);
  const text = `${head}${tail}`;
  const linkStart = Buffer.byteLength(`${head}${PARAGRAPH_BREAK}`, "utf8");

  const record = {
    $type: "app.bsky.feed.post",
    text,
    createdAt: new Date().toISOString(),
    facets: [
      {
        index: { byteStart: linkStart, byteEnd: linkStart + Buffer.byteLength(p.canonicalUrl, "utf8") },
        features: [{ $type: "app.bsky.richtext.facet#link", uri: p.canonicalUrl }],
      },
    ],
    embed: {
      $type: "app.bsky.embed.external",
      external: {
        uri: p.canonicalUrl,
        title: truncate(p.title, MAX_CARD_TITLE),
        description: truncate(p.excerpt, MAX_CARD_DESCRIPTION),
      },
    },
  };

  const created = await xrpc("com.atproto.repo.createRecord", accessJwt, {
    repo: did,
    collection: "app.bsky.feed.post",
    record,
  });
  const uri = String(created.uri ?? "");
  const rkey = uri.split("/").pop() ?? "";
  return { url: `https://bsky.app/profile/${did}/post/${rkey}`, remoteId: uri };
}
