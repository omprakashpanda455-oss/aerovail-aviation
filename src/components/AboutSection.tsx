"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Award, Eye, Lock, Globe, Building2, Sparkles, CheckCircle2 } from "lucide-react";

export function AboutSection() {
  const principles = [
    {
      icon: Eye,
      title: "Objective Passenger Advocacy",
      text: "As an independent brokerage, we do not operate our own aircraft fleet. This independence guarantees our recommendations are 100% objective, aligned strictly with your safety criteria, schedule, and budgetary parameters.",
    },
    {
      icon: Lock,
      title: "Discretion & Confidentiality",
      text: "We serve sovereign delegations, high-net-worth families, enterprise leaders, and private offices who require absolute discretion in their travel movements, passenger manifests, and communications.",
    },
    {
      icon: ShieldCheck,
      title: "Rigorous Operator Vetting",
      text: "Every flight arranged through Aerovail is sourced exclusively from licensed and authorized air carriers holding active Air Operator Certificates (AOC) issued by civil aviation authorities (DGCA, FAA, EASA, CAA).",
    },
    {
      icon: Globe,
      title: "Subcontinent & Global Network",
      text: "Headquartered with strong regional access across India’s commercial and private airfields, coupled with international liaison desks connecting Dubai, Europe, Southeast Asia, and the Americas.",
    },
  ];

  const locations = [
    { city: "New Delhi", label: "Operations Desk", address: "Aerocity & VIP Terminal Apron Access (Liaison)" },
    { city: "Mumbai", label: "Client Liaison", address: "Kalina General Aviation Enclave & BKC (Liaison)" },
    { city: "Dubai", label: "Middle East Desk", address: "DWC / Executive Airport Corridor (Liaison)" },
    { city: "London", label: "European Desk", address: "Farnborough & Mayfair Corridor (Liaison)" },
  ];

  return (
    <section id="about" className="py-24 bg-[#050B17] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10213E] border border-[#D4AF37]/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              About Aerovail Aviation
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Discreet Excellence in <span className="gold-gradient-text">Private Aviation</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Aerovail Aviation is a premier air charter brokerage founded on the pillars of absolute discretion, transparent advisory, and flawless journey coordination for discerning clients in India and worldwide.
          </p>
        </div>

        {/* Narrative & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-snug">
              Arranging bespoke aviation with precision, integrity, and international standards.
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              In private aviation, true value is defined by the absence of compromise. Whether arranging a swift turboprop hop between regional industrial centers in India or a nonstop ultra-long-range intercontinental mission across continents, Aerovail acts as your dedicated advocate.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              We liaise directly with vetted, certified aircraft operators, VIP General Aviation FBO terminals, ground transport providers, and civil aviation authorities to deliver end-to-end execution without operational friction.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {principles.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0B172C] border border-white/10 hover:border-[#D4AF37]/30 transition-all"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <Icon className="w-4 h-4 text-[#D4AF37]" />
                      <h4 className="text-xs uppercase tracking-wider font-bold text-white">
                        {p.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      {p.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl h-[460px]">
              <Image
                src="/images/concierge-service.jpg"
                alt="Aerovail Aviation VIP tarmac service"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B17] via-[#050B17]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0B172C]/90 backdrop-blur-md border border-[#D4AF37]/30">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
                  Air Charter Brokerage
                </span>
                <p className="text-xs text-slate-200">
                  Arranging flights strictly through appropriately licensed, certified, and audited air operators.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Liaison Hubs */}
        <div className="pt-12 border-t border-white/10">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Global Presence & Liaison Desks
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {locations.map((loc, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#0B172C]/70 border border-white/5 text-center flex flex-col justify-center"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Building2 className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-base font-serif font-bold text-white">{loc.city}</span>
                </div>
                <span className="text-[11px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-1">
                  {loc.label}
                </span>
                <span className="text-xs text-slate-400 font-light">{loc.address}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
