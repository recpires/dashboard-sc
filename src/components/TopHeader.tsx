"use client";

import { useState, useEffect } from "react";
import { useBreakpoint } from "@/lib/useBreakpoint";

const CalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" />
  </svg>
);
const BellIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const PERIODS = ["Hoje", "7 dias", "30 dias", "90 dias", "Este Mês"];

export default function TopHeader() {
  const [period, setPeriod] = useState("30 dias");
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);
  const { isMobile, isSmall } = useBreakpoint();

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Bom dia"; if (h < 18) return "Boa tarde"; return "Boa noite";
  };

  return (
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: isMobile ? "0 14px 0 62px" : "0 28px",
      height: 56,
      background: "rgba(255,255,255,0.02)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      flexShrink: 0, position: "sticky", top: 0, zIndex: 20,
      gap: 10,
    }}>
      {/* Left: Brand + Greeting */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
        <span style={{
          fontSize: isMobile ? 15 : 17, fontWeight: 800, letterSpacing: "-0.03em", whiteSpace: "nowrap",
          background: "linear-gradient(90deg, #06b6d4, #d946ef)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          SynapseCode
        </span>
        {!isMobile && (
          <span style={{ fontSize: 10, color: "rgba(156,163,175,0.55)", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
            {greeting()}, Rodrigo Pires{" "}
            <span style={{ color: "rgba(217,70,239,0.7)" }}>✦</span>
          </span>
        )}
      </div>

      {/* Center: Live clock — hide on mobile */}
      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "5px 14px", flexShrink: 0 }}>
          <span style={{ fontSize: 10, color: "rgba(156,163,175,0.6)", letterSpacing: "0.04em" }}>LIVE</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#06b6d4", fontVariantNumeric: "tabular-nums", letterSpacing: "0.05em" }}>{time}</span>
        </div>
      )}

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 6 : 10, flexShrink: 0 }}>

        {/* Period selector — compact on mobile */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setOpen(!open)}
            style={{
              display: "flex", alignItems: "center", gap: 5,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8, padding: isMobile ? "5px 9px" : "6px 14px",
              color: "#ffffff", fontSize: 11, fontWeight: 500, cursor: "pointer",
              transition: "all 300ms cubic-bezier(0.32,0.72,0,1)",
            }}>
            <CalIcon />
            {!isMobile && <span>{period}</span>}
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 300ms", color: "rgba(156,163,175,0.6)" }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {open && (
            <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "rgba(15,23,42,0.97)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, overflow: "hidden", zIndex: 100, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: "0 16px 48px rgba(0,0,0,0.5)", minWidth: 130 }}>
              {PERIODS.map((p) => (
                <button key={p} onClick={() => { setPeriod(p); setOpen(false); }}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 16px", fontSize: 12, fontWeight: p === period ? 600 : 400, color: p === period ? "#06b6d4" : "rgba(255,255,255,0.7)", background: p === period ? "rgba(6,182,212,0.08)" : "transparent", border: "none", cursor: "pointer" }}
                  onMouseEnter={(e) => { if (p !== period) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={(e) => { if (p !== period) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >{p}</button>
              ))}
            </div>
          )}
        </div>

        {/* Sync dot */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 20, padding: isMobile ? "4px 8px" : "5px 12px" }}>
          <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", flexShrink: 0 }} />
          {!isMobile && <span style={{ fontSize: 10, color: "#34d399", fontWeight: 500, letterSpacing: "0.04em" }}>Sincronizado</span>}
        </div>

        {/* Bell — hide on mobile */}
        {!isMobile && (
          <button style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(156,163,175,0.7)", cursor: "pointer", position: "relative" }}>
            <BellIcon />
            <span style={{ position: "absolute", top: 7, right: 8, width: 6, height: 6, borderRadius: "50%", background: "#d946ef", boxShadow: "0 0 6px rgba(217,70,239,0.6)" }} />
          </button>
        )}

        {/* Avatar */}
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#06b6d4,#d946ef)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff", cursor: "pointer", boxShadow: "0 0 10px rgba(6,182,212,0.3)", flexShrink: 0 }}>
          RP
        </div>
      </div>
    </header>
  );
}
