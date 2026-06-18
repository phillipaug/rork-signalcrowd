import { useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui-kit/Primitives";
import { CATEGORIES } from "@/data/mock";
import type { Category } from "@/data/types";
import { ArrowLeft, Sparkles, Check, AlertTriangle, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Suggestion {
  question: string;
  criteria: string;
  source: string;
  terms: string[];
}

/** Mock AI assistant that rewrites vague questions into resolvable ones. */
function improve(input: string): Suggestion {
  const lower = input.toLowerCase();
  if (lower.includes("ai") && (lower.includes("job") || lower.includes("take"))) {
    return {
      question: "Will AI reduce U.S. customer service employment by more than 20% before December 31, 2030?",
      criteria: "Resolves YES if BLS customer-service employment falls 20%+ vs the 2025 baseline by the resolution date.",
      source: "BLS employment data, company filings, credible labor-market reports.",
      terms: ["AI customer service jobs", "AI job replacement", "customer service automation", "AI agents enterprise"],
    };
  }
  if (lower.includes("bitcoin") || lower.includes("crypto") || lower.includes("btc")) {
    return {
      question: "Will Bitcoin exceed $200,000 (spot) before January 1, 2028?",
      criteria: "Resolves YES if BTC trades above $200,000 on a major exchange (volume-weighted) before the date.",
      source: "Major exchange spot prices (volume-weighted).",
      terms: ["bitcoin price", "BTC 200k", "bitcoin ETF", "crypto institutional adoption"],
    };
  }
  return {
    question: `Will ${input.replace(/\?$/, "").trim()} — measured by a clear, public metric — occur before a specific date?`,
    criteria: "Define the exact measurable threshold and the calendar date by which it must be met.",
    source: "Name an authoritative public dataset, filing, or report used to settle the outcome.",
    terms: ["related search term", "related search term", "supporting query"],
  };
}

export default function CreateForecast() {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState<Category>("AI");
  const [criteria, setCriteria] = useState("");
  const [date, setDate] = useState("");
  const [source, setSource] = useState("");
  const [why, setWhy] = useState("");
  const [tags, setTags] = useState("");
  const [terms, setTerms] = useState("");
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [done, setDone] = useState(false);

  const isVague = question.trim().length > 0 && question.trim().length < 25;

  if (done) {
    return (
      <AppLayout>
        <div className="mx-auto max-w-xl">
          <div className="surface-card p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-positive-soft"><Check className="h-7 w-7 text-positive" /></div>
            <h1 className="mt-4 text-2xl font-extrabold text-navy">Question submitted for review</h1>
            <p className="mt-2 text-muted-foreground">Your forecast question is now in the moderation queue. Clear, resolvable questions go live fastest.</p>
            <Link to="/app/forecasts" className="mt-6 inline-block rounded-xl bg-navy px-5 py-2.5 text-sm font-bold text-white">Back to feed</Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Link to="/app/forecasts" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-navy">
        <ArrowLeft className="h-4 w-4" /> Forecast feed
      </Link>
      <PageHeader eyebrow="New Forecast" title="Propose a forecast question" subtitle="Great questions are specific, measurable, and resolvable. Our assistant can help you sharpen the wording." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="surface-card p-6">
            <label className="mb-2 block text-sm font-semibold text-navy">Forecast question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={2}
              placeholder="e.g. Will Bitcoin exceed $200,000 before January 1, 2028?"
              className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-primary"
            />
            {isVague && (
              <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-negative">
                <AlertTriangle className="h-3.5 w-3.5" /> Forecast questions must be specific, measurable, and resolvable.
              </p>
            )}
            <button
              onClick={() => {
                if (!question.trim()) {
                  toast.error("Type a draft question first");
                  return;
                }
                setSuggestion(improve(question));
              }}
              className="mt-3 inline-flex items-center gap-2 rounded-xl border border-electric bg-accent px-4 py-2 text-sm font-bold text-accent-foreground transition-colors hover:bg-electric hover:text-white"
            >
              <Wand2 className="h-4 w-4" /> Improve with AI Assistant
            </button>

            {suggestion && (
              <div className="mt-4 rounded-xl border border-electric/30 bg-accent/50 p-4">
                <div className="mb-2 flex items-center gap-2 text-electric"><Sparkles className="h-4 w-4" /><span className="text-sm font-bold">Suggested rewrite</span></div>
                <p className="text-sm font-semibold text-navy">{suggestion.question}</p>
                <div className="mt-3 space-y-1.5 text-xs text-navy-soft">
                  <p><span className="font-semibold">Resolution criteria:</span> {suggestion.criteria}</p>
                  <p><span className="font-semibold">Source of truth:</span> {suggestion.source}</p>
                  <p><span className="font-semibold">Suggested search terms:</span> {suggestion.terms.join(", ")}</p>
                </div>
                <button
                  onClick={() => {
                    setQuestion(suggestion.question);
                    setCriteria(suggestion.criteria);
                    setSource(suggestion.source);
                    setTerms(suggestion.terms.join(", "));
                    toast.success("Applied suggestion");
                  }}
                  className="mt-3 rounded-lg bg-electric px-3 py-1.5 text-xs font-bold text-white"
                >
                  Apply suggestion
                </button>
              </div>
            )}
          </div>

          <div className="surface-card p-6">
            <label className="mb-2 block text-sm font-semibold text-navy">Category</label>
            <div className="mb-5 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCategory(c)} className={cn("rounded-full border px-3 py-1.5 text-sm font-semibold", category === c ? "border-navy bg-navy text-white" : "border-border text-navy-soft hover:border-primary")}>
                  {c}
                </button>
              ))}
            </div>

            <Field label="Resolution criteria" value={criteria} onChange={setCriteria} textarea placeholder="Exactly how will this resolve YES or NO?" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Resolution date" value={date} onChange={setDate} placeholder="e.g. Jan 1, 2028" />
              <Field label="Source of truth" value={source} onChange={setSource} placeholder="Authoritative dataset / report" />
            </div>
            <Field label="Why this matters" value={why} onChange={setWhy} textarea placeholder="Why is this forecast valuable to the network?" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Tags" value={tags} onChange={setTags} placeholder="comma, separated" />
              <Field label="Suggested Google Trends terms" value={terms} onChange={setTerms} placeholder="search, terms" />
            </div>

            <button
              onClick={() => {
                if (question.trim().length < 25) {
                  toast.error("Question must be specific, measurable, and resolvable.");
                  return;
                }
                setDone(true);
              }}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-electric py-3.5 text-sm font-bold text-white shadow-lg shadow-electric/25 transition-transform hover:scale-[1.01]"
            >
              Submit question
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="surface-card p-5">
            <h3 className="mb-3 text-sm font-bold text-navy">What makes a good question?</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex gap-2 text-navy-soft"><Check className="mt-0.5 h-4 w-4 shrink-0 text-positive" /> Specific & measurable threshold</li>
              <li className="flex gap-2 text-navy-soft"><Check className="mt-0.5 h-4 w-4 shrink-0 text-positive" /> A clear resolution date</li>
              <li className="flex gap-2 text-navy-soft"><Check className="mt-0.5 h-4 w-4 shrink-0 text-positive" /> A credible source of truth</li>
            </ul>
            <div className="mt-4 space-y-2 border-t border-border pt-4 text-xs">
              <p className="font-semibold text-positive">Good</p>
              <p className="text-navy-soft">"Will Bitcoin exceed $200,000 before January 1, 2028?"</p>
              <p className="mt-2 font-semibold text-negative">Bad</p>
              <p className="text-navy-soft">"Will Bitcoin do well?"</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function Field({ label, value, onChange, placeholder, textarea }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; textarea?: boolean }) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-sm font-semibold text-navy">{label}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={2} placeholder={placeholder} className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-primary" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="h-11 w-full rounded-xl border border-border bg-card px-3 text-sm outline-none focus:border-primary" />
      )}
    </div>
  );
}
