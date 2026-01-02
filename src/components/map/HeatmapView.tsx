"use client";

import { Map as MapIcon, Layers, Maximize2, MousePointer2 } from "lucide-react";
import { motion } from "framer-motion";

export function HeatmapView() {
  return (
    <div className="bento-card h-[500px] relative overflow-hidden group">
      {/* Abstract Map Placeholder Pattern */}
      <div className="absolute inset-0 bg-sage-100/30 opacity-50" 
           style={{ backgroundImage: 'radial-gradient(#d1ddd0 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }} />
      
      {/* Simulated Heatmap Pulsing Hotspots */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-32 h-32 bg-red-400 rounded-full blur-[40px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-mint-400 rounded-full blur-[50px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.4, 0.1] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 right-1/4 w-24 h-24 bg-sky-400 rounded-full blur-[30px]"
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-sage-400 pointer-events-none">
        <div className="p-4 rounded-full bg-white/60 backdrop-blur-md border border-sage-200 mb-4 shadow-sm">
          <MapIcon size={48} className="text-sage-600 opacity-80" />
        </div>
        <p className="font-bold text-xl text-sage-700">Interactive Heatmap</p>
        <p className="text-sm font-medium text-sage-500">MapLibre Engine Placeholder • Layer: Analytics v1</p>
      </div>

      {/* Map Controls */}
      <div className="absolute top-6 right-6 flex flex-col gap-2">
        <button className="p-3 bg-white/80 backdrop-blur-md rounded-2xl border border-sage-200 text-sage-600 hover:bg-white transition-all shadow-sm active:scale-95 group/btn">
          <Layers size={20} className="group-hover/btn:rotate-12 transition-transform" />
        </button>
        <button className="p-3 bg-white/80 backdrop-blur-md rounded-2xl border border-sage-200 text-sage-600 hover:bg-white transition-all shadow-sm active:scale-95 group/btn">
          <Maximize2 size={20} className="group-hover/btn:scale-110 transition-transform" />
        </button>
      </div>

      <div className="absolute top-6 left-6">
        <div className="glass px-3 py-1.5 rounded-full border-white/40 flex items-center gap-2 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-mint-500 animate-pulse" />
          <span className="text-[10px] font-black text-sage-700 uppercase tracking-widest">Live Engine: MapLibre GL</span>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
        <div className="glass p-4 rounded-2xl border-white/40 max-w-[220px] shadow-lg">
          <p className="text-[10px] font-bold text-sage-400 uppercase tracking-widest mb-3">Data Legend</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]" />
              <span className="text-xs text-sage-700 font-bold">Incident Hotspot</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-mint-500 shadow-[0_0_8px_rgba(118,199,192,0.6)]" />
              <span className="text-xs text-sage-700 font-bold">Growth Corridor</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(74,158,199,0.6)]" />
              <span className="text-xs text-sage-700 font-bold">Commercial Density</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <MousePointer2 size={16} className="text-sage-400 animate-pulse" />
          <span className="text-[10px] font-bold text-sage-400 uppercase tracking-wider">Hover for coordinates</span>
        </div>
      </div>
    </div>
  );
}
