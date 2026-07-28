"use client";

import Link from "next/link";
import { Bell, Eye, Pencil, Plus, X } from "lucide-react";
import { FormEvent, useState } from "react";

export type TechnicianStatus = "Active" | "Busy" | "Offline";

export interface TeamMember {
  id: string;
  initials: string;
  name: string;
  joined: string;
  trade: string;
  email: string;
  phone: string;
  status: TechnicianStatus;
  jobs: number;
}

export interface CompanyMetric {
  label: string;
  value: string;
  caption: string;
  captionClassName: string;
}

const metrics: CompanyMetric[] = [
  { label: "Team members", value: "4", caption: "Active employees", captionClassName: "text-[#168b63]" },
  { label: "New requests", value: "1", caption: "Awaiting assignment", captionClassName: "text-[#b56815]" },
  { label: "Active jobs", value: "2", caption: "In progress", captionClassName: "text-[#315cec]" },
  { label: "Avg. rating", value: "4.8", caption: "148 reviews", captionClassName: "text-[#168b63]" },
];

const initialMembers: TeamMember[] = [
  { id: "eric", initials: "EN", name: "Eric Nshimiyimana", joined: "Joined Jan 2024", trade: "Plumbing", email: "eric.n@buildfix.rw", phone: "+250 788 111 001", status: "Active", jobs: 87 },
  { id: "claudine", initials: "CM", name: "Claudine Mukamana", joined: "Joined Mar 2024", trade: "Electrical", email: "claudine@buildfix.rw", phone: "+250 788 111 002", status: "Busy", jobs: 63 },
  { id: "patrick", initials: "PH", name: "Patrick Habimana", joined: "Joined Apr 2024", trade: "Carpentry", email: "patrick@buildfix.rw", phone: "+250 788 111 003", status: "Active", jobs: 55 },
  { id: "grace", initials: "GU", name: "Grace Uwimana", joined: "Joined Jun 2024", trade: "Painting", email: "grace@buildfix.rw", phone: "+250 788 111 004", status: "Offline", jobs: 41 },
];

const statusStyle: Record<TechnicianStatus, string> = {
  Active: "bg-emerald-500",
  Busy: "bg-[#ff6a2f]",
  Offline: "bg-slate-400",
};

export default function CompanyTeam() {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [detailsFor, setDetailsFor] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: "", trade: "Plumbing", email: "", phone: "" });
  const modify = (id: string) => setMembers((current) => current.map((member) => member.id === id ? { ...member, status: member.status === "Active" ? "Busy" : "Active" } : member));
  const remove = (id: string) => setMembers((current) => current.filter((member) => member.id !== id));
  const selected = members.find(member => member.id === detailsFor) ?? null;
  const addMember = (event: FormEvent) => { event.preventDefault(); const name = form.name.trim(); if (!name) return; setMembers(current => [...current, { id: `member-${Date.now()}`, initials: name.split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase(), name, trade: form.trade, email: form.email, phone: form.phone, joined: `Joined ${new Date().toLocaleDateString("en-GB", { month: "short", year: "numeric" })}`, status: "Active", jobs: 0 }]); setForm({ name: "", trade: "Plumbing", email: "", phone: "" }); setAddOpen(false); };

  return <section className="mx-auto max-w-7xl">
    <div className="flex flex-wrap items-start justify-between gap-3"><div><h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#102724]">My Team</h1><p className="mt-1 text-sm text-[#78908d]">Manage your technicians and job assignments.</p></div><button onClick={() => setAddOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white"><Plus size={17}/>Add team member</button></div>
    <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => <article key={metric.label} className="rounded-xl border border-[#e4e9e8] bg-white px-5 py-4 shadow-sm"><p className="text-sm text-[#78908d]">{metric.label}</p><p className="mt-2 text-3xl font-bold text-[#102724]">{metric.value}</p><p className={`mt-1 text-xs font-semibold ${metric.captionClassName}`}>{metric.caption}</p></article>)}
    </div>
    <div className="mt-6 flex flex-col gap-3 rounded-xl border border-[#f2d989] bg-[#fff3c9] px-5 py-4 text-[#9b5a14] sm:flex-row sm:items-center sm:justify-between">
      <span className="flex items-center gap-2 font-semibold"><Bell size={18} />1 request needs assignment</span>
      <Link href="/dashboard/company/jobs" className="rounded-lg bg-[#ad5b0b] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#8e4a09]">Manage requests</Link>
    </div>
    <h2 className="mt-7 font-heading text-xl font-bold text-[#102724]">Team Members</h2>
    <div className="mt-4 overflow-x-auto rounded-xl border border-[#e4e9e8] bg-white shadow-sm"><table className="min-w-[1040px] w-full text-left text-sm"><thead className="border-b border-[#e8eeee] bg-[#fbfcfc] text-[11px] font-bold uppercase tracking-wider text-[#78908d]"><tr><th className="px-5 py-4">Technician</th><th className="px-5 py-4">Trade</th><th className="px-5 py-4">Contact</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Jobs</th><th className="px-5 py-4">Actions</th></tr></thead><tbody>{members.map((member) => <tr key={member.id} className="border-b border-[#edf1f0] last:border-0"><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#fff0eb] text-xs font-bold text-[#ff5a1f]">{member.initials}</span><span><strong className="block text-[#1d2e2b]">{member.name}</strong><small className="mt-0.5 block text-xs text-[#8a9a98]">{member.joined}</small></span></div></td><td className="px-5 py-4 text-[#526865]">{member.trade}</td><td className="px-5 py-4"><span className="block font-medium text-[#314744]">{member.email}</span><small className="text-xs text-[#8a9a98]">{member.phone}</small></td><td className="px-5 py-4"><span className="inline-flex items-center gap-2 font-medium text-[#526865]"><i className={`h-2 w-2 rounded-full ${statusStyle[member.status]}`} />{member.status}</span></td><td className="px-5 py-4 text-[#526865]">{member.jobs} jobs</td><td className="px-5 py-4"><div className="flex items-center gap-2"><button onClick={() => setDetailsFor(member.id)} className="inline-flex items-center gap-1 rounded-md bg-[#f0f5ff] px-3 py-2 text-xs font-semibold text-[#315cec]"><Eye size={14} />Details</button><button onClick={() => modify(member.id)} className="inline-flex items-center gap-1 rounded-md bg-[#fff4ee] px-3 py-2 text-xs font-semibold text-[#ff5a1f]"><Pencil size={13} />Modify</button><button onClick={() => remove(member.id)} aria-label={`Remove ${member.name}`} className="rounded-md border border-[#e5e9e8] p-2 text-[#de4a43] hover:bg-red-50"><X size={15} /></button></div></td></tr>)}</tbody></table>{members.length === 0 && <p className="p-8 text-center text-sm text-[#78908d]">No team members remain.</p>}</div>
    {addOpen && <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/60 p-4"><form onSubmit={addMember} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"><div className="flex justify-between"><h2 className="text-xl font-bold text-slate-900">Add team member</h2><button type="button" onClick={() => setAddOpen(false)} className="text-slate-500">Close</button></div><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium">Full name<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-lg border p-2.5"/></label><label className="text-sm font-medium">Trade<select value={form.trade} onChange={e => setForm({ ...form, trade: e.target.value })} className="mt-1 w-full rounded-lg border p-2.5"><option>Plumbing</option><option>Electrical</option><option>Carpentry</option><option>Painting</option><option>Mechanical</option></select></label><label className="text-sm font-medium">Email<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-1 w-full rounded-lg border p-2.5"/></label><label className="text-sm font-medium">Phone<input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="mt-1 w-full rounded-lg border p-2.5"/></label></div><button className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white">Add member</button></form></div>}
    {selected && <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/60 p-4" role="dialog" aria-modal="true"><section className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"><div className="flex justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-primary">Team member profile</p><h2 className="mt-1 text-xl font-bold">{selected.name}</h2></div><button onClick={() => setDetailsFor(null)} className="text-slate-500">Close</button></div><dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2"><div><dt className="text-slate-500">Trade</dt><dd className="mt-1 font-semibold">{selected.trade}</dd></div><div><dt className="text-slate-500">Status</dt><dd className="mt-1 font-semibold">{selected.status}</dd></div><div><dt className="text-slate-500">Email</dt><dd className="mt-1 break-all font-semibold">{selected.email}</dd></div><div><dt className="text-slate-500">Phone</dt><dd className="mt-1 font-semibold">{selected.phone}</dd></div><div><dt className="text-slate-500">Joined</dt><dd className="mt-1 font-semibold">{selected.joined}</dd></div><div><dt className="text-slate-500">Completed/assigned jobs</dt><dd className="mt-1 font-semibold">{selected.jobs}</dd></div></dl></section></div>}
  </section>;
}
