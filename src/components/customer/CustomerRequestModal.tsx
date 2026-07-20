"use client";

import { FormEvent, useState } from "react";

type Props = { open: boolean; onClose: () => void };

const categories = [
  ["♨", "Plumbing"], ["ϟ", "Electrical"], ["⚒", "Carpentry"],
  ["✥", "Painting"], ["⚙", "Mechanical"], ["◇", "Other"],
];

export default function CustomerRequestModal({ open, onClose }: Props) {
  const [category, setCategory] = useState("Plumbing");
  const [urgent, setUrgent] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-3 sm:p-5" role="dialog" aria-modal="true" aria-label="New maintenance request">
      <form onSubmit={submit} className="max-h-[91vh] w-full max-w-[725px] overflow-y-auto rounded-[18px] bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-5 py-5 sm:px-8 sm:py-7">
          <div><h2 className="text-[22px] font-bold text-slate-900">New maintenance request</h2><p className="mt-1 text-[14px] text-slate-400">Step 1 of 3</p></div>
          <button type="button" onClick={onClose} className="mt-1 text-xl leading-none text-[#74908e]" aria-label="Close">×</button>
        </div>
        <div className="space-y-5 px-5 py-5 sm:px-8 sm:py-7">
          <button type="button" className="flex w-full items-center gap-3 rounded-lg border border-slate-200 px-4 py-4 text-left shadow-sm">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#f0f5f4] text-sm text-[#88a09e]">♨</span>
            <span className="flex-1"><span className="block text-[12px] font-semibold text-slate-800">Mark as Emergency / Urgent</span><span className="block pt-0.5 text-[10px] text-[#789190]">Urgent requests are shown first to available technicians</span></span>
            <span className="h-4 w-4 rounded-full border-2 border-[#829b99]" />
          </button>

          <fieldset><legend className="mb-3 text-[12px] font-bold tracking-[.12em] text-[#708887]">SERVICE CATEGORY</legend><div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {categories.map(([icon, name]) => <button key={name} type="button" onClick={() => setCategory(name)} className={`h-[83px] rounded-xl border text-center ${category === name ? "border-[#ff5b2b] bg-[#fff6f2] text-[#ff5b2b]" : "border-[#dfe8e7] bg-[#f5f8f8] text-[#718987]"}`}><span className="block text-[20px] leading-7">{icon}</span><span className="block text-[12px] font-medium">{name}</span></button>)}
          </div></fieldset>

          <label className="block"><span className="text-[12px] font-bold tracking-[.12em] text-[#708887]">DESCRIBE THE PROBLEM *</span><textarea required placeholder="e.g. Kitchen sink leaking under the pipes..." className="mt-3 h-[113px] w-full resize-none rounded-xl border border-[#dfe8e7] bg-[#f7f9f9] px-4 py-3 text-[16px] text-slate-700 outline-none placeholder:text-[#8ba09f] focus:border-[#ff5b2b]" /></label>
          <fieldset><legend className="mb-3 text-[12px] font-bold tracking-[.12em] text-[#708887]">HOW URGENT?</legend><div className="grid grid-cols-2 gap-3"><button type="button" onClick={() => setUrgent(true)} className={`h-[52px] rounded-xl border text-[15px] font-semibold ${urgent ? "border-[#ff5b2b] bg-[#fff8f5] text-[#ff5b2b]" : "border-[#e6ecec] text-[#718987]"}`}>Today, if possible</button><button type="button" onClick={() => setUrgent(false)} className={`h-[52px] rounded-xl border text-[15px] font-medium ${!urgent ? "border-[#ff5b2b] bg-[#fff8f5] text-[#ff5b2b]" : "border-[#e6ecec] text-[#718987]"}`}>Can wait</button></div></fieldset>
          {submitted && <p className="rounded-md bg-emerald-50 p-2 text-xs text-emerald-700">Request saved. Choose a location to continue.</p>}
          <div className="flex justify-end pt-1"><button className="rounded-xl bg-[#ff5b2b] px-8 py-4 text-[16px] font-semibold text-white shadow-md">Choose location →</button></div>
        </div>
      </form>
    </div>
  );
}
