export type UserRole = "customer" | "technician" | "company" | "admin";
export interface User { id: string; name: string; email: string; role: UserRole; }
