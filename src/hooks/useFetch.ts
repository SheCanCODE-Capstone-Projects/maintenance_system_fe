"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";

export function useFetch<T>(url?: string) {
  const [data, setData] = useState<T>(); const [error, setError] = useState<Error>(); const [loading, setLoading] = useState(Boolean(url));
  useEffect(() => { if (!url) return; axiosClient.get<T>(url).then((response) => setData(response.data)).catch(setError).finally(() => setLoading(false)); }, [url]);
  return { data, error, loading };
}
