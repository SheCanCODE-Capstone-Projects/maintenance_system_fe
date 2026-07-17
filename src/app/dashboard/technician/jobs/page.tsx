import RequestCard from "@/components/requests/RequestCard";
const job = { id: "job-1", title: "Repair kitchen faucet", description: "Customer has reported a leaking faucet.", status: "In Progress" as const, createdAt: new Date().toISOString() };
export default function JobsPage() { return <section className="mx-auto max-w-4xl p-8"><h1 className="mb-6 text-2xl font-bold">My jobs</h1><RequestCard request={job} /></section>; }
