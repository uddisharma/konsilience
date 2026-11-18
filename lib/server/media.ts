import "server-only";
import { GridFSBucket, ObjectId } from "mongodb";
import { getDb } from "./db";
import { HttpError } from "./http";

/*
 * Image uploads, stored in MongoDB GridFS (no extra storage service needed) and served from
 * /api/media/<id>. SVG is refused because it can carry scripts.
 */

export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"];
// Vercel functions accept request bodies up to 4.5 MB.
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export type MediaPublic = { id: string; url: string; filename: string; contentType: string; size: number; alt: string; uploadedAt: string; uploadedBy: string };

type MediaMeta = { contentType: string; alt: string; uploadedBy: string };

const bucket = async () => new GridFSBucket(await getDb(), { bucketName: "media" });

const toPublic = (f: { _id: ObjectId; filename: string; length: number; uploadDate: Date; metadata?: Partial<MediaMeta> }): MediaPublic => ({
  id: f._id.toHexString(),
  url: `/api/media/${f._id.toHexString()}`,
  filename: f.filename,
  contentType: f.metadata?.contentType ?? "application/octet-stream",
  size: f.length,
  alt: f.metadata?.alt ?? "",
  uploadedAt: f.uploadDate.toISOString(),
  uploadedBy: f.metadata?.uploadedBy ?? "",
});

export async function uploadImage(file: File, alt: string, uploadedBy: string): Promise<MediaPublic> {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) throw new HttpError(415, "Only PNG, JPEG, WebP, GIF and AVIF images are allowed");
  if (file.size > MAX_UPLOAD_BYTES) throw new HttpError(413, "Images must be 4 MB or smaller");
  const b = await bucket();
  const filename = file.name.replace(/[^\w.-]+/g, "-").slice(0, 120) || "image";
  const metadata: MediaMeta = { contentType: file.type, alt: alt.slice(0, 300), uploadedBy };
  const stream = b.openUploadStream(filename, { metadata });
  const data = Buffer.from(await file.arrayBuffer());
  await new Promise<void>((resolve, reject) => {
    stream.on("error", reject);
    stream.on("finish", () => resolve());
    stream.end(data);
  });
  return toPublic({ _id: stream.id as ObjectId, filename, length: data.length, uploadDate: new Date(), metadata });
}

export async function listMedia(limit = 200) {
  const b = await bucket();
  const files = await b.find({}, { sort: { uploadDate: -1 }, limit }).toArray();
  return files.map((f) => toPublic(f as Parameters<typeof toPublic>[0]));
}

export async function readImage(id: string) {
  if (!ObjectId.isValid(id)) return null;
  const b = await bucket();
  const _id = new ObjectId(id);
  const [file] = await b.find({ _id }).limit(1).toArray();
  if (!file) return null;
  const chunks: Buffer[] = [];
  for await (const chunk of b.openDownloadStream(_id)) chunks.push(chunk as Buffer);
  return { data: Buffer.concat(chunks), contentType: (file.metadata as MediaMeta | undefined)?.contentType ?? "application/octet-stream" };
}

export async function deleteImage(id: string) {
  if (!ObjectId.isValid(id)) throw new HttpError(404, "Image not found");
  try {
    await (await bucket()).delete(new ObjectId(id));
  } catch {
    throw new HttpError(404, "Image not found");
  }
}
