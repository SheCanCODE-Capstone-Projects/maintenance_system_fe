"use client";

import { useMemo } from "react";
import type { JobStatus } from "@/types/technicianJob";

interface JobFilterTabsProps {
  jobs: { status: JobStatus }[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { label: "All Jobs", value: "all" },
  { label: "Assigned / Pending", value: "Pending" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
];

export default function JobFilterTabs({
  jobs,
  activeFilter,
  onFilterChange,
}: JobFilterTabsProps) {
const counts = useMemo(() => {
    const allCount = jobs.length;
    const pendingCount = jobs.filter((j) => j.status === "Pending").length;
    const inProgressCount = jobs.filter((j) => j.status === "In Progress").length;
    const completedCount = jobs.filter((j) => j.status === "Completed").length;

    return {
      all: allCount,
      Pending: pendingCount,
      "In Progress": inProgressCount,
      Completed: completedCount,
    };
  }, [jobs]);

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const count = counts[filter.value as keyof typeof counts];
        const isActive = activeFilter === filter.value;

        return (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "border-primary bg-orange-50 text-primary"
                : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            }`}
          >
            {filter.label}
            {count > 0 && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                  isActive ? "bg-primary text-white" : "bg-slate-100"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}