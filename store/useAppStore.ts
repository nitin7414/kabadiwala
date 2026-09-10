import { create } from "zustand";
import {
  MockLot,
  SEED_LOTS,
  MockPriceRate,
  SEED_PRICE_RATES,
  MockTransaction,
  SEED_TRANSACTIONS,
  MockRecycler,
  SEED_RECYCLERS,
} from "@/lib/mockSeedData";

export type Role = "KABADIWALA" | "RECYCLER" | "ADMIN";
export type Language = "HINDI" | "MARATHI" | "ENGLISH";

export interface UserSession {
  id: string;
  name: string;
  phone: string;
  role: Role;
  preferredLanguage: Language;
  location: string;
}

export interface LotDraft {
  materialCategoryId?: string;
  categoryName?: string;
  approxWeight: number;
  unit: string;
  estimatedValue: number;
  quotedPrice: number;
  photoUrl?: string;
  collectionLocation: string;
}

interface AppState {
  user: UserSession | null;
  selectedRole: Role | null;
  language: Language;
  lotDraft: LotDraft;
  lots: MockLot[];
  priceRates: MockPriceRate[];
  transactions: MockTransaction[];
  recyclers: MockRecycler[];
  setUser: (user: UserSession | null) => void;
  setSelectedRole: (role: Role | null) => void;
  setLanguage: (lang: Language) => void;
  updateLotDraft: (partial: Partial<LotDraft>) => void;
  resetLotDraft: () => void;
  addLot: (lot: MockLot) => void;
  updateLot: (lotId: string, partial: Partial<MockLot>) => void;
  confirmLotHandover: (lotId: string, finalSaleValue: number, paymentMethod?: "CASH" | "DIGITAL") => void;
  updatePriceRate: (rateId: string, newPrice: number) => void;
  updateRecyclerStatus: (recyclerId: string, status: "AUTHORIZED" | "PENDING" | "UNAUTHORIZED") => void;
  logout: () => void;
}

const initialLotDraft: LotDraft = {
  materialCategoryId: "cat_pcb",
  categoryName: "PCB",
  approxWeight: 10,
  unit: "kg",
  estimatedValue: 2800,
  quotedPrice: 2800,
  photoUrl: "/images/lots/pcb-sample-1.jpg",
  collectionLocation: "Nagpur, Maharashtra",
};

export const useAppStore = create<AppState>((set) => ({
  user: null,
  selectedRole: null,
  language: "ENGLISH",
  lotDraft: initialLotDraft,
  lots: SEED_LOTS,
  priceRates: SEED_PRICE_RATES,
  transactions: SEED_TRANSACTIONS,
  recyclers: SEED_RECYCLERS,

  setUser: (user) => set({ user, selectedRole: user ? user.role : null }),
  setSelectedRole: (role) => set({ selectedRole: role }),
  setLanguage: (language) => set({ language }),
  updateLotDraft: (partial) =>
    set((state) => ({ lotDraft: { ...state.lotDraft, ...partial } })),
  resetLotDraft: () => set({ lotDraft: initialLotDraft }),
  addLot: (newLot) => set((state) => ({ lots: [newLot, ...state.lots] })),
  updateLot: (lotId, partial) =>
    set((state) => ({
      lots: state.lots.map((l) => (l._id === lotId ? { ...l, ...partial } : l)),
    })),
  confirmLotHandover: (lotId, finalSaleValue, paymentMethod = "DIGITAL") => {
    const now = Date.now();
    set((state) => {
      const updatedLots = state.lots.map((l) =>
        l._id === lotId
          ? {
              ...l,
              status: "CONFIRMED" as const,
              confirmedAt: now,
              finalSaleValue,
            }
          : l
      );

      const newTx: MockTransaction = {
        _id: `tx_${now}`,
        lotId,
        amount: finalSaleValue,
        paymentStatus: "PAID",
        paymentMethod,
        createdAt: now,
      };

      return {
        lots: updatedLots,
        transactions: [newTx, ...state.transactions],
      };
    });
  },
  updatePriceRate: (rateId, newPrice) =>
    set((state) => ({
      priceRates: state.priceRates.map((pr) =>
        pr._id === rateId ? { ...pr, pricePerUnit: newPrice } : pr
      ),
    })),
  updateRecyclerStatus: (recyclerId, status) =>
    set((state) => ({
      recyclers: state.recyclers.map((r) =>
        r._id === recyclerId ? { ...r, authorizationStatus: status } : r
      ),
    })),
  logout: () => set({ user: null, selectedRole: null, lotDraft: initialLotDraft }),
}));
