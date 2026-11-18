import "server-only";
import { MongoClient, type Db } from "mongodb";

/*
 * One MongoDB client per server process. In development the client is kept on globalThis so hot
 * reloads do not open a new connection pool each time.
 */

type Cache = { client?: Promise<MongoClient>; indexes?: Promise<void> };
const g = globalThis as typeof globalThis & { __mongo?: Cache };
const cache: Cache = (g.__mongo ??= {});

export const isDbConfigured = () => !!process.env.MONGODB_URI;

export class DbNotConfiguredError extends Error {
  constructor() {
    super("MONGODB_URI is not set. Add it to .env.local (see .env.example).");
  }
}

async function ensureIndexes(db: Db) {
  await Promise.all([
    db.collection("posts").createIndex({ site: 1, slug: 1 }, { unique: true }),
    db.collection("posts").createIndex({ site: 1, status: 1, publishedAt: -1 }),
    db.collection("admins").createIndex({ email: 1 }, { unique: true }),
    db.collection("api_tokens").createIndex({ tokenHash: 1 }, { unique: true }),
  ]);
}

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new DbNotConfiguredError();
  cache.client ??= new MongoClient(uri, { maxPoolSize: 10, serverSelectionTimeoutMS: 8000 }).connect().catch((err) => {
    cache.client = undefined;
    throw err;
  });
  const db = (await cache.client).db(process.env.MONGODB_DB || "konsilience");
  cache.indexes ??= ensureIndexes(db).catch((err) => {
    cache.indexes = undefined;
    console.error("[db] index creation failed", err);
  });
  await cache.indexes;
  return db;
}
