import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-screen bg-bg md:flex"><AdminSidebar /><main className="min-w-0 flex-1 pt-14 md:pt-0">{children}</main></div>;
}
