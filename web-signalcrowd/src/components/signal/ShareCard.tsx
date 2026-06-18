import type { Forecast } from "@/data/types";
import { Logo } from "@/components/brand/Logo";
import { ReliabilityBadge, ValidationBadge, Delta } from "./SignalBadges";
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Sparkline } from "@/components/charts/Sparkline";

export function ShareCard({ forecast: f, onClose }: { forecast: Forecast; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md animate-fade-up">
        <button onClick={onClose} className="absolute -top-10 right-0 rounded-lg p-2 text-white hover:bg-white/10">
          <X className="h-5 w-5" />
        </button>

        {/* The shareable card */}
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-navy to-[hsl(215_55%_18%)] p-7 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <Logo variant="light" />
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">Signal</span>
          </div>
          <p className="mt-6 text-sm text-white/70">SignalCrowd says there is a</p>
          <p className="mt-1 font-mono-num text-6xl font-bold tracking-tighter text-electric">{f.probability}%</p>
          <p className="mt-1 text-sm text-white/70">probability:</p>
          <h3 className="mt-2 text-lg font-bold leading-snug">{f.question}</h3>

          <div className="mt-5">
            <Sparkline data={f.trendData} width={300} height={50} color="hsl(200 100% 65%)" />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <ReliabilityBadge label={f.reliabilityLabel} className="!bg-white/10 !text-white !border-white/15" />
            <ValidationBadge value={f.trendsValidation} className="!bg-white/10 !text-white !border-white/15" />
            <span className="text-sm">7d <Delta value={f.trend7d} suffix="%" className="!text-electric" /></span>
          </div>
        </div>

        <button
          onClick={() => {
            navigator.clipboard?.writeText(`SignalCrowd: ${f.probability}% probability — ${f.question}`).catch(() => {});
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          }}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-electric py-3 text-sm font-bold text-white"
        >
          {copied ? <><Check className="h-4 w-4" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy share text</>}
        </button>
      </div>
    </div>
  );
}
