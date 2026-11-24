import "server-only";
import { MongoServerError, ObjectId, type Filter, type WithId } from "mongodb";
import { postInputSchema, postPatchSchema, SITES, type PostInput, type PostRecord, type PostStatus, type Site } from "@/lib/blog/schema";
import { siteConfigs } from "@/lib/blog/sites";
import { readingTime, slugify } from "@/lib/blog/utils";
import { getDb, isDbConfigured } from "./db";
import { HttpError } from "./http";

type PostDoc = Omit<PostInput, "publishedAt"> & {
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
  source?: "admin" | "mcp";
  computedReadTime?: number;
};

export type Actor = { id: string; name: string; source: "admin" | "mcp" };

const col = async () => (await getDb()).collection<PostDoc>("posts");

/** Posts saved before `sites` existed were live on their one `site` when published. */
const sitesOf = (d: Pick<PostDoc, "site" | "status"> & { sites?: Site[] }): Site[] => d.sites ?? (d.status === "published" ? [d.site] : []);

/** Matches posts live (or, for old posts, homed) on a site, whether saved before or after `sites` existed. */
const onSite = (site: Site): Filter<PostDoc> => ({ $or: [{ sites: site }, { sites: { $exists: false }, site }] });

function serialize(d: WithId<PostDoc>): PostRecord {
  const { _id, publishedAt, createdAt, updatedAt, ...rest } = d;
  return {
    ...rest,
    sites: sitesOf(d),
    id: _id.toHexString(),
    publishedAt: publishedAt ? publishedAt.toISOString() : null,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
}

function oid(id: string) {
  if (!ObjectId.isValid(id)) throw new HttpError(404, "Post not found");
  return new ObjectId(id);
}

function toDate(v: string | null | undefined): Date | null {
  if (!v) return null;
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) throw new HttpError(400, "publishedAt is not a valid date");
  return d;
}

/**
 * Keeps `status` and `sites` consistent: only a published post is live anywhere, and publishing with no
 * site chosen publishes on the home site. The home site follows the live sites, Konsilience first.
 */
function placement(input: PostInput): Pick<PostInput, "site" | "sites" | "status"> {
  if (input.status !== "published") return { site: input.site, sites: [], status: input.status };
  // SITES lists Konsilience first, so it becomes the home site whenever the post is live there.
  const sites = SITES.filter((s) => input.sites.includes(s));
  if (sites.length === 0) sites.push(input.site);
  return { site: sites[0], sites, status: "published" };
}

/** Fills in what the writer left out: slug, author, closing CTA, and a publish date when publishing. */
function normalize(input: PostInput, prev?: PostDoc): Omit<PostDoc, "createdAt" | "updatedAt"> {
  const out = { ...input, ...placement(input) };
  const cfg = siteConfigs[out.site];
  out.slug = input.slug || slugify(input.title);
  if (!out.author.name) out.author = { ...out.author, name: cfg.defaultAuthor.name, role: out.author.role || cfg.defaultAuthor.role };
  let publishedAt = toDate(input.publishedAt);
  if (input.status === "published" && !publishedAt) publishedAt = prev?.publishedAt ?? new Date();
  return { ...out, publishedAt, computedReadTime: readingTime(out.blocks) };
}

const SLUG_TAKEN = "Another post already uses this slug";

/** A post can be live on both sites, so slugs are unique across all posts, not per site. */
async function assertSlugFree(slug: string, exceptId?: ObjectId) {
  const other = await (await col()).findOne({ slug, ...(exceptId ? { _id: { $ne: exceptId } } : {}) }, { projection: { _id: 1 } });
  if (other) throw new HttpError(409, SLUG_TAKEN);
}

async function write<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) throw new HttpError(409, SLUG_TAKEN);
    throw err;
  }
}

export type ListQuery = { site?: Site; status?: PostStatus; q?: string; limit?: number; skip?: number };

export async function listPosts({ site, status, q, limit = 50, skip = 0 }: ListQuery = {}) {
  const and: Filter<PostDoc>[] = [];
  if (site) and.push(onSite(site));
  if (status) and.push({ status });
  if (q) {
    const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    and.push({ $or: [{ title: rx }, { slug: rx }, { excerpt: rx }, { tags: rx }] });
  }
  const filter: Filter<PostDoc> = and.length ? { $and: and } : {};
  const c = await col();
  const [docs, total] = await Promise.all([
    c
      .find(filter, { projection: { blocks: 0 } })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(Math.min(limit, 200))
      .toArray(),
    c.countDocuments(filter),
  ]);
  return { posts: docs.map((d) => serialize({ ...d, blocks: [] })), total };
}

export async function getPost(id: string) {
  const d = await (await col()).findOne({ _id: oid(id) });
  if (!d) throw new HttpError(404, "Post not found");
  return serialize(d);
}

export async function findPostBySlug(site: Site, slug: string) {
  const d = await (await col()).findOne({ slug, $or: [{ site }, { sites: site }] });
  return d ? serialize(d) : null;
}

export async function createPost(raw: unknown, actor: Actor) {
  const r = raw as Record<string, unknown>;
  const input = postInputSchema.parse({ ...r, slug: r?.slug || slugify(String(r?.title ?? "")) });
  const now = new Date();
  const doc: PostDoc = { ...normalize(input), createdAt: now, updatedAt: now, createdBy: actor.name, updatedBy: actor.name, source: actor.source };
  await assertSlugFree(doc.slug);
  const res = await write(async () => (await col()).insertOne(doc as PostDoc & { _id?: ObjectId }));
  return serialize({ ...doc, _id: res.insertedId });
}

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);

/**
 * Applies only the keys present in `raw`, over the stored post, then validates the whole result.
 * (Parsing the patch on its own would fill zod defaults for missing keys, e.g. blocks -> [].)
 */
export async function updatePost(id: string, raw: unknown, actor: Actor) {
  if (!isObj(raw)) throw new HttpError(400, "Send the fields to change as a JSON object");
  const c = await col();
  const prev = await c.findOne({ _id: oid(id) });
  if (!prev) throw new HttpError(404, "Post not found");
  const known = new Set(Object.keys(postPatchSchema.shape));
  const patch = Object.fromEntries(Object.entries(raw).filter(([k, v]) => known.has(k) && v !== undefined));
  const design = isObj(raw.design) ? raw.design : {};
  const merged = postInputSchema.parse({
    ...serialize(prev),
    ...patch,
    author: { ...prev.author, ...(isObj(raw.author) ? raw.author : {}) },
    design: { ...prev.design, ...design, ctaBand: { ...prev.design.ctaBand, ...(isObj(design.ctaBand) ? design.ctaBand : {}) } },
    seo: { ...prev.seo, ...(isObj(raw.seo) ? raw.seo : {}) },
  });
  const next = { ...normalize(merged, prev), updatedAt: new Date(), updatedBy: actor.name };
  if (next.slug !== prev.slug) await assertSlugFree(next.slug, prev._id);
  await write(() => c.updateOne({ _id: prev._id }, { $set: next }));
  return { before: serialize(prev), after: serialize({ ...prev, ...next }) };
}

export async function deletePost(id: string) {
  const c = await col();
  const prev = await c.findOneAndDelete({ _id: oid(id) });
  if (!prev) throw new HttpError(404, "Post not found");
  return serialize(prev);
}

/* ---------- Public reads (published and due) ---------- */

const publicFilter = (site: Site): Filter<PostDoc> => ({ ...onSite(site), status: "published", publishedAt: { $lte: new Date() } });

/** Never throws: the public blog still renders (with the built-in posts) if the database is down. */
export async function publicPosts(site: Site, opts: { limit?: number; category?: string } = {}): Promise<PostRecord[]> {
  if (!isDbConfigured()) return [];
  try {
    const filter = publicFilter(site);
    if (opts.category) filter.category = opts.category;
    const docs = await (await col())
      .find(filter, { projection: { blocks: 0 } })
      .sort({ publishedAt: -1 })
      .limit(opts.limit ?? 500)
      .toArray();
    return docs.map((d) => serialize({ ...d, blocks: [] }));
  } catch (err) {
    console.error("[blog] could not load posts", err);
    return [];
  }
}

export async function publicPost(site: Site, slug: string): Promise<PostRecord | null> {
  if (!isDbConfigured()) return null;
  try {
    const d = await (await col()).findOne({ ...publicFilter(site), slug });
    return d ? serialize(d) : null;
  } catch (err) {
    console.error("[blog] could not load post", err);
    return null;
  }
}
