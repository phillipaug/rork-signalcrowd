import {
  LayoutDashboard,
  BarChart3,
  Crosshair,
  Target,
  Search,
  ShieldCheck,
  Newspaper,
  Trophy,
  FileText,
  Bookmark,
  Bell,
  Tag,
  Building2,
  TrendingUp,
  User,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  group: "Intelligence" | "Community" | "Business" | "Account";
}

export const navItems: NavItem[] = [
  { label: "Dashboard", to: "/app", icon: LayoutDashboard, group: "Intelligence" },
  { label: "Indexes", to: "/app/indexes", icon: BarChart3, group: "Intelligence" },
  { label: "Forecasts", to: "/app/forecasts", icon: Crosshair, group: "Intelligence" },
  { label: "Crowd Accuracy", to: "/app/accuracy", icon: Target, group: "Intelligence" },
  { label: "Reliability Index", to: "/app/reliability", icon: ShieldCheck, group: "Intelligence" },
  { label: "Trends Validation", to: "/app/trends", icon: Search, group: "Intelligence" },
  { label: "Briefings", to: "/app/briefings", icon: Newspaper, group: "Intelligence" },
  { label: "Leaderboards", to: "/app/leaderboards", icon: Trophy, group: "Community" },
  { label: "Reports", to: "/app/reports", icon: FileText, group: "Community" },
  { label: "Watchlists", to: "/app/watchlists", icon: Bookmark, group: "Community" },
  { label: "Alerts", to: "/app/alerts", icon: Bell, group: "Community" },
  { label: "Pricing", to: "/app/pricing", icon: Tag, group: "Business" },
  { label: "Enterprise", to: "/app/enterprise", icon: Building2, group: "Business" },
  { label: "Investors", to: "/app/investors", icon: TrendingUp, group: "Business" },
  { label: "Profile", to: "/app/profile/you", icon: User, group: "Account" },
  { label: "Admin Console", to: "/app/admin", icon: Settings, group: "Account" },
];

export const mobileNav: NavItem[] = [
  { label: "Home", to: "/app", icon: LayoutDashboard, group: "Intelligence" },
  { label: "Indexes", to: "/app/indexes", icon: BarChart3, group: "Intelligence" },
  { label: "Forecasts", to: "/app/forecasts", icon: Crosshair, group: "Intelligence" },
  { label: "Briefings", to: "/app/briefings", icon: Newspaper, group: "Intelligence" },
  { label: "Profile", to: "/app/profile/you", icon: User, group: "Account" },
];
