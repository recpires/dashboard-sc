"use client";

import dynamic from "next/dynamic";
import { useBreakpoint } from "@/lib/useBreakpoint";
import SheetsConnector from "@/components/SheetsConnector";
import { sheetsBarData } from "@/lib/mockData";

const SheetsBarChart = dynamic(() => import("@/components/SheetsBarChart"), { ssr: false });

export default function SheetsView() {
  const { isMobile } = useBreakpoint();
  const pad = isMobile ? "16px 14px 24px" : "20px 24px 28px";

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: pad, display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#34d399", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 20, padding: "3px 10px" }}>
              Planilhas
            </span>
          </div>
          <h1 style={{ fontSize: isMobile ? 20 : 26, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em", marginTop: 8 }}>
            Google Sheets
          </h1>
          <p style={{ fontSize: 12, color: "rgba(156,163,175,0.6)", marginTop: 4 }}>
            Controle de despesas em tempo real · SOCIEDADE WILIAN TI.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 20, padding: "6px 14px" }}>
          <div className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399" }} />
          <span style={{ fontSize: 11, color: "#34d399", fontWeight: 600 }}>Sincronizado · 30s</span>
        </div>
      </div>

      {/* Full live connector */}
      <SheetsConnector />

      {/* Histórico de gastos mensais — bar chart expandido */}
      <div className="glass-card animate-fade-up" style={{ padding: isMobile ? "16px 14px" : "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#ffffff" }}>Histórico de Gastos por Mês</div>
          <div style={{ fontSize: 10, color: "rgba(156,163,175,0.6)", marginTop: 2 }}>Receita vs. Custo (dados de exemplo para projeções)</div>
        </div>
        <div style={{ height: 280 }}>
          <SheetsBarChart data={sheetsBarData} />
        </div>
      </div>

      {/* Info card */}
      <div className="glass-card" style={{ padding: "18px 20px", display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#ffffff", marginBottom: 4 }}>Integração ativa via Google Sheets API</div>
          <div style={{ fontSize: 11, color: "rgba(156,163,175,0.7)", lineHeight: 1.6 }}>
            Os dados são lidos diretamente da aba <strong style={{ color: "#06b6d4" }}>Despesas</strong> da planilha{" "}
            <strong style={{ color: "#ffffff" }}>CONTROLE DE DESPESAS</strong>. Qualquer alteração na planilha reflete aqui em até 30 segundos.
          </div>
        </div>
      </div>
    </main>
  );
}
