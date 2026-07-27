import Link from "next/link";

const roles = [
  {
    key: "customer",
    label: "Customer",
    description: "Request maintenance services from verified technicians.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "hover:border-blue-400",
  },
  {
    key: "technician",
    label: "Technician",
    description: "Offer your skills and grow your maintenance career.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    color: "text-primary",
    bg: "bg-orange-50",
    border: "hover:border-primary",
  },
  {
    key: "company",
    label: "Company",
    description: "Register your maintenance company and manage a team.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: "text-secondary",
    bg: "bg-green-50",
    border: "hover:border-secondary",
  },
  {
    key: "admin",
    label: "Admin",
    description: "Manage users, verifications, and platform settings.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "hover:border-purple-400",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6">
      {/* Brand */}
      <div className="flex flex-col items-center mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-lg font-bold text-text leading-none">Maintenance Hub</p>
            <p className="text-xs text-muted uppercase tracking-widest">Platform</p>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-text text-center">Welcome! Choose your role</h1>
        <p className="text-muted mt-2 text-center max-w-md">
          Select how you want to use the platform to get started with your account.
        </p>
      </div>

      {/* Role cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-4xl">
        {roles.map((role) => (
          <Link
            key={role.key}
            href={`/register/${role.key}`}
            className={`flex flex-col items-center rounded-2xl border-2 border-gray-200 bg-white p-6 text-center shadow-sm transition hover:shadow-md ${role.border}`}
          >
            <div className={`rounded-2xl p-4 mb-4 ${role.bg} ${role.color}`}>
              {role.icon}
            </div>
            <p className="font-semibold text-text text-base mb-1">{role.label}</p>
            <p className="text-xs text-muted leading-relaxed">{role.description}</p>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
