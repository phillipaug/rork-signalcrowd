import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { AreaChart } from "@/components/charts/AreaChart";
import { StatCard, SectionTitle, UpgradeTeaser } from "@/components/ui-kit/Primitives";
import { RecommendationBadge, Delta, GradeBadge, LifecycleBadge } from "@/components/signal/SignalBadges";
import { GLOBAL_SIGNAL, PLATFORM_STATS, todaysMoves, products, commerceIndexes, highRiskProducts } from "@/data/mock";
import { ArrowUpRight, ArrowDownRight, ArrowRight, TrendingUp, AlertTriangle, Package, Zap } from "lucide-react";

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
  const topOpps = [...products].filter(p => p.recommendation === "Test Now" || p.recommendation === "Test Small").slice(0, 4);
  const riskAlerts = highRiskProducts.slice(0, 4);

  return (
    <AppLayout>
      {/* Hero card — Commerce Opportunity Index */}
      <div className="surface-card relative overflow-hidden p-6 lg:p-8">
        <div className="absolute right-0 top-0 h-full w-1/2 hero-glow opacity-60" />
        <div className="relative grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-positive animate-pulse-dot" />
              <p className="text-xs font-bold uppercase tracking-widest text-electric">Commerce Opportunity Index</p>
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
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-7">
        <StatCard label="Products Tracked" value={PLATFORM_STATS.productsTracked} sub={<span className="flex items-center gap-1 text-positive text-xs"><ArrowUpRight className="h-3 w-3" /> +2,400 this week</span>} />
        <StatCard label="Trending Products" value={PLATFORM_STATS.trendingProducts} />
        <StatCard label="TikTok Gaps" value={PLATFORM_STATS.tiktokToAmazonGaps} sub={<span className="text-xs text-muted-foreground">Low Amazon competition</span>} />
        <StatCard label="High Hype Risk" value={PLATFORM_STATS.highHypeRisk} sub={<span className="text-xs text-negative">Avoid overbuying</span>} />
        <StatCard label="Strong Margins" value={PLATFORM_STATS.strongMarginOpps} accent />
        <StatCard label="Creator-Led" value={PLATFORM_STATS.creatorLedTrends} />
        <StatCard label="Search Validated" value={PLATFORM_STATS.searchValidated} accent />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Best Opportunities */}
        <div className="lg:col-span-2">
          <SectionTitle action={<Link to="/app/products" className="text-sm font-bold text-electric">Full Radar</Link>}>
            Today's Best Opportunities
          </SectionTitle>
          <div className="space-y-3">
            {topOpps.map((p) => (
              <Link key={p.id} to={`/app/products/${p.id}`} className="surface-card surface-card-hover flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-lg font-bold text-electric">
                  {p.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-navy">{p.name}</p>
                    <LifecycleBadge stage={p.lifecycleStage} />
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{p.description}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-mono-num text-xl font-bold text-navy">{p.opportunityScore}</p>
                  <RecommendationBadge label={p.recommendation} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Commerce snapshot */}
        <div>
          <SectionTitle>Commerce Snapshot</SectionTitle>
          <div className="surface-card p-5">
            <SnapshotRow label="Strongest Category" value="Beauty" accent="pos" />
            <SnapshotRow label="Beauty Signal Index" value="86/100" accent="pos" />
            <SnapshotRow label="Most Gaps" value="Home Office" />
            <SnapshotRow label="Most Saturated" value="Kitchen Gadgets" accent="neg" />
            <SnapshotRow label="Avg Margin (Top 25)" value="Good" accent="pos" />
            <SnapshotRow label="High Hype Products" value="918" accent="neg" />
          </div>
          <div className="mt-3">
            <UpgradeTeaser text="Unlock full product intelligence and margin data." />
          </div>
        </div>
      </div>

      {/* Today's Biggest Signal Moves */}
      <div className="mt-8">
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

      {/* Risk Alerts */}
      <div className="mt-8">
        <SectionTitle action={<Link to="/app/hype-risk" className="text-sm font-bold text-negative">View all risks</Link>}>
          <span className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-negative" /> Biggest Risk Alerts</span>
        </SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {riskAlerts.map((p) => (
            <Link key={p.id} to={`/app/products/${p.id}`} className="surface-card surface-card-hover border-negative/10 p-4">
              <div className="flex items-start justify-between">
                <p className="text-sm font-semibold text-navy line-clamp-1">{p.name}</p>
                <RecommendationBadge label={p.recommendation} />
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{p.description.slice(0, 100)}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs font-mono-num font-bold text-negative">Hype: {p.hypeRiskScore}</span>
                <span className="text-xs text-muted-foreground">Sat: {p.saturationScore}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Category Momentum */}
      <div className="mt-8">
        <SectionTitle action={<Link to="/app/indexes" className="text-sm font-bold text-electric">View all indexes</Link>}>
          Category Momentum
        </SectionTitle>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {commerceIndexes.map((idx) => (
            <Link key={idx.id} to={`/app/indexes/${idx.id}`} className="surface-card surface-card-hover w-44 shrink-0 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-navy-soft line-clamp-1">{idx.name.replace(" Signal Index", "")}</span>
                <GradeBadge grade={idx.saturationRisk === "Low" ? "A" : idx.saturationRisk === "Medium" ? "B" : "C"} className="!px-1.5 !py-0 !text-xs" />
              </div>
              <p className="mt-2 font-mono-num text-2xl font-bold text-navy">{idx.score}</p>
              <Delta value={idx.weeklyChange} className="text-xs" />
            </Link>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link to="/app/products" className="surface-card surface-card-hover flex items-center gap-4 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent"><Zap className="h-5 w-5 text-electric" /></div>
          <div>
            <p className="font-bold text-navy">Explore Product Radar</p>
            <p className="text-sm text-muted-foreground">Find trending products with opportunity scores and recommendations.</p>
          </div>
        </Link>
        <Link to="/app/gap" className="surface-card surface-card-hover flex items-center gap-4 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-premium-soft"><Package className="h-5 w-5 text-premium" /></div>
          <div>
            <p className="font-bold text-navy">TikTok-to-Amazon Gaps</p>
            <p className="text-sm text-muted-foreground">Products trending on TikTok but not yet saturated on Amazon.</p>
          </div>
        </Link>
      </div>
    </AppLayout>
  );
}
