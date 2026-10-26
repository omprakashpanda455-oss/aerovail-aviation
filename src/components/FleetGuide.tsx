"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AIRCRAFT_CATEGORIES, AircraftCategoryInfo } from "@/lib/aircraft-data";
import { Plane, Users, Navigation, Gauge, Briefcase, Sparkles, ArrowRight, ShieldCheck, Check } from "lucide-react";

interface FleetGuideProps {
  onSelectCategory: (categoryId: string) => void;
}

export function FleetGuide({ onSelectCategory }: FleetGuideProps) {
  const [selectedIdx, setSelectedIdx] = useState(2); // Default to Midsize Jet

  const aircraft = AIRCRAFT_CATEGORIES[selectedIdx];

  return (
    <section id="fleet" className="py-24 bg-[#07101E] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10213E] border border-[#D4AF37]/30 mb-4">
            <Plane className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Aircraft Categories
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            The Private Fleet <span className="gold-gradient-text">Matrix</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Understand aircraft classes, range capabilities, passenger limits, and representative models arranged through authorized air operators.
          </p>
        </div>

        {/* Category Horizontal Selector */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {AIRCRAFT_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setSelectedIdx(idx)}
              className={`px-5 py-3 rounded-xl whitespace-nowrap text-xs font-semibold uppercase tracking-wider transition-all duration-300 shrink-0 flex items-center gap-2 ${
                selectedIdx === idx
                  ? "bg-[#D4AF37] text-[#050B17] font-bold shadow-lg scale-105"
                  : "bg-[#0B172C] text-slate-300 hover:bg-[#10213E] border border-white/5"
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Aircraft Overview Card */}
        <div className="bg-[#0B172C]/90 border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full">
              <Image
                src={aircraft.image}
                alt={aircraft.name}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B172C] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0B172C]" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded bg-[#050B17]/85 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-semibold tracking-wider uppercase">
                  {aircraft.badge}
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
                  Arranged Aircraft Class
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                  {aircraft.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light mb-6">
                  {aircraft.tagline}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-[#050B17] border border-white/5">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                      <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="text-[10px] uppercase">Passengers</span>
                    </div>
                    <span className="text-xs font-semibold text-white block">{aircraft.passengers}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#050B17] border border-white/5">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                      <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="text-[10px] uppercase">Max Range</span>
                    </div>
                    <span className="text-xs font-semibold text-white block">
                      {aircraft.rangeNm.toLocaleString()} NM <span className="text-[10px] text-slate-400">({aircraft.rangeKm.toLocaleString()} km)</span>
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#050B17] border border-white/5">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                      <Gauge className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="text-[10px] uppercase">Cruise Speed</span>
                    </div>
                    <span className="text-xs font-semibold text-white block">{aircraft.cruisingSpeed}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#050B17] border border-white/5">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                      <Briefcase className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="text-[10px] uppercase">Cabin Height</span>
                    </div>
                    <span className="text-xs font-semibold text-white block">{aircraft.cabinHeight}</span>
                  </div>
                </div>

                {/* Representative Models & Best Suited */}
                <div className="space-y-4 mb-8">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold block mb-1.5">
                      Representative Models in Network:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {aircraft.representativeModels.map((m, mIdx) => (
                        <span
                          key={mIdx}
                          className="px-2.5 py-1 rounded bg-[#10213E] border border-white/10 text-xs text-slate-200"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold block mb-1.5">
                      Typical City Pair Sectors:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {aircraft.popularRoutes.map((r, rIdx) => (
                        <div
                          key={rIdx}
                          className="p-2 rounded bg-[#050B17]/80 border border-white/5 text-[11px]"
                        >
                          <span className="text-white font-medium block">{r.from} ➔ {r.to}</span>
                          <span className="text-[#D4AF37] font-mono text-[10px]">{r.time} flight</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => onSelectCategory(aircraft.id)}
                  className="btn-gold-primary px-6 py-3 rounded-md text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Request Quote for {aircraft.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-[11px] text-slate-400">
                  Operated by certified DGCA / FAA / EASA air carriers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
