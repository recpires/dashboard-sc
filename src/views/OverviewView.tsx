"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useBreakpoint } from "@/lib/useBreakpoint";
import LiveKPIs from "@/components/LiveKPIs";
import SheetsConnector from "@/components/SheetsConnector";
import SheetsTable from "@/components/SheetsTable";
import InstagramCalendar from "@/components/InstagramCalendar";
import { adsLineData, sheetsBarData, sheetsTableData, instagramPosts } from "@/lib/mockData";

const AdsLineChart = dynamic(() => import("@/components/AdsLineChart"), { ssr: false });
const SheetsBarChart = dynamic(() => import("@/components/SheetsBarChart"), { ssr: false });

type Section = "tabela" | "grafico";

const IGIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export default function OverviewView() {
  const { isMobile, isSmall } = useBreakpoint();
  const [activeSection, setActiveSection] = useState<Section>("tabela");
  const pad = isMobile ? "16px 14px 24px" : "20px 24px 28px";
  const gap = isMobile ? 14 : 18;

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: pad, display: "flex", flexDirection: "column", gap }}>
      {/* Label */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#06b6d4", background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 20, padding: "3px 10px" }}>
          Visão Geral
        </span>
        {!isMobile && <span style={{ fontSize: 11, color: "rgba(156,163,175,0.5)" }}>Abril 2026 — dados em tempo real</span>}
      </div>

      {/* KPIs */}
      <LiveKPIs />

      {/* Bento Grid */}
      <div style={{ display: "grid", gridTemplateColumns: isSmall ? "1fr" : "1fr 1.15fr", gap: isMobile ? 14 : 16 }}>
        {/* Sheets */}
        <div className="glass-card animate-fade-up" style={{ padding: isMobile ? "14px" : "20px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#ffffff" }}>Planilhas — Google Sheets</div>
              <div style={{ fontSize: 10, color: "rgba(156,163,175,0.6)", marginTop: 2 }}>Performance por campanha</div>
            </div>
            <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 3, flexShrink: 0 }}>
              {(["tabela", "grafico"] as Section[]).map((s) => (
                <button key={s} onClick={() => setActiveSection(s)}
                  style={{ fontSize: 10, fontWeight: 600, padding: "4px 10px", borderRadius: 6, cursor: "pointer", transition: "all 300ms cubic-bezier(0.32,0.72,0,1)", background: activeSection === s ? "rgba(6,182,212,0.2)" : "transparent", color: activeSection === s ? "#06b6d4" : "rgba(156,163,175,0.6)", border: activeSection === s ? "1px solid rgba(6,182,212,0.3)" : "1px solid transparent" } as React.CSSProperties}>
                  {s === "tabela" ? "Tabela" : "Gráfico"}
                </button>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minHeight: 200, overflowX: "auto" }}>
            {activeSection === "tabela" ? <SheetsTable data={sheetsTableData} /> : <div style={{ height: 220 }}><SheetsBarChart data={sheetsBarData} /></div>}
          </div>
        </div>

        {/* Ads */}
        <div className="glass-card animate-fade-up" style={{ padding: isMobile ? "14px" : "20px 22px", display: "flex", flexDirection: "column", gap: 14, animationDelay: "80ms" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#ffffff" }}>Google Ads — Performance</div>
              <div style={{ fontSize: 10, color: "rgba(156,163,175,0.6)", marginTop: 2 }}>Cliques vs. Conversões · Abril 2026</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {[{ color: "#06b6d4", label: "Cliques" }, { color: "#d946ef", label: "Conversões" }].map(({ color, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 18, height: 2, borderRadius: 1, background: color, boxShadow: `0 0 5px ${color}` }} />
                  <span style={{ fontSize: 10, color: "rgba(156,163,175,0.7)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[{ label: "CTR Médio", value: "3.8%", color: "#06b6d4" }, { label: "CPC Médio", value: "R$ 1.24", color: "#d946ef" }, { label: "Conv. Rate", value: "9.6%", color: "#34d399" }].map((s) => (
              <div key={s.label} style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "8px 10px" }}>
                <div style={{ fontSize: 9, color: "rgba(156,163,175,0.6)", marginBottom: 3 }}>{s.label}</div>
                <div style={{ fontSize: isMobile ? 13 : 15, fontWeight: 800, color: s.color, letterSpacing: "-0.02em" }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ flex: 1, minHeight: 150 }}><AdsLineChart data={adsLineData} /></div>
        </div>
      </div>

      {/* Expenses */}
      <SheetsConnector />

      {/* Instagram */}
      <div className="glass-card animate-fade-up" style={{ padding: isMobile ? "14px" : "20px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, #f97316, #d946ef, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><IGIcon /></div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Calendário Editorial — Instagram</div>
              <div style={{ fontSize: 10, color: "rgba(156,163,175,0.6)", marginTop: 2 }}>Próximas publicações agendadas</div>
            </div>
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, background: "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(217,70,239,0.15))", border: "1px solid rgba(6,182,212,0.3)", color: "#06b6d4", fontSize: 11, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            {!isMobile && "Novo Post"}
          </button>
        </div>
        <InstagramCalendar posts={instagramPosts} />
      </div>
    </main>
  );
}
