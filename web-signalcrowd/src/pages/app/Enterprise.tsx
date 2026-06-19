import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader, SectionTitle } from "@/components/ui-kit/Primitives";
import { toast } from "sonner";
import { Building2, TrendingUp, BarChart3, ShieldCheck, ArrowRight, Check } from "lucide-react";

const useCases = [
  { icon: TrendingUp, title: "Brands", desc: "Monitor emerging product demand, validate social commerce trends, and identify category entry opportunities before competitors." },
  { icon: Building2, title: "Retailers", desc: "Track which products are gaining momentum across TikTok and Amazon. Optimize sourcing and category expansion decisions." },
  { icon: BarChart3, title: "Agencies", desc: "Provide clients with white-labeled product intelligence reports. Differentiate your service with data-backed recommendations." },
  { icon: TrendingUp, title: "Investors", desc: "Track commerce trends, identify breakout categories, and monitor product lifecycle data for market intelligence." },
  { icon: ShieldCheck, title: "Aggregators", desc: "Identify acquisition targets with strong product momentum, low saturation, and verified demand signals." },
  { icon: Building2, title: "Creator Networks", desc: "Match creators to high-opportunity products. Track creator fit, content potential, and affiliate earning estimates." },
];

export default function Enterprise() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [useCase, setUseCase] = useState("");

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Enterprise"
        title="Product trend intelligence for brands, retailers, funds, and agencies."
        subtitle="Signal Crowd helps teams monitor emerging product demand, validate social commerce trends, identify saturation risk, and discover category opportunities before competitors. Demo data shown."
      />

      {/* Use cases */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map(uc => (
          <div key={uc.title} className="surface-card p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent mb-3">
              <uc.icon className="h-5 w-5 text-electric" />
            </div>
            <h3 className="font-bold text-navy">{uc.title}</h3>
            <p className="mt-1.5 text-xs text-muted-foreground">{uc.desc}</p>
          </div>
        ))}
      </div>

      {/* Enterprise features */}
      <div className="surface-card p-6 mb-10">
        <SectionTitle>Enterprise Features</SectionTitle>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {["API access", "Historical datasets", "Custom indexes", "Crowd Reliability analytics", "Trends Validation analytics", "Private forecasting communities", "White-label widgets", "Weekly enterprise briefings", "Data exports", "Category dashboards", "Custom reports", "Dedicated support"].map(f => (
            <div key={f} className="flex items-center gap-2 py-1.5"><Check className="h-4 w-4 text-positive shrink-0" /><span className="text-sm text-navy-soft">{f}</span></div>
          ))}
        </div>
      </div>

      {/* Contact form */}
      <div className="surface-card p-6 sm:p-8 max-w-2xl mx-auto">
        <SectionTitle>Request Enterprise Demo</SectionTitle>
        <form className="mt-6 space-y-4" onSubmit={e => { e.preventDefault(); toast.success("Demo request submitted!", { description: "Our enterprise team will reach out within 24 hours." }); }}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy">Name</label>
              <input required value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy">Work Email</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-primary" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy">Company</label>
              <input required value={company} onChange={e => setCompany(e.target.value)} placeholder="Company name" className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy">Role</label>
              <input required value={role} onChange={e => setRole(e.target.value)} placeholder="Your role" className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-primary" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-navy">Use Case</label>
            <textarea required value={useCase} onChange={e => setUseCase(e.target.value)} rows={3} placeholder="Describe how you plan to use Signal Crowd..." className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary resize-none" />
          </div>
          <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-electric text-sm font-bold text-white shadow-lg shadow-electric/25 transition-transform hover:scale-[1.02]">
            Request Enterprise Demo <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
