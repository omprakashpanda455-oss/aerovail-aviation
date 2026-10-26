"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Plane, Users, Phone, Mail, Clock, CheckCircle2, RefreshCw, X, MessageSquare, Bell, FileText, ChevronRight, Edit3, Send } from "lucide-react";

interface AdminDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminDeskModal({ isOpen, onClose }: AdminDeskModalProps) {
  const [activeTab, setActiveTab] = useState<"enquiries" | "contacts" | "alerts">("enquiries");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    stats?: any;
    enquiries?: any[];
    contacts?: any[];
    alerts?: any[];
    emptyLegs?: any[];
  }>({});

  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [quotedAmount, setQuotedAmount] = useState("");
  const [updateMsg, setUpdateMsg] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUpdateEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    try {
      const res = await fetch(`/api/enquiry/${selectedEnquiry.referenceId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus || selectedEnquiry.status,
          adminNotes,
          quotedAmount,
        }),
      });

      if (res.ok) {
        setUpdateMsg("Enquiry updated successfully.");
        fetchData();
        setTimeout(() => setUpdateMsg(""), 3000);
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#07101E] border border-[#D4AF37]/40 rounded-2xl max-w-6xl w-full h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-[#0B172C] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#10213E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                  Aerovail Flight Operations Desk
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  Live DB
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Manage received charter quotes, passenger requests, and brokerage assignments.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              disabled={loading}
              className="p-2 rounded-lg bg-[#10213E] text-slate-300 hover:text-white border border-white/10 text-xs flex items-center gap-1.5"
              title="Refresh database"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher & Quick Stats */}
        <div className="px-6 py-3 bg-[#050B17] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab("enquiries");
                setSelectedEnquiry(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "enquiries"
                  ? "bg-[#D4AF37] text-[#050B17]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>Charter Quotes ({data.enquiries?.length || 0})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("contacts");
                setSelectedEnquiry(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "contacts"
                  ? "bg-[#D4AF37] text-[#050B17]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Messages ({data.contacts?.length || 0})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("alerts");
                setSelectedEnquiry(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "alerts"
                  ? "bg-[#D4AF37] text-[#050B17]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Empty-Leg Radar Leads ({data.alerts?.length || 0})</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-400">
            Total Inquiries: <span className="text-[#D4AF37] font-bold">{data.stats?.totalEnquiries || 0}</span> | Pending: <span className="text-amber-400 font-bold">{data.stats?.pendingEnquiries || 0}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === "enquiries" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Enquiries List */}
              <div className={`${selectedEnquiry ? "lg:col-span-6" : "lg:col-span-12"} space-y-3`}>
                {(!data.enquiries || data.enquiries.length === 0) ? (
                  <div className="p-8 text-center text-slate-400 text-xs bg-[#0B172C] rounded-xl border border-white/5">
                    No charter quote requests yet. Submit a test enquiry via the homepage form.
                  </div>
                ) : (
                  data.enquiries.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedEnquiry(item);
                        setNewStatus(item.status);
                        setAdminNotes(item.adminNotes || "");
                        setQuotedAmount(item.quotedAmount || "");
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedEnquiry?.id === item.id
                          ? "bg-[#10213E] border-[#D4AF37] shadow-lg"
                          : "bg-[#0B172C] border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-[#D4AF37]">
                          {item.referenceId}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                            item.status === "confirmed"
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                              : item.status === "quote_prepared"
                              ? "bg-blue-950 text-blue-300 border border-blue-500/30"
                              : "bg-amber-950 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {item.status.replace("_", " ")}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-white font-medium mb-1">
                        <span>
                          {item.departureCity} ➔ {item.destinationCity}
                        </span>
                        <span className="text-slate-400 text-[11px]">{item.departureDate}</span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
                        <span>
                          {item.fullName} ({item.passengerCount} VIPs)
                        </span>
                        <span className="text-slate-500 text-[10px]">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Selected Enquiry Detail Panel */}
              {selectedEnquiry && (
                <div className="lg:col-span-6 bg-[#0B172C] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 block">
                          Selected Reference
                        </span>
                        <span className="text-base font-mono font-bold text-[#D4AF37]">
                          {selectedEnquiry.referenceId}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedEnquiry(null)}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        ✕ Close
                      </button>
                    </div>

                    {updateMsg && (
                      <div className="p-2.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{updateMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 rounded bg-[#050B17] border border-white/5">
                        <span className="text-[10px] uppercase text-slate-400 block">Passenger</span>
                        <span className="font-semibold text-white">{selectedEnquiry.fullName}</span>
                        <span className="text-slate-400 block text-[11px]">{selectedEnquiry.email}</span>
                        <span className="text-[#D4AF37] block text-[11px] font-mono">
                          {selectedEnquiry.countryCode} {selectedEnquiry.phone}
                        </span>
                      </div>

                      <div className="p-2.5 rounded bg-[#050B17] border border-white/5">
                        <span className="text-[10px] uppercase text-slate-400 block">Mission Spec</span>
                        <span className="font-semibold text-white">
                          {selectedEnquiry.passengerCount} Passengers
                        </span>
                        <span className="text-slate-400 block text-[11px] capitalize">
                          {selectedEnquiry.tripType?.replace("_", " ")}
                        </span>
                        <span className="text-[#D4AF37] block text-[11px] capitalize">
                          Cat: {selectedEnquiry.aircraftCategory?.replace("_", " ")}
                        </span>
                      </div>
                    </div>

                    {selectedEnquiry.specialRequests && (
                      <div className="p-3 rounded bg-[#050B17] border border-white/5 text-xs">
                        <span className="text-[10px] uppercase text-slate-400 block mb-1">
                          Client Special Requests:
                        </span>
                        <p className="text-slate-200">{selectedEnquiry.specialRequests}</p>
                      </div>
                    )}

                    {/* Update Status Form */}
                    <form onSubmit={handleUpdateEnquiry} className="space-y-3 pt-3 border-t border-white/10">
                      <div>
                        <label className="text-[10px] uppercase text-slate-400 block mb-1">
                          Update Workflow Status
                        </label>
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                          className="w-full bg-[#050B17] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="pending_review">Pending Review</option>
                          <option value="sourcing_operators">Sourcing Operators & Fleet</option>
                          <option value="quote_prepared">Quote Prepared & Sent</option>
                          <option value="client_review">Under Client Review</option>
                          <option value="confirmed">Flight Confirmed (Booked)</option>
                          <option value="completed">Mission Completed</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase text-slate-400 block mb-1">
                          Quoted Amount (Optional)
                        </label>
                        <input
                          type="text"
                          value={quotedAmount}
                          onChange={(e) => setQuotedAmount(e.target.value)}
                          placeholder="e.g. ₹ 18,50,000 + GST"
                          className="w-full bg-[#050B17] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase text-slate-400 block mb-1">
                          Broker Internal / Client Visible Note
                        </label>
                        <textarea
                          rows={2}
                          value={adminNotes}
                          onChange={(e) => setAdminNotes(e.target.value)}
                          placeholder="e.g. Operator Falcon 2000 confirmed available from Kalina GA Terminal..."
                          className="w-full bg-[#050B17] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="btn-gold-primary flex-1 py-2.5 rounded text-xs font-bold uppercase"
                        >
                          Save Record Updates
                        </button>

                        <a
                          href={`https://wa.me/${selectedEnquiry.countryCode?.replace(
                            "+",
                            ""
                          )}${selectedEnquiry.phone}?text=Hello%20${encodeURIComponent(
                            selectedEnquiry.fullName
                          )},%20this%20is%20Aerovail%20Aviation%20regarding%20your%20charter%20quote%20request%20${
                            selectedEnquiry.referenceId
                          }.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-navy-outline px-4 py-2.5 rounded text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>WhatsApp Client</span>
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "contacts" && (
            <div className="space-y-3">
              {(!data.contacts || data.contacts.length === 0) ? (
                <div className="p-8 text-center text-slate-400 text-xs bg-[#0B172C] rounded-xl border border-white/5">
                  No contact messages received yet.
                </div>
              ) : (
                data.contacts.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-4 rounded-xl bg-[#0B172C] border border-white/10 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{msg.name}</span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#D4AF37] font-medium">
                      Subject: {msg.subject} ({msg.serviceInterest})
                    </div>
                    <p className="text-slate-300 font-light">{msg.message}</p>
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Email: {msg.email} | Phone: {msg.phone || "N/A"}</span>
                      <a
                        href={`mailto:${msg.email}?subject=RE: ${encodeURIComponent(msg.subject)}`}
                        className="text-[#D4AF37] hover:underline"
                      >
                        Reply via Email →
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "alerts" && (
            <div className="space-y-3">
              {(!data.alerts || data.alerts.length === 0) ? (
                <div className="p-8 text-center text-slate-400 text-xs bg-[#0B172C] rounded-xl border border-white/5">
                  No empty-leg radar subscriptions yet.
                </div>
              ) : (
                <div className="bg-[#0B172C] border border-white/10 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#050B17] text-slate-400 text-[10px] uppercase border-b border-white/10">
                      <tr>
                        <th className="p-3">Client</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Requested Routes</th>
                        <th className="p-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {data.alerts.map((alt) => (
                        <tr key={alt.id} className="hover:bg-[#10213E]/50">
                          <td className="p-3 text-white font-medium">{alt.fullName || "Subscriber"}</td>
                          <td className="p-3 text-slate-300">{alt.email}</td>
                          <td className="p-3 text-[#D4AF37] font-mono">{alt.phone || "N/A"}</td>
                          <td className="p-3 text-slate-300">{alt.preferredRoutes || "All Routes"}</td>
                          <td className="p-3 text-slate-400 text-[11px]">
                            {new Date(alt.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
