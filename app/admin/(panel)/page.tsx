import Link from "next/link";
import { PageTitle } from "@/components/admin/AdminShell";
import PostsTable from "@/components/admin/PostsTable";

export default function AdminPostsPage() {
  return (
    <>
      <PageTitle
        title="Posts"
        text="Every post. Publish each one to Konsilience, Trasys and the cross-posting platforms from the editor."
        actions={
          <Link href="/admin/posts/new" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover">New post</Link>
        }
      />
      <PostsTable />
    </>
  );
}
