"use client";

const InstagramIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

type Post = {
  id: string;
  date: string;
  day: string;
  time: string;
  caption: string;
  type: string;
  status: "scheduled" | "published" | "draft";
  gradient: string;
};

const statusConfig = {
  scheduled: { label: "Agendado", className: "tag-scheduled" },
  published: { label: "Publicado", className: "tag-published" },
  draft: { label: "Rascunho", className: "tag-draft" },
};

const typeColors: Record<string, string> = {
  Carrossel: "#8b5cf6",
  Reels: "#f97316",
  Story: "#06b6d4",
  Feed: "#d946ef",
};

export default function InstagramCalendar({ posts }: { posts: Post[] }) {
  return (
    <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 6, paddingTop: 2 }}>
      {posts.map((post, i) => (
        <div
          key={post.id}
          className="glass-card glass-card-hover animate-fade-up"
          style={{
            flexShrink: 0,
            width: 190,
            display: "flex",
            flexDirection: "column",
            gap: 0,
            overflow: "hidden",
            animationDelay: `${i * 80}ms`,
            cursor: "pointer",
          }}
        >
          {/* Thumbnail */}
          <div style={{
            height: 100, background: post.gradient,
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", flexShrink: 0,
          }}>
            {/* Type badge */}
            <span style={{
              position: "absolute", top: 8, left: 8,
              fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 20,
              background: "rgba(0,0,0,0.5)", color: "#ffffff",
              letterSpacing: "0.07em", backdropFilter: "blur(8px)",
              border: `1px solid ${typeColors[post.type] || "rgba(255,255,255,0.2)"}40`,
            }}>
              {post.type.toUpperCase()}
            </span>

            {/* Instagram watermark */}
            <div style={{
              position: "absolute", top: 8, right: 8,
              width: 24, height: 24, borderRadius: "50%",
              background: "rgba(0,0,0,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)",
            }}>
              <InstagramIcon />
            </div>

            {/* Center photo icon */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.25">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.75" fill="rgba(255,255,255,0.4)" stroke="none" />
            </svg>
          </div>

          {/* Content */}
          <div style={{ padding: "12px 13px", display: "flex", flexDirection: "column", gap: 8 }}>
            {/* Date row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#ffffff" }}>{post.day}</span>
                <span style={{ fontSize: 10, color: "rgba(156,163,175,0.6)" }}>{post.date}</span>
              </div>
              <span style={{ fontSize: 10, color: "rgba(156,163,175,0.5)" }}>{post.time}</span>
            </div>

            {/* Caption */}
            <p style={{
              fontSize: 11, color: "rgba(255,255,255,0.75)", lineHeight: 1.5,
              display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {post.caption}
            </p>

            {/* Status tag */}
            <div>
              <span
                className={statusConfig[post.status].className}
                style={{ fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 20, letterSpacing: "0.07em" }}
              >
                {statusConfig[post.status].label.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
