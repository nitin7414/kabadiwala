import React, { useState } from 'react';
import { 
  Sparkles, 
  Smartphone, 
  FileText, 
  Menu, 
  X, 
  Layers
} from 'lucide-react';

interface NavbarProps {
  onOpenJudgeBrief: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJudgeBrief }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Collector Dashboard', screenId: 'dashboard' },
    { label: 'My Collection', screenId: 'collection' },
    { label: 'Fair-Price Engine', screenId: 'pricing' },
    { label: 'Recycler Radar', screenId: 'recyclers' },
  ];

  const handleSelectScreen = (screenId: string) => {
    const el = document.getElementById(`prototype-screen-tab-${screenId}`);
    if (el) {
      el.click();
    }
    const walkthrough = document.getElementById('walkthrough');
    if (walkthrough) {
      walkthrough.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/95 border-b border-[#E1F1EE] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand & SIH Badge */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#0D9488] flex items-center justify-center text-white shadow-md shadow-teal-900/10 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5 text-white stroke-[2.4]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-[#064E3B] font-serif">AETHER</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E1F1EE] text-[#0D9488] font-mono font-bold border border-[#B1D8D0]">
                  SIH 2026
                </span>
              </div>
              <p className="text-[11px] text-[#0D9488] font-serif font-semibold tracking-wide">
                Kabadiwala Connect • Prototype Model
              </p>
            </div>
          </a>

          <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-[#E1F1EE] text-xs text-slate-500 font-serif">
            <span className="text-slate-600 font-mono">PS 26229</span>
            <span className="text-slate-300">•</span>
            <span className="text-[#0D9488] font-medium">Ministry of Mines / JNARDDC</span>
          </div>
        </div>

        {/* Desktop Navigation - Prototype Screens */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleSelectScreen(link.screenId)}
              className="px-3 py-1.5 rounded-xl text-xs font-serif font-medium text-slate-700 hover:text-[#064E3B] hover:bg-[#F0F4F3] transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Action CTAs */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenJudgeBrief}
            id="navbar-judge-brief-btn"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-serif font-semibold rounded-xl bg-white hover:bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] transition-all shadow-xs cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Judge 60s Brief</span>
          </button>

          <a
            href="#walkthrough"
            id="navbar-explore-prototype-btn"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-serif font-bold rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white transition-all shadow-md shadow-teal-700/20 active:scale-95"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Live Prototype</span>
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 hover:text-[#064E3B] hover:bg-[#E1F1EE] md:hidden border border-[#E1F1EE]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-slate-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E1F1EE] bg-white px-4 pt-2 pb-4 space-y-2 font-serif">
          <div className="flex items-center justify-between pb-2 border-b border-[#E1F1EE] text-xs text-slate-500 font-mono">
            <span>Problem Statement 26229</span>
            <span className="text-[#0D9488] font-semibold">Clean & Green Tech</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSelectScreen(link.screenId);
                }}
                className="px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-[#064E3B] hover:bg-[#E1F1EE] text-left transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJudgeBrief();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-xl bg-white text-[#92400E] border border-[#FDE68A] shadow-xs"
            >
              <FileText className="w-4 h-4 text-[#F59E0B]" />
              Open Judge 60s Brief
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
