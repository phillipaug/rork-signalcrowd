import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui-kit/Primitives";
import { Check, Sparkles, ArrowRight } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  period: string;
  desc: string;
  cta: string;
  featured?: boolean;
  features: string[];
}

const plans: Plan[] = [
  {
    name: "Free", price: "$0", period: "/month", desc: "For exploring the platform.",
    cta: "Start Free", features: [
      "Limited Product Radar", "5 product searches/month",
      "Basic opportunity scores", "Limited category indexes",
      "1 watchlist", "3 alerts", "Report previews",
    ],
  },
  {
    name: "Starter", price: "$29", period: "/month", desc: "For active sellers and creators.",
    cta: "Start Starter", features: [
      "100 product searches/month", "Product Opportunity Scores",
      "Basic TikTok-to-Amazon Gap", "Basic Google Trends validation",
      "5 watchlists", "15 alerts", "Weekly trend briefing",
    ],
  },
  {
    name: "Pro", price: "$99", period: "/month", desc: "For serious sellers, agencies, and investors.",
    cta: "Upgrade to Pro", featured: true, features: [
      "Unlimited product searches", "Full Product Radar",
      "Full TikTok-to-Amazon Gap", "Trend Reliability Score",
      "Hype Risk Score", "Saturation alerts",
      "Margin Reality Check", "Advanced product detail pages",
      "Unlimited watchlists", "Unlimited alerts",
      "Weekly product reports", "Forecasting analytics",
      "Export product reports",
    ],
  },
  {
    name: "Agency", price: "$399", period: "/month", desc: "For teams managing multiple clients.",
    cta: "Start Agency", features: [
      "Team seats", "Client workspaces",
      "White-labeled reports", "Product exports",
      "Category dashboards", "Creator opportunity lists",
      "Custom watchlists", "Client-ready PDFs",
      "Priority support",
    ],
  },
];

export default function Pricing() {
  return (
    <AppLayout>
      <div className="text-center mb-10">
        <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-electric">Pricing</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Find the right plan for your business.</h1>
        <p className="mt-3 max-w-xl mx-auto text-sm text-muted-foreground">From free exploration to enterprise data licensing. All plans include demo data access.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {plans.map(plan => (
          <div key={plan.name} className={`surface-card p-6 flex flex-col ${plan.featured ? "ring-2 ring-electric shadow-lg shadow-electric/10" : ""}`}>
            {plan.featured && (
              <div className="mb-3 inline-flex self-start items-center gap-1 rounded-full bg-electric px-3 py-1 text-[10px] font-bold uppercase text-white">
                <Sparkles className="h-3 w-3" /> Most Popular
              </div>
            )}
            <h3 className="text-lg font-bold text-navy">{plan.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{plan.desc}</p>
            <div className="mt-4 flex items-baseline gap-0.5">
              <span className="font-mono-num text-4xl font-bold tracking-tight text-navy">{plan.price}</span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </div>
            <Link to={plan.name === "Enterprise" ? "/app/enterprise" : "/app"} className={`mt-4 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-transform hover:scale-[1.02] ${plan.featured ? "bg-electric text-white shadow-lg shadow-electric/25" : "bg-navy text-white"}`}>
              {plan.cta} <ArrowRight className="h-4 w-4" />
            </Link>
            <ul className="mt-5 space-y-2.5 flex-1">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-navy-soft">
                  <Check className="h-3.5 w-3.5 text-positive shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Enterprise row */}
      <div className="mt-6 surface-card overflow-hidden border-premium/30">
        <div className="bg-gradient-to-r from-navy to-[hsl(215_55%_18%)] p-6 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-xl font-bold">Enterprise</h3>
              <p className="mt-1 text-sm text-white/70">Custom pricing for brands, retailers, funds, and agencies.</p>
              <ul className="mt-3 grid gap-1 sm:grid-cols-2 text-xs text-white/60">
                {["API access", "Historical datasets", "Custom category monitoring", "Private dashboards", "Custom reports", "Data licensing", "White-label widgets", "Dedicated support"].map(f => (
                  <li key={f} className="flex items-center gap-1.5"><Check className="h-3 w-3 text-electric" /> {f}</li>
                ))}
              </ul>
            </div>
            <Link to="/app/enterprise" className="inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3 text-sm font-bold text-white shadow-lg shadow-electric/25 transition-transform hover:scale-105">
              Request Enterprise Demo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
