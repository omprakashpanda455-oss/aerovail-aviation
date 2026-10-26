"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceInterest, setServiceInterest] = useState("Private Jet Charter");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name || !email || !subject || !message) {
      setErrorMsg("Please fill out all required fields (Name, Email, Subject, and Message).");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message,
          serviceInterest,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to transmit message.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to transmit message. Please try again or reach out on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#07101E] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Advisory Information Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10213E] border border-[#D4AF37]/30 mb-4">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                  24/7 Operations Desk
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight mb-4">
                Connect with an <br />
                <span className="gold-gradient-text">Aviation Advisor</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Whether you need immediate flight arrangement, long-term corporate shuttle advisory, or aircraft sales guidance, our flight operations desk is at your service 24 hours a day.
              </p>
            </div>

            {/* Direct Contact Channels */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0B172C] border border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#10213E] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-0.5">
                    Direct Flight Concierge Line
                  </span>
                  <a
                    href="tel:+911140008899"
                    className="text-base font-semibold text-white hover:text-[#D4AF37] transition-colors"
                  >
                    +91 (0) 11-AEROVAIL / +91 11 4000 8899
                  </a>
                  <p className="text-[11px] text-slate-400 mt-0.5">Available 24/7/365 for urgent charters</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0B172C] border border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#10213E] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-0.5">
                    WhatsApp Concierge Desk
                  </span>
                  <a
                    href="https://wa.me/919876543210?text=Hello%20Aerovail%20Aviation,%20I%20would%20like%20to%20speak%20with%20an%20aviation%20advisor."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#D4AF37] hover:underline flex items-center gap-1.5"
                  >
                    <span>Direct Encrypted Chat (+91 98765 43210)</span>
                  </a>
                  <p className="text-[11px] text-slate-400 mt-0.5">Instant response from an assigned broker</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0B172C] border border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#10213E] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-0.5">
                    Advisory Inquiries Email
                  </span>
                  <a
                    href="mailto:concierge@aerovailaviation.com"
                    className="text-sm font-semibold text-white hover:text-[#D4AF37] transition-colors"
                  >
                    concierge@aerovailaviation.com
                  </a>
                  <p className="text-[11px] text-slate-400 mt-0.5">Charter enquiries & brokerage advisory</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#050B17] border border-white/10 flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <span>
                All inquiries are subject to strict non-disclosure agreements and client confidentiality standards.
              </span>
            </div>
          </div>

          {/* Right Contact Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-[#0B172C]/90 border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">
                    Message Received
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6">
                    Thank you. An Aerovail Aviation Advisor will review your inquiry and connect with you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage("");
                      setSubject("");
                    }}
                    className="btn-gold-primary px-6 py-2.5 rounded-md text-xs uppercase font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-white/10 pb-4 mb-4">
                    <h3 className="text-lg font-serif font-bold text-white">
                      General Brokerage & Advisory Message
                    </h3>
                    <p className="text-xs text-slate-400">
                      Submit your questions regarding bespoke charters, helicopter services, empty-legs, or aircraft sales.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-slate-300 block mb-1.5 font-medium">
                        Your Full Name <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Anand Mahindra"
                        className="w-full bg-[#050B17] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-slate-300 block mb-1.5 font-medium">
                        Email Address <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. anand@domain.com"
                        className="w-full bg-[#050B17] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-slate-300 block mb-1.5 font-medium">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#050B17] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-slate-300 block mb-1.5 font-medium">
                        Area of Interest
                      </label>
                      <select
                        value={serviceInterest}
                        onChange={(e) => setServiceInterest(e.target.value)}
                        className="w-full bg-[#050B17] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option>Private Jet Charter</option>
                        <option>Helicopter Charter</option>
                        <option>Empty-Leg Opportunities</option>
                        <option>Aircraft Sales Introductions</option>
                        <option>Corporate Fleet Program</option>
                        <option>Other Advisory</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-300 block mb-1.5 font-medium">
                      Subject <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Enquiry regarding annual corporate travel arrangements"
                      className="w-full bg-[#050B17] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-300 block mb-1.5 font-medium">
                      Message / Flight Requirements <span className="text-[#D4AF37]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Provide any details regarding your route, aircraft preferences, or questions..."
                      className="w-full bg-[#050B17] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-gold-primary py-3.5 rounded-lg text-xs uppercase tracking-wider font-bold shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Transmit Message to Advisory Desk</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
