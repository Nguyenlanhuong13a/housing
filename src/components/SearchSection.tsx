"use client";

import { useState } from "react";
import { Search, ArrowRight, MapPin, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const suggestions = [
  { name: "Silver Lake, CA", type: "trending" },
  { name: "Pasadena, CA", type: "popular" },
  { name: "Austin, TX", type: "trending" },
  { name: "Miami, FL", type: "popular" },
  { name: "Brooklyn, NY", type: "trending" },
  { name: "Seattle, WA", type: "popular" },
  { name: "90210", type: "zip" }
];

export function SearchSection() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsAnalyzing(true);
      // Brief delay to simulate analysis and show feedback
      setTimeout(() => {
        router.push(`/report/${encodeURIComponent(query)}`);
      }, 1200);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full relative pt-4">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 relative z-20">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-400 group-focus-within:text-sage-600 transition-colors" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search any U.S. city, neighborhood, or zip code..." 
            className="w-full pl-12 pr-6 py-4 rounded-2xl glass border-sage-200 focus:outline-none focus:ring-2 focus:ring-sage-200 transition-all text-sage-700 placeholder:text-sage-400"
          />
        </div>
        <button 
          type="submit"
          disabled={isAnalyzing}
          className="bg-sage-700 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-sage-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-sage-200 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
                Analyzing...
            </>
          ) : (
            <>
              Analyze Now
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <AnimatePresence>
        {showSuggestions && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10"
              onClick={() => setShowSuggestions(false)}
            />
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 p-2 glass rounded-2xl border-sage-200 z-20 overflow-hidden shadow-xl"
            >
              <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-sage-400">
                Quick Suggestions
              </div>
              <div className="space-y-1">
                {suggestions.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => {
                      setQuery(s.name);
                      setShowSuggestions(false);
                      router.push(`/report/${encodeURIComponent(s.name)}`);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-sage-100/50 rounded-xl transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-sage-400 group-hover:text-sage-600" />
                      <span className="text-sm font-medium text-sage-700">{s.name}</span>
                    </div>
                    {s.type === "trending" && (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-mint-600 bg-mint-50 px-2 py-0.5 rounded-md">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <div className="flex justify-center gap-6 pt-6 text-xs text-sage-400 font-medium">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-mint-400" />
          Verified Public Data
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-mint-400" />
          50 States Coverage
        </div>
      </div>
    </div>
  );
}
