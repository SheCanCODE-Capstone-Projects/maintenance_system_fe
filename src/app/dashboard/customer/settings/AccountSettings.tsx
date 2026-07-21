"use client";

import { useState, type FormEvent } from "react";

const initialForm = { name: "Jane Doe", email: "jane@example.com", phone: "788123456", district: "Gasabo", sector: "Kacyiru" };

export default function AccountSettings() {
  const [form, setForm] = useState(initialForm);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-2xl font-bold">Account settings</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-text">Name</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </span>
            <input type="text" value={form.name} onChange={handleChange("name")} className="w-full rounded border border-gray-300 pl-10 pr-3 py-2 focus:border-bright-orange focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text">Email</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 7L2 7"/></svg>
            </span>
            <input type="email" value={form.email} onChange={handleChange("email")} className="w-full rounded border border-gray-300 pl-10 pr-3 py-2 focus:border-bright-orange focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text">Phone</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">+250</span>
            <input type="tel" value={form.phone} onChange={handleChange("phone")} className="w-full rounded border border-gray-300 pl-14 pr-3 py-2 focus:border-bright-orange focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text">District</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            <input type="text" value={form.district} onChange={handleChange("district")} className="w-full rounded border border-gray-300 pl-10 pr-3 py-2 focus:border-bright-orange focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text">Sector</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            <input type="text" value={form.sector} onChange={handleChange("sector")} className="w-full rounded border border-gray-300 pl-10 pr-3 py-2 focus:border-bright-orange focus:outline-none" />
          </div>
        </div>

        <button type="submit" className="self-start rounded bg-bright-orange px-6 py-2.5 font-medium text-white hover:bg-bright-orange/90">
          {saved ? "Saved!" : "Save profile"}
        </button>
      </form>
    </section>
  );
}
