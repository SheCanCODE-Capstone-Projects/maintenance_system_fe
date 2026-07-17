import axiosClient from "@/lib/axiosClient";
import type { User } from "@/types/user";
export const userService = { me: () => axiosClient.get<User>("/users/me"), update: (payload: Partial<User>) => axiosClient.patch<User>("/users/me", payload) };
