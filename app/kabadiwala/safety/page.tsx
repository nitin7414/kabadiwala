"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  BatteryCharging,
  Flame,
  ShieldAlert,
  Tv,
  Cable,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";
import { SEED_CATEGORIES } from "@/lib/mockSeedData";

export default function KabadiwalaSafetyPage() {
  const safetyCards = [
    {
      category: "Lithium-ion Batteries / लिथियम बैटरी",
      icon: BatteryCharging,
      color: "from-red-600 to-amber-700",
      bgColor: "bg-red-50 border-red-200",
      textColor: "text-red-900",
      hazard: "Extreme thermal runaway and explosion hazard if punctured or short-circuited.",
      dos: "Always tape copper contacts and store in dry sand / cool containers.",
      donts: "Never hit with hammer, puncture casing, or expose to direct flame.",
      dangerLevel: "High Explosion Hazard",
    },
    {
      category: "CRT & Old Monitors / सीआरटी मॉनिटर ग्लास",
      icon: Tv,
      color: "from-amber-600 to-orange-700",
      bgColor: "bg-amber-50 border-amber-200",
      textColor: "text-amber-900",
      hazard: "Funnel glass contains over 20% toxic lead oxide. Vacuum tube poses implosion injury risk.",
      dos: "Keep glass funnel intact; carry with protective gloves.",
      donts: "Do not smash glass for copper yoke extraction in open residential areas.",
      dangerLevel: "Toxic Heavy Metal Hazard",
    },
    {
      category: "Copper Cables & PCB / तार व सर्किट बोर्ड",
      icon: Flame,
      color: "from-orange-600 to-red-800",
      bgColor: "bg-orange-50 border-orange-200",
      textColor: "text-orange-900",
      hazard: "PVC insulation and circuit resins release carcinogenic dioxins, furans & lead fumes.",
      dos: "Use mechanical cable strippers or granulators to salvage pure copper core.",
      donts: "NEVER burn cables in open garbage fires — fumes cause permanent lung damage.",
      dangerLevel: "Carcinogenic Inhalation Hazard",
    },
  ];

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

        <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full flex items-center gap-1">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <span>CPCB Safety Guidelines • सुरक्षा निर्देश</span>
        </span>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-amber-700 via-orange-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-amber-300" />
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-200">
            Collector Health & Safety Shield • स्वास्थ्य सुरक्षा
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">
          Handling Hazardous E-Waste Safely
        </h1>
        <p className="text-xs sm:text-sm text-amber-100/90 mt-1 max-w-xl">
          Informal dismantlers face high exposure to lead, toxic fumes, and battery fires. Follow these 3 critical rules to protect yourself and get maximum payout from formal recyclers.
        </p>
      </div>

      {/* Pictorial Safety Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {safetyCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.category}
              className={`rounded-3xl p-6 border-2 ${card.bgColor} shadow-sm flex flex-col justify-between space-y-4`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-300">
                    {card.dangerLevel}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900">{card.category}</h3>
                <p className="text-xs font-semibold text-red-800 mt-1.5 leading-relaxed">
                  {card.hazard}
                </p>
              </div>

              {/* Do's and Don'ts */}
              <div className="space-y-2.5 pt-3 border-t border-slate-200/80 text-xs">
                <div className="flex items-start gap-2 text-emerald-900 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">DO / क्या करें:</span>
                    <span>{card.dos}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-red-900 bg-red-50/80 p-2.5 rounded-xl border border-red-200">
                  <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">DON'T / क्या न करें:</span>
                    <span>{card.donts}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
