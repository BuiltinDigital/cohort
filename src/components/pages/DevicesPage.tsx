'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

type DeviceView = 'both' | 'iphone' | 'ipad';

export function DevicesPage({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  const [view, setView] = useState<DeviceView>('both');

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-[800] text-[22px] text-navy">Device Previews</h2>
          <p className="text-[12px] text-muted mt-1">How Cohort looks on mobile and tablet</p>
        </div>
        <div className="flex gap-[6px] bg-paper border border-line rounded-[10px] p-[5px]">
          {(['both', 'iphone', 'ipad'] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                'px-4 py-2 rounded-[6px] text-[12.5px] font-semibold transition-all capitalize',
                view === v ? 'bg-navy text-paper' : 'text-muted hover:bg-off hover:text-navy'
              )}
            >
              {v === 'both' ? 'Both Devices' : v === 'iphone' ? 'iPhone' : 'iPad'}
            </button>
          ))}
        </div>
      </div>

      {/* Devices */}
      <div className={cn(
        'flex gap-8 justify-center items-start',
        view === 'ipad' ? 'flex-col items-center' : ''
      )}>

        {/* iPhone */}
        {(view === 'both' || view === 'iphone') && (
          <div className="flex-shrink-0">
            <div className="text-center mb-3">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-[0.1em]">iPhone 15 Pro</span>
            </div>
            <div style={{
              width: 280,
              height: 606,
              background: '#000',
              borderRadius: 36,
              padding: 8,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 0 0 1.5px #333',
              position: 'relative',
            }}>
              {/* Notch */}
              <div style={{
                position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
                width: 86, height: 23, background: '#000', borderRadius: '0 0 14px 14px', zIndex: 10,
              }} />
              <div style={{
                width: '100%', height: '100%', borderRadius: 28, overflow: 'hidden', background: '#F7FAFD',
              }}>
                {/* Status bar */}
                <div style={{ background: '#081B3D', color: '#fff', padding: '10px 20px 6px', display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 600 }}>
                  <span>9:41</span>
                  <span style={{ fontSize: 10 }}>●●●● 🔋</span>
                </div>
                {/* Nav header */}
                <div style={{ background: '#081B3D', padding: '4px 14px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="font-display font-[900] text-[16px] text-paper">COHORT<span className="text-sky">.</span></span>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#4AB4E8', color: '#081B3D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 9 }}>R</div>
                </div>
                {/* Tabs */}
                <div style={{ background: '#081B3D', padding: '0 10px 8px', display: 'flex', gap: 3, overflowX: 'auto' }}>
                  {['Overview', 'Campaigns', 'Pipeline', 'Market'].map((t, i) => (
                    <span key={t} style={{
                      padding: '5px 10px', borderRadius: 14, fontSize: 9, fontWeight: 600, whiteSpace: 'nowrap',
                      background: i === 0 ? '#4AB4E8' : 'transparent',
                      color: i === 0 ? '#081B3D' : 'rgba(255,255,255,0.5)',
                    }}>{t}</span>
                  ))}
                </div>
                {/* Content */}
                <div style={{ padding: 10, overflowY: 'auto', height: 'calc(100% - 100px)' }}>
                  {/* Live */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 10px', background: '#fff', border: '1px solid #E4EAF2', borderRadius: 8, marginBottom: 8, fontSize: 8, color: '#6B7A93' }}>
                    <div style={{ width: 5, height: 5, background: '#1DB77A', borderRadius: '50%', boxShadow: '0 0 4px #1DB77A' }} />
                    Live · updated 4 min ago
                    <span style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono', fontSize: 7 }}>Q2 · 47d</span>
                  </div>
                  {/* Hero */}
                  <div style={{ background: 'linear-gradient(135deg, #4AB4E8, #5EC4F4)', borderRadius: 12, padding: 14, color: '#fff', marginBottom: 8, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '50%' }} />
                    <div style={{ fontSize: 7, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, opacity: 0.9, position: 'relative' }}>My Team</div>
                    <div className="font-display font-[900]" style={{ fontSize: 17, lineHeight: 1, margin: '3px 0 8px', position: 'relative' }}>Rachel&apos;s Team</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, position: 'relative' }}>
                      <span className="font-display font-[900]" style={{ fontSize: 46, lineHeight: 0.85, letterSpacing: '-0.03em' }}>87</span>
                      <div>
                        <div className="font-display" style={{ fontWeight: 700, fontSize: 11 }}>Delivery Confidence</div>
                        <div style={{ fontSize: 8, opacity: 0.8 }}>↑ 4 pts · On track</div>
                      </div>
                    </div>
                  </div>
                  {/* Stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 8 }}>
                    {[
                      { label: 'Revenue YTD', value: '£4.2m', sub: '95.8% of target' },
                      { label: 'Commission', value: '£218k', sub: '+11% vs Q1', good: true },
                      { label: 'Campaigns', value: '18', sub: '2 at risk' },
                      { label: 'Pipeline', value: '£2.9m', sub: 'Q3: £3.4m' },
                    ].map(s => (
                      <div key={s.label} style={{ background: '#fff', border: '1px solid #E4EAF2', borderRadius: 8, padding: '8px 10px' }}>
                        <div style={{ fontSize: 7, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B7A93', fontWeight: 700, marginBottom: 3 }}>{s.label}</div>
                        <div className="font-display font-[800]" style={{ fontSize: 18, color: '#0E2A5C', lineHeight: 1 }}>{s.value}</div>
                        <div style={{ fontSize: 7, color: s.good ? '#1DB77A' : '#6B7A93', marginTop: 2 }}>{s.sub}</div>
                      </div>
                    ))}
                  </div>
                  {/* Member cards */}
                  {[
                    { name: 'Alicia', color: '#7B4EC9', delivered: '£1.8m', score: '89', delta: '↑ 3', campaigns: '10', progress: 82 },
                    { name: 'Renita', color: '#E89F4A', delivered: '£2.4m', score: '85', delta: '↓ 2', campaigns: '8', progress: 78 },
                  ].map(m => (
                    <div key={m.name} style={{ background: '#fff', border: '1px solid #E4EAF2', borderRadius: 10, padding: 10, marginBottom: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                        <div style={{ width: 26, height: 26, borderRadius: '50%', background: m.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 10 }}>{m.name[0]}</div>
                        <div>
                          <div className="font-display font-[800]" style={{ fontSize: 14, color: '#0E2A5C', lineHeight: 1 }}>{m.name}</div>
                          <div style={{ fontSize: 7, color: '#6B7A93', marginTop: 1 }}>Publicis Group</div>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, marginBottom: 6 }}>
                        <div>
                          <div style={{ fontSize: 6, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B7A93', fontWeight: 700 }}>Delivered</div>
                          <div className="font-display font-[800]" style={{ fontSize: 14, color: '#0E2A5C' }}>{m.delivered}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 6, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B7A93', fontWeight: 700 }}>Score</div>
                          <div className="font-display font-[800]" style={{ fontSize: 14, color: '#0E2A5C' }}>{m.score}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 6, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B7A93', fontWeight: 700 }}>Campaigns</div>
                          <div className="font-display font-[800]" style={{ fontSize: 14, color: '#0E2A5C' }}>{m.campaigns}</div>
                        </div>
                      </div>
                      <div style={{ height: 4, background: '#E4EAF2', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${m.progress}%`, background: 'linear-gradient(90deg, #4AB4E8, #0E2A5C)', borderRadius: 2 }} />
                      </div>
                    </div>
                  ))}
                  {/* Risk card */}
                  <div style={{ background: 'linear-gradient(180deg, #FFF0F3 0%, #fff 40%)', border: '1px solid rgba(229,62,92,0.3)', borderRadius: 10, padding: 10, marginBottom: 6 }}>
                    <span style={{ display: 'inline-block', fontSize: 7, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 5px', borderRadius: 3, background: '#E53E5C', color: '#fff', marginBottom: 6 }}>At Risk Now</span>
                    <div style={{ fontSize: 7, color: '#6B7A93', marginBottom: 2 }}>Alicia · Starcom</div>
                    <div className="font-display font-[800]" style={{ fontSize: 12, color: '#0E2A5C', lineHeight: 1.1, marginBottom: 2 }}>Audi — Easter Drive</div>
                    <div style={{ fontSize: 7, color: '#6B7A93', marginBottom: 6 }}>Direct + Programmatic · £180k</div>
                    <div style={{ height: 4, background: '#E4EAF2', borderRadius: 2, overflow: 'hidden', marginBottom: 3 }}>
                      <div style={{ height: '100%', width: '54%', background: '#E53E5C', borderRadius: 2 }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 7, fontFamily: 'JetBrains Mono', marginBottom: 6 }}>
                      <span>42.1k / 63k</span>
                      <span style={{ color: '#E53E5C' }}>-33%</span>
                    </div>
                    <div style={{ background: '#0E2A5C', color: '#fff', padding: '6px 8px', borderRadius: 5, fontSize: 8, fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                      Reallocate inventory
                      <span style={{ fontFamily: 'JetBrains Mono', background: 'rgba(255,255,255,0.15)', padding: '1px 4px', borderRadius: 2, fontSize: 7 }}>+18%</span>
                    </div>
                  </div>
                </div>
                {/* Bottom nav */}
                <div style={{ position: 'absolute', bottom: 0, left: 8, right: 8, background: '#fff', borderTop: '1px solid #E4EAF2', display: 'flex', justifyContent: 'space-around', padding: '5px 0 16px', borderRadius: '0 0 28px 28px' }}>
                  {[
                    { icon: '◆', label: 'Overview', active: true },
                    { icon: '▣', label: 'Campaigns' },
                    { icon: '◈', label: 'Pipeline' },
                    { icon: '◉', label: 'Market' },
                    { icon: '⋯', label: 'More' },
                  ].map(n => (
                    <div key={n.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, fontSize: 7, fontWeight: 600, color: n.active ? '#4AB4E8' : '#6B7A93', cursor: 'pointer' }}>
                      <span style={{ fontSize: 12 }}>{n.icon}</span>
                      {n.label}
                    </div>
                  ))}
                </div>
                {/* FAB */}
                <div style={{ position: 'absolute', bottom: 52, right: 16, width: 32, height: 32, background: '#4AB4E8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, boxShadow: '0 3px 12px rgba(74,180,232,0.4)' }}>✦</div>
              </div>
            </div>
          </div>
        )}

        {/* iPad */}
        {(view === 'both' || view === 'ipad') && (
          <div className="flex-shrink-0">
            <div className="text-center mb-3">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-[0.1em]">iPad Pro 11&quot;</span>
            </div>
            <div style={{
              width: view === 'both' ? 580 : 720,
              height: view === 'both' ? 435 : 540,
              background: '#1a1a1a',
              borderRadius: 20,
              padding: 10,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 0 0 1.5px #333',
            }}>
              <div style={{ width: '100%', height: '100%', borderRadius: 12, overflow: 'hidden', background: '#F7FAFD', display: 'flex' }}>
                {/* Sidebar */}
                <div style={{ width: view === 'both' ? 150 : 190, background: '#081B3D', color: '#fff', flexShrink: 0, overflowY: 'auto', position: 'relative', fontSize: view === 'both' ? 9 : 11 }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 120% 80% at 20% 10%, rgba(74,180,232,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
                  <div style={{ padding: '12px 12px 10px', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
                    <div className="font-display font-[900]" style={{ fontSize: view === 'both' ? 16 : 20, color: '#fff' }}>COHORT<span style={{ color: '#4AB4E8' }}>.</span></div>
                    <div style={{ fontSize: 7, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Sales OS</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '7px 12px', fontSize: 8, color: 'rgba(255,255,255,0.5)', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
                    <div style={{ width: 4, height: 4, background: '#1DB77A', borderRadius: '50%', boxShadow: '0 0 4px #1DB77A' }} />
                    Live · 4 min ago
                  </div>
                  {[
                    { section: 'My Team', items: [{ name: 'Overview', active: true }, { name: 'Campaigns', badge: '18' }, { name: 'Pipeline' }, { name: 'Commission' }] },
                    { section: 'Intelligence', items: [{ name: 'Market Analysis' }, { name: 'Year on Year' }, { name: 'Market Share' }] },
                    { section: 'Brands', items: [{ name: 'Brand Performance' }, { name: 'Audience Studio' }] },
                    { section: 'Reporting', items: [{ name: 'Weekly Report' }, { name: 'Integrations' }] },
                  ].map(s => (
                    <div key={s.section} style={{ position: 'relative' }}>
                      <div style={{ fontSize: 7, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 700, padding: '10px 12px 3px' }}>{s.section}</div>
                      {s.items.map(item => (
                        <div key={item.name} style={{
                          padding: '5px 12px', fontSize: view === 'both' ? 9 : 11, color: item.active ? '#fff' : 'rgba(255,255,255,0.55)', fontWeight: 500,
                          background: item.active ? 'rgba(74,180,232,0.12)' : 'transparent',
                          borderLeft: item.active ? '2px solid #4AB4E8' : '2px solid transparent',
                          display: 'flex', justifyContent: 'space-between',
                        }}>
                          {item.name}
                          {item.badge && <span style={{ fontSize: 7, fontWeight: 700, background: '#4AB4E8', color: '#081B3D', padding: '1px 5px', borderRadius: 6 }}>{item.badge}</span>}
                        </div>
                      ))}
                    </div>
                  ))}
                  {/* Footer */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 12px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 6, background: '#081B3D' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#4AB4E8', color: '#081B3D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 8 }}>R</div>
                    <div>
                      <div style={{ fontSize: 8, color: '#fff', fontWeight: 600 }}>Rachel</div>
                      <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)' }}>Manager</div>
                    </div>
                  </div>
                </div>
                {/* Main content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  {/* Topbar */}
                  <div style={{ background: 'rgba(250,251,253,0.9)', borderBottom: '1px solid #E4EAF2', padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                    <div>
                      <div className="font-display font-[800]" style={{ fontSize: view === 'both' ? 15 : 18, color: '#0E2A5C' }}>Team Overview</div>
                      <div style={{ fontSize: 8, color: '#6B7A93', marginTop: 1 }}>Rachel&apos;s Team · 2 salespeople · 18 campaigns</div>
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <span style={{ padding: '4px 8px', background: '#E8F5FC', color: '#0E2A5C', fontSize: 8, fontWeight: 600, borderRadius: 10 }}>Q2 2026 · 47d</span>
                      <span style={{ padding: '4px 8px', background: '#0E2A5C', color: '#fff', fontSize: 8, fontWeight: 600, borderRadius: 4 }}>+ Campaign</span>
                    </div>
                  </div>
                  {/* Scrollable content */}
                  <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
                    {/* Hero + Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 10, marginBottom: 12 }}>
                      {/* Hero */}
                      <div style={{ background: 'linear-gradient(135deg, #4AB4E8, #5EC4F4)', borderRadius: 10, padding: 14, color: '#fff', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: -20, right: -20, width: 90, height: 90, border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: '50%' }} />
                        <div style={{ fontSize: 7, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, opacity: 0.9, position: 'relative' }}>My Team</div>
                        <div className="font-display font-[900]" style={{ fontSize: 17, lineHeight: 1, margin: '3px 0 10px', position: 'relative' }}>Rachel&apos;s Team</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, position: 'relative' }}>
                          <span className="font-display font-[900]" style={{ fontSize: view === 'both' ? 48 : 56, lineHeight: 0.85, letterSpacing: '-0.03em' }}>87</span>
                          <div>
                            <div className="font-display" style={{ fontWeight: 700, fontSize: 11 }}>Delivery Confidence</div>
                            <div style={{ fontSize: 8, opacity: 0.8 }}>↑ 4 pts · On track</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 4, alignItems: 'center', paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.15)', marginTop: 10, position: 'relative' }}>
                          {['A', 'R'].map(i => (
                            <div key={i} style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', color: '#0E2A5C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 7, border: '1.5px solid rgba(255,255,255,0.4)' }}>{i}</div>
                          ))}
                          <span style={{ fontSize: 8, opacity: 0.85, marginLeft: 2 }}>Alicia · Renita</span>
                        </div>
                      </div>
                      {/* Stats */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                        {[
                          { label: 'Revenue YTD', value: '£4.2m', sub: '95.8% of contracted' },
                          { label: 'Commission', value: '£218k', sub: '+11% vs Q1', good: true },
                          { label: 'Campaigns', value: '18', sub: '2 at risk · 3 watch' },
                          { label: 'Pipeline', value: '£2.9m', sub: 'Q3 target: £3.4m' },
                        ].map(s => (
                          <div key={s.label} style={{ background: '#fff', border: '1px solid #E4EAF2', borderRadius: 8, padding: '10px 12px' }}>
                            <div style={{ fontSize: 7, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B7A93', fontWeight: 700, marginBottom: 3 }}>{s.label}</div>
                            <div className="font-display font-[800]" style={{ fontSize: 20, color: '#0E2A5C', lineHeight: 1 }}>{s.value}</div>
                            <div style={{ fontSize: 7, color: s.good ? '#1DB77A' : '#6B7A93', marginTop: 2 }}>{s.sub}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Risk cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                      {[
                        { pill: 'At Risk Now', pillBg: '#E53E5C', owner: 'Alicia · Starcom', name: 'Audi — Easter Drive', pct: 54, barColor: '#E53E5C', meta: '42.1k / 63k', delta: '-33%', deltaColor: '#E53E5C', action: 'Reallocate inventory', impact: '+18%', cardBg: 'linear-gradient(180deg, #FFF0F3 0%, #fff 40%)', border: 'rgba(229,62,92,0.3)' },
                        { pill: 'At Risk Soon', pillBg: '#FF9D2E', owner: 'Renita · OMD', name: 'Pepsi — Summer Sizzle', pct: 71, barColor: '#FF9D2E', meta: '340k / 480k', delta: '-7%', deltaColor: '#FF9D2E', action: "Activate 'Gen Z'", impact: '+11%', cardBg: 'linear-gradient(180deg, #FFF5E8 0%, #fff 40%)', border: 'rgba(255,157,46,0.3)' },
                        { pill: 'Action Ready', pillBg: '#1DB77A', owner: 'Alicia · Spark', name: 'Virgin Atlantic — Long-Haul', pct: 91, barColor: '#1DB77A', meta: '218k / 240k', delta: '+3%', deltaColor: '#1DB77A', action: 'Upsell Q3 renewal', impact: '£64k', cardBg: '#fff', border: '#E4EAF2' },
                      ].map(r => (
                        <div key={r.name} style={{ background: r.cardBg, border: `1px solid ${r.border}`, borderRadius: 8, padding: 10 }}>
                          <span style={{ display: 'inline-block', fontSize: 7, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '2px 5px', borderRadius: 3, background: r.pillBg, color: '#fff', marginBottom: 6 }}>{r.pill}</span>
                          <div style={{ fontSize: 7, color: '#6B7A93', marginBottom: 2 }}>{r.owner}</div>
                          <div className="font-display font-[800]" style={{ fontSize: 11, color: '#0E2A5C', lineHeight: 1.1, marginBottom: 6 }}>{r.name}</div>
                          <div style={{ height: 4, background: '#E4EAF2', borderRadius: 2, overflow: 'hidden', marginBottom: 3 }}>
                            <div style={{ height: '100%', width: `${r.pct}%`, background: r.barColor, borderRadius: 2 }} />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 7, fontFamily: 'JetBrains Mono', marginBottom: 6 }}>
                            <span>{r.meta}</span>
                            <span style={{ color: r.deltaColor }}>{r.delta}</span>
                          </div>
                          <div style={{ background: '#0E2A5C', color: '#fff', padding: '5px 7px', borderRadius: 4, fontSize: 7, fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                            {r.action}
                            <span style={{ fontFamily: 'JetBrains Mono', background: 'rgba(255,255,255,0.15)', padding: '1px 3px', borderRadius: 2, fontSize: 6 }}>{r.impact}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
