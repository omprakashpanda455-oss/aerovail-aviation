"use client";

import React from "react";
import { Compass, FileSearch, CheckCircle2, ArrowRight, Clock, ShieldCheck, UserCheck, Sparkles } from "lucide-react";

interface HowItWorksProps {
  onStartJourney: () => void;
}

export function HowItWorks({ onStartJourney }: HowItWorksProps) {
  const steps = [
    {
      number: "01",
      title: "Share Your Journey",
      subtitle: "Tell us your route, schedule & preferences",
      description:
        "Submit your departure city, destination, travel dates, passenger count, and any bespoke requirements (e.g. VIP catering, ground transport, pet onboard). Your request is directly assigned to a dedicated Aviation Broker.",
      icon: Compass,
      highlights: ["Simple digital enquiry or WhatsApp", "Flexible schedule & aircraft category selection", "Special concierge & dietary requirements noted"],
    },
    {
      number: "02",
      title: "Explore Suitable Options",
      subtitle: "Transparent proposals from vetted operators",
      description:
        "We source available aircraft from our network of authorized and certified air carriers. You receive a curated proposal detailing aircraft models, year of manufacture, cabin photos, flight durations, and itemized quotations.",
      icon: FileSearch,
      highlights: ["No hidden costs or positioning surprises", "Operator safety vetting & documentation", "Side-by-side aircraft category comparisons"],
    },
    {
      number: "03",
      title: "Confirm Your Arrangement",
      subtitle: "Seamless booking & dedicated flight advisory",
      description:
        "Upon your selection, we finalize agreements with the chosen operator, coordinate General Aviation (GA/FBO) VIP terminal clearance, arrange passenger manifests, and monitor your mission from engine start to arrival.",
      icon: CheckCircle2,
      highlights: ["Direct FBO VIP terminal escort", "24/7 flight operations tracking", "Tailored end-to-end journey coordination"],
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#050B17] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10213E] border border-[#D4AF37]/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              How It Works
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            A Seamless Path to <span className="gold-gradient-text">Private Flight</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Our three-step brokerage process is designed for clarity, speed, and absolute peace of mind.
          </p>
        </div>

        {/* 3 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line on Desktop */}
          <div className="hidden md:block absolute top-20 left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent pointer-events-none" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-[#0B172C]/80 border border-white/10 hover:border-[#D4AF37]/40 rounded-2xl p-8 backdrop-blur-md relative transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between group"
              >
                {/* Step Top */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-[#10213E] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#050B17] transition-all">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-serif font-bold text-slate-700 group-hover:text-[#D4AF37]/40 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white mb-1.5">{step.title}</h3>
                  <p className="text-xs text-[#D4AF37] font-medium uppercase tracking-wider mb-4">
                    {step.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-light">
                    {step.description}
                  </p>
                </div>

                {/* Step Highlights */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {step.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bottom Banner */}
        <div className="mt-14 bg-gradient-to-r from-[#0B172C] via-[#10213E] to-[#0B172C] border border-[#D4AF37]/30 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-serif font-bold text-white">
                Have a Complex or Multi-Leg Itinerary?
              </h4>
              <p className="text-xs text-slate-300">
                Our flight advisors coordinate multi-city roadshows, corporate shuttles, and intermodal jet-plus-helicopter connections.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onStartJourney}
            className="btn-gold-primary px-6 py-3 rounded-md text-xs uppercase tracking-wider font-bold whitespace-nowrap flex items-center gap-2 shadow-lg shrink-0"
          >
            <span>Begin Your Request</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
