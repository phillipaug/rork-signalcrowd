import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { AreaChart } from "@/components/charts/AreaChart";
import { getForecast, forecasts } from "@/data/mock";
import {
  ReliabilityBadge,
  ValidationBadge,
  HypeBadge,
  CategoryChip,
  Delta,
} from "@/components/signal/SignalBadges";
import { LockedOverlay, ProgressBar } from "@/components/ui-kit/Primitives";
import { formatCompact } from "@/lib/format";
import {
  ArrowLeft,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Search,
  CalendarClock,
  FileCheck,
  Share2,
  Zap,
} from "lucide-react";
import NotFound from "../NotFound";
import { ShareCard } from "@/components/signal/ShareCard";
import { useState } from "react";

export default function ForecastDetail() {
  const { id } = useParams();
  const f = id ? getForecast(id) : undefined;
  const [showShare, setShowShare] = useState(false);
  if (!f) return <NotFound />;

  const related = forecasts.filter((x) => x.category === f.category && x.id !== f.id).slice(0, 3);
  const expertDiff = f.expertProb - f.probability;

  return (
    <AppLayout>
      <Link to="/app/forecasts" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-navy">
        <ArrowLeft className="h-4 w-4" /> Forecast feed
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Header */}
          <div className="surface-card p-6">
            <div className="flex items-center justify-between gap-3">
              <CategoryChip category={f.category} />
              <button onClick={() => setShowShare(true)} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-navy hover:border-primary">
                <Share2 className="h-3.5 w-3.5" /> Share
              </button>
            </div>
            <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-navy">{f.question}</h1>

            <div className="mt-5 flex flex-wrap items-end gap-x-8 gap-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Current crowd probability</p>
                <div className="flex items-end gap-2">
                  <span className="font-mono-num text-5xl font-bold tracking-tighter text-navy">{f.probability}%</span>
                  <span className="mb-1.5 text-sm">7d <Delta value={f.trend7d} suffix="%" /></span>
                </div>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">{formatCompact(f.uniqueForecasters)} unique forecasters</p>
                <p className="text-muted-foreground">{formatCompact(f.forecastCount)} total forecasts</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <ReliabilityBadge label={f.reliabilityLabel} />
              <ValidationBadge value={f.trendsValidation} />
              <HypeBadge value={f.hypeRisk} />
            </div>

            <AreaChart data={f.trendData} height={200} className="mt-4" />

            <Link to={`/app/forecasts/${f.id}/submit`} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-electric py-3.5 text-sm font-bold text-white shadow-lg shadow-electric/25 transition-transform hover:scale-[1.01]">
              <Zap className="h-4 w-4" /> Add your forecast
            </Link>
          </div>

          {/* AI briefing */}
          <div className="surface-card p-6">
            <div className="mb-3 flex items-center gap-2"><Sparkles className="h-4 w-4 text-electric" /><h2 className="font-bold text-navy">AI Briefing</h2></div>
            <p className="text-sm leading-relaxed text-navy-soft">{f.briefing}</p>
          </div>

          {/* Bull / Bear */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="surface-card p-6">
              <div className="mb-3 flex items-center gap-2 text-positive"><TrendingUp className="h-4 w-4" /><h3 className="font-bold text-navy">Bull Case</h3></div>
              <ul className="space-y-2">
                {f.bullCase.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-navy-soft"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-positive" />{b}</li>
                ))}
              </ul>
            </div>
            <div className="surface-card p-6">
              <div className="mb-3 flex items-center gap-2 text-negative"><TrendingDown className="h-4 w-4" /><h3 className="font-bold text-navy">Bear Case</h3></div>
              <ul className="space-y-2">
                {f.bearCase.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-navy-soft"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-negative" />{b}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Trends validation panel */}
          <div className="surface-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2"><Search className="h-4 w-4 text-electric" /><h2 className="font-bold text-navy">Google Trends Validation</h2></div>
              <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">Mock search interest</span>
            </div>
            <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <MiniStat label="Trends confirmation" value={f.trendsValidation} />
              <MiniStat label="Attention momentum" value={`${f.searchMomentum >= 0 ? "+" : ""}${f.searchMomentum}%`} accent={f.searchMomentum >= 0 ? "pos" : "neg"} />
              <MiniStat label="Hype risk" value={f.hypeRisk} />
            </div>
            <AreaChart data={f.trendData} compare={f.searchData} height={160} />
            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-4 rounded bg-electric" /> Crowd probability</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-4 rounded bg-violet" /> Search interest</span>
            </div>
          </div>

          {/* Premium signal analysis */}
          <div>
            <h2 className="mb-3 font-bold text-navy">Advanced Signal Analysis</h2>
            <LockedOverlay
              title="Pro signal analysis"
              description="Unlock expert-only probabilities, reliability signals, probability/search-interest divergence, historical category accuracy, and contrarian alerts."
            >
              <div className="surface-card grid gap-4 p-6 sm:grid-cols-2">
                <SignalRow label="Forecast volume" value="Strong" />
                <SignalRow label="Category accuracy" value="Moderate" />
                <SignalRow label="Top forecaster alignment" value="Split" />
                <SignalRow label="Trends validation" value={f.trendsValidation} />
                <SignalRow label="Hype risk" value={f.hypeRisk} />
                <SignalRow label="Overall signal" value={f.reliabilityLabel} />
              </div>
            </LockedOverlay>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="surface-card p-5">
            <h3 className="mb-3 text-sm font-bold text-navy">Expert vs Crowd</h3>
            <div className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-xs"><span className="text-muted-foreground">Top forecasters</span><span className="font-mono-num font-bold text-navy">{f.expertProb}%</span></div>
                <ProgressBar value={f.expertProb} color="hsl(var(--violet))" />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs"><span className="text-muted-foreground">General crowd</span><span className="font-mono-num font-bold text-navy">{f.probability}%</span></div>
                <ProgressBar value={f.probability} />
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {Math.abs(expertDiff) < 4 ? "Experts and the crowd are broadly aligned." : `Experts are ${expertDiff > 0 ? "more bullish" : "more bearish"} than the crowd by ${Math.abs(expertDiff)} points.`}
            </p>
          </div>

          <div className="surface-card p-5">
            <h3 className="mb-3 text-sm font-bold text-navy">Resolution</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2"><CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Resolution date</p><p className="font-semibold text-navy">{f.resolutionDate}</p></div></div>
              <div className="flex items-start gap-2"><FileCheck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Source of truth</p><p className="font-medium text-navy-soft">{f.sourceOfTruth}</p></div></div>
              <p className="border-t border-border pt-3 text-xs text-muted-foreground">{f.resolutionCriteria}</p>
            </div>
          </div>

          <div className="surface-card p-5">
            <h3 className="mb-2 text-sm font-bold text-navy">Key Catalysts</h3>
            <div className="flex flex-wrap gap-1.5">
              {f.catalysts.map((c) => (
                <span key={c} className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-navy-soft">{c}</span>
              ))}
            </div>
          </div>

          <div className="surface-card p-5">
            <h3 className="mb-2 text-sm font-bold text-navy">Related Forecasts</h3>
            <div className="space-y-1">
              {related.map((r) => (
                <Link key={r.id} to={`/app/forecasts/${r.id}`} className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 hover:bg-secondary">
                  <span className="line-clamp-2 text-xs text-navy-soft">{r.question}</span>
                  <span className="font-mono-num text-sm font-bold text-navy">{r.probability}%</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showShare && <ShareCard forecast={f} onClose={() => setShowShare(false)} />}
    </AppLayout>
  );
}

function MiniStat({ label, value, accent }: { label: string; value: string; accent?: "pos" | "neg" }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-3">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className={`mt-0.5 text-sm font-bold ${accent === "pos" ? "text-positive" : accent === "neg" ? "text-negative" : "text-navy"}`}>{value}</p>
    </div>
  );
}

function SignalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-bold text-navy">{value}</span>
    </div>
  );
}
