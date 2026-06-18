import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Lock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-electric">{eyebrow}</p>}
        <h1 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  accent?: boolean;
}) {
  return (
    <div className={cn("surface-card p-4", accent && "ring-1 ring-primary/20")}>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1.5 font-mono-num text-2xl font-bold tracking-tight text-navy tnum">{value}</p>
      {sub && <div className="mt-1 text-xs">{sub}</div>}
    </div>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-bold tracking-tight text-navy">{children}</h2>
      {action}
    </div>
  );
}

/** Premium-gated overlay that blurs its children for free users. */
export function LockedOverlay({
  children,
  title = "Pro feature",
  description = "Upgrade to Pro to unlock this analysis.",
}: {
  children: ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="pointer-events-none select-none blur-[6px]" aria-hidden>
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-card/40 to-card/90 p-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-premium-soft">
          <Lock className="h-5 w-5 text-premium" />
        </div>
        <div>
          <p className="font-bold text-navy">{title}</p>
          <p className="mx-auto mt-1 max-w-xs text-sm text-muted-foreground">{description}</p>
        </div>
        <Link
          to="/app/pricing"
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-premium to-[hsl(38_92%_58%)] px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-105"
        >
          <Sparkles className="h-4 w-4" /> Upgrade to Pro
        </Link>
      </div>
    </div>
  );
}

export function ProgressBar({ value, color = "hsl(var(--electric))", className }: { value: number; color?: string; className?: string }) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-secondary", className)}>
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: color }} />
    </div>
  );
}

export function UpgradeTeaser({ text, cta = "Upgrade to Pro" }: { text: string; cta?: string }) {
  return (
    <Link
      to="/app/pricing"
      className="surface-card surface-card-hover flex items-center justify-between gap-4 border-premium/30 bg-premium-soft/50 p-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-premium/15">
          <Sparkles className="h-5 w-5 text-premium" />
        </div>
        <p className="text-sm font-medium text-navy">{text}</p>
      </div>
      <span className="hidden shrink-0 rounded-lg bg-premium px-3 py-1.5 text-xs font-bold text-white sm:inline-block">{cta}</span>
    </Link>
  );
}
