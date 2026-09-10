"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Truck, Factory, ShieldCheck, ArrowRight, ArrowLeft, User, Phone, Sparkles, CheckCircle } from "lucide-react";
import { Role, useAppStore } from "@/store/useAppStore";
import { setClientSession, loginOrRegisterDemoUser } from "@/lib/auth";
import { SEED_USERS } from "@/lib/mockSeedData";

const ROLE_METADATA: Record<
  string,
  {
    role: Role;
    title: string;
    subtitle: string;
    icon: typeof Truck;
    color: string;
    bgGradient: string;
    btnClass: string;
    sampleUsers: { name: string; phone: string; note: string }[];
  }
> = {
  kabadiwala: {
    role: "KABADIWALA",
    title: "Kabadiwala Portal",
    subtitle: "इलेक्ट्रॉनिक कचरा संग्राहक लॉगिन",
    icon: Truck,
    color: "text-emerald-700",
    bgGradient: "from-emerald-600 to-teal-700",
    btnClass: "bg-emerald-600 hover:bg-emerald-700 text-white",
    sampleUsers: [
      { name: "Ramesh Kumar", phone: "9876543210", note: "Nagpur • Hindi speaker" },
      { name: "Suresh Patil", phone: "9822334455", note: "Nagpur • Marathi speaker" },
    ],
  },
  recycler: {
    role: "RECYCLER",
    title: "Authorized Recycler",
    subtitle: "अधिकृत रिसाइक्लिंग सुविधा लॉगिन",
    icon: Factory,
    color: "text-blue-700",
    bgGradient: "from-blue-600 to-indigo-700",
    btnClass: "bg-blue-600 hover:bg-blue-700 text-white",
    sampleUsers: [
      { name: "Rajesh Joshi (EcoRecycle)", phone: "9899001122", note: "Hingna MIDC • CPCB Authorized" },
      { name: "Arvind Deshmukh (Vidarbha Metals)", phone: "9877002233", note: "Wadi • SPCB Authorized" },
    ],
  },
  admin: {
    role: "ADMIN",
    title: "Government Admin",
    subtitle: "नियामक एवं सीपीसीबी निगरानी पोर्टल",
    icon: ShieldCheck,
    color: "text-amber-700",
    bgGradient: "from-amber-600 to-orange-700",
    btnClass: "bg-amber-600 hover:bg-amber-700 text-white",
    sampleUsers: [
      { name: "Dr. Anjali Mehta", phone: "9800000001", note: "SPCB Regional Headquarters" },
    ],
  },
};

export default function RoleLoginPage() {
  const params = useParams();
  const router = useRouter();
  const rawRole = (params?.role as string)?.toLowerCase() || "kabadiwala";
  const meta = ROLE_METADATA[rawRole] || ROLE_METADATA.kabadiwala;
  const setUser = useAppStore((s) => s.setUser);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill first sample user for fast demoing
  useEffect(() => {
    if (meta.sampleUsers.length > 0) {
      setName(meta.sampleUsers[0].name);
      setPhone(meta.sampleUsers[0].phone);
    }
  }, [rawRole]);

  const handleQuickFill = (userName: string, userPhone: string) => {
    setName(userName);
    setPhone(userPhone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    const session = loginOrRegisterDemoUser(name, phone, meta.role);

    // Save to client cookie and state
    setClientSession(session);
    setUser({
      id: session.userId,
      name: session.name,
      phone: session.phone,
      role: session.role,
      preferredLanguage: "ENGLISH",
      location: session.location,
    });

    // Navigate to role route
    router.push(`/${rawRole}`);
  };

  const Icon = meta.icon;

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col justify-between p-4 sm:p-8 max-w-md mx-auto">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Role Selection</span>
        </Link>

        {/* Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3.5 mb-6">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${meta.bgGradient} flex items-center justify-center text-white shadow-md`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{meta.title}</h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  Demo Auth
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">{meta.subtitle}</p>
            </div>
          </div>

          {/* Hackathon Notice Banner */}
          <div className="mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Live Demo Mode:</span> No SMS OTP required. Select a pre-seeded profile below or enter any name and phone.
            </div>
          </div>

          {/* Quick-Fill Sample Accounts */}
          <div className="mb-6">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Instant Demo Fill:
            </label>
            <div className="space-y-2">
              {meta.sampleUsers.map((su) => (
                <button
                  key={su.phone}
                  type="button"
                  onClick={() => handleQuickFill(su.name, su.phone)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                    phone === su.phone
                      ? "bg-teal-50 border-teal-500 text-teal-900 font-semibold"
                      : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div>
                    <div className="font-semibold">{su.name}</div>
                    <div className="text-[11px] text-slate-500">{su.note} • {su.phone}</div>
                  </div>
                  {phone === su.phone && <CheckCircle className="w-4 h-4 text-teal-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name / नाम
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number / फ़ोन नंबर
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-98 ${meta.btnClass} cursor-pointer mt-2`}
            >
              <span>Enter {meta.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-xs text-slate-400 py-4">
        Scrap Setu • Role-Based Demo Session (Cookie-backed)
      </div>
    </div>
  );
}
