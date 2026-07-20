const features = [
  { icon: "🛡️", title: "Verified Technicians", desc: "Every professional is background-checked and skill-verified before joining." },
  { icon: "📍", title: "Real-Time Tracking", desc: "Track your technician's location and job progress live on the map." },
  { icon: "⭐", title: "Rated Professionals", desc: "Read genuine reviews and ratings from real customers before booking." },
  { icon: "🚨", title: "Emergency Response", desc: "24/7 emergency dispatch for urgent maintenance situations." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 xl:px-32">
        <div className="text-center mb-14">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Advantage</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-secondary mt-2">Why Choose Us</h2>
          <p className="text-muted mt-3 max-w-xl mx-auto">We set the standard for maintenance service quality in Rwanda.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="bg-bg rounded-2xl p-7 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="font-heading text-lg font-bold text-secondary mb-2">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
