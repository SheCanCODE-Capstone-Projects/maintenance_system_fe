import LeftPanel from "@/components/login/LeftPanel";
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F4F6F5]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,_rgba(255,98,36,.16),_transparent_62%)]" />
      <div className="relative flex min-h-screen">
        <aside className="hidden shrink-0 lg:block lg:w-[45%] xl:w-[42%]">
          <LeftPanel />
        </aside>
        <section className="flex flex-1 items-center justify-center px-5 py-10 sm:px-6 lg:px-10 lg:py-0">
          <div className="w-full max-w-md">
            <LoginForm />

            <p className="mt-8 text-center text-xs leading-5 text-[#7A8E8C]">
              Protected access for customers, technicians, and companies.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
