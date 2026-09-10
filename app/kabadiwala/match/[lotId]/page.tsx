"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import {
  Factory,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Truck,
  MapPin,
  Clock,
  TrendingUp,
  CheckCircle2,
  QrCode,
  Sparkles,
  Phone,
  Navigation,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import {
  SEED_RECYCLERS,
  SEED_CATEGORIES,
  SEED_PRICE_RATES,
  MockLot,
} from "@/lib/mockSeedData";

export default function RecyclerMatchPage() {
  const params = useParams();
  const router = useRouter();
  const lotId = params?.lotId as string;
  const { lots, updateLot } = useAppStore();

  const [handoverDone, setHandoverDone] = useState(false);
  const [selectedRecyclerId, setSelectedRecyclerId] = useState<string | null>(null);

  // Find active lot
  const activeLot = useMemo(() => {
    return (
      lots.find((l) => l._id === lotId || l.referenceId === lotId) ||
      lots[0]
    );
  }, [lots, lotId]);

  const category = useMemo(() => {
    return (
      SEED_CATEGORIES.find((c) => c._id === activeLot?.materialCategoryId) ||
      SEED_CATEGORIES[0]
    );
  }, [activeLot]);

  // Matching logic:
  // 1. Filter for AUTHORIZED recyclers who accept this material category
  // 2. Fetch specific quote (from PriceRate source=RECYCLER_QUOTE) or fallback to benchmark
  // 3. Sort descending by offered price
  const matchedRecyclers = useMemo(() => {
    const authorized = SEED_RECYCLERS.filter(
      (r) =>
        r.authorizationStatus === "AUTHORIZED" &&
        (r.materialsAccepted.includes(category.name) ||
          r.materialsAccepted.some((m) => category.name.includes(m) || m.includes(category.name)))
    );

    const withQuotes = authorized.map((rec, idx) => {
      const quoteEntry = SEED_PRICE_RATES.find(
        (pr) =>
          pr.materialCategoryId === category._id &&
          pr.recyclerId === rec._id &&
          pr.source === "RECYCLER_QUOTE"
      );

      const benchmark = SEED_PRICE_RATES.find(
        (pr) =>
          pr.materialCategoryId === category._id &&
          pr.source === "MARKET_AVERAGE"
      )?.pricePerUnit || 280;

      const rateOffered = quoteEntry ? quoteEntry.pricePerUnit : benchmark + (10 - idx * 5);
      const totalPayout = Math.round(rateOffered * (activeLot?.approxWeight || 10));
      const distance = idx === 0 ? "1.8 km" : idx === 1 ? "3.4 km" : "5.1 km";

      return {
        ...rec,
        rateOffered,
        totalPayout,
        distance,
        rank: idx + 1,
      };
    });

    // Sort descending by offered rate
    return withQuotes.sort((a, b) => b.rateOffered - a.rateOffered);
  }, [category, activeLot]);

  // Select Recycler & Trigger Handover
  const handleSelectRecycler = (recycler: (typeof matchedRecyclers)[0]) => {
    setSelectedRecyclerId(recycler._id);

    // Update lot status in store: MATCHED -> HANDED_OVER
    updateLot(activeLot._id, {
      recyclerId: recycler._id,
      quotedPrice: recycler.totalPayout,
      status: "HANDED_OVER",
      gpsLat: 21.1458,
      gpsLng: 79.0882,
      handoverAt: Date.now(),
    });

    setHandoverDone(true);
  };

  if (!activeLot) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center">
        <p className="text-sm text-slate-500">Lot not found.</p>
        <Link href="/kabadiwala" className="text-teal-700 font-bold text-xs mt-2 block">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // STEP 2 RESULT: HANDOVER CONFIRMATION & QR CODE SCREEN
  if (handoverDone) {
    const chosenRecycler = matchedRecyclers.find((r) => r._id === selectedRecyclerId) || matchedRecyclers[0];

    return (
      <div className="max-w-lg mx-auto p-4 sm:p-6 pb-20 font-sans">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl text-center space-y-5">
          {/* Header */}
          <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto shadow-xs">
            <QrCode className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200 inline-block mb-1">
              Handover Generated • स्थिति: हैंडओवर
            </span>
            <h1 className="text-2xl font-black text-slate-900">
              Ready for Recycler Scan
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Show this QR code at {chosenRecycler.facilityName}
            </p>
          </div>

          {/* QR Code Container */}
          <div className="p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-300 inline-block shadow-inner my-2">
            <QRCodeSVG
              value={JSON.stringify({
                ref: activeLot.referenceId,
                lotId: activeLot._id,
                weight: activeLot.approxWeight,
                cat: category.name,
                collector: activeLot.collectorId,
                payout: chosenRecycler.totalPayout,
                ts: Date.now(),
              })}
              size={200}
              level="H"
              includeMargin={true}
              className="mx-auto rounded-xl bg-white p-2 shadow-xs"
            />
          </div>

          {/* Reference ID Pill */}
          <div className="bg-slate-100 p-3 rounded-2xl">
            <div className="text-[10px] uppercase font-bold text-slate-400">
              Digital Chain-of-Custody Reference
            </div>
            <div className="font-mono font-black text-lg text-slate-900">
              {activeLot.referenceId}
            </div>
          </div>

          {/* Handover Details */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Matched Recycler:</span>
              <span className="font-bold text-slate-900">{chosenRecycler.facilityName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Facility Location:</span>
              <span className="font-medium text-slate-800">{chosenRecycler.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">GPS Timestamp:</span>
              <span className="font-mono text-slate-700">Captured (21.1458° N, 79.0882° E)</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200">
              <span className="text-slate-500">Locked Quoted Payout:</span>
              <span className="font-black text-emerald-700 text-sm">
                ₹{chosenRecycler.totalPayout.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <Link
              href="/kabadiwala/ledger"
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <span>View in Passbook Ledger</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/kabadiwala"
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center justify-center transition-colors"
            >
              Return to Dashboard / मुख्य पृष्ठ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // STEP 1: MATCHING LIST VIEW
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 pb-24 font-sans space-y-6">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/kabadiwala"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-900 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard / डैशबोर्ड</span>
        </Link>
        <span className="text-xs font-bold text-slate-500">
          Lot Ref: <span className="font-mono text-slate-900">{activeLot.referenceId}</span>
        </span>
      </div>

      {/* Lot Summary Card */}
      <div className="bg-gradient-to-br from-teal-900 to-slate-900 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
            Matching In Progress • रिसाइक्लर मिलान
          </span>
          <h1 className="text-xl sm:text-2xl font-black mt-1.5">
            {category.name} ({activeLot.approxWeight} {category.unit})
          </h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Showing verified CPCB/SPCB authorized facilities accepting this material
          </p>
        </div>

        <div className="bg-white/10 p-3.5 rounded-2xl text-right shrink-0 border border-white/10">
          <div className="text-[10px] uppercase font-bold text-emerald-300">Market Baseline</div>
          <div className="text-xl font-black text-white">
            ₹{activeLot.estimatedValue.toLocaleString("en-IN")}
          </div>
        </div>
      </div>

      {/* Ranked Recycler Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Ranked by Offered Purchase Rate (Highest First)</span>
          </h2>
          <span className="text-xs font-bold text-emerald-700">{matchedRecyclers.length} Facilities Available</span>
        </div>

        {matchedRecyclers.map((recycler) => {
          const isTopOffer = recycler.rank === 1;

          return (
            <div
              key={recycler._id}
              className={`bg-white rounded-3xl p-5 border-2 transition-all shadow-sm hover:shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isTopOffer
                  ? "border-emerald-500 ring-2 ring-emerald-500/10"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-teal-800 shrink-0">
                  <Factory className="w-6 h-6" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                      {recycler.facilityName}
                    </span>
                    {isTopOffer && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>Best Offer</span>
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{recycler.location}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{recycler.distance} away</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-extrabold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-blue-600" />
                      <span>{recycler.authorizationNumber}</span>
                    </span>

                    {recycler.pickupAvailable ? (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Truck className="w-3 h-3 text-emerald-600" />
                        <span>Doorstep Pickup</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        Facility Drop-off
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Price Offer & Select CTA */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-3">
                <div className="text-left sm:text-right">
                  <div className="text-xs text-slate-400">Total Payout</div>
                  <div className="text-lg sm:text-xl font-black text-emerald-700">
                    ₹{recycler.totalPayout.toLocaleString("en-IN")}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    ₹{recycler.rateOffered} / {category.unit}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectRecycler(recycler)}
                  className={`py-2.5 px-4 rounded-xl font-extrabold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95 ${
                    isTopOffer
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
                      : "bg-slate-900 hover:bg-black text-white"
                  }`}
                >
                  <span>Select & Handover</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
