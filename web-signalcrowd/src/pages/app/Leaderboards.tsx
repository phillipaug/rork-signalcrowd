import { useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader, LockedOverlay } from "@/components/ui-kit/Primitives";
import { leaderboard } from "@/data/mock";
import { cn } from "@/lib/utils";
import { Crown, Trophy } from "lucide-react";

const boards = ["Global", "AI", "Crypto", "Housing", "Economy", "Startups", "Energy", "Geopolitics", "Crowd Beaters", "New Forecasters", "Monthly Winners"];

export default function Leaderboards() {
  const [board, setBoard] = useState("Global");

  const sorted = [...leaderboard].sort((a, b) =>
    board === "Crowd Beaters" ? b.crowdBeaterRate - a.crowdBeaterRate : b.accuracyScore - a.accuracyScore,
  );
  const top10 = sorted; // 8 demo users
  const lockedExtra = [...sorted].slice(0, 5);

  return (
    <AppLayout>
      <PageHeader eyebrow="Leaderboards" title="The most accurate forecasters" subtitle="Ranked by accuracy and crowd-beater rate across resolved forecasts. Free members see the top 10; Pro unlocks full rankings, filters, and historical rank." />

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {boards.map((b) => (
          <button key={b} onClick={() => setBoard(b)} className={cn("shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors", board === b ? "border-navy bg-navy text-white" : "border-border bg-card text-navy-soft hover:border-primary")}>
            {b}
          </button>
        ))}
      </div>

      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3">Rank</th>
                <th className="px-5 py-3">Forecaster</th>
                <th className="px-5 py-3 text-right">Accuracy</th>
                <th className="px-5 py-3 text-right">Crowd Beater</th>
                <th className="px-5 py-3 text-right">Forecasts</th>
                <th className="px-5 py-3">Best</th>
                <th className="px-5 py-3">Badge</th>
              </tr>
            </thead>
            <tbody>
              {top10.map((p, i) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                  <td className="px-5 py-3.5">
                    <span className={cn("inline-flex h-7 w-7 items-center justify-center rounded-full font-mono-num text-xs font-bold", i === 0 ? "bg-premium text-white" : i < 3 ? "bg-secondary text-navy" : "text-muted-foreground")}>
                      {i === 0 ? <Crown className="h-3.5 w-3.5" /> : i + 1}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Link to={`/app/profile/${p.id}`} className="flex items-center gap-2.5 hover:text-electric">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">{p.avatar}</span>
                      <span className="font-semibold text-navy">{p.name}</span>
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono-num font-bold text-positive">{p.accuracyScore}%</td>
                  <td className="px-5 py-3.5 text-right font-mono-num text-navy">{p.crowdBeaterRate}%</td>
                  <td className="px-5 py-3.5 text-right font-mono-num text-muted-foreground">{p.resolvedCount.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-navy-soft">{p.topCategories[0].category}</td>
                  <td className="px-5 py-3.5"><span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-navy-soft line-clamp-1">{p.badges[0]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center gap-2 text-sm font-bold text-navy"><Trophy className="h-4 w-4 text-premium" /> Full rankings (ranks 11–100)</div>
        <LockedOverlay title="Unlock the full leaderboard" description="Pro members see all 100 ranks, category deep-dives, historical rank, and filters.">
          <div className="surface-card divide-y divide-border overflow-hidden">
            {lockedExtra.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 px-5 py-3">
                <span className="w-6 font-mono-num text-sm font-bold text-muted-foreground">{i + 11}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">{p.avatar}</span>
                <span className="flex-1 font-semibold text-navy">{p.name}</span>
                <span className="font-mono-num text-positive">{p.accuracyScore}%</span>
              </div>
            ))}
          </div>
        </LockedOverlay>
      </div>
    </AppLayout>
  );
}
