"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function useSignOut() {
  const router = useRouter();
  const { setUser } = useAuth();
  return () => {
    setUser(null);
    window.sessionStorage.removeItem("maintenance-hub-current-user");
    router.replace("/login");
  };
}
