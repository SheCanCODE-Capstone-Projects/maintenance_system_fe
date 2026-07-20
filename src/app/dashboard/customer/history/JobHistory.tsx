"use client";

import { useState } from "react";
import type { JobHistoryItem, JobStatus } from "@/types/report";

const mockJobs: JobHistoryItem[] = [
  { id: "1", description: "Fixed leaking kitchen faucet and replaced washers.", status: "Completed", createdAt: "2026-06-15", technicianName: "Alice Johnson" },
  { id: "2", description: "Installed new electrical outlet in living room.", status: "Completed", createdAt: "2026-05-22", technicianName: "Bob Smith" },
  { id: "3", description: "Replaced damaged wooden door frame and repainted.", status: "Completed", createdAt: "2026-04-10", technicianName: "Carol White" },
  { id: "4", description: "Serviced air conditioning unit and cleaned filters.", status: "Completed", createdAt: "2026-03-05", technicianName: "David Brown" },
  { id: "5", description: "Patched and painted bedroom walls after water damage.", status: "Completed", createdAt: "2026-02-18", technicianName: "Eve Davis" },
  { id: "6", description: "Unclogged main drain pipe and inspected sewer line.", status: "Completed", createdAt: "2026-01-30", technicianName: "Frank Miller" },
];

const statusConfig: Record<JobStatus, { label: string; className: string }> = {
  Active: { label: "Active", className: "bg-green-100 text-green-700" },
  Busy: { label: "Busy", className: "bg-orange-100 text-orange-700" },
  Offline: { label: "Offline", className: "bg-gray-100 text-gray-700" },
  Completed: { label: "Completed", className: "bg-mint text-green-800" },
};

function StatusBadge({ status }: { status: JobStatus }) {
  const config = statusConfig[status] || statusConfig.Completed;
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}

export default function JobHistory() {
  const [jobs] = useState(mockJobs);

  return (
    <section className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-2xl font-bold">Service history</h1>
      <div className="flex flex-col gap-4">
        {jobs.map(job => (
          <div key={job.id} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <StatusBadge status={job.status} />
                  <span className="text-sm text-muted">{new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-text">{job.description}</p>
                {job.technicianName && (
                  <p className="mt-1 text-sm text-muted">Technician: {job.technicianName}</p>
                )}
              </div>
              <div className="flex gap-2 sm:flex-shrink-0">
                <button className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Leave review
                </button>
                <button className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Rebook
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
