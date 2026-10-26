"use client";

import React from "react";
import { UserCheck, MessageSquare, Receipt, Globe2, ShieldCheck, Clock, Sparkles, Check, Lock } from "lucide-react";

export function WhyChooseUs() {
  const pillars = [
    {
      icon: UserCheck,
      title: "Personalised Service",
      description:
        "Every client is paired with a dedicated Aviation Advisor who manages every facet of your journey—from aircraft selection and customized catering to private tarmac vehicle arrangements and special on-board requests.",
      highlights: ["Single dedicated point of contact", "Custom catering & luxury ground logistics", "Tailored to your bespoke flight itinerary"],
    },
    {
      icon: MessageSquare,
      title: "Responsive Communication",
      description:
        "Time is your most valuable asset. Our flight operations desk operates 24/7/365, delivering swift turnaround on quotation requests, itinerary modifications, and real-time flight tracking updates via private phone and WhatsApp.",
      highlights: ["Under 60-minute initial quote turnaround", "Direct encrypted WhatsApp flight coordination", "24/7 proactive flight watch and updates"],
    },
    {
      icon: Receipt,
      title: "Transparent Quotations",
      description:
        "We believe in line-item clarity with zero unexpected surprises. Our charter proposals transparently itemize aircraft costs, landing/handling fees, crew per diems, and applicable taxes without hidden markups.",
      highlights: ["Clear, transparent brokerage fee structure", "Itemized breakdown of all flight components", "No surprise repositioning or de-icing surcharges"],
    },
    {
      icon: Globe2,
      title: "Pan-India & Global Coverage",
      description:
        "From tier 1-3 airports and remote civil enclaves across India to premier international General Aviation terminals in Dubai, London, Zurich, Singapore, and New York, our brokerage connects you globally.",
      highlights: ["Access to 100+ airstrips across India", "Seamless global international connections", "VIP FBO terminal clearances & expedite"],
    },
    {
      icon: Lock,
      title: "Discreet & Confidential",
      description:
        "Privacy and discretion are fundamental to high-level private aviation. We adhere to rigorous confidentiality protocols for high-net-worth individuals, royal delegations, family offices, and corporate executives.",
      highlights: ["Strict passenger confidentiality protocols", "Discreet private terminal handling", "Secure data protection and non-disclosure"],
    },
    {
      icon: ShieldCheck,
      title: "Independent Advocacy",
      description:
        "Because Aerovail Aviation is an independent brokerage rather than an operator with owned metal to keep busy, our recommendations are 100% aligned with your exact mission profile, safety standards, and value.",
      highlights: ["Unbiased aircraft type recommendations", "Operator verification and safety checks", "Objective passenger-first advocacy"],
    },
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-[#07101E] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10213E] border border-[#D4AF37]/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              The Aerovail Advantage
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Why Discerning Clients <br />
            <span className="gold-gradient-text">Choose Aerovail Aviation</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Personalised service, responsive communication, and transparent quotations define our commitment to every client journey.
          </p>
        </div>

        {/* 6 Grid Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#0B172C]/80 border border-white/10 hover:border-[#D4AF37]/40 rounded-2xl p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#10213E] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:bg-[#D4AF37] group-hover:text-[#050B17] transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  {item.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Advisory Quote Callout */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#0B172C] via-[#10213E]/80 to-[#0B172C] border border-[#D4AF37]/20 text-center max-w-4xl mx-auto">
          <blockquote className="text-base sm:text-lg font-serif italic text-slate-200 mb-3">
            “True luxury in private aviation is not merely speed; it is the confidence that every logistical detail, safety check, and personal preference has been anticipated with quiet excellence.”
          </blockquote>
          <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Aerovail Aviation Flight Operations Charter Desk
          </p>
        </div>
      </div>
    </section>
  );
}
