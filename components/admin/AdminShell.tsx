"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { api } from "./api";

const NAV = [
  { href: "/admin", label: "Posts", match: (p: string) => p === "/admin" || p.startsWith("/admin/posts") },
  { href: "/admin/posts/new", label: "New post", match: () => false },
  { href: "/admin/media", label: "Media", match: (p: string) => p.startsWith("/admin/media") },
  { href: "/admin/mcp", label: "MCP / Claude", match: (p: string) => p.startsWith("/admin/mcp") },
  { href: "/admin/admins", label: "Admins", match: (p: string) => p.startsWith("/admin/admins") },
];

export default function AdminShell({ admin, children }: { admin: { name: string; email: string }; children: ReactNode }) {
  const path = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const logout = async () => {
    await api("/api/admin/auth/logout", { method: "POST" }).catch(() => {});
    window.location.href = "/admin/login";
  };
  return (
    <div className="min-h-screen bg-black text-white md:grid md:grid-cols-[220px_1fr]">
      <aside className={`border-b border-line bg-[#0b0b0b] md:sticky md:top-0 md:flex md:h-screen md:flex-col md:border-r md:border-b-0`}>
        <div className="flex items-center justify-between p-4 md:p-5">
          <Link href="/admin" className="font-condensed text-xl tracking-wide">
            KONSILIENCE <span className="text-primary">CMS</span>
          </Link>
          <button type="button" className="text-sm text-muted md:hidden" onClick={() => setOpen((o) => !o)}>
            Menu
          </button>
        </div>
        <nav className={`${open ? "flex" : "hidden"} flex-col gap-0.5 px-3 pb-3 md:flex`}>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className={`rounded-lg px-3 py-2 text-sm font-semibold ${n.match(path) ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"}`}>
              {n.label}
            </Link>
          ))}
          <a href="/blog" target="_blank" className="rounded-lg px-3 py-2 text-sm font-semibold text-white/60 hover:bg-white/5 hover:text-white">View blog ↗</a>
        </nav>
        <div className={`${open ? "block" : "hidden"} mt-auto border-t border-line p-4 text-xs md:block`}>
          <p className="truncate font-semibold">{admin.name}</p>
          <p className="truncate text-muted">{admin.email}</p>
          <button type="button" onClick={logout} className="mt-2 text-muted hover:text-white">Sign out</button>
        </div>
      </aside>
      <div className="min-w-0 px-4 pb-16 md:px-8">{children}</div>
    </div>
  );
}

export function PageTitle({ title, text, actions }: { title: string; text?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 py-6 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {text && <p className="mt-1 text-sm text-muted">{text}</p>}
      </div>
      {actions}
    </div>
  );
}
