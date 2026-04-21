import type { NavSection } from './navigation';

export const salesNavigation: NavSection[] = [
  {
    label: 'My Performance',
    items: [
      { label: 'My Dashboard', page: 'home', icon: 'LayoutDashboard' },
      { label: 'My Campaigns', page: 'campaigns', icon: 'Target', badge: 10 },
      { label: 'My Pipeline', page: 'pipeline', icon: 'TrendingUp' },
      { label: 'My Commission', page: 'commission', icon: 'PoundSterling' },
    ],
  },
  {
    label: 'My Clients',
    items: [
      { label: 'Client List', page: 'clients', icon: 'Users' },
      { label: 'Agency Contacts', page: 'contacts', icon: 'Building2' },
    ],
  },
  {
    label: 'Market Intel',
    items: [
      { label: 'Market Opportunities', page: 'opportunities', icon: 'BarChart3', badge: 'New', badgeVariant: 'new' },
      { label: 'Competitor Watch', page: 'competitor', icon: 'Eye' },
    ],
  },
  {
    label: 'Immediate Brands',
    items: [
      { label: 'Brand Performance', page: 'brands', icon: 'Star' },
      { label: 'Audience Segments', page: 'audience', icon: 'Crosshair' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { label: 'Weekly Activity', page: 'activity', icon: 'FileText', badge: 'New', badgeVariant: 'risk' },
      { label: 'Meeting Prep', page: 'meeting-prep', icon: 'Calendar' },
      { label: 'Integrations', page: 'integrations', icon: 'Plug' },
    ],
  },
];
