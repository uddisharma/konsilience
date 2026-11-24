import "server-only";
import { revalidatePath } from "next/cache";
import type { PostRecord } from "@/lib/blog/schema";

const onKonsilience = (p: PostRecord | null | undefined): p is PostRecord => !!p && (p.site === "konsilience" || p.sites.includes("konsilience"));

/**
 * Refreshes the cached blog pages after a post changes. Pass the post before and after the change, so a
 * post that was just unpublished from Konsilience disappears too. Trasys pages live on trasys.dev.
 */
export function revalidatePosts(...posts: (PostRecord | null | undefined)[]) {
  const affected = posts.filter(onKonsilience);
  if (affected.length === 0) return;
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  for (const p of affected) revalidatePath(`/blog/${p.slug}`);
}
