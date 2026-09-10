"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Truck,
  TrendingUp,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  BookOpen,
  Cpu,
  Cable,
  BatteryCharging,
  Tv,
  Monitor,
  RotateCw,
  Boxes,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { SEED_CATEGORIES, SEED_PRICE_RATES } from "@/lib/mockSeedData";

// Icon mapping per category
const CATEGORY_ICONS: Record<string, typeof Cpu> = {
  cat_pcb: Cpu,
  cat_crt: Tv,
  cat_cables: Cable,
  cat_batteries: BatteryCharging,
  cat_lcd: Monitor,
  cat_motors: RotateCw,
  cat_plastics: Boxes,
};

const STATUS_BADGES: Record<
  string,
  { label: string; hindi: string; bg: string; text: string; border: string }
> = {
  DRAFT: {
    label: "Draft",
    hindi: "ड्राफ्ट",
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-200",
  },
  MATCHED: {
    label: "Matched",
    hindi: "रिसाइक्लर मिला",
    bg: "bg-blue-50",
    text: "text-blue-800",
    border: "border-blue-200",
  },
  HANDED_OVER: {
    label: "Handed Over",
    hindi: "हैंडओवर हुआ",
    bg: "bg-purple-50",
    text: "text-purple-800",
    border: "border-purple-200",
  },
  CONFIRMED: {
    label: "Confirmed",
    hindi: "पुष्टि हुई",
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-200",
  },
  PAID: {
    label: "Paid",
    hindi: "भुगतान प्राप्त",
    bg: "bg-teal-50",
    text: "text-teal-800",
    border: "border-teal-200",
  },
};

export default function KabadiwalaDashboardPage() {
  const { user, lots } = useAppStore();

  const userCity = user?.location.includes("Mumbai") ? "Mumbai" : "Nagpur";

  // Filter lots belonging to current collector or sample lots
  const myLots = useMemo(() => {
    return lots.filter((l) => !user || l.collectorId === user.id || l.collectorId.startsWith("user_"));
  }, [lots, user]);

  // Price board rates for this city
  const cityRates = useMemo(() => {
    return SEED_PRICE_RATES.filter(
      (r) => r.location.toLowerCase() === userCity.toLowerCase() && r.source === "MARKET_AVERAGE"
    ).slice(0, 5);
  }, [userCity]);

  // Aggregate stats
  const totalWeight = useMemo(
    () => myLots.reduce((acc, curr) => acc + curr.approxWeight, 0),
    [myLots]
  );
  const totalValue = useMemo(
    () => myLots.reduce((acc, curr) => acc + (curr.finalSaleValue || curr.estimatedValue), 0),
    [myLots]
  );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Top Banner with Collector Profile & Large New Lot CTA */}
      <div className="bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
              Grassroot Collector • जमीनी संग्राहक
            </span>
            <span className="text-xs text-emerald-200/80 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {user?.location || "Nagpur, Maharashtra"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {user?.name || "Ramesh Kumar"}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-xl">
            Track daily scrap market rates, create verified digital lots, and connect directly with authorized CPCB/SPCB recyclers.
          </p>

          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-emerald-600/40 text-xs">
            <div>
              <div className="text-[11px] text-emerald-200/70 font-medium">My Total Lots</div>
              <div className="text-lg font-extrabold">{myLots.length} Batches</div>
            </div>
            <div>
              <div className="text-[11px] text-emerald-200/70 font-medium">Material Diverted</div>
              <div className="text-lg font-extrabold">{totalWeight.toFixed(1)} kg/pcs</div>
            </div>
            <div>
              <div className="text-[11px] text-emerald-200/70 font-medium">Estimated Earnings</div>
              <div className="text-lg font-extrabold text-emerald-300">
                ₹{totalValue.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        </div>

        {/* Large Prominent NEW LOT Button */}
        <div className="relative z-10 w-full md:w-auto shrink-0">
          <Link
            href="/kabadiwala/new-lot"
            className="w-full md:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-950 font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-lg hover:scale-102 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Plus className="w-5 h-5 stroke-[3]" />
            </div>
            <div className="text-left leading-tight">
              <div>New Scrap Lot</div>
              <div className="text-[11px] font-bold text-emerald-700">नया लॉट बनाएं</div>
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-700 ml-1" />
          </Link>
        </div>

        {/* Decorative Background Circles */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Grid: Live Price Board & Quick Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PRICE BOARD WIDGET (Pulled from PriceRate table) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">
                  Live Scrap Price Board / आज के भाव
                </h2>
                <p className="text-xs text-slate-500">
                  Current benchmark market rates in {userCity}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              Live Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {cityRates.map((rate) => {
              const category = SEED_CATEGORIES.find((c) => c._id === rate.materialCategoryId);
              if (!category) return null;
              const Icon = CATEGORY_ICONS[category._id] || Cpu;

              return (
                <div
                  key={rate._id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-teal-800 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900">
                        {category.name}
                      </div>
                      <div className="text-[10px] text-slate-500">per {category.unit}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-black text-sm sm:text-base text-emerald-700">
                      ₹{rate.pricePerUnit}
                    </div>
                    <div className="text-[10px] font-semibold text-emerald-600 flex items-center justify-end gap-0.5">
                      <TrendingUp className="w-2.5 h-2.5" />
                      <span>Market Avg</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Collector Hub Shortcuts */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 mb-1">
              Collector Quick Links
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Passbook statement and safety guidelines
            </p>

            <div className="space-y-2.5">
              <Link
                href="/kabadiwala/ledger"
                className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-900">
                      Passbook Ledger
                    </div>
                    <div className="text-[10px] text-slate-500">खाता बही • Payment history</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                href="/kabadiwala/safety"
                className="p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 group-hover:text-amber-900">
                      Hazard Safety Tips
                    </div>
                    <div className="text-[10px] text-slate-500">सुरक्षा निर्देश • Battery/CRT care</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100 text-[11px] text-teal-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <span>
              All handovers are encrypted with QR code signatures for CPCB digital compliance.
            </span>
          </div>
        </div>
      </div>

      {/* RECENT LOTS LIST WITH STATUS BADGES */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Recent Lots / हाल के लॉट
            </h2>
            <p className="text-xs text-slate-500">
              Traceability status across your registered e-waste batches
            </p>
          </div>
          <Link
            href="/kabadiwala/new-lot"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>+ Create New</span>
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {myLots.map((lot) => {
            const category = SEED_CATEGORIES.find((c) => c._id === lot.materialCategoryId);
            const statusConfig = STATUS_BADGES[lot.status] || STATUS_BADGES.DRAFT;
            const Icon = category ? CATEGORY_ICONS[category._id] || Cpu : Cpu;

            return (
              <div
                key={lot._id}
                className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/70 px-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-teal-800 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900">
                        {lot.referenceId}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                      >
                        {statusConfig.label} • {statusConfig.hindi}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 mt-0.5">
                      <span className="font-semibold text-slate-800">
                        {category?.name || "E-Waste"}
                      </span>{" "}
                      • {lot.approxWeight} {category?.unit || "kg"} • {lot.collectionLocation}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                  <div className="text-right">
                    <div className="font-extrabold text-sm sm:text-base text-slate-900">
                      ₹{(lot.finalSaleValue || lot.estimatedValue).toLocaleString("en-IN")}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {lot.finalSaleValue ? "Final Payout" : "Estimated Value"}
                    </div>
                  </div>

                  {lot.status === "DRAFT" && (
                    <Link
                      href={`/kabadiwala/match/${lot._id}`}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors shrink-0"
                    >
                      <span>Match</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}

                  {lot.status === "MATCHED" && (
                    <Link
                      href={`/kabadiwala/match/${lot._id}`}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors shrink-0"
                    >
                      <span>Handover QR</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
