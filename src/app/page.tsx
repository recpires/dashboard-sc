"use client";

import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import OverviewView from "@/views/OverviewView";
import SheetsView from "@/views/SheetsView";
import AdsView from "@/views/AdsView";
import CalendarView from "@/views/CalendarView";
import { useState } from "react";

type NavId = "overview" | "sheets" | "ads" | "calendar";

const VIEWS: Record<NavId, React.ReactNode> = {
  overview: <OverviewView />,
  sheets: <SheetsView />,
  ads: <AdsView />,
  calendar: <CalendarView />,
};

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState<NavId>("overview");

  return (
    <div style={{ display: "flex", height: "100dvh", position: "relative", zIndex: 1, overflow: "hidden" }}>
      <Sidebar activeSection={activeNav} onNav={(id) => setActiveNav(id as NavId)} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <TopHeader />
        {VIEWS[activeNav]}
      </div>
    </div>
  );
}
