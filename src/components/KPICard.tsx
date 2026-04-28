"use client";

import { SparklineChart } from "./SparklineChart";

type KPICardProps = {
  title: string;
  value: string;
  change: string;
  changePositive: boolean;
  icon: React.ReactNode;
  accentColor: string;
  sparkData: number[];
  delay?: number;
};

export default function KPICard({
  title, value, change, changePositive, icon, accentColor, sparkData, delay = 0
}: KPICardProps) {
  return (
    <div
      className="glass-card glass-card-hover animate-fade-up"
      style={{
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        animationDelay: `${delay}ms`,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow blob */}
      <div style={{
        position: "absolute", top: -20, right: -20,
        width: 80, height: 80, borderRadius: "50%",
        background: `radial-gradient(circle, ${accentColor}25 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Top row: icon + change badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: `${accentColor}18`,
          border: `1px solid ${accentColor}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: accentColor,
          boxShadow: `0 0 12px ${accentColor}20`,
        }}>
          {icon}
        </div>
        <span style={{
          fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20,
          background: changePositive ? "rgba(52,211,153,0.12)" : "rgba(248,113,113,0.12)",
          border: `1px solid ${changePositive ? "rgba(52,211,153,0.25)" : "rgba(248,113,113,0.25)"}`,
          color: changePositive ? "#34d399" : "#f87171",
          letterSpacing: "0.02em",
        }}>
          {changePositive ? "▲" : "▼"} {change}
        </span>
      </div>

      {/* Value + title */}
      <div>
        <div style={{ fontSize: 26, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ fontSize: 11, color: "rgba(156,163,175,0.8)", marginTop: 5, fontWeight: 500, letterSpacing: "0.03em" }}>
          {title}
        </div>
      </div>

      {/* Sparkline */}
      <div style={{ height: 44, marginTop: 2 }}>
        <SparklineChart data={sparkData} color={accentColor} />
      </div>
    </div>
  );
}
