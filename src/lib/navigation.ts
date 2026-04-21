export interface NavItem {
  label: string;
  page: string;
  icon: string;
  badge?: string | number;
  badgeVariant?: 'default' | 'risk' | 'new';
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    label: 'My Team',
    items: [
      { label: 'Team Overview', page: 'home', icon: 'LayoutDashboard' },
      { label: 'Campaigns', page: 'campaigns', icon: 'Target', badge: 18 },
      { label: 'Pipeline & Forecast', page: 'pipeline', icon: 'TrendingUp' },
      { label: 'Team Commission', page: 'commission', icon: 'PoundSterling' },
    ],
  },
  {
    label: 'Clients & Agencies',
    items: [
      { label: 'Agency Scorecard', page: 'agencies', icon: 'Building2' },
      { label: 'Client Detail', page: 'clients', icon: 'Users' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { label: 'Market Analysis', page: 'market', icon: 'BarChart3', badge: 'New', badgeVariant: 'new' },
      { label: 'Year on Year', page: 'yoy', icon: 'ArrowUpDown' },
      { label: 'Market Share', page: 'share', icon: 'PieChart' },
      { label: 'Historic Data', page: 'historic', icon: 'Clock' },
    ],
  },
  {
    label: 'Immediate Brands',
    items: [
      { label: 'Brand Performance', page: 'brands', icon: 'Star' },
      { label: 'Audience Studio', page: 'audience', icon: 'Crosshair' },
    ],
  },
  {
    label: 'Reporting',
    items: [
      { label: 'Weekly Report', page: 'report', icon: 'FileText', badge: 'New', badgeVariant: 'risk' },
      { label: 'Integrations', page: 'integrations', icon: 'Plug' },
    ],
  },
];
