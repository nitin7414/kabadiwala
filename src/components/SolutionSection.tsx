import React, { useState } from 'react';
import { 
  UserCheck, 
  Boxes, 
  IndianRupee, 
  MapPin, 
  QrCode, 
  Truck, 
  Coins, 
  Navigation, 
  ScanLine, 
  Receipt,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { SOLUTION_FEATURES, JOURNEY_STEPS } from '../data/content';

export const SolutionSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-emerald-400" />;
      case 'Boxes':
        return <Boxes className="w-5 h-5 text-teal-400" />;
      case 'IndianRupee':
        return <IndianRupee className="w-5 h-5 text-amber-400" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-cyan-400" />;
      case 'QrCode':
        return <QrCode className="w-5 h-5 text-emerald-300" />;
      default:
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Truck':
        return <Truck className="w-5 h-5" />;
      case 'Coins':
        return <Coins className="w-5 h-5" />;
      case 'Navigation':
        return <Navigation className="w-5 h-5" />;
      case 'ScanLine':
        return <ScanLine className="w-5 h-5" />;
      case 'ReceiptCheck':
        return <Receipt className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const currentStepData = JOURNEY_STEPS.find((s) => s.stepNumber === activeStep) || JOURNEY_STEPS[0];

  return (
    <section id="solution" className="py-20 lg:py-28 bg-[#F9FBFA] border-b border-[#E1F1EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="text-xs uppercase tracking-widest font-mono text-[#0D9488] font-bold bg-[#E1F1EE] px-3 py-1 rounded-full border border-[#B1D8D0]">
              The AETHER System
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#064E3B] tracking-tight">
            Our Solution: Kabadiwala Connect
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3.5 leading-relaxed">
            A purpose-built mobile tool that empowers the informal collector at every touchpoint—from scrap discovery to transparent liquidation at certified CPCB recycling units.
          </p>
        </div>

        {/* Feature List (5 Core Capabilities) */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Core Collector Capabilities
            </h3>
            <span className="text-xs text-[#0D9488] font-semibold">
              5 Core Features
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SOLUTION_FEATURES.map((feat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-[#E1F1EE] hover:border-[#B1D8D0] transition-all hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F0F4F3] border border-[#E1F1EE] flex items-center justify-center mb-3.5">
                    {getFeatureIcon(feat.icon)}
                  </div>
                  <h4 className="text-sm font-bold text-[#064E3B] mb-2">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono font-semibold text-[#0D9488]">
                  Feature #{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Journey: Step Flow (Collect -> Check Price -> Find Recycler -> Handover -> Digital Record) */}
        <div className="bg-[#F0F4F3] rounded-3xl p-6 sm:p-8 border border-[#B1D8D0]/60 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#0D9488] font-bold">
                End-to-End User Flow
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#064E3B] mt-1">
                The 5-Step Ground Journey
              </h3>
            </div>
            <div className="text-xs text-slate-600 font-medium bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm">
              Click any step to inspect on-ground mechanics
            </div>
          </div>

          {/* Stepper Bar (Horizontal on desktop, scrollable on tablet, vertical friendly) */}
          <div className="relative mb-8">
            {/* Background line for desktop */}
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-slate-200 -z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 relative z-10">
              {JOURNEY_STEPS.map((step) => {
                const isActive = step.stepNumber === activeStep;
                return (
                  <button
                    key={step.stepNumber}
                    onClick={() => setActiveStep(step.stepNumber)}
                    className={`text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white border-2 border-[#0D9488] text-[#064E3B] shadow-md scale-[1.02]'
                        : 'bg-white/80 border-[#E1F1EE] hover:border-slate-300 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-[#0D9488] text-white font-bold shadow-md shadow-teal-700/20'
                            : 'bg-[#F0F4F3] text-slate-600'
                        }`}
                      >
                        {getStepIcon(step.icon)}
                      </div>
                      <span className={`text-xs font-mono font-bold ${isActive ? 'text-[#0D9488]' : 'text-slate-400'}`}>
                        Step 0{step.stepNumber}
                      </span>
                    </div>

                    <div className="font-bold text-sm text-[#064E3B] truncate">
                      {step.name}
                    </div>
                    <div className="text-[11px] text-[#0D9488] font-semibold truncate mt-0.5">
                      {step.hindiName}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {step.summary}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Deep-Dive Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#B1D8D0] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-[#E1F1EE] text-[#0D9488] px-2.5 py-0.5 rounded-full font-bold border border-[#B1D8D0]">
                  Active Stage: 0{currentStepData.stepNumber} — {currentStepData.name}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {currentStepData.hindiName}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#064E3B]">
                {currentStepData.summary}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {currentStepData.detail}
              </p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end gap-3 w-full sm:w-auto shrink-0">
              <a
                href="#walkthrough"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-xs shadow-md shadow-amber-200/60 transition-all"
              >
                <span>Inspect in Prototype</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <div className="hidden sm:block text-[11px] text-slate-400 font-mono text-right">
                Next: Step {activeStep < 5 ? activeStep + 1 : 1}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
