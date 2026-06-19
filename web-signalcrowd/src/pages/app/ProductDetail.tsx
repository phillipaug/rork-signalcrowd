import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader, SectionTitle, StatCard, UpgradeTeaser, LockedOverlay, ProgressBar } from "@/components/ui-kit/Primitives";
import { AreaChart, Sparkline } from "@/components/charts/AreaChart";
import { RecommendationBadge, LifecycleBadge, GapBadge, MarginBadge, TikTokBadge, AmazonBadge, TrendBadge, ValidationBadge, HypeBadge, Delta, CategoryChip } from "@/components/signal/SignalBadges";
import { getProduct } from "@/data/mock";
import { ArrowRight, TrendingUp, AlertTriangle, ShoppingBag, DollarSign, Search, Clock, BarChart3, Bookmark, Bell, FileText, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

function ScoreBar({ label, value, max = 100, color = "hsl(var(--electric))" }: { label: string; value: number; max?: number; color?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-32 shrink-0 text-xs font-medium text-muted-foreground">{label}</span>
      <ProgressBar value={(value / max) * 100} color={color} className="flex-1" />
      <span className="w-10 text-right font-mono-num text-xs font-bold text-navy">{value}</span>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = getProduct(id || "");

  if (!product) {
    return (
      <AppLayout>
        <div className="py-20 text-center">
          <p className="text-lg font-bold text-navy">Product not found</p>
          <Link to="/app/products" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-electric">Back to Product Radar <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <Link to="/app/products" className="text-xs font-semibold text-muted-foreground hover:text-electric">Product Radar</Link>
          <span className="text-muted-foreground/40">/</span>
          <CategoryChip category={product.category} />
        </div>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{product.name}</h1>
            <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{product.description}</p>
          </div>
          <div className="shrink-0 flex flex-col items-end">
            <div className="flex items-baseline gap-2">
              <span className="font-mono-num text-5xl font-bold tracking-tighter text-navy">{product.opportunityScore}</span>
              <span className="text-lg text-muted-foreground">/ 100</span>
            </div>
            <RecommendationBadge label={product.recommendation} className="mt-2" />
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[10px] font-medium text-muted-foreground">Sample / demo data</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Score overview */}
          <div className="surface-card p-6">
            <SectionTitle>Signal Breakdown</SectionTitle>
            <div className="space-y-3 mt-4">
              <ScoreBar label="TikTok Momentum" value={product.tiktokMomentum === "Strong" || product.tiktokMomentum === "High" ? 88 : product.tiktokMomentum === "Rising" ? 72 : product.tiktokMomentum === "Medium" ? 50 : 25} color="hsl(var(--electric))" />
              <ScoreBar label="Amazon Saturation" value={product.amazonSaturation === "Low" ? 22 : product.amazonSaturation === "Medium" ? 50 : 78} color="hsl(var(--premium))" />
              <ScoreBar label="Trends Validation" value={product.trendsValidation === "Strong" ? 85 : product.trendsValidation === "Moderate" ? 55 : 25} color="hsl(var(--positive))" />
              <ScoreBar label="Creator Momentum" value={product.creatorMomentum === "High" ? 85 : product.creatorMomentum === "Medium" ? 55 : 30} color="hsl(var(--violet))" />
              <ScoreBar label="Saturation Score" value={product.saturationScore} color={product.saturationScore > 60 ? "hsl(var(--negative))" : "hsl(var(--positive))"} />
              <ScoreBar label="Hype Risk" value={product.hypeRiskScore} color={product.hypeRiskScore > 60 ? "hsl(var(--negative))" : product.hypeRiskScore > 35 ? "hsl(var(--premium))" : "hsl(var(--positive))"} />
            </div>
          </div>

          {/* AI Briefing */}
          <div className="surface-card p-6">
            <SectionTitle>AI Product Briefing</SectionTitle>
            <p className="mt-2 text-sm text-navy-soft leading-relaxed">{product.briefing}</p>
          </div>

          {/* Why Trending */}
          <div className="surface-card p-6">
            <SectionTitle>Why It's Trending</SectionTitle>
            <ul className="mt-3 space-y-2">
              {product.whyTrending.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-navy-soft">
                  <TrendingUp className="h-4 w-4 text-positive shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Risks */}
          <div className="surface-card p-6">
            <SectionTitle>Risks & Cautions</SectionTitle>
            <ul className="mt-3 space-y-2">
              {product.risks.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-navy-soft">
                  <AlertTriangle className="h-4 w-4 text-negative shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Action */}
          <div className="surface-card border-l-4 border-primary p-6">
            <SectionTitle>Recommended Action</SectionTitle>
            <p className="mt-2 text-sm text-navy-soft">{product.recommendedAction}</p>
          </div>

          {/* Premium locked: Advanced Seller Intelligence */}
          <LockedOverlay title="Advanced Seller Intelligence" description="Unlock estimated landed cost, fee-adjusted margin, top competing listings, creator shortlist, keyword opportunities, and saturation forecast.">
            <div className="surface-card p-6">
              <SectionTitle>Advanced Seller Intelligence</SectionTitle>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-secondary/40 p-4">
                  <p className="text-xs font-semibold text-navy">Est. Landed Cost</p>
                  <p className="mt-1 font-mono-num text-lg font-bold text-navy">$4.20 – $8.40/unit</p>
                </div>
                <div className="rounded-xl border border-border bg-secondary/40 p-4">
                  <p className="text-xs font-semibold text-navy">Fee-Adjusted Margin</p>
                  <p className="mt-1 font-mono-num text-lg font-bold text-positive">{product.estimatedMargin}</p>
                </div>
                <div className="rounded-xl border border-border bg-secondary/40 p-4">
                  <p className="text-xs font-semibold text-navy">Top Keyword Opps</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {product.topKeywords.map((kw, i) => <span key={i} className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-navy-soft">{kw}</span>)}
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-secondary/40 p-4">
                  <p className="text-xs font-semibold text-navy">Weekly Velocity</p>
                  <p className="mt-1 font-mono-num text-lg font-bold text-navy">{product.weeklyVelocity}</p>
                </div>
              </div>
            </div>
          </LockedOverlay>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick stats */}
          <div className="surface-card p-5">
            <SectionTitle>At a Glance</SectionTitle>
            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> Lifecycle</span>
                <LifecycleBadge stage={product.lifecycleStage} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Package className="h-3 w-3" /> TikTok Gap</span>
                <GapBadge label={product.tiktokToAmazonGap} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><TrendingUp className="h-3 w-3" /> TikTok</span>
                <TikTokBadge value={product.tiktokMomentum} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><BarChart3 className="h-3 w-3" /> Amazon</span>
                <AmazonBadge value={product.amazonSaturation} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Search className="h-3 w-3" /> Validation</span>
                <ValidationBadge value={product.trendsValidation} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><DollarSign className="h-3 w-3" /> Margin</span>
                <MarginBadge label={product.marginPotential} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Reliability</span>
                <TrendBadge value={product.trendReliability} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Hype Risk</span>
                <HypeBadge value={product.hypeRiskScore > 60 ? "High" : product.hypeRiskScore > 35 ? "Medium" : "Low"} />
              </div>
            </div>
          </div>

          {/* Price & Competition */}
          <div className="surface-card p-5">
            <SectionTitle>Market Info</SectionTitle>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Price Range</span>
                <span className="font-mono-num font-semibold text-navy">{product.priceEstimate}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Estimated Margin</span>
                <span className="font-mono-num font-semibold text-positive">{product.estimatedMargin}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Weekly Velocity</span>
                <span className="font-mono-num font-semibold text-navy">{product.weeklyVelocity}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Competition</span>
                <span className={`font-semibold ${product.competitionLevel === "Low" ? "text-positive" : product.competitionLevel === "Medium" ? "text-electric" : "text-negative"}`}>{product.competitionLevel}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Review Sentiment</span>
                <span className={`font-semibold ${product.reviewSentiment === "Positive" ? "text-positive" : product.reviewSentiment === "Mixed" ? "text-premium" : "text-negative"}`}>{product.reviewSentiment}</span>
              </div>
            </div>
          </div>

          {/* Trends chart */}
          <div className="surface-card p-5">
            <SectionTitle>90-Day Trend</SectionTitle>
            <AreaChart data={product.trendData} height={100} showAxis={false} className="mt-2" />
          </div>

          {/* Keyword opportunities */}
          <div className="surface-card p-5">
            <SectionTitle>Top Keywords (Demo)</SectionTitle>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.topKeywords.map((kw, i) => (
                <span key={i} className="rounded-lg border border-border bg-secondary px-2 py-1 text-[11px] font-medium text-navy-soft">{kw}</span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button onClick={() => toast.success("Added to watchlist!")} className="surface-card surface-card-hover flex w-full items-center justify-center gap-2 p-3 text-sm font-semibold text-navy">
              <Bookmark className="h-4 w-4" /> Add to Watchlist
            </button>
            <button onClick={() => toast.success("Alert set!")} className="surface-card surface-card-hover flex w-full items-center justify-center gap-2 p-3 text-sm font-semibold text-navy">
              <Bell className="h-4 w-4" /> Set Alert
            </button>
            <button onClick={() => toast.success("Report exported!")} className="surface-card surface-card-hover flex w-full items-center justify-center gap-2 p-3 text-sm font-semibold text-navy">
              <FileText className="h-4 w-4" /> Export Report
            </button>
          </div>

          {/* Upgrade CTA */}
          <Link to="/app/pricing" className="block rounded-2xl bg-gradient-to-br from-electric to-[hsl(200_100%_60%)] p-5 text-white transition-transform hover:scale-[1.02]">
            <p className="font-bold">Upgrade to Pro</p>
            <p className="mt-1 text-sm text-white/85">Unlock full product intelligence, advanced seller analytics, and creator shortlists.</p>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
