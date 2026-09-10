import { mutation } from "./_generated/server";

export const seedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // 1. Clear existing records to ensure idempotent seeding
    const existingUsers = await ctx.db.query("users").collect();
    for (const u of existingUsers) await ctx.db.delete(u._id);

    const existingRecyclers = await ctx.db.query("recyclers").collect();
    for (const r of existingRecyclers) await ctx.db.delete(r._id);

    const existingCategories = await ctx.db.query("materialCategories").collect();
    for (const c of existingCategories) await ctx.db.delete(c._id);

    const existingRates = await ctx.db.query("priceRates").collect();
    for (const pr of existingRates) await ctx.db.delete(pr._id);

    const existingLots = await ctx.db.query("lots").collect();
    for (const l of existingLots) await ctx.db.delete(l._id);

    const existingTxs = await ctx.db.query("transactions").collect();
    for (const tx of existingTxs) await ctx.db.delete(tx._id);

    const now = Date.now();

    // 2. Seed Users
    const rameshId = await ctx.db.insert("users", {
      name: "Ramesh Kumar",
      phone: "9876543210",
      role: "KABADIWALA",
      preferredLanguage: "HINDI",
      location: "Nagpur, Maharashtra",
      createdAt: now - 86400000 * 14,
    });

    const sureshId = await ctx.db.insert("users", {
      name: "Suresh Patil",
      phone: "9822334455",
      role: "KABADIWALA",
      preferredLanguage: "MARATHI",
      location: "Nagpur, Maharashtra",
      createdAt: now - 86400000 * 10,
    });

    const mohanId = await ctx.db.insert("users", {
      name: "Mohan Sharma",
      phone: "9811223344",
      role: "KABADIWALA",
      preferredLanguage: "ENGLISH",
      location: "Mumbai, Maharashtra",
      createdAt: now - 86400000 * 5,
    });

    const adminId = await ctx.db.insert("users", {
      name: "Dr. Anjali Mehta",
      phone: "9800000001",
      role: "ADMIN",
      preferredLanguage: "ENGLISH",
      location: "SPCB Regional HQ, Maharashtra",
      createdAt: now - 86400000 * 30,
    });

    const recyclerUser1 = await ctx.db.insert("users", {
      name: "Rajesh Joshi (EcoRecycle)",
      phone: "9899001122",
      role: "RECYCLER",
      preferredLanguage: "ENGLISH",
      location: "Hingna MIDC, Nagpur",
      createdAt: now - 86400000 * 20,
    });

    const recyclerUser2 = await ctx.db.insert("users", {
      name: "Arvind Deshmukh (Vidarbha CleanMetals)",
      phone: "9877002233",
      role: "RECYCLER",
      preferredLanguage: "MARATHI",
      location: "Wadi Industrial Area, Nagpur",
      createdAt: now - 86400000 * 18,
    });

    const recyclerUser3 = await ctx.db.insert("users", {
      name: "Vikrant Shah (Maharashtra E-Waste)",
      phone: "9866003344",
      role: "RECYCLER",
      preferredLanguage: "ENGLISH",
      location: "Taloja MIDC, Mumbai",
      createdAt: now - 86400000 * 15,
    });

    // 3. Seed Recycler Facilities
    const ecoRecycleId = await ctx.db.insert("recyclers", {
      userId: recyclerUser1,
      facilityName: "EcoRecycle India Pvt. Ltd.",
      location: "Hingna MIDC, Nagpur",
      materialsAccepted: ["PCB", "Cables", "Batteries", "Mixed Plastics"],
      authorizationStatus: "AUTHORIZED",
      authorizationNumber: "CPCB/EWR/MH-8821",
      contactDetails: "+91 712 284 9911 | ops@ecorecycle.in",
      serviceArea: "Vidarbha & Central India",
      pickupAvailable: true,
    });

    const vidarbhaMetalsId = await ctx.db.insert("recyclers", {
      userId: recyclerUser2,
      facilityName: "Vidarbha CleanMetals Refiners",
      location: "Wadi Industrial Area, Nagpur",
      materialsAccepted: ["PCB", "Cables", "Motors/Magnets"],
      authorizationStatus: "AUTHORIZED",
      authorizationNumber: "SPCB/NAG/EW-4491",
      contactDetails: "+91 712 278 1200 | contact@vidarbhametals.com",
      serviceArea: "Nagpur Urban & Semi-urban",
      pickupAvailable: true,
    });

    const maharashtraEWasteId = await ctx.db.insert("recyclers", {
      userId: recyclerUser3,
      facilityName: "Maharashtra E-Waste Solutions Ltd.",
      location: "Taloja MIDC, Navi Mumbai",
      materialsAccepted: ["PCB", "CRT", "LCD Panel", "Batteries", "Mixed Plastics"],
      authorizationStatus: "AUTHORIZED",
      authorizationNumber: "MPCB/EWR/MUM-1029",
      contactDetails: "+91 22 2741 8000 | intake@maharashtraewaste.org",
      serviceArea: "Mumbai Metropolitan Region & Pune",
      pickupAvailable: false,
    });

    const greenEarthId = await ctx.db.insert("recyclers", {
      userId: recyclerUser1,
      facilityName: "GreenEarth SafeRecycle Plant",
      location: "Butibori Industrial Zone, Nagpur",
      materialsAccepted: ["CRT", "Cables", "Mixed Plastics"],
      authorizationStatus: "PENDING",
      authorizationNumber: "SPCB/NAG/EW-9912",
      contactDetails: "+91 712 291 3344 | compliance@greenearthsafe.in",
      serviceArea: "Nagpur Rural",
      pickupAvailable: false,
    });

    // 4. Seed Material Categories (7 categories with realistic hazard notes)
    const catPcb = await ctx.db.insert("materialCategories", {
      name: "PCB",
      unit: "kg",
      hazardNotes: "Contains heavy metals (lead, cadmium, beryllium). Never burn open; strip mechanically under ventilation.",
    });

    const catCrt = await ctx.db.insert("materialCategories", {
      name: "CRT",
      unit: "piece",
      hazardNotes: "High vacuum implosion hazard. Funnel glass contains up to 20% toxic lead oxide. Keep funnel intact.",
    });

    const catCables = await ctx.db.insert("materialCategories", {
      name: "Cables",
      unit: "kg",
      hazardNotes: "PVC insulation releases carcinogenic dioxins & furans if burned. Mechanically granulate or peel only.",
    });

    const catBatteries = await ctx.db.insert("materialCategories", {
      name: "Batteries",
      unit: "kg",
      hazardNotes: "Thermal runaway, short-circuit, and fire hazard. Insulate terminal contacts with tape. Never puncture.",
    });

    const catLcd = await ctx.db.insert("materialCategories", {
      name: "LCD Panel",
      unit: "piece",
      hazardNotes: "CCFL backlights contain toxic mercury vapor. Do not crush tubes; wear nitrile gloves.",
    });

    const catMotors = await ctx.db.insert("materialCategories", {
      name: "Motors/Magnets",
      unit: "kg",
      hazardNotes: "High-strength neodymium pinch hazard. Fine magnetic dust is flammable when ground.",
    });

    const catPlastics = await ctx.db.insert("materialCategories", {
      name: "Mixed Plastics",
      unit: "kg",
      hazardNotes: "Flame retardant plastics (ABS-FR/HIPS) release brominated toxins. Must be routed to authorized thermal units.",
    });

    // 5. Seed Price Rates (Market Averages & Recycler Quotes for 2 locations: Nagpur and Mumbai)
    const today = new Date().toISOString().split("T")[0];

    // Nagpur Market Rates (Market Average)
    await ctx.db.insert("priceRates", {
      materialCategoryId: catPcb,
      location: "Nagpur",
      pricePerUnit: 280,
      date: today,
      source: "MARKET_AVERAGE",
    });
    await ctx.db.insert("priceRates", {
      materialCategoryId: catCables,
      location: "Nagpur",
      pricePerUnit: 640,
      date: today,
      source: "MARKET_AVERAGE",
    });
    await ctx.db.insert("priceRates", {
      materialCategoryId: catBatteries,
      location: "Nagpur",
      pricePerUnit: 290,
      date: today,
      source: "MARKET_AVERAGE",
    });
    await ctx.db.insert("priceRates", {
      materialCategoryId: catCrt,
      location: "Nagpur",
      pricePerUnit: 150,
      date: today,
      source: "MARKET_AVERAGE",
    });
    await ctx.db.insert("priceRates", {
      materialCategoryId: catLcd,
      location: "Nagpur",
      pricePerUnit: 120,
      date: today,
      source: "MARKET_AVERAGE",
    });
    await ctx.db.insert("priceRates", {
      materialCategoryId: catMotors,
      location: "Nagpur",
      pricePerUnit: 95,
      date: today,
      source: "MARKET_AVERAGE",
    });
    await ctx.db.insert("priceRates", {
      materialCategoryId: catPlastics,
      location: "Nagpur",
      pricePerUnit: 18,
      date: today,
      source: "MARKET_AVERAGE",
    });

    // Mumbai Market Rates (Market Average)
    await ctx.db.insert("priceRates", {
      materialCategoryId: catPcb,
      location: "Mumbai",
      pricePerUnit: 310,
      date: today,
      source: "MARKET_AVERAGE",
    });
    await ctx.db.insert("priceRates", {
      materialCategoryId: catCables,
      location: "Mumbai",
      pricePerUnit: 680,
      date: today,
      source: "MARKET_AVERAGE",
    });
    await ctx.db.insert("priceRates", {
      materialCategoryId: catBatteries,
      location: "Mumbai",
      pricePerUnit: 320,
      date: today,
      source: "MARKET_AVERAGE",
    });
    await ctx.db.insert("priceRates", {
      materialCategoryId: catCrt,
      location: "Mumbai",
      pricePerUnit: 165,
      date: today,
      source: "MARKET_AVERAGE",
    });
    await ctx.db.insert("priceRates", {
      materialCategoryId: catLcd,
      location: "Mumbai",
      pricePerUnit: 135,
      date: today,
      source: "MARKET_AVERAGE",
    });
    await ctx.db.insert("priceRates", {
      materialCategoryId: catMotors,
      location: "Mumbai",
      pricePerUnit: 105,
      date: today,
      source: "MARKET_AVERAGE",
    });
    await ctx.db.insert("priceRates", {
      materialCategoryId: catPlastics,
      location: "Mumbai",
      pricePerUnit: 22,
      date: today,
      source: "MARKET_AVERAGE",
    });

    // Recycler Specific Quotes (Feeds Phase 4 matchmaking & Phase 6 anomaly detection)
    // EcoRecycle (Competitive quotes in Nagpur)
    await ctx.db.insert("priceRates", {
      materialCategoryId: catPcb,
      recyclerId: ecoRecycleId,
      location: "Nagpur",
      pricePerUnit: 305, // Premium quote above market average
      date: today,
      source: "RECYCLER_QUOTE",
    });
    await ctx.db.insert("priceRates", {
      materialCategoryId: catCables,
      recyclerId: ecoRecycleId,
      location: "Nagpur",
      pricePerUnit: 670,
      date: today,
      source: "RECYCLER_QUOTE",
    });
    await ctx.db.insert("priceRates", {
      materialCategoryId: catBatteries,
      recyclerId: ecoRecycleId,
      location: "Nagpur",
      pricePerUnit: 300,
      date: today,
      source: "RECYCLER_QUOTE",
    });

    // Vidarbha Metals Quotes (Nagpur)
    await ctx.db.insert("priceRates", {
      materialCategoryId: catPcb,
      recyclerId: vidarbhaMetalsId,
      location: "Nagpur",
      pricePerUnit: 290,
      date: today,
      source: "RECYCLER_QUOTE",
    });
    await ctx.db.insert("priceRates", {
      materialCategoryId: catCables,
      recyclerId: vidarbhaMetalsId,
      location: "Nagpur",
      pricePerUnit: 690, // Higher quote for cables
      date: today,
      source: "RECYCLER_QUOTE",
    });
    await ctx.db.insert("priceRates", {
      materialCategoryId: catMotors,
      recyclerId: vidarbhaMetalsId,
      location: "Nagpur",
      pricePerUnit: 100,
      date: today,
      source: "RECYCLER_QUOTE",
    });

    // Maharashtra E-Waste Quotes (Mumbai)
    await ctx.db.insert("priceRates", {
      materialCategoryId: catPcb,
      recyclerId: maharashtraEWasteId,
      location: "Mumbai",
      pricePerUnit: 325,
      date: today,
      source: "RECYCLER_QUOTE",
    });
    await ctx.db.insert("priceRates", {
      materialCategoryId: catCrt,
      recyclerId: maharashtraEWasteId,
      location: "Mumbai",
      pricePerUnit: 170,
      date: today,
      source: "RECYCLER_QUOTE",
    });

    // Anomaly Quote (GreenEarth SafeRecycle - 38% below market avg to trigger Phase 6 anomaly detector)
    await ctx.db.insert("priceRates", {
      materialCategoryId: catCables,
      recyclerId: greenEarthId,
      location: "Nagpur",
      pricePerUnit: 390, // Market average is ₹640, this is ~39% below market
      date: today,
      source: "RECYCLER_QUOTE",
    });

    // 6. Seed Sample Lots across various statuses (for live demo readiness)
    // Lot 1: DRAFT
    const lot1 = await ctx.db.insert("lots", {
      collectorId: rameshId,
      materialCategoryId: catPcb,
      photoUrl: "/images/lots/pcb-sample-1.jpg",
      approxWeight: 18.5,
      estimatedValue: 18.5 * 280, // ₹5,180
      quotedPrice: 18.5 * 280,
      status: "DRAFT",
      collectionLocation: "Itwari Market, Nagpur",
      gpsLat: 21.1458,
      gpsLng: 79.0882,
      referenceId: "SS-2026-00101",
      createdAt: now - 3600000 * 3,
    });

    // Lot 2: MATCHED
    const lot2 = await ctx.db.insert("lots", {
      collectorId: rameshId,
      materialCategoryId: catCables,
      photoUrl: "/images/lots/cables-sample-1.jpg",
      approxWeight: 14.0,
      estimatedValue: 14.0 * 640, // ₹8,960
      quotedPrice: 14.0 * 670, // Offered by EcoRecycle: ₹9,380
      recyclerId: ecoRecycleId,
      status: "MATCHED",
      collectionLocation: "Dharampeth, Nagpur",
      gpsLat: 21.1402,
      gpsLng: 79.0628,
      referenceId: "SS-2026-00102",
      createdAt: now - 3600000 * 12,
    });

    // Lot 3: HANDED_OVER
    const lot3 = await ctx.db.insert("lots", {
      collectorId: sureshId,
      materialCategoryId: catBatteries,
      photoUrl: "/images/lots/battery-sample-1.jpg",
      approxWeight: 8.0,
      estimatedValue: 8.0 * 290, // ₹2,320
      quotedPrice: 8.0 * 300, // ₹2,400
      recyclerId: ecoRecycleId,
      status: "HANDED_OVER",
      collectionLocation: "Sitabuldi, Nagpur",
      gpsLat: 21.1444,
      gpsLng: 79.0831,
      referenceId: "SS-2026-00103",
      createdAt: now - 3600000 * 24,
      handoverAt: now - 3600000 * 6,
    });

    // Lot 4: CONFIRMED
    const lot4 = await ctx.db.insert("lots", {
      collectorId: sureshId,
      materialCategoryId: catMotors,
      photoUrl: "/images/lots/motors-sample-1.jpg",
      approxWeight: 22.0,
      estimatedValue: 22.0 * 95, // ₹2,090
      quotedPrice: 22.0 * 100, // ₹2,200
      finalSaleValue: 2200,
      recyclerId: vidarbhaMetalsId,
      status: "CONFIRMED",
      collectionLocation: "Gandhibagh, Nagpur",
      gpsLat: 21.1512,
      gpsLng: 79.0991,
      referenceId: "SS-2026-00104",
      createdAt: now - 86400000 * 2,
      handoverAt: now - 86400000 * 1.5,
      confirmedAt: now - 86400000 * 1,
    });

    // Lot 5: PAID
    const lot5 = await ctx.db.insert("lots", {
      collectorId: mohanId,
      materialCategoryId: catCrt,
      photoUrl: "/images/lots/crt-sample-1.jpg",
      approxWeight: 4.0, // 4 pieces
      estimatedValue: 4.0 * 165, // ₹660
      quotedPrice: 4.0 * 170, // ₹680
      finalSaleValue: 680,
      recyclerId: maharashtraEWasteId,
      status: "PAID",
      collectionLocation: "Kurla West, Mumbai",
      gpsLat: 19.0657,
      gpsLng: 72.8794,
      referenceId: "SS-2026-00105",
      createdAt: now - 86400000 * 4,
      handoverAt: now - 86400000 * 3,
      confirmedAt: now - 86400000 * 2.5,
    });

    // 7. Seed Transactions
    await ctx.db.insert("transactions", {
      lotId: lot4,
      amount: 2200,
      paymentStatus: "PAID",
      paymentMethod: "DIGITAL",
      createdAt: now - 86400000 * 1,
    });

    await ctx.db.insert("transactions", {
      lotId: lot5,
      amount: 680,
      paymentStatus: "PAID",
      paymentMethod: "CASH",
      createdAt: now - 86400000 * 2.5,
    });

    return {
      success: true,
      message: "Scrap Setu database seeded successfully with realistic e-waste demo data.",
      counts: {
        users: 7,
        recyclers: 4,
        materialCategories: 7,
        priceRates: 21,
        lots: 5,
        transactions: 2,
      },
    };
  },
});
