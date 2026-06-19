import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader, SectionTitle, UpgradeTeaser } from "@/components/ui-kit/Primitives";
import { reports } from "@/data/mock";
import { FileText, Lock, Sparkles, ArrowRight, Check } from "lucide-react";

export default function Reports() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="Reports"
        title="Premium commerce intelligence reports."
        subtitle="Investor-grade product trend research. Weekly reports covering TikTok-to-Amazon gaps, beauty trends, hype risks, and creator commerce. Demo data shown."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map(r => (
          <div key={r.id} className="surface-card p-5 flex flex-col">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-electric" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{r.category}</span>
              </div>
              <h3 className="font-bold text-navy">{r.title}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground">{r.summary}</p>
              <div className="mt-3 space-y-1">
                {r.includes.slice(0, 4).map((inc, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-navy-soft">
                    <Check className="h-3 w-3 text-positive shrink-0 mt-0.5" />
                    {inc}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                <span>{r.pages} pages</span>
                <span>{r.updated}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="font-mono-num text-lg font-bold text-navy">${r.price}</span>
              <Link to="/app/pricing" className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-4 py-2 text-xs font-bold text-white transition-transform hover:scale-105">
                <Lock className="h-3.5 w-3.5" /> Unlock Report
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bundle card */}
      <div className="mt-8 surface-card overflow-hidden border-premium/30">
        <div className="bg-gradient-to-r from-premium to-[hsl(38_92%_58%)] p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5" />
            <h2 className="text-xl font-bold">All Reports Membership</h2>
          </div>
          <p className="text-white/85 text-sm">Access all weekly reports including TikTok-to-Amazon Gap, Beauty Signal, Creator Commerce, Hype Risk, and Monthly Intelligence Report.</p>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-3xl font-bold">$149</span>
            <span className="text-white/75">/month</span>
          </div>
          <p className="mt-1 text-sm text-white/70">or $999/year (save 44%)</p>
          <Link to="/app/pricing" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-premium transition-transform hover:scale-105">
            Subscribe Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <UpgradeTeaser text="Enterprise teams get custom report generation and white-labeled PDFs." cta="Contact Enterprise" />
      </div>
    </AppLayout>
  );
}
