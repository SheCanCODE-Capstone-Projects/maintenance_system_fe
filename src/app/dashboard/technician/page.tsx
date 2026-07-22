<<<<<<< Updated upstream
import StatCard from "@/components/dashboard/StatCard";
export default function Page() { return <section className="mx-auto max-w-6xl p-8"><h1 className="mb-6 text-2xl font-bold">Technician dashboard</h1><StatCard label="Assigned work" value={5} /></section>; }
=======
"use client";

import { Bell, Check, CheckCircle2, CirclePlay, Flame, MapPin, Star, XCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const jobs = [
  { id: 1, initials: "DU", name: "Delice Uwase", place: "Gasabo, Kimihurura", status: "In progress", action: "complete" },
  { id: 2, initials: "EH", name: "Emmanuel Habimana", place: "Kicukiro, Niboye", status: "New", action: "respond" },
];

export default function TechnicianDashboard() {
  const [items, setItems] = useState(jobs);
  const complete = (id: number) => setItems((list) => list.map((job) => job.id === id ? { ...job, status: "Completed", action: "done" } : job));
  const respond = (id: number, accepted: boolean) => setItems((list) => list.map((job) => job.id === id ? { ...job, status: accepted ? "In progress" : "Declined", action: accepted ? "complete" : "done" } : job));
  const newCount = items.filter((job) => job.status === "New").length;
  return <main className="mx-auto max-w-[1600px] p-4 sm:p-6 md:p-10">
    <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">Dashboard</h1><p className="mt-1 text-sm text-slate-500 sm:text-base">Eric Nshimiyimana · Plumbing · Gasabo, Kimihurura</p>
    <section className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 xl:grid-cols-4"><Stat label="New requests" value={newCount} helper="Awaiting response" color="text-amber-700" icon={Bell} /><Stat label="Active jobs" value={items.filter((job) => job.status === "In progress").length} helper="In progress now" color="text-blue-700" icon={CirclePlay} /><Stat label="Completed" value={items.filter((job) => job.status === "Completed").length} helper="All time" color="text-emerald-700" icon={CheckCircle2} /><Stat label="Avg. rating" value="4.9" helper="Based on 87 reviews" color="text-primary" icon={Star} /></section>
    {newCount > 0 && <div className="mt-6 flex flex-col gap-4 rounded-xl border border-amber-200 bg-amber-100/70 px-4 py-4 text-amber-800 sm:mt-7 sm:flex-row sm:items-center sm:justify-between sm:px-6"><span className="flex items-center gap-3 font-semibold"><Bell size={20} className="shrink-0" />{newCount} new job request waiting</span><Link href="/dashboard/technician/jobs" className="rounded-lg bg-amber-700 px-5 py-3 text-center font-semibold text-white shadow-sm hover:bg-amber-800">View requests</Link></div>}
    <section className="mt-7"><h2 className="text-xl font-bold text-slate-950">Recent jobs</h2><div className="mt-4 space-y-3">{items.map((job) => <JobRow key={job.id} job={job} onComplete={() => complete(job.id)} onRespond={respond} />)}</div></section>
  </main>;
}

function Stat({ label, value, helper, color, icon: Icon }: { label: string; value: string | number; helper: string; color: string; icon: typeof Bell }) { return <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="flex justify-between text-slate-500"><span>{label}</span><Icon size={19} className={color} /></div><p className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">{value}</p><p className={`mt-1 text-sm font-semibold ${color}`}>{helper}</p></article>; }
function JobRow({ job, onComplete, onRespond }: { job: typeof jobs[number]; onComplete: () => void; onRespond: (id: number, accepted: boolean) => void }) { return <article className="rounded-2xl border border-red-300 bg-white px-4 py-4 shadow-sm sm:px-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div className="flex min-w-0 items-center gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-red-100 text-sm font-bold text-red-500">{job.initials}</span><div className="min-w-0"><h3 className="break-words font-bold text-slate-950">{job.name}</h3><p className="mt-0.5 flex items-center gap-1 text-sm text-slate-500"><MapPin size={13} className="shrink-0" />{job.place}</p></div></div><div className="flex flex-wrap gap-2"><Badge className="inline-flex items-center gap-1 bg-red-100 text-red-500"><Flame size={13} />URGENT</Badge><Badge className={job.status === "New" ? "bg-amber-100 text-amber-700" : job.status === "Completed" ? "bg-emerald-100 text-emerald-700" : "bg-blue-50 text-blue-700"}>{job.status}</Badge></div></div><div className="mt-4 flex flex-wrap justify-end gap-2">{job.action === "complete" && <button onClick={onComplete} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-white shadow-sm hover:bg-orange-600 sm:w-auto"><CheckCircle2 size={17} />Mark complete</button>}{job.action === "respond" && <><button onClick={() => onRespond(job.id, false)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 py-3 font-semibold text-red-500 hover:bg-red-50 sm:flex-none"><XCircle size={17} />Reject</button><button onClick={() => onRespond(job.id, true)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800 sm:flex-none"><Check size={17} />Accept</button></>}{job.action === "done" && <span className="text-sm font-semibold text-slate-500">No further action required</span>}</div></article>; }
function Badge({ children, className }: { children: React.ReactNode; className: string }) { return <span className={`rounded-full px-3 py-1 text-xs font-bold ${className}`}>{children}</span>; }
>>>>>>> Stashed changes
