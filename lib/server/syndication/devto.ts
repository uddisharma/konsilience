import "server-only";
import { devtoTags, truncate, type Payload } from "./content";
import { env, parseBody, requestSignal } from "./shared";

/*
 * dev.to (Forem API v1). Creates an article with canonical_url set to the post on the site, so search
 * engines credit the original. Docs: https://developers.forem.com/api/v1
 */

const ENDPOINT = "https://dev.to/api/articles";
const MAX_TAGS = 4;
const MAX_DESCRIPTION = 160;

const HTTP_NOT_FOUND = 404;

/** dev.to's API cannot delete an article, so this unpublishes it (it goes back to the author's drafts). */
export async function unpublishFromDevto(remoteId: string): Promise<void> {
  const res = await fetch(`${ENDPOINT}/${encodeURIComponent(remoteId)}`, {
    method: "PUT",
    headers: { "api-key": env("DEVTO_API_KEY"), "Content-Type": "application/json", Accept: "application/vnd.forem.api-v1+json" },
    body: JSON.stringify({ article: { published: false } }),
    signal: requestSignal(),
  });
  if (res.ok || res.status === HTTP_NOT_FOUND) return;
  const data = await parseBody(res);
  throw new Error(`dev.to: ${typeof data.error === "string" ? data.error : `HTTP ${res.status}`}`);
}

export async function publishToDevto(p: Payload): Promise<{ url: string; remoteId: string }> {
  const article = {
    title: p.title,
    body_markdown: p.markdown,
    published: true,
    canonical_url: p.canonicalUrl,
    tags: devtoTags(p.tags, MAX_TAGS),
    ...(p.excerpt ? { description: truncate(p.excerpt, MAX_DESCRIPTION) } : {}),
  };
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "api-key": env("DEVTO_API_KEY"),
      "Content-Type": "application/json",
      Accept: "application/vnd.forem.api-v1+json",
    },
    body: JSON.stringify({ article }),
    signal: requestSignal(),
  });
  const data = await parseBody(res);
  if (!res.ok || typeof data.url !== "string") {
    const reason = typeof data.error === "string" ? data.error : `HTTP ${res.status}`;
    throw new Error(`dev.to: ${reason}`);
  }
  return { url: data.url, remoteId: String(data.id ?? "") };
}
