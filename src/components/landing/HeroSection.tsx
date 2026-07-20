import Link from "next/link";

const stats = [
  { value: "2400+", label: "Clients" },
  { value: "890+", label: "Technicians" },
  { value: "98%", label: "Resolved Jobs" },
];

function ServiceCard() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 w-72 animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-muted uppercase tracking-wide">Service Request</span>
        <span className="bg-green-100 text-accent text-xs font-semibold px-2 py-0.5 rounded-full">#TK-00421</span>
      </div>
      <div className="space-y-3 text-sm">
        {[
          ["Job Status", "In Progress", "text-primary font-semibold"],
          ["Category", "Electrical"],
          ["Technician", "Jean Paul M."],
          ["Est. Arrival", "Today, 2:30 PM"],
          ["Location", "Kigali, Gasabo"],
        ].map(([label, value, extra]) => (
          <div key={label} className="flex justify-between">
            <span className="text-muted">{label}</span>
            <span className={`font-medium text-gray-800 ${extra ?? ""}`}>{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full w-3/5 bg-primary rounded-full" />
      </div>
      <p className="text-xs text-muted mt-1">60% complete</p>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="pt-28 pb-20 bg-bg" id="hero">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 animate-fade-up">
          <span className="inline-block bg-orange-100 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
            🔧 Rwanda&apos;s #1 Maintenance Platform
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-secondary leading-tight mb-6">
            Your maintenance,<br />
            <span className="text-primary">managed smarter.</span>
          </h1>
          <p className="text-gray-500 text-lg mb-8 max-w-lg">
            Connect customers with verified maintenance professionals across Rwanda. Fast, reliable, and transparent.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/register/customer" className="bg-primary text-white font-semibold px-7 py-3 rounded-full hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200">
              Get Started Free
            </Link>
            <a href="#categories" className="border-2 border-secondary text-secondary font-semibold px-7 py-3 rounded-full hover:bg-secondary hover:text-white transition-colors">
              Browse Technicians
            </a>
          </div>
          <div className="mt-12 flex gap-10">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="font-heading text-3xl font-extrabold text-secondary">{value}</p>
                <p className="text-sm text-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="w-80 h-80 bg-gradient-to-br from-secondary to-accent rounded-3xl opacity-10 absolute -top-6 -left-6" />
            <ServiceCard />
          </div>
        </div>
      </div>
    </section>
  );
}
