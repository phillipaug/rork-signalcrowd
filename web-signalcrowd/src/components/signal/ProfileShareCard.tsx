import type { ForecasterProfile } from "@/data/types";
import { Logo } from "@/components/brand/Logo";
import { X, Copy, Check, Award } from "lucide-react";
import { useState } from "react";

export function ProfileShareCard({ profile: p, onClose }: { profile: ForecasterProfile; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const name = p.name === "You" ? "I" : p.name;
  const text = `${name === "I" ? "My" : `${p.name}'s`} SignalCrowd accuracy score is ${p.accuracyScore}%. ${name === "I" ? "I" : "They"} beat the crowd on ${p.crowdBeaterRate}% of resolved forecasts.`;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md animate-fade-up">
        <button onClick={onClose} className="absolute -top-10 right-0 rounded-lg p-2 text-white hover:bg-white/10"><X className="h-5 w-5" /></button>

        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-violet to-electric p-7 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <Logo variant="light" />
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase">Forecaster</span>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold">{p.avatar.slice(0, 2)}</div>
            <div>
              <p className="text-lg font-bold">{p.name}</p>
              <p className="text-sm text-white/70">{p.userType}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/10 p-3">
              <p className="text-xs text-white/70">Accuracy</p>
              <p className="font-mono-num text-3xl font-bold">{p.accuracyScore}%</p>
            </div>
            <div className="rounded-xl bg-white/10 p-3">
              <p className="text-xs text-white/70">Beat the crowd</p>
              <p className="font-mono-num text-3xl font-bold">{p.crowdBeaterRate}%</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-sm text-white/85">
            <Award className="h-4 w-4" /> {p.badges[0]}
          </div>
        </div>

        <button
          onClick={() => {
            navigator.clipboard?.writeText(text).catch(() => {});
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          }}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-electric py-3 text-sm font-bold text-white"
        >
          {copied ? <><Check className="h-4 w-4" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy share text</>}
        </button>
      </div>
    </div>
  );
}
