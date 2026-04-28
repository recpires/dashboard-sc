"use client";

import { useEffect, useState } from "react";
import { useSheetData } from "@/lib/useSheetData";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { parseExpenses, byCategory, byMonth, totalGasto, monthlyFixed, formatBRL, type Expense } from "@/lib/parseExpenses";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, LineChart, Line, CartesianGrid } from "recharts";

const COLORS = ["#06b6d4", "#d946ef", "#34d399", "#f59e0b", "#8b5cf6", "#f97316", "#ec4899", "#10b981"];

const GlassTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "rgba(15,23,42,0.97)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 14px", backdropFilter: "blur(20px)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
      <p style={{ fontSize: 10, color: "rgba(156,163,175,0.7)", marginBottom: 5 }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} style={{ fontSize: 13, fontWeight: 700, color: p.fill ?? p.stroke ?? "#06b6d4" }}>{formatBRL(p.value)}</div>
      ))}
    </div>
  );
};

function Chip({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ flex: 1, minWidth: 0, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "10px 12px" }}>
      <div style={{ fontSize: 9, color: "rgba(156,163,175,0.6)", marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 800, color, letterSpacing: "-0.02em", textShadow: `0 0 14px ${color}55`, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
    </div>
  );
}

export default function SheetsConnector() {
  const { rows, loading, error } = useSheetData("Despesas!A2:E1000");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { isMobile, isSmall } = useBreakpoint();

  useEffect(() => {
    if (!rows.length) return;
    setExpenses(parseExpenses(rows));
  }, [rows]);

  if (loading) return (
    <div className="glass-card" style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: 10 }}>
      <div className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "#06b6d4" }} />
      <span style={{ fontSize: 12, color: "rgba(156,163,175,0.7)" }}>Carregando despesas…</span>
    </div>
  );

  if (error?.includes("CREDENTIALS_NOT_CONFIGURED")) return (
    <div className="glass-card" style={{ padding: "18px 20px" }}>
      <div style={{ fontSize: 12, color: "#fbbf24" }}>⚠ Configure GOOGLE_SHEETS_API_KEY em .env.local</div>
    </div>
  );

  if (error) return (
    <div className="glass-card" style={{ padding: "18px 20px" }}>
      <div style={{ fontSize: 12, color: "#f87171" }}>Erro Sheets: {error}</div>
    </div>
  );

  const total = totalGasto(expenses);
  const mensal = monthlyFixed(expenses);
  const cats = byCategory(expenses);
  const monthly = byMonth(expenses);

  const chartHeight = isMobile ? 160 : 180;

  return (
    <div className="glass-card animate-fade-up" style={{ padding: isMobile ? "16px 14px" : "20px 22px", display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#34d399", flexShrink: 0 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" />
              <line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" />
            </svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Controle de Despesas</div>
            <div style={{ fontSize: 10, color: "rgba(156,163,175,0.6)", marginTop: 1 }}>{expenses.length} lançamentos · Google Sheets</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 20, padding: "3px 8px", flexShrink: 0 }}>
          <div className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399" }} />
          <span style={{ fontSize: 9, color: "#34d399", fontWeight: 600 }}>LIVE</span>
        </div>
      </div>

      {/* KPI chips — 2x2 on mobile */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 10 }}>
        <Chip label="Total Gasto" value={formatBRL(total)} color="#06b6d4" />
        <Chip label="Fixo Mensal" value={formatBRL(mensal)} color="#d946ef" />
        <Chip label="Maior Gasto" value={cats[0]?.name ?? "—"} color="#f59e0b" />
        <Chip label="Ferramentas" value={`${cats.length}`} color="#34d399" />
      </div>

      {/* Charts — stack on mobile */}
      <div style={{ display: "grid", gridTemplateColumns: isSmall ? "1fr" : "1.2fr 1fr", gap: 16 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(156,163,175,0.6)", marginBottom: 10, letterSpacing: "0.06em" }}>GASTOS POR FERRAMENTA</div>
          <div style={{ height: chartHeight }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cats} margin={{ top: 4, right: 4, bottom: 0, left: -12 }} barSize={isMobile ? 14 : 18}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 8, fill: "rgba(156,163,175,0.6)" }} axisLine={false} tickLine={false} interval={0} angle={-20} textAnchor="end" height={34} />
                <YAxis tick={{ fontSize: 8, fill: "rgba(156,163,175,0.5)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<GlassTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={1200}>
                  {cats.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} style={{ filter: `drop-shadow(0 0 5px ${COLORS[i % COLORS.length]}55)` }} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(156,163,175,0.6)", marginBottom: 10, letterSpacing: "0.06em" }}>EVOLUÇÃO MENSAL</div>
          <div style={{ height: chartHeight }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly} margin={{ top: 4, right: 4, bottom: 0, left: -12 }}>
                <defs>
                  <filter id="glow-exp"><feGaussianBlur stdDeviation="2.5" result="cb" /><feMerge><feMergeNode in="cb" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 8, fill: "rgba(156,163,175,0.6)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 8, fill: "rgba(156,163,175,0.5)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<GlassTooltip />} />
                <Line type="monotone" dataKey="value" stroke="#d946ef" strokeWidth={2.5}
                  dot={{ r: 3, fill: "#d946ef", stroke: "rgba(15,23,42,0.8)", strokeWidth: 2 }}
                  activeDot={{ r: 5, fill: "#d946ef", stroke: "rgba(217,70,239,0.4)", strokeWidth: 3 }}
                  filter="url(#glow-exp)" isAnimationActive animationDuration={1400} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(156,163,175,0.6)", marginBottom: 8, letterSpacing: "0.06em" }}>LANÇAMENTOS RECENTES</div>
        <div style={{ overflowX: "auto", maxHeight: 200, overflowY: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, minWidth: isMobile ? 500 : "unset" }}>
            <thead>
              <tr>
                {["Data", "Descrição", "Pagamento", "Condição", "Valor"].map((h) => (
                  <th key={h} style={{ padding: "6px 10px", textAlign: "left", fontWeight: 600, whiteSpace: "nowrap", color: "rgba(156,163,175,0.6)", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "sticky", top: 0, background: "rgba(15,23,42,0.95)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...expenses].reverse().map((e, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  onMouseEnter={(ev) => (ev.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                  onMouseLeave={(ev) => (ev.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "7px 10px", color: "rgba(156,163,175,0.7)", whiteSpace: "nowrap" }}>{e.date}</td>
                  <td style={{ padding: "7px 10px", color: "#ffffff", fontWeight: 600, whiteSpace: "nowrap" }}>{e.description || <span style={{ color: "rgba(156,163,175,0.4)" }}>—</span>}</td>
                  <td style={{ padding: "7px 10px", color: "rgba(156,163,175,0.6)", whiteSpace: "nowrap", maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis" }}>{e.payment}</td>
                  <td style={{ padding: "7px 10px", whiteSpace: "nowrap" }}>
                    {e.condition ? (
                      <span style={{
                        fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 20, letterSpacing: "0.05em",
                        background: e.condition === "MENSAL" ? "rgba(6,182,212,0.12)" : e.condition === "ANUAL" ? "rgba(139,92,246,0.12)" : e.condition === "IOF" ? "rgba(156,163,175,0.08)" : "rgba(245,158,11,0.12)",
                        border: `1px solid ${e.condition === "MENSAL" ? "rgba(6,182,212,0.25)" : e.condition === "ANUAL" ? "rgba(139,92,246,0.25)" : e.condition === "IOF" ? "rgba(156,163,175,0.15)" : "rgba(245,158,11,0.25)"}`,
                        color: e.condition === "MENSAL" ? "#06b6d4" : e.condition === "ANUAL" ? "#8b5cf6" : e.condition === "IOF" ? "#9ca3af" : "#f59e0b",
                      }}>
                        {e.condition}
                      </span>
                    ) : <span style={{ color: "rgba(156,163,175,0.3)" }}>—</span>}
                  </td>
                  <td style={{ padding: "7px 10px", color: "#34d399", fontWeight: 700, whiteSpace: "nowrap", textAlign: "right" }}>{formatBRL(e.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
