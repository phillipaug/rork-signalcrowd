import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui-kit/Primitives";
import { ShieldCheck, FileCheck, History, Target, Search, BookOpen, Flag, Eye, ListChecks, Settings } from "lucide-react";

const disclaimers = [
  "Forecasts are informational only.",
  "SignalCrowd does not provide financial advice.",
  "SignalCrowd does not guarantee outcomes.",
  "SignalCrowd does not allow wagering or payouts.",
  "SignalCrowd does not sell securities through the app.",
  "Investment-related pages are informational only unless connected to a compliant crowdfunding provider.",
  "Demo data is clearly labeled where applicable.",
];

const trustFeatures = [
  { icon: FileCheck, label: "Clear resolution criteria" },
  { icon: Target, label: "Source-of-truth tracking" },
  { icon: History, label: "Transparent forecast history" },
  { icon: Target, label: "Accuracy scoring" },
  { icon: Search, label: "Trends validation labels" },
  { icon: BookOpen, label: "Methodology page" },
  { icon: Flag, label: "Abuse reporting" },
  { icon: Eye, label: "Manipulation monitoring" },
  { icon: ListChecks, label: "Moderation queue" },
  { icon: Settings, label: "Admin controls" },
];

export default function Trust() {
  return (
    <AppLayout>
      <PageHeader eyebrow="Trust & Compliance" title="A serious platform — not a gambling product" />

      <div className="surface-card flex items-start gap-4 border-positive/30 bg-positive-soft/40 p-6">
        <ShieldCheck className="mt-0.5 h-7 w-7 shrink-0 text-positive" />
        <p className="text-sm leading-relaxed text-navy-soft">
          SignalCrowd does not offer betting, wagering, securities, commodities, swaps, derivatives, or financial
          contracts. SignalCrowd is an information, analytics, research, and collective-intelligence platform.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="surface-card p-6">
          <h2 className="mb-4 font-bold text-navy">Disclaimers</h2>
          <ul className="space-y-2.5">
            {disclaimers.map((d) => (
              <li key={d} className="flex gap-2 text-sm text-navy-soft"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />{d}</li>
            ))}
          </ul>
        </div>

        <div className="surface-card p-6">
          <h2 className="mb-4 font-bold text-navy">Trust features</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {trustFeatures.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.label} className="flex items-center gap-2 rounded-xl border border-border bg-secondary/40 px-3 py-2.5 text-sm text-navy-soft">
                  <Icon className="h-4 w-4 shrink-0 text-electric" /> {t.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
