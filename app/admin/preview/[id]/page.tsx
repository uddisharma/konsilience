import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import { siteConfigs } from "@/lib/blog/sites";
import { getSessionAdmin } from "@/lib/server/auth";
import { HttpError } from "@/lib/server/http";
import { getPost } from "@/lib/server/posts";

export const dynamic = "force-dynamic";

/** Renders any post (drafts too) exactly as the public article page does. */
export default async function PreviewPage({ params }: PageProps<"/admin/preview/[id]">) {
  if (!(await getSessionAdmin())) redirect("/admin/login");
  const { id } = await params;
  const post = await getPost(id).catch((e) => {
    if (e instanceof HttpError && e.status === 404) return null;
    throw e;
  });
  if (!post) notFound();
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] flex flex-wrap items-center justify-center gap-3 bg-amber-500 px-4 py-2 text-sm font-semibold text-black">
        Preview · {post.status}
        {post.site === "trasys" && ` · rendered in the Konsilience design; ${siteConfigs.trasys.name} styles it on trasys.dev`}
        <Link href={`/admin/posts/${post.id}`} className="underline">Back to editor</Link>
      </div>
      <BlogArticle post={post} />
    </>
  );
}
