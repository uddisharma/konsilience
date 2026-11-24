import PostEditor from "@/components/admin/PostEditor";
import { newDraft } from "@/lib/blog/draft";

/** Where the post goes live (Konsilience, Trasys, other platforms) is chosen from the Publish menu. */
export default function NewPostPage() {
  return <PostEditor initial={newDraft("konsilience")} />;
}
