import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProductWalkthrough } from './components/ProductWalkthrough';
import { RolePlatformExperience } from './components/RolePlatformExperience';
import { JudgeQuickModal } from './components/JudgeQuickModal';
import { FileText, ArrowUp, Layers, Sparkles, Smartphone, LayoutGrid } from 'lucide-react';

export default function App() {
  const [judgeModalOpen, setJudgeModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<'platform' | 'walkthrough'>('platform');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#1A2E2A] flex flex-col font-sans selection:bg-[#0D9488] selection:text-white relative">
      {/* Top Navigation Bar */}
      <Navbar onOpenJudgeBrief={() => setJudgeModalOpen(true)} />

      {/* Interactive Platform Mode Switcher Banner */}
      <div className="bg-emerald-950 text-white border-b border-emerald-900/60 sticky top-18 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-300 font-bold uppercase tracking-wider text-[11px]">
              Platform View:
            </span>
            <span className="text-slate-200">
              {activeView === 'platform' ? 'Live Role Portals & Collector Flow (Phases 0–3)' : 'SIH 2026 Prototype Walkthrough'}
            </span>
          </div>

          <div className="flex items-center bg-emerald-900/80 p-1 rounded-xl border border-emerald-700/50 text-xs">
            <button
              onClick={() => setActiveView('platform')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeView === 'platform'
                  ? 'bg-emerald-500 text-slate-950 shadow-md scale-102'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Role Portals & Lot Flow</span>
            </button>

            <button
              onClick={() => setActiveView('walkthrough')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeView === 'walkthrough'
                  ? 'bg-emerald-500 text-slate-950 shadow-md scale-102'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Walkthrough Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'platform' ? (
          <RolePlatformExperience />
        ) : (
          <ProductWalkthrough />
        )}
      </main>

      {/* Elegant Minimalist Footer */}
      <footer className="bg-white border-t border-[#E1F1EE] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#0D9488] flex items-center justify-center text-white">
              <Layers className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span className="font-bold text-[#064E3B]">Scrap Setu — Kabadiwala Connect</span>
            <span>•</span>
            <span>SIH 2026 Problem Statement 26229</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <span>Clean & Green Technology Theme</span>
            <span>•</span>
            <button
              onClick={() => setJudgeModalOpen(true)}
              className="text-[#0D9488] hover:underline font-semibold cursor-pointer"
            >
              Judge Briefing Specimen
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Action Controls */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <button
          onClick={() => setJudgeModalOpen(true)}
          id="floating-judge-brief-btn"
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white hover:bg-[#FEF3C7] text-[#92400E] font-semibold text-xs border border-[#FDE68A] shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>Judge 60s Brief</span>
        </button>

        <button
          onClick={scrollToTop}
          id="floating-scroll-top-btn"
          className="w-10 h-10 rounded-full bg-white hover:bg-[#F0F4F3] text-slate-700 hover:text-[#064E3B] flex items-center justify-center border border-slate-200 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Judge Briefing Sheet Modal */}
      <JudgeQuickModal
        isOpen={judgeModalOpen}
        onClose={() => setJudgeModalOpen(false)}
        onJumpToPrototype={() => setActiveView('walkthrough')}
      />
    </div>
  );
}
