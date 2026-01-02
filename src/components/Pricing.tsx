"use client";

import { Check, ShieldCheck, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for a quick look while browsing.",
    features: [
      "1 Neighborhood Heatmap",
      "30-day historical data",
      "Standard Safety Scores",
      "Web access only"
    ],
    icon: Globe,
    button: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For serious home buyers and small business owners.",
    features: [
      "Unlimited Heatmaps",
      "Full 12-month trends",
      "PDF Insight Exports",
      "Save up to 10 locations",
      "Priority data caching"
    ],
    icon: Zap,
    button: "Go Pro",
    popular: true
  },
  {
    name: "Realtor",
    price: "$99",
    period: "/year",
    description: "Professional tools for client-facing reports.",
    features: [
      "White-label PDF reports",
      "Custom branding",
      "Client dashboard sharing",
      "Bulk area comparisons",
      "API access (beta)"
    ],
    icon: ShieldCheck,
    button: "Join Realtor Tier",
    popular: false
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold text-sage-700">Simple, transparent pricing</h2>
        <p className="text-sage-600/70 max-w-xl mx-auto">
          Save thousands in potential bad decisions with the price of a few coffees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, idx) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bento-card relative flex flex-col justify-between ${
              tier.popular 
                ? "border-mint-200 bg-white shadow-xl shadow-sage-200/50 ring-2 ring-mint-500/10" 
                : "bg-white/40"
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-mint-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Most Popular
              </div>
            )}

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${tier.popular ? "bg-mint-100 text-mint-600" : "bg-sage-100 text-sage-600"}`}>
                  <tier.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xl text-sage-700">{tier.name}</h3>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-sage-700">{tier.price}</span>
                <span className="text-sage-400 text-sm font-medium">{tier.period}</span>
              </div>

              <p className="text-sm text-sage-600/70 leading-relaxed">
                {tier.description}
              </p>

              <div className="space-y-3 pt-2">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm text-sage-600">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${tier.popular ? "text-mint-500" : "text-sage-400"}`} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className={`mt-8 w-full py-3 rounded-2xl font-bold text-sm transition-all ${
              tier.popular 
                ? "bg-sage-700 text-white hover:bg-sage-800 shadow-lg shadow-sage-200" 
                : "bg-white border border-sage-200 text-sage-600 hover:bg-sage-50"
            }`}>
              {tier.button}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
