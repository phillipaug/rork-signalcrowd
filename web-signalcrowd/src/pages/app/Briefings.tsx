import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader, LockedOverlay } from "@/components/ui-kit/Primitives";
import { briefingItems } from "@/data/mock";
import { Sparkles, ArrowUpRight, ArrowDownRight, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

const types = [
  "Daily Signal Briefing",
  "Weekly Signal Briefing",
  "AI Signal Briefing",
  "Crypto Signal Briefing",
  "Housing Signal Briefing",
  "Macro Signal Briefing",
  "Startup Signal Briefing",
  "Enterprise Signal Briefing",
];

export default function Briefings() {
  const free = briefingItems.slice(0, 2);
  const locked = briefingItems.slice(2);

  return (
    <AppLayout>
      <PageHeader
        eyebrow="AI Briefings"
        title="Daily Signal Briefing"
        subtitle="A daily, AI-written digest of the biggest probability moves, most reliable signals, hype-risk alerts, and contrarian opportunities."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="surface-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border bg-navy px-6 py-4 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-electric" />
                <div>
                  <p className="text-sm font-bold">Today's Signal Briefing</p>
                  <p className="text-xs text-white/60">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
                </div>
              </div>
              <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-bold uppercase">Demo</span>
            </div>

            <div className="p-6">
              <p className="mb-4 text-sm font-semibold text-navy">Today's biggest signal moves</p>
              <div className="space-y-3">
                {free.map((b, i) => (
                  <BriefRow key={i} index={i + 1} text={b} />
                ))}
              </div>

              <div className="mt-5">
                <LockedOverlay title="Unlock the full briefing" description="Pro members get the complete daily briefing, plus weekly and category editions.">
                  <div className="space-y-3">
                    {locked.map((b, i) => (
                      <BriefRow key={i} index={free.length + i + 1} text={b} />
                    ))}
                  </div>
                </LockedOverlay>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="surface-card p-5">
            <div className="mb-3 flex items-center gap-2"><Newspaper className="h-4 w-4 text-electric" /><h3 className="text-sm font-bold text-navy">Briefing editions</h3></div>
            <div className="space-y-1">
              {types.map((t, i) => (
                <div key={t} className={cn("flex items-center justify-between rounded-lg px-3 py-2.5 text-sm", i === 0 ? "bg-accent font-semibold text-accent-foreground" : "text-navy-soft hover:bg-secondary")}>
                  {t}
                  {i > 0 && <span className="rounded bg-premium/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-premium">Pro</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="surface-card bg-gradient-to-br from-electric to-violet p-5 text-white">
            <Sparkles className="h-6 w-6" />
            <p className="mt-2 font-bold">Briefings, every morning.</p>
            <p className="mt-1 text-sm text-white/85">Pro unlocks all eight editions, delivered daily with reliability and hype-risk context.</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function BriefRow({ index, text }: { index: number; text: string }) {
  const positive = /rose|increased|now a reliable/i.test(text);
  const negative = /fell|dropped|declined|overconfidence|weak/i.test(text);
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-3.5">
      <span className="font-mono-num text-sm font-bold text-muted-foreground">{index}</span>
      <p className="flex-1 text-sm text-navy">{text}</p>
      {positive && <ArrowUpRight className="h-4 w-4 shrink-0 text-positive" />}
      {!positive && negative && <ArrowDownRight className="h-4 w-4 shrink-0 text-negative" />}
    </div>
  );
}
