"use client";

type Row = {
  campaign: string;
  canal: string;
  investimento: string;
  receita: string;
  roas: string;
  status: string;
};

export default function SheetsTable({ data }: { data: Row[] }) {
  const headers = ["Campanha", "Canal", "Investimento", "Receita", "ROAS", "Status"];

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} style={{
                padding: "8px 12px", textAlign: "left", fontWeight: 600,
                color: "rgba(156,163,175,0.7)", fontSize: 10, letterSpacing: "0.07em",
                textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.06)",
                whiteSpace: "nowrap",
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <td style={{ padding: "10px 12px", color: "#ffffff", fontWeight: 500, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {row.campaign}
              </td>
              <td style={{ padding: "10px 12px", color: "rgba(156,163,175,0.8)", whiteSpace: "nowrap" }}>
                {row.canal}
              </td>
              <td style={{ padding: "10px 12px", color: "rgba(156,163,175,0.8)", whiteSpace: "nowrap" }}>
                {row.investimento}
              </td>
              <td style={{ padding: "10px 12px", color: "#ffffff", fontWeight: 600, whiteSpace: "nowrap" }}>
                {row.receita}
              </td>
              <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>
                <span style={{
                  background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.25)",
                  color: "#06b6d4", borderRadius: 20, padding: "2px 8px", fontWeight: 700,
                }}>
                  {row.roas}
                </span>
              </td>
              <td style={{ padding: "10px 12px" }}>
                <span style={{
                  padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 600, letterSpacing: "0.05em",
                  ...(row.status === "ativo"
                    ? { background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)", color: "#34d399" }
                    : { background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" })
                }}>
                  {row.status.toUpperCase()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
