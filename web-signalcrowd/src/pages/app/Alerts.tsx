import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui-kit/Primitives";
import { Bell, Plus, Lock, TrendingUp, TrendingDown, Activity, Flame, Search, Users, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const alertTypes = [
  { icon: TrendingUp, label: "Probability crosses 70%", free: true },
  { icon: TrendingDown, label: "Probability drops below 40%", free: true },
  { icon: Activity, label: "Index changes by more than 5 points", free: true },
  { icon: Activity, label: "Crowd Reliability changes", free: false },
  { icon: Flame, label: "Hype Risk becomes high", free: false },
  { icon: Search, label: "Trends Validation strengthens", free: false },
  { icon: Users, label: "Expert forecasters diverge from crowd", free: false },
  { icon: Bell, label: "Favorite forecaster updates a prediction", free: false },
  { icon: FileText, label: "New report is published", free: false },
];

export default function Alerts() {
  const [active, setActive] = useState<Record<number, boolean>>({ 0: true, 2: true });
  const freeUsed = Object.entries(active).filter(([, v]) => v).length;

  function toggle(i: number, free: boolean) {
    if (!free) {
      toast.error("This alert is a Pro feature", { description: "Upgrade to unlock advanced alerts." });
      return;
    }
    setActive((p) => {
      const next = { ...p, [i]: !p[i] };
      const count = Object.values(next).filter(Boolean).length;
      if (count > 3) {
        toast.error("Free plan allows 3 alerts", { description: "Upgrade to Pro for unlimited alerts." });
        return p;
      }
      return next;
    });
  }

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Alerts"
        title="Never miss a signal move"
        subtitle="Free members get 3 alerts. Pro unlocks unlimited alerts; Analyst adds advanced expert-divergence and validation alerts."
        action={
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-navy">
            <Bell className="h-4 w-4 text-electric" /> {freeUsed} / 3 active
          </span>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {alertTypes.map((a, i) => {
          const Icon = a.icon;
          const on = active[i];
          return (
            <button
              key={a.label}
              onClick={() => toggle(i, a.free)}
              className={cn("surface-card flex items-center gap-3 p-4 text-left transition-colors", on && "ring-2 ring-electric/40")}
            >
              <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", on ? "bg-accent" : "bg-secondary")}>
                <Icon className={cn("h-5 w-5", on ? "text-electric" : "text-muted-foreground")} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-navy">{a.label}</p>
                {!a.free && <span className="text-xs font-bold uppercase text-premium">Pro</span>}
              </div>
              {a.free ? (
                <span className={cn("relative h-6 w-11 rounded-full transition-colors", on ? "bg-electric" : "bg-secondary")}>
                  <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all", on ? "left-[22px]" : "left-0.5")} />
                </span>
              ) : (
                <Lock className="h-4 w-4 text-premium" />
              )}
            </button>
          );
        })}
      </div>

      <button className="mt-6 inline-flex items-center gap-1.5 rounded-xl border border-dashed border-border px-4 py-3 text-sm font-semibold text-muted-foreground hover:border-primary hover:text-navy">
        <Plus className="h-4 w-4" /> Create a custom alert rule
      </button>
    </AppLayout>
  );
}
