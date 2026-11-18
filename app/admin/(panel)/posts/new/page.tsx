import PostEditor from "@/components/admin/PostEditor";
import { newDraft } from "@/lib/blog/draft";

export default async function NewPostPage({ searchParams }: PageProps<"/admin/posts/new">) {
  const site = (await searchParams).site === "trasys" ? "trasys" : "konsilience";
  return <PostEditor key={site} initial={newDraft(site)} />;
}
