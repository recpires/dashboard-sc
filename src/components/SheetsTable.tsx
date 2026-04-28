"use client";

import { useBreakpoint } from "@/lib/useBreakpoint";

export default function SheetsTable({ rows }: { rows: string[][] }) {
  const { isMobile } = useBreakpoint();

  if (!rows || rows.length === 0) {
    return (
      <div style={{ padding: 20, textAlign: "center", color: "rgba(156,163,175,0.5)", fontSize: 13 }}>
        Nenhum dado encontrado nesta aba.
      </div>
    );
  }

  const headers = rows[0];
  const body = rows.slice(1);

  return (
    <div style={{ overflowX: "auto", flex: 1 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: isMobile ? 600 : "unset" }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{ 
                padding: "10px 14px", 
                textAlign: "left", 
                fontWeight: 600, 
                color: "rgba(156,163,175,0.7)", 
                fontSize: 10, 
                letterSpacing: "0.07em", 
                textTransform: "uppercase", 
                borderBottom: "1px solid rgba(255,255,255,0.08)", 
                whiteSpace: "nowrap",
                position: "sticky",
                top: 0,
                background: "rgba(15,23,42,0.95)",
                zIndex: 10,
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 200ms" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={{ 
                  padding: "12px 14px", 
                  color: cellIndex === 0 ? "#ffffff" : "rgba(255,255,255,0.7)", 
                  fontWeight: cellIndex === 0 ? 600 : 400,
                  whiteSpace: "nowrap",
                  maxWidth: 300,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
