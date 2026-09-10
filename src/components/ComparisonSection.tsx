import React from 'react';
import { 
  Check, 
  X, 
  Minus, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Smartphone,
  Info
} from 'lucide-react';
import { COMPARISON_DATA } from '../data/content';

export const ComparisonSection: React.FC = () => {
  const renderStatus = (val: boolean | 'partial') => {
    if (val === true) {
      return (
        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#E1F1EE] text-[#0D9488] border border-[#B1D8D0]">
          <Check className="w-4 h-4 stroke-[3]" />
        </div>
      );
    }
    if (val === 'partial') {
      return (
        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A] text-xs font-bold" title="Partial / Limited capability">
          <Minus className="w-4 h-4 stroke-[3]" />
        </div>
      );
    }
    return (
      <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-400 border border-slate-200">
        <X className="w-4 h-4 stroke-[2.5]" />
      </div>
    );
  };

  return (
    <section id="comparison" className="py-20 lg:py-28 bg-[#F9FBFA] border-b border-[#E1F1EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="text-xs uppercase tracking-widest font-mono text-[#0D9488] font-bold bg-[#E1F1EE] px-3 py-1 rounded-full border border-[#B1D8D0]">
              Competitive Landscape
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#064E3B] tracking-tight">
            How We Compare
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3.5 leading-relaxed">
            Existing tools either cater to affluent households (B2C pickups) or enterprise municipal dashboards. AETHER is the only platform built directly for the grassroots informal collector with end-to-end digital traceability.
          </p>
        </div>

        {/* Simplified Comparison Table / Matrix */}
        <div className="overflow-x-auto rounded-3xl border border-[#E1F1EE] bg-white shadow-sm custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#E1F1EE] bg-[#F0F4F3] text-xs font-mono uppercase tracking-wider text-slate-600">
                <th className="p-4 sm:p-5 w-64 font-bold">Solution / Platform</th>
                <th className="p-4 text-center font-bold">Informal-Collector Focus</th>
                <th className="p-4 text-center font-bold">Verified Recycler Link</th>
                <th className="p-4 text-center font-bold">Fair-Price Guidance</th>
                <th className="p-4 text-center font-bold">Offline Use Ready</th>
                <th className="p-4 text-center font-bold">Digital EPR Traceability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1F1EE] text-sm">
              {COMPARISON_DATA.map((item, index) => {
                const isAether = index === 0;
                return (
                  <tr
                    key={item.name}
                    className={`transition-colors ${
                      isAether
                        ? 'bg-[#E1F1EE]/40 hover:bg-[#E1F1EE]/60 font-medium border-l-4 border-l-[#0D9488]'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="p-4 sm:p-5">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${isAether ? 'text-[#064E3B] text-base' : 'text-slate-800'}`}>
                          {item.name}
                        </span>
                        {isAether && (
                          <span className="text-[10px] font-mono font-bold bg-[#0D9488] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Our Project
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {item.category}
                      </div>
                    </td>

                    <td className="p-4 text-center">{renderStatus(item.informalFocus)}</td>
                    <td className="p-4 text-center">{renderStatus(item.verifiedRecycler)}</td>
                    <td className="p-4 text-center">{renderStatus(item.fairPriceGuidance)}</td>
                    <td className="p-4 text-center">{renderStatus(item.offlineUse)}</td>
                    <td className="p-4 text-center">{renderStatus(item.digitalTraceability)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Legend & Key Takeaway */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#E1F1EE] text-[#0D9488] flex items-center justify-center border border-[#B1D8D0]">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>Fully Supported</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center border border-[#FDE68A]">
                <Minus className="w-3 h-3 stroke-[3]" />
              </div>
              <span>Partial / Limited</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border border-slate-200">
                <X className="w-3 h-3 stroke-[2.5]" />
              </div>
              <span>Not Supported</span>
            </div>
          </div>

          <div className="text-[#0D9488] font-mono font-semibold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>AETHER is 5/5 on all critical field parameters</span>
          </div>
        </div>

      </div>
    </section>
  );
};
