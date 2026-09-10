import Link from "next/link";
import { Truck, Factory, ShieldCheck, ArrowRight, Layers, Sparkles } from "lucide-react";

export default function HomePage() {
  const roles = [
    {
      id: "kabadiwala",
      title: "Kabadiwala",
      subtitle: "इलेक्ट्रॉनिक कचरा संग्राहक / Informal Collector",
      description:
        "Instant scrap value estimates, voice & camera lot creation, direct matchmaking with authorized recyclers, and digital ledger.",
      href: "/login/kabadiwala",
      icon: Truck,
      color: "from-emerald-600 to-teal-700",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      accentBorder: "hover:border-emerald-500",
      btnClass: "bg-emerald-600 hover:bg-emerald-700 text-white",
      tag: "Collector App Portal",
    },
    {
      id: "recycler",
      title: "Recycler",
      subtitle: "अधिकृत रिसाइकलर / Authorized Facility",
      description:
        "Inspect matched lots, verify digital handovers via QR scan, adjust final quotes, manage live purchase rates, and dispatch pickups.",
      href: "/login/recycler",
      icon: Factory,
      color: "from-blue-600 to-indigo-700",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      accentBorder: "hover:border-blue-500",
      btnClass: "bg-blue-600 hover:bg-blue-700 text-white",
      tag: "Facility Dashboard",
    },
    {
      id: "admin",
      title: "Govt Admin",
      subtitle: "नियामक एवं सीपीसीबी / SPCB & CPCB Oversight",
      description:
        "Monitor aggregate e-waste diversion, track formal chain-of-custody, inspect recycler licenses, and detect market pricing anomalies.",
      href: "/login/admin",
      icon: ShieldCheck,
      color: "from-amber-600 to-orange-700",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      accentBorder: "hover:border-amber-500",
      btnClass: "bg-amber-600 hover:bg-amber-700 text-white",
      tag: "Regulatory Telemetry",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col justify-between p-6 sm:p-10 max-w-6xl mx-auto">
      {/* Top Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Scrap Setu</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-semibold border border-teal-200">
                Phase 0 Scaffold
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Aether — Kabadiwala Connect • Smart India Hackathon 2026 (PS 26229)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Real-time Decentralized E-Waste Bridge</span>
        </div>
      </header>

      {/* Hero Intro */}
      <section className="py-10 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Select Your Role to Enter Platform
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600">
          Scrap Setu bridges informal grassroot collectors with authorized CPCB/SPCB recyclers
          through fair pricing, digital traceability, and regulatory compliance.
        </p>
      </section>

      {/* 3 Role Selection Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <div
              key={role.id}
              className={`bg-white rounded-2xl p-6 border border-slate-200 shadow-sm transition-all duration-200 hover:shadow-lg ${role.accentBorder} flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${role.badgeColor}`}>
                    {role.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                  {role.title}
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-0.5 mb-3">{role.subtitle}</p>
                <p className="text-xs leading-relaxed text-slate-600">{role.description}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link
                  href={role.href}
                  className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-98 ${role.btnClass}`}
                >
                  <span>Enter as {role.title}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </section>

      {/* Footer info */}
      <footer className="pt-10 pb-4 text-center text-xs text-slate-500 border-t border-slate-200 mt-8">
        <p>
          Scrap Setu Hackathon Architecture • Stack: Next.js 15, TypeScript, Tailwind CSS, Convex, Zustand.
        </p>
      </footer>
    </main>
  );
}
