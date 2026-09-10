export interface FlowNode {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  badge?: string;
  desc: string;
}

export interface PainPoint {
  id: string;
  title: string;
  desc: string;
  stat: string;
  statLabel: string;
  icon: string;
}

export interface JourneyStep {
  stepNumber: number;
  name: string;
  hindiName: string;
  summary: string;
  detail: string;
  icon: string;
  actionText: string;
}

export interface MockupScreen {
  id: 'dashboard' | 'collection' | 'pricing' | 'recyclers';
  title: string;
  subtitle: string;
  caption: string;
  badge: string;
}

export interface ImpactCardData {
  category: string;
  icon: string;
  accentColor: string;
  bullets: string[];
  metricBadge: string;
}

export interface ComparisonPlatform {
  name: string;
  category: string;
  informalFocus: boolean | 'partial';
  verifiedRecycler: boolean | 'partial';
  fairPriceGuidance: boolean | 'partial';
  offlineUse: boolean | 'partial';
  digitalTraceability: boolean | 'partial';
  notes: string;
}
