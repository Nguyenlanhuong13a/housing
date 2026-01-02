"use client";

import { motion } from "framer-motion";
import { Coffee, Store, Users, MapPin, Lightbulb } from "lucide-react";

interface InsightItem {
  icon: any;
  title: string;
  value: string;
  desc: string;
}

const businessInsights: InsightItem[] = [
  {
    icon: Coffee,
    title: "Cafe Density",
    value: "High",
    desc: "A concentration of third-wave coffee shops indicates high discretionary spending in the area."
  },
  {
    icon: Users,
    title: "Foot Traffic",
    value: "1.2k/hr",
    desc: "Peak weekend traffic is significantly higher than the city average, ideal for retail visibility."
  },
  {
    icon: Store,
    title: "Vacancy Rate",
    value: "4%",
    desc: "Extremely low commercial vacancy suggests a competitive but highly profitable market."
  },
  {
    icon: MapPin,
    title: "Accessibility",
    value: "92/100",
    desc: "Excellent transit links and ample parking make this a destination for surrounding zip codes."
  }
];

interface DeepDiveProps {
  locationName: string;
}

export function BusinessDeepDive({ locationName }: DeepDiveProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-sage-50 rounded-2xl text-sage-600">
          <Coffee className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-sage-700">Business Activity: {locationName}</h2>
          <p className="text-sage-600/70">Analyzing commercial health, foot traffic, and retail density.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {businessInsights.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bento-card bg-white/50 border-sage-100 flex gap-5 items-start"
          >
            <div className="p-3 bg-sage-50 rounded-xl text-sage-600 shrink-0">
              <item.icon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-sage-700">{item.title}</h3>
                <span className="text-xs font-bold text-sage-600 uppercase">{item.value}</span>
              </div>
              <p className="text-sm text-sage-600/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Restaurant Inspection Section */}
      <div className="bento-card bg-mint-50/20 border-mint-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-mint-100 flex items-center justify-center text-mint-600">
              <Store className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sage-700">Dining & Health Pulse</h3>
          </div>
          <span className="text-[10px] font-bold text-sage-400 uppercase tracking-widest">Source: Health Dept.</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-sm font-bold text-sage-600">Recent Inspections</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-sage-700">98%</span>
              <span className="text-xs font-bold text-mint-600">Grade A</span>
            </div>
            <div className="text-[10px] text-sage-400">142 establishments passed in last 6 months</div>
          </div>
          <div className="md:col-span-2 space-y-3">
            <div className="flex justify-between items-center text-xs font-bold text-sage-600">
              <span>Health Safety Index</span>
              <span>Exceptional</span>
            </div>
            <div className="h-1.5 w-full bg-sage-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "94%" }}
                className="h-full bg-mint-500 rounded-full"
              />
            </div>
            <p className="text-[11px] text-sage-600/70 italic">
              "Local eateries show higher-than-average compliance with health standards. No major violations reported in the last year."
            </p>
          </div>
        </div>
      </div>

      <div className="bg-mint-50/50 border border-mint-100 p-6 rounded-3xl flex gap-4 items-start">
        <div className="p-2 bg-mint-100 rounded-lg text-mint-600 shrink-0">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-sage-700 text-sm italic">Merchant Insight</h4>
          <p className="text-sm text-sage-600/80 leading-relaxed">
            The data shows a high concentration of "grab-and-go" establishments but a lack of sit-down dining options. 
            **Decision Support:** This is a prime location for a boutique cafe or service-based business (like a salon) that benefits from high morning foot traffic.
          </p>
        </div>
      </div>
    </div>
  );
}
