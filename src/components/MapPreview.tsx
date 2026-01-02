"use client";

import { motion } from "framer-motion";
import { Map as MapIcon, Layers, MousePointer2, Info } from "lucide-react";
import { useState } from "react";

const dataPoints = [
  { x: "20%", y: "30%", intensity: 0.8, type: "crime" },
  { x: "45%", y: "25%", intensity: 0.4, type: "crime" },
  { x: "70%", y: "40%", intensity: 0.9, type: "permit" },
  { x: "30%", y: "60%", intensity: 0.6, type: "permit" },
  { x: "60%", y: "75%", intensity: 0.7, type: "business" },
  { x: "85%", y: "20%", intensity: 0.5, type: "business" },
];

export function MapPreview() {
  const [activeLayer, setActiveLayer] = useState<"all" | "crime" | "permit" | "business">("all");

  return (
    <div className="relative h-full w-full flex flex-col justify-between p-6">
      {/* Map Background Simulation */}
      <div className="absolute inset-0 bg-sage-100/30 overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#d1ddd0 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        {/* Abstract "Streets" */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 400">
          <path d="M0 100 L400 100 M100 0 L100 400 M300 0 L300 400 M0 300 L400 300" stroke="#4a6741" strokeWidth="2" fill="none" />
          <path d="M50 0 L350 400 M400 50 L0 350" stroke="#4a6741" strokeWidth="1" fill="none" />
        </svg>

        {/* Data Points (Heatmap Dots) */}
        {dataPoints.map((point, i) => (
          (activeLayer === "all" || activeLayer === point.type) && (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: point.intensity * 0.6 }}
              className={`absolute w-12 h-12 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2 ${
                point.type === "crime" ? "bg-red-400" : 
                point.type === "permit" ? "bg-mint-500" : "bg-sky-400"
              }`}
              style={{ left: point.x, top: point.y }}
            />
          )
        ))}
      </div>

      {/* Layer Toggles */}
      <div className="relative z-10 flex flex-wrap gap-2">
        {(["all", "crime", "permit", "business"] as const).map((layer) => (
          <button
            key={layer}
            onClick={() => setActiveLayer(layer)}
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
              activeLayer === layer 
                ? "bg-sage-600 text-white border-sage-600 shadow-sm" 
                : "glass text-sage-600 border-sage-200 hover:border-sage-300"
            }`}
          >
            {layer}
          </button>
        ))}
      </div>

      {/* Narrative Overlay */}
      <div className="relative z-10 space-y-2 max-w-[240px]">
        <div className="glass p-3 rounded-2xl border-white/40 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Info className="w-3.5 h-3.5 text-sage-600" />
            <span className="text-[10px] font-bold uppercase text-sage-600">Map Insights</span>
          </div>
          <p className="text-xs text-sage-700 leading-relaxed">
            {activeLayer === "all" && "Switch layers to see specific growth zones and safety patterns."}
            {activeLayer === "crime" && "Incident clusters are concentrated near the main transit corridor."}
            {activeLayer === "permit" && "Growth is shifting North with a 12% increase in new residential permits."}
            {activeLayer === "business" && "High commercial density found in the Southeast quadrant."}
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-2">
          <MousePointer2 className="w-3.5 h-3.5 text-sage-400 animate-pulse" />
          <span className="text-[10px] font-medium text-sage-400 italic">Interactivity simulated</span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 right-6 z-10">
        <div className="glass px-3 py-2 rounded-xl border-white/40 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-[9px] font-bold text-sage-600 uppercase">Crime</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-mint-500" />
            <span className="text-[9px] font-bold text-sage-600 uppercase">Permits</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-sky-400" />
            <span className="text-[9px] font-bold text-sage-600 uppercase">Business</span>
          </div>
        </div>
      </div>
    </div>
  );
}
