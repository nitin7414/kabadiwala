import React from 'react';
import { 
  ArrowRight, 
  Layers, 
  User, 
  Smartphone, 
  Factory, 
  ShieldCheck, 
  Coins, 
  CheckCircle2, 
  Sparkles,
  RefreshCw,
  Zap
} from 'lucide-react';
import { HERO_DATA, FLOW_NODES } from '../data/content';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#E1F1EE] bg-[#F9FBFA]">
      {/* Subtle natural dot grid background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]" 
        style={{
          backgroundImage: `radial-gradient(#0D9488 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8">
          {HERO_DATA.badges.map((badge, idx) => {
            const isCleanGreen = badge.label.toLowerCase().includes('clean') || badge.label.toLowerCase().includes('green');
            return (
              <span
                key={idx}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${
                  isCleanGreen
                    ? 'bg-[#FEF3C7] border-[#FDE68A] text-[#92400E]'
                    : badge.highlight
                    ? 'bg-[#E1F1EE] border-[#B1D8D0] text-[#0D9488] shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                {badge.highlight && <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] animate-pulse" />}
                {badge.label}
              </span>
            );
          })}
        </div>

        {/* Main Header & One-Line Mission */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-widest font-mono text-[#0D9488] font-bold bg-[#E1F1EE] px-3 py-1 rounded-full border border-[#B1D8D0]">
              Smart India Hackathon 2026 Showcase
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#064E3B] leading-tight mb-4">
            <span>AETHER</span>
            <span className="block text-2xl sm:text-4xl lg:text-5xl font-bold text-[#0D9488] mt-1">
              {HERO_DATA.tagline}
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-[#1A2E2A] font-medium max-w-3xl mx-auto leading-relaxed">
            "{HERO_DATA.mission}"
          </p>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-4 leading-normal">
            Empowering grassroots kabadiwalas with digital transparent pricing, offline-ready vernacular logging, and direct verified handover to CPCB-registered formal recyclers.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#solution"
              id="hero-see-how-it-works-btn"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-sm sm:text-base shadow-lg shadow-amber-200/60 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>See How It Works</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>

            <button
              onClick={onExploreClick}
              id="hero-explore-prototype-btn"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F0F4F3] text-[#1A2E2A] font-semibold text-sm sm:text-base border border-slate-200 shadow-sm transition-all hover:scale-[1.02] active:scale-95"
            >
              <Smartphone className="w-4 h-4 text-[#0D9488]" />
              <span>Explore Mobile Prototype</span>
            </button>
          </div>
        </div>

        {/* Visual 3-Node Flow Graphic (Informal Collector -> Kabadiwala Connect -> Authorized Recycler) */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
              The 3-Node Formalization Architecture
            </span>
          </div>

          <div className="relative bg-[#F0F4F3] rounded-3xl p-6 sm:p-8 border border-[#B1D8D0]/60 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              
              {/* Node 1: Informal Collector */}
              <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-[#E1F1EE] shadow-sm hover:border-[#0D9488]/40 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-[#E1F1EE] border border-[#B1D8D0] text-[#0D9488] flex items-center justify-center mb-4 shadow-sm">
                  <User className="w-7 h-7" />
                </div>
                <div className="inline-block text-[11px] font-mono font-bold text-[#0D9488] bg-[#E1F1EE] px-2.5 py-0.5 rounded-full border border-[#B1D8D0] mb-2">
                  Node 01
                </div>
                <h3 className="text-base font-bold text-[#064E3B] mb-1">Informal Collector</h3>
                <p className="text-xs font-semibold text-[#0D9488] mb-2">Kabadiwala / Grassroots Aggregator</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Collects discarded electronics, segregates PCBs & copper, logs inventory offline in local language.
                </p>
              </div>

              {/* Connecting arrow 1 (Desktop) */}
              <div className="hidden md:flex absolute left-[31.5%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 items-center justify-center">
                <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-[#B1D8D0] text-[#0D9488] shadow-sm">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Fair Rates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Node 2: Kabadiwala Connect (App) */}
              <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border-2 border-[#0D9488] relative shadow-md">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F59E0B] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-sm">
                  The Catalyst Platform
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#0D9488] text-white flex items-center justify-center mb-4 shadow-md shadow-teal-700/20">
                  <Smartphone className="w-7 h-7 stroke-[2.2]" />
                </div>
                <div className="inline-block text-[11px] font-mono font-bold text-[#0D9488] bg-[#E1F1EE] px-2.5 py-0.5 rounded-full border border-[#B1D8D0] mb-2">
                  Node 02 • Core Bridge
                </div>
                <h3 className="text-base font-bold text-[#064E3B] mb-1">AETHER App</h3>
                <p className="text-xs font-semibold text-[#0D9488] mb-2">Kabadiwala Connect (Mobile)</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Transparent metal price indexing, offline-first voice/text UI, nearby verified recycler radar & QR handover.
                </p>
              </div>

              {/* Connecting arrow 2 (Desktop) */}
              <div className="hidden md:flex absolute left-[68.5%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 items-center justify-center">
                <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-[#B1D8D0] text-[#0D9488] shadow-sm">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Traceable Flow</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Node 3: Authorized Recycler */}
              <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-[#E1F1EE] shadow-sm hover:border-[#0D9488]/40 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-[#E1F1EE] border border-[#B1D8D0] text-[#0D9488] flex items-center justify-center mb-4 shadow-sm">
                  <Factory className="w-7 h-7" />
                </div>
                <div className="inline-block text-[11px] font-mono font-bold text-[#0D9488] bg-[#E1F1EE] px-2.5 py-0.5 rounded-full border border-[#B1D8D0] mb-2">
                  Node 03
                </div>
                <h3 className="text-base font-bold text-[#064E3B] mb-1">Authorized Recycler</h3>
                <p className="text-xs font-semibold text-[#0D9488] mb-2">CPCB / SPCB Registered Unit</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Receives segregated scrap, validates digital weight via QR, credits instant UPI payout, generates EPR compliance credits.
                </p>
              </div>

            </div>

            {/* Bottom summary banner inside card */}
            <div className="mt-6 pt-4 border-t border-[#B1D8D0]/50 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />
                <span>Bypasses informal cartels & dangerous backyard open-air acid leaching</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[#064E3B] font-semibold">
                <span>EPR Traceability: 100% Digital Handshake</span>
              </div>
            </div>
          </div>
        </div>

        {/* National Landscape Statistics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {HERO_DATA.stats.map((item, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#E1F1EE] shadow-sm text-center hover:border-[#B1D8D0] transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] font-mono">
                {item.value}
              </div>
              <div className="text-xs text-slate-600 mt-1 font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
