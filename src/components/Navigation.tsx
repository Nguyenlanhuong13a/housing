"use client";

import Link from "next/link";
import { Map, Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

interface NavigationProps {
  showSearch?: boolean;
}

export function Navigation({ showSearch = false }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/report/${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Features", href: "/#features" },
    { name: "How it works", href: "/#how-it-works" },
    { name: "Pricing", href: "/#pricing" },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 px-6 py-4 transition-all duration-300 ${isScrolled ? "pt-2" : "pt-4"}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={`max-w-7xl mx-auto flex justify-between items-center transition-all duration-300 ${
          isScrolled ? "glass shadow-sm py-2 px-6 rounded-2xl" : "glass py-3 px-6 rounded-2xl"
        }`}>
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-semibold text-xl tracking-tight text-sage-700" aria-label="Local Intelligence Home">
              <div className="w-8 h-8 bg-sage-600 rounded-lg flex items-center justify-center">
                <Map className="w-5 h-5 text-white" />
              </div>
              <span className="hidden sm:inline">Local Intelligence</span>
            </Link>

            {showSearch && (
              <form onSubmit={handleSearch} className="hidden lg:flex relative group max-w-xs transition-all focus-within:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400 group-focus-within:text-sage-600" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search any U.S. area..." 
                  className="w-full pl-10 pr-4 py-1.5 rounded-xl bg-white/50 border border-sage-200 focus:outline-none focus:ring-2 focus:ring-sage-200 transition-all text-sm"
                  aria-label="Search neighborhoods"
                />
              </form>
            )}
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8 text-sm font-medium text-sage-600">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="hover:text-sage-700 transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
            <button 
              className="bg-sage-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-sage-700 transition-all shadow-lg shadow-sage-200/50 active:scale-95"
              aria-label="Get Pro Access"
            >
              Get Pro
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-sage-600 hover:bg-sage-100 rounded-xl transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden pt-24 px-6 bg-[var(--color-sage-50)]/95 backdrop-blur-xl"
          >
            <div className="space-y-6 flex flex-col items-center">
              {showSearch && (
                <form onSubmit={handleSearch} className="w-full relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-400" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search neighborhoods..." 
                    className="w-full pl-12 pr-6 py-4 rounded-2xl glass border-sage-200 focus:outline-none focus:ring-2 focus:ring-sage-200"
                  />
                </form>
              )}
              
              <div className="w-full flex flex-col gap-4 text-center">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="text-lg font-semibold text-sage-700 py-2 hover:text-sage-900"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <button className="w-full bg-sage-700 text-white py-4 rounded-2xl font-bold shadow-lg">
                Get Pro Access
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
