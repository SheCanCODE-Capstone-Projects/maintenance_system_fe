import CustomerSidebar from "@/components/layout/CustomerSidebar";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen bg-[#f8faf9] font-sans"><CustomerSidebar /><main className="customer-ui min-w-0 flex-1 px-[45px] py-10">{children}</main></div>;
}
