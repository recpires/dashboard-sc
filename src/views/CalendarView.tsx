"use client";

import { useState } from "react";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { instagramPosts } from "@/lib/mockData";

type Post = typeof instagramPosts[number];

const statusConfig = {
  scheduled: { label: "Agendado", color: "#06b6d4", bg: "rgba(6,182,212,0.12)", border: "rgba(6,182,212,0.3)" },
  published: { label: "Publicado", color: "#34d399", bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.3)" },
  draft: { label: "Rascunho", color: "#9ca3af", bg: "rgba(156,163,175,0.08)", border: "rgba(156,163,175,0.2)" },
};

const typeColors: Record<string, string> = {
  Carrossel: "#8b5cf6", Reels: "#f97316", Story: "#06b6d4", Feed: "#d946ef",
};

const IGIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

function PostCard({ post }: { post: Post }) {
  const st = statusConfig[post.status];
  return (
    <div className="glass-card glass-card-hover animate-fade-up" style={{ display: "flex", flexDirection: "column", overflow: "hidden", cursor: "pointer" }}>
      {/* Thumbnail */}
      <div style={{ height: 120, background: post.gradient, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ position: "absolute", top: 8, left: 8, fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 20, background: "rgba(0,0,0,0.5)", color: "#fff", letterSpacing: "0.07em", backdropFilter: "blur(8px)", border: `1px solid ${typeColors[post.type] ?? "rgba(255,255,255,0.2)"}40` }}>
          {post.type.toUpperCase()}
        </span>
        <div style={{ position: "absolute", top: 8, right: 8, width: 26, height: 26, borderRadius: "50%", background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}>
          <IGIcon />
        </div>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.25">
          <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.75" fill="rgba(255,255,255,0.35)" stroke="none" />
        </svg>
      </div>
      {/* Content */}
      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#ffffff" }}>{post.day}</span>
            <span style={{ fontSize: 10, color: "rgba(156,163,175,0.6)" }}>{post.date}</span>
          </div>
          <span style={{ fontSize: 10, color: "rgba(156,163,175,0.5)" }}>{post.time}</span>
        </div>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {post.caption}
        </p>
        <span style={{ fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 20, letterSpacing: "0.07em", alignSelf: "flex-start", background: st.bg, border: `1px solid ${st.border}`, color: st.color }}>
          {st.label.toUpperCase()}
        </span>
      </div>
    </div>
  );
}

const FILTERS = ["Todos", "Agendado", "Publicado", "Rascunho"];
const filterMap: Record<string, Post["status"] | null> = {
  Todos: null, Agendado: "scheduled", Publicado: "published", Rascunho: "draft",
};

export default function CalendarView() {
  const { isMobile, isSmall } = useBreakpoint();
  const [filter, setFilter] = useState("Todos");
  const pad = isMobile ? "16px 14px 24px" : "20px 24px 28px";

  const filtered = filter === "Todos"
    ? instagramPosts
    : instagramPosts.filter((p) => p.status === filterMap[filter]);

  const stats = {
    total: instagramPosts.length,
    scheduled: instagramPosts.filter((p) => p.status === "scheduled").length,
    published: instagramPosts.filter((p) => p.status === "published").length,
    draft: instagramPosts.filter((p) => p.status === "draft").length,
  };

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: pad, display: "flex", flexDirection: "column", gap: 18 }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#d946ef", background: "rgba(217,70,239,0.1)", border: "1px solid rgba(217,70,239,0.2)", borderRadius: 20, padding: "3px 10px" }}>
            Calendário Instagram
          </span>
          <h1 style={{ fontSize: isMobile ? 20 : 26, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em", marginTop: 8 }}>
            Editorial — Instagram
          </h1>
          <p style={{ fontSize: 12, color: "rgba(156,163,175,0.6)", marginTop: 4 }}>Gestão de publicações e agendamentos</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 10, background: "linear-gradient(135deg, #06b6d4, #d946ef)", color: "#ffffff", fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 0 20px rgba(6,182,212,0.3)", transition: "all 300ms cubic-bezier(0.32,0.72,0,1)" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Novo Post
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {[
          { label: "Total Posts", value: stats.total, color: "#06b6d4" },
          { label: "Agendados", value: stats.scheduled, color: "#06b6d4" },
          { label: "Publicados", value: stats.published, color: "#34d399" },
          { label: "Rascunhos", value: stats.draft, color: "#9ca3af" },
        ].map((s) => (
          <div key={s.label} className="glass-card" style={{ padding: "14px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.color, letterSpacing: "-0.03em" }}>{s.value}</div>
            <div style={{ fontSize: 10, color: "rgba(156,163,175,0.6)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ fontSize: 11, fontWeight: 600, padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", transition: "all 300ms cubic-bezier(0.32,0.72,0,1)", background: filter === f ? "linear-gradient(135deg,rgba(6,182,212,0.25),rgba(217,70,239,0.15))" : "rgba(255,255,255,0.04)", color: filter === f ? "#06b6d4" : "rgba(156,163,175,0.7)", outline: filter === f ? "1px solid rgba(6,182,212,0.35)" : "1px solid rgba(255,255,255,0.07)" }}>
            {f}
          </button>
        ))}
      </div>

      {/* Posts grid */}
      <div style={{ display: "grid", gridTemplateColumns: isSmall ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: 14 }}>
        {filtered.map((post) => <PostCard key={post.id} post={post} />)}
      </div>

      {/* Horizontal timeline */}
      <div className="glass-card animate-fade-up" style={{ padding: isMobile ? "16px 14px" : "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#ffffff" }}>Timeline da Semana</div>
        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 4 }}>
          {["Seg 28", "Ter 29", "Qua 30", "Qui 01", "Sex 02", "Sáb 03", "Dom 04"].map((day, i) => {
            const dayPosts = instagramPosts.filter((_, idx) => idx % 7 === i);
            return (
              <div key={day} style={{ flexShrink: 0, width: 100 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: i === 0 ? "#06b6d4" : "rgba(156,163,175,0.6)", marginBottom: 8, textAlign: "center", padding: "4px 0", borderBottom: `2px solid ${i === 0 ? "#06b6d4" : "rgba(255,255,255,0.08)"}` }}>{day}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {dayPosts.length > 0 ? dayPosts.map((p) => (
                    <div key={p.id} style={{ padding: "6px 8px", borderRadius: 7, background: p.gradient, fontSize: 9, fontWeight: 600, color: "#fff", cursor: "pointer" }}>
                      {p.time} · {p.type}
                    </div>
                  )) : (
                    <div style={{ height: 32, borderRadius: 7, border: "1px dashed rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 14, color: "rgba(255,255,255,0.15)" }}>+</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
