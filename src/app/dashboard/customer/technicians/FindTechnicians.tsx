"use client";

import { useState } from "react";
import type { Technician, TechnicianStatus } from "@/types/technician";

const mockTechnicians: Technician[] = [
  { id: "1", name: "Alice Johnson", email: "alice@mail.com", role: "technician", specialties: ["Plumbing"], available: true, category: "Plumbing", district: "Gasabo", sector: "Kacyiru", status: "Active" },
  { id: "2", name: "Bob Smith", email: "bob@mail.com", role: "technician", specialties: ["Electrical"], available: false, category: "Electrical", district: "Kicukiro", sector: "Kagarama", status: "Offline" },
  { id: "3", name: "Carol White", email: "carol@mail.com", role: "technician", specialties: ["Carpentry", "Painting"], available: true, category: "Carpentry", district: "Nyarugenge", sector: "Gitega", status: "Busy" },
  { id: "4", name: "David Brown", email: "david@mail.com", role: "technician", specialties: ["Plumbing", "Electrical"], available: true, category: "Plumbing", district: "Gasabo", sector: "Remera", status: "Active" },
  { id: "5", name: "Eve Davis", email: "eve@mail.com", role: "technician", specialties: ["Painting"], available: true, category: "Painting", district: "Kicukiro", sector: "Niboye", status: "Completed" },
  { id: "6", name: "Frank Miller", email: "frank@mail.com", role: "technician", specialties: ["Electrical"], available: true, category: "Electrical", district: "Nyarugenge", sector: "Kimisagara", status: "Active", companyId: "comp1" },
  { id: "7", name: "Grace Wilson", email: "grace@mail.com", role: "technician", specialties: ["Plumbing"], available: false, category: "Plumbing", district: "Gasabo", sector: "Kacyiru", status: "Offline" },
  { id: "8", name: "Henry Taylor", email: "henry@mail.com", role: "technician", specialties: ["Carpentry"], available: true, category: "Carpentry", district: "Kicukiro", sector: "Kagarama", status: "Busy", companyId: "comp2" },
  { id: "9", name: "Ivy Anderson", email: "ivy@mail.com", role: "technician", specialties: ["Electrical", "Plumbing"], available: true, category: "Electrical", district: "Nyarugenge", sector: "Gitega", status: "Active" },
];

const categories = ["all", "Plumbing", "Electrical", "Carpentry", "Painting"];
const districts = ["all", "Gasabo", "Kicukiro", "Nyarugenge"];
const sectors = ["all", "Kacyiru", "Remera", "Kagarama", "Niboye", "Kimisagara", "Gitega"];

const statusConfig: Record<TechnicianStatus, { label: string; className: string }> = {
  Active: { label: "Active", className: "bg-green-100 text-green-700" },
  Busy: { label: "Busy", className: "bg-orange-100 text-orange-700" },
  Offline: { label: "Offline", className: "bg-gray-100 text-gray-700" },
  Completed: { label: "Completed", className: "bg-mint text-green-800" },
};

type FilterType = "all" | "independent" | "company";

function StatusBadge({ status }: { status: TechnicianStatus }) {
  const config = statusConfig[status] || statusConfig.Active;
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (p: number) => void }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded border border-gray-300 px-3 py-1.5 text-sm disabled:opacity-40 hover:bg-gray-50"
      >
        Prev
      </button>
      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`rounded px-3 py-1.5 text-sm ${p === currentPage ? "bg-bright-orange text-white" : "border border-gray-300 hover:bg-gray-50"}`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded border border-gray-300 px-3 py-1.5 text-sm disabled:opacity-40 hover:bg-gray-50"
      >
        Next
      </button>
    </div>
  );
}

export default function FindTechnicians() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [district, setDistrict] = useState("all");
  const [sector, setSector] = useState("all");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filtered = mockTechnicians.filter(t => {
    const matchesSearch = !search || t.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || t.category === category;
    const matchesDistrict = district === "all" || t.district === district;
    const matchesSector = sector === "all" || t.sector === sector;
    const matchesType = filterType === "all" || (filterType === "independent" ? !t.companyId : !!t.companyId);
    return matchesSearch && matchesCategory && matchesDistrict && matchesSector && matchesType;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const pageItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section className="mx-auto max-w-6xl p-8">
      <h1 className="mb-6 text-2xl font-bold">Find technicians</h1>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end">
        <input
          type="text"
          placeholder="Search technicians..."
          value={search}
          onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
          className="w-full rounded border border-gray-300 px-3 py-2 lg:w-64 focus:border-bright-orange focus:outline-none"
        />
        <select value={category} onChange={e => { setCategory(e.target.value); setCurrentPage(1); }} className="rounded border border-gray-300 px-3 py-2 focus:border-bright-orange focus:outline-none">
          {categories.map(c => <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>)}
        </select>
        <select value={district} onChange={e => { setDistrict(e.target.value); setCurrentPage(1); }} className="rounded border border-gray-300 px-3 py-2 focus:border-bright-orange focus:outline-none">
          {districts.map(d => <option key={d} value={d}>{d === "all" ? "All Districts" : d}</option>)}
        </select>
        <select value={sector} onChange={e => { setSector(e.target.value); setCurrentPage(1); }} className="rounded border border-gray-300 px-3 py-2 focus:border-bright-orange focus:outline-none">
          {sectors.map(s => <option key={s} value={s}>{s === "all" ? "All Sectors" : s}</option>)}
        </select>
        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
          {(["all", "independent", "company"] as FilterType[]).map(opt => (
            <button
              key={opt}
              onClick={() => { setFilterType(opt); setCurrentPage(1); }}
              className={`px-4 py-2 text-sm font-medium ${filterType === opt ? "bg-bright-orange text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
            >
              {opt === "all" ? "All" : opt === "independent" ? "Indep." : "Company"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageItems.map(tech => (
          <div key={tech.id} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-text">{tech.name}</h3>
                <p className="text-sm text-muted">{tech.email}</p>
              </div>
              <StatusBadge status={tech.status || "Active"} />
            </div>
            <div className="mb-2 text-sm text-muted">
              <span className="font-medium text-text">Category:</span> {tech.category || "General"}
            </div>
            <div className="mb-3 text-sm text-muted">
              <span className="font-medium text-text">Location:</span> {tech.district}, {tech.sector}
            </div>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {tech.specialties.map(s => (
                <span key={s} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">{s}</span>
              ))}
            </div>
            <button
              disabled={tech.status === "Offline"}
              className="w-full rounded bg-bright-orange px-4 py-2 text-sm font-medium text-white hover:bg-bright-orange/90 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            >
              Request this technician
            </button>
          </div>
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </section>
  );
}
