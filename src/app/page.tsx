'use client';

import { useState, useEffect, useCallback } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { AskCohortDrawer, AskCohortButton } from '@/components/AskCohort';
import { TeamOverview } from '@/components/pages/TeamOverview';
import { PipelineForecast } from '@/components/pages/PipelineForecast';
import { AgencyScorecard } from '@/components/pages/AgencyScorecard';
import { ClientDetail, ClientList } from '@/components/pages/ClientDetail';
import { MarketAnalysis } from '@/components/pages/MarketAnalysis';
import { YearOnYear } from '@/components/pages/YearOnYear';
import { MarketShare } from '@/components/pages/MarketShare';
import { HistoricData } from '@/components/pages/HistoricData';
import { BrandPerformance } from '@/components/pages/BrandPerformance';
import { AudienceStudio } from '@/components/pages/AudienceStudio';
import { CampaignsPage } from '@/components/pages/CampaignsPage';
import { CommissionPage } from '@/components/pages/CommissionPage';
import { WeeklyReport } from '@/components/pages/WeeklyReport';
import { IntegrationsPage } from '@/components/pages/IntegrationsPage';

interface PageConfig {
  title: string;
  subtitle: string;
}

const pageConfigs: Record<string, PageConfig> = {
  home: { title: 'Team Overview', subtitle: "Rachel's Team · Publicis + Omnicom · 2 salespeople · 18 active campaigns" },
  campaigns: { title: 'Team Campaigns', subtitle: 'All 18 active campaigns across Alicia and Renita' },
  pipeline: { title: 'Pipeline & Forecast', subtitle: 'Q3 2026 pipeline · Deal velocity · Forecast accuracy' },
  commission: { title: 'Team Commission', subtitle: 'Shared pool · Alicia, Renita, Rachel' },
  agencies: { title: 'Agency Scorecard', subtitle: 'Publicis + Omnicom · 8 agencies · Share of wallet' },
  clients: { title: 'Client Detail', subtitle: 'All advertisers · Campaign history · Relationship management' },
  'client-detail': { title: 'Client Detail', subtitle: '' },
  market: { title: 'Market Analysis', subtitle: 'Private + open marketplace · Competitive opportunity' },
  yoy: { title: 'Year on Year', subtitle: 'Retained, lapsed, and new advertisers · Q2 2025 vs Q2 2026' },
  share: { title: 'Market Share', subtitle: 'Immediate vs Hearst, Future, Condé Nast, News UK, DMGT, Reach' },
  historic: { title: 'Historic Data', subtitle: 'Internal + Nielsen · 24-month view' },
  brands: { title: 'Brand Performance', subtitle: 'How our titles are performing — readers, reach, engagement' },
  audience: { title: 'Audience Studio', subtitle: 'Segment and activate first-party audiences' },
  report: { title: 'Weekly Report', subtitle: 'Auto-generated every Monday 08:00' },
  integrations: { title: 'Data Integrations', subtitle: 'Salesforce · GAM · Adomic · Excel · Monday · Slack · Nielsen · Comscore' },
};

export default function Home() {
  const [activePage, setActivePage] = useState('home');
  const [detailSlug, setDetailSlug] = useState<string | undefined>();
  const [chatOpen, setChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useCallback((page: string, detail?: string) => {
    setActivePage(page);
    setDetailSlug(detail);
    const main = document.getElementById('main-scroll');
    if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Keyboard shortcut: Cmd/Ctrl+K for Ask Cohort
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setChatOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const currentConfig = pageConfigs[activePage] || pageConfigs.home;
  const sidebarPage = activePage === 'client-detail' ? 'clients' : activePage;

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <TeamOverview onNavigate={navigate} />;
      case 'campaigns': return <CampaignsPage onNavigate={navigate} />;
      case 'pipeline': return <PipelineForecast onNavigate={navigate} />;
      case 'commission': return <CommissionPage onNavigate={navigate} />;
      case 'agencies': return <AgencyScorecard onNavigate={navigate} />;
      case 'clients': return <ClientList onNavigate={navigate} />;
      case 'client-detail': return <ClientDetail slug={detailSlug || ''} onNavigate={navigate} />;
      case 'market': return <MarketAnalysis onNavigate={navigate} />;
      case 'yoy': return <YearOnYear onNavigate={navigate} />;
      case 'share': return <MarketShare onNavigate={navigate} />;
      case 'historic': return <HistoricData onNavigate={navigate} />;
      case 'brands': return <BrandPerformance onNavigate={navigate} />;
      case 'audience': return <AudienceStudio onNavigate={navigate} />;
      case 'report': return <WeeklyReport onNavigate={navigate} />;
      case 'integrations': return <IntegrationsPage onNavigate={navigate} />;
      default: return <TeamOverview onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-off">
      <Sidebar
        activePage={sidebarPage}
        onNavigate={navigate}
        onOpenChat={() => setChatOpen(true)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          title={currentConfig.title}
          subtitle={currentConfig.subtitle}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main id="main-scroll" className="flex-1 overflow-y-auto">
          <div className="px-4 lg:px-8 py-6 pb-12">
            {renderPage()}
          </div>
        </main>
      </div>

      <AskCohortButton onClick={() => setChatOpen(true)} />
      <AskCohortDrawer isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
