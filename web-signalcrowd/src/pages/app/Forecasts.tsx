import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui-kit/Primitives";
import { ForecastCard } from "@/components/signal/ForecastCard";
import { forecasts, CATEGORIES } from "@/data/mock";
import type { Category } from "@/data/types";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

type FilterKey =
  | "trending"
  | "most"
  | "movers"
  | "reliable"
  | "controversial"
  | "radar"
  | "hype"
  | "expert"
  | "closing"
  | "new";

const filters: { key: FilterKey; label: string }[] = [
  { key: "trending", label: "Trending" },
  { key: "most", label: "Most forecasted" },
  { key: "movers", label: "Biggest movers" },
  { key: "reliable", label: "Highest reliability" },
  { key: "controversial", label: "Most controversial" },
  { key: "radar", label: "Under the radar" },
  { key: "hype", label: "High hype risk" },
  { key: "expert", label: "Expert disagreement" },
  { key: "closing", label: "Closing soon" },
  { key: "new", label: "Newly added" },
];

export default function Forecasts() {
  const [filter, setFilter] = useState<FilterKey>("trending");
  const [cat, setCat] = useState<Category | "All">("All");

  const list = useMemo(() => {
    let l = [...forecasts];
    if (cat !== "All") l = l.filter((f) => f.category === cat);
    switch (filter) {
      case "most":
        l.sort((a, b) => b.forecastCount - a.forecastCount);
        break;
      case "movers":
        l.sort((a, b) => Math.abs(b.trend7d) - Math.abs(a.trend7d));
        break;
      case "reliable":
        l = l.filter((f) => f.reliabilityLabel === "Reliable Signal");
        break;
      case "controversial":
        l = l.filter((f) => f.probability >= 40 && f.probability <= 60);
        break;
      case "radar":
        l = l.filter((f) => f.trendsValidation === "Weak" && f.trend7d > 0);
        break;
      case "hype":
        l = l.filter((f) => f.hypeRisk === "High" || f.hypeRisk === "Medium").sort((a, b) => b.searchMomentum - a.searchMomentum);
        break;
      case "expert":
        l.sort((a, b) => Math.abs(b.expertProb - b.probability) - Math.abs(a.expertProb - a.probability));
        break;
      case "closing":
        l = l.filter((f) => f.status === "Closing Soon");
        break;
      case "new":
        l.reverse();
        break;
      default:
        l.sort((a, b) => b.searchMomentum - a.searchMomentum);
    }
    return l;
  }, [filter, cat]);

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Forecast Feed"
        title="What does the crowd think happens next?"
        subtitle="Browse live crowd probabilities with reliability, trends-validation, and hype-risk signals on every card."
        action={
          <Link to="/app/forecasts/new" className="inline-flex items-center gap-1.5 rounded-xl bg-navy px-4 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105">
            <Plus className="h-4 w-4" /> New question
          </Link>
        }
      />

      {/* Category chips */}
      <div className="mb-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {(["All", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn("shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors", cat === c ? "border-navy bg-navy text-white" : "border-border bg-card text-navy-soft hover:border-primary")}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Filter chips */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn("shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors", filter === f.key ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-secondary")}
          >
            {f.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="surface-card flex flex-col items-center justify-center p-12 text-center">
          <p className="font-bold text-navy">No forecasts match these filters</p>
          <p className="mt-1 text-sm text-muted-foreground">Try a different category or filter.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((f) => (
            <ForecastCard key={f.id} f={f} />
          ))}
        </div>
      )}
    </AppLayout>
  );
}
