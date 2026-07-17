import RequestCard from "@/components/requests/RequestCard";
const request = { id: "1", title: "Leaking faucet", description: "Kitchen faucet needs repair.", status: "Open" as const, createdAt: new Date().toISOString() };
export default function Page() { return <section className="mx-auto max-w-4xl p-8"><h1 className="mb-6 text-2xl font-bold">My requests</h1><RequestCard request={request} /></section>; }
