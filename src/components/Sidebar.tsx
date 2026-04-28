"use client";

import { useState } from "react";
import { useBreakpoint } from "@/lib/useBreakpoint";

type NavItem = { id: string; label: string; icon: React.ReactNode };

const OverviewIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);
const SheetsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" />
    <line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" />
  </svg>
);
const AdsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" />
  </svg>
);
const EditorialIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h16M4 12h16M4 18h12" />
  </svg>
);
const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const LogoMark = () => (
  <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #06b6d4, #d946ef)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(6,182,212,0.4), 0 0 40px rgba(217,70,239,0.2)", flexShrink: 0 }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const navItems: NavItem[] = [
  { id: "overview", label: "Visão Geral", icon: <OverviewIcon /> },
  { id: "sheets", label: "Planilhas", icon: <SheetsIcon /> },
  { id: "ads", label: "Google Ads", icon: <AdsIcon /> },
  { id: "calendar", label: "Calendário IG", icon: <CalendarIcon /> },
  { id: "editorial", label: "Calendário Editorial", icon: <EditorialIcon /> },
];

type Props = { activeSection: string; onNav: (id: string) => void };

export default function Sidebar({ activeSection, onNav }: Props) {
  const { isSmall } = useBreakpoint();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNav = (id: string) => {
    onNav(id);
    if (isSmall) setDrawerOpen(false);
  };

  // ── Mobile: floating burger + drawer ──────────────────────────────────────
  if (isSmall) {
    return (
      <>
        {/* Floating burger */}
        <button
          onClick={() => setDrawerOpen(true)}
          style={{
            position: "fixed", top: 14, left: 14, zIndex: 60,
            width: 38, height: 38, borderRadius: 10,
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 4.5, cursor: "pointer",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ display: "block", width: 16, height: 1.5, background: "rgba(255,255,255,0.85)", borderRadius: 2 }} />
          ))}
        </button>

        {/* Backdrop */}
        {drawerOpen && (
          <div
            onClick={() => setDrawerOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 70, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
          />
        )}

        {/* Drawer */}
        <aside style={{
          position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 80,
          width: 240,
          background: "rgba(15,23,42,0.97)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          display: "flex", flexDirection: "column", padding: "20px 0",
          transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 380ms cubic-bezier(0.32,0.72,0,1)",
        }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <LogoMark />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#ffffff" }}>SynapseCode</div>
                <div style={{ fontSize: 10, color: "rgba(156,163,175,0.6)" }}>Dashboard</div>
              </div>
            </div>
            <button onClick={() => setDrawerOpen(false)} style={{ background: "none", border: "none", color: "rgba(156,163,175,0.7)", cursor: "pointer", padding: 4 }}>
              <CloseIcon />
            </button>
          </div>

          {/* Nav items */}
          <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, padding: "0 12px" }}>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button key={item.id} onClick={() => handleNav(item.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "11px 14px", borderRadius: 10, border: "none", cursor: "pointer", width: "100%", textAlign: "left",
                    background: isActive ? "linear-gradient(135deg, rgba(6,182,212,0.18), rgba(217,70,239,0.1))" : "transparent",
                    borderColor: isActive ? "rgba(6,182,212,0.3)" : "transparent",
                    borderWidth: 1, borderStyle: "solid",
                    color: isActive ? "#06b6d4" : "rgba(156,163,175,0.8)",
                    boxShadow: isActive ? "0 0 16px rgba(6,182,212,0.15)" : "none",
                    transition: "all 300ms cubic-bezier(0.32,0.72,0,1)",
                  } as React.CSSProperties}
                >
                  {item.icon}
                  <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Settings */}
          <div style={{ padding: "12px 12px 0" }}>
            <button style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "10px 14px", borderRadius: 10, border: "none", background: "transparent", color: "rgba(156,163,175,0.5)", cursor: "pointer", fontSize: 13 }}>
              <SettingsIcon /><span>Configurações</span>
            </button>
          </div>
        </aside>
      </>
    );
  }

  // ── Desktop: fixed icon sidebar ───────────────────────────────────────────
  return (
    <aside style={{
      width: 72, height: "100vh", display: "flex", flexDirection: "column", alignItems: "center",
      padding: "20px 0", background: "rgba(255,255,255,0.03)",
      borderRight: "1px solid rgba(255,255,255,0.07)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      flexShrink: 0, position: "relative", zIndex: 10,
    }}>
      <div style={{ marginBottom: 32, paddingTop: 4 }}><LogoMark /></div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, width: "100%", padding: "0 10px" }}>
        {navItems.map((item, i) => {
          const isActive = activeSection === item.id;
          return (
            <button key={item.id} onClick={() => onNav(item.id)} title={item.label}
              className="animate-fade-up"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "100%", height: 44, borderRadius: 12, cursor: "pointer",
                border: isActive ? "1px solid rgba(6,182,212,0.35)" : "1px solid transparent",
                background: isActive ? "linear-gradient(135deg, rgba(6,182,212,0.18), rgba(217,70,239,0.1))" : "transparent",
                color: isActive ? "#06b6d4" : "rgba(156,163,175,0.7)",
                boxShadow: isActive ? "0 0 16px rgba(6,182,212,0.2), inset 0 1px 0 rgba(255,255,255,0.08)" : "none",
                transition: "all 400ms cubic-bezier(0.32,0.72,0,1)",
                animationDelay: `${i * 60}ms`,
              } as React.CSSProperties}
              onMouseEnter={(e) => { if (!isActive) { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; } }}
              onMouseLeave={(e) => { if (!isActive) { (e.currentTarget as HTMLElement).style.color = "rgba(156,163,175,0.7)"; (e.currentTarget as HTMLElement).style.background = "transparent"; } }}
            >
              {item.icon}
            </button>
          );
        })}
      </nav>
      <div style={{ padding: "0 10px", width: "100%" }}>
        <button title="Configurações"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 40, borderRadius: 10, border: "1px solid transparent", background: "transparent", color: "rgba(156,163,175,0.5)", cursor: "pointer", transition: "all 400ms cubic-bezier(0.32,0.72,0,1)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(156,163,175,0.5)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        >
          <SettingsIcon />
        </button>
      </div>
    </aside>
  );
}
