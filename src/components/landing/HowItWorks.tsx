import Image from "next/image";
import { ClipboardList, UserSearch, BadgeCheck } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: ClipboardList,
    title: "Submit Request",
    desc: "Describe your maintenance issue and submit a request in under 2 minutes.",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    alt: "Person filling a form on a laptop",
  },
  {
    num: "02",
    icon: UserSearch,
    title: "Choose Technician",
    desc: "Browse verified professionals, check ratings, and pick the best fit.",
    img: "https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=600&q=80",
    alt: "Technician being selected on a phone screen",
  },
  {
    num: "03",
    icon: BadgeCheck,
    title: "Job Completed",
    desc: "Track progress in real-time and confirm completion when satisfied.",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
    alt: "Technician completing a maintenance job",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 xl:px-32">
        <div className="text-center mb-14">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Simple Process</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-secondary mt-2">How It Works</h2>
          <p className="text-muted mt-3 max-w-xl mx-auto">Get your maintenance issues resolved in three easy steps.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(({ num, icon: Icon, title, desc, img, alt }) => (
            <div key={num} className="group rounded-2xl overflow-hidden bg-bg hover:shadow-xl transition-shadow duration-300">
              {/* Photo */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={img}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Step number overlay */}
                <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-extrabold font-heading">{num}</span>
                </div>
              </div>

              {/* Text */}
              <div className="p-7">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-secondary mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
