import Link from "next/link";

const stats = [
  {
    label: "Active Requests",
    value: 2,
    sub: "In progress or pending",
    color: "text-primary",
    bg: "bg-orange-50",
    icon: (
      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    label: "Completed Jobs",
    value: 5,
    sub: "All time",
    color: "text-secondary",
    bg: "bg-green-50",
    icon: (
      <svg className="h-6 w-6 text-secondary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Technicians Hired",
    value: 3,
    sub: "Unique technicians",
    color: "text-blue-600",
    bg: "bg-blue-50",
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Pending Reviews",
    value: 1,
    sub: "Awaiting your feedback",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    icon: (
      <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

const recentRequests = [
  { id: "1", title: "Leaking faucet", category: "Plumbing", status: "In Progress", date: "Jul 24, 2026", technician: "Alice Johnson" },
  { id: "2", title: "Broken light switch", category: "Electrical", status: "Pending", date: "Jul 22, 2026", technician: "Unassigned" },
  { id: "3", title: "Door hinge repair", category: "Carpentry", status: "Completed", date: "Jul 18, 2026", technician: "David Brown" },
];

const STATUS_STYLES: Record<string, string> = {
  "In Progress": "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
};

export default function CustomerDashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Welcome back, Delice &#128075;</h1>
          <p className="text-sm text-muted mt-1">Here&apos;s an overview of your maintenance activity.</p>
        </div>
        <Link
          href="/dashboard/customer/requests"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 transition"
        >
          + New Request
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted">{s.label}</span>
              <div className={`rounded-lg p-2 ${s.bg}`}>{s.icon}</div>
            </div>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent requests */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-semibold text-text">Recent Requests</h2>
          <Link href="/dashboard/customer/requests" className="text-sm text-primary font-medium hover:underline">
            View all
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recentRequests.map((req) => (
            <div key={req.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="text-sm font-medium text-text">{req.title}</p>
                <p className="text-xs text-muted mt-0.5">{req.category} · {req.date} · {req.technician}</p>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[req.status]}`}>
                {req.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/dashboard/customer/technicians" className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-primary transition">
          <div className="rounded-lg bg-orange-50 p-3">
            <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-text">Find Technicians</p>
            <p className="text-xs text-muted">Browse verified professionals</p>
          </div>
        </Link>

        <Link href="/dashboard/customer/history" className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-primary transition">
          <div className="rounded-lg bg-green-50 p-3">
            <svg className="h-6 w-6 text-secondary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-text">Service History</p>
            <p className="text-xs text-muted">View past jobs & reviews</p>
          </div>
        </Link>

        <Link href="/dashboard/customer/settings" className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-primary transition">
          <div className="rounded-lg bg-gray-100 p-3">
            <svg className="h-6 w-6 text-muted" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-text">Settings</p>
            <p className="text-xs text-muted">Manage your account</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
