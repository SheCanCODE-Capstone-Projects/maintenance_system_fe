"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, History, LayoutDashboard, LogOut, Search, Settings, Wrench } from "lucide-react";

const links = [
  { label: "Dashboard", href: "/dashboard/customer", icon: LayoutDashboard },
  { label: "My Requests", href: "/dashboard/customer/requests", icon: ClipboardList },
  { label: "Find Technicians", href: "/dashboard/customer/technicians", icon: Search },
  { label: "History", href: "/dashboard/customer/history", icon: History },
  { label: "Settings", href: "/dashboard/customer/settings", icon: Settings },
];

export default function CustomerSidebar() {
  const pathname = usePathname();

  return <aside className="flex w-[68px] shrink-0 flex-col bg-[#0b403b] text-[#a6c0bd] lg:w-[290px]">
    <div className="border-b border-[#1a5550] px-3 py-6 lg:px-6 lg:py-7"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#ff652e] text-white lg:h-11 lg:w-11"><Wrench size={21} /></span><div className="hidden lg:block"><h2 className="text-[18px] font-bold leading-4 tracking-[.04em] text-white">MAINTENANCE</h2><p className="mt-1 text-[10px] font-semibold tracking-[.2em]">HUB PLATFORM</p></div></div></div>
    <nav className="space-y-1.5 px-2 py-5 lg:px-3">{links.map(({ label, href, icon: Icon }) => { const active = pathname === href; return <Link title={label} key={href} href={href} className={`flex items-center justify-center gap-3 rounded-lg px-2 py-3 text-[16px] transition-colors lg:justify-start lg:px-4 ${active ? "bg-[#423f2c] text-[#ff6b37] ring-1 ring-[#74542c]" : "hover:bg-[#154d47]"}`}><Icon size={18} /><span className={`hidden lg:inline ${active ? "font-semibold" : ""}`}>{label}</span></Link>; })}</nav>
    <div className="mt-auto border-t border-[#1a5550] px-3 py-6 lg:px-5"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#ff652e] text-[12px] font-bold text-white">DU</span><div className="hidden lg:block"><b className="block text-[16px] text-white">Delice U.</b><span className="text-[13px]">Customer</span></div></div><button title="Sign out" className="mt-5 flex items-center gap-2 text-[14px] hover:text-white"><LogOut size={16} /><span className="hidden lg:inline">Sign out</span></button></div>
  </aside>;
}
