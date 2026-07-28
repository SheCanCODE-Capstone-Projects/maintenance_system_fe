"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Settings,
  Star,
  Users,
} from "lucide-react";
import BrandMark from "./BrandMark";
import { useSignOut } from "@/hooks/useSignOut";

type CompanySidebarProps = {
  companyName?: string;
  role?: string;
  onSignOut?: () => void;
};

type NavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/company", icon: LayoutDashboard },
  { label: "My Team", href: "/dashboard/company/team", icon: Users },
  { label: "Job Requests", href: "/dashboard/company/jobs", icon: ClipboardList },
  { label: "Analytics", href: "/dashboard/company/analytics", icon: BarChart3 },
  { label: "Reviews", href: "/dashboard/company/reviews", icon: Star },
  { label: "Messages", href: "/messages", icon: MessageCircle },
  { label: "Settings", href: "/dashboard/company/settings", icon: Settings },
];

function isActiveRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function CompanySidebar({
  companyName = "BuildFix Ltd",
  role = "Company Admin",
  onSignOut,
}: CompanySidebarProps) {
  const pathname = usePathname();
  const defaultSignOut = useSignOut();

  return (
    <aside
      aria-label="Company navigation"
      className="flex w-[72px] shrink-0 flex-col border-r border-[#113b37] bg-[#062A27] text-[#a6c0bd] lg:w-[292px]"
    >
      <div className="border-b border-[#1a5550] px-3 py-6 lg:px-6 lg:py-7">
        <div className="flex items-center gap-3">
          <BrandMark size={44} />
          <div className="hidden lg:block">
            <h2 className="text-[18px] font-bold leading-4 tracking-[.04em] text-white">
              MAINTENANCE
            </h2>
            <p className="mt-1 text-[10px] font-semibold tracking-[.2em] text-[#8fb2ad]">
              HUB PLATFORM
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-[#1a5550] px-3 py-4 lg:px-5">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-[#8fb2ad]">
            Company account
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#FF6224] text-[12px] font-bold text-white">
              BF
            </span>
            <div className="hidden lg:block">
              <p className="text-[15px] font-semibold text-white">{companyName}</p>
              <p className="text-[12px] text-[#8fb2ad]">{role}</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="space-y-1.5 px-2 py-5 lg:px-3">
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = isActiveRoute(pathname, href);

          return (
            <Link
              key={href}
              href={href}
              title={label}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              className={`group flex items-center justify-center gap-3 rounded-xl px-2 py-3 text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6224] focus-visible:ring-offset-2 focus-visible:ring-offset-[#062A27] lg:justify-start lg:px-4 ${
                active
                  ? "bg-[#1B7A52]/20 text-[#FF6224] ring-1 ring-[#1B7A52]/35"
                  : "text-[#a6c0bd] hover:bg-[#154d47] hover:text-white"
              }`}
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5">
                <Icon aria-hidden className="h-4 w-4" />
              </span>
              <span className={`hidden lg:inline ${active ? "font-semibold" : "font-medium"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-[#1a5550] px-3 py-6 lg:px-5">
        <button
          type="button"
          title="Sign out"
          aria-label="Sign out"
          onClick={onSignOut ?? defaultSignOut}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-[14px] font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6224] focus-visible:ring-offset-2 focus-visible:ring-offset-[#062A27] lg:justify-start"
        >
          <LogOut aria-hidden className="h-4 w-4" />
          <span className="hidden lg:inline">Sign out</span>
        </button>
      </div>
    </aside>
  );
}
