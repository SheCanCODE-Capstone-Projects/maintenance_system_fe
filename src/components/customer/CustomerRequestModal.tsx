"use client";

import { FormEvent, useState } from "react";
import { saveCustomerRequest, type CustomerRequest, type RequestPriority } from "@/lib/customerRequestStore";
import { getCategories } from "@/lib/categoryStore";

type Props = { open: boolean; onClose: () => void; onSubmitted?: (request: CustomerRequest) => void };

const technicians = [
  { id: "alice", name: "Alice Johnson", category: "Plumbing", area: "Gasabo, Kacyiru", rating: "4.9" },
  { id: "david", name: "David Brown", category: "Electrical", area: "Gasabo, Remera", rating: "4.8" },
  { id: "frank", name: "Frank Miller", category: "Electrical", area: "Nyarugenge, Kimisagara", rating: "4.8" },
  { id: "carol", name: "Carol White", category: "Carpentry & Painting", area: "Nyarugenge, Gitega", rating: "4.7" },
  { id: "eve", name: "Eve Davis", category: "Painting & Cleaning", area: "Kicukiro, Niboye", rating: "4.8" },
];

export default function CustomerRequestModal({ open, onClose, onSubmitted }: Props) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("Plumbing");
  const [priority, setPriority] = useState<RequestPriority>("Normal");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [photoDataUrl, setPhotoDataUrl] = useState("");
  const [categories] = useState<string[]>(() => getCategories().filter((item) => item !== "Other").concat("Other"));
  const [technicianId, setTechnicianId] = useState("");
  const [submitted, setSubmitted] = useState<CustomerRequest | null>(null);

  if (!open) return null;
  const chosenTechnician = technicians.find((technician) => technician.id === technicianId);
  const matchingTechnicians = technicians.filter((technician) => category === "Other" || technician.category.includes(category));

  const close = () => {
    setStep(1); setSubmitted(null); setTechnicianId(""); onClose();
  };
  const selectPhoto = (file?: File) => {
    if (!file) { setPhotoName(""); setPhotoDataUrl(""); return; }
    setPhotoName(file.name);
    const reader = new FileReader();
    reader.onload = () => setPhotoDataUrl(String(reader.result));
    reader.readAsDataURL(file);
  };
  const nextFromDetails = (event: FormEvent) => {
    event.preventDefault();
    setStep(2);
  };
  const submit = () => {
    if (!chosenTechnician) return;
    const request: CustomerRequest = {
      id: `REQ-${Date.now().toString().slice(-6)}`,
      category, description, location, priority, photoName, photoDataUrl,
      technicianName: chosenTechnician.name, technicianArea: chosenTechnician.area,
      status: "Pending", createdAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    };
    saveCustomerRequest(request);
    setSubmitted(request);
    onSubmitted?.(request);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 sm:p-5" role="dialog" aria-modal="true" aria-label="New maintenance request">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <header className="flex items-start justify-between border-b border-slate-200 px-5 py-5 sm:px-8 sm:py-6">
          <div><p className="text-xs font-bold uppercase tracking-[.16em] text-primary">Request service</p><h2 className="mt-1 text-2xl font-bold text-slate-900">{submitted ? "Request submitted" : step === 1 ? "Tell us what you need" : step === 2 ? "Choose a verified technician" : "Review your request"}</h2></div>
          <button type="button" onClick={close} className="rounded-md px-2 text-2xl text-slate-500 hover:bg-slate-100" aria-label="Close">×</button>
        </header>
        {!submitted && <div className="flex gap-2 px-5 pt-5 sm:px-8">{["Request details", "Technician", "Confirm"].map((label, index) => <div key={label} className="flex flex-1 items-center gap-2 text-xs font-semibold"><span className={`grid h-6 w-6 place-items-center rounded-full ${step >= index + 1 ? "bg-primary text-white" : "bg-slate-100 text-slate-400"}`}>{index + 1}</span><span className="hidden sm:inline">{label}</span></div>)}</div>}
        <div className="p-5 sm:p-8">
          {submitted ? <div className="py-8 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-2xl text-emerald-700">✓</span><h3 className="mt-5 text-xl font-bold text-slate-900">Your request is pending</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">{submitted.technicianName} has received your {submitted.priority.toLowerCase()} {submitted.category.toLowerCase()} request. You can track its status from My Requests.</p><button onClick={close} className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white">View my requests</button></div> : step === 1 ? <form onSubmit={nextFromDetails} className="space-y-5">
            <fieldset><legend className="mb-3 text-xs font-bold tracking-[.12em] text-slate-600">SERVICE CATEGORY</legend><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-xl border px-3 py-3 text-sm font-medium ${category === item ? "border-primary bg-orange-50 text-primary" : "border-slate-200 text-slate-600 hover:border-orange-200"}`}>{item}</button>)}</div></fieldset>
            <fieldset><legend className="mb-3 text-xs font-bold tracking-[.12em] text-slate-600">PRIORITY</legend><div className="grid grid-cols-2 gap-3"><button type="button" onClick={() => setPriority("Normal")} className={`rounded-xl border p-4 text-left ${priority === "Normal" ? "border-primary bg-orange-50" : "border-slate-200"}`}><b className="block text-sm">Normal</b><span className="mt-1 block text-xs text-slate-500">Schedule a standard visit</span></button><button type="button" onClick={() => setPriority("Emergency")} className={`rounded-xl border p-4 text-left ${priority === "Emergency" ? "border-rose-500 bg-rose-50" : "border-slate-200"}`}><b className="block text-sm text-rose-700">Emergency</b><span className="mt-1 block text-xs text-slate-500">Shown first to available technicians</span></button></div></fieldset>
            <label className="block text-sm font-semibold text-slate-700">Problem description<textarea required value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Describe the problem and when it started…" className="mt-2 h-28 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-orange-100" /></label>
            <label className="block text-sm font-semibold text-slate-700">Service location<input required value={location} onChange={(event) => setLocation(event.target.value)} placeholder="District, sector, neighbourhood or address" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-orange-100" /></label>
            <label className="block text-sm font-semibold text-slate-700">Photo (optional)<input type="file" accept="image/*" onChange={(event) => selectPhoto(event.target.files?.[0])} className="mt-2 block w-full text-sm font-normal text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-orange-50 file:px-3 file:py-2 file:font-semibold file:text-primary" />{photoName && <span className="mt-2 block text-xs font-normal text-emerald-700">Attached: {photoName}</span>}</label>
            <div className="flex justify-end"><button className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white">Choose technician →</button></div>
          </form> : step === 2 ? <div><p className="mb-4 text-sm text-slate-600">Only verified technicians matching your service are shown. Select the professional you prefer.</p><div className="space-y-3">{matchingTechnicians.map((technician) => <button type="button" key={technician.id} onClick={() => setTechnicianId(technician.id)} className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${technicianId === technician.id ? "border-primary bg-orange-50 ring-2 ring-orange-100" : "border-slate-200 hover:border-orange-200"}`}><span className="grid h-11 w-11 place-items-center rounded-full bg-[#0d3330] text-sm font-bold text-white">{technician.name.split(" ").map((word) => word[0]).join("")}</span><span className="flex-1"><b className="block text-sm text-slate-800">{technician.name} <span className="ml-2 text-xs font-semibold text-emerald-700">✓ Verified</span></b><span className="mt-1 block text-xs text-slate-500">{technician.category} · {technician.area}</span></span><span className="text-sm font-bold text-amber-600">★ {technician.rating}</span></button>)}</div><div className="mt-6 flex justify-between"><button onClick={() => setStep(1)} className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600">Back</button><button disabled={!technicianId} onClick={() => setStep(3)} className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">Review request →</button></div></div> : <div className="space-y-4"><p className="text-sm text-slate-600">Check the details below before sending this request.</p><dl className="divide-y rounded-xl border border-slate-200 text-sm"><div className="flex justify-between gap-4 p-4"><dt className="text-slate-500">Service</dt><dd className="font-semibold">{category} · {priority}</dd></div><div className="flex justify-between gap-4 p-4"><dt className="text-slate-500">Location</dt><dd className="text-right font-semibold">{location}</dd></div><div className="flex justify-between gap-4 p-4"><dt className="text-slate-500">Technician</dt><dd className="font-semibold">{chosenTechnician?.name} · Verified</dd></div><div className="p-4"><dt className="text-slate-500">Problem</dt><dd className="mt-1 leading-6">{description}</dd></div></dl><div className="flex justify-between"><button onClick={() => setStep(2)} className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600">Back</button><button onClick={submit} className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white">Submit request</button></div></div>}
        </div>
      </div>
    </div>
  );
}
