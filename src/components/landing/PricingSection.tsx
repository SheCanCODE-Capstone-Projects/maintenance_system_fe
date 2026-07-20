import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Customer",
    price: "Free",
    period: "forever",
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
    price: "Free",
    period: "for 3 months",
    badge: "3 Months Free",
    highlight: true,
    description: "For independent professionals ready to grow their client base.",
    cta: "Join as Technician",
    href: "/register/technician",
    afterTrial: "RWF 9,900 / month after trial",
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
    price: "Free",
    period: "for 3 months",
    badge: "3 Months Free",
    highlight: false,
    description: "For maintenance companies managing multiple technicians and clients.",
    cta: "Register Company",
    href: "/register/company",
    afterTrial: "RWF 29,900 / month after trial",
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
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Pricing</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-secondary mt-2">
            Simple, transparent pricing
          </h2>
          <p className="text-muted mt-3 max-w-xl mx-auto">
            Customers are always free. Technicians and companies enjoy a full{" "}
            <span className="text-primary font-semibold">3-month free trial</span> — no credit card required.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map(({ name, price, period, badge, highlight, description, cta, href, afterTrial, features }) => (
            <div
              key={name}
              className={`relative rounded-2xl border-2 p-8 flex flex-col transition-shadow hover:shadow-xl ${
                highlight
                  ? "border-primary shadow-lg shadow-orange-100 bg-white"
                  : "border-gray-200 bg-white"
              }`}
            >
              {/* Popular badge */}
              {badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow">
                    <Sparkles className="w-3 h-3" />
                    {badge}
                  </span>
                </div>
              )}

              {/* Plan name */}
              <p className="text-sm font-semibold text-muted uppercase tracking-widest mb-3">{name}</p>

              {/* Price */}
              <div className="mb-1">
                <span className="font-heading text-4xl font-extrabold text-secondary">{price}</span>
                {price !== "Free" && <span className="text-muted text-sm ml-1">/ mo</span>}
              </div>
              <p className="text-sm text-muted mb-1">{period}</p>
              {afterTrial && (
                <p className="text-xs text-gray-400 mb-4">{afterTrial}</p>
              )}

              <p className="text-sm text-gray-500 leading-relaxed mb-6 mt-2">{description}</p>

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
                className={`block text-center font-semibold py-3 rounded-xl transition-colors text-sm ${
                  highlight
                    ? "bg-primary text-white hover:bg-orange-600 shadow-lg shadow-orange-200"
                    : "bg-secondary text-white hover:bg-[#0a2a27]"
                }`}
              >
                {cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-muted mt-10">
          All plans include access to our verified technician network. No hidden fees. Cancel anytime after trial.
        </p>
      </div>
    </section>
  );
}
