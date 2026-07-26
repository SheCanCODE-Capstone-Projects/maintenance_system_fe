import type { CSSProperties } from "react";
import Link from "next/link";
import { getPublicLandingStats } from "@/lib/metrics";

function ServiceCard() {
  return (
    <div className="hero-service-card w-72 rounded-2xl border border-white/70 bg-white/95 p-5 shadow-2xl shadow-[#062a27]/25 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">Service Request</span>
        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-accent">#TK-00421</span>
      </div>
      <div className="space-y-3 text-sm">
        {[
          ["Job Status", "In Progress", "text-primary font-semibold"],
          ["Category", "Electrical"],
          ["Technician", "Jean Paul M."],
          ["Est. Arrival", "Today, 2:30 PM"],
          ["Location", "Kigali, Gasabo"],
        ].map(([label, value, extra]) => (
          <div key={label} className="flex justify-between gap-3">
            <span className="text-muted">{label}</span>
            <span className={`text-right font-medium text-gray-800 ${extra ?? ""}`}>{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div className="h-full w-3/5 rounded-full bg-primary" />
      </div>
      <p className="mt-1 text-xs text-muted">60% complete</p>
    </div>
  );
}

export default async function HeroSection() {
  const stats = await getPublicLandingStats();

  return (
    <section className="relative isolate overflow-hidden bg-[#092c29] py-24 sm:py-28 lg:min-h-[680px] lg:py-32" id="hero">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-[position:62%_center] lg:bg-center"
        style={{ backgroundImage: "url('/maintenance-hero.jpg')" }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#f4f6f5]/[.98] via-[#f4f6f5]/90 to-[#0d3330]/55" />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 sm:px-12 lg:flex-row lg:px-24 xl:px-32">
        <div className="flex-1">
          <span className="hero-badge mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/90 px-3.5 py-1.5 text-xs font-bold text-primary shadow-sm">
            <span aria-hidden="true">🔧</span> Rwanda&apos;s #1 Maintenance Platform
          </span>
          <h1 className="mb-6 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-secondary sm:text-5xl lg:text-6xl">
            <span className="hero-title-word" style={{ "--hero-delay": "150ms" } as CSSProperties}>Your</span>{" "}
            <span className="hero-title-word" style={{ "--hero-delay": "450ms" } as CSSProperties}>maintenance,</span><br />
            <span className="hero-title-word text-primary" style={{ "--hero-delay": "750ms" } as CSSProperties}>managed</span>{" "}
            <span className="hero-title-word text-primary" style={{ "--hero-delay": "1050ms" } as CSSProperties}>smarter.</span>
          </h1>
          <p className="hero-copy mb-8 max-w-lg text-lg leading-8 text-slate-600">
            Connect customers with verified maintenance professionals across Rwanda. Fast, reliable, and transparent.
          </p>
          <div className="hero-actions flex flex-wrap gap-4">
            <Link href="/register/customer" className="rounded-full bg-primary px-7 py-3 font-semibold text-white shadow-lg shadow-orange-200 transition-all hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl">
              Get Started Free
            </Link>
            <a href="#categories" className="rounded-full border-2 border-secondary bg-white/40 px-7 py-3 font-semibold text-secondary backdrop-blur-sm transition-colors hover:bg-secondary hover:text-white">
              Browse Technicians
            </a>
          </div>
          <div className="hero-stats mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-[#0d3330]/15 pt-6">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="font-heading text-3xl font-extrabold text-secondary">{value}</p>
                <p className="text-sm text-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-1 justify-center lg:justify-end">
          <div className="relative mt-3">
            <div aria-hidden="true" className="absolute -left-7 -top-7 h-80 w-80 rounded-3xl bg-gradient-to-br from-white/40 to-[#ff6224]/35" />
            <div className="absolute -right-5 -bottom-5 z-10 rounded-xl bg-[#0d3330] px-4 py-3 text-xs font-semibold text-white shadow-xl">
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#6ee7b7]" /> Live job tracking
            </div>
            <ServiceCard />
          </div>
        </div>
      </div>
    </section>
  );
}
