"use client";

import { useEffect, useState } from "react";
import { api, fmtDate } from "./api";
import { Button, Card, Input, Notice } from "./fields";

type Token = { id: string; name: string; prefix: string; createdBy: string; createdAt: string; lastUsedAt?: string };

function Copy({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <Button
      variant="outline"
      className="!py-1 text-xs"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
    >
      {done ? "Copied" : "Copy"}
    </Button>
  );
}

function Snippet({ title, code }: { title: string; code: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">{title}</p>
        <Copy text={code} />
      </div>
      <pre className="overflow-x-auto rounded-lg border border-line bg-black p-3 font-mono text-xs leading-relaxed text-white/85">{code}</pre>
    </div>
  );
}

export default function McpTokens({ endpoint }: { endpoint: string }) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [name, setName] = useState("Claude");
  const [fresh, setFresh] = useState("");
  const [error, setError] = useState("");

  const load = () => api<{ tokens: Token[] }>("/api/admin/tokens").then((r) => setTokens(r.tokens)).catch((e) => setError(e.message));
  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    try {
      const r = await api<{ token: string }>("/api/admin/tokens", { method: "POST", json: { name } });
      setFresh(r.token);
      load();
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const revoke = async (t: Token) => {
    if (!confirm(`Revoke “${t.name}”? Anything using it stops working immediately.`)) return;
    await api(`/api/admin/tokens/${t.id}`, { method: "DELETE" }).catch((e) => setError(e.message));
    load();
  };

  const token = fresh || "ksk_YOUR_TOKEN";

  return (
    <div className="flex flex-col gap-5">
      {error && <Notice tone="error">{error}</Notice>}
      <Card title="API tokens">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Token name, e.g. Claude Desktop" className="sm:max-w-xs" />
            <Button variant="primary" onClick={create} disabled={!name.trim()}>Create token</Button>
          </div>
          {fresh && (
            <Notice tone="success">
              <p className="font-semibold">Copy this token now. It will not be shown again.</p>
              <div className="mt-2 flex items-center gap-2">
                <code className="flex-1 overflow-x-auto rounded bg-black/50 px-2 py-1.5 font-mono text-xs">{fresh}</code>
                <Copy text={fresh} />
              </div>
            </Notice>
          )}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="text-xs text-muted">
                <tr>
                  <th className="py-2 font-semibold">Name</th>
                  <th className="py-2 font-semibold">Token</th>
                  <th className="py-2 font-semibold">Created</th>
                  <th className="py-2 font-semibold">Last used</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {tokens.length === 0 ? (
                  <tr><td colSpan={5} className="py-6 text-center text-muted">No tokens yet.</td></tr>
                ) : (
                  tokens.map((t) => (
                    <tr key={t.id} className="border-t border-line/60">
                      <td className="py-2.5 font-semibold">{t.name}</td>
                      <td className="py-2.5 font-mono text-xs text-muted">{t.prefix}…</td>
                      <td className="py-2.5 text-xs text-muted">{fmtDate(t.createdAt)} · {t.createdBy}</td>
                      <td className="py-2.5 text-xs text-muted">{fmtDate(t.lastUsedAt)}</td>
                      <td className="py-2.5 text-right"><Button variant="danger" className="!py-1 text-xs" onClick={() => revoke(t)}>Revoke</Button></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <Card title="Connect Claude">
        <div className="flex flex-col gap-6">
          <p className="text-sm text-white/75">
            Endpoint: <code className="rounded bg-black px-1.5 py-0.5 font-mono text-xs">{endpoint}</code> (MCP Streamable HTTP). Create a token above, then use one of these.
            {!fresh && " The snippets fill in your token once you create one."}
          </p>
          <Snippet title="Claude Code (terminal)" code={`claude mcp add --transport http konsilience-blog ${endpoint} --header "Authorization: Bearer ${token}"`} />
          <Snippet
            title="Claude Desktop (claude_desktop_config.json)"
            code={JSON.stringify({ mcpServers: { "konsilience-blog": { command: "npx", args: ["-y", "mcp-remote", endpoint, "--header", `Authorization: Bearer ${token}`] } } }, null, 2)}
          />
          <div className="flex flex-col gap-2">
            <Snippet title="claude.ai → Settings → Connectors → Add custom connector (URL)" code={`${endpoint}?key=${token}`} />
            <p className="text-xs text-amber-300/80">The token is part of this URL, so treat the URL like a password. Revoke the token here if it leaks.</p>
          </div>
          <div className="rounded-lg border border-line p-4 text-sm text-white/75">
            <p className="font-semibold text-white">Then ask Claude, for example:</p>
            <p className="mt-2 italic">“Use konsilience-blog. Write a Konsilience post about how much an MVP costs in 2026. Save it as a draft and send me the preview link.”</p>
            <p className="mt-3 text-xs text-muted">
              Tools: get_blog_guidelines, list_posts, get_post, create_post, update_post, set_post_status, delete_post. Prompt: write_blog_post. New posts are drafts until you (or Claude, when you ask) publish them.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
