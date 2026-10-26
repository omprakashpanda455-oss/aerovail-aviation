"use client";

import React, { useState, useEffect } from "react";
import { Plane, Calendar, Users, MapPin, User, Mail, Phone, Clock, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Loader2, AlertCircle, FileText, Check, Plus, Trash2, Send } from "lucide-react";
import { AIRPORTS } from "@/lib/airports";
import confetti from "canvas-confetti";

interface FormPreset {
  departureCity?: string;
  destinationCity?: string;
  departureDate?: string;
  returnDate?: string;
  passengerCount?: number;
  tripType?: string;
  serviceType?: string;
  aircraftCategory?: string;
}

interface CharterEnquiryFormProps {
  preset?: FormPreset | null;
  onSuccess?: (referenceId: string) => void;
}

export function CharterEnquiryForm({ preset, onSuccess }: CharterEnquiryFormProps) {
  const [tripType, setTripType] = useState<"one_way" | "round_trip" | "multi_leg">("one_way");
  const [departureCity, setDepartureCity] = useState("Mumbai (BOM)");
  const [destinationCity, setDestinationCity] = useState("Dubai (DXB)");
  const [departureDate, setDepartureDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split("T")[0];
  });
  const [departureTime, setDepartureTime] = useState("Morning (08:00 - 12:00)");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("Flexible");
  const [passengerCount, setPassengerCount] = useState(4);
  const [aircraftCategory, setAircraftCategory] = useState("recommend_best");
  const [serviceType, setServiceType] = useState("private_jet");

  // Multi-leg sectors if selected
  const [multiSectors, setMultiSectors] = useState<
    { from: string; to: string; date: string; time: string }[]
  >([
    { from: "Mumbai (BOM)", to: "New Delhi (DEL)", date: "", time: "Daylight" },
    { from: "New Delhi (DEL)", to: "Dubai (DXB)", date: "", time: "Daylight" },
  ]);

  // Contact Details
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [groundTransport, setGroundTransport] = useState(false);
  const [customCatering, setCustomCatering] = useState(false);
  const [petOnBoard, setPetOnBoard] = useState(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedData, setSubmittedData] = useState<any | null>(null);

  // Apply presets when passed from Hero or Services
  useEffect(() => {
    if (preset) {
      if (preset.departureCity) setDepartureCity(preset.departureCity);
      if (preset.destinationCity) setDestinationCity(preset.destinationCity);
      if (preset.departureDate) setDepartureDate(preset.departureDate);
      if (preset.passengerCount) setPassengerCount(preset.passengerCount);
      if (preset.tripType) setTripType(preset.tripType as any);
      if (preset.serviceType) setServiceType(preset.serviceType);
      if (preset.aircraftCategory) setAircraftCategory(preset.aircraftCategory);
    }
  }, [preset]);

  const handleSwapAirports = () => {
    const temp = departureCity;
    setDepartureCity(destinationCity);
    setDestinationCity(temp);
  };

  const handleAddSector = () => {
    setMultiSectors([
      ...multiSectors,
      { from: destinationCity, to: "London (FAB)", date: "", time: "Daylight" },
    ]);
  };

  const handleRemoveSector = (idx: number) => {
    if (multiSectors.length > 2) {
      setMultiSectors(multiSectors.filter((_, i) => i !== idx));
    }
  };

  const handleUpdateSector = (idx: number, field: string, val: string) => {
    const updated = [...multiSectors];
    updated[idx] = { ...updated[idx], [field]: val };
    setMultiSectors(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!departureCity || !destinationCity || !departureDate || !fullName || !email || !phone) {
      setErrorMsg("Please provide all required fields (Departure, Destination, Date, Name, Email, and Phone).");
      return;
    }

    if (tripType === "round_trip" && !returnDate) {
      setErrorMsg("Please specify a return date for round trip bookings.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        tripType,
        departureCity,
        departureCode: departureCity.match(/\((.*?)\)/)?.[1] || "",
        destinationCity,
        destinationCode: destinationCity.match(/\((.*?)\)/)?.[1] || "",
        departureDate,
        departureTime,
        returnDate: tripType === "round_trip" ? returnDate : null,
        returnTime: tripType === "round_trip" ? returnTime : null,
        multiLegDetails: tripType === "multi_leg" ? multiSectors : null,
        passengerCount,
        aircraftCategory,
        serviceType,
        fullName,
        email,
        phone,
        countryCode,
        specialRequests,
        groundTransportRequired: groundTransport,
        customCateringRequired: customCatering,
        petOnBoard,
      };

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit charter enquiry.");
      }

      setSubmittedData({
        ...payload,
        referenceId: data.referenceId,
        createdAt: new Date().toISOString(),
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#D4AF37", "#FFFFFF", "#C5A059", "#10213E"],
        });
      } catch (err) {
        // Confetti fallback
      }

      if (onSuccess) {
        onSuccess(data.referenceId);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while submitting your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmittedData(null);
    setSpecialRequests("");
  };

  return (
    <section id="charter-quote" className="py-24 bg-[#050B17] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10213E] border border-[#D4AF37]/30 mb-4">
            <Plane className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Confidential Brokerage Enquiry
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Request a <span className="gold-gradient-text">Charter Quote</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Provide your journey requirements below. An Aviation Advisor will source suitable aircraft from vetted operators and prepare a tailored, transparent quotation.
          </p>
        </div>

        {/* Confirmation Card if already submitted */}
        {submittedData ? (
          <div className="bg-[#0B172C] border-2 border-[#D4AF37] rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden animate-fadeIn">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-2">
                Enquiry Successfully Transmitted
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                Thank You, {submittedData.fullName}
              </h3>

              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Your charter request has been registered in our Flight Operations Desk. A dedicated aviation broker is currently evaluating aircraft positioning and will deliver your itemized proposal shortly.
              </p>

              {/* Reference ID Pill */}
              <div className="w-full bg-[#050B17] border border-[#D4AF37]/40 rounded-xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                    Your Charter Reference ID
                  </span>
                  <span className="text-xl sm:text-2xl font-mono font-bold text-[#D4AF37] tracking-wider">
                    {submittedData.referenceId}
                  </span>
                </div>
                <div className="text-right sm:text-right">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                    Assigned Desk
                  </span>
                  <span className="text-xs text-white font-medium">
                    24/7 Aerovail India & Global Liaison
                  </span>
                </div>
              </div>

              {/* Trip Summary Overview */}
              <div className="w-full bg-[#10213E]/50 border border-white/10 rounded-xl p-6 mb-8 text-left space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold border-b border-white/10 pb-2">
                  Trip Summary
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Route</span>
                    <span className="font-semibold text-white">
                      {submittedData.departureCity} → {submittedData.destinationCity}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Date</span>
                    <span className="font-semibold text-white">{submittedData.departureDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Passengers</span>
                    <span className="font-semibold text-white">{submittedData.passengerCount} VIPs</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Category</span>
                    <span className="font-semibold text-[#D4AF37] capitalize">
                      {submittedData.aircraftCategory.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                <a
                  href={`https://wa.me/919876543210?text=Hello%20Aerovail%20Aviation,%20I%20have%20submitted%20charter%20quote%20request%20${submittedData.referenceId}%20for%20${encodeURIComponent(
                    submittedData.departureCity
                  )}%20to%20${encodeURIComponent(submittedData.destinationCity)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-primary w-full sm:w-auto px-6 py-3 rounded-md text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Connect with Flight Manager on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleResetForm}
                  className="btn-navy-outline w-full sm:w-auto px-6 py-3 rounded-md text-xs uppercase tracking-wider font-semibold"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Main Form Card */
          <div className="bg-[#0B172C]/90 border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            {errorMsg && (
              <div className="mb-6 p-4 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Trip Type Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-3">
                  01. Select Journey Type
                </label>
                <div className="grid grid-cols-3 gap-3 p-1.5 bg-[#050B17] rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setTripType("one_way")}
                    className={`py-3 text-xs font-semibold rounded-lg transition-all text-center ${
                      tripType === "one_way"
                        ? "bg-[#10213E] text-[#D4AF37] border border-[#D4AF37]/40 shadow-lg"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    One Way
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripType("round_trip")}
                    className={`py-3 text-xs font-semibold rounded-lg transition-all text-center ${
                      tripType === "round_trip"
                        ? "bg-[#10213E] text-[#D4AF37] border border-[#D4AF37]/40 shadow-lg"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Round Trip
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripType("multi_leg")}
                    className={`py-3 text-xs font-semibold rounded-lg transition-all text-center ${
                      tripType === "multi_leg"
                        ? "bg-[#10213E] text-[#D4AF37] border border-[#D4AF37]/40 shadow-lg"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Multi-City / Leg
                  </button>
                </div>
              </div>

              {/* Standard Route (One Way & Round Trip) */}
              {tripType !== "multi_leg" ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                    {/* Departure */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                        Departure City / Airport <span className="text-[#D4AF37]">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                        <select
                          value={departureCity}
                          onChange={(e) => setDepartureCity(e.target.value)}
                          className="w-full bg-[#050B17] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                          required
                        >
                          <optgroup label="India Hubs">
                            {AIRPORTS.filter((a) => a.region === "India").map((a) => (
                              <option key={`form-dep-${a.code}`} value={`${a.city} (${a.code})`}>
                                {a.city} ({a.code}) – {a.name}
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label="International Hubs">
                            {AIRPORTS.filter((a) => a.region !== "India").map((a) => (
                              <option key={`form-dep-intl-${a.code}`} value={`${a.city} (${a.code})`}>
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
                        <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium">
                          Destination City / Airport <span className="text-[#D4AF37]">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={handleSwapAirports}
                          className="text-[11px] text-[#D4AF37] hover:underline"
                        >
                          ⇄ Swap
                        </button>
                      </div>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                        <select
                          value={destinationCity}
                          onChange={(e) => setDestinationCity(e.target.value)}
                          className="w-full bg-[#050B17] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                          required
                        >
                          <optgroup label="International Hubs">
                            {AIRPORTS.filter((a) => a.region !== "India").map((a) => (
                              <option key={`form-dest-intl-${a.code}`} value={`${a.city} (${a.code})`}>
                                {a.city} ({a.code}) – {a.country}
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label="India Hubs">
                            {AIRPORTS.filter((a) => a.region === "India").map((a) => (
                              <option key={`form-dest-${a.code}`} value={`${a.city} (${a.code})`}>
                                {a.city} ({a.code}) – {a.name}
                              </option>
                            ))}
                          </optgroup>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Dates & Times */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                        Departure Date <span className="text-[#D4AF37]">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                        <input
                          type="date"
                          value={departureDate}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setDepartureDate(e.target.value)}
                          className="w-full bg-[#050B17] border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                        Departure Time
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                        <select
                          value={departureTime}
                          onChange={(e) => setDepartureTime(e.target.value)}
                          className="w-full bg-[#050B17] border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] appearance-none"
                        >
                          <option>Flexible / Daylight</option>
                          <option>Morning (06:00 - 10:00)</option>
                          <option>Midday (10:00 - 14:00)</option>
                          <option>Afternoon (14:00 - 18:00)</option>
                          <option>Evening (18:00 - 22:00)</option>
                          <option>Night / Red-eye (22:00+)</option>
                        </select>
                      </div>
                    </div>

                    {tripType === "round_trip" && (
                      <>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                            Return Date <span className="text-[#D4AF37]">*</span>
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                            <input
                              type="date"
                              value={returnDate}
                              min={departureDate || new Date().toISOString().split("T")[0]}
                              onChange={(e) => setReturnDate(e.target.value)}
                              className="w-full bg-[#050B17] border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                            Return Time
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                            <select
                              value={returnTime}
                              onChange={(e) => setReturnTime(e.target.value)}
                              className="w-full bg-[#050B17] border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] appearance-none"
                            >
                              <option>Flexible</option>
                              <option>Morning (06:00 - 10:00)</option>
                              <option>Midday (10:00 - 14:00)</option>
                              <option>Afternoon (14:00 - 18:00)</option>
                              <option>Evening (18:00 - 22:00)</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                /* Multi-Leg Sector Builder */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                      Multi-Sector Routing
                    </span>
                    <button
                      type="button"
                      onClick={handleAddSector}
                      className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Sector
                    </button>
                  </div>

                  {multiSectors.map((sector, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-4 rounded-xl bg-[#050B17] border border-white/10 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center relative"
                    >
                      <div>
                        <label className="text-[10px] uppercase text-slate-400 block mb-1">
                          Sector 0{sIdx + 1} From
                        </label>
                        <input
                          type="text"
                          value={sector.from}
                          onChange={(e) => handleUpdateSector(sIdx, "from", e.target.value)}
                          placeholder="e.g. Mumbai (BOM)"
                          className="w-full bg-[#0B172C] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase text-slate-400 block mb-1">
                          Sector 0{sIdx + 1} To
                        </label>
                        <input
                          type="text"
                          value={sector.to}
                          onChange={(e) => handleUpdateSector(sIdx, "to", e.target.value)}
                          placeholder="e.g. Dubai (DXB)"
                          className="w-full bg-[#0B172C] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase text-slate-400 block mb-1">Date</label>
                        <input
                          type="date"
                          value={sector.date}
                          onChange={(e) => handleUpdateSector(sIdx, "date", e.target.value)}
                          className="w-full bg-[#0B172C] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <label className="text-[10px] uppercase text-slate-400 block mb-1">Time</label>
                          <input
                            type="text"
                            value={sector.time}
                            onChange={(e) => handleUpdateSector(sIdx, "time", e.target.value)}
                            placeholder="e.g. 10:00 AM"
                            className="w-full bg-[#0B172C] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                          />
                        </div>
                        {multiSectors.length > 2 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSector(sIdx)}
                            className="p-2 text-red-400 hover:text-red-300 mt-4"
                            title="Remove sector"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Aircraft & Passengers Specification */}
              <div className="pt-6 border-t border-white/10">
                <label className="block text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-4">
                  02. Aircraft Category & Passenger Count
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Passenger Count */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                      Passenger Count <span className="text-[#D4AF37]">*</span>
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                      <select
                        value={passengerCount}
                        onChange={(e) => setPassengerCount(Number(e.target.value))}
                        className="w-full bg-[#050B17] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] appearance-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 25, 30].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "Passenger (VIP)" : `Passengers (${n} VIPs)`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Aircraft Category */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                      Preferred Aircraft Category
                    </label>
                    <div className="relative">
                      <Plane className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                      <select
                        value={aircraftCategory}
                        onChange={(e) => setAircraftCategory(e.target.value)}
                        className="w-full bg-[#050B17] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] appearance-none"
                      >
                        <option value="recommend_best">Recommend Best for Route & Passengers</option>
                        <option value="turboprop">Executive Turboprop (e.g. King Air 350i)</option>
                        <option value="light_jet">Light Jet (e.g. Phenom 300 / Citation CJ4)</option>
                        <option value="midsize_jet">Midsize Jet (e.g. Challenger 350 / Hawker 900XP)</option>
                        <option value="super_midsize">Super-Midsize Jet (e.g. Praetor 600 / Citation Longitude)</option>
                        <option value="heavy_jet">Heavy / Ultra Long Range (e.g. Gulfstream G550 / G650)</option>
                        <option value="vip_helicopter">Twin-Engine VIP Helicopter (e.g. Bell 429 / AW139)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bespoke Concierge Preferences */}
              <div className="pt-6 border-t border-white/10">
                <label className="block text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-3">
                  03. Bespoke Concierge Add-ons (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label
                    onClick={() => setGroundTransport(!groundTransport)}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                      groundTransport
                        ? "bg-[#10213E] border-[#D4AF37] text-white"
                        : "bg-[#050B17] border-white/10 text-slate-300 hover:border-white/30"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        groundTransport ? "bg-[#D4AF37] border-[#D4AF37] text-[#050B17]" : "border-slate-500"
                      }`}
                    >
                      {groundTransport && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-xs font-medium">VIP Ground Chauffeur / Tarmac Transfer</span>
                  </label>

                  <label
                    onClick={() => setCustomCatering(!customCatering)}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                      customCatering
                        ? "bg-[#10213E] border-[#D4AF37] text-white"
                        : "bg-[#050B17] border-white/10 text-slate-300 hover:border-white/30"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        customCatering ? "bg-[#D4AF37] border-[#D4AF37] text-[#050B17]" : "border-slate-500"
                      }`}
                    >
                      {customCatering && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-xs font-medium">Haute Cuisine / Bespoke Catering</span>
                  </label>

                  <label
                    onClick={() => setPetOnBoard(!petOnBoard)}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                      petOnBoard
                        ? "bg-[#10213E] border-[#D4AF37] text-white"
                        : "bg-[#050B17] border-white/10 text-slate-300 hover:border-white/30"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        petOnBoard ? "bg-[#D4AF37] border-[#D4AF37] text-[#050B17]" : "border-slate-500"
                      }`}
                    >
                      {petOnBoard && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-xs font-medium">Pet on Board Clearance</span>
                  </label>
                </div>
              </div>

              {/* Contact Information & Confidentiality */}
              <div className="pt-6 border-t border-white/10">
                <label className="block text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-4">
                  04. Passenger / Principal Contact Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                      Full Name <span className="text-[#D4AF37]">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rajesh Singhania"
                        className="w-full bg-[#050B17] border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                      Email Address <span className="text-[#D4AF37]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rajesh@company.com"
                        className="w-full bg-[#050B17] border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                      Phone / WhatsApp <span className="text-[#D4AF37]">*</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-24 bg-[#050B17] border border-white/10 rounded-lg px-2 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="+91">+91 (IN)</option>
                        <option value="+971">+971 (UAE)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+1">+1 (US)</option>
                        <option value="+65">+65 (SG)</option>
                        <option value="+41">+41 (CH)</option>
                        <option value="+966">+966 (KSA)</option>
                      </select>
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#D4AF37]" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="98765 43210"
                          className="w-full bg-[#050B17] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Requests */}
                <div className="mt-4">
                  <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                    Special Requests & Luggage / Itinerary Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Heavy luggage, golf bags, specific FBO handling preference, or dietary restrictions..."
                    className="w-full bg-[#050B17] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Submit CTA & Disclosures */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>
                    Your inquiry is handled with strict confidentiality under our Brokerage Privacy Protocol.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold-primary w-full sm:w-auto px-10 py-4 rounded-md text-xs uppercase tracking-wider font-bold shadow-2xl flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Charter Enquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
