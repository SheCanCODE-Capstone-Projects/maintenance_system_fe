"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [["▦", "Dashboard", "/dashboard/customer"], ["▣", "My Requests", "/dashboard/customer/requests"], ["⌕", "Find Technicians", "/dashboard/customer/technicians"], ["◴", "History", "/dashboard/customer/history"], ["⚙", "Settings", "/dashboard/customer/settings"]];
export default function CustomerSidebar() {
  const pathname = usePathname();
  return <aside className="flex w-[290px] shrink-0 flex-col bg-[#0b403b] text-[#a6c0bd]"><div className="border-b border-[#1a5550] px-6 py-7"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#ff652e] text-xl text-white">⚒</span><div><h2 className="text-[18px] font-bold leading-4 tracking-[.04em] text-white">MAINTENANCE</h2><p className="mt-1 text-[10px] font-semibold tracking-[.2em]">HUB PLATFORM</p></div></div></div><nav className="space-y-1.5 px-3 py-5">{links.map(([icon, label, href]) => { const active = pathname === href; return <Link key={href} href={href} className={`flex items-center gap-3 rounded-lg px-4 py-3 text-[16px] ${active ? "bg-[#423f2c] text-[#ff6b37] ring-1 ring-[#74542c]" : "hover:bg-[#154d47]"}`}><span className="text-[18px]">{icon}</span><span className={active ? "font-semibold" : ""}>{label}</span></Link>; })}</nav><div className="mt-auto border-t border-[#1a5550] px-5 py-6"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#ff652e] text-[12px] font-bold text-white">DU</span><div><b className="block text-[16px] text-white">Delice U.</b><span className="text-[13px]">Customer</span></div></div><button className="mt-5 text-[14px]">↪ &nbsp;Sign out</button></div></aside>;
}
