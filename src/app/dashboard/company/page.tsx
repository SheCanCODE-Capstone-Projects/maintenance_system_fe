import Link from "next/link";
import { getCompanyDashboardMetrics } from "@/lib/metrics";

const P = {
  orange: "#FF6224", sidebar: "#0D3330", green: "#1B7A52",
  bg: "#F4F6F5", text: "#111918", muted: "#7A8E8C",
  border: "rgba(13,51,48,.11)", red: "#DC2626", blue: "#1D4ED8",
  amber: "#B45309", purple: "#7C3AED",
};

const quickLinks = [
  {
    href: "/dashboard/company/analytics",
    title: "Open Analytics",
    description: "Check revenue, jobs, and technician performance trends.",
    accent: P.orange,
  },
  {
    href: "/dashboard/company/reviews",
    title: "Manage Reviews",
    description: "Read customer feedback and reply to new ratings.",
    accent: P.green,
  },
  {
    href: "/dashboard/company/settings",
    title: "Company Settings",
    description: "Update profile, team rules, and notifications.",
    accent: P.blue,
  },
];

export default async function CompanyDashboard() {
  const { stats, recentJobs } = await getCompanyDashboardMetrics();

  return (
    <section style={{ color: P.text }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", margin: 0 }}>Company Dashboard</h1>
          <p style={{ color: P.muted, fontSize: 14, marginTop: 4 }}>BuildFix Ltd · Gasabo, Kigali</p>
        </div>
        <span style={{ background: P.green + "18", color: P.green, border: `1px solid ${P.green}40`, borderRadius: 20, padding: "5px 14px", fontSize: 13, fontWeight: 700 }}>
          ✓ Accredited Company
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
        {stats.map(({ label, value, hint, color }) => (
          <div key={label} style={{ background: "#fff", borderRadius: 14, border: `1px solid ${P.border}`, padding: "22px 24px", boxShadow: "0 1px 4px rgba(0,0,0,.05)" }}>
            <p style={{ fontSize: 13, color: P.muted, margin: 0 }}>{label}</p>
            <p style={{ fontSize: 30, fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", color: P.text, margin: "8px 0 4px" }}>{value}</p>
            <p style={{ fontSize: 12, fontWeight: 600, color }}>{hint}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 28 }}>
        {quickLinks.map(({ href, title, description, accent }) => (
          <Link
            key={title}
            href={href}
            style={{
              background: "#fff",
              borderRadius: 14,
              border: `1px solid ${P.border}`,
              padding: "20px 22px",
              boxShadow: "0 1px 4px rgba(0,0,0,.05)",
              textDecoration: "none",
              color: P.text,
              display: "block",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: accent, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em" }}>
              {title}
            </span>
            <p style={{ fontSize: 14, fontWeight: 700, margin: "10px 0 6px" }}>{title}</p>
            <p style={{ fontSize: 13, color: P.muted, lineHeight: 1.5, margin: 0 }}>{description}</p>
          </Link>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: 14, border: `1px solid ${P.border}`, padding: "22px 24px", boxShadow: "0 1px 4px rgba(0,0,0,.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif", margin: 0 }}>Recent Job Requests</h2>
          <Link href="/dashboard/company/jobs" style={{ fontSize: 12, fontWeight: 600, color: P.orange, textDecoration: "none" }}>View all →</Link>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${P.border}` }}>
                {["Job ID", "Client", "Category", "Technician", "Status"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: P.muted, fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentJobs.map(({ id, client, category, tech, status, statusColor }) => (
                <tr key={id} style={{ borderBottom: `1px solid ${P.border}` }}>
                  <td style={{ padding: "12px", fontWeight: 600, color: P.orange }}>{id}</td>
                  <td style={{ padding: "12px" }}>{client}</td>
                  <td style={{ padding: "12px" }}>{category}</td>
                  <td style={{ padding: "12px", color: P.muted }}>{tech}</td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ background: statusColor + "18", color: statusColor, borderRadius: 20, padding: "3px 10px", fontWeight: 600, fontSize: 12 }}>{status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
