import { useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader, SectionTitle, UpgradeTeaser } from "@/components/ui-kit/Primitives";
import { RecommendationBadge, LifecycleBadge, GapBadge, CategoryChip } from "@/components/signal/SignalBadges";
import { products } from "@/data/mock";
import { Bookmark, Plus, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const demoWatchlists = [
  { name: "My Beauty Watchlist", products: products.filter(p => p.cat === "Beauty" || p.cat === "Skincare" || p.cat === "Haircare").slice(0, 4) },
  { name: "TikTok-to-Amazon Gaps", products: products.filter(p => p.tiktokToAmazonGap.includes("Gap")).slice(0, 4) },
  { name: "Products to Source", products: products.filter(p => p.recommendation === "Test Now" || p.recommendation === "Test Small").slice(0, 3) },
];

export default function Watchlists() {
  const [activeList, setActiveList] = useState(0);

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Watchlists"
        title="Track products that matter to your business."
        subtitle="Create watchlists for beauty products, TikTok gaps, sourcing candidates, and client opportunities. Free: 1 list. Starter: 5 lists. Pro: unlimited."
      />

      <div className="flex gap-1.5 mb-6 overflow-x-auto no-scrollbar">
        {demoWatchlists.map((wl, i) => (
          <button key={wl.name} onClick={() => setActiveList(i)} className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors shrink-0 ${activeList === i ? "bg-navy text-white" : "bg-secondary text-navy-soft hover:bg-secondary/70"}`}>
            {wl.name} ({wl.products.length})
          </button>
        ))}
        <button onClick={() => toast.success("New watchlist created! (demo)")} className="rounded-lg border border-dashed border-border px-3 py-2 text-sm font-semibold text-muted-foreground hover:border-electric shrink-0 flex items-center gap-1">
          <Plus className="h-3.5 w-3.5" /> New
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {demoWatchlists[activeList].products.map(p => (
          <Link key={p.id} to={`/app/products/${p.id}`} className="surface-card surface-card-hover p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bookmark className="h-4 w-4 text-electric" />
                <div>
                  <p className="font-semibold text-navy text-sm">{p.name}</p>
                  <CategoryChip category={p.category} />
                </div>
              </div>
              <span className="font-mono-num text-lg font-bold text-navy">{p.opportunityScore}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <RecommendationBadge label={p.recommendation} />
              <LifecycleBadge stage={p.lifecycleStage} />
              <GapBadge label={p.tiktokToAmazonGap} />
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <UpgradeTeaser text="Unlock unlimited watchlists, client workspaces, and watchlist alerts." />
      </div>
    </AppLayout>
  );
}
