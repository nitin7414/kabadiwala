"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Cpu,
  Factory,
  IndianRupee,
  Save,
  Sliders,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import {
  SEED_CATEGORIES,
  SEED_PRICE_RATES,
  SEED_RECYCLERS,
} from "@/lib/mockSeedData";

export default function RecyclerRatesPage() {
  const { user, priceRates, updatePriceRate } = useAppStore();

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Identify facility for user
  const facility = useMemo(() => {
    return (
      SEED_RECYCLERS.find((r) => r.userId === user?.id) ||
      SEED_RECYCLERS[0]
    );
  }, [user]);

  // Local state for editable rates
  const [ratesMap, setRatesMap] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    SEED_CATEGORIES.forEach((cat) => {
      const existing = priceRates.find(
        (pr) =>
          pr.materialCategoryId === cat._id &&
          pr.recyclerId === facility._id &&
          pr.source === "RECYCLER_QUOTE"
      );

      const benchmark = priceRates.find(
        (pr) =>
          pr.materialCategoryId === cat._id &&
          pr.source === "MARKET_AVERAGE"
      )?.pricePerUnit || 200;

      map[cat._id] = existing ? existing.pricePerUnit : benchmark + 10;
    });
    return map;
  });

  const handleRateChange = (catId: string, val: number) => {
    setRatesMap((prev) => ({ ...prev, [catId]: val }));
  };

  const handleSaveAllRates = (e: React.FormEvent) => {
    e.preventDefault();

    // Update in store
    SEED_CATEGORIES.forEach((cat) => {
      const match = priceRates.find(
        (pr) =>
          pr.materialCategoryId === cat._id &&
          pr.recyclerId === facility._id &&
          pr.source === "RECYCLER_QUOTE"
      );
      if (match) {
        updatePriceRate(match._id, ratesMap[cat._id]);
      }
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 font-sans space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/recycler"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:text-blue-900 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard / डैशबोर्ड</span>
        </Link>

        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 flex items-center gap-1">
          <Factory className="w-3.5 h-3.5 text-blue-600" />
          <span>{facility.facilityName}</span>
        </span>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 shadow-xs">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Purchase quotes updated successfully! Updated rates are now active across the Kabadiwala matching engine.
          </span>
        </div>
      )}

      {/* Title Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
          <Sliders className="w-4 h-4" />
          <span>Procurement Price Engine</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900">
          Manage Material Purchase Rates
        </h1>
        <p className="text-xs text-slate-500 max-w-2xl">
          These rates directly populate the Kabadiwala collector matching cards in Phase 4. Offering competitive rates attracts higher volume and high-grade e-waste to your facility.
        </p>
      </div>

      {/* Rates Form */}
      <form onSubmit={handleSaveAllRates} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Material Category
          </span>
          <div className="flex items-center gap-12 text-xs font-extrabold uppercase tracking-wider text-slate-400 pr-4">
            <span className="hidden sm:inline">Market Avg</span>
            <span>Your Quote (₹/unit)</span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {SEED_CATEGORIES.map((cat) => {
            const currentQuote = ratesMap[cat._id] || 0;
            const marketAvg =
              priceRates.find(
                (pr) =>
                  pr.materialCategoryId === cat._id &&
                  pr.source === "MARKET_AVERAGE"
              )?.pricePerUnit || 200;

            const diff = currentQuote - marketAvg;

            return (
              <div
                key={cat._id}
                className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="font-bold text-sm text-slate-900">{cat.name}</div>
                  <div className="text-[11px] text-slate-500">Unit: per {cat.unit}</div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-slate-600">₹{marketAvg}</div>
                    <div className="text-[10px] text-slate-400">Benchmark</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative w-32">
                      <IndianRupee className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={currentQuote}
                        onChange={(e) =>
                          handleRateChange(cat._id, parseFloat(e.target.value) || 0)
                        }
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-right"
                      />
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md min-w-[70px] text-center ${
                        diff >= 0
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {diff >= 0 ? `+₹${diff}` : `-₹${Math.abs(diff)}`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[11px] text-slate-400">
            Changes take effect immediately across collector matchmaking.
          </p>

          <button
            type="submit"
            className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer transition-all active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>Publish Live Rates</span>
          </button>
        </div>
      </form>
    </div>
  );
}
