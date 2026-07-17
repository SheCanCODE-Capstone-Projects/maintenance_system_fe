import axiosClient from "@/lib/axiosClient";
import type { User } from "@/types/user";
export const authService = { login: (email: string, password: string) => axiosClient.post<User>("/auth/login", { email, password }), register: (payload: Partial<User> & { password: string }) => axiosClient.post<User>("/auth/register", payload), logout: () => axiosClient.post("/auth/logout") };
