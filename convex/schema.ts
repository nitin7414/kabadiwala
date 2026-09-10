import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    phone: v.string(),
    role: v.union(v.literal("KABADIWALA"), v.literal("RECYCLER"), v.literal("ADMIN")),
    preferredLanguage: v.union(v.literal("HINDI"), v.literal("MARATHI"), v.literal("ENGLISH")),
    location: v.string(),
    createdAt: v.number(),
  })
    .index("by_phone", ["phone"])
    .index("by_role", ["role"]),

  recyclers: defineTable({
    userId: v.id("users"),
    facilityName: v.string(),
    location: v.string(),
    materialsAccepted: v.array(v.string()),
    authorizationStatus: v.union(
      v.literal("AUTHORIZED"),
      v.literal("PENDING"),
      v.literal("UNAUTHORIZED")
    ),
    authorizationNumber: v.string(),
    contactDetails: v.string(),
    serviceArea: v.string(),
    pickupAvailable: v.boolean(),
  })
    .index("by_userId", ["userId"])
    .index("by_status", ["authorizationStatus"]),

  materialCategories: defineTable({
    name: v.string(),
    unit: v.string(), // "kg" or "piece"
    hazardNotes: v.string(),
  }),

  priceRates: defineTable({
    materialCategoryId: v.id("materialCategories"),
    recyclerId: v.optional(v.id("recyclers")),
    location: v.string(),
    pricePerUnit: v.number(),
    date: v.string(),
    source: v.union(v.literal("MARKET_AVERAGE"), v.literal("RECYCLER_QUOTE")),
  })
    .index("by_category_location", ["materialCategoryId", "location"])
    .index("by_recycler", ["recyclerId"]),

  lots: defineTable({
    collectorId: v.id("users"),
    materialCategoryId: v.id("materialCategories"),
    photoUrl: v.string(),
    approxWeight: v.number(),
    estimatedValue: v.number(),
    quotedPrice: v.number(),
    finalSaleValue: v.optional(v.number()),
    status: v.union(
      v.literal("DRAFT"),
      v.literal("MATCHED"),
      v.literal("HANDED_OVER"),
      v.literal("CONFIRMED"),
      v.literal("PAID")
    ),
    recyclerId: v.optional(v.id("recyclers")),
    collectionLocation: v.string(),
    gpsLat: v.optional(v.number()),
    gpsLng: v.optional(v.number()),
    referenceId: v.string(),
    createdAt: v.number(),
    handoverAt: v.optional(v.number()),
    confirmedAt: v.optional(v.number()),
  })
    .index("by_referenceId", ["referenceId"])
    .index("by_collector", ["collectorId"])
    .index("by_recycler", ["recyclerId"])
    .index("by_status", ["status"]),

  transactions: defineTable({
    lotId: v.id("lots"),
    amount: v.number(),
    paymentStatus: v.union(v.literal("PENDING"), v.literal("PAID")),
    paymentMethod: v.union(v.literal("CASH"), v.literal("DIGITAL")),
    createdAt: v.number(),
  }).index("by_lotId", ["lotId"]),
});
