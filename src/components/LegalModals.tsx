"use client";

import React from "react";
import { ShieldAlert, FileText, Lock, X } from "lucide-react";

export type LegalModalType = "privacy" | "terms" | "disclosure" | null;

interface LegalModalsProps {
  type: LegalModalType;
  onClose: () => void;
}

export function LegalModals({ type, onClose }: LegalModalsProps) {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0B172C] border border-[#D4AF37]/40 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl relative">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {type === "disclosure" && <ShieldAlert className="w-5 h-5 text-[#D4AF37]" />}
            {type === "privacy" && <Lock className="w-5 h-5 text-[#D4AF37]" />}
            {type === "terms" && <FileText className="w-5 h-5 text-[#D4AF37]" />}

            <h3 className="text-lg font-serif font-bold text-white">
              {type === "disclosure" && "Air Charter Brokerage Regulatory Disclosures"}
              {type === "privacy" && "Brokerage Privacy Policy & Data Discretion"}
              {type === "terms" && "Terms of Brokerage Service"}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto text-xs text-slate-300 leading-relaxed space-y-4">
          {type === "disclosure" && (
            <>
              <div className="p-4 rounded-xl bg-[#050B17] border border-[#D4AF37]/30 text-white font-medium">
                <strong>Mandatory Regulatory Disclosure:</strong> Aerovail Aviation acts exclusively as an independent air charter broker and does not own, maintain, manage, or operate aircraft.
              </div>

              <h4 className="text-sm font-semibold text-white">1. Operational Control</h4>
              <p>
                All charter flights, repositioning flights, and helicopter transfers quoted and arranged through Aerovail Aviation are operated by third-party air carriers that are fully certified and licensed by the Directorate General of Civil Aviation (DGCA) in India, the Federal Aviation Administration (FAA) in the United States, the European Union Aviation Safety Agency (EASA), or the relevant civil aviation regulatory authority holding operational jurisdiction.
              </p>

              <h4 className="text-sm font-semibold text-white">2. Responsibility & Carrier Authority</h4>
              <p>
                The certified air operator maintains complete and exclusive operational control of the aircraft, flight crew, maintenance schedules, flight release approvals, safety determinations, weather assessments, and air traffic control routing at all times during the mission.
              </p>

              <h4 className="text-sm font-semibold text-white">3. Brokerage Fiduciary Role</h4>
              <p>
                Aerovail Aviation’s fiduciary duty is to act as an objective advisor and intermediary on behalf of the charter customer—sourcing, negotiating, and coordinating logistical, catering, and VIP ground arrangements between the client and certified air operators.
              </p>
            </>
          )}

          {type === "privacy" && (
            <>
              <h4 className="text-sm font-semibold text-white">1. Strict Passenger Confidentiality</h4>
              <p>
                Aerovail Aviation enforces stringent confidentiality protocols. Passenger manifests, itineraries, departure locations, and contact records are treated with the highest degree of discretion and are shared solely with required civil aviation security authorities, FBO ground handling agents, and the operating air carrier as legally mandated for flight clearance.
              </p>

              <h4 className="text-sm font-semibold text-white">2. Information Collection</h4>
              <p>
                We collect personal details (full name, email, telephone number, passport/identification information for flight manifests) exclusively for the purpose of preparing charter proposals, verifying passenger eligibility with airport authorities, and executing flight arrangements.
              </p>

              <h4 className="text-sm font-semibold text-white">3. Non-Disclosure & Security</h4>
              <p>
                We never monetize, sell, or rent client data to commercial third parties. All electronic transmissions and database records are securely stored and encrypted according to international privacy and data protection standards.
              </p>
            </>
          )}

          {type === "terms" && (
            <>
              <h4 className="text-sm font-semibold text-white">1. Charter Arrangements & Quotations</h4>
              <p>
                All quotations issued by Aerovail Aviation are subject to aircraft availability, crew duty-time limitations, slot allocations, and civil aviation authority permissions at the time of formal confirmation.
              </p>

              <h4 className="text-sm font-semibold text-white">2. Operator Agreements & Liability</h4>
              <p>
                Upon selection of an aircraft, flight terms are governed by the specific charter agreement executed between the charterer and the operating carrier, in conjunction with Aerovail Aviation’s brokerage terms. The operating air carrier carries primary passenger liability insurance in accordance with statutory civil aviation regulations.
              </p>

              <h4 className="text-sm font-semibold text-white">3. Force Majeure & Weather Discretion</h4>
              <p>
                The pilot-in-command assigned by the certified air operator retains absolute authority to delay, divert, or cancel any flight due to inclement weather conditions, air traffic control restrictions, or safety considerations without penalty. Aerovail Aviation will make every reasonable effort to arrange suitable alternate aircraft or schedule adjustments for the client.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-gold-primary px-5 py-2 rounded-md text-xs font-bold uppercase"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
