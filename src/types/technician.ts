import type { User } from "./user";

export type TechnicianStatus = "Active" | "Busy" | "Offline" | "Completed";

export interface Technician extends User {
  specialties: string[];
  available: boolean;
  category?: string;
  district?: string;
  sector?: string;
  status?: TechnicianStatus;
  companyId?: string;
}
