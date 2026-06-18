import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui-kit/Primitives";
import { IndexCard } from "@/components/signal/IndexCard";
import { indexes } from "@/data/mock";
import { cn } from "@/lib/utils";

type Sort = "score" | "movers" | "accuracy";

export default function Indexes() {
  const [sort, setSort] = useState<Sort>("score");

  const sorted = [...indexes].sort((a, b) => {
    if (sort === "movers") return Math.abs(b.weeklyChange) - Math.abs(a.weeklyChange);
    if (sort === "accuracy") return b.crowdAccuracy - a.crowdAccuracy;
    return b.score - a.score;
  });

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Probability Indexes"
        title="Live confidence across every major theme"
        subtitle="Each index is a weighted basket of related forecasts, scored 0–100 and validated against search-interest data."
        action={
          <div className="inline-flex rounded-xl border border-border bg-card p-1">
            {([["score", "Top score"], ["movers", "Biggest movers"], ["accuracy", "Most accurate"]] as [Sort, string][]).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setSort(k)}
                className={cn("rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors", sort === k ? "bg-navy text-white" : "text-muted-foreground hover:text-navy")}
              >
                {label}
              </button>
            ))}
          </div>
        }
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((idx) => (
          <IndexCard key={idx.id} idx={idx} />
        ))}
      </div>
    </AppLayout>
  );
}
