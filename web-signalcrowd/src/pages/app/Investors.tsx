import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Logo } from "@/components/brand/Logo";
import { Check, ArrowRight, Database, Layers, TrendingUp, Network } from "lucide-react";
import { toast } from "sonner";

const demoMetrics = [
  ["100,000", "beta users"],
  ["2.4M", "forecasts submitted"],
  ["31M", "forecast updates"],
  ["18,400", "resolved outcomes"],
  ["248,000", "crypto forecasts"],
  ["134,000", "AI forecasts"],
  ["89,000", "housing forecasts"],
  ["120,000", "economic forecasts"],
  ["74,000", "geopolitical forecasts"],
  ["63%", "trends-confirmed signals"],
  ["72.8%", "avg crowd accuracy"],
  ["$25K/yr", "enterprise starting price"],
];

const revenue = ["Pro subscriptions", "Analyst subscriptions", "Paid reports", "Enterprise data licensing", "API access", "Private forecasting networks", "White-label indexes", "Custom research dashboards"];

const moatItems = ["Who forecasted what", "When they forecasted it", "Their probability & confidence", "Their reasoning", "Crowd probability at that moment", "Search-interest validation at that moment", "The final outcome", "Their long-term accuracy", "The crowd's long-term reliability"];

const investorTypes = ["Individual investor", "Angel investor", "Venture investor", "Strategic partner", "Media", "Other"];
const interestRanges = ["Under $1,000", "$1,000–$5,000", "$5,000–$25,000", "$25,000+"];

export default function Investors() {
  const [sent, setSent] = useState(false);
  const [type, setType] = useState(investorTypes[0]);
  const [range, setRange] = useState(interestRanges[0]);

  return (
    <AppLayout>
      {/* Hero */}
      <div className="surface-card relative overflow-hidden bg-gradient-to-br from-navy to-[hsl(222_60%_18%)] p-8 text-white lg:p-12">
        <div className="absolute inset-0 grid-dots opacity-30" />
        <div className="relative max-w-2xl">
          <Logo variant="light" />
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">Invest in the world's collective intelligence layer.</h1>
          <p className="mt-4 text-lg text-white/70">SignalCrowd is building a data platform that turns human forecasts into real-time probability indexes, crowd accuracy scores, search-interest validation, and enterprise decision intelligence.</p>
          <a href="#interest" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3.5 text-sm font-bold text-white transition-transform hover:scale-105">Join Investor Updates <ArrowRight className="h-4 w-4" /></a>
        </div>
      </div>

      {/* Problem / Solution / Why now */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Block title="The Problem" body="The internet is full of predictions, but almost no accountability. Experts make claims. Influencers forecast. Markets react to narratives. But no mainstream platform tracks what people believed, when, how confident they were, whether they were right, and whether attention confirmed the signal." />
        <Block title="The Solution" body="SignalCrowd collects forecasts, measures accuracy, validates attention using Google Trends-style search-interest data, and transforms crowd judgment into monetizable intelligence products." />
        <Block title="Why Now" body="AI, alternative data, prediction analytics, and consumer intelligence are converging. People and institutions want better signals, but most forecasting products are too financial, academic, risky, or complex. SignalCrowd makes forecasting mainstream, measurable, and monetizable." />
      </div>

      {/* Product */}
      <div className="mt-8 surface-card p-6">
        <div className="mb-3 flex items-center gap-2"><Layers className="h-5 w-5 text-electric" /><h2 className="font-bold text-navy">The Product</h2></div>
        <div className="flex flex-wrap gap-2">
          {["Public probability indexes", "Crowd forecasts", "Crowd Accuracy Index", "Crowd Reliability Index", "Trends validation layer", "Hype Risk Score", "AI briefings", "Paid reports", "Leaderboards", "Watchlists", "Alerts", "Private forecasting networks", "Enterprise data products"].map((p) => (
            <span key={p} className="rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-navy-soft">{p}</span>
          ))}
        </div>
      </div>

      {/* Moat + business model */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="surface-card p-6">
          <div className="mb-3 flex items-center gap-2"><Network className="h-5 w-5 text-electric" /><h2 className="font-bold text-navy">The Moat — the Forecast Graph</h2></div>
          <p className="mb-4 text-sm text-muted-foreground">Over time, this creates a proprietary dataset of human expectations and accuracy.</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {moatItems.map((m) => (
              <li key={m} className="flex gap-2 text-sm text-navy-soft"><Database className="mt-0.5 h-3.5 w-3.5 shrink-0 text-electric" />{m}</li>
            ))}
          </ul>
        </div>
        <div className="surface-card p-6">
          <div className="mb-3 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-electric" /><h2 className="font-bold text-navy">Business Model</h2></div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {revenue.map((r) => (
              <li key={r} className="flex gap-2 text-sm text-navy-soft"><Check className="mt-0.5 h-4 w-4 shrink-0 text-positive" />{r}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Demo metrics */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy">Traction</h2>
          <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">Demo / sample metrics</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {demoMetrics.map(([v, l]) => (
            <div key={l} className="surface-card p-4">
              <p className="font-mono-num text-2xl font-bold text-navy">{v}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interest form */}
      <div id="interest" className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="surface-card p-6">
          <h2 className="mb-4 font-bold text-navy">Investor interest</h2>
          {sent ? (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-positive-soft"><Check className="h-6 w-6 text-positive" /></div>
              <p className="font-bold text-navy">Thank you</p>
              <p className="text-sm text-muted-foreground">You'll receive investor updates as they're shared.</p>
            </div>
          ) : (
            <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Added to investor updates"); }}>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Name" required />
                <Field label="Email" type="email" required />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Select label="Investor type" value={type} onChange={setType} options={investorTypes} />
                <Select label="Estimated interest" value={range} onChange={setRange} options={interestRanges} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-navy">Message</label>
                <textarea rows={3} className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-primary" />
              </div>
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-electric py-3 text-sm font-bold text-white shadow-lg shadow-electric/25 transition-transform hover:scale-[1.01]">Join Investor Updates</button>
            </form>
          )}
        </div>
        <div className="surface-card flex flex-col justify-center bg-secondary/40 p-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            This page is for informational purposes only and does not constitute an offer to sell securities. Any
            investment opportunity will be made only through properly authorized offering materials and compliant
            crowdfunding channels. SignalCrowd does not promise returns or imply guaranteed investment outcomes.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div className="surface-card p-6">
      <h2 className="font-bold text-navy">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function Field({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy">{label}{required && <span className="text-negative"> *</span>}</label>
      <input type={type} required={required} className="h-11 w-full rounded-xl border border-border bg-card px-3 text-sm outline-none focus:border-primary" />
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="h-11 w-full rounded-xl border border-border bg-card px-3 text-sm outline-none focus:border-primary">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
