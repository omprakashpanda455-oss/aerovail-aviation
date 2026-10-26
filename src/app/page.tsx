"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { CharterEnquiryForm } from "@/components/CharterEnquiryForm";
import { EmptyLegsSection } from "@/components/EmptyLegsSection";
import { RouteEstimator } from "@/components/RouteEstimator";
import { FleetGuide } from "@/components/FleetGuide";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { LegalModals, LegalModalType } from "@/components/LegalModals";
import { QuoteTrackerModal } from "@/components/QuoteTrackerModal";
import { AdminDeskModal } from "@/components/AdminDeskModal";
import { CurrencyCode } from "@/lib/currency";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function HomePage() {
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>("INR");
  const [legalModalType, setLegalModalType] = useState<LegalModalType>(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [formPreset, setFormPreset] = useState<any | null>(null);

  const scrollToCharterForm = (preset?: any) => {
    if (preset) {
      setFormPreset(preset);
    }
    const el = document.getElementById("charter-quote");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSelectService = (serviceKey: string) => {
    scrollToCharterForm({ serviceType: serviceKey });
  };

  const handleSelectEmptyLeg = (leg: any) => {
    scrollToCharterForm({
      departureCity: `${leg.originCity} (${leg.originCode})`,
      destinationCity: `${leg.destinationCity} (${leg.destinationCode})`,
      serviceType: "empty_leg",
      tripType: "one_way",
      passengerCount: leg.passengerCapacity,
    });
  };

  const handleBookRoute = (from: string, to: string) => {
    scrollToCharterForm({
      departureCity: from,
      destinationCity: to,
    });
  };

  const handleSelectCategory = (categoryId: string) => {
    scrollToCharterForm({
      aircraftCategory: categoryId,
    });
  };

  return (
    <div className="min-h-screen bg-[#050B17] text-white flex flex-col font-sans selection:bg-[#C5A059] selection:text-[#050B17]">
      {/* Top Advisory Bar */}
      <Header
        currentCurrency={currentCurrency}
        onCurrencyChange={(curr) => setCurrentCurrency(curr)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenCharterForm={() => scrollToCharterForm()}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onRequestQuote={(preset) => scrollToCharterForm(preset)}
          onExploreServices={() => {
            const el = document.getElementById("services");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 2. Services Section */}
        <ServicesSection
          onSelectService={handleSelectService}
          onExploreEmptyLegs={() => {
            const el = document.getElementById("empty-legs");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 3. Interactive Route Estimator */}
        <RouteEstimator onBookRoute={handleBookRoute} />

        {/* 4. Live Empty-Leg Radar */}
        <EmptyLegsSection
          currentCurrency={currentCurrency}
          onSelectEmptyLeg={handleSelectEmptyLeg}
        />

        {/* 5. How It Works */}
        <HowItWorks onStartJourney={() => scrollToCharterForm()} />

        {/* 6. Why Choose Us */}
        <WhyChooseUs />

        {/* 7. Fleet & Aircraft Matrix Guide */}
        <FleetGuide onSelectCategory={handleSelectCategory} />

        {/* 8. Charter Enquiry Form */}
        <CharterEnquiryForm preset={formPreset} />

        {/* 9. About Us */}
        <AboutSection />

        {/* 10. Contact & Operations Desk */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onRequestQuote={() => scrollToCharterForm()}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Modals */}
      <LegalModals type={legalModalType} onClose={() => setLegalModalType(null)} />
      <QuoteTrackerModal isOpen={isTrackerOpen} onClose={() => setIsTrackerOpen(false)} />
      <AdminDeskModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* Discreet Broker Flight Operations Desk Launcher Badge */}
      <div className="fixed bottom-4 right-4 z-40 hidden sm:block">
        <button
          type="button"
          onClick={() => setIsAdminOpen(true)}
          className="px-3 py-1.5 rounded-full bg-[#0B172C]/90 hover:bg-[#10213E] text-slate-400 hover:text-[#D4AF37] border border-white/10 hover:border-[#D4AF37]/40 shadow-2xl backdrop-blur-md text-[10px] font-mono tracking-wider flex items-center gap-1.5 transition-all"
          title="Open Broker Operations Desk"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Operations Desk</span>
        </button>
      </div>
    </div>
  );
}
