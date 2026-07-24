import TechnicianSidebar from "@/components/layout/TechnicianSidebar";

export default function TechnicianLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex min-h-screen flex-col bg-slate-50 md:flex-row"><TechnicianSidebar /><div className="min-w-0 flex-1">{children}</div></div>;
}
