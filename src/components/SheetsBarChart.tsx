"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

type Props = { data: { month: string; receita: number; custo: number }[] };

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(15,23,42,0.95)", border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 10, padding: "10px 14px", backdropFilter: "blur(20px)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    }}>
      <p style={{ fontSize: 10, color: "rgba(156,163,175,0.7)", marginBottom: 6, letterSpacing: "0.06em" }}>{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <div style={{ width: 8, height: 3, borderRadius: 2, background: entry.fill }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{entry.name}:</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#ffffff" }}>
            {entry.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function SheetsBarChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -10 }} barGap={4}>
        <defs>
          <linearGradient id="grad-receita" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity={1} />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.5} />
          </linearGradient>
          <linearGradient id="grad-custo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d946ef" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#d946ef" stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 10, fill: "rgba(156,163,175,0.6)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: "rgba(156,163,175,0.6)" }} axisLine={false} tickLine={false}
          tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
        <Bar dataKey="receita" name="Receita" fill="url(#grad-receita)" radius={[4, 4, 0, 0]}
          isAnimationActive animationDuration={1200} animationEasing="ease-out" />
        <Bar dataKey="custo" name="Custo" fill="url(#grad-custo)" radius={[4, 4, 0, 0]}
          isAnimationActive animationDuration={1400} animationEasing="ease-out" />
      </BarChart>
    </ResponsiveContainer>
  );
}
