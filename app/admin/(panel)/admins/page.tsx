import { redirect } from "next/navigation";
import Admins from "@/components/admin/Admins";
import { PageTitle } from "@/components/admin/AdminShell";
import { getSessionAdmin } from "@/lib/server/auth";

export default async function AdminsPage() {
  const me = await getSessionAdmin();
  if (!me) redirect("/admin/login");
  return (
    <>
      <PageTitle title="Admins" text="People who can sign in to this panel." />
      <Admins me={{ id: me.id, role: me.role }} />
    </>
  );
}
