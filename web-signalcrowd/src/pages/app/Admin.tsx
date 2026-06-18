import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui-kit/Primitives";
import { forecasts, indexes, reports } from "@/data/mock";
import { CategoryChip, GradeBadge } from "@/components/signal/SignalBadges";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Plus, CheckCircle2, Flag, Users, Mail, Building2, FileText, BarChart3, Crosshair, Search } from "lucide-react";

const tabs = [
  { key: "forecasts", label: "Forecasts", icon: Crosshair },
  { key: "indexes", label: "Indexes", icon: BarChart3 },
  { key: "reports", label: "Reports", icon: FileText },
  { key: "users", label: "Users", icon: Users },
  { key: "leads", label: "Leads", icon: Mail },
  { key: "moderation", label: "Moderation", icon: Flag },
  { key: "trends", label: "Trends Mapping", icon: Search },
] as const;

type Tab = (typeof tabs)[number]["key"];

export default function Admin() {
  const [tab, setTab] = useState<Tab>("forecasts");

  return (
    <AppLayout>
      <PageHeader eyebrow="Admin Demo Console" title="Operate the SignalCrowd network" subtitle="A demonstration console for managing forecasts, indexes, reports, users, leads, and moderation. Functional enough for investor demos." />

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.key} onClick={() => setTab(t.key)} className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-semibold transition-colors", tab === t.key ? "border-navy bg-navy text-white" : "border-border bg-card text-navy-soft hover:border-primary")}>
              <Icon className="h-4 w-4" /> {t.label}
            </button>
          );
        })}
      </div>

      {tab === "forecasts" && (
        <Panel
          title="Forecast questions"
          action={<AddButton label="Add question" />}
        >
          {forecasts.slice(0, 10).map((f) => (
            <div key={f.id} className="flex items-center gap-3 border-b border-border px-5 py-3.5 last:border-0">
              <CategoryChip category={f.category} />
              <span className="min-w-0 flex-1 text-sm font-medium text-navy line-clamp-1">{f.question}</span>
              <span className="hidden font-mono-num text-sm font-bold text-navy sm:block">{f.probability}%</span>
              <button onClick={() => toast.success("Marked resolved (demo)", { description: f.question })} className="inline-flex items-center gap-1 rounded-lg bg-positive-soft px-2.5 py-1.5 text-xs font-bold text-positive">
                <CheckCircle2 className="h-3.5 w-3.5" /> Resolve
              </button>
            </div>
          ))}
        </Panel>
      )}

      {tab === "indexes" && (
        <Panel title="Indexes" action={<AddButton label="Create index" />}>
          {indexes.map((i) => (
            <div key={i.id} className="flex items-center gap-3 border-b border-border px-5 py-3.5 last:border-0">
              <span className="min-w-0 flex-1 text-sm font-medium text-navy">{i.name}</span>
              <span className="font-mono-num text-sm font-bold text-navy">{i.score}</span>
              <GradeBadge grade={i.reliabilityGrade} className="!px-1.5 !py-0 !text-xs" />
              <button onClick={() => toast.success("Featured (demo)", { description: i.name })} className="rounded-lg bg-secondary px-2.5 py-1.5 text-xs font-bold text-navy">Feature</button>
            </div>
          ))}
        </Panel>
      )}

      {tab === "reports" && (
        <Panel title="Reports" action={<AddButton label="Create report" />}>
          {reports.map((r) => (
            <div key={r.id} className="flex items-center gap-3 border-b border-border px-5 py-3.5 last:border-0">
              <span className="min-w-0 flex-1 text-sm font-medium text-navy">{r.title}</span>
              <span className="font-mono-num text-sm font-bold text-navy">${r.price}</span>
              <button onClick={() => toast.success("Edited (demo)")} className="rounded-lg bg-secondary px-2.5 py-1.5 text-xs font-bold text-navy">Edit</button>
            </div>
          ))}
        </Panel>
      )}

      {tab === "users" && (
        <Panel title="Users & subscriptions">
          {[["Maya Chen", "Analyst", "Active"], ["Daniel Brooks", "Pro", "Active"], ["Ethan Park", "Free", "—"], ["Amara Singh", "Pro", "Trial"], ["Lena Fischer", "Free", "—"]].map(([n, plan, status]) => (
            <div key={n} className="flex items-center gap-3 border-b border-border px-5 py-3.5 last:border-0">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">{n.split(" ").map((x) => x[0]).join("")}</span>
              <span className="flex-1 text-sm font-medium text-navy">{n}</span>
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-navy-soft">{plan}</span>
              <span className="text-xs text-muted-foreground">{status}</span>
            </div>
          ))}
        </Panel>
      )}

      {tab === "leads" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Investor interest leads" icon={Mail}>
            {[["A. Whitfield", "Venture investor", "$25,000+"], ["R. Osei", "Angel investor", "$5,000–$25,000"], ["K. Tanaka", "Strategic partner", "$25,000+"]].map(([n, t, amt]) => (
              <div key={n} className="flex items-center gap-3 border-b border-border px-5 py-3.5 last:border-0">
                <span className="flex-1 text-sm font-medium text-navy">{n}</span>
                <span className="text-xs text-muted-foreground">{t}</span>
                <span className="font-mono-num text-xs font-bold text-positive">{amt}</span>
              </div>
            ))}
          </Panel>
          <Panel title="Enterprise demo requests" icon={Building2}>
            {[["Meridian Capital", "Hedge fund"], ["Northwind Bank", "Bank"], ["Atlas Ventures", "Venture fund"]].map(([n, t]) => (
              <div key={n} className="flex items-center gap-3 border-b border-border px-5 py-3.5 last:border-0">
                <span className="flex-1 text-sm font-medium text-navy">{n}</span>
                <span className="text-xs text-muted-foreground">{t}</span>
                <button onClick={() => toast.success("Demo scheduled (demo)")} className="rounded-lg bg-secondary px-2.5 py-1.5 text-xs font-bold text-navy">Schedule</button>
              </div>
            ))}
          </Panel>
        </div>
      )}

      {tab === "moderation" && (
        <Panel title="Moderation queue & flagged forecasts">
          {["Vague resolution criteria on a community-submitted question", "Possible manipulation: coordinated probability spike", "Reported: unclear source of truth", "Duplicate forecast question"].map((m, i) => (
            <div key={i} className="flex items-center gap-3 border-b border-border px-5 py-3.5 last:border-0">
              <Flag className="h-4 w-4 shrink-0 text-premium" />
              <span className="flex-1 text-sm text-navy">{m}</span>
              <button onClick={() => toast.success("Resolved (demo)")} className="rounded-lg bg-positive-soft px-2.5 py-1.5 text-xs font-bold text-positive">Approve</button>
              <button onClick={() => toast.error("Removed (demo)")} className="rounded-lg bg-negative-soft px-2.5 py-1.5 text-xs font-bold text-negative">Remove</button>
            </div>
          ))}
        </Panel>
      )}

      {tab === "trends" && (
        <Panel title="Trends validation mappings">
          {forecasts.slice(0, 8).map((f) => (
            <div key={f.id} className="flex items-center gap-3 border-b border-border px-5 py-3.5 last:border-0">
              <span className="min-w-0 flex-1 text-sm font-medium text-navy line-clamp-1">{f.question}</span>
              <span className="hidden text-xs text-muted-foreground sm:block">{f.catalysts.length} terms mapped</span>
              <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">Mock</span>
            </div>
          ))}
        </Panel>
      )}
    </AppLayout>
  );
}

function Panel({ title, icon: Icon, children, action }: { title: string; icon?: typeof Mail; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="surface-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-5 py-3">
        <span className="inline-flex items-center gap-2 text-sm font-bold text-navy">{Icon && <Icon className="h-4 w-4 text-electric" />}{title}</span>
        {action}
      </div>
      {children}
    </div>
  );
}

function AddButton({ label }: { label: string }) {
  return (
    <button onClick={() => toast.success(`${label} (demo)`)} className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-3 py-1.5 text-xs font-bold text-white">
      <Plus className="h-3.5 w-3.5" /> {label}
    </button>
  );
}
