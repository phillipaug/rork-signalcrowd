import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui-kit/Primitives";
import { AreaChart } from "@/components/charts/AreaChart";
import { forecasts } from "@/data/mock";
import { ValidationBadge, CategoryChip, ReliabilityBadge } from "@/components/signal/SignalBadges";
import { Link } from "react-router-dom";
import { Search, TrendingUp, GitCompareArrows, Flame, Radar, Info } from "lucide-react";

const metrics = [
  { icon: Search, title: "Trends Confirmation Score", body: "Whether search interest supports the direction of crowd probability movement.", example: "Strong · Moderate · Weak · None" },
  { icon: TrendingUp, title: "Attention Momentum", body: "Whether public interest is increasing or decreasing.", example: "+42% search-interest momentum" },
  { icon: GitCompareArrows, title: "Probability / Attention Divergence", body: "When crowd probability and search interest move in opposite directions.", example: "Probability rising while interest falling" },
  { icon: Flame, title: "Hype Risk Score", body: "When search interest spikes faster than forecast quality or evidence.", example: "High when attention spikes but accuracy is weak" },
  { icon: Radar, title: "Under-the-Radar Signal", body: "When crowd probability rises before search interest does.", example: "Early signal when accurate forecasters move first" },
];

export default function TrendsValidation() {
  const find = (kw: string) => forecasts.find((f) => f.question.toLowerCase().includes(kw));
  const examples = [find("ai agents handle"), find("ethereum"), find("mortgage rates")].filter(
    (f): f is (typeof forecasts)[number] => Boolean(f),
  );

  const scan = forecasts.slice(0, 9);

  return (
    <AppLayout>
      <PageHeader eyebrow="Trends Validation" title="Validate crowd belief with public attention" subtitle="SignalCrowd compares forecast movement with Google Trends-style search-interest data to see whether a probability move is supported by rising attention — or disconnected from it." />

      {/* Disclaimer banner */}
      <div className="mb-6 flex items-start gap-3 rounded-2xl border border-premium/30 bg-premium-soft/50 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-premium" />
        <p className="text-sm text-navy-soft">
          <span className="font-semibold text-navy">Demo Trends Data.</span> The MVP uses realistic mock search-interest data, clearly labeled as such. The platform is architected so an authorized Google Trends API or compliant trends provider can be connected later — at which point search interest over time, related queries, related topics, and regional interest become live.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.title} className="surface-card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent"><Icon className="h-5 w-5 text-electric" /></div>
              <h3 className="mt-3 font-bold text-navy">{m.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{m.body}</p>
              <p className="mt-3 rounded-lg bg-secondary/60 px-3 py-2 font-mono-num text-xs text-navy-soft">{m.example}</p>
            </div>
          );
        })}
      </div>

      {/* Validation cards */}
      <h2 className="mb-4 mt-10 text-lg font-bold text-navy">Validation examples</h2>
      <div className="grid gap-6 lg:grid-cols-3">
        {examples.map((f) => (
          <div key={f.id} className="surface-card overflow-hidden p-5">
            <div className="flex items-center justify-between">
              <CategoryChip category={f.category} />
              <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">Mock</span>
            </div>
            <h3 className="mt-2 text-sm font-semibold leading-snug text-navy min-h-[40px]">{f.question}</h3>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Crowd probability</p>
                <p className="font-mono-num text-2xl font-bold text-navy">{f.probability}%</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Momentum</p>
                <p className={`font-mono-num text-lg font-bold ${f.searchMomentum >= 0 ? "text-positive" : "text-negative"}`}>{f.searchMomentum >= 0 ? "+" : ""}{f.searchMomentum}%</p>
              </div>
            </div>
            <AreaChart data={f.trendData} compare={f.searchData} height={120} showAxis={false} className="mt-2" />
            <ValidationBadge value={f.trendsValidation} className="mt-3" />
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {f.trendsValidation === "Strong"
                ? "Crowd probability and search interest are both rising, suggesting broad attention is validating the move."
                : f.searchMomentum < 0
                  ? "Crowd probability is rising while search interest is falling — a possible insider/enthusiast signal or unsupported optimism."
                  : "Public interest is rising, but the crowd remains comparatively skeptical."}
            </p>
          </div>
        ))}
      </div>

      {/* Scan */}
      <h2 className="mb-4 mt-10 text-lg font-bold text-navy">Probability vs attention scan</h2>
      <div className="surface-card divide-y divide-border overflow-hidden">
        {scan.map((f) => (
          <Link key={f.id} to={`/app/forecasts/${f.id}`} className="flex items-center gap-4 px-5 py-3.5 hover:bg-secondary/30">
            <p className="min-w-0 flex-1 text-sm font-medium text-navy line-clamp-1">{f.question}</p>
            <span className={`hidden font-mono-num text-sm font-bold sm:block ${f.searchMomentum >= 0 ? "text-positive" : "text-negative"}`}>{f.searchMomentum >= 0 ? "+" : ""}{f.searchMomentum}%</span>
            <ValidationBadge value={f.trendsValidation} />
            <div className="hidden md:block"><ReliabilityBadge label={f.reliabilityLabel} /></div>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}
