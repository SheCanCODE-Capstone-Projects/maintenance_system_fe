export type RequestStatus = "Open" | "Assigned" | "In Progress" | "Completed" | "Cancelled";
export interface MaintenanceRequest { id: string; title: string; description: string; status: RequestStatus; createdAt: string; technicianId?: string; }
