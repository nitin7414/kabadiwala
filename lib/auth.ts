import { SEED_USERS, MockUser } from "./mockSeedData";
import { Role } from "@/store/useAppStore";

export const AUTH_COOKIE_NAME = "scrap_setu_session";

export interface AuthSession {
  userId: string;
  name: string;
  phone: string;
  role: Role;
  location: string;
}

// Client-side cookie helpers
export function setClientSession(session: AuthSession): void {
  if (typeof window === "undefined") return;
  const value = encodeURIComponent(JSON.stringify(session));
  document.cookie = `${AUTH_COOKIE_NAME}=${value}; path=/; max-age=86400; SameSite=Lax`;
  localStorage.setItem(AUTH_COOKIE_NAME, JSON.stringify(session));
}

export function getClientSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  // Try cookie first
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${AUTH_COOKIE_NAME}=`));

  if (match) {
    try {
      const data = decodeURIComponent(match.split("=")[1]);
      return JSON.parse(data) as AuthSession;
    } catch {
      // ignore JSON parse error
    }
  }

  // Fallback to localStorage
  const local = localStorage.getItem(AUTH_COOKIE_NAME);
  if (local) {
    try {
      return JSON.parse(local) as AuthSession;
    } catch {
      // ignore
    }
  }

  return null;
}

export function clearClientSession(): void {
  if (typeof window === "undefined") return;
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
  localStorage.removeItem(AUTH_COOKIE_NAME);
}

// Demo user lookup or creation
export function loginOrRegisterDemoUser(name: string, phone: string, role: Role): AuthSession {
  const cleanPhone = phone.trim();
  const existing = SEED_USERS.find((u) => u.phone === cleanPhone);

  if (existing) {
    return {
      userId: existing._id,
      name: existing.name,
      phone: existing.phone,
      role: existing.role,
      location: existing.location,
    };
  }

  // Auto-create lightweight demo user session
  return {
    userId: `user_${Date.now()}`,
    name: name.trim() || `Demo ${role}`,
    phone: cleanPhone || "9999999999",
    role: role,
    location: "Nagpur, Maharashtra",
  };
}
