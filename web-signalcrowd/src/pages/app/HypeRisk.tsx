import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { SectionTitle, UpgradeTeaser } from "@/components/ui-kit/Primitives";
import { RecommendationBadge, LifecycleBadge, MarginBadge, ValidationBadge, HypeBadge, CategoryChip } from "@/components/signal/SignalBadges";
import { highRiskProducts } from "@/data/mock";
import { AlertTriangle, TrendingUp, ArrowRight } from "lucide-react";

export default function HypeRisk() {
  return (
    <AppLayout>
      <div className="mb-6">
        <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-negative">Hype Risk</p>
        <h1 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">Avoid buying inventory at the top of the trend.</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">Signal Crowd flags products where attention is rising faster than demand quality, margin potential, or long-term reliability. Demo data shown.</p>
      </div>

      {/* Summary */}
      <div className="mb-8 surface-card p-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="text-center">
            <p className="text-xs font-medium text-muted-foreground">High Hype Products</p>
            <p className="mt-1 font-mono-num text-3xl font-bold text-negative">918</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-muted-foreground">Likely Fads</p>
            <p className="mt-1 font-mono-num text-3xl font-bold text-premium">214</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-muted-foreground">Viral But Risky</p>
            <p className="mt-1 font-mono-num text-3xl font-bold text-negative">156</p>
          </div>
        </div>
      </div>

      {/* High-risk products */}
      <SectionTitle>High-Risk Products This Week</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {highRiskProducts.map(p => (
          <Link key={p.id} to={`/app/products/${p.id}`} className="surface-card surface-card-hover border-negative/10 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-negative/10 text-sm font-bold text-negative">{p.name.charAt(0)}</div>
                <div>
                  <p className="font-semibold text-navy text-sm">{p.name}</p>
                  <CategoryChip category={p.category} />
                </div>
              </div>
              <RecommendationBadge label={p.recommendation} />
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{p.description}</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Hype Risk</span>
                <span className="font-mono-num text-sm font-bold text-negative">{p.hypeRiskScore}/100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Saturation</span>
                <span className="font-mono-num text-sm font-bold text-negative">{p.saturationScore}/100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Margin</span>
                <MarginBadge label={p.marginPotential} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Validation</span>
                <ValidationBadge value={p.trendsValidation} />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-negative font-medium flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {p.hypeRiskScore > 70 ? "Avoid overbuying inventory. Prices compressing rapidly." : "Exercise caution. Monitor saturation weekly."}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Hype risk signals section */}
      <div className="mt-8">
        <SectionTitle>Common Hype Risk Signals</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Viral Spike Without Validation", desc: "TikTok video spike without corresponding search-interest increase. Pure social hype, likely short-lived.", icon: TrendingUp },
            { title: "Creator Saturation", desc: "Too many creators promoting the same product. Content fatigue leads to rapid decline in engagement.", icon: AlertTriangle },
            { title: "Price Compression", desc: "New sellers entering faster than demand grows. Margins compress to near-cost within weeks.", icon: AlertTriangle },
            { title: "Low Repeat Purchase", desc: "Products with little repeat-use potential die faster when viral attention fades.", icon: AlertTriangle },
            { title: "Quality Complaints Rising", desc: "Mixed or negative reviews signal quality inconsistency that kills word-of-mouth.", icon: AlertTriangle },
            { title: "Platform Risk", desc: "Claims-based products (skincare, health, safety) face elevated platform compliance scrutiny.", icon: AlertTriangle },
          ].map((s, i) => (
            <div key={i} className="surface-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-negative/10">
                  <s.icon className="h-4 w-4 text-negative" />
                </div>
                <p className="text-sm font-semibold text-navy">{s.title}</p>
              </div>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <UpgradeTeaser text="Get real-time hype risk alerts before you overbuy inventory." />
      </div>
    </AppLayout>
  );
}
