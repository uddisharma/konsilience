/** Shown instead of the admin when the server is missing its database or session settings. */
export function missingConfig(): string[] {
  const missing: string[] = [];
  if (!process.env.MONGODB_URI) missing.push("MONGODB_URI");
  if (!process.env.ADMIN_JWT_SECRET || process.env.ADMIN_JWT_SECRET.length < 32) missing.push("ADMIN_JWT_SECRET (32+ characters)");
  return missing;
}

export function SetupNotice({ missing }: { missing: string[] }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4 px-4 py-24 text-sm text-white/80">
      <h1 className="text-2xl font-semibold text-white">Admin setup needed</h1>
      <p>The admin panel needs these environment variables (in .env.local, and in Vercel → Settings → Environment Variables):</p>
      <ul className="list-disc pl-6 font-mono text-xs">
        {missing.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
      <p>Then create the first admin from a terminal:</p>
      <pre className="rounded-lg border border-line bg-card p-3 font-mono text-xs">bun run admin:create you@example.com &quot;a-long-password&quot; &quot;Your Name&quot;</pre>
    </div>
  );
}
