import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { SectionTitle, UpgradeTeaser } from "@/components/ui-kit/Primitives";
import { RecommendationBadge, LifecycleBadge, TikTokBadge, CategoryChip } from "@/components/signal/SignalBadges";
import { creatorProducts } from "@/data/mock";
import { ShoppingBag, TrendingUp, Users, Video, ArrowRight, Star } from "lucide-react";

const creatorTypes = [
  { type: "Beauty Creators", desc: "Skincare, haircare, makeup, wellness routines", icon: Star, products: creatorProducts.filter(p => p.cat === "Beauty" || p.cat === "Skincare" || p.cat === "Haircare" || p.cat === "Wellness") },
  { type: "Pet Content Creators", desc: "Pet owners, groomers, trainers, lifestyle", icon: Users, products: creatorProducts.filter(p => p.cat === "Pet Products") },
  { type: "Home & Organization", desc: "Cleaning, organization, home hacks, kitchen gadgets", icon: ShoppingBag, products: creatorProducts.filter(p => p.cat === "Home Gadgets" || p.cat === "Kitchen Gadgets" || p.cat === "Cleaning Products" || p.cat === "Home Office") },
  { type: "Parent & Family", desc: "Mom/dad content, baby products, kids toys", icon: Video, products: creatorProducts.filter(p => p.cat === "Baby/Kids") },
  { type: "Tech & Lifestyle", desc: "Gadgets, travel accessories, tech add-ons", icon: TrendingUp, products: creatorProducts.filter(p => p.cat === "Tech Accessories" || p.cat === "Travel Accessories" || p.cat === "Gadgets") },
];

export default function CreatorOpps() {
  const allCreatorProducts = creatorProducts.slice(0, 8);

  return (
    <AppLayout>
      <div className="mb-6">
        <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-violet">Creator Opportunities</p>
        <h1 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">The best products for creators to promote right now.</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">Products with strong content potential, low creator saturation, and high engagement rates. Demo data shown.</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Creator-Led Products", value: "1,240", color: "text-violet" },
          { label: "Strong Creator Fit", value: "342", color: "text-positive" },
          { label: "Low Creator Saturation", value: "186", color: "text-electric" },
          { label: "High Affiliate Potential", value: "214", color: "text-premium" },
        ].map(s => (
          <div key={s.label} className="surface-card p-4 text-center">
            <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
            <p className={`mt-1 font-mono-num text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Top creator opportunities */}
      <SectionTitle action={<Link to="/app/products" className="text-sm font-bold text-electric">Full Radar</Link>}>
        Top Creator Opportunities
      </SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {allCreatorProducts.map(p => (
          <Link key={p.id} to={`/app/products/${p.id}`} className="surface-card surface-card-hover p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-sm font-bold text-electric">{p.name.charAt(0)}</div>
              <RecommendationBadge label="Creator Opportunity" />
            </div>
            <p className="font-semibold text-navy text-sm line-clamp-2 mb-2">{p.name}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <CategoryChip category={p.category} />
              <LifecycleBadge stage={p.lifecycleStage} />
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{p.description.slice(0, 100)}</p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Creator Fit</span>
                <span className="font-semibold text-positive">Strong</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Content Potential</span>
                <span className="font-semibold text-violet">High</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Affiliate Fit</span>
                <span className="font-semibold text-positive">Strong</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Creator type breakdown */}
      <div className="mt-10">
        <SectionTitle>Opportunities by Creator Type</SectionTitle>
        <div className="space-y-4">
          {creatorTypes.map(ct => (
            <div key={ct.type} className="surface-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                  <ct.icon className="h-5 w-5 text-electric" />
                </div>
                <div>
                  <p className="font-bold text-navy">{ct.type}</p>
                  <p className="text-xs text-muted-foreground">{ct.desc}</p>
                </div>
                <span className="ml-auto font-mono-num text-lg font-bold text-navy">{ct.products.length} products</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {ct.products.slice(0, 4).map(p => (
                  <Link key={p.id} to={`/app/products/${p.id}`} className="rounded-xl border border-border bg-secondary/40 px-3 py-2 text-xs font-medium text-navy-soft hover:border-primary/30 transition-colors">
                    {p.name}
                  </Link>
                ))}
                {ct.products.length > 4 && <span className="rounded-xl border border-border bg-secondary/40 px-3 py-2 text-xs font-medium text-muted-foreground">+{ct.products.length - 4} more</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Creator strategy tips */}
      <div className="mt-8">
        <SectionTitle>How Creators Use Signal Crowd</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Find Products Early", desc: "Identify products before they saturate creator feeds. Early adopters get the most engagement.", icon: TrendingUp },
            { title: "Avoid Saturated Products", desc: "Skip products every creator is already promoting. Find unique angles on emerging trends.", icon: AlertTriangle },
            { title: "Match Product to Audience", desc: "Use category and audience fit data to select products your followers will actually buy.", icon: Users },
            { title: "Track Content Angles", desc: "See which demo styles (before/after, unboxing, tutorial) perform best per product category.", icon: Video },
            { title: "Affiliate Revenue Modeling", desc: "Estimate earning potential based on engagement, conversion rates, and commission structures.", icon: ShoppingBag },
            { title: "Brand Partnership Data", desc: "Show brands your audience fit and category expertise with verifiable product intelligence.", icon: Star },
          ].map((t, i) => (
            <div key={i} className="surface-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                  <t.icon className="h-4 w-4 text-electric" />
                </div>
                <p className="text-sm font-semibold text-navy">{t.title}</p>
              </div>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <UpgradeTeaser text="Unlock creator shortlists, content angle suggestions, and affiliate revenue estimates." />
      </div>
    </AppLayout>
  );
}
