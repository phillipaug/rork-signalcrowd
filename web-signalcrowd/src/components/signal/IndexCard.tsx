import { Link } from "react-router-dom";
import type { IndexItem } from "@/data/types";
import { ValidationBadge, GradeBadge, Delta, CategoryChip } from "./SignalBadges";
import { Sparkline } from "@/components/charts/Sparkline";
import { ArrowRight } from "lucide-react";
import { formatCompact } from "@/lib/format";

export function IndexCard({ idx }: { idx: IndexItem }) {
  const positive = idx.weeklyChange >= 0;
  return (
    <Link to={`/app/indexes/${idx.id}`} className="surface-card surface-card-hover group flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <CategoryChip category={idx.category} />
          <h3 className="mt-2 text-base font-bold leading-tight text-navy">{idx.name}</h3>
        </div>
        <GradeBadge grade={idx.reliabilityGrade} />
      </div>

      <div className="flex items-end justify-between">
        <div>
          <span className="font-mono-num text-4xl font-bold tracking-tight text-navy">{idx.score}</span>
          <span className="ml-1 text-sm text-muted-foreground">/ 100</span>
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            7d <Delta value={idx.weeklyChange} /> · 30d <Delta value={idx.monthlyChange} />
          </div>
        </div>
        <Sparkline data={idx.trendData} width={120} height={48} color={positive ? "hsl(var(--positive))" : "hsl(var(--negative))"} />
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
        <div>
          <p className="text-[11px] text-muted-foreground">Volume</p>
          <p className="font-mono-num text-sm font-semibold text-navy">{formatCompact(idx.forecastVolume)}</p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground">Accuracy</p>
          <p className="font-mono-num text-sm font-semibold text-navy">{idx.crowdAccuracy}%</p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground">Trends</p>
          <p className="text-sm font-semibold text-navy">{idx.trendsValidation}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <ValidationBadge value={idx.trendsValidation} />
        <span className="inline-flex items-center gap-1 text-sm font-bold text-electric">
          View Index <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
