'use client';

import { useMemo } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { myContacts, type MyContact } from '@/lib/data/sales/myContacts';
import { cn } from '@/lib/utils';

const agencyOrder = ['Starcom', 'Zenith', 'Spark Foundry', 'Digitas'];

const relationshipBadge: Record<MyContact['relationship'], { bg: string; text: string; label: string }> = {
  strong:     { bg: 'bg-good/15',     text: 'text-good',  label: 'Strong' },
  good:       { bg: 'bg-sky-soft',    text: 'text-sky',   label: 'Good' },
  developing: { bg: 'bg-warn/15',     text: 'text-warn',  label: 'Developing' },
  cold:       { bg: 'bg-line',        text: 'text-muted', label: 'Cold' },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
}

export function AgencyContacts({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  const grouped = useMemo(() => {
    const map: Record<string, MyContact[]> = {};
    for (const c of myContacts) {
      (map[c.agency] ??= []).push(c);
    }
    return agencyOrder.map(a => ({ agency: a, contacts: map[a] || [] }));
  }, []);

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="font-display font-[900] text-[36px] text-navy leading-none mb-1">
          Agency Contacts
        </h1>
        <p className="text-[13px] text-muted">
          {myContacts.length} contacts across {agencyOrder.length} Publicis agencies
        </p>
      </div>

      {grouped.map(({ agency, contacts }) => (
        <div key={agency}>
          <SectionHeading title={agency} count={contacts.length} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px] mb-2">
            {contacts.map(c => {
              const badge = relationshipBadge[c.relationship];
              return (
                <div
                  key={c.email}
                  className="bg-paper border border-line rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  {/* Name + Badge */}
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-semibold text-navy text-[14px] leading-snug">
                      {c.name}
                    </div>
                    <span className={cn(
                      'text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-[3px] rounded',
                      badge.bg, badge.text
                    )}>
                      {badge.label}
                    </span>
                  </div>

                  {/* Role */}
                  <div className="text-[12px] text-muted mb-3">{c.role}</div>

                  {/* Contact info */}
                  <div className="space-y-[3px] mb-3">
                    <div className="font-mono text-[11px] text-ink truncate">{c.email}</div>
                    <div className="font-mono text-[11px] text-ink">{c.phone}</div>
                  </div>

                  {/* Last contact */}
                  <div className="text-[11px] text-muted">
                    Last contact: {formatDate(c.lastContact)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
