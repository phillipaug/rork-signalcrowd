import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui-kit/Primitives";
import { Building2, Landmark, ShieldCheck, Rocket, Newspaper, LineChart, Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const useCases = [
  { icon: LineChart, title: "Hedge Funds", body: "Track probability shifts, attention momentum, and crowd overconfidence before narratives become consensus." },
  { icon: Building2, title: "Consulting Firms", body: "Use crowd intelligence and trend validation to support strategic recommendations." },
  { icon: Landmark, title: "Banks", body: "Monitor economic confidence, consumer sentiment, rate expectations, and risk perception." },
  { icon: ShieldCheck, title: "Insurance Companies", body: "Forecast risk perception across climate, health, economic, and geopolitical categories." },
  { icon: Rocket, title: "Venture Funds", body: "Track startup confidence, AI adoption, IPO expectations, and founder sentiment." },
  { icon: Newspaper, title: "Media Companies", body: "Embed probability indexes directly into news coverage." },
];

const enterpriseFeatures = ["API access", "Historical data", "Custom indexes", "Crowd Reliability analytics", "Trends Validation analytics", "Private forecasting communities", "White-label widgets", "Weekly enterprise briefings", "Data exports", "Category dashboards"];

const networkPlans = [
  { name: "Team", price: "$499", period: "/month", features: ["25 members", "Private forecasts", "Team leaderboard", "Basic dashboard"] },
  { name: "Business", price: "$1,999", period: "/month", features: ["250 members", "Custom indexes", "Exports", "Private briefings", "Advanced analytics"], highlight: true },
  { name: "Enterprise", price: "Custom", features: ["Unlimited members", "API access", "White-label dashboards", "Custom support"] },
];

export default function Enterprise() {
  const [sent, setSent] = useState(false);

  return (
    <AppLayout>
      {/* Hero */}
      <div className="surface-card relative overflow-hidden bg-navy p-8 text-white lg:p-12">
        <div className="absolute inset-0 hero-glow opacity-50" />
        <div className="relative max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-electric">Enterprise</p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Decision intelligence built from collective forecasts.</h1>
          <p className="mt-4 text-lg text-white/70">SignalCrowd gives institutions access to crowd probabilities, accuracy-weighted signals, search-interest validation, and custom confidence indexes.</p>
          <a href="#demo" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3.5 text-sm font-bold text-white transition-transform hover:scale-105">
            Request Enterprise Demo <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Use cases */}
      <h2 className="mb-4 mt-10 text-lg font-bold text-navy">Built for institutions</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map((u) => {
          const Icon = u.icon;
          return (
            <div key={u.title} className="surface-card surface-card-hover p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent"><Icon className="h-5 w-5 text-electric" /></div>
              <h3 className="mt-3 font-bold text-navy">{u.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{u.body}</p>
            </div>
          );
        })}
      </div>

      {/* Features + form */}
      <div id="demo" className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="surface-card p-6">
          <h2 className="mb-4 font-bold text-navy">Enterprise features</h2>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {enterpriseFeatures.map((f) => (
              <li key={f} className="flex gap-2 text-sm text-navy-soft"><Check className="mt-0.5 h-4 w-4 shrink-0 text-positive" />{f}</li>
            ))}
          </ul>
        </div>

        <div className="surface-card p-6">
          <h2 className="mb-4 font-bold text-navy">Request an Enterprise demo</h2>
          {sent ? (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-positive-soft"><Check className="h-6 w-6 text-positive" /></div>
              <p className="font-bold text-navy">Request received</p>
              <p className="text-sm text-muted-foreground">Our team will reach out to schedule your demo.</p>
            </div>
          ) : (
            <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Demo request sent"); }}>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input label="Name" required />
                <Input label="Work email" type="email" required />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input label="Company" required />
                <Input label="Role" />
              </div>
              <Input label="Use case" />
              <Input label="Estimated data needs" placeholder="e.g. API + historical exports" />
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-navy">Message</label>
                <textarea rows={3} className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-primary" />
              </div>
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy py-3 text-sm font-bold text-white transition-transform hover:scale-[1.01]">Request Enterprise Demo</button>
            </form>
          )}
        </div>
      </div>

      {/* Private forecasting networks */}
      <div className="mt-12">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-electric">Private Forecasting Networks</p>
        <h2 className="text-2xl font-extrabold tracking-tight text-navy">Internal forecasting for teams</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">Private forecasts, internal probability indexes, team leaderboards, accuracy scoring, and private AI briefings — for venture funds, real estate firms, sales teams, consultancies, media, and strategy teams.</p>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {networkPlans.map((p) => (
            <div key={p.name} className={`surface-card flex flex-col p-6 ${p.highlight ? "ring-2 ring-electric" : ""}`}>
              <h3 className="text-lg font-bold text-navy">{p.name}</h3>
              <div className="mt-3 flex items-end gap-1">
                <span className="font-mono-num text-3xl font-bold text-navy">{p.price}</span>
                {p.period && <span className="mb-1 text-sm text-muted-foreground">{p.period}</span>}
              </div>
              <ul className="mt-4 flex-1 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-navy-soft"><Check className="mt-0.5 h-4 w-4 shrink-0 text-positive" />{f}</li>
                ))}
              </ul>
              <button onClick={() => toast.success(`${p.name} network selected (demo)`)} className={`mt-5 rounded-xl py-2.5 text-sm font-bold transition-transform hover:scale-[1.02] ${p.highlight ? "bg-electric text-white" : "border border-border text-navy hover:border-primary"}`}>
                {p.name === "Enterprise" ? "Contact sales" : "Get started"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

function Input({ label, type = "text", required, placeholder }: { label: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy">{label}{required && <span className="text-negative"> *</span>}</label>
      <input type={type} required={required} placeholder={placeholder} className="h-11 w-full rounded-xl border border-border bg-card px-3 text-sm outline-none focus:border-primary" />
    </div>
  );
}
