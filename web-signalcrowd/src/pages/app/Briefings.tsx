import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader, SectionTitle, UpgradeTeaser } from "@/components/ui-kit/Primitives";
import { briefingItems } from "@/data/mock";
import { Newspaper, TrendingUp, AlertTriangle, ArrowRight, Lock } from "lucide-react";

export default function Briefings() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="Briefings"
        title="Today's Commerce Signal Briefing"
        subtitle="The biggest product moves, reliability signals, hype-risk alerts, and category shifts. Pro users unlock full briefings."
        action={
          <Link to="/app/pricing" className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-premium to-[hsl(38_92%_58%)] px-4 py-2.5 text-sm font-bold text-white">
            Unlock Full Briefing <Lock className="h-4 w-4" />
          </Link>
        }
      />

      {/* Free preview */}
      <div className="surface-card p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Newspaper className="h-5 w-5 text-electric" />
          <h2 className="text-lg font-bold text-navy">Daily Signal Briefing</h2>
          <span className="rounded bg-premium-soft px-2 py-0.5 text-[10px] font-bold text-premium">FREE PREVIEW</span>
        </div>
        <ul className="space-y-2">
          {briefingItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-navy-soft">
              <span className="text-electric mt-1 font-bold">{i + 1}.</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">Showing free preview. Pro users get full category breakdowns, product-level signals, and contrarian alerts.</p>
      </div>

      {/* Briefing types */}
      <SectionTitle>Briefing Types (Pro)</SectionTitle>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Daily Signal Briefing", desc: "Today's biggest product moves, reliability changes, and hype alerts.", price: "Included in Pro" },
          { title: "Weekly Commerce Briefing", desc: "Category momentum summary, top opportunities, and risk overview.", price: "Included in Pro" },
          { title: "Beauty Product Briefing", desc: "Beauty-specific trends, creator products, and saturation warnings.", price: "Included in Pro" },
          { title: "TikTok-to-Amazon Briefing", desc: "New gap opportunities and closing-gap alerts.", price: "Pro" },
          { title: "Hype Risk Briefing", desc: "Products showing elevated hype risk and saturation signals.", price: "Pro" },
          { title: "Enterprise Briefing", desc: "Custom category monitoring for brands, agencies, and investors.", price: "Enterprise" },
        ].map(b => (
          <div key={b.title} className="surface-card p-4">
            <p className="font-semibold text-navy text-sm">{b.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{b.desc}</p>
            <span className="mt-2 inline-block rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-navy-soft">{b.price}</span>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <UpgradeTeaser text="Unlock full daily briefings with product-level signal analysis." />
      </div>
    </AppLayout>
  );
}
