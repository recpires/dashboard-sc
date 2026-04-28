"use client";

import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ReferenceLine,
} from "recharts";

type Props = { data: { day: string; clicks: number; conversions: number }[] };

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
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: entry.color, boxShadow: `0 0 6px ${entry.color}` }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{entry.name}:</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: entry.color }}>{entry.value.toLocaleString("pt-BR")}</span>
        </div>
      ))}
    </div>
  );
};

export default function AdsLineChart({ data }: Props) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -10 }}>
          <defs>
            <filter id="glow-cyan">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glow-magenta">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis
            dataKey="day" tick={{ fontSize: 10, fill: "rgba(156,163,175,0.6)" }}
            axisLine={false} tickLine={false}
          />
          <YAxis tick={{ fontSize: 10, fill: "rgba(156,163,175,0.6)" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 11, color: "rgba(156,163,175,0.8)", paddingTop: 8 }}
            iconType="circle" iconSize={7}
          />
          <Line
            type="monotone" dataKey="clicks" name="Cliques"
            stroke="#06b6d4" strokeWidth={2.5}
            dot={{ r: 3, fill: "#06b6d4", stroke: "rgba(15,23,42,0.8)", strokeWidth: 2 }}
            activeDot={{ r: 5, fill: "#06b6d4", stroke: "rgba(6,182,212,0.4)", strokeWidth: 3 }}
            filter="url(#glow-cyan)"
            isAnimationActive animationDuration={1400} animationEasing="ease-out"
          />
          <Line
            type="monotone" dataKey="conversions" name="Conversões"
            stroke="#d946ef" strokeWidth={2.5}
            dot={{ r: 3, fill: "#d946ef", stroke: "rgba(15,23,42,0.8)", strokeWidth: 2 }}
            activeDot={{ r: 5, fill: "#d946ef", stroke: "rgba(217,70,239,0.4)", strokeWidth: 3 }}
            filter="url(#glow-magenta)"
            isAnimationActive animationDuration={1600} animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
