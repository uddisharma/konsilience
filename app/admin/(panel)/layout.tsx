import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { getSessionAdmin } from "@/lib/server/auth";
import { missingConfig, SetupNotice } from "../setup";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const missing = missingConfig();
  if (missing.length) return <SetupNotice missing={missing} />;
  const admin = await getSessionAdmin();
  if (!admin) redirect("/admin/login");
  return <AdminShell admin={{ name: admin.name, email: admin.email }}>{children}</AdminShell>;
}
