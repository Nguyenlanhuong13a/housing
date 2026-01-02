"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Map as MapIcon, Download, Share2, Search, Bookmark, BookmarkCheck } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { ScoreCard } from "@/components/ScoreCard";
import { SafetyDeepDive } from "@/components/SafetyDeepDive";
import { GrowthDeepDive } from "@/components/GrowthDeepDive";
import { FamilyDeepDive } from "@/components/FamilyDeepDive";
import { BusinessDeepDive } from "@/components/BusinessDeepDive";
import { FiveMinuteVerdict } from "@/components/FiveMinuteVerdict";
import { motion, AnimatePresence } from "framer-motion";

export default function ReportPage({ params }: { params: Promise<{ location: string }> }) {
  const resolvedParams = use(params);
  const location = decodeURIComponent(resolvedParams.location);
  const [activeTab, setActiveTab] = useState<"safety" | "growth" | "family" | "business">("safety");
  const [isSaved, setIsSaved] = useState(false);

  // Mock data for the location
  const locationParts = location.split(",").map(s => s.trim());
  const cityName = locationParts[0] || "Unknown City";
  const stateName = locationParts[1] || "USA";
  const zipCode = /^\d{5}$/.test(location) ? location : "90210";

  // Helper to generate pseudo-random scores based on location name
  const getScore = (input: string, factor: number) => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.floor(Math.abs(Math.sin(hash * factor) * 40) + 60); // Scores between 60-100
  };

  const locationData = {
    name: cityName,
    zip: zipCode,
    state: stateName,
    scores: {
      safety: getScore(location, 1.1),
      growth: getScore(location, 1.2),
      family: getScore(location, 1.3),
      business: getScore(location, 1.4)
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-sage-50)] text-[var(--foreground)] pb-20">
      <Navigation showSearch />

      {/* Report Header */}
      <header className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-100 text-mint-700 text-xs font-bold uppercase tracking-wider">
                Neighborhood Report
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-sage-700">
                {locationData.name}, {locationData.state}
              </h1>
              <p className="text-sage-600/70 font-medium">Zip Code: {locationData.zip} • Updated Jan 2026</p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isSaved 
                    ? "bg-mint-100 text-mint-700 border border-mint-200" 
                    : "glass text-sage-600 hover:bg-sage-100 border-sage-200"
                }`}
                aria-label={isSaved ? "Saved to My Locations" : "Save to My Locations"}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 fill-current" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    Save Location
                  </>
                )}
              </button>
              <button className="p-2.5 glass text-sage-600 hover:bg-sage-100 rounded-xl transition-all border-sage-200" aria-label="Share Report">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="bg-sage-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-sage-700 transition-all flex items-center gap-2 shadow-lg shadow-sage-200/50" aria-label="Export PDF">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>

          {/* Score Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {(["safety", "growth", "family", "business"] as const).map((type) => (
              <button 
                key={type}
                onClick={() => setActiveTab(type)}
                className={`text-left transition-all ${activeTab === type ? 'ring-2 ring-sage-400 ring-offset-4 ring-offset-[var(--color-sage-50)]' : 'opacity-80 hover:opacity-100'}`}
              >
                <ScoreCard type={type} score={locationData.scores[type]} />
              </button>
            ))}
          </div>

          {/* 5-Minute Verdict Section */}
          <div className="mb-12">
            <FiveMinuteVerdict locationName={locationData.name} />
          </div>
        </div>
      </header>

      {/* Deep-Dive Content */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="glass rounded-[32px] p-8 md:p-12 min-h-[600px] relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-mint-100/20 blur-[120px] rounded-full -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-100/20 blur-[120px] rounded-full -ml-48 -mb-48" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              {activeTab === "safety" && <SafetyDeepDive locationName={locationData.name} />}
              {activeTab === "growth" && <GrowthDeepDive locationName={locationData.name} />}
              {activeTab === "family" && <FamilyDeepDive locationName={locationData.name} />}
              {activeTab === "business" && <BusinessDeepDive locationName={locationData.name} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="bg-sage-700 rounded-[32px] p-8 text-center text-white space-y-6">
          <h2 className="text-2xl font-bold">Need a deeper look?</h2>
          <p className="text-sage-100/80 max-w-xl mx-auto">
            Get access to historical records, street-level incidents, and school district comparisons with a Pro account.
          </p>
          <button className="bg-mint-400 text-sage-800 px-8 py-3 rounded-2xl font-bold hover:bg-mint-300 transition-all">
            Upgrade to Pro
          </button>
        </div>
      </section>
    </main>
  );
}
