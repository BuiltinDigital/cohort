'use client';

const segments = [
  {
    name: 'Food Enthusiasts',
    profiles: 8_200_000,
    brands: 'BBC Good Food + Olive',
    matchRate: 84,
  },
  {
    name: 'Home & Garden',
    profiles: 6_400_000,
    brands: "Gardeners' World + Countryfile",
    matchRate: 78,
  },
  {
    name: 'Auto Intenders',
    profiles: 2_100_000,
    brands: 'Top Gear',
    matchRate: 68,
  },
  {
    name: 'Premium Shoppers',
    profiles: 3_600_000,
    brands: 'Cross-brand',
    matchRate: 76,
  },
  {
    name: 'Entertainment Seekers',
    profiles: 4_800_000,
    brands: 'Radio Times',
    matchRate: 71,
  },
  {
    name: 'Travel Planners',
    profiles: 1_900_000,
    brands: 'Cross-brand',
    matchRate: 72,
  },
];

function formatProfiles(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
  return String(n);
}

function matchBarColor(rate: number): string {
  if (rate >= 80) return 'bg-good';
  if (rate >= 70) return 'bg-sky';
  return 'bg-warn';
}

export function AudienceSegmentsSales({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="font-display font-[900] text-[36px] text-navy leading-none mb-1">
          Audience Segments
        </h1>
        <p className="text-[13px] text-muted">
          {segments.length} segments available to pitch to your Publicis clients
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px]">
        {segments.map(seg => (
          <div
            key={seg.name}
            className="bg-paper border border-line rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col"
          >
            {/* Segment name */}
            <div className="font-display font-[800] text-[18px] text-navy leading-snug mb-1">
              {seg.name}
            </div>

            {/* Source brands */}
            <div className="text-[11px] text-muted mb-4">{seg.brands}</div>

            {/* Big number — profile count */}
            <div className="mb-4">
              <div className="font-display font-[800] text-[34px] text-navy leading-none">
                {formatProfiles(seg.profiles)}
              </div>
              <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold mt-[2px]">
                Profiles
              </div>
            </div>

            {/* Match rate bar */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-[6px]">
                <span className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold">
                  Match Rate
                </span>
                <span className="font-mono text-[12px] font-semibold text-ink">
                  {seg.matchRate}%
                </span>
              </div>
              <div className="h-[8px] bg-line rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${matchBarColor(seg.matchRate)} transition-all duration-500`}
                  style={{ width: `${seg.matchRate}%` }}
                />
              </div>
            </div>

            {/* CTA */}
            <button className="mt-auto w-full bg-navy text-paper text-[12px] font-bold tracking-[0.06em] uppercase py-[10px] rounded-lg hover:bg-navy/90 transition-colors">
              Pitch to client
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
