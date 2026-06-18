import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui-kit/Primitives";
import { Layers, Gauge, Target, ShieldCheck, Search, Flame, Boxes, FileCheck } from "lucide-react";

const sections = [
  { icon: Layers, title: "Forecast Aggregation", body: "SignalCrowd aggregates individual probabilities into a single crowd probability, weighting recency, forecaster track record, and volume." },
  { icon: Gauge, title: "Confidence Scores", body: "Confidence scores consider forecast volume, forecaster quality, disagreement, volatility, and historical calibration." },
  { icon: Target, title: "Crowd Accuracy", body: "Crowd accuracy measures how close aggregate probabilities were to real-world outcomes, using a Brier-style scoring approach." },
  { icon: ShieldCheck, title: "Crowd Reliability Index", body: "Compares probability, historical accuracy, forecast volume, expert alignment, search-interest validation, volatility, and resolution clarity." },
  { icon: Search, title: "Trends Validation", body: "Compares forecast movement with Google Trends-style search-interest data. (Demo data in the MVP; architected for a compliant provider.)" },
  { icon: Flame, title: "Hype Risk", body: "Identifies when public attention rises faster than forecast reliability, flagging potential narrative-driven mispricing." },
  { icon: Boxes, title: "Index Construction", body: "Indexes are built from weighted baskets of related forecasts, normalized to a 0–100 confidence score." },
  { icon: FileCheck, title: "Resolution", body: "Forecasts resolve using predefined source-of-truth criteria into Correct, Incorrect, Partially correct, Unresolved, or Voided." },
];

export default function Methodology() {
  return (
    <AppLayout>
      <PageHeader eyebrow="Methodology" title="How SignalCrowd turns belief into signal" subtitle="Transparency is the foundation of trust. Here's exactly how every score, index, and label is produced." />

      <div className="grid gap-5 sm:grid-cols-2">
        {sections.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="surface-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent"><Icon className="h-5 w-5 text-electric" /></div>
                <span className="font-mono-num text-xs font-bold text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-4 font-bold text-navy">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
