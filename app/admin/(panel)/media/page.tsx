import { PageTitle } from "@/components/admin/AdminShell";
import { MediaLibrary } from "@/components/admin/Media";

export default function MediaPage() {
  return (
    <>
      <PageTitle title="Media" text="Images for covers, posts and social cards. Stored in MongoDB and served from /api/media." />
      <MediaLibrary />
    </>
  );
}
