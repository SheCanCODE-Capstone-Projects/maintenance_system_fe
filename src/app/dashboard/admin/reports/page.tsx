import { ArrowUpRight, Download, UsersRound, Wrench } from "lucide-react";

const months = [35, 46, 41, 59, 67, 61, 76, 88, 94, 82, 104, 112];
const summaries = [
  ["RWF 6.2M", "Payment volume", "18.4%", "text-emerald-600"],
  ["86", "Completed requests", "12.1%", "text-emerald-600"],
  ["4.8/5", "Average rating", "0.2 points", "text-blue-600"],
];

export default function Page() {
  return <main className="min-h-screen bg-[#f5f7f6] p-7 lg:p-10">
    <header className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="font-heading text-2xl font-extrabold text-[#132d2a]">Reports</h1><p className="mt-1 text-sm text-slate-500">Platform activity and performance insights.</p></div><button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"><Download className="h-4 w-4" />Export report</button></header>
    <section className="mt-5 grid gap-4 md:grid-cols-3">{summaries.map(([value, title, delta, color]) => <div key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs text-slate-500">{title}</p><p className="mt-2 text-2xl font-extrabold text-[#132d2a]">{value}</p><p className={`mt-2 flex items-center gap-1 text-xs font-semibold ${color}`}><ArrowUpRight className="h-3.5 w-3.5" />{delta} vs last month</p></div>)}</section>
    <section className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="font-bold text-[#132d2a]">Requests completed</h2><p className="mt-1 text-xs text-slate-500">Monthly completed maintenance requests</p></div><select className="rounded-lg border border-slate-200 px-3 py-2 text-xs"><option>Last 12 months</option></select></div><div className="mt-8 flex h-52 items-end gap-2 border-b border-slate-100 pb-1">{months.map((value, index) => <div key={index} className="group flex flex-1 flex-col items-center justify-end gap-1"><span className="hidden rounded bg-slate-800 px-1.5 py-0.5 text-[9px] text-white group-hover:block">{value}</span><div style={{ height: `${value / 1.12}%` }} className="w-full rounded-t bg-[#ff6224]/80 transition hover:bg-[#ff6224]" /></div>)}</div><div className="mt-2 flex justify-between text-[10px] text-slate-400"><span>Aug</span><span>Nov</span><span>Feb</span><span>May</span><span>Jul</span></div></section>
    <section className="mt-5 grid gap-4 md:grid-cols-2"><div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><UsersRound className="h-5 w-5 text-[#ff6224]" /><h2 className="mt-3 font-bold">Customer growth</h2><p className="mt-1 text-sm text-slate-500">1,248 customer accounts are active this month.</p></div><div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><Wrench className="h-5 w-5 text-[#ff6224]" /><h2 className="mt-3 font-bold">Provider coverage</h2><p className="mt-1 text-sm text-slate-500">94 verified providers across 6 service categories.</p></div></section>
  </main>;
}
