export interface MockUser {
  _id: string;
  name: string;
  phone: string;
  role: "KABADIWALA" | "RECYCLER" | "ADMIN";
  preferredLanguage: "HINDI" | "MARATHI" | "ENGLISH";
  location: string;
  createdAt: number;
}

export interface MockRecycler {
  _id: string;
  userId: string;
  facilityName: string;
  location: string;
  materialsAccepted: string[];
  authorizationStatus: "AUTHORIZED" | "PENDING" | "UNAUTHORIZED";
  authorizationNumber: string;
  contactDetails: string;
  serviceArea: string;
  pickupAvailable: boolean;
}

export interface MockMaterialCategory {
  _id: string;
  name: string;
  unit: string;
  hazardNotes: string;
}

export interface MockPriceRate {
  _id: string;
  materialCategoryId: string;
  recyclerId?: string;
  location: string;
  pricePerUnit: number;
  date: string;
  source: "MARKET_AVERAGE" | "RECYCLER_QUOTE";
}

export interface MockLot {
  _id: string;
  collectorId: string;
  materialCategoryId: string;
  photoUrl: string;
  approxWeight: number;
  estimatedValue: number;
  quotedPrice: number;
  finalSaleValue?: number;
  status: "DRAFT" | "MATCHED" | "HANDED_OVER" | "CONFIRMED" | "PAID";
  recyclerId?: string;
  collectionLocation: string;
  gpsLat?: number;
  gpsLng?: number;
  referenceId: string;
  createdAt: number;
  handoverAt?: number;
  confirmedAt?: number;
}

export interface MockTransaction {
  _id: string;
  lotId: string;
  amount: number;
  paymentStatus: "PENDING" | "PAID";
  paymentMethod: "CASH" | "DIGITAL";
  createdAt: number;
}

const now = Date.now();

export const SEED_USERS: MockUser[] = [
  {
    _id: "user_ramesh",
    name: "Ramesh Kumar",
    phone: "9876543210",
    role: "KABADIWALA",
    preferredLanguage: "HINDI",
    location: "Nagpur, Maharashtra",
    createdAt: now - 86400000 * 14,
  },
  {
    _id: "user_suresh",
    name: "Suresh Patil",
    phone: "9822334455",
    role: "KABADIWALA",
    preferredLanguage: "MARATHI",
    location: "Nagpur, Maharashtra",
    createdAt: now - 86400000 * 10,
  },
  {
    _id: "user_mohan",
    name: "Mohan Sharma",
    phone: "9811223344",
    role: "KABADIWALA",
    preferredLanguage: "ENGLISH",
    location: "Mumbai, Maharashtra",
    createdAt: now - 86400000 * 5,
  },
  {
    _id: "user_admin",
    name: "Dr. Anjali Mehta",
    phone: "9800000001",
    role: "ADMIN",
    preferredLanguage: "ENGLISH",
    location: "SPCB Regional HQ, Maharashtra",
    createdAt: now - 86400000 * 30,
  },
  {
    _id: "user_rec_1",
    name: "Rajesh Joshi (EcoRecycle)",
    phone: "9899001122",
    role: "RECYCLER",
    preferredLanguage: "ENGLISH",
    location: "Hingna MIDC, Nagpur",
    createdAt: now - 86400000 * 20,
  },
  {
    _id: "user_rec_2",
    name: "Arvind Deshmukh (Vidarbha CleanMetals)",
    phone: "9877002233",
    role: "RECYCLER",
    preferredLanguage: "MARATHI",
    location: "Wadi Industrial Area, Nagpur",
    createdAt: now - 86400000 * 18,
  },
  {
    _id: "user_rec_3",
    name: "Vikrant Shah (Maharashtra E-Waste)",
    phone: "9866003344",
    role: "RECYCLER",
    preferredLanguage: "ENGLISH",
    location: "Taloja MIDC, Mumbai",
    createdAt: now - 86400000 * 15,
  },
];

export const SEED_RECYCLERS: MockRecycler[] = [
  {
    _id: "rec_ecorecycle",
    userId: "user_rec_1",
    facilityName: "EcoRecycle India Pvt. Ltd.",
    location: "Hingna MIDC, Nagpur",
    materialsAccepted: ["PCB", "Cables", "Batteries", "Mixed Plastics"],
    authorizationStatus: "AUTHORIZED",
    authorizationNumber: "CPCB/EWR/MH-8821",
    contactDetails: "+91 712 284 9911 | ops@ecorecycle.in",
    serviceArea: "Vidarbha & Central India",
    pickupAvailable: true,
  },
  {
    _id: "rec_vidarbha",
    userId: "user_rec_2",
    facilityName: "Vidarbha CleanMetals Refiners",
    location: "Wadi Industrial Area, Nagpur",
    materialsAccepted: ["PCB", "Cables", "Motors/Magnets"],
    authorizationStatus: "AUTHORIZED",
    authorizationNumber: "SPCB/NAG/EW-4491",
    contactDetails: "+91 712 278 1200 | contact@vidarbhametals.com",
    serviceArea: "Nagpur Urban & Semi-urban",
    pickupAvailable: true,
  },
  {
    _id: "rec_maharashtra",
    userId: "user_rec_3",
    facilityName: "Maharashtra E-Waste Solutions Ltd.",
    location: "Taloja MIDC, Navi Mumbai",
    materialsAccepted: ["PCB", "CRT", "LCD Panel", "Batteries", "Mixed Plastics"],
    authorizationStatus: "AUTHORIZED",
    authorizationNumber: "MPCB/EWR/MUM-1029",
    contactDetails: "+91 22 2741 8000 | intake@maharashtraewaste.org",
    serviceArea: "Mumbai Metropolitan Region & Pune",
    pickupAvailable: false,
  },
  {
    _id: "rec_greenearth",
    userId: "user_rec_1",
    facilityName: "GreenEarth SafeRecycle Plant",
    location: "Butibori Industrial Zone, Nagpur",
    materialsAccepted: ["CRT", "Cables", "Mixed Plastics"],
    authorizationStatus: "PENDING",
    authorizationNumber: "SPCB/NAG/EW-9912",
    contactDetails: "+91 712 291 3344 | compliance@greenearthsafe.in",
    serviceArea: "Nagpur Rural",
    pickupAvailable: false,
  },
];

export const SEED_CATEGORIES: MockMaterialCategory[] = [
  {
    _id: "cat_pcb",
    name: "PCB",
    unit: "kg",
    hazardNotes: "Contains heavy metals (lead, cadmium, beryllium). Never burn open; strip mechanically under ventilation.",
  },
  {
    _id: "cat_crt",
    name: "CRT",
    unit: "piece",
    hazardNotes: "High vacuum implosion hazard. Funnel glass contains up to 20% toxic lead oxide. Keep funnel intact.",
  },
  {
    _id: "cat_cables",
    name: "Cables",
    unit: "kg",
    hazardNotes: "PVC insulation releases carcinogenic dioxins & furans if burned. Mechanically granulate or peel only.",
  },
  {
    _id: "cat_batteries",
    name: "Batteries",
    unit: "kg",
    hazardNotes: "Thermal runaway, short-circuit, and fire hazard. Insulate terminal contacts with tape. Never puncture.",
  },
  {
    _id: "cat_lcd",
    name: "LCD Panel",
    unit: "piece",
    hazardNotes: "CCFL backlights contain toxic mercury vapor. Do not crush tubes; wear nitrile gloves.",
  },
  {
    _id: "cat_motors",
    name: "Motors/Magnets",
    unit: "kg",
    hazardNotes: "High-strength neodymium pinch hazard. Fine magnetic dust is flammable when ground.",
  },
  {
    _id: "cat_plastics",
    name: "Mixed Plastics",
    unit: "kg",
    hazardNotes: "Flame retardant plastics (ABS-FR/HIPS) release brominated toxins. Must be routed to authorized thermal units.",
  },
];

const today = new Date().toISOString().split("T")[0];

export const SEED_PRICE_RATES: MockPriceRate[] = [
  // Nagpur Market Averages
  { _id: "pr_ngp_pcb", materialCategoryId: "cat_pcb", location: "Nagpur", pricePerUnit: 280, date: today, source: "MARKET_AVERAGE" },
  { _id: "pr_ngp_cables", materialCategoryId: "cat_cables", location: "Nagpur", pricePerUnit: 640, date: today, source: "MARKET_AVERAGE" },
  { _id: "pr_ngp_batteries", materialCategoryId: "cat_batteries", location: "Nagpur", pricePerUnit: 290, date: today, source: "MARKET_AVERAGE" },
  { _id: "pr_ngp_crt", materialCategoryId: "cat_crt", location: "Nagpur", pricePerUnit: 150, date: today, source: "MARKET_AVERAGE" },
  { _id: "pr_ngp_lcd", materialCategoryId: "cat_lcd", location: "Nagpur", pricePerUnit: 120, date: today, source: "MARKET_AVERAGE" },
  { _id: "pr_ngp_motors", materialCategoryId: "cat_motors", location: "Nagpur", pricePerUnit: 95, date: today, source: "MARKET_AVERAGE" },
  { _id: "pr_ngp_plastics", materialCategoryId: "cat_plastics", location: "Nagpur", pricePerUnit: 18, date: today, source: "MARKET_AVERAGE" },

  // Mumbai Market Averages
  { _id: "pr_mum_pcb", materialCategoryId: "cat_pcb", location: "Mumbai", pricePerUnit: 310, date: today, source: "MARKET_AVERAGE" },
  { _id: "pr_mum_cables", materialCategoryId: "cat_cables", location: "Mumbai", pricePerUnit: 680, date: today, source: "MARKET_AVERAGE" },
  { _id: "pr_mum_batteries", materialCategoryId: "cat_batteries", location: "Mumbai", pricePerUnit: 320, date: today, source: "MARKET_AVERAGE" },
  { _id: "pr_mum_crt", materialCategoryId: "cat_crt", location: "Mumbai", pricePerUnit: 165, date: today, source: "MARKET_AVERAGE" },
  { _id: "pr_mum_lcd", materialCategoryId: "cat_lcd", location: "Mumbai", pricePerUnit: 135, date: today, source: "MARKET_AVERAGE" },
  { _id: "pr_mum_motors", materialCategoryId: "cat_motors", location: "Mumbai", pricePerUnit: 105, date: today, source: "MARKET_AVERAGE" },
  { _id: "pr_mum_plastics", materialCategoryId: "cat_plastics", location: "Mumbai", pricePerUnit: 22, date: today, source: "MARKET_AVERAGE" },

  // Recycler Quotes
  { _id: "pr_eco_pcb", materialCategoryId: "cat_pcb", recyclerId: "rec_ecorecycle", location: "Nagpur", pricePerUnit: 305, date: today, source: "RECYCLER_QUOTE" },
  { _id: "pr_eco_cables", materialCategoryId: "cat_cables", recyclerId: "rec_ecorecycle", location: "Nagpur", pricePerUnit: 670, date: today, source: "RECYCLER_QUOTE" },
  { _id: "pr_eco_batteries", materialCategoryId: "cat_batteries", recyclerId: "rec_ecorecycle", location: "Nagpur", pricePerUnit: 300, date: today, source: "RECYCLER_QUOTE" },

  { _id: "pr_vid_pcb", materialCategoryId: "cat_pcb", recyclerId: "rec_vidarbha", location: "Nagpur", pricePerUnit: 290, date: today, source: "RECYCLER_QUOTE" },
  { _id: "pr_vid_cables", materialCategoryId: "cat_cables", recyclerId: "rec_vidarbha", location: "Nagpur", pricePerUnit: 690, date: today, source: "RECYCLER_QUOTE" },
  { _id: "pr_vid_motors", materialCategoryId: "cat_motors", recyclerId: "rec_vidarbha", location: "Nagpur", pricePerUnit: 100, date: today, source: "RECYCLER_QUOTE" },

  { _id: "pr_mah_pcb", materialCategoryId: "cat_pcb", recyclerId: "rec_maharashtra", location: "Mumbai", pricePerUnit: 325, date: today, source: "RECYCLER_QUOTE" },
  { _id: "pr_mah_crt", materialCategoryId: "cat_crt", recyclerId: "rec_maharashtra", location: "Mumbai", pricePerUnit: 170, date: today, source: "RECYCLER_QUOTE" },

  // Below-market rate anomaly (~39% below market avg of 640)
  { _id: "pr_ano_cables", materialCategoryId: "cat_cables", recyclerId: "rec_greenearth", location: "Nagpur", pricePerUnit: 390, date: today, source: "RECYCLER_QUOTE" },
];

export const SEED_LOTS: MockLot[] = [
  {
    _id: "lot_1",
    collectorId: "user_ramesh",
    materialCategoryId: "cat_pcb",
    photoUrl: "/images/lots/pcb-sample-1.jpg",
    approxWeight: 18.5,
    estimatedValue: 5180,
    quotedPrice: 5180,
    status: "DRAFT",
    collectionLocation: "Itwari Market, Nagpur",
    gpsLat: 21.1458,
    gpsLng: 79.0882,
    referenceId: "SS-2026-00101",
    createdAt: now - 3600000 * 3,
  },
  {
    _id: "lot_2",
    collectorId: "user_ramesh",
    materialCategoryId: "cat_cables",
    photoUrl: "/images/lots/cables-sample-1.jpg",
    approxWeight: 14.0,
    estimatedValue: 8960,
    quotedPrice: 9380,
    recyclerId: "rec_ecorecycle",
    status: "MATCHED",
    collectionLocation: "Dharampeth, Nagpur",
    gpsLat: 21.1402,
    gpsLng: 79.0628,
    referenceId: "SS-2026-00102",
    createdAt: now - 3600000 * 12,
  },
  {
    _id: "lot_3",
    collectorId: "user_suresh",
    materialCategoryId: "cat_batteries",
    photoUrl: "/images/lots/battery-sample-1.jpg",
    approxWeight: 8.0,
    estimatedValue: 2320,
    quotedPrice: 2400,
    recyclerId: "rec_ecorecycle",
    status: "HANDED_OVER",
    collectionLocation: "Sitabuldi, Nagpur",
    gpsLat: 21.1444,
    gpsLng: 79.0831,
    referenceId: "SS-2026-00103",
    createdAt: now - 3600000 * 24,
    handoverAt: now - 3600000 * 6,
  },
  {
    _id: "lot_4",
    collectorId: "user_suresh",
    materialCategoryId: "cat_motors",
    photoUrl: "/images/lots/motors-sample-1.jpg",
    approxWeight: 22.0,
    estimatedValue: 2090,
    quotedPrice: 2200,
    finalSaleValue: 2200,
    recyclerId: "rec_vidarbha",
    status: "CONFIRMED",
    collectionLocation: "Gandhibagh, Nagpur",
    gpsLat: 21.1512,
    gpsLng: 79.0991,
    referenceId: "SS-2026-00104",
    createdAt: now - 86400000 * 2,
    handoverAt: now - 86400000 * 1.5,
    confirmedAt: now - 86400000 * 1,
  },
  {
    _id: "lot_5",
    collectorId: "user_mohan",
    materialCategoryId: "cat_crt",
    photoUrl: "/images/lots/crt-sample-1.jpg",
    approxWeight: 4.0,
    estimatedValue: 660,
    quotedPrice: 680,
    finalSaleValue: 680,
    recyclerId: "rec_maharashtra",
    status: "PAID",
    collectionLocation: "Kurla West, Mumbai",
    gpsLat: 19.0657,
    gpsLng: 72.8794,
    referenceId: "SS-2026-00105",
    createdAt: now - 86400000 * 4,
    handoverAt: now - 86400000 * 3,
    confirmedAt: now - 86400000 * 2.5,
  },
];

export const SEED_TRANSACTIONS: MockTransaction[] = [
  {
    _id: "tx_1",
    lotId: "lot_4",
    amount: 2200,
    paymentStatus: "PAID",
    paymentMethod: "DIGITAL",
    createdAt: now - 86400000 * 1,
  },
  {
    _id: "tx_2",
    lotId: "lot_5",
    amount: 680,
    paymentStatus: "PAID",
    paymentMethod: "CASH",
    createdAt: now - 86400000 * 2.5,
  },
];

export const HISTORICAL_PRICE_TRENDS: Record<
  string,
  {
    unit: string;
    months: string[];
    nagpur: number[];
    mumbai: number[];
  }
> = {
  cat_pcb: {
    unit: "₹/kg",
    months: ["Oct '25", "Nov '25", "Dec '25", "Jan '26", "Feb '26", "Mar '26"],
    nagpur: [250, 255, 265, 270, 275, 280],
    mumbai: [275, 285, 290, 300, 305, 310],
  },
  cat_cables: {
    unit: "₹/kg",
    months: ["Oct '25", "Nov '25", "Dec '25", "Jan '26", "Feb '26", "Mar '26"],
    nagpur: [590, 605, 615, 620, 635, 640],
    mumbai: [620, 635, 650, 660, 670, 680],
  },
  cat_batteries: {
    unit: "₹/kg",
    months: ["Oct '25", "Nov '25", "Dec '25", "Jan '26", "Feb '26", "Mar '26"],
    nagpur: [240, 250, 260, 275, 285, 290],
    mumbai: [260, 270, 285, 295, 310, 320],
  },
  cat_crt: {
    unit: "₹/pc",
    months: ["Oct '25", "Nov '25", "Dec '25", "Jan '26", "Feb '26", "Mar '26"],
    nagpur: [130, 135, 140, 145, 145, 150],
    mumbai: [145, 150, 155, 160, 160, 165],
  },
  cat_lcd: {
    unit: "₹/pc",
    months: ["Oct '25", "Nov '25", "Dec '25", "Jan '26", "Feb '26", "Mar '26"],
    nagpur: [100, 105, 110, 115, 118, 120],
    mumbai: [115, 120, 125, 128, 132, 135],
  },
  cat_motors: {
    unit: "₹/kg",
    months: ["Oct '25", "Nov '25", "Dec '25", "Jan '26", "Feb '26", "Mar '26"],
    nagpur: [80, 82, 85, 88, 92, 95],
    mumbai: [90, 92, 95, 98, 102, 105],
  },
  cat_plastics: {
    unit: "₹/kg",
    months: ["Oct '25", "Nov '25", "Dec '25", "Jan '26", "Feb '26", "Mar '26"],
    nagpur: [14, 15, 16, 16, 17, 18],
    mumbai: [17, 18, 19, 20, 21, 22],
  },
};

