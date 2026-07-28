export type JobStatus = "Pending" | "In Progress" | "Completed";
export type Priority = "Low" | "Medium" | "High" | "Urgent";

export interface TechnicianJob {
  id: string;
  title: string;
  customerName: string;
  category: string;
  dateTime: string;
  location: string;
  priority: Priority;
  status: JobStatus;
  description?: string;
  phone?: string;
  photoName?: string;
  photoDataUrl?: string;
}
