import CompanySidebar from "@/components/layout/CompanySidebar";

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[linear-gradient(180deg,#eef3f1_0%,#f4f6f5_38%,#f7f8f7_100%)] font-sans text-[#111918]">
      <CompanySidebar />
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 md:px-8 md:py-8 xl:px-[42px] xl:py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5">
          <header className="rounded-3xl border border-[#d7e1df] bg-white/85 px-5 py-4 shadow-sm backdrop-blur">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-[#7a8e8c]">
                  Company Workspace
                </p>
                <h1 className="mt-1 text-[20px] font-extrabold tracking-tight text-[#0D3330] sm:text-[22px]">
                  Analytics, reviews, settings, and operations
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#1B7A52]/20 bg-[#1B7A52]/10 px-3 py-1 text-[12px] font-semibold text-[#1B7A52]">
                  Accredited company
                </span>
                <span className="rounded-full border border-[#FF6224]/20 bg-[#FF6224]/10 px-3 py-1 text-[12px] font-semibold text-[#FF6224]">
                  Frontend-ready
                </span>
              </div>
            </div>
          </header>

          <section className="rounded-3xl border border-[#d7e1df] bg-white px-4 py-5 shadow-sm sm:px-6 md:px-8 md:py-8">
            {children}
          </section>
        </div>
      </main>
    </div>
  );
}
