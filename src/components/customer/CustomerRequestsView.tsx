"use client";

import { useEffect, useState } from "react";
import CustomerRequestModal from "./CustomerRequestModal";

type Job = {
  id: string;
  place: string;
  tag: string;
  date: string;
  detail: string;
  urgency: string;
  status: "New" | "Accepted" | "In progress" | "Awaiting review";
};

const jobs: Job[] = [
  { id: "REQ-2025-016", place: "Gasabo, Kimihurura", tag: "Plumbing", date: "Jul 16, 2025", detail: "Kitchen sink leaking under the pipes. Water pooling under the cabinet for 3 days.", urgency: "URGENT", status: "In progress" },
  { id: "REQ-2025-014", place: "Gasabo, Remera", tag: "Electrical", date: "Jul 14, 2025", detail: "Power outlet in living room is completely dead. Three sockets affected.", urgency: "Today", status: "Awaiting review" },
  { id: "REQ-2025-011", place: "Gasabo, Kacyiru", tag: "Painting", date: "Jul 11, 2025", detail: "Bedroom wall needs repainting after water damage has been repaired.", urgency: "Can wait", status: "Accepted" },
  { id: "REQ-2025-008", place: "Kicukiro, Gikondo", tag: "Carpentry", date: "Jul 08, 2025", detail: "Wardrobe door hinge has come loose and needs replacement.", urgency: "Can wait", status: "New" },
  { id: "REQ-2025-005", place: "Gasabo, Nyarutarama", tag: "Mechanical", date: "Jul 05, 2025", detail: "Water heater makes a loud noise and is no longer heating consistently.", urgency: "Today", status: "In progress" },
  { id: "REQ-2025-002", place: "Nyarugenge, Nyamirambo", tag: "Other", date: "Jul 02, 2025", detail: "Gate intercom does not ring inside the house when visitors arrive.", urgency: "Can wait", status: "Accepted" },
];

const perPage = 3;

function statusClass(status: Job["status"]) {
  if (status === "Awaiting review") return "bg-[#f0eaff] text-[#7b43e7]";
  if (status === "In progress") return "bg-[#edf3ff] text-[#3670df]";
  if (status === "Accepted") return "bg-[#e6f7ed] text-[#238156]";
  return "bg-[#fff5df] text-[#af7200]";
}

function RequestDetailsModal({ job, onClose }: { job: Job | null; onClose: () => void }) {
  if (!job) return null;
  return <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/55 p-4" role="dialog" aria-modal="true" aria-label="Request details">
    <section className="w-full max-w-[600px] rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
      <div className="flex items-start justify-between border-b border-slate-200 pb-4"><div><p className="text-[12px] font-semibold text-[#ff5b2b]">{job.id}</p><h2 className="mt-1 text-[22px] font-bold text-slate-900">Request details</h2></div><button onClick={onClose} aria-label="Close details" className="text-2xl leading-none text-[#74908e]">x</button></div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2"><div><p className="text-[11px] font-bold tracking-wider text-[#789190]">STATUS</p><span className={`mt-2 inline-block rounded-full px-3 py-1.5 text-[12px] font-semibold ${statusClass(job.status)}`}>{job.status}</span></div><div><p className="text-[11px] font-bold tracking-wider text-[#789190]">REQUESTED</p><p className="mt-2 text-[15px] text-slate-700">{job.date}</p></div><div><p className="text-[11px] font-bold tracking-wider text-[#789190]">SERVICE CATEGORY</p><p className="mt-2 text-[15px] font-semibold text-slate-700">{job.tag}</p></div><div><p className="text-[11px] font-bold tracking-wider text-[#789190]">LOCATION</p><p className="mt-2 text-[15px] text-slate-700">{job.place}</p></div></div>
      <div className="mt-6 rounded-xl bg-[#f5f8f8] p-4"><p className="text-[11px] font-bold tracking-wider text-[#789190]">PROBLEM DESCRIPTION</p><p className="mt-2 text-[15px] leading-6 text-slate-700">{job.detail}</p></div>
      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button onClick={onClose} className="rounded-lg border border-slate-200 px-5 py-3 text-[14px] font-semibold text-slate-600">Close</button><button className="rounded-lg bg-[#ff5b2b] px-5 py-3 text-[14px] font-semibold text-white">Contact support</button></div>
    </section>
  </div>;
}

export default function CustomerRequestsView() {
  const [newRequestOpen, setNewRequestOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const filters = ["All", "New", "Accepted", "In progress", "Awaiting review"] as const;
  const filteredJobs = filter === "All" ? jobs : jobs.filter((job) => job.status === filter);
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / perPage));
  const displayedJobs = filteredJobs.slice((page - 1) * perPage, page * perPage);

  useEffect(() => setPage(1), [filter]);

  return <>
    <section className="w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><h1 className="text-[26px] font-bold tracking-tight text-slate-900 sm:text-[30px]">My Requests</h1><p className="mt-1 text-[14px] text-[#789190]">Active and in-progress maintenance jobs</p></div><button onClick={() => setNewRequestOpen(true)} className="w-full rounded-md bg-[#ff5b2b] px-7 py-3.5 text-[14px] font-semibold text-white shadow-md sm:w-auto">+ New Request</button></div>
      <div className="mt-7 flex flex-col items-start gap-3 rounded-xl border border-[#e1d7ff] bg-[#f8f5ff] px-5 py-4 text-[14px] text-[#7337e8] sm:h-[74px] sm:flex-row sm:items-center sm:justify-between sm:px-6"><span>* <b className="ml-2">1 job awaiting your review</b></span><button className="w-full rounded-md bg-[#7435e8] px-5 py-2.5 text-[13px] font-semibold text-white sm:w-auto">Review now</button></div>
      <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">{filters.map((item) => { const count = item === "All" ? jobs.length : jobs.filter((job) => job.status === item).length; return <button key={item} onClick={() => setFilter(item)} className={`rounded-full border px-4 py-2 text-[13px] sm:px-5 sm:py-2.5 sm:text-[14px] ${filter === item ? "border-[#ff5b2b] bg-[#fff7f3] font-semibold text-[#ff5b2b]" : "border-[#e4ebea] bg-white text-[#77908e]"}`}>{item} <span className="ml-1 rounded-full bg-slate-100 px-1.5 py-0.5 text-[11px]">{count}</span></button>; })}</div>
      <div className="mt-6 space-y-4">{displayedJobs.map((job) => <article key={job.id} className="rounded-xl border border-[#f3dfd9] border-t-[3px] border-t-[#ff5b2b] bg-white px-4 py-5 shadow-[0_5px_12px_rgba(30,50,48,.06)] sm:min-h-[234px] sm:px-7"><div className="flex flex-col gap-3 sm:flex-row sm:justify-between"><div className="flex gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#ffe9e3] text-[11px] font-bold text-[#ff5b2b]">DU</span><div><h2 className="text-[16px] font-bold text-slate-800">Delice Uwase</h2><p className="mt-1 text-[13px] text-[#75908d]">Location: {job.place}</p></div></div><div className="flex h-fit flex-wrap gap-2"><span className="rounded-full bg-[#fff0ee] px-3 py-1.5 text-[12px] font-bold text-[#ff5b2b]">{job.urgency}</span><span className={`rounded-full px-3 py-1.5 text-[12px] font-semibold ${statusClass(job.status)}`}>{job.status}</span></div></div><div className="mt-4 text-[13px] text-[#55706d]"><span className="rounded bg-[#eff4f3] px-2 py-1.5 font-semibold">{job.tag}</span><span className="ml-3">{job.date}</span></div><p className="mt-3 text-[15px] leading-6 text-[#415c59] sm:text-[16px]">{job.detail}</p><div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between"><span className="text-[13px] text-[#54706d]">Phone: +250 788 000 001</span><button onClick={() => setSelectedJob(job)} className="rounded-lg border border-[#ff5b2b] px-4 py-2 text-[13px] font-semibold text-[#ff5b2b] transition hover:bg-[#fff4ef]">View details</button></div>{job.status === "Awaiting review" && <div className="mt-3 flex flex-col gap-2 rounded border border-[#e4d9ff] bg-[#f9f6ff] px-3 py-2 text-[12px] text-[#7038e1] sm:flex-row sm:items-center">* <span className="mr-auto ml-1 font-medium">Customer review required to complete this job</span><button className="rounded bg-[#7435e8] px-3 py-1.5 text-[11px] font-semibold text-white">Leave review</button></div>}</article>)}</div>
      {filteredJobs.length === 0 && <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white py-14 text-center text-slate-500">There are no requests in this category.</div>}
      {filteredJobs.length > 0 && <nav className="mt-7 flex flex-wrap items-center justify-between gap-3" aria-label="Requests pagination"><p className="text-[13px] text-[#789190]">Showing {(page - 1) * perPage + 1}-{Math.min(page * perPage, filteredJobs.length)} of {filteredJobs.length} requests</p><div className="flex items-center gap-2"><button onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} className="rounded-lg border border-slate-200 px-3 py-2 text-[13px] font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => <button key={number} onClick={() => setPage(number)} aria-current={page === number ? "page" : undefined} className={`h-9 w-9 rounded-lg text-[13px] font-semibold ${page === number ? "bg-[#ff5b2b] text-white" : "border border-slate-200 text-slate-600"}`}>{number}</button>)}<button onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages} className="rounded-lg border border-slate-200 px-3 py-2 text-[13px] font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40">Next</button></div></nav>}
    </section>
    <CustomerRequestModal open={newRequestOpen} onClose={() => setNewRequestOpen(false)} />
    <RequestDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} />
  </>;
}
