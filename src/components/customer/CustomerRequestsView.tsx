"use client";

import { useState } from "react";
import CustomerRequestModal from "./CustomerRequestModal";

const jobs = [
  { place: "Kimiruhura", tag: "Plumbing", date: "Jul 16, 2025", detail: "Kitchen sink leaking under the pipes. Water pooling under the cabinet for 3 days.", urgency: "URGENT", status: "In progress" },
  { place: "Gasabo, Remera", tag: "Electrical", date: "Jul 14, 2025", detail: "Power outlet in living room is completely dead. Three sockets affected.", urgency: "Today", status: "Awaiting review" },
];

export default function CustomerRequestsView() {
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState("All 2");
  return <>
    <section className="w-full">
      <div className="flex items-start justify-between"><div><h1 className="text-[30px] font-bold tracking-tight text-slate-900">My Requests</h1><p className="mt-1 text-[14px] text-[#789190]">Active and in-progress maintenance jobs</p></div><button onClick={() => setModal(true)} className="rounded-md bg-[#ff5b2b] px-7 py-3.5 text-[14px] font-semibold text-white shadow-md">＋&nbsp; New Request</button></div>
      <div className="mt-7 flex h-[74px] items-center justify-between rounded-xl border border-[#e1d7ff] bg-[#f8f5ff] px-6 text-[14px] text-[#7337e8]"><span>☆ <b className="ml-2">1 job awaiting your review</b></span><button className="rounded-md bg-[#7435e8] px-5 py-2.5 text-[13px] font-semibold text-white">Review now</button></div>
      <div className="mt-5 flex gap-3">{["All 2", "New", "Accepted", "In Progress 1", "Awaiting Review 1"].map(item => <button key={item} onClick={() => setFilter(item)} className={`rounded-full border px-5 py-2.5 text-[14px] ${filter === item ? "border-[#ff5b2b] bg-[#fff7f3] font-semibold text-[#ff5b2b]" : "border-[#e4ebea] bg-white text-[#77908e]"}`}>{item}</button>)}</div>
      <div className="mt-6 space-y-4">{jobs.map((job, i) => <article key={job.place} className="min-h-[234px] rounded-xl border border-[#f3dfd9] border-t-[3px] border-t-[#ff5b2b] bg-white px-7 py-5 shadow-[0_5px_12px_rgba(30,50,48,.06)]"><div className="flex justify-between"><div className="flex gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#ffe9e3] text-[11px] font-bold text-[#ff5b2b]">DU</span><div><h2 className="text-[16px] font-bold text-slate-800">Delice Uwase</h2><p className="mt-1 text-[13px] text-[#75908d]">⌾ {job.place}</p></div></div><div className="flex h-fit gap-2"><span className="rounded-full bg-[#fff0ee] px-3 py-1.5 text-[12px] font-bold text-[#ff5b2b]">♨ {job.urgency}</span><span className={`rounded-full px-3 py-1.5 text-[12px] font-semibold ${i ? "bg-[#f0eaff] text-[#7b43e7]" : "bg-[#edf3ff] text-[#3670df]"}`}>{job.status}</span></div></div><div className="mt-4 text-[13px] text-[#55706d]"><span className="rounded bg-[#eff4f3] px-2 py-1.5 font-semibold">♧ {job.tag}</span><span className="ml-3">{job.date}</span></div><p className="mt-3 text-[16px] text-[#415c59]">{job.detail}</p><div className="mt-4 rounded-lg bg-[#f2f5f4] px-4 py-3 text-[13px] text-[#54706d]">⌕ &nbsp; +250 788 000 001</div>{i === 1 && <div className="mt-3 flex items-center justify-between rounded border border-[#e4d9ff] bg-[#f9f6ff] px-3 py-2 text-[12px] text-[#7038e1]">☆ <span className="mr-auto ml-1 font-medium">Customer review required to complete this job</span><button className="rounded bg-[#7435e8] px-3 py-1.5 text-[11px] font-semibold text-white">Leave review</button></div>}</article>)}</div>
    </section><CustomerRequestModal open={modal} onClose={() => setModal(false)} />
  </>;
}
