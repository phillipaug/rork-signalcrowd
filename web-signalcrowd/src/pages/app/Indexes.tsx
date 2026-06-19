import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader, SectionTitle, UpgradeTeaser } from "@/components/ui-kit/Primitives";
import { Delta, GradeBadge, LifecycleBadge } from "@/components/signal/SignalBadges";
import { commerceIndexes } from "@/data/mock";
import { TrendingUp, ArrowRight, Package, AlertTriangle } from "lucide-react";

export default function Indexes() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="Category Indexes"
        title="Track product momentum by category."
        subtitle="Live commerce category indexes measuring product opportunity, saturation risk, creator activity, and margin potential. Demo data shown."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {commerceIndexes.map(idx => (
          <Link key={idx.id} to={`/app/indexes/${idx.id}`} className="surface-card surface-card-hover p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-navy">{idx.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{idx.description.slice(0, 80)}...</p>
              </div>
              <GradeBadge grade={idx.saturationRisk === "Low" ? "A" : idx.saturationRisk === "Medium" ? "B" : "C"} />
            </div>
            <div className="flex items-end justify-between mt-4">
              <div>
                <span className="font-mono-num text-4xl font-bold tracking-tighter text-navy">{idx.score}</span>
                <span className="ml-1 text-sm text-muted-foreground">/ 100</span>
                <Delta value={idx.weeklyChange} className="ml-2" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-secondary/50 p-2.5">
                <p className="text-xs text-muted-foreground">Opportunities</p>
                <p className="font-mono-num text-lg font-bold text-navy">{idx.opportunityCount.toLocaleString()}</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-2.5">
                <p className="text-xs text-muted-foreground">Sat. Risk</p>
                <p className={`text-lg font-bold ${idx.saturationRisk === "Low" ? "text-positive" : idx.saturationRisk === "Medium" ? "text-premium" : "text-negative"}`}>{idx.saturationRisk}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {idx.topRising.slice(0, 2).map(p => (
                <span key={p} className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">{p}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <UpgradeTeaser text="Unlock full category dashboards with weekly momentum reports." />
      </div>
    </AppLayout>
  );
}
