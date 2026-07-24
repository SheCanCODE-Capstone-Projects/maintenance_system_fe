import Link from "next/link";
import BrandMark from "./BrandMark";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#dce5e3] bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <BrandMark />
          <span className="text-base font-extrabold tracking-tight text-[#0D3330]">
            Maintenance<span className="text-[#FF6224]">Hub</span>
          </span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-[#5f7371] transition-colors hover:text-[#FF6224]">
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="/register/customer"
          className="inline-flex items-center rounded-full bg-[#0D3330] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.01]"
        >
          Get Started
        </Link>
      </nav>
    </header>
  );
}
