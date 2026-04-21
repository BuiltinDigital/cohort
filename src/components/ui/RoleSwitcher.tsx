'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronUp } from 'lucide-react';

export interface UserProfile {
  name: string;
  initial: string;
  role: string;
  subtitle: string;
  avatarColor: string;
  href: string;
}

const allUsers: UserProfile[] = [
  { name: 'James', initial: 'J', role: 'Director', subtitle: 'Director · Sales', avatarColor: '#7B4EC9', href: '/director' },
  { name: 'Rachel', initial: 'R', role: 'Manager', subtitle: 'Manager · Publicis + Omnicom', avatarColor: '#4AB4E8', href: '/' },
  { name: 'Alicia', initial: 'A', role: 'Sales Rep', subtitle: 'Sales · Publicis Group', avatarColor: '#1DB77A', href: '/sales' },
];

interface RoleSwitcherProps {
  currentUser: string; // 'James' | 'Rachel' | 'Alicia'
}

export function RoleSwitcher({ currentUser }: RoleSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = allUsers.find(u => u.name === currentUser) || allUsers[1];
  const others = allUsers.filter(u => u.name !== currentUser);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="px-4 py-2 border-t border-white/[0.08] relative">
      {/* Dropdown popup — opens upward */}
      {open && (
        <div className="absolute bottom-full left-3 right-3 mb-1 bg-[#0F1D38] border border-white/[0.12] rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-up">
          <div className="px-3 py-2 text-[9px] tracking-[0.15em] uppercase text-white/30 font-bold">
            Switch user
          </div>
          {others.map(user => (
            <a
              key={user.name}
              href={user.href}
              className="flex items-center gap-[10px] px-3 py-[10px] hover:bg-white/[0.06] transition-colors cursor-pointer group"
              onClick={() => setOpen(false)}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] flex-shrink-0 text-white"
                style={{ background: user.avatarColor }}
              >
                {user.initial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12.5px] text-white/80 group-hover:text-white font-semibold transition-colors">
                  {user.name}
                </div>
                <div className="text-[10.5px] text-white/40 group-hover:text-white/60 transition-colors">
                  {user.subtitle}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Current user button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-[10px] px-2 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] transition-colors text-left"
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] flex-shrink-0 text-white"
          style={{ background: current.avatarColor }}
        >
          {current.initial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12.5px] text-white font-semibold">{current.name}</div>
          <div className="text-[10.5px] text-white/50">{current.subtitle}</div>
        </div>
        <ChevronUp className={cn(
          'w-4 h-4 text-white/40 transition-transform flex-shrink-0',
          open ? 'rotate-0' : 'rotate-180'
        )} />
      </button>
    </div>
  );
}
