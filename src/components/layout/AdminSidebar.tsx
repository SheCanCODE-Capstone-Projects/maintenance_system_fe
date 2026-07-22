"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BarChart3, ClipboardCheck, FileText, LayoutDashboard, LogOut, Menu, Settings, Tags, Users, Wrench, X } from "lucide-react";

const links = [
  ["Dashboard", "/dashboard/admin/dashboard", LayoutDashboard],
  ["Users", "/dashboard/admin/users", Users],
  ["Verification Queue", "/dashboard/admin/verification-queue", ClipboardCheck],
  ["Categories", "/dashboard/admin/categories", Tags],
  ["Reports", "/dashboard/admin/reports", BarChart3],
  ["Audit Log", "/dashboard/admin/audit-log", FileText],
  ["Settings", "/dashboard/admin/settings", Settings],
] as const;

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const content = (
    <>
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-5">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-white"><Wrench size={18} /></div>
        <span className="font-heading text-sm font-extrabold uppercase leading-3 tracking-wide text-white">Maintenance<br /><small className="text-[9px] tracking-[0.18em] text-teal-200">Hub Platform</small></span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-5" aria-label="Admin navigation">
        {links.map(([label, href, Icon]) => {
          const active = pathname === href;
          return <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${active ? "bg-primary/15 text-primary ring-1 ring-primary/40" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}><Icon size={16} />{label}</Link>;
        })}
      </nav>
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-xs font-bold text-white">AD</div><div><p className="text-sm font-semibold text-white">Admin</p><p className="text-xs text-teal-200">Administrator</p></div></div>
        <Link href="/login" className="mt-4 flex items-center gap-2 text-xs text-teal-200 hover:text-white"><LogOut size={14} />Sign out</Link>
      </div>
    </>
  );

  return <>
    <button aria-label="Open navigation" onClick={() => setOpen(true)} className="fixed left-4 top-4 z-30 grid h-10 w-10 place-items-center rounded-lg bg-secondary text-white shadow-lg md:hidden"><Menu size={20} /></button>
    {open && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-slate-950/45 md:hidden" onClick={() => setOpen(false)} />}
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-secondary shadow-xl transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <button aria-label="Close navigation" onClick={() => setOpen(false)} className="absolute right-3 top-3 text-white md:hidden"><X size={20} /></button>{content}
    </aside>
  </>;
}
