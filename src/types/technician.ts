import type { User } from "./user";
export interface Technician extends User { specialties: string[]; available: boolean; }
