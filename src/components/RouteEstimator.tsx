"use client";

import React, { useState } from "react";
import { AIRPORTS, calculateDistanceInKm, estimateFlightTime } from "@/lib/airports";
import { Compass, Clock, Plane, MapPin, Gauge, ArrowRight, Sparkles, Navigation } from "lucide-react";

interface RouteEstimatorProps {
  onBookRoute: (from: string, to: string) => void;
}

export function RouteEstimator({ onBookRoute }: RouteEstimatorProps) {
  const [originCode, setOriginCode] = useState("DEL");
  const [destCode, setDestCode] = useState("BOM");
  const [selectedCategory, setSelectedCategory] = useState("light_jet");

  const originAirport = AIRPORTS.find((a) => a.code === originCode) || AIRPORTS[0];
  const destAirport = AIRPORTS.find((a) => a.code === destCode) || AIRPORTS[1];

  const distanceKm = calculateDistanceInKm(
    originAirport.lat,
    originAirport.lng,
    destAirport.lat,
    destAirport.lng
  );
  const distanceNm = Math.round(distanceKm * 0.539957);

  const timeEst = estimateFlightTime(distanceKm, selectedCategory);

  const handleSwap = () => {
    const temp = originCode;
    setOriginCode(destCode);
    setDestCode(temp);
  };

  // Recommended category logic
  let recommendedCategory = "Light Jet";
  if (distanceKm > 5000) {
    recommendedCategory = "Heavy / Ultra Long Range";
  } else if (distanceKm > 2500) {
    recommendedCategory = "Midsize / Super-Midsize Jet";
  } else if (distanceKm < 500) {
    recommendedCategory = "Executive Turboprop or Light Jet";
  }

  return (
    <section id="estimator" className="py-24 bg-[#050B17] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10213E] border border-[#D4AF37]/30 mb-4">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Flight Estimator
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Interactive <span className="gold-gradient-text">Route & Time Calculator</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Estimate flight durations, distances, and optimal aircraft categories across Indian and global city pairs.
          </p>
        </div>

        {/* Interactive Estimator Console */}
        <div className="bg-[#0B172C]/90 border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Airport Selection */}
            <div className="lg:col-span-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
                {/* Origin */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
                    Origin Airport
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                    <select
                      value={originCode}
                      onChange={(e) => setOriginCode(e.target.value)}
                      className="w-full bg-[#050B17] border border-white/10 rounded-lg pl-10 pr-3 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <optgroup label="India Hubs">
                        {AIRPORTS.filter((a) => a.region === "India").map((a) => (
                          <option key={`orig-${a.code}`} value={a.code}>
                            {a.city} ({a.code})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="International Hubs">
                        {AIRPORTS.filter((a) => a.region !== "India").map((a) => (
                          <option key={`orig-intl-${a.code}`} value={a.code}>
                            {a.city} ({a.code}) – {a.country}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Destination */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Destination Airport
                    </label>
                    <button
                      type="button"
                      onClick={handleSwap}
                      className="text-[10px] text-[#D4AF37] hover:underline"
                    >
                      ⇄ Swap
                    </button>
                  </div>
                  <div className="relative">
                    <Navigation className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                    <select
                      value={destCode}
                      onChange={(e) => setDestCode(e.target.value)}
                      className="w-full bg-[#050B17] border border-white/10 rounded-lg pl-10 pr-3 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <optgroup label="India Hubs">
                        {AIRPORTS.filter((a) => a.region === "India").map((a) => (
                          <option key={`dest-${a.code}`} value={a.code}>
                            {a.city} ({a.code})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="International Hubs">
                        {AIRPORTS.filter((a) => a.region !== "India").map((a) => (
                          <option key={`dest-intl-${a.code}`} value={a.code}>
                            {a.city} ({a.code}) – {a.country}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>
              </div>

              {/* Aircraft Category Toggle */}
              <div>
                <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
                  Select Aircraft Speed Profile
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "turboprop", label: "Turboprop (500 km/h)" },
                    { id: "light_jet", label: "Light Jet (720 km/h)" },
                    { id: "midsize", label: "Midsize (800 km/h)" },
                    { id: "heavy_jet", label: "Heavy Jet (880 km/h)" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-2 rounded text-[11px] font-medium transition-all ${
                        selectedCategory === cat.id
                          ? "bg-[#10213E] text-[#D4AF37] border border-[#D4AF37]/40 shadow"
                          : "bg-[#050B17] text-slate-400 hover:text-white border border-white/5"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Airport Pair Details */}
              <div className="p-4 rounded-xl bg-[#050B17]/80 border border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Departure Airport Facility:</span>
                  <span className="text-white font-medium">{originAirport.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Arrival Airport Facility:</span>
                  <span className="text-white font-medium">{destAirport.name}</span>
                </div>
              </div>
            </div>

            {/* Right Calculation Display Results */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#10213E] to-[#081225] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                    Calculated Mission Vector
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    ICAO: {originAirport.icao} ➔ {destAirport.icao}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Distance */}
                  <div className="p-4 rounded-xl bg-[#050B17]/60 border border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
                      Great Circle Distance
                    </span>
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-white block">
                      {distanceKm.toLocaleString()} <span className="text-xs font-sans text-slate-400">km</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#D4AF37]">
                      ({distanceNm.toLocaleString()} NM)
                    </span>
                  </div>

                  {/* Flight Duration */}
                  <div className="p-4 rounded-xl bg-[#050B17]/60 border border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
                      Estimated Flight Time
                    </span>
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-[#D4AF37] block">
                      {timeEst.formatted}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Non-stop block time
                    </span>
                  </div>
                </div>

                {/* Recommended Aircraft Box */}
                <div className="p-4 rounded-xl bg-[#050B17]/80 border border-[#D4AF37]/20 mb-6">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
                    Optimal Aircraft Category
                  </span>
                  <span className="text-sm font-semibold text-white block">
                    {recommendedCategory}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Tailored for maximum fuel efficiency, passenger cabin comfort, and non-stop operational performance.
                  </span>
                </div>
              </div>

              {/* Action */}
              <button
                type="button"
                onClick={() =>
                  onBookRoute(
                    `${originAirport.city} (${originAirport.code})`,
                    `${destAirport.city} (${destAirport.code})`
                  )
                }
                className="w-full btn-gold-primary py-3.5 rounded-lg text-xs uppercase tracking-wider font-bold shadow-xl flex items-center justify-center gap-2"
              >
                <span>Request Quotation for This Exact Sector</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
