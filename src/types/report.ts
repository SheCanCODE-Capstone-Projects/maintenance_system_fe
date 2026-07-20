export interface Report { id: string; title: string; createdAt: string; data: Record<string, unknown>; }
export interface Review { id: string; author: string; rating: number; comment: string; }

export type JobStatus = "Active" | "Busy" | "Offline" | "Completed";
export interface JobHistoryItem { id: string; description: string; status: JobStatus; createdAt: string; technicianName?: string; }
