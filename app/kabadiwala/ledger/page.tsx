"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Clock,
  Download,
  IndianRupee,
  Layers,
  MapPin,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { SEED_CATEGORIES, SEED_RECYCLERS } from "@/lib/mockSeedData";

export default function KabadiwalaLedgerPage() {
  const { user, lots } = useAppStore();

  const userLots = useMemo(() => {
    return lots.filter(
      (l) => !user || l.collectorId === user.id || l.collectorId.startsWith("user_")
    );
  }, [lots, user]);

  // Passbook Summary Totals
  const totalCredited = useMemo(() => {
    return userLots
      .filter((l) => l.status === "CONFIRMED" || l.status === "PAID")
      .reduce((acc, curr) => acc + (curr.finalSaleValue || curr.quotedPrice || curr.estimatedValue), 0);
  }, [userLots]);

  const totalPending = useMemo(() => {
    return userLots
      .filter((l) => l.status === "MATCHED" || l.status === "HANDED_OVER" || l.status === "DRAFT")
      .reduce((acc, curr) => acc + curr.estimatedValue, 0);
  }, [userLots]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 font-sans space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/kabadiwala"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-900 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard / मुख्य पृष्ठ</span>
        </Link>

        <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>CPCB Certified Ledger • अधिकृत खाता बही</span>
        </span>
      </div>

      {/* Passbook Hardcover Container */}
      <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#D9CEB2] shadow-xl overflow-hidden">
        {/* Passbook Title Header (Vintage Bank Style) */}
        <div className="bg-gradient-to-r from-[#1A382E] to-[#0A261D] text-[#F4EBD9] p-6 sm:p-8 border-b-4 border-[#C29B38]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-5 h-5 text-[#E5C158]" />
                <span className="text-xs uppercase tracking-widest text-[#E5C158] font-bold">
                  Collector Statement of Accounts • खाता विवरण
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-wide text-white">
                Scrap Setu Passbook
              </h1>
              <p className="text-xs text-emerald-200/80 mt-1">
                Account Holder: <span className="font-bold text-white">{user?.name || "Ramesh Kumar"}</span> • {user?.location || "Nagpur, Maharashtra"}
              </p>
            </div>

            {/* Passbook Balance Badge */}
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 text-right shrink-0">
              <div className="text-[10px] uppercase font-bold text-emerald-300">
                Total Settled Earnings / कुल आय
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#E5C158]">
                ₹{totalCredited.toLocaleString("en-IN")}
              </div>
              <div className="text-[10px] text-emerald-200/70 mt-0.5">
                Pending Settlement: ₹{totalPending.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        </div>

        {/* Passbook Line Items (Classic Ledger Entry Format) */}
        <div className="p-4 sm:p-8 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-serif border-b border-[#E8DFC8] pb-2">
            <span>Passbook Entries / प्रविष्टि विवरण</span>
            <span>Showing {userLots.length} transactions</span>
          </div>

          <div className="space-y-3 font-mono">
            {userLots.map((lot, index) => {
              const category = SEED_CATEGORIES.find((c) => c._id === lot.materialCategoryId);
              const recycler = SEED_RECYCLERS.find((r) => r._id === lot.recyclerId);
              const isSettled = lot.status === "CONFIRMED" || lot.status === "PAID";
              const dateStr = new Date(lot.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });

              return (
                <div
                  key={lot._id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DFC8] hover:border-[#C29B38] shadow-xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans"
                >
                  {/* Left: Stamp & Details */}
                  <div className="flex items-start gap-4">
                    <div className="text-center shrink-0 w-12 pt-1">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">
                        #{index + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-700 block font-mono">
                        {dateStr}
                      </span>
                    </div>

                    <div className="border-l-2 border-[#E8DFC8] pl-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 text-sm">
                          {lot.referenceId}
                        </span>

                        {isSettled ? (
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
                            Credit Settled • जमा
                          </span>
                        ) : (
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-300">
                            {lot.status} • लंबित
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-600">
                        <span className="font-bold text-slate-800">{category?.name || "E-Waste"}</span>{" "}
                        • {lot.approxWeight} {category?.unit}
                        {recycler && (
                          <span className="text-slate-500 block text-[11px] mt-0.5">
                            Recycler: {recycler.facilityName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Credit Amount */}
                  <div className="text-right sm:self-center w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F0EAE1]">
                    <div className="text-xs text-slate-400 font-medium">Payout Amount</div>
                    <div
                      className={`text-lg sm:text-xl font-black font-mono ${
                        isSettled ? "text-emerald-700" : "text-amber-700"
                      }`}
                    >
                      {isSettled ? "+ ₹" : "₹"}
                      {(lot.finalSaleValue || lot.quotedPrice || lot.estimatedValue).toLocaleString(
                        "en-IN"
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">
                      {lot.status === "PAID"
                        ? "Mode: Digital UPI"
                        : isSettled
                        ? "Direct Bank Credit"
                        : "Estimated Spot Value"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Passbook Footer Seal */}
          <div className="pt-6 border-t border-[#E8DFC8] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-serif">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                ✓
              </div>
              <span>Officially recorded under Ministry of Mines E-Waste Regulations</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              Generated: {new Date().toLocaleDateString("en-IN")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
