"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  MapPin,
  Calendar,
  Layers,
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Info,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { AdminNav } from "@/components/AdminNav";
import { SEED_CATEGORIES, HISTORICAL_PRICE_TRENDS } from "@/lib/mockSeedData";


export default function AdminPricesPage() {
  const { priceRates, recyclers } = useAppStore();
  const [selectedCatId, setSelectedCatId] = useState<string>("cat_pcb");
  const [selectedRegion, setSelectedRegion] = useState<"BOTH" | "Nagpur" | "Mumbai">("BOTH");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const selectedCategory =
    SEED_CATEGORIES.find((c) => c._id === selectedCatId) || SEED_CATEGORIES[0];
  const trendData = HISTORICAL_PRICE_TRENDS[selectedCatId] || HISTORICAL_PRICE_TRENDS.cat_pcb;

  // Recycler quotes for this category
  const activeQuotes = priceRates.filter(
    (p) => p.materialCategoryId === selectedCatId && p.source === "RECYCLER_QUOTE"
  );
  const highestQuote = activeQuotes.length > 0 ? Math.max(...activeQuotes.map((q) => q.pricePerUnit)) : null;
  const lowestQuote = activeQuotes.length > 0 ? Math.min(...activeQuotes.map((q) => q.pricePerUnit)) : null;

  // Current values
  const currentNagpur = trendData.nagpur[trendData.nagpur.length - 1];
  const currentMumbai = trendData.mumbai[trendData.mumbai.length - 1];
  const spreadPercent = Math.round(((currentMumbai - currentNagpur) / currentNagpur) * 100);

  // SVG Chart Geometry
  const chartWidth = 640;
  const chartHeight = 260;
  const paddingX = 50;
  const paddingY = 40;

  // Find min and max for scaling
  const allValues = [...trendData.nagpur, ...trendData.mumbai];
  const rawMin = Math.min(...allValues);
  const rawMax = Math.max(...allValues);
  const yMin = Math.floor(rawMin * 0.85);
  const yMax = Math.ceil(rawMax * 1.15);

  const getX = (index: number) => {
    const usableWidth = chartWidth - paddingX * 2;
    return paddingX + (index / (trendData.months.length - 1)) * usableWidth;
  };

  const getY = (val: number) => {
    const usableHeight = chartHeight - paddingY * 2;
    const ratio = (val - yMin) / (yMax - yMin || 1);
    return chartHeight - paddingY - ratio * usableHeight;
  };

  const makePath = (values: number[]) => {
    return values
      .map((val, idx) => `${idx === 0 ? "M" : "L"} ${getX(idx)} ${getY(val)}`)
      .join(" ");
  };

  const makeAreaPath = (values: number[]) => {
    const linePath = makePath(values);
    const bottomY = chartHeight - paddingY;
    const lastX = getX(values.length - 1);
    const firstX = getX(0);
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-[#FFFDF9] to-slate-50 pb-16">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                Market Visibility
              </span>
              <span className="text-xs text-slate-500">Historical Commodity Indices</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              E-Waste Price Trends & Regional Benchmarks
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Empowering informal collectors with verified open-market intelligence across major industrial processing clusters.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Oct 2025 – Mar 2026</span>
            </span>
          </div>
        </div>

        {/* Category Selector Pills */}
        <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {SEED_CATEGORIES.map((cat) => {
              const isSelected = cat._id === selectedCatId;
              return (
                <button
                  key={cat._id}
                  onClick={() => setSelectedCatId(cat._id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-amber-600 text-white shadow-xs"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                      isSelected ? "bg-amber-700 text-white" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {cat.unit}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chart Viewport Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900">
                  {selectedCategory.name} Price Trajectory ({trendData.unit})
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparing Central India (Nagpur MIDC) vs Mumbai Metropolitan Hub benchmark
              </p>
            </div>

            {/* Region View Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold self-start sm:self-auto">
              <button
                onClick={() => setSelectedRegion("BOTH")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedRegion === "BOTH" ? "bg-white text-slate-900 shadow-2xs font-extrabold" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Both Hubs
              </button>
              <button
                onClick={() => setSelectedRegion("Nagpur")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedRegion === "Nagpur" ? "bg-amber-600 text-white shadow-2xs font-extrabold" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Nagpur Only
              </button>
              <button
                onClick={() => setSelectedRegion("Mumbai")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedRegion === "Mumbai" ? "bg-blue-600 text-white shadow-2xs font-extrabold" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Mumbai Only
              </button>
            </div>
          </div>

          {/* Interactive SVG Chart Container */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-[620px]">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible select-none">
                <defs>
                  <linearGradient id="nagpurGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d97706" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="mumbaiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Gridlines & Y-Axis Labels */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                  const val = Math.round(yMin + ratio * (yMax - yMin));
                  const yPos = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
                  return (
                    <g key={ratio}>
                      <line
                        x1={paddingX}
                        y1={yPos}
                        x2={chartWidth - paddingX}
                        y2={yPos}
                        stroke="#f1f5f9"
                        strokeDasharray="4 4"
                      />
                      <text
                        x={paddingX - 10}
                        y={yPos + 4}
                        fontSize="10"
                        fontWeight="600"
                        fill="#94a3b8"
                        textAnchor="end"
                      >
                        ₹{val}
                      </text>
                    </g>
                  );
                })}

                {/* X-Axis Month Labels */}
                {trendData.months.map((month, idx) => {
                  const xPos = getX(idx);
                  return (
                    <g key={month}>
                      <line
                        x1={xPos}
                        y1={chartHeight - paddingY}
                        x2={xPos}
                        y2={chartHeight - paddingY + 6}
                        stroke="#cbd5e1"
                      />
                      <text
                        x={xPos}
                        y={chartHeight - paddingY + 20}
                        fontSize="11"
                        fontWeight="600"
                        fill="#64748b"
                        textAnchor="middle"
                      >
                        {month}
                      </text>
                    </g>
                  );
                })}

                {/* Nagpur Area & Line (Orange) */}
                {(selectedRegion === "BOTH" || selectedRegion === "Nagpur") && (
                  <>
                    <path d={makeAreaPath(trendData.nagpur)} fill="url(#nagpurGradient)" />
                    <path
                      d={makePath(trendData.nagpur)}
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {trendData.nagpur.map((val, idx) => (
                      <g key={`ngp-pt-${idx}`}>
                        <circle
                          cx={getX(idx)}
                          cy={getY(val)}
                          r="5"
                          fill="#ffffff"
                          stroke="#d97706"
                          strokeWidth="2.5"
                          className="hover:r-7 transition-all cursor-pointer"
                        />
                        <text
                          x={getX(idx)}
                          y={getY(val) - 10}
                          fontSize="10"
                          fontWeight="700"
                          fill="#b45309"
                          textAnchor="middle"
                        >
                          ₹{val}
                        </text>
                      </g>
                    ))}
                  </>
                )}

                {/* Mumbai Area & Line (Blue) */}
                {(selectedRegion === "BOTH" || selectedRegion === "Mumbai") && (
                  <>
                    <path d={makeAreaPath(trendData.mumbai)} fill="url(#mumbaiGradient)" />
                    <path
                      d={makePath(trendData.mumbai)}
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {trendData.mumbai.map((val, idx) => (
                      <g key={`mum-pt-${idx}`}>
                        <circle
                          cx={getX(idx)}
                          cy={getY(val)}
                          r="5"
                          fill="#ffffff"
                          stroke="#2563eb"
                          strokeWidth="2.5"
                          className="hover:r-7 transition-all cursor-pointer"
                        />
                        <text
                          x={getX(idx)}
                          y={getY(val) - 10}
                          fontSize="10"
                          fontWeight="700"
                          fill="#1d4ed8"
                          textAnchor="middle"
                        >
                          ₹{val}
                        </text>
                      </g>
                    ))}
                  </>
                )}
              </svg>
            </div>
          </div>

          {/* Chart Legend & Insights Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 font-bold text-slate-700">
                <span className="w-3.5 h-3.5 rounded-md bg-amber-600"></span>
                <span>Nagpur Benchmark (MIDC Hingna / Wadi)</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-700">
                <span className="w-3.5 h-3.5 rounded-md bg-blue-600"></span>
                <span>Mumbai Benchmark (Taloja / MMR)</span>
              </div>
            </div>

            <div className="text-slate-500 font-medium text-[11px] flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>Prices updated daily via CPCB accredited refinery intake surveys</span>
            </div>
          </div>
        </div>

        {/* 4 Commodity Insight Metrics for Selected Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nagpur Current Rate</div>
            <div className="text-2xl font-black text-amber-700 mt-1">₹{currentNagpur} <span className="text-xs text-slate-500 font-semibold">{trendData.unit}</span></div>
            <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+12.0% over 6 months</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Mumbai Current Rate</div>
            <div className="text-2xl font-black text-blue-700 mt-1">₹{currentMumbai} <span className="text-xs text-slate-500 font-semibold">{trendData.unit}</span></div>
            <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+12.7% over 6 months</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Regional Price Spread</div>
            <div className="text-2xl font-black text-slate-900 mt-1">+{spreadPercent}%</div>
            <div className="text-[11px] text-slate-500 mt-1">
              Port proximity & export smelter demand
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Platform Recycler Range</div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {lowestQuote ? `₹${lowestQuote} - ₹${highestQuote}` : "No active bids"}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {activeQuotes.length} quotes registered today
            </div>
          </div>
        </div>

        {/* All Material Streams Master Price Grid */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Comprehensive Category Benchmark Summary</h2>
              <p className="text-xs text-slate-500">Live baseline pricing data powering collector instant valuation estimates</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-6">Category Name</th>
                  <th className="py-3 px-4">Unit</th>
                  <th className="py-3 px-4">Nagpur Benchmark</th>
                  <th className="py-3 px-4">Mumbai Benchmark</th>
                  <th className="py-3 px-4">Inter-City Spread</th>
                  <th className="py-3 px-4">6-Month Trend</th>
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SEED_CATEGORIES.map((cat) => {
                  const t = HISTORICAL_PRICE_TRENDS[cat._id] || HISTORICAL_PRICE_TRENDS.cat_pcb;
                  const ngp = t.nagpur[t.nagpur.length - 1];
                  const mum = t.mumbai[t.mumbai.length - 1];
                  const spread = Math.round(((mum - ngp) / ngp) * 100);

                  return (
                    <tr key={cat._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-6 font-bold text-slate-900">{cat.name}</td>
                      <td className="py-3.5 px-4 text-slate-500">{cat.unit}</td>
                      <td className="py-3.5 px-4 font-semibold text-amber-800">₹{ngp}</td>
                      <td className="py-3.5 px-4 font-semibold text-blue-800">₹{mum}</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-700">+{spread}%</td>
                      <td className="py-3.5 px-4 text-emerald-600 font-bold flex items-center gap-1">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        <span>Bullish</span>
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <button
                          onClick={() => setSelectedCatId(cat._id)}
                          className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 font-bold text-xs cursor-pointer transition-colors"
                        >
                          View Graph
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
