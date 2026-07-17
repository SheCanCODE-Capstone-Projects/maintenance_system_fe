import Link from "next/link";
const roles = ["Customer", "Technician", "Company", "Admin"];
export default function Home() { return <section className="mx-auto max-w-5xl px-6 py-20 text-center"><h1 className="text-4xl font-bold">Maintenance Hub</h1><p className="mt-4 text-slate-600">Choose your role to get started.</p><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{roles.map((role) => <Link key={role} href={`/register/${role.toLowerCase()}`} className="rounded-lg bg-white p-6 shadow hover:bg-blue-50">{role}</Link>)}</div></section>; }
