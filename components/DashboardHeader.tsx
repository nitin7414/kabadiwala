"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Layers, LogOut, Globe, User } from "lucide-react";
import { Role, Language, useAppStore } from "@/store/useAppStore";
import { clearClientSession } from "@/lib/auth";

interface DashboardHeaderProps {
  currentRole: Role;
  roleTitle: string;
  badgeClass?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  currentRole,
  roleTitle,
  badgeClass = "bg-teal-100 text-teal-800 border-teal-200",
}) => {
  const router = useRouter();
  const { user, language, setLanguage, logout } = useAppStore();

  const handleLogout = () => {
    clearClientSession();
    logout();
    router.push("/");
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand + Role Badge */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-xs">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-base">
                Scrap Setu
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeClass}`}>
                {roleTitle}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Kabadiwala Connect • SIH 2026
            </p>
          </div>
        </div>

        {/* Right: Language toggle + User Info + Logout */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language Toggle */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setLanguage("ENGLISH")}
              className={`px-2 py-1 rounded-md transition-colors ${
                language === "ENGLISH" ? "bg-white text-slate-900 shadow-xs" : "hover:text-slate-900"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("HINDI")}
              className={`px-2 py-1 rounded-md transition-colors ${
                language === "HINDI" ? "bg-white text-slate-900 shadow-xs" : "hover:text-slate-900"
              }`}
            >
              हिं
            </button>
            <button
              onClick={() => setLanguage("MARATHI")}
              className={`px-2 py-1 rounded-md transition-colors ${
                language === "MARATHI" ? "bg-white text-slate-900 shadow-xs" : "hover:text-slate-900"
              }`}
            >
              मरा
            </button>
          </div>

          {/* User badge */}
          {user && (
            <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-800 leading-tight">{user.name}</div>
                <div className="text-[10px] text-slate-500">{user.location}</div>
              </div>
            </div>
          )}

          {/* Logout Action */}
          <button
            onClick={handleLogout}
            title="Log out"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:text-red-700 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
