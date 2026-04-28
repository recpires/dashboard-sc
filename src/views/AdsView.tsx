"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { adsLineData } from "@/lib/mockData";

const AdsLineChart = dynamic(() => import("@/components/AdsLineChart"), { ssr: false });

type Campaign = {
  name: string; canal: string; cliques: number; conv: number;
  ctr: string; cpc: string; status: string;
};
type Metrics = {
  clicks: number; conversions: number; ctr: string;
  cpc: string; convRate: string; cost: string;
};
type ChartPoint = { day: string; clicks: number; conversions: number };

function useAdsData() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [chart, setChart] = useState<ChartPoint[]>(adsLineData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [mRes, cRes, chartRes] = await Promise.all([
          fetch("/api/ads/metrics"),
          fetch("/api/ads/campaigns"),
          fetch("/api/ads/chart"),
        ]);
        const mData = await mRes.json();
        const cData = await cRes.json();
        const chartData = await chartRes.json();

        if (mData.error || cData.error) throw new Error(mData.error ?? cData.error);

        if (mData.metrics) setMetrics(mData.metrics);
        if (cData.campaigns?.length) setCampaigns(cData.campaigns);
        if (chartData.chart?.length) setChart(chartData.chart);
      } catch (e) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { metrics, campaigns, chart, loading, error };
}

export default function AdsView() {
  const { isMobile, isSmall } = useBreakpoint();
  const pad = isMobile ? "16px 14px 24px" : "20px 24px 28px";
  const { metrics, campaigns, chart, loading, error } = useAdsData();

  const metricCards = metrics ? [
    { label: "Cliques Totais", value: metrics.clicks.toLocaleString("pt-BR"), color: "#06b6d4" },
    { label: "Conversões", value: metrics.conversions.toLocaleString("pt-BR"), color: "#d946ef" },
    { label: "CTR Médio", value: metrics.ctr, color: "#34d399" },
    { label: "CPC Médio", value: metrics.cpc, color: "#f59e0b" },
    { label: "Conv. Rate", value: metrics.convRate, color: "#8b5cf6" },
    { label: "Custo Total", value: metrics.cost, color: "#f97316" },
  ] : [
    { label: "Cliques Totais", value: "—", color: "#06b6d4" },
    { label: "Conversões", value: "—", color: "#d946ef" },
    { label: "CTR Médio", value: "—", color: "#34d399" },
    { label: "CPC Médio", value: "—", color: "#f59e0b" },
    { label: "Conv. Rate", value: "—", color: "#8b5cf6" },
    { label: "Custo Total", value: "—", color: "#f97316" },
  ];

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: pad, display: "flex", flexDirection: "column", gap: 18 }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#06b6d4", background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 20, padding: "3px 10px" }}>
            Google Ads
          </span>
          <h1 style={{ fontSize: isMobile ? 20 : 26, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em", marginTop: 8 }}>
            Performance de Campanhas
          </h1>
          <p style={{ fontSize: 12, color: "rgba(156,163,175,0.6)", marginTop: 4 }}>
            Últimos 30 dias · {loading ? "Carregando..." : error ? "Dados demonstrativos" : "Dados reais · Google Ads API"}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {!loading && !error && (
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 20, padding: "5px 12px" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399" }} />
              <span style={{ fontSize: 10, color: "#34d399", fontWeight: 600 }}>Conectado</span>
            </div>
          )}
          {["Search", "Display", "Video", "Shopping"].map((c) => (
            <span key={c} style={{ fontSize: 10, fontWeight: 500, padding: "4px 10px", borderRadius: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(156,163,175,0.7)", cursor: "pointer" }}>{c}</span>
          ))}
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div style={{ padding: "14px 16px", borderRadius: 10, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)", fontSize: 12, color: "#f59e0b", display: "flex", alignItems: "flex-start", gap: 10 }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>⏳</span>
          <div>
            {error.includes("DEVELOPER_TOKEN_NOT_APPROVED")
              ? <><strong>Developer Token aguardando aprovação.</strong> Acesse o Google Ads MCC → Ferramentas → API Center → Aplicar para Acesso Básico. Aprovação leva 1–5 dias úteis. Exibindo dados demonstrativos.</>
              : <><strong>API indisponível</strong> — exibindo dados demonstrativos. <span style={{ color: "rgba(156,163,175,0.6)", fontFamily: "monospace" }}>{error.slice(0, 100)}</span></>
            }
          </div>
        </div>
      )}

      {/* Metrics grid */}
      <div style={{ display: "grid", gridTemplateColumns: isSmall ? "repeat(2,1fr)" : "repeat(6,1fr)", gap: 12 }}>
        {metricCards.map((m) => (
          <div key={m.label} className="glass-card glass-card-hover" style={{ padding: "14px 16px", position: "relative", overflow: "hidden", cursor: "pointer" }}>
            <div style={{ position: "absolute", top: -16, right: -16, width: 60, height: 60, borderRadius: "50%", background: `radial-gradient(circle, ${m.color}20 0%, transparent 70%)`, pointerEvents: "none" }} />
            {loading ? (
              <div style={{ height: 40, background: "rgba(255,255,255,0.05)", borderRadius: 6, animation: "pulse 1.5s ease-in-out infinite" }} />
            ) : (
              <>
                <div style={{ fontSize: 9, color: "rgba(156,163,175,0.6)", marginBottom: 8, letterSpacing: "0.05em" }}>{m.label}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>{m.value}</div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="glass-card animate-fade-up" style={{ padding: isMobile ? "16px 14px" : "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#ffffff" }}>Cliques vs. Conversões</div>
            <div style={{ fontSize: 10, color: "rgba(156,163,175,0.6)", marginTop: 2 }}>Evolução diária · Últimos 30 dias</div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {[{ color: "#06b6d4", label: "Cliques" }, { color: "#d946ef", label: "Conversões" }].map(({ color, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 24, height: 2.5, borderRadius: 2, background: color, boxShadow: `0 0 8px ${color}` }} />
                <span style={{ fontSize: 11, color: "rgba(156,163,175,0.7)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: isMobile ? 220 : 300 }}>
          <AdsLineChart data={chart} />
        </div>
      </div>

      {/* Campaigns table */}
      <div className="glass-card animate-fade-up" style={{ padding: isMobile ? "16px 14px" : "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#ffffff" }}>
          Campanhas {campaigns.length > 0 && <span style={{ fontSize: 11, color: "rgba(156,163,175,0.5)", fontWeight: 400, marginLeft: 6 }}>{campaigns.length} encontradas</span>}
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 560 }}>
            <thead>
              <tr>
                {["Campanha", "Canal", "Cliques", "Conv.", "CTR", "CPC", "Status"].map((h) => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, whiteSpace: "nowrap", color: "rgba(156,163,175,0.6)", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(campaigns.length > 0 ? campaigns : [
                { name: "Brand Awareness Q2", canal: "Search", cliques: 1240, conv: 98, ctr: "4.2%", cpc: "R$1.10", status: "ativo" },
                { name: "Lançamento Produto X", canal: "Display", cliques: 2180, conv: 201, ctr: "5.1%", cpc: "R$0.95", status: "ativo" },
                { name: "Remarketing Checkout", canal: "Search", cliques: 830, conv: 112, ctr: "6.8%", cpc: "R$1.45", status: "pausado" },
              ]).map((c, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "10px 12px", color: "#ffffff", fontWeight: 600, whiteSpace: "nowrap", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</td>
                  <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>
                    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)", color: "#8b5cf6", fontWeight: 600 }}>{c.canal}</span>
                  </td>
                  <td style={{ padding: "10px 12px", color: "#06b6d4", fontWeight: 700 }}>{Number(c.cliques).toLocaleString("pt-BR")}</td>
                  <td style={{ padding: "10px 12px", color: "#d946ef", fontWeight: 700 }}>{c.conv}</td>
                  <td style={{ padding: "10px 12px", color: "rgba(156,163,175,0.8)" }}>{c.ctr}</td>
                  <td style={{ padding: "10px 12px", color: "rgba(156,163,175,0.8)" }}>{c.cpc}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 20, letterSpacing: "0.06em", background: c.status === "ativo" ? "rgba(52,211,153,0.12)" : "rgba(248,113,113,0.1)", border: `1px solid ${c.status === "ativo" ? "rgba(52,211,153,0.25)" : "rgba(248,113,113,0.2)"}`, color: c.status === "ativo" ? "#34d399" : "#f87171" }}>
                      {c.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
