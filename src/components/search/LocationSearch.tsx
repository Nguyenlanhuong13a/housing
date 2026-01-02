"use client";

import { Search, MapPin } from "lucide-react";
import { useState } from "react";

export function LocationSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto mb-16 px-4">
      <div className={`relative transition-all duration-500 transform ${isFocused ? 'scale-[1.02]' : 'scale-100'}`}>
        <div className="absolute -inset-1 bg-gradient-to-r from-mint-200 via-sage-100 to-sky-200 rounded-[2.2rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
        
        <div className="relative">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className={`transition-colors duration-300 ${isFocused ? 'text-sage-600' : 'text-sage-400'}`} size={22} />
          </div>
          
          <input
            type="text"
            value={query}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search neighborhood, city, or zip code..."
            className="w-full h-20 pl-16 pr-40 rounded-[2rem] glass border-sage-200/60 focus:outline-none focus:ring-4 focus:ring-mint-500/10 focus:border-mint-400/50 transition-all text-sage-700 placeholder:text-sage-400 font-semibold text-lg shadow-xl shadow-sage-900/5"
          />
          
          <div className="absolute inset-y-0 right-3 flex items-center">
            <button className="bg-sage-700 text-white h-14 px-10 rounded-[1.4rem] font-bold hover:bg-sage-800 hover:shadow-2xl hover:shadow-sage-700/30 active:scale-95 transition-all flex items-center gap-2">
              Analyze Area
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-sage-400 font-bold uppercase tracking-widest">
        <div className="flex items-center gap-2 group cursor-pointer hover:text-sage-600 transition-colors">
          <MapPin size={14} className="text-mint-500" />
          Trending: <span className="text-sage-700">Silver Lake, CA</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-sage-200 hidden sm:block" />
        <div className="flex items-center gap-2 group cursor-pointer hover:text-sage-600 transition-colors">
          <MapPin size={14} className="text-sky-500" />
          Popular: <span className="text-sage-700">Brooklyn, NY</span>
        </div>
      </div>
    </div>
  );
}
