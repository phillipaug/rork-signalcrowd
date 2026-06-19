import { useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader, SectionTitle, UpgradeTeaser } from "@/components/ui-kit/Primitives";
import { products } from "@/data/mock";
import { Bell, BellOff, ArrowRight, Plus } from "lucide-react";
import { toast } from "sonner";

const alertTypes = [
  "Product Opportunity Score crosses 80",
  "TikTok Momentum increases sharply",
  "Amazon Saturation becomes high",
  "Trends Validation strengthens",
  "Hype Risk becomes high",
  "Margin potential declines",
  "Product moves from Emerging to Breakout",
  "Product enters TikTok-to-Amazon Gap list",
  "Category index moves by more than 5 points",
  "New report published",
];

const demoAlerts = [
  { productName: "Heatless Curling Kit", type: "Score crosses 80", triggered: true, date: "Jun 18, 2026" },
  { productName: "Portable Blender", type: "Hype Risk becomes high", triggered: true, date: "Jun 17, 2026" },
  { productName: "Reusable Water Balloons", type: "Entered TikTok Gap list", triggered: true, date: "Jun 16, 2026" },
];

export default function Alerts() {
  const [showNewForm, setShowNewForm] = useState(false);

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Alerts"
        title="Get notified when product signals change."
        subtitle="Set alerts for products and categories. Free: 3 alerts. Starter: 15 alerts. Pro: unlimited."
      />

      {/* Active alerts */}
      <SectionTitle action={<button onClick={() => setShowNewForm(!showNewForm)} className="flex items-center gap-1 text-sm font-semibold text-electric"><Plus className="h-4 w-4" /> New Alert</button>}>
        Active Alerts ({demoAlerts.length})
      </SectionTitle>

      {showNewForm && (
        <div className="surface-card p-5 mb-4">
          <p className="text-sm font-semibold text-navy mb-3">Create Alert</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <select className="h-10 rounded-xl border border-border bg-card px-3 text-sm outline-none focus:border-primary">
              {products.slice(0, 10).map(p => <option key={p.id}>{p.name}</option>)}
            </select>
            <select className="h-10 rounded-xl border border-border bg-card px-3 text-sm outline-none focus:border-primary">
              {alertTypes.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <button onClick={() => { toast.success("Alert created! (demo)"); setShowNewForm(false); }} className="mt-3 rounded-lg bg-electric px-4 py-2 text-xs font-bold text-white">Save Alert</button>
        </div>
      )}

      <div className="space-y-3">
        {demoAlerts.map((a, i) => (
          <div key={i} className="surface-card flex items-center gap-4 p-4">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${a.triggered ? "bg-positive-soft" : "bg-muted"}`}>
              {a.triggered ? <Bell className="h-4 w-4 text-positive" /> : <BellOff className="h-4 w-4 text-muted-foreground" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-navy">{a.productName}</p>
              <p className="text-xs text-muted-foreground">{a.type}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs text-muted-foreground">{a.date}</p>
              <span className={`text-[10px] font-semibold ${a.triggered ? "text-positive" : "text-muted-foreground"}`}>{a.triggered ? "Triggered" : "Watching"}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Alert types */}
      <div className="mt-8">
        <SectionTitle>Available Alert Types</SectionTitle>
        <div className="grid gap-2 sm:grid-cols-2">
          {alertTypes.map(t => (
            <div key={t} className="flex items-center gap-2 rounded-lg border border-border p-2.5 text-xs text-navy-soft">
              <Bell className="h-3 w-3 text-muted-foreground shrink-0" /> {t}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <UpgradeTeaser text="Unlock unlimited alerts, team alerts, and client alert forwarding." />
      </div>
    </AppLayout>
  );
}
