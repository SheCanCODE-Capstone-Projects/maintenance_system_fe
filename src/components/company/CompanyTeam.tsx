"use client";

import Link from "next/link";
import { Bell, Eye, Pencil, X } from "lucide-react";
import { useState } from "react";

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
  const modify = (id: string) => setMembers((current) => current.map((member) => member.id === id ? { ...member, status: member.status === "Active" ? "Busy" : "Active" } : member));
  const remove = (id: string) => setMembers((current) => current.filter((member) => member.id !== id));

  return <section className="mx-auto max-w-7xl">
    <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#102724]">My Team</h1>
    <p className="mt-1 text-sm text-[#78908d]">Manage your technicians and job assignments.</p>
    <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => <article key={metric.label} className="rounded-xl border border-[#e4e9e8] bg-white px-5 py-4 shadow-sm"><p className="text-sm text-[#78908d]">{metric.label}</p><p className="mt-2 text-3xl font-bold text-[#102724]">{metric.value}</p><p className={`mt-1 text-xs font-semibold ${metric.captionClassName}`}>{metric.caption}</p></article>)}
    </div>
    <div className="mt-6 flex flex-col gap-3 rounded-xl border border-[#f2d989] bg-[#fff3c9] px-5 py-4 text-[#9b5a14] sm:flex-row sm:items-center sm:justify-between">
      <span className="flex items-center gap-2 font-semibold"><Bell size={18} />1 request needs assignment</span>
      <Link href="/dashboard/company/jobs" className="rounded-lg bg-[#ad5b0b] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#8e4a09]">Manage requests</Link>
    </div>
    <h2 className="mt-7 font-heading text-xl font-bold text-[#102724]">Team Members</h2>
    <div className="mt-4 overflow-x-auto rounded-xl border border-[#e4e9e8] bg-white shadow-sm"><table className="min-w-[1040px] w-full text-left text-sm"><thead className="border-b border-[#e8eeee] bg-[#fbfcfc] text-[11px] font-bold uppercase tracking-wider text-[#78908d]"><tr><th className="px-5 py-4">Technician</th><th className="px-5 py-4">Trade</th><th className="px-5 py-4">Contact</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Jobs</th><th className="px-5 py-4">Actions</th></tr></thead><tbody>{members.map((member) => <tr key={member.id} className="border-b border-[#edf1f0] last:border-0"><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#fff0eb] text-xs font-bold text-[#ff5a1f]">{member.initials}</span><span><strong className="block text-[#1d2e2b]">{member.name}</strong><small className="mt-0.5 block text-xs text-[#8a9a98]">{member.joined}</small></span></div></td><td className="px-5 py-4 text-[#526865]">{member.trade}</td><td className="px-5 py-4"><span className="block font-medium text-[#314744]">{member.email}</span><small className="text-xs text-[#8a9a98]">{member.phone}</small></td><td className="px-5 py-4"><span className="inline-flex items-center gap-2 font-medium text-[#526865]"><i className={`h-2 w-2 rounded-full ${statusStyle[member.status]}`} />{member.status}</span></td><td className="px-5 py-4 text-[#526865]">{member.jobs} jobs</td><td className="px-5 py-4"><div className="flex items-center gap-2"><button onClick={() => setDetailsFor(detailsFor === member.id ? null : member.id)} className="inline-flex items-center gap-1 rounded-md bg-[#f0f5ff] px-3 py-2 text-xs font-semibold text-[#315cec]"><Eye size={14} />Details</button><button onClick={() => modify(member.id)} className="inline-flex items-center gap-1 rounded-md bg-[#fff4ee] px-3 py-2 text-xs font-semibold text-[#ff5a1f]"><Pencil size={13} />Modify</button><button onClick={() => remove(member.id)} aria-label={`Remove ${member.name}`} className="rounded-md border border-[#e5e9e8] p-2 text-[#de4a43] hover:bg-red-50"><X size={15} /></button></div>{detailsFor === member.id && <p className="mt-2 text-xs text-[#78908d]">Available for {member.trade.toLowerCase()} assignments.</p>}</td></tr>)}</tbody></table>{members.length === 0 && <p className="p-8 text-center text-sm text-[#78908d]">No team members remain.</p>}</div>
  </section>;
}
