import { useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui-kit/Primitives";
import { forecasts } from "@/data/mock";
import { ReliabilityBadge, ValidationBadge, HypeBadge, Delta } from "@/components/signal/SignalBadges";
import { Bookmark, Lock, Plus, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface Watchlist {
  name: string;
  ids: string[];
  locked?: boolean;
}

const initial: Watchlist[] = [
  { name: "My AI Watchlist", ids: forecasts.filter((f) => f.category === "AI").slice(0, 4).map((f) => f.id) },
  { name: "Crypto Macro Watchlist", ids: forecasts.filter((f) => f.category === "Crypto").slice(0, 3).map((f) => f.id), locked: true },
  { name: "Recession Risk Watchlist", ids: forecasts.filter((f) => f.category === "Economy").slice(0, 3).map((f) => f.id), locked: true },
];

export default function Watchlists() {
  const [active, setActive] = useState(0);
  const list = initial[active];
  const items = forecasts.filter((f) => list.ids.includes(f.id));

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Watchlists"
        title="Track the forecasts that matter to you"
        subtitle="Free members get one watchlist. Pro unlocks unlimited watchlists with per-item alerts."
        action={
          <button className="inline-flex items-center gap-1.5 rounded-xl bg-navy px-4 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105">
            <Plus className="h-4 w-4" /> New watchlist
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="space-y-2 lg:col-span-1">
          {initial.map((w, i) => (
            <button
              key={w.name}
              onClick={() => setActive(i)}
              className={cn("flex w-full items-center justify-between rounded-xl border p-3.5 text-left text-sm font-semibold transition-colors", active === i ? "border-navy bg-navy text-white" : "border-border bg-card text-navy hover:border-primary")}
            >
              <span className="flex items-center gap-2"><Bookmark className="h-4 w-4" /> {w.name}</span>
              {w.locked && <Lock className={cn("h-3.5 w-3.5", active === i ? "text-white/70" : "text-premium")} />}
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          {list.locked ? (
            <div className="surface-card flex flex-col items-center justify-center gap-3 p-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-premium-soft"><Lock className="h-5 w-5 text-premium" /></div>
              <p className="font-bold text-navy">This watchlist is a Pro feature</p>
              <p className="max-w-sm text-sm text-muted-foreground">Free members get one watchlist. Upgrade to Pro for unlimited watchlists and alerts.</p>
              <Link to="/app/pricing" className="rounded-xl bg-premium px-5 py-2.5 text-sm font-bold text-white">Upgrade to Pro</Link>
            </div>
          ) : (
            <div className="surface-card divide-y divide-border overflow-hidden">
              {items.map((f) => (
                <Link key={f.id} to={`/app/forecasts/${f.id}`} className="flex items-center gap-4 px-5 py-4 hover:bg-secondary/30">
                  <span className="hidden font-mono-num text-xl font-bold text-navy sm:block">{f.probability}%</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-navy line-clamp-1">{f.question}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      <ReliabilityBadge label={f.reliabilityLabel} />
                      <ValidationBadge value={f.trendsValidation} />
                      <HypeBadge value={f.hypeRisk} />
                    </div>
                  </div>
                  <div className="text-right">
                    <Delta value={f.trend7d} suffix="%" />
                    <p className="text-xs text-muted-foreground">7d</p>
                  </div>
                  <Bell className="hidden h-4 w-4 text-muted-foreground sm:block" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
