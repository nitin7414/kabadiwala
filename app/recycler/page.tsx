"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  Factory,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  PackageCheck,
  Sliders,
  History,
  FileCheck,
  Truck,
  MapPin,
  QrCode,
  IndianRupee,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { SEED_CATEGORIES, SEED_RECYCLERS } from "@/lib/mockSeedData";

export default function RecyclerDashboardPage() {
  const { user, lots, confirmLotHandover } = useAppStore();

  // Find facility associated with this logged in user or default to EcoRecycle
  const currentFacility = useMemo(() => {
    return (
      SEED_RECYCLERS.find((r) => r.userId === user?.id) ||
      SEED_RECYCLERS[0]
    );
  }, [user]);

  // Incoming Lots matched or handed over to this recycler
  const inboundLots = useMemo(() => {
    return lots.filter(
      (l) =>
        (l.recyclerId === currentFacility._id || !l.recyclerId) &&
        (l.status === "MATCHED" || l.status === "HANDED_OVER")
    );
  }, [lots, currentFacility]);

  // Confirmed Lots handled
  const confirmedLots = useMemo(() => {
    return lots.filter(
      (l) => l.status === "CONFIRMED" || l.status === "PAID"
    );
  }, [lots]);

  // Aggregate stats
  const totalTransactedValue = useMemo(() => {
    return confirmedLots.reduce(
      (acc, curr) => acc + (curr.finalSaleValue || curr.quotedPrice || curr.estimatedValue),
      0
    );
  }, [confirmedLots]);

  const totalDivertedWeight = useMemo(() => {
    return confirmedLots.reduce((acc, curr) => acc + curr.approxWeight, 0);
  }, [confirmedLots]);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 font-sans space-y-8">
      {/* Top Banner with Facility Credentials */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">
              CPCB Authorized Facility • अधिकृत रिसाइक्लिंग यूनिट
            </span>
            <span className="text-xs text-blue-200/80 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {currentFacility.location}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {currentFacility.facilityName}
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/80 mt-1 max-w-xl">
            License: <span className="font-mono font-bold text-white">{currentFacility.authorizationNumber}</span> • Service Area: {currentFacility.serviceArea}
          </p>

          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-blue-800/60 text-xs">
            <div>
              <div className="text-[11px] text-blue-200/70 font-medium">Inbound Pending</div>
              <div className="text-lg font-extrabold text-amber-400">
                {inboundLots.length} Lots
              </div>
            </div>
            <div>
              <div className="text-[11px] text-blue-200/70 font-medium">Lots Confirmed</div>
              <div className="text-lg font-extrabold">{confirmedLots.length} Batches</div>
            </div>
            <div>
              <div className="text-[11px] text-blue-200/70 font-medium">Total Formalized Intake</div>
              <div className="text-lg font-extrabold text-emerald-400">
                {totalDivertedWeight.toFixed(1)} kg
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="relative z-10 flex flex-wrap gap-2 w-full md:w-auto shrink-0">
          <Link
            href="/recycler/lots"
            className="px-5 py-3 rounded-2xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-98"
          >
            <QrCode className="w-4 h-4" />
            <span>Verify & Confirm Inbound</span>
          </Link>
          <Link
            href="/recycler/rates"
            className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 transition-colors"
          >
            <Sliders className="w-4 h-4" />
            <span>Edit Rates</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Inbound Requests</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{inboundLots.length}</div>
          <p className="text-[11px] text-slate-500 font-medium">Status: MATCHED or HANDED_OVER</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Dock Confirm</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-600">
            {inboundLots.filter((l) => l.status === "HANDED_OVER").length}
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Awaiting physical inspection</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Lots Processed</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <PackageCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-700">{confirmedLots.length}</div>
          <p className="text-[11px] text-slate-500 font-medium">Formally recycled & documented</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Value Transacted</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-900">
            ₹{totalTransactedValue.toLocaleString("en-IN")}
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Settled to collector community</p>
        </div>
      </div>

      {/* Inbound Lot Queue Preview */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Active Inbound Verification Queue
            </h2>
            <p className="text-xs text-slate-500">
              Matched scrap lots dispatched by registered local collectors
            </p>
          </div>
          <Link
            href="/recycler/lots"
            className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View Full Queue ({inboundLots.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {inboundLots.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-xs text-slate-600 font-semibold">
              All inbound lots confirmed! Queue is clear.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {inboundLots.map((lot) => {
              const category = SEED_CATEGORIES.find((c) => c._id === lot.materialCategoryId);

              return (
                <div
                  key={lot._id}
                  className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={lot.photoUrl}
                      alt="scrap photo"
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 text-sm">
                          {lot.referenceId}
                        </span>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                            lot.status === "HANDED_OVER"
                              ? "bg-purple-50 text-purple-800 border-purple-200"
                              : "bg-blue-50 text-blue-800 border-blue-200"
                          }`}
                        >
                          {lot.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        <span className="font-bold text-slate-800">{category?.name}</span> •{" "}
                        {lot.approxWeight} {category?.unit} • Location: {lot.collectionLocation}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                    <div className="text-right">
                      <div className="font-black text-slate-900 text-base">
                        ₹{(lot.quotedPrice || lot.estimatedValue).toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-slate-400">Offer Quote</div>
                    </div>

                    <Link
                      href="/recycler/lots"
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Inspect & Confirm</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Secondary Links (Rates & History) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/recycler/rates"
          className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-slate-900">Purchase Rates Manager</div>
              <div className="text-xs text-slate-500">
                Update buying prices offered to kabadiwala collectors
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/recycler/history"
          className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <History className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-slate-900">Transaction History</div>
              <div className="text-xs text-slate-500">
                Past settlements, payments, and CPCB audit logs
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </div>
  );
}
