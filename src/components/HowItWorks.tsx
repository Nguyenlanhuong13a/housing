"use client";

import { motion } from "framer-motion";
import { Search, BarChart3, CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search any area",
    desc: "Enter a zip code, neighborhood name, or exact address anywhere in the U.S.",
    color: "bg-sage-100 text-sage-600"
  },
  {
    icon: BarChart3,
    title: "Instant Analysis",
    desc: "We scan FBI crime stats, building permits, and school ratings in under 5 seconds.",
    color: "bg-mint-100 text-mint-600"
  },
  {
    icon: CheckCircle2,
    title: "Decide with Clarity",
    desc: "Get a clear verdict on safety, growth, and community value for your next move.",
    color: "bg-sky-100 text-sky-600"
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold text-sage-700">From data to decision</h2>
        <p className="text-sage-600/70 max-w-xl mx-auto">
          We do the heavy lifting so you can understand any neighborhood in just 5 minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {/* Connector line for desktop */}
        <div className="hidden md:block absolute top-1/4 left-0 w-full h-0.5 bg-sage-100 -z-10" />
        
        {steps.map((step, idx) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="flex flex-col items-center text-center space-y-6 bg-[var(--color-sage-50)]"
          >
            <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center shadow-sm`}>
              <step.icon className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-sage-700">{step.title}</h3>
              <p className="text-sm text-sage-600/70 leading-relaxed max-w-[240px]">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <div className="glass px-6 py-4 rounded-3xl flex items-center gap-4 border-sage-200">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-sage-200 border-2 border-white" />
            ))}
          </div>
          <p className="text-xs font-medium text-sage-600">
            Join 12,000+ users making smarter location decisions.
          </p>
          <button className="text-sage-700 font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all">
            Get started <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
