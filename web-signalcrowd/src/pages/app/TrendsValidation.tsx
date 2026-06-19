import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { SectionTitle, UpgradeTeaser } from "@/components/ui-kit/Primitives";
import { ValidationBadge, TrendBadge, CategoryChip } from "@/components/signal/SignalBadges";
import { products } from "@/data/mock";
import { Search, TrendingUp, AlertTriangle, CheckCircle2, BarChart3 } from "lucide-react";

const validationGroups = [
  { label: "Strongly Validated", filter: "Strong" as const, color: "text-positive", icon: CheckCircle2, desc: "Crowd probability and search interest both rising. Broad attention confirms the move." },
  { label: "Social-Only Hype", filter: "Weak" as const, color: "text-negative", icon: AlertTriangle, desc: "High social momentum but low search interest. Signal may be creator-driven, not consumer-driven." },
  { label: "Search-Led Demand", filter: "Strong" as const, color: "text-electric", icon: TrendingUp, desc: "Search interest rising without major social momentum. Under-the-radar demand opportunity." },
  { label: "Seller Opportunity", filter: "Moderate" as const, color: "text-premium", icon: BarChart3, desc: "Moderate validation on both signals. Opportunity exists but requires careful evaluation." },
  { label: "Warning Zone", filter: "None" as const, color: "text-negative", icon: AlertTriangle, desc: "No search-interest validation. Trend may be purely platform-driven or already dying." },
];

export default function TrendsValidation() {
  return (
    <AppLayout>
      <div className="mb-6">
        <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-electric">Trend Validation</p>
        <h1 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">Separate real demand from viral noise.</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">Signal Crowd compares product momentum with Google Trends-style search interest, creator velocity, Amazon demand, and saturation risk. Demo data shown.</p>
      </div>

      {/* Validation categories */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {validationGroups.slice(0, 5).map(g => (
          <div key={g.label} className="surface-card p-4 text-center">
            <g.icon className={`mx-auto h-6 w-6 ${g.color}`} />
            <p className={`mt-2 text-sm font-bold ${g.color}`}>{g.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">{g.desc}</p>
          </div>
        ))}
      </div>

      {/* Strongly validated products */}
      <SectionTitle>
        <span className="flex items-center gap-2 text-positive"><CheckCircle2 className="h-4 w-4" /> Strongly Validated</span>
      </SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {products.filter(p => p.trendsValidation === "Strong").slice(0, 6).map(p => (
          <Link key={p.id} to={`/app/products/${p.id}`} className="surface-card surface-card-hover p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-positive/10 text-sm font-bold text-positive">{p.name.charAt(0)}</div>
                <div>
                  <p className="font-semibold text-navy text-sm">{p.name}</p>
                  <CategoryChip category={p.category} />
                </div>
              </div>
              <span className="font-mono-num text-lg font-bold text-navy">{p.opportunityScore}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <TrendBadge value={p.trendReliability} />
              <ValidationBadge value={p.trendsValidation} />
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>
          </Link>
        ))}
      </div>

      {/* Social-only hype warnings */}
      <SectionTitle>
        <span className="flex items-center gap-2 text-negative"><AlertTriangle className="h-4 w-4" /> Social-Only Hype</span>
      </SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {products.filter(p => p.trendsValidation === "Weak" || p.trendsValidation === "None").slice(0, 6).map(p => (
          <Link key={p.id} to={`/app/products/${p.id}`} className="surface-card surface-card-hover border-negative/10 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-negative/10 text-sm font-bold text-negative">{p.name.charAt(0)}</div>
                <div>
                  <p className="font-semibold text-navy text-sm">{p.name}</p>
                  <CategoryChip category={p.category} />
                </div>
              </div>
              <span className="font-mono-num text-lg font-bold text-negative">{p.hypeRiskScore}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <TrendBadge value={p.trendReliability} />
              <ValidationBadge value={p.trendsValidation} />
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>
            <p className="mt-2 text-xs text-negative font-medium flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> High social traction, low search validation</p>
          </Link>
        ))}
      </div>

      {/* How it works */}
      <div className="surface-card p-6 mb-8">
        <SectionTitle>How Validation Works</SectionTitle>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            { step: "01", title: "Google Trends Comparison", desc: "We compare product momentum against Google Trends-style search interest data to see if consumer intent matches creator attention." },
            { step: "02", title: "Cross-Platform Signal", desc: "TikTok velocity, Amazon BSR movements, and search trends are weighted together to produce a validation score." },
            { step: "03", title: "Live Integration-Ready", desc: "Current demo uses mock data. Ready to connect to authorized Google Trends API, Amazon PA API, and TikTok Shop Partner API." },
          ].map(s => (
            <div key={s.step}>
              <span className="font-mono-num text-2xl font-bold text-electric/25">{s.step}</span>
              <h3 className="mt-1 text-sm font-bold text-navy">{s.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <UpgradeTeaser text="Get real-time trend validation alerts and daily validation reports." />
    </AppLayout>
  );
}
