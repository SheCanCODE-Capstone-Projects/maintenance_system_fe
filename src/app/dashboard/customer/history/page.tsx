import ReviewCard from "@/components/dashboard/ReviewCard";
export default function HistoryPage() { return <section className="mx-auto max-w-4xl p-8"><h1 className="mb-6 text-2xl font-bold">Service history</h1><ReviewCard review={{ id: "1", author: "Alex", rating: 5, comment: "Excellent service." }} /></section>; }
