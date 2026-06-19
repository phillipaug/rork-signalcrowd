import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { SectionTitle } from "@/components/ui-kit/Primitives";
import { RecommendationBadge, LifecycleBadge, GapBadge, MarginBadge, TikTokBadge, AmazonBadge, Delta, CategoryChip } from "@/components/signal/SignalBadges";
import { products, PRODUCT_CATEGORIES } from "@/data/mock";
import type { ProductOpportunity, ProductCategory, ProductRecommendation, LifecycleStage } from "@/data/types";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";

const recFilters: (ProductRecommendation | "All")[] = ["All", "Test Now", "Test Small", "Watch Closely", "Creator Opportunity", "Amazon Gap Opportunity", "Avoid", "Avoid Overbuying"];
const lifecycleFilters: (LifecycleStage | "All")[] = ["All", "Emerging", "Accelerating", "Breakout", "Mainstream", "Saturating", "Seasonal", "Evergreen"];

export default function ProductRadar() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<ProductCategory | "All">("All");
  const [selectedRec, setSelectedRec] = useState<ProductRecommendation | "All">("All");
  const [selectedLifecycle, setSelectedLifecycle] = useState<LifecycleStage | "All">("All");
  const [sortKey, setSortKey] = useState<"score" | "tiktok" | "hype">("score");

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (selectedCat !== "All") list = list.filter(p => p.category === selectedCat);
    if (selectedRec !== "All") list = list.filter(p => p.recommendation === selectedRec);
    if (selectedLifecycle !== "All") list = list.filter(p => p.lifecycleStage === selectedLifecycle);
    if (sortKey === "score") list.sort((a, b) => b.opportunityScore - a.opportunityScore);
    else if (sortKey === "tiktok") {
      const rank: Record<string, number> = { Strong: 5, High: 5, Rising: 4, Medium: 3, Declining: 2, Low: 1 };
      list.sort((a, b) => (rank[b.tiktokMomentum] || 0) - (rank[a.tiktokMomentum] || 0));
    } else if (sortKey === "hype") list.sort((a, b) => a.hypeRiskScore - b.hypeRiskScore);
    return list;
  }, [search, selectedCat, selectedRec, selectedLifecycle, sortKey]);

  return (
    <AppLayout>
      <div className="mb-6">
        <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-electric">Product Radar</p>
        <h1 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">Find the product trend before the market catches up.</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">Real-time product opportunity scores combining TikTok momentum, Amazon saturation, search validation, creator activity, and margin estimates. Demo data shown.</p>
      </div>

      {/* Filters */}
      <div className="surface-card mb-6 p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} className="h-10 w-full rounded-xl border border-border bg-secondary/60 pl-10 pr-4 text-sm outline-none focus:border-primary" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
          {/* Category chips */}
          {(["All", ...PRODUCT_CATEGORIES] as const).map(c => (
            <button key={c} onClick={() => setSelectedCat(c)} className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${selectedCat === c ? "bg-navy text-white" : "bg-secondary text-navy-soft hover:bg-secondary/70"}`}>{c === "All" ? "All Categories" : c}</button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Rec:</span>
          {recFilters.map(r => (
            <button key={r} onClick={() => setSelectedRec(r)} className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors ${selectedRec === r ? "bg-navy text-white" : "bg-secondary text-navy-soft hover:bg-secondary/70"}`}>{r === "All" ? "All" : r}</button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Stage:</span>
          {lifecycleFilters.map(l => (
            <button key={l} onClick={() => setSelectedLifecycle(l)} className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors ${selectedLifecycle === l ? "bg-navy text-white" : "bg-secondary text-navy-soft hover:bg-secondary/70"}`}>{l === "All" ? "All" : l}</button>
          ))}
        </div>
        <div className="flex gap-2">
          {(["score", "tiktok", "hype"] as const).map(k => (
            <button key={k} onClick={() => setSortKey(k)} className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${sortKey === k ? "bg-navy text-white" : "bg-secondary text-navy-soft"}`}>
              <ArrowUpDown className="h-3 w-3" />
              {k === "score" ? "Opportunity" : k === "tiktok" ? "TikTok" : "Hype (low first)"}
            </button>
          ))}
        </div>
      </div>

      {/* Product Table */}
      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Product</th>
                <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</th>
                <th className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">Score</th>
                <th className="hidden px-3 py-3 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground md:table-cell">TikTok</th>
                <th className="hidden px-3 py-3 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground md:table-cell">Amazon</th>
                <th className="hidden px-3 py-3 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground lg:table-cell">Validation</th>
                <th className="hidden px-3 py-3 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground lg:table-cell">Margin</th>
                <th className="hidden px-3 py-3 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground lg:table-cell">Hype</th>
                <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Rec</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(p => (
                <tr key={p.id} className="transition-colors hover:bg-secondary/30">
                  <td className="px-4 py-3">
                    <Link to={`/app/products/${p.id}`} className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-sm font-bold text-electric">{p.name.charAt(0)}</div>
                      <div>
                        <p className="font-semibold text-navy hover:text-electric transition-colors">{p.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1 hidden sm:block">{p.description.slice(0, 60)}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-3 py-3"><CategoryChip category={p.category} /></td>
                  <td className="px-3 py-3 text-center">
                    <span className="font-mono-num text-lg font-bold text-navy">{p.opportunityScore}</span>
                  </td>
                  <td className="hidden px-3 py-3 text-center md:table-cell"><TikTokBadge value={p.tiktokMomentum} /></td>
                  <td className="hidden px-3 py-3 text-center md:table-cell"><AmazonBadge value={p.amazonSaturation} /></td>
                  <td className="hidden px-3 py-3 text-center lg:table-cell">
                    <span className={`text-xs font-semibold ${p.trendsValidation === "Strong" ? "text-positive" : p.trendsValidation === "Moderate" ? "text-electric" : "text-muted-foreground"}`}>{p.trendsValidation}</span>
                  </td>
                  <td className="hidden px-3 py-3 text-center lg:table-cell"><MarginBadge label={p.marginPotential} /></td>
                  <td className="hidden px-3 py-3 text-center lg:table-cell">
                    <span className={`font-mono-num text-xs font-bold ${p.hypeRiskScore > 60 ? "text-negative" : p.hypeRiskScore > 35 ? "text-premium" : "text-positive"}`}>{p.hypeRiskScore}</span>
                  </td>
                  <td className="px-3 py-3"><RecommendationBadge label={p.recommendation} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-12 text-center text-sm text-muted-foreground">No products match your filters. Try adjusting your criteria.</div>
        )}
      </div>
    </AppLayout>
  );
}
