import "server-only";
import { getDb } from "../db";
import type { Platform } from "./platforms";

/* One row per post and platform: where it was posted, or why it failed. Keeps a post from going up twice. */

export type SyndicationRecord = {
  postId: string;
  platform: Platform;
  status: "posted" | "failed";
  url?: string;
  remoteId?: string;
  error?: string;
  at: Date;
  by: string;
};

const col = async () => (await getDb()).collection<SyndicationRecord>("syndications");

export async function saveSyndication(record: SyndicationRecord): Promise<void> {
  const { postId, platform, ...rest } = record;
  await (await col()).updateOne({ postId, platform }, { $set: { postId, platform, ...rest } }, { upsert: true });
}

/** Forgets a platform's copy of a post (after it was removed there), so it can be posted again. */
export async function removeSyndication(postId: string, platform: Platform): Promise<void> {
  await (await col()).deleteOne({ postId, platform });
}

export async function listSyndications(postId: string): Promise<SyndicationRecord[]> {
  return (await (await col()).find({ postId }, { projection: { _id: 0 } }).toArray()) as SyndicationRecord[];
}
