"use client";

import { CheckCircle2, ChevronLeft, ChevronRight, DollarSign, ShieldCheck, TrendingUp } from "lucide-react";
import { useState } from "react";

const transactions = [
  ["Jul 14, 2025", "Kitchen plumbing repair", "RWF 45,000", "Paid"],
  ["Jul 08, 2025", "Electrical wiring inspection", "RWF 32,000", "Paid"],
  ["Jun 30, 2025", "Bathroom leak repair", "RWF 28,000", "Paid"],
  ["Jun 26, 2025", "Air conditioner service", "RWF 37,000", "Processing"],
  ["Jun 18, 2025", "Door lock replacement", "RWF 24,000", "Paid"],
  ["Jun 11, 2025", "Light fixture installation", "RWF 18,000", "Paid"],
];

const stats = [
  { label: "This month", value: "RWF 142,000", helper: "+18% from last month", icon: TrendingUp, helperClass: "text-emerald-700" },
  { label: "Total earned", value: "RWF 1.2M", helper: "Since Jan 2024", icon: DollarSign, helperClass: "text-bright-orange" },
  { label: "Jobs done", value: "87", helper: "All time", icon: CheckCircle2, helperClass: "text-blue-600" },
];

export default function TechnicianEarnings() {
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const pageRows = transactions.slice((page - 1) * pageSize, page * pageSize);
  const pages = Math.ceil(transactions.length / pageSize);
  return <section className="space-y-6">
    <h1 className="font-heading text-3xl font-bold text-slate-950">Earnings</h1>
    <div className="grid gap-4 md:grid-cols-3">{stats.map(({ label, value, helper, icon: Icon, helperClass }) => <article key={label} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between"><p className="text-sm text-slate-500">{label}</p><Icon size={20} className={helperClass} /></div>
      <p className="mt-4 text-3xl font-bold text-slate-900">{value}</p><p className={`mt-2 text-sm font-medium ${helperClass}`}>{helper}</p>
    </article>)}</div>
    <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-slate-700"><ShieldCheck size={20} className="shrink-0 text-emerald-700" /><span>Subscription active — 100% of job payouts go to you. Renews on Aug 1, 2025.</span></div>
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5"><h2 className="text-lg font-bold text-slate-900">Transaction history</h2></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-6 py-3 font-semibold">Date</th><th className="px-6 py-3 font-semibold">Job</th><th className="px-6 py-3 font-semibold">Amount</th><th className="px-6 py-3 font-semibold">Payout</th></tr></thead><tbody>
        {pageRows.map(([date, job, amount, status]) => <tr key={`${date}-${job}`} className="border-t border-slate-100"><td className="px-6 py-4 text-slate-500">{date}</td><td className="px-6 py-4 font-medium text-slate-800">{job}</td><td className="px-6 py-4 font-semibold text-slate-900">{amount}</td><td className="px-6 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{status}</span></td></tr>)}
      </tbody></table></div>
      <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 text-sm text-slate-500"><span>Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, transactions.length)} of {transactions.length}</span><div className="flex gap-2"><button aria-label="Previous page" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1} className="rounded border border-slate-200 p-1.5 disabled:opacity-40"><ChevronLeft size={16} /></button><button aria-label="Next page" onClick={() => setPage((value) => Math.min(pages, value + 1))} disabled={page === pages} className="rounded border border-slate-200 p-1.5 disabled:opacity-40"><ChevronRight size={16} /></button></div></div>
    </article>
  </section>;
}
