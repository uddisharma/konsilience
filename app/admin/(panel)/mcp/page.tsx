import { headers } from "next/headers";
import { PageTitle } from "@/components/admin/AdminShell";
import McpTokens from "@/components/admin/McpTokens";

export default async function McpPage() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "www.konsilience.tech";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return (
    <>
      <PageTitle title="MCP / Claude" text="Let Claude research, write, edit and publish posts through the Model Context Protocol." />
      <McpTokens endpoint={`${proto}://${host}/api/mcp`} />
    </>
  );
}
