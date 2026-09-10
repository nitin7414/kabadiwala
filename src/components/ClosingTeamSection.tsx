import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Smartphone, 
  ShieldCheck, 
  Layers, 
  FileText, 
  Award, 
  Leaf, 
  Landmark, 
  Building2,
  Users
} from 'lucide-react';
import { CLOSING_DATA } from '../data/content';

interface ClosingTeamProps {
  onOpenJudgeBrief: () => void;
}

export const ClosingTeamSection: React.FC<ClosingTeamProps> = ({ onOpenJudgeBrief }) => {
  return (
    <section id="team" className="py-20 lg:py-28 bg-[#F0F4F3]/60 relative overflow-hidden border-t border-[#E1F1EE]">
      {/* Glow decorative element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-[#0D9488]/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main USP & Pitch Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E1F1EE] text-center shadow-sm mb-16">
          
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-xs uppercase tracking-widest font-mono text-[#0D9488] font-bold bg-[#E1F1EE] px-3 py-1 rounded-full border border-[#B1D8D0]">
              Our Core Value Proposition
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#064E3B] tracking-tight max-w-4xl mx-auto leading-tight mb-6">
            "{CLOSING_DATA.usp}"
          </h2>

          {/* Tagline Pill */}
          <div className="inline-block mb-8">
            <div className="text-sm sm:text-base font-bold font-mono tracking-wider text-[#0D9488] bg-[#E1F1EE] px-5 py-2 rounded-xl border border-[#B1D8D0] shadow-sm">
              {CLOSING_DATA.tagline}
            </div>
          </div>

          {/* Next Step Banner */}
          <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-[#F0F4F3] border border-[#B1D8D0]/60 mb-8">
            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1 font-bold">
              Immediate Next Milestone
            </div>
            <div className="text-sm sm:text-base font-bold text-[#064E3B]">
              {CLOSING_DATA.nextStep}
            </div>
          </div>

          {/* Judge Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#walkthrough"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white font-bold text-sm shadow-md shadow-teal-700/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Smartphone className="w-4 h-4" />
              <span>Review Mobile Prototype</span>
            </a>

            <button
              onClick={onOpenJudgeBrief}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#064E3B] font-semibold text-sm border border-slate-200 transition-all shadow-sm active:scale-95"
            >
              <FileText className="w-4 h-4 text-[#F59E0B]" />
              <span>Open 60-Second Judge Brief</span>
            </button>
          </div>

        </div>

        {/* Team, Ministry & Partner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="p-6 rounded-3xl bg-white border border-[#E1F1EE] shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E1F1EE] border border-[#B1D8D0] text-[#0D9488] flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                Hackathon Builders
              </span>
              <h3 className="text-base font-bold text-[#064E3B] mt-0.5">
                {CLOSING_DATA.team}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Dedicated civic-tech engineering team participating in Smart India Hackathon 2026.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E1F1EE] shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E1F1EE] border border-[#B1D8D0] text-[#0D9488] flex items-center justify-center shrink-0">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                Sponsoring Authority
              </span>
              <h3 className="text-base font-bold text-[#064E3B] mt-0.5">
                {CLOSING_DATA.ministry}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Fostering sustainable resource management and critical mineral security across India.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E1F1EE] shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E1F1EE] border border-[#B1D8D0] text-[#0D9488] flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                Technical Collaborator
              </span>
              <h3 className="text-base font-bold text-[#064E3B] mt-0.5">
                JNARDDC
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Jawaharlal Nehru Aluminium Research Development & Design Centre • Nagpur, India.
              </p>
            </div>
          </div>

        </div>

        {/* Professional Footer */}
        <footer className="pt-8 border-t border-[#E1F1EE] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#064E3B]">AETHER</span>
            <span>—</span>
            <span>Smart India Hackathon 2026 (Problem Statement 26229)</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Clean & Green Technology</span>
            <span>•</span>
            <span className="text-[#0D9488] font-semibold">Collect • Connect • Recycle</span>
          </div>
        </footer>

      </div>
    </section>
  );
};
