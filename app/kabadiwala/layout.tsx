import React from "react";
import { AuthGuard } from "@/components/AuthGuard";
import { DashboardHeader } from "@/components/DashboardHeader";

export default function KabadiwalaLayout({ children }: { children?: React.ReactNode }) {
  return (
    <AuthGuard requiredRole="KABADIWALA">
      <div className="min-h-screen flex flex-col bg-[#F8FAF9]">
        <DashboardHeader
          currentRole="KABADIWALA"
          roleTitle="Collector Portal"
          badgeClass="bg-emerald-100 text-emerald-800 border-emerald-200"
        />
        <main className="flex-1">{children}</main>
      </div>
    </AuthGuard>
  );
}
