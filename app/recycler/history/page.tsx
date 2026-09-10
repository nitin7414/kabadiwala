"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Download,
  FileCheck,
  History,
  IndianRupee,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { SEED_CATEGORIES, SEED_USERS } from "@/lib/mockSeedData";

export default function RecyclerHistoryPage() {
  const { lots, transactions } = useAppStore();

  const historyItems = useMemo(() => {
    return lots.filter((l) => l.status === "CONFIRMED" || l.status === "PAID");
  }, [lots]);

  const totalDisbursed = useMemo(() => {
    return historyItems.reduce(
      (acc, curr) => acc + (curr.finalSaleValue || curr.quotedPrice || curr.estimatedValue),
      0
    );
  }, [historyItems]);

  const totalKg = useMemo(() => {
    return historyItems.reduce((acc, curr) => acc + curr.approxWeight, 0);
  }, [historyItems]);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 font-sans space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/recycler"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:text-blue-900 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard / डैशबोर्ड</span>
        </Link>

        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>CPCB Auditable Transaction Log</span>
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Confirmed Settlements
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {historyItems.length} Transactions
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Formal chain-of-custody complete</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Total E-Waste Diverted
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700">
            {totalKg.toFixed(1)} kg/units
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Safely processed under SPCB norms</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Total Payout Disbursed
          </span>
          <div className="text-2xl sm:text-3xl font-black text-blue-700">
            ₹{totalDisbursed.toLocaleString("en-IN")}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Direct UPI / bank settlements</p>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black text-slate-900">Past Confirmed Transactions</h1>
            <p className="text-xs text-slate-500">
              Verified intake handovers with corresponding financial settlement records
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">
            {historyItems.length} Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Ref ID / लॉट</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Material Category</th>
                <th className="py-3 px-4">Net Weight</th>
                <th className="py-3 px-4">Settlement Amount</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {historyItems.map((lot, index) => {
                const cat = SEED_CATEGORIES.find((c) => c._id === lot.materialCategoryId);
                const amount = lot.finalSaleValue || lot.quotedPrice || lot.estimatedValue;
                const dateStr = new Date(lot.confirmedAt || lot.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <tr key={lot._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {lot.referenceId}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {dateStr}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {cat?.name || "E-Waste"}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      {lot.approxWeight} {cat?.unit || "kg"}
                    </td>
                    <td className="py-3.5 px-4 font-black text-emerald-700 text-sm">
                      ₹{amount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                        {lot.status === "PAID" ? "Cash on Handover" : "Instant UPI / NEFT"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>CPCB Verified</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
