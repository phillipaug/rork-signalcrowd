import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/components/brand/Logo";
import { navItems, mobileNav } from "./navItems";
import { cn } from "@/lib/utils";
import { Search, Sparkles, Menu, X } from "lucide-react";
import { PremiumBadge } from "@/components/signal/SignalBadges";

const groups: ("Intelligence" | "Community" | "Business" | "Account")[] = [
  "Intelligence",
  "Community",
  "Business",
  "Account",
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  const isActive = (to: string) => (to === "/app" ? pathname === "/app" : pathname.startsWith(to));
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5">
        <Link to="/" onClick={onNavigate}>
          <Logo variant="light" />
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-4">
        {groups.map((g) => (
          <div key={g} className="mb-4">
            <p className="px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/50">{g}</p>
            <div className="space-y-0.5">
              {navItems
                .filter((n) => n.group === g)
                .map((n) => {
                  const Icon = n.icon;
                  const active = isActive(n.to);
                  return (
                    <Link
                      key={n.to}
                      to={n.to}
                      onClick={onNavigate}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <Icon className={cn("h-4.5 w-4.5 shrink-0", active ? "text-white" : "text-sidebar-foreground/70")} style={{ width: 18, height: 18 }} />
                      <span>{n.label}</span>
                    </Link>
                  );
                })}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-sidebar-border p-3">
        <Link
          to="/app/pricing"
          onClick={onNavigate}
          className="block rounded-xl bg-gradient-to-br from-electric to-[hsl(262_70%_58%)] p-4 text-white transition-transform hover:scale-[1.02]"
        >
          <div className="mb-1 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-bold">Upgrade to Pro</span>
          </div>
          <p className="text-xs text-white/85">Unlock reliability labels, hype-risk, and the daily briefing.</p>
        </Link>
      </div>
    </div>
  );
}

export function AppLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const isActive = (to: string) => (to === "/app" ? pathname === "/app" : pathname.startsWith(to));

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-sidebar lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-sidebar animate-fade-in">
            <button
              className="absolute right-3 top-4 rounded-lg p-1.5 text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-md lg:px-8">
          <button className="rounded-lg p-2 hover:bg-secondary lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="lg:hidden">
            <Logo showText={false} />
          </Link>
          <div className="relative hidden flex-1 max-w-md md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search forecasts, indexes, forecasters…"
              className="h-10 w-full rounded-xl border border-border bg-secondary/60 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary focus:bg-card"
            />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden items-center gap-1.5 rounded-full bg-positive-soft px-3 py-1 text-xs font-semibold text-positive sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-positive animate-pulse-dot" /> Live demo data
            </span>
            <Link to="/app/pricing">
              <PremiumBadge label="Free plan" className="hidden bg-secondary !text-navy-soft sm:inline-flex" />
            </Link>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">YO</div>
          </div>
        </header>

        <main className="px-4 pb-24 pt-6 lg:px-8 lg:pb-12">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-border bg-background/95 backdrop-blur-md lg:hidden">
        {mobileNav.map((n) => {
          const Icon = n.icon;
          const active = isActive(n.to);
          return (
            <Link key={n.to} to={n.to} className="flex flex-1 flex-col items-center gap-0.5 py-2.5">
              <Icon className={cn("h-5 w-5", active ? "text-primary" : "text-muted-foreground")} />
              <span className={cn("text-[10px] font-medium", active ? "text-primary" : "text-muted-foreground")}>{n.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
