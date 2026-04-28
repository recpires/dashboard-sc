"use client";

import { useState, useEffect } from "react";
import { useSheetMeta, useSheetData } from "@/lib/useSheetData";
import { useBreakpoint } from "@/lib/useBreakpoint";
import SheetsTable from "@/components/SheetsTable";

const EDITORIAL_SPREADSHEET_ID = "1wv5mpYzaIldNgOYKBDqHHbXPnGa82OmD_Bct51-ZlRA";

export default function EditorialView() {
  const { isMobile } = useBreakpoint();
  const { sheets, loading: loadingMeta, error: errorMeta } = useSheetMeta(EDITORIAL_SPREADSHEET_ID);
  const [activeSheet, setActiveSheet] = useState<string | null>(null);

  useEffect(() => {
    if (sheets.length > 0 && !activeSheet) {
      setActiveSheet(sheets[0].title);
    }
  }, [sheets, activeSheet]);

  const { rows, loading: loadingData, error: errorData } = useSheetData(
    activeSheet ? `${activeSheet}!A1:Z500` : "",
    EDITORIAL_SPREADSHEET_ID
  );

  const pad = isMobile ? "16px 14px 24px" : "20px 24px 28px";

  if (loadingMeta && !activeSheet) {
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="animate-pulse" style={{ color: "rgba(156,163,175,0.5)", fontSize: 14 }}>Carregando calendário...</div>
      </div>
    );
  }

  if (errorMeta) {
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ color: "#ef4444", fontSize: 14 }}>Erro ao carregar metadados: {errorMeta}</div>
      </div>
    );
  }

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: pad, display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#06b6d4", background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 20, padding: "3px 10px", alignSelf: "flex-start" }}>
          Google Sheets
        </span>
        <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em" }}>
          Calendário Editorial
        </h1>
        <p style={{ fontSize: 13, color: "rgba(156,163,175,0.7)" }}>
          Acompanhamento completo de todas as abas do planejamento editorial.
        </p>
      </div>

      {/* Tabs Selector */}
      <div style={{ 
        display: "flex", 
        gap: 8, 
        overflowX: "auto", 
        paddingBottom: 8,
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}>
        {sheets.map((sheet) => (
          <button
            key={sheet.sheetId}
            onClick={() => setActiveSheet(sheet.title)}
            style={{
              padding: "8px 16px",
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 600,
              whiteSpace: "nowrap",
              cursor: "pointer",
              transition: "all 300ms cubic-bezier(0.32,0.72,0,1)",
              background: activeSheet === sheet.title ? "rgba(6,182,212,0.15)" : "rgba(255,255,255,0.03)",
              color: activeSheet === sheet.title ? "#22d3ee" : "rgba(156,163,175,0.7)",
              border: activeSheet === sheet.title ? "1px solid rgba(6,182,212,0.3)" : "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {sheet.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="glass-card animate-fade-up" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 400 }}>
        {loadingData ? (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="animate-pulse" style={{ color: "rgba(156,163,175,0.5)", fontSize: 13 }}>Sincronizando dados da aba...</div>
          </div>
        ) : errorData ? (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ color: "#ef4444", fontSize: 13 }}>Erro: {errorData}</div>
          </div>
        ) : (
          <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
             <SheetsTable rows={rows} />
          </div>
        )}
      </div>
    </main>
  );
}
