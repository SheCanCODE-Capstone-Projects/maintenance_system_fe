const steps = [
  {
    num: "01",
    icon: "📋",
    title: "Submit Request",
    desc: "Describe your maintenance issue and submit a request in under 2 minutes.",
  },
  {
    num: "02",
    icon: "🔍",
    title: "Choose Technician",
    desc: "Browse verified professionals, check ratings, and pick the best fit.",
  },
  {
    num: "03",
    icon: "✅",
    title: "Job Completed",
    desc: "Track progress in real-time and confirm completion when satisfied.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-14">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Simple Process</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-secondary mt-2">How It Works</h2>
          <p className="text-muted mt-3 max-w-xl mx-auto">Get your maintenance issues resolved in three easy steps.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(({ num, icon, title, desc }) => (
            <div key={num} className="relative bg-bg rounded-2xl p-8 hover:shadow-lg transition-shadow group">
              <span className="absolute top-6 right-6 font-heading text-5xl font-extrabold text-gray-100 group-hover:text-orange-100 transition-colors select-none">
                {num}
              </span>
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="font-heading text-xl font-bold text-secondary mb-2">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
