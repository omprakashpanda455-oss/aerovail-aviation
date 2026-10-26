"use client";

import React, { useState } from "react";
import { Search, Plane, Clock, CheckCircle2, AlertCircle, Loader2, X, Phone, MessageSquare, Send } from "lucide-react";

interface QuoteTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRef?: string;
}

export function QuoteTrackerModal({ isOpen, onClose, defaultRef = "" }: QuoteTrackerModalProps) {
  const [referenceId, setReferenceId] = useState(defaultRef);
  const [loading, setLoading] = useState(false);
  const [enquiry, setEnquiry] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setEnquiry(null);

    if (!referenceId.trim()) {
      setErrorMsg("Please enter a valid Reference ID (e.g., ARV-2026-XXXX).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/enquiry/${referenceId.trim().toUpperCase()}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Reference ID not found. Please verify the code.");
      }

      setEnquiry(data.enquiry);
    } catch (err: any) {
      setErrorMsg(err.message || "Unable to track reference ID.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case "pending_review":
        return { step: 1, label: "Request Received", desc: "Assigned to Flight Broker" };
      case "sourcing_operators":
        return { step: 2, label: "Sourcing Aircraft", desc: "Checking fleet positioning & permissions" };
      case "quote_prepared":
      case "client_review":
        return { step: 3, label: "Quote Prepared", desc: "Itemized proposal ready for review" };
      case "confirmed":
        return { step: 4, label: "Flight Confirmed", desc: "FBO & VIP Handling scheduled" };
      default:
        return { step: 1, label: "In Review", desc: "Operations desk active" };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0B172C] border border-[#D4AF37]/40 rounded-2xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Search className="w-5 h-5 text-[#D4AF37]" />
          <h3 className="text-xl font-serif font-bold text-white">
            Track Charter Enquiry Reference
          </h3>
        </div>
        <p className="text-xs text-slate-300 mb-6">
          Enter your unique Aerovail reference code (e.g. <span className="text-[#D4AF37] font-mono">ARV-2026-XXXX</span>) to check the live status of your quote.
        </p>

        {/* Input Form */}
        <form onSubmit={handleTrack} className="flex gap-2 mb-6">
          <input
            type="text"
            value={referenceId}
            onChange={(e) => setReferenceId(e.target.value.toUpperCase())}
            placeholder="e.g. ARV-2026-X8K21"
            className="flex-1 bg-[#050B17] border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white uppercase font-mono tracking-wider focus:outline-none focus:border-[#D4AF37]"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-gold-primary px-5 py-2.5 rounded-lg text-xs uppercase font-bold flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Look Up</span>}
          </button>
        </form>

        {errorMsg && (
          <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 mb-6">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Enquiry Details Card */}
        {enquiry && (
          <div className="space-y-6 animate-fadeIn">
            {/* Status Timeline */}
            <div className="p-4 rounded-xl bg-[#050B17] border border-[#D4AF37]/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Live Mission Status
                </span>
                <span className="text-xs font-mono font-bold text-[#D4AF37] px-2 py-0.5 rounded bg-[#10213E] border border-[#D4AF37]/30">
                  {enquiry.referenceId}
                </span>
              </div>

              {/* Progress 4 Steps */}
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] mb-2">
                {[
                  { step: 1, title: "Received" },
                  { step: 2, title: "Sourcing" },
                  { step: 3, title: "Proposal" },
                  { step: 4, title: "Confirmed" },
                ].map((s) => {
                  const current = getStatusStep(enquiry.status);
                  const isDone = current.step >= s.step;
                  const isCurrent = current.step === s.step;
                  return (
                    <div key={s.step} className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold mb-1 ${
                          isDone
                            ? "bg-[#D4AF37] text-[#050B17]"
                            : "bg-[#10213E] text-slate-500 border border-white/5"
                        } ${isCurrent ? "ring-2 ring-[#D4AF37]/50" : ""}`}
                      >
                        {s.step}
                      </div>
                      <span className={isDone ? "text-white font-semibold" : "text-slate-500"}>
                        {s.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 pt-3 border-t border-white/10 text-center">
                <span className="text-xs font-semibold text-[#D4AF37] block">
                  {getStatusStep(enquiry.status).label}
                </span>
                <span className="text-[11px] text-slate-400">
                  {getStatusStep(enquiry.status).desc}
                </span>
              </div>
            </div>

            {/* Flight Itinerary Summary */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#10213E]/50 border border-white/5">
                <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Route</span>
                <span className="font-semibold text-white block">
                  {enquiry.departureCity} ➔ {enquiry.destinationCity}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#10213E]/50 border border-white/5">
                <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Date & Time</span>
                <span className="font-semibold text-white block">
                  {enquiry.departureDate} ({enquiry.departureTime})
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#10213E]/50 border border-white/5">
                <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Passengers</span>
                <span className="font-semibold text-white block">
                  {enquiry.passengerCount} VIPs ({enquiry.tripType?.replace("_", " ")})
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#10213E]/50 border border-white/5">
                <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Category</span>
                <span className="font-semibold text-[#D4AF37] block capitalize">
                  {enquiry.aircraftCategory?.replace("_", " ")}
                </span>
              </div>
            </div>

            {enquiry.adminNotes && (
              <div className="p-3 rounded-lg bg-[#050B17] border border-white/10 text-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold block mb-1">
                  Flight Advisor Note:
                </span>
                <p className="text-slate-300 font-light">{enquiry.adminNotes}</p>
              </div>
            )}

            {/* Direct WhatsApp Contact with Advisor */}
            <a
              href={`https://wa.me/919876543210?text=Hello%20Aerovail%20Aviation,%20inquiring%20about%20my%20charter%20reference%20${enquiry.referenceId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-gold-primary py-3 rounded-lg text-xs uppercase font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>Connect with Assigned Flight Broker</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
