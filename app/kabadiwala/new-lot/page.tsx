"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Camera,
  Cpu,
  Tv,
  Cable,
  BatteryCharging,
  Monitor,
  RotateCw,
  Boxes,
  Minus,
  Plus,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { SEED_CATEGORIES, SEED_PRICE_RATES, MockLot } from "@/lib/mockSeedData";

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

// Hindi translations for low-literacy collectors
const HINDI_CATEGORY_NAMES: Record<string, string> = {
  cat_pcb: "सर्किट बोर्ड / मदरबोर्ड",
  cat_crt: "सीआरटी मॉनिटर ग्लास",
  cat_cables: "तांबे के तार व केबल",
  cat_batteries: "लिथियम बैटरी सेल",
  cat_lcd: "एलसीडी / एलईडी पैनल",
  cat_motors: "मोटर व चुंबक",
  cat_plastics: "मिश्रित ई-प्लास्टिक",
};

// Sample photo presets for fast demo clicking
const PHOTO_PRESETS = [
  { label: "PCB Motherboard", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60" },
  { label: "Copper Wiring", url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=60" },
  { label: "Lithium Batteries", url: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=500&auto=format&fit=crop&q=60" },
];

export default function NewLotPage() {
  const router = useRouter();
  const { user, language, addLot } = useAppStore();

  const userCity = user?.location.includes("Mumbai") ? "Mumbai" : "Nagpur";

  // Form State
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("cat_pcb");
  const [weight, setWeight] = useState<number>(15.0);
  const [photoUrl, setPhotoUrl] = useState<string>(PHOTO_PRESETS[0].url);
  const [createdLot, setCreatedLot] = useState<MockLot | null>(null);

  // Selected Category info
  const currentCategory = useMemo(() => {
    return SEED_CATEGORIES.find((c) => c._id === selectedCategoryId) || SEED_CATEGORIES[0];
  }, [selectedCategoryId]);

  // Find Market Average Price for this Category & Location
  const currentRate = useMemo(() => {
    const rateEntry = SEED_PRICE_RATES.find(
      (pr) =>
        pr.materialCategoryId === selectedCategoryId &&
        pr.location.toLowerCase() === userCity.toLowerCase() &&
        pr.source === "MARKET_AVERAGE"
    );
    return rateEntry ? rateEntry.pricePerUnit : 280;
  }, [selectedCategoryId, userCity]);

  // Rule-based Instant Value Calculation: approxWeight * currentRate
  const estimatedTotal = useMemo(() => {
    return Math.round(weight * currentRate);
  }, [weight, currentRate]);

  // Stepper adjustments
  const adjustWeight = (amount: number) => {
    setWeight((prev) => {
      const next = Math.max(1, Math.round((prev + amount) * 10) / 10);
      return next;
    });
  };

  // Handle Photo File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit and Create Lot
  const handleCreateLot = () => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const referenceId = `SS-2026-00${randomSuffix}`;

    const newLot: MockLot = {
      _id: `lot_${Date.now()}`,
      collectorId: user?.id || "user_ramesh",
      materialCategoryId: selectedCategoryId,
      photoUrl: photoUrl || "/images/lots/pcb-sample-1.jpg",
      approxWeight: weight,
      estimatedValue: estimatedTotal,
      quotedPrice: estimatedTotal,
      status: "DRAFT",
      collectionLocation: user?.location || "Nagpur Central",
      gpsLat: 21.1458,
      gpsLng: 79.0882,
      referenceId: referenceId,
      createdAt: Date.now(),
    };

    addLot(newLot);
    setCreatedLot(newLot);
  };

  // If created, render Step 6: Success Screen
  if (createdLot) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200 shadow-xl max-w-lg w-full text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 inline-block mb-2">
            Lot Registered Successfully • लॉट दर्ज हुआ
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {createdLot.referenceId}
          </h1>
          <p className="text-xs text-slate-500 mt-1">Unique Traceability Reference ID</p>

          <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Material / सामग्री:</span>
              <span className="font-bold text-slate-900">{currentCategory.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Approx Weight / वजन:</span>
              <span className="font-bold text-slate-900">
                {createdLot.approxWeight} {currentCategory.unit}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Estimated Value / अनुमानित मूल्य:</span>
              <span className="font-extrabold text-emerald-700 text-base">
                ₹{createdLot.estimatedValue.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between text-xs pt-2 border-t border-slate-200">
              <span className="text-slate-500">Status / स्थिति:</span>
              <span className="font-bold text-amber-600 uppercase">DRAFT • Ready for Match</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href={`/kabadiwala/match/${createdLot._id}`}
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
            >
              <span>Find Authorized Recycler</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/kabadiwala"
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs flex items-center justify-center transition-colors"
            >
              Back to Dashboard / मुख्य पृष्ठ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 pb-24">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/kabadiwala"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-900 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard / डैशबोर्ड</span>
        </Link>
        <div className="text-right">
          <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1 justify-end">
            <MapPin className="w-3 h-3 text-emerald-600" />
            <span>Market Location: {userCity}</span>
          </span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Create E-Waste Lot
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            नया इलेक्ट्रॉनिक कचरा लॉट दर्ज करें • Large-touch collector interface
          </p>
        </div>

        {/* STEP 1: Photo Capture / Upload */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px]">
                1
              </span>
              <span>E-Waste Photo / कचरे का फोटो</span>
            </label>
            <span className="text-[11px] text-slate-400 font-medium">Clear photo of scrap</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300">
            {photoUrl ? (
              <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-sm shrink-0">
                <img src={photoUrl} alt="E-waste preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPhotoUrl("")}
                  className="absolute top-1 right-1 bg-black/65 text-white text-[10px] px-1.5 py-0.5 rounded-md"
                >
                  Change
                </button>
              </div>
            ) : (
              <label className="w-32 h-32 rounded-xl border-2 border-dashed border-emerald-400 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors shrink-0">
                <Camera className="w-8 h-8 text-emerald-600" />
                <span className="text-[11px] font-bold text-center px-2">Tap Camera / फ़ोटो लें</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}

            <div className="flex-1 text-left w-full">
              <p className="text-xs text-slate-600 mb-2">
                Upload or select a photo to generate verifiable proof-of-scrap for recyclers.
              </p>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Quick Demo Presets:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PHOTO_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setPhotoUrl(preset.url)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                      photoUrl === preset.url
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* STEP 2: Category Selection (Large Icon Grid) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Material Category / सामग्री चुनें</span>
            </label>
            <span className="text-[11px] text-emerald-700 font-bold">Single-Select Grid</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {SEED_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat._id] || Cpu;
              const isSelected = selectedCategoryId === cat._id;
              const hindiName = HINDI_CATEGORY_NAMES[cat._id] || cat.name;

              return (
                <button
                  key={cat._id}
                  type="button"
                  onClick={() => setSelectedCategoryId(cat._id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[105px] cursor-pointer ${
                    isSelected
                      ? "bg-emerald-50 border-emerald-600 shadow-md ring-2 ring-emerald-500/20"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      per {cat.unit}
                    </span>
                  </div>

                  <div>
                    <div
                      className={`font-bold text-xs sm:text-sm ${
                        isSelected ? "text-emerald-950" : "text-slate-800"
                      }`}
                    >
                      {cat.name}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium truncate">
                      {hindiName}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* STEP 3: Weight Entry (Steppers & Sliders - No keyboard required) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px]">
                3
              </span>
              <span>Approximate Weight / वजन दर्ज करें</span>
            </label>
            <span className="text-xs font-bold text-slate-500">
              Unit: <span className="text-emerald-700 font-extrabold">{currentCategory.unit}</span>
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            {/* Big Digit Display */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                {weight}
              </span>
              <span className="text-lg font-bold text-slate-500 uppercase self-end mb-1">
                {currentCategory.unit}
              </span>
            </div>

            {/* Slider */}
            <input
              type="range"
              min="1"
              max="150"
              step="0.5"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />

            {/* Large Stepper Touch Buttons */}
            <div className="grid grid-cols-6 gap-1.5">
              <button
                type="button"
                onClick={() => adjustWeight(-5)}
                className="py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 font-bold text-xs text-slate-700 transition-colors cursor-pointer active:scale-95"
              >
                -5
              </button>
              <button
                type="button"
                onClick={() => adjustWeight(-1)}
                className="py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 font-bold text-xs text-slate-700 transition-colors cursor-pointer active:scale-95"
              >
                -1
              </button>
              <button
                type="button"
                onClick={() => adjustWeight(-0.5)}
                className="py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 font-bold text-xs text-slate-700 transition-colors cursor-pointer active:scale-95"
              >
                -0.5
              </button>
              <button
                type="button"
                onClick={() => adjustWeight(0.5)}
                className="py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 font-bold text-xs text-slate-700 transition-colors cursor-pointer active:scale-95"
              >
                +0.5
              </button>
              <button
                type="button"
                onClick={() => adjustWeight(1)}
                className="py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 font-bold text-xs text-slate-700 transition-colors cursor-pointer active:scale-95"
              >
                +1
              </button>
              <button
                type="button"
                onClick={() => adjustWeight(5)}
                className="py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 font-bold text-xs text-slate-700 transition-colors cursor-pointer active:scale-95"
              >
                +5
              </button>
            </div>
          </div>
        </section>

        {/* STEP 4: Instant Value Estimate (Rule-based: approxWeight * currentRate) */}
        <section className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Step 4: Instant Value Estimate / मूल्य अनुमान</span>
            </span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              Rule-Based Benchmark
            </span>
          </div>

          <div className="mt-3 flex flex-col sm:flex-row items-baseline justify-between gap-2">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-900 tracking-tight">
                ₹{estimatedTotal.toLocaleString("en-IN")}
              </div>
              <p className="text-xs text-emerald-800 font-medium mt-1">
                Estimated Value based on today's market rate in {userCity} (
                <span className="font-bold">
                  ₹{currentRate} / {currentCategory.unit}
                </span>
                )
              </p>
            </div>

            <div className="text-right text-[11px] text-slate-500 font-mono">
              {weight} {currentCategory.unit} × ₹{currentRate}
            </div>
          </div>
        </section>

        {/* STEP 5: Confirm & Create Lot CTA */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleCreateLot}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer active:scale-98"
          >
            <span>Confirm & Create Lot • लॉट दर्ज करें</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-center text-[11px] text-slate-400 mt-2">
            Status will be created as DRAFT. Next step: Match with verified recyclers.
          </p>
        </div>
      </div>
    </div>
  );
}
