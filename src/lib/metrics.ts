export type MetricCard = {
  label: string;
  value: string;
  hint: string;
  color: string;
};

export type CompanyDashboardMetrics = {
  stats: MetricCard[];
  recentJobs: Array<{
    id: string;
    client: string;
    category: string;
    tech: string;
    status: string;
    statusColor: string;
  }>;
};

export type PublicStats = Array<{
  value: string;
  label: string;
}>;

const defaultCompanyMetrics: CompanyDashboardMetrics = {
  stats: [
    { label: "Active Jobs", value: "12", hint: "In progress", color: "#FF6224" },
    { label: "Team Members", value: "8", hint: "2 on leave", color: "#1D4ED8" },
    { label: "This Month Revenue", value: "RWF 890K", hint: "+18% vs last month", color: "#1B7A52" },
    { label: "Avg Rating", value: "4.8", hint: "From 142 reviews", color: "#B45309" },
  ],
  recentJobs: [
    { id: "JR-0041", client: "Amina Uwase", category: "Electrical", tech: "Jean Paul M.", status: "In Progress", statusColor: "#1D4ED8" },
    { id: "JR-0040", client: "Eric Nshimiyimana", category: "Plumbing", tech: "Alice K.", status: "Completed", statusColor: "#1B7A52" },
    { id: "JR-0039", client: "Claire Mukamana", category: "Carpentry", tech: "David N.", status: "Pending", statusColor: "#B45309" },
  ],
};

const defaultPublicStats: PublicStats = [
  { value: "2400+", label: "Clients" },
  { value: "890+", label: "Technicians" },
  { value: "98%", label: "Resolved Jobs" },
];

async function fetchJson<T>(path: string, fallback: T): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return fallback;

  try {
    const response = await fetch(`${baseUrl}${path}`, { cache: "no-store" });
    if (!response.ok) return fallback;
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export function getDefaultCompanyMetrics() {
  return defaultCompanyMetrics;
}

export function getDefaultPublicStats() {
  return defaultPublicStats;
}

export async function getCompanyDashboardMetrics(): Promise<CompanyDashboardMetrics> {
  return fetchJson<CompanyDashboardMetrics>("/api/company/dashboard/summary", defaultCompanyMetrics);
}

export async function getPublicLandingStats(): Promise<PublicStats> {
  return fetchJson<PublicStats>("/api/public/metrics", defaultPublicStats);
}
