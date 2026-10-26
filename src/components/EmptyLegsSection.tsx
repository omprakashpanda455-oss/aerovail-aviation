"use client";

import React, { useState, useEffect } from "react";
import { Plane, Calendar, Clock, Users, Bell, Tag, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, Filter, AlertCircle, Loader2 } from "lucide-react";
import { CurrencyCode, formatCurrencyAmount } from "@/lib/currency";

interface EmptyLeg {
  id: number;
  flightCode: string;
  originCity: string;
  originCode: string;
  destinationCity: string;
  destinationCode: string;
  aircraftType: string;
  aircraftCategory: string;
  passengerCapacity: number;
  departureWindow: string;
  estimatedDuration: string;
  indicativePriceInr: number;
  discountPct: number;
  availableSeats: number;
  status: string;
  operatorNote?: string;
}

interface EmptyLegsSectionProps {
  currentCurrency: CurrencyCode;
  onSelectEmptyLeg: (leg: EmptyLeg) => void;
}

export function EmptyLegsSection({ currentCurrency, onSelectEmptyLeg }: EmptyLegsSectionProps) {
  const [emptyLegs, setEmptyLegs] = useState<EmptyLeg[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Alert modal state
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertName, setAlertName] = useState("");
  const [alertEmail, setAlertEmail] = useState("");
  const [alertPhone, setAlertPhone] = useState("");
  const [alertRoutes, setAlertRoutes] = useState("Mumbai to Dubai, Delhi to London");
  const [alertSubmitting, setAlertSubmitting] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);

  useEffect(() => {
    async function fetchEmptyLegs() {
      try {
        const res = await fetch("/api/empty-legs");
        const data = await res.json();
        if (data.emptyLegs) {
          setEmptyLegs(data.emptyLegs);
        }
      } catch (err) {
        console.error("Failed to load empty legs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEmptyLegs();
  }, []);

  const handleSubscribeAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail) return;

    setAlertSubmitting(true);
    try {
      const res = await fetch("/api/empty-legs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: alertName,
          email: alertEmail,
          phone: alertPhone,
          preferredRoutes: alertRoutes,
          preferredCategory: filterCategory,
        }),
      });

      if (res.ok) {
        setAlertSuccess(true);
      }
    } catch (err) {
      console.error("Subscription error:", err);
    } finally {
      setAlertSubmitting(false);
    }
  };

  const filteredLegs = emptyLegs.filter((leg) => {
    if (filterCategory === "all") return true;
    if (filterCategory === "super_midsize" && leg.aircraftCategory.toLowerCase().includes("midsize")) return true;
    if (filterCategory === "heavy" && leg.aircraftCategory.toLowerCase().includes("heavy")) return true;
    if (filterCategory === "light" && leg.aircraftCategory.toLowerCase().includes("light")) return true;
    if (filterCategory === "turboprop" && leg.aircraftCategory.toLowerCase().includes("turboprop")) return true;
    return true;
  });

  return (
    <section id="empty-legs" className="py-24 bg-[#07101E] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10213E] border border-[#D4AF37]/30 mb-4">
              <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                Repositioning Radar
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
              Curated <span className="gold-gradient-text">Empty-Leg Opportunities</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              When private aircraft reposition between missions, take advantage of premium one-way private jet flights at up to 50% savings against full charter rates.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAlertModal(true)}
            className="btn-navy-outline px-5 py-3 rounded-md text-xs uppercase tracking-wider font-semibold flex items-center gap-2 shrink-0 self-start md:self-auto"
          >
            <Bell className="w-4 h-4 text-[#D4AF37]" />
            <span>Join Empty-Leg Priority Desk</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs">
          <span className="text-slate-400 uppercase tracking-wider text-[11px] font-semibold mr-2 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#D4AF37]" /> Filter:
          </span>
          {[
            { id: "all", label: "All Sectors" },
            { id: "heavy", label: "Heavy / Global Jets" },
            { id: "super_midsize", label: "Midsize & Super-Midsize" },
            { id: "light", label: "Light Jets" },
            { id: "turboprop", label: "Executive Turboprop" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all font-medium ${
                filterCategory === tab.id
                  ? "bg-[#D4AF37] text-[#050B17] font-bold shadow-md"
                  : "bg-[#0B172C] text-slate-300 hover:bg-[#10213E] border border-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Empty Legs List Grid */}
        {loading ? (
          <div className="p-12 text-center text-slate-400 flex items-center justify-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-[#D4AF37]" />
            <span>Scanning live positioning feeds...</span>
          </div>
        ) : filteredLegs.length === 0 ? (
          <div className="bg-[#0B172C] border border-white/10 rounded-2xl p-12 text-center">
            <p className="text-slate-300 text-sm mb-4">
              No empty legs currently matching this filter.
            </p>
            <button
              onClick={() => setShowAlertModal(true)}
              className="btn-gold-primary px-6 py-2.5 rounded-md text-xs font-bold uppercase"
            >
              Get Notified When Routes Open
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredLegs.map((leg) => (
              <div
                key={leg.id}
                className="bg-[#0B172C]/85 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 rounded-2xl p-6 sm:p-7 backdrop-blur-md transition-all duration-300 shadow-xl flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Discount Badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#D4AF37] to-[#C5A059] text-[#050B17] text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-bl-xl shadow-md">
                  Save ~{leg.discountPct}% vs Standard Rate
                </div>

                <div>
                  {/* Top Flight Code & Aircraft Category */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-mono text-[#D4AF37] bg-[#10213E] px-2 py-0.5 rounded border border-[#D4AF37]/30">
                      {leg.flightCode}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {leg.aircraftCategory}
                    </span>
                  </div>

                  {/* Route City Pair */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <div>
                      <span className="text-2xl sm:text-3xl font-serif font-bold text-white block">
                        {leg.originCity}
                      </span>
                      <span className="text-xs font-mono text-[#D4AF37] tracking-wider">
                        {leg.originCode}
                      </span>
                    </div>

                    <div className="flex flex-col items-center px-4">
                      <span className="text-[10px] text-slate-400 mb-1">{leg.estimatedDuration}</span>
                      <div className="flex items-center gap-1.5 w-24">
                        <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-[#D4AF37] to-slate-600" />
                        <Plane className="w-3.5 h-3.5 text-[#D4AF37] transform rotate-90" />
                      </div>
                      <span className="text-[9px] uppercase tracking-widest text-slate-500 mt-1">Non-stop</span>
                    </div>

                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-serif font-bold text-white block">
                        {leg.destinationCity}
                      </span>
                      <span className="text-xs font-mono text-[#D4AF37] tracking-wider">
                        {leg.destinationCode}
                      </span>
                    </div>
                  </div>

                  {/* Flight Info Details */}
                  <div className="grid grid-cols-3 gap-2 text-xs mb-6">
                    <div className="p-2.5 rounded-lg bg-[#050B17]/60 border border-white/5">
                      <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Aircraft</span>
                      <span className="font-semibold text-slate-200 truncate block">{leg.aircraftType}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#050B17]/60 border border-white/5">
                      <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Capacity</span>
                      <span className="font-semibold text-slate-200">Up to {leg.passengerCapacity} VIPs</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#050B17]/60 border border-white/5">
                      <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Departure Window</span>
                      <span className="font-semibold text-[#D4AF37] truncate block">{leg.departureWindow}</span>
                    </div>
                  </div>

                  {leg.operatorNote && (
                    <p className="text-[11px] text-slate-400 italic mb-6">
                      Note: {leg.operatorNote}
                    </p>
                  )}
                </div>

                {/* Pricing & Claim Action */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                      Indicative Empty-Leg Rate (Whole Aircraft)
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-serif font-bold text-[#D4AF37]">
                        {formatCurrencyAmount(leg.indicativePriceInr, currentCurrency)}
                      </span>
                      <span className="text-xs text-slate-500 line-through">
                        {formatCurrencyAmount(Math.round(leg.indicativePriceInr * 1.9), currentCurrency)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectEmptyLeg(leg)}
                    className="btn-gold-primary px-5 py-2.5 rounded-md text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Inquire On This Leg</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Priority Radar Modal */}
        {showAlertModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-[#0B172C] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl">
              <button
                type="button"
                onClick={() => {
                  setShowAlertModal(false);
                  setAlertSuccess(false);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                ✕
              </button>

              {alertSuccess ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-2">
                    Priority Alert Registered
                  </h3>
                  <p className="text-xs text-slate-300 mb-6">
                    You will receive direct notifications whenever empty-leg sectors matching your routes become available.
                  </p>
                  <button
                    onClick={() => {
                      setShowAlertModal(false);
                      setAlertSuccess(false);
                    }}
                    className="btn-gold-primary px-6 py-2.5 rounded-md text-xs uppercase font-bold"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribeAlert} className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="text-lg font-serif font-bold text-white">
                      Join Priority Empty-Leg Radar
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 mb-4">
                    Private aircraft repositioning schedules change daily. Register your preferred routes to receive instant WhatsApp or email notices before general public release.
                  </p>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={alertName}
                      onChange={(e) => setAlertName(e.target.value)}
                      placeholder="e.g. Vikram Mehta"
                      className="w-full bg-[#050B17] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                      Email Address <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={alertEmail}
                      onChange={(e) => setAlertEmail(e.target.value)}
                      placeholder="e.g. vikram@investments.com"
                      className="w-full bg-[#050B17] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                      Phone / WhatsApp (for Instant Route Alerts)
                    </label>
                    <input
                      type="tel"
                      value={alertPhone}
                      onChange={(e) => setAlertPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#050B17] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                      Preferred Routes
                    </label>
                    <input
                      type="text"
                      value={alertRoutes}
                      onChange={(e) => setAlertRoutes(e.target.value)}
                      placeholder="e.g. Mumbai to Dubai, Delhi to London, Goa getaways"
                      className="w-full bg-[#050B17] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={alertSubmitting}
                    className="w-full btn-gold-primary py-3 rounded-md text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 mt-4"
                  >
                    {alertSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Subscribe to Priority Alerts</span>}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
