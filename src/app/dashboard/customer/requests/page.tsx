"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "All" | "Pending" | "In Progress" | "Completed" | "Cancelled";

const STATUS_STYLES: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-600",
};

const REQUESTS = [
  { id: "1", title: "Leaking faucet", category: "Plumbing", description: "Kitchen faucet drips constantly.", status: "In Progress", date: "Jul 24, 2026", technician: "Alice Johnson" },
  { id: "2", title: "Broken light switch", category: "Electrical", description: "Living room switch sparks when toggled.", status: "Pending", date: "Jul 22, 2026", technician: "Unassigned" },
  { id: "3", title: "Door hinge repair", category: "Carpentry", description: "Front door hinge is loose.", status: "Completed", date: "Jul 18, 2026", technician: "David Brown" },
  { id: "4", title: "Ceiling fan installation", category: "Electrical", description: "Install a new ceiling fan in bedroom.", status: "Pending", date: "Jul 15, 2026", technician: "Unassigned" },
  { id: "5", title: "Wall crack patching", category: "Painting", description: "Hairline cracks on the living room wall.", status: "Cancelled", date: "Jul 10, 2026", technician: "Eve Davis" },
];

export default function CustomerRequestsPage() {
  const [filter, setFilter] = useState<Status>("All");
  const [showForm, setShowForm] = useState(false);

  const filtered = filter === "All" ? REQUESTS : REQUESTS.filter((r) => r.status === filter);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">My Requests</h1>
          <p className="text-sm text-muted mt-1">Track and manage all your maintenance requests.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 transition"
        >
          + New Request
        </button>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["All", "Pending", "In Progress", "Completed", "Cancelled"] as Status[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition border ${
              filter === s
                ? "bg-primary text-white border-primary"
                : "bg-white text-muted border-gray-300 hover:border-primary hover:text-primary"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Request cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-20 text-center">
          <svg className="h-12 w-12 text-gray-300 mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="font-medium text-muted">No requests found</p>
          <p className="text-sm text-gray-400 mt-1">Create a new request to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => (
            <div key={req.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-text">{req.title}</p>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[req.status]}`}>
                    {req.status}
                  </span>
                </div>
                <p className="text-sm text-muted">{req.description}</p>
                <div className="flex flex-wrap gap-3 text-xs text-muted pt-1">
                  <span className="flex items-center gap-1">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" /></svg>
                    {req.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {req.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    {req.technician}
                  </span>
                </div>
              </div>
              {req.status === "Completed" && (
                <button className="shrink-0 rounded-lg border border-primary px-3 py-1.5 text-xs font-medium text-primary hover:bg-orange-50 transition">
                  Leave Review
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* New request modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h2 className="text-base font-semibold text-text">New Maintenance Request</h2>
              <button onClick={() => setShowForm(false)} className="text-muted hover:text-text transition">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setShowForm(false); }}>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Title</label>
                <input className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Leaking faucet" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Category</label>
                <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                  {["Plumbing", "Electrical", "Carpentry", "Painting", "HVAC"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Description</label>
                <textarea rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="Describe the issue..." required />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-muted hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button type="submit" className="flex-1 rounded-lg bg-primary py-2 text-sm font-semibold text-white hover:bg-orange-700 transition">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
