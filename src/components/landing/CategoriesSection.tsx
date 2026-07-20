import Image from "next/image";

const categories = [
  {
    title: "Plumbing",
    desc: "Pipe repairs, leaks, installations & drainage solutions.",
    img: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80",
  },
  {
    title: "Electrical",
    desc: "Wiring, panel upgrades, outlets & lighting installations.",
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80",
  },
  {
    title: "Carpentry",
    desc: "Furniture assembly, repairs, doors & custom woodwork.",
    img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80",
  },
  {
    title: "Painting",
    desc: "Interior & exterior painting, wall prep & finishing.",
    img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80",
  },
  {
    title: "Mechanical",
    desc: "Generator servicing, HVAC, pumps & equipment repair.",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80",
  },
  {
    title: "General Maintenance",
    desc: "Routine upkeep, cleaning, inspections & minor fixes.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
];

export default function CategoriesSection() {
  return (
    <section id="categories" className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Services</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-secondary mt-2">Browse Categories</h2>
          <p className="text-muted mt-3 max-w-xl mx-auto">Find the right professional for every maintenance need.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(({ title, desc, img }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              {/* Photo */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={img}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* dark overlay on hover */}
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/60 transition-colors duration-300" />
              </div>

              {/* Text card below image */}
              <div className="bg-white px-6 py-5 group-hover:bg-secondary transition-colors duration-300">
                <h3 className="font-heading text-lg font-bold text-secondary group-hover:text-white mb-1 transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-muted text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
