"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Role, useAppStore } from "@/store/useAppStore";
import { getClientSession } from "@/lib/auth";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  requiredRole: Role;
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ requiredRole, children }) => {
  const router = useRouter();
  const { user, setUser } = useAppStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // 1. Check in-memory store
    if (user && user.role === requiredRole) {
      setIsChecking(false);
      return;
    }

    // 2. Check cookie / localStorage session
    const session = getClientSession();
    if (session) {
      if (session.role === requiredRole) {
        setUser({
          id: session.userId,
          name: session.name,
          phone: session.phone,
          role: session.role,
          preferredLanguage: "ENGLISH",
          location: session.location,
        });
        setIsChecking(false);
        return;
      } else {
        // Logged in with different role - redirect to role login
        const rolePath = requiredRole.toLowerCase();
        router.push(`/login/${rolePath}`);
        return;
      }
    }

    // 3. Unauthenticated - redirect to login for this role
    const rolePath = requiredRole.toLowerCase();
    router.push(`/login/${rolePath}`);
  }, [user, requiredRole, router, setUser]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#FBFBFA]">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin mb-2" />
        <p className="text-xs font-medium text-slate-500">Checking credentials...</p>
      </div>
    );
  }

  return <>{children}</>;
};
