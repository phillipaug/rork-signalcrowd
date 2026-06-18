import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui-kit/Primitives";
import { forecasts } from "@/data/mock";
import { ReliabilityBadge, ValidationBadge, CategoryChip } from "@/components/signal/SignalBadges";
import { Link } from "react-router-dom";
import { Check, X, Users, Brain, Search, Activity, Gauge, FileCheck } from "lucide-react";

const inputs = [
  { icon: Users, label: "Crowd probability" },
  { icon: Activity, label: "Historical accuracy" },
  { icon: Brain, label: "Expert alignment" },
  { icon: Search, label: "Trends validation" },
  { icon: Gauge, label: "Forecast volume" },
  { icon: Activity, label: "Probability volatility" },
  { icon: FileCheck, label: "Resolution clarity" },
];

const labels = [
  { text: "Crowd likely reliable", good: true },
  { text: "Search interest confirms movement", good: true },
  { text: "Crowd may be overconfident", good: false },
  { text: "Crowd is split", good: false },
  { text: "Experts disagree with crowd", good: false },
  { text: "Search interest does not confirm movement", good: false },
  { text: "High hype risk", good: false },
  { text: "Potential contrarian opportunity", good: true },
];

export default function CrowdReliability() {
  const featured = forecasts.find((f) => f.id.includes("bitcoin")) ?? forecasts[0];
  const samples = forecasts.slice(0, 8);

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Crowd Reliability Index"
        title="One score for how much to trust a signal"
        subtitle="The Crowd Reliability Index combines probability, historical accuracy, expert alignment, trends validation, volume, volatility, and resolution clarity."
      />

      {/* How it's built */}
      <div className="surface-card p-6">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">Inputs</h2>
        <div className="flex flex-wrap gap-2">
          {inputs.map((i) => {
            const Icon = i.icon;
            return (
              <span key={i.label} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-sm font-medium text-navy-soft">
                <Icon className="h-4 w-4 text-electric" /> {i.label}
              </span>
            );
          })}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {(["Reliable Signal", "Mixed Signal", "Weak Signal", "Overheated Signal", "Contrarian Signal"] as const).map((l) => (
            <ReliabilityBadge key={l} label={l} />
          ))}
        </div>
      </div>

      {/* Featured worked example */}
      <div className="mt-6 surface-card p-6">
        <CategoryChip category={featured.category} />
        <h2 className="mt-2 text-xl font-extrabold text-navy">{featured.question}</h2>
        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          <div>
            <div className="flex items-end gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Crowd probability</p>
                <p className="font-mono-num text-4xl font-bold text-navy">{featured.probability}%</p>
              </div>
              <div className="mb-1">
                <p className="text-xs text-muted-foreground">Crowd reliability</p>
                <ReliabilityBadge label={featured.reliabilityLabel} />
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-secondary/40 p-4">
            <p className="mb-2 text-sm font-semibold text-navy">Why this rating?</p>
            <ul className="space-y-1.5 text-sm text-navy-soft">
              <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" /> High forecast volume</li>
              <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" /> Moderate category accuracy</li>
              <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" /> Strong disagreement among top forecasters</li>
              <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" /> Search interest rising quickly</li>
              <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" /> Crypto category historically overconfident on extreme targets</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Visual labels */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {labels.map((l) => (
          <div key={l.text} className="surface-card flex items-center gap-2 p-4">
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${l.good ? "bg-positive-soft" : "bg-negative-soft"}`}>
              {l.good ? <Check className="h-4 w-4 text-positive" /> : <X className="h-4 w-4 text-negative" />}
            </div>
            <span className="text-sm font-medium text-navy">{l.text}</span>
          </div>
        ))}
      </div>

      {/* Reliability scan of forecasts */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-navy">Reliability across live forecasts</h2>
        <div className="surface-card divide-y divide-border overflow-hidden">
          {samples.map((f) => (
            <Link key={f.id} to={`/app/forecasts/${f.id}`} className="flex items-center gap-4 px-5 py-4 hover:bg-secondary/30">
              <span className="hidden font-mono-num text-lg font-bold text-navy sm:block">{f.probability}%</span>
              <p className="min-w-0 flex-1 text-sm font-medium text-navy line-clamp-1">{f.question}</p>
              <div className="hidden sm:block"><ValidationBadge value={f.trendsValidation} /></div>
              <ReliabilityBadge label={f.reliabilityLabel} />
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
