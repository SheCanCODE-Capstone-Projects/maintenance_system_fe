import Link from "next/link";

const links = [["Overview", "/dashboard/technician"], ["Jobs", "/dashboard/technician/jobs"], ["Earnings", "/dashboard/technician/earnings"], ["Subscription", "/dashboard/technician/subscription"], ["Profile", "/dashboard/technician/profile"]] as const;

export default function TechnicianSidebar() {
  return <aside className="w-60 shrink-0 border-r bg-white p-5"><h2 className="mb-6 font-bold">Technician portal</h2><nav className="space-y-2">{links.map(([label, href]) => <Link key={href} href={href} className="block rounded px-3 py-2 hover:bg-blue-50">{label}</Link>)}</nav></aside>;
}
