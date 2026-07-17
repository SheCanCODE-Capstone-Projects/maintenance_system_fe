import Link from "next/link";
export default function Navbar() { return <header className="border-b bg-white"><nav className="mx-auto flex max-w-6xl items-center justify-between p-4"><Link href="/" className="font-bold">Maintenance Hub</Link><Link href="/login">Login</Link></nav></header>; }
