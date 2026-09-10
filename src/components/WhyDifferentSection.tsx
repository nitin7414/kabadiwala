import React from 'react';
import { 
  WifiOff, 
  Scale, 
  QrCode, 
  Sparkles, 
  CheckCircle2, 
  FileCheck, 
  Languages, 
  Cpu
} from 'lucide-react';
import { WHY_DIFFERENT_PILLARS } from '../data/content';

export const WhyDifferentSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'WifiOff':
        return <WifiOff className="w-6 h-6 text-[#0D9488]" />;
      case 'Scale':
        return <Scale className="w-6 h-6 text-[#0D9488]" />;
      case 'QrCode':
        return <QrCode className="w-6 h-6 text-[#F59E0B]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#0D9488]" />;
    }
  };

  return (
    <section id="uniqueness" className="py-20 lg:py-28 bg-[#F0F4F3]/60 border-b border-[#E1F1EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="text-xs uppercase tracking-widest font-mono text-[#0D9488] font-bold bg-[#E1F1EE] px-3 py-1 rounded-full border border-[#B1D8D0]">
              Core Innovations
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#064E3B] tracking-tight">
            Why It's Different: The 3 Uniqueness Pillars
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3.5 leading-relaxed">
            Unlike consumer scrap apps or complex government dashboards, AETHER is engineered specifically for the realities of the informal waste collector.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WHY_DIFFERENT_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E1F1EE] hover:border-[#B1D8D0] transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#F0F4F3] border border-[#E1F1EE] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(pillar.icon)}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#0D9488] bg-[#E1F1EE] px-2.5 py-1 rounded-full border border-[#B1D8D0]">
                    {pillar.tag}
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-400 font-bold mb-1">
                  Pillar 0{idx + 1}
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-[#064E3B] mb-3 group-hover:text-[#0D9488] transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              {/* Technical Footnote */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span>
                  {idx === 0 && "IndexedDB sync & voice prompts in Hindi & regional dialects"}
                  {idx === 1 && "CPCB benchmark & commodity recovery index eliminates middlemen"}
                  {idx === 2 && "Generates audit-ready EPR credit documentation instantly"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Civic Tech Reality Callout */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-[#E1F1EE] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#E1F1EE]">
          <div className="p-2">
            <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-1">
              Bandwidth Resilience
            </div>
            <div className="text-lg font-bold text-[#064E3B]">
              Operates on 2G / Zero Data
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Local queue caches scrap batches until connection resumes
            </p>
          </div>

          <div className="p-2">
            <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-1">
              Grassroots Usability
            </div>
            <div className="text-lg font-bold text-[#064E3B]">
              Visual & Voice-First
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Accessible to collectors regardless of formal literacy levels
            </p>
          </div>

          <div className="p-2">
            <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-1">
              Regulatory Alignment
            </div>
            <div className="text-lg font-bold text-[#064E3B]">
              E-Waste Rules 2022 Ready
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Direct digital audit trail for CPCB EPR certificates
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
