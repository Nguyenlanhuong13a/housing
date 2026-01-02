"use client";

import { motion } from "framer-motion";
import { Shield, TrendingUp, School, Coffee, Check } from "lucide-react";

interface AreaData {
  name: string;
  zip: string;
  scores: {
    safety: number;
    growth: number;
    family: number;
    business: number;
  };
  summary: string;
  bestFor: string;
}

const comparisonData: AreaData[] = [
  {
    name: "Silver Lake",
    zip: "90026",
    scores: { safety: 72, growth: 88, family: 65, business: 94 },
    summary: "A high-energy hub with rapid appreciation. Perfect for young professionals and business owners looking for foot traffic.",
    bestFor: "Business & Growth"
  },
  {
    name: "Pasadena",
    zip: "91101",
    scores: { safety: 89, growth: 62, family: 92, business: 70 },
    summary: "Established, quiet, and predictable. Exceptional schools and low crime make it a top choice for long-term residency.",
    bestFor: "Families & Safety"
  }
];

export function CompareAreas() {
  const categories = [
    { key: "safety", label: "Safety", icon: Shield, color: "bg-red-400" },
    { key: "growth", label: "Growth", icon: TrendingUp, color: "bg-mint-500" },
    { key: "family", label: "Family", icon: School, color: "bg-sky-400" },
    { key: "business", label: "Business", icon: Coffee, color: "bg-sage-500" },
  ] as const;

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-sage-700">Side-by-Side Comparison</h2>
          <p className="text-sage-600/70 text-sm">Decide between your top choices with data-backed clarity.</p>
        </div>
        <div className="flex gap-2">
          <button className="glass px-4 py-2 rounded-xl text-xs font-bold text-sage-600 border-sage-200">Export PDF</button>
          <button className="bg-sage-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm">Save View</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {comparisonData.map((area, areaIdx) => (
          <motion.div
            key={area.zip}
            initial={{ opacity: 0, x: areaIdx === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bento-card bg-white/60 relative overflow-hidden"
          >
            {/* Header */}
            <div className="mb-8">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold text-sage-700">{area.name}</h3>
                <span className="text-[10px] font-bold bg-sage-100 text-sage-600 px-2 py-1 rounded-md uppercase tracking-wider">
                  {area.zip}
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-50 text-mint-700 text-xs font-bold">
                <Check className="w-3.5 h-3.5" />
                Best for {area.bestFor}
              </div>
            </div>

            {/* Visual Bars */}
            <div className="space-y-6 mb-8">
              {categories.map((cat) => {
                const score = area.scores[cat.key];
                return (
                  <div key={cat.key} className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-sage-600">
                      <div className="flex items-center gap-2">
                        <cat.icon className="w-4 h-4" />
                        {cat.label}
                      </div>
                      <span>{score}/100</span>
                    </div>
                    <div className="h-2 w-full bg-sage-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1, delay: 0.5 + areaIdx * 0.2 }}
                        className={`h-full ${cat.color} rounded-full`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Plain English Summary */}
            <div className="p-4 rounded-2xl bg-sage-50/50 border border-sage-100">
              <h4 className="text-xs font-bold uppercase tracking-widest text-sage-400 mb-2">The Bottom Line</h4>
              <p className="text-sm text-sage-600 leading-relaxed italic">
                "{area.summary}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
