import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/brand/Logo";
import { AreaChart } from "@/components/charts/AreaChart";
import { GLOBAL_SIGNAL, products, leaderboard } from "@/data/mock";
import { RecommendationBadge, Delta, LifecycleBadge } from "@/components/signal/SignalBadges";
import { ArrowRight, Brain, Target, Search, Newspaper, BarChart3, Building2, Check, ShieldCheck, TrendingUp, Package, AlertTriangle, Zap } from "lucide-react";
import { toast } from "sonner";

const userTypes = ["Investor", "Founder", "Seller", "Creator", "Agency", "Analyst", "Brand", "Researcher", "Curious user", "Other"];

function LandingNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-medium text-navy-soft md:flex">
          <Link to="/app/products" className="hover:text-electric">Product Radar</Link>
          <Link to="/app/gap" className="hover:text-electric">TikTok Gap</Link>
          <Link to="/app/indexes" className="hover:text-electric">Indexes</Link>
          <Link to="/app/pricing" className="hover:text-electric">Pricing</Link>
          <Link to="/app/enterprise" className="hover:text-electric">Enterprise</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/app" className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-navy hover:bg-secondary sm:block">Sign in</Link>
          <Link to="/app" className="rounded-lg bg-navy px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-105">Join the Beta</Link>
        </div>
      </div>
    </header>
  );
}

function Ticker() {
  const items = products.slice(0, 10);
  return (
    <div className="overflow-hidden border-y border-border bg-navy py-2.5">
      <div className="flex w-max animate-ticker gap-8">
        {[...items, ...items].map((p, i) => (
          <span key={i} className="flex shrink-0 items-center gap-2 text-xs text-white/80">
            <span className="font-medium text-white/95 line-clamp-1 max-w-[220px]">{p.name}</span>
            <span className="font-mono-num font-bold text-electric">{p.opportunityScore}</span>
            <RecommendationBadge label={p.recommendation} />
          </span>
        ))}
      </div>
    </div>
  );
}

function HeroDashboard() {
  const topProducts = products.slice(0, 4);
  return (
    <div className="surface-card relative overflow-hidden p-5 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-positive animate-pulse-dot" />
          <span className="text-xs font-semibold text-navy">Commerce Opportunity Index</span>
        </div>
        <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Demo data</span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <span className="font-mono-num text-5xl font-bold tracking-tight text-navy">{GLOBAL_SIGNAL.score}</span>
          <span className="ml-1 text-muted-foreground">/ 100</span>
        </div>
        <div className="text-right">
          <Delta value={GLOBAL_SIGNAL.weeklyChange} className="text-lg" />
          <p className="text-xs text-muted-foreground">this week</p>
        </div>
      </div>
      <AreaChart data={GLOBAL_SIGNAL.trendData} height={100} showAxis={false} className="mt-2" />
      <div className="mt-4 grid grid-cols-2 gap-2">
        {topProducts.map(p => (
          <div key={p.id} className="rounded-xl border border-border bg-secondary/40 p-2.5">
            <p className="text-xs font-medium text-navy-soft line-clamp-1">{p.name}</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="font-mono-num text-lg font-bold text-navy">{p.opportunityScore}</span>
              <LifecycleBadge stage={p.lifecycleStage} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const features = [
  { icon: Zap, title: "Product Radar", body: "Find trending products with opportunity scores combining TikTok momentum, Amazon saturation, and search validation." },
  { icon: Package, title: "TikTok-to-Amazon Gaps", body: "Identify products trending on TikTok but not yet saturated on Amazon — the strongest early-mover signal." },
  { icon: Search, title: "Trend Validation", body: "Separate real consumer demand from viral noise using Google Trends-style search-interest data." },
  { icon: AlertTriangle, title: "Hype Risk Detection", body: "Avoid buying inventory at the top of a trend. Get warned before saturation compresses margins." },
  { icon: Target, title: "Crowd Accuracy", body: "See when the seller crowd is historically right or wrong by product category." },
  { icon: Building2, title: "Enterprise Data", body: "License product intelligence, custom indexes, and historical commerce datasets." },
];

const steps = [
  { n: "01", t: "Products trend across platforms", d: "TikTok, Amazon, and search data create early signals." },
  { n: "02", t: "Signal Crowd scores each product", d: "Momentum, saturation, validation, margin, and hype combine into one score." },
  { n: "03", t: "Recommendations are generated", d: "Test Now, Watch, Avoid — clear actions for sellers and creators." },
  { n: "04", t: "Sellers source and test", d: "Small batches, creator partnerships, or Amazon listings based on signal quality." },
  { n: "05", t: "Outcomes are tracked", d: "Product performance data feeds back into category and crowd accuracy models." },
  { n: "06", t: "The Product Signal Graph compounds", d: "Proprietary data on what sold, when, and why becomes the platform's moat." },
];

export default function Index() {
  const [email, setEmail] = useState("");
  const [type, setType] = useState(userTypes[0]);

  return (
    <div className="min-h-screen bg-background">
      <LandingNav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute inset-0 grid-dots opacity-60" />
        <div className="container relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-navy-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse-dot" />
              Commerce intelligence, measured
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-6xl">
              Find the product trend{" "}
              <span className="text-gradient-electric">before the market catches up.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Signal Crowd combines TikTok Shop momentum, Amazon demand signals, Google Trends-style validation,
              creator activity, competition saturation, margin estimates, and crowd prediction accuracy to identify
              which product trends are real, profitable, and early.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/app" className="inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-electric/25 transition-transform hover:scale-105">
                Join the Beta <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/app/products" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-bold text-navy transition-colors hover:border-primary">
                Explore Product Radar
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-positive" />
              Know what to sell before everyone else does.
            </div>
          </div>
          <div className="animate-fade-up [animation-delay:120ms]">
            <HeroDashboard />
          </div>
        </div>
      </section>

      <Ticker />

      {/* WHY */}
      <section className="container py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-electric">Why Signal Crowd exists</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Every week, products go viral. Most sellers chase them too late.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            TikTok creates product trends daily. Amazon sellers rush in. Creators promote saturated products.
            Brands misread demand. Agencies lack reliable data. Signal Crowd turns messy trend signals
            into clear commercial recommendations — before the window closes.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-border bg-secondary/30 py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-electric">How it works</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">From viral noise to verified signal</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="surface-card p-6">
                <span className="font-mono-num text-3xl font-bold text-electric/30">{s.n}</span>
                <h3 className="mt-3 text-base font-bold text-navy">{s.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container py-20">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-electric">What makes us different</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Not which products are trending. Which ones are real opportunities.</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="surface-card surface-card-hover p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                  <Icon className="h-5 w-5 text-electric" />
                </div>
                <h3 className="mt-4 text-base font-bold text-navy">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="border-y border-border bg-navy py-16 text-white">
        <div className="container grid grid-cols-2 gap-8 text-center md:grid-cols-3 lg:grid-cols-6">
          {[["100K", "Beta users"], ["125K", "Products tracked"], ["4,820", "Trending now"], ["342", "TikTok gaps"], ["63%", "Search validated"], ["$19/mo", "Pro plan"]].map(([v, l]) => (
            <div key={l}>
              <p className="font-mono-num text-3xl font-bold text-electric">{v}</p>
              <p className="mt-1 text-xs text-white/60">{l}</p>
            </div>
          ))}
        </div>
        <p className="container mt-8 text-center text-xs text-white/40">Sample / demo metrics shown for illustration.</p>
      </section>

      {/* LEADERBOARD PREVIEW */}
      <section className="container py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-electric">Beat the crowd</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy">Build a product forecasting reputation.</h2>
            <p className="mt-4 text-muted-foreground">
              Every product forecast you make is scored against real-world outcomes. Climb the leaderboard,
              earn calibration badges, and prove when you beat the seller crowd.
            </p>
            <Link to="/app/leaderboards" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-electric">
              View leaderboards <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="surface-card overflow-hidden">
            {leaderboard.slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 border-b border-border px-5 py-3.5 last:border-0">
                <span className="w-5 font-mono-num text-sm font-bold text-muted-foreground">{i + 1}</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">{p.avatar}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.topCategories[0].category} · {p.crowdBeaterRate}% crowd beater</p>
                </div>
                <span className="font-mono-num text-sm font-bold text-positive">{p.accuracyScore}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section className="border-t border-border bg-secondary/30 py-20">
        <div className="container max-w-2xl">
          <div className="surface-card overflow-hidden p-8 sm:p-10">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">Get early access</h2>
              <p className="mt-2 text-muted-foreground">Join the beta and start finding product opportunities.</p>
            </div>
            <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("You're on the list!", { description: "We'll be in touch with early access details." }); setEmail(""); }}>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-navy">Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="h-12 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-primary" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-navy">I am a…</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="h-12 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-primary">
                  {userTypes.map((t) => (<option key={t}>{t}</option>))}
                </select>
              </div>
              <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-electric text-sm font-bold text-white shadow-lg shadow-electric/25 transition-transform hover:scale-[1.02]">
                Get Early Access <ArrowRight className="h-4 w-4" />
              </button>
              <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-positive" /> No spam. We measure signal, not noise.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-navy py-12 text-white">
        <div className="container">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
            <div className="max-w-sm">
              <Logo variant="light" />
              <p className="mt-3 text-sm text-white/60">The commerce intelligence layer for product demand. Find the product trend before the market catches up.</p>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm sm:grid-cols-3">
              <Link to="/app" className="text-white/70 hover:text-white">Dashboard</Link>
              <Link to="/app/products" className="text-white/70 hover:text-white">Product Radar</Link>
              <Link to="/app/gap" className="text-white/70 hover:text-white">TikTok Gap</Link>
              <Link to="/app/indexes" className="text-white/70 hover:text-white">Indexes</Link>
              <Link to="/app/accuracy" className="text-white/70 hover:text-white">Crowd Accuracy</Link>
              <Link to="/app/trends" className="text-white/70 hover:text-white">Trends</Link>
              <Link to="/app/reports" className="text-white/70 hover:text-white">Reports</Link>
              <Link to="/app/pricing" className="text-white/70 hover:text-white">Pricing</Link>
              <Link to="/app/enterprise" className="text-white/70 hover:text-white">Enterprise</Link>
              <Link to="/app/investors" className="text-white/70 hover:text-white">Investors</Link>
              <Link to="/app/trust" className="text-white/70 hover:text-white">Trust</Link>
              <Link to="/app/methodology" className="text-white/70 hover:text-white">Methodology</Link>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/40">
            <p>Signal Crowd is a commerce intelligence and product trend analytics platform. It does not offer betting, wagering, securities, or financial contracts. Product data is demo/sample only. Forecasts are informational only.</p>
            <p className="mt-3">© {new Date().getFullYear()} Signal Crowd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
