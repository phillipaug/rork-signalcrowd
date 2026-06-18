import { cn } from "@/lib/utils";
import type { ReliabilityLabel, ValidationStrength, HypeRisk } from "@/data/types";
import { ShieldCheck, ShieldAlert, Activity, Flame, Radar } from "lucide-react";

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
