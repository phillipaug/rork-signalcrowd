import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { getForecast, currentUser } from "@/data/mock";
import { ReliabilityBadge, ValidationBadge, CategoryChip } from "@/components/signal/SignalBadges";
import { ProgressBar, UpgradeTeaser } from "@/components/ui-kit/Primitives";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import NotFound from "../NotFound";
import type { ConfidenceLevel } from "@/data/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const confidenceLevels: ConfidenceLevel[] = ["Low", "Medium", "High", "Very High"];

export default function SubmitForecast() {
  const { id } = useParams();
  const f = id ? getForecast(id) : undefined;
  const [prob, setProb] = useState(f?.probability ?? 50);
  const [confidence, setConfidence] = useState<ConfidenceLevel>("Medium");
  const [reasoning, setReasoning] = useState("");
  const [source, setSource] = useState("");
  const [submitted, setSubmitted] = useState(false);
  if (!f) return <NotFound />;

  const diff = prob - f.probability;

  if (submitted) {
    return (
      <AppLayout>
        <div className="mx-auto max-w-2xl">
          <div className="surface-card overflow-hidden p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-positive-soft">
              <Check className="h-7 w-7 text-positive" />
            </div>
            <h1 className="mt-4 text-2xl font-extrabold text-navy">Your forecast has been added to the network.</h1>
            <p className="mt-2 text-muted-foreground">You forecast <span className="font-bold text-navy">{prob}%</span> with <span className="font-bold text-navy">{confidence}</span> confidence.</p>

            <div className="mt-6 grid gap-3 text-left sm:grid-cols-2">
              <CompareCard label="You vs the crowd" you={prob} other={f.probability} otherLabel="Crowd" />
              <CompareCard label="You vs top forecasters" you={prob} other={f.expertProb} otherLabel="Experts" />
              <InfoCard label="Category reliability"><ReliabilityBadge label={f.reliabilityLabel} /></InfoCard>
              <InfoCard label="Trends validation"><ValidationBadge value={f.trendsValidation} /></InfoCard>
              <InfoCard label="Your accuracy score"><span className="font-mono-num text-xl font-bold text-positive">{currentUser.accuracyScore}%</span></InfoCard>
              <InfoCard label="Your calibration"><span className="font-mono-num text-xl font-bold text-navy">{currentUser.calibrationScore}%</span></InfoCard>
            </div>

            <div className="mt-6">
              <UpgradeTeaser text="Want to see whether the crowd is usually right on this topic?" />
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <Link to={`/app/forecasts/${f.id}`} className="rounded-xl border border-border px-5 py-2.5 text-sm font-bold text-navy hover:border-primary">Back to forecast</Link>
              <Link to="/app/forecasts" className="rounded-xl bg-navy px-5 py-2.5 text-sm font-bold text-white">Find more forecasts</Link>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Link to={`/app/forecasts/${f.id}`} className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-navy">
        <ArrowLeft className="h-4 w-4" /> Back to forecast
      </Link>
      <div className="mx-auto max-w-2xl">
        <div className="surface-card p-6">
          <CategoryChip category={f.category} />
          <h1 className="mt-2 text-xl font-extrabold leading-tight text-navy">{f.question}</h1>

          {/* Slider */}
          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-navy">Your probability</label>
              <span className="font-mono-num text-3xl font-bold text-electric">{prob}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={prob}
              onChange={(e) => setProb(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-electric"
              style={{ background: `linear-gradient(to right, hsl(var(--electric)) ${prob}%, hsl(var(--secondary)) ${prob}%)` }}
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Won't happen</span>
              <span className="text-navy-soft">Crowd: {f.probability}%</span>
              <span>Will happen</span>
            </div>
            {Math.abs(diff) > 2 && (
              <p className="mt-2 text-xs font-medium text-navy-soft">
                You're <span className={diff > 0 ? "text-positive" : "text-negative"}>{Math.abs(diff)} points {diff > 0 ? "above" : "below"}</span> the crowd.
              </p>
            )}
          </div>

          {/* Confidence */}
          <div className="mt-8">
            <label className="mb-2 block text-sm font-semibold text-navy">Confidence level</label>
            <div className="grid grid-cols-4 gap-2">
              {confidenceLevels.map((c) => (
                <button
                  key={c}
                  onClick={() => setConfidence(c)}
                  className={cn("rounded-xl border py-2.5 text-sm font-semibold transition-colors", confidence === c ? "border-electric bg-accent text-accent-foreground" : "border-border text-navy-soft hover:border-primary")}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Reasoning */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-navy">Reasoning</label>
            <textarea
              value={reasoning}
              onChange={(e) => setReasoning(e.target.value)}
              rows={4}
              placeholder="What's driving your forecast? Cite evidence, catalysts, or base rates."
              className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-primary"
            />
          </div>

          {/* Source */}
          <div className="mt-4">
            <label className="mb-2 block text-sm font-semibold text-navy">Supporting source <span className="font-normal text-muted-foreground">(optional)</span></label>
            <input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="https:// link or note"
              className="h-11 w-full rounded-xl border border-border bg-card px-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <button
            onClick={() => {
              setSubmitted(true);
              toast.success("Forecast submitted", { description: "Added to the SignalCrowd network." });
            }}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-electric py-3.5 text-sm font-bold text-white shadow-lg shadow-electric/25 transition-transform hover:scale-[1.01]"
          >
            <Sparkles className="h-4 w-4" /> Submit forecast
          </button>
        </div>
      </div>
    </AppLayout>
  );
}

function CompareCard({ label, you, other, otherLabel }: { label: string; you: number; other: number; otherLabel: string }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-4">
      <p className="mb-3 text-xs font-semibold text-muted-foreground">{label}</p>
      <div className="space-y-2">
        <div>
          <div className="mb-1 flex justify-between text-xs"><span className="text-navy-soft">You</span><span className="font-mono-num font-bold text-navy">{you}%</span></div>
          <ProgressBar value={you} />
        </div>
        <div>
          <div className="mb-1 flex justify-between text-xs"><span className="text-navy-soft">{otherLabel}</span><span className="font-mono-num font-bold text-navy">{other}%</span></div>
          <ProgressBar value={other} color="hsl(var(--violet))" />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-xl border border-border bg-secondary/40 p-4">
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}
