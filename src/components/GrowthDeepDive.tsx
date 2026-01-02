"use client";

import { motion } from "framer-motion";
import { TrendingUp, Hammer, Building2, Landmark, Lightbulb } from "lucide-react";

interface InsightItem {
  icon: any;
  title: string;
  value: string;
  desc: string;
}

const growthInsights: InsightItem[] = [
  {
    icon: Hammer,
    title: "New Construction",
    value: "+15%",
    desc: "Residential permits have increased significantly, signaling strong developer confidence."
  },
  {
    icon: Building2,
    title: "Commercial Interest",
    value: "High",
    desc: "Three major retail renovations approved this quarter. The local economy is diversifying."
  },
  {
    icon: Landmark,
    title: "Public Investment",
    value: "$2.4M",
    desc: "Planned park upgrades and transit improvements are slated for completion by 2027."
  },
  {
    icon: TrendingUp,
    title: "Property Values",
    value: "+8.2%",
    desc: "Median home prices are rising faster than the surrounding county average."
  }
];

interface DeepDiveProps {
  locationName: string;
}

export function GrowthDeepDive({ locationName }: DeepDiveProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-mint-50 rounded-2xl text-mint-600">
          <TrendingUp className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-sage-700">Growth Analysis: {locationName}</h2>
          <p className="text-sage-600/70">Tracking permits and investment to predict future value.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {growthInsights.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bento-card bg-white/50 border-sage-100 flex gap-5 items-start"
          >
            <div className="p-3 bg-mint-50 rounded-xl text-mint-600 shrink-0">
              <item.icon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-sage-700">{item.title}</h3>
                <span className="text-xs font-bold text-mint-600 uppercase">{item.value}</span>
              </div>
              <p className="text-sm text-sage-600/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-sky-50/50 border border-sky-100 p-6 rounded-3xl flex gap-4 items-start">
        <div className="p-2 bg-sky-100 rounded-lg text-sky-600 shrink-0">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-sage-700 text-sm italic">Growth Outlook</h4>
          <p className="text-sm text-sage-600/80 leading-relaxed">
            The high volume of "Alteration" permits suggests existing owners are investing in their properties. 
            **Decision Support:** This is a "Buy & Hold" area. You aren't just buying a home; you're buying into a neighborhood that is actively being upgraded by its residents.
          </p>
        </div>
      </div>
    </div>
  );
}
