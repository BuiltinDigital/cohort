'use client';

import { useState, useEffect, useCallback } from 'react';
import { SalesSidebar } from '@/components/sales/Sidebar';
import { Topbar } from '@/components/Topbar';
import { AskCohortDrawer, AskCohortButton } from '@/components/AskCohort';
import { MyDashboard } from '@/components/sales/pages/MyDashboard';
import { MyCampaigns } from '@/components/sales/pages/MyCampaigns';
import { MyPipeline } from '@/components/sales/pages/MyPipeline';
import { MyCommission } from '@/components/sales/pages/MyCommission';
import { MyClients } from '@/components/sales/pages/MyClients';
import { ClientDetailSales } from '@/components/sales/pages/ClientDetailSales';
import { AgencyContacts } from '@/components/sales/pages/AgencyContacts';
import { MarketOpportunities } from '@/components/sales/pages/MarketOpportunities';
import { CompetitorWatch } from '@/components/sales/pages/CompetitorWatch';
import { BrandPerformanceSales } from '@/components/sales/pages/BrandPerformanceSales';
import { AudienceSegmentsSales } from '@/components/sales/pages/AudienceSegmentsSales';
import { WeeklyActivity } from '@/components/sales/pages/WeeklyActivity';
import { MeetingPrep } from '@/components/sales/pages/MeetingPrep';

interface PageConfig { title: string; subtitle: string; }

const pageConfigs: Record<string, PageConfig> = {
  home: { title: 'My Dashboard', subtitle: 'Alicia · Publicis Group · Starcom, Zenith, Spark Foundry, Digitas' },
  campaigns: { title: 'My Campaigns', subtitle: '10 active campaigns · £1.98m total value' },
  pipeline: { title: 'My Pipeline', subtitle: '14 deals · £1.4m weighted value' },
  commission: { title: 'My Commission', subtitle: 'Accelerator tier · £82k earned · Q2 2026' },
  clients: { title: 'My Clients', subtitle: 'Publicis Group portfolio · 11 active clients' },
  'client-detail': { title: 'Client Detail', subtitle: '' },
  contacts: { title: 'Agency Contacts', subtitle: 'Starcom · Zenith · Spark Foundry · Digitas' },
  opportunities: { title: 'Market Opportunities', subtitle: 'Prospects spending in market but not with Immediate' },
  competitor: { title: 'Competitor Watch', subtitle: 'Relevant market moves for your portfolio' },
  brands: { title: 'Brand Performance', subtitle: 'Immediate titles — reach, engagement, ad revenue' },
  audience: { title: 'Audience Segments', subtitle: 'First-party segments to pitch to clients' },
  activity: { title: 'Weekly Activity', subtitle: 'Meetings, proposals, deals — W/C 14 April 2026' },
  'meeting-prep': { title: 'Meeting Prep', subtitle: 'Upcoming client meetings — preparation notes' },
  integrations: { title: 'Integrations', subtitle: 'Salesforce · GAM · Adomic · Slack' },
};

export default function SalesDashboard() {
  const [activePage, setActivePage] = useState('home');
  const [detailSlug, setDetailSlug] = useState<string | undefined>();
  const [chatOpen, setChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useCallback((page: string, detail?: string) => {
    setActivePage(page);
    setDetailSlug(detail);
    const main = document.getElementById('sales-main-scroll');
    if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <MyDashboard onNavigate={navigate} />;
      case 'campaigns': return <MyCampaigns onNavigate={navigate} />;
      case 'pipeline': return <MyPipeline onNavigate={navigate} />;
      case 'commission': return <MyCommission onNavigate={navigate} />;
      case 'clients': return <MyClients onNavigate={navigate} />;
      case 'client-detail': return <ClientDetailSales slug={detailSlug || ''} onNavigate={navigate} />;
      case 'contacts': return <AgencyContacts onNavigate={navigate} />;
      case 'opportunities': return <MarketOpportunities onNavigate={navigate} />;
      case 'competitor': return <CompetitorWatch onNavigate={navigate} />;
      case 'brands': return <BrandPerformanceSales onNavigate={navigate} />;
      case 'audience': return <AudienceSegmentsSales onNavigate={navigate} />;
      case 'activity': return <WeeklyActivity onNavigate={navigate} />;
      case 'meeting-prep': return <MeetingPrep onNavigate={navigate} />;
      case 'integrations': return <MyDashboard onNavigate={navigate} />;
      default: return <MyDashboard onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-off">
      <SalesSidebar
        activePage={activePage}
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
          actions={
            <>
              <div className="px-[14px] py-[7px] bg-sky-soft text-navy text-[11.5px] font-semibold rounded-[18px] whitespace-nowrap">
                Q2 2026 · 47 days remaining
              </div>
              <button className="px-4 py-[9px] rounded-[7px] text-[12.5px] font-semibold bg-paper text-navy border border-line hover:border-sky transition-all">
                Log Activity
              </button>
              <button className="px-4 py-[9px] rounded-[7px] text-[12.5px] font-semibold bg-navy text-paper hover:bg-sky transition-all">
                + New Deal
              </button>
            </>
          }
        />
        <main id="sales-main-scroll" className="flex-1 overflow-y-auto">
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
