import axiosClient from "@/lib/axiosClient";
import type { MaintenanceRequest } from "@/types/request";
export const requestService = { list: () => axiosClient.get<MaintenanceRequest[]>("/requests"), create: (payload: Pick<MaintenanceRequest, "title" | "description">) => axiosClient.post<MaintenanceRequest>("/requests", payload), get: (id: string) => axiosClient.get<MaintenanceRequest>(`/requests/${id}`) };
