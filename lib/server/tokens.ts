import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { ObjectId } from "mongodb";
import { getDb } from "./db";
import { HttpError } from "./http";

/*
 * API tokens for the MCP server. Only a SHA-256 hash is stored; the token itself is shown once,
 * when it is created.
 */

type TokenDoc = {
  name: string;
  tokenHash: string;
  prefix: string;
  createdBy: string;
  createdAt: Date;
  lastUsedAt?: Date;
};

export type TokenPublic = { id: string; name: string; prefix: string; createdBy: string; createdAt: string; lastUsedAt?: string };

const TOKEN_PREFIX = "ksk_";
const col = async () => (await getDb()).collection<TokenDoc>("api_tokens");
const hash = (t: string) => createHash("sha256").update(t).digest("hex");

const pub = (d: TokenDoc & { _id: ObjectId }): TokenPublic => ({
  id: d._id.toHexString(),
  name: d.name,
  prefix: d.prefix,
  createdBy: d.createdBy,
  createdAt: d.createdAt.toISOString(),
  lastUsedAt: d.lastUsedAt?.toISOString(),
});

export async function listTokens() {
  return (await (await col()).find().sort({ createdAt: -1 }).toArray()).map(pub);
}

export async function createToken(name: string, createdBy: string) {
  const clean = name.trim().slice(0, 80);
  if (!clean) throw new HttpError(400, "Give the token a name");
  const token = TOKEN_PREFIX + randomBytes(32).toString("base64url");
  const doc: TokenDoc = { name: clean, tokenHash: hash(token), prefix: token.slice(0, 12), createdBy, createdAt: new Date() };
  const res = await (await col()).insertOne(doc as TokenDoc & { _id?: ObjectId });
  return { token, record: pub({ ...doc, _id: res.insertedId }) };
}

export async function revokeToken(id: string) {
  if (!ObjectId.isValid(id)) throw new HttpError(404, "Token not found");
  const res = await (await col()).deleteOne({ _id: new ObjectId(id) });
  if (!res.deletedCount) throw new HttpError(404, "Token not found");
}

/** Returns the token's record if it is valid, and records when it was last used. */
export async function verifyToken(token: string | null | undefined) {
  if (!token || !token.startsWith(TOKEN_PREFIX)) return null;
  const c = await col();
  const d = await c.findOneAndUpdate({ tokenHash: hash(token) }, { $set: { lastUsedAt: new Date() } });
  return d ? pub(d) : null;
}
