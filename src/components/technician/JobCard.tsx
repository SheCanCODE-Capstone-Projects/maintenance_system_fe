"use client";

import { Wrench, Clock, MapPin, CheckCircle, AlertCircle, Phone } from "lucide-react";
import type { TechnicianJob, JobStatus, Priority } from "@/types/technicianJob";

interface JobCardProps {
  job: TechnicianJob;
  onStartJob: (id: string) => void;
  onComplete: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  Low: { label: "Low", className: "bg-slate-100 text-slate-600" },
  Medium: { label: "Medium", className: "bg-blue-100 text-blue-700" },
  High: { label: "High", className: "bg-orange-100 text-orange-700" },
  Urgent: { label: "Urgent", className: "bg-red-100 text-red-700" },
};

const statusConfig: Record<JobStatus, { label: string; className: string }> = {
  Pending: { label: "Pending", className: "bg-amber-100 text-amber-700" },
  "In Progress": { label: "In Progress", className: "bg-blue-100 text-blue-700" },
  Completed: { label: "Completed", className: "bg-emerald-100 text-emerald-700" },
};

export default function JobCard({ job, onStartJob, onComplete, onViewDetails }: JobCardProps) {
  const priorityStyle = priorityConfig[job.priority];
  const statusStyle = statusConfig[job.status];

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4">
        {/* Header: Title and Badges */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-slate-950">{job.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{job.customerName}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${priorityStyle.className}`}
            >
              <AlertCircle size={12} />
              {priorityStyle.label}
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${statusStyle.className}`}
            >
              <Clock size={12} />
              {statusStyle.label}
            </span>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Wrench size={14} className="shrink-0" />
            <span>{job.category}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Clock size={14} className="shrink-0" />
            <span>{job.dateTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <MapPin size={14} className="shrink-0" />
            <span>{job.location}</span>
          </div>
        </div>

        {/* Description */}
        {job.description && (
          <p className="text-sm text-slate-700">{job.description}</p>
        )}

        {/* Phone */}
        {job.phone && (
          <a
            href={`tel:${job.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-sm text-slate-500 hover:underline"
          >
            <Phone size={14} className="shrink-0" />
            {job.phone}
          </a>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-end gap-2 pt-2">
          <button
            onClick={() => onViewDetails(job.id)}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            View Details
          </button>
          {job.status === "Pending" && (
            <button
              onClick={() => onStartJob(job.id)}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
            >
              <Wrench size={16} />
              Start Job
            </button>
          )}
          {job.status === "In Progress" && (
            <button
              onClick={() => onComplete(job.id)}
              className="flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              <CheckCircle size={16} />
              Mark as Complete
            </button>
          )}
          {job.status === "Completed" && (
            <span className="text-sm font-medium text-slate-500">Completed</span>
          )}
        </div>
      </div>
    </article>
  );
}