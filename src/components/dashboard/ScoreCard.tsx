"use client";

import { Shield, TrendingUp, Coffee, School } from "lucide-react";
import { motion } from "framer-motion";
import { ScoreData } from "@/data/mockData";

const icons = {
  safety: Shield,
  growth: TrendingUp,
  business: Coffee,
  family: School
};

const colors = {
  safety: "text-red-500 bg-red-50",
  growth: "text-mint-600 bg-mint-50",
  business: "text-sage-600 bg-sage-50",
  family: "text-sky-500 bg-sky-50"
};

export function ScoreCard({ type, score, label, explanation }: ScoreData) {
  const Icon = icons[type];
  const colorClass = colors[type];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bento-card flex flex-col justify-between min-h-[220px] group overflow-hidden"
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3.5 rounded-2xl ${colorClass} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={24} />
        </div>
        <div className="text-right">
          <div className="flex items-baseline justify-end gap-0.5">
            <span className="text-4xl font-black text-sage-700 tracking-tighter">{score}</span>
            <span className="text-sm font-bold text-sage-400">/100</span>
          </div>
          <p className="text-[10px] font-black text-sage-400 uppercase tracking-widest mt-1">Analytics Index</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-lg text-sage-700 mb-1">{label}</h3>
          <p className="text-sm text-sage-600/70 leading-relaxed font-medium line-clamp-2">{explanation}</p>
        </div>

        {/* Visual Scale */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold text-sage-400 uppercase tracking-wider">
            <span>Market Percentile</span>
            <span>{score}%</span>
          </div>
          <div className="h-2 w-full bg-sage-100 rounded-full overflow-hidden border border-sage-200/50">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className={`h-full rounded-full ${
                type === 'safety' ? 'bg-red-400' :
                type === 'growth' ? 'bg-mint-500' :
                type === 'business' ? 'bg-sage-600' : 'bg-sky-400'
              } shadow-[0_0_12px_rgba(0,0,0,0.05)]`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
