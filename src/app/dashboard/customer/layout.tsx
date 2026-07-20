import CustomerSidebar from "@/components/layout/CustomerSidebar";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen bg-[#f8faf9] font-sans"><CustomerSidebar /><main className="customer-ui min-w-0 flex-1 px-4 py-6 sm:px-6 md:px-8 md:py-8 xl:px-[45px] xl:py-10">{children}</main></div>;
}
