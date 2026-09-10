"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  Scale,
  IndianRupee,
  Users,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  MapPin,
  FileSpreadsheet,
  Download,
  Filter,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { AdminNav } from "@/components/AdminNav";
import { SEED_CATEGORIES, SEED_USERS } from "@/lib/mockSeedData";

export default function AdminDashboardPage() {
  const { recyclers, lots, transactions, priceRates } = useAppStore();
  const [regionFilter, setRegionFilter] = useState<"ALL" | "Nagpur" | "Mumbai">("ALL");

  // Filter recyclers by status
  const authorizedRecyclers = recyclers.filter((r) => r.authorizationStatus === "AUTHORIZED");
  const pendingRecyclers = recyclers.filter((r) => r.authorizationStatus === "PENDING");
  const unauthorizedRecyclers = recyclers.filter((r) => r.authorizationStatus === "UNAUTHORIZED");

  // Material diverted: sum of confirmed or paid lot weights
  const confirmedLots = lots.filter(
    (l) => l.status === "CONFIRMED" || l.status === "PAID"
  );
  const totalDivertedWeightKg = confirmedLots.reduce(
    (sum, l) => sum + (l.approxWeight || 0),
    0
  );

  // Total value transacted (sum of completed transactions or finalSaleValue)
  const totalTransactedValue = transactions.reduce(
    (sum, t) => sum + (t.amount || 0),
    0
  );

  // Active collectors: distinct collector IDs with lots
  const activeCollectorIds = new Set(lots.map((l) => l.collectorId));
  const activeKabadiwalaCount = activeCollectorIds.size;

  // Anomaly calculation
  const marketAverages = priceRates.filter((p) => p.source === "MARKET_AVERAGE");
  const recyclerQuotes = priceRates.filter((p) => p.source === "RECYCLER_QUOTE");
  const anomalies = recyclerQuotes.filter((quote) => {
    const marketAvg = marketAverages.find(
      (m) => m.materialCategoryId === quote.materialCategoryId && m.location === quote.location
    );
    if (!marketAvg || marketAvg.pricePerUnit <= 0) return false;
    const discount = (marketAvg.pricePerUnit - quote.pricePerUnit) / marketAvg.pricePerUnit;
    return discount > 0.3; // >30% below market
  });

  // Diverted weight by category
  const categoryDiversion = SEED_CATEGORIES.map((cat) => {
    const catLots = confirmedLots.filter((l) => l.materialCategoryId === cat._id);
    const weight = catLots.reduce((sum, l) => sum + (l.approxWeight || 0), 0);
    const val = catLots.reduce((sum, l) => sum + (l.finalSaleValue || l.estimatedValue || 0), 0);
    return {
      category: cat,
      weight,
      val,
      count: catLots.length,
    };
  }).filter((c) => c.weight > 0);

  // Filtered recent formal handovers
  const displayLots = lots
    .filter((l) => {
      if (regionFilter === "ALL") return true;
      return l.collectionLocation.toLowerCase().includes(regionFilter.toLowerCase());
    })
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-[#FFFDF9] to-slate-50 pb-16">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Title & CPCB Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  CPCB / SPCB Regulatory Telemetry
                </span>
                <span className="text-[10px] font-bold text-slate-500">
                  SIH 2026 Problem Statement 26229
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                E-Waste Formalization & Market Oversight
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Centralized real-time tracking of informal-to-formal diversion, authorized recycler capacities, and pricing fairness.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => alert("CPCB Formalization Compliance Summary exported as CSV/PDF (Demo).")}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Export CPCB Report</span>
            </button>
          </div>
        </div>

        {/* Critical Anomaly Alert Banner (if any) */}
        {anomalies.length > 0 && (
          <div className="p-4 sm:p-5 rounded-3xl bg-red-50/90 border border-red-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-100 text-red-800 border border-red-300">
                    Pricing Anomaly Detected
                  </span>
                  <span className="text-xs text-red-700 font-bold">
                    {anomalies.length} Recycler Quote &gt;30% Below Market Benchmark
                  </span>
                </div>
                <p className="text-xs text-red-800/90 mt-1">
                  GreenEarth SafeRecycle Plant is quoting ₹390/kg for Cables in Nagpur (Market benchmark: ₹640/kg, -39.1%). This triggers automatic regulatory inquiry for potential scrap exploitation.
                </p>
              </div>
            </div>

            <Link
              href="/admin/anomalies"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shrink-0 shadow-xs transition-colors"
            >
              <span>Inspect Anomalies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* 4 Top-Level Metric Cards (Required by Phase 6) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Metric 1: Registered Recyclers by Status */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Registered Recyclers</span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900">{recyclers.length}</div>
              <div className="text-xs text-slate-500 mt-1">Facilities across Maharashtra</div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
              <span className="text-emerald-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {authorizedRecyclers.length} Authorized
              </span>
              <span className="text-amber-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                {pendingRecyclers.length} Pending
              </span>
              <span className="text-red-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                {unauthorizedRecyclers.length} Revoked
              </span>
            </div>
          </div>

          {/* Metric 2: Total Material Diverted */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Material Diverted</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Scale className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900">
                {totalDivertedWeightKg.toFixed(1)} <span className="text-base font-bold text-slate-600">kg</span>
              </div>
              <div className="text-xs text-emerald-700 font-semibold mt-1">
                Diverted from informal burning/dumping
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
              <span>Confirmed lots: {confirmedLots.length}</span>
              <span className="font-bold text-emerald-700">100% CPCB Tracked</span>
            </div>
          </div>

          {/* Metric 3: Total Transacted Value */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Formal Value Transacted</span>
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <IndianRupee className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900">
                ₹{totalTransactedValue.toLocaleString("en-IN")}
              </div>
              <div className="text-xs text-slate-500 mt-1">Direct collector bank payouts</div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
              <span>Avg per lot: ₹{(totalTransactedValue / (confirmedLots.length || 1)).toFixed(0)}</span>
              <span className="font-bold text-amber-700">0% Middleman Cut</span>
            </div>
          </div>

          {/* Metric 4: Active Kabadiwalas */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Active Kabadiwalas</span>
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900">{activeKabadiwalaCount}</div>
              <div className="text-xs text-slate-500 mt-1">Registered informal micro-collectors</div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-purple-700 font-semibold flex justify-between">
              <span>Passbook ledger active</span>
              <span className="font-bold">E-Shram Linked</span>
            </div>
          </div>
        </div>

        {/* Regulatory Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/recyclers"
            className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-base font-black text-slate-900">Recycler Licensing & Verification</h2>
              <p className="text-xs text-slate-600 mt-1">
                Authorize, review pending compliance dossiers, or revoke recycler intake permits.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-amber-700 group-hover:text-amber-800">
              <span>Manage Recyclers ({recyclers.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link
            href="/admin/prices"
            className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h2 className="text-base font-black text-slate-900">Market Price Trend Visibility</h2>
              <p className="text-xs text-slate-600 mt-1">
                Track historical commodity benchmarks across Nagpur and Mumbai across all 7 material streams.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-amber-700 group-hover:text-amber-800">
              <span>View Price Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link
            href="/admin/anomalies"
            className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-red-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 className="text-base font-black text-slate-900">Fair Pricing Anomaly Engine</h2>
              <p className="text-xs text-slate-600 mt-1">
                Automated rule-based detection for recycler quotes that undercut market rates by &gt;30%.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-red-700 group-hover:text-red-800">
              <span>Audit Anomalies ({anomalies.length} Flagged)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>

        {/* Breakdown by Material Stream & Recent Formalized Handovers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Material Stream Breakdown */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 lg:col-span-1">
            <h2 className="text-base font-black text-slate-900">Formalized Stream Breakdown</h2>
            <p className="text-xs text-slate-500">Tonnage safely diverted from informal scrap burning</p>

            <div className="space-y-3 pt-2">
              {categoryDiversion.map((item) => {
                const percentage = totalDivertedWeightKg > 0
                  ? Math.round((item.weight / totalDivertedWeightKg) * 100)
                  : 0;

                return (
                  <div key={item.category._id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-900">{item.category.name}</span>
                      <span className="text-slate-700">{item.weight} kg ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-amber-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1">
                      <span>{item.count} lot(s) processed</span>
                      <span className="font-semibold text-emerald-700">₹{item.val.toLocaleString("en-IN")} payout</span>
                    </div>
                  </div>
                );
              })}

              {categoryDiversion.length === 0 && (
                <div className="p-4 text-center text-xs text-slate-400">
                  No confirmed lots recorded yet.
                </div>
              )}
            </div>
          </div>

          {/* Recent Formal Traceability Stream */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-black text-slate-900">Audit Stream: Recent Traceability Handovers</h2>
                <p className="text-xs text-slate-500">Live custody transfer logs between informal collectors & registered recyclers</p>
              </div>

              {/* Region Filter */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setRegionFilter("ALL")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    regionFilter === "ALL" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  All Hubs
                </button>
                <button
                  onClick={() => setRegionFilter("Nagpur")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    regionFilter === "Nagpur" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Nagpur
                </button>
                <button
                  onClick={() => setRegionFilter("Mumbai")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    regionFilter === "Mumbai" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Mumbai
                </button>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {displayLots.map((lot) => {
                const cat = SEED_CATEGORIES.find((c) => c._id === lot.materialCategoryId);
                const rec = recyclers.find((r) => r._id === lot.recyclerId);
                const collector = SEED_USERS.find((u) => u._id === lot.collectorId);

                return (
                  <div key={lot._id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center font-mono font-bold text-amber-900 shrink-0 text-[11px]">
                        {cat?.name.substring(0, 3)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900">{lot.referenceId}</span>
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                              lot.status === "CONFIRMED" || lot.status === "PAID"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : lot.status === "HANDED_OVER"
                                ? "bg-blue-50 text-blue-800 border-blue-200"
                                : "bg-amber-50 text-amber-800 border-amber-200"
                            }`}
                          >
                            {lot.status}
                          </span>
                        </div>
                        <div className="text-slate-600 text-[11px] mt-0.5">
                          {cat?.name} • {lot.approxWeight} {cat?.unit} • Collector: {collector?.name || "Ramesh Kumar"}
                        </div>
                        <div className="text-slate-400 text-[10px] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          <span>{lot.collectionLocation}</span>
                          {rec && <span>→ Recycler: {rec.facilityName}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="text-right sm:self-center">
                      <div className="font-black text-slate-900 text-sm">
                        ₹{lot.finalSaleValue || lot.quotedPrice || lot.estimatedValue}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {lot.status === "CONFIRMED" || lot.status === "PAID" ? "Settled Direct" : "Estimated Value"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
