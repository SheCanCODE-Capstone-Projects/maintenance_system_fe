import Link from "next/link";
export default function Sidebar() { return <aside className="w-56 border-r bg-white p-4"><nav className="space-y-3"><Link className="block" href="/requests/my">My requests</Link><Link className="block" href="/settings">Settings</Link></nav></aside>; }
