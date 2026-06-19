import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { SectionTitle, UpgradeTeaser, LockedOverlay } from "@/components/ui-kit/Primitives";
import { AreaChart } from "@/components/charts/AreaChart";
import { Delta, GradeBadge, TrendBadge } from "@/components/signal/SignalBadges";
import { getCommerceIndex, products } from "@/data/mock";
import { ArrowRight, TrendingUp, AlertTriangle, Package, ShoppingBag } from "lucide-react";

export default function IndexDetail() {
  const { id } = useParams<{ id: string }>();
  const idx = getCommerceIndex(id || "");

  if (!idx) {
    return (
      <AppLayout>
        <div className="py-20 text-center">
          <p className="text-lg font-bold text-navy">Index not found</p>
          <Link to="/app/indexes" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-electric">Back to Indexes <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-6">
        <Link to="/app/indexes" className="text-xs font-semibold text-muted-foreground hover:text-electric mb-2 inline-block">Category Indexes</Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{idx.name}</h1>
            <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{idx.description}</p>
          </div>
          <div className="shrink-0 text-right">
            <div className="flex items-baseline gap-2">
              <span className="font-mono-num text-5xl font-bold tracking-tighter text-navy">{idx.score}</span>
              <span className="text-lg text-muted-foreground">/ 100</span>
            </div>
            <Delta value={idx.weeklyChange} className="text-lg" />
            <p className="mt-1 text-xs text-muted-foreground">
              Monthly: <Delta value={idx.monthlyChange} className="text-sm" />
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Chart */}
          <div className="surface-card p-6">
            <SectionTitle>90-Day Momentum</SectionTitle>
            <AreaChart data={idx.trendData} height={220} className="mt-2" />
          </div>

          {/* Summary */}
          <div className="surface-card p-6">
            <SectionTitle>AI Summary</SectionTitle>
            <p className="mt-2 text-sm text-navy-soft leading-relaxed">{idx.summary}</p>
          </div>

          {/* Top products */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="surface-card p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-positive mb-3">Top Rising</p>
              {idx.topRising.map((name, i) => {
                const p = products.find(pr => pr.name === name);
                return (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                    <Link to={p ? `/app/products/${p.id}` : "#"} className="text-xs font-medium text-navy hover:text-electric">{name}</Link>
                    {p && <span className="font-mono-num text-xs font-bold text-navy">{p.opportunityScore}</span>}
                  </div>
                );
              })}
            </div>
            <div className="surface-card p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-negative mb-3">Top Saturated</p>
              {idx.topSaturated.map((name, i) => {
                const p = products.find(pr => pr.name === name);
                return (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                    <Link to={p ? `/app/products/${p.id}` : "#"} className="text-xs font-medium text-navy hover:text-electric">{name}</Link>
                    {p && <span className="font-mono-num text-xs font-bold text-negative">{p.saturationScore}</span>}
                  </div>
                );
              })}
              {idx.topSaturated.length === 0 && <p className="text-xs text-muted-foreground py-2">No heavily saturated products.</p>}
            </div>
            <div className="surface-card p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-violet mb-3">Top Creator-Led</p>
              {idx.topCreatorLed.map((name, i) => {
                const p = products.find(pr => pr.name === name);
                return (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                    <Link to={p ? `/app/products/${p.id}` : "#"} className="text-xs font-medium text-navy hover:text-electric">{name}</Link>
                    {p && <span className="font-mono-num text-xs font-bold text-violet">Creator</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Locked: Advanced analytics */}
          <LockedOverlay title="Advanced Category Analytics" description="Unlock product-level forecasts, saturation trends, and regional comparison data.">
            <div className="surface-card p-6">
              <SectionTitle>Advanced Analytics</SectionTitle>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {["Weekly forecast model", "Regional demand heatmap", "Saturation projection", "Margin trend analysis"].map(t => (
                  <div key={t} className="rounded-xl border border-border bg-secondary/40 p-4">
                    <p className="text-sm font-semibold text-navy">{t}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Pro feature — unlock to access</p>
                  </div>
                ))}
              </div>
            </div>
          </LockedOverlay>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="surface-card p-5">
            <SectionTitle>At a Glance</SectionTitle>
            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Opportunities</span>
                <span className="font-mono-num font-bold text-navy">{idx.opportunityCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Saturation Risk</span>
                <span className={`font-semibold text-xs ${idx.saturationRisk === "Low" ? "text-positive" : idx.saturationRisk === "Medium" ? "text-premium" : "text-negative"}`}>{idx.saturationRisk}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><ShoppingBag className="h-3 w-3" /> Avg Margin</span>
                <span className={`font-semibold text-xs ${idx.avgMargin === "Good" ? "text-positive" : idx.avgMargin === "Medium" ? "text-electric" : "text-negative"}`}>{idx.avgMargin}</span>
              </div>
            </div>
          </div>

          <Link to="/app/products" className="block surface-card surface-card-hover p-5 text-center">
            <Package className="mx-auto h-6 w-6 text-electric" />
            <p className="mt-2 font-semibold text-navy text-sm">View Products</p>
            <p className="mt-1 text-xs text-muted-foreground">Browse all products in this category</p>
          </Link>

          <UpgradeTeaser text="Get weekly category reports with product recommendations." />
        </div>
      </div>
    </AppLayout>
  );
}
