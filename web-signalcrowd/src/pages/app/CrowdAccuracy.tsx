import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader, SectionTitle, UpgradeTeaser, ProgressBar } from "@/components/ui-kit/Primitives";
import { categoryAccuracy } from "@/data/mock";
import { Target, AlertTriangle, TrendingUp, ArrowRight, ShieldCheck } from "lucide-react";

export default function CrowdAccuracy() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="Crowd Accuracy"
        title="When is the seller crowd right — and when is it wrong?"
        subtitle="Track which categories and products the crowd forecasts most accurately. Use historical accuracy to weight your decisions. Demo data shown."
      />

      {/* Overview cards */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Overall Accuracy", value: "72.8%", color: "text-positive", icon: Target },
          { label: "Best Category", value: "Beauty (76%)", color: "text-positive", icon: TrendingUp },
          { label: "Weakest Category", value: "Viral Gadgets (58%)", color: "text-negative", icon: AlertTriangle },
          { label: "Overconfidence", value: "18% avg", color: "text-premium", icon: ShieldCheck },
        ].map(c => (
          <div key={c.label} className="surface-card p-4 text-center">
            <c.icon className={`mx-auto h-5 w-5 ${c.color}`} />
            <p className="mt-2 font-mono-num text-2xl font-bold text-navy">{c.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Category accuracy table */}
      <div className="surface-card overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">Accuracy</th>
                <th className="hidden px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground md:table-cell">Overconfidence</th>
                <th className="hidden px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground md:table-cell">Underreact</th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">Validation</th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categoryAccuracy.map(row => (
                <tr key={row.category} className="hover:bg-secondary/30">
                  <td className="px-4 py-3 font-semibold text-navy">{row.category}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <ProgressBar value={row.accuracy} color="hsl(var(--electric))" className="w-16" />
                      <span className="font-mono-num text-xs font-bold text-navy w-10">{row.accuracy}%</span>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-center font-mono-num text-xs md:table-cell">
                    <span className={row.overconfidence > 30 ? "text-negative" : row.overconfidence > 20 ? "text-premium" : "text-positive"}>{row.overconfidence}%</span>
                  </td>
                  <td className="hidden px-4 py-3 text-center font-mono-num text-xs md:table-cell">{row.underreaction}%</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-semibold ${row.validation === "Strong" ? "text-positive" : row.validation === "Moderate" ? "text-electric" : "text-negative"}`}>{row.validation}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-mono-num text-xs font-bold ${row.grade.startsWith("A") ? "text-positive" : row.grade.startsWith("B") ? "text-electric" : "text-negative"}`}>{row.grade}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Where crowd is right */}
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <div className="surface-card p-6">
          <SectionTitle><span className="text-positive flex items-center gap-2"><Target className="h-4 w-4" /> Where the Crowd Is Usually Right</span></SectionTitle>
          <ul className="mt-3 space-y-2">
            {["Beauty product demand forecasts", "Pet product adoption trends", "Home organization product lifecycles", "Seasonal product timing"].map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-navy-soft"><span className="text-positive mt-1">•</span> {t}</li>
            ))}
          </ul>
        </div>
        <div className="surface-card p-6">
          <SectionTitle><span className="text-negative flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Where the Crowd Is Usually Wrong</span></SectionTitle>
          <ul className="mt-3 space-y-2">
            {["Viral gadget longevity forecasts", "Extreme price-point predictions", "Fad vs durable trend distinction", "Platform-specific trend transfers"].map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-navy-soft"><span className="text-negative mt-1">•</span> {t}</li>
            ))}
          </ul>
        </div>
      </div>

      <UpgradeTeaser text="Get Crowd Wrong Alerts — notified when historical patterns suggest the crowd is overconfident." />
    </AppLayout>
  );
}
