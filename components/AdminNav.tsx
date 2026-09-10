"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, TrendingUp, AlertOctagon } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { SEED_CATEGORIES } from "@/lib/mockSeedData";

export const AdminNav: React.FC = () => {
  const pathname = usePathname();
  const { priceRates } = useAppStore();

  // Calculate anomaly count dynamically
  const marketAverages = priceRates.filter((p) => p.source === "MARKET_AVERAGE");
  const recyclerQuotes = priceRates.filter((p) => p.source === "RECYCLER_QUOTE");

  const anomalyCount = recyclerQuotes.filter((quote) => {
    const marketAvg = marketAverages.find(
      (m) => m.materialCategoryId === quote.materialCategoryId && m.location === quote.location
    );
    if (!marketAvg || marketAvg.pricePerUnit <= 0) return false;
    const discount = (marketAvg.pricePerUnit - quote.pricePerUnit) / marketAvg.pricePerUnit;
    return discount > 0.3; // >30% below market
  }).length;

  const navItems = [
    {
      label: "Oversight Overview",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/admin" || pathname === "/admin/dashboard",
    },
    {
      label: "Recycler Licensing",
      href: "/admin/recyclers",
      icon: Building2,
      active: pathname === "/admin/recyclers",
    },
    {
      label: "Market Price Trends",
      href: "/admin/prices",
      icon: TrendingUp,
      active: pathname === "/admin/prices",
    },
    {
      label: "Pricing Anomalies",
      href: "/admin/anomalies",
      icon: AlertOctagon,
      active: pathname === "/admin/anomalies",
      badge: anomalyCount > 0 ? anomalyCount : null,
    },
  ];

  return (
    <div className="bg-white border-b border-amber-200/70 shadow-2xs mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  item.active
                    ? "bg-amber-100/80 text-amber-900 shadow-xs border border-amber-300/60"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <Icon className={`w-4 h-4 ${item.active ? "text-amber-700" : "text-slate-500"}`} />
                <span>{item.label}</span>
                {item.badge !== null && item.badge !== undefined && (
                  <span className="ml-1 px-1.5 py-0.5 text-[10px] font-black rounded-full bg-red-500 text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
