"use client";

import { useEffect, useState } from "react";
import { parseExpenses, formatBRL, type Expense } from "@/lib/parseExpenses";

const conditionStyle: Record<string, React.CSSProperties> = {
  MENSAL:  { background: "rgba(6,182,212,0.12)",  border: "1px solid rgba(6,182,212,0.25)",  color: "#06b6d4" },
  ANUAL:   { background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)", color: "#8b5cf6" },
  IOF:     { background: "rgba(156,163,175,0.08)",border: "1px solid rgba(156,163,175,0.2)", color: "#9ca3af" },
  ÚNICA:   { background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)", color: "#f59e0b" },
};

function badge(condition: string) {
  const s = conditionStyle[condition.toUpperCase()] ?? conditionStyle["IOF"];
  return (
    <span style={{ padding: "2px 8px", borderRadius: 20, fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", whiteSpace: "nowrap", ...s }}>
      {condition.toUpperCase()}
    </span>
  );
}

export default function SheetsTable({ data: staticData }: { data?: unknown[] }) {
  const [rows, setRows] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sheets/data?range=Despesas!A2:E1000")
      .then((r) => r.json())
      .then((json) => {
        if (json.rows?.length) setRows(parseExpenses(json.rows));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} style={{ height: 36, borderRadius: 8, background: "rgba(255,255,255,0.04)", animation: "pulse 1.5s ease-in-out infinite" }} />
      ))}
    </div>
  );

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>
            {["Descrição", "Pagamento", "Condição", "Data", "Valor"].map((h) => (
              <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "rgba(156,163,175,0.7)", fontSize: 10, letterSpacing: "0.07em", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.06)", whiteSpace: "nowrap" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, 8).map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
              <td style={{ padding: "10px 12px", color: "#ffffff", fontWeight: 500, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {row.description}
              </td>
              <td style={{ padding: "10px 12px", color: "rgba(156,163,175,0.7)", whiteSpace: "nowrap" }}>
                {row.payment || "—"}
              </td>
              <td style={{ padding: "10px 12px" }}>
                {badge(row.condition || "—")}
              </td>
              <td style={{ padding: "10px 12px", color: "rgba(156,163,175,0.6)", whiteSpace: "nowrap", fontSize: 11 }}>
                {row.date || "—"}
              </td>
              <td style={{ padding: "10px 12px", color: "#34d399", fontWeight: 700, whiteSpace: "nowrap" }}>
                {formatBRL(row.value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
