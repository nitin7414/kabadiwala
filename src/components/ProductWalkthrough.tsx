import React, { useState } from 'react';
import { 
  Smartphone, 
  Layers, 
  QrCode, 
  MapPin, 
  IndianRupee, 
  Scale, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Phone, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Plus,
  RefreshCw,
  Eye,
  AlertCircle,
  FileCheck,
  Check,
  Globe,
  Camera,
  Mic,
  Wifi,
  WifiOff,
  Battery,
  Search,
  Sliders,
  CheckCircle,
  Share2,
  Trash2,
  Navigation,
  Compass,
  Building2,
  Award,
  Volume2,
  X,
  Radio,
  ArrowUpRight,
  SlidersHorizontal,
  Maximize2
} from 'lucide-react';

export const ProductWalkthrough: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<'dashboard' | 'collection' | 'pricing' | 'recyclers'>('dashboard');
  const [language, setLanguage] = useState<'en' | 'hi' | 'mr'>('en');
  const [isOffline, setIsOffline] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showCameraScanner, setShowCameraScanner] = useState(false);
  const [showVoicePrompt, setShowVoicePrompt] = useState(false);
  const [showAddBatchModal, setShowAddBatchModal] = useState(false);
  const [recyclerViewMode, setRecyclerViewMode] = useState<'list' | 'radar'>('list');
  const [zoomMode, setZoomMode] = useState(false);

  // Pricing Engine State
  const [calcMaterial, setCalcMaterial] = useState<'pcb' | 'copper' | 'lithium' | 'telecom'>('pcb');
  const [calcWeight, setCalcWeight] = useState<number>(35);
  const [priceLocked, setPriceLocked] = useState(false);

  // Inventory Batches State
  const [inventoryItems, setInventoryItems] = useState([
    { id: 'batch-1', name: 'High-Grade PCB Motherboards', hindiName: 'उच्च श्रेणी के मदरबोर्ड', category: 'Circuits', weight: 18.5, grade: 'Grade A', rate: 415, purity: 'Gold/Copper pins' },
    { id: 'batch-2', name: 'Insulated Copper Wire (99% pure)', hindiName: 'शुद्ध तांबे के तार', category: 'Metals', weight: 14.0, grade: 'Grade A', rate: 790, purity: 'Clean electrolytic' },
    { id: 'batch-3', name: 'Li-ion 18650 Battery Cells', hindiName: 'लिथियम बैटरी सेल', category: 'Batteries', weight: 8.0, grade: 'Grade B', rate: 285, purity: 'Cobalt/Nickel cathode' },
    { id: 'batch-4', name: 'Telecom Switching Relays', hindiName: 'टेलीकॉम रिले व कार्ड', category: 'Telecom', weight: 6.5, grade: 'Grade A', rate: 560, purity: 'Silver/Palladium alloy' },
  ]);

  // Form for adding batch
  const [newBatchName, setNewBatchName] = useState('Optical Drive Circuit Scrap');
  const [newBatchCategory, setNewBatchCategory] = useState('Circuits');
  const [newBatchWeight, setNewBatchWeight] = useState<number>(5.0);
  const [newBatchRate, setNewBatchRate] = useState<number>(320);

  // Recyclers Data
  const recyclersList = [
    {
      id: 'rec-1',
      name: 'EcoRecycle India Pvt. Ltd.',
      hindiName: 'इकोरrecycle इंडिया',
      area: 'Hingna MIDC, Sector 4, Nagpur',
      dist: '1.8 km',
      spcbId: 'CPCB/EWR/MH-8821',
      status: 'Open • Handover Dock 2',
      payoutSpeed: 'Instant UPI (< 60s)',
      accepted: ['Motherboards', 'Li-ion Cells', 'Cables'],
      rating: '4.9 ★ (1,240 drops)'
    },
    {
      id: 'rec-2',
      name: 'Vidarbha CleanMetals Refiners',
      hindiName: 'विदर्भ क्लीनमेटल्स रिफाइनर्स',
      area: 'Wadi Industrial Area, Nagpur',
      dist: '3.4 km',
      spcbId: 'CPCB/EWR/MH-4491',
      status: 'Open • High Rate Today',
      payoutSpeed: 'Same-day Bank NEFT',
      accepted: ['Heavy Copper', 'Telecom Relay', 'Transformers'],
      rating: '4.8 ★ (890 drops)'
    },
    {
      id: 'rec-3',
      name: 'Maharastra Circular Waste Hub',
      hindiName: 'महाराष्ट्र सर्कुलर वेस्ट हब',
      area: 'Butibori Industrial Estate, Nagpur',
      dist: '6.1 km',
      spcbId: 'CPCB/EWR/MH-1092',
      status: 'Closes at 7:00 PM',
      payoutSpeed: 'Direct SPCB Escrow',
      accepted: ['Monitors', 'Mixed E-Waste', 'Batteries'],
      rating: '4.7 ★ (610 drops)'
    }
  ];

  // Material rates calculation
  const getMaterialDetails = () => {
    switch (calcMaterial) {
      case 'pcb':
        return { 
          label: language === 'hi' ? 'उच्च श्रेणी कंप्यूटर मदरबोर्ड (Grade A)' : 'High-Grade Server PCB Motherboard (Grade A)',
          middlemanRate: 275, 
          cpcbRate: 415, 
          elements: 'Gold: 0.038g/kg • Copper: 240g/kg • Tin: 45g/kg • Nickel: 18g/kg',
          recoveryYield: '84% recoverable precious minerals'
        };
      case 'copper':
        return { 
          label: language === 'hi' ? 'विद्युत तांबे के तार 99% शुद्धता' : 'Electrolytic Copper Wire 99% Purity',
          middlemanRate: 590, 
          cpcbRate: 790, 
          elements: 'Electrolytic Refined Copper: 980g/kg • Lead trace: <0.01%',
          recoveryYield: '99.2% zero-loss direct smelter yield'
        };
      case 'lithium':
        return { 
          label: language === 'hi' ? 'लिथियम आयन 18650 बैटरी पैक' : 'Lithium-ion 18650 Cylindrical Battery Packs',
          middlemanRate: 160, 
          cpcbRate: 285, 
          elements: 'Cobalt: 140g/kg • Nickel: 110g/kg • Lithium: 32g/kg • Graphite: 180g/kg',
          recoveryYield: 'Critical battery precursor recovery'
        };
      case 'telecom':
        return { 
          label: language === 'hi' ? 'दूरसंचार रिले एवं स्विच बोर्ड' : 'Telecom Switchboard & Silver Contact Relays',
          middlemanRate: 380, 
          cpcbRate: 560, 
          elements: 'Silver: 2.4g/kg • Palladium trace: 0.12g/kg • Copper: 310g/kg',
          recoveryYield: 'High-purity noble metal recovery'
        };
    }
  };

  const currentMat = getMaterialDetails();
  const middlemanTotal = currentMat.middlemanRate * calcWeight;
  const cpcbTotal = currentMat.cpcbRate * calcWeight;
  const extraEarnings = cpcbTotal - middlemanTotal;
  const profitMargin = Math.round((extraEarnings / middlemanTotal) * 100);

  const totalInventoryWeight = inventoryItems.reduce((acc, curr) => acc + curr.weight, 0);
  const totalInventoryValue = inventoryItems.reduce((acc, curr) => acc + (curr.weight * curr.rate), 0);

  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `batch-${Date.now()}`;
    setInventoryItems([
      ...inventoryItems,
      {
        id: newId,
        name: newBatchName,
        hindiName: newBatchName,
        category: newBatchCategory,
        weight: Number(newBatchWeight),
        grade: 'Grade A',
        rate: Number(newBatchRate),
        purity: 'Verified sample batch'
      }
    ]);
    setShowAddBatchModal(false);
  };

  return (
    <section id="walkthrough" className="py-12 lg:py-16 bg-[#FBFBFA] border-b border-[#E1F1EE] relative font-serif">
      {/* Subtle organic texture pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]" 
        style={{
          backgroundImage: `radial-gradient(#0D9488 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Section Header with Roman Typography */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-widest font-mono text-[#0D9488] font-bold bg-[#E1F1EE] px-3.5 py-1 rounded-full border border-[#B1D8D0]">
              SIH 2026 Interactive Prototype Model
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064E3B] tracking-tight font-serif">
            AETHER Mobile Application Prototype
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed font-serif">
            A high-fidelity, light-themed, tactile simulator demonstrating the grassroots collector workflow: vernacular voice prompts, camera AI classification, fair-price benchmarks, and digital EPR receipts.
          </p>

          {/* Interactive Simulation Controls Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs">
            
            {/* Language Switcher */}
            <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-white border border-[#E1F1EE] shadow-xs">
              <span className="px-2 text-slate-500 font-sans font-semibold flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#0D9488]" />
                Language:
              </span>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  language === 'en' ? 'bg-[#0D9488] text-white font-bold shadow-xs' : 'text-slate-600 hover:text-[#064E3B]'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  language === 'hi' ? 'bg-[#0D9488] text-white font-bold shadow-xs' : 'text-slate-600 hover:text-[#064E3B]'
                }`}
              >
                हिंदी (Hindi)
              </button>
              <button
                onClick={() => setLanguage('mr')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  language === 'mr' ? 'bg-[#0D9488] text-white font-bold shadow-xs' : 'text-slate-600 hover:text-[#064E3B]'
                }`}
              >
                मराठी (Nagpur)
              </button>
            </div>

            {/* Offline Simulator Switch */}
            <button
              onClick={() => setIsOffline(!isOffline)}
              id="toggle-offline-mode-btn"
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl border transition-all font-medium cursor-pointer shadow-xs ${
                isOffline 
                  ? 'bg-[#FEF3C7] border-[#FDE68A] text-[#92400E] font-bold' 
                  : 'bg-white border-[#E1F1EE] text-slate-700 hover:border-[#B1D8D0]'
              }`}
            >
              {isOffline ? <WifiOff className="w-3.5 h-3.5 text-[#D97706]" /> : <Wifi className="w-3.5 h-3.5 text-[#0D9488]" />}
              <span>{isOffline ? 'Simulating Offline Mode (Zero Data)' : 'Connected: 5G SPCB Cloud'}</span>
            </button>

            {/* Zoom / Normal View Mode */}
            <button
              onClick={() => setZoomMode(!zoomMode)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white border border-[#E1F1EE] text-slate-700 hover:border-[#B1D8D0] transition-all shadow-xs cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
              <span>{zoomMode ? 'Standard Scale' : 'Inspect Scale'}</span>
            </button>
          </div>
        </div>

        {/* Prototype Screen Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {[
            { id: 'dashboard', label: '1. Collector Dashboard', hindi: 'डैशबोर्ड' },
            { id: 'collection', label: '2. My Collection & Batches', hindi: 'मेरा संग्रह' },
            { id: 'pricing', label: '3. Fair-Price Valuation Engine', hindi: 'उचित मूल्य' },
            { id: 'recyclers', label: '4. Verified Recycler Radar', hindi: 'पुनर्चक्रण केंद्र' },
          ].map((tab) => {
            const isCurrent = activeScreen === tab.id;
            return (
              <button
                key={tab.id}
                id={`prototype-screen-tab-${tab.id}`}
                onClick={() => setActiveScreen(tab.id as any)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm transition-all flex items-center gap-2 border cursor-pointer font-serif ${
                  isCurrent
                    ? 'bg-[#0D9488] text-white border-[#0D9488] font-bold shadow-md shadow-teal-700/20 scale-[1.02]'
                    : 'bg-white text-slate-700 border-[#E1F1EE] hover:border-[#B1D8D0] hover:bg-[#F0F4F3]/50 shadow-xs'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-sans ${isCurrent ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {tab.hindi}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Centerpiece Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Screen Context & Real-time Interactive Test Panel */}
          <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
            
            {/* Current Active Screen Explainer Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#E1F1EE] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E1F1EE]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#E1F1EE] text-[#0D9488] flex items-center justify-center font-bold text-xs font-mono border border-[#B1D8D0]">
                    {activeScreen === 'dashboard' && '01'}
                    {activeScreen === 'collection' && '02'}
                    {activeScreen === 'pricing' && '03'}
                    {activeScreen === 'recyclers' && '04'}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#064E3B] font-serif">
                      {activeScreen === 'dashboard' && 'Collector Home & Daily Inflow'}
                      {activeScreen === 'collection' && 'Segregated Inventory & Weighing'}
                      {activeScreen === 'pricing' && 'CPCB & LME Commodity Benchmarks'}
                      {activeScreen === 'recyclers' && 'Verified CPCB Facility Directory'}
                    </h3>
                    <p className="text-xs text-slate-500 font-sans">
                      {activeScreen === 'dashboard' && 'Designed for low-friction daily field operations'}
                      {activeScreen === 'collection' && 'Zero-tamper grade tracking with smart scale sync'}
                      {activeScreen === 'pricing' && 'Directly prevents intermediary price undercutting'}
                      {activeScreen === 'recyclers' && 'Authentic GPS link to registered recycling yards'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Design Principles & Usability Affordances */}
              <div className="space-y-2 text-xs text-slate-600 font-serif leading-relaxed">
                {activeScreen === 'dashboard' && (
                  <>
                    <p>• <strong>Low-Literacy First:</strong> Color-coded visual cues, vernacular language options, and oversized touch targets ensure effortless navigation in rugged scrap yard environments.</p>
                    <p>• <strong>Offline Caching:</strong> All actions are recorded locally in a sandboxed SQLite/IndexedDB store, syncing seamlessly when network connectivity resumes.</p>
                    <p>• <strong>Voice Guidance Ready:</strong> Single-tap audio prompt reads instructions and prompts speech recognition in Hindi and regional dialects.</p>
                  </>
                )}
                {activeScreen === 'collection' && (
                  <>
                    <p>• <strong>Purity Grade Categorization:</strong> Distinguishes high-density gold/copper circuit boards (Grade A) from common lower-yield consumer appliances.</p>
                    <p>• <strong>Smart-Scale Bluetooth Bridge:</strong> Directly reads weights from wireless platform scales, eliminating fraudulent manual entries.</p>
                    <p>• <strong>Dynamic Batch Tally:</strong> Real-time valuation recalculation based on authenticated recovery coefficients.</p>
                  </>
                )}
                {activeScreen === 'pricing' && (
                  <>
                    <p>• <strong>Commodity Transparency:</strong> Linked directly to London Metal Exchange (LME) and Ministry of Mines commodity reference prices.</p>
                    <p>• <strong>Fair Profit Differential:</strong> Explicitly reveals the 30% to 50% value gap previously lost to unorganized tier-aggregators.</p>
                    <p>• <strong>Rate Lock Guarantee:</strong> Collectors can lock today's validated quotation for 24 hours prior to transit.</p>
                  </>
                )}
                {activeScreen === 'recyclers' && (
                  <>
                    <p>• <strong>100% CPCB/SPCB Registered:</strong> Exclusively displays legally certified processing units with verifiable EPR quota mandates.</p>
                    <p>• <strong>2-Way QR Code Handshake:</strong> Mutual cryptographic verification prevents phantom batch logging.</p>
                    <p>• <strong>Instant UPI Liquidity:</strong> Direct payment confirmation deposited to the collector's bank account upon dock acceptance.</p>
                  </>
                )}
              </div>

              {/* Interactive Quick Simulation Actions */}
              <div className="pt-3 border-t border-[#E1F1EE] space-y-2">
                <span className="text-[11px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                  Interactive Field Tests:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => {
                      setActiveScreen('dashboard');
                      setShowCameraScanner(true);
                    }}
                    className="p-2.5 rounded-xl bg-[#F0F4F3] hover:bg-[#E1F1EE] text-[#064E3B] font-semibold flex items-center gap-2 border border-[#B1D8D0]/70 transition-all text-left cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-[#0D9488] shrink-0" />
                    <span>Test AI Camera Scan</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveScreen('dashboard');
                      setShowVoicePrompt(true);
                    }}
                    className="p-2.5 rounded-xl bg-[#F0F4F3] hover:bg-[#E1F1EE] text-[#064E3B] font-semibold flex items-center gap-2 border border-[#B1D8D0]/70 transition-all text-left cursor-pointer"
                  >
                    <Mic className="w-4 h-4 text-[#0D9488] shrink-0" />
                    <span>Test Voice Prompt</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveScreen('collection');
                      setShowAddBatchModal(true);
                    }}
                    className="p-2.5 rounded-xl bg-[#F0F4F3] hover:bg-[#E1F1EE] text-[#064E3B] font-semibold flex items-center gap-2 border border-[#B1D8D0]/70 transition-all text-left cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#0D9488] shrink-0" />
                    <span>Add New Scrap Batch</span>
                  </button>

                  <button
                    onClick={() => setShowReceiptModal(true)}
                    className="p-2.5 rounded-xl bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] font-semibold flex items-center gap-2 border border-[#FDE68A] transition-all text-left cursor-pointer"
                  >
                    <FileCheck className="w-4 h-4 text-[#D97706] shrink-0" />
                    <span>EPR Digital Receipt</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Specimen Banner */}
            <div className="p-5 rounded-3xl bg-white border border-[#B1D8D0] shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#E1F1EE] text-[#0D9488] flex items-center justify-center shrink-0 border border-[#B1D8D0]">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#064E3B] font-serif">
                    Verifiable EPR Handover Certificate
                  </h4>
                  <p className="text-[11px] text-slate-500 font-serif">
                    SHA-256 encrypted digital audit trail for CPCB portal.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowReceiptModal(true)}
                className="px-3.5 py-2 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-serif font-bold transition-all shrink-0 shadow-xs cursor-pointer"
              >
                Inspect Specimen
              </button>
            </div>

            {/* Micro-Credit & Inclusivity Notice */}
            <div className="p-4 rounded-2xl bg-[#F0F4F3]/60 border border-[#E1F1EE] text-xs text-slate-600 font-serif flex items-start gap-3">
              <Award className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
              <p>
                <strong>Formal Financial Inclusion:</strong> By logging authentic digital transactions, informal kabadiwalas build a verifiable credit score, unlocking micro-loans and government welfare schemes under PM SVANidhi and MoM circular initiatives.
              </p>
            </div>

          </div>

          {/* Right Column: High-Fidelity Light-Themed Smartphone Prototype */}
          <div className="lg:col-span-7 flex justify-center order-1 lg:order-2">
            
            {/* Phone Container (Refined Light Silver / Titanium Frame) */}
            <div className={`relative transition-all duration-300 ${
              zoomMode 
                ? 'w-[360px] sm:w-[390px] h-[780px]' 
                : 'w-[330px] sm:w-[360px] h-[720px]'
            } bg-white rounded-[46px] p-3.5 shadow-2xl shadow-slate-400/20 border-[8px] border-[#CBD5E1] ring-1 ring-slate-300/80 flex flex-col justify-between overflow-hidden`}>
              
              {/* Dynamic Island / Speaker Pill */}
              <div 
                onClick={() => setShowVoicePrompt(true)}
                title="Tap for dynamic island status"
                className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-full z-40 flex items-center justify-between px-3 cursor-pointer shadow-xs hover:w-36 transition-all"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800" />
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] animate-pulse" />
                  <span className="text-[8px] font-mono text-white/80">AETHER</span>
                </div>
              </div>

              {/* Status Bar (Light Mode: Charcoal on Crisp White) */}
              <div className="pt-1.5 px-6 flex items-center justify-between text-[11px] font-mono text-slate-700 z-20 select-none border-b border-slate-100 pb-1.5">
                <span className="font-bold text-slate-800">09:41</span>
                <div className="flex items-center gap-2">
                  {isOffline ? (
                    <span className="text-[9px] px-1.5 py-0.2 bg-[#FEF3C7] text-[#92400E] rounded-md font-bold flex items-center gap-0.5">
                      <WifiOff className="w-2.5 h-2.5" /> Offline
                    </span>
                  ) : (
                    <span className="text-[9px] px-1.5 py-0.2 bg-[#E1F1EE] text-[#0D9488] rounded-md font-bold flex items-center gap-0.5">
                      <Wifi className="w-2.5 h-2.5" /> 5G
                    </span>
                  )}
                  <div className="flex items-center gap-0.5 font-bold text-slate-800">
                    <Battery className="w-3.5 h-3.5" />
                    <span>100%</span>
                  </div>
                </div>
              </div>

              {/* Phone Display Screen (Scrollable Body - 100% Light Theme) */}
              <div className="flex-1 overflow-y-auto px-3.5 pt-2 pb-2 text-slate-800 font-serif custom-scrollbar bg-[#FBFBFA]">
                
                {/* Simulated Network Alert if offline */}
                {isOffline && (
                  <div className="mb-3 p-2 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-[10px] flex items-center justify-between font-sans">
                    <div className="flex items-center gap-1.5">
                      <WifiOff className="w-3 h-3 text-[#D97706]" />
                      <span><strong>Scrap-Yard Mode:</strong> 3 Batches in Local SQLite Queue</span>
                    </div>
                    <span className="underline font-semibold cursor-pointer" onClick={() => setIsOffline(false)}>Sync Now</span>
                  </div>
                )}

                {/* 1. SCREEN: COLLECTOR DASHBOARD */}
                {activeScreen === 'dashboard' && (
                  <div className="space-y-3.5 animate-fadeIn">
                    
                    {/* Collector Profile Greeting Header */}
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-[10px] font-mono text-[#0D9488] font-bold uppercase tracking-wider">
                          {language === 'hi' ? 'नमस्ते • अधिकृत संकलनकर्ता' : language === 'mr' ? 'नमस्कार • अधिकृत संकलनकर्ता' : 'WELCOME • VERIFIED COLLECTOR'}
                        </span>
                        <h4 className="text-base font-bold text-[#064E3B] font-serif flex items-center gap-1.5">
                          <span>{language === 'hi' ? 'रमेश कुमार' : language === 'mr' ? 'रमेश कुमार' : 'Ramesh Kumar'}</span>
                          <CheckCircle className="w-3.5 h-3.5 text-[#0D9488]" />
                        </h4>
                        <p className="text-[11px] text-slate-500 font-sans flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#0D9488]" />
                          Nagpur MIDC Hub • ID: #KB-4021
                        </p>
                      </div>

                      <div className="w-10 h-10 rounded-2xl bg-[#E1F1EE] text-[#064E3B] flex items-center justify-center font-bold text-xs border border-[#B1D8D0] shadow-xs">
                        RK
                      </div>
                    </div>

                    {/* Today's Earning & Collection Card */}
                    <div className="p-4 rounded-3xl bg-gradient-to-br from-[#064E3B] via-[#043e2f] to-[#0b5f49] text-white shadow-md relative overflow-hidden">
                      <div className="absolute right-0 top-0 w-28 h-28 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                      
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-200">
                            {language === 'hi' ? 'आज का कुल संकलन' : language === 'mr' ? 'आजचे एकूण संकलन' : "TODAY'S NET COLLECTION"}
                          </span>
                          <div className="text-2xl font-bold font-serif mt-0.5">
                            42.5 <span className="text-sm font-sans font-normal text-emerald-200">kg</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-200">
                            {language === 'hi' ? 'अनुमानित मूल्य' : 'ESTIMATED VALUE'}
                          </span>
                          <div className="text-xl font-bold font-serif mt-0.5 text-amber-300">
                            ₹14,850
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[11px] font-sans">
                        <div className="flex items-center gap-1.5 text-emerald-200">
                          <TrendingUp className="w-3.5 h-3.5 text-amber-300" />
                          <span>+₹3,240 extra vs middleman</span>
                        </div>
                        <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                          SPCB Linked
                        </span>
                      </div>
                    </div>

                    {/* Vernacular Voice Guidance Prompt Bar */}
                    <div 
                      onClick={() => setShowVoicePrompt(true)}
                      className="p-3 rounded-2xl bg-white border border-[#E1F1EE] shadow-xs flex items-center justify-between gap-3 cursor-pointer hover:border-[#B1D8D0] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#E1F1EE] text-[#0D9488] flex items-center justify-center shrink-0">
                          <Mic className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#064E3B] font-serif">
                            {language === 'hi' ? 'बोलिए: क्या बेचना है?' : language === 'mr' ? 'बोला: काय विकायचे आहे?' : 'Voice Input: Tap to speak scrap items'}
                          </div>
                          <div className="text-[10px] text-slate-500 font-sans">
                            {language === 'hi' ? 'मदरबोर्ड, तांबा, लिथियम बैटरी' : 'Recognizes Hindi, Marathi & English'}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#0D9488] font-bold bg-[#E1F1EE] px-2 py-1 rounded-lg">
                        SPEAK
                      </span>
                    </div>

                    {/* Quick Camera & Action Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setShowCameraScanner(true)}
                        className="p-3 rounded-2xl bg-white border border-[#E1F1EE] hover:border-[#B1D8D0] text-left transition-all shadow-xs group cursor-pointer"
                      >
                        <div className="w-7 h-7 rounded-xl bg-[#E1F1EE] text-[#0D9488] flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                          <Camera className="w-4 h-4" />
                        </div>
                        <div className="text-xs font-bold text-[#064E3B] font-serif">
                          {language === 'hi' ? 'कैमरा स्कैनर' : 'AI Camera Scan'}
                        </div>
                        <div className="text-[10px] text-slate-500 font-sans">
                          Auto-classify scrap purity
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveScreen('pricing')}
                        className="p-3 rounded-2xl bg-white border border-[#E1F1EE] hover:border-[#B1D8D0] text-left transition-all shadow-xs group cursor-pointer"
                      >
                        <div className="w-7 h-7 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                          <IndianRupee className="w-4 h-4" />
                        </div>
                        <div className="text-xs font-bold text-[#064E3B] font-serif">
                          {language === 'hi' ? 'उचित मूल्य दर' : 'Price Index'}
                        </div>
                        <div className="text-[10px] text-slate-500 font-sans">
                          Live LME benchmarks
                        </div>
                      </button>
                    </div>

                    {/* Live E-Waste Commodity Metal Ticker */}
                    <div className="p-3 rounded-2xl bg-white border border-[#E1F1EE] shadow-xs">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                          {language === 'hi' ? 'आज के धातु मूल्य (₹/किग्रा)' : 'LIVE COMMODITY INDEX (₹/KG)'}
                        </span>
                        <span className="text-[9px] text-[#0D9488] font-bold font-sans">Ministry of Mines</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                        <div className="p-2 rounded-xl bg-[#F8FAF9] border border-slate-100">
                          <div className="text-[10px] text-slate-500">Pure Copper 99%</div>
                          <div className="text-sm font-bold text-[#064E3B] flex items-center justify-between mt-0.5">
                            <span>₹790</span>
                            <span className="text-[9px] text-emerald-600 font-semibold">+2.6%</span>
                          </div>
                        </div>
                        <div className="p-2 rounded-xl bg-[#F8FAF9] border border-slate-100">
                          <div className="text-[10px] text-slate-500">Server PCB Grade A</div>
                          <div className="text-sm font-bold text-[#064E3B] flex items-center justify-between mt-0.5">
                            <span>₹415</span>
                            <span className="text-[9px] text-emerald-600 font-semibold">+4.2%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Handover Log */}
                    <div className="space-y-2 pt-1">
                      <div className="flex justify-between items-center text-xs font-serif font-bold text-[#064E3B]">
                        <span>{language === 'hi' ? 'हालिया हस्तांतरण' : 'Recent Handover Receipts'}</span>
                        <span 
                          onClick={() => setShowReceiptModal(true)}
                          className="text-[10px] text-[#0D9488] hover:underline cursor-pointer font-sans"
                        >
                          View All
                        </span>
                      </div>

                      <div 
                        onClick={() => setShowReceiptModal(true)}
                        className="p-2.5 rounded-2xl bg-white border border-[#E1F1EE] flex items-center justify-between text-xs cursor-pointer hover:bg-slate-50"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-[#E1F1EE] text-[#0D9488] flex items-center justify-center">
                            <FileCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-[#064E3B] font-serif">EcoRecycle India</div>
                            <div className="text-[10px] text-slate-500 font-sans">Today 08:30 AM • 42.5 kg</div>
                          </div>
                        </div>
                        <div className="text-right font-sans">
                          <div className="font-bold text-[#064E3B]">₹8,450.00</div>
                          <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">UPI Settled</span>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* 2. SCREEN: MY COLLECTION (INVENTORY & BATCHES) */}
                {activeScreen === 'collection' && (
                  <div className="space-y-3.5 animate-fadeIn">
                    
                    {/* Header with Add Button */}
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <h4 className="text-base font-bold text-[#064E3B] font-serif">
                          {language === 'hi' ? 'मेरा ई-कचरा संग्रह' : language === 'mr' ? 'माझा ई-कचरा साठा' : 'Segregated Scrap Inventory'}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-sans">
                          Total: {totalInventoryWeight.toFixed(1)} kg • Worth ₹{totalInventoryValue.toLocaleString('en-IN')}
                        </p>
                      </div>

                      <button
                        onClick={() => setShowAddBatchModal(true)}
                        className="px-2.5 py-1.5 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-serif font-bold flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Batch</span>
                      </button>
                    </div>

                    {/* Smart Scale Wireless Status Bar */}
                    <div className="p-2.5 rounded-2xl bg-[#E1F1EE] border border-[#B1D8D0] flex items-center justify-between text-xs font-sans">
                      <div className="flex items-center gap-2 text-[#064E3B]">
                        <Scale className="w-4 h-4 text-[#0D9488]" />
                        <span><strong>SmartScale #04:</strong> Ready (Tare: 0.00 kg)</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#0D9488] font-bold bg-white px-2 py-0.5 rounded-md border border-[#B1D8D0]">
                        BLUETOOTH SYNC
                      </span>
                    </div>

                    {/* Inventory Items List */}
                    <div className="space-y-2.5">
                      {inventoryItems.map((item) => (
                        <div 
                          key={item.id}
                          className="p-3 rounded-2xl bg-white border border-[#E1F1EE] shadow-xs space-y-1.5"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-xs font-bold text-[#064E3B] font-serif">
                                {language === 'hi' ? item.hindiName : item.name}
                              </div>
                              <div className="text-[10px] text-slate-500 font-sans">
                                {item.category} • {item.purity}
                              </div>
                            </div>
                            <span className="text-[10px] font-mono font-bold bg-[#E1F1EE] text-[#0D9488] px-2 py-0.5 rounded-md border border-[#B1D8D0]">
                              {item.grade}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs font-sans pt-1 border-t border-slate-100">
                            <div className="text-slate-600">
                              Weight: <strong>{item.weight.toFixed(1)} kg</strong> @ ₹{item.rate}/kg
                            </div>
                            <div className="font-bold text-[#064E3B] font-serif">
                              ₹{(item.weight * item.rate).toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Handover Ready Summary Box */}
                    <div className="p-3.5 rounded-2xl bg-[#F0FDF4] border border-[#B1D8D0] text-xs font-serif space-y-2">
                      <div className="flex justify-between items-center text-[#064E3B] font-bold">
                        <span>Ready for Handover Batch</span>
                        <span className="font-mono text-[#0D9488]">Batch #KB-9041</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                        All 4 items segregated per Ministry of Mines E-Waste Guidelines.
                      </p>
                      <button
                        onClick={() => {
                          setActiveScreen('recyclers');
                        }}
                        className="w-full py-2 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white font-bold text-xs shadow-xs transition-all cursor-pointer font-serif"
                      >
                        Dispatch to Verified Recycler →
                      </button>
                    </div>

                  </div>
                )}

                {/* 3. SCREEN: FAIR-PRICE VALUATION ENGINE */}
                {activeScreen === 'pricing' && (
                  <div className="space-y-3.5 animate-fadeIn">
                    
                    {/* Screen Header */}
                    <div className="pt-1">
                      <span className="text-[10px] font-mono text-[#0D9488] font-bold uppercase tracking-wider">
                        CPCB / LME BENCHMARK CALCULATOR
                      </span>
                      <h4 className="text-base font-bold text-[#064E3B] font-serif">
                        {language === 'hi' ? 'उचित मूल्य सूचकांक व कैलकुलेटर' : 'Fair-Price Valuation Engine'}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-sans">
                        Compare regulated formal rate against informal middleman offers.
                      </p>
                    </div>

                    {/* Material Selector Chips */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">
                        Select E-Waste Material Category:
                      </label>
                      <div className="grid grid-cols-2 gap-1.5 text-xs font-sans">
                        {[
                          { id: 'pcb', label: 'PCB Motherboards' },
                          { id: 'copper', label: '99% Copper Wire' },
                          { id: 'lithium', label: 'Li-Ion Batteries' },
                          { id: 'telecom', label: 'Telecom Relays' },
                        ].map((m) => (
                          <button
                            key={m.id}
                            onClick={() => setCalcMaterial(m.id as any)}
                            className={`p-2 rounded-xl border text-left transition-all ${
                              calcMaterial === m.id
                                ? 'bg-[#E1F1EE] border-[#0D9488] text-[#064E3B] font-bold shadow-xs'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Weight Slider Calculator */}
                    <div className="p-3.5 rounded-2xl bg-white border border-[#E1F1EE] shadow-xs space-y-3">
                      <div className="flex justify-between items-center text-xs font-serif">
                        <span className="text-slate-600">Batch Weight:</span>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="1"
                            max="500"
                            value={calcWeight}
                            onChange={(e) => setCalcWeight(Math.max(1, Number(e.target.value)))}
                            className="w-16 px-2 py-1 text-right rounded-lg border border-slate-300 font-mono font-bold text-xs text-[#064E3B]"
                          />
                          <span className="font-bold text-slate-700">kg</span>
                        </div>
                      </div>

                      {/* Range Slider */}
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={calcWeight}
                        onChange={(e) => setCalcWeight(Number(e.target.value))}
                        className="w-full accent-[#0D9488] cursor-pointer"
                      />

                      {/* Material Yield Description */}
                      <div className="p-2 rounded-xl bg-[#F8FAF9] border border-slate-100 text-[10px] text-slate-600 font-sans space-y-0.5">
                        <div className="font-bold text-[#064E3B]">{currentMat.label}</div>
                        <div>{currentMat.elements}</div>
                      </div>
                    </div>

                    {/* Comparative Price Analysis Card */}
                    <div className="p-4 rounded-3xl bg-white border-2 border-[#0D9488]/40 shadow-sm space-y-3">
                      <div className="text-[10px] uppercase font-mono text-slate-500 font-bold tracking-wider text-center">
                        EARNINGS COMPARISON BREAKDOWN
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-100">
                        {/* Middleman Offer */}
                        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-center font-sans">
                          <span className="text-[9px] uppercase font-mono text-slate-500">Unregulated Middleman</span>
                          <div className="text-xs text-slate-500 mt-0.5">@ ₹{currentMat.middlemanRate}/kg</div>
                          <div className="text-base font-bold text-slate-700 font-serif mt-1">
                            ₹{middlemanTotal.toLocaleString('en-IN')}
                          </div>
                        </div>

                        {/* AETHER Benchmark */}
                        <div className="p-2.5 rounded-2xl bg-[#E1F1EE] border border-[#B1D8D0] text-center font-sans">
                          <span className="text-[9px] uppercase font-mono text-[#0D9488] font-bold">AETHER CPCB Rate</span>
                          <div className="text-xs text-[#0D9488] mt-0.5">@ ₹{currentMat.cpcbRate}/kg</div>
                          <div className="text-base font-bold text-[#064E3B] font-serif mt-1">
                            ₹{cpcbTotal.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>

                      {/* Extra Profit Highlight */}
                      <div className="p-2.5 rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] text-center text-xs font-serif">
                        <span className="text-[10px] uppercase font-mono text-[#92400E] font-bold">Collector Direct Uplift:</span>
                        <div className="text-lg font-bold text-[#92400E] font-serif mt-0.5">
                          +₹{extraEarnings.toLocaleString('en-IN')} ({profitMargin}% Higher)
                        </div>
                      </div>

                      {/* Lock Rate Action */}
                      <button
                        onClick={() => setPriceLocked(!priceLocked)}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer font-serif ${
                          priceLocked 
                            ? 'bg-emerald-600 text-white shadow-xs' 
                            : 'bg-[#0D9488] hover:bg-[#0f766e] text-white shadow-xs'
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>{priceLocked ? 'Rate Locked for 24h ✓' : 'Lock Guaranteed Rate for 24h'}</span>
                      </button>
                    </div>

                  </div>
                )}

                {/* 4. SCREEN: VERIFIED RECYCLER RADAR */}
                {activeScreen === 'recyclers' && (
                  <div className="space-y-3.5 animate-fadeIn">
                    
                    {/* Header */}
                    <div className="pt-1">
                      <span className="text-[10px] font-mono text-[#0D9488] font-bold uppercase tracking-wider">
                        100% CPCB / SPCB AUTHORIZED
                      </span>
                      <h4 className="text-base font-bold text-[#064E3B] font-serif">
                        {language === 'hi' ? 'सत्यापित पुनर्चक्रण केंद्र' : 'Verified Recycler Radar'}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-sans">
                        Nagpur Industrial Cluster • Direct drop-off with EPR credits.
                      </p>
                    </div>

                    {/* View Toggle (List vs Radar Map) */}
                    <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-sans">
                      <button
                        onClick={() => setRecyclerViewMode('list')}
                        className={`flex-1 py-1.5 rounded-lg text-center font-semibold transition-all ${
                          recyclerViewMode === 'list' ? 'bg-white text-[#064E3B] shadow-xs' : 'text-slate-600'
                        }`}
                      >
                        List Directory
                      </button>
                      <button
                        onClick={() => setRecyclerViewMode('radar')}
                        className={`flex-1 py-1.5 rounded-lg text-center font-semibold transition-all ${
                          recyclerViewMode === 'radar' ? 'bg-white text-[#064E3B] shadow-xs' : 'text-slate-600'
                        }`}
                      >
                        Live Radar Map
                      </button>
                    </div>

                    {/* Radar / Map Visualization View */}
                    {recyclerViewMode === 'radar' ? (
                      <div className="p-4 rounded-3xl bg-[#F0FDF4] border border-[#B1D8D0] relative min-h-[220px] flex flex-col items-center justify-center overflow-hidden">
                        {/* Radar concentric rings */}
                        <div className="absolute w-44 h-44 rounded-full border border-[#0D9488]/20 animate-ping" />
                        <div className="absolute w-36 h-36 rounded-full border border-[#0D9488]/30" />
                        <div className="absolute w-24 h-24 rounded-full border border-[#0D9488]/40" />
                        
                        {/* Center collector location */}
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-[#064E3B] text-white flex items-center justify-center shadow-md">
                            <MapPin className="w-4 h-4 text-emerald-300" />
                          </div>
                          <span className="text-[9px] font-mono font-bold text-[#064E3B] mt-1 bg-white px-1.5 py-0.5 rounded shadow-xs">
                            You (MIDC Yard)
                          </span>
                        </div>

                        {/* Recycler blips */}
                        <div className="absolute top-6 left-8 z-10">
                          <div className="px-2 py-1 bg-white border border-[#B1D8D0] rounded-lg shadow-xs text-[9px] text-[#064E3B] font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            EcoRecycle (1.8km)
                          </div>
                        </div>

                        <div className="absolute bottom-6 right-8 z-10">
                          <div className="px-2 py-1 bg-white border border-[#B1D8D0] rounded-lg shadow-xs text-[9px] text-[#064E3B] font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                            CleanMetals (3.4km)
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* List View */
                      <div className="space-y-2.5">
                        {recyclersList.map((rec) => (
                          <div
                            key={rec.id}
                            className="p-3 rounded-2xl bg-white border border-[#E1F1EE] shadow-xs hover:border-[#B1D8D0] transition-colors space-y-2"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="text-xs font-bold text-[#064E3B] font-serif">
                                  {language === 'hi' ? rec.hindiName : rec.name}
                                </h5>
                                <div className="text-[10px] text-slate-500 font-sans flex items-center gap-1 mt-0.5">
                                  <MapPin className="w-2.5 h-2.5 text-[#0D9488]" />
                                  <span>{rec.area} • <strong>{rec.dist}</strong></span>
                                </div>
                              </div>
                              <span className="text-[9px] font-mono font-bold bg-[#E1F1EE] text-[#0D9488] px-2 py-0.5 rounded-md">
                                {rec.spcbId}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-[10px] font-sans pt-1 border-t border-slate-100">
                              <span className="text-emerald-700 font-semibold">{rec.payoutSpeed}</span>
                              <span className="text-slate-500">{rec.status}</span>
                            </div>

                            <div className="flex items-center gap-1.5 pt-1">
                              <button
                                onClick={() => setShowReceiptModal(true)}
                                className="flex-1 py-1.5 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-[10px] font-bold transition-all shadow-xs cursor-pointer font-serif"
                              >
                                Book Handover QR →
                              </button>
                              <a
                                href="tel:+917122000000"
                                className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-sans font-semibold flex items-center gap-1"
                              >
                                <Phone className="w-3 h-3" /> Call
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* QR Code Handshake Simulation Trigger */}
                    <div className="p-3.5 rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] text-xs font-serif text-center space-y-2">
                      <div className="font-bold text-[#92400E]">
                        2-Way QR Code Digital Verification Handshake
                      </div>
                      <p className="text-[11px] text-[#92400E]/80 font-sans">
                        Scan the facility gate terminal to execute immutable handover and receive instant UPI bank settlement.
                      </p>
                      <button
                        onClick={() => setShowReceiptModal(true)}
                        className="w-full py-2 rounded-xl bg-[#D97706] hover:bg-[#b45309] text-white font-bold text-xs shadow-xs transition-all cursor-pointer font-serif"
                      >
                        Generate Handover QR Slip
                      </button>
                    </div>

                  </div>
                )}

              </div>

              {/* In-Phone Bottom Navigation Bar (Functional & Interactive) */}
              <div className="pt-2 pb-1 px-3 border-t border-slate-200 bg-white z-20 flex items-center justify-around select-none">
                {[
                  { id: 'dashboard', label: 'Home', icon: Layers },
                  { id: 'collection', label: 'My Scrap', icon: Scale },
                  { id: 'pricing', label: 'Prices', icon: TrendingUp },
                  { id: 'recyclers', label: 'Recyclers', icon: Building2 },
                ].map((nav) => {
                  const Icon = nav.icon;
                  const isActive = activeScreen === nav.id;
                  return (
                    <button
                      key={nav.id}
                      onClick={() => setActiveScreen(nav.id as any)}
                      className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                        isActive 
                          ? 'text-[#0D9488] font-bold' 
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                      <span className="text-[9px] font-serif">{nav.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="w-28 h-1 bg-slate-300 rounded-full mx-auto my-1" />

            </div>
          </div>

        </div>

      </div>

      {/* MODAL 1: Simulated Camera AI Material Vision Scanner */}
      {showCameraScanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-[#B1D8D0] max-w-md w-full rounded-3xl p-6 shadow-2xl relative font-serif">
            <div className="flex justify-between items-center pb-3 border-b border-[#E1F1EE]">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#0D9488]" />
                <h3 className="text-base font-bold text-[#064E3B]">AI Vision E-Waste Scanner</h3>
              </div>
              <button 
                onClick={() => setShowCameraScanner(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Viewfinder */}
            <div className="mt-4 relative h-56 rounded-2xl bg-slate-900 flex items-center justify-center overflow-hidden border border-slate-700">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              
              {/* Bounding box */}
              <div className="relative z-10 w-44 h-36 border-2 border-[#0D9488] rounded-xl p-2 flex flex-col justify-between animate-pulse">
                <div className="text-[9px] font-mono text-white bg-[#0D9488] px-1.5 py-0.5 rounded w-fit">
                  PCB MOTHERBOARD • 98.4%
                </div>
                <div className="text-[9px] font-mono text-emerald-300 bg-black/60 px-1 rounded">
                  Yield: High Gold Pins & Copper
                </div>
              </div>

              {/* Scanning horizontal line */}
              <div className="absolute inset-x-0 h-0.5 bg-emerald-400 shadow-[0_0_10px_#10b981] animate-bounce" />
            </div>

            <div className="mt-4 p-3 rounded-2xl bg-[#F0FDF4] border border-[#B1D8D0] text-xs space-y-1 font-sans">
              <div className="flex justify-between font-bold text-[#064E3B]">
                <span>Detected Classification:</span>
                <span>Server PCB Grade A</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated Tare Weight:</span>
                <span>2.4 kg (Auto-calculated)</span>
              </div>
              <div className="flex justify-between text-[#0D9488] font-bold">
                <span>Indicative Value:</span>
                <span>₹996.00 (@ ₹415/kg)</span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setShowCameraScanner(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold font-serif"
              >
                Retake Scan
              </button>
              <button
                onClick={() => {
                  setInventoryItems([
                    ...inventoryItems,
                    {
                      id: `scan-${Date.now()}`,
                      name: 'Scanned PCB Motherboard Batch',
                      hindiName: 'स्कैन किया हुआ मदरबोर्ड',
                      category: 'Circuits',
                      weight: 2.4,
                      grade: 'Grade A',
                      rate: 415,
                      purity: 'AI Camera Verified'
                    }
                  ]);
                  setShowCameraScanner(false);
                  setActiveScreen('collection');
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-bold font-serif shadow-xs"
              >
                Add to Scrap Inventory
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Simulated Vernacular Voice Guidance */}
      {showVoicePrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-[#B1D8D0] max-w-sm w-full rounded-3xl p-6 shadow-2xl relative font-serif text-center">
            <div className="w-16 h-16 rounded-full bg-[#E1F1EE] text-[#0D9488] flex items-center justify-center mx-auto mb-3 border border-[#B1D8D0] animate-bounce">
              <Mic className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-[#064E3B] font-serif">
              {language === 'hi' ? 'बोलिए... सुन रहे हैं' : language === 'mr' ? 'बोला... ऐकत आहोत' : 'Listening... Speak your scrap item'}
            </h3>
            
            <p className="text-xs text-slate-500 font-sans mt-1">
              {language === 'hi' 
                ? 'उदाहरण: "तांबे का तार दस किलो" या "कंप्यूटर बोर्ड"' 
                : 'Example: "Copper wire 10 kilograms" or "Computer board"'}
            </p>

            {/* Audio Wave Simulation */}
            <div className="flex items-center justify-center gap-1.5 h-10 my-4">
              {[4, 8, 14, 20, 10, 16, 24, 18, 12, 6].map((h, i) => (
                <div 
                  key={i} 
                  className="w-1.5 bg-[#0D9488] rounded-full animate-pulse" 
                  style={{ height: `${h * 1.5}px` }} 
                />
              ))}
            </div>

            <div className="p-3 rounded-2xl bg-[#F0FDF4] border border-[#B1D8D0] text-xs text-[#064E3B] font-sans">
              Detected: <strong>"तांबा तार 14 किलो" (Copper Wire 14 kg)</strong>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setShowVoicePrompt(false)}
                className="w-full py-2.5 rounded-xl bg-[#0D9488] text-white text-xs font-bold font-serif"
              >
                Confirm Voice Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Add Batch Form Modal */}
      {showAddBatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-[#B1D8D0] max-w-md w-full rounded-3xl p-6 shadow-2xl relative font-serif">
            <div className="flex justify-between items-center pb-3 border-b border-[#E1F1EE]">
              <h3 className="text-base font-bold text-[#064E3B]">Add New E-Waste Scrap Batch</h3>
              <button onClick={() => setShowAddBatchModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddBatch} className="mt-4 space-y-3.5 text-xs font-sans">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Item / Batch Title:</label>
                <input
                  type="text"
                  required
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-serif"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Category:</label>
                  <select
                    value={newBatchCategory}
                    onChange={(e) => setNewBatchCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  >
                    <option value="Circuits">Circuit Boards</option>
                    <option value="Metals">Pure Metals</option>
                    <option value="Batteries">Batteries</option>
                    <option value="Displays">Displays / CRT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Weight (kg):</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    required
                    value={newBatchWeight}
                    onChange={(e) => setNewBatchWeight(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Benchmark Rate (₹/kg):</label>
                <input
                  type="number"
                  required
                  value={newBatchRate}
                  onChange={(e) => setNewBatchRate(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddBatchModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold font-serif"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white font-bold font-serif shadow-xs"
                >
                  Save to Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Digital Handover Receipt Specimen */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border border-[#B1D8D0] max-w-lg w-full rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar font-serif">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E1F1EE]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#E1F1EE] text-[#0D9488] flex items-center justify-center border border-[#B1D8D0]">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#064E3B] font-serif">Digital EPR Handover Certificate</h3>
                  <p className="text-[10px] font-mono text-[#0D9488] font-bold">CPCB & SPCB E-Waste Rules 2022 Compliant</p>
                </div>
              </div>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-[#F0F4F3]"
              >
                ✕
              </button>
            </div>

            {/* Receipt Content */}
            <div className="mt-4 p-4 rounded-2xl bg-[#F8FAF9] border border-[#B1D8D0]/60 font-mono text-xs space-y-2.5">
              <div className="flex justify-between text-slate-500 pb-2 border-b border-slate-200">
                <span>MANIFEST ID:</span>
                <span className="text-[#0D9488] font-bold">#AE-2026-9041</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>COLLECTOR:</span>
                <span className="text-[#064E3B] font-semibold">Ramesh Kumar (ID #KB-4021)</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>RECYCLER:</span>
                <span className="text-[#064E3B] font-semibold">EcoRecycle India (MH-PCB-8821)</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>VERIFIED WEIGHT:</span>
                <span className="text-[#064E3B] font-bold">42.50 kg (Net Segregated)</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>SETTLEMENT:</span>
                <span className="text-[#064E3B] font-extrabold">₹8,450.00 (Instant UPI Payout)</span>
              </div>
              <div className="flex justify-between text-slate-500 pt-2 border-t border-slate-200">
                <span>EPR CREDIT REF:</span>
                <span className="text-[#0D9488] font-bold">EPR-MH-26-8821-4021</span>
              </div>

              {/* QR Code Illustration */}
              <div className="pt-2 flex flex-col items-center justify-center">
                <div className="p-3 bg-white rounded-2xl shadow-xs border border-[#B1D8D0]">
                  <QrCode className="w-24 h-24 text-[#064E3B]" />
                </div>
                <p className="text-[10px] text-slate-500 mt-2 text-center font-sans">
                  Tamper-proof SHA-256 digital signature verified by SPCB portal.
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2 font-serif">
              <button
                onClick={() => setShowReceiptModal(false)}
                className="px-4 py-2 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Close Specimen
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
