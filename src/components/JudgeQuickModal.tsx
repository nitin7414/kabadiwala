import React from 'react';
import { 
  X, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Landmark, 
  TrendingUp,
  Smartphone
} from 'lucide-react';

interface JudgeQuickModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToPrototype: () => void;
}

export const JudgeQuickModal: React.FC<JudgeQuickModalProps> = ({
  isOpen,
  onClose,
  onJumpToPrototype
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn font-serif">
      <div className="bg-white border border-[#B1D8D0] max-w-2xl w-full rounded-3xl p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar font-serif">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E1F1EE]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] px-2.5 py-0.5 rounded-full uppercase">
                Judge 60-Second Briefing
              </span>
              <span className="text-xs font-mono text-slate-500">SIH 2026 • PS 26229</span>
            </div>
            <h3 className="text-xl font-extrabold text-[#064E3B] mt-1.5">
              AETHER — Kabadiwala Connect
            </h3>
            <p className="text-xs text-[#0D9488] font-semibold mt-0.5">
              Theme: Clean & Green Technology • Ministry of Mines (MoM) / JNARDDC
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-[#F0F4F3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 60-Second Brief Grid */}
        <div className="mt-5 space-y-4 text-xs sm:text-sm">
          
          <div className="p-4 rounded-2xl bg-[#F0F4F3] border border-[#B1D8D0]/60">
            <div className="font-bold text-xs uppercase font-mono tracking-wider text-[#064E3B] mb-1">
              1. The Core Problem
            </div>
            <p className="text-slate-600 leading-relaxed text-xs">
              95% of India's 1.71 million tonnes of e-waste is handled informally. Grassroots kabadiwalas lack access to authorized recyclers, suffer 30-40% value loss from middleman price gouging, engage in dangerous open acid leaching, and produce zero digital records.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F0F4F3] border border-[#B1D8D0]/60">
            <div className="font-bold text-xs uppercase font-mono tracking-wider text-[#0D9488] mb-1">
              2. The AETHER Solution
            </div>
            <p className="text-slate-600 leading-relaxed text-xs">
              A vernacular, offline-first mobile app that acts as a direct bridge: gives collectors real-time metal benchmark price guidance, geolocates verified CPCB/SPCB recyclers, and executes a 2-way QR code handshake to generate verifiable EPR compliance receipts.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F0F4F3] border border-[#B1D8D0]/60">
            <div className="font-bold text-xs uppercase font-mono tracking-wider text-[#064E3B] mb-1.5">
              3. The 3 Differentiators
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                <span><strong className="text-[#064E3B]">Offline-First & Local Language:</strong> Works in scrap yards with no internet; audio & Hindi prompts.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                <span><strong className="text-[#064E3B]">Fair-Price Index:</strong> Dynamic pricing tied to London Metal Exchange & CPCB recovery norms.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                <span><strong className="text-[#064E3B]">Tamper-Proof Traceability:</strong> SHA-256 signed digital receipt feeding formal EPR quotas.</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#E1F1EE] border border-[#B1D8D0]">
              <span className="font-bold text-[#0D9488] text-[11px] uppercase tracking-wider font-mono">Collector Benefit</span>
              <div className="text-[#064E3B] font-bold text-sm mt-0.5">+25% to 35% Higher Income</div>
              <div className="text-[11px] text-slate-600 mt-0.5">Formal identity & micro-credit eligibility</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FEF3C7] border border-[#FDE68A]">
              <span className="font-bold text-[#B45309] text-[11px] uppercase tracking-wider font-mono">Recycler Benefit</span>
              <div className="text-[#92400E] font-bold text-sm mt-0.5">3.2x Raw Feedstock Inflow</div>
              <div className="text-[11px] text-[#92400E]/80 mt-0.5">Eliminates intermediary brokerage costs</div>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="mt-6 pt-4 border-t border-[#E1F1EE] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            Close Brief
          </button>

          <button
            onClick={() => {
              onClose();
              onJumpToPrototype();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-bold shadow-md shadow-teal-700/20 transition-all"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Examine Mobile Prototype</span>
          </button>
        </div>

      </div>
    </div>
  );
};
