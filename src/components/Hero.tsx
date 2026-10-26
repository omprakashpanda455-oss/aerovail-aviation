"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plane, Calendar, Users, MapPin, ArrowRight, ShieldCheck, Clock, Award, Sparkles, ChevronRight } from "lucide-react";
import { AIRPORTS } from "@/lib/airports";

interface HeroProps {
  onRequestQuote: (preset?: {
    departureCity?: string;
    destinationCity?: string;
    departureDate?: string;
    passengerCount?: number;
    tripType?: string;
  }) => void;
  onExploreServices: () => void;
}

export function Hero({ onRequestQuote, onExploreServices }: HeroProps) {
  const [tripType, setTripType] = useState<"one_way" | "round_trip">("one_way");
  const [departure, setDeparture] = useState("Mumbai (BOM)");
  const [destination, setDestination] = useState("Dubai (DXB)");
  const [depDate, setDepDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split("T")[0];
  });
  const [passengers, setPassengers] = useState(4);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRequestQuote({
      departureCity: departure,
      destinationCity: destination,
      departureDate: depDate,
      passengerCount: passengers,
      tripType,
    });
  };

  const handleSwapAirports = () => {
    const temp = departure;
    setDeparture(destination);
    setDestination(temp);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#050B17]">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-jet.jpg"
          alt="Aerovail Aviation Private Jet on tarmac at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-60 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Layered Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B17] via-[#050B17]/60 to-[#050B17]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050B17]/90 via-[#050B17]/40 to-[#050B17]/80" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050B17] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left / Main Typography Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Discreet Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10213E]/80 border border-[#D4AF37]/30 backdrop-blur-md mb-6 shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E0C995]">
                Independent Air Charter Brokerage
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-serif font-bold text-white tracking-tight leading-[1.1] mb-6">
              Private Aviation. <br />
              <span className="gold-gradient-text">Arranged Around You.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed mb-8">
              Tailored private charter solutions for business and leisure, arranged through appropriate aviation operators across India and worldwide.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                type="button"
                onClick={() => onRequestQuote()}
                className="btn-gold-primary px-8 py-4 rounded-md text-sm uppercase tracking-wider font-bold shadow-2xl flex items-center justify-center gap-3 group"
              >
                <span>Request a Charter Quote</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onExploreServices}
                className="btn-navy-outline px-7 py-4 rounded-md text-sm uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
              >
                <span>Explore Services</span>
                <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>

            {/* Discreet Trust Matrix */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-white/10 w-full max-w-xl text-slate-300">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold font-serif text-[#D4AF37]">100%</span>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Discreet & Confidential</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold font-serif text-[#D4AF37]">Pan-India</span>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">& Global Reach</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold font-serif text-[#D4AF37]">Vetted</span>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Certified Operators</span>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Charter Concierge Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#0B172C]/85 border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl gold-glow-subtle relative overflow-hidden">
              {/* Subtle Corner Ambient Glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                  <span className="text-xs uppercase tracking-widest font-semibold text-slate-200">
                    Quick Route Planner
                  </span>
                </div>
                <div className="text-[11px] text-[#D4AF37] font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>24/7 Brokerage Desk</span>
                </div>
              </div>

              {/* Trip Type Selector */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#050B17] rounded-lg border border-white/5 mb-5">
                <button
                  type="button"
                  onClick={() => setTripType("one_way")}
                  className={`py-2 text-xs font-semibold rounded-md transition-all ${
                    tripType === "one_way"
                      ? "bg-[#10213E] text-[#D4AF37] border border-[#D4AF37]/30 shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  One Way
                </button>
                <button
                  type="button"
                  onClick={() => setTripType("round_trip")}
                  className={`py-2 text-xs font-semibold rounded-md transition-all ${
                    tripType === "round_trip"
                      ? "bg-[#10213E] text-[#D4AF37] border border-[#D4AF37]/30 shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Round Trip
                </button>
              </div>

              <form onSubmit={handleQuickSubmit} className="space-y-4">
                {/* Departure City */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                    Departure City / Airport
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                    <select
                      value={departure}
                      onChange={(e) => setDeparture(e.target.value)}
                      className="w-full bg-[#050B17]/90 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] appearance-none"
                    >
                      <optgroup label="India Hubs">
                        {AIRPORTS.filter((a) => a.region === "India").map((a) => (
                          <option key={`dep-${a.code}`} value={`${a.city} (${a.code})`}>
                            {a.city} ({a.code}) – {a.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="International Hubs">
                        {AIRPORTS.filter((a) => a.region !== "India").map((a) => (
                          <option key={`dep-intl-${a.code}`} value={`${a.city} (${a.code})`}>
                            {a.city} ({a.code}) – {a.country}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Swap Button & Destination City */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                      Destination City / Airport
                    </label>
                    <button
                      type="button"
                      onClick={handleSwapAirports}
                      className="text-[10px] text-[#D4AF37] hover:underline flex items-center gap-1"
                    >
                      ⇄ Reverse Route
                    </button>
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-[#050B17]/90 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] appearance-none"
                    >
                      <optgroup label="International Hubs">
                        {AIRPORTS.filter((a) => a.region !== "India").map((a) => (
                          <option key={`dest-intl-${a.code}`} value={`${a.city} (${a.code})`}>
                            {a.city} ({a.code}) – {a.country}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="India Hubs">
                        {AIRPORTS.filter((a) => a.region === "India").map((a) => (
                          <option key={`dest-${a.code}`} value={`${a.city} (${a.code})`}>
                            {a.city} ({a.code}) – {a.name}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Date & Passengers Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                      Departure Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                      <input
                        type="date"
                        value={depDate}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDepDate(e.target.value)}
                        className="w-full bg-[#050B17]/90 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                      Passengers
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                      <select
                        value={passengers}
                        onChange={(e) => setPassengers(Number(e.target.value))}
                        className="w-full bg-[#050B17]/90 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] appearance-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "Passenger" : "Passengers"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full btn-gold-primary py-3.5 rounded-lg text-xs uppercase tracking-wider font-bold shadow-xl flex items-center justify-center gap-2 mt-4"
                >
                  <span>Proceed to Full Quote Enquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-center text-slate-400">
                  Complimentary transparent quotations sourced from licensed air carriers.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
