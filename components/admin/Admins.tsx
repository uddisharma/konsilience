"use client";

import { useEffect, useState } from "react";
import { api, fmtDate } from "./api";
import { Button, Card, Field, Input, Notice, Select } from "./fields";

type Admin = { id: string; email: string; name: string; role: "owner" | "admin"; createdAt: string; lastLoginAt?: string };

export default function Admins({ me }: { me: { id: string; role: string } }) {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "admin" });
  const [pw, setPw] = useState({ currentPassword: "", newPassword: "" });
  const [msg, setMsg] = useState<{ tone: "error" | "success"; text: string } | null>(null);

  const load = () => api<{ admins: Admin[] }>("/api/admin/admins").then((r) => setAdmins(r.admins)).catch((e) => setMsg({ tone: "error", text: e.message }));
  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    try {
      await api("/api/admin/admins", { method: "POST", json: form });
      setForm({ name: "", email: "", password: "", role: "admin" });
      setMsg({ tone: "success", text: "Admin added. Share the password with them privately." });
      load();
    } catch (e) {
      setMsg({ tone: "error", text: (e as Error).message });
    }
  };

  const remove = async (a: Admin) => {
    if (!confirm(`Remove ${a.email}? They will be signed out immediately.`)) return;
    try {
      await api(`/api/admin/admins/${a.id}`, { method: "DELETE" });
      load();
    } catch (e) {
      setMsg({ tone: "error", text: (e as Error).message });
    }
  };

  const changePw = async () => {
    try {
      await api("/api/admin/auth/me", { method: "PATCH", json: pw });
      window.location.href = "/admin/login";
    } catch (e) {
      setMsg({ tone: "error", text: (e as Error).message });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {msg && <Notice tone={msg.tone}>{msg.text}</Notice>}
      <Card title="Admins">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="text-xs text-muted">
              <tr>
                <th className="py-2 font-semibold">Name</th>
                <th className="py-2 font-semibold">Email</th>
                <th className="py-2 font-semibold">Role</th>
                <th className="py-2 font-semibold">Last sign-in</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a.id} className="border-t border-line/60">
                  <td className="py-2.5 font-semibold">{a.name}{a.id === me.id && <span className="ml-2 text-xs text-muted">(you)</span>}</td>
                  <td className="py-2.5 text-white/80">{a.email}</td>
                  <td className="py-2.5 text-white/70 capitalize">{a.role}</td>
                  <td className="py-2.5 text-xs text-muted">{fmtDate(a.lastLoginAt)}</td>
                  <td className="py-2.5 text-right">
                    {a.id !== me.id && (
                      <Button variant="danger" className="!py-1 text-xs" onClick={() => remove(a)}>Remove</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Add an admin">
          <div className="flex flex-col gap-3">
            <Field label="Name"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
            <Field label="Email"><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
            <Field label="Temporary password" hint="At least 10 characters. Ask them to change it after signing in.">
              <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} autoComplete="new-password" />
            </Field>
            {me.role === "owner" && (
              <Field label="Role" hint="Owners can add and remove other owners.">
                <Select value={form.role} onChange={(role) => setForm({ ...form, role })} options={[["admin", "Admin"], ["owner", "Owner"]]} />
              </Field>
            )}
            <Button variant="primary" className="w-fit" onClick={add} disabled={!form.email || !form.password || !form.name}>Add admin</Button>
          </div>
        </Card>
        <Card title="Change your password">
          <div className="flex flex-col gap-3">
            <Field label="Current password"><Input type="password" value={pw.currentPassword} onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })} autoComplete="current-password" /></Field>
            <Field label="New password" hint="At least 10 characters. You will be signed out everywhere."><Input type="password" value={pw.newPassword} onChange={(e) => setPw({ ...pw, newPassword: e.target.value })} autoComplete="new-password" /></Field>
            <Button variant="primary" className="w-fit" onClick={changePw} disabled={!pw.currentPassword || !pw.newPassword}>Change password</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
