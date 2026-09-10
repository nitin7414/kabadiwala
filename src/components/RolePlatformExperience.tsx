import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Truck,
  Factory,
  ShieldCheck,
  Plus,
  ArrowRight,
  TrendingUp,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Camera,
  Cpu,
  Cable,
  BatteryCharging,
  Tv,
  Monitor,
  RotateCw,
  Boxes,
  User,
  LogOut,
  QrCode,
  Check,
  Sparkles,
  ArrowLeft,
  FileText,
  BookOpen,
  Navigation,
  Flame,
  ShieldAlert,
  XCircle,
  Building2,
  Scale,
  IndianRupee,
  Users,
  AlertOctagon,
  FileWarning,
  Gavel,
  Search,
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
} from 'lucide-react';
import {
  SEED_CATEGORIES,
  SEED_PRICE_RATES,
  SEED_RECYCLERS,
  SEED_USERS,
  SEED_LOTS,
  MockLot,
  HISTORICAL_PRICE_TRENDS,
} from '@/lib/mockSeedData';

const CATEGORY_ICONS: Record<string, typeof Cpu> = {
  cat_pcb: Cpu,
  cat_crt: Tv,
  cat_cables: Cable,
  cat_batteries: BatteryCharging,
  cat_lcd: Monitor,
  cat_motors: RotateCw,
  cat_plastics: Boxes,
};

const HINDI_CATEGORY_NAMES: Record<string, string> = {
  cat_pcb: 'सर्किट बोर्ड / मदरबोर्ड',
  cat_crt: 'सीआरटी मॉनिटर ग्लास',
  cat_cables: 'तांबे के तार व केबल',
  cat_batteries: 'लिथियम बैटरी सेल',
  cat_lcd: 'एलसीडी / एलईडी पैनल',
  cat_motors: 'मोटर व चुंबक',
  cat_plastics: 'मिश्रित ई-प्लास्टिक',
};

const PHOTO_PRESETS = [
  { label: 'PCB Motherboard', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60' },
  { label: 'Copper Wiring', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=60' },
  { label: 'Lithium Batteries', url: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=500&auto=format&fit=crop&q=60' },
];

export const RolePlatformExperience: React.FC = () => {
  // Navigation State
  const [currentRole, setCurrentRole] = useState<'KABADIWALA' | 'RECYCLER' | 'ADMIN' | null>(null);
  const [activeUser, setActiveUser] = useState<typeof SEED_USERS[0] | null>(null);
  const [lots, setLots] = useState<MockLot[]>(SEED_LOTS);
  const [recyclers, setRecyclers] = useState(SEED_RECYCLERS);

  // Collector Sub-View Navigation (Phase 4)
  const [collectorSubView, setCollectorSubView] = useState<'dashboard' | 'ledger' | 'safety' | 'match'>('dashboard');
  const [matchingLot, setMatchingLot] = useState<MockLot | null>(null);

  // Lot Creation State
  const [isCreatingLot, setIsCreatingLot] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState<string>('cat_pcb');
  const [lotWeight, setLotWeight] = useState<number>(18.5);
  const [photoUrl, setPhotoUrl] = useState<string>(PHOTO_PRESETS[0].url);
  const [createdLot, setCreatedLot] = useState<MockLot | null>(null);

  // QR Modal State
  const [activeQrLot, setActiveQrLot] = useState<MockLot | null>(null);

  // Admin Sub-View Navigation (Phase 6)
  const [adminSubView, setAdminSubView] = useState<'dashboard' | 'recyclers' | 'prices' | 'anomalies'>('dashboard');
  const [adminPriceCat, setAdminPriceCat] = useState<string>('cat_pcb');
  const [adminPriceRegion, setAdminPriceRegion] = useState<'BOTH' | 'Nagpur' | 'Mumbai'>('BOTH');
  const [adjudicatedAnomalies, setAdjudicatedAnomalies] = useState<Record<string, string>>({});
  const [expandedAnomalyId, setExpandedAnomalyId] = useState<string | null>('pr_ano_cables');
  const [adminToast, setAdminToast] = useState<string | null>(null);

  const showAdminToast = (msg: string) => {
    setAdminToast(msg);
    setTimeout(() => setAdminToast(null), 3500);
  };

  // Handle Login
  const handleSelectRoleUser = (role: 'KABADIWALA' | 'RECYCLER' | 'ADMIN', user: typeof SEED_USERS[0]) => {
    setCurrentRole(role);
    setActiveUser(user);
    setCollectorSubView('dashboard');
    setAdminSubView('dashboard');
    setIsCreatingLot(false);
    setCreatedLot(null);
  };

  const handleLogout = () => {
    setCurrentRole(null);
    setActiveUser(null);
    setCollectorSubView('dashboard');
    setAdminSubView('dashboard');
    setIsCreatingLot(false);
    setCreatedLot(null);
  };


  // Pricing formula
  const currentCategory = SEED_CATEGORIES.find((c) => c._id === selectedCatId) || SEED_CATEGORIES[0];
  const userCity = activeUser?.location.includes('Mumbai') ? 'Mumbai' : 'Nagpur';
  const currentRate = SEED_PRICE_RATES.find(
    (pr) =>
      pr.materialCategoryId === selectedCatId &&
      pr.location.toLowerCase() === userCity.toLowerCase() &&
      pr.source === 'MARKET_AVERAGE'
  )?.pricePerUnit || 280;

  const estimatedValue = Math.round(lotWeight * currentRate);

  // Create Lot Handler
  const handleConfirmCreateLot = () => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const refId = `SS-2026-00${randomSuffix}`;
    const newLot: MockLot = {
      _id: `lot_${Date.now()}`,
      collectorId: activeUser?._id || 'user_ramesh',
      materialCategoryId: selectedCatId,
      photoUrl: photoUrl || PHOTO_PRESETS[0].url,
      approxWeight: lotWeight,
      estimatedValue: estimatedValue,
      quotedPrice: estimatedValue,
      status: 'DRAFT',
      collectionLocation: activeUser?.location || 'Nagpur Central',
      gpsLat: 21.1458,
      gpsLng: 79.0882,
      referenceId: refId,
      createdAt: Date.now(),
    };

    setLots([newLot, ...lots]);
    setCreatedLot(newLot);
  };

  // Recycler Selection & Handover (Phase 4 matching logic)
  const handleMatchRecycler = (targetLot: MockLot, recycler: typeof SEED_RECYCLERS[0], quotedPayout: number) => {
    setLots((prev) =>
      prev.map((l) =>
        l._id === targetLot._id
          ? {
              ...l,
              recyclerId: recycler._id,
              quotedPrice: quotedPayout,
              status: 'HANDED_OVER',
              handoverAt: Date.now(),
            }
          : l
      )
    );
    setActiveQrLot({
      ...targetLot,
      recyclerId: recycler._id,
      quotedPrice: quotedPayout,
      status: 'HANDED_OVER',
    });
    setCollectorSubView('dashboard');
    setMatchingLot(null);
  };

  // Recycler Confirmation Handler
  const handleConfirmHandover = (lotId: string) => {
    setLots((prev) =>
      prev.map((l) =>
        l._id === lotId
          ? {
              ...l,
              status: 'CONFIRMED',
              confirmedAt: Date.now(),
              finalSaleValue: l.quotedPrice || l.estimatedValue,
            }
          : l
      )
    );
  };

  // Toggle Recycler Authorization
  const handleToggleRecyclerStatus = (recId: string) => {
    setRecyclers((prev) =>
      prev.map((r) =>
        r._id === recId
          ? {
              ...r,
              authorizationStatus:
                r.authorizationStatus === 'AUTHORIZED'
                  ? 'PENDING'
                  : r.authorizationStatus === 'PENDING'
                  ? 'UNAUTHORIZED'
                  : 'AUTHORIZED',
            }
          : r
      )
    );
  };

  // 1. ROLE SELECTION SCREEN (Phase 0 & 2)
  if (!currentRole || !activeUser) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-sans uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phases 0–4 Live Interactive Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Choose a Role to Test Live Platform
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-sans">
            Scrap Setu provides tailored interfaces for Informal Collectors, CPCB-Authorized Recyclers, and Government Environmental Regulators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          {/* Card 1: Kabadiwala */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 hover:border-emerald-500 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md mb-4 group-hover:scale-105 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Phase 3 & 4: Collector Hub
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">Kabadiwala Portal</h3>
              <p className="text-xs text-slate-500 font-medium">इलेक्ट्रॉनिक कचरा संग्राहक</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Lot creation wizard, recycler matching engine, QR digital handovers, passbook ledger, and hazard safety guide.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                1-Click Demo Logins:
              </div>
              <button
                onClick={() => handleSelectRoleUser('KABADIWALA', SEED_USERS[0])}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-between shadow-xs cursor-pointer active:scale-98 transition-all"
              >
                <span>Login as Ramesh Kumar (Nagpur)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleSelectRoleUser('KABADIWALA', SEED_USERS[1])}
                className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold text-xs flex items-center justify-between border border-emerald-200 cursor-pointer transition-colors"
              >
                <span>Login as Suresh Patil (Marathi)</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
              </button>
            </div>
          </div>

          {/* Card 2: Recycler */}
          <div className="bg-white rounded-3xl p-6 border-2 border-blue-200 hover:border-blue-500 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md mb-4 group-hover:scale-105 transition-transform">
                <Factory className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                Phase 5 Preview
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">Authorized Recycler</h3>
              <p className="text-xs text-slate-500 font-medium">अधिकृत रिसाइकलर सुविधा</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Inbound lot queues, QR code handover verification, rate management, and digital compliance receipts.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                1-Click Demo Logins:
              </div>
              <button
                onClick={() => handleSelectRoleUser('RECYCLER', SEED_USERS[4])}
                className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-between shadow-xs cursor-pointer active:scale-98 transition-all"
              >
                <span>EcoRecycle India (Hingna MIDC)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleSelectRoleUser('RECYCLER', SEED_USERS[5])}
                className="w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 font-semibold text-xs flex items-center justify-between border border-blue-200 cursor-pointer transition-colors"
              >
                <span>Vidarbha CleanMetals (Wadi)</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-700" />
              </button>
            </div>
          </div>

          {/* Card 3: Govt Admin */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 hover:border-amber-500 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center text-white shadow-md mb-4 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Phase 6 Preview
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">Government Admin</h3>
              <p className="text-xs text-slate-500 font-medium">सीपीसीबी एवं राज्य प्रदूषण बोर्ड</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Diversion telemetry, recycler license oversight, and algorithmic below-market price anomaly alerts.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                1-Click Demo Logins:
              </div>
              <button
                onClick={() => handleSelectRoleUser('ADMIN', SEED_USERS[3])}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-between shadow-xs cursor-pointer active:scale-98 transition-all"
              >
                <span>Login as Dr. Anjali Mehta (SPCB)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-[10px] text-amber-700 font-semibold text-center pt-1">
                SPCB Regional HQ • Regulatory Telemetry
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Role Top Bar
  return (
    <div className="font-sans">
      {/* Session Header */}
      <div className="bg-slate-900 text-white px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow-inner">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div className="text-xs font-semibold">
            Logged in as <span className="text-emerald-400 font-bold">{activeUser.name}</span> (
            {activeUser.role}) • {activeUser.location}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => handleSelectRoleUser('KABADIWALA', SEED_USERS[0])}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              currentRole === 'KABADIWALA' ? 'bg-emerald-600 font-bold text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Collector
          </button>
          <button
            onClick={() => handleSelectRoleUser('RECYCLER', SEED_USERS[4])}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              currentRole === 'RECYCLER' ? 'bg-blue-600 font-bold text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Recycler
          </button>
          <button
            onClick={() => handleSelectRoleUser('ADMIN', SEED_USERS[3])}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              currentRole === 'ADMIN' ? 'bg-amber-600 font-bold text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Govt Admin
          </button>
          <button
            onClick={handleLogout}
            className="ml-2 px-2 py-1 rounded-lg bg-slate-800 hover:bg-red-900 text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <LogOut className="w-3 h-3" />
            <span>Switch Role</span>
          </button>
        </div>
      </div>

      {/* 2. KABADIWALA PORTAL (Phase 3 & Phase 4 Flows) */}
      {currentRole === 'KABADIWALA' && (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Collector Navigation Pills */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCollectorSubView('dashboard');
                  setIsCreatingLot(false);
                  setMatchingLot(null);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  collectorSubView === 'dashboard' && !isCreatingLot
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Dashboard / मुख्य पृष्ठ</span>
              </button>

              <button
                onClick={() => {
                  setCollectorSubView('ledger');
                  setIsCreatingLot(false);
                  setMatchingLot(null);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  collectorSubView === 'ledger'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Passbook Ledger (खाता बही)</span>
              </button>

              <button
                onClick={() => {
                  setCollectorSubView('safety');
                  setIsCreatingLot(false);
                  setMatchingLot(null);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  collectorSubView === 'safety'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Hazard Safety (सुरक्षा)</span>
              </button>
            </div>

            <button
              onClick={() => {
                setIsCreatingLot(true);
                setCollectorSubView('dashboard');
                setMatchingLot(null);
                setCreatedLot(null);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create Lot</span>
            </button>
          </div>

          {/* SUB-VIEW: MATCHMAKER (Phase 4 Task 1 & 2) */}
          {collectorSubView === 'match' && matchingLot && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md max-w-3xl mx-auto space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <button
                  onClick={() => setCollectorSubView('dashboard')}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Lots</span>
                </button>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  Phase 4: Recycler Matchmaker
                </span>
              </div>

              <div className="bg-gradient-to-br from-teal-900 to-slate-900 rounded-2xl p-5 text-white flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-300">Matching Material Lot</div>
                  <div className="text-xl font-black">{matchingLot.referenceId}</div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    {SEED_CATEGORIES.find((c) => c._id === matchingLot.materialCategoryId)?.name} • {matchingLot.approxWeight} kg
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Baseline Quote</div>
                  <div className="text-xl font-black text-emerald-400">₹{matchingLot.estimatedValue}</div>
                </div>
              </div>

              {/* Ranked Recycler Cards */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Ranked Authorized Recyclers (Highest Rate First):
                </div>

                {SEED_RECYCLERS.filter((r) => r.authorizationStatus === 'AUTHORIZED').map((rec, idx) => {
                  const rate = idx === 0 ? 305 : idx === 1 ? 290 : 280;
                  const totalPayout = Math.round(rate * matchingLot.approxWeight);
                  const dist = idx === 0 ? '1.8 km' : idx === 1 ? '3.4 km' : '5.2 km';

                  return (
                    <div
                      key={rec._id}
                      className="p-4 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-teal-800">
                          <Factory className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                            <span>{rec.facilityName}</span>
                            {idx === 0 && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-md">
                                Best Rate
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500">
                            {rec.location} • <span className="text-emerald-700 font-semibold">{dist} away</span> • {rec.pickupAvailable ? 'Doorstep Pickup' : 'Dock Drop-off'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <div className="text-right">
                          <div className="font-black text-emerald-700 text-base">₹{totalPayout}</div>
                          <div className="text-[10px] text-slate-400">₹{rate}/kg</div>
                        </div>

                        <button
                          onClick={() => handleMatchRecycler(matchingLot, rec, totalPayout)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                        >
                          <span>Select & Handover</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUB-VIEW: PASSBOOK LEDGER (Phase 4 Task 3) */}
          {collectorSubView === 'ledger' && (
            <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#D9CEB2] shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#1A382E] to-[#0A261D] text-[#F4EBD9] p-6 border-b-4 border-[#C29B38] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#E5C158] font-bold">
                    Official Collector Statement • डिजिटल खाता बही
                  </div>
                  <h2 className="text-2xl font-serif font-black text-white mt-1">Passbook Ledger</h2>
                  <p className="text-xs text-emerald-200/80">
                    Account: {activeUser.name} • {activeUser.location}
                  </p>
                </div>
                <div className="text-right bg-white/10 p-3 rounded-xl border border-white/10">
                  <div className="text-[10px] text-emerald-300 uppercase font-bold">Settled Payouts</div>
                  <div className="text-2xl font-black text-[#E5C158]">
                    ₹{lots.filter((l) => l.status === 'CONFIRMED' || l.status === 'PAID').reduce((acc, c) => acc + (c.finalSaleValue || c.estimatedValue), 0).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-3 font-mono">
                {lots.map((l, idx) => {
                  const cat = SEED_CATEGORIES.find((c) => c._id === l.materialCategoryId);
                  const isSettled = l.status === 'CONFIRMED' || l.status === 'PAID';
                  return (
                    <div key={l._id} className="p-3.5 rounded-xl bg-white border border-[#E8DFC8] flex items-center justify-between font-sans text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-slate-400 font-bold">#{idx + 1}</span>
                        <div>
                          <div className="font-mono font-bold text-slate-900">{l.referenceId}</div>
                          <div className="text-slate-500 text-[11px]">{cat?.name} • {l.approxWeight} kg</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${isSettled ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {isSettled ? 'CREDITED / जमा' : `${l.status} / लंबित`}
                        </span>
                        <div className="font-mono font-black text-sm text-right">
                          <span className={isSettled ? 'text-emerald-700' : 'text-amber-700'}>
                            {isSettled ? '+ ₹' : '₹'}{(l.finalSaleValue || l.estimatedValue).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUB-VIEW: HAZARD SAFETY (Phase 4 Task 4) */}
          {collectorSubView === 'safety' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-amber-700 via-orange-800 to-slate-900 rounded-3xl p-6 text-white shadow-md">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldAlert className="w-5 h-5 text-amber-300" />
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-200">
                    Health & Environmental Guidance • सुरक्षा निर्देश
                  </span>
                </div>
                <h2 className="text-2xl font-black">Hazard Safety Guidelines</h2>
                <p className="text-xs text-amber-100/90 mt-1">
                  Essential precautions for hazardous scrap components to prevent fire, toxic gas inhalation, and lead contamination.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-5 rounded-2xl bg-red-50 border-2 border-red-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <BatteryCharging className="w-8 h-8 text-red-600" />
                    <span className="text-[10px] font-black uppercase text-red-800 bg-red-100 px-2 py-0.5 rounded-full">Fire Hazard</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">Lithium-ion Batteries</h3>
                  <p className="text-red-900 font-semibold leading-relaxed">
                    Thermal runaway & explosive flare risk if punctured or wet.
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-red-200">
                    <div className="text-emerald-800 font-bold flex items-start gap-1"><Check className="w-3.5 h-3.5 shrink-0 text-emerald-600" /><span>Tape exposed terminal contacts.</span></div>
                    <div className="text-red-800 font-bold flex items-start gap-1"><XCircle className="w-3.5 h-3.5 shrink-0 text-red-600" /><span>Never crush or drop into fires.</span></div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <Tv className="w-8 h-8 text-amber-600" />
                    <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">Lead Poisoning</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">CRT Monitor Glass</h3>
                  <p className="text-amber-900 font-semibold leading-relaxed">
                    Funnel glass contains &gt;20% lead oxide. Implosion hazard.
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-amber-200">
                    <div className="text-emerald-800 font-bold flex items-start gap-1"><Check className="w-3.5 h-3.5 shrink-0 text-emerald-600" /><span>Keep vacuum funnel unbroken.</span></div>
                    <div className="text-red-800 font-bold flex items-start gap-1"><XCircle className="w-3.5 h-3.5 shrink-0 text-red-600" /><span>Never break glass in open air.</span></div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-orange-50 border-2 border-orange-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <Flame className="w-8 h-8 text-orange-600" />
                    <span className="text-[10px] font-black uppercase text-orange-800 bg-orange-100 px-2 py-0.5 rounded-full">Toxic Dioxins</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">Copper Cable Burning</h3>
                  <p className="text-orange-900 font-semibold leading-relaxed">
                    PVC smoke releases cancer-causing dioxins and acid fumes.
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-orange-200">
                    <div className="text-emerald-800 font-bold flex items-start gap-1"><Check className="w-3.5 h-3.5 shrink-0 text-emerald-600" /><span>Strip insulation mechanically.</span></div>
                    <div className="text-red-800 font-bold flex items-start gap-1"><XCircle className="w-3.5 h-3.5 shrink-0 text-red-600" /><span>NEVER burn copper wires.</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUB-VIEW: DASHBOARD (Default) */}
          {collectorSubView === 'dashboard' && (
            <>
              {/* Top Collector Banner */}
              <div className="bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                      Active Collector Portal
                    </span>
                    <span className="text-xs text-emerald-200/80 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {activeUser.location}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black">{activeUser.name}</h2>
                  <p className="text-xs text-emerald-100/80 mt-1 max-w-lg">
                    Real-time spot price guidance & CPCB-compliant handover bridge to formal recyclers.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsCreatingLot(true);
                    setCreatedLot(null);
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-950 font-black text-sm sm:text-base flex items-center gap-2.5 shadow-lg cursor-pointer hover:scale-102 transition-all shrink-0"
                >
                  <Plus className="w-5 h-5 text-emerald-700 stroke-[3]" />
                  <span>New Scrap Lot / नया लॉट</span>
                </button>
              </div>

              {/* Price Board & Recent Lots Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* PRICE BOARD */}
                <div className="lg:col-span-1 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span>Live Price Board ({userCity})</span>
                    </h3>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Verified
                    </span>
                  </div>

                  <div className="space-y-2">
                    {SEED_PRICE_RATES.filter((pr) => pr.location === userCity && pr.source === 'MARKET_AVERAGE').slice(0, 5).map((rate) => {
                      const cat = SEED_CATEGORIES.find((c) => c._id === rate.materialCategoryId);
                      if (!cat) return null;
                      return (
                        <div key={rate._id} className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between text-xs">
                          <div>
                            <div className="font-bold text-slate-800">{cat.name}</div>
                            <div className="text-[10px] text-slate-400">per {cat.unit}</div>
                          </div>
                          <div className="font-black text-emerald-700 text-sm">₹{rate.pricePerUnit}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* RECENT LOTS */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Recent Lots Tracked ({lots.length})
                    </h3>
                    <span className="text-xs text-slate-400">CPCB Traceability Queue</span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {lots.slice(0, 5).map((l) => {
                      const cat = SEED_CATEGORIES.find((c) => c._id === l.materialCategoryId);
                      return (
                        <div key={l._id} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-3">
                            <img src={l.photoUrl} alt="lot" className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0" />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900">{l.referenceId}</span>
                                <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800">
                                  {l.status}
                                </span>
                              </div>
                              <div className="text-slate-500 text-[11px]">
                                {cat?.name} • {l.approxWeight} {cat?.unit}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                            <div className="text-right">
                              <div className="font-black text-slate-900 text-sm">
                                ₹{(l.finalSaleValue || l.estimatedValue).toLocaleString('en-IN')}
                              </div>
                              <div className="text-[10px] text-slate-400">{l.status === 'CONFIRMED' ? 'Paid' : 'Estimate'}</div>
                            </div>

                            {l.status === 'DRAFT' && (
                              <button
                                onClick={() => {
                                  setMatchingLot(l);
                                  setCollectorSubView('match');
                                }}
                                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer active:scale-95 shadow-xs"
                              >
                                <span>Find Recycler</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}

                            {(l.status === 'MATCHED' || l.status === 'HANDED_OVER') && (
                              <button
                                onClick={() => setActiveQrLot(l)}
                                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer active:scale-95 shadow-xs"
                              >
                                <QrCode className="w-3.5 h-3.5" />
                                <span>Handover QR</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* 3. RECYCLER PORTAL (Phase 5) */}
      {currentRole === 'RECYCLER' && (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">
                CPCB Registered Facility
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-2">{activeUser.name}</h2>
              <p className="text-xs text-blue-100/80 mt-0.5">Authorization ID: CPCB/EWR/MH-8821 • Service Area: Vidarbha</p>
            </div>
            <div className="flex gap-4 text-xs">
              <div className="bg-white/10 px-4 py-2 rounded-2xl">
                <div className="text-blue-200">Pending Intake</div>
                <div className="text-lg font-black">{lots.filter((l) => l.status === 'HANDED_OVER' || l.status === 'MATCHED').length} Lots</div>
              </div>
            </div>
          </div>

          {/* Inbound Lot Queue */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-slate-900">Inbound Lot Verification Queue</h3>
            <div className="divide-y divide-slate-100">
              {lots.map((l) => {
                const cat = SEED_CATEGORIES.find((c) => c._id === l.materialCategoryId);
                return (
                  <div key={l._id} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={l.photoUrl} alt="lot" className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{l.referenceId}</span>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                            {l.status}
                          </span>
                        </div>
                        <div className="text-slate-500 text-[11px] mt-0.5">
                          {cat?.name} • {l.approxWeight} {cat?.unit} • Location: {l.collectionLocation}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-black text-slate-900 text-sm">₹{l.quotedPrice || l.estimatedValue}</div>
                        <div className="text-[10px] text-slate-400">Offer Value</div>
                      </div>

                      {l.status !== 'CONFIRMED' && l.status !== 'PAID' ? (
                        <button
                          onClick={() => handleConfirmHandover(l._id)}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer active:scale-95 shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Confirm Intake</span>
                        </button>
                      ) : (
                        <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200">
                          Verified & Confirmed
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4. GOVT ADMIN PORTAL (Phase 6) */}
      {currentRole === 'ADMIN' && (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Admin Floating Toast */}
          {adminToast && (
            <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{adminToast}</span>
            </div>
          )}

          {/* Admin Header Banner */}
          <div className="bg-gradient-to-br from-amber-700 via-orange-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/30 text-amber-200 border border-amber-400/30">
                  Regulatory Oversight Telemetry
                </span>
                <span className="text-[10px] text-amber-200/80 font-bold">
                  SIH 2026 Problem Statement 26229
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black mt-2">{activeUser.name}</h2>
              <p className="text-xs text-amber-100/80 mt-0.5">Central Pollution Control Board (CPCB) Regional Environmental Division</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 text-right">
                <div className="text-[11px] text-amber-200">Total Material Diverted</div>
                <div className="text-xl font-black">{lots.filter((l) => l.status === 'CONFIRMED' || l.status === 'PAID').reduce((acc, c) => acc + c.approxWeight, 0).toFixed(1)} kg</div>
              </div>
            </div>
          </div>

          {/* Admin Navigation Bar */}
          <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs flex flex-wrap gap-1.5">
            {[
              { id: 'dashboard', label: 'Oversight Overview', icon: ShieldCheck },
              { id: 'recyclers', label: 'Recycler Licensing', icon: Building2 },
              { id: 'prices', label: 'Market Price Trends', icon: TrendingUp },
              { id: 'anomalies', label: 'Pricing Anomalies', icon: AlertOctagon, badge: '1 Alert' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = adminSubView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAdminSubView(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-100 text-amber-900 border border-amber-300/80 shadow-xs font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-700' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-red-500 text-white animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* SUB-VIEW 1: DASHBOARD OVERVIEW */}
          {adminSubView === 'dashboard' && (
            <div className="space-y-6">
              {/* Critical Anomaly Alert Banner */}
              <div className="p-4 sm:p-5 rounded-3xl bg-red-50/90 border border-red-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-100 text-red-800 border border-red-300">
                        Pricing Anomaly Detected
                      </span>
                      <span className="text-xs text-red-700 font-bold">
                        GreenEarth SafeRecycle &gt;30% Below Market Benchmark
                      </span>
                    </div>
                    <p className="text-xs text-red-800/90 mt-1">
                      Quoting ₹390/kg for Cables in Nagpur (Market benchmark: ₹640/kg, -39.1%). Triggers automatic regulatory review for informal collector fairness.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setAdminSubView('anomalies')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shrink-0 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Inspect Anomalies</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 4 Core Regulatory KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* KPI 1 */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider">Registered Recyclers</span>
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Building2 className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-3xl font-black text-slate-900">{recyclers.length}</div>
                    <div className="text-xs text-slate-500 mt-1">Industrial refinery hubs</div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                    <span className="text-emerald-700">{recyclers.filter((r) => r.authorizationStatus === 'AUTHORIZED').length} Authorized</span>
                    <span className="text-amber-700">{recyclers.filter((r) => r.authorizationStatus === 'PENDING').length} Pending</span>
                    <span className="text-red-700">{recyclers.filter((r) => r.authorizationStatus === 'UNAUTHORIZED').length} Revoked</span>
                  </div>
                </div>

                {/* KPI 2 */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider">Material Diverted</span>
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Scale className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-3xl font-black text-slate-900">
                      {lots.filter((l) => l.status === 'CONFIRMED' || l.status === 'PAID').reduce((sum, l) => sum + l.approxWeight, 0).toFixed(1)}{' '}
                      <span className="text-sm font-semibold text-slate-500">kg</span>
                    </div>
                    <div className="text-xs text-emerald-700 font-semibold mt-1">Diverted from informal dumping</div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between text-[11px] text-slate-500 font-medium">
                    <span>{lots.filter((l) => l.status === 'CONFIRMED' || l.status === 'PAID').length} Lots Confirmed</span>
                    <span className="font-bold text-emerald-700">100% CPCB Tracked</span>
                  </div>
                </div>

                {/* KPI 3 */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider">Formal Value Settled</span>
                      <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                        <IndianRupee className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-3xl font-black text-slate-900">
                      ₹{lots.filter((l) => l.status === 'CONFIRMED' || l.status === 'PAID').reduce((sum, l) => sum + (l.finalSaleValue || l.quotedPrice || 0), 0).toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Direct collector bank payouts</div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between text-[11px] text-slate-500 font-medium">
                    <span>0% Middleman Deduction</span>
                    <span className="font-bold text-amber-700">Direct DBT</span>
                  </div>
                </div>

                {/* KPI 4 */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider">Active Kabadiwalas</span>
                      <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                        <Users className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-3xl font-black text-slate-900">
                      {new Set(lots.map((l) => l.collectorId)).size}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Micro-collectors on platform</div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between text-[11px] text-purple-700 font-semibold">
                    <span>Digital passbook active</span>
                    <span className="font-bold">E-Shram Verified</span>
                  </div>
                </div>
              </div>

              {/* Stream Breakdown & Recent Custody Transfers */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Diversion Breakdown by Category */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 lg:col-span-1">
                  <h3 className="font-extrabold text-base text-slate-900">Material Stream Breakdown</h3>
                  <p className="text-xs text-slate-500">Hazardous e-waste streams safely formalized</p>

                  <div className="space-y-3 pt-2">
                    {SEED_CATEGORIES.map((cat) => {
                      const catLots = lots.filter((l) => (l.status === 'CONFIRMED' || l.status === 'PAID') && l.materialCategoryId === cat._id);
                      const weight = catLots.reduce((sum, l) => sum + l.approxWeight, 0);
                      const totalDiverted = lots.filter((l) => l.status === 'CONFIRMED' || l.status === 'PAID').reduce((sum, l) => sum + l.approxWeight, 0);
                      const pct = totalDiverted > 0 ? Math.round((weight / totalDiverted) * 100) : 0;

                      return (
                        <div key={cat._id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                          <div className="flex justify-between items-center font-bold">
                            <span className="text-slate-900">{cat.name}</span>
                            <span className="text-slate-700">{weight} kg ({pct}%)</span>
                          </div>
                          <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                            <div className="bg-amber-600 h-full rounded-full transition-all" style={{ width: `${pct}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Traceability Handovers */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 lg:col-span-2">
                  <h3 className="font-extrabold text-base text-slate-900">Live Chain-of-Custody Stream</h3>
                  <p className="text-xs text-slate-500">Real-time collector-to-recycler handover audit logs</p>

                  <div className="divide-y divide-slate-100">
                    {lots.slice(0, 5).map((lot) => {
                      const cat = SEED_CATEGORIES.find((c) => c._id === lot.materialCategoryId);
                      const rec = recyclers.find((r) => r._id === lot.recyclerId);

                      return (
                        <div key={lot._id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-slate-900">{lot.referenceId}</span>
                              <span
                                className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                                  lot.status === 'CONFIRMED' || lot.status === 'PAID'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                    : lot.status === 'HANDED_OVER'
                                    ? 'bg-blue-50 text-blue-800 border-blue-200'
                                    : 'bg-amber-50 text-amber-800 border-amber-200'
                                }`}
                              >
                                {lot.status}
                              </span>
                            </div>
                            <div className="text-slate-600 text-[11px] mt-0.5">
                              {cat?.name} • {lot.approxWeight} {cat?.unit} • {lot.collectionLocation}
                            </div>
                            {rec && <div className="text-slate-400 text-[10px]">Recipient: {rec.facilityName}</div>}
                          </div>

                          <div className="text-right">
                            <div className="font-black text-slate-900 text-sm">
                              ₹{lot.finalSaleValue || lot.quotedPrice || lot.estimatedValue}
                            </div>
                            <div className="text-[10px] text-slate-400">Direct Value</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUB-VIEW 2: RECYCLER LICENSING */}
          {adminSubView === 'recyclers' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Recycler Authorization & Licensing Oversight</h3>
                  <p className="text-xs text-slate-500">Manage operating permits and authorized material categories across Maharashtra</p>
                </div>
                <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                  {recyclers.length} Facilities Monitored
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {recyclers.map((r) => (
                  <div key={r._id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 text-sm">{r.facilityName}</div>
                        <div className="text-slate-500 text-[11px] mt-0.5">
                          <span className="font-mono font-semibold">{r.authorizationNumber}</span> • {r.location}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {r.materialsAccepted.map((m) => (
                            <span key={m} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center">
                      <span
                        className={`px-3 py-1 rounded-full font-bold text-[11px] border ${
                          r.authorizationStatus === 'AUTHORIZED'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : r.authorizationStatus === 'PENDING'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-red-50 text-red-800 border-red-200'
                        }`}
                      >
                        {r.authorizationStatus}
                      </span>

                      {/* 3-way toggle buttons */}
                      <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 shadow-2xs">
                        <button
                          onClick={() => {
                            setRecyclers((prev) => prev.map((rc) => (rc._id === r._id ? { ...rc, authorizationStatus: 'AUTHORIZED' } : rc)));
                            showAdminToast(`Set ${r.facilityName} status to AUTHORIZED`);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                            r.authorizationStatus === 'AUTHORIZED' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-emerald-700'
                          }`}
                        >
                          Authorized
                        </button>
                        <button
                          onClick={() => {
                            setRecyclers((prev) => prev.map((rc) => (rc._id === r._id ? { ...rc, authorizationStatus: 'PENDING' } : rc)));
                            showAdminToast(`Set ${r.facilityName} status to PENDING`);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                            r.authorizationStatus === 'PENDING' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-amber-700'
                          }`}
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => {
                            setRecyclers((prev) => prev.map((rc) => (rc._id === r._id ? { ...rc, authorizationStatus: 'UNAUTHORIZED' } : rc)));
                            showAdminToast(`Set ${r.facilityName} status to REVOKED`);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                            r.authorizationStatus === 'UNAUTHORIZED' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:text-red-700'
                          }`}
                        >
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-VIEW 3: MARKET PRICE TRENDS */}
          {adminSubView === 'prices' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Market Price Trends & Regional Benchmarks</h3>
                  <p className="text-xs text-slate-500">6-Month historical commodity curves comparing Nagpur vs Mumbai</p>
                </div>

                {/* Region toggle */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  {(['BOTH', 'Nagpur', 'Mumbai'] as const).map((reg) => (
                    <button
                      key={reg}
                      onClick={() => setAdminPriceRegion(reg)}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        adminPriceRegion === reg ? 'bg-white text-slate-900 shadow-2xs font-extrabold' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {reg === 'BOTH' ? 'Both Hubs' : reg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {SEED_CATEGORIES.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setAdminPriceCat(cat._id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      adminPriceCat === cat._id ? 'bg-amber-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat.name} ({cat.unit})
                  </button>
                ))}
              </div>

              {/* Responsive SVG Chart */}
              {(() => {
                const trend = HISTORICAL_PRICE_TRENDS[adminPriceCat] || HISTORICAL_PRICE_TRENDS.cat_pcb;
                const minVal = Math.min(...trend.nagpur, ...trend.mumbai) * 0.85;
                const maxVal = Math.max(...trend.nagpur, ...trend.mumbai) * 1.15;
                const cWidth = 600;
                const cHeight = 240;
                const pX = 50;
                const pY = 35;

                const getPtX = (i: number) => pX + (i / (trend.months.length - 1)) * (cWidth - pX * 2);
                const getPtY = (v: number) => cHeight - pY - ((v - minVal) / (maxVal - minVal)) * (cHeight - pY * 2);

                const ngpPath = trend.nagpur.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getPtX(i)} ${getPtY(v)}`).join(' ');
                const mumPath = trend.mumbai.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getPtX(i)} ${getPtY(v)}`).join(' ');

                return (
                  <div className="overflow-x-auto">
                    <div className="min-w-[580px]">
                      <svg viewBox={`0 0 ${cWidth} ${cHeight}`} className="w-full h-auto select-none">
                        {/* Horizontal Grid */}
                        {[0, 0.5, 1].map((r) => {
                          const y = cHeight - pY - r * (cHeight - pY * 2);
                          const val = Math.round(minVal + r * (maxVal - minVal));
                          return (
                            <g key={r}>
                              <line x1={pX} y1={y} x2={cWidth - pX} y2={y} stroke="#f1f5f9" strokeDasharray="4 4" />
                              <text x={pX - 10} y={y + 4} fontSize="10" fill="#94a3b8" textAnchor="end" fontWeight="600">₹{val}</text>
                            </g>
                          );
                        })}

                        {/* Months X-axis */}
                        {trend.months.map((m, i) => (
                          <text key={m} x={getPtX(i)} y={cHeight - pY + 18} fontSize="11" fill="#64748b" textAnchor="middle" fontWeight="600">
                            {m}
                          </text>
                        ))}

                        {/* Nagpur Line (Orange) */}
                        {(adminPriceRegion === 'BOTH' || adminPriceRegion === 'Nagpur') && (
                          <>
                            <path d={ngpPath} fill="none" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
                            {trend.nagpur.map((v, i) => (
                              <g key={`n-${i}`}>
                                <circle cx={getPtX(i)} cy={getPtY(v)} r="5" fill="#fff" stroke="#d97706" strokeWidth="2.5" />
                                <text x={getPtX(i)} y={getPtY(v) - 10} fontSize="10" fill="#b45309" textAnchor="middle" fontWeight="700">₹{v}</text>
                              </g>
                            ))}
                          </>
                        )}

                        {/* Mumbai Line (Blue) */}
                        {(adminPriceRegion === 'BOTH' || adminPriceRegion === 'Mumbai') && (
                          <>
                            <path d={mumPath} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
                            {trend.mumbai.map((v, i) => (
                              <g key={`m-${i}`}>
                                <circle cx={getPtX(i)} cy={getPtY(v)} r="5" fill="#fff" stroke="#2563eb" strokeWidth="2.5" />
                                <text x={getPtX(i)} y={getPtY(v) - 10} fontSize="10" fill="#1d4ed8" textAnchor="middle" fontWeight="700">₹{v}</text>
                              </g>
                            ))}
                          </>
                        )}
                      </svg>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                        <div className="flex items-center gap-6">
                          <span className="flex items-center gap-2 font-bold text-amber-800">
                            <span className="w-3 h-3 rounded-full bg-amber-600"></span> Nagpur Benchmark
                          </span>
                          <span className="flex items-center gap-2 font-bold text-blue-800">
                            <span className="w-3 h-3 rounded-full bg-blue-600"></span> Mumbai Benchmark
                          </span>
                        </div>
                        <span className="text-slate-400 text-[11px]">Updated daily from CPCB accredited refinery surveys</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* SUB-VIEW 4: PRICING ANOMALY ENGINE */}
          {adminSubView === 'anomalies' && (
            <div className="space-y-6">
              {/* SIH Compliance Rule Box */}
              <div className="bg-amber-50/80 rounded-3xl p-6 border border-amber-200 shadow-xs flex flex-col sm:flex-row items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                  <Gavel className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs">
                  <h3 className="font-black text-slate-900 text-sm">Regulatory Rule Engine Specification (SIH 2026 Problem Statement 26229)</h3>
                  <p className="text-slate-700">
                    To prevent unfair markdowns exploiting informal kabadiwalas, quotes that undercut prevailing regional market benchmarks by &gt;30% are automatically flagged for regulatory review:
                  </p>
                  <div className="font-mono bg-white/90 p-2.5 rounded-xl border border-amber-200 text-slate-800 font-bold text-[11px] my-1.5">
                    Flag Trigger: ((Market_Average - Recycler_Quote) / Market_Average) &gt; 0.30 (30% Discount)
                  </div>
                </div>
              </div>

              {/* Flagged Item Card */}
              <div className="bg-white rounded-3xl border border-red-300 ring-1 ring-red-100 p-6 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-black text-slate-900 text-base">GreenEarth SafeRecycle Plant</span>
                        <span className="font-mono text-xs text-slate-500">(SPCB/NAG/EW-9912)</span>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-300">
                          -39.1% Below Market
                        </span>
                      </div>
                      <div className="text-slate-600 text-xs mt-1">
                        Category: <strong className="text-slate-900">Cables</strong> • Location: <strong className="text-slate-900">Nagpur</strong> • Quoting: <strong className="text-red-700 font-mono">₹390/kg</strong> vs Benchmark: <strong className="text-slate-700 font-mono">₹640/kg</strong>
                      </div>
                    </div>
                  </div>

                  <div>
                    {adjudicatedAnomalies['pr_ano_cables'] === 'SHOW_CAUSE' ? (
                      <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300">
                        Notice Dispatched
                      </span>
                    ) : adjudicatedAnomalies['pr_ano_cables'] === 'SUSPENDED' ? (
                      <span className="px-3 py-1 rounded-xl bg-red-100 text-red-900 font-bold text-xs border border-red-300">
                        License Suspended
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-xl bg-red-600 text-white font-black text-xs animate-pulse">
                        Requires Review
                      </span>
                    )}
                  </div>
                </div>

                {/* Dossier details */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Pricing Deficit</span>
                    <span className="text-lg font-black text-red-700 mt-0.5 block">-₹250/kg (-39.1%)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Suspected Rationale</span>
                    <span className="font-bold text-slate-800 mt-0.5 block">Informal margin capture</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Recommended Enforcement</span>
                    <span className="font-bold text-amber-800 mt-0.5 block">CPCB Rule 13 Audit</span>
                  </div>
                </div>

                {/* Regulatory Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-700">CPCB Regulatory Adjudication:</span>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => {
                        setAdjudicatedAnomalies((p) => ({ ...p, pr_ano_cables: 'SHOW_CAUSE' }));
                        showAdminToast('Show-Cause notice issued to GreenEarth SafeRecycle under CPCB Rule 13.');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <FileWarning className="w-3.5 h-3.5" />
                      <span>Issue Show-Cause Notice</span>
                    </button>

                    <button
                      onClick={() => {
                        setAdjudicatedAnomalies((p) => ({ ...p, pr_ano_cables: 'SUSPENDED' }));
                        setRecyclers((prev) => prev.map((r) => (r._id === 'rec_greenearth' ? { ...r, authorizationStatus: 'UNAUTHORIZED' } : r)));
                        showAdminToast('GreenEarth SafeRecycle license revoked. Intake quote disabled.');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Suspend Recycler License</span>
                    </button>

                    <button
                      onClick={() => {
                        setAdjudicatedAnomalies((p) => ({ ...p, pr_ano_cables: 'DISMISSED' }));
                        showAdminToast('Anomaly dismissed as temporary lot grade discrepancy.');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
                    >
                      Dismiss (Verified)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}


      {/* Real QR Code Handover Modal using QRCodeSVG */}
      {activeQrLot && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-emerald-700">CPCB Handover QR Code</span>
              <button onClick={() => setActiveQrLot(null)} className="text-slate-400 hover:text-slate-700 font-bold text-sm cursor-pointer">✕</button>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl inline-block border border-slate-200 shadow-inner">
              <QRCodeSVG
                value={JSON.stringify({
                  ref: activeQrLot.referenceId,
                  lotId: activeQrLot._id,
                  weight: activeQrLot.approxWeight,
                  status: activeQrLot.status,
                  collector: activeUser.name,
                })}
                size={180}
                level="M"
                includeMargin={true}
                className="mx-auto rounded-lg"
              />
            </div>

            <div>
              <div className="font-mono font-black text-lg text-slate-900">{activeQrLot.referenceId}</div>
              <div className="text-xs text-slate-500 mt-0.5">Scan to verify handover at recycler dock</div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl text-left text-xs space-y-1">
              <div className="flex justify-between"><span className="text-slate-500">Approx Weight:</span><span className="font-bold text-slate-900">{activeQrLot.approxWeight} kg</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Value:</span><span className="font-bold text-emerald-800">₹{activeQrLot.estimatedValue}</span></div>
            </div>

            <button
              onClick={() => setActiveQrLot(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs cursor-pointer"
            >
              Close / बंद करें
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
