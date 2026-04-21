export interface Integration {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'syncing' | 'error' | 'not-connected';
  lastSync: string;
  icon: string; // lucide icon name
  category: string;
}

export const integrations: Integration[] = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'CRM & deal management',
    status: 'connected',
    lastSync: '2 min ago',
    icon: 'database',
    category: 'CRM',
  },
  {
    id: 'google-ad-manager',
    name: 'Google Ad Manager',
    description: 'Campaign delivery & trafficking',
    status: 'connected',
    lastSync: '14 min ago',
    icon: 'layout-dashboard',
    category: 'Ad Ops',
  },
  {
    id: 'adomic',
    name: 'Adomic',
    description: 'Programmatic marketplace',
    status: 'connected',
    lastSync: '6 min ago',
    icon: 'zap',
    category: 'Programmatic',
  },
  {
    id: 'excel-google-sheets',
    name: 'Excel / Google Sheets',
    description: 'Budget tracking & reporting',
    status: 'connected',
    lastSync: '1 hour ago',
    icon: 'table',
    category: 'Reporting',
  },
  {
    id: 'monday',
    name: 'Monday.com',
    description: 'Project management & workflows',
    status: 'connected',
    lastSync: '28 min ago',
    icon: 'check-square',
    category: 'Workflow',
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Team notifications & alerts',
    status: 'connected',
    lastSync: 'live',
    icon: 'message-square',
    category: 'Communication',
  },
  {
    id: 'nielsen-ad-intel',
    name: 'Nielsen Ad Intel',
    description: 'Market intelligence & competitor spend',
    status: 'connected',
    lastSync: 'daily at 06:00',
    icon: 'bar-chart-2',
    category: 'Intelligence',
  },
  {
    id: 'comscore',
    name: 'Comscore',
    description: 'Audience measurement & brand reach',
    status: 'connected',
    lastSync: 'weekly',
    icon: 'users',
    category: 'Audience',
  },
];
