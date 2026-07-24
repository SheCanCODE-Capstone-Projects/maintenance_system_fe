"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, ClipboardCheck, FileText, Grid2X2, LogOut, Settings, Tags, Users, Wrench } from "lucide-react";

const links = [
  ["Dashboard", "/dashboard/admin", Grid2X2],
  ["Users", "/dashboard/admin/users", Users],
  ["Verification Queue", "/dashboard/admin/verification", ClipboardCheck],
  ["Categories", "/dashboard/admin/categories", Tags],
  ["Reports", "/dashboard/admin/reports", BarChart3],
  ["Audit Log", "/dashboard/admin/audit-log", FileText],
  ["Settings", "/dashboard/admin/settings", Settings],
] as const;

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col bg-[#073c37] text-white">
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ff6224]"><Wrench className="h-5 w-5" /></span>
        <span className="font-heading text-sm font-extrabold leading-tight tracking-wide">MAINTENANCE<br /><span className="text-[9px] tracking-[0.2em] text-[#89a9a6]">HUB PLATFORM</span></span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-5">
        {links.map(([label, href, Icon]) => {
          const active = pathname === href;
          return <Link key={href} href={href} className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${active ? "bg-[#ff6224]/15 text-[#ff6224] ring-1 ring-[#ff6224]/40" : "text-[#adc4c1] hover:bg-white/5 hover:text-white"}`}><Icon className="h-4 w-4" />{label}</Link>;
        })}
      </nav>
      <div className="border-t border-white/10 p-5">
        <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#ff6224] text-xs font-bold">SK</span><div><p className="text-sm font-bold">Sarah K.</p><p className="text-xs text-[#89a9a6]">Administrator</p></div></div>
        <Link href="/login" className="mt-4 flex items-center gap-2 text-xs text-[#89a9a6] hover:text-white"><LogOut className="h-3.5 w-3.5" />Sign out</Link>
      </div>
    </aside>
  );
}
