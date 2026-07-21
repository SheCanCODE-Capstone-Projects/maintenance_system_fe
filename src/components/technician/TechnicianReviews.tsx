import { Star } from "lucide-react";

type Review = {
  initials: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
};

const distribution = [
  { stars: 5, percentage: 72 },
  { stars: 4, percentage: 18 },
  { stars: 3, percentage: 7 },
  { stars: 2, percentage: 2 },
  { stars: 1, percentage: 1 },
];

const reviews: Review[] = [
  { initials: "D", name: "Delice U.", rating: 5, date: "Jul 14, 2025", comment: "Excellent work! Fixed the leak quickly. Very professional." },
  { initials: "E", name: "Emmanuel H.", rating: 5, date: "Jul 8, 2025", comment: "Highly recommend. Showed up on time and finished ahead of schedule." },
  { initials: "A", name: "Aline M.", rating: 4, date: "Jun 30, 2025", comment: "Good service. Clean workspace. Minor delay but communicated well." },
];

function Stars({ rating, size = 17 }: { rating: number; size?: number }) {
  return <span className="inline-flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, index) => <Star key={index} size={size} className={index < rating ? "fill-bright-orange text-bright-orange" : "text-slate-300"} />)}
  </span>;
}

export default function TechnicianReviews() {
  return <section className="space-y-5">
    <h1 className="font-heading text-3xl font-bold text-slate-950">Customer Reviews</h1>
    <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        <div className="min-w-40 text-center">
          <p className="text-5xl font-bold leading-none text-slate-900">4.9</p>
          <div className="mt-2 flex items-center justify-center gap-2"><Stars rating={5} /><span className="text-sm text-slate-500">4.9</span></div>
          <p className="mt-3 text-sm text-slate-500">87 reviews</p>
        </div>
        <div className="w-full space-y-2.5">
          {distribution.map(({ stars, percentage }) => <div key={stars} className="flex items-center gap-3 text-sm text-slate-500">
            <span className="w-4 text-right">{stars}</span><Star size={15} className="fill-bright-orange text-bright-orange" />
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-bright-orange" style={{ width: `${percentage}%` }} /></div>
            <span className="w-8">{percentage}%</span>
          </div>)}
        </div>
      </div>
    </article>
    <div className="space-y-3.5">
      {reviews.map((review) => <article key={review.name} className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-orange-50 text-sm font-semibold text-bright-orange">{review.initials}</span><strong className="text-slate-900">{review.name}</strong></div>
          <div className="flex items-center gap-2 text-sm text-slate-500"><Stars rating={review.rating} size={15} /><span>{review.rating}</span><span>{review.date}</span></div>
        </div>
        <p className="mt-3 text-slate-700">{review.comment}</p>
      </article>)}
    </div>
  </section>;
}
