import { ShieldCheck, MapPinned, Star, Users, Wrench, BadgeCheck } from "lucide-react";

const stats = [
  { value: "2.4k+", label: "Clients", icon: Users },
  { value: "890+", label: "Technicians", icon: Wrench },
  { value: "98%", label: "Resolved", icon: BadgeCheck },
];

const features = [
  { icon: ShieldCheck, title: "Verified Technicians", desc: "Every professional is background-checked and skill-verified." },
  { icon: MapPinned, title: "Real-Time Tracking", desc: "Track your technician live from dispatch to completion." },
  { icon: Star, title: "Rated Professionals", desc: "Read genuine reviews from real customers before booking." },
];

export default function LeftPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between bg-[#0D3330] text-white p-10 xl:p-14 min-h-screen w-full">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#FF6224] flex items-center justify-center">
            <Wrench className="w-4 h-4 text-white" />
          </div>
          <span className="font-heading font-bold text-lg tracking-tight">
            Maintenance<span className="text-[#FF6224]">Hub</span>
          </span>
        </div>
        <p className="text-[#1B7A52] text-xs font-medium mb-8">Rwanda&apos;s #1 Maintenance Platform</p>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">
          <BadgeCheck className="w-4 h-4 text-[#FF6224]" />
          <span className="text-xs font-medium text-gray-200">Trusted by 2,400+ clients across Rwanda</span>
        </div>

        {/* Hero heading */}
        <h1 className="font-heading text-3xl xl:text-4xl font-extrabold leading-tight mb-4">
          Your maintenance,<br />
          <span className="text-[#FF6224]">managed smarter.</span>
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-xs">
          Connect with verified maintenance professionals. Fast, reliable, and fully transparent service — every time.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <Icon className="w-5 h-5 text-[#FF6224] mx-auto mb-2" />
              <p className="font-heading font-extrabold text-xl text-white">{value}</p>
              <p className="text-gray-400 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-8" />

        {/* Features */}
        <div className="space-y-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#1B7A52]/30 border border-[#1B7A52]/40 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-[#1B7A52]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-600 mt-10">© {new Date().getFullYear()} MaintenanceHub. All rights reserved.</p>
    </div>
  );
}
