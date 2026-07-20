import Link from "next/link";

const quickLinks = ["How it Works", "Categories", "For Technicians", "Pricing", "Login"];
const socials = [
  { label: "Twitter", icon: "𝕏", href: "#" },
  { label: "LinkedIn", icon: "in", href: "#" },
  { label: "Facebook", icon: "f", href: "#" },
];

export default function LandingFooter() {
  return (
    <footer className="bg-secondary text-gray-400 py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 grid sm:grid-cols-3 gap-10 mb-10">
        <div>
          <Link href="/" className="font-heading font-bold text-xl text-white hover:opacity-80 transition-opacity">
            Maintenance<span className="text-primary">Hub</span>
          </Link>
          <p className="mt-3 text-sm leading-relaxed">
            Rwanda&apos;s trusted platform connecting customers with verified maintenance professionals.
          </p>
          <div className="flex gap-3 mt-5">
            {socials.map(({ label, icon, href }) => (
              <a key={label} href={href} aria-label={label} className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary transition-colors flex items-center justify-center text-white text-sm font-bold">
                {icon}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold text-white mb-4">Quick Links</p>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l}>
                <Link href={l === "Login" ? "/login" : `#${l.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-primary transition-colors">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-4">Contact</p>
          <ul className="space-y-2 text-sm">
            <li>📧 support@maintenancehub.rw</li>
            <li>📞 +250 788 000 000</li>
            <li>📍 Kigali, Rwanda</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 border-t border-white/10 pt-6 text-center text-xs">
        © {new Date().getFullYear()} MaintenanceHub. All rights reserved.
      </div>
    </footer>
  );
}
