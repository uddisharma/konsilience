import LoginForm from "@/components/admin/LoginForm";
import { missingConfig, SetupNotice } from "../setup";

// Reads env at request time (the setup check must not be frozen at build time).
export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  const missing = missingConfig();
  if (missing.length) return <SetupNotice missing={missing} />;
  const next = (await searchParams).next;
  return (
    <div className="grid min-h-screen place-items-center bg-[radial-gradient(60%_50%_at_50%_0%,rgb(var(--brand-rgb)/.25),transparent_60%)] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-card p-8">
        <p className="font-condensed text-2xl tracking-wide">
          KONSILIENCE <span className="text-primary">CMS</span>
        </p>
        <p className="mt-1 mb-6 text-sm text-muted">Sign in to manage the Konsilience and Trasys blogs.</p>
        <LoginForm next={typeof next === "string" ? next : "/admin"} />
      </div>
    </div>
  );
}
