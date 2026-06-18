import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader, UpgradeTeaser } from "@/components/ui-kit/Primitives";
import { categoryAccuracy } from "@/data/mock";
import { GradeBadge, Delta } from "@/components/signal/SignalBadges";
import { CheckCircle2, XCircle, Bell, Target, AlertTriangle, Activity, Crosshair } from "lucide-react";

const bigCards = [
  { label: "Overall Crowd Accuracy", value: "72.8", suffix: "/ 100", sub: "The crowd has been directionally accurate on 72.8% of resolved forecasts.", icon: Target, accent: "pos" },
  { label: "Crowd Overconfidence", value: "18", suffix: "%", sub: "How often the crowd assigns high confidence to outcomes that fail.", icon: AlertTriangle, accent: "neg" },
  { label: "Crowd Underreaction", value: "24", suffix: "%", sub: "How often the crowd is slow to update when new signals emerge.", icon: Activity, accent: "neutral" },
  { label: "Contrarian Opportunity", value: "41", suffix: "/ 100", sub: "Areas where the crowd may be too confident, emotional, or unsupported.", icon: Crosshair, accent: "violet" },
] as const;

const rightExamples = [
  "Housing supply / demand forecasts",
  "Enterprise AI adoption",
  "Consumer spending direction",
  "Interest-rate expectations when trend data confirms movement",
];
const wrongExamples = [
  "Extreme crypto price targets",
  "Geopolitical shocks",
  "Viral technology hype",
  "Celebrity / company rumors",
  "Overly long-dated predictions with unclear resolution",
];
const wrongAlerts = [
  "High confidence with low historical accuracy",
  "Search interest rising faster than forecast quality",
  "Expert forecasters disagreeing with retail users",
  "One-sided crowd probability without supporting validation data",
  "Sudden hype spike without credible catalyst",
];

export default function CrowdAccuracy() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="Crowd Accuracy"
        title="When is the crowd right — and when is it wrong?"
        subtitle="SignalCrowd measures not just what people believe, but whether collective belief has historically been accurate."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {bigCards.map((c) => {
          const Icon = c.icon;
          const color = c.accent === "pos" ? "text-positive" : c.accent === "neg" ? "text-negative" : c.accent === "violet" ? "text-violet" : "text-navy";
          return (
            <div key={c.label} className="surface-card p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary"><Icon className={`h-5 w-5 ${color}`} /></div>
              <p className="text-sm font-medium text-muted-foreground">{c.label}</p>
              <p className="mt-1 font-mono-num text-3xl font-bold text-navy">{c.value}<span className="ml-1 text-base font-normal text-muted-foreground">{c.suffix}</span></p>
              <p className="mt-2 text-xs text-muted-foreground">{c.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Category table */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-navy">Accuracy by Category</h2>
        <div className="surface-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3 text-right">Accuracy</th>
                  <th className="px-5 py-3 text-right">Overconfidence</th>
                  <th className="px-5 py-3 text-right">Underreaction</th>
                  <th className="px-5 py-3 text-center">Trends</th>
                  <th className="px-5 py-3 text-center">Grade</th>
                </tr>
              </thead>
              <tbody>
                {categoryAccuracy.map((c) => (
                  <tr key={c.category} className="border-b border-border last:border-0 hover:bg-secondary/30">
                    <td className="px-5 py-3.5 font-semibold text-navy">{c.category}</td>
                    <td className="px-5 py-3.5 text-right font-mono-num font-bold text-navy">{c.accuracy}%</td>
                    <td className="px-5 py-3.5 text-right font-mono-num text-negative">{c.overconfidence}%</td>
                    <td className="px-5 py-3.5 text-right font-mono-num text-muted-foreground">{c.underreaction}%</td>
                    <td className="px-5 py-3.5 text-center text-navy-soft">{c.validation}</td>
                    <td className="px-5 py-3.5 text-center"><GradeBadge grade={c.grade} className="!px-1.5 !py-0 !text-xs" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right / Wrong */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="surface-card p-6">
          <div className="mb-4 flex items-center gap-2 text-positive"><CheckCircle2 className="h-5 w-5" /><h3 className="font-bold text-navy">Where the Crowd Is Usually Right</h3></div>
          <ul className="space-y-2.5">
            {rightExamples.map((e) => (
              <li key={e} className="flex gap-2 text-sm text-navy-soft"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-positive" />{e}</li>
            ))}
          </ul>
        </div>
        <div className="surface-card p-6">
          <div className="mb-4 flex items-center gap-2 text-negative"><XCircle className="h-5 w-5" /><h3 className="font-bold text-navy">Where the Crowd Is Usually Wrong</h3></div>
          <ul className="space-y-2.5">
            {wrongExamples.map((e) => (
              <li key={e} className="flex gap-2 text-sm text-navy-soft"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-negative" />{e}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Crowd Wrong Alerts (premium) */}
      <div className="mt-8 surface-card overflow-hidden border-premium/30 bg-premium-soft/40 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2"><Bell className="h-5 w-5 text-premium" /><h3 className="font-bold text-navy">Crowd Wrong Alerts</h3><span className="rounded-md bg-premium px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">Pro / Analyst</span></div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Get notified when the crowd shows historical patterns associated with bad forecasts.</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {wrongAlerts.map((a) => (
            <div key={a} className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-3 py-2.5 text-sm text-navy-soft"><AlertTriangle className="h-4 w-4 shrink-0 text-premium" />{a}</div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <UpgradeTeaser text="Unlock Crowd Wrong Alerts and historical category accuracy with Pro." />
      </div>
    </AppLayout>
  );
}
