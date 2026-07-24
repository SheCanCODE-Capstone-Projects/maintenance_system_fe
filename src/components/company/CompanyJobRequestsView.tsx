"use client";

import { CheckCircle2, CircleUserRound, Flame, MapPin, Phone, UserRound } from "lucide-react";
import { useMemo, useState } from "react";

type Status = "New" | "Accepted" | "In progress" | "Awaiting review" | "Completed";
type Urgency = "Emergency" | "Today" | "Can wait";
type Request = {
  id: string;
  customer: string;
  initials: string;
  location: string;
  category: string;
  date: string;
  technician?: string;
  description: string;
  phone: string;
  urgency: Urgency;
  status: Status;
};

const initialRequests: Request[] = [
  { id: "JR-016", customer: "Delice Uwase", initials: "DU", location: "Gasabo, Kimihurura", category: "Plumbing", date: "Jul 16, 2025", technician: "Eric Nshimiyimana", description: "Kitchen sink leaking under the pipes. Water pooling under the cabinet for 3 days.", phone: "+250 788 000 001", urgency: "Emergency", status: "In progress" },
  { id: "JR-014", customer: "Delice Uwase", initials: "DU", location: "Gasabo, Remera", category: "Electrical", date: "Jul 14, 2025", technician: "Patrick Habimana", description: "Power outlet in the living room is completely dead. Three sockets affected.", phone: "+250 788 000 001", urgency: "Today", status: "Awaiting review" },
  { id: "JR-011", customer: "Aline Uwimana", initials: "AU", location: "Gasabo, Kacyiru", category: "Painting", date: "Jul 11, 2025", description: "Water stains need treatment and repainting on the bedroom wall.", phone: "+250 788 000 009", urgency: "Can wait", status: "New" },
  { id: "JR-009", customer: "Jean Paul", initials: "JP", location: "Kicukiro, Gikondo", category: "Carpentry", date: "Jul 09, 2025", technician: "Patrick Habimana", description: "Wardrobe door hinge is loose and the door does not close correctly.", phone: "+250 788 000 024", urgency: "Can wait", status: "Accepted" },
  { id: "JR-006", customer: "Olive Mukamana", initials: "OM", location: "Gasabo, Nyarutarama", category: "Mechanical", date: "Jul 06, 2025", technician: "Eric Nshimiyimana", description: "Water heater service completed successfully.", phone: "+250 788 000 031", urgency: "Today", status: "Completed" },
  { id: "JR-003", customer: "Kevin Niyonzima", initials: "KN", location: "Nyarugenge, Nyamirambo", category: "Other", date: "Jul 03, 2025", technician: "Claudine Mukamana", description: "Intercom system inspection and repair completed.", phone: "+250 788 000 042", urgency: "Can wait", status: "Completed" },
];

const statusFilters = ["All", "New", "Accepted", "Active", "Done"] as const;
const urgencyFilters = ["Any urgency", "Emergency", "Today", "Can wait"] as const;

function matchesStatus(request: Request, filter: (typeof statusFilters)[number]) {
  if (filter === "All") return true;
  if (filter === "Active") return request.status === "In progress" || request.status === "Awaiting review";
  if (filter === "Done") return request.status === "Completed";
  return request.status === filter;
}

function statusStyle(status: Status) {
  if (status === "In progress") return "bg-[#edf3ff] text-[#2464d7]";
  if (status === "Awaiting review") return "bg-[#f0eaff] text-[#7440d6]";
  if (status === "Completed") return "bg-[#e5f7ed] text-[#18794e]";
  if (status === "New") return "bg-[#fff5df] text-[#ad6a00]";
  return "bg-[#e8f7f0] text-[#17784f]";
}

export default function CompanyJobRequestsView() {
  const [requests, setRequests] = useState(initialRequests);
  const [statusFilter, setStatusFilter] = useState<(typeof statusFilters)[number]>("All");
  const [urgencyFilter, setUrgencyFilter] = useState<(typeof urgencyFilters)[number]>("Any urgency");

  const visibleRequests = useMemo(() => requests.filter((request) => matchesStatus(request, statusFilter) && (urgencyFilter === "Any urgency" || request.urgency === urgencyFilter)), [requests, statusFilter, urgencyFilter]);
  const countFor = (filter: (typeof statusFilters)[number]) => requests.filter((request) => matchesStatus(request, filter)).length;
  const markComplete = (id: string) => setRequests((current) => current.map((request) => request.id === id ? { ...request, status: "Completed" } : request));

  return <section className="w-full">
    <div><h1 className="text-[26px] font-bold tracking-tight text-slate-900 sm:text-[30px]">Job Requests</h1><p className="mt-1 text-[14px] text-[#789190]">All incoming requests for BuildFix Ltd</p></div>
    <div className="mt-7 flex flex-wrap gap-2.5">{statusFilters.map((filter) => <button key={filter} onClick={() => setStatusFilter(filter)} className={`rounded-full border px-4 py-2.5 text-[14px] transition sm:px-5 ${statusFilter === filter ? "border-[#ff5b2b] bg-[#fff7f3] font-semibold text-[#ff5b2b]" : "border-[#e4ebea] bg-white text-[#77908e]"}`}>{filter} <span className="ml-1.5 rounded-full bg-slate-200 px-1.5 py-0.5 text-[11px] text-slate-600">{countFor(filter)}</span></button>)}</div>
    <div className="mt-4 flex flex-wrap gap-2.5">{urgencyFilters.map((filter) => <button key={filter} onClick={() => setUrgencyFilter(filter)} className={`rounded-full border px-4 py-2.5 text-[14px] transition sm:px-5 ${urgencyFilter === filter ? "border-[#ff5b2b] bg-[#fff7f3] font-semibold text-[#ff5b2b]" : "border-[#e4ebea] bg-white text-[#77908e]"}`}>{filter}</button>)}</div>
    <div className="mt-6 space-y-4">{visibleRequests.map((request) => <article key={request.id} className="rounded-xl border border-[#f2d8d1] border-t-[3px] border-t-[#ff5b2b] bg-white px-4 py-5 shadow-[0_5px_12px_rgba(30,50,48,.06)] sm:min-h-[244px] sm:px-7"><div className="flex flex-col gap-3 sm:flex-row sm:justify-between"><div className="flex gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#ffe9e3] text-[12px] font-bold text-[#ff5b2b]">{request.initials}</span><div><h2 className="text-[16px] font-bold text-slate-800">{request.customer}</h2><p className="mt-1 flex items-center gap-1 text-[13px] text-[#75908d]"><MapPin size={13} />{request.location}</p></div></div><div className="flex h-fit flex-wrap gap-2"><span className="flex items-center gap-1 rounded-full bg-[#fff0ee] px-3 py-1.5 text-[12px] font-bold text-[#ff5b2b]"><Flame size={12} />{request.urgency === "Emergency" ? "URGENT" : request.urgency}</span><span className={`rounded-full px-3 py-1.5 text-[12px] font-semibold ${statusStyle(request.status)}`}>{request.status}</span></div></div><div className="mt-4 flex flex-wrap items-center gap-2 text-[13px] text-[#55706d]"><span className="rounded bg-[#eff4f3] px-2 py-1.5 font-semibold">{request.category}</span><span>{request.date}</span>{request.technician && <span className="flex items-center gap-1"><UserRound size={13} />{request.technician}</span>}</div><p className="mt-3 text-[15px] leading-6 text-[#415c59] sm:text-[16px]">{request.description}</p><div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between"><span className="flex items-center gap-2 rounded-lg bg-[#f2f5f4] px-4 py-3 text-[13px] text-[#54706d] sm:min-w-[300px]"><Phone size={14} />{request.phone}</span>{request.status === "In progress" && <button onClick={() => markComplete(request.id)} className="flex items-center justify-center gap-2 rounded-xl bg-[#ff5b2b] px-5 py-3 text-[14px] font-semibold text-white shadow-md transition hover:bg-[#e95020]"><CheckCircle2 size={17} />Mark complete</button>}{request.status === "New" && <button className="flex items-center justify-center gap-2 rounded-xl bg-[#ff5b2b] px-5 py-3 text-[14px] font-semibold text-white shadow-md"><CircleUserRound size={17} />Assign technician</button>}</div></article>)}</div>
    {visibleRequests.length === 0 && <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-500">No job requests match these filters.</div>}
  </section>;
}
