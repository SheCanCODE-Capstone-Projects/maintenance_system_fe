"use client";

import { useState } from "react";
import Link from "next/link";
import BrandMark from "@/components/layout/BrandMark";

const links = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Categories", href: "#categories" },
  { label: "For Technicians", href: "#for-technicians" },
  { label: "Pricing", href: "#pricing" },
];

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#dce5e3] bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <BrandMark />
          <span className="text-base font-extrabold tracking-tight text-[#0D3330]">
            Maintenance<span className="text-[#FF6224]">Hub</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#5f7371] transition-colors hover:text-[#FF6224]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm font-semibold text-[#0D3330] transition-colors hover:text-[#FF6224]"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center rounded-full bg-[#0D3330] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.01]"
          >
            Register
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#dce5e3] text-[#0D3330] md:hidden"
        >
          <span className="sr-only">Toggle navigation menu</span>
          <span className="block">
            <span className="mb-1 block h-0.5 w-5 bg-current" />
            <span className="mb-1 block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </span>
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[#dce5e3] bg-white px-4 py-4 sm:px-6 lg:px-8 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-[#5f7371] transition-colors hover:text-[#FF6224]"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-sm font-semibold text-[#0D3330]"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-[#0D3330] px-4 py-2 text-sm font-semibold text-white"
            >
              Register
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
