import Link from "next/link";

export default function Page() {
  return <main className="grid min-h-screen place-items-center bg-slate-50 p-4"><section className="w-full max-w-md rounded-2xl bg-white p-7 text-center shadow-sm"><h1 className="text-2xl font-bold text-slate-900">Administrator accounts are invite-only</h1><p className="mt-3 text-sm leading-6 text-slate-600">Admins cannot create an account from this application. Please sign in with the credentials assigned by the platform owner.</p><Link href="/login" className="mt-6 inline-block rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white">Go to sign in</Link></section></main>;
}
