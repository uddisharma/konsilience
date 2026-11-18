"use client";

import { useState } from "react";
import { api } from "./api";
import { Button, Field, Input, Notice } from "./fields";

export default function LoginForm({ next }: { next: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError("");
        try {
          await api("/api/admin/auth/login", { method: "POST", json: { email, password } });
          // Only same-site admin paths, never an open redirect.
          window.location.href = next.startsWith("/admin") ? next : "/admin";
        } catch (x) {
          setError((x as Error).message);
          setBusy(false);
        }
      }}
    >
      {error && <Notice tone="error">{error}</Notice>}
      <Field label="Email">
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required autoFocus />
      </Field>
      <Field label="Password">
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
      </Field>
      <Button type="submit" variant="primary" disabled={busy} className="mt-2">
        {busy ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
