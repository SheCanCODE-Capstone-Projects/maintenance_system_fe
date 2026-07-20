import Link from "next/link";
import { Check, Sparkles, ArrowRight, Infinity } from "lucide-react";

const plans = [
  {
    name: "Customer",
    tag: "Always Free",
    trialPrice: null,
    paidPrice: null,
    paidLabel: null,
    badge: null,
    highlight: false,
    description: "For homeowners and individuals who need reliable maintenance services.",
    cta: "Get Started Free",
    href: "/register/customer",
    features: [
      "Submit unlimited service requests",
      "Browse verified technicians",
      "Real-time job tracking",
      "In-app messaging",
      "Job history & receipts",
      "Rate & review technicians",
    ],
  },
  {
    name: "Technician",
    tag: "Most Popular",
    trialPrice: "Free",
    trialNote: "for your first 3 months",
    paidPrice: "RWF 9,900",
    paidLabel: "/ month after trial",
    badge: "3 Months Free Trial",
    highlight: true,
    description: "For independent professionals ready to grow their client base.",
    cta: "Join as Technician",
    href: "/register/technician",
    features: [
      "Receive & accept job requests",
      "Build your public profile",
      "Client ratings & reviews",
      "Earnings dashboard",
      "Priority job matching",
      "Dedicated support",
    ],
  },
  {
    name: "Company",
    tag: "For Teams",
    trialPrice: "Free",
    trialNote: "for your first 3 months",
    paidPrice: "RWF 29,900",
    paidLabel: "/ month after trial",
    badge: "3 Months Free Trial",
    highlight: false,
    description: "For maintenance companies managing multiple technicians and clients.",
    cta: "Register Company",
    href: "/register/company",
    features: [
      "Everything in Technician",
      "Manage your full team",
      "Company dashboard & analytics",
      "Bulk job assignment",
      "Custom branding on profile",
      "Priority customer support",
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Pricing</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-secondary mt-2">
            Simple, transparent pricing
          </h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto text-base leading-relaxed">
            Customers are <span className="font-semibold text-secondary">always free</span>. Technicians and companies
            start with a full{" "}
            <span className="font-semibold text-primary">3-month free trial</span> — no credit card needed.
            After the trial, simple monthly pricing keeps you growing.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map(({ name, tag, trialPrice, trialNote, paidPrice, paidLabel, badge, highlight, description, cta, href, features }) => (
            <div
              key={name}
              className={`relative rounded-2xl border-2 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                highlight
                  ? "border-primary shadow-xl shadow-orange-100 bg-white"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              {/* Top badge ribbon */}
              {badge && (
                <div className={`flex items-center justify-center gap-1.5 py-2 text-xs font-bold ${highlight ? "bg-primary text-white" : "bg-secondary text-white"}`}>
                  <Sparkles className="w-3 h-3" />
                  {badge}
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                {/* Plan tag + name */}
                <div className="flex items-center justify-between mb-4">
                  <p className="font-heading text-xl font-extrabold text-secondary">{name}</p>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${highlight ? "bg-orange-100 text-primary" : "bg-gray-100 text-gray-500"}`}>
                    {tag}
                  </span>
                </div>

                {/* Pricing block */}
                {trialPrice ? (
                  <div className="mb-5">
                    {/* Trial price */}
                    <div className="flex items-end gap-2 mb-1">
                      <span className="font-heading text-5xl font-extrabold text-secondary">{trialPrice}</span>
                    </div>
                    <p className="text-sm text-muted mb-4">{trialNote}</p>

                    {/* Then price — prominent */}
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                      <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                      <div>
                        <span className="font-heading text-lg font-extrabold text-secondary">{paidPrice}</span>
                        <span className="text-sm text-muted ml-1">{paidLabel}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-1">
                      <Infinity className="w-6 h-6 text-accent" />
                      <span className="font-heading text-5xl font-extrabold text-secondary">Free</span>
                    </div>
                    <p className="text-sm text-muted">forever — no hidden costs</p>
                  </div>
                )}

                <p className="text-sm text-gray-500 leading-relaxed mb-6">{description}</p>

                {/* Divider */}
                <div className="border-t border-gray-100 mb-6" />

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={href}
                  className={`block text-center font-semibold py-3.5 rounded-xl transition-all text-sm hover:scale-[1.02] active:scale-100 ${
                    highlight
                      ? "bg-primary text-white hover:bg-orange-600 shadow-lg shadow-orange-200"
                      : "bg-secondary text-white hover:bg-[#0a2a27]"
                  }`}
                >
                  {cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Trial timeline visual */}
        <div className="mt-14 bg-white border border-gray-200 rounded-2xl px-8 py-7">
          <p className="text-center text-sm font-semibold text-secondary mb-6">How the free trial works</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-0">
            {[
              { step: "Sign Up", sub: "Day 1", color: "bg-accent" },
              { step: "Use for Free", sub: "Months 1 – 3", color: "bg-accent" },
              { step: "Trial Ends", sub: "Day 90", color: "bg-primary" },
              { step: "Simple Monthly Plan", sub: "Month 4 onwards", color: "bg-secondary" },
            ].map(({ step, sub, color }, i, arr) => (
              <div key={step} className="flex flex-col sm:flex-row items-center">
                <div className="flex flex-col items-center text-center">
                  <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold`}>
                    {i + 1}
                  </div>
                  <p className="text-xs font-semibold text-secondary mt-2">{step}</p>
                  <p className="text-[11px] text-muted">{sub}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-px h-8 sm:w-12 sm:h-px bg-gray-200 my-2 sm:my-0 sm:mx-3" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-muted mt-8">
          No credit card required to start. Cancel anytime. All plans include access to our verified technician network.
        </p>
      </div>
    </section>
  );
}
