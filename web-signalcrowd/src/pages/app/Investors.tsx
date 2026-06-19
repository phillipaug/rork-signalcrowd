import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader, SectionTitle } from "@/components/ui-kit/Primitives";
import { toast } from "sonner";
import { TrendingUp, Building2, ShieldCheck, BarChart3, ArrowRight, Check } from "lucide-react";

export default function Investors() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [investorType, setInvestorType] = useState("Individual investor");
  const [interest, setInterest] = useState("Under $1,000");
  const [message, setMessage] = useState("");

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Investors"
        title="Invest in the commerce intelligence layer for product demand."
        subtitle="Signal Crowd is building a data platform that helps sellers, creators, agencies, and brands identify which product trends are real, profitable, and early. This page is for informational purposes only."
      />

      {/* Problem & Solution */}
      <div className="grid gap-8 lg:grid-cols-2 mb-10">
        <div className="surface-card p-6">
          <SectionTitle>The Problem</SectionTitle>
          <p className="mt-2 text-sm text-navy-soft leading-relaxed">Every week, products go viral across TikTok, Amazon, and social commerce. Sellers and brands often chase trends too late, overbuy inventory, misread demand, or enter categories after competition has already exploded.</p>
        </div>
        <div className="surface-card p-6">
          <SectionTitle>The Solution</SectionTitle>
          <p className="mt-2 text-sm text-navy-soft leading-relaxed">Signal Crowd combines product momentum, search validation, creator activity, saturation risk, margin intelligence, and crowd forecasting to help users decide what to test, source, promote, or avoid.</p>
        </div>
      </div>

      {/* The Moat */}
      <div className="surface-card p-6 mb-10">
        <SectionTitle>The Moat: Product Signal Graph</SectionTitle>
        <p className="mt-2 text-sm text-navy-soft mb-4">Signal Crowd's defensibility comes from the proprietary Product Signal Graph, which stores:</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {["Product momentum over time", "Category trend shifts", "TikTok-to-Amazon gap signals", "Search-interest validation", "Saturation changes", "Hype risk movement", "Margin estimates", "Crowd predictions & accuracy", "Product lifecycle history"].map(item => (
            <div key={item} className="flex items-center gap-2 py-1.5"><Check className="h-4 w-4 text-positive shrink-0" /><span className="text-sm text-navy-soft">{item}</span></div>
          ))}
        </div>
      </div>

      {/* Business Model */}
      <div className="surface-card p-6 mb-10">
        <SectionTitle>Business Model</SectionTitle>
        <p className="mt-2 text-sm text-navy-soft mb-3">Revenue comes from multiple monetization layers:</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {["Starter subscriptions ($29/mo)", "Pro subscriptions ($99/mo)", "Agency subscriptions ($399/mo)", "Paid reports ($49–99 each)", "Enterprise data licensing", "API access", "Private dashboards", "White-labeled reports"].map(item => (
            <div key={item} className="flex items-center gap-2 py-1"><Check className="h-4 w-4 text-positive shrink-0" /><span className="text-sm text-navy-soft">{item}</span></div>
          ))}
        </div>
      </div>

      {/* Demo Metrics */}
      <div className="surface-card p-6 mb-10">
        <SectionTitle>Demo Metrics</SectionTitle>
        <p className="text-xs text-muted-foreground mb-4">These are sample/demo metrics for illustration only.</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {[["100K", "Beta users"], ["2.4M", "Forecasts"], ["125K", "Products tracked"], ["4,820", "Trending products"], ["$19–99/mo", "Subscription plans"]].map(([v, l]) => (
            <div key={l} className="text-center">
              <p className="font-mono-num text-2xl font-bold text-electric">{v}</p>
              <p className="mt-1 text-xs text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Investor interest form */}
      <div className="surface-card p-6 sm:p-8 max-w-2xl mx-auto">
        <SectionTitle>Join Investor Updates</SectionTitle>
        <form className="mt-6 space-y-4" onSubmit={e => { e.preventDefault(); toast.success("Added to investor updates!", { description: "We'll keep you informed on major milestones." }); }}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy">Name</label>
              <input required value={name} onChange={e => setName(e.target.value)} className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy">Email</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-primary" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-navy">Investor Type</label>
            <select value={investorType} onChange={e => setInvestorType(e.target.value)} className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none">
              {["Individual investor", "Angel investor", "Venture investor", "Strategic partner", "Media", "Other"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-navy">Estimated Interest</label>
            <select value={interest} onChange={e => setInterest(e.target.value)} className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none">
              {["Under $1,000", "$1,000–$5,000", "$5,000–$25,000", "$25,000+"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-navy">Message</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary resize-none" />
          </div>
          <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-electric text-sm font-bold text-white shadow-lg shadow-electric/25 transition-transform hover:scale-[1.02]">
            Join Investor Updates <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-4 text-xs text-muted-foreground">This page is for informational purposes only and does not constitute an offer to sell securities. Any investment opportunity will be made only through properly authorized offering materials and compliant crowdfunding channels.</p>
      </div>
    </AppLayout>
  );
}
