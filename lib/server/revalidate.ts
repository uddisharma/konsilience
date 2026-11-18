import "server-only";
import { revalidatePath } from "next/cache";
import type { PostRecord } from "@/lib/blog/schema";

/** Refreshes the cached blog pages after a post changes. Trasys posts live on trasys.dev, so only the API is affected. */
export function revalidatePosts(...posts: (PostRecord | null | undefined)[]) {
  if (!posts.some((p) => p?.site === "konsilience")) return;
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  for (const p of posts) if (p?.site === "konsilience") revalidatePath(`/blog/${p.slug}`);
}
