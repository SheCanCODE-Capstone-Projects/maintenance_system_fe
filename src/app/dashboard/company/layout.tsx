import CompanySidebar from "@/components/layout/CompanySidebar";

/* Local layout superseded by the merged company workspace layout.
export default function CompanyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex min-h-screen bg-slate-50"><CompanySidebar /><div className="min-w-0 flex-1">{children}</div></div>;
*/
export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f6f8f7] font-sans text-[#111918]">
      <CompanySidebar />
      <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">{children}</main>
    </div>
  );
}
