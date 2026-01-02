"use client";

import { motion } from "framer-motion";
import { Zap, ThumbsUp, ThumbsDown, Target } from "lucide-react";

interface VerdictProps {
  locationName: string;
}

export function FiveMinuteVerdict({ locationName }: VerdictProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-sage-600 rounded-xl text-white">
          <Zap className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold text-sage-700">The 5-Minute Verdict</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Executive Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 bento-card bg-white/60 border-mint-100"
        >
          <h3 className="text-lg font-bold text-sage-700 mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-mint-600" />
            Executive Summary
          </h3>
          <p className="text-sage-600 leading-relaxed">
            {locationName} is currently in a <strong>"Growth & Stabilization"</strong> phase. It offers an exceptional balance of safety and family amenities, making it a low-risk choice for long-term residency. While business activity is moderate, the high growth in building permits suggests significant future appreciation.
          </p>
          <div className="mt-4 pt-4 border-t border-sage-100 flex gap-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-mint-700 bg-mint-50 px-3 py-1 rounded-full">
              Safe Bet
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full">
              High Growth
            </div>
          </div>
        </motion.div>

        {/* Quick Wins / Risks */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bento-card bg-sage-50/50 border-sage-100"
        >
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-sage-400 mb-2 flex items-center gap-1.5">
                <ThumbsUp className="w-3.5 h-3.5 text-mint-600" />
                The Good
              </h4>
              <ul className="text-sm text-sage-600 space-y-1">
                <li>• Top-tier school ratings</li>
                <li>• Rapid permit growth</li>
                <li>• Low violent crime rates</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-sage-400 mb-2 flex items-center gap-1.5">
                <ThumbsDown className="w-3.5 h-3.5 text-red-400" />
                The Caveats
              </h4>
              <ul className="text-sm text-sage-600 space-y-1">
                <li>• Limited transit options</li>
                <li>• Minor package theft</li>
                <li>• Rising cost of entry</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
