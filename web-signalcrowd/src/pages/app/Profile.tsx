import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { getForecaster, forecasts } from "@/data/mock";
import { ProgressBar } from "@/components/ui-kit/Primitives";
import { CategoryChip, Delta } from "@/components/signal/SignalBadges";
import { Award, Target, Crosshair, Users, Share2, TrendingUp } from "lucide-react";
import NotFound from "../NotFound";
import { CalibrationChart } from "@/components/charts/CalibrationChart";
import { useState } from "react";
import { ProfileShareCard } from "@/components/signal/ProfileShareCard";

export default function Profile() {
  const { id } = useParams();
  const p = id ? getForecaster(id) : undefined;
  const [share, setShare] = useState(false);
  if (!p) return <NotFound />;

  const recent = forecasts.slice(0, 4);
  const percentile = Math.round(100 - p.accuracyScore + 4);

  return (
    <AppLayout>
      {/* Header card */}
      <div className="surface-card relative overflow-hidden p-6 lg:p-8">
        <div className="absolute right-0 top-0 h-32 w-1/2 hero-glow opacity-60" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-navy text-2xl font-bold text-white">{p.avatar.slice(0, 2)}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-navy">{p.name}</h1>
              <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">{p.userType}</span>
            </div>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">{p.bio}</p>
            <div className="mt-3 flex gap-4 text-sm">
              <span className="text-muted-foreground"><span className="font-bold text-navy">{p.followers.toLocaleString()}</span> followers</span>
              <span className="text-muted-foreground"><span className="font-bold text-navy">{p.following}</span> following</span>
              <span className="text-muted-foreground">Top <span className="font-bold text-navy">{percentile}%</span></span>
            </div>
          </div>
          <button onClick={() => setShare(true)} className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-navy hover:border-primary">
            <Share2 className="h-4 w-4" /> Share card
          </button>
        </div>
      </div>

      {/* Score cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <ScoreCard icon={Target} label="Accuracy Score" value={`${p.accuracyScore}%`} color="text-positive" />
        <ScoreCard icon={Crosshair} label="Calibration Score" value={`${p.calibrationScore}%`} color="text-electric" />
        <ScoreCard icon={Users} label="Crowd Beater Rate" value={`${p.crowdBeaterRate}%`} color="text-violet" />
        <ScoreCard icon={Award} label="Resolved Forecasts" value={p.resolvedCount.toLocaleString()} color="text-navy" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Beat the crowd */}
          <div className="surface-card overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border bg-gradient-to-r from-violet to-electric px-6 py-4 text-white">
              <TrendingUp className="h-5 w-5" />
              <h2 className="font-bold">Beat the Crowd</h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-navy-soft">
                {p.name === "You" ? "You" : p.name.split(" ")[0]} beat the crowd on <span className="font-bold text-navy">{p.crowdBeaterRate}%</span> of resolved {p.topCategories[0].category} forecasts.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <MiniMetric label="Beat-the-crowd rate" value={`${p.crowdBeaterRate}%`} />
                <MiniMetric label="High-conviction accuracy" value={`${Math.round(p.accuracyScore - 2)}%`} />
                <MiniMetric label="Long-shot accuracy" value={`${Math.round(p.accuracyScore - 18)}%`} />
              </div>
            </div>
          </div>

          {/* Calibration */}
          <div className="surface-card p-6">
            <h2 className="font-bold text-navy">Calibration</h2>
            <p className="mt-1 text-sm text-muted-foreground">If you forecast 70% probability events, around 70% of those events should happen over time.</p>
            <CalibrationChart score={p.calibrationScore} className="mt-4" />
          </div>

          {/* Comparisons */}
          <div className="surface-card p-6">
            <h2 className="mb-4 font-bold text-navy">How {p.name === "You" ? "you" : "they"} compare</h2>
            <div className="space-y-4">
              <CompareBar label="vs Crowd" you={p.accuracyScore} other={72.8} />
              <CompareBar label="vs Top forecasters" you={p.accuracyScore} other={88} />
              <CompareBar label="vs Category average" you={p.accuracyScore} other={70} />
            </div>
          </div>

          {/* Recent forecasts */}
          <div className="surface-card p-6">
            <h2 className="mb-4 font-bold text-navy">Recent forecasts</h2>
            <div className="space-y-1">
              {recent.map((f) => (
                <Link key={f.id} to={`/app/forecasts/${f.id}`} className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-secondary">
                  <span className="font-mono-num text-sm font-bold text-navy">{f.probability}%</span>
                  <span className="flex-1 text-sm text-navy-soft line-clamp-1">{f.question}</span>
                  <Delta value={f.trend7d} suffix="%" className="text-xs" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="surface-card p-5">
            <h3 className="mb-3 text-sm font-bold text-navy">Top categories</h3>
            <div className="space-y-3">
              {p.topCategories.map((c) => (
                <div key={c.category}>
                  <div className="mb-1 flex items-center justify-between">
                    <CategoryChip category={c.category} />
                    <span className="font-mono-num text-sm font-bold text-navy">{c.score}%</span>
                  </div>
                  <ProgressBar value={c.score} />
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card p-5">
            <h3 className="mb-3 text-sm font-bold text-navy">Badges</h3>
            <div className="flex flex-wrap gap-2">
              {p.badges.map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-premium/30 bg-premium-soft px-3 py-1.5 text-xs font-semibold text-premium">
                  <Award className="h-3.5 w-3.5" /> {b}
                </span>
              ))}
            </div>
          </div>

          <div className="surface-card p-5">
            <h3 className="mb-2 text-sm font-bold text-navy">Accuracy engine</h3>
            <p className="text-xs text-muted-foreground">Your score measures how close your probabilities were to real-world outcomes over time — using a Brier-style calculation across resolved forecasts.</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-secondary/50 p-2"><p className="font-mono-num text-lg font-bold text-positive">{Math.round(p.resolvedCount * 0.73)}</p><p className="text-[11px] text-muted-foreground">Correct</p></div>
              <div className="rounded-lg bg-secondary/50 p-2"><p className="font-mono-num text-lg font-bold text-negative">{Math.round(p.resolvedCount * 0.27)}</p><p className="text-[11px] text-muted-foreground">Missed</p></div>
            </div>
          </div>
        </div>
      </div>

      {share && <ProfileShareCard profile={p} onClose={() => setShare(false)} />}
    </AppLayout>
  );
}

function ScoreCard({ icon: Icon, label, value, color }: { icon: typeof Target; label: string; value: string; color: string }) {
  return (
    <div className="surface-card p-4">
      <Icon className={`h-5 w-5 ${color}`} />
      <p className="mt-2 text-xs text-muted-foreground">{label}</p>
      <p className={`font-mono-num text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-3 text-center">
      <p className="font-mono-num text-xl font-bold text-navy">{value}</p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}

function CompareBar({ label, you, other }: { label: string; you: number; other: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-semibold text-navy">{label}</span>
        <span className="text-muted-foreground">You {you}% · {other}%</span>
      </div>
      <div className="flex gap-1">
        <div className="h-2 rounded-full bg-electric" style={{ width: `${you}%` }} />
        <div className="h-2 rounded-full bg-secondary" style={{ width: `${100 - you}%` }} />
      </div>
    </div>
  );
}
