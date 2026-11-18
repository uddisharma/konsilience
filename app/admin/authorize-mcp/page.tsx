import { redirect } from "next/navigation";
import { getSessionAdmin } from "@/lib/server/auth";
import { AUTHORIZE_PARAMS, OAuthError, validateAuthRequest, type AuthRequest } from "@/lib/server/oauth";

// Consent screen for MCP connectors (claude.ai). Only a signed-in admin gets past the redirect below.
export const dynamic = "force-dynamic";

const CARD = "w-full max-w-md rounded-2xl border border-line bg-card p-8";
const BUTTON = "flex-1 rounded-full px-5 py-3 text-sm font-semibold transition-colors";

function Shell({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen place-items-center bg-[radial-gradient(60%_50%_at_50%_0%,rgb(var(--brand-rgb)/.25),transparent_60%)] px-4">
      <div className={CARD}>
        <p className="font-condensed text-2xl tracking-wide">
          KONSILIENCE <span className="text-primary">CMS</span>
        </p>
        {children}
      </div>
    </div>
  );
}

export default async function AuthorizeMcpPage({ searchParams }: PageProps<"/admin/authorize-mcp">) {
  const raw = await searchParams;
  const params = new URLSearchParams(
    AUTHORIZE_PARAMS.flatMap((key): [string, string][] => {
      const value = raw[key];
      return typeof value === "string" && value ? [[key, value]] : [];
    }),
  );

  const admin = await getSessionAdmin();
  if (!admin) redirect(`/admin/login?next=${encodeURIComponent(`/admin/authorize-mcp?${params.toString()}`)}`);

  let authReq: AuthRequest;
  try {
    authReq = await validateAuthRequest(params);
  } catch (err) {
    if (!(err instanceof OAuthError)) throw err;
    return (
      <Shell>
        <h1 className="mt-6 text-lg font-semibold text-white">Can&rsquo;t connect this app</h1>
        <p className="mt-2 text-sm leading-relaxed text-white/75">{err.message}</p>
      </Shell>
    );
  }

  return (
    <Shell>
      <h1 className="mt-6 text-lg font-semibold text-white">Connect {authReq.clientName} to the blog?</h1>
      <p className="mt-2 text-sm leading-relaxed text-white/75">
        It will be able to read and write blog posts through the Konsilience MCP server, with the access of {admin.name}. You can
        revoke it at any time under MCP / Claude in the admin.
      </p>
      <form method="post" action="/api/mcp/oauth/approve" className="mt-6 flex flex-col gap-2 sm:flex-row">
        {AUTHORIZE_PARAMS.map((key) => {
          const value = params.get(key);
          return value ? <input key={key} type="hidden" name={key} value={value} /> : null;
        })}
        <button type="submit" name="decision" value="deny" className={`${BUTTON} bg-white/10 text-white hover:bg-white/20`}>
          Deny
        </button>
        <button type="submit" name="decision" value="approve" className={`${BUTTON} bg-primary text-white hover:bg-primary-hover`}>
          Allow
        </button>
      </form>
    </Shell>
  );
}
