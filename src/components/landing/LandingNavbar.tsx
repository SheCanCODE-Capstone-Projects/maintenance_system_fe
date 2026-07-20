"use client";
import { useState } from "react";
import Link from "next/link";

const links = ["How it Works", "Categories", "For Technicians", "Pricing"];

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 xl:px-32 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading font-bold text-xl text-secondary hover:opacity-80 transition-opacity">
          Maintenance<span className="text-primary">Hub</span>
        </Link>
        <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-primary transition-colors">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
            Login
          </Link>
          <Link href="/register/customer" className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-orange-600 transition-colors">
            Get Started
          </Link>
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <span className="block w-5 h-0.5 bg-gray-700 mb-1" />
          <span className="block w-5 h-0.5 bg-gray-700 mb-1" />
          <span className="block w-5 h-0.5 bg-gray-700" />
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 sm:px-12 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm font-medium text-gray-700 hover:text-primary" onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
          <Link href="/login" className="text-sm font-medium text-gray-700">Login</Link>
          <Link href="/register/customer" className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-full text-center">Get Started</Link>
        </div>
      )}
    </nav>
  );
}
