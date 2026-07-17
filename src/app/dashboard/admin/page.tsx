import StatCard from "@/components/dashboard/StatCard";
export default function Page() { return <section className="mx-auto max-w-6xl p-8"><h1 className="mb-6 text-2xl font-bold">Admin dashboard</h1><div className="grid gap-4 sm:grid-cols-3"><StatCard label="Open requests" value={24} /><StatCard label="Technicians" value={12} /><StatCard label="Companies" value={8} /></div></section>; }
