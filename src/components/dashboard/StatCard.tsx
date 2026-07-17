import Card from "@/components/ui/Card";
export default function StatCard({ label, value }: { label: string; value: string | number }) { return <Card><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p></Card>; }
