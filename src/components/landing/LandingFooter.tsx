import Link from "next/link";
import BrandMark from "@/components/layout/BrandMark";

const quickLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Categories", href: "#categories" },
  { label: "For Technicians", href: "#for-technicians" },
  { label: "Pricing", href: "#pricing" },
  { label: "Login", href: "/login" },
];

const contacts = [
  "support@maintenancehub.rw",
  "+250 788 000 000",
  "Kigali, Rwanda",
];

export default function LandingFooter() {
  return (
    <footer className="border-t border-[#113b37] bg-[#0D3330] text-[#a6c0bd]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <BrandMark />
            <span className="text-base font-extrabold tracking-tight text-white">
              Maintenance<span className="text-[#FF6224]">Hub</span>
            </span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6">
            A maintenance service platform for Rwanda that connects customers, technicians,
            and companies through a clear and reliable digital workflow.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[.2em] text-white">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[.2em] text-white">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {contacts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-[#8fb2ad] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Maintenance Hub. All rights reserved.</p>
          <p>Built for customers, technicians, and companies across Rwanda.</p>
        </div>
      </div>
    </footer>
  );
}
