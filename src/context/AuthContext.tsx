"use client";
import { createContext, useState, type ReactNode } from "react";
import type { User } from "@/types/user";

export const AuthContext = createContext<{ user: User | null; setUser: (user: User | null) => void }>({ user: null, setUser: () => undefined });
export function AuthProvider({ children }: { children: ReactNode }) { const [user, setUser] = useState<User | null>(null); return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>; }
