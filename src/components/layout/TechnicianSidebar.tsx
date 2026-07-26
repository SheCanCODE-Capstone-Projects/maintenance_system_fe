"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, ClipboardList, Grid2X2, LogOut, MessageCircle, Settings, Star, Wrench } from "lucide-react";

const links = [
  { label: "Dashboard", href: "/dashboard/technician", icon: Grid2X2 },
  { label: "My Jobs", href: "/dashboard/technician/jobs", icon: ClipboardList },
  { label: "Reviews", href: "/dashboard/technician/reviews", icon: Star },
  { label: "Messages", href: "/messages", icon: MessageCircle },
  { label: "Earnings", href: "/dashboard/technician/earnings", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/technician/settings", icon: Settings },
] as const;

export default function TechnicianSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col bg-[#083d38] text-white md:min-h-screen md:w-[290px]">
      <div className="border-b border-white/10 px-4 py-4 sm:px-6 md:py-7">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary md:h-10 md:w-10">
            <Wrench size={20} />
          </span>
          <div>
            <h2 className="text-sm font-bold tracking-wide md:text-base">MAINTENANCE</h2>
            <p className="text-[9px] font-bold tracking-[0.18em] text-slate-400 md:text-[10px]">HUB PLATFORM</p>
          </div>
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 py-2 md:block md:space-y-1 md:py-4">
        {links.map(({ label, href, icon: Icon }) => {
          const active = href === "/dashboard/technician" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition md:gap-3 md:px-4 md:py-3 md:text-base ${
                active
                  ? "border border-orange-500/40 bg-orange-500/15 text-primary"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto hidden border-t border-white/10 p-5 md:block">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-bold">
            EN
          </span>
          <div>
            <p className="font-semibold">Eric N.</p>
            <p className="text-sm text-slate-400">Technician</p>
          </div>
        </div>
        <button className="mt-5 flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
          <LogOut size={17} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
