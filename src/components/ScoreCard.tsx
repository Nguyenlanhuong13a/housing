"use client";

import { Shield, TrendingUp, School, Coffee, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type ScoreCategory = "safety" | "growth" | "family" | "business";

interface ScoreProps {
  type: ScoreCategory;
  score: number;
}

const scoreData = {
  safety: {
    title: "Safety Score",
    icon: Shield,
    color: "red",
    getNarrative: (s: number) => {
      if (s > 70) return { tag: "Quiet & Secure", desc: "Low incident rates. Active community presence and well-lit streets." };
      if (s > 40) return { tag: "Typical Urban", desc: "Standard city activity. Some petty theft, but generally active and monitored." };
      return { tag: "Caution Advised", desc: "Frequent incidents reported. Best for those familiar with urban environments." };
    }
  },
  growth: {
    title: "Growth Score",
    icon: TrendingUp,
    color: "mint",
    getNarrative: (s: number) => {
      if (s > 70) return { tag: "High Momentum", desc: "Rapid transformation. Significant investment in new builds and commercial hubs." };
      if (s > 40) return { tag: "Rising Interest", desc: "Steady home renovations and new small business permits." };
      return { tag: "Stable / Stagnant", desc: "Limited new construction. A predictable but slow-moving market." };
    }
  },
  family: {
    title: "Family Score",
    icon: School,
    color: "sky",
    getNarrative: (s: number) => {
      if (s > 70) return { tag: "Family Paradise", desc: "Top-tier school ratings and abundant green spaces with safe paths." };
      if (s > 40) return { tag: "Solid Foundations", desc: "Reliable local schools and at least two public parks in walking distance." };
      return { tag: "Essentials Only", desc: "Schools are emerging. Parks and playgrounds are a short drive away." };
    }
  },
  business: {
    title: "Business Score",
    icon: Coffee,
    color: "sage",
    getNarrative: (s: number) => {
      if (s > 70) return { tag: "Vibrant Hub", desc: "High foot traffic. Dense concentration of retail and dining. Ideal for owners." };
      if (s > 40) return { tag: "Local Favorites", desc: "A healthy mix of homes and small clusters of cafes/services." };
      return { tag: "Quiet Residential", desc: "Few shops nearby. Perfect for peace; requires a car for errands." };
    }
  }
};

export function ScoreCard({ type, score }: ScoreProps) {
  const data = scoreData[type];
  const { tag, desc } = data.getNarrative(score);
  const Icon = data.icon;

  const colorClasses = {
    red: "bg-red-50 text-red-500",
    mint: "bg-mint-50 text-mint-600",
    sky: "bg-sky-50 text-sky-500",
    sage: "bg-sage-50 text-sage-600",
  }[data.color];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bento-card flex flex-col justify-between group cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-2xl ${colorClasses}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-sage-700">{score}</div>
          <div className="text-[10px] uppercase tracking-wider font-bold text-sage-400">Index</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div>
          <h3 className="font-semibold text-lg text-sage-700">{data.title}</h3>
          <div className="inline-block px-2 py-0.5 rounded-md bg-white/50 text-[11px] font-bold text-sage-600 border border-sage-100 mb-1">
            {tag}
          </div>
        </div>
        <p className="text-sm text-sage-600/70 leading-relaxed">
          {desc}
        </p>
        <div className="flex items-center gap-1 text-xs font-medium text-sage-400 group-hover:text-sage-600 transition-colors pt-2">
          View Details <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
}
