import { notFound } from "next/navigation";
import PostEditor from "@/components/admin/PostEditor";
import { HttpError } from "@/lib/server/http";
import { getPost } from "@/lib/server/posts";

export default async function EditPostPage({ params }: PageProps<"/admin/posts/[id]">) {
  const post = await getPost((await params).id).catch((e) => {
    if (e instanceof HttpError && e.status === 404) return null;
    throw e;
  });
  if (!post) notFound();
  return <PostEditor key={post.id} initial={post} />;
}
