import React from 'react';
import { 
  Network, 
  TrendingDown, 
  ShieldAlert, 
  FileQuestion,
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';
import { CHALLENGE_POINTS } from '../data/content';

export const ChallengeSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'NetworkOff':
        return <Network className="w-6 h-6 text-rose-500" />;
      case 'TrendingDown':
        return <TrendingDown className="w-6 h-6 text-amber-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-orange-500" />;
      case 'FileQuestion':
        return <FileQuestion className="w-6 h-6 text-rose-600" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <section id="challenge" className="py-20 lg:py-28 bg-[#F0F4F3]/60 border-b border-[#E1F1EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="text-xs uppercase tracking-widest font-mono text-[#92400E] font-bold bg-[#FEF3C7] px-3 py-1 rounded-full border border-[#FDE68A]">
              Problem Context • PS 26229
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#064E3B] tracking-tight">
            The Informal E-Waste Crisis in India
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3.5 leading-relaxed">
            While 95% of India's electronic waste is collected by the informal sector, systemic bottlenecks trap grassroots collectors in exploitative cycles and ecological hazards.
          </p>
        </div>

        {/* 4 Clean Icon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CHALLENGE_POINTS.map((point, index) => (
            <div
              key={point.id}
              className="group p-6 sm:p-7 rounded-2xl bg-white border border-[#E1F1EE] hover:border-[#B1D8D0] transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-[#F0F4F3] border border-[#E1F1EE] group-hover:scale-105 transition-transform">
                    {getIcon(point.icon)}
                  </div>
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-black font-mono text-[#064E3B]">
                      {point.stat}
                    </span>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {point.statLabel}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-slate-400 font-bold">
                    0{index + 1}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#064E3B] group-hover:text-[#0D9488] transition-colors">
                    {point.title}
                  </h3>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {point.desc}
                </p>
              </div>

              {/* Bottom tag */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono text-[11px] text-slate-400">Bottleneck #{index + 1}</span>
                <span className="text-rose-600 font-medium flex items-center gap-1">
                  Breaks Formal Supply Chain
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Challenge Summary Callout */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-white border border-[#FDE68A] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-[#92400E]">
              The Real-World Consequence
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Informal workers absorb all health risks while losing up to 40% of material value, and authorized recycling facilities run at only 20-30% capacity due to lack of direct feedstock.
            </p>
          </div>
          <a
            href="#solution"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F0F4F3] hover:bg-[#E1F1EE] text-[#064E3B] text-xs font-semibold whitespace-nowrap border border-[#B1D8D0] shadow-sm"
          >
            <span>See How AETHER Solves This</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#0D9488]" />
          </a>
        </div>

      </div>
    </section>
  );
};
