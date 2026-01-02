"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Eye, AlertTriangle, Lightbulb } from "lucide-react";

interface InsightItem {
  icon: any;
  title: string;
  value: string;
  desc: string;
}

const safetyInsights: InsightItem[] = [
  {
    icon: Clock,
    title: "Response Time",
    value: "5.4 min",
    desc: "Emergency response is 30% faster than the city average, providing peace of mind."
  },
  {
    icon: Eye,
    title: "Street Activity",
    value: "High",
    desc: "Active foot traffic and community presence act as a natural deterrent to crime."
  },
  {
    icon: Shield,
    title: "Violent Crime",
    value: "Very Low",
    desc: "Incident rates are 45% below the state average for residential neighborhoods."
  },
  {
    icon: AlertTriangle,
    title: "Property Crime",
    value: "Moderate",
    desc: "Minor reports like package theft are present. We recommend a smart doorbell."
  }
];

interface DeepDiveProps {
  locationName: string;
}

export function SafetyDeepDive({ locationName }: DeepDiveProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-red-50 rounded-2xl text-red-500">
          <Shield className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-sage-700">Safety Deep-Dive: {locationName}</h2>
          <p className="text-sage-600/70">Breaking down the numbers into real-world security.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {safetyInsights.map((item, idx) => (
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
                <span className="text-xs font-bold text-mint-600 uppercase">{item.value}</span>
              </div>
              <p className="text-sm text-sage-600/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Crime Incident Breakdown Visual */}
      <div className="bento-card bg-red-50/20 border-red-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-500">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sage-700">Crime Type Breakdown</h3>
          </div>
          <span className="text-[10px] font-bold text-sage-400 uppercase tracking-widest">Last 12 Months</span>
        </div>

        <div className="space-y-5">
          {[
            { label: "Property (Theft, Burglary)", value: 78, color: "bg-sage-400" },
            { label: "Public Order (Nuisance)", value: 15, color: "bg-sage-300" },
            { label: "Violent (Assault, etc.)", value: 7, color: "bg-red-400" }
          ].map((type) => (
            <div key={type.label} className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-sage-600">
                <span>{type.label}</span>
                <span>{type.value}%</span>
              </div>
              <div className="h-2 w-full bg-sage-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${type.value}%` }}
                  className={`h-full ${type.color} rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-sage-500 leading-relaxed italic">
          "Most activity in this area is related to property crime. Violent incidents are statistically rare compared to city-wide benchmarks."
        </p>
      </div>

      <div className="bg-mint-50/50 border border-mint-100 p-6 rounded-3xl flex gap-4 items-start">
        <div className="p-2 bg-mint-100 rounded-lg text-mint-600 shrink-0">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-sage-700 text-sm italic">Senior UX Insight</h4>
          <p className="text-sm text-sage-600/80 leading-relaxed">
            While the score is high, most "incidents" here are package thefts from unsecured porches. 
            **Decision Support:** This neighborhood is exceptionally safe for families walking at night, but requires basic home tech for modern urban living.
          </p>
        </div>
      </div>
    </div>
  );
}
