"use client";

import { TrendingDown, TrendingUp, Minus, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

type TrendType = "crime" | "permits" | "business";

interface TrendData {
  type: TrendType;
  changePercent: number;
  period: string;
}

const trendConfigs = {
  crime: {
    label: "Safety Trend",
    getNarrative: (pct: number) => {
      if (pct < -5) return { 
        status: "improving", 
        title: "Streets are getting quieter", 
        desc: `Reported incidents dropped by ${Math.abs(pct)}% over the last 6 months.`,
        icon: CheckCircle2,
        color: "text-mint-600",
        bgColor: "bg-mint-50"
      };
      if (pct > 5) return { 
        status: "declining", 
        title: "Increased activity noted", 
        desc: `A ${pct}% uptick in reports. We recommend checking street-level data before deciding.`,
        icon: AlertCircle,
        color: "text-red-500",
        bgColor: "bg-red-50"
      };
      return { 
        status: "stable", 
        title: "Safety is holding steady", 
        desc: "Incident rates haven't shifted significantly. A predictable environment.",
        icon: Minus,
        color: "text-sage-500",
        bgColor: "bg-sage-50"
      };
    }
  },
  permits: {
    label: "Growth Trend",
    getNarrative: (pct: number) => {
      if (pct > 10) return { 
        status: "improving", 
        title: "Construction is booming", 
        desc: `New permits are up ${pct}%. This area is rapidly transforming into a hub.`,
        icon: TrendingUp,
        color: "text-mint-600",
        bgColor: "bg-mint-50"
      };
      if (pct < -10) return { 
        status: "declining", 
        title: "Development is cooling", 
        desc: "Fewer new projects started this quarter. The area is entering a mature phase.",
        icon: TrendingDown,
        color: "text-sage-500",
        bgColor: "bg-sage-50"
      };
      return { 
        status: "stable", 
        title: "Steady development", 
        desc: "Maintained interest from builders. Property values are holding firm.",
        icon: Minus,
        color: "text-sage-500",
        bgColor: "bg-sage-50"
      };
    }
  },
  business: {
    label: "Business Pulse",
    getNarrative: (pct: number) => {
      if (pct > 5) return { 
        status: "improving", 
        title: "The 'New Cafe' effect", 
        desc: `Local commerce grew ${pct}% this year. Foot traffic is at an all-time high.`,
        icon: TrendingUp,
        color: "text-mint-600",
        bgColor: "bg-mint-50"
      };
      if (pct < -5) return { 
        status: "declining", 
        title: "Retail shift in progress", 
        desc: "Some local closures noted. The neighborhood mix is currently rebalancing.",
        icon: TrendingDown,
        color: "text-red-400",
        bgColor: "bg-red-50"
      };
      return { 
        status: "stable", 
        title: "Main Street is consistent", 
        desc: "Established shops remain open. A reliable spot for daily essentials.",
        icon: Minus,
        color: "text-sage-500",
        bgColor: "bg-sage-50"
      };
    }
  }
};

export function TrendView({ trends }: { trends: TrendData[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-sage-700">Trend Insights</h2>
        <span className="text-xs font-bold uppercase tracking-widest text-sage-400">Last 6–12 Months</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trends.map((trend, idx) => {
          const config = trendConfigs[trend.type];
          const narrative = config.getNarrative(trend.changePercent);
          const Icon = narrative.icon;

          return (
            <motion.div
              key={trend.type}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bento-card bg-white/40 border-sage-100 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-sage-400">
                  {config.label}
                </span>
                <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${narrative.bgColor} ${narrative.color}`}>
                  {trend.changePercent > 0 ? "+" : ""}{trend.changePercent}%
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className={`p-2 rounded-xl shrink-0 ${narrative.bgColor} ${narrative.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-sage-700 leading-tight">
                    {narrative.title}
                  </h4>
                  <p className="text-sm text-sage-600/70 leading-relaxed">
                    {narrative.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
