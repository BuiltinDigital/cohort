'use client';

import { MobileMenuButton } from './Sidebar';

interface TopbarProps {
  title: string;
  subtitle: string;
  onOpenMobileMenu: () => void;
  actions?: React.ReactNode;
}

export function Topbar({ title, subtitle, onOpenMobileMenu, actions }: TopbarProps) {
  return (
    <div className="sticky top-0 bg-paper/90 backdrop-blur-lg border-b border-line px-4 lg:px-8 py-4 flex justify-between items-center z-10">
      <div className="flex items-center gap-3">
        <MobileMenuButton onClick={onOpenMobileMenu} />
        <div>
          <h1 className="font-display font-[800] text-[28px] leading-none text-navy tracking-[-0.005em]">
            {title}
          </h1>
          <p className="text-[12px] text-muted mt-[3px]">{subtitle}</p>
        </div>
      </div>
      <div className="hidden md:flex gap-[10px] items-center">
        <div className="px-[14px] py-[7px] bg-sky-soft text-navy text-[11.5px] font-semibold rounded-[18px] whitespace-nowrap">
          Q2 2026 · 47 days remaining
        </div>
        {actions || (
          <>
            <button className="px-4 py-[9px] rounded-[7px] text-[12.5px] font-semibold bg-paper text-navy border border-line hover:border-sky transition-all">
              Filter
            </button>
            <button className="px-4 py-[9px] rounded-[7px] text-[12.5px] font-semibold bg-navy text-paper hover:bg-sky transition-all">
              + New Campaign
            </button>
          </>
        )}
      </div>
    </div>
  );
}
