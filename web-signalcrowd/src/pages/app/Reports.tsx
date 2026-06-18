import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui-kit/Primitives";
import { reports } from "@/data/mock";
import { CategoryChip } from "@/components/signal/SignalBadges";
import { Check, FileText, Lock, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function Reports() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="Reports Store"
        title="Investor-grade research, on demand"
        subtitle="Paid reports turn the SignalCrowd dataset into polished, actionable intelligence — updated weekly."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {reports.map((r) => (
          <div key={r.id} className="surface-card surface-card-hover flex flex-col p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy"><FileText className="h-5 w-5 text-electric" /></div>
                <div>
                  <CategoryChip category={r.category} />
                  <h3 className="mt-1 text-base font-bold text-navy">{r.title}</h3>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono-num text-2xl font-bold text-navy">${r.price}</p>
                <p className="text-xs text-muted-foreground">{r.pages} pages</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{r.summary}</p>
            <ul className="mt-4 grid flex-1 gap-1.5 sm:grid-cols-2">
              {r.includes.map((inc) => (
                <li key={inc} className="flex gap-1.5 text-xs text-navy-soft"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-positive" />{inc}</li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{r.updated}</span>
              <button onClick={() => toast.success("Report unlocked (demo)", { description: r.title })} className="inline-flex items-center gap-1.5 rounded-xl bg-electric px-4 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105">
                <Lock className="h-3.5 w-3.5" /> Unlock Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Membership bundles */}
      <h2 className="mb-4 mt-10 text-lg font-bold text-navy">Membership bundles</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="surface-card relative overflow-hidden border-premium/40 bg-premium-soft/40 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-navy">All Reports Membership</h3>
            <Sparkles className="h-5 w-5 text-premium" />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Every weekly report, all categories, one membership.</p>
          <div className="mt-4 flex items-end gap-1">
            <span className="font-mono-num text-4xl font-bold text-navy">$149</span>
            <span className="mb-1 text-muted-foreground">/month</span>
          </div>
          <button onClick={() => toast.success("Membership selected (demo)")} className="mt-4 w-full rounded-xl bg-premium py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]">Join membership</button>
        </div>
        <div className="surface-card p-6">
          <h3 className="text-lg font-bold text-navy">Annual membership</h3>
          <p className="mt-1 text-sm text-muted-foreground">All reports for a full year — best value for teams.</p>
          <div className="mt-4 flex items-end gap-1">
            <span className="font-mono-num text-4xl font-bold text-navy">$999</span>
            <span className="mb-1 text-muted-foreground">/year</span>
          </div>
          <p className="mt-1 text-xs font-semibold text-positive">Save 44% vs monthly</p>
          <button onClick={() => toast.success("Annual plan selected (demo)")} className="mt-3 w-full rounded-xl bg-navy py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]">Go annual</button>
        </div>
      </div>
    </AppLayout>
  );
}
