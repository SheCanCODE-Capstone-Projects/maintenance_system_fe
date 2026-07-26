export type RequestPriority = "Normal" | "Emergency";
export type RequestStatus = "Pending" | "Accepted" | "In Progress" | "Completed";

export type CustomerRequest = {
  id: string;
  category: string;
  description: string;
  location: string;
  priority: RequestPriority;
  photoName?: string;
  technicianName: string;
  technicianArea: string;
  status: RequestStatus;
  createdAt: string;
};

const storageKey = "maintenance-hub-customer-requests";

export function getCustomerRequests(): CustomerRequest[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) as CustomerRequest[] : [];
  } catch {
    return [];
  }
}

export function saveCustomerRequest(request: CustomerRequest) {
  const requests = [request, ...getCustomerRequests()];
  window.localStorage.setItem(storageKey, JSON.stringify(requests));
  return request;
}
