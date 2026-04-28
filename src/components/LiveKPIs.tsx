"use client";

import { useEffect, useState } from "react";
import { useSheetData } from "@/lib/useSheetData";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { parseExpenses, totalGasto, monthlyFixed, byCategory, formatBRL } from "@/lib/parseExpenses";
import { SparklineChart } from "./SparklineChart";

const SPARK_TOTAL  = [28, 32, 39, 35, 28, 32, 39, 45, 42, 52, 58, 62];
const SPARK_MENSAL = [8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15];
const SPARK_TOOLS  = [3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
const SPARK_MAIOR  = [10, 15, 12, 18, 14, 20, 16, 22, 18, 24, 20, 26];

const WalletIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" /><circle cx="17" cy="13" r="1" fill="currentColor" />
  </svg>
);
const CalIcon2 = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" />
  </svg>
);
const ToolIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
const TopIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);

function KPICard({ title, value, sub, icon, accentColor, sparkData, delay = 0 }: {
  title: string; value: string; sub: string; icon: React.ReactNode;
  accentColor: string; sparkData: number[]; delay?: number;
}) {
  return (
    <div className="glass-card glass-card-hover animate-fade-up"
      style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 12, animationDelay: `${delay}ms`, cursor: "pointer", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: -20, right: -20, width: 70, height: 70, borderRadius: "50%", background: `radial-gradient(circle, ${accentColor}22 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: `${accentColor}18`, border: `1px solid ${accentColor}30`, display: "flex", alignItems: "center", justifyContent: "center", color: accentColor, boxShadow: `0 0 10px ${accentColor}18` }}>
          {icon}
        </div>
        <span style={{ fontSize: 9, color: "rgba(156,163,175,0.5)", letterSpacing: "0.04em", textAlign: "right", maxWidth: 80, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub}</span>
      </div>
      <div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1, wordBreak: "break-word" }}>{value}</div>
        <div style={{ fontSize: 10, color: "rgba(156,163,175,0.75)", marginTop: 4, fontWeight: 500 }}>{title}</div>
      </div>
      <div style={{ height: 38, marginTop: 2 }}>
        <SparklineChart data={sparkData} color={accentColor} />
      </div>
    </div>
  );
}

type KPIData = { total: number; mensal: number; tools: number; biggest: string; biggestVal: number };

export default function LiveKPIs() {
  const { rows, loading } = useSheetData("Despesas!A2:E1000");
  const [kpi, setKpi] = useState<KPIData | null>(null);
  const { isSmall } = useBreakpoint();

  useEffect(() => {
    if (!rows.length) return;
    const expenses = parseExpenses(rows);
    const cats = byCategory(expenses);
    setKpi({ total: totalGasto(expenses), mensal: monthlyFixed(expenses), tools: cats.length, biggest: cats[0]?.name ?? "—", biggestVal: cats[0]?.value ?? 0 });
  }, [rows]);

  const cols = isSmall ? "repeat(2, 1fr)" : "repeat(4, 1fr)";

  if (loading || !kpi) return (
    <div style={{ display: "grid", gridTemplateColumns: cols, gap: 12 }}>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="glass-card" style={{ height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#06b6d4" }} />
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: cols, gap: 12 }}>
      <KPICard title="Total de Despesas" value={formatBRL(kpi.total)} sub="Sheets ao vivo" icon={<WalletIcon />} accentColor="#06b6d4" sparkData={SPARK_TOTAL} delay={0} />
      <KPICard title="Fixo Mensal" value={formatBRL(kpi.mensal)} sub="recorrente" icon={<CalIcon2 />} accentColor="#d946ef" sparkData={SPARK_MENSAL} delay={80} />
      <KPICard title="Maior Categoria" value={kpi.biggest} sub={formatBRL(kpi.biggestVal)} icon={<TopIcon />} accentColor="#f59e0b" sparkData={SPARK_MAIOR} delay={160} />
      <KPICard title="Ferramentas Ativas" value={`${kpi.tools}`} sub="categorias" icon={<ToolIcon />} accentColor="#34d399" sparkData={SPARK_TOOLS} delay={240} />
    </div>
  );
}
