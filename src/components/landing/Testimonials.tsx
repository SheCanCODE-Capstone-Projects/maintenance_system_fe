const testimonials = [
  {
    name: "Amina Uwase",
    role: "Homeowner, Kigali",
    avatar: "AU",
    review: "Maintenance Hub connected me with an electrician within the hour. The service was professional and the pricing was transparent. Highly recommend!",
  },
  {
    name: "Eric Nshimiyimana",
    role: "Property Manager",
    avatar: "EN",
    review: "Managing multiple properties used to be a nightmare. Now I submit all requests through the platform and track everything in one place. Game changer.",
  },
  {
    name: "Claire Mukamana",
    role: "Business Owner",
    avatar: "CM",
    review: "The technicians are verified and skilled. My plumbing issue was fixed same day. The real-time tracking feature gave me peace of mind throughout.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-14">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Testimonials</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-secondary mt-2">What Our Clients Say</h2>
          <p className="text-muted mt-3 max-w-xl mx-auto">Real experiences from real customers across Rwanda.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, avatar, review }) => (
            <div key={name} className="bg-white rounded-2xl p-7 hover:shadow-lg transition-shadow">
              <div className="text-primary text-lg mb-4">★★★★★</div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">&ldquo;{review}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-bold">
                  {avatar}
                </div>
                <div>
                  <p className="font-semibold text-secondary text-sm">{name}</p>
                  <p className="text-muted text-xs">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
