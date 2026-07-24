"use client";

import { useState } from "react";

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

type Filter = "all" | "5" | "4" | "3" | "unresponded";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "5", label: "5 ★" },
  { key: "4", label: "4 ★" },
  { key: "3", label: "3 ★" },
  { key: "unresponded", label: "Unresponded" },
];

const starBreakdown = [
  { stars: 5, pct: 72 },
  { stars: 4, pct: 18 },
  { stars: 3, pct: 7 },
  { stars: 2, pct: 2 },
  { stars: 1, pct: 1 },
];

const ratingTrend = [
  { month: "Feb", avg: 4.5 },
  { month: "Mar", avg: 4.6 },
  { month: "Apr", avg: 4.7 },
  { month: "May", avg: 4.7 },
  { month: "Jun", avg: 4.8 },
  { month: "Jul", avg: 4.8 },
];

type Review = {
  id: number;
  initials: string;
  name: string;
  stars: number;
  date: string;
  category: string;
  text: string;
  technician: string;
  reply?: string;
};

const REVIEWS: Review[] = [
  {
    id: 1,
    initials: "AU",
    name: "Amina Uwase",
    stars: 5,
    date: "Jul 14, 2025",
    category: "Plumbing",
    text: "Excellent service. The technician arrived on time, fixed the leak quickly, and left the workspace spotless. I will definitely book again.",
    technician: "Jean Paul M.",
    reply: "Thank you Amina. We are glad Jean Paul delivered a great experience.",
  },
  {
    id: 2,
    initials: "EN",
    name: "Eric Nshimiyimana",
    stars: 5,
    date: "Jul 11, 2025",
    category: "Electrical",
    text: "Very impressed with the quality of work. Everything was explained clearly, the repair was fast, and the team was very professional.",
    technician: "Alice K.",
  },
  {
    id: 3,
    initials: "CM",
    name: "Claire Mukamana",
    stars: 4,
    date: "Jul 9, 2025",
    category: "Carpentry",
    text: "Good work overall. The furniture assembly was done well and the finish was neat. I would use the service again.",
    technician: "David N.",
    reply: "Thank you Claire. We appreciate the feedback and will continue improving our timing.",
  },
  {
    id: 4,
    initials: "PM",
    name: "Patrick Mugisha",
    stars: 5,
    date: "Jul 7, 2025",
    category: "Painting",
    text: "Fantastic result. The painting transformed our office and the crew handled everything carefully. Great attention to detail.",
    technician: "Grace U.",
  },
  {
    id: 5,
    initials: "RK",
    name: "Rose Kayitesi",
    stars: 3,
    date: "Jul 3, 2025",
    category: "Plumbing",
    text: "The repair was completed, but communication could be better. The actual work was fine, and the issue is now resolved.",
    technician: "Jean Paul M.",
  },
  {
    id: 6,
    initials: "JN",
    name: "Joseph Nzeyimana",
    stars: 4,
    date: "Jun 28, 2025",
    category: "Electrical",
    text: "Solid installation work. The technician answered my questions and the final result looks clean and professional.",
    technician: "Alice K.",
  },
];

function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span style={{ color: P.amber, fontSize: size, letterSpacing: 1 }}>
      {"★".repeat(value)}
      {"☆".repeat(5 - value)}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [savedReply, setSavedReply] = useState(review.reply ?? "");

  const submitReply = () => {
    const trimmed = replyText.trim();
    if (!trimmed) return;
    setSavedReply(trimmed);
    setReplyText("");
    setReplying(false);
  };

  return (
    <div style={card()}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 42, height: 42, borderRadius: "50%", background: P.sidebar, color: "#fff", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 700 }}>
            {review.initials}
          </span>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>{review.name}</p>
            <p style={{ fontSize: 12, color: P.muted, margin: "3px 0 0" }}>
              {review.category} · {review.date}
            </p>
          </div>
        </div>
        <Stars value={review.stars} />
      </div>

      <p style={{ fontSize: 14, color: P.text, lineHeight: 1.65, margin: "14px 0 10px" }}>{review.text}</p>

      <p style={{ fontSize: 12, color: P.muted, margin: "0 0 12px" }}>
        Assigned technician: <span style={{ fontWeight: 600, color: P.text }}>{review.technician}</span>
      </p>

      {savedReply ? (
        <div style={{ background: `${P.green}0d`, border: `1px solid ${P.green}30`, borderRadius: 12, padding: "12px 14px" }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: P.green, margin: "0 0 6px" }}>BuildFix Ltd replied:</p>
          <p style={{ fontSize: 13, color: P.text, margin: 0, lineHeight: 1.55 }}>{savedReply}</p>
          <button
            onClick={() => {
              setReplying(true);
              setReplyText(savedReply);
              setSavedReply("");
            }}
            style={{ marginTop: 8, fontSize: 12, color: P.orange, background: "none", border: "none", padding: 0, cursor: "pointer", fontWeight: 600 }}
          >
            Edit reply
          </button>
        </div>
      ) : replying ? (
        <div style={{ marginTop: 8 }}>
          <textarea
            value={replyText}
            onChange={(event) => setReplyText(event.target.value)}
            placeholder="Write a professional reply to the customer..."
            rows={3}
            style={{
              width: "100%",
              borderRadius: 12,
              border: `1px solid ${P.border}`,
              padding: "10px 12px",
              fontSize: 13,
              fontFamily: "Inter, sans-serif",
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
            <button
              onClick={submitReply}
              style={{ background: P.green, color: "#fff", border: "none", borderRadius: 10, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
            >
              Post Reply
            </button>
            <button
              onClick={() => setReplying(false)}
              style={{ background: "#fff", border: `1px solid ${P.border}`, borderRadius: 10, padding: "8px 14px", fontSize: 13, color: P.muted, cursor: "pointer" }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setReplying(true)}
          style={{ background: "#fff", border: `1px solid ${P.border}`, borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, color: P.text, cursor: "pointer" }}
        >
          Reply
        </button>
      )}
    </div>
  );
}

export default function ReviewsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filteredReviews = REVIEWS.filter((review) => {
    if (filter === "all") return true;
    if (filter === "unresponded") return !review.reply;
    return review.stars === Number(filter);
  });

  return (
    <section style={{ color: P.text }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", margin: 0 }}>Reviews</h1>
        <p style={{ color: P.muted, fontSize: 14, marginTop: 4 }}>Manage customer feedback for BuildFix Ltd</p>
      </div>

      <div style={{ ...card(), marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 28, alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 56, fontWeight: 900, fontFamily: "Plus Jakarta Sans, sans-serif", color: P.text, margin: 0, lineHeight: 1 }}>
              4.8
            </p>
            <div style={{ marginTop: 6 }}>
              <Stars value={5} size={20} />
            </div>
            <p style={{ fontSize: 13, color: P.muted, margin: "8px 0 0" }}>142 total reviews</p>
            <span style={{ display: "inline-block", marginTop: 10, background: `${P.green}18`, color: P.green, border: `1px solid ${P.green}40`, borderRadius: 999, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>
              Accredited Company
            </span>
            <p style={{ fontSize: 12, color: P.green, fontWeight: 600, marginTop: 8 }}>▲ 12 new reviews this month</p>
          </div>

          <div>
            {starBreakdown.map(({ stars, pct }) => (
              <div key={stars} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: P.muted, width: 28, textAlign: "right" }}>{stars}★</span>
                <div style={{ flex: 1, height: 8, background: P.bg, borderRadius: 999, overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      background: stars >= 4 ? P.green : stars === 3 ? P.amber : P.red,
                      borderRadius: 999,
                    }}
                  />
                </div>
                <span style={{ fontSize: 12, color: P.muted, width: 34 }}>{pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {filters.map(({ key, label }) => {
          const active = filter === key;
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                border: `1px solid ${active ? P.orange : P.border}`,
                background: active ? `${P.orange}12` : "#fff",
                color: active ? P.orange : P.text,
                borderRadius: 999,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          );
        })}
        <span style={{ marginLeft: "auto", fontSize: 13, color: P.muted, alignSelf: "center" }}>
          {filteredReviews.length} review{filteredReviews.length === 1 ? "" : "s"}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
        {filteredReviews.length === 0 ? (
          <div style={{ ...card(), textAlign: "center", color: P.muted, padding: "40px 24px" }}>No reviews match this filter.</div>
        ) : (
          filteredReviews.map((review) => <ReviewCard key={review.id} review={review} />)
        )}
      </div>

      <div style={card()}>
        <h2 style={{ fontSize: 16, fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif", margin: "0 0 16px" }}>Review Insights</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
          <div>
            <p style={{ fontSize: 13, color: P.muted, margin: "0 0 10px" }}>Most mentioned positives</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Punctual", "Professional", "Clean workspace"].map((tag) => (
                <span key={tag} style={{ background: `${P.green}15`, color: P.green, border: `1px solid ${P.green}30`, borderRadius: 999, padding: "5px 12px", fontSize: 12, fontWeight: 600 }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 13, color: P.muted, margin: "0 0 10px" }}>Average rating trend over 6 months</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 12, flexWrap: "wrap" }}>
              {ratingTrend.map(({ month, avg }) => (
                <div key={month} style={{ textAlign: "center", minWidth: 34 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: P.text, margin: "0 0 3px" }}>{avg}</p>
                  <p style={{ fontSize: 11, color: P.muted, margin: 0 }}>{month}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
