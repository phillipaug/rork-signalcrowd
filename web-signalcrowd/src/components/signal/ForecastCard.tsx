import { Link } from "react-router-dom";
import type { Forecast } from "@/data/types";
import { ReliabilityBadge, ValidationBadge, HypeBadge, CategoryChip, Delta } from "./SignalBadges";
import { Sparkline } from "@/components/charts/Sparkline";
import { Users, CalendarClock, ArrowRight } from "lucide-react";
import { formatCompact } from "@/lib/format";

export function ForecastCard({ f }: { f: Forecast }) {
  const positive = f.trend7d >= 0;
  return (
    <Link
      to={`/app/forecasts/${f.id}`}
      className="surface-card surface-card-hover group flex flex-col gap-4 p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <CategoryChip category={f.category} />
        <span className="font-mono-num text-xs text-muted-foreground">{f.status}</span>
      </div>

      <h3 className="text-[15px] font-semibold leading-snug text-navy line-clamp-2 min-h-[44px]">{f.question}</h3>

      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground">Crowd probability</p>
          <p className="font-mono-num text-3xl font-bold tracking-tight text-navy">{f.probability}%</p>
        </div>
        <Sparkline data={f.trendData} width={110} height={44} color={positive ? "hsl(var(--positive))" : "hsl(var(--negative))"} />
      </div>

      <div className="flex flex-wrap gap-1.5">
        <ReliabilityBadge label={f.reliabilityLabel} />
        <ValidationBadge value={f.trendsValidation} />
        <HypeBadge value={f.hypeRisk} />
      </div>

      <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" /> {formatCompact(f.forecastCount)} forecasts
        </span>
        <span className="inline-flex items-center gap-1.5">
          7d <Delta value={f.trend7d} suffix="%" />
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarClock className="h-3.5 w-3.5" /> {f.resolutionDate}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-electric">Forecast Now</span>
        <ArrowRight className="h-4 w-4 text-electric transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
