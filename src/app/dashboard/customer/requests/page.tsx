import RequestCard from "@/components/requests/RequestCard";
import Link from "next/link";

const request = { id: "1", title: "Leaking faucet", description: "Kitchen faucet needs repair.", status: "Open" as const, createdAt: new Date().toISOString() };
export default function CustomerRequestsPage() { return <section className="mx-auto max-w-4xl p-8"><div className="mb-6 flex items-center justify-between"><h1 className="text-2xl font-bold">My requests</h1><Link href="/requests/new" className="rounded bg-blue-600 px-4 py-2 text-white">New request</Link></div><RequestCard request={request} /></section>; }
