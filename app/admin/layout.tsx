import React from "react";
import { AuthGuard } from "@/components/AuthGuard";
import { DashboardHeader } from "@/components/DashboardHeader";

export default function AdminLayout({ children }: { children?: React.ReactNode }) {
  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
        <DashboardHeader
          currentRole="ADMIN"
          roleTitle="Regulatory Oversight"
          badgeClass="bg-amber-100 text-amber-800 border-amber-200"
        />
        <main className="flex-1">{children}</main>
      </div>
    </AuthGuard>
  );
}
