import Link from "next/link";
import { PageTitle } from "@/components/admin/AdminShell";
import PostsTable from "@/components/admin/PostsTable";

export default function AdminPostsPage() {
  return (
    <>
      <PageTitle
        title="Posts"
        text="Every post for konsilience.tech and trasys.dev."
        actions={
          <div className="flex gap-2">
            <Link href="/admin/posts/new?site=konsilience" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover">New Konsilience post</Link>
            <Link href="/admin/posts/new?site=trasys" className="rounded-lg border border-line px-4 py-2 text-sm font-semibold hover:border-white/40">New Trasys post</Link>
          </div>
        }
      />
      <PostsTable />
    </>
  );
}
