import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader, SectionTitle } from "@/components/ui-kit/Primitives";
import { products } from "@/data/mock";
import { toast } from "sonner";
import { Settings, TrendingUp, AlertTriangle, Package, Users, BarChart3, FileText, Check } from "lucide-react";

export default function Admin() {
  const [tab, setTab] = useState<"products" | "users" | "leads" | "reports">("products");

  const tabs = [
    { id: "products" as const, label: "Products", icon: Package },
    { id: "users" as const, label: "Users", icon: Users },
    { id: "leads" as const, label: "Leads", icon: TrendingUp },
    { id: "reports" as const, label: "Reports", icon: FileText },
  ];

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Admin"
        title="Admin Demo Console"
        subtitle="Manage products, users, leads, and reports. Demo-functional with mock data."
      />

      <div className="flex gap-1.5 mb-6 overflow-x-auto no-scrollbar">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${tab === t.id ? "bg-navy text-white" : "bg-secondary text-navy-soft hover:bg-secondary/70"}`}>
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>

      {tab === "products" && (
        <div className="surface-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <p className="font-semibold text-navy">Product Management ({products.length} products)</p>
            <button onClick={() => toast.success("Product added! (demo)")} className="rounded-lg bg-electric px-4 py-2 text-xs font-bold text-white transition-transform hover:scale-105">Add Product</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/40">
                  <th className="px-4 py-2.5 text-left text-xs font-bold uppercase text-muted-foreground">Product</th>
                  <th className="px-3 py-2.5 text-left text-xs font-bold uppercase text-muted-foreground">Category</th>
                  <th className="px-3 py-2.5 text-center text-xs font-bold uppercase text-muted-foreground">Score</th>
                  <th className="px-3 py-2.5 text-center text-xs font-bold uppercase text-muted-foreground">Rec</th>
                  <th className="px-3 py-2.5 text-center text-xs font-bold uppercase text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-secondary/20">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded bg-accent text-[10px] font-bold text-electric">{p.name.charAt(0)}</div>
                        <span className="font-medium text-navy text-xs">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-muted-foreground">{p.category}</td>
                    <td className="px-3 py-2.5 text-center font-mono-num text-xs font-bold text-navy">{p.opportunityScore}</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${p.recommendation.includes("Test") ? "bg-positive-soft text-positive" : p.recommendation.includes("Avoid") ? "bg-negative-soft text-negative" : "bg-secondary text-navy-soft"}`}>{p.recommendation}</span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <button onClick={() => toast.success("Product edited! (demo)")} className="rounded bg-secondary px-2 py-1 text-[10px] font-semibold text-navy-soft hover:bg-secondary/70">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "users" && (
        <div className="surface-card p-6">
          <SectionTitle>User Management</SectionTitle>
          <p className="text-sm text-muted-foreground mb-4">100,000 demo users. Admin can view users, subscriptions, and moderation queue.</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Total Users", value: "100,000" },
              { label: "Pro Subscribers", value: "12,400" },
              { label: "Agency Subscribers", value: "840" },
              { label: "Enterprise", value: "62" },
              { label: "Active This Week", value: "38,200" },
              { label: "Flagged for Review", value: "14" },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-border bg-secondary/40 p-3.5 text-center">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="mt-1 font-mono-num text-xl font-bold text-navy">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "leads" && (
        <div className="surface-card p-6">
          <SectionTitle>Investor & Enterprise Leads</SectionTitle>
          <p className="text-sm text-muted-foreground mb-4">Demo lead tracking. 214 investor inquiries and 86 enterprise demo requests.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { name: "Sarah Chen", email: "sarah@fund.co", type: "Venture investor", interest: "$25,000+", date: "Jun 18, 2026" },
              { name: "Marcus Webb", email: "marcus@retailcorp.com", type: "Enterprise demo", useCase: "Brand product monitoring", date: "Jun 17, 2026" },
              { name: "Lena Park", email: "lena@agency.io", type: "Agency inquiry", interest: "Agency plan", date: "Jun 16, 2026" },
              { name: "David Kumar", email: "david@invest.vc", type: "Angel investor", interest: "$1,000–$5,000", date: "Jun 15, 2026" },
            ].map(lead => (
              <div key={lead.email} className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-navy text-sm">{lead.name}</p>
                  <span className="text-[10px] text-muted-foreground">{lead.date}</span>
                </div>
                <p className="text-xs text-muted-foreground">{lead.email}</p>
                <p className="text-xs text-muted-foreground mt-1">{lead.type}{"interest" in lead ? ` · ${lead.interest}` : ""}{"useCase" in lead ? ` · ${lead.useCase}` : ""}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "reports" && (
        <div className="surface-card p-6">
          <SectionTitle>Report Management</SectionTitle>
          <p className="text-sm text-muted-foreground mb-4">Manage published reports, schedule new editions, and view download metrics.</p>
          <div className="space-y-3">
            {["Weekly TikTok-to-Amazon Gap Report", "Beauty Product Signal Report", "Creator Commerce Report", "Monthly Intelligence Report"].map(r => (
              <div key={r} className="flex items-center justify-between rounded-xl border border-border p-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-electric" />
                  <span className="text-sm font-medium text-navy">{r}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toast.success("Report edited! (demo)")} className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-navy-soft">Edit</button>
                  <button onClick={() => toast.success("Report published! (demo)")} className="rounded-lg bg-electric px-3 py-1.5 text-xs font-bold text-white">Publish</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppLayout>
  );
}
