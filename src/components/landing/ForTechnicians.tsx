import Link from "next/link";

const benefits = [
  "Steady stream of verified job requests",
  "Flexible schedule — work on your terms",
  "Secure & fast payments after each job",
  "Build your reputation with client reviews",
  "Access to training & skill development",
];

function VerificationCard() {
  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl">👷</div>
        <div>
          <p className="font-heading font-bold text-white">Technician Profile</p>
          <p className="text-green-300 text-xs font-semibold">✓ Verified Professional</p>
        </div>
      </div>
      <div className="space-y-2 text-sm mb-5">
        {[
          ["Specialty", "Electrical & Plumbing"],
          ["Experience", "5+ Years"],
          ["Rating", "4.9 / 5.0 ⭐"],
          ["Jobs Done", "312 Completed"],
          ["Response Time", "< 30 minutes"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between">
            <span className="text-gray-400">{k}</span>
            <span className="text-white font-medium">{v}</span>
          </div>
        ))}
      </div>
      <div className="bg-accent/30 rounded-xl p-3 text-center">
        <p className="text-green-300 text-xs font-semibold">🟢 Available for new jobs</p>
      </div>
    </div>
  );
}

export default function ForTechnicians() {
  return (
    <section id="for-technicians" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 xl:px-32 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Join Our Network</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
            Grow your business<br />with Maintenance Hub
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Join hundreds of skilled technicians already earning more and building their reputation on our platform.
          </p>
          <ul className="space-y-3 mb-10">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-gray-300 text-sm">
                <span className="text-primary mt-0.5">✓</span>
                {b}
              </li>
            ))}
          </ul>
          <Link href="/register/technician" className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-orange-600 transition-colors shadow-lg shadow-orange-900/30">
            Register as Technician
          </Link>
        </div>
        <div>
          <VerificationCard />
        </div>
      </div>
    </section>
  );
}
