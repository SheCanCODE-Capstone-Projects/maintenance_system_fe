import Link from "next/link";

const links = [["Overview", "/dashboard/admin"], ["Users", "/dashboard/admin/users"], ["Verification", "/dashboard/admin/verification"], ["Categories", "/dashboard/admin/categories"], ["Reports", "/dashboard/admin/reports"], ["Audit log", "/dashboard/admin/audit-log"], ["Settings", "/dashboard/admin/settings"]] as const;

export default function AdminSidebar() {
  return <aside className="w-60 shrink-0 border-r bg-white p-5"><h2 className="mb-6 font-bold">Admin portal</h2><nav className="space-y-2">{links.map(([label, href]) => <Link key={href} href={href} className="block rounded px-3 py-2 hover:bg-blue-50">{label}</Link>)}</nav></aside>;
}
