"use client";

import React, { useState, useEffect } from "react";
import { Plane, Phone, ShieldCheck, Menu, X, Search, Globe, ChevronDown, Sparkles } from "lucide-react";
import { CurrencyCode, CURRENCIES } from "@/lib/currency";

interface HeaderProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (curr: CurrencyCode) => void;
  onOpenTracker: () => void;
  onOpenCharterForm: (preset?: Record<string, string>) => void;
}

export function Header({
  currentCurrency,
  onCurrencyChange,
  onOpenTracker,
  onOpenCharterForm,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Fleet Guide", href: "#fleet" },
    { label: "Route Estimator", href: "#estimator" },
    { label: "Empty Legs", href: "#empty-legs" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Why Aerovail", href: "#why-choose-us" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Top Advisory Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#050B17]/95 backdrop-blur-md border-b border-[#D4AF37]/20 py-3 shadow-2xl"
            : "bg-[#050B17]/70 backdrop-blur-sm border-b border-white/5 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#10213E] to-[#081225] border border-[#D4AF37]/40 flex items-center justify-center shadow-lg group-hover:border-[#D4AF37] transition-all">
                <Plane className="w-5 h-5 text-[#D4AF37] transform -rotate-45 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-bold tracking-widest text-white uppercase font-serif">
                    AEROVAIL
                  </span>
                  <span className="text-[10px] tracking-widest px-1.5 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-sans font-semibold uppercase">
                    Aviation
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#94A3B8]">
                  Private Aviation Brokerage
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs uppercase tracking-wider text-slate-300 hover:text-[#D4AF37] transition-colors font-medium py-1"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Currency Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-md border border-white/10 hover:border-[#D4AF37]/40 bg-[#0B172C]/60 transition-all"
                  aria-label="Select Currency"
                >
                  <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="font-semibold">{currentCurrency}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {currencyDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded-lg bg-[#0B172C] border border-[#D4AF37]/30 shadow-2xl py-1 z-50 text-xs">
                    {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                      <button
                        key={code}
                        onClick={() => {
                          onCurrencyChange(code);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#10213E] transition-colors ${
                          currentCurrency === code ? "text-[#D4AF37] font-bold bg-[#10213E]/60" : "text-slate-300"
                        }`}
                      >
                        <span>{CURRENCIES[code].label}</span>
                        <span>{CURRENCIES[code].symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Track Quote Modal Button */}
              <button
                type="button"
                onClick={onOpenTracker}
                className="hidden md:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-md border border-white/10 hover:border-[#D4AF37]/40 bg-[#0B172C]/60 transition-all"
              >
                <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Track Reference</span>
              </button>

              {/* Direct Concierge WhatsApp / Phone */}
              <a
                href="https://wa.me/919876543210?text=Hello%20Aerovail%20Aviation,%20I%20would%20like%20to%20enquire%20about%20a%20private%20charter."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#D4AF37] px-2.5 py-1.5 transition-colors"
                title="Direct Concierge Line"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-mono text-[11px]">+91 (0) 11-AEROVAIL</span>
              </a>

              {/* Request Charter Primary CTA */}
              <button
                type="button"
                onClick={() => onOpenCharterForm()}
                className="btn-gold-primary text-xs tracking-wider uppercase px-4 sm:px-5 py-2 sm:py-2.5 rounded-md flex items-center gap-2 shadow-lg"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">Request a Quote</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#050B17]/98 border-b border-[#D4AF37]/20 px-6 py-6 transition-all duration-300">
            <div className="flex flex-col gap-4">
              <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#94A3B8]">Navigation</span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTracker();
                  }}
                  className="flex items-center gap-1.5 text-xs text-[#D4AF37] underline"
                >
                  <Search className="w-3.5 h-3.5" />
                  Track Quote Reference
                </button>
              </div>

              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-200 hover:text-[#D4AF37] transition-colors py-1 flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-slate-600 text-xs">→</span>
                </a>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Display Currency:</span>
                  <div className="flex gap-1.5">
                    {(["INR", "USD", "AED", "GBP"] as CurrencyCode[]).map((c) => (
                      <button
                        key={c}
                        onClick={() => onCurrencyChange(c)}
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          currentCurrency === c ? "bg-[#D4AF37] text-[#050B17]" : "bg-[#0B172C] text-slate-300"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCharterForm();
                  }}
                  className="w-full btn-gold-primary py-3 rounded-md text-xs uppercase tracking-wider font-bold text-center"
                >
                  Request a Charter Quote
                </button>

                <div className="text-[10px] text-center text-slate-400 pt-1">
                  Arranged via fully certified & licensed air operators
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
