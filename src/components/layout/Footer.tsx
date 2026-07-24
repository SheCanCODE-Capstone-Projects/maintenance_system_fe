export default function Footer() {
  return (
    <footer className="border-t border-[#dce5e3] bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-[#5f7371] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="font-medium">© {new Date().getFullYear()} Maintenance Hub</p>
        <p>Built for customers, technicians, and companies across Rwanda.</p>
      </div>
    </footer>
  );
}
