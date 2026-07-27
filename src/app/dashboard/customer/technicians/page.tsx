"use client";

import { useState } from "react";

const CATEGORIES = ["All Categories", "Plumbing", "Electrical", "Carpentry", "Painting", "HVAC"];
const DISTRICTS = ["All Districts", "Gasabo", "Kicukiro", "Nyarugenge"];
const SECTORS: Record<string, string[]> = {
  "All Districts": ["All Sectors"],
  Gasabo: ["All Sectors", "Kacyiru", "Remera", "Kimironko"],
  Kicukiro: ["All Sectors", "Kagarama", "Niboye", "Gatenga"],
  Nyarugenge: ["All Sectors", "Gitega", "Kimisagara", "Nyamirambo"],
};

type TechnicianType = "All" | "Indep." | "Company";
type StatusType = "Active" | "Offline" | "Busy" | "Completed";

interface Technician {
  id: string;
  name: string;
  email: string;
  status: StatusType;
  category: string;
  district: string;
  sector: string;
  skills: string[];
  type: "Indep." | "Company";
}

const TECHNICIANS: Technician[] = [
  { id: "1", name: "Alice Johnson", email: "alice@mail.com", status: "Active", category: "Plumbing", district: "Gasabo", sector: "Kacyiru", skills: ["Plumbing"], type: "Indep." },
  { id: "2", name: "Bob Smith", email: "bob@mail.com", status: "Offline", category: "Electrical", district: "Kicukiro", sector: "Kagarama", skills: ["Electrical"], type: "Indep." },
  { id: "3", name: "Carol White", email: "carol@mail.com", status: "Busy", category: "Carpentry", district: "Nyarugenge", sector: "Gitega", skills: ["Carpentry", "Painting"], type: "Company" },
  { id: "4", name: "David Brown", email: "david@mail.com", status: "Active", category: "Plumbing", district: "Gasabo", sector: "Remera", skills: ["Plumbing", "Electrical"], type: "Indep." },
  { id: "5", name: "Eve Davis", email: "eve@mail.com", status: "Completed", category: "Painting", district: "Kicukiro", sector: "Niboye", skills: ["Painting"], type: "Indep." },
  { id: "6", name: "Frank Miller", email: "frank@mail.com", status: "Active", category: "Electrical", district: "Nyarugenge", sector: "Kimisagara", skills: ["Electrical"], type: "Company" },
  { id: "7", name: "Grace Lee", email: "grace@mail.com", status: "Active", category: "HVAC", district: "Gasabo", sector: "Kimironko", skills: ["HVAC", "Electrical"], type: "Indep." },
  { id: "8", name: "Henry Clark", email: "henry@mail.com", status: "Offline", category: "Carpentry", district: "Kicukiro", sector: "Gatenga", skills: ["Carpentry"], type: "Company" },
];

const STATUS_STYLES: Record<StatusType, string> = {
  Active: "bg-green-100 text-green-700",
  Offline: "bg-gray-100 text-gray-500",
  Busy: "bg-orange-100 text-orange-600",
  Completed: "bg-blue-100 text-blue-600",
};

export default function TechniciansPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [district, setDistrict] = useState("All Districts");
  const [sector, setSector] = useState("All Sectors");
  const [techType, setTechType] = useState<TechnicianType>("All");

  const filtered = TECHNICIANS.filter((t) => {
    const matchSearch =
      search === "" ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchCategory = category === "All Categories" || t.category === category;
    const matchDistrict = district === "All Districts" || t.district === district;
    const matchSector = sector === "All Sectors" || t.sector === sector;
    const matchType = techType === "All" || t.type === techType;
    return matchSearch && matchCategory && matchDistrict && matchSector && matchType;
  });

  const sectorOptions = SECTORS[district] ?? ["All Sectors"];

  return (
    <div className="p-8">
      {/* Header */}
      <h1 className="text-2xl font-bold text-text mb-6">Find technicians</h1>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search technicians..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-text placeholder-muted shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-text shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>

        {/* District */}
        <select
          value={district}
          onChange={(e) => { setDistrict(e.target.value); setSector("All Sectors"); }}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-text shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
        </select>

        {/* Sector */}
        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-text shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {sectorOptions.map((s) => <option key={s}>{s}</option>)}
        </select>

        {/* Type toggle */}
        <div className="flex rounded-lg border border-gray-300 overflow-hidden text-sm">
          {(["All", "Indep.", "Company"] as TechnicianType[]).map((t) => (
            <button
              key={t}
              onClick={() => setTechType(t)}
              className={`px-4 py-2 font-medium transition ${
                techType === t
                  ? "bg-primary text-white"
                  : "bg-white text-muted hover:bg-gray-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted mb-4">
        {filtered.length} technician{filtered.length !== 1 ? "s" : ""} found
      </p>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-20 text-center">
          <svg className="h-12 w-12 text-gray-300 mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-muted font-medium">No technicians match your filters</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tech) => (
            <TechnicianCard key={tech.id} tech={tech} />
          ))}
        </div>
      )}
    </div>
  );
}

function TechnicianCard({ tech }: { tech: Technician }) {
  const isOffline = tech.status === "Offline";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition flex flex-col gap-3">
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-text">{tech.name}</p>
          <p className="text-xs text-muted">{tech.email}</p>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[tech.status]}`}>
          {tech.status}
        </span>
      </div>

      {/* Details */}
      <div className="text-sm text-text space-y-1">
        <p>
          <span className="font-medium">Category:</span> {tech.category}
        </p>
        <p>
          <span className="font-medium">Location:</span> {tech.district}, {tech.sector}
        </p>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {tech.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs text-muted"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button
        disabled={isOffline}
        className={`mt-1 w-full rounded-lg py-2 text-sm font-semibold transition ${
          isOffline
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-primary text-white hover:bg-orange-700"
        }`}
      >
        Request this technician
      </button>
    </div>
  );
}
