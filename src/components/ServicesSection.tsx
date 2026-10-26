"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plane, Compass, Sparkles, ArrowRight, ShieldCheck, ArrowUpRight, CheckCircle2, RefreshCw, KeyRound, Building2 } from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (serviceKey: string) => void;
  onExploreEmptyLegs: () => void;
}

export function ServicesSection({ onSelectService, onExploreEmptyLegs }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const services = [
    {
      id: "private_jet",
      badge: "Flagship Service",
      title: "Private Jet Charter",
      subtitle: "Bespoke executive aircraft arranged to your exact schedule and destination.",
      image: "/images/hero-jet.jpg",
      description:
        "Whether you require a light jet for same-day intercity meetings across India or an ultra-long-range jet for nonstop travel to London, Zurich, or New York, Aerovail Aviation curates vetted aircraft tailored to your itinerary.",
      features: [
        "Light, Midsize, Super-Midsize, and Heavy Jet categories",
        "Direct access to private FBO VIP terminals across India and globally",
        "Personalized haute cuisine, bespoke ground transport, and pet-friendly cabins",
        "Dedicated Flight Advisor managing permissions, handling, and flight manifests",
      ],
      idealFor: "Corporate delegations, family leisure, high-profile roadshows, and international summits.",
      ctaLabel: "Request Jet Charter Quote",
      action: () => onSelectService("private_jet"),
    },
    {
      id: "helicopter",
      badge: "Point-to-Point Precision",
      title: "Helicopter Charter",
      subtitle: "Swift urban transfers, certified helipad access, and remote Himalayan connectivity.",
      image: "/images/vip-helicopter.jpg",
      description:
        "Bypass metropolitan gridlock and reach remote destinations with ease. We arrange twin-engine VIP helicopters for point-to-point urban shuttles, industrial plant inspections, private estate visits, and pilgrimage circuits.",
      features: [
        "Twin-engine executive helicopters (AW109, Bell 429, Airbus H145)",
        "Direct transfers between airport runways, rooftop helipads, and private estates",
        "Char Dham pilgrimage & high-altitude mountain landing arrangements",
        "Mumbai–Pune, Delhi–Jaipur, and South India resort corridor connections",
      ],
      idealFor: "Helipad-to-helipad city transfers, luxury resort arrivals, and remote industrial site visits.",
      ctaLabel: "Request Helicopter Quote",
      action: () => onSelectService("helicopter"),
    },
    {
      id: "empty_leg",
      badge: "High-Efficiency Positioning",
      title: "Empty-Leg Opportunities",
      subtitle: "Access one-way repositioning flights at exceptional brokerage pricing.",
      image: "/images/empty-leg.jpg",
      description:
        "When private aircraft reposition for scheduled missions or return to their home bases, empty-leg sectors become available. Aerovail Aviation offers clients exclusive access to these curated one-way opportunities at up to 50% savings.",
      features: [
        "Substantial cost advantages over standard charter pricing",
        "Access to popular routes: Mumbai–Dubai, Delhi–London, Bengaluru–Male, and domestic metros",
        "Live route notifications and priority empty-leg desk reservation",
        "Same ultra-luxury private cabin experience and VIP FBO handling",
      ],
      idealFor: "Flexible travelers, spontaneous getaways, and scheduled one-way executive relocations.",
      ctaLabel: "View Live Empty Legs",
      action: () => onExploreEmptyLegs(),
    },
    {
      id: "aircraft_sales",
      badge: "Advisory & Introductions",
      title: "Aircraft Sales Introductions",
      subtitle: "Independent advisory and discrete introductions for aircraft acquisition and divestment.",
      image: "/images/aircraft-sales.jpg",
      description:
        "Navigating the private aircraft marketplace requires objective insight and global connections. As independent brokers, we introduce prospective buyers and sellers to vetted opportunities without operational bias.",
      features: [
        "Pre-acquisition mission analysis and aircraft type recommendations",
        "Liaison with international aviation escrow, legal, and pre-purchase inspection specialists",
        "Discreet off-market aircraft introductions and broker-to-broker matching",
        "Unbiased advisory aligned exclusively with the client’s strategic interests",
      ],
      idealFor: "High-net-worth individuals, family offices, and corporations evaluating private aircraft ownership.",
      ctaLabel: "Inquire About Sales Advisory",
      action: () => onSelectService("aircraft_sales"),
    },
  ];

  const currentService = services[activeTab];

  return (
    <section id="services" className="py-24 bg-[#07101E] relative border-t border-white/5">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-radial-navy opacity-70 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10213E] border border-[#D4AF37]/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Our Brokerage Services
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Tailored Aviation. <span className="gold-gradient-text">Zero Compromise.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From short-notice domestic shuttles to intercontinental flagship flights, explore our comprehensive range of private aviation brokerage services arranged through appropriate aviation operators.
          </p>
        </div>

        {/* Service Navigation Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 p-1.5 bg-[#050B17]/90 border border-white/10 rounded-xl mb-12">
          {services.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`p-3 sm:p-4 rounded-lg text-left transition-all duration-300 flex flex-col justify-between ${
                activeTab === idx
                  ? "bg-[#10213E] border border-[#D4AF37]/50 shadow-xl"
                  : "hover:bg-[#0B172C] text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`text-[10px] uppercase tracking-wider font-semibold ${
                    activeTab === idx ? "text-[#D4AF37]" : "text-slate-400"
                  }`}
                >
                  0{idx + 1}
                </span>
                {activeTab === idx && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
              </div>
              <span
                className={`text-xs sm:text-sm font-semibold tracking-wide ${
                  activeTab === idx ? "text-white" : "text-slate-300"
                }`}
              >
                {item.title}
              </span>
            </button>
          ))}
        </div>

        {/* Active Service Showcase Card */}
        <div className="bg-[#0B172C]/90 border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Image Showcase */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[480px]">
              <Image
                src={currentService.image}
                alt={currentService.title}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B172C] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0B172C]" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded bg-[#050B17]/80 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-semibold tracking-wider uppercase">
                  {currentService.badge}
                </span>
              </div>
            </div>

            {/* Right Content Details */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-[#D4AF37] text-xs font-semibold tracking-widest uppercase">
                  <span>Arranged via Certified Operators</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
                  {currentService.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 mb-6 font-light leading-relaxed">
                  {currentService.description}
                </p>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                    Key Highlights & Capabilities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentService.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                        <span className="text-xs text-slate-300 leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal For Pill */}
                <div className="p-3.5 rounded-lg bg-[#050B17]/80 border border-white/5 mb-8">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                    Ideal For:
                  </span>
                  <span className="text-xs text-slate-200">{currentService.idealFor}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={currentService.action}
                  className="btn-gold-primary px-6 py-3 rounded-md text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>{currentService.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Transparent Brokerage Standards</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Service Cards Grid Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((item, idx) => (
            <div
              key={`card-${item.id}`}
              onClick={() => setActiveTab(idx)}
              className="bg-[#0B172C]/60 hover:bg-[#10213E]/80 border border-white/10 hover:border-[#D4AF37]/50 rounded-xl p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-[#D4AF37]">0{idx + 1}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h4 className="text-base font-serif font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {item.subtitle}
                </p>
              </div>
              <span className="text-[11px] text-[#D4AF37] font-semibold flex items-center gap-1">
                Explore details & rates →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
