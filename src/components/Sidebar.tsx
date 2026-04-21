'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { navigation } from '@/lib/navigation';
import { RoleSwitcher } from '@/components/ui/RoleSwitcher';
import {
  LayoutDashboard, Target, TrendingUp, PoundSterling,
  Building2, Users, BarChart3, ArrowUpDown, PieChart,
  Clock, Star, Crosshair, FileText, Plug,
  Sparkles, X, Menu,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Target, TrendingUp, PoundSterling,
  Building2, Users, BarChart3, ArrowUpDown, PieChart,
  Clock, Star, Crosshair, FileText, Plug,
};

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onOpenChat: () => void;
  className?: string;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ activePage, onNavigate, onOpenChat, className, mobileOpen, onCloseMobile }: SidebarProps) {
  const [minutesAgo, setMinutesAgo] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setMinutesAgo(prev => prev + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const getIcon = (name: string) => {
    const Icon = iconMap[name];
    return Icon ? <Icon className="w-[16px] h-[16px] opacity-80" /> : null;
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside className={cn(
        'bg-[#081B3D] text-white flex flex-col h-full overflow-y-auto relative',
        'w-[252px] flex-shrink-0',
        // Mobile: fixed overlay
        'fixed lg:relative z-50 lg:z-auto',
        'transition-transform duration-200 lg:translate-x-0',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        className
      )}>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 120% 80% at 20% 10%, rgba(74,180,232,0.06) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 80% 90%, rgba(123,78,201,0.04) 0%, transparent 60%)'
        }} />

        {/* Logo */}
        <div className="px-6 pt-[22px] pb-[18px] border-b border-white/[0.08] relative">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display font-[900] text-[30px] leading-[0.9] tracking-[-0.01em]">
                COHORT<span className="text-sky">.</span>
              </div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-white/50 mt-1 font-medium">
                Sales OS
              </div>
            </div>
            <button onClick={onCloseMobile} className="lg:hidden text-white/60 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-2 px-6 py-[14px] text-[11px] text-white/60 border-b border-white/[0.08] relative">
          <div className="w-2 h-2 bg-good rounded-full animate-pulse-dot" style={{
            boxShadow: '0 0 8px #1DB77A'
          }} />
          <span>Live · updated {minutesAgo} min ago</span>
        </div>

        {/* Navigation */}
        <div className="flex-1 relative">
          {navigation.map(section => (
            <div key={section.label}>
              <div className="text-[10px] tracking-[0.15em] uppercase text-white/[0.35] font-semibold px-6 pt-4 pb-[6px]">
                {section.label}
              </div>
              {section.items.map(item => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    onCloseMobile?.();
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-6 py-[9px] text-[13px] font-medium',
                    'transition-all duration-150 border-l-[3px] border-transparent text-left',
                    activePage === item.page
                      ? 'bg-sky/[0.12] text-white border-l-sky'
                      : 'text-white/[0.65] hover:bg-white/[0.04] hover:text-white'
                  )}
                >
                  <span className="w-[18px] flex justify-center">
                    {getIcon(item.icon)}
                  </span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={cn(
                      'ml-auto text-[10px] font-bold px-[7px] py-[2px] rounded-[10px] font-mono',
                      item.badgeVariant === 'risk' ? 'bg-risk text-white' :
                      item.badgeVariant === 'new' ? 'bg-good text-white' :
                      'bg-sky text-navy-deep'
                    )}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Ask Cohort button */}
        <button
          onClick={onOpenChat}
          className={cn(
            'mx-4 mb-3 flex items-center gap-2 px-4 py-[10px] rounded-lg',
            'bg-sky/[0.12] text-sky-bright hover:bg-sky/[0.2] transition-all',
            'text-[13px] font-semibold border border-sky/[0.15] relative'
          )}
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask Cohort</span>
          <span className="ml-auto text-[10px] text-white/40 font-mono">⌘K</span>
        </button>

        <RoleSwitcher currentUser="Rachel" />
      </aside>
    </>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="lg:hidden p-2 text-navy hover:bg-off rounded-lg">
      <Menu className="w-5 h-5" />
    </button>
  );
}
