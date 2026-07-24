"use client";

import { useRef, useState } from "react";

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

const districts = ["Gasabo", "Kicukiro", "Nyarugenge", "Huye", "Rubavu", "Musanze"];
const sectors = ["Kimironko", "Remera", "Kacyiru", "Gisozi", "Nyarugenge", "Gikondo"];
const services = ["Plumbing", "Electrical", "Carpentry", "Painting", "Cleaning"];
const acceptanceWindows = ["2h", "4h", "8h", "24h"];

const notifications = [
  { key: "jobRequests", label: "New job requests", description: "Get notified whenever a customer submits a new request." },
  { key: "jobStatus", label: "Job status changes", description: "Track assignment, acceptance, completion, and cancellation updates." },
  { key: "customerReviews", label: "Customer reviews", description: "Know when a new review is posted so you can reply quickly." },
  { key: "payments", label: "Payment confirmations", description: "Receive payment and payout confirmation messages." },
  { key: "digest", label: "Weekly digest email", description: "A summary of performance, jobs, and review activity every week." },
];

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      style={{
        width: 48,
        height: 28,
        borderRadius: 999,
        border: "none",
        cursor: "pointer",
        background: enabled ? P.green : "#cdd7d5",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: enabled ? 24 : 3,
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,.18)",
          transition: "left .15s ease",
        }}
      />
    </button>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif", margin: 0 }}>{title}</h2>
      <p style={{ fontSize: 13, color: P.muted, margin: "4px 0 0" }}>{subtitle}</p>
    </div>
  );
}

export default function SettingsPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [companyName, setCompanyName] = useState("BuildFix Ltd");
  const [email, setEmail] = useState("hello@buildfix.rw");
  const [phone, setPhone] = useState("+250 788 123 456");
  const [district, setDistrict] = useState(districts[0]);
  const [sector, setSector] = useState(sectors[0]);
  const [service, setService] = useState(services[0]);
  const [bio, setBio] = useState("Trusted maintenance partner for residential and commercial repairs across Kigali.");
  const [maxActiveJobs, setMaxActiveJobs] = useState(3);
  const [autoAssign, setAutoAssign] = useState(true);
  const [acceptanceWindow, setAcceptanceWindow] = useState("4h");
  const [notificationsState, setNotificationsState] = useState<Record<string, boolean>>({
    jobRequests: true,
    jobStatus: true,
    customerReviews: true,
    payments: false,
    digest: true,
  });
  const [dangerOpen, setDangerOpen] = useState(false);
  const [deactivated, setDeactivated] = useState(false);

  const saveProfile = () => {
    setBio((current) => current.trim());
  };

  return (
    <section style={{ color: P.text }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", margin: 0 }}>Settings</h1>
        <p style={{ color: P.muted, fontSize: 14, marginTop: 4 }}>Company profile, team preferences, and notification controls</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={card()}>
          <SectionTitle title="Company Profile" subtitle="Update the public details and operating area for your company." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Company name</span>
              <input
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
                style={{ border: `1px solid ${P.border}`, borderRadius: 12, padding: "11px 12px", fontSize: 14, outline: "none" }}
              />
            </label>
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Email</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                style={{ border: `1px solid ${P.border}`, borderRadius: 12, padding: "11px 12px", fontSize: 14, outline: "none" }}
              />
            </label>
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Phone number</span>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                style={{ border: `1px solid ${P.border}`, borderRadius: 12, padding: "11px 12px", fontSize: 14, outline: "none" }}
              />
            </label>
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>District</span>
              <select
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
                style={{ border: `1px solid ${P.border}`, borderRadius: 12, padding: "11px 12px", fontSize: 14, outline: "none", background: "#fff" }}
              >
                {districts.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Sector</span>
              <select
                value={sector}
                onChange={(event) => setSector(event.target.value)}
                style={{ border: `1px solid ${P.border}`, borderRadius: 12, padding: "11px 12px", fontSize: 14, outline: "none", background: "#fff" }}
              >
                {sectors.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div style={{ marginTop: 18 }}>
            <p style={{ fontSize: 13, fontWeight: 600, margin: "0 0 10px" }}>Primary service type</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {services.map((item) => {
                const active = service === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setService(item)}
                    style={{
                      border: `1px solid ${active ? P.orange : P.border}`,
                      background: active ? `${P.orange}12` : "#fff",
                      color: active ? P.orange : P.text,
                      borderRadius: 999,
                      padding: "8px 14px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <label style={{ display: "grid", gap: 6, marginTop: 18 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Company bio</span>
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={4}
              style={{ border: `1px solid ${P.border}`, borderRadius: 12, padding: "12px", fontSize: 14, outline: "none", resize: "vertical", fontFamily: "Inter, sans-serif" }}
            />
          </label>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}>
            <button type="button" onClick={saveProfile} style={{ background: P.orange, color: "#fff", border: "none", borderRadius: 12, padding: "10px 18px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              Save profile
            </button>
          </div>
        </div>

        <div style={card()}>
          <SectionTitle title="Accreditation Status" subtitle="Review company verification details and replace documents when needed." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, alignItems: "start" }}>
            <div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${P.green}18`, color: P.green, borderRadius: 999, padding: "5px 12px", fontSize: 12, fontWeight: 700 }}>
                Accredited ✓
              </span>
              <div style={{ marginTop: 14, display: "grid", gap: 8, fontSize: 14 }}>
                <p style={{ margin: 0 }}><span style={{ color: P.muted }}>Accreditation date:</span> 12 May 2025</p>
                <p style={{ margin: 0 }}><span style={{ color: P.muted }}>Next renewal date:</span> 12 May 2026</p>
                <p style={{ margin: 0 }}><span style={{ color: P.muted }}>Registration number:</span> BF-2025-0148</p>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
              <input ref={fileInputRef} type="file" hidden />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{ background: "#fff", color: P.text, border: `1px solid ${P.border}`, borderRadius: 12, padding: "10px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
              >
                Upload new documents
              </button>
            </div>
          </div>
        </div>

        <div style={card()}>
          <SectionTitle title="Team Settings" subtitle="Control workload distribution and job acceptance behavior for technicians." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Max active jobs per technician</span>
              <input
                type="number"
                min={1}
                value={maxActiveJobs}
                onChange={(event) => setMaxActiveJobs(Number(event.target.value))}
                style={{ border: `1px solid ${P.border}`, borderRadius: 12, padding: "11px 12px", fontSize: 14, outline: "none" }}
              />
            </label>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, border: `1px solid ${P.border}`, borderRadius: 12, padding: "12px 14px" }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Auto-assign technicians</p>
                <p style={{ fontSize: 12, color: P.muted, margin: "4px 0 0" }}>Automatically assign nearest available technician to new requests.</p>
              </div>
              <Toggle enabled={autoAssign} onToggle={() => setAutoAssign((current) => !current)} />
            </div>

            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Job acceptance window</span>
              <select
                value={acceptanceWindow}
                onChange={(event) => setAcceptanceWindow(event.target.value)}
                style={{ border: `1px solid ${P.border}`, borderRadius: 12, padding: "11px 12px", fontSize: 14, outline: "none", background: "#fff" }}
              >
                {acceptanceWindows.map((window) => (
                  <option key={window} value={window}>
                    Auto-reject after {window}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div style={card()}>
          <SectionTitle title="Notification Preferences" subtitle="Choose how your company receives updates and reports." />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {notifications.map((item) => (
              <div key={item.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, border: `1px solid ${P.border}`, borderRadius: 12, padding: "12px 14px" }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{item.label}</p>
                  <p style={{ fontSize: 12, color: P.muted, margin: "4px 0 0" }}>{item.description}</p>
                </div>
                <Toggle
                  enabled={notificationsState[item.key]}
                  onToggle={() =>
                    setNotificationsState((current) => ({
                      ...current,
                      [item.key]: !current[item.key],
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div style={card()}>
          <SectionTitle title="Danger Zone" subtitle="Account actions here require explicit confirmation." />
          {deactivated ? (
            <div style={{ border: `1px solid ${P.red}30`, background: `${P.red}08`, borderRadius: 12, padding: "12px 14px", color: P.red, fontWeight: 600 }}>
              Company account deactivation is pending review in this demo.
            </div>
          ) : null}
          <div style={{ display: "flex", justifyContent: "flex-start", marginTop: 16 }}>
            <button
              type="button"
              onClick={() => setDangerOpen(true)}
              style={{ background: "#fff", color: P.red, border: `1px solid ${P.red}`, borderRadius: 12, padding: "10px 16px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
            >
              Deactivate company account
            </button>
          </div>
        </div>
      </div>

      {dangerOpen ? (
        <div style={{ position: "fixed", inset: 0, background: "rgba(13,51,48,.45)", display: "grid", placeItems: "center", padding: 16, zIndex: 50 }}>
          <div style={{ width: "min(480px, 100%)", background: "#fff", borderRadius: 16, border: `1px solid ${P.border}`, padding: 24, boxShadow: "0 18px 40px rgba(0,0,0,.2)" }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif" }}>Deactivate company account?</h3>
            <p style={{ color: P.muted, fontSize: 14, lineHeight: 1.6, margin: "10px 0 0" }}>
              This will stop new work from being assigned to the company until the account is reactivated.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => setDangerOpen(false)}
                style={{ background: "#fff", color: P.text, border: `1px solid ${P.border}`, borderRadius: 12, padding: "10px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setDangerOpen(false);
                  setDeactivated(true);
                }}
                style={{ background: P.red, color: "#fff", border: "none", borderRadius: 12, padding: "10px 16px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
              >
                Confirm deactivation
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
