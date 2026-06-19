import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader, SectionTitle } from "@/components/ui-kit/Primitives";
import { ReliabilityBadge, ValidationBadge, HypeBadge, Delta, CategoryChip, TrendBadge } from "@/components/signal/SignalBadges";
import { forecasts, products } from "@/data/mock";
import type { Category } from "@/data/types";
import { Search, ArrowRight } from "lucide-react";

const catFilterOptions = ["All", "Commerce", "AI", "Crypto", "Economy", "Housing", "Startups", "Geopolitics", "Energy"] as const;

export default function Forecasts() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<typeof catFilterOptions[number]>("All");

  const filtered = useMemo(() => {
    let list = [...forecasts];
    if (search) list = list.filter(f => f.question.toLowerCase().includes(search.toLowerCase()));
    if (cat !== "All") list = list.filter(f => f.category === cat);
    list.sort((a, b) => Math.abs(b.trend7d) - Math.abs(a.trend7d));
    return list;
  }, [search, cat]);

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Forecasts"
        title="Forecast product and market outcomes."
        subtitle="Predict product success, category momentum, and commerce trends. Build your forecasting track record. Demo data shown."
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Search forecasts…" value={search} onChange={e => setSearch(e.target.value)} className="h-10 w-full rounded-xl border border-border bg-secondary/60 pl-10 pr-4 text-sm outline-none focus:border-primary" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {catFilterOptions.map(c => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${cat === c ? "bg-navy text-white" : "bg-secondary text-navy-soft hover:bg-secondary/70"}`}>{c === "All" ? "All Categories" : c}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(f => {
          const linkedProduct = f.productId ? products.find(p => p.id === f.productId) : null;
          return (
            <Link key={f.id} to={`/app/forecasts/${f.id}`} className="surface-card surface-card-hover p-5">
              <div className="flex items-start justify-between mb-2">
                <CategoryChip category={f.category} />
                <Delta value={f.trend7d} suffix="%" />
              </div>
              <p className="text-sm font-semibold text-navy line-clamp-2 mb-3">{f.question}</p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-mono-num text-3xl font-bold tracking-tight text-navy">{f.probability}</span>
                <span className="text-xs text-muted-foreground">% probability</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <ReliabilityBadge label={f.reliabilityLabel} />
                <ValidationBadge value={f.trendsValidation} />
                <HypeBadge value={f.hypeRisk} />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{f.forecastCount.toLocaleString()} forecasts</span>
                <span>{f.resolutionDate}</span>
              </div>
              {linkedProduct && (
                <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-accent text-[10px] font-bold text-electric">{linkedProduct.name.charAt(0)}</div>
                  <span className="text-xs text-muted-foreground">{linkedProduct.name}</span>
                  <ArrowRight className="ml-auto h-3 w-3 text-muted-foreground" />
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </AppLayout>
  );
}
