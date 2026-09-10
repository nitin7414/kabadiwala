import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// 1. Categories
export const getCategories = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("materialCategories").collect();
  },
});

// 2. Price Rates (filter by location optional)
export const getPriceRates = query({
  args: { location: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const rates = await ctx.db.query("priceRates").collect();
    if (args.location) {
      return rates.filter(
        (r) => r.location.toLowerCase() === args.location?.toLowerCase()
      );
    }
    return rates;
  },
});

// 3. Recyclers
export const getRecyclers = query({
  args: {
    status: v.optional(
      v.union(v.literal("AUTHORIZED"), v.literal("PENDING"), v.literal("UNAUTHORIZED"))
    ),
  },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("recyclers")
        .withIndex("by_status", (q) => q.eq("authorizationStatus", args.status!))
        .collect();
    }
    return await ctx.db.query("recyclers").collect();
  },
});

// 4. Lots by Collector
export const getCollectorLots = query({
  args: { collectorId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("lots")
      .withIndex("by_collector", (q) => q.eq("collectorId", args.collectorId))
      .order("desc")
      .collect();
  },
});

// 5. Lots by Recycler
export const getRecyclerLots = query({
  args: { recyclerId: v.id("recyclers") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("lots")
      .withIndex("by_recycler", (q) => q.eq("recyclerId", args.recyclerId))
      .order("desc")
      .collect();
  },
});

// 6. All lots for Admin / Overview
export const getAllLots = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("lots").order("desc").collect();
  },
});

// 7. Get Lot by Reference ID
export const getLotByReferenceId = query({
  args: { referenceId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("lots")
      .withIndex("by_referenceId", (q) => q.eq("referenceId", args.referenceId))
      .first();
  },
});

// 8. Mutations for Lot Lifecycle (Phases 3, 4, 5)
export const createLot = mutation({
  args: {
    collectorId: v.id("users"),
    materialCategoryId: v.id("materialCategories"),
    photoUrl: v.string(),
    approxWeight: v.number(),
    estimatedValue: v.number(),
    quotedPrice: v.number(),
    collectionLocation: v.string(),
    referenceId: v.string(),
    gpsLat: v.optional(v.number()),
    gpsLng: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("lots", {
      ...args,
      status: "DRAFT",
      createdAt: Date.now(),
    });
  },
});

export const matchLotWithRecycler = mutation({
  args: {
    lotId: v.id("lots"),
    recyclerId: v.id("recyclers"),
    quotedPrice: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.lotId, {
      recyclerId: args.recyclerId,
      quotedPrice: args.quotedPrice,
      status: "MATCHED",
    });
  },
});

export const handoverLot = mutation({
  args: {
    lotId: v.id("lots"),
    gpsLat: v.optional(v.number()),
    gpsLng: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.lotId, {
      status: "HANDED_OVER",
      handoverAt: Date.now(),
      gpsLat: args.gpsLat,
      gpsLng: args.gpsLng,
    });
  },
});

export const confirmLotHandover = mutation({
  args: {
    lotId: v.id("lots"),
    finalSaleValue: v.number(),
    paymentMethod: v.union(v.literal("CASH"), v.literal("DIGITAL")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    await ctx.db.patch(args.lotId, {
      finalSaleValue: args.finalSaleValue,
      status: "CONFIRMED",
      confirmedAt: now,
    });

    await ctx.db.insert("transactions", {
      lotId: args.lotId,
      amount: args.finalSaleValue,
      paymentStatus: "PENDING",
      paymentMethod: args.paymentMethod,
      createdAt: now,
    });
  },
});
