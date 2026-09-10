import {
  PainPoint,
  JourneyStep,
  MockupScreen,
  ImpactCardData,
  ComparisonPlatform
} from '../types';

export const HERO_DATA = {
  title: "AETHER",
  tagline: "Kabadiwala Connect",
  mission: "Bringing the informal collector into the formal recycling chain.",
  badges: [
    { label: "SIH 2026", highlight: true },
    { label: "Problem Statement 26229", highlight: false },
    { label: "Clean & Green Technology", highlight: false },
    { label: "Software Edition", highlight: false }
  ],
  stats: [
    { value: "95%", label: "of India's e-waste handled informally" },
    { value: "1.71M+", label: "tonnes e-waste generated annually in India" },
    { value: "₹0", label: "middleman commission cuts with AETHER" }
  ]
};

export const FLOW_NODES = [
  {
    step: "01",
    role: "Informal Collector",
    sub: "Kabadiwala / Aggregator",
    detail: "Collects consumer & repair shop e-waste, weighs items, records in vernacular app even offline.",
    color: "emerald"
  },
  {
    step: "02",
    role: "AETHER App",
    sub: "Kabadiwala Connect Platform",
    detail: "Transparent fair-pricing engine, geotagged verified recycler directory, and tamper-proof QR handover.",
    color: "teal"
  },
  {
    step: "03",
    role: "Authorized Recycler",
    sub: "CPCB / SPCB Registered Unit",
    detail: "Receives segregated feedstock safely, verifies QR receipt, issues EPR credit points and direct payment.",
    color: "cyan"
  }
];

export const CHALLENGE_POINTS: PainPoint[] = [
  {
    id: "access",
    title: "Informal Collectors Lack Access to Authorized Recyclers",
    desc: "Over 90% of grassroots kabadiwalas sell strictly to unorganized scrap tier-aggregators. They have no direct bridge, transport logistics, or legal channel to CPCB-registered formal recycling facilities.",
    stat: "92%",
    statLabel: "sell to informal middlemen at depressed rates",
    icon: "NetworkOff"
  },
  {
    id: "pricing",
    title: "Unclear and Changing E-Waste Prices",
    desc: "Scrap pricing for circuit boards, copper coils, and lithium batteries fluctuates daily without transparent benchmarks. Collectors are exploited by middlemen with under-weighing and arbitrary deductions.",
    stat: "30-40%",
    statLabel: "value lost to arbitrary intermediary cuts",
    icon: "TrendingDown"
  },
  {
    id: "safety",
    title: "Unsafe Handling & Hazardous Processing Practices",
    desc: "Without formal segregation guidance, valuable components undergo rudimentary crude acid leaching and open-air backyard burning, releasing toxic lead, mercury, and dioxins into urban settlements.",
    stat: "Zero",
    statLabel: "protective gear or toxicity guidelines followed",
    icon: "ShieldAlert"
  },
  {
    id: "records",
    title: "No Reliable Digital Transaction Records",
    desc: "Transactions occur entirely in untracked cash slips with zero provenance. Recyclers and OEMs cannot prove Extended Producer Responsibility (EPR) compliance, leaving formal supply chains starved.",
    stat: "0%",
    statLabel: "traceability for circular economy audits",
    icon: "FileQuestion"
  }
];

export const SOLUTION_FEATURES = [
  {
    title: "Register Digitally",
    desc: "Ultra-fast OTP phone registration with simple vernacular voice/text setup. No tedious paperwork required.",
    icon: "UserCheck"
  },
  {
    title: "Add & Categorize E-Waste",
    desc: "Intuitive visual catalogue for PCBs, batteries, cords, monitors, and appliances with weight estimators.",
    icon: "Boxes"
  },
  {
    title: "See Fair Estimated Price Range",
    desc: "Real-time transparent market index based on precious metal benchmarks and CPCB recovery guidelines.",
    icon: "IndianRupee"
  },
  {
    title: "Find Verified Recyclers Nearby",
    desc: "Interactive geo-directory of state pollution board (SPCB) registered recyclers within transit distance.",
    icon: "MapPin"
  },
  {
    title: "Request Handover & Digital Receipt",
    desc: "One-tap scheduled drop-off or pickup with QR handshake that produces an instant, verifiable digital receipt.",
    icon: "QrCode"
  }
];

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    stepNumber: 1,
    name: "Collect",
    hindiName: "संग्रह (Collect)",
    summary: "Pick up e-waste scrap",
    detail: "Collector gathers discarded electronics from households, repair shops, and local scrap yards.",
    icon: "Truck",
    actionText: "Log Items"
  },
  {
    stepNumber: 2,
    name: "Check Price",
    hindiName: "भाव जांचें (Check Rate)",
    summary: "Check fair benchmark rate",
    detail: "App displays dynamic market price range (e.g., Motherboard Grade-A: ₹280 - ₹340 / kg) to eliminate arbitrary middleman exploitation.",
    icon: "Coins",
    actionText: "Live Rates"
  },
  {
    stepNumber: 3,
    name: "Find Recycler",
    hindiName: "रीसाइक्लर खोजें (Find Recycler)",
    summary: "Locate verified formal centers",
    detail: "Browse nearby authorized e-waste dismantling plants with verified SPCB licenses, accepted categories, and gate drop-off hours.",
    icon: "Navigation",
    actionText: "View Centers"
  },
  {
    stepNumber: 4,
    name: "Handover",
    hindiName: "हस्तांतरण (Handover)",
    summary: "Scan QR & weigh verified batch",
    detail: "Meet the authorized facility agent, confirm digital weighing scale reading, and initiate two-way QR security handshake.",
    icon: "ScanLine",
    actionText: "Scan Handshake"
  },
  {
    stepNumber: 5,
    name: "Digital Record",
    hindiName: "डिजिटल रसीद (Digital Receipt)",
    summary: "Instant payout & EPR audit slip",
    detail: "Instant UPI bank settlement plus an immutable digital manifest certificate feeding CPCB Extended Producer Responsibility quotas.",
    icon: "ReceiptCheck",
    actionText: "View Receipt"
  }
];

export const MOCKUP_SCREENS: MockupScreen[] = [
  {
    id: "dashboard",
    title: "Collector Dashboard",
    subtitle: "Daily overview, active batch & instant action bar",
    caption: "Demonstrates high-contrast, low-literacy-friendly home view with daily earnings, quick-add button, and live market price ticker.",
    badge: "Home Hub"
  },
  {
    id: "collection",
    title: "My Collection",
    subtitle: "Categorized inventory of segregated scrap items",
    caption: "Demonstrates visual item logging with weight tally (kg), condition grading (PCB Grade-A, Copper, Lithium), and total estimated valuation.",
    badge: "Inventory"
  },
  {
    id: "pricing",
    title: "Estimated Value",
    subtitle: "Transparent scrap pricing benchmark index",
    caption: "Demonstrates live fair-price guidance comparing formal authorized rates vs informal baseline, preventing middleman underpayment.",
    badge: "Price Index"
  },
  {
    id: "recyclers",
    title: "Nearby Recyclers",
    subtitle: "CPCB/SPCB verified facility directory with distance",
    caption: "Demonstrates geolocated authorized facilities with direct drop-off rates, operating status, phone connect, and navigation.",
    badge: "Verified Hubs"
  }
];

export const WHY_DIFFERENT_PILLARS = [
  {
    icon: "WifiOff",
    title: "Offline-First & Local-Language Friendly",
    tag: "Grassroots Usability",
    desc: "Engineered for real ground realities. Functions seamlessly without active internet in scrap yards using local IndexedDB caching and lightweight SMS fallback. Multi-lingual interface in Hindi and regional dialects with voice-guided prompts for collectors with limited digital literacy."
  },
  {
    icon: "Scale",
    title: "Fair-Price Transparency",
    tag: "Economic Justice",
    desc: "Directly counters opaque scrap dealer syndicates. Provides a transparent benchmark index driven by London Metal Exchange (LME) commodities and Ministry of Mines recovery norms so kabadiwalas know the true material worth before stepping out to negotiate."
  },
  {
    icon: "QrCode",
    title: "QR Digital Handover & Full Traceability",
    tag: "EPR Compliance",
    desc: "Closes the accountability loop between the informal collector and formal recyclers. A cryptographically signed digital handover receipt tags batch weight, timestamp, and recycler CPCB ID — generating verifiable Extended Producer Responsibility (EPR) credit documentation."
  }
];

export const FEASIBILITY_COLUMNS = [
  {
    heading: "Why It's Feasible",
    subtitle: "Built for Ground Realities",
    points: [
      "Zero specialized hardware needed: runs on basic ₹6,000 Android 8+ smartphones.",
      "Offline-first architecture with localized SQLite/IndexedDB caching syncs when network resumes.",
      "Plugs into India's 3,000+ existing CPCB/SPCB authorized recyclers who are starved for steady raw e-waste feedstock.",
      "Extremely low onboarding friction: vernacular audio walkthroughs with single-click phone OTP login."
    ],
    badge: "Practical & Deployable"
  },
  {
    heading: "MVP Scope (Demonstrated)",
    subtitle: "Core High-Impact Modules",
    points: [
      "Collector Dashboard: Daily intake, earnings log, quick batch summary.",
      "My Collection: Visual category selector, weight tracker, and grade calculator.",
      "Estimated Value Engine: Live transparent price bands based on metal content.",
      "Verified Recycler Radar: Geo-indexed directory of certified processing units with contact & direct booking."
    ],
    badge: "Showcase Complete"
  },
  {
    heading: "Scale Path",
    subtitle: "Structured Phased Rollout",
    points: [
      "Phase 1 (Pilot): 1 Hub City (e.g. Nagpur / JNARDDC regional cluster) with 200 kabadiwalas & 5 verified recyclers.",
      "Phase 2 (City Scale): Municipal corporation tie-up across Delhi NCR & Mumbai scrap agglomerations.",
      "Phase 3 (State Cluster): State Pollution Control Board integration & formal SHG (Self-Help Group) onboarding.",
      "Phase 4 (Nationwide): Pan-India national EPR marketplace connecting 500,000+ informal collectors."
    ],
    badge: "National Vision"
  }
];

export const IMPACT_CARDS: ImpactCardData[] = [
  {
    category: "Informal Collectors (Kabadiwalas)",
    icon: "HeartHandshake",
    accentColor: "emerald",
    metricBadge: "+25% to 35% Income",
    bullets: [
      "Direct price discovery eliminates unfair middleman cuts on high-value PCBs.",
      "Digital transaction history enables micro-credit and formal financial inclusion.",
      "Transition from stigmatized scrap dealer to recognized green environmental stewards."
    ]
  },
  {
    category: "Authorized Recyclers",
    icon: "Factory",
    accentColor: "teal",
    metricBadge: "3.2x Feedstock Inflow",
    bullets: [
      "Secures steady, direct supply of segregated raw e-waste directly from collectors.",
      "Significantly reduces aggregator sourcing overhead and middlemen brokerage.",
      "Full digital chain of custody simplifies SPCB audit inspections and licensing."
    ]
  },
  {
    category: "Environment & Public Health",
    icon: "Leaf",
    accentColor: "green",
    metricBadge: "Zero Open Acid Leaching",
    bullets: [
      "Diverts hazardous materials (lead, cadmium, flame retardants) from open burning.",
      "Prevents carcinogenic chemical runoff into groundwater and city drainage.",
      "Boosts urban mining of rare earth metals (Gold, Silver, Palladium, Copper)."
    ]
  },
  {
    category: "Government & Ecosystem",
    icon: "Landmark",
    accentColor: "cyan",
    metricBadge: "100% EPR Verification",
    bullets: [
      "Aligns with Ministry of Mines & JNARDDC circular economy targets for critical minerals.",
      "Provides verifiable audit trails for OEMs to meet CPCB Extended Producer Responsibility quotas.",
      "Integrates the massive unorganized workforce into formal digital GDP without displacement."
    ]
  }
];

export const COMPARISON_DATA: ComparisonPlatform[] = [
  {
    name: "AETHER (Kabadiwala Connect)",
    category: "Our SIH 2026 Solution",
    informalFocus: true,
    verifiedRecycler: true,
    fairPriceGuidance: true,
    offlineUse: true,
    digitalTraceability: true,
    notes: "Specifically engineered for informal collectors: vernacular, offline-first, direct verified recycler bridge, and tamper-proof digital receipts."
  },
  {
    name: "Traditional Kabadiwala Chain",
    category: "Current Status Quo",
    informalFocus: true,
    verifiedRecycler: false,
    fairPriceGuidance: false,
    offlineUse: true,
    digitalTraceability: false,
    notes: "Relies on informal cartels, unverified scrap yards, opaque pricing, zero safety equipment, and untracked cash."
  },
  {
    name: "The Kabadiwala",
    category: "Commercial B2C Scrap Portal",
    informalFocus: false,
    verifiedRecycler: 'partial',
    fairPriceGuidance: 'partial',
    offlineUse: false,
    digitalTraceability: 'partial',
    notes: "Focuses on household consumer doorstep pickup, not empowering the informal collector workforce."
  },
  {
    name: "UPYOG E-Waste",
    category: "Municipal Governance Portal",
    informalFocus: false,
    verifiedRecycler: true,
    fairPriceGuidance: false,
    offlineUse: false,
    digitalTraceability: true,
    notes: "Heavy institutional portal for municipal authorities and enterprise compliance; too complex for grassroots kabadiwalas."
  },
  {
    name: "Kabadiwalla Connect (Chennai)",
    category: "Urban MRF Research Initiative",
    informalFocus: true,
    verifiedRecycler: 'partial',
    fairPriceGuidance: false,
    offlineUse: false,
    digitalTraceability: 'partial',
    notes: "Pioneered MRF mapping, but lacks real-time price indexing, mobile offline app, and automated digital handover QR flows."
  }
];

export const CLOSING_DATA = {
  usp: "Collector-first, fair-price guided, verified-recycler connected, offline-ready, fully traceable.",
  nextStep: "Pilot in one city → validate → onboard recyclers → scale across India",
  team: "Team AETHER",
  ministry: "Ministry of Mines (MoM)",
  partner: "JNARDDC (Jawaharlal Nehru Aluminium Research Development and Design Centre)",
  tagline: "Collect • Connect • Recycle"
};
