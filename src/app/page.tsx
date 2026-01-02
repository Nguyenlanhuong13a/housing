"use client";

import { LocationSearch } from "@/components/search/LocationSearch";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ScoreCard } from "@/components/dashboard/ScoreCard";
import { HeatmapView } from "@/components/map/HeatmapView";
import { mockDashboardData } from "@/data/mockData";
import { Map, Bell, User } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen pb-24 bg-[var(--color-sage-50)] text-[var(--foreground)] selection:bg-mint-200">
      {/* Glass Navigation */}
      <nav className="sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass px-6 py-3 rounded-2xl shadow-sm border-white/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sage-600 rounded-lg flex items-center justify-center">
              <Map className="text-white" size={18} />
            </div>
            <span className="font-bold text-xl text-sage-700 tracking-tight">Local Intelligence</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-sage-500 hover:bg-sage-100 rounded-xl transition-colors">
              <Bell size={20} />
            </button>
            <div className="w-9 h-9 rounded-full bg-sage-200 border-2 border-white flex items-center justify-center text-sage-600 cursor-pointer overflow-hidden">
              <User size={20} />
            </div>
          </div>
        </div>
      </nav>

      <DashboardShell 
        title={`Insights for ${mockDashboardData.location}`}
        subtitle={`Data aggregated from FBI, Census, and Permit APIs • Updated ${mockDashboardData.lastUpdated}`}
      >
        <LocationSearch />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Map View - 8 cols */}
          <div className="lg:col-span-8">
            <HeatmapView />
          </div>

          {/* Scores - 4 cols */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-6">
            {mockDashboardData.scores.map((score) => (
              <ScoreCard key={score.type} {...score} />
            ))}
          </div>
        </div>
      </DashboardShell>
      
      {/* Footer Branding */}
      <footer className="mt-12 text-center text-sage-400 text-sm font-medium">
        © 2026 Local Intelligence • Built for clarity, powered by public data.
      </footer>
    </main>
  );
}
