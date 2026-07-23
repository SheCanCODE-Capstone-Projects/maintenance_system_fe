"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const P = {
  orange: "#FF6224",
  sidebar: "#0D3330",
  green: "#1B7A52",
  bg: "#F4F6F5",
  text: "#111918",
  muted: "#7A8E8C",
  border: "rgba(13,51,48,.11)",
  red: "#DC2626",
  blue: "#1D4ED8",
  amber: "#B45309",
  purple: "#7C3AED",
};

const card = (extra?: React.CSSProperties): React.CSSProperties => ({
  background: "#fff",
  borderRadius: 16,
  border: `1px solid ${P.border}`,
  padding: "22px 24px",
  boxShadow: "0 1px 4px rgba(0,0,0,.05)",
  ...extra,
});

type Range = "week" | "month" | "quarter";

const ranges: { key: Range; label: string }[] = [
  { key: "week", label: "This week" },
  { key: "month", label: "This month" },
  { key: "quarter", label: "Last 3 months" },
];

const revenueByRange: Record<Range, { month: string; revenue: number }[]> = {
  week: [
    { month: "Mon", revenue: 45000 },
    { month: "Tue", revenue: 62000 },
    { month: "Wed", revenue: 38000 },
    { month: "Thu", revenue: 71000 },
    { month: "Fri", revenue: 89000 },
    { month: "Sat", revenue: 54000 },
    { month: "Sun", revenue: 22000 },
  ],
  month: [
    { month: "Feb", revenue: 620000 },
    { month: "Mar", revenue: 740000 },
    { month: "Apr", revenue: 580000 },
    { month: "May", revenue: 810000 },
    { month: "Jun", revenue: 760000 },
    { month: "Jul", revenue: 890000 },
  ],
  quarter: [
    { month: "Jan", revenue: 520000 },
    { month: "Feb", revenue: 620000 },
    { month: "Mar", revenue: 740000 },
    { month: "Apr", revenue: 580000 },
    { month: "May", revenue: 810000 },
    { month: "Jun", revenue: 760000 },
    { month: "Jul", revenue: 890000 },
    { month: "Aug", revenue: 930000 },
    { month: "Sep", revenue: 870000 },
  ],
};

const jobsByRange: Record<Range, { month: string; jobs: number }[]> = {
  week: [
    { month: "Mon", jobs: 6 },
    { month: "Tue", jobs: 7 },
    { month: "Wed", jobs: 5 },
    { month: "Thu", jobs: 8 },
    { month: "Fri", jobs: 9 },
    { month: "Sat", jobs: 6 },
    { month: "Sun", jobs: 4 },
  ],
  month: [
    { month: "Feb", jobs: 28 },
    { month: "Mar", jobs: 31 },
    { month: "Apr", jobs: 27 },
    { month: "May", jobs: 34 },
    { month: "Jun", jobs: 33 },
    { month: "Jul", jobs: 38 },
  ],
  quarter: [
    { month: "Jan", jobs: 24 },
    { month: "Feb", jobs: 28 },
    { month: "Mar", jobs: 31 },
    { month: "Apr", jobs: 27 },
    { month: "May", jobs: 34 },
    { month: "Jun", jobs: 33 },
    { month: "Jul", jobs: 38 },
    { month: "Aug", jobs: 41 },
    { month: "Sep", jobs: 39 },
  ],
};

const jobBreakdown = [
  { name: "Plumbing", value: 35, color: P.orange },
  { name: "Electrical", value: 28, color: P.blue },
  { name: "Carpentry", value: 18, color: P.green },
  { name: "Painting", value: 12, color: P.purple },
  { name: "Other", value: 7, color: P.amber },
];

const technicians = [
  { name: "Jean Paul M.", jobs: 12, rating: 4.9, revenue: "RWF 245K", status: "Active" },
  { name: "Alice K.", jobs: 10, rating: 4.8, revenue: "RWF 198K", status: "Active" },
  { name: "David N.", jobs: 8, rating: 4.7, revenue: "RWF 162K", status: "Active" },
  { name: "Grace U.", jobs: 8, rating: 4.6, revenue: "RWF 155K", status: "On Leave" },
];

const kpiByRange: Record<Range, {
  revenue: string;
  revenueChange: string;
  revenueUp: boolean;
  jobs: string;
  jobsChange: string;
  jobsUp: boolean;
  responseTime: string;
  responseChange: string;
  responseUp: boolean;
  satisfaction: string;
}> = {
  week: {
    revenue: "RWF 381K",
    revenueChange: "+8%",
    revenueUp: true,
    jobs: "9",
    jobsChange: "+2",
    jobsUp: true,
    responseTime: "21 min",
    responseChange: "-3 min",
    responseUp: true,
    satisfaction: "4.9",
  },
  month: {
    revenue: "RWF 890K",
    revenueChange: "+18%",
    revenueUp: true,
    jobs: "38",
    jobsChange: "+6",
    jobsUp: true,
    responseTime: "24 min",
    responseChange: "-5 min",
    responseUp: true,
    satisfaction: "4.8",
  },
  quarter: {
    revenue: "RWF 2.7M",
    revenueChange: "+22%",
    revenueUp: true,
    jobs: "112",
    jobsChange: "+24",
    jobsUp: true,
    responseTime: "26 min",
    responseChange: "-8 min",
    responseUp: true,
    satisfaction: "4.7",
  },
};

function MiniSparkline({ data }: { data: { month: string; jobs: number }[] }) {
  return (
    <div style={{ height: 54, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="jobs"
            stroke={P.orange}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function KpiCard({
  label,
  value,
  change,
  up,
  helper,
  children,
}: {
  label: string;
  value: string;
  change: string;
  up: boolean;
  helper: string;
  children?: React.ReactNode;
}) {
  return (
    <div style={card()}>
      <p style={{ fontSize: 13, color: P.muted, margin: 0 }}>{label}</p>
      <p style={{ fontSize: 30, fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", color: P.text, margin: "8px 0 4px" }}>
        {value}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: up ? P.green : P.red }}>
          {up ? "▲" : "▼"} {change}
        </span>
        <span style={{ fontSize: 11, color: P.muted }}>{helper}</span>
      </div>
      {children}
    </div>
  );
}

export default function AnalyticsPage() {
  const [range, setRange] = useState<Range>("month");
  const kpi = kpiByRange[range];
  const revenueData = revenueByRange[range];
  const jobsData = jobsByRange[range];

  return (
    <section style={{ color: P.text }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", margin: 0 }}>Analytics</h1>
          <p style={{ color: P.muted, fontSize: 14, marginTop: 4 }}>Performance overview for BuildFix Ltd</p>
        </div>
        <div style={{ display: "flex", background: P.bg, borderRadius: 999, padding: 4, border: `1px solid ${P.border}` }}>
          {ranges.map(({ key, label }) => {
            const active = range === key;
            return (
              <button
                key={key}
                onClick={() => setRange(key)}
                style={{
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 999,
                  padding: "8px 16px",
                  fontSize: 13,
                  fontWeight: 600,
                  background: active ? "#fff" : "transparent",
                  color: active ? P.text : P.muted,
                  boxShadow: active ? "0 1px 4px rgba(0,0,0,.08)" : "none",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16, marginBottom: 24 }}>
        <KpiCard
          label="Total Revenue"
          value={kpi.revenue}
          change={kpi.revenueChange}
          up={kpi.revenueUp}
          helper="vs last period"
        />
        <KpiCard
          label="Jobs Completed"
          value={kpi.jobs}
          change={kpi.jobsChange}
          up={kpi.jobsUp}
          helper="sparkline trend"
        >
          <MiniSparkline data={jobsData} />
        </KpiCard>
        <KpiCard
          label="Average Response Time"
          value={kpi.responseTime}
          change={kpi.responseChange}
          up={kpi.responseUp}
          helper="improvement"
        />
        <KpiCard
          label="Customer Satisfaction"
          value={`${kpi.satisfaction}/5`}
          change="+0.1"
          up
          helper="from reviews"
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.9fr) minmax(280px, 1fr)", gap: 20, marginBottom: 24 }}>
        <div style={card()}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif", margin: 0 }}>Revenue Chart</h2>
            <span style={{ fontSize: 12, color: P.muted }}>Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={P.border} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: P.muted }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: P.muted }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${(Number(value) / 1000).toFixed(0)}K`}
              />
              <Tooltip
                formatter={(value) => [`RWF ${(Number(value) / 1000).toFixed(0)}K`, "Revenue"]}
                contentStyle={{ borderRadius: 10, border: `1px solid ${P.border}`, fontSize: 13 }}
              />
              <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                {revenueData.map((entry) => (
                  <Cell key={entry.month} fill={P.orange} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={card()}>
          <h2 style={{ fontSize: 16, fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif", margin: "0 0 16px" }}>Job Breakdown</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={jobBreakdown} dataKey="value" nameKey="name" cx="50%" cy="46%" innerRadius={68} outerRadius={96} paddingAngle={3}>
                {jobBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, "Share"]} contentStyle={{ borderRadius: 10, border: `1px solid ${P.border}`, fontSize: 13 }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ ...card(), marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif", margin: 0 }}>Technician Performance</h2>
          <span style={{ fontSize: 12, color: P.muted }}>Top 4 technicians from team data</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${P.border}` }}>
                {["Name", "Jobs this month", "Avg rating", "Revenue generated", "Status"].map((heading) => (
                  <th key={heading} style={{ textAlign: "left", padding: "8px 12px", color: P.muted, fontWeight: 600, whiteSpace: "nowrap" }}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {technicians.map(({ name, jobs, rating, revenue, status }) => (
                <tr key={name} style={{ borderBottom: `1px solid ${P.border}` }}>
                  <td style={{ padding: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ width: 34, height: 34, borderRadius: "50%", background: P.sidebar, color: "#fff", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700 }}>
                        {name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                      </span>
                      <span style={{ fontWeight: 600 }}>{name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px", fontWeight: 700, color: P.orange }}>{jobs}</td>
                  <td style={{ padding: "12px", color: P.amber, fontWeight: 700 }}>★ {rating}</td>
                  <td style={{ padding: "12px", fontWeight: 600 }}>{revenue}</td>
                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        background: status === "Active" ? `${P.green}18` : `${P.amber}18`,
                        color: status === "Active" ? P.green : P.amber,
                        borderRadius: 999,
                        padding: "4px 10px",
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={card()}>
        <h2 style={{ fontSize: 16, fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif", margin: "0 0 18px" }}>Customer Retention</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: P.muted }}>Repeat customers</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: P.green }}>62%</span>
            </div>
            <div style={{ height: 8, background: P.bg, borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: "62%", height: "100%", background: P.green, borderRadius: 999 }} />
            </div>
            <p style={{ fontSize: 12, color: P.muted, margin: "8px 0 0" }}>Returning customers are growing steadily month over month.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: 13, color: P.muted, margin: "0 0 6px" }}>New customers this month</p>
            <p style={{ fontSize: 36, fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", color: P.text, margin: 0 }}>
              14
            </p>
            <p style={{ fontSize: 12, fontWeight: 600, color: P.blue, marginTop: 4 }}>▲ 3 more than last month</p>
          </div>
        </div>
      </div>
    </section>
  );
}
