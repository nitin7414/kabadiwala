import React from 'react';
import { 
  HeartHandshake, 
  Factory, 
  Leaf, 
  Landmark, 
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { IMPACT_CARDS } from '../data/content';

export const ImpactSection: React.FC = () => {
  const getImpactIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-[#0D9488]" />;
      case 'Factory':
        return <Factory className="w-6 h-6 text-[#0D9488]" />;
      case 'Leaf':
        return <Leaf className="w-6 h-6 text-[#0D9488]" />;
      case 'Landmark':
        return <Landmark className="w-6 h-6 text-[#F59E0B]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#0D9488]" />;
    }
  };

  return (
    <section id="impact" className="py-20 lg:py-28 bg-[#F0F4F3]/60 border-b border-[#E1F1EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="text-xs uppercase tracking-widest font-mono text-[#0D9488] font-bold bg-[#E1F1EE] px-3 py-1 rounded-full border border-[#B1D8D0]">
              Measurable Outcomes
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#064E3B] tracking-tight">
            Multi-Stakeholder Impact
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3.5 leading-relaxed">
            By formalizing the informal chain instead of displacing it, AETHER creates tangible economic, environmental, and civic dividends across the entire circular ecosystem.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {IMPACT_CARDS.map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-[#E1F1EE] hover:border-[#B1D8D0] transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F0F4F3] border border-[#E1F1EE] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getImpactIcon(card.icon)}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#0D9488] bg-[#E1F1EE] px-2.5 py-0.5 rounded-full border border-[#B1D8D0]">
                    {card.metricBadge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#064E3B] mb-4">
                  {card.category}
                </h3>

                <ul className="space-y-3">
                  {card.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0D9488] shrink-0" />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom tag */}
              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Beneficiary #{idx + 1}</span>
                <span className="text-[#0D9488] font-semibold">Sustainable KPI</span>
              </div>
            </div>
          ))}
        </div>

        {/* Circular Economy Macro Stat */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-[#E1F1EE] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E1F1EE] border border-[#B1D8D0] text-[#0D9488] flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#064E3B]">
                Aligned with National Critical Mineral Security
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Supports Ministry of Mines & JNARDDC targets to recover Gold, Lithium, Copper, and rare earth elements from domestic urban mining.
              </div>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-mono uppercase text-slate-400">Urban Mining Yield</span>
            <div className="text-xl font-bold font-mono text-[#064E3B]">
              80x Richer than Ore
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
