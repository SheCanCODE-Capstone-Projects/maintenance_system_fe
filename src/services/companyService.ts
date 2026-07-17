import axiosClient from "@/lib/axiosClient";
import type { Company } from "@/types/company";
export const companyService = { list: () => axiosClient.get<Company[]>("/companies"), get: (id: string) => axiosClient.get<Company>(`/companies/${id}`) };
