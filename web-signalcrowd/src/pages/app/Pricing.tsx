import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui-kit/Primitives";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Plan {
  name: string;
  price: string;
  period?: string;
  tagline: string;
  cta: string;
  features: string[];
  highlight?: boolean;
  href?: string;
}

const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    tagline: "Get started measuring the crowd.",
    cta: "Start Free",
    features: ["View public indexes", "10 monthly forecasts", "Basic forecast feed", "Basic probability charts", "Top 10 leaderboard", "1 watchlist", "3 alerts"],
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    tagline: "For serious users.",
    cta: "Upgrade to Pro",
    highlight: true,
    features: ["Unlimited forecasts", "Full historical charts", "Full leaderboards", "Unlimited watchlists", "Unlimited alerts", "Daily Signal Briefing", "Crowd Reliability labels", "Hype Risk labels", "Trends Validation details", "Crowd Wrong Alerts", "Personal accuracy analytics"],
  },
  {
    name: "Analyst",
    price: "$99",
    period: "/month",
    tagline: "For investors, founders, researchers & analysts.",
    cta: "Start Analyst",
    features: ["Advanced dashboards", "Forecast exports", "Expert-only filters", "Category reliability analysis", "Probability/search divergence", "Contrarian opportunity signals", "Private notes", "Report discounts", "API preview access", "Research workspace"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    tagline: "For institutions.",
    cta: "Request Enterprise Demo",
    href: "/app/enterprise",
    features: ["API access", "Custom dashboards", "Custom indexes", "Historical data", "Private forecasting networks", "White-label widgets", "Enterprise briefings", "Data licensing", "Dedicated support"],
  },
];

const compare = [
  ["Monthly forecasts", "10", "Unlimited", "Unlimited", "Unlimited"],
  ["Reliability & hype labels", "—", "✓", "✓", "✓"],
  ["Daily Signal Briefing", "—", "✓", "✓", "✓"],
  ["Trends validation details", "—", "✓", "✓", "✓"],
  ["Forecast exports", "—", "—", "✓", "✓"],
  ["Contrarian signals", "—", "—", "✓", "✓"],
  ["API access", "—", "—", "Preview", "Full"],
  ["Custom indexes", "—", "—", "—", "✓"],
];

export default function Pricing() {
  return (
    <AppLayout>
      <PageHeader eyebrow="Pricing" title="Better insight at every tier" subtitle="Paid members get reliability labels, hype-risk, trends validation, and the analysis free users only glimpse." />

      <div className="grid gap-5 lg:grid-cols-4">
        {plans.map((p) => (
          <div key={p.name} className={cn("surface-card relative flex flex-col p-6", p.highlight && "ring-2 ring-electric")}>
            {p.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-electric px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">Most popular</span>
            )}
            <h3 className="text-lg font-bold text-navy">{p.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{p.tagline}</p>
            <div className="mt-4 flex items-end gap-1">
              <span className="font-mono-num text-4xl font-bold text-navy">{p.price}</span>
              {p.period && <span className="mb-1 text-sm text-muted-foreground">{p.period}</span>}
            </div>
            {p.href ? (
              <Link to={p.href} className={cn("mt-5 inline-flex items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-bold transition-transform hover:scale-[1.02]", "bg-navy text-white")}>
                {p.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <button
                onClick={() => toast.success(`${p.name} plan selected (demo)`)}
                className={cn("mt-5 inline-flex items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-bold transition-transform hover:scale-[1.02]", p.highlight ? "bg-electric text-white shadow-lg shadow-electric/25" : "border border-border bg-card text-navy hover:border-primary")}
              >
                {p.highlight && <Sparkles className="h-4 w-4" />} {p.cta}
              </button>
            )}
            <ul className="mt-6 space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-navy-soft"><Check className="mt-0.5 h-4 w-4 shrink-0 text-positive" />{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <h2 className="mb-4 mt-10 text-lg font-bold text-navy">Compare plans</h2>
      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3">Feature</th>
                <th className="px-5 py-3 text-center">Free</th>
                <th className="px-5 py-3 text-center text-electric">Pro</th>
                <th className="px-5 py-3 text-center">Analyst</th>
                <th className="px-5 py-3 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {compare.map((row) => (
                <tr key={row[0]} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-medium text-navy">{row[0]}</td>
                  {row.slice(1).map((c, i) => (
                    <td key={i} className={cn("px-5 py-3 text-center font-semibold", c === "✓" ? "text-positive" : c === "—" ? "text-muted-foreground/50" : "text-navy")}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
