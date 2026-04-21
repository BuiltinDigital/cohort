'use client';

import { cn } from '@/lib/utils';

interface TabGroupProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export function TabGroup({ tabs, activeTab, onTabChange, className }: TabGroupProps) {
  return (
    <div className={cn(
      'flex gap-[6px] bg-paper border border-line rounded-[10px] p-[5px] w-fit',
      className
    )}>
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            'px-4 py-2 rounded-[6px] text-[12.5px] font-semibold transition-all',
            activeTab === tab
              ? 'bg-navy text-paper'
              : 'text-muted hover:bg-off hover:text-navy'
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
