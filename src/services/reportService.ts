import axiosClient from "@/lib/axiosClient";
import type { Report } from "@/types/report";
export const reportService = { list: () => axiosClient.get<Report[]>("/reports"), get: (id: string) => axiosClient.get<Report>(`/reports/${id}`) };
