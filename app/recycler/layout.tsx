import React from "react";
import { AuthGuard } from "@/components/AuthGuard";
import { DashboardHeader } from "@/components/DashboardHeader";

export default function RecyclerLayout({ children }: { children?: React.ReactNode }) {
  return (
    <AuthGuard requiredRole="RECYCLER">
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <DashboardHeader
          currentRole="RECYCLER"
          roleTitle="Authorized Recycler"
          badgeClass="bg-blue-100 text-blue-800 border-blue-200"
        />
        <main className="flex-1">{children}</main>
      </div>
    </AuthGuard>
  );
}
