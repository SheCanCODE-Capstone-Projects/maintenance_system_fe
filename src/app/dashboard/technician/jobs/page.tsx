"use client";

import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import JobCard from "@/components/technician/JobCard";
import JobFilterTabs from "@/components/technician/JobFilterTabs";
import type { TechnicianJob, JobStatus, Priority } from "@/types/technicianJob";

// Mock data for immediate rendering
const mockJobs: TechnicianJob[] = [
  {
    id: "job-1",
    title: "Repair kitchen faucet",
    customerName: "Delice Uwase",
    category: "Plumbing",
    dateTime: "Jul 16, 2025 - 10:00 AM",
    location: "Gasabo, Kimihurura",
    priority: "Urgent",
    status: "Pending",
    description: "Customer has reported a leaking faucet that needs immediate attention.",
    phone: "+250 788 000 001",
  },
  {
    id: "job-2",
    title: "Fix bathroom toilet",
    customerName: "Emmanuel Habimana",
    category: "Plumbing",
    dateTime: "Jul 16, 2025 - 2:30 PM",
    location: "Kicukiro, Niboye",
    priority: "High",
    status: "In Progress",
    description: "Toilet constantly running and overflowing. Need to replace flapper valve.",
    phone: "+250 788 000 002",
  },
  {
    id: "job-3",
    title: "Replace shower mixer",
    customerName: "Aline Mukamana",
    category: "Plumbing",
    dateTime: "Jul 14, 2025 - 9:00 AM",
    location: "Gasabo, Remera",
    priority: "Medium",
    status: "Pending",
    description: "Replace a faulty shower mixer and inspect low water pressure.",
    phone: "+250 788 000 003",
  },
  {
    id: "job-4",
    title: "Water heater repair",
    customerName: "Jean Mugabo",
    category: "Electrical",
    dateTime: "Jul 10, 2025 - 11:00 AM",
    location: "Nyarugenge, Nyamirambo",
    priority: "Low",
    status: "Completed",
    description: "Water heater is not heating consistently. Issue resolved.",
    phone: "+250 788 000 004",
  },
  {
    id: "job-5",
    title: "Fix outdoor tap",
    customerName: "Chantal Mutesi",
    category: "Plumbing",
    dateTime: "Jul 06, 2025 - 3:00 PM",
    location: "Kicukiro, Kagarama",
    priority: "Low",
    status: "Completed",
    description: "Fix a dripping outdoor tap.",
    phone: "+250 788 000 005",
  },
  {
    id: "job-6",
    title: "Kitchen drain inspection",
    customerName: "Patrick Kwizera",
    category: "Plumbing",
    dateTime: "Jul 02, 2025 - 8:00 AM",
    location: "Gasabo, Gisozi",
    priority: "Medium",
    status: "In Progress",
    description: "Inspect and repair a leaking kitchen drain.",
    phone: "+250 788 000 006",
  },
  {
    id: "job-7",
    title: "Electrical outlet installation",
    customerName: "Marie Claire",
    category: "Electrical",
    dateTime: "Jun 28, 2025 - 1:00 PM",
    location: "Gasabo, Kacyiru",
    priority: "High",
    status: "Pending",
    description: "Install new electrical outlet in living room.",
    phone: "+250 788 000 007",
  },
  {
    id: "job-8",
    title: "AC unit servicing",
    customerName: "Eric Nshimiyimana",
    category: "HVAC",
    dateTime: "Jun 25, 2025 - 10:30 AM",
    location: "Kicukiro, Kicukiro",
    priority: "Low",
    status: "Completed",
    description: "Serviced air conditioning unit and cleaned filters.",
    phone: "+250 788 000 008",
  },
];

type SortOption = "newest" | "oldest" | "priority-high" | "priority-low";

export default function TechnicianJobsPage() {
  const [jobs, setJobs] = useState<TechnicianJob[]>(mockJobs);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Filter jobs based on status and search query
  const filteredJobs = useMemo(() => {
    let result = jobs;

    // Status filter
    if (activeFilter !== "all") {
      result = result.filter((job) => job.status === activeFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.customerName.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortOption === "newest") {
        return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
      }
      if (sortOption === "oldest") {
        return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
      }
      if (sortOption === "priority-high") {
        const priorityOrder: Priority[] = ["Urgent", "High", "Medium", "Low"];
        return (
          priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
        );
      }
      if (sortOption === "priority-low") {
        const priorityOrder: Priority[] = ["Low", "Medium", "High", "Urgent"];
        return (
          priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
        );
      }
      return 0;
    });

    return result;
  }, [jobs, activeFilter, searchQuery, sortOption]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / itemsPerPage));
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleStartJob = (id: string) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status: "In Progress" as JobStatus } : job
      )
    );
  };

  const handleComplete = (id: string) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status: "Completed" as JobStatus } : job
      )
    );
  };

  const handleViewDetails = (id: string) => {
    // In a real app, this would navigate to a details page
    console.log("View details for job:", id);
  };

  return (
    <main className="mx-auto max-w-[1600px] p-4 sm:p-6 md:p-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">My Jobs</h1>
        <p className="mt-1 text-sm text-slate-500 sm:text-base">
          Manage your assigned maintenance requests
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-4 overflow-x-auto pb-2">
        <JobFilterTabs
          jobs={jobs}
          activeFilter={activeFilter}
          onFilterChange={(filter) => {
            setActiveFilter(filter);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Search and Sort Bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search by job title, customer, or location..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-500" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="newest">Date: Newest to Oldest</option>
            <option value="oldest">Date: Oldest to Newest</option>
            <option value="priority-high">Priority: High to Low</option>
            <option value="priority-low">Priority: Low to High</option>
          </select>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="space-y-4">
        {paginatedJobs.length > 0 ? (
          paginatedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onStartJob={handleStartJob}
              onComplete={handleComplete}
              onViewDetails={handleViewDetails}
            />
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="text-slate-500">No jobs found for this filter.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredJobs.length > itemsPerPage && (
        <div className="mt-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, filteredJobs.length)} of{" "}
            {filteredJobs.length} jobs
          </span>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="rounded-lg border p-2 disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="rounded-lg border p-2 disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}