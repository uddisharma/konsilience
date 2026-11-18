import "server-only";
import bcrypt from "bcryptjs";
import { ObjectId, MongoServerError } from "mongodb";
import { z } from "zod";
import { getDb } from "./db";
import { HttpError } from "./http";

/* The Admin model: people who can sign in to /admin. */

export type AdminDoc = {
  email: string;
  name: string;
  passwordHash: string;
  role: "owner" | "admin";
  /** Bumped on password change: signs out every existing session. */
  tokenVersion: number;
  createdAt: Date;
  lastLoginAt?: Date;
};

export type AdminPublic = { id: string; email: string; name: string; role: AdminDoc["role"]; createdAt: string; lastLoginAt?: string; tokenVersion: number };

const BCRYPT_COST = 12;
const MIN_PASSWORD = 10;

export const adminCreateSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  name: z.string().trim().min(1).max(120),
  password: z.string().min(MIN_PASSWORD, `Password must be at least ${MIN_PASSWORD} characters`).max(200),
  role: z.enum(["owner", "admin"]).default("admin"),
});

const col = async () => (await getDb()).collection<AdminDoc>("admins");

const pub = (d: AdminDoc & { _id: ObjectId }): AdminPublic => ({
  id: d._id.toHexString(),
  email: d.email,
  name: d.name,
  role: d.role,
  tokenVersion: d.tokenVersion,
  createdAt: d.createdAt.toISOString(),
  lastLoginAt: d.lastLoginAt?.toISOString(),
});

export async function listAdmins() {
  return (await (await col()).find().sort({ createdAt: 1 }).toArray()).map(pub);
}

export async function getAdmin(id: string) {
  if (!ObjectId.isValid(id)) return null;
  const d = await (await col()).findOne({ _id: new ObjectId(id) });
  return d ? pub(d) : null;
}

export async function createAdmin(raw: unknown) {
  const input = adminCreateSchema.parse(raw);
  const doc: AdminDoc = {
    email: input.email,
    name: input.name,
    role: input.role,
    passwordHash: await bcrypt.hash(input.password, BCRYPT_COST),
    tokenVersion: 0,
    createdAt: new Date(),
  };
  try {
    const res = await (await col()).insertOne(doc as AdminDoc & { _id?: ObjectId });
    return pub({ ...doc, _id: res.insertedId });
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) throw new HttpError(409, "An admin with this email already exists");
    throw err;
  }
}

// Compared against when the email is unknown, so a wrong email takes as long as a wrong password.
let dummyHash: Promise<string> | undefined;

export async function verifyLogin(email: string, password: string) {
  const c = await col();
  const d = await c.findOne({ email: email.trim().toLowerCase() });
  const ok = await bcrypt.compare(password, d?.passwordHash ?? (await (dummyHash ??= bcrypt.hash("not-a-password", BCRYPT_COST))));
  if (!d || !ok) return null;
  await c.updateOne({ _id: d._id }, { $set: { lastLoginAt: new Date() } });
  return pub(d);
}

export async function changePassword(id: string, current: string, next: string) {
  if (next.length < MIN_PASSWORD) throw new HttpError(400, `Password must be at least ${MIN_PASSWORD} characters`);
  const c = await col();
  const d = await c.findOne({ _id: new ObjectId(id) });
  if (!d || !(await bcrypt.compare(current, d.passwordHash))) throw new HttpError(400, "Current password is wrong");
  await c.updateOne({ _id: d._id }, { $set: { passwordHash: await bcrypt.hash(next, BCRYPT_COST) }, $inc: { tokenVersion: 1 } });
}

export async function deleteAdmin(id: string, actorId: string) {
  if (id === actorId) throw new HttpError(400, "You cannot delete your own account");
  if (!ObjectId.isValid(id)) throw new HttpError(404, "Admin not found");
  const c = await col();
  const res = await c.deleteOne({ _id: new ObjectId(id) });
  if (!res.deletedCount) throw new HttpError(404, "Admin not found");
}
