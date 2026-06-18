import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { AreaChart } from "@/components/charts/AreaChart";
import { getIndex, indexes } from "@/data/mock";
import { Delta, GradeBadge, ValidationBadge, CategoryChip } from "@/components/signal/SignalBadges";
import { LockedOverlay, ProgressBar } from "@/components/ui-kit/Primitives";
import { formatCompact } from "@/lib/format";
import { ArrowLeft, Sparkles, TrendingUp, TrendingDown, Users, Target, Search } from "lucide-react";
import NotFound from "../NotFound";
import { cn } from "@/lib/utils";

export default function IndexDetail() {
  const { id } = useParams();
  const idx = id ? getIndex(id) : undefined;
  const [range, setRange] = useState<"90d" | "1y">("90d");
  if (!idx) return <NotFound />;

  const chartData = range === "90d" ? idx.trendData.slice(-30) : idx.trendData;
  const related = indexes.filter((i) => i.id !== idx.id).slice(0, 3);

  return (
    <AppLayout>
      <Link to="/app/indexes" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-navy">
        <ArrowLeft className="h-4 w-4" /> All indexes
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="surface-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <CategoryChip category={idx.category} />
                <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-navy">{idx.name}</h1>
                <p className="mt-1 max-w-lg text-sm text-muted-foreground">{idx.description}</p>
              </div>
              <GradeBadge grade={idx.reliabilityGrade} className="!text-base" />
            </div>

            <div className="mt-5 flex items-end gap-4">
              <span className="font-mono-num text-5xl font-bold tracking-tighter text-navy">{idx.score}</span>
              <span className="mb-2 text-muted-foreground">/ 100</span>
              <div className="mb-1.5 flex flex-col text-xs">
                <span className="text-muted-foreground">7d <Delta value={idx.weeklyChange} /></span>
                <span className="text-muted-foreground">30d <Delta value={idx.monthlyChange} /></span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <ValidationBadge value={idx.trendsValidation} />
              <div className="inline-flex rounded-lg border border-border p-0.5">
                {(["90d", "1y"] as const).map((r) => (
                  <button key={r} onClick={() => setRange(r)} className={cn("rounded-md px-3 py-1 text-xs font-semibold", range === r ? "bg-navy text-white" : "text-muted-foreground")}>
                    {r === "90d" ? "90 days" : "1 year"}
                  </button>
                ))}
              </div>
            </div>
            <AreaChart data={chartData} height={220} className="mt-3" />
          </div>

          {/* AI summary */}
          <div className="surface-card mt-6 p-6">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-electric" />
              <h2 className="font-bold text-navy">AI Summary</h2>
            </div>
            <p className="text-sm leading-relaxed text-navy-soft">{idx.summary}</p>
          </div>

          {/* Top drivers */}
          <div className="surface-card mt-6 p-6">
            <h2 className="mb-4 font-bold text-navy">Top Contributing Forecasts</h2>
            <div className="space-y-4">
              {idx.drivers.map((d, i) => (
                <div key={i}>
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-navy">{d.text}</span>
                    <span className="font-mono-num text-sm font-bold text-electric">{d.prob}%</span>
                  </div>
                  <ProgressBar value={d.prob} />
                </div>
              ))}
            </div>
          </div>

          {/* Movers */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="surface-card p-6">
              <div className="mb-3 flex items-center gap-2 text-positive"><TrendingUp className="h-4 w-4" /><h3 className="font-bold text-navy">Top Upward Movers</h3></div>
              {idx.drivers.slice(0, 3).map((d, i) => (
                <div key={i} className="flex items-center justify-between border-b border-border py-2 text-sm last:border-0">
                  <span className="line-clamp-1 text-navy-soft">{d.text}</span>
                  <Delta value={4 + i} suffix="%" />
                </div>
              ))}
            </div>
            <div className="surface-card p-6">
              <div className="mb-3 flex items-center gap-2 text-negative"><TrendingDown className="h-4 w-4" /><h3 className="font-bold text-navy">Top Downward Movers</h3></div>
              {idx.drivers.slice(1, 4).reverse().map((d, i) => (
                <div key={i} className="flex items-center justify-between border-b border-border py-2 text-sm last:border-0">
                  <span className="line-clamp-1 text-navy-soft">{d.text}</span>
                  <Delta value={-(2 + i)} suffix="%" />
                </div>
              ))}
            </div>
          </div>

          {/* Premium locked */}
          <div className="mt-6">
            <h2 className="mb-3 font-bold text-navy">Signal Quality Analysis</h2>
            <LockedOverlay title="Advanced analytics — Pro" description="See whether the crowd is usually right here, if the move is backed by search data, expert alignment, and overheating risk.">
              <div className="surface-card grid gap-4 p-6 sm:grid-cols-2">
                {["Is the crowd usually right in this category?", "Is the current move backed by search data?", "Are expert forecasters aligned with general users?", "Is this index overheated or underappreciated?"].map((q) => (
                  <div key={q} className="rounded-xl border border-border bg-secondary/40 p-4">
                    <p className="text-sm font-semibold text-navy">{q}</p>
                    <p className="mt-2 text-sm text-muted-foreground">Detailed answer with supporting data…</p>
                  </div>
                ))}
              </div>
            </LockedOverlay>
          </div>
        </div>

        {/* Sidebar stats */}
        <div className="space-y-4">
          <div className="surface-card p-5">
            <h3 className="mb-3 text-sm font-bold text-navy">Index Stats</h3>
            <div className="space-y-3">
              <SideStat icon={Users} label="Forecast volume" value={formatCompact(idx.forecastVolume)} />
              <SideStat icon={Target} label="Crowd accuracy" value={`${idx.crowdAccuracy}%`} />
              <SideStat icon={Search} label="Trends validation" value={idx.trendsValidation} />
            </div>
          </div>

          <div className="surface-card p-5">
            <h3 className="mb-2 text-sm font-bold text-navy">Expert vs General Crowd</h3>
            <div className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-xs"><span className="text-muted-foreground">Expert forecasters</span><span className="font-mono-num font-bold text-navy">{idx.score + 3}</span></div>
                <ProgressBar value={idx.score + 3} color="hsl(var(--violet))" />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs"><span className="text-muted-foreground">General crowd</span><span className="font-mono-num font-bold text-navy">{idx.score}</span></div>
                <ProgressBar value={idx.score} />
              </div>
            </div>
          </div>

          <div className="surface-card p-5">
            <h3 className="mb-3 text-sm font-bold text-navy">Related Indexes</h3>
            <div className="space-y-1">
              {related.map((r) => (
                <Link key={r.id} to={`/app/indexes/${r.id}`} className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-secondary">
                  <span className="text-sm text-navy-soft">{r.name.replace(" Index", "")}</span>
                  <span className="font-mono-num text-sm font-bold text-navy">{r.score}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link to="/app/reports" className="surface-card surface-card-hover block bg-premium-soft/50 p-5">
            <Sparkles className="h-5 w-5 text-premium" />
            <p className="mt-2 font-bold text-navy">Get the full {idx.category} report</p>
            <p className="mt-1 text-sm text-muted-foreground">Investor-grade analysis, updated weekly.</p>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}

function SideStat({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground"><Icon className="h-4 w-4" /> {label}</span>
      <span className="font-mono-num text-sm font-bold text-navy">{value}</span>
    </div>
  );
}
