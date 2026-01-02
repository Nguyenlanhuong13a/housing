"use client";

import { motion } from "framer-motion";
import { School, Trees, Baby, BookOpen, Lightbulb } from "lucide-react";

interface InsightItem {
  icon: any;
  title: string;
  value: string;
  desc: string;
}

const familyInsights: InsightItem[] = [
  {
    icon: School,
    title: "School Ratings",
    value: "9/10",
    desc: "Local public schools consistently rank in the top 5% of the state for academic growth."
  },
  {
    icon: Trees,
    title: "Park Access",
    value: "4 Parks",
    desc: "Every home is within a 10-minute walk of a well-maintained green space or playground."
  },
  {
    icon: Baby,
    title: "Daycare Options",
    value: "Abundant",
    desc: "High density of licensed childcare providers with shorter-than-average waitlists."
  },
  {
    icon: BookOpen,
    title: "Library Pulse",
    value: "Active",
    desc: "The local branch offers 12+ weekly youth programs and modern study facilities."
  }
];

interface DeepDiveProps {
  locationName: string;
}

export function FamilyDeepDive({ locationName }: DeepDiveProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-sky-50 rounded-2xl text-sky-500">
          <School className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-sage-700">Family Score: {locationName}</h2>
          <p className="text-sage-600/70">Evaluating education, recreation, and community support.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {familyInsights.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bento-card bg-white/50 border-sage-100 flex gap-5 items-start"
          >
            <div className="p-3 bg-sky-50 rounded-xl text-sky-500 shrink-0">
              <item.icon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-sage-700">{item.title}</h3>
                <span className="text-xs font-bold text-sky-600 uppercase">{item.value}</span>
              </div>
              <p className="text-sm text-sage-600/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* School District Comparison Visual */}
      <div className="bento-card bg-sky-50/20 border-sky-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
              <School className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sage-700">School District Comparison</h3>
          </div>
          <span className="text-[10px] font-bold text-sage-400 uppercase tracking-widest">State Percentile</span>
        </div>

        <div className="space-y-6">
          {[
            { name: "Local Elementary", local: 92, district: 78 },
            { name: "Local Middle School", local: 88, district: 75 },
            { name: "Local High School", local: 94, district: 82 }
          ].map((school) => (
            <div key={school.name} className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-sage-600">
                <span>{school.name}</span>
                <span className="text-sky-600">{school.local}th Percentile</span>
              </div>
              <div className="relative h-2 w-full bg-sage-100 rounded-full overflow-hidden">
                {/* District Average Marker */}
                <div 
                  className="absolute top-0 h-full w-0.5 bg-sage-400 z-10" 
                  style={{ left: `${school.district}%` }}
                />
                {/* Local Score Bar */}
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${school.local}%` }}
                  className="h-full bg-sky-400 rounded-full"
                />
              </div>
              <div className="flex justify-end">
                <span className="text-[9px] text-sage-400 font-medium">District Avg: {school.district}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-sage-50/50 border border-sage-100 p-6 rounded-3xl flex gap-4 items-start">
        <div className="p-2 bg-sage-100 rounded-lg text-sage-600 shrink-0">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-sage-700 text-sm italic">Community Vibe</h4>
          <p className="text-sm text-sage-600/80 leading-relaxed">
            While the schools are top-tier, the real value here is the pedestrian network. 
            **Decision Support:** If you want your kids to be able to bike to a park or library without crossing major intersections, this is one of the few areas that truly delivers.
          </p>
        </div>
      </div>
    </div>
  );
}
