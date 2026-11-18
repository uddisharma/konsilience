#!/usr/bin/env node
/*
 * Creates (or resets the password of) an admin for /admin.
 *
 *   bun run admin:create <email> <password> [name] [--owner]
 *
 * Bun reads MONGODB_URI / MONGODB_DB from .env.local automatically. With Node:
 *   node --env-file=.env.local scripts/create-admin.mjs <email> <password> [name]
 * The first admin ever created is always an owner.
 */
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

const args = process.argv.slice(2).filter((a) => a !== "--owner");
const forceOwner = process.argv.includes("--owner");
const [emailRaw, password, ...nameParts] = args;
const email = emailRaw?.trim().toLowerCase();
const name = nameParts.join(" ").trim() || email?.split("@")[0];

if (!email || !password || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error("Usage: bun run admin:create <email> <password> [name] [--owner]");
  process.exit(1);
}
if (password.length < 10) {
  console.error("Password must be at least 10 characters.");
  process.exit(1);
}
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not set. Add it to .env.local.");
  process.exit(1);
}

const client = new MongoClient(process.env.MONGODB_URI);
try {
  await client.connect();
  const admins = client.db(process.env.MONGODB_DB || "konsilience").collection("admins");
  await admins.createIndex({ email: 1 }, { unique: true });
  const isFirst = (await admins.countDocuments()) === 0;
  const passwordHash = await bcrypt.hash(password, 12);
  const existing = await admins.findOne({ email });
  if (existing) {
    await admins.updateOne(
      { _id: existing._id },
      { $set: { passwordHash, ...(forceOwner ? { role: "owner" } : {}) }, $inc: { tokenVersion: 1 } },
    );
    console.log(`Password reset for ${email}. Existing sessions were signed out.`);
  } else {
    await admins.insertOne({ email, name, passwordHash, role: isFirst || forceOwner ? "owner" : "admin", tokenVersion: 0, createdAt: new Date() });
    console.log(`Admin created: ${email} (${isFirst || forceOwner ? "owner" : "admin"}). Sign in at /admin/login`);
  }
} finally {
  await client.close();
}
