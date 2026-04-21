import type { NavSection } from './navigation';

export const directorNavigation: NavSection[] = [
  {
    label: 'Executive',
    items: [
      { label: 'Overview', page: 'home', icon: 'LayoutDashboard' },
      { label: 'Cross-Team Performance', page: 'cross-team', icon: 'BarChart3' },
      { label: 'Talent & People', page: 'talent', icon: 'Users' },
      { label: 'Compensation', page: 'compensation', icon: 'PoundSterling' },
    ],
  },
  {
    label: 'Pipeline & Revenue',
    items: [
      { label: 'Business Forecast', page: 'forecast', icon: 'TrendingUp' },
      { label: 'Win/Loss Analysis', page: 'win-loss', icon: 'ArrowUpDown' },
      { label: 'Pipeline Velocity', page: 'velocity', icon: 'Zap' },
    ],
  },
  {
    label: 'Market & Competitive',
    items: [
      { label: 'Market Share', page: 'market-share', icon: 'PieChart' },
      { label: 'Category Share', page: 'category-share', icon: 'Layers', badge: 'New', badgeVariant: 'new' },
      { label: 'Competitor Intel', page: 'competitor-intel', icon: 'Eye' },
      { label: 'Agency Consolidation', page: 'agency-consol', icon: 'Building2' },
    ],
  },
  {
    label: 'Portfolio',
    items: [
      { label: 'Brand P&L', page: 'brand-pnl', icon: 'Receipt' },
      { label: 'Brand Strategy', page: 'brand-strategy', icon: 'Star' },
      { label: 'Content vs Commercial', page: 'content-commercial', icon: 'Scale' },
    ],
  },
  {
    label: 'Strategy & Ops',
    items: [
      { label: 'Strategic Initiatives', page: 'initiatives', icon: 'Target', badge: 3 },
      { label: 'Decisions Log', page: 'decisions', icon: 'FileCheck' },
    ],
  },
  {
    label: 'Finance',
    items: [
      { label: 'Revenue Close', page: 'revenue-close', icon: 'Wallet' },
      { label: 'Aged Debt', page: 'aged-debt', icon: 'Clock', badge: '!', badgeVariant: 'risk' },
      { label: 'Margin Analysis', page: 'margins', icon: 'BarChart3' },
      { label: 'Forecast Accuracy', page: 'forecast-accuracy', icon: 'Crosshair' },
    ],
  },
  {
    label: 'People',
    items: [
      { label: 'Performance Matrix', page: 'perf-matrix', icon: 'Grid3x3' },
      { label: 'Flight Risk', page: 'flight-risk', icon: 'AlertTriangle', badge: 2, badgeVariant: 'risk' },
      { label: 'Hiring Pipeline', page: 'hiring', icon: 'UserPlus' },
      { label: 'Comp Benchmark', page: 'comp-benchmark', icon: 'Scale' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { label: 'Lessons Learned', page: 'lessons', icon: 'BookOpen' },
      { label: 'Events Calendar', page: 'events', icon: 'Calendar' },
      { label: 'News Feed', page: 'news', icon: 'Newspaper' },
    ],
  },
];
