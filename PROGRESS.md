# Scrap Setu — Build Progress

## Status: Phase 5 Completed

## Completed Phases
- **Phase 0 — Project Scaffold**: Scaffolded Next.js App Router with TypeScript, Tailwind CSS, Convex provider setup (`convex/schema.ts`, `lib/ConvexClientProvider.tsx`), Zustand client store (`store/useAppStore.ts`), role-selection landing page at `/`, and role route placeholders for `/kabadiwala`, `/recycler`, and `/admin`.
- **Phase 1 — Database Schema & Seed Data**: Implemented full Convex schema in `convex/schema.ts` with 6 reactive tables, indexes, and validators. Created comprehensive seed dataset in `convex/seed.ts`, queries/mutations in `convex/data.ts`, and fallback dataset in `lib/mockSeedData.ts` for offline/local development.
- **Phase 2 — Auth & Role-Based Routing**: Built role-specific login screen (`app/login/[role]/page.tsx`) with 1-click demo accounts, lightweight cookie/localStorage session management (`lib/auth.ts`), layout-level route guards (`components/AuthGuard.tsx`) restricting `/kabadiwala/*`, `/recycler/*`, and `/admin/*`, sticky header with profile, language switcher, and logout (`components/DashboardHeader.tsx`), and wired all landing page role cards.
- **Phase 3 — Kabadiwala: Lot Creation Flow**: Built `/kabadiwala/new-lot` (photo capture with presets + HTML5 camera input, 7-category icon grid with Hindi labels, +/- touch steppers & weight slider avoiding keyboard typing, instant rule-based value calculation, auto-generated reference ID `SS-2026-XXXXX`, success screen) and `/kabadiwala/page.tsx` (collector dashboard with live market price board widget, prominent new lot CTA, and real-time status-badged lots list).
- **Phase 4 — Kabadiwala: Recycler Matching, Handover & Ledger**: Built `/kabadiwala/match/[lotId]` (ranked authorized recyclers by offered price descending with distance & pickup badges, GPS-stamped handover generator with QR code), `/kabadiwala/ledger` (passbook-style statement of accounts / खाता बही), and `/kabadiwala/safety` (pictorial hazard guidelines and Do's & Don'ts).
- **Phase 5 — Recycler Dashboard**: Built `/recycler` (facility dashboard overview with incoming lot requests, pending confirmations, total lots handled, and total value transacted), `/recycler/lots` (expandable queue with inspection details, reference search, and price-adjustment confirmation modal that moves lots to `CONFIRMED` and creates `Transaction` records), `/recycler/rates` (interactive quote manager publishing rates live to collector matchmaking), and `/recycler/history` (CPCB auditable transaction statement).

## Deviations & Notes
- **Database Engine**: Migrated from Prisma + Neon Postgres to **Convex** per user requirement.
- **Offline/Hybrid Fallback**: In addition to `convex/seed.ts`, created `lib/mockSeedData.ts` mirroring all seed data to ensure zero downtime during hackathon presentations regardless of live Convex cloud connection status.
- **Authentication Security Flag**: **[DEMO-ONLY, NOT PRODUCTION AUTH]** Authentication is purposely lightweight and mock-driven for hackathon judging (Name + Phone lookup, instant pre-fill buttons, cookie session, no SMS OTP provider or external verification).
- **QR Code Library Used**: Installed and integrated `qrcode.react` (`QRCodeSVG`) to generate dynamic, scan-ready QR codes encoding lot reference IDs, collector metadata, and timestamps for physical dock verification.
- **Recycler Matching Logic**: Filters all recyclers where `authorizationStatus === 'AUTHORIZED'`, verifies that `materialsAccepted` includes the lot's material category, retrieves rates from `priceRates` (where `source === 'RECYCLER_QUOTE'`), and orders facilities descending by net offered payout.
- **Passbook Ledger Styling**: Styled `/kabadiwala/ledger` as a vintage, trustworthy Indian bank passbook (खाता बही) with stamps, sequential entry numbers, and verified credit settlements to maximize trust among informal collectors.
- **Recycler Handover Confirmation Action**: Recyclers can adjust `finalSaleValue` in the modal before confirming (to account for tare weight or contamination), instantly creating corresponding `Transaction` records.

## Current Schema & Seed Data Summary
### Tables & Schema
- `users`: `name`, `phone`, `role` (KABADIWALA, RECYCLER, ADMIN), `preferredLanguage` (HINDI, MARATHI, ENGLISH), `location`, `createdAt`. Indexes: `by_phone`, `by_role`.
- `recyclers`: `userId`, `facilityName`, `location`, `materialsAccepted`, `authorizationStatus` (AUTHORIZED, PENDING, UNAUTHORIZED), `authorizationNumber`, `contactDetails`, `serviceArea`, `pickupAvailable`. Indexes: `by_userId`, `by_status`.
- `materialCategories`: `name`, `unit` (kg/piece), `hazardNotes`.
- `priceRates`: `materialCategoryId`, `recyclerId` (optional), `location`, `pricePerUnit`, `date`, `source` (MARKET_AVERAGE, RECYCLER_QUOTE). Indexes: `by_category_location`, `by_recycler`.
- `lots`: `collectorId`, `materialCategoryId`, `photoUrl`, `approxWeight`, `estimatedValue`, `quotedPrice`, `finalSaleValue` (optional), `status` (DRAFT, MATCHED, HANDED_OVER, CONFIRMED, PAID), `recyclerId` (optional), `collectionLocation`, `gpsLat`, `gpsLng`, `referenceId`, `createdAt`, `handoverAt` (optional), `confirmedAt` (optional). Indexes: `by_referenceId`, `by_collector`, `by_recycler`, `by_status`.
- `transactions`: `lotId`, `amount`, `paymentStatus` (PENDING, PAID), `paymentMethod` (CASH, DIGITAL), `createdAt`. Index: `by_lotId`.

### Seed Data Ranges (Realistic Indian Scrap Market)
- **7 Material Categories**: High-Grade PCB, CRT & Monitor Glass, Copper Cables & Wiring, Lithium-ion Batteries, LCD & LED Panels, Motors & Rare-Earth Magnets, Mixed Technical Plastics (with practical handling hazard warnings).
- **4 Recyclers**: EcoRecycle India (Nagpur, Authorized), Vidarbha CleanMetals (Nagpur, Authorized), Maharashtra E-Waste (Mumbai, Authorized), GreenEarth SafeRecycle (Nagpur, Pending).
- **Market Price Rates (₹ / unit)**:
  - High-Grade PCB: ₹280 - ₹325 / kg
  - Copper Cables: ₹640 - ₹690 / kg
  - Li-ion Batteries: ₹290 - ₹320 / kg
  - CRT Monitors: ₹150 - ₹170 / piece
  - LCD Panels: ₹120 - ₹135 / piece
  - Motors / Magnets: ₹95 - ₹105 / kg
  - Mixed Plastics: ₹18 - ₹22 / kg
  - *Deliberate below-market anomaly quote included*: GreenEarth SafeRecycle offering ₹390/kg for Cables (~39% below ₹640 market average) for testing Phase 6 regulatory flags.
- **7 Users**: 3 Kabadiwala collectors (Ramesh, Suresh, Mohan), 1 CPCB/SPCB Admin (Dr. Anjali Mehta), 3 Recycler facility leads (Rajesh, Arvind, Vikrant).
- **5 Sample Lots Across All Statuses**:
  - `SS-2026-00101` (DRAFT)
  - `SS-2026-00102` (MATCHED)
  - `SS-2026-00103` (HANDED_OVER)
  - `SS-2026-00104` (CONFIRMED)
  - `SS-2026-00105` (PAID)
- **2 Completed Transactions**: ₹2,200 (Digital) and ₹680 (Cash).

### Phase 6 Implementation Notes (Government Regulatory Oversight)
- **Top-Level Regulatory Dashboard (`/admin/dashboard` & `/admin`)**:
  - 4 Key Telemetry Metrics:
    1. Total registered recyclers with live breakdown (3 Authorized, 1 Pending, 0 Revoked).
    2. Total material diverted from informal to formal channel (sum of confirmed/paid lot weights = 26.0 kg).
    3. Total formal transacted value (sum of completed transactions = ₹2,880).
    4. Active kabadiwalas on platform (registered informal collectors with active lots).
  - Anomaly detection alert banner highlighting active underpricing submissions.
  - Material stream diversion breakdown progress bars across all 7 categories.
  - Live chain-of-custody audit stream tracking collector-to-recycler formal handovers.
- **Recycler Licensing & Authorization Oversight (`/admin/recyclers`)**:
  - Filterable & searchable registry of all recycler facilities with CPCB/SPCB authorization numbers, locations, service areas, and authorized materials.
  - Interactive 3-way segmented status toggle (`AUTHORIZED` / `PENDING` / `UNAUTHORIZED`), updating store state immediately with action toasts and recalculating top-level dashboard compliance counts.
- **Market Price Trends & Visibility (`/admin/prices`)**:
  - 6-Month historical commodity price trend analytics (Oct 2025 – Mar 2026) for all 7 material categories.
  - Interactive responsive SVG visualization with dynamic Y-axis scaling, month gridlines, point tooltips, and legend.
  - Hub comparison toggle: Nagpur Benchmark (MIDC Hingna/Wadi) vs Mumbai Benchmark (Taloja/MMR) with inter-city spread percentages.
- **Pricing Anomaly & Market Fairness Engine (`/admin/anomalies`)**:
  - **Deterministic Rule-Based Anomaly Logic**:
    `Variance % = ((Market_Average[Category, Location] - Recycler_Quote) / Market_Average) * 100`
    - Threshold: If `Variance % > 30%`, flagged as **CRITICAL: Underpricing Anomaly / Potential Exploitation**.
    - Threshold 15%–30%: Flagged as Moderate Benchmark Caution.
    - Threshold ≤ 15%: Normal Competitive Trading Range.
  - **Flagged Seed Demonstration**: GreenEarth SafeRecycle Plant quoting ₹390/kg for Cables in Nagpur vs market benchmark ₹640/kg (`-39.1%` variance).
  - **CPCB Regulatory Adjudication Actions**:
    1. "Issue Show-Cause Notice (CPCB Rule 13)"
    2. "Suspend Recycler Permit" (directly switches facility to `UNAUTHORIZED` and halts intake)
    3. "Dismiss / Verified" (adjudicates compliant after field verification)
- **Unified Live Testing Synchronized**:
  - `src/components/RolePlatformExperience.tsx` updated with 4-tab admin portal (`Overview`, `Recycler Licensing`, `Market Price Trends`, `Pricing Anomalies`) for immediate interactive testing on port 3000.
  - Full TypeScript check (`npx tsc --noEmit`) and Next.js App Router build (`npx next build`) compiled 19 routes with 0 errors.

## Known Issues / TODOs
- All 19 Next.js App Router routes and Vite platform components are verified and functioning.
- Ready for Phase 7 (Capacitor Wrap — Kabadiwala App Only).

## Next Phase to Run
Phase 7