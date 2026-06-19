import { useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader, SectionTitle, UpgradeTeaser } from "@/components/ui-kit/Primitives";
import { leaderboard } from "@/data/mock";
import { Trophy, TrendingUp, Target, Star } from "lucide-react";

const tabs = ["Global", "Beauty", "Pet Products", "Home Gadgets", "Kitchen Gadgets"] as const;

export default function Leaderboards() {
  const [tab, setTab] = useState<typeof tabs[number]>("Global");

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Leaderboards"
        title="Top product forecasters."
        subtitle="Ranked by accuracy, calibration, and crowd-beater rate across commerce categories. Free: top 10. Pro: full leaderboards with filters and history."
      />

      <div className="flex gap-1.5 mb-6 overflow-x-auto no-scrollbar">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors shrink-0 ${tab === t ? "bg-navy text-white" : "bg-secondary text-navy-soft hover:bg-secondary/70"}`}>{t}</button>
        ))}
      </div>

      <div className="surface-card overflow-hidden mb-8">
        {leaderboard.map((p, i) => (
          <Link key={p.id} to={`/app/profile/${p.id}`} className="flex items-center gap-3 border-b border-border px-5 py-4 last:border-0 hover:bg-secondary/20 transition-colors">
            <div className="flex items-center justify-center w-8 shrink-0">
              {i === 0 ? <Trophy className="h-5 w-5 text-premium" /> : i === 1 ? <Trophy className="h-5 w-5 text-muted-foreground" /> : i === 2 ? <Trophy className="h-5 w-5 text-negative" /> : <span className="font-mono-num text-sm font-bold text-muted-foreground">{i + 1}</span>}
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-xs font-bold text-white shrink-0">{p.avatar}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-navy">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.topCategories[0].category} · {p.crowdBeaterRate}% crowd beater</p>
            </div>
            <div className="hidden sm:flex items-center gap-4 shrink-0">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Accuracy</p>
                <p className="font-mono-num text-sm font-bold text-positive">{p.accuracyScore}%</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Calibration</p>
                <p className="font-mono-num text-sm font-bold text-electric">{p.calibrationScore}%</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Forecasts</p>
                <p className="font-mono-num text-sm font-bold text-navy">{p.forecastCount.toLocaleString()}</p>
              </div>
            </div>
            <div className="sm:hidden text-right shrink-0">
              <span className="font-mono-num text-sm font-bold text-positive">{p.accuracyScore}%</span>
            </div>
          </Link>
        ))}
      </div>

      <UpgradeTeaser text="Unlock full leaderboards with category filters, historical rank tracking, and comparison tools." />
    </AppLayout>
  );
}
