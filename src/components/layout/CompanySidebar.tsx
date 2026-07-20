import Link from "next/link";
import { BarChart3, BriefcaseBusiness, LayoutDashboard, Settings, Users } from "lucide-react";

const links = [
  ["Dashboard", "/dashboard/company", LayoutDashboard],
  ["Jobs", "/dashboard/company/jobs", BriefcaseBusiness],
  ["Team", "/dashboard/company/team", Users],
  ["Earnings", "/dashboard/company/earnings", BarChart3],
  ["Settings", "/dashboard/company/settings", Settings],
] as const;

export default function CompanySidebar() {
  return <aside className="flex w-72 shrink-0 flex-col bg-deep-teal text-white"><div className="border-b border-white/10 px-6 py-7"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-bright-orange text-lg">⌕</span><div><h2 className="font-heading font-bold tracking-wide">MAINTENANCE</h2><p className="text-[10px] font-bold tracking-[0.2em] text-slate-400">HUB PLATFORM</p></div></div></div><nav className="space-y-1 px-3 py-5">{links.map(([label, href, Icon]) => <Link key={href} href={href} className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-white/10 hover:text-white"><Icon size={19} />{label}</Link>)}</nav><div className="mt-auto border-t border-white/10 p-5"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-bright-orange text-sm font-bold">EN</span><div><p className="font-semibold">Company Admin</p><p className="text-sm text-slate-400">Company</p></div></div></div></aside>;
}
 