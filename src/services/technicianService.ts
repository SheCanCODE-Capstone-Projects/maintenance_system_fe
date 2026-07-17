import axiosClient from "@/lib/axiosClient";
import type { Technician } from "@/types/technician";
export const technicianService = { list: () => axiosClient.get<Technician[]>("/technicians"), get: (id: string) => axiosClient.get<Technician>(`/technicians/${id}`) };
