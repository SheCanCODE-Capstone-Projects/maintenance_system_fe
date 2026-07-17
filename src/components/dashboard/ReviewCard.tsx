import type { Review } from "@/types/report";
import Card from "@/components/ui/Card";
export default function ReviewCard({ review }: { review: Review }) { return <Card><p className="font-medium">{review.author}</p><p className="text-amber-500">{"★".repeat(review.rating)}</p><p className="text-sm text-slate-600">{review.comment}</p></Card>; }
