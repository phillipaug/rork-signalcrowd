import { useMemo } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { SectionTitle, UpgradeTeaser } from "@/components/ui-kit/Primitives";
import { RecommendationBadge, GapBadge, LifecycleBadge, TikTokBadge, AmazonBadge, Delta, CategoryChip } from "@/components/signal/SignalBadges";
import { products } from "@/data/mock";
import type { GapLabel } from "@/data/types";
import { Package, TrendingUp, BarChart3, ArrowRight } from "lucide-react";

const gapGroups: { label: string; filter: GapLabel[]; color: string; icon: typeof Package }[] = [
  { label: "Strong Gap Opportunities", filter: ["Strong Gap Opportunity"], color: "text-positive", icon: TrendingUp },
  { label: "Moderate Gaps", filter: ["Moderate Gap Opportunity", "Watchlist Opportunity"], color: "text-electric", icon: BarChart3 },
  { label: "Saturated", filter: ["Already Saturated"], color: "text-negative", icon: Package },
  { label: "Platform-Specific", filter: ["TikTok Only", "Amazon Demand Leading"], color: "text-muted-foreground", icon: BarChart3 },
];

export default function TikTokGap() {
  const grouped = useMemo(() => {
    return gapGroups.map(g => ({
      ...g,
      items: products.filter(p => g.filter.includes(p.tiktokToAmazonGap)).sort((a, b) => b.opportunityScore - a.opportunityScore),
    }));
  }, []);

  return (
    <AppLayout>
      <div className="mb-6">
        <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-electric">TikTok-to-Amazon Gap</p>
        <h1 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">Find products trending on TikTok before they saturate Amazon.</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">Identify where TikTok demand outpaces Amazon supply — the strongest signal for early-mover sellers. Demo data shown.</p>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Strong Gaps", value: products.filter(p => p.tiktokToAmazonGap === "Strong Gap Opportunity").length, color: "text-positive", sub: "Low Amazon, High TikTok" },
          { label: "Moderate Gaps", value: products.filter(p => p.tiktokToAmazonGap === "Moderate Gap Opportunity" || p.tiktokToAmazonGap === "Watchlist Opportunity").length, color: "text-electric", sub: "Worth watching" },
          { label: "Saturated", value: products.filter(p => p.tiktokToAmazonGap === "Already Saturated").length, color: "text-negative", sub: "High competition" },
          { label: "Platform-Specific", value: products.filter(p => p.tiktokToAmazonGap === "TikTok Only" || p.tiktokToAmazonGap === "Amazon Demand Leading").length, color: "text-muted-foreground", sub: "One platform leads" },
        ].map(c => (
          <div key={c.label} className="surface-card p-4 text-center">
            <p className="text-xs font-medium text-muted-foreground">{c.label}</p>
            <p className={`mt-1 font-mono-num text-3xl font-bold ${c.color}`}>{c.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Gap opportunity sections */}
      {grouped.map(g => (
        <div key={g.label} className="mb-8">
          <SectionTitle>
            <span className={`flex items-center gap-2 ${g.color}`}>
              <g.icon className="h-4 w-4" /> {g.label}
            </span>
          </SectionTitle>
          {g.items.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">No products in this category right now.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map(p => (
                <Link key={p.id} to={`/app/products/${p.id}`} className="surface-card surface-card-hover p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-xs font-bold text-electric">{p.name.charAt(0)}</div>
                      <div>
                        <p className="font-semibold text-navy text-sm line-clamp-1">{p.name}</p>
                        <CategoryChip category={p.category} />
                      </div>
                    </div>
                    <span className="font-mono-num text-lg font-bold text-navy">{p.opportunityScore}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <TikTokBadge value={p.tiktokMomentum} />
                    <AmazonBadge value={p.amazonSaturation} />
                    <LifecycleBadge stage={p.lifecycleStage} />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <RecommendationBadge label={p.recommendation} />
                    <span className="text-xs font-semibold text-electric flex items-center gap-1">View <ArrowRight className="h-3 w-3" /></span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}

      <UpgradeTeaser text="Unlock real-time TikTok-to-Amazon gap alerts and daily gap report." />
    </AppLayout>
  );
}
