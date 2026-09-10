"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  AlertOctagon,
  ShieldAlert,
  Building2,
  Scale,
  CheckCircle2,
  FileWarning,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  XCircle,
  HelpCircle,
  Gavel,
  ShieldCheck,
  Send,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { AdminNav } from "@/components/AdminNav";
import { SEED_CATEGORIES } from "@/lib/mockSeedData";

export default function AdminAnomaliesPage() {
  const { priceRates, recyclers, updateRecyclerStatus } = useAppStore();
  const [adjudicatedList, setAdjudicatedList] = useState<Record<string, string>>({});
  const [expandedId, setExpandedId] = useState<string | null>("pr_ano_cables");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Rule-based anomaly evaluation
  const marketAverages = priceRates.filter((p) => p.source === "MARKET_AVERAGE");
  const recyclerQuotes = priceRates.filter((p) => p.source === "RECYCLER_QUOTE");

  interface AnomalyRecord {
    quoteId: string;
    recyclerId: string;
    recyclerName: string;
    authNumber: string;
    location: string;
    categoryId: string;
    categoryName: string;
    unit: string;
    quotePrice: number;
    marketPrice: number;
    diffPrice: number;
    variancePercent: number;
    severity: "CRITICAL" | "MODERATE" | "NORMAL";
    status: string;
  }

  const evaluatedQuotes: AnomalyRecord[] = recyclerQuotes.map((quote) => {
    const marketAvg = marketAverages.find(
      (m) => m.materialCategoryId === quote.materialCategoryId && m.location === quote.location
    );

    const recycler = recyclers.find((r) => r._id === quote.recyclerId);
    const category = SEED_CATEGORIES.find((c) => c._id === quote.materialCategoryId);

    const quotePrice = quote.pricePerUnit;
    const marketPrice = marketAvg ? marketAvg.pricePerUnit : quotePrice;
    const diffPrice = marketPrice - quotePrice;
    const variancePercent = marketPrice > 0 ? (diffPrice / marketPrice) * 100 : 0;

    let severity: "CRITICAL" | "MODERATE" | "NORMAL" = "NORMAL";
    if (variancePercent > 30) {
      severity = "CRITICAL";
    } else if (variancePercent > 15) {
      severity = "MODERATE";
    }

    return {
      quoteId: quote._id,
      recyclerId: quote.recyclerId || "unknown",
      recyclerName: recycler?.facilityName || "Registered Recycler Facility",
      authNumber: recycler?.authorizationNumber || "CPCB/GEN-0000",
      location: quote.location,
      categoryId: quote.materialCategoryId,
      categoryName: category?.name || "E-Waste Category",
      unit: category?.unit || "kg",
      quotePrice,
      marketPrice,
      diffPrice,
      variancePercent: parseFloat(variancePercent.toFixed(1)),
      severity,
      status: adjudicatedList[quote._id] || (severity === "CRITICAL" ? "NEEDS_REVIEW" : "COMPLIANT"),
    };
  });

  // Filter for anomalies (>30% below market)
  const criticalAnomalies = evaluatedQuotes.filter(
    (item) => item.severity === "CRITICAL"
  );
  const allFlagged = evaluatedQuotes.filter(
    (item) => item.severity !== "NORMAL"
  );

  const handleAction = (quoteId: string, actionType: string, recyclerId: string, facilityName: string) => {
    setAdjudicatedList((prev) => ({ ...prev, [quoteId]: actionType }));

    if (actionType === "SUSPENDED") {
      updateRecyclerStatus(recyclerId, "UNAUTHORIZED");
      showToast(`Suspended license for "${facilityName}" and halted quotation intake.`);
    } else if (actionType === "SHOW_CAUSE_ISSUED") {
      showToast(`Formal Show-Cause notice dispatched to "${facilityName}" under CPCB Rule 13.`);
    } else if (actionType === "DISMISSED") {
      showToast(`Anomaly dismissed for "${facilityName}". Marked verified.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-[#FFFDF9] to-slate-50 pb-16">
      <AdminNav />

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-red-100 text-red-900 border border-red-300">
                Rule-Based Anomaly Detection
              </span>
              <span className="text-xs text-slate-500">SIH 2026 Problem Statement 26229</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Pricing Anomaly & Market Fairness Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Automated surveillance identifying predatory or below-market quotes to prevent exploitation of informal waste pickers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-red-700 bg-red-50 border border-red-200 px-3.5 py-2 rounded-xl flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>{criticalAnomalies.length} Flagged Below-Market</span>
            </span>
          </div>
        </div>

        {/* SIH Compliance Rule Logic Box */}
        <div className="bg-amber-50/70 rounded-3xl p-6 border border-amber-200 shadow-xs flex flex-col md:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
            <Gavel className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs">
            <h2 className="font-black text-slate-900 text-sm">Regulatory Rule Engine Specification</h2>
            <p className="text-slate-700">
              Under Smart India Hackathon guidelines, informal collectors frequently suffer from opaque middleman markdowns.
              Scrap Setu applies a deterministic, zero-hallucination benchmark filter:
            </p>
            <div className="font-mono bg-white/80 p-2.5 rounded-xl border border-amber-200 text-slate-800 font-semibold text-[11px] my-2">
              Flag Trigger: ((Market_Average[Category, Location] - Recycler_Quote) / Market_Average) &gt; 0.30 (30% Discount)
            </div>
            <p className="text-slate-600 text-[11px]">
              Quotes exceeding this 30% margin trigger an immediate regulatory hold for review under CPCB E-Waste Management Rules (Fair Value Guarantee).
            </p>
          </div>
        </div>

        {/* Flagged Anomalies List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-red-600" />
              <span>Flagged Submissions Requiring Adjudication ({allFlagged.length})</span>
            </h2>
            <span className="text-xs text-slate-500">Threshold: &gt;30% Below Market</span>
          </div>

          <div className="space-y-3">
            {allFlagged.map((ano) => {
              const isExpanded = expandedId === ano.quoteId;
              const isAdjudicated = adjudicatedList[ano.quoteId] !== undefined;

              return (
                <div
                  key={ano.quoteId}
                  className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden shadow-xs ${
                    ano.severity === "CRITICAL"
                      ? "border-red-300 ring-1 ring-red-100"
                      : "border-amber-200"
                  }`}
                >
                  {/* Card Summary Header */}
                  <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                          ano.severity === "CRITICAL"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        <AlertTriangle className="w-6 h-6" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-black text-slate-900 text-base">
                            {ano.recyclerName}
                          </span>
                          <span className="font-mono text-[11px] text-slate-500">
                            ({ano.authNumber})
                          </span>
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              ano.severity === "CRITICAL"
                                ? "bg-red-100 text-red-800 border border-red-300"
                                : "bg-amber-100 text-amber-800 border border-amber-300"
                            }`}
                          >
                            {ano.variancePercent}% Below Market
                          </span>
                        </div>

                        <div className="text-slate-600 text-xs mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span>Material: <strong className="text-slate-900">{ano.categoryName}</strong></span>
                          <span>•</span>
                          <span>Hub: <strong className="text-slate-900">{ano.location}</strong></span>
                          <span>•</span>
                          <span>
                            Recycler Quote: <strong className="text-red-700 font-mono">₹{ano.quotePrice}/{ano.unit}</strong>
                          </span>
                          <span>vs Market Benchmark: <strong className="text-slate-700 font-mono">₹{ano.marketPrice}/{ano.unit}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      {ano.status === "SHOW_CAUSE_ISSUED" ? (
                        <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300">
                          Notice Dispatched
                        </span>
                      ) : ano.status === "SUSPENDED" ? (
                        <span className="px-3 py-1 rounded-xl bg-red-100 text-red-900 font-bold text-xs border border-red-300">
                          License Revoked
                        </span>
                      ) : ano.status === "DISMISSED" ? (
                        <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs">
                          Adjudicated Compliant
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-xl bg-red-600 text-white font-black text-xs animate-pulse">
                          Pending Review
                        </span>
                      )}

                      <button
                        onClick={() => setExpandedId(isExpanded ? null : ano.quoteId)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer transition-colors"
                        aria-label="Toggle Details"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Regulatory Dossier & Adjudication Actions */}
                  {isExpanded && (
                    <div className="p-5 bg-slate-50 border-t border-slate-200 text-xs space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                          <span className="text-slate-500 font-semibold block text-[11px]">Pricing Deficit</span>
                          <span className="text-xl font-black text-red-700 mt-1 block">
                            -₹{ano.diffPrice} per {ano.unit}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            Loss to informal collector per standard lot: ~₹{(ano.diffPrice * 14).toFixed(0)}
                          </span>
                        </div>

                        <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                          <span className="text-slate-500 font-semibold block text-[11px]">Regulatory Classification</span>
                          <span className="text-sm font-black text-slate-900 mt-1 block">
                            Suspected Scrap Undervaluation
                          </span>
                          <span className="text-[10px] text-slate-500">
                            Possible illicit export routing or predatory margin capture
                          </span>
                        </div>

                        <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                          <span className="text-slate-500 font-semibold block text-[11px]">Recommended Enforcement</span>
                          <span className="text-sm font-black text-amber-900 mt-1 block">
                            SPCB / CPCB Section 13 Audit
                          </span>
                          <span className="text-[10px] text-slate-500">
                            Mandatory 48-hour justification requirement
                          </span>
                        </div>
                      </div>

                      {/* Regulatory Adjudication Action Buttons */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
                        <span className="font-bold text-slate-700">CPCB Regulatory Enforcement Actions:</span>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() =>
                              handleAction(
                                ano.quoteId,
                                "SHOW_CAUSE_ISSUED",
                                ano.recyclerId,
                                ano.recyclerName
                              )
                            }
                            className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <FileWarning className="w-3.5 h-3.5" />
                            <span>Issue Show-Cause Notice</span>
                          </button>

                          <button
                            onClick={() =>
                              handleAction(
                                ano.quoteId,
                                "SUSPENDED",
                                ano.recyclerId,
                                ano.recyclerName
                              )
                            }
                            className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Suspend Recycler Permit</span>
                          </button>

                          <button
                            onClick={() =>
                              handleAction(
                                ano.quoteId,
                                "DISMISSED",
                                ano.recyclerId,
                                ano.recyclerName
                              )
                            }
                            className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs cursor-pointer"
                          >
                            Dismiss / Verified OK
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {allFlagged.length === 0 && (
              <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <div className="font-bold text-slate-900">All Active Recycler Quotes Within Normal Range</div>
                <p className="text-xs text-slate-500 mt-1">
                  Zero quotes are more than 30% below market average across Maharashtra hubs.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* All Active Quotes Monitored Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Active Market Surveillance Log</h2>
              <p className="text-xs text-slate-500">Every live recycler price quote compared against daily regional benchmarks</p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Total {evaluatedQuotes.length} quotes monitored
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-6">Recycler Facility</th>
                  <th className="py-3 px-4">Material Category</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Recycler Quote</th>
                  <th className="py-3 px-4">Market Average</th>
                  <th className="py-3 px-4">Variance %</th>
                  <th className="py-3 px-6 text-right">Compliance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {evaluatedQuotes.map((q) => (
                  <tr key={q.quoteId} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-slate-900">{q.recyclerName}</td>
                    <td className="py-3.5 px-4 text-slate-700">{q.categoryName}</td>
                    <td className="py-3.5 px-4 text-slate-500">{q.location}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">₹{q.quotePrice}/{q.unit}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">₹{q.marketPrice}/{q.unit}</td>
                    <td className="py-3.5 px-4 font-bold">
                      <span
                        className={
                          q.variancePercent > 30
                            ? "text-red-700 font-extrabold"
                            : q.variancePercent > 0
                            ? "text-amber-700"
                            : "text-emerald-700"
                        }
                      >
                        {q.variancePercent > 0 ? `-${q.variancePercent}%` : `+${Math.abs(q.variancePercent)}%`}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      {q.severity === "CRITICAL" ? (
                        <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-800 font-black text-[10px] border border-red-300">
                          CRITICAL ANOMALY
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                          COMPLIANT
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
