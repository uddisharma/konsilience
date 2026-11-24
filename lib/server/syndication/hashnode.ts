import "server-only";
import { hashnodeSlug, truncate, type Payload } from "./content";
import { env, parseBody, requestSignal } from "./shared";

/*
 * Hashnode (GraphQL). publishPost with the site post as originalArticleURL, so the canonical tag points at
 * the original. Auth is a personal access token from hashnode.com/settings/developer.
 * The field names are from Hashnode's public schema; confirm them with one test post.
 */

const ENDPOINT = "https://gql.hashnode.com";
const MAX_TAGS = 5;
const MAX_SUBTITLE = 250;

const PUBLISH_POST = `mutation PublishPost($input: PublishPostInput!) {
  publishPost(input: $input) {
    post { id slug url }
  }
}`;

type GraphQLResponse = {
  data?: { publishPost?: { post?: { id?: string; url?: string } } };
  errors?: { message?: string }[];
};

const REMOVE_POST = `mutation RemovePost($input: RemovePostInput!) {
  removePost(input: $input) {
    post { id }
  }
}`;

/** Deletes the post from the Hashnode publication. A post that is already gone counts as removed. */
export async function unpublishFromHashnode(remoteId: string): Promise<void> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: env("HASHNODE_PAT"), "Content-Type": "application/json" },
    body: JSON.stringify({ query: REMOVE_POST, variables: { input: { id: remoteId } } }),
    signal: requestSignal(),
  });
  const data = (await parseBody(res)) as { errors?: { message?: string; extensions?: { code?: string } }[] };
  const err = data.errors?.[0];
  if (res.ok && !err) return;
  if (err?.extensions?.code === "NOT_FOUND" || /not found/i.test(err?.message ?? "")) return;
  throw new Error(`Hashnode: ${err?.message ?? `HTTP ${res.status}`}`);
}

export async function publishToHashnode(p: Payload): Promise<{ url: string; remoteId: string }> {
  const input = {
    title: p.title,
    subtitle: truncate(p.excerpt, MAX_SUBTITLE) || undefined,
    contentMarkdown: p.markdown,
    publicationId: env("HASHNODE_PUBLICATION_ID"),
    originalArticleURL: p.canonicalUrl,
    tags: p.tags.slice(0, MAX_TAGS).map((t) => ({ name: t, slug: hashnodeSlug(t) })),
  };
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: env("HASHNODE_PAT"), "Content-Type": "application/json" },
    body: JSON.stringify({ query: PUBLISH_POST, variables: { input } }),
    signal: requestSignal(),
  });
  const data = (await parseBody(res)) as GraphQLResponse;
  const post = data.data?.publishPost?.post;
  if (!res.ok || data.errors?.length || !post?.url) {
    const reason = data.errors?.[0]?.message ?? `HTTP ${res.status}`;
    throw new Error(`Hashnode: ${reason}`);
  }
  return { url: post.url, remoteId: post.id ?? "" };
}
