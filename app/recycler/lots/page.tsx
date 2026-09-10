"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Factory,
  ArrowLeft,
  CheckCircle,
  Search,
  Sliders,
  Check,
  Clock,
  Eye,
  ChevronDown,
  ChevronUp,
  QrCode,
  IndianRupee,
  Calendar,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { SEED_CATEGORIES, SEED_USERS, MockLot } from "@/lib/mockSeedData";

export default function RecyclerLotsQueuePage() {
  const { lots, confirmLotHandover } = useAppStore();

  const [expandedLotId, setExpandedLotId] = useState<string | null>(null);
  const [searchRef, setSearchRef] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  // Modal State for Confirm Handover
  const [confirmingLot, setConfirmingLot] = useState<MockLot | null>(null);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<"DIGITAL" | "CASH">("DIGITAL");
  const [confirmedSuccessMessage, setConfirmedSuccessMessage] = useState<string | null>(null);

  // Filter lots
  const filteredLots = useMemo(() => {
    return lots.filter((l) => {
      const matchSearch =
        !searchRef.trim() ||
        l.referenceId.toLowerCase().includes(searchRef.toLowerCase().trim());

      const matchStatus =
        filterStatus === "ALL" ||
        (filterStatus === "PENDING" && (l.status === "MATCHED" || l.status === "HANDED_OVER")) ||
        l.status === filterStatus;

      return matchSearch && matchStatus;
    });
  }, [lots, searchRef, filterStatus]);

  // Open Confirmation Modal
  const openConfirmModal = (lot: MockLot) => {
    setConfirmingLot(lot);
    setFinalPrice(lot.quotedPrice || lot.estimatedValue);
  };

  // Submit Handover Confirmation
  const handleSubmitConfirmation = () => {
    if (!confirmingLot) return;

    confirmLotHandover(confirmingLot._id, finalPrice, paymentMethod);
    setConfirmedSuccessMessage(
      `Lot ${confirmingLot.referenceId} confirmed successfully! Settlement of ₹${finalPrice.toLocaleString("en-IN")} recorded.`
    );
    setConfirmingLot(null);

    setTimeout(() => {
      setConfirmedSuccessMessage(null);
    }, 4000);
  };

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

        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
          Dock Verification & Intake Queue
        </span>
      </div>

      {/* Success Banner */}
      {confirmedSuccessMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 shadow-xs">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{confirmedSuccessMessage}</span>
        </div>
      )}

      {/* Title & Quick Reference Lookup */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Inbound Lots Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Scan or enter reference codes, verify material condition, adjust final values, and confirm handovers.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchRef}
              onChange={(e) => setSearchRef(e.target.value)}
              placeholder="Scan or type reference ID (e.g. SS-2026-00103)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
            {["ALL", "PENDING", "CONFIRMED", "PAID"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-2 rounded-xl font-bold transition-colors cursor-pointer ${
                  filterStatus === status
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Queue List with Expandable Rows */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {filteredLots.length === 0 ? (
          <div className="p-10 text-center text-xs text-slate-500">
            No scrap lots found matching this criteria.
          </div>
        ) : (
          filteredLots.map((lot) => {
            const category = SEED_CATEGORIES.find((c) => c._id === lot.materialCategoryId);
            const collector = SEED_USERS.find((u) => u._id === lot.collectorId);
            const isExpanded = expandedLotId === lot._id;
            const isPendingConfirm =
              lot.status === "MATCHED" || lot.status === "HANDED_OVER";

            return (
              <div key={lot._id} className="transition-colors hover:bg-slate-50/70">
                {/* Main Row */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={lot.photoUrl}
                      alt="scrap"
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 text-sm">
                          {lot.referenceId}
                        </span>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                            lot.status === "CONFIRMED" || lot.status === "PAID"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : lot.status === "HANDED_OVER"
                              ? "bg-purple-50 text-purple-800 border-purple-200"
                              : "bg-blue-50 text-blue-800 border-blue-200"
                          }`}
                        >
                          {lot.status}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 mt-0.5">
                        <span className="font-bold text-slate-800">{category?.name}</span> •{" "}
                        {lot.approxWeight} {category?.unit} • Collector:{" "}
                        <span className="font-semibold text-slate-800">
                          {collector?.name || "Ramesh Kumar"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
                    <div className="text-right">
                      <div className="font-black text-slate-900 text-sm sm:text-base">
                        ₹{(lot.finalSaleValue || lot.quotedPrice || lot.estimatedValue).toLocaleString(
                          "en-IN"
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {lot.finalSaleValue ? "Final Confirmed" : "Quoted Offer"}
                      </div>
                    </div>

                    {isPendingConfirm && (
                      <button
                        onClick={() => openConfirmModal(lot)}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Confirm Handover</span>
                      </button>
                    )}

                    <button
                      onClick={() => setExpandedLotId(isExpanded ? null : lot._id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      title="Toggle Details"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expandable Details Section */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 bg-slate-50/90 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block mb-1">
                        Collector Information
                      </span>
                      <div className="text-slate-800 font-semibold">{collector?.name || "Ramesh Kumar"}</div>
                      <div className="text-slate-500">{collector?.phone || "+91 9876543210"}</div>
                      <div className="text-slate-500">{lot.collectionLocation}</div>
                    </div>

                    <div>
                      <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block mb-1">
                        Physical Lot Metrics
                      </span>
                      <div className="text-slate-800">
                        Gross Weight: <span className="font-bold">{lot.approxWeight} {category?.unit}</span>
                      </div>
                      <div className="text-slate-800">
                        Baseline Estimate: ₹{lot.estimatedValue}
                      </div>
                      <div className="text-slate-500">
                        Hazard Notes: {category?.hazardNotes}
                      </div>
                    </div>

                    <div>
                      <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block mb-1">
                        Audit Timestamp
                      </span>
                      <div className="font-mono text-slate-700">
                        Created: {new Date(lot.createdAt).toLocaleString("en-IN")}
                      </div>
                      {lot.handoverAt && (
                        <div className="font-mono text-slate-700">
                          Handover: {new Date(lot.handoverAt).toLocaleString("en-IN")}
                        </div>
                      )}
                      {lot.confirmedAt && (
                        <div className="font-mono text-emerald-700 font-bold">
                          Confirmed: {new Date(lot.confirmedAt).toLocaleString("en-IN")}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* CONFIRM HANDOVER MODAL (Task 3: Let recycler edit/confirm final sale price) */}
      {confirmingLot && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-5">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Confirm Dock Handover</h3>
                  <span className="text-[10px] font-mono text-slate-500">{confirmingLot.referenceId}</span>
                </div>
              </div>
              <button
                onClick={() => setConfirmingLot(null)}
                className="text-slate-400 hover:text-slate-700 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Material Category:</span>
                <span className="font-bold text-slate-900">
                  {SEED_CATEGORIES.find((c) => c._id === confirmingLot.materialCategoryId)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verified Weight:</span>
                <span className="font-bold text-slate-900">{confirmingLot.approxWeight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Original Estimate:</span>
                <span className="text-slate-700">₹{confirmingLot.estimatedValue}</span>
              </div>
            </div>

            {/* Editable Final Sale Value Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Final Settlement Amount (₹) / अंतिम खरीद मूल्य
              </label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="number"
                  value={finalPrice}
                  onChange={(e) => setFinalPrice(parseFloat(e.target.value) || 0)}
                  className="w-full pl-9 pr-3 py-2.5 text-base font-black text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Adjust slightly if moisture, tare weight, or purity requires price calibration.
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Settlement Payment Method
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("DIGITAL")}
                  className={`py-2 px-3 rounded-xl border font-bold text-center cursor-pointer transition-all ${
                    paymentMethod === "DIGITAL"
                      ? "bg-blue-50 border-blue-600 text-blue-900"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Instant UPI / NEFT
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("CASH")}
                  className={`py-2 px-3 rounded-xl border font-bold text-center cursor-pointer transition-all ${
                    paymentMethod === "CASH"
                      ? "bg-blue-50 border-blue-600 text-blue-900"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Cash on Handover
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmitConfirmation}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-98"
            >
              <span>Confirm & Generate Transaction Record</span>
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
