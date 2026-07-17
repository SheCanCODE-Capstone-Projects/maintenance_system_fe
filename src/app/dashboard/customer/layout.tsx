import CustomerSidebar from "@/components/layout/CustomerSidebar";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <CustomerSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
