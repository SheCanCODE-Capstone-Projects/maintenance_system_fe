import CompanySidebar from "@/components/layout/CompanySidebar";

export default function CompanyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex min-h-screen bg-slate-50"><CompanySidebar /><div className="min-w-0 flex-1">{children}</div></div>;
}
