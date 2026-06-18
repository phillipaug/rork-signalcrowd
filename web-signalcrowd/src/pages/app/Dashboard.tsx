import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { AreaChart } from "@/components/charts/AreaChart";
import { StatCard, SectionTitle, UpgradeTeaser } from "@/components/ui-kit/Primitives";
import { ForecastCard } from "@/components/signal/ForecastCard";
import { Delta, GradeBadge } from "@/components/signal/SignalBadges";
import { GLOBAL_SIGNAL, PLATFORM_STATS, todaysMoves, forecasts, indexes } from "@/data/mock";
import { ArrowUpRight, ArrowDownRight, ArrowRight, TrendingUp, Target } from "lucide-react";

function SnapshotRow({ label, value, accent }: { label: string; value: string; accent?: "pos" | "neg" }) {
  return (
    <div className="flex items-center justify-between border-b border-border py-2.5 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-sm font-bold ${accent === "pos" ? "text-positive" : accent === "neg" ? "text-negative" : "text-navy"}`}>
        {value}
      </span>
    </div>
  );
}

export default function Dashboard() {
  const topMovers = [...forecasts].sort((a, b) => Math.abs(b.trend7d) - Math.abs(a.trend7d)).slice(0, 3);

  return (
    <AppLayout>
      {/* Hero card */}
      <div className="surface-card relative overflow-hidden p-6 lg:p-8">
        <div className="absolute right-0 top-0 h-full w-1/2 hero-glow opacity-60" />
        <div className="relative grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-positive animate-pulse-dot" />
              <p className="text-xs font-bold uppercase tracking-widest text-electric">Global Signal Index</p>
            </div>
            <div className="mt-3 flex items-end gap-3">
              <span className="font-mono-num text-6xl font-bold tracking-tighter text-navy">{GLOBAL_SIGNAL.score}</span>
              <span className="mb-2 text-lg text-muted-foreground">/ 100</span>
              <Delta value={GLOBAL_SIGNAL.weeklyChange} className="mb-2.5 text-lg" />
            </div>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">{GLOBAL_SIGNAL.subtitle}</p>
          </div>
          <AreaChart data={GLOBAL_SIGNAL.trendData} height={180} />
        </div>
      </div>

      {/* Metric cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Active Forecasts" value={PLATFORM_STATS.activeForecasts} />
        <StatCard label="Active Forecasters" value={PLATFORM_STATS.activeForecasters} />
        <StatCard label="Forecast Updates" value={PLATFORM_STATS.forecastUpdates} />
        <StatCard label="Resolved Outcomes" value={PLATFORM_STATS.resolvedOutcomes} />
        <StatCard label="Avg Crowd Accuracy" value={PLATFORM_STATS.avgCrowdAccuracy} accent />
        <StatCard label="Trends Confirmed" value={PLATFORM_STATS.trendsConfirmed} accent />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Biggest moves */}
        <div className="lg:col-span-2">
          <SectionTitle action={<Link to="/app/forecasts" className="text-sm font-bold text-electric">All forecasts</Link>}>
            Today's Biggest Signal Moves
          </SectionTitle>
          <div className="surface-card divide-y divide-border overflow-hidden">
            {todaysMoves.map((m, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-4">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${m.positive ? "bg-positive-soft" : "bg-negative-soft"}`}>
                  {m.positive ? <ArrowUpRight className="h-4.5 w-4.5 text-positive" style={{ width: 18, height: 18 }} /> : <ArrowDownRight className="h-4.5 w-4.5 text-negative" style={{ width: 18, height: 18 }} />}
                </div>
                <p className="flex-1 text-sm font-medium text-navy">{m.text}</p>
                <Delta value={m.change} />
              </div>
            ))}
          </div>
        </div>

        {/* Crowd reliability snapshot */}
        <div>
          <SectionTitle>Crowd Reliability Snapshot</SectionTitle>
          <div className="surface-card p-5">
            <SnapshotRow label="Crowd Right Rate" value="72.8%" accent="pos" />
            <SnapshotRow label="Overconfidence Score" value="18%" accent="neg" />
            <SnapshotRow label="Best Category" value="AI" />
            <SnapshotRow label="Weakest Category" value="Geopolitics" />
            <SnapshotRow label="Most Reliable Index" value="Housing" />
            <SnapshotRow label="Most Overheated" value="Crypto" accent="neg" />
          </div>
          <div className="mt-3">
            <UpgradeTeaser text="See when the crowd is most likely wrong." />
          </div>
        </div>
      </div>

      {/* Top indexes strip */}
      <div className="mt-8">
        <SectionTitle action={<Link to="/app/indexes" className="text-sm font-bold text-electric">View all indexes</Link>}>
          Live Probability Indexes
        </SectionTitle>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {indexes.map((idx) => (
            <Link key={idx.id} to={`/app/indexes/${idx.id}`} className="surface-card surface-card-hover w-44 shrink-0 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-navy-soft line-clamp-1">{idx.name.replace(" Index", "")}</span>
                <GradeBadge grade={idx.reliabilityGrade} className="!px-1.5 !py-0 !text-xs" />
              </div>
              <p className="mt-2 font-mono-num text-2xl font-bold text-navy">{idx.score}</p>
              <Delta value={idx.weeklyChange} className="text-xs" />
            </Link>
          ))}
        </div>
      </div>

      {/* Trending forecasts */}
      <div className="mt-8">
        <SectionTitle action={<Link to="/app/forecasts" className="inline-flex items-center gap-1 text-sm font-bold text-electric">Browse feed <ArrowRight className="h-4 w-4" /></Link>}>
          Biggest Movers This Week
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topMovers.map((f) => (
            <ForecastCard key={f.id} f={f} />
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link to="/app/forecasts/new" className="surface-card surface-card-hover flex items-center gap-4 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent"><Target className="h-5 w-5 text-electric" /></div>
          <div>
            <p className="font-bold text-navy">Propose a forecast question</p>
            <p className="text-sm text-muted-foreground">Add a clear, resolvable question to the network.</p>
          </div>
        </Link>
        <Link to="/app/briefings" className="surface-card surface-card-hover flex items-center gap-4 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-premium-soft"><TrendingUp className="h-5 w-5 text-premium" /></div>
          <div>
            <p className="font-bold text-navy">Read today's Signal Briefing</p>
            <p className="text-sm text-muted-foreground">The biggest moves, reliability, and hype-risk alerts.</p>
          </div>
        </Link>
      </div>
    </AppLayout>
  );
}
