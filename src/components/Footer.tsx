"use client";

import React from "react";
import { Plane, ShieldCheck, Mail, Phone, MapPin, ArrowUp, Lock, Sparkles } from "lucide-react";
import { LegalModalType } from "./LegalModals";

interface FooterProps {
  onOpenLegal: (type: LegalModalType) => void;
  onRequestQuote: () => void;
  onOpenTracker: () => void;
}

export function Footer({ onOpenLegal, onRequestQuote, onOpenTracker }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#040914] border-t border-[#D4AF37]/20 text-slate-400 text-xs relative">
      {/* Top CTA Ribbon */}
      <div className="border-b border-white/5 py-10 bg-[#07101E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                Private Flight Arranged Around You
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Ready to plan your next journey?
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenTracker}
              className="btn-navy-outline px-5 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider"
            >
              Track Quote
            </button>
            <button
              type="button"
              onClick={onRequestQuote}
              className="btn-gold-primary px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider shadow-lg"
            >
              Request a Charter Quote
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#10213E] border border-[#D4AF37]/40 flex items-center justify-center">
                <Plane className="w-4 h-4 text-[#D4AF37] transform -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-widest text-white uppercase font-serif">
                  AEROVAIL
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#94A3B8]">
                  Aviation Brokerage
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed font-light pr-4">
              Aerovail Aviation is an independent private aviation brokerage arranging bespoke jet charters, helicopter transfers, empty-leg opportunities, and aircraft sales introductions for clients in India and worldwide.
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Strict Non-Disclosure & Fiduciary Standards</span>
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-bold font-serif mb-2">
              Aviation Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors">
                  Private Jet Charter
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors">
                  VIP Helicopter Charter
                </a>
              </li>
              <li>
                <a href="#empty-legs" className="hover:text-[#D4AF37] transition-colors">
                  Empty-Leg Opportunities
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors">
                  Aircraft Sales Introductions
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-[#D4AF37] transition-colors">
                  Fleet & Aircraft Matrix
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-[#D4AF37] transition-colors">
                  Route & Flight Time Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-bold font-serif mb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#how-it-works" className="hover:text-[#D4AF37] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#why-choose-us" className="hover:text-[#D4AF37] transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D4AF37] transition-colors">
                  About Aerovail
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D4AF37] transition-colors">
                  Operations Desk
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTracker}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  Track Quote Reference
                </button>
              </li>
            </ul>
          </div>

          {/* Contact / Desks */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-bold font-serif mb-2">
              Flight Operations Desk
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span className="text-slate-300 font-mono">+91 (0) 11-AEROVAIL</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span className="text-slate-300">concierge@aerovailaviation.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  New Delhi (VIP Terminal Liaison) • Mumbai (Kalina GA Liaison) • Dubai Liaison • London Liaison
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Disclosure Box */}
        <div className="p-5 rounded-xl bg-[#07101E] border border-[#D4AF37]/20 mb-10 text-[11px] leading-relaxed text-slate-400 space-y-2">
          <div className="flex items-center gap-2 text-white font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span className="uppercase tracking-wider text-[11px] text-[#D4AF37]">
              Brokerage Regulatory Disclosure
            </span>
          </div>
          <p>
            Aerovail Aviation acts exclusively as an independent air charter broker and does not own, maintain, or operate aircraft. All flights arranged through Aerovail Aviation are operated by fully licensed and authorized DGCA (India), FAA (United States), EASA (Europe), CAA (UK), or relevant civil aviation authority certified air carriers holding valid Air Operator Certificates (AOC). Operating carriers maintain exclusive operational control over all flights at all times.
          </p>
        </div>

        {/* Bottom Legal Links & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="text-slate-400">
            © {new Date().getFullYear()} Aerovail Aviation. All rights reserved. Ultra-premium private aviation brokerage.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onOpenLegal("disclosure")}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Regulatory Disclosures
            </button>
            <span className="text-slate-700">•</span>
            <button
              type="button"
              onClick={() => onOpenLegal("privacy")}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">•</span>
            <button
              type="button"
              onClick={() => onOpenLegal("terms")}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Terms of Service
            </button>
            <span className="text-slate-700">•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-[#D4AF37] flex items-center gap-1 text-[#D4AF37]"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
