'use client';

import { useState, useEffect, useCallback } from 'react';
import { DirectorSidebar } from '@/components/director/Sidebar';
import { Topbar } from '@/components/Topbar';
import { AskCohortDrawer, AskCohortButton } from '@/components/AskCohort';
import { ExecutiveOverview } from '@/components/director/pages/ExecutiveOverview';
import { CrossTeamPerformance } from '@/components/director/pages/CrossTeamPerformance';
import { TalentPeople } from '@/components/director/pages/TalentPeople';
import { CompensationView } from '@/components/director/pages/CompensationView';
import { BusinessForecast } from '@/components/director/pages/BusinessForecast';
import { WinLossAnalysis } from '@/components/director/pages/WinLossAnalysis';
import { PipelineVelocity } from '@/components/director/pages/PipelineVelocity';
import { MarketShareDirector } from '@/components/director/pages/MarketShareDirector';
import { CategoryShare } from '@/components/director/pages/CategoryShare';
import { CompetitorIntelligence } from '@/components/director/pages/CompetitorIntelligence';
import { AgencyConsolidation } from '@/components/director/pages/AgencyConsolidation';
import { BrandPnL } from '@/components/director/pages/BrandPnL';
import { BrandStrategy } from '@/components/director/pages/BrandStrategy';
import { ContentVsCommercial } from '@/components/director/pages/ContentVsCommercial';
import { StrategicInitiatives } from '@/components/director/pages/StrategicInitiatives';
import { DecisionsLog } from '@/components/director/pages/DecisionsLog';
import { RevenueClose } from '@/components/director/pages/RevenueClose';
import { AgedDebt } from '@/components/director/pages/AgedDebt';
import { MarginAnalysis } from '@/components/director/pages/MarginAnalysis';
import { ForecastAccuracy } from '@/components/director/pages/ForecastAccuracy';
import { PerformanceMatrix } from '@/components/director/pages/PerformanceMatrix';
import { FlightRisk } from '@/components/director/pages/FlightRisk';
import { HiringPipeline } from '@/components/director/pages/HiringPipeline';
import { CompBenchmark } from '@/components/director/pages/CompBenchmark';
import { LessonsLearned } from '@/components/director/pages/LessonsLearned';
import { EventsCalendar } from '@/components/director/pages/EventsCalendar';
import { NewsFeed } from '@/components/director/pages/NewsFeed';

interface PageConfig {
  title: string;
  subtitle: string;
}

const pageConfigs: Record<string, PageConfig> = {
  home: { title: 'Executive Overview', subtitle: '3 teams · 7 salespeople · 42 active campaigns' },
  'cross-team': { title: 'Cross-Team Performance', subtitle: 'Delivery heatmap · Manager leaderboard · Multi-metric comparison' },
  talent: { title: 'Talent & People', subtitle: 'Performance/potential matrix · Succession planning · Engagement' },
  compensation: { title: 'Compensation', subtitle: 'Commission cost analysis · Team & individual breakdown · Tier structure' },
  forecast: { title: 'Business Forecast', subtitle: 'FY 2026 · Quarterly breakdown · Concentration risk · Accuracy track record' },
  'win-loss': { title: 'Win/Loss Analysis', subtitle: 'Deal outcomes · Loss reason trends · Win patterns' },
  velocity: { title: 'Pipeline Velocity', subtitle: 'Stage movement speed · YoY comparison · Stalling deals' },
  'market-share': { title: 'Market Share', subtitle: 'Immediate vs all competitors · By format · By category · Growth trajectory' },
  'category-share': { title: 'Category Share', subtitle: 'Immediate share by advertiser category · Market sizing · Growth gaps' },
  'competitor-intel': { title: 'Competitor Intelligence', subtitle: 'Curated competitive news · Impact assessment · Recommended actions' },
  'agency-consol': { title: 'Agency Consolidation', subtitle: 'Tier-1 group spending · Cross-team wallet share · Strategic priorities' },
  'brand-pnl': { title: 'Brand P&L', subtitle: 'Revenue · Cost · Contribution margin by brand' },
  'brand-strategy': { title: 'Brand Strategy', subtitle: 'Invest · Maintain · Harvest · Divest — portfolio positioning' },
  'content-commercial': { title: 'Content vs Commercial', subtitle: 'Editorial investment · Ad revenue return · Efficiency ratio' },
  initiatives: { title: 'Strategic Initiatives', subtitle: 'Active programmes · Progress · RAG status · Budget tracking' },
  decisions: { title: 'Decisions Log', subtitle: 'Major decisions · Rationale · Outcome reviews · Organisational memory' },
  'revenue-close': { title: 'Revenue Close', subtitle: 'Booked → Delivered → Invoiced → Collected · Waterfall analysis' },
  'aged-debt': { title: 'Aged Debt', subtitle: 'Outstanding balances · 30/60/90 day aging · Pipeline cross-reference' },
  margins: { title: 'Margin Analysis', subtitle: 'By team · By client · By brand · Revenue minus cost minus commission' },
  'forecast-accuracy': { title: 'Forecast Accuracy', subtitle: '8-quarter track record · Variance analysis · Confidence building' },
  'perf-matrix': { title: 'Performance Matrix', subtitle: 'Performance × Potential · Quadrant mapping · Individual deep-dive' },
  'flight-risk': { title: 'Flight Risk', subtitle: 'At-risk talent · Comp exposure · Intervention recommendations' },
  hiring: { title: 'Hiring Pipeline', subtitle: 'Open roles · Candidates · Time-to-fill · Offer acceptance' },
  'comp-benchmark': { title: 'Comp Benchmark', subtitle: 'Internal vs market rates · Below-median flags · Role benchmarking' },
  lessons: { title: 'Lessons Learned', subtitle: 'Campaign post-mortems · Searchable knowledge base · Pattern recognition' },
  events: { title: 'Events Calendar', subtitle: 'Industry events · Trading reviews · Pipeline at risk · Key dates' },
  news: { title: 'News Feed', subtitle: 'Client · Agency · Competitor · Regulatory · Market intelligence' },
};

export default function DirectorDashboard() {
  const [activePage, setActivePage] = useState('home');
  const [detailId, setDetailId] = useState<string | undefined>();
  const [chatOpen, setChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useCallback((page: string, detail?: string) => {
    setActivePage(page);
    setDetailId(detail);
    const main = document.getElementById('director-main-scroll');
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

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <ExecutiveOverview onNavigate={navigate} />;
      case 'cross-team': return <CrossTeamPerformance onNavigate={navigate} />;
      case 'talent': return <TalentPeople onNavigate={navigate} />;
      case 'compensation': return <CompensationView onNavigate={navigate} />;
      case 'forecast': return <BusinessForecast onNavigate={navigate} />;
      case 'win-loss': return <WinLossAnalysis onNavigate={navigate} />;
      case 'velocity': return <PipelineVelocity onNavigate={navigate} />;
      case 'market-share': return <MarketShareDirector onNavigate={navigate} />;
      case 'category-share': return <CategoryShare onNavigate={navigate} />;
      case 'competitor-intel': return <CompetitorIntelligence onNavigate={navigate} />;
      case 'agency-consol': return <AgencyConsolidation onNavigate={navigate} />;
      case 'brand-pnl': return <BrandPnL onNavigate={navigate} />;
      case 'brand-strategy': return <BrandStrategy onNavigate={navigate} />;
      case 'content-commercial': return <ContentVsCommercial onNavigate={navigate} />;
      case 'initiatives': return <StrategicInitiatives onNavigate={navigate} />;
      case 'decisions': return <DecisionsLog onNavigate={navigate} />;
      case 'revenue-close': return <RevenueClose onNavigate={navigate} />;
      case 'aged-debt': return <AgedDebt onNavigate={navigate} />;
      case 'margins': return <MarginAnalysis onNavigate={navigate} />;
      case 'forecast-accuracy': return <ForecastAccuracy onNavigate={navigate} />;
      case 'perf-matrix': return <PerformanceMatrix onNavigate={navigate} />;
      case 'flight-risk': return <FlightRisk onNavigate={navigate} />;
      case 'hiring': return <HiringPipeline onNavigate={navigate} />;
      case 'comp-benchmark': return <CompBenchmark onNavigate={navigate} />;
      case 'lessons': return <LessonsLearned onNavigate={navigate} />;
      case 'events': return <EventsCalendar onNavigate={navigate} />;
      case 'news': return <NewsFeed onNavigate={navigate} />;
      default: return <ExecutiveOverview onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-off">
      <DirectorSidebar
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
                FY 2026 · Q2 · 47 days remaining
              </div>
              <button className="px-4 py-[9px] rounded-[7px] text-[12.5px] font-semibold bg-paper text-navy border border-line hover:border-sky transition-all">
                Export
              </button>
              <button className="px-4 py-[9px] rounded-[7px] text-[12.5px] font-semibold bg-navy text-paper hover:bg-sky transition-all">
                Board Pack
              </button>
            </>
          }
        />

        <main id="director-main-scroll" className="flex-1 overflow-y-auto">
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
