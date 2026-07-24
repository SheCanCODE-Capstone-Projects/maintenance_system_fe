import { ShieldCheck, MapPinned, Star, BadgeCheck } from "lucide-react";
import BrandMark from "@/components/layout/BrandMark";
import { getPublicLandingStats } from "@/lib/metrics";

const features = [
  { icon: ShieldCheck, title: "Verified Accounts", desc: "Company, technician, and customer accounts follow role-specific review steps." },
  { icon: MapPinned, title: "Structured Tracking", desc: "Monitor request status from assignment to completion." },
  { icon: Star, title: "Review Signals", desc: "Use ratings and feedback to assess service quality." },
];

export default async function LeftPanel() {
  const stats = await getPublicLandingStats();

  return (
    <div className="hidden lg:flex flex-col justify-between bg-[#0D3330] text-white p-10 xl:p-14 min-h-screen w-full">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <BrandMark size={32} />
          <span className="font-heading font-bold text-lg tracking-tight">
            Maintenance<span className="text-[#FF6224]">Hub</span>
          </span>
        </div>
        <p className="text-[#1B7A52] text-xs font-medium mb-8">Role-based access for customers, technicians, and companies</p>

        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">
          <BadgeCheck className="w-4 h-4 text-[#FF6224]" />
          <span className="text-xs font-medium text-gray-200">Built for role-based maintenance workflows</span>
        </div>

        <h1 className="font-heading text-3xl xl:text-4xl font-extrabold leading-tight mb-4">
          A role-based<br />
          <span className="text-[#FF6224]">maintenance workspace.</span>
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-xs">
          Sign in with the account type that matches your workflow and move through the correct dashboard experience.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="font-heading font-extrabold text-xl text-white">{value}</p>
              <p className="text-gray-400 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mb-8" />

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

      <p className="text-xs text-gray-600 mt-10">© {new Date().getFullYear()} Maintenance Hub. All rights reserved.</p>
    </div>
  );
}
