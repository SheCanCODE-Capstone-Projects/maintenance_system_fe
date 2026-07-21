"use client";

import { Save } from "lucide-react";
import { FormEvent, useState } from "react";

const statuses = ["Active", "Busy", "Offline"] as const;
type Status = typeof statuses[number];

export default function TechnicianSettings() {
  const [status, setStatus] = useState<Status>("Active");
  const [saved, setSaved] = useState(false);
  function save(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSaved(true); }
  return <section className="mx-auto max-w-3xl"><h1 className="font-heading text-3xl font-bold text-slate-950">Account Settings</h1><p className="mt-1 text-slate-500">Manage your profile, trade and availability.</p>
    <form onSubmit={save} className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9"><div className="flex items-center gap-4 border-b border-slate-200 pb-6"><span className="grid h-14 w-14 place-items-center rounded-full bg-bright-orange text-lg font-bold text-white">EN</span><div><h2 className="text-xl font-bold text-slate-900">Eric Nshimiyimana</h2><p className="text-sm text-slate-500">Technician account</p></div></div>
      <div className="mt-7"><h3 className="font-bold text-slate-900">Profile information</h3><div className="mt-5 grid gap-5 sm:grid-cols-2"><Field label="Full name" value="Eric Nshimiyimana" /><Field label="Email address" value="eric.n@buildfix.rw" type="email" /><Field label="Phone number" value="+250 788 111 001" /><Field label="Primary trade" value="Plumbing" /><Field label="District" value="Gasabo" /><Field label="Sector" value="Kimironko" /></div></div>
      <div className="mt-8 border-t border-slate-200 pt-6"><h3 className="font-bold text-slate-900">Availability</h3><p className="mt-1 text-sm text-slate-500">Let customers know when you can take on new work.</p><div className="mt-4 flex flex-wrap gap-3">{statuses.map((item) => <button key={item} type="button" onClick={() => setStatus(item)} className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${status === item ? "border-bright-orange bg-orange-50 text-bright-orange" : "border-slate-200 text-slate-600 hover:border-orange-200"}`}>{item}</button>)}</div></div>
      <div className="mt-8 flex items-center gap-4"><button className="inline-flex items-center gap-2 rounded-lg bg-bright-orange px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-600"><Save size={17} />Save changes</button>{saved && <span className="text-sm font-medium text-emerald-700">Changes saved</span>}</div>
    </form>
  </section>;
}

function Field({ label, value, type = "text" }: { label: string; value: string; type?: string }) { return <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">{label}<input type={type} defaultValue={value} className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-base font-normal normal-case tracking-normal text-slate-800 outline-none focus:border-bright-orange focus:ring-2 focus:ring-orange-100" /></label>; }
