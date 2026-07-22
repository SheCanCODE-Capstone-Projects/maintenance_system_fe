"use client";

import { useState, useEffect, CSSProperties } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ─── Palette & typography ────────────────────────────────────────────────────
const C = {
  orange:  "#FF6224",
  dark:    "#0D3330",
  green:   "#1B7A52",
  bg:      "#F4F6F5",
  text:    "#111918",
  muted:   "#7A8E8C",
  border:  "rgba(13,51,48,.13)",
  red:     "#DC2626",
  white:   "#ffffff",
};

const FONT_HEAD = "Plus Jakarta Sans, sans-serif";
const FONT_BODY = "Inter, sans-serif";

// ─── Role definitions ────────────────────────────────────────────────────────
type Role = "customer" | "technician" | "company" | "admin";

const ROLES: { key: Role; label: string; icon: string; accent: string }[] = [
  { key: "customer",   label: "Customer",   icon: "♙", accent: C.orange },
  { key: "technician", label: "Technician", icon: "♢", accent: C.green  },
  { key: "company",    label: "Company",    icon: "▥", accent: "#1D4ED8" },
  { key: "admin",      label: "Admin",      icon: "⚙", accent: "#7C3AED" },
];

const ROLE_ROUTES: Record<Role, string> = {
  customer:   "/dashboard/customer",
  technician: "/dashboard/technician",
  company:    "/dashboard/company",
  admin:      "/dashboard/admin",
};

// ─── Left-panel stats & trust badges ────────────────────────────────────────
const STATS = [
  { value: "2.4k+", label: "Clients" },
  { value: "890+",  label: "Technicians" },
  { value: "98%",   label: "Resolved" },
];

const BADGES = [
  { icon: "✓", text: "Verified professionals" },
  { icon: "⊙", text: "Real-time job tracking" },
  { icon: "★", text: "Rated & reviewed" },
];

// ─── Responsive hook ─────────────────────────────────────────────────────────
function useMobile() {
  const [mob, setMob] = useState(false);
  useEffect(() => {
    const check = () => setMob(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mob;
}

// ─── Spinner ─────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <span style={{
      display: "inline-block",
      width: 18, height: 18,
      border: "2.5px solid rgba(255,255,255,.35)",
      borderTopColor: C.white,
      borderRadius: "50%",
      animation: "spin 0.7s linear infinite",
    }} />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function LoginPage() {
  const router   = useRouter();
  const isMobile = useMobile();

  // form state
  const [role,        setRole]        = useState<Role>("customer");
  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [showPass,    setShowPass]    = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");
  const [emailErr,    setEmailErr]    = useState("");
  const [passErr,     setPassErr]     = useState("");

  const activeRole = ROLES.find(r => r.key === role)!;

  // ── validation ──────────────────────────────────────────────────────────
  function validate(): boolean {
    let ok = true;
    setEmailErr("");
    setPassErr("");
    setError("");

    if (!email.trim()) {
      setEmailErr("Email is required.");
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErr("Enter a valid email address.");
      ok = false;
    }

    if (!password) {
      setPassErr("Password is required.");
      ok = false;
    } else if (password.length < 6) {
      setPassErr("Password must be at least 6 characters.");
      ok = false;
    }

    return ok;
  }

  // ── submit ───────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError("");

    // 600 ms loading spinner before routing
    await new Promise(res => setTimeout(res, 600));

    try {
      router.push(ROLE_ROUTES[role]);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  // ── shared input style ───────────────────────────────────────────────────
  const inputBase: CSSProperties = {
    width: "100%",
    padding: "11px 14px 11px 42px",
    borderRadius: 12,
    border: `1.5px solid ${C.border}`,
    fontSize: 14,
    fontFamily: FONT_BODY,
    color: C.text,
    background: C.white,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color .15s",
  };

  const inputErr: CSSProperties  = { ...inputBase, borderColor: C.red, background: "#fef2f2" };
  const iconWrap: CSSProperties  = { position: "relative", display: "flex", alignItems: "center" };
  const iconPin:  CSSProperties  = {
    position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)",
    fontSize: 15, color: C.muted, pointerEvents: "none",
  };

  return (
    <>
      {/* Keyframe for spinner */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        minHeight: "100vh",
        fontFamily: FONT_BODY,
        background: C.bg,
      }}>

        {/* ════════════════════════════════════════════════════════════════
            LEFT PANEL
        ════════════════════════════════════════════════════════════════ */}
        {isMobile ? (
          /* Mobile: slim logo bar only */
          <div style={{
            background: C.dark, padding: "18px 24px",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{
              width: 34, height: 34, borderRadius: 9, background: C.orange,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, color: C.white, fontWeight: 800, flexShrink: 0,
            }}>▥</span>
            <span style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 17, color: C.white, letterSpacing: ".02em" }}>
              Maintenance<span style={{ color: C.orange }}>Hub</span>
            </span>
          </div>
        ) : (
          /* Desktop: full branding panel */
          <div style={{
            width: "44%", flexShrink: 0, background: C.dark, color: C.white,
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            padding: "52px 48px", minHeight: "100vh", boxSizing: "border-box",
          }}>
            {/* Top: logo + tagline */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{
                  width: 42, height: 42, borderRadius: 12, background: C.orange,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 800, flexShrink: 0,
                }}>▥</span>
                <span style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 20, letterSpacing: ".02em" }}>
                  Maintenance<span style={{ color: C.orange }}>Hub</span>
                </span>
              </div>
              <p style={{ fontSize: 12, color: C.green, fontWeight: 600, marginBottom: 40, letterSpacing: ".04em" }}>
                Rwanda&apos;s #1 Maintenance Platform
              </p>

              {/* Trust badge pill */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)",
                borderRadius: 30, padding: "7px 16px", marginBottom: 32,
              }}>
                <span style={{ color: C.orange, fontSize: 13 }}>✓</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,.75)", fontWeight: 500 }}>
                  Trusted by 2,400+ clients across Rwanda
                </span>
              </div>

              {/* Hero heading */}
              <h1 style={{
                fontFamily: FONT_HEAD, fontSize: 36, fontWeight: 900,
                lineHeight: 1.2, margin: "0 0 14px", color: C.white,
              }}>
                Your maintenance,<br />
                <span style={{ color: C.orange }}>managed smarter.</span>
              </h1>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.7, maxWidth: 300, margin: "0 0 44px" }}>
                Connect with verified maintenance professionals. Fast, reliable, and fully transparent service — every time.
              </p>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 36 }}>
                {STATS.map(({ value, label }) => (
                  <div key={label} style={{
                    background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)",
                    borderRadius: 14, padding: "18px 12px", textAlign: "center",
                  }}>
                    <p style={{ fontFamily: FONT_HEAD, fontSize: 24, fontWeight: 900, color: C.white, margin: 0 }}>{value}</p>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,.45)", margin: "5px 0 0" }}>{label}</p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", marginBottom: 28 }} />

              {/* Trust badges */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {BADGES.map(({ icon, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: "rgba(27,122,82,.25)", border: "1px solid rgba(27,122,82,.35)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 15, color: C.green,
                    }}>{icon}</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,.7)", fontWeight: 500 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <p style={{ fontSize: 11, color: "rgba(255,255,255,.25)", marginTop: 48 }}>
              © {new Date().getFullYear()} MaintenanceHub. All rights reserved.
            </p>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            RIGHT PANEL — Login form
        ════════════════════════════════════════════════════════════════ */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          padding: isMobile ? "36px 20px 48px" : "48px 40px",
          boxSizing: "border-box",
        }}>
          <div style={{ width: "100%", maxWidth: 440 }}>

            {/* Heading */}
            <h2 style={{
              fontFamily: FONT_HEAD, fontSize: isMobile ? 26 : 30,
              fontWeight: 900, color: C.dark, margin: "0 0 6px",
            }}>
              Welcome back
            </h2>
            <p style={{ fontSize: 14, color: C.muted, margin: "0 0 32px" }}>
              Sign in to your Maintenance Hub account
            </p>

            {/* ── Role selector ──────────────────────────────────────── */}
            <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 10px" }}>
              Sign in as
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 28 }}
              role="radiogroup" aria-label="Select your role">
              {ROLES.map(({ key, label, icon, accent }) => {
                const active = role === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => { setRole(key); setError(""); }}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center",
                      gap: 6, padding: "12px 6px", borderRadius: 14, cursor: "pointer",
                      border: `2px solid ${active ? accent : C.border}`,
                      background: active ? accent + "12" : C.white,
                      transition: "all .15s", outline: "none", fontFamily: FONT_BODY,
                      boxShadow: active ? `0 0 0 3px ${accent}22` : "none",
                    }}
                  >
                    <span style={{
                      width: 34, height: 34, borderRadius: 9,
                      background: active ? accent : C.bg,
                      color: active ? C.white : C.muted,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 16, fontWeight: 700, transition: "all .15s",
                    }}>{icon}</span>
                    <span style={{
                      fontSize: 11, fontWeight: 700,
                      color: active ? accent : C.muted,
                    }}>{label}</span>
                  </button>
                );
              })}
            </div>

            {/* ── Global error banner ───────────────────────────────── */}
            {error && (
              <div role="alert" style={{
                background: "#fef2f2", border: `1px solid ${C.red}50`,
                borderRadius: 10, padding: "11px 14px", marginBottom: 20,
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <span style={{ color: C.red, fontSize: 16, flexShrink: 0 }}>⚠</span>
                <span style={{ fontSize: 13, color: C.red, fontWeight: 500 }}>{error}</span>
              </div>
            )}

            {/* ── Form ─────────────────────────────────────────────── */}
            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              {/* Email */}
              <div>
                <label htmlFor="email" style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 7 }}>
                  Email Address
                </label>
                <div style={iconWrap}>
                  <span style={iconPin} aria-hidden>✉</span>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setEmailErr(""); }}
                    aria-invalid={!!emailErr}
                    aria-describedby={emailErr ? "email-err" : undefined}
                    style={emailErr ? inputErr : inputBase}
                    onFocus={e => { if (!emailErr) e.currentTarget.style.borderColor = activeRole.accent; }}
                    onBlur={e  => { if (!emailErr) e.currentTarget.style.borderColor = C.border; }}
                  />
                </div>
                {emailErr && (
                  <p id="email-err" role="alert" style={{ fontSize: 12, color: C.red, margin: "6px 0 0", display: "flex", alignItems: "center", gap: 4 }}>
                    ⚠ {emailErr}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                  <label htmlFor="password" style={{ fontSize: 13, fontWeight: 600, color: C.text }}>
                    Password
                  </label>
                  <Link href="/forgot-password" style={{
                    fontSize: 12, fontWeight: 600, color: activeRole.accent,
                    textDecoration: "none",
                  }}>
                    Forgot password?
                  </Link>
                </div>
                <div style={iconWrap}>
                  <span style={iconPin} aria-hidden>🔒</span>
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setPassErr(""); }}
                    aria-invalid={!!passErr}
                    aria-describedby={passErr ? "pass-err" : undefined}
                    style={{ ...(passErr ? inputErr : inputBase), paddingRight: 44 }}
                    onFocus={e => { if (!passErr) e.currentTarget.style.borderColor = activeRole.accent; }}
                    onBlur={e  => { if (!passErr) e.currentTarget.style.borderColor = C.border; }}
                  />
                  {/* Show / hide toggle */}
                  <button
                    type="button"
                    aria-label={showPass ? "Hide password" : "Show password"}
                    onClick={() => setShowPass(v => !v)}
                    style={{
                      position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer",
                      color: C.muted, fontSize: 15, padding: 0, lineHeight: 1,
                    }}
                  >
                    {showPass ? "🙈" : "👁"}
                  </button>
                </div>
                {passErr && (
                  <p id="pass-err" role="alert" style={{ fontSize: 12, color: C.red, margin: "6px 0 0", display: "flex", alignItems: "center", gap: 4 }}>
                    ⚠ {passErr}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%", padding: "13px 0", borderRadius: 12, border: "none",
                  background: loading ? activeRole.accent + "99" : activeRole.accent,
                  color: C.white, fontFamily: FONT_HEAD, fontSize: 15, fontWeight: 800,
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  boxShadow: `0 4px 18px ${activeRole.accent}44`,
                  transition: "background .15s, box-shadow .15s",
                  marginTop: 4,
                }}
              >
                {loading ? <Spinner /> : <>Sign In &nbsp;→</>}
              </button>
            </form>

            {/* Sign-up link */}
            <p style={{ textAlign: "center", fontSize: 13, color: C.muted, marginTop: 24 }}>
              Don&apos;t have an account?{" "}
              <Link href="/register" style={{ color: activeRole.accent, fontWeight: 700, textDecoration: "none" }}>
                Create Account
              </Link>
            </p>

          </div>
        </div>

      </div>
    </>
  );
}
