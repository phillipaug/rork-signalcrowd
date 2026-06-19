import { cn } from "@/lib/utils";
import type { ReliabilityLabel, ValidationStrength, HypeRisk, ProductRecommendation, LifecycleStage, GapLabel, MarginLabel, TrendReliability, TikTokMomentum, AmazonSaturation } from "@/data/types";
import { ShieldCheck, ShieldAlert, Activity, Flame, Radar, TrendingUp, AlertTriangle, Zap, ShoppingBag, Package, Eye, DollarSign, Clock, BarChart3 } from "lucide-react";

const reliabilityStyle: Record<ReliabilityLabel, { cls: string; icon: typeof ShieldCheck }> = {
  "Reliable Signal": { cls: "bg-positive-soft text-positive border-positive/20", icon: ShieldCheck },
  "Mixed Signal": { cls: "bg-secondary text-navy-soft border-border", icon: Activity },
  "Weak Signal": { cls: "bg-muted text-muted-foreground border-border", icon: ShieldAlert },
  "Overheated Signal": { cls: "bg-negative-soft text-negative border-negative/20", icon: Flame },
  "Contrarian Signal": { cls: "bg-[hsl(var(--violet)/0.1)] text-violet border-violet/20", icon: Radar },
};

export function ReliabilityBadge({ label, className }: { label: ReliabilityLabel; className?: string }) {
  const s = reliabilityStyle[label];
  const Icon = s.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold", s.cls, className)}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

const validationStyle: Record<ValidationStrength, string> = {
  Strong: "bg-positive-soft text-positive border-positive/20",
  Moderate: "bg-accent text-accent-foreground border-primary/20",
  Weak: "bg-premium-soft text-premium border-premium/30",
  None: "bg-muted text-muted-foreground border-border",
};

export function ValidationBadge({ value, className }: { value: ValidationStrength; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold", validationStyle[value], className)}>
      Trends: {value}
    </span>
  );
}

const hypeStyle: Record<HypeRisk, string> = {
  Low: "bg-positive-soft text-positive border-positive/20",
  Medium: "bg-premium-soft text-premium border-premium/30",
  High: "bg-negative-soft text-negative border-negative/20",
};

export function HypeBadge({ value, className }: { value: HypeRisk; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold", hypeStyle[value], className)}>
      <Flame className="h-3 w-3" />
      Hype: {value}
    </span>
  );
}

// ── Commerce Badges ──

const recStyle: Record<ProductRecommendation, string> = {
  "Test Now": "bg-positive-soft text-positive border-positive/30",
  "Test Small": "bg-accent text-accent-foreground border-primary/30",
  "Watch Closely": "bg-secondary text-navy-soft border-border",
  "Watch": "bg-muted text-muted-foreground border-border",
  "Source Small Batch": "bg-accent text-accent-foreground border-primary/30",
  "Creator Opportunity": "bg-[hsl(var(--violet)/0.1)] text-violet border-violet/20",
  "Amazon Gap Opportunity": "bg-positive-soft text-positive border-positive/30",
  "Saturated": "bg-premium-soft text-premium border-premium/30",
  "Avoid": "bg-negative-soft text-negative border-negative/20",
  "Avoid Overbuying": "bg-negative-soft text-negative border-negative/20",
  "Trend Dying": "bg-muted text-muted-foreground border-border",
  "High Hype Risk": "bg-negative-soft text-negative border-negative/20",
  "Differentiate": "bg-premium-soft text-premium border-premium/30",
  "Strong Margin Potential": "bg-positive-soft text-positive border-positive/30",
};

export function RecommendationBadge({ label, className }: { label: ProductRecommendation; className?: string }) {
  const iconMap: Partial<Record<ProductRecommendation, typeof TrendingUp>> = {
    "Test Now": Zap,
    "Test Small": TrendingUp,
    "Creator Opportunity": ShoppingBag,
    "Amazon Gap Opportunity": Package,
    "Avoid": AlertTriangle,
    "Avoid Overbuying": AlertTriangle,
    "Strong Margin Potential": DollarSign,
  };
  const Icon = iconMap[label] || TrendingUp;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold", recStyle[label], className)}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

const lifecycleStyle: Record<LifecycleStage, string> = {
  "Emerging": "bg-accent text-accent-foreground border-primary/30",
  "Accelerating": "bg-positive-soft text-positive border-positive/30",
  "Breakout": "bg-[hsl(var(--violet)/0.1)] text-violet border-violet/20",
  "Mainstream": "bg-secondary text-navy-soft border-border",
  "Saturating": "bg-premium-soft text-premium border-premium/30",
  "Declining": "bg-negative-soft text-negative border-negative/20",
  "Seasonal": "bg-muted text-muted-foreground border-border",
  "Evergreen": "bg-positive-soft text-positive border-positive/30",
};

export function LifecycleBadge({ stage, className }: { stage: LifecycleStage; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold", lifecycleStyle[stage], className)}>
      <Clock className="h-3 w-3" />
      {stage}
    </span>
  );
}

const gapStyle: Record<GapLabel, string> = {
  "Strong Gap Opportunity": "bg-positive-soft text-positive border-positive/30",
  "Moderate Gap Opportunity": "bg-accent text-accent-foreground border-primary/30",
  "Already Saturated": "bg-negative-soft text-negative border-negative/20",
  "TikTok Only": "bg-[hsl(var(--violet)/0.1)] text-violet border-violet/20",
  "Amazon Demand Leading": "bg-secondary text-navy-soft border-border",
  "Watchlist Opportunity": "bg-premium-soft text-premium border-premium/30",
};

export function GapBadge({ label, className }: { label: GapLabel; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold", gapStyle[label], className)}>
      <Package className="h-3 w-3" />
      {label}
    </span>
  );
}

const marginStyle: Record<MarginLabel, string> = {
  "Good": "bg-positive-soft text-positive border-positive/30",
  "Medium": "bg-secondary text-navy-soft border-border",
  "Thin": "bg-premium-soft text-premium border-premium/30",
  "Negative": "bg-negative-soft text-negative border-negative/20",
};

export function MarginBadge({ label, className }: { label: MarginLabel; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold", marginStyle[label], className)}>
      <DollarSign className="h-3 w-3" />
      Margin: {label}
    </span>
  );
}

const tiktokStyle: Record<TikTokMomentum, string> = {
  "Strong": "bg-positive-soft text-positive border-positive/30",
  "Rising": "bg-accent text-accent-foreground border-primary/30",
  "High": "bg-positive-soft text-positive border-positive/30",
  "Medium": "bg-secondary text-navy-soft border-border",
  "Declining": "bg-negative-soft text-negative border-negative/20",
  "Low": "bg-muted text-muted-foreground border-border",
};

export function TikTokBadge({ value, className }: { value: TikTokMomentum; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold", tiktokStyle[value], className)}>
      <TrendingUp className="h-3 w-3" />
      TikTok: {value}
    </span>
  );
}

const amazonStyle: Record<AmazonSaturation, string> = {
  "High": "bg-negative-soft text-negative border-negative/20",
  "Medium": "bg-premium-soft text-premium border-premium/30",
  "Low": "bg-positive-soft text-positive border-positive/30",
  "None": "bg-positive-soft text-positive border-positive/30",
};

export function AmazonBadge({ value, className }: { value: AmazonSaturation; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold", amazonStyle[value], className)}>
      <BarChart3 className="h-3 w-3" />
      Amazon: {value}
    </span>
  );
}

const reliabilityTrendStyle: Record<TrendReliability, string> = {
  "Reliable Trend": "bg-positive-soft text-positive border-positive/30",
  "Early Signal": "bg-accent text-accent-foreground border-primary/30",
  "Hype Risk": "bg-negative-soft text-negative border-negative/20",
  "Short-Lived Spike": "bg-premium-soft text-premium border-premium/30",
  "Saturated Trend": "bg-muted text-muted-foreground border-border",
  "Unvalidated Trend": "bg-muted text-muted-foreground border-border",
  "Durable Demand": "bg-positive-soft text-positive border-positive/30",
};

export function TrendBadge({ value, className }: { value: TrendReliability; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold", reliabilityTrendStyle[value], className)}>
      <Eye className="h-3 w-3" />
      {value}
    </span>
  );
}

// ── Shared badges ──

const gradeColor = (grade: string): string => {
  if (grade.startsWith("A")) return "text-positive";
  if (grade.startsWith("B")) return "text-electric";
  if (grade.startsWith("C")) return "text-premium";
  return "text-negative";
};

export function GradeBadge({ grade, className }: { grade: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center justify-center rounded-lg border border-border bg-card px-2 py-0.5 font-mono-num text-sm font-bold", gradeColor(grade), className)}>
      {grade}
    </span>
  );
}

export function CategoryChip({ category, className }: { category: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-navy-soft", className)}>
      {category}
    </span>
  );
}

export function PremiumBadge({ label = "PRO", className }: { label?: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-premium to-[hsl(38_92%_58%)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white", className)}>
      {label}
    </span>
  );
}

export function Delta({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const positive = value >= 0;
  return (
    <span className={cn("font-mono-num font-semibold tnum", positive ? "text-positive" : "text-negative", className)}>
      {positive ? "+" : ""}
      {Math.round(value * 10) / 10}
      {suffix}
    </span>
  );
}
