import React from 'react';
import { 
  CheckCircle, 
  Layers, 
  Milestone, 
  Smartphone, 
  Globe2, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { FEASIBILITY_COLUMNS } from '../data/content';

export const FeasibilitySection: React.FC = () => {
  return (
    <section id="feasibility" className="py-20 lg:py-28 bg-[#F9FBFA] border-b border-[#E1F1EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="text-xs uppercase tracking-widest font-mono text-[#0D9488] font-bold bg-[#E1F1EE] px-3 py-1 rounded-full border border-[#B1D8D0]">
              Execution Viability
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#064E3B] tracking-tight">
            Feasibility Snapshot & Scale Path
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3.5 leading-relaxed">
            Engineered to deploy rapidly within existing Indian infrastructure without requiring multi-billion dollar capital expenditure or specialized hardware.
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {FEASIBILITY_COLUMNS.map((col, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E1F1EE] hover:border-[#B1D8D0] transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Column 0{idx + 1}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#0D9488] bg-[#E1F1EE] px-2.5 py-0.5 rounded-full border border-[#B1D8D0]">
                    {col.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#064E3B] mb-1">
                  {col.heading}
                </h3>
                <p className="text-xs text-[#0D9488] font-semibold mb-6">
                  {col.subtitle}
                </p>

                <div className="space-y-3.5">
                  {col.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                      <div className="mt-1 w-2 h-2 rounded-full bg-[#0D9488] shrink-0" />
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom accent tag */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono text-[11px] text-slate-400">
                  {idx === 0 && "Zero CapEx Barrier"}
                  {idx === 1 && "4 Core Modules Ready"}
                  {idx === 2 && "Pan-India Expansion"}
                </span>
                <span className="text-[#0D9488] font-semibold">
                  {idx === 0 && "Operational in Field"}
                  {idx === 1 && "Full Functional Coverage"}
                  {idx === 2 && "EPR Mandate Driven"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Scale Path Visual Milestones: Pilot -> City -> State -> Nationwide */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-[#E1F1EE] shadow-sm">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D9488] mb-2">
            Phased Roadmap Timeline
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-[#064E3B] mb-6">
            From Regional Pilot to Pan-India Circular Economy
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-[#F0F4F3] border border-[#B1D8D0] relative">
              <span className="text-[10px] font-mono text-[#0D9488] font-bold bg-[#E1F1EE] px-2.5 py-0.5 rounded-full border border-[#B1D8D0]">
                PHASE 01 • MONTHS 1-3
              </span>
              <div className="text-base font-bold text-[#064E3B] mt-2.5">Pilot Deployment</div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Nagpur (JNARDDC cluster) with 200 grassroots kabadiwalas & 5 verified recyclers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F9FBFA] border border-[#E1F1EE]">
              <span className="text-[10px] font-mono text-[#0D9488] font-bold bg-[#E1F1EE] px-2.5 py-0.5 rounded-full border border-[#B1D8D0]">
                PHASE 02 • MONTHS 4-8
              </span>
              <div className="text-base font-bold text-[#064E3B] mt-2.5">City Scale</div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Municipal tie-ups across Delhi NCR & Mumbai informal scrap agglomerations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F9FBFA] border border-[#E1F1EE]">
              <span className="text-[10px] font-mono text-[#0D9488] font-bold bg-[#E1F1EE] px-2.5 py-0.5 rounded-full border border-[#B1D8D0]">
                PHASE 03 • MONTHS 9-15
              </span>
              <div className="text-base font-bold text-[#064E3B] mt-2.5">State Cluster</div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                State Pollution Control Board portal integration & SHG cooperative onboarding.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F9FBFA] border border-[#E1F1EE]">
              <span className="text-[10px] font-mono text-[#B45309] font-bold bg-[#FEF3C7] px-2.5 py-0.5 rounded-full border border-[#FDE68A]">
                PHASE 04 • MONTHS 16-24
              </span>
              <div className="text-base font-bold text-[#064E3B] mt-2.5">Nationwide Grid</div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                500,000+ informal collectors powering India's critical mineral self-reliance.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
