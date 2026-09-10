## Phase 0 — Project Scaffold

```
You are setting up the foundation for "Scrap Setu," a hackathon project presenting tomorrow. Read PROGRESS.md first if it exists.

Stack: Next.js 15 (App Router), TypeScript, Tailwind CSS, Convex, Zustand for client state.

Tasks:
1. Scaffold a new Next.js 15 project with TypeScript and Tailwind configured.
2. Install and configure Convex (run npx convex dev to set up Convex backend, configure convex/schema.ts, store CONVEX_DEPLOYMENT and NEXT_PUBLIC_CONVEX_URL in .env.local).
3. Set up the folder structure:
   - /app/kabadiwala/* (collector routes)
   - /app/recycler/* (recycler routes)
   - /app/admin/* (govt admin routes)
   - /app/api/* (API routes if needed)
   - /convex (Convex schema, queries, mutations, seed actions)
   - /lib (shared utilities, Convex client wrapper)
   - /store (Zustand stores)
   - /components (shared UI components)
4. Set up a basic role-select landing page at "/" with three buttons: "Kabadiwala", "Recycler", "Govt Admin" — each navigating to a placeholder page for now.
5. Install lucide-react for icons and set up a clean Tailwind theme (keep it simple, don't over-engineer styling yet).
6. Do NOT set up Capacitor yet — that's a later phase.

When done:
- Create PROGRESS.md at project root using the template I've defined, and fill in "Completed Phases" with "Phase 0 — Project Scaffold" plus a one-line summary of what was set up.
- Set "Next Phase to Run" to "Phase 1".
- List any deviations you made from these instructions and why.
```

---

## Phase 1 — Database Schema & Seed Data

```
Read PROGRESS.md before starting. Update it when done — do not skip this step.

Design and implement the Convex schema (convex/schema.ts) for Scrap Setu with these tables and validators:

- users: name (v.string()), phone (v.string()), role (v.union(v.literal("KABADIWALA"), v.literal("RECYCLER"), v.literal("ADMIN"))), preferredLanguage (v.union(v.literal("HINDI"), v.literal("MARATHI"), v.literal("ENGLISH"))), location (v.string(), simple city/area name is fine), createdAt (v.number()). Indexes: by_phone, by_role.

- recyclers: userId (v.id("users")), facilityName (v.string()), location (v.string()), materialsAccepted (v.array(v.string())), authorizationStatus (v.union(v.literal("AUTHORIZED"), v.literal("PENDING"), v.literal("UNAUTHORIZED"))), authorizationNumber (v.string()), contactDetails (v.string()), serviceArea (v.string()), pickupAvailable (v.boolean()). Indexes: by_userId, by_status.

- materialCategories: name (v.string(), e.g. "PCB", "CRT", "Cables", "Batteries", "LCD Panel", "Motors/Magnets", "Mixed Plastics"), unit (v.string(), kg/piece), hazardNotes (v.string(), for safety guidance later).

- priceRates: materialCategoryId (v.id("materialCategories")), recyclerId (v.optional(v.id("recyclers"))), location (v.string()), pricePerUnit (v.number()), date (v.string()), source (v.union(v.literal("MARKET_AVERAGE"), v.literal("RECYCLER_QUOTE"))). Indexes: by_category_location, by_recycler.

- lots: collectorId (v.id("users")), materialCategoryId (v.id("materialCategories")), photoUrl (v.string(), placeholder / storage ID), approxWeight (v.number()), estimatedValue (v.number()), quotedPrice (v.number()), finalSaleValue (v.optional(v.number())), status (v.union(v.literal("DRAFT"), v.literal("MATCHED"), v.literal("HANDED_OVER"), v.literal("CONFIRMED"), v.literal("PAID"))), recyclerId (v.optional(v.id("recyclers"))), collectionLocation (v.string()), gpsLat (v.optional(v.number())), gpsLng (v.optional(v.number())), referenceId (v.string(), unique human-readable like "SS-2026-00123"), createdAt (v.number()), handoverAt (v.optional(v.number())), confirmedAt (v.optional(v.number())). Indexes: by_referenceId, by_collector, by_recycler, by_status.

- transactions: lotId (v.id("lots")), amount (v.number()), paymentStatus (v.union(v.literal("PENDING"), v.literal("PAID"))), paymentMethod (v.union(v.literal("CASH"), v.literal("DIGITAL"))), createdAt (v.number()). Indexes: by_lotId.

Tasks:
1. Write this schema in convex/schema.ts with proper defineTable, defineSchema, and v validators.
2. Write seed mutations/actions (convex/seed.ts) that create:
   - 7 material categories with realistic names and one-line hazard notes.
   - 3-4 authorized recyclers across 2 locations, with varied materials accepted and rates.
   - Realistic price rates per category per location (base this on plausible Indian scrap market rates — e.g., PCB ₹150-300/kg, copper cable ₹400-600/kg, mixed plastics ₹10-20/kg — use your best judgment for realism, clearly comment that these are placeholder/demo values).
   - 2-3 seed kabadiwala users and 1 seed admin user.
   - A handful of sample Lots in different statuses so dashboards aren't empty on first load.
3. Run the seed mutation and confirm data loads correctly in Convex.

When done, update PROGRESS.md: mark Phase 1 complete, document the final schema decisions (especially anything you changed from this spec and why), note the seed data ranges used, and set "Next Phase to Run" to Phase 2.
```

---

## Phase 2 — Auth & Role-Based Routing

```
Read PROGRESS.md before starting. Update it when done.

This is a hackathon demo — do NOT build full production auth (no OTP providers, no email verification). Implement a lightweight mock auth suitable for a live demo:

1. A simple login screen per role (kabadiwala / recycler / admin) asking for name + phone number. On submit, look up or create a User record with that phone number and role, store the user id + role in a cookie or simple session (use Next.js cookies() or a lightweight session lib — your choice, keep it simple).
2. Middleware or layout-level guards so:
   - /kabadiwala/* routes require a logged-in KABADIWALA user
   - /recycler/* routes require a logged-in RECYCLER user
   - /admin/* routes require a logged-in ADMIN user
   - Unauthenticated users are redirected to the role-select landing page.
3. A simple logout action available on each dashboard (clears session, returns to landing page).
4. Wire the Phase 0 landing page buttons to these login screens.

When done, update PROGRESS.md: mark Phase 2 complete, note the auth approach taken and explicitly flag it as "demo-only, not production auth" so this isn't mistaken for a real security implementation later. Set "Next Phase to Run" to Phase 3.
```

---

## Phase 3 — Kabadiwala: Lot Creation Flow

```
Read PROGRESS.md before starting. Update it when done.

Build the core collector flow at /kabadiwala/new-lot — this is the most visually important screen in the whole demo, so prioritize a clean, large-touch-target, icon-driven UI (assume a low-literacy user on a small Android screen).

Steps in the flow (use a Zustand store to hold state across these steps):
1. Photo capture/upload step — for now, a file input styled to look like a camera capture button is fine (native camera access comes in the Capacitor phase later). Store the image as a data URL or upload to a simple local/placeholder storage — don't build cloud storage infra for this hackathon, a base64 string in the DB or a mock URL is acceptable.
2. Category selection — large icon grid (one icon + label per MaterialCategory from the DB), single-select.
3. Weight entry — a slider or +/- stepper (avoid requiring a keyboard), with the unit shown from the category.
4. Instant value estimate — NO AI/ML. Calculate estimatedValue = approxWeight × current average PriceRate for that category/location (pulled from the PriceRate table, source = MARKET_AVERAGE). Show this clearly as "Estimated Value: ₹X" with a note like "Based on today's market rate in [location]".
5. Confirm & create Lot — on confirm, create a Lot record with status DRAFT, an auto-generated referenceId (format "SS-2026-XXXXX"), and the entered data.
6. Success screen showing the reference ID and a "Find a Recycler" CTA that goes to the next screen (built in Phase 4).

Also build /kabadiwala/dashboard as the home screen with:
- A price board widget showing current rates for 4-5 categories in the user's location (pulled from PriceRate).
- A "New Lot" CTA button.
- A list of the collector's recent lots with status badges.

When done, update PROGRESS.md: mark Phase 3 complete, note the value-estimation formula used, storage approach for photos, and any UI shortcuts taken for time. Set "Next Phase to Run" to Phase 4.
```

---

## Phase 4 — Kabadiwala: Recycler Matching, Handover & Ledger

```
Read PROGRESS.md before starting. Update it when done.

Build the rest of the kabadiwala experience:

1. /kabadiwala/match/[lotId] — after a lot is created, show a ranked list of 2-3 nearby AUTHORIZED recyclers who accept that material category, sorted by offered rate (from PriceRate where source = RECYCLER_QUOTE) descending, with distance shown (a hardcoded/mock distance value is fine — don't build real geolocation matching under this deadline unless trivial). Each card shows: recycler name, rate offered, distance, pickup availability.
2. On selecting a recycler: update the Lot with recyclerId, status → MATCHED, and generate a handover record — capture (or mock) GPS coordinates, set a timestamp, and move status → HANDED_OVER. Display this as a simple confirmation screen with the reference ID and a QR code (use a lightweight QR library) encoding the lot's referenceId, to be scanned by the recycler in Phase 5.
3. /kabadiwala/ledger — a passbook-style list of all the collector's lots: reference ID, material, weight, final amount (or "pending"), payment status, date. Style this like a simple statement/passbook, not a data table — this should feel familiar and trustworthy to a non-technical user.
4. /kabadiwala/safety — a simple screen with 2-3 safety tips (pictorial, one line of text each) for hazardous categories like batteries and CRTs, pulled from the hazardNotes field on MaterialCategory.

When done, update PROGRESS.md: mark Phase 4 complete, note the QR library used and matching logic. Set "Next Phase to Run" to Phase 5.
```

---

## Phase 5 — Recycler Dashboard

```
Read PROGRESS.md before starting. Update it when done.

Build the recycler-side web dashboard:

1. /recycler/dashboard — overview showing: incoming lot requests (status = MATCHED or HANDED_OVER, assigned to this recycler), count of pending confirmations, total lots handled, total value transacted.
2. /recycler/lots — a queue/list view of lots matched to this recycler. Each row expandable to show photo, weight, category, collector info, reference ID.
3. Confirm handover action: a button (or QR-scan-style input where the recycler types/scans the referenceId) that moves a Lot from HANDED_OVER → CONFIRMED, sets confirmedAt, and creates the associated Transaction record with amount = finalSaleValue (let the recycler edit/confirm the final price before confirming, in case it differs slightly from the estimate).
4. /recycler/rates — a simple form where the recycler can view and update their own PriceRate entries (source = RECYCLER_QUOTE) per material category — this is what feeds the kabadiwala matching screen in Phase 4.
5. /recycler/history — past confirmed transactions, simple table.

When done, update PROGRESS.md: mark Phase 5 complete. Set "Next Phase to Run" to Phase 6.
```

---

## Phase 6 — Government Admin Dashboard

```
Read PROGRESS.md before starting. Update it when done.

Build the admin dashboard — this is the "regulatory oversight" angle of the problem statement, so lean into aggregate/analytical views over individual transaction management:

1. /admin/dashboard — top-level stats: total registered recyclers (by authorization status), total material diverted from informal to formal channel (sum of confirmed lot weights), total value transacted, number of active kabadiwalas.
2. /admin/recyclers — table of all recyclers with authorization status, materials accepted, service area. Allow toggling authorizationStatus (AUTHORIZED/PENDING/UNAUTHORIZED) — this simulates the govt's regulatory role.
3. /admin/prices — a simple chart (use recharts, already available) showing price trends over time per material category, and across the 2 seeded locations, to demonstrate the "market visibility" the problem statement asks for.
4. /admin/anomalies — a simple flagged list: any RECYCLER_QUOTE PriceRate that is more than, say, 30% below the MARKET_AVERAGE for that category/location — flag these as "below-market, needs review." This is a rule-based stand-in for the "identification of abnormal transaction values" requirement — keep it simple, no ML needed.

When done, update PROGRESS.md: mark Phase 6 complete, note the anomaly-detection threshold/logic used. Set "Next Phase to Run" to Phase 7.
```

---

## Phase 7 — Capacitor Wrap (Kabadiwala App Only)

```
Read PROGRESS.md before starting. Update it when done.

Wrap ONLY the kabadiwala-facing routes as a Capacitor Android app for the live demo — recycler and admin stay as web dashboards.

1. Install and initialize Capacitor in the project, configured to point at the kabadiwala routes (either as a separate build target/config, or by setting the initial URL to /kabadiwala for the Capacitor build — use whichever approach fits the existing Next.js setup with least friction given the deadline).
2. Add the Capacitor Camera plugin and wire it into the Phase 3 photo capture step, replacing the file-input placeholder with real native camera access, falling back gracefully to file input if camera permission is denied or unavailable.
3. Add the Capacitor Geolocation plugin and wire it into the Phase 4 handover step to capture real GPS coordinates, falling back to the mocked coordinates if permission is denied.
4. Confirm the app builds and runs in Android Studio / an emulator or connected device. Do not attempt iOS — Android only, given the deadline.
5. Sanity-check that offline behavior is graceful: if there's no time to implement true offline sync in this phase, at minimum ensure the app doesn't crash without connectivity and shows a clear "you're offline, this will sync later" message where relevant — note honestly in PROGRESS.md if full offline sync was out of scope for the deadline.

When done, update PROGRESS.md: mark Phase 7 complete, note what does/doesn't work offline, and any camera/GPS permission issues encountered. Set "Next Phase to Run" to Phase 8.
```

---

## Phase 8 — Polish & Demo Readiness

```
Read PROGRESS.md before starting. Update it when done — this is the final phase before presentation.

1. Walk through the full demo flow end-to-end as each role: kabadiwala creates a lot → matches with recycler → recycler confirms → admin sees updated stats. Fix any broken links, console errors, or dead-end screens found along the way.
2. Make sure seed data tells a coherent story for the live demo — e.g., have 1-2 lots already sitting in MATCHED status ready to be confirmed live, rather than starting from a completely empty state.
3. Basic responsive/visual pass: consistent spacing, readable font sizes (especially on the kabadiwala screens — assume a small Android screen and someone unfamiliar with apps), consistent color usage per role (e.g., a distinct accent color for each of the 3 dashboards so it's visually obvious which role is being demoed).
4. Add a one-page /about or landing section (or just prepare talking points) covering: the problem, why 3 roles, what's rule-based today vs. AI/ML roadmap, offline strategy, and the unit-economics comparison (current informal earnings vs. platform earnings) — pull real numbers if you have them from your 2 field-collector interviews, otherwise clearly-labeled illustrative placeholders.
5. Do a final check that no crash-prone edge cases exist in the core demo path (e.g., missing photo, zero weight, no recyclers matched for a category) — handle gracefully with a friendly message rather than a broken screen.

When done, update PROGRESS.md: mark Phase 8 complete, list any known limitations to mention proactively to judges, and mark overall status as "Demo-ready" at the top of the file.
```