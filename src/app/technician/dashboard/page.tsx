import Link from "next/link";

export default function TechnicianDashboardPage() {
  return <main className="p-8"><h1 className="text-2xl font-bold">Technician dashboard</h1><p className="mt-2">Your dashboard is ready for your team to expand.</p><Link className="mt-4 inline-block underline" href="/login">Back to login</Link></main>;
}
